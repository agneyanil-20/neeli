const fs = require('fs');

let content = fs.readFileSync('index.html', 'utf8');

// 1. Map CSS
content = content.replace(/#map\{[^}]+\}/, "#map{position:fixed;top:0;left:0;width:100%;height:100vh;z-index:1;background:var(--bg);opacity:1;visibility:visible;}");

// 2. Remove backdrop-filter everywhere
content = content.replace(/backdrop-filter:[^;]+;/g, '');
content = content.replace(/-webkit-backdrop-filter:[^;]+;/g, '');

// 3. Make semi-transparent elements more opaque to avoid needing blur
content = content.replace(/background:var\(--glass\);/g, 'background:rgba(10,10,10,0.95);');
content = content.replace(/background:rgba\(0,0,0,\.92\);/g, 'background:rgba(0,0,0,0.98);');
content = content.replace(/background:rgba\(6,6,6,\.92\);/g, 'background:rgba(6,6,6,0.98);');
content = content.replace(/background:rgba\(10,10,10,0\.94\);/g, 'background:rgba(10,10,10,0.98);');
content = content.replace(/background:rgba\(6,6,6,0\.96\);/g, 'background:rgba(6,6,6,0.98);');

// 4. Remove Fog and Pts
content = content.replace('<div id="fog"></div>', '');
content = content.replace('<div id="pts"></div>', '');
content = content.replace(/for\s*\(var\s+i\s*=\s*0;\s*i\s*<\s*18;\s*i\+\+\)\s*\{[^}]+\}/, '');
content = content.replace(/var pts=document.getElementById\('pts'\);/, '');

// 5. Disable generateDangerZones logic
content = content.replace('function generateDangerZones(center) {', 'function generateDangerZones(center) { return; ');

// Write back
fs.writeFileSync('index.html', content);
console.log('Emergency cleanup applied.');
