/* Perspective gallery, measured against the saved motion reference. */
'use strict';
class PerceptionGallery {
 constructor(canvas,items,onSelect){
  Object.assign(this,{canvas,items,onSelect,index:0,position:0,target:0,focus:0,focusTarget:0,speed:0,velocity:0,hover:-1,paused:matchMedia('(prefers-reduced-motion: reduce)').matches,textures:[],lights:items.map(()=>0),ready:false,frame:0,intro:1});
  this.buttons=[...document.querySelectorAll('.slide-hit')];this.images=[];
  this.resize=this.resize.bind(this);this.tick=this.tick.bind(this);
  try{this.gl=canvas.getContext('webgl',{alpha:true,antialias:true,premultipliedAlpha:true})}catch(e){this.gl=null}
  canvas.addEventListener('webglcontextlost',e=>{e.preventDefault();this.useFallback('context lost')});
  canvas.addEventListener('webglcontextrestored',()=>this.restoreWebGL());
  window.addEventListener('resize',this.resize);
  if(typeof ResizeObserver!=='undefined')new ResizeObserver(this.resize).observe(canvas);
  const resume=()=>{this.resize();if(this.gl?.isContextLost())this.useFallback('context unavailable');this.wake()};
  document.addEventListener('visibilitychange',()=>{cancelAnimationFrame(this.frame);this.frame=0;this.last=0;if(!document.hidden)resume()});
  window.addEventListener('pageshow',resume);this.load();
 }
 async load(){
  if(this.gl){try{this.setup()}catch(e){this.useFallback(e.message)}}else this.useFallback('WebGL unavailable');
  let loaded=0;
  // One slow asset must not leave the whole gallery behind the loading screen.
  const boot=setTimeout(()=>this.start(),1200);
  await Promise.all(this.items.map((_,i)=>this.loadImage(i).then(()=>{loaded++;document.querySelector('#load-count').textContent=String(Math.round(loaded/this.items.length*100)).padStart(3,'0')})));
  clearTimeout(boot);
  await new Promise(resolve=>{const t=setTimeout(resolve,900);document.fonts.ready.then(()=>{clearTimeout(t);resolve()},()=>{clearTimeout(t);resolve()})});
  this.start();
 }
 start(){
  this.ready=true;document.body.classList.toggle('gl-ready',!!this.gl);document.body.classList.toggle('gl-fallback',!this.gl);document.body.classList.add('gallery-ready');this.resize();document.querySelector('#load-status').classList.add('loaded');this.wake();
 }
 loadImage(i){
  const button=this.buttons[i],img=button.querySelector('img'),source=this.items[i].cover;
  return new Promise(resolve=>{
   let attempts=0,timer,settled=false;
   const finish=ok=>{if(settled)return;settled=true;clearTimeout(timer);img.onload=img.onerror=null;button.classList.toggle('asset-failed',!ok);if(ok){this.images[i]=img;this.uploadTexture(i,img)}this.wake();resolve(ok)};
   const retry=()=>{if(settled)return;clearTimeout(timer);if(attempts++===0){const url=new URL(source,document.baseURI);url.searchParams.set('gallery-retry','1');img.src=url.href;timer=setTimeout(retry,6000)}else finish(false)};
   img.onload=()=>finish(img.naturalWidth>0);img.onerror=retry;
   timer=setTimeout(retry,6000);
   if(img.complete){if(img.naturalWidth>0)finish(true);else retry()}
  });
 }
 uploadTexture(i,img){
  const g=this.gl;if(!g||g.isContextLost())return;
  try{
   if(img.naturalWidth>g.getParameter(g.MAX_TEXTURE_SIZE)||img.naturalHeight>g.getParameter(g.MAX_TEXTURE_SIZE))return;
   const t=g.createTexture();if(!t)throw Error('Texture allocation failed');
   g.bindTexture(g.TEXTURE_2D,t);g.texImage2D(g.TEXTURE_2D,0,g.RGBA,g.RGBA,g.UNSIGNED_BYTE,img);
   g.texParameteri(g.TEXTURE_2D,g.TEXTURE_WRAP_S,g.CLAMP_TO_EDGE);g.texParameteri(g.TEXTURE_2D,g.TEXTURE_WRAP_T,g.CLAMP_TO_EDGE);g.texParameteri(g.TEXTURE_2D,g.TEXTURE_MIN_FILTER,g.LINEAR);g.texParameteri(g.TEXTURE_2D,g.TEXTURE_MAG_FILTER,g.LINEAR);
   if(g.getError()!==g.NO_ERROR){g.deleteTexture(t);throw Error('Texture upload failed')}
   this.textures[i]={texture:t,width:img.naturalWidth,height:img.naturalHeight};
  }catch(e){this.useFallback(e.message)}
 }
 useFallback(reason){
  this.gl=null;this.textures=[];this.canvas.style.visibility='hidden';
  document.body.classList.remove('gl-ready');document.body.classList.add('gl-fallback');
  this.buttons.forEach(b=>b.classList.remove('is-rendered'));this.last=0;
  console.warn('Gallery using image fallback:',reason);this.wake();
 }
 restoreWebGL(){
  try{
   this.gl=this.canvas.getContext('webgl');if(!this.gl||this.gl.isContextLost())return this.useFallback('restore unavailable');
   this.setup();this.textures=[];this.images.forEach((img,i)=>this.uploadTexture(i,img));
   if(!this.gl)return;this.canvas.style.visibility='';document.body.classList.remove('gl-fallback');document.body.classList.add('gl-ready');this.resize();this.wake();
  }catch(e){this.useFallback(e.message)}
 }
 setup(){const g=this.gl;
  const vertex=`attribute vec2 aPosition;uniform vec2 uResolution;uniform vec4 uRect;uniform float uVelocity;uniform float uRotation;varying vec2 vUv;varying float vDepth;void main(){vUv=aPosition;vec2 local=(aPosition-.5)*uRect.zw;float ca=cos(uRotation),sa=sin(uRotation);float wx=local.x*ca+uRect.x-uResolution.x*.5;float wy=local.y+uRect.y-uResolution.y*.5;float radius=uResolution.x*.65;float t=clamp(abs(wx)/radius,0.,1.);float ease=t<.5?2.*t*t:-1.+(4.-2.*t)*t;float z=(1.-ease)*radius*uVelocity-local.x*sa;float camera=uResolution.y*1.20710678;float perspective=camera/(camera-z);vec2 p=vec2(wx,wy)*perspective;vDepth=clamp(z*.005,0.,.7);gl_Position=vec4(p.x/uResolution.x*2.,-p.y/uResolution.y*2.,0.,1.);}`;
  const fragment=`precision mediump float;varying vec2 vUv;varying float vDepth;uniform sampler2D uImage;uniform vec2 uImageSize;uniform vec2 uBoxSize;uniform float uAlpha;uniform float uLight;uniform float uContain;void main(){float ar=uImageSize.x/uImageSize.y;float br=uBoxSize.x/uBoxSize.y;vec2 uv=vUv;if(uContain>.5){if(ar>br)uv.y=(uv.y-.5)*ar/br+.5;else uv.x=(uv.x-.5)*br/ar+.5;if(uv.x<0.||uv.x>1.||uv.y<0.||uv.y>1.){gl_FragColor=vec4(.86,.86,.82,uAlpha);return;}}else{if(ar>br)uv.x=(uv.x-.5)*br/ar+.5;else uv.y=(uv.y-.5)*ar/br+.5;}vec4 col=texture2D(uImage,uv);float grey=(col.r+col.g+col.b)/3.;col=mix(vec4(vec3(grey),.4),col,clamp(uLight+vDepth,0.,1.));gl_FragColor=vec4(col.rgb,col.a*uAlpha);}`;
  const compile=(type,source)=>{const s=g.createShader(type);g.shaderSource(s,source);g.compileShader(s);if(!g.getShaderParameter(s,g.COMPILE_STATUS))throw Error(g.getShaderInfoLog(s));return s};
  const p=g.createProgram();g.attachShader(p,compile(g.VERTEX_SHADER,vertex));g.attachShader(p,compile(g.FRAGMENT_SHADER,fragment));g.linkProgram(p);if(!g.getProgramParameter(p,g.LINK_STATUS))throw Error('Gallery shader link failed');g.useProgram(p);this.program=p;
  const verts=[];for(let x=0;x<48;x++)for(let y=0;y<8;y++){let l=x/48,r=(x+1)/48,t=y/8,b=(y+1)/8;verts.push(l,t,r,t,l,b,r,t,r,b,l,b)}this.count=verts.length/2;
  const buf=g.createBuffer();g.bindBuffer(g.ARRAY_BUFFER,buf);g.bufferData(g.ARRAY_BUFFER,new Float32Array(verts),g.STATIC_DRAW);const a=g.getAttribLocation(p,'aPosition');g.enableVertexAttribArray(a);g.vertexAttribPointer(a,2,g.FLOAT,false,0,0);
  this.u={};for(const n of ['uResolution','uRect','uVelocity','uRotation','uImage','uImageSize','uBoxSize','uAlpha','uLight','uContain'])this.u[n]=g.getUniformLocation(p,n);g.uniform1i(this.u.uImage,0);g.enable(g.BLEND);g.blendFuncSeparate(g.SRC_ALPHA,g.ONE_MINUS_SRC_ALPHA,g.ONE,g.ONE_MINUS_SRC_ALPHA);
 }
 resize(){const r=this.canvas.getBoundingClientRect();this.width=r.width||innerWidth;this.height=r.height||innerHeight;this.mobile=this.width<=760;this.ratio=Math.min(this.width/1600,this.height/1200);const d=Math.min(devicePixelRatio||1,2),w=Math.round(this.width*d),h=Math.round(this.height*d);if(this.canvas.width!==w||this.canvas.height!==h){this.canvas.width=w;this.canvas.height=h}if(this.gl)this.gl.viewport(0,0,w,h);this.wake()}
 step(){return this.mobile?76:120*this.ratio}
 rect(i){const w=this.width,h=this.height,d=i-this.position,r=this.ratio;
  let ow=this.mobile?58:100*r,oh=this.mobile?Math.min(310,h*.34):370*r,ox=w*.5+d*this.step(),oy=h*.5;
  let fw=this.mobile?w-48:1054*r,fh=this.mobile?Math.min((w-48)*.7,h*.34):602*r,gap=this.mobile?36:152*w/1600,nw=Math.max(fw*.5,(w-fw-gap*2)/2),fx=w*.5;
  if(Math.abs(d)<=1)fx+=d*(fw*.5+gap+nw*.5);else fx+=Math.sign(d)*(fw*.5+gap+nw+(Math.abs(d)-1.5)*(ow+gap));
  const near=Math.max(0,1-Math.abs(d)),iw=nw+(fw-nw)*near;
  let f=this.focus,x=ox+(fx-ox)*f,y=oy,ww=ow+(iw-ow)*f,hh=oh+(fh-oh)*f;
  if(this.intro>.001){x+=this.intro*(w+(i+1)*ow*2)}
  return{x,y,w:ww,h:hh,alpha:1};
 }
 select(i){const n=Math.max(0,Math.min(this.items.length-1,i));if(n===this.index&&this.target===n)return;this.index=n;this.target=n;this.onSelect(n);if(this.paused)this.position=n;this.wake()}
 scrollBy(pixels){this.target=Math.max(0,Math.min(this.items.length-1,this.target+pixels/this.step()));const i=Math.round(this.target);if(i!==this.index){this.index=i;this.onSelect(i)}this.wake()}
 setOverview(value){this.focusTarget=value?0:1;document.body.classList.toggle('overview',value);if(this.paused)this.focus=this.focusTarget;this.wake()}
 setPaused(value){this.paused=value;if(value){this.position=this.target;this.focus=this.focusTarget;this.intro=0;this.velocity=0}this.wake()}
 wake(){if(!this.frame&&this.ready&&!document.hidden)this.frame=requestAnimationFrame(this.tick)}
 tick(now){this.frame=0;const dt=Math.min((now-(this.last||now-16.67))/16.67,3);this.last=now;const damp=this.paused?1:1-Math.pow(.93,dt),old=this.position;
  this.position+=(this.target-this.position)*damp;this.focus+=(this.focusTarget-this.focus)*damp;this.intro+=(0-this.intro)*(this.paused?1:1-Math.pow(.91,dt));
  this.speed=(this.position-old)*this.step()/dt;this.velocity+=(this.speed-this.velocity)*(1-Math.pow(.88,dt));
  if(this.gl?.isContextLost())this.useFallback('context interrupted');
  let g=this.gl;if(g){try{g.clearColor(0,0,0,0);g.clear(g.COLOR_BUFFER_BIT);g.useProgram(this.program);g.uniform2f(this.u.uResolution,this.width,this.height)}catch(e){this.useFallback(e.message);g=null}}
  let unsettled=Math.abs(this.target-this.position)>.0001||Math.abs(this.focusTarget-this.focus)>.0001||this.intro>.0001||Math.abs(this.velocity)>.01;
  const order=this.items.map((_,i)=>i).sort((a,b)=>Math.abs(b-this.position)-Math.abs(a-this.position));
  for(const i of order){const r=this.rect(i),b=this.buttons[i],t=this.textures[i],light=this.focusTarget?i===this.index?1:0:i===this.hover?.8:0;this.lights[i]+=(light-this.lights[i])*damp;if(Math.abs(light-this.lights[i])>.001)unsettled=true;
   b.style.cssText=`left:${r.x-r.w/2}px;top:${r.y-r.h/2}px;width:${r.w}px;height:${r.h}px;z-index:${10-Math.round(Math.abs(i-this.position))};--tile-light:${.4+.6*this.lights[i]}`;b.tabIndex=0;b.setAttribute('aria-current',String(i===this.index));if(!g||!t||r.x+r.w/2<0||r.x-r.w/2>this.width){b.classList.remove('is-rendered');continue}
   try{g.bindTexture(g.TEXTURE_2D,t.texture);g.uniform4f(this.u.uRect,r.x,r.y,r.w,r.h);g.uniform2f(this.u.uImageSize,t.width,t.height);g.uniform2f(this.u.uBoxSize,r.w,r.h);
   g.uniform1f(this.u.uVelocity,this.paused?0:Math.min(.40,Math.abs(this.velocity)*.013));g.uniform1f(this.u.uRotation,this.paused?0:Math.max(-.24,Math.min(.24,this.velocity*-.006)));
   g.uniform1f(this.u.uAlpha,r.alpha);g.uniform1f(this.u.uLight,this.lights[i]);g.uniform1f(this.u.uContain,this.focus>.8&&i===this.index&&this.items[i].fit==='contain'?1:0);g.drawArrays(g.TRIANGLES,0,this.count);b.classList.add('is-rendered')}catch(e){this.useFallback(e.message);g=null}
  }
  this.drawRuler();if(unsettled)this.wake();else this.last=0;
 }
 drawRuler(){const c=document.querySelector('#ruler-canvas');if(!c)return;const d=Math.min(devicePixelRatio||1,2),w=c.clientWidth,h=c.clientHeight;if(c.width!==w*d||c.height!==h*d){c.width=w*d;c.height=h*d}const ctx=c.getContext('2d');ctx.setTransform(d,0,0,d,0,0);ctx.clearRect(0,0,w,h);ctx.strokeStyle=getComputedStyle(document.body).color;for(let j=0;j<30;j++){let x=1+j*(w-2)/29;ctx.globalAlpha=j%5===0?.65:.25;ctx.beginPath();ctx.moveTo(x,5);ctx.lineTo(x,20);ctx.stroke()}ctx.globalAlpha=1;ctx.lineWidth=1;ctx.strokeRect(this.position/Math.max(1,this.items.length-1)*(w-24),4,24,17)}
}
window.PerceptionGallery=PerceptionGallery;
