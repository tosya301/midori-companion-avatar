import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {apps,families} from '../assets/shortcut-families/catalog.mjs';
const root=new URL('../',import.meta.url);
test('agent map matches every catalog app, family, context and source anchor',()=>{
  const map=JSON.parse(readFileSync(new URL('docs/app-integrations.json',root),'utf8'));
  assert.equal(map.app_count,Object.keys(apps).length);
  assert.equal(map.family_count,families.length);
  assert.equal(map.context_count,Object.values(apps).filter(a=>a.context).length);
  assert.deepEqual(map.families,families);
  assert.deepEqual(map.apps.map(a=>a.id).sort(),Object.keys(apps).sort());
  assert.equal(new Set(families.flatMap(f=>f.apps)).size,map.app_count);
  for(const entry of map.apps){
    const app=apps[entry.id];
    assert.equal(entry.name,app.fullName||app.name);
    assert.equal(entry.website,app.href||null);
    assert.equal(entry.context,app.context||null);
    assert.equal(entry.catalog_launch,app.launch||null);
    assert.equal(entry.family,families.find(f=>f.apps.includes(entry.id)).id);
    assert.equal(entry.native_account_integration_included,false);
    for(const source of entry.source_anchors)assert(existsSync(new URL(source.path,root)),source.path);
    const [file,anchor]=entry.public_integration_anchor.split('#');
    assert(readFileSync(new URL(file,root),'utf8').includes(`<a id="${anchor}"></a>`),entry.id);
  }
});
