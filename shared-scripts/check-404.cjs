const fs = require('fs');
const path = require('path');

console.log('\n🚫 Checking 404 Page Configuration...\n');

const notFoundPath = path.join(process.cwd(), 'app', 'not-found.tsx');

if (!fs.existsSync(notFoundPath)) {
    console.log('❌ not-found.tsx not found in app directory');
    console.log('   Recommendation: Create app/not-found.tsx for better UX');
    process.exit(1);
}

const content = fs.readFileSync(notFoundPath, 'utf-8');

// Check for noindex
const hasNoIndex = /robots:\s*\{[^}]*index:\s*false/i.test(content) || 
                  /noindex/i.test(content);

// Check for metadata
const hasMetadata = /export\s+const\s+metadata/i.test(content);

// Check for navigation links
const hasLinks = /Link/.test(content) || /href/.test(content);

console.log('📄 404 Page Status:\n');
console.log(`  File exists: ✅ YES`);
console.log(`  Has metadata: ${hasMetadata ? '✅ YES' : '⚠️  NO'}`);
console.log(`  Has noindex: ${hasNoIndex ? '✅ YES' : '⚠️  NO (404 should not be indexed)'}`);
console.log(`  Has navigation: ${hasLinks ? '✅ YES' : '⚠️  NO (should link to home)'}`);

if (hasNoIndex && hasLinks) {
    console.log('\n✅ 404 Page is properly configured!\n');
} else {
    console.log('\n⚠️  404 Page needs improvements (see above)\n');
}

console.log('💡 Shared script from: h5games/shared-scripts/\n');
