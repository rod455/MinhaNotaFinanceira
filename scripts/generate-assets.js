const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const ASSETS_DIR = path.join(__dirname, '..', 'assets');

// Colors from theme
const NAVY = '#0B1838';
const NAVY_LIGHT = '#132248';
const GOLD = '#F5A820';
const GOLD_LIGHT = '#FFD073';
const CYAN = '#17C8E8';
const GREEN = '#1DBE75';
const WHITE = '#FFFFFF';
const GRAY = '#9AA5B4';

// ─── APP ICON (1024x1024) ───
function generateAppIcon() {
  const size = 1024;
  const svg = `
<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${NAVY};stop-opacity:1"/>
      <stop offset="100%" style="stop-color:#0A1230;stop-opacity:1"/>
    </linearGradient>
    <linearGradient id="ring" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${GOLD};stop-opacity:1"/>
      <stop offset="100%" style="stop-color:${GOLD_LIGHT};stop-opacity:1"/>
    </linearGradient>
    <linearGradient id="bar1" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:${CYAN};stop-opacity:1"/>
      <stop offset="100%" style="stop-color:#1090B0;stop-opacity:1"/>
    </linearGradient>
    <linearGradient id="bar2" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:${GOLD};stop-opacity:1"/>
      <stop offset="100%" style="stop-color:#D08A10;stop-opacity:1"/>
    </linearGradient>
    <linearGradient id="bar3" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:${GREEN};stop-opacity:1"/>
      <stop offset="100%" style="stop-color:#159955;stop-opacity:1"/>
    </linearGradient>
    <filter id="shadow" x="-10%" y="-10%" width="120%" height="130%">
      <feDropShadow dx="0" dy="4" stdDeviation="8" flood-color="#000" flood-opacity="0.3"/>
    </filter>
  </defs>

  <!-- Background -->
  <rect width="${size}" height="${size}" rx="220" fill="url(#bg)"/>

  <!-- Subtle grid pattern -->
  <g opacity="0.04">
    ${Array.from({length: 20}, (_, i) => `<line x1="0" y1="${i * 54}" x2="${size}" y2="${i * 54}" stroke="${WHITE}" stroke-width="1"/>`).join('')}
    ${Array.from({length: 20}, (_, i) => `<line x1="${i * 54}" y1="0" x2="${i * 54}" y2="${size}" stroke="${WHITE}" stroke-width="1"/>`).join('')}
  </g>

  <!-- Score circle (outer ring) -->
  <circle cx="512" cy="420" r="240" fill="none" stroke="url(#ring)" stroke-width="28" opacity="0.15"/>
  <circle cx="512" cy="420" r="240" fill="none" stroke="url(#ring)" stroke-width="28"
    stroke-dasharray="1130" stroke-dashoffset="400" stroke-linecap="round"/>

  <!-- Inner circle background -->
  <circle cx="512" cy="420" r="200" fill="${NAVY_LIGHT}" opacity="0.8"/>

  <!-- Chart bars inside circle -->
  <g filter="url(#shadow)">
    <rect x="382" y="440" width="60" height="130" rx="10" fill="url(#bar1)"/>
    <rect x="462" y="360" width="60" height="210" rx="10" fill="url(#bar2)"/>
    <rect x="542" y="310" width="60" height="260" rx="10" fill="url(#bar3)"/>
  </g>

  <!-- Trend line -->
  <polyline points="412,430 492,350 572,300" fill="none" stroke="${WHITE}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" opacity="0.9"/>
  <circle cx="412" cy="430" r="8" fill="${WHITE}"/>
  <circle cx="492" cy="350" r="8" fill="${WHITE}"/>
  <circle cx="572" cy="300" r="8" fill="${WHITE}"/>

  <!-- Score arc decoration (partial golden arc) -->
  <path d="M 330 580 A 240 240 0 0 1 694 580" fill="none" stroke="${GOLD}" stroke-width="6" opacity="0.3" stroke-linecap="round"/>

  <!-- Text: "MNF" -->
  <text x="512" y="780" font-family="Arial Black, Arial, Helvetica, sans-serif" font-weight="900" font-size="110" fill="${WHITE}" text-anchor="middle" letter-spacing="12">MNF</text>

  <!-- Gold underline accent -->
  <rect x="370" y="800" width="284" height="8" rx="4" fill="${GOLD}"/>

  <!-- Small text -->
  <text x="512" y="860" font-family="Arial, Helvetica, sans-serif" font-weight="600" font-size="40" fill="${GRAY}" text-anchor="middle" letter-spacing="6">NOTA FINANCEIRA</text>
</svg>`;

  return sharp(Buffer.from(svg)).png().toFile(path.join(ASSETS_DIR, 'icon.png'));
}

// ─── ADAPTIVE ICON FOREGROUND (1024x1024, with safe zone) ───
function generateAdaptiveForeground() {
  const size = 1024;
  // Adaptive icons need content within the center 66% (safe zone)
  const svg = `
<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="ring" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${GOLD};stop-opacity:1"/>
      <stop offset="100%" style="stop-color:${GOLD_LIGHT};stop-opacity:1"/>
    </linearGradient>
    <linearGradient id="bar1" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:${CYAN};stop-opacity:1"/>
      <stop offset="100%" style="stop-color:#1090B0;stop-opacity:1"/>
    </linearGradient>
    <linearGradient id="bar2" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:${GOLD};stop-opacity:1"/>
      <stop offset="100%" style="stop-color:#D08A10;stop-opacity:1"/>
    </linearGradient>
    <linearGradient id="bar3" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:${GREEN};stop-opacity:1"/>
      <stop offset="100%" style="stop-color:#159955;stop-opacity:1"/>
    </linearGradient>
  </defs>

  <!-- Transparent background -->
  <rect width="${size}" height="${size}" fill="transparent"/>

  <!-- Score circle -->
  <circle cx="512" cy="440" r="200" fill="none" stroke="url(#ring)" stroke-width="24" opacity="0.15"/>
  <circle cx="512" cy="440" r="200" fill="none" stroke="url(#ring)" stroke-width="24"
    stroke-dasharray="940" stroke-dashoffset="330" stroke-linecap="round"/>

  <!-- Inner circle -->
  <circle cx="512" cy="440" r="165" fill="${NAVY_LIGHT}" opacity="0.6"/>

  <!-- Chart bars -->
  <rect x="402" y="450" width="50" height="110" rx="8" fill="url(#bar1)"/>
  <rect x="472" y="380" width="50" height="180" rx="8" fill="url(#bar2)"/>
  <rect x="542" y="340" width="50" height="220" rx="8" fill="url(#bar3)"/>

  <!-- Trend line -->
  <polyline points="427,442 497,372 567,332" fill="none" stroke="${WHITE}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" opacity="0.9"/>
  <circle cx="427" cy="442" r="7" fill="${WHITE}"/>
  <circle cx="497" cy="372" r="7" fill="${WHITE}"/>
  <circle cx="567" cy="332" r="7" fill="${WHITE}"/>

  <!-- Text -->
  <text x="512" y="740" font-family="Arial Black, Arial, Helvetica, sans-serif" font-weight="900" font-size="88" fill="${WHITE}" text-anchor="middle" letter-spacing="10">MNF</text>
  <rect x="390" y="758" width="244" height="6" rx="3" fill="${GOLD}"/>
</svg>`;

  return sharp(Buffer.from(svg)).png().toFile(path.join(ASSETS_DIR, 'android-icon-foreground.png'));
}

// ─── ADAPTIVE ICON BACKGROUND (1024x1024) ───
function generateAdaptiveBackground() {
  const size = 1024;
  const svg = `
<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${NAVY};stop-opacity:1"/>
      <stop offset="100%" style="stop-color:#060D1F;stop-opacity:1"/>
    </linearGradient>
  </defs>
  <rect width="${size}" height="${size}" fill="url(#bg)"/>
  <g opacity="0.03">
    ${Array.from({length: 25}, (_, i) => `<line x1="0" y1="${i * 42}" x2="${size}" y2="${i * 42}" stroke="${WHITE}" stroke-width="1"/>`).join('')}
    ${Array.from({length: 25}, (_, i) => `<line x1="${i * 42}" y1="0" x2="${i * 42}" y2="${size}" stroke="${WHITE}" stroke-width="1"/>`).join('')}
  </g>
</svg>`;

  return sharp(Buffer.from(svg)).png().toFile(path.join(ASSETS_DIR, 'android-icon-background.png'));
}

// ─── MONOCHROME ICON (1024x1024) ───
function generateMonochrome() {
  const size = 1024;
  const svg = `
<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${size}" height="${size}" fill="transparent"/>
  <circle cx="512" cy="440" r="200" fill="none" stroke="white" stroke-width="24"
    stroke-dasharray="940" stroke-dashoffset="330" stroke-linecap="round"/>
  <circle cx="512" cy="440" r="165" fill="white" opacity="0.1"/>
  <rect x="402" y="450" width="50" height="110" rx="8" fill="white"/>
  <rect x="472" y="380" width="50" height="180" rx="8" fill="white"/>
  <rect x="542" y="340" width="50" height="220" rx="8" fill="white"/>
  <polyline points="427,442 497,372 567,332" fill="none" stroke="white" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" opacity="0.7"/>
  <text x="512" y="740" font-family="Arial Black, Arial, Helvetica, sans-serif" font-weight="900" font-size="88" fill="white" text-anchor="middle" letter-spacing="10">MNF</text>
  <rect x="390" y="758" width="244" height="6" rx="3" fill="white"/>
</svg>`;

  return sharp(Buffer.from(svg)).png().toFile(path.join(ASSETS_DIR, 'android-icon-monochrome.png'));
}

// ─── SPLASH ICON (288x288 — used by Expo splash) ───
function generateSplashIcon() {
  const size = 288;
  const svg = `
<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="ring" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${GOLD};stop-opacity:1"/>
      <stop offset="100%" style="stop-color:${GOLD_LIGHT};stop-opacity:1"/>
    </linearGradient>
  </defs>
  <rect width="${size}" height="${size}" fill="${NAVY}"/>
  <circle cx="144" cy="110" r="70" fill="none" stroke="url(#ring)" stroke-width="8" opacity="0.15"/>
  <circle cx="144" cy="110" r="70" fill="none" stroke="url(#ring)" stroke-width="8"
    stroke-dasharray="330" stroke-dashoffset="115" stroke-linecap="round"/>
  <circle cx="144" cy="110" r="56" fill="${NAVY_LIGHT}" opacity="0.8"/>
  <rect x="112" y="116" width="16" height="36" rx="3" fill="${CYAN}"/>
  <rect x="134" y="96" width="16" height="56" rx="3" fill="${GOLD}"/>
  <rect x="156" y="82" width="16" height="70" rx="3" fill="${GREEN}"/>
  <polyline points="120,112 142,92 164,78" fill="none" stroke="${WHITE}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" opacity="0.9"/>
  <circle cx="120" cy="112" r="3" fill="${WHITE}"/>
  <circle cx="142" cy="92" r="3" fill="${WHITE}"/>
  <circle cx="164" cy="78" r="3" fill="${WHITE}"/>
  <text x="144" y="222" font-family="Arial, Helvetica, sans-serif" font-weight="800" font-size="22" fill="${WHITE}" text-anchor="middle">Minha Nota</text>
  <text x="144" y="250" font-family="Arial, Helvetica, sans-serif" font-weight="800" font-size="22" fill="${GOLD}" text-anchor="middle">Financeira</text>
  <text x="144" y="276" font-family="Arial, Helvetica, sans-serif" font-weight="500" font-size="11" fill="${GRAY}" text-anchor="middle" letter-spacing="2">DIAGNÓSTICO EM 60s</text>
</svg>`;

  return sharp(Buffer.from(svg)).png().toFile(path.join(ASSETS_DIR, 'splash-icon.png'));
}

// ─── FAVICON (48x48) ───
function generateFavicon() {
  const size = 48;
  const svg = `
<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${size}" height="${size}" rx="8" fill="${NAVY}"/>
  <circle cx="24" cy="22" r="14" fill="none" stroke="${GOLD}" stroke-width="3"
    stroke-dasharray="66" stroke-dashoffset="23" stroke-linecap="round"/>
  <rect x="16" y="24" width="5" height="10" rx="1" fill="${CYAN}"/>
  <rect x="22" y="19" width="5" height="15" rx="1" fill="${GOLD}"/>
  <rect x="28" y="15" width="5" height="19" rx="1" fill="${GREEN}"/>
  <text x="24" y="46" font-family="Arial, sans-serif" font-weight="900" font-size="8" fill="${WHITE}" text-anchor="middle">MNF</text>
</svg>`;

  return sharp(Buffer.from(svg)).png().toFile(path.join(ASSETS_DIR, 'favicon.png'));
}

// ─── PLAY STORE FEATURE GRAPHIC (1024x500) ───
function generateFeatureGraphic() {
  const w = 1024, h = 500;
  const svg = `
<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${NAVY};stop-opacity:1"/>
      <stop offset="100%" style="stop-color:#060D1F;stop-opacity:1"/>
    </linearGradient>
    <linearGradient id="gold_grad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:${GOLD};stop-opacity:1"/>
      <stop offset="100%" style="stop-color:${GOLD_LIGHT};stop-opacity:1"/>
    </linearGradient>
    <filter id="glow">
      <feGaussianBlur stdDeviation="15" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>

  <!-- Background -->
  <rect width="${w}" height="${h}" fill="url(#bg)"/>

  <!-- Grid pattern -->
  <g opacity="0.03">
    ${Array.from({length: 20}, (_, i) => `<line x1="0" y1="${i * 28}" x2="${w}" y2="${i * 28}" stroke="${WHITE}" stroke-width="1"/>`).join('')}
    ${Array.from({length: 40}, (_, i) => `<line x1="${i * 28}" y1="0" x2="${i * 28}" y2="${h}" stroke="${WHITE}" stroke-width="1"/>`).join('')}
  </g>

  <!-- Decorative circles -->
  <circle cx="820" cy="250" r="180" fill="${GOLD}" opacity="0.03"/>
  <circle cx="850" cy="230" r="120" fill="${GOLD}" opacity="0.05"/>
  <circle cx="100" cy="400" r="100" fill="${CYAN}" opacity="0.03"/>

  <!-- Score circle on right -->
  <g filter="url(#glow)">
    <circle cx="800" cy="250" r="130" fill="none" stroke="${GOLD}" stroke-width="16" opacity="0.12"/>
    <circle cx="800" cy="250" r="130" fill="none" stroke="${GOLD}" stroke-width="16"
      stroke-dasharray="615" stroke-dashoffset="215" stroke-linecap="round"/>
  </g>
  <circle cx="800" cy="250" r="105" fill="${NAVY_LIGHT}" opacity="0.7"/>

  <!-- Mini chart inside circle -->
  <rect x="752" y="262" width="26" height="60" rx="5" fill="${CYAN}"/>
  <rect x="786" y="222" width="26" height="100" rx="5" fill="${GOLD}"/>
  <rect x="820" y="196" width="26" height="126" rx="5" fill="${GREEN}"/>
  <polyline points="765,255 799,215 833,190" fill="none" stroke="${WHITE}" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" opacity="0.8"/>
  <circle cx="765" cy="255" r="5" fill="${WHITE}"/>
  <circle cx="799" cy="215" r="5" fill="${WHITE}"/>
  <circle cx="833" cy="190" r="5" fill="${WHITE}"/>

  <!-- Score text under circle -->
  <text x="800" y="415" font-family="Arial, Helvetica, sans-serif" font-weight="800" font-size="36" fill="${GOLD}" text-anchor="middle">38/100</text>
  <text x="800" y="445" font-family="Arial, Helvetica, sans-serif" font-weight="500" font-size="16" fill="${GRAY}" text-anchor="middle">Sua nota</text>

  <!-- Left side text -->
  <text x="60" y="150" font-family="Arial, Helvetica, sans-serif" font-weight="800" font-size="48" fill="${WHITE}">Minha Nota</text>
  <text x="60" y="210" font-family="Arial, Helvetica, sans-serif" font-weight="800" font-size="48" fill="url(#gold_grad)">Financeira</text>

  <!-- Tagline -->
  <text x="60" y="270" font-family="Arial, Helvetica, sans-serif" font-weight="500" font-size="22" fill="${GRAY}">Descubra sua nota financeira</text>
  <text x="60" y="300" font-family="Arial, Helvetica, sans-serif" font-weight="500" font-size="22" fill="${GRAY}">em 60 segundos. Sem cadastro.</text>

  <!-- Feature pills -->
  <rect x="60" y="340" width="150" height="36" rx="18" fill="${GOLD}" opacity="0.15"/>
  <text x="135" y="364" font-family="Arial, Helvetica, sans-serif" font-weight="700" font-size="14" fill="${GOLD}" text-anchor="middle">100% Gratuito</text>

  <rect x="225" y="340" width="160" height="36" rx="18" fill="${CYAN}" opacity="0.15"/>
  <text x="305" y="364" font-family="Arial, Helvetica, sans-serif" font-weight="700" font-size="14" fill="${CYAN}" text-anchor="middle">Plano de Ação</text>

  <rect x="400" y="340" width="170" height="36" rx="18" fill="${GREEN}" opacity="0.15"/>
  <text x="485" y="364" font-family="Arial, Helvetica, sans-serif" font-weight="700" font-size="14" fill="${GREEN}" text-anchor="middle">Resultado Rápido</text>

  <!-- Bottom accent line -->
  <rect x="60" y="420" width="500" height="3" rx="1.5" fill="${GOLD}" opacity="0.3"/>

  <!-- Stats -->
  <text x="60" y="465" font-family="Arial, Helvetica, sans-serif" font-weight="700" font-size="16" fill="${WHITE}">80% das famílias brasileiras estão endividadas.</text>
  <text x="555" y="465" font-family="Arial, Helvetica, sans-serif" font-weight="700" font-size="16" fill="${GOLD}">E você?</text>
</svg>`;

  return sharp(Buffer.from(svg)).png().toFile(path.join(ASSETS_DIR, 'feature-graphic.png'));
}

// ─── PROMOTIONAL BANNER (1280x640 — for social/TikTok) ───
function generatePromoBanner() {
  const w = 1280, h = 640;
  const svg = `
<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${NAVY};stop-opacity:1"/>
      <stop offset="100%" style="stop-color:#060D1F;stop-opacity:1"/>
    </linearGradient>
    <linearGradient id="gold_grad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:${GOLD};stop-opacity:1"/>
      <stop offset="100%" style="stop-color:${GOLD_LIGHT};stop-opacity:1"/>
    </linearGradient>
    <filter id="glow">
      <feGaussianBlur stdDeviation="20" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>

  <!-- Background -->
  <rect width="${w}" height="${h}" fill="url(#bg)"/>

  <!-- Decorative elements -->
  <circle cx="1050" cy="320" r="280" fill="${GOLD}" opacity="0.02"/>
  <circle cx="1050" cy="320" r="200" fill="${GOLD}" opacity="0.03"/>
  <circle cx="150" cy="550" r="150" fill="${CYAN}" opacity="0.02"/>

  <!-- Grid -->
  <g opacity="0.025">
    ${Array.from({length: 24}, (_, i) => `<line x1="0" y1="${i * 28}" x2="${w}" y2="${i * 28}" stroke="${WHITE}" stroke-width="1"/>`).join('')}
    ${Array.from({length: 48}, (_, i) => `<line x1="${i * 28}" y1="0" x2="${i * 28}" y2="${h}" stroke="${WHITE}" stroke-width="1"/>`).join('')}
  </g>

  <!-- Score gauge on right -->
  <g filter="url(#glow)">
    <circle cx="1000" cy="280" r="160" fill="none" stroke="${GOLD}" stroke-width="20" opacity="0.1"/>
    <circle cx="1000" cy="280" r="160" fill="none" stroke="${GOLD}" stroke-width="20"
      stroke-dasharray="755" stroke-dashoffset="265" stroke-linecap="round"/>
  </g>
  <circle cx="1000" cy="280" r="130" fill="${NAVY_LIGHT}" opacity="0.7"/>

  <!-- Chart bars -->
  <rect x="942" y="296" width="30" height="72" rx="6" fill="${CYAN}"/>
  <rect x="980" y="248" width="30" height="120" rx="6" fill="${GOLD}"/>
  <rect x="1018" y="216" width="30" height="152" rx="6" fill="${GREEN}"/>
  <polyline points="957,288 995,240 1033,210" fill="none" stroke="${WHITE}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" opacity="0.8"/>
  <circle cx="957" cy="288" r="6" fill="${WHITE}"/>
  <circle cx="995" cy="240" r="6" fill="${WHITE}"/>
  <circle cx="1033" cy="210" r="6" fill="${WHITE}"/>

  <!-- Score -->
  <text x="1000" y="490" font-family="Arial, Helvetica, sans-serif" font-weight="800" font-size="44" fill="${GOLD}" text-anchor="middle">38/100</text>
  <text x="1000" y="525" font-family="Arial, Helvetica, sans-serif" font-weight="500" font-size="20" fill="${GRAY}" text-anchor="middle">Qual é a sua nota?</text>

  <!-- Left text -->
  <text x="80" y="160" font-family="Arial, Helvetica, sans-serif" font-weight="800" font-size="64" fill="${WHITE}">Minha Nota</text>
  <text x="80" y="236" font-family="Arial, Helvetica, sans-serif" font-weight="800" font-size="64" fill="url(#gold_grad)">Financeira</text>

  <!-- Separator -->
  <rect x="80" y="266" width="380" height="4" rx="2" fill="${GOLD}" opacity="0.4"/>

  <!-- Subtitle -->
  <text x="80" y="320" font-family="Arial, Helvetica, sans-serif" font-weight="500" font-size="26" fill="${GRAY}">Descubra sua nota financeira</text>
  <text x="80" y="356" font-family="Arial, Helvetica, sans-serif" font-weight="500" font-size="26" fill="${GRAY}">em 60 segundos.</text>

  <!-- Feature badges -->
  <rect x="80" y="400" width="160" height="42" rx="21" fill="${GOLD}" opacity="0.15"/>
  <text x="160" y="427" font-family="Arial, Helvetica, sans-serif" font-weight="700" font-size="16" fill="${GOLD}" text-anchor="middle">Sem cadastro</text>

  <rect x="260" y="400" width="140" height="42" rx="21" fill="${GREEN}" opacity="0.15"/>
  <text x="330" y="427" font-family="Arial, Helvetica, sans-serif" font-weight="700" font-size="16" fill="${GREEN}" text-anchor="middle">Gratuito</text>

  <rect x="420" y="400" width="190" height="42" rx="21" fill="${CYAN}" opacity="0.15"/>
  <text x="515" y="427" font-family="Arial, Helvetica, sans-serif" font-weight="700" font-size="16" fill="${CYAN}" text-anchor="middle">Plano de ação</text>

  <!-- Bottom CTA -->
  <rect x="80" y="500" width="400" height="56" rx="28" fill="${GOLD}"/>
  <text x="280" y="535" font-family="Arial, Helvetica, sans-serif" font-weight="800" font-size="22" fill="${NAVY}" text-anchor="middle">BAIXE AGORA — PLAY STORE</text>

  <!-- Bottom stat -->
  <text x="80" y="600" font-family="Arial, Helvetica, sans-serif" font-weight="500" font-size="18" fill="${GRAY}">80% das famílias estão endividadas.</text>
  <text x="485" y="600" font-family="Arial, Helvetica, sans-serif" font-weight="700" font-size="18" fill="${GOLD}">Descubra onde você está.</text>
</svg>`;

  return sharp(Buffer.from(svg)).png().toFile(path.join(ASSETS_DIR, 'promo-banner.png'));
}

async function main() {
  console.log('Generating app assets...\n');

  await generateAppIcon();
  console.log('✓ icon.png (1024x1024)');

  await generateAdaptiveForeground();
  console.log('✓ android-icon-foreground.png (1024x1024)');

  await generateAdaptiveBackground();
  console.log('✓ android-icon-background.png (1024x1024)');

  await generateMonochrome();
  console.log('✓ android-icon-monochrome.png (1024x1024)');

  await generateSplashIcon();
  console.log('✓ splash-icon.png (288x288)');

  await generateFavicon();
  console.log('✓ favicon.png (48x48)');

  await generateFeatureGraphic();
  console.log('✓ feature-graphic.png (1024x500)');

  await generatePromoBanner();
  console.log('✓ promo-banner.png (1280x640)');

  console.log('\nAll assets generated successfully!');
}

main().catch(console.error);
