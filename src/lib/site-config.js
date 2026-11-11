export const CONFIG_KEY='amigos_control_site_v2';
export const defaultConfig={
 announcement:'Fresh. Fast. Fuego. Order your Amigos favourites.',featuredIds:[225, 145, 190, 242],accepting:true,delivery:true,pickup:true,
 prepMinutes:20,deliveryMinutes:40,pickupMinutes:20,deliveryFee:null,minimumOrder:null,serviceArea:'',openingHours:'',
 restaurantName:'Amigos Mexican Grill',supportEmail:'',address:'453 C Near Chishti Cloth House, Main Bazar Shad Bagh, Lahore',currency:'PKR',
 sections:{hero:true,story:true,featured:true,deals:true,mealBuilder:false,why:true,carousel:true,footer:true},
 sectionOrder:['hero','story','featured','deals','mealBuilder','why','carousel'],
 copy:{heroHeadline:'The fast food that turns hungry into happy.',storyText:'Big burgers. Loaded favourites. Crispy bites. All your cravings, one Amigos table.',featuredHeading:'Choose your craving',dealsHeading:'Deals worth sharing',whyHeading:'Why Amigos',carouselHeading:'Bring your appetite',footerHeading:'Follow Amigos'},
 socials:{instagram:'',facebook:'',tiktok:'',whatsapp:'',youtube:''}
};
export function getSiteConfig(){try{const v=JSON.parse(localStorage.getItem(CONFIG_KEY)||'{}');return {...defaultConfig,...v,sections:{...defaultConfig.sections,...v.sections},copy:{...defaultConfig.copy,...v.copy},socials:{...defaultConfig.socials,...v.socials}}}catch{return defaultConfig}}
export function saveSiteConfig(config){localStorage.setItem(CONFIG_KEY,JSON.stringify(config));window.dispatchEvent(new Event('amigos-config'));}
