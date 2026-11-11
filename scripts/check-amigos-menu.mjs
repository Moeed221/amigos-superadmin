import assert from 'node:assert/strict';
import fs from 'node:fs';
import {join} from 'node:path';
const read=p=>JSON.parse(fs.readFileSync(new URL(p,import.meta.url),'utf8'));
const items=read('../src/data/menu.seed.json').items;
const cats=read('../src/data/categories.json');
const product=items.filter(p=>p.category!=='deals');
const deals=items.filter(p=>p.category==='deals');
assert.equal(product.length,268,'Expected 268 priced variants from supplied menu');
assert.equal(deals.length,14,'Expected 14 fixed-price deals');
assert.equal(new Set(items.map(x=>x.id)).size,items.length,'Item IDs must be unique');
assert.equal(new Set(cats.map(x=>x.slug)).size,cats.length);
for(const item of items){
 assert(item.name && item.price>0 && item.available,'Every product needs a name and positive price');
 assert(cats.some(c=>c.slug===item.category),'Invalid category: '+item.category);
 if(item.image.startsWith('/assets/'))assert(fs.existsSync(join(new URL('../public/',import.meta.url).pathname,item.image)),'Missing photo '+item.image);
}
const prices=[1050,799,1199,1399,1550,2050,2450,3050,2399,2299,3350,4699,2999,3299];
assert.deepEqual(deals.map(x=>x.price),prices,'Deal prices differ from supplied posters');
assert(deals.every(x=>Array.isArray(x.bundleLines)&&x.bundleLines.length>=2),'All deals need bundle contents');
assert(deals.every(x=>x.originalPrice>=x.price),'Original prices must not be below deal prices');
assert(!items.some(x=>/lock.?down deal/i.test(x.name)),'Legacy promo name leaked');
console.log('PASS:',product.length,'priced variants,',deals.length,'fixed-price deals,',cats.length,'category groups; all references resolve.');
