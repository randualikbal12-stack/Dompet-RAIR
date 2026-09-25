/* Mini Papa (CSV) */
window.Papa={
 parseText(t){const rows=[];let row=[],f='',q=false;for(let i=0;i<t.length;i++){const c=t[i];
  if(q){if(c==='"'){if(t[i+1]==='"'){f+='"';i++}else q=false}else f+=c}
  else if(c==='"')q=true;else if(c===','){row.push(f);f=''}else if(c==='\n'||c==='\r'){if(c==='\r'&&t[i+1]==='\n')i++;row.push(f);rows.push(row);row=[];f=''}else f+=c}
  if(f!==''||row.length){row.push(f);rows.push(row)}return rows},
 parse(file,o){const rd=new FileReader();rd.onload=()=>{let t=String(rd.result).replace(/^\uFEFF/,'');let rows=Papa.parseText(t);
  if(o.skipEmptyLines)rows=rows.filter(r=>r.some(v=>v.trim()!==''));let data=rows;
  if(o.header){const h=rows.shift()||[];data=rows.map(r=>{const x={};h.forEach((k,i)=>x[k]=r[i]??'');return x})}o.complete({data})};rd.readAsText(file,'utf-8')},
 unparse(rows){return '\uFEFF'+rows.map(r=>r.map(v=>{v=String(v??'');return /[",\n\r]/.test(v)?'"'+v.replace(/"/g,'""')+'"':v}).join(',')).join('\r\n')}
};
/* Mini Chart (bar, line, doughnut, pie) */
window.Chart=class{constructor(cv,cfg){this.cv=cv;this.cfg=cfg;this.draw=this.draw.bind(this);this.ro=new ResizeObserver(this.draw);this.ro.observe(cv.parentElement);this.draw()}
 destroy(){this.ro.disconnect();const x=this.cv.getContext('2d');x.clearRect(0,0,this.cv.width,this.cv.height)}
 draw(){const cv=this.cv,p=cv.parentElement,W=p.clientWidth,H=p.clientHeight;if(!W||!H)return;const dpr=devicePixelRatio||1;
  cv.width=W*dpr;cv.height=H*dpr;cv.style.width=W+'px';cv.style.height=H+'px';const x=cv.getContext('2d');x.setTransform(dpr,0,0,dpr,0,0);x.clearRect(0,0,W,H);
  const cs=getComputedStyle(document.documentElement),tc=cs.getPropertyValue('--text-secondary')||'#666',gc=cs.getPropertyValue('--border')||'#ddd';
  x.font='10px system-ui,sans-serif';x.fillStyle=tc;const {type,data,options:o={}}=this.cfg,ds=data.datasets,L=data.labels||[];
  const leg=o.plugins&&o.plugins.legend||{};const showLeg=leg.display!==false&&(type==='doughnut'||type==='pie'||ds.length>1||ds[0].label);
  if(type==='doughnut'||type==='pie'){const v=ds[0].data,tot=v.reduce((a,b)=>a+Math.max(0,b),0),right=leg.position==='right';
   const lw=showLeg&&right?Math.min(W*.45,160):0,lh=showLeg&&!right?Math.ceil(L.length/2)*14+6:0;
   const cx=(W-lw)/2,cy=(H-lh)/2,R=Math.max(10,Math.min(W-lw,H-lh)/2-4);let a=-Math.PI/2;
   if(!tot){x.strokeStyle=gc;x.lineWidth=R*.35;x.beginPath();x.arc(cx,cy,R*.8,0,7);x.stroke()}
   v.forEach((val,i)=>{if(val<=0||!tot)return;const s=val/tot*Math.PI*2;x.beginPath();x.moveTo(cx,cy);x.arc(cx,cy,R,a,a+s);x.closePath();x.fillStyle=ds[0].backgroundColor[i%ds[0].backgroundColor.length];x.fill();a+=s});
   if(type==='doughnut'&&tot){x.globalCompositeOperation='destination-out';x.beginPath();x.arc(cx,cy,R*.6,0,7);x.fill();x.globalCompositeOperation='source-over'}
   if(showLeg)L.forEach((l,i)=>{const c=ds[0].backgroundColor[i%ds[0].backgroundColor.length];let lx,ly;
    if(right){lx=W-lw+4;ly=8+i*14}else{lx=(i%2)*(W/2)+6;ly=H-lh+6+Math.floor(i/2)*14}if(ly>H-4)return;
    x.fillStyle=c;x.fillRect(lx,ly,9,9);x.fillStyle=tc;x.fillText(String(l).slice(0,22),lx+13,ly+8)});return}
  const tk=o.scales&&o.scales.y&&o.scales.y.ticks&&o.scales.y.ticks.callback||(v=>v);
  const all=ds.flatMap(d=>d.data);let mn=Math.min(0,...all),mx=Math.max(0,...all);if(mx===mn)mx=mn+1;
  const st=(()=>{const r=(mx-mn)/4,m=Math.pow(10,Math.floor(Math.log10(r))),n=r/m;return(n<=1?1:n<=2?2:n<=5?5:10)*m})();mn=Math.floor(mn/st)*st;mx=Math.ceil(mx/st)*st;
  const legH=showLeg?16:0,pl=46,pb=18+legH,pt=6,pr=6,cw=W-pl-pr,chh=H-pt-pb,Y=v=>pt+chh-(v-mn)/(mx-mn)*chh;
  x.textAlign='right';x.strokeStyle=gc;x.lineWidth=.5;for(let v=mn;v<=mx+st/2;v+=st){const y=Y(v);x.beginPath();x.moveTo(pl,y);x.lineTo(W-pr,y);x.stroke();x.fillText(tk(v),pl-4,y+3)}
  const n=L.length||1,bw=cw/n,skip=Math.ceil(n/Math.max(1,Math.floor(cw/34)));x.textAlign='center';
  L.forEach((l,i)=>{if(i%skip===0)x.fillText(l,pl+bw*i+bw/2,H-pb+12)});
  if(type==='bar'){const g=ds.length,iw=Math.max(1,bw*.75/g);ds.forEach((d,j)=>{x.fillStyle=d.backgroundColor;d.data.forEach((v,i)=>{const bx=pl+bw*i+bw*.125+iw*j,y0=Y(0),y1=Y(v);x.fillRect(bx,Math.min(y0,y1),iw-1,Math.abs(y1-y0))})})}
  else ds.forEach(d=>{const pts=d.data.map((v,i)=>[pl+bw*i+bw/2,Y(v)]);if(!pts.length)return;
   if(d.fill){x.beginPath();x.moveTo(pts[0][0],Y(Math.max(mn,0)));pts.forEach(q=>x.lineTo(q[0],q[1]));x.lineTo(pts[pts.length-1][0],Y(Math.max(mn,0)));x.closePath();x.fillStyle=d.backgroundColor;x.fill()}
   x.setLineDash(d.borderDash||[]);x.strokeStyle=d.borderColor;x.lineWidth=2;x.beginPath();pts.forEach((q,i)=>i?x.lineTo(q[0],q[1]):x.moveTo(q[0],q[1]));x.stroke();x.setLineDash([]);
   if(d.pointRadius){x.fillStyle=d.borderColor;pts.forEach(q=>{x.beginPath();x.arc(q[0],q[1],d.pointRadius,0,7);x.fill()})}});
  if(showLeg){let lx=pl;x.textAlign='left';ds.forEach(d=>{if(!d.label)return;x.fillStyle=d.backgroundColor||d.borderColor;x.fillRect(lx,H-legH+3,9,9);x.fillStyle=tc;x.fillText(d.label,lx+13,H-legH+11);lx+=x.measureText(d.label).width+30})}}};
