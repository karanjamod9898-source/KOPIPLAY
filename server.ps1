# Static web server for KipoPlay
param([int]$port = 8080)

$root = $PSScriptRoot

$mimeTypes = @{
    ".html"  = "text/html; charset=utf-8"
    ".htm"   = "text/html; charset=utf-8"
    ".css"   = "text/css; charset=utf-8"
    ".js"    = "application/javascript; charset=utf-8"
    ".mjs"   = "application/javascript; charset=utf-8"
    ".json"  = "application/json; charset=utf-8"
    ".svg"   = "image/svg+xml"
    ".png"   = "image/png"
    ".jpg"   = "image/jpeg"
    ".jpeg"  = "image/jpeg"
    ".gif"   = "image/gif"
    ".webp"  = "image/webp"
    ".ico"   = "image/x-icon"
    ".woff"  = "font/woff"
    ".woff2" = "font/woff2"
    ".ttf"   = "font/ttf"
    ".otf"   = "font/otf"
    ".mp3"   = "audio/mpeg"
    ".wav"   = "audio/wav"
    ".ogg"   = "audio/ogg"
    ".mp4"   = "video/mp4"
    ".webm"  = "video/webm"
    ".xml"   = "application/xml; charset=utf-8"
    ".txt"   = "text/plain; charset=utf-8"
}

function Resolve-StaticFilePath([string]$urlPath) {
    $cleanPath = $urlPath.Split('?')[0].TrimStart('/')
    try {
        $cleanPath = [System.Uri]::UnescapeDataString($cleanPath)
    } catch {}

    if ([string]::IsNullOrWhiteSpace($cleanPath)) {
        $cleanPath = "index.html"
    }

    $targetPath = Join-Path $root ($cleanPath -replace '/', '\')

    if (Test-Path $targetPath -PathType Container) {
        $indexPath = Join-Path $targetPath "index.html"
        if (Test-Path $indexPath -PathType Leaf) {
            return $indexPath
        }
    }

    if (Test-Path $targetPath -PathType Leaf) {
        return $targetPath
    }

    return $null
}

# Start HttpListener (supported natively across modern Windows)
$httpListener = $null
try {
    $httpListener = New-Object System.Net.HttpListener
    $httpListener.Prefixes.Add("http://127.0.0.1:$port/")
    try {
        $httpListener.Prefixes.Add("http://localhost:$port/")
    } catch {}
    $httpListener.Start()
} catch {
    $httpListener = $null
}

if ($httpListener -and $httpListener.IsListening) {
    Write-Host "KipoPlay Server active on http://127.0.0.1:$port/"
    try {
        while ($httpListener.IsListening) {
            try {
                $context = $httpListener.GetContext()
                $reqPath = $context.Request.Url.LocalPath
                $filePath = Resolve-StaticFilePath $reqPath

                if ($filePath -and (Test-Path $filePath -PathType Leaf)) {
                    $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
                    $mime = if ($mimeTypes.ContainsKey($ext)) { $mimeTypes[$ext] } else { "application/octet-stream" }
                    $bytes = [System.IO.File]::ReadAllBytes($filePath)

                    $context.Response.StatusCode = 200
                    $context.Response.ContentType = $mime
                    $context.Response.ContentLength64 = $bytes.Length
                    $context.Response.AddHeader("Access-Control-Allow-Origin", "*")
                    $context.Response.AddHeader("Cache-Control", "no-cache, must-revalidate")
                    $context.Response.OutputStream.Write($bytes, 0, $bytes.Length)
                } else {
                    $errBody = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found")
                    $context.Response.StatusCode = 404
                    $context.Response.ContentType = "text/plain; charset=utf-8"
                    $context.Response.ContentLength64 = $errBody.Length
                    $context.Response.OutputStream.Write($errBody, 0, $errBody.Length)
                }
            } catch {
                # Ignore individual request errors
            } finally {
                if ($context) {
                    try { $context.Response.OutputStream.Close() } catch {}
                }
            }
        }
    } finally {
        try { $httpListener.Stop() } catch {}
    }
} else {
    # Fallback to TcpListener with non-blocking timeouts & complete header draining
    $ip = [System.Net.IPAddress]::Loopback
    $tcpListener = New-Object System.Net.Sockets.TcpListener($ip, $port)
    $tcpListener.Start()
    Write-Host "KipoPlay Server active on http://127.0.0.1:$port/"

    try {
        while ($true) {
            try {
                $client = $tcpListener.AcceptTcpClient()
                $client.ReceiveTimeout = 2000
                $client.SendTimeout = 5000

                $stream = $client.GetStream()
                $reader = New-Object System.IO.StreamReader($stream)

                $requestLine = $reader.ReadLine()
                if (-not $requestLine) {
                    $client.Close()
                    continue
                }

                while ($true) {
                    $line = $reader.ReadLine()
                    if ([string]::IsNullOrEmpty($line)) { break }
                }

                $parts = $requestLine -split ' '
                if ($parts.Length -ge 2) {
                    $filePath = Resolve-StaticFilePath $parts[1]

                    if ($filePath -and (Test-Path $filePath -PathType Leaf)) {
                        $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
                        $mime = if ($mimeTypes.ContainsKey($ext)) { $mimeTypes[$ext] } else { "application/octet-stream" }
                        $bytes = [System.IO.File]::ReadAllBytes($filePath)

                        $header = "HTTP/1.1 200 OK`r`n" +
                                  "Content-Type: $mime`r`n" +
                                  "Content-Length: $($bytes.Length)`r`n" +
                                  "Access-Control-Allow-Origin: *`r`n" +
                                  "Cache-Control: no-cache`r`n" +
                                  "Connection: close`r`n`r`n"

                        $headerBytes = [System.Text.Encoding]::ASCII.GetBytes($header)
                        $stream.Write($headerBytes, 0, $headerBytes.Length)
                        $stream.Write($bytes, 0, $bytes.Length)
                    } else {
                        $errBody = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found")
                        $header = "HTTP/1.1 404 Not Found`r`n" +
                                  "Content-Type: text/plain`r`n" +
                                  "Content-Length: $($errBody.Length)`r`n" +
                                  "Access-Control-Allow-Origin: *`r`n" +
                                  "Connection: close`r`n`r`n"

                        $headerBytes = [System.Text.Encoding]::ASCII.GetBytes($header)
                        $stream.Write($headerBytes, 0, $headerBytes.Length)
                        $stream.Write($errBody, 0, $errBody.Length)
                    }
                }
                $stream.Flush()
                $client.Close()
            } catch {
                # Ignore disconnect
            }
        }
    } finally {
        try { $tcpListener.Stop() } catch {}
    }
}
