'use client';
import Link from 'next/link';
import {useState,useEffect,useRef} from 'react';
import {useShop} from '../ShopProvider';
import useSiteConfig from '../control/useSiteConfig';
import Icon from '../Icons';
export default function Community(){
 const shop=useShop(),config=useSiteConfig(),categories=(shop.ready?shop.data.categories:[]).filter(c=>c.slug!=='deals');
 const [paused,setPaused]=useState(false),[hovered,setHovered]=useState(false),track=useRef(null),pointer=useRef(null),dragged=useRef(false);
 const step=(direction)=>track.current?.scrollBy({left:direction*310,behavior:'smooth'});
 useEffect(()=>{if(paused||hovered||categories.length<2)return;const timer=setInterval(()=>{const el=track.current;if(!el)return;const end=el.scrollWidth-el.clientWidth;el.scrollTo({left:el.scrollLeft>=end-10?0:Math.min(end,el.scrollLeft+300),behavior:'smooth'});},3500);return()=>clearInterval(timer)},[paused,hovered,categories.length]);
 function onPointerDown(e){if(e.pointerType==='touch')return;pointer.current={x:e.clientX,left:track.current.scrollLeft};dragged.current=false}
 function onPointerMove(e){if(!pointer.current)return;const distance=e.clientX-pointer.current.x;if(Math.abs(distance)>7){dragged.current=true;track.current.scrollLeft=pointer.current.left-distance;}}
 function onPointerUp(){pointer.current=null;setTimeout(()=>{dragged.current=false},0)}
 return <section className="community restaurant-community"><h2 data-reveal>{config.copy.carouselHeading||'Bring your appetite'}</h2><p>One table. Every craving.</p><div className="amg-carousel-controls"><button onClick={()=>step(-1)} aria-label="Previous categories"><Icon name="back"/></button><span>Drag, swipe or scroll to explore</span><button onClick={()=>step(1)} aria-label="Next categories"><Icon name="arrow"/></button></div><div className="community-track amg-manual-track" ref={track} role="region" aria-label="Browse food categories" tabIndex={0} onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>{setHovered(false);onPointerUp()}} onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerUp} onPointerCancel={onPointerUp} onClickCapture={e=>{if(dragged.current){e.preventDefault();e.stopPropagation();dragged.current=false}}}>
 {categories.map(c=><figure key={c.slug}><Link href={'/shop?category='+c.slug} draggable="false"><img draggable="false" src={c.image} alt={c.name} loading="lazy"/><figcaption>{c.name}<Icon name="arrow" size={22}/></figcaption></Link></figure>)}
 </div><button className="marquee-toggle" onClick={()=>setPaused(p=>!p)} aria-pressed={paused}>{paused?'Resume auto-scroll':'Pause auto-scroll'}</button></section>
}
