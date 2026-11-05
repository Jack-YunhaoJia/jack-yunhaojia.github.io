/* Shared cover transition: preserve the image's crop and restore it on interruption. */
'use strict';
window.CoverTransition = (() => {
 let current=null, sequence=0;
 function imageRect(box, width, height, fit='contain') {
  const scale=(fit==='cover'?Math.max:Math.min)(box.width/width,box.height/height);
  const w=width*scale,h=height*scale;
  return {left:(box.width-w)/2,top:(box.height-h)/2,width:w,height:h};
 }
 const pixels=rect=>Object.fromEntries(Object.entries(rect).map(([k,v])=>[k,v+'px']));
 function cancel(){sequence++;current?.cleanup();current=null}
 async function play({from,to,source,parent,target,fromFit='cover',toFit='contain',fromOpacity=.46,toOpacity=1}) {
  cancel();
  if(!source?.complete||!source.naturalWidth||!from||!to||from.width<1||from.height<1||to.width<1||to.height<1)return;
  const token=sequence,clip=document.createElement('div'),image=new Image();
  const visibility=target?.style.visibility||'';
  let finished=false,timer;const animations=[];
  const cleanup=()=>{if(finished)return;finished=true;clearTimeout(timer);clip.remove();animations.forEach(a=>{a.finished.catch(()=>{});a.cancel()});if(target)target.style.visibility=visibility;if(current?.token===token)current=null};
  current={token,cleanup};
  if(target)target.style.visibility='hidden';
  image.src=source.currentSrc||source.src;image.alt='';image.draggable=false;
  try{
   // Decode before animation; a slow or corrupt asset must never leave the real cover hidden.
   await Promise.race([image.decode(),new Promise((_,reject)=>{timer=setTimeout(()=>reject(Error('decode timeout')),700)})]);
   clearTimeout(timer);if(sequence!==token||finished)return;
   clip.className='transition-cover';clip.setAttribute('aria-hidden','true');
   Object.assign(clip.style,pixels({left:from.left,top:from.top,width:from.width,height:from.height}));
   Object.assign(image.style,pixels(imageRect(from,source.naturalWidth,source.naturalHeight,fromFit)));
   image.style.opacity=String(fromOpacity);clip.append(image);parent.append(clip);
   const options={duration:950,easing:'cubic-bezier(.16,1,.3,1)',fill:'forwards'};
   const outer=clip.animate([pixels({left:from.left,top:from.top,width:from.width,height:from.height}),pixels({left:to.left,top:to.top,width:to.width,height:to.height})],options);
   animations.push(outer);
   const inner=image.animate([{...pixels(imageRect(from,source.naturalWidth,source.naturalHeight,fromFit)),opacity:fromOpacity},{...pixels(imageRect(to,source.naturalWidth,source.naturalHeight,toFit)),opacity:toOpacity}],options);
   animations.push(inner);
   timer=setTimeout(cleanup,1200);
   await Promise.all([outer.finished,inner.finished]);cleanup();
  }catch{cleanup()}
 }
 return {play,cancel,imageRect};
})();
