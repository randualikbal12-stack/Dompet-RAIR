'use strict';
/* ================= DATA ================= */
const KEY='dd-v2';
const $=id=>document.getElementById(id);
const esc=s=>String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const rp=n=>{n=Math.round(n||0);return(n<0?'-':'')+'Rp'+Math.abs(n).toLocaleString('id-ID')};
const pct=v=>v==null||!isFinite(v)?'-':((v>0?'+':'')+(v*100).toFixed(1)+'%');
const pd=s=>{const[a,b,c]=s.split('-').map(Number);return new Date(a,b-1,c)};
const ds=d=>d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');
const today=ds(new Date());
const mEnd=(y,m)=>ds(new Date(y,m+1,0));
const BLN=['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des'];
const BULAN=['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'];
const fdate=s=>{const d=pd(s);return d.getDate()+' '+BLN[d.getMonth()]+' '+d.getFullYear()};
const TUJ=['Pendapatan','Pengeluaran','Tabungan','Pindah Uang'];
const SUMBER={Pendapatan:['Gaji','Jasa','Uang Kos Mama','Uang Kedai','Uang Disan'],
  Pengeluaran:['Pengeluaran Gaji','Pengeluaran Jasa','Pengeluaran Uang Kos','Pengeluaran Uang Kedai','Pengeluaran Uang Disan'],
  Tabungan:['Saham','Reksadana','Deposito','Jula-jula','Reksadana uang kos mama','Riba'],'Pindah Uang':['Pindah akun','Utang & piutang','Pinjam uang mama','Titipan orang lain']};
const MAMA_IN=['Uang Kos Mama','Uang Kedai'],MAMA_OUT=['Pengeluaran Uang Kos','Pengeluaran Uang Kedai'];
let S;
function load(){try{S=JSON.parse(localStorage.getItem(KEY))}catch(e){S=null}
 if(!S||!S.tx){S={acc:SEED.acc,tx:SEED.tx,next:Math.max(...SEED.tx.map(t=>t.id))+1,price:{...INV.last},rdcur:{},goals:[],seedAt:today}}
 S.price=S.price||{...INV.last};S.rdcur=S.rdcur||{};S.goals=S.goals||[]}
function save(){try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){alert('Penyimpanan HP penuh: '+e.message)}}
const accNames=()=>S.acc.map(a=>a.n);
const byId=id=>S.tx.find(t=>t.id===id);
/* ================= PERHITUNGAN ================= */
function openAt(a,d){const x=S.acc.find(z=>z.n===a);return x&&x.od<=d?x.o:0}
function bal(a,d=today){let b=openAt(a,d);for(const t of S.tx){if(t.d>d)continue;if(t.a===a)b+=t.t==='M'?t.j:-t.j;if(t.t==='T'&&t.tu===a)b+=t.j}return b}
function sum(f){let s=0;for(const t of S.tx)if(f(t))s+=t.j;return s}
const inR=(t,a,b)=>t.d>=a&&t.d<=b;
function income(a,b,src){return sum(t=>t.tj==='Pendapatan'&&t.t==='M'&&inR(t,a,b)&&(!src||t.sb===src))}
function expense(a,b,src){return sum(t=>t.tj==='Pengeluaran'&&t.t==='K'&&inR(t,a,b)&&(!src||t.sb===src))}
function mama(d){ // uang mama
 const inn=sum(t=>t.d<=d&&t.tj==='Pendapatan'&&MAMA_IN.includes(t.sb)),out=sum(t=>t.d<=d&&t.tj==='Pengeluaran'&&MAMA_OUT.includes(t.sb));
 const inv=sum(t=>t.d<=d&&t.sb==='Reksadana uang kos mama'&&t.t==='K')-sum(t=>t.d<=d&&t.sb==='Reksadana uang kos mama'&&t.t==='M');
 const akun=S.acc.filter(a=>a.g==='Titipan Mama').reduce((s,a)=>s+bal(a.n,d),0);
 const held=inn-out+(S.mamaOpen||0),aman=akun+inv;return{inn,out,held,inv,akun,aman,sisa:held-aman}}
function disan(d){const inn=sum(t=>t.d<=d&&t.sb==='Uang Disan'),out=sum(t=>t.d<=d&&t.sb==='Pengeluaran Uang Disan');const ak=S.acc.filter(a=>a.g==='Titipan Disan').reduce((s,a)=>s+bal(a.n,d),0);return{held:inn-out,akun:ak,sisa:inn-out-ak}}
function utangMama(d){return sum(t=>t.d<=d&&t.kt==='Pinjam dari Mama')-sum(t=>t.d<=d&&t.kt==='Bayar Utang ke Mama')}
/* investasi */
function saham(){const pos={};for(const e of INV.saham){const p=pos[e.kode]=pos[e.kode]||{kode:e.kode,blot:0,cost:0,slot:0,div:0,real:0,ev:[]};p.ev.push(e);
  if(e.jenis==='Beli'){p.blot+=e.lot;p.cost+=e.total}else if(e.jenis==='Jual'){p.slot+=e.lot;p.real+=e.untung}else p.div+=e.total}
 return Object.values(pos).map(p=>{p.lot=p.blot-p.slot;p.modal=p.blot?p.cost*p.lot/p.blot:0;p.harga=S.price[p.kode]||0;p.nilai=p.lot*100*p.harga;p.pl=p.nilai-p.modal;return p})}
function rdGoals(){const g={};for(const e of INV.rd){const x=g[e.tujuan]=g[e.tujuan]||{tujuan:e.tujuan,beli:0,jual:0,untung:0,ev:[],produk:''};x.ev.push(e);if(e.jenis==='Beli'){x.beli+=e.modal||0;x.produk=e.produk}else{x.jual+=e.modal||0;x.untung+=e.untung||0}}
 return Object.values(g).map(x=>{const c=INV.cur[x.tujuan]||[0,0];x.modal=c[0];x.nilai=S.rdcur[x.tujuan]??c[1];x.pl=x.nilai-x.modal;return x})}
function wealthPersonal(d=today){const tot=S.acc.reduce((s,a)=>s+bal(a.n,d),0),m=mama(d),di=disan(d),riba=S.acc.filter(a=>a.g==='Dana Riba').reduce((s,a)=>s+bal(a.n,d),0);
 const sh=saham().reduce((s,p)=>s+p.nilai,0),rd=rdGoals().reduce((s,g)=>s+g.nilai,0);
 const kosInv=S.rdcur['__kos']??INV.kos[1];
 return{tot,mama:m,disan:di,riba,sh,rd,kosInv,val:tot-m.held-di.held-riba+m.inv+sh+rd-utangMama(d)}}
/* ================= FILTER / PELACAKAN ================= */
let F={}, page=1, agg='bulan';
function match(t,f){if(f.ids&&!f.ids.includes(t.id))return false;
 if(f.from&&t.d<f.from)return false;if(f.to&&t.d>f.to)return false;
 if(f.tj&&t.tj!==f.tj)return false;if(f.sb&&t.sb!==f.sb)return false;if(f.kt&&t.kt!==f.kt)return false;
 if(f.a&&t.a!==f.a&&t.tu!==f.a)return false;if(f.cek&&!t.cek)return false;if(f.tipe&&t.t!==f.tipe)return false;
 if(f.q){const q=f.q.toLowerCase();if(!(t.ket+' '+t.kt+' '+t.sb+' '+t.a+' '+(t.tu||'')+' '+t.cek).toLowerCase().includes(q))return false}
 return true}
function lacak(f,title){F={...f,title};page=1;go('trx')}
const flow=(t,a)=>t.t==='T'?(t.tu===a?1:(t.a===a?-1:0)):(t.t==='M'?1:-1);
/* ================= NAVIGASI ================= */
const VIEWS=[['home','Beranda'],['trx','Transaksi'],['rep','Laporan'],['mama','Uang Mama'],['inv','Investasi'],['plan','Rencana'],['add','Catat'],['set','Atur']];
let V='home',charts={};
function nav(){$('nav').innerHTML=VIEWS.map(([k,l])=>`<button data-v="${k}" class="${k===V?'on':''}">${l}</button>`).join('');
 $('nav').querySelectorAll('button').forEach(b=>b.onclick=()=>{if(b.dataset.v==='trx'&&V!=='trx'&&!F.keep)F={};go(b.dataset.v)})}
function go(v){V=v;nav();Object.values(charts).forEach(c=>c.destroy&&c.destroy());charts={};({home,trx,rep,mama:mamaV,inv:invV,plan,add,set})[v]();window.scrollTo(0,0)}
function sheet(html){$('sheetIn').innerHTML=html;$('sheet').style.display='flex'}
$('sheet').onclick=e=>{if(e.target.id==='sheet')$('sheet').style.display='none'};
function closeSheet(){$('sheet').style.display='none'}
function netS(){const e=$('net');e.textContent=navigator.onLine?'Online':'Offline';e.className='pill'+(navigator.onLine?'':' w')}
addEventListener('online',netS);addEventListener('offline',netS);
/* tautan lacak siap pakai */
function L(label,f,cls=''){const k='f'+Math.random().toString(36).slice(2,8);LK[k]=f;return`<span class="ac ${cls}" data-l="${k}" style="cursor:pointer">${label}</span>`}
let LK={};
document.addEventListener('click',e=>{const x=e.target.closest('[data-l]');if(x&&LK[x.dataset.l]){closeSheet();const f=LK[x.dataset.l];lacak(f,f.title)}
 const r=e.target.closest('[data-tx]');if(r)detail(+r.dataset.tx)});
/* ================= BERANDA ================= */
function home(){LK={};const now=new Date(),y=now.getFullYear(),m=now.getMonth(),a=ds(new Date(y,m,1)),b=mEnd(y,m),W=wealthPersonal(),M=W.mama;
 const inc=SUMBER.Pendapatan.map(s=>[s,income(a,b,s)]).filter(x=>x[1]),exp=SUMBER.Pengeluaran.map(s=>[s,expense(a,b,s)]).filter(x=>x[1]);
 $('main').innerHTML=`
 <div class="card"><div class="mut">Kekayaan pribadimu (perkiraan)</div><div class="big">${rp(W.val)}</div>
  <div class="tiny">Uang di semua akun ${rp(W.tot)} − uang mama & disan − dana riba + investasi. <span class="ac" id="howW">Lihat rinciannya</span></div></div>
 <div class="card"><h3>Uang mama</h3><div class="g2">
  <div class="kp" id="kMama"><div class="a">Dipegang olehmu</div><div class="b">${rp(M.held)}</div></div>
  <div class="kp" id="kAman"><div class="a">Aman (kantong mama + investasi)</div><div class="b">${rp(M.aman)}</div></div></div>
  <div class="st ${M.sisa<=0?'ok':'w'}">${M.sisa<=0?'LUNAS ✓ Semua uang mama sudah dipisahkan':'BELUM LUNAS: '+rp(M.sisa)+' uang mama masih ada di akun pribadimu'}</div></div>
 <div class="card"><h3>Bulan ini (${BULAN[m]} ${y})</h3>
  <div class="mut">Pendapatan</div>${inc.map(([s,v])=>`<div class="row" data-f='${esc(JSON.stringify({tj:'Pendapatan',sb:s,from:a,to:b}))}'><div class="l">${s}</div><div class="r up">${rp(v)}</div><span class="chev">›</span></div>`).join('')||'<div class="tiny">Belum ada</div>'}
  <div class="mut" style="margin-top:8px">Pengeluaran</div>${exp.map(([s,v])=>`<div class="row" data-f='${esc(JSON.stringify({tj:'Pengeluaran',sb:s,from:a,to:b}))}'><div class="l">${s}</div><div class="r dn">${rp(v)}</div><span class="chev">›</span></div>`).join('')||'<div class="tiny">Belum ada</div>'}</div>
 <div class="card"><h3>Saldo per akun (ketuk untuk melacak)</h3>${S.acc.map(x=>({x,b:bal(x.n)})).filter(o=>o.b||o.x.g!=='Usaha').map(({x,b})=>`<div class="row" data-acc="${esc(x.n)}"><div class="l"><div class="t1">${esc(x.n)}</div><div class="t2">${esc(x.g)}</div></div><div class="r">${rp(b)}</div><span class="chev">›</span></div>`).join('')}</div>`;
 document.querySelectorAll('#main [data-f]').forEach(r=>r.onclick=()=>{const f=JSON.parse(r.dataset.f);lacak(f,`${f.sb} · ${fdate(f.from)} – ${fdate(f.to)}`)});
 document.querySelectorAll('#main [data-acc]').forEach(r=>r.onclick=()=>accSheet(r.dataset.acc));
 $('kMama').onclick=()=>lacak({tj:'Pendapatan',sb:'Uang Kos Mama'},'Uang kos mama masuk');$('kAman').onclick=()=>go('mama');
 $('howW').onclick=()=>sheet(`<h3>Rincian kekayaan pribadi</h3>
  <div class="kv"><span>Uang di semua akun</span><span>${rp(W.tot)}</span></div>
  <div class="kv"><span>− Uang mama yang kamu pegang</span><span>${rp(W.mama.held)}</span></div>
  <div class="kv"><span>+ Uang mama yang sudah diinvestasikan (tidak ada di akun)</span><span>${rp(W.mama.inv)}</span></div>
  <div class="kv"><span>− Uang Disan</span><span>${rp(W.disan.held)}</span></div>
  <div class="kv"><span>− Dana riba (Kantong Riba)</span><span>${rp(W.riba)}</span></div>
  <div class="kv"><span>− Utang ke mama</span><span>${rp(utangMama(today))}</span></div>
  <div class="kv"><span>+ Nilai saham</span><span>${rp(W.sh)}</span></div>
  <div class="kv"><span>+ Nilai reksadana pribadi</span><span>${rp(W.rd)}</span></div>
  <div class="kv"><b>Kekayaan pribadi</b><b>${rp(W.val)}</b></div>`)}
function accSheet(n){const x=S.acc.find(a=>a.n===n),b=bal(n);let mi=0,ko=0,ti=0,to=0;
 for(const t of S.tx){if(t.a===n){if(t.t==='M')mi+=t.j;else if(t.t==='K')ko+=t.j;else to+=t.j}if(t.t==='T'&&t.tu===n)ti+=t.j}
 sheet(`<h3>${esc(n)}</h3><div class="tiny">${esc(x.ket||'')}</div>
 <div class="kv"><span>Saldo awal (${fdate(x.od)})</span><span>${rp(x.o)}</span></div>
 <div class="kv"><span>+ Uang masuk</span><span>${L(rp(mi),{a:n,tipe:'M',title:n+': uang masuk'})}</span></div>
 <div class="kv"><span>− Uang keluar</span><span>${L(rp(ko),{a:n,tipe:'K',title:n+': uang keluar'})}</span></div>
 <div class="kv"><span>+ Pindahan masuk dari akun lain</span><span>${L(rp(ti),{a:n,tipe:'T',title:n+': pindah akun'})}</span></div>
 <div class="kv"><span>− Dipindah ke akun lain</span><span>${L(rp(to),{a:n,tipe:'T',title:n+': pindah akun'})}</span></div>
 <div class="kv"><b>Saldo sekarang</b><b>${rp(b)}</b></div>
 <button class="b p" style="width:100%;margin-top:10px" id="allAcc">Lihat semua transaksi akun ini</button>`);
 $('allAcc').onclick=()=>{closeSheet();lacak({a:n},'Semua transaksi '+n)}}
/* ================= TRANSAKSI ================= */
function opts(list,sel,first){return(first?`<option value="">${first}</option>`:'')+list.map(v=>`<option ${v===sel?'selected':''}>${esc(v)}</option>`).join('')}
function katList(tj,sb){return[...new Set(S.tx.filter(t=>(!tj||t.tj===tj)&&(!sb||t.sb===sb)).map(t=>t.kt))].sort()}
function trx(){LK={};const f=F;const res=S.tx.filter(t=>match(t,f)).sort((p,q)=>q.d.localeCompare(p.d)||q.id-p.id);
 const sIn=res.reduce((s,t)=>s+(t.t==='M'?t.j:0),0),sOut=res.reduce((s,t)=>s+(t.t==='K'?t.j:0),0),sTr=res.reduce((s,t)=>s+(t.t==='T'?t.j:0),0);
 const g={};for(const t of res){const k=agg==='hari'?t.d:agg==='bulan'?t.d.slice(0,7):t.d.slice(0,4);const o=g[k]=g[k]||[0,0];if(t.t==='M')o[0]+=t.j;else if(t.t==='K')o[1]+=t.j}
 const gk=Object.keys(g).sort().reverse().slice(0,agg==='hari'?60:36);
 const lbl=k=>agg==='hari'?fdate(k):agg==='bulan'?BULAN[+k.slice(5)-1]+' '+k.slice(0,4):k;
 const rng=k=>agg==='hari'?[k,k]:agg==='bulan'?[k+'-01',mEnd(+k.slice(0,4),+k.slice(5)-1)]:[k+'-01-01',k+'-12-31'];
 const shown=res.slice(0,page*80);
 $('main').innerHTML=`
 <div class="card"><h3>Cari & filter</h3><div class="fl">
  <input class="w2" id="fq" placeholder="Kata kunci (keterangan, kategori, akun…)" value="${esc(f.q||'')}">
  <select id="ftj">${opts(TUJ,f.tj,'Semua tujuan')}</select>
  <select id="fsb">${opts(f.tj?SUMBER[f.tj]:Object.values(SUMBER).flat(),f.sb,'Semua sumber')}</select>
  <select class="w2" id="fkt">${opts(katList(f.tj,f.sb),f.kt,'Semua kategori')}</select>
  <select id="fa">${opts(accNames(),f.a,'Semua akun')}</select>
  <select id="ftp">${opts(['Masuk','Keluar','Pindah'],{M:'Masuk',K:'Keluar',T:'Pindah'}[f.tipe],'Semua jenis')}</select>
  <input type="date" id="ffrom" value="${f.from||''}"><input type="date" id="fto" value="${f.to||''}">
  <label class="w2 tiny"><input type="checkbox" id="fcek" style="width:auto;min-height:0" ${f.cek?'checked':''}> Hanya yang perlu dicek</label>
  <button class="b" id="fclr">Hapus filter</button><button class="b p" id="fgo">Cari</button></div></div>
 ${f.title?`<div class="chips"><span class="chip">🔎 ${esc(f.title)}</span></div>`:''}
 <div class="card"><div class="g3">
  <div class="kp"><div class="a">Uang masuk</div><div class="b up">${rp(sIn)}</div></div>
  <div class="kp"><div class="a">Uang keluar</div><div class="b dn">${rp(sOut)}</div></div>
  <div class="kp"><div class="a">Pindah akun</div><div class="b">${rp(sTr)}</div></div></div>
  <div class="tiny" style="margin-top:6px">${res.length} transaksi ditemukan</div></div>
 <div class="card"><h3>Total per periode</h3><div class="seg" id="aggSeg">${['hari','bulan','tahun'].map(x=>`<button data-g="${x}" class="${x===agg?'on':''}">Per ${x}</button>`).join('')}</div>
  <table style="margin-top:8px"><tr><th>Periode</th><th class="n">Masuk</th><th class="n">Keluar</th><th class="n">Selisih</th></tr>
  ${gk.map(k=>{const[a1,b1]=rng(k);return`<tr class="cl" data-g2="${a1}|${b1}"><td>${lbl(k)}</td><td class="n up">${rp(g[k][0])}</td><td class="n dn">${rp(g[k][1])}</td><td class="n">${rp(g[k][0]-g[k][1])}</td></tr>`}).join('')||'<tr><td colspan=4 class="empty">Tidak ada data</td></tr>'}</table></div>
 <div class="card"><h3>Daftar transaksi</h3>${shown.map(txRow).join('')||'<div class="empty">Tidak ada transaksi</div>'}
  ${res.length>shown.length?`<button class="b" style="width:100%;margin-top:8px" id="more">Tampilkan lagi (${res.length-shown.length} tersisa)</button>`:''}</div>`;
 const rd=()=>({q:$('fq').value.trim()||undefined,tj:$('ftj').value||undefined,sb:$('fsb').value||undefined,kt:$('fkt').value||undefined,a:$('fa').value||undefined,
   tipe:{Masuk:'M',Keluar:'K',Pindah:'T'}[$('ftp').value],from:$('ffrom').value||undefined,to:$('fto').value||undefined,cek:$('fcek').checked||undefined});
 $('ftj').onchange=()=>{F={...rd(),sb:undefined,kt:undefined};trx()};$('fsb').onchange=()=>{F={...rd(),kt:undefined};trx()};
 $('fgo').onclick=()=>{F=rd();page=1;trx()};$('fclr').onclick=()=>{F={};page=1;trx()};
 $('fq').onkeydown=e=>{if(e.key==='Enter'){F=rd();page=1;trx()}};
 document.querySelectorAll('#aggSeg button').forEach(b=>b.onclick=()=>{agg=b.dataset.g;trx()});
 document.querySelectorAll('[data-g2]').forEach(r=>r.onclick=()=>{const[a1,b1]=r.dataset.g2.split('|');F={...F,from:a1,to:b1,title:(F.title?F.title+' · ':'')+r.firstChild.textContent};page=1;trx()});
 if($('more'))$('more').onclick=()=>{page++;trx()}}
function txRow(t){const c=t.t==='M'?'up':t.t==='K'?'dn':'';const s=t.t==='M'?'+':t.t==='K'?'−':'';
 return`<div class="row" data-tx="${t.id}"><div class="l"><div class="t1">${esc(t.ket||t.kt)}</div><div class="t2">${fdate(t.d)} · ${esc(t.a)}${t.t==='T'?' → '+esc(t.tu):''} · ${esc(t.sb)} › ${esc(t.kt)}${t.cek?' · ⚠️':''}</div></div><div class="r ${c}">${s}${rp(t.j)}</div></div>`}
function invLinks(id){const out=[];for(const e of INV.saham)if(e.tx===id)out.push(`${e.jenis} saham ${e.kode} (${fdate(e.tgl)})`);for(const e of INV.rd)if(e.tx===id)out.push(`${e.jenis} reksadana ${e.tujuan} (${fdate(e.tgl)})`);return out}
function detail(id){const t=byId(id);if(!t)return;const inv=invLinks(id);
 const before=S.tx.filter(x=>(x.a===t.a||x.tu===t.a)&&(x.d<t.d||(x.d===t.d&&x.id<=t.id)));
 const saldo=openAt(t.a,t.d)+before.reduce((s,x)=>s+flow(x,t.a)*x.j,0);
 sheet(`<h3>${esc(t.ket||t.kt)}</h3>
 <div class="kv"><span>Tanggal</span><span>${fdate(t.d)}</span></div>
 <div class="kv"><span>Jumlah</span><span class="${t.t==='M'?'up':t.t==='K'?'dn':''}">${rp(t.j)}</span></div>
 <div class="kv"><span>Tujuan</span><span>${L(esc(t.tj),{tj:t.tj,title:t.tj})}</span></div>
 <div class="kv"><span>Sumber</span><span>${L(esc(t.sb),{tj:t.tj,sb:t.sb,title:t.sb})}</span></div>
 <div class="kv"><span>Kategori</span><span>${L(esc(t.kt),{tj:t.tj,sb:t.sb,kt:t.kt,title:t.kt})}</span></div>
 <div class="kv"><span>${t.t==='T'?'Dari akun':'Akun'}</span><span>${L(esc(t.a),{a:t.a,title:'Semua transaksi '+t.a})}</span></div>
 ${t.t==='T'?`<div class="kv"><span>Ke akun</span><span>${L(esc(t.tu),{a:t.tu,title:'Semua transaksi '+t.tu})}</span></div>`:''}
 <div class="kv"><span>Saldo ${esc(t.a)} setelah transaksi ini</span><span>${rp(saldo)}</span></div>
 <div class="kv"><span>Transaksi di hari yang sama</span><span>${L('Lihat',{from:t.d,to:t.d,title:'Tanggal '+fdate(t.d)})}</span></div>
 ${inv.length?`<div class="kv"><span>Terkait investasi</span><span>${inv.map(esc).join('<br>')}</span></div>`:''}
 ${t.cek?`<div class="st w">⚠️ ${esc(t.cek)}</div>`:''}
 <div class="g2" style="margin-top:12px"><button class="b" id="edT">Ubah</button><button class="b d" id="delT">Hapus</button></div>`);
 $('edT').onclick=()=>{closeSheet();EDIT=id;go('add')};
 $('delT').onclick=()=>{if(confirm('Hapus transaksi ini?')){S.tx=S.tx.filter(x=>x.id!==id);save();closeSheet();go(V)}}}
/* ================= LAPORAN ================= */
let RP={m:'bulan',d:today};
function period(){const d=pd(RP.d),y=d.getFullYear(),m=d.getMonth();
 if(RP.m==='hari')return{a:RP.d,b:RP.d,lab:fdate(RP.d)};if(RP.m==='bulan')return{a:ds(new Date(y,m,1)),b:mEnd(y,m),lab:BULAN[m]+' '+y};return{a:y+'-01-01',b:y+'-12-31',lab:'Tahun '+y}}
function rep(){LK={};const P=period(),tree={};
 for(const t of S.tx){if(!inR(t,P.a,P.b)||t.tj==='Pindah Uang')continue;const x=tree[t.tj]=tree[t.tj]||{v:0,s:{}},y=x.s[t.sb]=x.s[t.sb]||{v:0,k:{}};
  const sg=t.tj==='Tabungan'?(t.t==='K'?1:-1):1;x.v+=t.j*sg;y.v+=t.j*sg;y.k[t.kt]=(y.k[t.kt]||0)+t.j*sg}
 const inc=income(P.a,P.b),exp=expense(P.a,P.b);
 $('main').innerHTML=`<div class="card"><div class="seg" id="rpm">${['hari','bulan','tahun'].map(x=>`<button data-m="${x}" class="${x===RP.m?'on':''}">Per ${x}</button>`).join('')}</div>
  <input type="date" id="rpd" value="${RP.d}" style="margin-top:8px"><div class="mut" style="margin-top:6px">${P.lab}</div>
  <div class="g2" style="margin-top:8px"><div class="kp"><div class="a">Pendapatan</div><div class="b up">${rp(inc)}</div></div><div class="kp"><div class="a">Pengeluaran</div><div class="b dn">${rp(exp)}</div></div></div>
  <div class="tiny" style="margin-top:6px">Selisih ${rp(inc-exp)}. Pindah uang antar akun tidak dihitung.</div></div>
 <div class="card tree"><h3>Rincian (ketuk untuk melacak)</h3>${['Pendapatan','Pengeluaran','Tabungan'].map(tj=>{const x=tree[tj];if(!x)return'';
  return`<div class="row n0" data-f='${esc(JSON.stringify({tj,from:P.a,to:P.b}))}'><div class="l">${tj}</div><div class="r">${rp(x.v)}</div></div>`+Object.entries(x.s).sort((a,b)=>b[1].v-a[1].v).map(([sb,y])=>
   `<div class="row n1" data-f='${esc(JSON.stringify({tj,sb,from:P.a,to:P.b}))}'><div class="l">${esc(sb)}</div><div class="r">${rp(y.v)}</div></div>`+Object.entries(y.k).sort((a,b)=>b[1]-a[1]).map(([kt,v])=>
   `<div class="row n2" data-f='${esc(JSON.stringify({tj,sb,kt,from:P.a,to:P.b}))}'><div class="l">${esc(kt)}</div><div class="r">${rp(v)}</div></div>`).join('')).join('')}).join('')||'<div class="empty">Tidak ada transaksi</div>'}
  <div class="tiny">Tabungan: angka positif = uang disetor ke tabungan/investasi; negatif = dicairkan.</div></div>
 <div class="card"><h3>Pendapatan vs pengeluaran 12 bulan</h3><div class="ch"><canvas id="c1"></canvas></div></div>`;
 document.querySelectorAll('#rpm button').forEach(b=>b.onclick=()=>{RP.m=b.dataset.m;rep()});$('rpd').onchange=e=>{RP.d=e.target.value||today;rep()};
 document.querySelectorAll('#main [data-f]').forEach(r=>r.onclick=()=>{const f=JSON.parse(r.dataset.f);lacak(f,[f.tj,f.sb,f.kt].filter(Boolean).join(' › ')+' · '+P.lab)});
 const d=pd(RP.d),Lb=[],I=[],X=[];for(let i=11;i>=0;i--){const dd=new Date(d.getFullYear(),d.getMonth()-i,1),a=ds(dd),b=mEnd(dd.getFullYear(),dd.getMonth());Lb.push(BLN[dd.getMonth()]);I.push(income(a,b));X.push(expense(a,b))}
 charts.c1=new Chart($('c1'),{type:'bar',data:{labels:Lb,datasets:[{label:'Pendapatan',data:I,backgroundColor:'#1D9E75'},{label:'Pengeluaran',data:X,backgroundColor:'#D85A30'}]},options:{scales:{y:{ticks:{callback:v=>Math.abs(v)>=1e6?(v/1e6).toFixed(1)+'jt':(v/1e3).toFixed(0)+'rb'}}}}})}
/* ================= UANG MAMA ================= */
let MY=new Date().getFullYear();
function mamaV(){LK={};const M=mama(today),D=disan(today),U=utangMama(today);
 const rows=BULAN.map((n,i)=>{const a=ds(new Date(MY,i,1)),b=mEnd(MY,i);if(a>today)return null;const m=mama(b);return{n,a,b,m,inn:income(a,b,'Uang Kos Mama')+income(a,b,'Uang Kedai'),out:expense(a,b,'Pengeluaran Uang Kos')+expense(a,b,'Pengeluaran Uang Kedai')}}).filter(Boolean);
 $('main').innerHTML=`<div class="card"><h3>Status uang mama hari ini</h3>
  <div class="kv"><span>Uang mama yang pernah kamu terima (kos + kedai)</span><span>${L(rp(M.inn),{tj:'Pendapatan',sb:'Uang Kos Mama',title:'Uang kos mama masuk'})}</span></div>
  <div class="kv"><span>− Dipakai untuk kebutuhan kos & kedai</span><span>${L(rp(M.out),{tj:'Pengeluaran',sb:'Pengeluaran Uang Kos',title:'Pengeluaran uang kos'})}</span></div>
  ${S.mamaOpen?`<div class="kv"><span>+ Saldo awal (sebelum Feb 2024)</span><span>${rp(S.mamaOpen)}</span></div>`:''}
  <div class="kv"><b>= Uang mama yang kamu pegang</b><b>${rp(M.held)}</b></div>
  <div class="kv"><span>Tersimpan di kantong mama (Kos Mama Cash + Jago)</span><span>${L(rp(M.akun),{a:'Jago - Uang Kos Mama',title:'Kantong uang kos mama'})}</span></div>
  <div class="kv"><span>Diinvestasikan untuk mama (bersih)</span><span>${L(rp(M.inv),{sb:'Reksadana uang kos mama',title:'Investasi uang kos mama'})}</span></div>
  <div class="st ${M.sisa<=0?'ok':'w'}">${M.sisa<=0?'LUNAS ✓ — uang mama aman, terpisah dari uang pribadimu'+(M.sisa<0?' (kamu malah menambah '+rp(-M.sisa)+')':''):'BELUM LUNAS — '+rp(M.sisa)+' masih ada di akun pribadimu atau terpakai. Pindahkan ke Kantong Uang Kos Mama.'}</div>
  <div class="tiny" style="margin-top:6px">Rincian pengeluaran kedai: ${L('lihat',{tj:'Pengeluaran',sb:'Pengeluaran Uang Kedai',title:'Pengeluaran uang kedai'})}. Pendapatan kedai: ${L('lihat',{tj:'Pendapatan',sb:'Uang Kedai',title:'Uang kedai masuk'})}.</div></div>
 <div class="card"><h3>Per bulan</h3><div class="seg" id="my">${[MY-2,MY-1,MY].map(y=>`<button data-y="${y}" class="${y===MY?'on':''}">${y}</button>`).join('')}</div>
  <table style="margin-top:8px"><tr><th>Bulan</th><th class="n">Masuk</th><th class="n">Keluar</th><th class="n">Dipegang</th><th class="n">Status</th></tr>
  ${rows.map(r=>`<tr class="cl" data-mm="${r.a}|${r.b}"><td>${r.n.slice(0,3)}</td><td class="n up">${rp(r.inn)}</td><td class="n dn">${rp(r.out)}</td><td class="n">${rp(r.m.held)}</td><td class="n"><span class="pill ${r.m.sisa<=0?'':'w'}">${r.m.sisa<=0?'Lunas':'Belum'}</span></td></tr>`).join('')}</table>
  <div class="tiny">Ketuk bulan untuk melihat transaksi uang mama bulan itu.</div></div>
 <div class="card"><h3>Uang Disan</h3><div class="kv"><span>Dipegang</span><span>${L(rp(D.held),{sb:'Uang Disan',title:'Uang Disan'})}</span></div><div class="kv"><span>Ada di akun Uang Disan</span><span>${rp(D.akun)}</span></div>
  <div class="st ${D.sisa<=0?'ok':'w'}">${D.sisa<=0?'LUNAS ✓':'Belum: '+rp(D.sisa)}</div></div>
 <div class="card"><h3>Utang ke mama (kotak pribadi)</h3><div class="kv"><span>Sisa utang</span><span>${L(rp(U),{sb:'Pinjam uang mama',title:'Pinjam uang mama'})}</span></div></div>
 <div class="card"><h3>Dana riba</h3>${['Bunga bank','Bunga deposito','Dividen bank','Pajak bunga','Selisih bunga','Disalurkan'].map(k=>`<div class="kv"><span>${k}</span><span>${L(rp(sum(t=>t.sb==='Riba'&&t.kt===k)),{sb:'Riba',kt:k,title:'Riba: '+k})}</span></div>`).join('')}
  <div class="kv"><b>Sisa di Kantong Riba (harus disalurkan)</b><b>${rp(S.acc.filter(a=>a.g==='Dana Riba').reduce((s,a)=>s+bal(a.n),0))}</b></div></div>`;
 document.querySelectorAll('#my button').forEach(b=>b.onclick=()=>{MY=+b.dataset.y;mamaV()});
 document.querySelectorAll('[data-mm]').forEach(r=>r.onclick=()=>{const[a,b]=r.dataset.mm.split('|');lacak({from:a,to:b,q:undefined,ids:S.tx.filter(t=>inR(t,a,b)&&(MAMA_IN.includes(t.sb)||MAMA_OUT.includes(t.sb)||t.sb==='Reksadana uang kos mama'||S.acc.find(x=>x.n===t.a&&x.g==='Titipan Mama'))).map(t=>t.id)},'Uang mama '+r.firstChild.textContent+' '+MY)})}
/* ================= INVESTASI ================= */
let IT='saham';
function invV(){LK={};const P=saham(),G=rdGoals(),hold=P.filter(p=>p.lot>0),sold=P.filter(p=>p.lot<=0);
 const tm=hold.reduce((s,p)=>s+p.modal,0),tn=hold.reduce((s,p)=>s+p.nilai,0),real=P.reduce((s,p)=>s+p.real,0),div=INV.saham.filter(e=>e.jenis==='Dividen');
 const gm=G.reduce((s,g)=>s+g.modal,0),gn=G.reduce((s,g)=>s+g.nilai,0);
 const dep=S.tx.filter(t=>t.sb==='Deposito');
 $('main').innerHTML=`<div class="card"><h3>Ringkasan semua investasi pribadi</h3><div class="g2">
  <div class="kp" id="gS"><div class="a">Saham (nilai)</div><div class="b">${rp(tn)}</div><div class="tiny ${tn-tm>=0?'up':'dn'}">${rp(tn-tm)} dari modal ${rp(tm)}</div></div>
  <div class="kp" id="gR"><div class="a">Reksadana (nilai)</div><div class="b">${rp(gn)}</div><div class="tiny ${gn-gm>=0?'up':'dn'}">${rp(gn-gm)} dari modal ${rp(gm)}</div></div></div>
  <div class="tiny" style="margin-top:6px">Reksadana uang kos mama (milik mama, tidak dihitung): ${rp(S.rdcur['__kos']??INV.kos[1])}</div></div>
 <div class="seg" id="its">${[['saham','Saham'],['rd','Reksadana'],['dep','Deposito']].map(([k,l])=>`<button data-t="${k}" class="${k===IT?'on':''}">${l}</button>`).join('')}</div>
 <div id="itb"></div>`;
 document.querySelectorAll('#its button').forEach(b=>b.onclick=()=>{IT=b.dataset.t;invV()});$('gS').onclick=()=>{IT='saham';invV()};$('gR').onclick=()=>{IT='rd';invV()};
 const box=$('itb');
 if(IT==='saham')box.innerHTML=`<div class="card"><h3>Saham dipegang (ketuk untuk riwayat & sumber dana)</h3>${hold.map(p=>`<div class="row" data-k="${p.kode}"><div class="l"><div class="t1"><b>${p.kode}</b> · ${p.lot} lot</div><div class="t2">modal ${rp(p.modal)} · harga ${p.harga.toLocaleString('id-ID')}</div></div><div class="r"><div>${rp(p.nilai)}</div><div class="tiny ${p.pl>=0?'up':'dn'}">${rp(p.pl)} (${pct(p.modal?p.pl/p.modal:null)})</div></div><span class="chev">›</span></div>`).join('')}</div>
  <div class="card"><h3>Saham yang sudah dijual</h3>${sold.map(p=>`<div class="row" data-k="${p.kode}"><div class="l">${p.kode}</div><div class="r ${p.real>=0?'up':'dn'}">${rp(p.real)}</div><span class="chev">›</span></div>`).join('')}
   <div class="kv"><b>Total untung terealisasi</b><b>${rp(real)}</b></div></div>
  <div class="card"><h3>Dividen</h3>${div.map(e=>`<div class="row" ${e.tx?`data-tx="${e.tx}"`:''}><div class="l"><div class="t1">${e.kode} ${e.riba?'<span class="pill n">riba</span>':''}</div><div class="t2">${fdate(e.tgl)} · ${esc(e.alokasi||'')}</div></div><div class="r up">${rp(e.total)}</div></div>`).join('')}</div>`;
 if(IT==='rd')box.innerHTML=`<div class="card"><h3>Reksadana per tujuan (ketuk untuk riwayat & sumber dana)</h3>${G.map(g=>`<div class="row" data-g="${esc(g.tujuan)}"><div class="l"><div class="t1">${esc(g.tujuan)}</div><div class="t2">modal ${rp(g.modal)} · ${esc(g.produk)}</div></div><div class="r"><div>${rp(g.nilai)}</div><div class="tiny ${g.pl>=0?'up':'dn'}">${rp(g.pl)}</div></div><span class="chev">›</span></div>`).join('')}</div>`;
 if(IT==='dep')box.innerHTML=`<div class="card"><h3>Deposito BPR</h3><div class="kv"><span>Saldo deposito sekarang</span><span>${rp(bal('Deposito BPR'))}</span></div>
  <div class="kv"><span>Total bagi hasil</span><span>${L(rp(sum(t=>t.sb==='Deposito'&&t.kt==='Bagi hasil')),{sb:'Deposito',kt:'Bagi hasil',title:'Bagi hasil deposito'})}</span></div>
  <div class="kv"><span>Bunga riba (BPR Kirana)</span><span>${L(rp(sum(t=>t.kt==='Bunga bank'&&/kirana/i.test(t.ket))),{q:'kirana',title:'Deposito BPR Kirana'})}</span></div>
  ${INV.dep.map(d=>`<div class="row" data-dq="${esc(d.bpr)}"><div class="l"><div class="t1">${esc(d.bpr)}</div><div class="t2">${fdate(d.aju)} → ${fdate(d.tempo)} · ${d.tenor} bln</div></div><div class="r">${rp(d.modal)}</div><span class="chev">›</span></div>`).join('')}
  <button class="b" style="width:100%;margin-top:8px" id="depAll">Semua transaksi akun Deposito BPR</button></div>`;
 document.querySelectorAll('[data-k]').forEach(r=>r.onclick=()=>sahamSheet(r.dataset.k));
 document.querySelectorAll('[data-g]').forEach(r=>r.onclick=()=>rdSheet(r.dataset.g));
 document.querySelectorAll('[data-dq]').forEach(r=>r.onclick=()=>{const w=r.dataset.dq.replace(/PT\.?|BPRS?|SYARIAH/gi,'').trim().split(/\s+/)[0];lacak({q:w},'Deposito '+r.dataset.dq)});
 if($('depAll'))$('depAll').onclick=()=>lacak({a:'Deposito BPR'},'Akun Deposito BPR')}
function evSrc(e){if(!e.tx)return`<div class="tiny">${e.tgl<'2025-01-01'?'Sebelum 2025 / dari catatan HP':'Tidak ada transaksi kas (pindah antar tujuan)'}</div>`;
 const t=byId(e.tx);let h=`<div class="tiny">Kas: ${L(esc(t.a)+' · '+rp(t.j)+' · '+fdate(t.d),{ids:[t.id],title:'Transaksi kas '+fdate(t.d)})}</div>`;
 if(e.dana&&e.dana.length){h+=`<div class="tiny">Dana masuk ke ${esc(t.a)} sebelumnya: `+e.dana.map(i=>{const x=byId(i);return x?L(`${esc(x.t==='T'?'dari '+x.a:(x.sb==='Pindah akun'?x.ket.slice(0,45):x.sb+': '+x.kt))} ${rp(x.j)} (${fdate(x.d)})`,{ids:[x.id],title:'Sumber dana'}):''}).join(', ')+'</div>'}return h}
function sahamSheet(k){const p=saham().find(x=>x.kode===k);
 sheet(`<h3>Saham ${k}</h3>${p.lot>0?`<div class="kv"><span>Lot dipegang</span><span>${p.lot}</span></div><div class="kv"><span>Modal (rata-rata, termasuk fee)</span><span>${rp(p.modal)}</span></div>
 <div class="kv"><span>Harga terakhir</span><span><input type="number" id="hp" value="${p.harga}" style="width:110px;min-height:30px;padding:3px 6px"></span></div>
 <div class="kv"><span>Nilai sekarang</span><span>${rp(p.nilai)}</span></div><div class="kv"><span>Untung/rugi</span><span class="${p.pl>=0?'up':'dn'}">${rp(p.pl)}</span></div>`:`<div class="kv"><span>Untung/rugi terealisasi</span><span class="${p.real>=0?'up':'dn'}">${rp(p.real)}</span></div>`}
 <h3 style="margin-top:12px">Riwayat & asal-usul uang</h3>${p.ev.sort((a,b)=>a.tgl.localeCompare(b.tgl)).map(e=>`<div style="padding:8px 0;border-top:1px solid var(--line)">
  <div><b>${e.jenis}</b> · ${fdate(e.tgl)} · ${e.lot?e.lot+' lot':''} <span style="float:right">${rp(e.total)}</span></div>
  ${e.jenis==='Beli'?`<div class="tiny">Harga ${(e.harga||0).toLocaleString('id-ID')} · nilai ${rp(e.nilai)} + fee ${rp(e.fee)}${e.sumber?' · sumber: '+esc(e.sumber):''}</div>`:''}
  ${e.jenis==='Jual'?`<div class="tiny">Modal ${rp(e.modal)} → untung <span class="${e.untung>=0?'up':'dn'}">${rp(e.untung)}</span> · uang masuk ke:</div>`:''}
  ${e.jenis==='Dividen'?`<div class="tiny">${e.riba?'Riba — dipisahkan':'Halal'} · dipakai untuk: ${esc(e.alokasi||'-')}</div>`:''}${evSrc(e)}</div>`).join('')}`);
 if($('hp'))$('hp').onchange=ev=>{S.price[k]=+ev.target.value||0;save();closeSheet();invV()}}
function rdSheet(g){const x=rdGoals().find(z=>z.tujuan===g);
 sheet(`<h3>${esc(g)}</h3><div class="kv"><span>Modal sekarang</span><span>${rp(x.modal)}</span></div>
 <div class="kv"><span>Nilai sekarang (ubah dari aplikasi Bibit)</span><span><input type="number" id="rn" value="${Math.round(x.nilai)}" style="width:130px;min-height:30px;padding:3px 6px"></span></div>
 <div class="kv"><span>Untung/rugi</span><span class="${x.pl>=0?'up':'dn'}">${rp(x.pl)}</span></div><div class="kv"><span>Total dibeli / dijual (modal)</span><span>${rp(x.beli)} / ${rp(x.jual)}</span></div>
 <div class="kv"><span>Untung yang sudah dicairkan</span><span>${rp(x.untung)}</span></div>
 <h3 style="margin-top:12px">Riwayat & asal-usul uang</h3>${x.ev.sort((a,b)=>a.tgl.localeCompare(b.tgl)).map(e=>`<div style="padding:8px 0;border-top:1px solid var(--line)"><div><b>${e.jenis}</b> · ${fdate(e.tgl)} <span style="float:right">${rp(e.jenis==='Beli'?e.modal:e.nilai)}</span></div>
  <div class="tiny">${esc(e.produk)}${e.ket?' · '+esc(e.ket):''}${e.sumber?' · sumber: '+esc(e.sumber):''}${e.alokasi?' · dipakai: '+esc(e.alokasi):''}${e.jenis==='Jual'?' · untung '+rp(e.untung):''}</div>${evSrc(e)}</div>`).join('')}`);
 $('rn').onchange=ev=>{S.rdcur[g]=+ev.target.value||0;save();closeSheet();invV()}}
/* ================= RENCANA ================= */
function plan(){LK={};const G=rdGoals(),g=n=>G.find(x=>x.tujuan===n)||{nilai:0,modal:0};
 const e6=[...Array(6)].map((_,i)=>{const d=new Date();d.setMonth(d.getMonth()-1-i);return expense(ds(new Date(d.getFullYear(),d.getMonth(),1)),mEnd(d.getFullYear(),d.getMonth()),'Pengeluaran Gaji')+expense(ds(new Date(d.getFullYear(),d.getMonth(),1)),mEnd(d.getFullYear(),d.getMonth()),'Pengeluaran Jasa')});
 const i6=[...Array(6)].map((_,i)=>{const d=new Date();d.setMonth(d.getMonth()-1-i);return income(ds(new Date(d.getFullYear(),d.getMonth(),1)),mEnd(d.getFullYear(),d.getMonth()),'Gaji')+income(ds(new Date(d.getFullYear(),d.getMonth(),1)),mEnd(d.getFullYear(),d.getMonth()),'Jasa')});
 const avgE=e6.reduce((a,b)=>a+b,0)/6,avgI=i6.reduce((a,b)=>a+b,0)/6,sur=avgI-avgE;
 const base=[{n:'Dana Darurat',t:Math.round(avgE*6),g:'Dana Darurat',dl:'',note:'Target = 6× rata-rata pengeluaran pribadi bulanan'},{n:'Dana Kuliah',t:36000000,g:'Dana Kuliah',dl:'',note:'Target dari simulasi di file portofoliomu'},{n:'Dana Beli Laptop',t:6000000,g:'Dana Beli Laptop',dl:'',note:''}];
 const all=[...base.map(b=>({...b,...(S.goals.find(x=>x.n===b.n)||{})})),...S.goals.filter(x=>!base.find(b=>b.n===x.n))];
 const mo=dl=>{if(!dl)return null;const d=pd(dl),n=new Date();return Math.max(1,(d.getFullYear()-n.getFullYear())*12+d.getMonth()-n.getMonth())};
 $('main').innerHTML=`<div class="card"><h3>Kemampuan menabung (6 bulan terakhir)</h3>
  <div class="kv"><span>Rata-rata pendapatan pribadi (gaji + jasa)</span><span>${L(rp(avgI),{tj:'Pendapatan',sb:'Gaji',title:'Pendapatan gaji'})}</span></div>
  <div class="kv"><span>Rata-rata pengeluaran pribadi</span><span>${L(rp(avgE),{tj:'Pengeluaran',sb:'Pengeluaran Gaji',title:'Pengeluaran gaji'})}</span></div>
  <div class="kv"><b>Bisa ditabung per bulan</b><b class="${sur>=0?'up':'dn'}">${rp(sur)}</b></div></div>
 <div class="card"><h3>Tujuan keuangan (terhubung ke reksadana per tujuan)</h3>${all.map((x,i)=>{const cur=x.g?g(x.g).nilai:(x.got||0),p=x.t?Math.min(1,cur/x.t):0,sisa=Math.max(0,x.t-cur),m=mo(x.dl),need=m?sisa/m:null;
  return`<div style="padding:10px 0;border-top:1px solid var(--line)"><div style="display:flex;justify-content:space-between"><b>${esc(x.n)}</b><span class="pill ${p>=1?'':(need!=null&&need>sur?'w':'')}">${p>=1?'Tercapai':need==null?'Atur tenggat':need<=sur?'Sesuai jalur':'Perlu usaha lebih'}</span></div>
  <div class="tiny">${rp(cur)} dari ${rp(x.t)}${x.g?' · dari reksadana '+esc(x.g):''}${x.note?' · '+esc(x.note):''}</div><div class="bar"><i style="width:${p*100}%"></i></div>
  <div class="tiny" style="margin-top:4px">${need!=null?'Perlu '+rp(need)+'/bulan sampai '+fdate(x.dl):'Belum ada tenggat'} · <span class="ac" data-gi="${i}">ubah</span></div></div>`}).join('')}
  <button class="b" style="width:100%;margin-top:8px" id="gAdd">+ Tambah tujuan</button></div>
 <div class="card"><h3>Proyeksi kekayaan pribadi 12 bulan</h3><div class="ch"><canvas id="cp"></canvas></div><div class="tiny">Kekayaan sekarang ${rp(wealthPersonal().val)} + ${rp(sur)}/bulan.</div></div>`;
 const W=wealthPersonal().val,Lb=['Kini'],P=[W];for(let k=1;k<=12;k++){const d=new Date();d.setMonth(d.getMonth()+k);Lb.push(BLN[d.getMonth()]);P.push(W+sur*k)}
 charts.cp=new Chart($('cp'),{type:'line',data:{labels:Lb,datasets:[{data:P,borderColor:'#378ADD',borderDash:[5,4],pointRadius:2}]},options:{plugins:{legend:{display:false}},scales:{y:{ticks:{callback:v=>(v/1e6).toFixed(1)+'jt'}}}}});
 const edit=x=>{sheet(`<h3>${x?'Ubah':'Tambah'} tujuan</h3><div class="fl"><input class="w2" id="gn" placeholder="Nama" value="${esc(x?.n||'')}"><input type="number" id="gt" placeholder="Target (Rp)" value="${x?.t||''}"><input type="date" id="gd" value="${x?.dl||''}">
  <select class="w2" id="gg">${opts(rdGoals().map(z=>z.tujuan),x?.g,'Tidak terhubung ke reksadana')}</select><button class="b p w2" id="gs">Simpan</button></div>`);
  $('gs').onclick=()=>{const o={n:$('gn').value.trim(),t:+$('gt').value||0,dl:$('gd').value,g:$('gg').value||''};if(!o.n)return;S.goals=S.goals.filter(z=>z.n!==(x?.n||o.n));S.goals.push(o);save();closeSheet();plan()}};
 document.querySelectorAll('[data-gi]').forEach(s=>s.onclick=()=>edit(all[+s.dataset.gi]));$('gAdd').onclick=()=>edit(null)}
/* ================= CATAT ================= */
let EDIT=null;
function add(){LK={};const t=EDIT?byId(EDIT):null;const tipe=t?t.t:'K';
 $('main').innerHTML=`<div class="card"><h3>${t?'Ubah transaksi':'Catat transaksi baru'}</h3>
 <div class="seg" id="tt">${[['M','Masuk'],['K','Keluar'],['T','Pindah akun']].map(([k,l])=>`<button data-k="${k}" class="${k===tipe?'on':''}">${l}</button>`).join('')}</div>
 <div class="fl" style="margin-top:8px"><input type="date" id="ad" value="${t?t.d:today}"><input type="number" id="aj" placeholder="Jumlah (Rp)" value="${t?t.j:''}">
  <select id="aa">${opts(accNames(),t?t.a:'Dompet')}</select><select id="atu">${opts(accNames(),t?t.tu:'')}</select>
  <select id="atj"></select><select id="asb"></select>
  <input class="w2" id="akt" list="ktl" placeholder="Kategori (pilih atau ketik baru)" value="${esc(t?t.kt:'')}"><datalist id="ktl"></datalist>
  <input class="w2" id="aket" placeholder="Keterangan" value="${esc(t?t.ket:'')}">
  <button class="b w2 p" id="asave">${t?'Simpan perubahan':'Simpan'}</button>${t?'<button class="b w2" id="acan">Batal</button>':''}</div>
 <div class="tiny" id="ahint" style="margin-top:8px"></div></div>
 <div class="card"><h3>Terakhir dicatat</h3>${S.tx.slice().sort((a,b)=>b.id-a.id).slice(0,8).map(txRow).join('')}</div>`;
 let tp=tipe;const setT=k=>{tp=k;document.querySelectorAll('#tt button').forEach(b=>b.classList.toggle('on',b.dataset.k===k));
  $('atu').style.display=k==='T'?'':'none';const tjs=k==='M'?['Pendapatan','Tabungan','Pindah Uang']:k==='K'?['Pengeluaran','Tabungan','Pindah Uang']:['Pindah Uang'];
  $('atj').innerHTML=opts(tjs,t&&tjs.includes(t.tj)?t.tj:tjs[0]);fillSb()};
 const fillSb=()=>{const tj=$('atj').value;$('asb').innerHTML=opts(SUMBER[tj],t&&t.tj===tj?t.sb:(tj==='Pengeluaran'?({'Uang Jasa':'Pengeluaran Jasa','Uang Kos Mama Cash':'Pengeluaran Uang Kos','Jago - Uang Kos Mama':'Pengeluaran Uang Kos','Uang Disan':'Pengeluaran Uang Disan'}[$('aa').value]||'Pengeluaran Gaji'):SUMBER[tj][0]));fillKt()};
 const fillKt=()=>{$('ktl').innerHTML=katList($('atj').value,$('asb').value).map(k=>`<option value="${esc(k)}">`).join('');
  $('ahint').textContent=$('atj').value==='Pindah Uang'?'Pindah uang tidak dihitung sebagai pendapatan/pengeluaran.':''};
 document.querySelectorAll('#tt button').forEach(b=>b.onclick=()=>setT(b.dataset.k));$('atj').onchange=fillSb;$('asb').onchange=fillKt;$('aa').onchange=()=>{if($('atj').value==='Pengeluaran')fillSb()};setT(tipe);
 if($('acan'))$('acan').onclick=()=>{EDIT=null;go('trx')};
 $('asave').onclick=()=>{const j=+$('aj').value,d=$('ad').value;if(!(j>0)||!d)return alert('Isi tanggal dan jumlah.');
  if(tp==='T'&&$('atu').value===$('aa').value)return alert('Akun tujuan harus berbeda.');
  const o={d,a:$('aa').value,t:tp,j,tj:$('atj').value,sb:$('asb').value,kt:$('akt').value.trim()||(tp==='T'?'Pindah antar akun sendiri':'Lain-lain'),ket:$('aket').value.trim(),tu:tp==='T'?$('atu').value:null,cek:''};
  if(t)Object.assign(t,o);else S.tx.push({id:S.next++,...o});save();EDIT=null;alert('Tersimpan ✓');add()}}
/* ================= ATUR ================= */
function set(){LK={};$('main').innerHTML=`<div class="card"><h3>Akun</h3>${S.acc.map((a,i)=>`<div class="row" style="cursor:default"><div class="l"><div class="t1">${esc(a.n)}</div><div class="t2">${esc(a.g)} · awal ${rp(a.o)} (${fdate(a.od)})</div></div><div class="r">${rp(bal(a.n))}</div></div>`).join('')}
  <div class="fl" style="margin-top:8px"><input id="nn" placeholder="Nama akun baru"><select id="ng">${opts(['Pribadi','Titipan Mama','Titipan Disan','Investasi','Dana Riba'])}</select><input type="number" id="no" placeholder="Saldo awal"><button class="b" id="nadd">Tambah akun</button></div></div>
 <div class="card"><h3>Uang mama sebelum Februari 2024</h3><div class="tiny">Kalau ada uang kos mama yang kamu pegang sebelum Februari 2024, isi di sini supaya status lunas tepat.</div>
  <input type="number" id="mo" value="${S.mamaOpen||0}" style="margin-top:6px"></div>
 <div class="card"><h3>Data</h3><div class="fl">
  <button class="b w2" id="exc">Ekspor untuk Excel (CSV)</button><button class="b" id="bak">Cadangkan (JSON)</button><label class="b" style="text-align:center">Pulihkan<input type="file" id="res" accept=".json" style="display:none"></label>
  <label class="b w2" style="text-align:center">Impor CSV transaksi baru<input type="file" id="imp" accept=".csv" style="display:none"></label>
  <button class="b w2 d" id="rst">Kembalikan ke data awal (hapus semua perubahan)</button></div>
  <div class="tiny" style="margin-top:6px">Data tersimpan di HP ini saja. Cadangkan secara rutin ke Google Drive. ${S.tx.length} transaksi.</div></div>`;
 $('nadd').onclick=()=>{const n=$('nn').value.trim();if(!n||S.acc.find(a=>a.n===n))return;S.acc.push({n,o:+$('no').value||0,od:today,g:$('ng').value,ket:''});save();set()};
 $('mo').onchange=e=>{S.mamaOpen=+e.target.value||0;save()};
 const dl=(txt,name,type)=>{const u=URL.createObjectURL(new Blob([txt],{type})),a=document.createElement('a');a.href=u;a.download=name;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(u),2000)};
 $('exc').onclick=()=>{const rows=[['Tanggal','Akun','Tipe','Akun Tujuan','Jumlah','Tujuan','Sumber','Kategori','Keterangan','Perlu Dicek']];
  S.tx.slice().sort((a,b)=>a.d.localeCompare(b.d)||a.id-b.id).forEach(t=>rows.push([t.d,t.a,{M:'Masuk',K:'Keluar',T:'Transfer'}[t.t],t.tu||'',t.j,t.tj,t.sb,t.kt,t.ket,t.cek]));dl(Papa.unparse(rows),'dompet-digital-transaksi.csv','text/csv')};
 $('bak').onclick=()=>dl(JSON.stringify(S),'dompet-digital-cadangan-'+today+'.json','application/json');
 $('res').onchange=e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=()=>{try{const x=JSON.parse(r.result);if(!x.tx)throw 0;S=x;save();alert('Dipulihkan ✓');go('home')}catch(_){alert('File tidak valid')}};r.readAsText(f)};
 $('imp').onchange=e=>{const f=e.target.files[0];if(!f)return;Papa.parse(f,{header:true,skipEmptyLines:true,complete:({data})=>{let n=0;for(const r of data){const d=(r.Tanggal||'').trim(),j=+String(r.Jumlah||r.Nominal||'').replace(/[^0-9]/g,'');if(!/^\d{4}-\d{2}-\d{2}$/.test(d)||!(j>0))continue;
  const tp={masuk:'M',keluar:'K',transfer:'T',pindah:'T'}[String(r.Tipe||'').toLowerCase().trim()];if(!tp)continue;
  S.tx.push({id:S.next++,d,a:(r.Akun||'Dompet').trim(),t:tp,j,tj:r.Tujuan||(tp==='M'?'Pendapatan':tp==='K'?'Pengeluaran':'Pindah Uang'),sb:r.Sumber||(tp==='M'?'Gaji':tp==='K'?'Pengeluaran Gaji':'Pindah akun'),kt:r.Kategori||'Lain-lain',ket:r.Keterangan||'',tu:tp==='T'?(r['Akun Tujuan']||'').trim():null,cek:'Diimpor dari CSV'});n++}
  save();alert(n+' transaksi diimpor');set()}})};
 $('rst').onclick=()=>{if(confirm('Semua perubahan akan hilang dan kembali ke data awal. Lanjut?')){localStorage.removeItem(KEY);load();save();go('home')}}}
/* ================= MULAI ================= */
load();save();netS();nav();home();
