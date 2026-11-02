/**
 * KopiPlay - Static Pages (About, Contact, Privacy, Terms)
 */

import { showToast } from '../components/toast.js';

export function renderAboutView() {
  return `
    <div class="container" style="max-width: 900px;">
      <nav class="breadcrumbs">
        <a href="#/" class="breadcrumb-link">Home</a>
        <span class="breadcrumb-separator">/</span>
        <span class="breadcrumb-current">About Us</span>
      </nav>

      <div class="glass-panel" style="padding: 40px; margin-bottom: 40px;">
        <h1 style="font-size: 2.5rem; margin-bottom: 16px;">About <span class="gradient-text">KopiPlay</span></h1>
        
        <p style="font-size: 1.1rem; color: var(--text-secondary); line-height: 1.8; margin-bottom: 24px;">
          KopiPlay is a modern, lightweight, high-performance HTML5 browser gaming platform. Our mission is to make high quality casual and arcade games instantly accessible to anyone, anywhere in the world—with zero downloads, zero account requirements, and zero friction.
        </p>

        <h2 style="font-size: 1.5rem; margin-top: 32px; margin-bottom: 12px;">Our Core Principles</h2>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 20px; margin: 24px 0;">
          <div style="background: var(--bg-tertiary); padding: 20px; border-radius: var(--radius-md); border-left: 3px solid var(--accent-cyan);">
            <h3 style="font-size: 1.1rem; margin-bottom: 8px;">🚀 Instant Speed</h3>
            <p style="color: var(--text-muted); font-size: 0.9rem;">
              Built on modern lightweight web standards, games load in seconds on desktop, tablet, and mobile devices.
            </p>
          </div>

          <div style="background: var(--bg-tertiary); padding: 20px; border-radius: var(--radius-md); border-left: 3px solid var(--accent-purple);">
            <h3 style="font-size: 1.1rem; margin-bottom: 8px;">🔒 Privacy First</h3>
            <p style="color: var(--text-muted); font-size: 0.9rem;">
              Play immediately without compulsory registration. Your favorites and game history are saved safely in your own browser's local storage.
            </p>
          </div>

          <div style="background: var(--bg-tertiary); padding: 20px; border-radius: var(--radius-md); border-left: 3px solid var(--accent-emerald);">
            <h3 style="font-size: 1.1rem; margin-bottom: 8px;">🎨 Original Design</h3>
            <p style="color: var(--text-muted); font-size: 0.9rem;">
              Custom dark theme with cyber aesthetics, clear controls, and responsive layout built for gamers.
            </p>
          </div>
        </div>

        <h2 style="font-size: 1.5rem; margin-top: 32px; margin-bottom: 12px;">Game Developer Licensing & Submissions</h2>
        <p style="color: var(--text-secondary); line-height: 1.8; margin-bottom: 16px;">
          Are you an HTML5 game developer or publisher? We welcome original web games, open-source projects, and licensed titles. Contact our developer team to showcase your games on KopiPlay.
        </p>
        <a href="#/contact" class="btn btn-primary" style="margin-top: 10px;">Contact Publishing Team</a>
      </div>
    </div>
  `;
}

export function renderContactView() {
  return `
    <div class="container" style="max-width: 800px;">
      <nav class="breadcrumbs">
        <a href="#/" class="breadcrumb-link">Home</a>
        <span class="breadcrumb-separator">/</span>
        <span class="breadcrumb-current">Contact & Support</span>
      </nav>

      <div class="glass-panel" style="padding: 40px; margin-bottom: 40px;">
        <h1 style="font-size: 2.4rem; margin-bottom: 12px;">Get in Touch</h1>
        <p style="color: var(--text-secondary); margin-bottom: 28px;">
          Have questions, feedback, or want to submit an HTML5 game to KopiPlay? Fill out the form below and our team will get back to you promptly.
        </p>

        <form id="contact-form" style="display: flex; flex-direction: column; gap: 20px;">
          <div>
            <label for="contact-name" style="display: block; font-size: 0.9rem; font-weight: 600; margin-bottom: 6px;">Your Name</label>
            <input type="text" id="contact-name" required placeholder="Alex Mercer" style="width: 100%;" />
          </div>

          <div>
            <label for="contact-email" style="display: block; font-size: 0.9rem; font-weight: 600; margin-bottom: 6px;">Email Address</label>
            <input type="email" id="contact-email" required placeholder="alex@example.com" style="width: 100%;" />
          </div>

          <div>
            <label for="contact-topic" style="display: block; font-size: 0.9rem; font-weight: 600; margin-bottom: 6px;">Topic</label>
            <select id="contact-topic" style="width: 100%;">
              <option value="general">General Feedback</option>
              <option value="submit-game">Submit an HTML5 Game</option>
              <option value="bug-report">Report a Game Bug</option>
              <option value="licensing">Advertising & Partnership</option>
            </select>
          </div>

          <div>
            <label for="contact-message" style="display: block; font-size: 0.9rem; font-weight: 600; margin-bottom: 6px;">Your Message</label>
            <textarea id="contact-message" rows="5" required placeholder="Write your message or game submission details here..." style="width: 100%;"></textarea>
          </div>

          <button type="submit" class="btn btn-primary" style="align-self: flex-start; padding: 12px 32px;">
            <span>📨</span>
            <span>Send Message</span>
          </button>
        </form>
      </div>
    </div>
  `;
}

export function initContactEvents() {
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const name = document.getElementById('contact-name').value;
      showToast(`Thank you, ${name}! Your message has been received.`, '✅');
      form.reset();
    });
  }
}

export function renderPrivacyView() {
  return `
    <div class="container" style="max-width: 900px;">
      <nav class="breadcrumbs">
        <a href="#/" class="breadcrumb-link">Home</a>
        <span class="breadcrumb-separator">/</span>
        <span class="breadcrumb-current">Privacy Policy</span>
      </nav>

      <div class="glass-panel" style="padding: 40px; margin-bottom: 40px; line-height: 1.8;">
        <h1 style="font-size: 2.4rem; margin-bottom: 12px;">Privacy Policy</h1>
        <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 24px;">Last updated: October 2026</p>

        <h2 style="font-size: 1.3rem; margin-top: 24px; margin-bottom: 8px;">1. Information We Collect</h2>
        <p style="color: var(--text-secondary);">
          KopiPlay is committed to safeguarding visitor privacy. We do not require users to create an account or provide personal information to enjoy our browser gaming portal.
        </p>

        <h2 style="font-size: 1.3rem; margin-top: 24px; margin-bottom: 8px;">2. Local Storage Usage</h2>
        <p style="color: var(--text-secondary);">
          To enhance your experience, KopiPlay utilizes your browser's local storage to save your game favorites and recently played games. This information is saved solely on your local client device and is never uploaded to our servers.
        </p>

        <h2 style="font-size: 1.3rem; margin-top: 24px; margin-bottom: 8px;">3. Third-Party Game Embeds & Analytics</h2>
        <p style="color: var(--text-secondary);">
          Certain games may be embedded from authorized game developers. These third parties may utilize standard web technologies such as cookies according to their respective privacy policies.
        </p>

        <h2 style="font-size: 1.3rem; margin-top: 24px; margin-bottom: 8px;">4. Advertising Preparation</h2>
        <p style="color: var(--text-secondary);">
          Future advertising integrations with approved partners (e.g. Google AdSense) will adhere strictly to industry privacy standards and cookie consent regulations.
        </p>
      </div>
    </div>
  `;
}

export function renderTermsView() {
  return `
    <div class="container" style="max-width: 900px;">
      <nav class="breadcrumbs">
        <a href="#/" class="breadcrumb-link">Home</a>
        <span class="breadcrumb-separator">/</span>
        <span class="breadcrumb-current">Terms of Use</span>
      </nav>

      <div class="glass-panel" style="padding: 40px; margin-bottom: 40px; line-height: 1.8;">
        <h1 style="font-size: 2.4rem; margin-bottom: 12px;">Terms of Use</h1>
        <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 24px;">Effective date: October 2026</p>

        <h2 style="font-size: 1.3rem; margin-top: 24px; margin-bottom: 8px;">1. Acceptance of Terms</h2>
        <p style="color: var(--text-secondary);">
          By accessing or playing games on KopiPlay, you agree to comply with and be bound by these Terms of Use.
        </p>

        <h2 style="font-size: 1.3rem; margin-top: 24px; margin-bottom: 8px;">2. Intellectual Property Rights</h2>
        <p style="color: var(--text-secondary);">
          All portal graphics, brand logos, custom UI components, and software code are the intellectual property of KopiPlay. Games featured on the website are licensed, developed internally, or made available under appropriate developer authorizations.
        </p>

        <h2 style="font-size: 1.3rem; margin-top: 24px; margin-bottom: 8px;">3. Permitted Usage</h2>
        <p style="color: var(--text-secondary);">
          You may use KopiPlay for personal, non-commercial entertainment purposes. You agree not to disrupt, bypass iframe security protections, scrape, or reverse engineer platform services.
        </p>
      </div>
    </div>
  `;
}
