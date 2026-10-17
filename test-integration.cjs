// APEX RECOMP: comprobaciones sin dependencias externas.
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const files=['storage.js','migration.js','training-utils.js','nutrition.js','recipes.js','backup-validator.js','profile.js','history-export.js','app.js','sw.js'];
for(const f of files){const s=fs.readFileSync(f,'utf8');new vm.Script(s,{filename:f});console.log('Sintaxis OK:',f);}
const read=(f)=>require('./'+f);
const T=read('training-utils.js'),S=read('storage.js'),B=read('backup-validator.js'),N=read('nutrition.js'),P=read('profile.js'),C=read('history-export.js');
const exercise={name:'Press banca',exerciseId:'press',sets:[{kg:60,reps:10,rir:2,done:true}]};
const old={schema:'apex-recomp/v1',sessions:[{id:'s1',date:'2026-10-10',status:'completed',title:'Pecho',exercises:[exercise]}],exercises:{press:{name:'Press banca'}}};
assert.equal(T.volume(old.sessions[0]).volume,600);
assert.equal(T.previousSets(old.sessions,{name:'Renombrado',exerciseId:'press'})[0].done,false);
assert.equal(T.marks(old.sessions,{name:'Renombrado',exerciseId:'press'}).length,1);
assert.equal(T.marks(old.sessions,{name:'Otro',exerciseId:'otro'}).length,0);
const copied=T.copyTemplate(old.sessions[0],'s2','2026-10-17');assert.equal(copied.exercises[0].sets[0].kg,'');assert.equal(old.sessions[0].exercises[0].sets[0].kg,60);
assert.equal(B.validate(old).sets,1);
assert.equal(B.merge(old,old).sessions.length,1);
assert.throws(()=>B.merge(old,{...old,sessions:[{...old.sessions[0],title:'Conflicto'}]}),/Conflicto/);
const memory=new Map();const store={getItem:k=>memory.get(k)||null,setItem:(k,v)=>memory.set(k,v)};
S.write(store,'data',old);assert.equal(S.read(store,'data').data.sessions.length,1);
assert.equal(N.totals([{id:'1',date:'2026-10-17',name:'Comida',kcal:300,protein:20,carbs:30,fat:10}], '2026-10-17').kcal,300);
assert.equal(P.balance({kcal:600},{kcal:2000}).kcal,1400);
assert.match(C.exportCSV(old.sessions),/Press banca/);
for(const f of ['index.html','manifest.webmanifest','icons/icon.svg'])assert.ok(fs.existsSync(f),'Falta '+f);
const html=fs.readFileSync('index.html','utf8');for(const f of files.filter(f=>f!=='sw.js'))assert.ok(html.includes('./'+f),'index.html no carga '+f);
const manifest=JSON.parse(fs.readFileSync('manifest.webmanifest','utf8'));assert.equal(manifest.start_url,'./');assert.equal(manifest.scope,'./');

const M=read('migration.js');
const personal={app:'Personal Recomp',schemaVersion:1,exportedAt:'2026-10-08',data:{sessions:[{id:'legacy-1',date:'2026-10-08',title:'Rutina importada',status:'completed',exercises:[{name:'Press banca',exerciseId:'press',sets:[{kg:70,reps:8,done:true}]}]}],exercises:{press:{name:'Press banca'}},profile:{}}};
assert.equal(M.validate(personal).sets,1);
const imported=M.migrate(personal);assert.equal(B.validate(imported).sessions,1);
assert.equal(imported.sessions[0].exercises[0].sets[0].kg,70);
const joined=B.merge(old,imported);assert.equal(joined.sessions.length,2);
assert.equal(joined.sessions.find(s=>s.id==='legacy-1').exercises[0].sets[0].reps,8);
assert.throws(()=>M.validate({app:'Personal Recomp',data:{sessions:[],exercises:[]}}),/Formato/);
assert.throws(()=>B.merge(old,{...old,sessions:[{...old.sessions[0],title:'Sobrescritura'}]}),/Conflicto/);
S.write(store,'data',joined);
assert.equal(S.read(store,'data').data.sessions.length,2);
store.setItem('data','{malformed');
const recovered=S.read(store,'data');
assert.equal(recovered.recovered,true);
assert.equal(recovered.data.sessions.length,1);
assert.match(C.exportCSV([{...old.sessions[0],title:'=HYPERLINK("evil")'}]),/'=HYPERLINK/);
console.log('Migración, fusión, conflictos y recuperación local verificados');

console.log('APEX RECOMP: pruebas de integración superadas');