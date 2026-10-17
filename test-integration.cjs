// APEX RECOMP: comprobaciones sin dependencias externas.
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const files=['storage.js','migration.js','training-utils.js','nutrition.js','recipes.js','coach.js','meal-planner.js','backup-validator.js','profile.js','history-export.js','app.js','sw.js'];
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
// El catálogo, los intercambios y la progresión se comprueban sin tocar datos reales.
const Meals=read('meal-planner.js'),Coach=read('coach.js');
assert.ok(Meals.catalog.length>1000);
assert.equal(new Set(Meals.catalog.map(r=>r.id)).size,Meals.catalog.length);
assert.equal(new Set(Meals.catalog.map(r=>r.name)).size,Meals.catalog.length);
assert.deepEqual(Object.keys(Meals.groups).map(c=>Meals.search('',c).length),[252,252,252,252]);
const menu=Meals.makePlan('2026-10-17',['leche'],'vegetarian');
assert.equal(Object.keys(menu).length,7);assert.ok(Meals.groceries(menu).length<35,'El menú debe reutilizar ingredientes en la compra');
for(const meals of Object.values(menu))for(const [category,id] of Object.entries(meals)){
  const recipe=Meals.byId.get(id);assert.equal(recipe.category,category);assert.equal(recipe.vegetarian,true);assert.equal(recipe.allergens.includes('leche'),false);
  const alternatives=Meals.exchange(id,['leche'],'vegetarian');assert.ok(alternatives.length>0);
  assert.ok(alternatives.every(r=>r.category===category&&r.vegetarian&&!r.allergens.includes('leche')));
}
assert.ok(Meals.total(menu,'2026-10-17').kcal>0);const shop=Meals.groceries(menu);assert.ok(shop.length>10&&shop.every(x=>x.grams>0));const firstMeal=menu['2026-10-17'].Desayuno,alt=Meals.exchange(firstMeal)[0];menu['2026-10-17'].Desayuno=alt.id;assert.notDeepEqual(Meals.groceries(menu),shop,'La compra debe reflejar el intercambio');assert.notDeepEqual(Meals.groceries(menu,2200),Meals.groceries(menu),'La compra debe reflejar las raciones ajustadas');
const settings={days:3,level:'inicial',goal:'musculo',equipment:'mancuernas',programId:'cycle-1'};
const first=Coach.session(settings,[],'train-1','2026-10-17');
assert.equal(first.exercises.length,5);assert.equal(first.exercises[0].pattern,'squat');assert.ok(Coach.alternatives(settings,'squat',first.exercises[0].name).some(x=>x.name==='Sentadilla sumo con mancuerna'));assert.ok(Coach.alternatives({...settings,equipment:'cuerpo'},'squat','Sentadilla a silla').some(x=>x.name==='Sentadilla al aire'));assert.equal(first.exercises[0].sets.length,2);
assert.equal(Coach.next(settings,[{...first,status:'completed'}]).day,1);
assert.equal(Coach.next({...settings,programId:'cycle-2'},[{...first,status:'completed'}]).day,0);
assert.equal(Coach.routine(settings,4,0).light,true);const marks={...first,status:'completed',exercises:[{...first.exercises[0],sets:[{kg:'20',reps:'12',done:true},{kg:'20',reps:'9',done:true}]}]};assert.match(Coach.suggested([marks],Coach.routine(settings,1,0).exercises[0]).note,/Repite la carga/);marks.exercises[0].sets[1].reps='12';assert.match(Coach.suggested([marks],Coach.routine(settings,1,0).exercises[0]).note,/aumento de carga/);
const withPlans={...old,coachProfile:settings,mealPreferences:{diet:'vegetarian',avoid:['leche']},mealSelections:menu};
withPlans.favoriteRecipes=[alt.id];withPlans.groceryChecked={'avena':true};withPlans.bodyWeights=[{date:'2026-10-17',kg:75}];const restored=B.merge(old,withPlans);assert.deepEqual(restored.favoriteRecipes,[alt.id]);assert.deepEqual(restored.bodyWeights,withPlans.bodyWeights);assert.throws(()=>B.validate({...withPlans,bodyWeights:'mal'}),/Medidas inválidas/);
assert.deepEqual(restored.mealSelections,menu);assert.deepEqual(restored.coachProfile,settings);
console.log('Programa de 8 semanas y 1008 recetas intercambiables verificados');
