// Optimised browser-only previews. Production needs authenticated object storage.
export async function squareUpload(file,{x=0.5,y=0.5}={}){
 if(!file || !/^image\/(jpeg|png|webp)$/.test(file.type))throw Error('Choose a JPG, PNG, or WebP image.');
 if(file.size>12*1024*1024)throw Error('Image must be smaller than 12 MB.');
 const url=URL.createObjectURL(file);
 try{
  const img=await new Promise((resolve,reject)=>{const i=new Image();i.onload=()=>resolve(i);i.onerror=()=>reject(Error('Cannot read this image.'));i.src=url;});
  const canvas=document.createElement('canvas');canvas.width=1080;canvas.height=1080;const context=canvas.getContext('2d');
  if(!context)throw Error('Image processing is unavailable.');
  const edge=Math.min(img.width,img.height);context.drawImage(img,(img.width-edge)*Math.min(1,Math.max(0,x)),(img.height-edge)*Math.min(1,Math.max(0,y)),edge,edge,0,0,1080,1080);
  for(const q of [.8,.67,.52,.38]){const result=canvas.toDataURL('image/webp',q);if(result.length<440000)return result;}
  throw Error('Image is too detailed for this browser-only demo. Try a simpler JPG.');
 }finally{URL.revokeObjectURL(url)}
}
