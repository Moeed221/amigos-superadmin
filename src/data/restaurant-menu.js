import seed from './menu.seed.json';
import categories from './categories.json';
export const categoryColors={burgers:'#f3bc45',pizza:'#e5a72e',sandwiches:'#eaa67d',wraps:'#ef8a43',bbq:'#ef8a43',appetizers:'#f3c85f',sides:'#f3c85f',fastfood:'#ea6248',pasta:'#eaa67d',steaks:'#ef8a43',chinese:'#b5c68c',thai:'#b5c68c',noodles:'#b5c68c',soups:'#b5c68c',drinks:'#b8cf9b',desserts:'#e5a3a3',deals:'#f3bc45'};
export const menuCategories=categories.filter(c=>c.slug!=='deals');
export const menuSeed=seed.items;
export const featuredIds=[225, 145, 190, 242];
export function dishSlug(item){return item.id+'-'+item.name.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')}
export function initialMenu(){return seed.items.filter(i=>i.available!==false).map(i=>({...i,finalPrice:i.price,offer:null}));}
