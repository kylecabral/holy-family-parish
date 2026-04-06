/**
 * Build script to inject components into HTML files
 * Run with: node build.js
 */

const fs = require('fs');
const path = require('path');

// Read the footer component (for index.html)
const footerPath = path.join(__dirname, 'components', 'footer.html');
let footerHTML = fs.readFileSync(footerPath, 'utf8');

// Footer for pages directory:
// - Links to index.html need ../ prefix
// - Links to pages/*.html need pages/ stripped (same directory)
const footerPagesHTML = footerHTML
    .replace(/href="index\.html/g, 'href="../index.html')
    .replace(/href="pages\//g, 'href="');

// Update index.html (in root)
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf8');
const updatedIndex = indexContent.replace(
    /<footer class="footer">[\s\S]*?<\/footer>\s*<script/,
    footerHTML.trim() + '\n\n    <script'
);
if (indexContent !== updatedIndex) {
    fs.writeFileSync(indexPath, updatedIndex);
    console.log('Updated: index.html');
} else {
    console.log('No changes: index.html');
}

// Update pages
const pagesDir = path.join(__dirname, 'pages');
const pageFiles = fs.readdirSync(pagesDir).filter(f => f.endsWith('.html'));

pageFiles.forEach(file => {
    const filePath = path.join(pagesDir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    const updated = content.replace(
        /<footer class="footer">[\s\S]*?<\/footer>\s*<script/,
        footerPagesHTML.trim() + '\n\n    <script'
    );

    if (content !== updated) {
        fs.writeFileSync(filePath, updated);
        console.log(`Updated: pages/${file}`);
    } else {
        console.log(`No changes: pages/${file}`);
    }
});

console.log('Build complete!');