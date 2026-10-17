'use strict';
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),vm=require('node:vm');
const required=['index.html','app.js','storage.js','migration.js','training-utils.js','nutrition.js','recipes.js','coach.js','meal-planner.js','backup-validator.js','profile.js','history-export.js','sw.js','manifest.webmanifest','icons/icon.svg'];
const out=path.resolve('dist');fs.rmSync(out,{recursive:true,force:true});fs.mkdirSync(out,{recursive:true});
for(const relative of required){
  const source=path.resolve(relative);
  assert.ok(fs.existsSync(source),'Falta '+relative);
  if(relative.endsWith('.js'))new vm.Script(fs.readFileSync(source,'utf8'),{filename:relative});
  const dest=path.join(out,relative);fs.mkdirSync(path.dirname(dest),{recursive:true});fs.copyFileSync(source,dest);
}
const html=fs.readFileSync('index.html','utf8');
for(const relative of required.filter(x=>x.endsWith('.js')&&x!=='sw.js'))assert.ok(html.includes('./'+relative),'No se carga '+relative);
const manifest=JSON.parse(fs.readFileSync('manifest.webmanifest','utf8'));
assert.equal(manifest.start_url,'./');assert.equal(manifest.scope,'./');
for(const icon of manifest.icons||[])assert.ok(fs.existsSync(path.join(out,icon.src)),'Icono ausente '+icon.src);
const sw=fs.readFileSync('sw.js','utf8');
for(const relative of required.filter(x=>x!=='sw.js'))assert.ok(sw.includes(relative),'No se precachea '+relative);
assert.ok(!fs.readdirSync(out).includes('test-integration.cjs'));
console.log('Distribución validada:',required.length,'archivos públicos, sin pruebas ni datos personales.');
