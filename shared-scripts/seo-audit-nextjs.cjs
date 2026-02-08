const fs = require('fs');
const path = require('path');

console.log('\n🔍 Running Complete SEO Audit for Next.js...\n');

const results = {
    pass: 0,
    warning: 0,
    error: 0,
    checks: []
};

// Helper functions
function checkFile(filePath) {
    return fs.existsSync(path.join(process.cwd(), filePath));
}

function readFile(filePath) {
    try {
        return fs.readFileSync(path.join(process.cwd(), filePath), 'utf-8');
    } catch {
        return null;
    }
}

function addCheck(name, status, message) {
    results.checks.push({ name, status, message });
    results[status]++;
    
    const icon = status === 'pass' ? '✅' : status === 'warning' ? '⚠️' : '❌';
    console.log(`${icon} ${name}: ${message}`);
}

// 1. Check 404 Page
console.log('📄 Checking 404 Page...\n');
if (checkFile('app/not-found.tsx')) {
    const content = readFile('app/not-found.tsx');
    const hasNoIndex = /robots:\s*\{[^}]*index:\s*false/i.test(content);
    const hasLinks = /Link|href/.test(content);
    
    if (hasNoIndex && hasLinks) {
        addCheck('404 Page', 'pass', 'Properly configured with noindex and navigation');
    } else if (!hasNoIndex) {
        addCheck('404 Page', 'warning', 'Missing noindex in metadata');
    } else {
        addCheck('404 Page', 'warning', 'Missing navigation links');
    }
} else {
    addCheck('404 Page', 'error', 'not-found.tsx not found');
}

// 2. Check External CSS
console.log('\n🎨 Checking External CSS...\n');
const layoutContent = readFile('app/layout.tsx');
if (layoutContent) {
    const hasGoogleFonts = /fonts\.googleapis\.com/i.test(layoutContent);
    const hasChinaCDN = /fonts\.(font\.im|loli\.net|geekzu\.org)/i.test(layoutContent);
    
    if (hasGoogleFonts) {
        addCheck('External CSS', 'warning', 'Using Google Fonts (slow in China, consider fonts.font.im)');
    } else if (hasChinaCDN) {
        addCheck('External CSS', 'pass', 'Using China-friendly CDN for fonts');
    } else {
        addCheck('External CSS', 'pass', 'No external CSS dependencies');
    }
} else {
    addCheck('External CSS', 'error', 'Could not read layout.tsx');
}

// 3. Check External Images
console.log('\n🖼️  Checking External Images...\n');
const externalImages = [];

function scanForExternalImages(filePath) {
    const content = readFile(filePath);
    if (!content) return [];
    
    const findings = [];
    const patterns = [
        /src=["']https?:\/\/[^"']+\.(jpg|jpeg|png|gif|webp|svg|ico)[^"']*["']/gi,
        /https?:\/\/(picsum\.photos|unsplash\.com|placeholder\.com|via\.placeholder\.com|placehold\.it)[^\s"'`<>]*/gi,
    ];
    
    const lines = content.split('\n');
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        patterns.forEach(pattern => {
            const matches = [...line.matchAll(pattern)];
            matches.forEach(match => {
                let url = match[0];
                if (url.includes('src=')) {
                    url = url.match(/https?:\/\/[^\s"'`]+/)?.[0] || url;
                }
                findings.push({
                    file: path.basename(filePath),
                    line: i + 1,
                    url: url
                });
            });
        });
    }
    
    return findings;
}

// Scan component files
const componentFiles = ['app/layout.tsx', 'app/page.tsx', 'app/not-found.tsx'];
componentFiles.forEach(file => {
    if (checkFile(file)) {
        externalImages.push(...scanForExternalImages(file));
    }
});

// Scan all component files in components/
const componentsDir = path.join(process.cwd(), 'components');
if (fs.existsSync(componentsDir)) {
    const files = fs.readdirSync(componentsDir).filter(f => f.endsWith('.tsx') || f.endsWith('.ts'));
    files.forEach(file => {
        externalImages.push(...scanForExternalImages(`components/${file}`));
    });
}

if (externalImages.length === 0) {
    addCheck('External Images', 'pass', 'No external image dependencies');
} else {
    const domains = [...new Set(externalImages.map(img => {
        try {
            return new URL(img.url).hostname;
        } catch {
            return 'unknown';
        }
    }))];
    
    addCheck('External Images', 'warning', `Found ${externalImages.length} external image(s) from ${domains.length} domain(s)`);
    console.log('   Domains:', domains.join(', '));
    console.log('   💡 Consider downloading to /public/ for better performance');
}

// 4. Check Hardcoded Dates
console.log('\n📅 Checking Hardcoded Dates...\n');
const hardcodedDates = [];

function scanForHardcodedDates(filePath) {
    const content = readFile(filePath);
    if (!content) return [];
    
    const findings = [];
    const patterns = [
        /©\s*20\d{2}/g,
        /copyright\s+20\d{2}/gi,
        /\b(19|20)\d{2}\s*-\s*(19|20)\d{2}\b/g,
    ];
    
    const lines = content.split('\n');
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (line.trim().startsWith('//') || line.trim().startsWith('/*')) continue;
        
        patterns.forEach(pattern => {
            const matches = [...line.matchAll(pattern)];
            matches.forEach(match => {
                findings.push({
                    file: path.basename(filePath),
                    line: i + 1,
                    value: match[0]
                });
            });
        });
    }
    
    return findings;
}

[...componentFiles, 'components/InfoSection.tsx', 'components/FAQ.tsx'].forEach(file => {
    if (checkFile(file)) {
        hardcodedDates.push(...scanForHardcodedDates(file));
    }
});

if (hardcodedDates.length === 0) {
    addCheck('Hardcoded Dates', 'pass', 'No hardcoded dates found');
} else {
    addCheck('Hardcoded Dates', 'warning', `Found ${hardcodedDates.length} hardcoded date(s)`);
    hardcodedDates.forEach(date => {
        console.log(`   - ${date.file}:${date.line} → "${date.value}"`);
    });
    console.log('   💡 Consider using new Date().getFullYear()');
}

// 5. Check Meta Tags
console.log('\n🏷️  Checking Meta Tags...\n');
if (layoutContent) {
    const checks = {
        title: /title:/i.test(layoutContent),
        description: /description:/i.test(layoutContent),
        keywords: /keywords:/i.test(layoutContent),
        openGraph: /openGraph:/i.test(layoutContent),
        twitter: /twitter:/i.test(layoutContent),
        icons: /icons:/i.test(layoutContent)
    };
    
    const missing = Object.entries(checks).filter(([, found]) => !found).map(([tag]) => tag);
    
    if (missing.length === 0) {
        addCheck('Meta Tags', 'pass', 'All meta tags configured');
    } else {
        addCheck('Meta Tags', 'warning', `Missing: ${missing.join(', ')}`);
    }
}

// 5.5. Check Canonical URLs
console.log('\n🔗 Checking Canonical URLs...\n');
const pageFiles = [];
function findPageFiles(dir) {
    try {
        const files = fs.readdirSync(dir);
        files.forEach(file => {
            const filePath = path.join(dir, file);
            const stat = fs.statSync(filePath);
            if (stat.isDirectory()) {
                findPageFiles(filePath);
            } else if (file === 'page.tsx' || file === 'layout.tsx') {
                pageFiles.push(filePath);
            }
        });
    } catch (e) {
        // Directory doesn't exist
    }
}

findPageFiles(path.join(process.cwd(), 'app'));

let canonicalCount = 0;
let totalPages = 0;

pageFiles.forEach(file => {
    // Convert absolute path to relative path
    const relativePath = path.relative(process.cwd(), file);
    const content = readFile(relativePath);
    if (!content) return;
    
    // Skip not-found.tsx (404 page doesn't need canonical)
    if (file.includes('not-found')) return;
    
    totalPages++;
    if (/canonical:/i.test(content) || /alternates:\s*\{[^}]*canonical/i.test(content)) {
        canonicalCount++;
    }
});

if (canonicalCount === totalPages && totalPages > 0) {
    addCheck('Canonical URLs', 'pass', `All ${totalPages} page(s) have canonical URLs`);
} else if (canonicalCount > 0) {
    addCheck('Canonical URLs', 'warning', `${canonicalCount}/${totalPages} page(s) have canonical URLs`);
} else {
    addCheck('Canonical URLs', 'error', 'No canonical URLs found');
    console.log('   💡 Add alternates.canonical to metadata in each page.tsx');
}

// 6. Check Robots & Sitemap
console.log('\n🤖 Checking Robots & Sitemap...\n');
if (checkFile('app/robots.ts') || checkFile('public/robots.txt')) {
    addCheck('Robots.txt', 'pass', 'robots.txt configured');
} else {
    addCheck('Robots.txt', 'warning', 'No robots.txt found');
}

if (checkFile('app/sitemap.ts') || checkFile('public/sitemap.xml')) {
    addCheck('Sitemap', 'pass', 'sitemap.xml configured');
} else {
    addCheck('Sitemap', 'warning', 'No sitemap found');
}

// 7. Check Schema.org
console.log('\n📋 Checking Schema.org...\n');
const pageContent = readFile('app/page.tsx');
if (pageContent) {
    const hasSchema = /@context.*schema\.org/i.test(pageContent) || /application\/ld\+json/i.test(pageContent);
    if (hasSchema) {
        addCheck('Schema.org', 'pass', 'Structured data found');
    } else {
        addCheck('Schema.org', 'warning', 'No Schema.org markup found');
    }
}

// 8. Check Image Optimization
console.log('\n🖼️  Checking Image Optimization...\n');
let imgTagCount = 0;
let nextImageCount = 0;

function countImageUsage(filePath) {
    const content = readFile(filePath);
    if (!content) return;
    
    if (content.includes('next/image')) nextImageCount++;
    if (/<img[^>]+src=/i.test(content) && !content.includes('lucide-react')) imgTagCount++;
}

[...componentFiles, 'components/InfoSection.tsx', 'components/GameClient.tsx'].forEach(file => {
    if (checkFile(file)) {
        countImageUsage(file);
    }
});

if (imgTagCount === 0) {
    addCheck('Image Optimization', 'pass', `Using Next.js Image (${nextImageCount} file(s))`);
} else {
    addCheck('Image Optimization', 'warning', `Found ${imgTagCount} <img> tag(s)`);
}

// Summary
console.log('\n' + '='.repeat(60));
console.log('📊 SEO Audit Summary\n');
console.log(`Total Checks: ${results.checks.length}`);
console.log(`✅ Pass: ${results.pass}`);
console.log(`⚠️  Warnings: ${results.warning}`);
console.log(`❌ Errors: ${results.error}`);

const score = Math.round((results.pass / results.checks.length) * 100);
console.log(`\n📈 SEO Score: ${score}/100\n`);

if (score === 100) {
    console.log('🎉 Perfect! All checks passed!');
} else if (score >= 80) {
    console.log('✨ Great! Minor improvements recommended.');
} else if (score >= 60) {
    console.log('👍 Good, but there\'s room for improvement.');
} else {
    console.log('⚠️  Needs attention. Please fix the issues above.');
}

console.log('\n💡 Shared script from: h5games/shared-scripts/\n');
