const fs = require('fs');
const path = require('path');

const OUT = path.join(__dirname, '..', 'out');

const LANGS = [
  'es','pt','fr','de','zh','ja','ar','ru','ko','id','it','tr','vi','pl',
  'nl','sv','da','no','fi','hr','el','cs','ro','hu','sk','uk','bg',
];

// Pages we expect to exist for every language
const REQUIRED_PAGES = [
  '',             // home
  'about',
  'contact',
  'privacy',
  'terms',
  'games',
  'templates',
  'learn',
  'learn/history-of-the-wheel',
  'blog',
  'for-teachers',
  'for-business',
  'for-events',
  'flip-a-coin',
  'dice-roller',
  'timer',
  'random-number-generator',
  'yes-no-wheel',
  'wheel-of-names',
  'decision-wheel',
];

// Content markers to verify pages show correct content (not generic fallback)
const CONTENT_CHECKS = {
  '': ['Spin the Wheel', 'WheelSpinner', 'gamewheelclub'],
  'about': ['Our Mission', 'About GameWheelClub'],
  'contact': ['Contact Us', 'Send Message'],
  'privacy': ['Privacy Policy', 'Information We Collect'],
  'terms': ['Terms of Service', 'Acceptance'],
  'games': ['Sports Wheels', 'Anime'],
  'templates': ['Decision Wheel Templates', 'Food'],
  'learn': ['Learn Hub', 'Knowledge'],
  'learn/history-of-the-wheel': ['Kleroterion', 'Rota Fortunae'],
  'blog': ['GameWheelClub Blog', 'Icebreaker'],
  'for-teachers': ['for Teachers', 'classroom'],
  'for-business': ['for Business', 'stand-ups'],
  'for-events': ['for Events', 'giveaways'],
  'flip-a-coin': ['Flip a Coin', 'Heads'],
  'dice-roller': ['Dice Roller', 'Roll'],
  'timer': ['Timer', 'countdown'],
  'random-number-generator': ['Random Number', 'Generator'],
  'yes-no-wheel': ['Yes or No', 'Binary'],
  'wheel-of-names': ['Wheel of Names', 'Name Picker'],
  'decision-wheel': ['Decision Wheel', 'Decision Maker'],
};

let totalChecks = 0;
let passed = 0;
let failed = [];

for (const lang of LANGS) {
  for (const page of REQUIRED_PAGES) {
    const filePath = page === ''
      ? path.join(OUT, lang, 'index.html')
      : path.join(OUT, lang, page, 'index.html');

    totalChecks++;

    if (!fs.existsSync(filePath)) {
      failed.push(`MISSING FILE: /${lang}/${page}`);
      continue;
    }

    const html = fs.readFileSync(filePath, 'utf8');
    const markers = CONTENT_CHECKS[page] || [];
    const hasContent = markers.length === 0 || markers.some(m => html.toLowerCase().includes(m.toLowerCase()));

    if (hasContent) {
      passed++;
    } else {
      failed.push(`WRONG CONTENT: /${lang}/${page} (expected one of: ${markers.join(', ')})`);
    }
  }
}

console.log('\n═══════════════════════════════════════════════════════');
console.log('  LANGUAGE PAGE VERIFICATION REPORT');
console.log('═══════════════════════════════════════════════════════');
console.log(`  Languages: ${LANGS.length}`);
console.log(`  Pages per language: ${REQUIRED_PAGES.length}`);
console.log(`  Total checks: ${totalChecks}`);
console.log(`  ✅ Passed: ${passed}`);
console.log(`  ❌ Failed: ${failed.length}`);
console.log('───────────────────────────────────────────────────────');

if (failed.length === 0) {
  console.log('  🎉 ALL PAGES VERIFIED SUCCESSFULLY!');
  console.log('     Site is ready for Hostinger deployment.');
} else {
  console.log('  FAILURES:');
  for (const f of failed) {
    console.log(`  • ${f}`);
  }
}
console.log('═══════════════════════════════════════════════════════\n');
