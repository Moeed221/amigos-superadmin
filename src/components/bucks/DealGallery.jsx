'use client';
import {useState} from 'react';
import Link from 'next/link';
import {useShop,money} from '../ShopProvider';
import useSiteConfig from '../control/useSiteConfig';
export function BundleCard({deal}){
 const shop=useShop(),[chosen,setChosen]=useState({}),[added,setAdded]=useState(false);
 const lines=deal.bundleLines||[];
 const select=(index,value)=>{setChosen(v=>({...v,[index]:value}));setAdded(false)};
 const add=()=>{
  const options=lines.flatMap((line,i)=>line.choices?.length?[`${line.name}: ${chosen[i]||line.choices[0]}`]:[]);
  shop.addItem(deal,1,options.join('; '));setAdded(true);
 };
 return <article id={'deal-'+deal.id} className="amg-bundle-card">
  <div className="amg-bundle-art"><img src={deal.image} alt={deal.name}/><span>AMIGOS COMBO</span></div>
  <div className="amg-bundle-copy"><h3>{deal.name}</h3><div className="amg-bundle-price"><strong>{money(deal.finalPrice||deal.price)}</strong>{deal.originalPrice>deal.price&&<s>{money(deal.originalPrice)}</s>}</div>
  <ul>{lines.map((line,i)=><li key={i}><strong>{line.qty} × {line.name}</strong>{line.portion&&<small>{line.portion}</small>}{line.choices?.length>0&&<label>Choose {line.name}<select value={chosen[i]||line.choices[0]} onChange={e=>select(i,e.target.value)}>{line.choices.map(v=><option key={v} value={v}>{v}</option>)}</select></label>}</li>)}</ul>
  <button className="ref-button amg-deal-add" disabled={!shop.ready} onClick={add}>{added?'Added to cart':'Add deal to cart'}<span>{money(deal.finalPrice||deal.price)}</span></button></div>
 </article>
}
export default function DealGallery({featured=false}){
 const shop=useShop(),config=useSiteConfig(),deals=shop.ready?shop.data.items.filter(i=>i.category==='deals'&&i.available!==false):[];
 return <section className={'amg-deals '+(featured?'amg-deals-featured':'')} id="deals"><div className="amg-deals-heading"><p className="eyebrow">Made for sharing</p><h2>{config.copy.dealsHeading}</h2><p>Complete bundles. Straightforward prices. Make them yours.</p></div>
 <div className="amg-deals-grid">{deals.slice(0,featured?3:undefined).map(deal=><BundleCard key={deal.id} deal={deal}/>)}</div>
 {featured&&<Link className="ref-button amg-view-deals" href="/deals/">See all 14 deals →</Link>}
 {!deals.length&&<p className="amg-no-deals">No deals available right now. Check back soon.</p>}</section>
}
