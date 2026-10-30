const fs = require('fs');
const path = require('path');

// 1. UPDATE CSS/COMPONENTS.CSS WITH FOOTER & INFORMATIONAL PAGES & SEO STYLES
const cssPath = path.join(__dirname, '../css/components.css');
let cssContent = fs.readFileSync(cssPath, 'utf8');

// Replace footer styling with the new professional 4-column gaming portal footer
const footerCssRegex = /\/\* --------------------------------------------------------------------------\s*6\. Footer \(Clean Dark Theme\)[\s\S]*?(?=\/\* --------------------------------------------------------------------------\s*7\. Back to Top)/;

const newFooterCss = `/* --------------------------------------------------------------------------
   6. Professional 4-Column Gaming Portal Footer
   -------------------------------------------------------------------------- */
.site-footer {
  margin-top: auto;
  border-top: 1px solid var(--border-subtle);
  background: linear-gradient(180deg, rgba(14, 18, 27, 0.95) 0%, rgba(10, 13, 20, 1) 100%);
  padding: 56px 0 28px;
  position: relative;
  box-shadow: 0 -10px 40px rgba(0, 0, 0, 0.5);
}

.site-footer::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent 0%, rgba(37, 99, 235, 0.4) 50%, transparent 100%);
}

.container {
  width: 100%;
  max-width: var(--max-content-width);
  margin: 0 auto;
  padding: 0 28px;
  box-sizing: border-box;
}

.footer-top {
  display: grid;
  grid-template-columns: 2.2fr 1.2fr 1.2fr 1.2fr;
  gap: 48px;
  margin-bottom: 40px;
}

.footer-brand {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.footer-brand .footer-logo img {
  height: 38px;
  width: auto;
  display: block;
}

.footer-brand p {
  color: var(--text-secondary);
  font-size: 0.90rem;
  line-height: 1.65;
  margin: 0;
  max-width: 360px;
}

.footer-experience-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  background: rgba(37, 99, 235, 0.12);
  border: 1px solid rgba(56, 189, 248, 0.25);
  border-radius: var(--radius-full);
  font-size: 0.78rem;
  font-weight: 600;
  color: #38BDF8;
  width: fit-content;
}

.footer-experience-badge .pulse-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #10B981;
  box-shadow: 0 0 8px #10B981;
}

.footer-col h4 {
  font-family: var(--font-heading);
  font-size: 0.88rem;
  font-weight: 800;
  color: #FFFFFF;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  margin: 0 0 16px 0;
  position: relative;
  display: flex;
  align-items: center;
  gap: 6px;
}

.footer-links {
  display: flex;
  flex-direction: column;
  gap: 10px;
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-link {
  font-size: 0.86rem;
  color: var(--text-muted);
  text-decoration: none;
  transition: all var(--transition-fast);
  display: inline-flex;
  align-items: center;
  gap: 6px;
  width: fit-content;
}

.footer-link:hover {
  color: #38BDF8;
  transform: translateX(3px);
}

.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.07);
  padding-top: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;
  font-size: 0.82rem;
  color: var(--text-muted);
}

.footer-bottom-links {
  display: flex;
  align-items: center;
  gap: 20px;
}

.footer-bottom-links a {
  color: var(--text-muted);
  text-decoration: none;
  transition: color var(--transition-fast);
}

.footer-bottom-links a:hover {
  color: #38BDF8;
}

@media (max-width: 1024px) {
  .footer-top {
    grid-template-columns: 1fr 1fr;
    gap: 36px;
  }
}

@media (max-width: 640px) {
  .footer-top {
    grid-template-columns: 1fr;
    gap: 30px;
  }
  .site-footer {
    padding: 40px 0 24px;
  }
  .footer-bottom {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
}

`;

cssContent = cssContent.replace(footerCssRegex, newFooterCss);

// Add styles for the unified informational pages and SEO content sections
const extraStyles = `
/* --------------------------------------------------------------------------
   8. Unified Informational & Trust Pages Design System
   -------------------------------------------------------------------------- */
.info-page-container {
  max-width: 980px;
  margin: 0 auto;
  padding: 0 4px 60px;
}

.info-hero-header {
  margin-bottom: 28px;
}

.info-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 5px 12px;
  border-radius: var(--radius-full);
  background: rgba(37, 99, 235, 0.15);
  border: 1px solid rgba(56, 189, 248, 0.25);
  color: #38BDF8;
  font-size: 0.76rem;
  font-weight: 700;
  letter-spacing: 0.6px;
  text-transform: uppercase;
  margin-bottom: 12px;
}

.info-title {
  font-family: var(--font-heading);
  font-size: 2.2rem;
  font-weight: 900;
  color: #FFFFFF;
  margin: 0 0 12px 0;
  line-height: 1.2;
}

.info-title span {
  background: var(--accent-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.info-lead {
  font-size: 1.05rem;
  color: var(--text-secondary);
  line-height: 1.7;
  margin: 0;
  max-width: 820px;
}

.info-card {
  background: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
  padding: 32px;
  margin-bottom: 24px;
  box-shadow: 0 6px 28px rgba(0, 0, 0, 0.35);
}

.info-card h2 {
  font-family: var(--font-heading);
  font-size: 1.35rem;
  font-weight: 800;
  color: #FFFFFF;
  margin: 0 0 16px 0;
  display: flex;
  align-items: center;
  gap: 10px;
}

.info-card h3 {
  font-family: var(--font-heading);
  font-size: 1.1rem;
  font-weight: 700;
  color: #38BDF8;
  margin: 20px 0 8px 0;
}

.info-card p,
.info-card li {
  font-size: 0.94rem;
  color: var(--text-secondary);
  line-height: 1.75;
  margin-bottom: 12px;
}

.info-card ul {
  padding-left: 20px;
  margin-bottom: 16px;
}

.info-grid-3 {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 18px;
  margin: 20px 0;
}

.info-feature-box {
  background: var(--bg-card);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
  padding: 22px;
  border-left: 3px solid var(--accent-primary);
  transition: transform var(--transition-fast), border-color var(--transition-fast);
}

.info-feature-box:hover {
  transform: translateY(-2px);
  border-color: rgba(56, 189, 248, 0.4);
}

.info-feature-box h4 {
  font-family: var(--font-heading);
  font-size: 1.05rem;
  font-weight: 700;
  color: #FFFFFF;
  margin: 0 0 8px 0;
  display: flex;
  align-items: center;
  gap: 8px;
}

.info-feature-box p {
  color: var(--text-muted);
  font-size: 0.88rem;
  line-height: 1.6;
  margin: 0;
}

/* Contact & Support Cards */
.support-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 16px;
  margin-bottom: 28px;
}

.support-item-card {
  background: var(--bg-card);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.support-item-icon {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background: rgba(37, 99, 235, 0.15);
  color: #38BDF8;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 6px;
}

.support-item-title {
  font-family: var(--font-heading);
  font-size: 0.98rem;
  font-weight: 700;
  color: #FFFFFF;
}

.support-item-desc {
  font-size: 0.85rem;
  color: var(--text-muted);
  line-height: 1.5;
  margin: 0;
}

/* FAQ Accordion Component */
.faq-accordion {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 16px;
}

.faq-item {
  background: var(--bg-card);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
  overflow: hidden;
  transition: border-color var(--transition-fast);
}

.faq-item[open] {
  border-color: rgba(37, 99, 235, 0.4);
}

.faq-question {
  padding: 16px 20px;
  font-family: var(--font-heading);
  font-size: 0.96rem;
  font-weight: 700;
  color: #FFFFFF;
  cursor: pointer;
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  user-select: none;
}

.faq-question::-webkit-details-marker {
  display: none;
}

.faq-question::after {
  content: '+';
  font-size: 1.2rem;
  color: var(--accent-purple);
  transition: transform var(--transition-fast);
}

.faq-item[open] .faq-question::after {
  content: '−';
  color: #38BDF8;
}

.faq-answer {
  padding: 0 20px 18px;
  font-size: 0.90rem;
  color: var(--text-secondary);
  line-height: 1.7;
}

/* Homepage & Category SEO Rich Content Section */
.portal-seo-section {
  background: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
  padding: 36px 32px;
  margin: 36px 0 24px;
}

.portal-seo-section h2 {
  font-family: var(--font-heading);
  font-size: 1.6rem;
  font-weight: 800;
  color: #FFFFFF;
  margin: 0 0 14px 0;
}

.portal-seo-section h3 {
  font-family: var(--font-heading);
  font-size: 1.15rem;
  font-weight: 700;
  color: #38BDF8;
  margin: 24px 0 10px 0;
}

.portal-seo-section p {
  font-size: 0.92rem;
  color: var(--text-secondary);
  line-height: 1.75;
  margin-bottom: 14px;
}

.seo-highlight-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
  margin: 20px 0;
}

.seo-highlight-item {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-sm);
  padding: 16px;
}

.seo-highlight-item h4 {
  font-family: var(--font-heading);
  font-size: 0.92rem;
  font-weight: 700;
  color: #FFFFFF;
  margin: 0 0 6px 0;
}

.seo-highlight-item p {
  font-size: 0.84rem;
  color: var(--text-muted);
  line-height: 1.5;
  margin: 0;
}
`;

if (!cssContent.includes('.info-page-container')) {
  cssContent += '\n' + extraStyles;
}

fs.writeFileSync(cssPath, cssContent, 'utf8');
console.log('Updated css/components.css with premium footer and informational page styles.');

