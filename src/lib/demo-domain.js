import { store } from './demo-storage';
import {getSiteConfig} from './site-config';
const DEMO_SPEED = 6;
const RIDERS = [
  { name: 'Danish Ali', phone: '+92 300 4412 908', vehicle: 'Honda CD-70', plate: 'LEB-4471' },
  { name: 'Waqas Hussain', phone: '+92 321 8890 122', vehicle: 'Suzuki GD-110', plate: 'LEC-9022' },
  { name: 'Rehan Malik', phone: '+92 333 2201 776', vehicle: 'Honda CB-150', plate: 'LED-1183' },
  { name: 'Faraz Cheema', phone: '+92 345 5567 330', vehicle: 'Yamaha YBR', plate: 'LEA-7634' },
];

const STAGES = ['placed', 'preparing', 'on_the_way', 'arriving', 'delivered'];
const STAGE_LABELS = {
  placed: 'Order received',
  accepted: 'Order accepted',
  ready: 'Ready for handover',
  collected: 'Collected',
  preparing: 'In the kitchen',
  on_the_way: 'Rider on the way',
  arriving: 'Rider arriving',
  delivered: 'Delivered',
  cancelled: 'Cancelled',
};
const STAGE_COPY = {
  placed: 'Your order is confirmed and will be prepared shortly.',
  accepted: 'The kitchen has accepted your order.',
  ready: 'Your meal is packed and ready for handover.',
  collected: 'Thanks for collecting. Enjoy your meal!',
  preparing: 'Your meal is being prepared in the Amigos kitchen.',
  on_the_way: 'Your rider has collected your order from Amigos.',
  arriving: 'Your rider is around the corner — please be ready.',
  delivered: 'Enjoy the flavour, amigo!',
  cancelled: 'This order was cancelled.',
};
// simulated seconds per stage (divide by DEMO_SPEED for real seconds)
const STAGE_SECONDS = { accepted: 60, ready: 60, collected: 0, placed: 60, preparing: 240, on_the_way: 420, arriving: 120, delivered: 0, cancelled: 0 };

const money = (n) => Math.round(Number(n) * 100) / 100;

function pickOffer(item, offers) {
  if (item.category === 'deals') return null;
  const best = offers
    .filter((o) => o.active !== false)
    .filter((o) => o.scope === 'all' || (o.scope === 'category' && o.category === item.category) || (o.scope === 'item' && Number(o.category) === Number(item.id)))
    .sort((a, b) => b.percent - a.percent)[0];
  return best || null;
}

function decorate(item, offers) {
  const offer = pickOffer(item, offers);
  const finalPrice = offer ? money(item.price * (1 - offer.percent / 100)) : item.price;
  return { ...item, offer: offer ? { id: offer.id, title: offer.title, percent: offer.percent, badge: offer.badge } : null, finalPrice };
}

function orderCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let s = '';
  for (let i = 0; i < 4; i += 1) s += chars[Math.floor(Math.random() * chars.length)];
  return `AMG-${s}`;
}

/** Advance the demo order through its stages and return tracking data. */
async function simulateAndTrack(order) {
  if (!order) return null;
  const manual = !!order.manual;
  const stages = manual ? (order.type === 'pickup' ? ['placed','accepted','preparing','ready','collected'] : ['placed','accepted','preparing','ready','on_the_way','arriving','delivered']) : STAGES;
  const complete = ['delivered','collected'].includes(order.status);
  let changed = false;

  // Status only changes after a staff action. No accelerated or invented delivery progress.
  const stageIndex = stages.indexOf(order.status);
  const isComplete = ['delivered','collected'].includes(order.status);
  const config=getSiteConfig();
  const elapsedMinutes=Math.max(0,(Date.now()-new Date(order.createdAt).getTime())/60000);
  const estimate=(order.type==='pickup'?(Number(config.pickupMinutes)||Number(config.prepMinutes)||20):(Number(config.deliveryMinutes)||40));
  const remaining=complete||order.status==='cancelled'?0:Math.max(0,Math.ceil(estimate-elapsedMinutes));
  const etaMinutes=complete||order.status==='cancelled'?0:remaining||null;
  const etaAt = etaMinutes===null?null:new Date(Date.now() + etaMinutes * 60000).toISOString();

  // progress 0–100 across the whole journey
  const progress = order.status === 'cancelled' ? 0 : isComplete ? 100 : Math.max(0, Math.round(Math.max(0,stageIndex)/(stages.length-1)*100));

  const timeline = stages.map((stage, i) => ({
    key: stage,
    label: STAGE_LABELS[stage],
    detail: STAGE_COPY[stage],
    done: i < stageIndex || isComplete,
    active: i === stageIndex && !isComplete,
  }));

  return {
    code: order.code,
    status: order.status,
    statusLabel: STAGE_LABELS[order.status] || order.status,
    statusCopy: STAGE_COPY[order.status] || '',
    statusIndex: stageIndex,
    progress,
    etaMinutes,
    etaAt,
    etaClock: etaAt?new Date(etaAt).toLocaleTimeString('en-PK', { hour: '2-digit', minute: '2-digit' }):null,
    rider: order.rider,
    type: order.type,
    customer: { name: order.customer?.name, address: order.customer?.address },
    totals: { subtotal: order.subtotal, discount: order.discount, total: order.total },
    items: order.items,
    timeline,
    demo: { speed: 1, manual: true, browserOnly: true },
    createdAt: order.createdAt,
  };
}


export { decorate, simulateAndTrack, STAGES, RIDERS, money, orderCode };
