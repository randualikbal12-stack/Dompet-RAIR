'use strict';
/* ================= DATA ================= */
const KEY='dd-v3';
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
const KOSL=['Kos cowok · Kamar 1','Kos cowok · Kamar 2','Kos cowok · Kamar 3','Kos cowok · Kamar 4','Kos cowok · Kamar 5','Kos cowok · Kamar ?','Kos cewek · Kamar 1','Kos cewek · Kamar 2','Kos cewek · Kamar 3','Kos cewek · Kamar 4','Kos cewek · Kamar 5','Kos cewek · Kamar 6','Kos cewek · Kamar 7','Kos cewek · Kamar ?','Sewa lapak pasar','Penggantian / lainnya'];
const SUMBER={Pendapatan:['Gaji','Jasa','Uang Kos Mama','Uang Kedai','Uang Disan'],
  Pengeluaran:['Pengeluaran Gaji','Pengeluaran Jasa','Pengeluaran Uang Kos','Pengeluaran Uang Kedai','Pengeluaran Uang Disan'],
  Tabungan:['Saham','Reksadana','Deposito','Jula-jula','Reksadana uang kos mama'],'Pindah Uang':['Pindah akun','Dana riba','Utang & piutang','Pinjam uang mama','Titipan orang lain']};
const MAMA_IN=['Uang Kos Mama','Uang Kedai'],MAMA_OUT=['Pengeluaran Uang Kos','Pengeluaran Uang Kedai'];
let S;
function load(){try{S=JSON.parse(localStorage.getItem(KEY))}catch(e){S=null}
 if(!S||!S.tx){S={acc:SEED.acc,tx:SEED.tx,next:Math.max(...SEED.tx.map(t=>t.id))+1,price:{...INV.last},rdcur:{},goals:[],seedAt:today}}
 S.price=S.price||{...INV.last};S.rdcur=S.rdcur||{};S.goals=S.goals||[];S.inv=S.inv||{saham:[],rd:[],dep:[]};S.inv.saham=S.inv.saham||[];S.inv.rd=S.inv.rd||[];S.inv.dep=S.inv.dep||[];S.pxUrl=S.pxUrl||'';migrate()}
const MIG4={"rename": {"from": "Uang dari Disan", "to": "Uang untuk Disan"}, "upd": [{"id": 1591, "d": "2025-12-09", "j": 100000, "set": {"tj": "Pendapatan", "sb": "Uang Disan", "kt": "Uang untuk Disan"}}, {"id": 1612, "d": "2025-12-15", "j": 100000, "set": {"tj": "Pendapatan", "sb": "Uang Disan", "kt": "Uang untuk Disan"}}, {"id": 1832, "d": "2026-02-02", "j": 100000, "set": {"tj": "Pendapatan", "sb": "Uang Disan", "kt": "Uang untuk Disan", "cek": "Dianggap uang untuk Disan: kk Lisa mengganti uang yang dipakai untuk belanja Disan 28 Jan 2026"}}, {"id": 1843, "d": "2026-02-05", "j": 100000, "set": {"tj": "Pendapatan", "sb": "Uang Disan", "kt": "Uang untuk Disan"}}, {"id": 1935, "d": "2026-02-13", "j": 100000, "set": {"tj": "Pendapatan", "sb": "Uang Disan", "kt": "Uang untuk Disan"}}, {"id": 2074, "d": "2026-03-13", "j": 600000, "set": {"tj": "Pendapatan", "sb": "Uang Disan", "kt": "Uang untuk Disan", "cek": "THR untuk Disan: belum ada catatan kapan uang ini diberikan ke Disan"}}, {"id": 2110, "d": "2026-04-01", "j": 200000, "set": {"tj": "Pendapatan", "sb": "Uang Disan", "kt": "Uang untuk Disan"}}, {"id": 2245, "d": "2026-05-05", "j": 150000, "set": {"tj": "Pendapatan", "sb": "Uang Disan", "kt": "Uang untuk Disan", "cek": "Untuk perbaikan HP Disan: belum ada catatan kapan uang ini dipakai/diberikan"}}, {"id": 2340, "d": "2026-06-05", "j": 400000, "set": {"tj": "Pendapatan", "sb": "Uang Disan", "kt": "Uang untuk Disan"}}, {"id": 2341, "d": "2026-06-05", "j": 100000, "set": {"tj": "Pendapatan", "sb": "Uang Disan", "kt": "Uang untuk Disan"}}, {"id": 2527, "d": "2026-07-10", "j": 150000, "set": {"tj": "Pendapatan", "sb": "Uang Disan", "kt": "Uang untuk Disan"}}, {"id": 2548, "d": "2026-07-16", "j": 100000, "set": {"tj": "Pendapatan", "sb": "Uang Disan", "kt": "Uang untuk Disan"}}, {"id": 2608, "d": "2026-08-03", "j": 150000, "set": {"tj": "Pendapatan", "sb": "Uang Disan", "kt": "Uang untuk Disan"}}, {"id": 2664, "d": "2026-08-14", "j": 150000, "set": {"tj": "Pendapatan", "sb": "Uang Disan", "kt": "Uang untuk Disan", "cek": "Belum ada catatan kapan uang ini diberikan ke Disan"}}, {"id": 2707, "d": "2026-09-01", "j": 350000, "set": {"tj": "Pendapatan", "sb": "Uang Disan", "kt": "Uang untuk Disan"}}, {"id": 2725, "d": "2026-09-06", "j": 50000, "set": {"tj": "Pendapatan", "sb": "Uang Disan", "kt": "Uang untuk Disan"}}, {"id": 1592, "d": "2025-12-10", "j": 100000, "set": {"tj": "Pengeluaran", "sb": "Pengeluaran Uang Disan", "kt": "Belanja / pengeluaran Disan"}}, {"id": 1620, "d": "2025-12-17", "j": 100000, "set": {"tj": "Pengeluaran", "sb": "Pengeluaran Uang Disan", "kt": "Dikembalikan ke kk Lisa"}}, {"id": 1948, "d": "2026-02-23", "j": 100000, "set": {"tj": "Pengeluaran", "sb": "Pengeluaran Uang Disan", "kt": "Belanja / pengeluaran Disan"}}, {"id": 2353, "d": "2026-06-05", "j": 500000, "set": {"tj": "Pengeluaran", "sb": "Pengeluaran Uang Disan", "kt": "Belanja / pengeluaran Disan"}}, {"id": 2529, "d": "2026-07-11", "j": 150000, "set": {"tj": "Pengeluaran", "sb": "Pengeluaran Uang Disan", "kt": "Belanja / pengeluaran Disan"}}, {"id": 2549, "d": "2026-07-16", "j": 100000, "set": {"tj": "Pengeluaran", "sb": "Pengeluaran Uang Disan", "kt": "Belanja / pengeluaran Disan"}}, {"id": 2622, "d": "2026-08-05", "j": 150000, "set": {"tj": "Pengeluaran", "sb": "Pengeluaran Uang Disan", "kt": "Belanja / pengeluaran Disan"}}, {"id": 2716, "d": "2026-09-04", "j": 300000, "set": {"tj": "Pengeluaran", "sb": "Pengeluaran Uang Disan", "kt": "Belanja / pengeluaran Disan"}}, {"id": 2730, "d": "2026-09-06", "j": 100000, "set": {"tj": "Pengeluaran", "sb": "Pengeluaran Uang Disan", "kt": "Belanja / pengeluaran Disan"}}, {"id": 1827, "d": "2026-01-28", "j": 100000, "set": {"tj": "Pindah Uang", "sb": "Pindah akun", "kt": "Pindah antar akun sendiri"}}, {"id": 1932, "d": "2026-02-11", "j": 100000, "set": {"tj": "Pindah Uang", "sb": "Pindah akun", "kt": "Pindah antar akun sendiri"}}, {"id": 2010, "d": "2026-03-03", "j": 100000, "set": {"tj": "Pindah Uang", "sb": "Pindah akun", "kt": "Pindah antar akun sendiri"}}, {"id": 2088, "d": "2026-03-18", "j": 50000, "set": {"tj": "Pindah Uang", "sb": "Pindah akun", "kt": "Pindah antar akun sendiri"}}, {"id": 2162, "d": "2026-04-08", "j": 150000, "set": {"tj": "Pindah Uang", "sb": "Pindah akun", "kt": "Pindah antar akun sendiri"}}, {"id": 2277, "d": "2026-05-11", "j": 100000, "set": {"tj": "Pindah Uang", "sb": "Pindah akun", "kt": "Pindah antar akun sendiri"}}, {"id": 2278, "d": "2026-05-11", "j": 150000, "set": {"tj": "Pindah Uang", "sb": "Pindah akun", "kt": "Pindah antar akun sendiri"}}, {"id": 2087, "d": "2026-03-16", "j": 100000, "set": {"tj": "Pindah Uang", "sb": "Pindah akun", "kt": "Pindah antar akun sendiri"}}, {"id": 2252, "d": "2026-05-06", "j": 100000, "set": {"tj": "Pindah Uang", "sb": "Pindah akun", "kt": "Pindah antar akun sendiri"}}, {"id": 1994, "d": "2026-03-02", "j": 550000, "set": {"j": 450000, "cek": "Dipisah: Rp100.000 untuk belanja Disan dicatat di baris sendiri (Uang untuk Disan)"}}], "add": [{"d": "2026-03-02", "a": "Bank Mandiri", "t": "M", "j": 100000, "tj": "Pendapatan", "sb": "Uang Disan", "kt": "Uang untuk Disan", "ket": "Bagian dari Tf masuk kk lisa Rp550.000: Rp100.000 untuk belanja disan", "tu": null, "cek": "", "kos": ""}, {"d": "2026-09-08", "a": "Uang Kos Mama Cash", "t": "K", "j": 300000, "tj": "Pindah Uang", "sb": "Pindah akun", "kt": "Pindah antar akun sendiri", "ket": "Top up saldo gopay tabungan, uang kos mama cash Rp300.000 (pasangan catatan GoPay 8 Sep 2026: dari dompet Rp230.500, dari uang kos mama Rp300.000)", "tu": null, "cek": "", "kos": ""}]};
function migrate(){if(S.mig4)return;const T={};for(const t of S.tx)T[t.id]=t;
 for(const t of S.tx)if(t.kt===MIG4.rename.from)t.kt=MIG4.rename.to;
 for(const u of MIG4.upd){const t=T[u.id];if(t&&t.d===u.d&&t.j===u.j)Object.assign(t,u.set)}
 for(const a of MIG4.add){if(!S.tx.some(t=>t.d===a.d&&t.a===a.a&&t.j===a.j&&t.ket===a.ket))S.tx.push({...a,id:S.next++})}
 S.mig4=1;save()}
function save(){try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){alert('Penyimpanan HP penuh: '+e.message)}}
const accNames=()=>S.acc.map(a=>a.n);
const byId=id=>S.tx.find(t=>t.id===id);
/* ================= PERHITUNGAN ================= */
function openAt(a,d){const x=S.acc.find(z=>z.n===a);return x&&x.od<=d?x.o:0}
function bal(a,d=today){let b=openAt(a,d);for(const t of S.tx){if(t.d>d)continue;if(t.a===a)b+=t.t==='M'?t.j:-t.j;if(t.t==='T'&&t.tu===a)b+=t.j}return b}
function sum(f){let s=0;for(const t of S.tx)if(f(t))s+=t.j;return s}
const inR=(t,a,b)=>t.d>=a&&t.d<=b;
const idsOf=f=>S.tx.filter(f).map(t=>t.id);
function income(a,b,src){return sum(t=>t.tj==='Pendapatan'&&t.t==='M'&&inR(t,a,b)&&(!src||t.sb===src))}
function expense(a,b,src){return sum(t=>t.tj==='Pengeluaran'&&t.t==='K'&&inR(t,a,b)&&(!src||t.sb===src))}
const isKosRd=t=>t.sb==='Reksadana uang kos mama';
function tabNet(a,b,mm=false){return sum(t=>t.tj==='Tabungan'&&inR(t,a,b)&&isKosRd(t)===mm&&t.t==='K')-sum(t=>t.tj==='Tabungan'&&inR(t,a,b)&&isKosRd(t)===mm&&t.t==='M')}
function tabIds(a,b,mm=false,tp){return idsOf(t=>t.tj==='Tabungan'&&inR(t,a,b)&&isKosRd(t)===mm&&(!tp||t.t===tp))}
function mama(d){const z='2000-01-01';const inn=income(z,d,'Uang Kos Mama')+income(z,d,'Uang Kedai'),out=expense(z,d,'Pengeluaran Uang Kos')+expense(z,d,'Pengeluaran Uang Kedai'),inv=tabNet(z,d,true);
 const kantong=S.acc.filter(a=>a.g==='Titipan Mama').reduce((s,a)=>s+bal(a.n,d),0);const sisa=(S.mamaOpen||0)+inn-out-inv;return{inn,out,inv,sisa,kantong,pribadi:Math.max(0,sisa-kantong)}}
const MAMA_SB=['Uang Kos Mama','Uang Kedai','Pengeluaran Uang Kos','Pengeluaran Uang Kedai','Reksadana uang kos mama'];
function mamaIds(a,b){return idsOf(t=>inR(t,a,b)&&MAMA_SB.includes(t.sb))}
const mamaInIds=(a,b)=>idsOf(t=>inR(t,a,b)&&t.tj==='Pendapatan'&&(t.sb==='Uang Kos Mama'||t.sb==='Uang Kedai'));
const mamaOutIds=(a,b)=>idsOf(t=>inR(t,a,b)&&t.tj==='Pengeluaran'&&(t.sb==='Pengeluaran Uang Kos'||t.sb==='Pengeluaran Uang Kedai'));
const accIds=(names,d=today)=>idsOf(t=>t.d<=d&&(names.includes(t.a)||(t.t==='T'&&names.includes(t.tu))));
function kantongRows(d){return S.acc.filter(a=>a.g==='Titipan Mama').map(a=>`<div class="kv"><span>${esc(a.n)}</span><span class="ac" data-acc="${esc(a.n)}">${rp(bal(a.n,d))}</span></div>`).join('')}
function kantongSheet(){const M=mama(today);sheet(`<h3>Uang mama yang ada sekarang</h3><div class="tiny">Gabungan saldo semua akun titipan mama, dihitung dari transaksi yang tercatat. Ketuk angka untuk melihat asal saldo akun itu.</div>${kantongRows(today)}<div class="kv"><b>Total</b><b>${rp(M.kantong)}</b></div>`)}
function mamaSisaSheet(){const z='2000-01-01',M=mama(today),names=S.acc.filter(a=>a.g==='Titipan Mama').map(a=>a.n);
 const lines=[['Uang kos & kedai masuk',M.inn,{ids:mamaInIds(z,today)}],['− Dipakai (pengeluaran kos & kedai)',M.out,{ids:mamaOutIds(z,today)}],['− Disetor ke reksadana uang kos mama (bersih)',M.inv,{ids:tabIds(z,today,true)}]];
 if(S.mamaOpen)lines.push(['+ Uang mama sebelum Feb 2024 (menu Atur)',S.mamaOpen,null]);
 lines.push(['= Sisa uang mama (hitungan)',M.sisa,null,1],['Uang mama yang ada di kantong/cash',M.kantong,{ids:accIds(names)}],['Masih di akun pribadimu',M.pribadi,null,1]);
 why({ids:mamaIds(z,today)},'Sisa uang mama',{lines,note:'Sisa minus artinya uang mama yang dipakai & disetor ke reksadana lebih besar dari uang mama yang tercatat masuk sejak Feb 2024. Selisihnya berasal dari uang mama sebelum Feb 2024 yang belum dicatat sebagai saldo awal. Minus bukan berarti kamu memakai uang mama.'})}
function disanMonth(a,b){const inn=income(a,b,'Uang Disan'),out=expense(a,b,'Pengeluaran Uang Disan');return{inn,out}}
function disan(d){const z='2000-01-01';const s=income(z,d,'Uang Disan')-expense(z,d,'Pengeluaran Uang Disan');const k=S.acc.filter(a=>a.g==='Titipan Disan').reduce((x,a)=>x+bal(a.n,d),0);return{sisa:s,kantong:k,pribadi:Math.max(0,s-k)}}
const disanIds=(a,b,sb)=>idsOf(t=>inR(t,a,b)&&(sb?t.sb===sb:(t.sb==='Uang Disan'||t.sb==='Pengeluaran Uang Disan')));
/* investasi */
const KOS_RD='Uang Kos Mama';
const invA=()=>S.inv;
function allSaham(){return INV.saham.concat(S.inv.saham)}
function allRd(){return INV.rd.concat(S.inv.rd)}
function saham(){const pos={};for(const e of allSaham()){const p=pos[e.kode]=pos[e.kode]||{kode:e.kode,blot:0,cost:0,slot:0,div:0,real:0,ev:[],lastBuy:0};p.ev.push(e);
  if(e.jenis==='Beli'){p.blot+=e.lot;p.cost+=e.total;p.lastBuy=e.harga||p.lastBuy}else if(e.jenis==='Jual'){p.slot+=e.lot;p.real+=e.untung||0}else p.div+=e.total}
 return Object.values(pos).map(p=>{p.lot=p.blot-p.slot;p.modal=p.blot?p.cost*p.lot/p.blot:0;p.harga=S.price[p.kode]||INV.last[p.kode]||p.lastBuy||0;p.nilai=p.lot*100*p.harga;p.pl=p.nilai-p.modal;return p}).sort((a,b)=>b.nilai-a.nilai||a.kode.localeCompare(b.kode))}
function rdGoals(){const g={};const mk=t=>g[t]=g[t]||{tujuan:t,beli:0,jual:0,untung:0,ev:[],prod:{},appNet:0};
 for(const t in INV.cur)mk(t);
 for(const e of allRd()){if(e.tujuan===KOS_RD)continue;const x=mk(e.tujuan);x.ev.push(e);const p=x.prod[e.produk]=x.prod[e.produk]||{produk:e.produk,beli:0,jual:0,last:'',ev:[]};p.ev.push(e);
  if(e.jenis==='Beli'){x.beli+=e.modal||0;p.beli+=e.modal||0}else{x.jual+=e.modal||0;p.jual+=e.modal||0;x.untung+=e.untung||0}if(e.tgl>p.last)p.last=e.tgl;
  if(e.app)x.appNet+=(e.jenis==='Beli'?1:-1)*(e.modal||0)}
 return Object.values(g).map(x=>{const c=INV.cur[x.tujuan]||[0,0];x.modal=c[0]+x.appNet;x.nilai=S.rdcur[x.tujuan]??(c[1]+x.appNet);x.pl=x.nilai-x.modal;
  x.hold=Object.values(x.prod).map(p=>({...p,sisa:Math.round(p.beli-p.jual)})).filter(p=>p.sisa>=1000).sort((a,b)=>b.sisa-a.sisa);
  x.riwayat=Math.round(x.beli-x.jual);x.produk=x.hold.map(p=>p.produk).join(', ');return x}).sort((a,b)=>b.nilai-a.nilai)}
function kosRd(){const ev=allRd().filter(e=>e.tujuan===KOS_RD);const net=ev.reduce((s,e)=>s+(e.jenis==='Beli'?1:-1)*(e.modal||0),0);return{modal:INV.kos[0]+net,nilai:S.rdcur.__kos??(INV.kos[1]+net),ev}}
function rdNilai(t){if(t===KOS_RD)return kosRd().nilai;const x=rdGoals().find(z=>z.tujuan===t);return x?x.nilai:0}
function rdSetNilai(t,v){S.rdcur[t===KOS_RD?'__kos':t]=Math.round(v)}
function deps(){return INV.dep.map((d,i)=>({...d,id:'f'+i,src:'file',aktif:false})).concat(S.inv.dep.map(d=>({...d,src:'app',aktif:d.status==='Aktif'})))}
const depKey=d=>d.bpr.replace(/PT\.?|BPRS?|SYARIAH|INDONESIA/gi,'').trim().split(/\s+/)[0].toLowerCase();
function depTx(d){if(d.src==='app')return(d.tx||[]).filter(i=>byId(i));const w=depKey(d);return idsOf(t=>(t.a==='Deposito BPR'||t.tu==='Deposito BPR'||/deposito/i.test(t.ket+' '+t.kt))&&t.ket.toLowerCase().includes(w))}
function rdTxIds(e){return[e.tx].concat(e.dana||[]).filter(i=>i&&byId(i))}
/* ================= FILTER / PELACAKAN ================= */
let F={}, page=1, agg='bulan';
function match(t,f){if(f.ids){if(!f._s)Object.defineProperty(f,'_s',{value:new Set(f.ids),enumerable:false});if(!f._s.has(t.id))return false}
 if(f.from&&t.d<f.from)return false;if(f.to&&t.d>f.to)return false;
 if(f.tj&&t.tj!==f.tj)return false;if(f.sb&&t.sb!==f.sb)return false;if(f.kt&&t.kt!==f.kt)return false;
 if(f.a&&t.a!==f.a&&t.tu!==f.a)return false;if(f.kos&&t.kos!==f.kos)return false;if(f.cek&&!t.cek)return false;if(f.tipe&&t.t!==f.tipe)return false;
 if(f.q){const q=f.q.toLowerCase();if(!(t.ket+' '+t.kt+' '+t.sb+' '+t.a+' '+(t.tu||'')+' '+t.cek+' '+t.kos).toLowerCase().includes(q))return false}
 return true}
const clean=f=>{const o={};for(const k in f)if(k!=='title'&&k!=='keep'&&f[k]!==undefined)o[k]=f[k];return o};
function lacak(f,title){F={...clean(f),title:title||f.title};page=1;go('trx')}
const flow=(t,a)=>t.t==='T'?(t.tu===a?1:(t.a===a?-1:0)):(t.t==='M'?1:-1);
/* ================= NAVIGASI ================= */
const VIEWS=[['home','Beranda'],['trx','Transaksi'],['rep','Laporan'],['mama','Amanah'],['inv','Investasi'],['plan','Rencana'],['add','Catat'],['guide','Panduan'],['set','Atur']];
let V='home',charts={};
function nav(){$('nav').innerHTML=VIEWS.map(([k,l])=>`<button data-v="${k}" class="${k===V?'on':''}">${l}</button>`).join('');
 $('nav').querySelectorAll('button').forEach(b=>b.onclick=()=>{if(b.dataset.v==='trx'&&V!=='trx')F={};if(b.dataset.v==='add'){EDIT=null;TPL=null}go(b.dataset.v)});
 const on=$('nav').querySelector('.on');if(on)on.scrollIntoView({block:'nearest',inline:'nearest'})}
function go(v){closeSheet();V=v;nav();Object.values(charts).forEach(c=>c.destroy&&c.destroy());charts={};({home,trx,rep,mama:mamaV,inv:invV,plan,add,guide,set})[v]();window.scrollTo(0,0)}
/* jendela kecil bertumpuk (bisa kembali) */
let SH=[];
function sheet(html,bind){if($('sheet').style.display!=='flex')SH=[];SH.push({html,bind});rs()}
function rs(){const s=SH[SH.length-1];$('sheetIn').innerHTML=(SH.length>1?'<button class="b bk" id="shBack">‹ Kembali</button>':'')+s.html+'<button class="b" style="width:100%;margin-top:12px" id="shClose">Tutup</button>';
 $('sheet').style.display='flex';if($('shBack'))$('shBack').onclick=()=>{SH.pop();rs()};$('shClose').onclick=closeSheet;if(s.bind)s.bind();$('sheetIn').scrollTop=0}
$('sheet').onclick=e=>{if(e.target.id==='sheet')closeSheet()};
function closeSheet(){$('sheet').style.display='none';SH=[]}
function netS(){const e=$('net');e.textContent=navigator.onLine?'Online':'Offline';e.className='pill'+(navigator.onLine?'':' w')}
addEventListener('online',()=>{netS();autoPx()});addEventListener('offline',netS);
/* LK = tautan langsung ke Riwayat transaksi; WK = tautan ke jendela rincian */
let LK={},WK={};
const key=()=>'k'+Math.random().toString(36).slice(2,9);
function LKs(f){const k=key();LK[k]=f;return k}
function L(label,f,cls=''){return`<span class="ac ${cls}" data-l="${LKs(f)}">${label}</span>`}
function WKs(f,title,o){const k=key();WK[k]={f,title,o};return k}
function X(label,f,title,o,cls=''){return`<span class="ac ${cls}" data-x="${WKs(f,title,o)}">${label}</span>`}
function FN(fn){const k=key();WK[k]={fn};return k}
document.addEventListener('click',e=>{let x;
 if((x=e.target.closest('[data-x]'))&&WK[x.dataset.x]){const w=WK[x.dataset.x];e.stopPropagation();return w.fn?w.fn():why(w.f,w.title,w.o||{})}
 if((x=e.target.closest('[data-l]'))&&LK[x.dataset.l]){const f=LK[x.dataset.l];closeSheet();return lacak(f,f.title)}
 if((x=e.target.closest('[data-acc]')))return accSheet(x.dataset.acc);
 if((x=e.target.closest('[data-sk]')))return sahamSheet(x.dataset.sk);
 if((x=e.target.closest('[data-rg]')))return x.dataset.rg===KOS_RD?kosRdSheet():rdSheet(x.dataset.rg);
 if((x=e.target.closest('[data-dp]')))return depSheet(x.dataset.dp);
 if((x=e.target.closest('[data-tx]')))return detail(+x.dataset.tx)});
/* jendela asal-usul untuk sekumpulan transaksi */
function why(f,title,o={}){const res=S.tx.filter(t=>match(t,f)).sort((p,q)=>q.d.localeCompare(p.d)||q.id-p.id);
 const T={M:0,K:0,T:0};for(const t of res)T[t.t]+=t.j;
 const grp=kf=>{const g={};for(const t of res){const k=kf(t);const z=g[k]=g[k]||{M:0,K:0,T:0,ids:[],d:t.d};z[t.t]+=t.j;z.ids.push(t.id)}return Object.entries(g)};
 const amt=z=>[z.M?`<div class="up">+${rp(z.M)}</div>`:'',z.K?`<div class="dn">−${rp(z.K)}</div>`:'',z.T?`<div>⇄ ${rp(z.T)}</div>`:''].join('');
 const tot=z=>z.M+z.K+z.T;
 const list=(h,rows,max=12)=>rows.length?`<h4>${h}</h4>`+rows.slice(0,max).map(([k,z])=>`<div class="row" data-l="${LKs({ids:z.ids,title:title+' · '+k})}"><div class="l"><div class="t1">${esc(k)}</div><div class="t2">${z.ids.length} transaksi</div></div><div class="r">${amt(z)}</div><span class="chev">›</span></div>`).join('')+(rows.length>max?`<div class="tiny" style="padding:6px 0">+${rows.length-max} kelompok lainnya (ada di "Lihat semua transaksi")</div>`:''):'';
 const vv=(v,b)=>b?`<b>${rp(v)}</b>`:rp(v);
 let h=`<h3>${esc(title)}</h3>`;
 if(o.lines)h+=`<div class="box">${o.lines.map(([l,v,f2,b])=>`<div class="kv"><span>${b?'<b>'+esc(l)+'</b>':esc(l)}</span><span>${f2&&Math.round(v)!==0?`<span class="ac" data-l="${LKs({...f2,title:f2.title||(title+' · '+l.replace(/^[−+=] /,''))})}">${vv(v,b)}</span>`:vv(v,b)}</span></div>`).join('')}</div>`;
 if(o.html)h+=o.html;
 if(o.note)h+=`<div class="tiny" style="margin:6px 0">${o.note}</div>`;
 if(!o.noTx){
 h+=`<h4>Dari ${res.length} transaksi</h4>`+[['Uang masuk','M','up'],['Uang keluar','K','dn'],['Pindah antar akun','T','']].filter(x=>T[x[1]]).map(([l,k,c])=>`<div class="kv"><span>${l}</span><span class="ac ${c}" data-l="${LKs({...clean(f),tipe:k,title:title+' · '+l})}">${rp(T[k])}</span></div>`).join('');
 h+=list('Menurut tujuan › sumber › kategori',grp(t=>`${t.tj} › ${t.sb} › ${t.kt}`).sort((a,b)=>tot(b[1])-tot(a[1])));
 h+=list('Menurut akun',grp(t=>t.t==='T'?t.a+' → '+t.tu:t.a).sort((a,b)=>tot(b[1])-tot(a[1])));
 const mg=grp(t=>t.d.slice(0,7));if(mg.length>1)h+=list('Menurut bulan',mg.sort((a,b)=>b[0].localeCompare(a[0])).map(([k,z])=>[BULAN[+k.slice(5)-1]+' '+k.slice(0,4),z]),24);
 h+=res.length?`<h4>Transaksi terbesar (ketuk untuk detail)</h4>`+res.slice().sort((a,b)=>b.j-a.j).slice(0,5).map(txRow).join(''):'<div class="empty">Tidak ada transaksi</div>';
 if(res.length)h+=`<button class="b p" style="width:100%;margin-top:10px" data-l="${LKs({...clean(f),title})}">Lihat semua ${res.length} transaksi di Riwayat</button>`}
 sheet(h,o.bind)}
/* ================= BERANDA ================= */
function monthCtx(y,m){const a=ds(new Date(y,m,1)),b=mEnd(y,m),ttl=BULAN[m]+' '+y;
 const inc=SUMBER.Pendapatan.map(x=>[x,income(a,b,x)]).filter(x=>x[1]),exp=SUMBER.Pengeluaran.map(x=>[x,expense(a,b,x)]).filter(x=>x[1]);
 const tb=tabNet(a,b),tI=inc.reduce((p,x)=>p+x[1],0),tE0=exp.reduce((p,x)=>p+x[1],0),tE=tE0+tb;
 const idI=idsOf(t=>inR(t,a,b)&&t.tj==='Pendapatan'&&t.t==='M'),idE=idsOf(t=>inR(t,a,b)&&t.tj==='Pengeluaran'&&t.t==='K'),idT=tabIds(a,b);
 const dis=sum(t=>idT.includes(t.id)&&t.t==='K'),cair=sum(t=>idT.includes(t.id)&&t.t==='M');
 const fI=()=>[{ids:idI},'Pendapatan · '+ttl,{lines:inc.map(([x,v])=>[x,v,{tj:'Pendapatan',sb:x,tipe:'M',from:a,to:b}]).concat([['= Total pendapatan',tI,null,1]])}];
 const fE=()=>[{ids:idE.concat(idT)},'Pengeluaran · '+ttl,{lines:exp.map(([x,v])=>[x,v,{tj:'Pengeluaran',sb:x,tipe:'K',from:a,to:b}]).concat(tb?[['+ Tabungan bersih (disetor − dicairkan)',tb,{ids:idT}]]:[],[['= Total pengeluaran',tE,null,1]]),note:'Tabungan bersih ikut dihitung sebagai pengeluaran supaya uang yang ditabung tidak terlihat sebagai sisa uang.'}];
 const fS=()=>[{ids:idI.concat(idE,idT)},'Selisih · '+ttl,{lines:[['Pendapatan',tI,{ids:idI}],['− Pengeluaran (termasuk tabungan bersih)',tE,{ids:idE.concat(idT)}],['= Selisih',tI-tE,null,1]]}];
 const fT=()=>[{ids:idT},'Tabungan bersih · '+ttl,{lines:[['Disetor ke tabungan/investasi',dis,{ids:tabIds(a,b,false,'K')}],['− Dicairkan',cair,{ids:tabIds(a,b,false,'M')}],['= Tabungan bersih',tb,null,1]],note:'Reksadana uang kos mama tidak dihitung di sini karena itu uang mama.'}];
 return{a,b,ttl,inc,exp,tb,tI,tE,fI,fE,fS,fT}}
function home(){LK={};WK={};const now=new Date(),C=monthCtx(now.getFullYear(),now.getMonth()),M=mama(today);
 const kp=(lbl,v,c,k)=>`<div class="kp" data-x="${k}"><div class="a">${lbl}</div><div class="b ${c}">${rp(v)}</div></div>`;
 const row=(lbl,v,c,k)=>`<div class="row" data-x="${k}"><div class="l">${lbl}</div><div class="r ${c}">${rp(v)}</div><span class="chev">›</span></div>`;
 $('main').innerHTML=`
 <div class="card"><h3>Bulan ini — ${C.ttl}</h3><div class="g3">${kp('Pendapatan',C.tI,'up',WKs(...C.fI()))}${kp('Pengeluaran',C.tE,'dn',WKs(...C.fE()))}${kp('Selisih',C.tI-C.tE,'',WKs(...C.fS()))}</div>
  <div class="tiny" style="margin-top:6px">Ketuk angka mana saja untuk melihat asal-usulnya.</div></div>
 <div class="card"><h3>Pendapatan</h3>${C.inc.map(([x,v])=>row(x,v,'up',WKs({tj:'Pendapatan',sb:x,tipe:'M',from:C.a,to:C.b},x+' · '+C.ttl))).join('')||'<div class="tiny">Belum ada</div>'}</div>
 <div class="card"><h3>Pengeluaran</h3>${C.exp.map(([x,v])=>row(x,v,'dn',WKs({tj:'Pengeluaran',sb:x,tipe:'K',from:C.a,to:C.b},x+' · '+C.ttl))).join('')}
  ${C.tb?row('Tabungan bersih (disetor − dicairkan)',C.tb,'',WKs(...C.fT())):''}${!C.exp.length&&!C.tb?'<div class="tiny">Belum ada</div>':''}</div>
 <div class="card"><h3>Uang mama</h3><div class="g2">
  <div class="kp" data-x="${FN(mamaSisaSheet)}"><div class="a">Sisa uang mama (hitungan)</div><div class="b">${rp(M.sisa)}</div></div><div class="kp" data-x="${FN(kantongSheet)}"><div class="a">Ada di Kantong/Cash Uang Kos Mama</div><div class="b">${rp(M.kantong)}</div></div></div>
  <div class="st ${M.pribadi>0?'w':'ok'}">${M.pribadi>0?'Masih ada '+rp(M.pribadi)+' uang mama di akun pribadimu — pindahkan ke Kantong Uang Kos Mama':'Aman ✓ Tidak ada uang mama di akun pribadimu'}</div></div>
 <div class="card"><h3>Saldo per akun</h3>${S.acc.map(x=>({x,v:bal(x.n)})).filter(o=>o.v||o.x.g!=='Usaha').map(({x,v})=>`<div class="row" data-acc="${esc(x.n)}"><div class="l"><div class="t1">${esc(x.n)}</div><div class="t2">${esc(x.g)}</div></div><div class="r">${rp(v)}</div><span class="chev">›</span></div>`).join('')}
  <div class="kv"><b>Total semua akun</b><b class="ac" data-x="${FN(totalAkunSheet)}">${rp(S.acc.reduce((p,x)=>p+bal(x.n),0))}</b></div></div>`}
function totalAkunSheet(){const rows=S.acc.map(x=>({x,v:bal(x.n)})).filter(o=>o.v);
 sheet(`<h3>Total saldo semua akun</h3><div class="tiny">Ketuk angka untuk melihat asal saldo akun itu.</div>${rows.map(({x,v})=>`<div class="kv"><span>${esc(x.n)}<div class="tiny">${esc(x.g)}</div></span><span class="ac" data-acc="${esc(x.n)}">${rp(v)}</span></div>`).join('')}
 <div class="kv"><b>Total</b><b>${rp(rows.reduce((p,o)=>p+o.v,0))}</b></div><div class="tiny">Termasuk uang titipan (mama, Disan) dan kantong riba, jadi bukan seluruhnya uang pribadimu.</div>`)}
function accSheet(n){const x=S.acc.find(a=>a.n===n);if(!x)return;const b=bal(n);const g={M:[],K:[],TI:[],TO:[]};
 for(const t of S.tx){if(t.d>today)continue;if(t.a===n){g[t.t==='M'?'M':t.t==='K'?'K':'TO'].push(t)}else if(t.t==='T'&&t.tu===n)g.TI.push(t)}
 const s=k=>g[k].reduce((p,t)=>p+t.j,0),ids=k=>g[k].map(t=>t.id);const LL=(k,ttl)=>s(k)?L(rp(s(k)),{ids:ids(k),title:n+': '+ttl}):rp(0);
 const now=new Date();let mrows='';
 for(let i=0;i<6;i++){const d=new Date(now.getFullYear(),now.getMonth()-i,1),a=ds(d),e=mEnd(d.getFullYear(),d.getMonth());let mi=0,mo=0;
  for(const t of S.tx){if(!inR(t,a,e))continue;const f=flow(t,n);if(t.a!==n&&t.tu!==n)continue;if(f>0)mi+=t.j;else mo+=t.j}
  mrows+=`<tr class="cl" data-l="${LKs({a:n,from:a,to:e,title:n+' · '+BULAN[d.getMonth()]+' '+d.getFullYear()})}"><td>${BLN[d.getMonth()]} ${String(d.getFullYear()).slice(2)}</td><td class="n up">${rp(mi)}</td><td class="n dn">${rp(mo)}</td><td class="n">${rp(bal(n,e<today?e:today))}</td></tr>`}
 sheet(`<h3>${esc(n)}</h3><div class="tiny">${esc(x.g)}${x.ket?' · '+esc(x.ket):''}</div><div class="box">
 <div class="kv"><span>Saldo awal (${fdate(x.od)})</span><span>${rp(x.o)}</span></div>
 <div class="kv"><span>+ Uang masuk</span><span>${LL('M','uang masuk')}</span></div>
 <div class="kv"><span>− Uang keluar</span><span>${LL('K','uang keluar')}</span></div>
 <div class="kv"><span>+ Pindahan masuk dari akun lain</span><span>${LL('TI','pindahan masuk')}</span></div>
 <div class="kv"><span>− Dipindah ke akun lain</span><span>${LL('TO','dipindah keluar')}</span></div>
 <div class="kv"><b>= Saldo sekarang</b><b>${rp(b)}</b></div></div>
 <h4>6 bulan terakhir (ketuk baris untuk transaksinya)</h4><div class="tw"><table><tr><th>Bulan</th><th class="n">Masuk</th><th class="n">Keluar</th><th class="n">Saldo akhir</th></tr>${mrows}</table></div>
 <button class="b p" style="width:100%;margin-top:10px" data-l="${LKs({a:n,title:'Semua transaksi '+n})}">Lihat semua transaksi akun ini</button>`)}
/* ================= TRANSAKSI ================= */
function opts(list,sel,first){return(first?`<option value="">${first}</option>`:'')+list.map(v=>`<option ${v===sel?'selected':''}>${esc(v)}</option>`).join('')}
function katList(tj,sb){return[...new Set(S.tx.filter(t=>(!tj||t.tj===tj)&&(!sb||t.sb===sb)).map(t=>t.kt))].sort()}
function trx(){LK={};WK={};const f=F,fc=clean(F),ft=F.title||'Hasil pencarian';const res=S.tx.filter(t=>match(t,f)).sort((p,q)=>q.d.localeCompare(p.d)||q.id-p.id);
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
  <select id="fa">${opts(accNames(),f.a,'Semua akun')}</select><select id="fkos">${opts(KOSL.concat(['Campuran (cewek & cowok)','Belum diketahui']),f.kos,'Semua kos/kamar')}</select>
  <select id="ftp" class="w2">${opts(['Masuk','Keluar','Pindah'],{M:'Masuk',K:'Keluar',T:'Pindah'}[f.tipe],'Semua jenis')}</select>
  <input type="date" id="ffrom" value="${f.from||''}"><input type="date" id="fto" value="${f.to||''}">
  <label class="w2 tiny"><input type="checkbox" id="fcek" style="width:auto;min-height:0" ${f.cek?'checked':''}> Hanya yang perlu dicek</label>
  <button class="b" id="fclr">Hapus filter</button><button class="b p" id="fgo">Cari</button></div></div>
 ${f.title?`<div class="chips"><span class="chip">🔎 ${esc(f.title)}</span></div>`:''}
 <div class="card"><div class="g3">
  <div class="kp" data-x="${WKs({...fc,tipe:'M'},ft+' · uang masuk')}"><div class="a">Uang masuk</div><div class="b up">${rp(sIn)}</div></div>
  <div class="kp" data-x="${WKs({...fc,tipe:'K'},ft+' · uang keluar')}"><div class="a">Uang keluar</div><div class="b dn">${rp(sOut)}</div></div>
  <div class="kp" data-x="${WKs({...fc,tipe:'T'},ft+' · pindah akun')}"><div class="a">Pindah akun</div><div class="b">${rp(sTr)}</div></div></div>
  <div class="tiny" style="margin-top:6px">${res.length} transaksi ditemukan</div></div>
 <div class="card"><h3>Total per periode (ketuk baris untuk rinciannya)</h3><div class="seg" id="aggSeg">${['hari','bulan','tahun'].map(x=>`<button data-g="${x}" class="${x===agg?'on':''}">Per ${x}</button>`).join('')}</div>
  <table style="margin-top:8px"><tr><th>Periode</th><th class="n">Masuk</th><th class="n">Keluar</th><th class="n">Selisih</th></tr>
  ${gk.map(k=>{const[a1,b1]=rng(k);return`<tr class="cl" data-x="${WKs({...fc,from:a1>(fc.from||'')?a1:fc.from,to:b1<(fc.to||'9999')?b1:fc.to},(F.title?F.title+' · ':'')+lbl(k))}"><td>${lbl(k)}</td><td class="n up">${rp(g[k][0])}</td><td class="n dn">${rp(g[k][1])}</td><td class="n">${rp(g[k][0]-g[k][1])}</td></tr>`}).join('')||'<tr><td colspan=4 class="empty">Tidak ada data</td></tr>'}</table></div>
 <div class="card"><h3>Daftar transaksi</h3>${shown.map(txRow).join('')||'<div class="empty">Tidak ada transaksi</div>'}
  ${res.length>shown.length?`<button class="b" style="width:100%;margin-top:8px" id="more">Tampilkan lagi (${res.length-shown.length} tersisa)</button>`:''}</div>`;
 const rd=()=>({q:$('fq').value.trim()||undefined,tj:$('ftj').value||undefined,sb:$('fsb').value||undefined,kt:$('fkt').value||undefined,a:$('fa').value||undefined,
   tipe:{Masuk:'M',Keluar:'K',Pindah:'T'}[$('ftp').value],kos:$('fkos').value||undefined,from:$('ffrom').value||undefined,to:$('fto').value||undefined,cek:$('fcek').checked||undefined});
 $('ftj').onchange=()=>{F={...rd(),sb:undefined,kt:undefined};trx()};$('fsb').onchange=()=>{F={...rd(),kt:undefined};trx()};
 $('fgo').onclick=()=>{F=rd();page=1;trx()};$('fclr').onclick=()=>{F={};page=1;trx()};
 $('fq').onkeydown=e=>{if(e.key==='Enter'){F=rd();page=1;trx()}};
 document.querySelectorAll('#aggSeg button').forEach(b=>b.onclick=()=>{agg=b.dataset.g;trx()});
 if($('more'))$('more').onclick=()=>{page++;trx()}}
function txRow(t){const c=t.t==='M'?'up':t.t==='K'?'dn':'';const s=t.t==='M'?'+':t.t==='K'?'−':'';
 return`<div class="row" data-tx="${t.id}"><div class="l"><div class="t1">${esc(t.ket||t.kt)}</div><div class="t2">${fdate(t.d)} · ${esc(t.a)}${t.t==='T'?' → '+esc(t.tu):''} · ${esc(t.sb)} › ${esc(t.kt)}${t.kos?' · '+esc(t.kos):''}${t.cek?' · ⚠️':''}</div></div><div class="r ${c}">${s}${rp(t.j)}</div></div>`}
function invLinks(id){const out=[];for(const e of allSaham())if(e.tx===id)out.push(`<span class="ac" data-sk="${esc(e.kode)}">${e.jenis} saham ${esc(e.kode)} (${fdate(e.tgl)})</span>`);
 for(const e of allRd())if(e.tx===id)out.push(`<span class="ac" data-rg="${esc(e.tujuan)}">${e.jenis} reksadana ${esc(e.tujuan)} (${fdate(e.tgl)})</span>`);
 for(const d of S.inv.dep)if((d.tx||[]).includes(id))out.push(`<span class="ac" data-dp="${d.id}">Deposito ${esc(d.bpr)}</span>`);return out}
const appInv=id=>S.inv.saham.some(e=>e.tx===id)||S.inv.rd.some(e=>e.tx===id)||S.inv.dep.some(d=>(d.tx||[]).includes(id));
function unlinkInv(id){S.inv.saham=S.inv.saham.filter(e=>e.tx!==id);
 for(const e of S.inv.rd.filter(e=>e.tx===id)){const t=e.tujuan;rdSetNilai(t,rdNilai(t)-(e.jenis==='Beli'?e.modal:-(e.nilai||0)))}
 S.inv.rd=S.inv.rd.filter(e=>e.tx!==id);
 for(const d of S.inv.dep){if(!(d.tx||[]).includes(id))continue;if(d.tx[0]===id){d.del=1;continue}d.tx=d.tx.filter(x=>x!==id);if(d.cairTx===id){d.cairTx=null;d.status='Aktif'}}
 S.inv.dep=S.inv.dep.filter(d=>!d.del);return[]}
function detail(id){const t=byId(id);if(!t)return;const inv=invLinks(id);
 const before=S.tx.filter(x=>(x.a===t.a||x.tu===t.a)&&(x.d<t.d||(x.d===t.d&&x.id<=t.id)));
 const saldo=openAt(t.a,t.d)+before.reduce((s,x)=>s+flow(x,t.a)*x.j,0);
 sheet(`<h3>${esc(t.ket||t.kt)}</h3>
 <div class="kv"><span>Tanggal</span><span>${L(fdate(t.d),{from:t.d,to:t.d,title:'Tanggal '+fdate(t.d)})}</span></div>
 <div class="kv"><span>Jumlah</span><span class="${t.t==='M'?'up':t.t==='K'?'dn':''}">${{M:'Masuk ',K:'Keluar ',T:'Pindah '}[t.t]}${rp(t.j)}</span></div>
 <div class="kv"><span>Tujuan</span><span>${L(esc(t.tj),{tj:t.tj,title:t.tj})}</span></div>
 <div class="kv"><span>Sumber</span><span>${L(esc(t.sb),{tj:t.tj,sb:t.sb,title:t.sb})}</span></div>
 <div class="kv"><span>Kategori</span><span>${L(esc(t.kt),{tj:t.tj,sb:t.sb,kt:t.kt,title:t.kt})}</span></div>
 ${t.kos?`<div class="kv"><span>Kos / kamar</span><span>${L(esc(t.kos),{kos:t.kos,title:t.kos})}</span></div>`:''}
 <div class="kv"><span>${t.t==='T'?'Dari akun':'Akun'}</span><span class="ac" data-acc="${esc(t.a)}">${esc(t.a)}</span></div>
 ${t.t==='T'?`<div class="kv"><span>Ke akun</span><span class="ac" data-acc="${esc(t.tu)}">${esc(t.tu)}</span></div>`:''}
 <div class="kv"><span>Saldo ${esc(t.a)} setelah transaksi ini</span><span>${L(rp(saldo),{a:t.a,to:t.d,title:'Transaksi '+t.a+' sampai '+fdate(t.d)})}</span></div>
 ${inv.length?`<div class="kv"><span>Terkait investasi</span><span style="text-align:right">${inv.join('<br>')}</span></div>`:''}
 ${t.cek?`<div class="st w">⚠️ ${esc(t.cek)}</div>`:''}
 <div class="g2" style="margin-top:12px"><button class="b" id="edT">Ubah</button><button class="b d" id="delT">Hapus</button></div>`,()=>{
 $('edT').onclick=()=>{if(appInv(id))return alert('Ini transaksi investasi yang dicatat lewat Catat › Investasi. Untuk mengubahnya, hapus transaksi ini lalu catat ulang, supaya data investasinya ikut benar.');closeSheet();EDIT=id;TPL=null;go('add')};
 $('delT').onclick=()=>{if(!confirm('Hapus transaksi ini?'+(appInv(id)?' Data investasi yang terkait juga ikut dihapus.':'')))return;const extra=unlinkInv(id);S.tx=S.tx.filter(x=>x.id!==id&&!extra.includes(x.id));save();closeSheet();go(V)}})}
/* ================= LAPORAN ================= */
let RP={m:'bulan',d:today};
function period(){const d=pd(RP.d),y=d.getFullYear(),m=d.getMonth();
 if(RP.m==='hari')return{a:RP.d,b:RP.d,lab:fdate(RP.d)};if(RP.m==='bulan')return{a:ds(new Date(y,m,1)),b:mEnd(y,m),lab:BULAN[m]+' '+y};return{a:y+'-01-01',b:y+'-12-31',lab:'Tahun '+y}}
function rangeCtx(a,b,lab){const idI=idsOf(t=>inR(t,a,b)&&t.tj==='Pendapatan'&&t.t==='M'),idE=idsOf(t=>inR(t,a,b)&&t.tj==='Pengeluaran'&&t.t==='K'),idT=tabIds(a,b);
 const inc=income(a,b),e0=expense(a,b),tb=tabNet(a,b),exp=e0+tb;
 return{inc,exp,tb,e0,
  fI:[{ids:idI},'Pendapatan · '+lab,{lines:SUMBER.Pendapatan.map(x=>[x,income(a,b,x),{tj:'Pendapatan',sb:x,tipe:'M',from:a,to:b}]).filter(x=>x[1]).concat([['= Total pendapatan',inc,null,1]])}],
  fE:[{ids:idE.concat(idT)},'Pengeluaran · '+lab,{lines:SUMBER.Pengeluaran.map(x=>[x,expense(a,b,x),{tj:'Pengeluaran',sb:x,tipe:'K',from:a,to:b}]).filter(x=>x[1]).concat(tb?[['+ Tabungan bersih',tb,{ids:idT}]]:[],[['= Total pengeluaran',exp,null,1]])}],
  fS:[{ids:idI.concat(idE,idT)},'Selisih · '+lab,{lines:[['Pendapatan',inc,{ids:idI}],['− Pengeluaran (termasuk tabungan bersih)',exp,{ids:idE.concat(idT)}],['= Selisih',inc-exp,null,1]]}]}}
function rep(){LK={};WK={};const P=period(),tree={},C=rangeCtx(P.a,P.b,P.lab);
 for(const t of S.tx){if(!inR(t,P.a,P.b)||t.tj==='Pindah Uang')continue;const x=tree[t.tj]=tree[t.tj]||{v:0,s:{}},y=x.s[t.sb]=x.s[t.sb]||{v:0,k:{}};
  const sg=t.tj==='Tabungan'?(t.t==='K'?1:-1):1;x.v+=t.j*sg;y.v+=t.j*sg;y.k[t.kt]=(y.k[t.kt]||0)+t.j*sg}
 const rw=(cls,lbl,v,f,ttl)=>`<div class="row ${cls}" data-x="${WKs({...f,from:P.a,to:P.b},ttl+' · '+P.lab)}"><div class="l">${lbl}</div><div class="r">${rp(v)}</div><span class="chev">›</span></div>`;
 const d=pd(RP.d),ML=[];for(let i=11;i>=0;i--){const dd=new Date(d.getFullYear(),d.getMonth()-i,1);ML.push({y:dd.getFullYear(),m:dd.getMonth(),a:ds(dd),b:mEnd(dd.getFullYear(),dd.getMonth())})}
 const MR=ML.map(x=>({...x,inc:income(x.a,x.b),exp:expense(x.a,x.b)+tabNet(x.a,x.b)}));
 $('main').innerHTML=`<div class="card"><div class="seg" id="rpm">${['hari','bulan','tahun'].map(x=>`<button data-m="${x}" class="${x===RP.m?'on':''}">Per ${x}</button>`).join('')}</div>
  <input type="date" id="rpd" value="${RP.d}" style="margin-top:8px"><div class="mut" style="margin-top:6px">${P.lab}</div>
  <div class="g3" style="margin-top:8px"><div class="kp" data-x="${WKs(...C.fI)}"><div class="a">Pendapatan</div><div class="b up">${rp(C.inc)}</div></div><div class="kp" data-x="${WKs(...C.fE)}"><div class="a">Pengeluaran</div><div class="b dn">${rp(C.exp)}</div></div><div class="kp" data-x="${WKs(...C.fS)}"><div class="a">Selisih</div><div class="b">${rp(C.inc-C.exp)}</div></div></div>
  <div class="tiny" style="margin-top:6px">Pengeluaran sudah termasuk tabungan bersih ${rp(C.tb)}. Pindah uang tidak dihitung.</div></div>
 <div class="card tree"><h3>Rincian (ketuk untuk asal-usulnya)</h3>${['Pendapatan','Pengeluaran','Tabungan'].map(tj=>{const x=tree[tj];if(!x)return'';
  return rw('n0',tj==='Tabungan'?'Tabungan bersih (semua)':tj,x.v,{tj},tj)+Object.entries(x.s).sort((a,b)=>b[1].v-a[1].v).map(([sb,y])=>
   rw('n1',esc(sb),y.v,{tj,sb},sb)+Object.entries(y.k).sort((a,b)=>b[1]-a[1]).map(([kt,v])=>rw('n2',esc(kt),v,{tj,sb,kt},sb+' › '+kt)).join('')).join('')}).join('')||'<div class="empty">Tidak ada transaksi</div>'}
  <div class="tiny">Tabungan: angka positif = uang disetor ke tabungan/investasi; negatif = dicairkan. Baris "Tabungan bersih (semua)" termasuk reksadana uang kos mama.</div></div>
 <div class="card"><h3>Pendapatan vs pengeluaran 12 bulan</h3><div class="ch"><canvas id="c1"></canvas></div>
  <div class="tw" style="margin-top:8px"><table><tr><th>Bulan</th><th class="n">Pendapatan</th><th class="n">Pengeluaran</th><th class="n">Selisih</th></tr>
  ${MR.slice().reverse().map(x=>{const c=rangeCtx(x.a,x.b,BULAN[x.m]+' '+x.y);return`<tr class="cl"><td>${BLN[x.m]} ${String(x.y).slice(2)}</td><td class="n up">${X(rp(x.inc),...c.fI)}</td><td class="n dn">${X(rp(x.exp),...c.fE)}</td><td class="n">${X(rp(x.inc-x.exp),...c.fS)}</td></tr>`}).join('')}</table></div></div>`;
 document.querySelectorAll('#rpm button').forEach(b=>b.onclick=()=>{RP.m=b.dataset.m;rep()});$('rpd').onchange=e=>{RP.d=e.target.value||today;rep()};
 charts.c1=new Chart($('c1'),{type:'bar',data:{labels:MR.map(x=>BLN[x.m]),datasets:[{label:'Pendapatan',data:MR.map(x=>x.inc),backgroundColor:'#1D9E75'},{label:'Pengeluaran',data:MR.map(x=>x.exp),backgroundColor:'#D85A30'}]},options:{scales:{y:{ticks:{callback:v=>Math.abs(v)>=1e6?(v/1e6).toFixed(1)+'jt':(v/1e3).toFixed(0)+'rb'}}}}})}
/* ================= AMANAH (UANG MAMA, KOS, DISAN, RIBA) ================= */
let MY=new Date().getFullYear(),MT='mama';
function mamaMonthWhy(x){const pv=mama(ds(new Date(pd(x.a).getTime()-864e5))),mm=mama(x.b),ttl='Uang mama · '+BULAN[x.i]+' '+MY;
 const inn=income(x.a,x.b,'Uang Kos Mama')+income(x.a,x.b,'Uang Kedai'),out=expense(x.a,x.b,'Pengeluaran Uang Kos')+expense(x.a,x.b,'Pengeluaran Uang Kedai'),rk=tabNet(x.a,x.b,true);
 return[{ids:mamaIds(x.a,x.b)},ttl,{lines:[['Sisa akhir bulan sebelumnya',pv.sisa,null],['+ Uang kos & kedai masuk',inn,{ids:mamaInIds(x.a,x.b)}],['− Pengeluaran kos & kedai',out,{ids:mamaOutIds(x.a,x.b)}],['− Disetor ke reksadana uang kos mama (bersih)',rk,{ids:tabIds(x.a,x.b,true)}],['= Sisa akhir bulan',mm.sisa,null,1],['Ada di kantong/cash akhir bulan',mm.kantong,{ids:accIds(S.acc.filter(a=>a.g==='Titipan Mama').map(a=>a.n),x.b)}],['Masih di akun pribadi',mm.pribadi,null,1]]}]}
function disanWhy(a,b,ttl,prev){const m=disanMonth(a,b),e=disan(b);
 return[{ids:disanIds(a,b)},ttl,{lines:[['Sisa sebelumnya',prev,null],['+ Uang untuk Disan masuk',m.inn,{ids:disanIds(a,b,'Uang Disan')}],['− Diberikan / dipakai untuk Disan',m.out,{ids:disanIds(a,b,'Pengeluaran Uang Disan')}],['= Sisa uang Disan',e.sisa,null,1],['Ada di akun Uang Disan',e.kantong,{a:'Uang Disan',to:b}],['Belum diberikan / masih di akun pribadi',e.pribadi,null,1]]}]}
function mamaV(){LK={};WK={};const tabs=`<div class="seg" id="mt">${[['mama','Uang mama'],['kos','Kos per kamar'],['disan','Disan'],['riba','Riba']].map(([k,l])=>`<button data-t="${k}" class="${k===MT?'on':''}">${l}</button>`).join('')}</div>
 <div class="seg" id="my" style="margin-top:6px">${[...new Set(S.tx.map(t=>+t.d.slice(0,4)))].sort().slice(-3).map(y=>`<button data-y="${y}" class="${y===MY?'on':''}">${y}</button>`).join('')}</div>`;
 const bl=[...Array(12)].map((_,i)=>({i,a:ds(new Date(MY,i,1)),b:mEnd(MY,i)})).filter(x=>x.a<=today);
 const Y0=MY+'-01-01',Y1=MY+'-12-31';let body='';
 if(MT==='mama'){const M=mama(today),prev=mama(MY-1+'-12-31');
  body=`<div class="card"><h3>Hari ini</h3>
  <div class="kv"><span>Sisa uang mama (hitungan)</span><span class="ac" data-x="${FN(mamaSisaSheet)}">${rp(M.sisa)}</span></div>
  <div class="tiny" style="margin:2px 0 6px">= uang kos & kedai masuk ${X(rp(M.inn),{ids:mamaInIds('2000-01-01',today)},'Uang kos & kedai masuk (semua)')} − dipakai ${X(rp(M.out),{ids:mamaOutIds('2000-01-01',today)},'Pengeluaran kos & kedai (semua)')} − disetor ke reksadana uang kos mama ${X(rp(M.inv),{ids:tabIds('2000-01-01',today,true)},'Reksadana uang kos mama (semua)')}${S.mamaOpen?' + saldo awal '+rp(S.mamaOpen):''}</div>
  <h3 style="margin-top:8px">Uang mama yang ada sekarang</h3>${kantongRows(today)}
  <div class="kv"><b>Total</b><b class="ac" data-x="${FN(kantongSheet)}">${rp(M.kantong)}</b></div>
  <div class="st ${M.pribadi>0?'w':'ok'}">${M.pribadi>0?'Masih ada '+rp(M.pribadi)+' uang mama di akun pribadimu — pindahkan ke Kantong Uang Kos Mama':'Aman ✓ Tidak ada uang mama yang tertinggal di akun pribadimu'}</div>
  <div class="tiny" style="margin-top:6px">Sisa minus artinya uang mama yang dipakai & disetor ke reksadana lebih besar dari uang mama yang tercatat masuk sejak Feb 2024 (uang mama sebelum Feb 2024 belum dicatat sebagai saldo awal; bisa diisi di menu Atur). Status "Aman" dilihat dari apakah ada uang mama yang tertinggal di akun pribadimu.</div></div>
  <div class="card"><h3>Per bulan ${MY} (ketuk baris untuk rinciannya)</h3><div class="tw"><table><tr><th>Bln</th><th class="n">Masuk</th><th class="n">Keluar*</th><th class="n">Sisa</th><th class="n">Status</th></tr>
  <tr><td colspan=3 class="tiny">Sisa akhir ${MY-1}</td><td class="n">${rp(prev.sisa)}</td><td></td></tr>
  ${bl.map(x=>{const mm=mama(x.b),inn=income(x.a,x.b,'Uang Kos Mama')+income(x.a,x.b,'Uang Kedai'),out=expense(x.a,x.b,'Pengeluaran Uang Kos')+expense(x.a,x.b,'Pengeluaran Uang Kedai')+tabNet(x.a,x.b,true);
   return`<tr class="cl" data-x="${WKs(...mamaMonthWhy(x))}"><td>${BLN[x.i]}</td><td class="n up">${rp(inn)}</td><td class="n dn">${rp(out)}</td><td class="n">${rp(mm.sisa)}</td><td class="n"><span class="pill ${mm.pribadi>0?'w':''}">${mm.pribadi>0?'Pindahkan':'Aman'}</span></td></tr>`}).join('')}</table></div><div class="tiny" style="margin-top:6px">*Keluar = pengeluaran kos & kedai + setoran bersih ke reksadana uang kos mama.</div></div>`}
 if(MT==='kos'){const byK={},idK={};for(const t of S.tx)if(t.kos&&inR(t,Y0,Y1)){byK[t.kos]=(byK[t.kos]||0)+t.j;(idK[t.kos]=idK[t.kos]||[]).push(t.id)}
  const grp=w=>Object.entries(byK).filter(([k])=>k.startsWith('Kos '+w)).sort();const tot=w=>grp(w).reduce((p,x)=>p+x[1],0);const allIds=w=>grp(w).flatMap(([k])=>idK[k]);
  const outK={};for(const t of S.tx)if(t.sb==='Pengeluaran Uang Kos'&&inR(t,Y0,Y1))outK[t.kt]=(outK[t.kt]||0)+t.j;const rk=tabNet(Y0,Y1,true);
  const kr=(k,lbl)=>`<div class="row" data-x="${WKs({kos:k,from:Y0,to:Y1},k+' · '+MY)}"><div class="l">${lbl}</div><div class="r up">${rp(byK[k]||0)}</div><span class="chev">›</span></div>`;
  body=`<div class="card"><h3>Kos cowok (5 kamar) — ${MY}</h3>${[1,2,3,4,5,'?'].map(i=>kr('Kos cowok · Kamar '+i,i==='?'?'Kamar belum tercatat':'Kamar '+i)).join('')}
   ${grp('cowok').filter(([k])=>!/Kamar [1-5?]$/.test(k)).map(([k])=>kr(k,esc(k.replace('Kos cowok · ','')))).join('')}<div class="kv"><b>Total kos cowok</b><b>${X(rp(tot('cowok')),{ids:allIds('cowok')},'Kos cowok · '+MY)}</b></div></div>
  <div class="card"><h3>Kos cewek (7 kamar) — ${MY}</h3>${[1,2,3,4,5,6,7,'?'].map(i=>kr('Kos cewek · Kamar '+i,i==='?'?'Kamar belum tercatat':'Kamar '+i)).join('')}
   ${grp('cewek').filter(([k])=>!/Kamar [1-7?]$/.test(k)).map(([k])=>kr(k,esc(k.replace('Kos cewek · ','')))).join('')}<div class="kv"><b>Total kos cewek</b><b>${X(rp(tot('cewek')),{ids:allIds('cewek')},'Kos cewek · '+MY)}</b></div></div>
  <div class="card"><h3>Sumber masuk lainnya</h3>${['Campuran (cewek & cowok)','Sewa lapak pasar','Penggantian / lainnya','Belum diketahui'].filter(k=>byK[k]).map(k=>kr(k,k)).join('')||'<div class="tiny">Tidak ada</div>'}</div>
  <div class="card"><h3>Uang kos dipakai untuk</h3>${Object.entries(outK).sort((x,y)=>y[1]-x[1]).map(([k,v])=>`<div class="row" data-x="${WKs({sb:'Pengeluaran Uang Kos',kt:k,from:Y0,to:Y1},k+' · '+MY)}"><div class="l">${esc(k)}</div><div class="r dn">${rp(v)}</div><span class="chev">›</span></div>`).join('')}
   ${rk?`<div class="row" data-x="${WKs({ids:tabIds(Y0,Y1,true)},'Reksadana uang kos mama · '+MY,{lines:[['Disetor',sum(t=>t.tj==='Tabungan'&&isKosRd(t)&&t.t==='K'&&inR(t,Y0,Y1)),{ids:tabIds(Y0,Y1,true,'K')}],['− Dicairkan',sum(t=>t.tj==='Tabungan'&&isKosRd(t)&&t.t==='M'&&inR(t,Y0,Y1)),{ids:tabIds(Y0,Y1,true,'M')}],['= Bersih',rk,null,1]]})}"><div class="l">Disetor ke reksadana uang kos mama (bersih)</div><div class="r">${rp(rk)}</div><span class="chev">›</span></div>`:''}</div>`}
 if(MT==='disan'){const D=disan(today),prevD=disan(MY-1+'-12-31');let ti=0,to=0,pv=prevD.sisa;
  const rows=bl.map(x=>{const m=disanMonth(x.a,x.b),e=disan(x.b);ti+=m.inn;to+=m.out;const k=WKs(...disanWhy(x.a,x.b,'Uang Disan · '+BULAN[x.i]+' '+MY,pv));pv=e.sisa;
   return`<tr class="cl" data-x="${k}"><td>${BLN[x.i]}</td><td class="n up">${rp(m.inn)}</td><td class="n dn">${rp(m.out)}</td><td class="n">${rp(e.sisa)}</td><td class="n"><span class="pill ${e.pribadi>0?'w':''}">${e.pribadi>0?'Belum':'Aman'}</span></td></tr>`}).join('');
  body=`<div class="card"><h3>Hari ini</h3>
  <div class="kv"><span>Sisa uang Disan (hitungan)</span><span>${X(rp(D.sisa),...disanWhy('2000-01-01',today,'Sisa uang Disan (semua waktu)',0))}</span></div>
  <div class="kv"><span>Ada di akun Uang Disan</span><span class="ac" data-acc="Uang Disan">${rp(D.kantong)}</span></div>
  <div class="st ${D.pribadi>0?'w':'ok'}">${D.pribadi>0?'Ada '+rp(D.pribadi)+' uang Disan yang belum tercatat diberikan (masih di akun pribadimu)':'Aman ✓ Tidak ada uang Disan yang tertinggal di akun pribadimu'}</div>
  <div class="tiny" style="margin-top:6px">Masuk = uang untuk Disan (dari kk Lisa). Keluar = uang yang sudah diberikan/dipakai untuk Disan. Sisa = masuk − keluar.</div></div>
  <div class="card"><h3>Per bulan ${MY} (ketuk baris untuk rinciannya)</h3><div class="tw"><table><tr><th>Bln</th><th class="n">Masuk</th><th class="n">Keluar</th><th class="n">Sisa</th><th class="n">Status</th></tr>
  <tr><td colspan=3 class="tiny">Sisa akhir ${MY-1}</td><td class="n">${rp(prevD.sisa)}</td><td></td></tr>${rows}
  <tr class="cl" data-x="${WKs(...disanWhy(Y0,Y1,'Uang Disan · '+MY,prevD.sisa))}"><td><b>Total</b></td><td class="n up"><b>${rp(ti)}</b></td><td class="n dn"><b>${rp(to)}</b></td><td></td><td></td></tr></table></div>
  ${ti||to?'':`<div class="tiny" style="margin-top:6px">Belum ada catatan uang Disan di tahun ${MY}.</div>`}</div>`}
 if(MT==='riba'){const kts=[...new Set(S.tx.filter(t=>t.sb==='Dana riba').map(t=>t.kt))];
  body=`<div class="card"><h3>Dana riba (semua waktu)</h3>${kts.map(k=>`<div class="row" data-x="${WKs({sb:'Dana riba',kt:k},'Riba · '+k)}"><div class="l">${esc(k)}</div><div class="r">${rp(sum(t=>t.sb==='Dana riba'&&t.kt===k))}</div><span class="chev">›</span></div>`).join('')}
  <div class="kv"><b>Sisa di Kantong Riba</b><b class="ac" data-acc="Kantong Uang Riba">${rp(S.acc.filter(a=>a.g==='Dana Riba').reduce((p,a)=>p+bal(a.n),0))}</b></div>
  <div class="tiny" style="margin-top:6px">Bunga bank, dividen saham bank konvensional, dan untung reksadana non-syariah dicatat sebagai Pindah Uang › Dana riba, jadi tidak dihitung sebagai pendapatanmu.</div></div>`}
 $('main').innerHTML=tabs+body;
 document.querySelectorAll('#mt button').forEach(b=>b.onclick=()=>{MT=b.dataset.t;mamaV()});document.querySelectorAll('#my button').forEach(b=>b.onclick=()=>{MY=+b.dataset.y;mamaV()})}
/* ================= INVESTASI ================= */
let IT='saham';
const pxInfo=()=>S.pxAt?`Harga saham otomatis dari Google Sheets · ${fdate(S.pxAt.slice(0,10))} ${S.pxAt.slice(11,16)}`:(S.pxUrl?'Harga saham otomatis: belum pernah berhasil diperbarui':'Harga saham diisi manual (bisa dibuat otomatis di menu Atur)');
function sahamSum(){const P=saham(),hold=P.filter(p=>p.lot>0),tm=hold.reduce((s,p)=>s+p.modal,0),tn=hold.reduce((s,p)=>s+p.nilai,0);
 sheet(`<h3>Nilai semua saham yang dipegang</h3><div class="tiny">Nilai = lot × 100 lembar × harga terakhir. Ketuk kode saham untuk riwayat & asal uangnya.</div>
 ${hold.map(p=>`<div class="row" data-sk="${esc(p.kode)}"><div class="l"><div class="t1"><b>${esc(p.kode)}</b> · ${p.lot} lot × ${p.harga.toLocaleString('id-ID')}</div><div class="t2">modal ${rp(p.modal)}</div></div><div class="r"><div>${rp(p.nilai)}</div><div class="tiny ${p.pl>=0?'up':'dn'}">${rp(p.pl)}</div></div><span class="chev">›</span></div>`).join('')}
 <div class="box"><div class="kv"><span>Total modal</span><span>${rp(tm)}</span></div><div class="kv"><span>Total nilai sekarang</span><span>${rp(tn)}</span></div><div class="kv"><b>Untung/rugi belum terealisasi</b><b class="${tn-tm>=0?'up':'dn'}">${rp(tn-tm)}</b></div></div><div class="tiny">${esc(pxInfo())}</div>`)}
function rdSum(){const G=rdGoals(),K=kosRd(),gm=G.reduce((s,g)=>s+g.modal,0),gn=G.reduce((s,g)=>s+g.nilai,0);
 sheet(`<h3>Nilai semua reksadana pribadi</h3><div class="tiny">Ketuk tujuan untuk produk yang dipegang, riwayat & asal uangnya.</div>
 ${G.map(g=>`<div class="row" data-rg="${esc(g.tujuan)}"><div class="l"><div class="t1">${esc(g.tujuan)}</div><div class="t2">modal ${rp(g.modal)}</div></div><div class="r"><div>${rp(g.nilai)}</div><div class="tiny ${g.pl>=0?'up':'dn'}">${rp(g.pl)}</div></div><span class="chev">›</span></div>`).join('')}
 <div class="box"><div class="kv"><span>Total modal</span><span>${rp(gm)}</span></div><div class="kv"><span>Total nilai sekarang</span><span>${rp(gn)}</span></div><div class="kv"><b>Untung/rugi</b><b class="${gn-gm>=0?'up':'dn'}">${rp(gn-gm)}</b></div></div>
 <div class="row" data-rg="${KOS_RD}"><div class="l"><div class="t1">Reksadana uang kos mama (milik mama, tidak dijumlahkan)</div><div class="t2">modal ${rp(K.modal)}</div></div><div class="r">${rp(K.nilai)}</div><span class="chev">›</span></div>`)}
function invV(){LK={};WK={};const P=saham(),G=rdGoals(),K=kosRd(),D=deps(),hold=P.filter(p=>p.lot>0),sold=P.filter(p=>p.lot<=0);
 const tm=hold.reduce((s,p)=>s+p.modal,0),tn=hold.reduce((s,p)=>s+p.nilai,0),real=P.reduce((s,p)=>s+p.real,0),div=allSaham().filter(e=>e.jenis==='Dividen');
 const gm=G.reduce((s,g)=>s+g.modal,0),gn=G.reduce((s,g)=>s+g.nilai,0),dAkt=D.filter(d=>d.aktif),dNil=dAkt.reduce((s,d)=>s+d.modal,0);
 $('main').innerHTML=`<div class="card"><h3>Ringkasan investasi pribadi</h3><div class="g2">
  <div class="kp" data-x="${FN(sahamSum)}"><div class="a">Saham (nilai)</div><div class="b">${rp(tn)}</div><div class="tiny ${tn-tm>=0?'up':'dn'}">${rp(tn-tm)} dari modal ${rp(tm)}</div></div>
  <div class="kp" data-x="${FN(rdSum)}"><div class="a">Reksadana (nilai)</div><div class="b">${rp(gn)}</div><div class="tiny ${gn-gm>=0?'up':'dn'}">${rp(gn-gm)} dari modal ${rp(gm)}</div></div>
  <div class="kp" data-x="${FN(()=>{IT='dep';invV()})}"><div class="a">Deposito aktif</div><div class="b">${rp(dNil)}</div><div class="tiny">${dAkt.length} deposito</div></div>
  <div class="kp" data-rg="${KOS_RD}"><div class="a">Reksadana uang kos mama</div><div class="b">${rp(K.nilai)}</div><div class="tiny">milik mama, tidak dijumlahkan</div></div></div>
  <div class="tiny" style="margin-top:6px">${esc(pxInfo())}${S.pxUrl?` · <span class="ac" id="pxNow">perbarui sekarang</span>`:''}</div>
  <button class="b p" style="width:100%;margin-top:8px" id="invAdd">+ Catat beli / jual investasi</button></div>
 <div class="seg" id="its">${[['saham','Saham'],['rd','Reksadana'],['dep','Deposito']].map(([k,l])=>`<button data-t="${k}" class="${k===IT?'on':''}">${l}</button>`).join('')}</div>
 <div id="itb"></div>`;
 document.querySelectorAll('#its button').forEach(b=>b.onclick=()=>{IT=b.dataset.t;invV()});
 $('invAdd').onclick=()=>{EDIT=null;TPL={mode:'inv',ij:IT==='rd'?'rd':IT==='dep'?'dep':'saham'};go('add')};
 if($('pxNow'))$('pxNow').onclick=()=>refreshPx(false);
 const box=$('itb'),divH=div.filter(e=>!e.riba),divR=div.filter(e=>e.riba),dIds=a=>a.map(e=>e.tx).filter(Boolean);
 if(IT==='saham')box.innerHTML=`<div class="card"><h3>Saham dipegang (ketuk untuk riwayat & asal uang)</h3>${hold.map(p=>`<div class="row" data-sk="${esc(p.kode)}"><div class="l"><div class="t1"><b>${esc(p.kode)}</b> · ${p.lot} lot</div><div class="t2">modal ${rp(p.modal)} · harga ${p.harga.toLocaleString('id-ID')}</div></div><div class="r"><div>${rp(p.nilai)}</div><div class="tiny ${p.pl>=0?'up':'dn'}">${rp(p.pl)} (${pct(p.modal?p.pl/p.modal:null)})</div></div><span class="chev">›</span></div>`).join('')||'<div class="tiny">Belum ada</div>'}</div>
  <div class="card"><h3>Saham yang sudah dijual semua</h3>${sold.map(p=>`<div class="row" data-sk="${esc(p.kode)}"><div class="l">${esc(p.kode)}</div><div class="r ${p.real>=0?'up':'dn'}">${rp(p.real)}</div><span class="chev">›</span></div>`).join('')}
   <div class="kv"><b>Total untung terealisasi (semua saham)</b><b>${X(rp(real),{ids:allSaham().filter(e=>e.jenis==='Jual').map(e=>e.tx).filter(Boolean)},'Penjualan saham',{html:`<h4>Untung per penjualan</h4>`+allSaham().filter(e=>e.jenis==='Jual').sort((a,b)=>b.tgl.localeCompare(a.tgl)).map(e=>`<div class="kv"><span>${esc(e.kode)} · ${fdate(e.tgl)} · ${e.lot} lot</span><span class="${e.untung>=0?'up':'dn'}">${e.tx?`<span class="ac" data-tx="${e.tx}">${rp(e.untung)}</span>`:rp(e.untung)}</span></div>`).join('')})}</b></div></div>
  <div class="card"><h3>Dividen</h3><div class="kv"><span>Dividen halal (pendapatan)</span><span>${X(rp(divH.reduce((s,e)=>s+e.total,0)),{ids:dIds(divH)},'Dividen halal')}</span></div>
   <div class="kv"><span>Dividen bank (riba, dipisahkan)</span><span>${X(rp(divR.reduce((s,e)=>s+e.total,0)),{ids:dIds(divR)},'Dividen riba')}</span></div>
   ${div.slice().sort((a,b)=>b.tgl.localeCompare(a.tgl)).map(e=>`<div class="row" ${e.tx?`data-tx="${e.tx}"`:''}><div class="l"><div class="t1">${esc(e.kode)} ${e.riba?'<span class="pill n">riba</span>':''}</div><div class="t2">${fdate(e.tgl)}${e.alokasi?' · '+esc(e.alokasi):''}</div></div><div class="r up">${rp(e.total)}</div></div>`).join('')}</div>`;
 if(IT==='rd')box.innerHTML=`<div class="card"><h3>Reksadana per tujuan (ketuk untuk produk, riwayat & asal uang)</h3>${G.map(g=>`<div class="row" data-rg="${esc(g.tujuan)}"><div class="l"><div class="t1">${esc(g.tujuan)}</div><div class="t2">modal ${rp(g.modal)} · ${g.hold.length?esc(g.produk):'tidak ada produk dipegang'}</div></div><div class="r"><div>${rp(g.nilai)}</div><div class="tiny ${g.pl>=0?'up':'dn'}">${rp(g.pl)}</div></div><span class="chev">›</span></div>`).join('')}</div>
  <div class="card"><h3>Milik mama</h3><div class="row" data-rg="${KOS_RD}"><div class="l"><div class="t1">Reksadana uang kos mama</div><div class="t2">modal ${rp(K.modal)}</div></div><div class="r"><div>${rp(K.nilai)}</div><div class="tiny ${K.nilai-K.modal>=0?'up':'dn'}">${rp(K.nilai-K.modal)}</div></div><span class="chev">›</span></div></div>`;
 if(IT==='dep'){const bh=idsOf(t=>t.kt==='Hasil investasi: bagi hasil deposito'),rb=idsOf(t=>t.sb==='Dana riba'&&/deposito|bpr|kirana/i.test(t.ket));
  const dr=d=>`<div class="row" data-dp="${d.id}"><div class="l"><div class="t1">${esc(d.bpr)}</div><div class="t2">${fdate(d.aju)} → ${fdate(d.tempo)} · ${d.tenor} bln · ${esc(d.status||'')}</div></div><div class="r">${rp(d.modal)}</div><span class="chev">›</span></div>`;
  box.innerHTML=`<div class="card"><h3>Deposito aktif</h3>${dAkt.map(dr).join('')||'<div class="tiny">Tidak ada deposito aktif. Semua deposito 2024 sudah cair.</div>'}
   <div class="kv"><span>Saldo akun Deposito BPR</span><span class="ac" data-acc="Deposito BPR">${rp(bal('Deposito BPR'))}</span></div>
   <div class="kv"><span>Total bagi hasil (halal)</span><span>${X(rp(sum(t=>bh.includes(t.id))),{ids:bh},'Bagi hasil deposito')}</span></div>
   <div class="kv"><span>Bunga deposito konvensional (riba)</span><span>${X(rp(sum(t=>rb.includes(t.id))),{ids:rb},'Bunga deposito (riba)')}</span></div></div>
  <div class="card"><h3>Riwayat semua deposito (ketuk untuk transaksinya)</h3>${D.slice().reverse().map(dr).join('')}</div>`}}
function evSrc(e){if(!e.tx)return`<div class="tiny">${e.tgl<'2025-01-01'?'Sebelum 2025 / dari catatan HP (tidak ada transaksi kas)':'Tidak ada transaksi kas (pindah antar produk/tujuan)'}</div>`;
 const t=byId(e.tx);if(!t)return'<div class="tiny">Transaksi kasnya sudah dihapus</div>';let h=`<div class="tiny">Kas: <span class="ac" data-tx="${t.id}">${esc(t.a)} · ${rp(t.j)} · ${fdate(t.d)}</span></div>`;
 if(e.dana&&e.dana.length){h+=`<div class="tiny">Asal dana sebelumnya: `+e.dana.map(i=>{const x=byId(i);return x?`<span class="ac" data-tx="${x.id}">${esc(x.t==='T'?'dari '+x.a:(x.sb==='Pindah akun'?x.ket.slice(0,45):x.sb+': '+x.kt))} ${rp(x.j)} (${fdate(x.d)})</span>`:''}).join(', ')+'</div>'}
 return h+(e.app?'<div class="tiny">Dicatat dari aplikasi</div>':'')}
function sahamSheet(k){const p=saham().find(x=>x.kode===k);if(!p)return;const ev=p.ev.slice().sort((a,b)=>b.tgl.localeCompare(a.tgl));
 const by=j=>ev.filter(e=>e.jenis===j),txs=a=>a.map(e=>e.tx).filter(Boolean),S_=a=>a.reduce((s,e)=>s+(e.total||0),0),B=by('Beli'),J=by('Jual'),Dv=by('Dividen');
 sheet(`<h3>Saham ${esc(k)}</h3><div class="box">
 <div class="kv"><span>Total dibeli (${p.blot} lot, termasuk fee)</span><span>${L(rp(S_(B)),{ids:txs(B),title:'Pembelian '+k})}</span></div>
 <div class="kv"><span>Dijual</span><span>${p.slot} lot${J.length?' · '+L(rp(S_(J)),{ids:txs(J),title:'Penjualan '+k}):''}</span></div>
 <div class="kv"><b>Lot dipegang</b><b>${p.lot} lot (${(p.lot*100).toLocaleString('id-ID')} lembar)</b></div>
 ${p.lot>0?`<div class="kv"><span>Modal = ${rp(p.cost)} × ${p.lot}/${p.blot} lot</span><span>${rp(p.modal)}</span></div>
 <div class="kv"><span>Harga terakhir ${S.pxAt&&S.price[k]?'(otomatis)':'(ubah manual)'}</span><span><input type="number" id="hp" value="${p.harga}" style="width:110px;min-height:30px;padding:3px 6px"></span></div>
 <div class="kv"><span>Nilai = ${p.lot*100} × ${p.harga.toLocaleString('id-ID')}</span><span>${rp(p.nilai)}</span></div><div class="kv"><b>Untung/rugi</b><b class="${p.pl>=0?'up':'dn'}">${rp(p.pl)} (${pct(p.modal?p.pl/p.modal:null)})</b></div>`:''}
 <div class="kv"><span>Untung terealisasi dari penjualan</span><span class="${p.real>=0?'up':'dn'}">${J.length?L(rp(p.real),{ids:txs(J),title:'Penjualan '+k}):rp(0)}</span></div>
 <div class="kv"><span>Dividen diterima</span><span>${Dv.length?L(rp(S_(Dv)),{ids:txs(Dv),title:'Dividen '+k}):rp(0)}</span></div></div>
 <h4>Riwayat & asal-usul uang (ketuk untuk transaksinya)</h4>${ev.map(e=>`<div style="padding:8px 0;border-top:1px solid var(--line)">
  <div><b>${e.jenis}</b> · ${fdate(e.tgl)} ${e.lot?'· '+e.lot+' lot':''} <span style="float:right">${e.tx?`<span class="ac" data-tx="${e.tx}">${rp(e.total)}</span>`:rp(e.total)}</span></div>
  ${e.jenis==='Beli'?`<div class="tiny">Harga ${(e.harga||0).toLocaleString('id-ID')} · nilai ${rp(e.nilai)} + fee ${rp(e.fee)}${e.sumber?' · sumber: '+esc(e.sumber):''}</div>`:''}
  ${e.jenis==='Jual'?`<div class="tiny">Harga ${(e.harga||0).toLocaleString('id-ID')} · modal ${rp(e.modal)} → untung <span class="${e.untung>=0?'up':'dn'}">${rp(e.untung)}</span></div>`:''}
  ${e.jenis==='Dividen'?`<div class="tiny">${e.riba?'Riba — dipisahkan ke Dana riba':'Halal — pendapatan'}${e.alokasi?' · dipakai untuk: '+esc(e.alokasi):''}</div>`:''}${evSrc(e)}</div>`).join('')}`,
 ()=>{if($('hp'))$('hp').onchange=ev=>{S.price[k]=+ev.target.value||0;save();closeSheet();invV()}})}
function rdSheet(g){const x=rdGoals().find(z=>z.tujuan===g);if(!x)return;const ev=x.ev.slice().sort((a,b)=>b.tgl.localeCompare(a.tgl));
 const txs=a=>a.flatMap(rdTxIds),B=x.ev.filter(e=>e.jenis==='Beli'),J=x.ev.filter(e=>e.jenis==='Jual'),c=INV.cur[g]||[0,0];
 sheet(`<h3>${esc(g)}</h3><div class="box">
 <div class="kv"><span>Modal di file portofolio</span><span>${rp(c[0])}</span></div>
 ${x.appNet?`<div class="kv"><span>+ Beli − jual yang dicatat di aplikasi</span><span>${L(rp(x.appNet),{ids:x.ev.filter(e=>e.app).map(e=>e.tx).filter(Boolean),title:g+' · dari aplikasi'})}</span></div>`:''}
 <div class="kv"><b>= Modal sekarang</b><b>${rp(x.modal)}</b></div>
 <div class="kv"><span>Nilai sekarang (samakan dengan aplikasi Bibit/Stockbit)</span><span><input type="number" id="rn" value="${Math.round(x.nilai)}" style="width:130px;min-height:30px;padding:3px 6px"></span></div>
 <div class="kv"><b>Untung/rugi</b><b class="${x.pl>=0?'up':'dn'}">${rp(x.pl)}</b></div></div>
 <h4>Produk yang masih dipegang</h4>${x.hold.map(p=>`<div class="row" data-l="${LKs({ids:txs(p.ev),title:g+' · '+p.produk})}"><div class="l"><div class="t1">${esc(p.produk)}</div><div class="t2">beli ${rp(p.beli)} − jual ${rp(p.jual)} · terakhir ${fdate(p.last)}</div></div><div class="r">${rp(p.sisa)}</div><span class="chev">›</span></div>`).join('')||'<div class="tiny">Tidak ada produk yang masih dipegang.</div>'}
 ${Object.values(x.prod).filter(p=>Math.round(p.beli-p.jual)<1000).length?`<h4>Produk yang sudah dijual semua</h4>`+Object.values(x.prod).filter(p=>Math.round(p.beli-p.jual)<1000).map(p=>`<div class="row" data-l="${LKs({ids:txs(p.ev),title:g+' · '+p.produk})}"><div class="l"><div class="t1">${esc(p.produk)}</div><div class="t2">terakhir ${fdate(p.last)}</div></div><div class="r tiny">sudah dijual</div><span class="chev">›</span></div>`).join(''):''}
 <h4>Total riwayat</h4><div class="kv"><span>Total dibeli (modal)</span><span>${L(rp(x.beli),{ids:txs(B),title:g+' · pembelian'})}</span></div>
 <div class="kv"><span>− Total dijual (modal)</span><span>${L(rp(x.jual),{ids:txs(J),title:g+' · penjualan'})}</span></div>
 <div class="kv"><span>= Sisa modal menurut riwayat</span><span>${rp(x.riwayat)}</span></div>
 <div class="kv"><span>Untung yang sudah dicairkan</span><span>${rp(x.untung)}</span></div>
 ${Math.abs(x.riwayat-x.modal)>=1000?`<div class="st w">Modal di file portofolio (${rp(x.modal)}) berbeda ${rp(x.riwayat-x.modal)} dengan riwayat beli − jual (${rp(x.riwayat)}). Kemungkinan ada pembelian/penjualan yang tercatat di salah satunya saja. Cocokkan dengan aplikasi Bibit/Stockbit.</div>`:''}
 <h4>Riwayat & asal-usul uang</h4>${ev.map(e=>`<div style="padding:8px 0;border-top:1px solid var(--line)"><div><b>${e.jenis}</b> · ${fdate(e.tgl)} <span style="float:right">${e.tx?`<span class="ac" data-tx="${e.tx}">${rp(e.jenis==='Beli'?e.modal:e.nilai)}</span>`:rp(e.jenis==='Beli'?e.modal:e.nilai)}</span></div>
  <div class="tiny">${esc(e.produk)}${e.ket?' · '+esc(e.ket):''}${e.sumber?' · sumber: '+esc(e.sumber):''}${e.alokasi?' · dipakai: '+esc(e.alokasi):''}${e.jenis==='Jual'?' · modal '+rp(e.modal)+' · untung '+rp(e.untung):''}</div>${evSrc(e)}</div>`).join('')}`,
 ()=>{$('rn').onchange=ev=>{S.rdcur[g]=+ev.target.value||0;save();closeSheet();invV()}})}
function kosRdSheet(){const K=kosRd(),ids=idsOf(isKosRd),dis=sum(t=>isKosRd(t)&&t.t==='K'),cair=sum(t=>isKosRd(t)&&t.t==='M');
 sheet(`<h3>Reksadana uang kos mama</h3><div class="tiny">Uang ini milik mama, tidak dihitung sebagai investasi pribadimu.</div><div class="box">
 <div class="kv"><span>Modal di file portofolio</span><span>${rp(INV.kos[0])}</span></div>
 ${K.ev.length?`<div class="kv"><span>+ Beli − jual dari aplikasi</span><span>${L(rp(K.modal-INV.kos[0]),{ids:K.ev.map(e=>e.tx).filter(Boolean),title:'Reksadana uang kos mama · dari aplikasi'})}</span></div>`:''}
 <div class="kv"><b>= Modal sekarang</b><b>${rp(K.modal)}</b></div>
 <div class="kv"><span>Nilai sekarang</span><span><input type="number" id="kn" value="${Math.round(K.nilai)}" style="width:130px;min-height:30px;padding:3px 6px"></span></div>
 <div class="kv"><b>Untung/rugi</b><b class="${K.nilai-K.modal>=0?'up':'dn'}">${rp(K.nilai-K.modal)}</b></div></div>
 <h4>Semua transaksi kas</h4><div class="kv"><span>Disetor dari uang kos</span><span>${L(rp(dis),{ids:idsOf(t=>isKosRd(t)&&t.t==='K'),title:'Setor reksadana uang kos mama'})}</span></div>
 <div class="kv"><span>Dicairkan</span><span>${L(rp(cair),{ids:idsOf(t=>isKosRd(t)&&t.t==='M'),title:'Pencairan reksadana uang kos mama'})}</span></div>
 <button class="b p" style="width:100%;margin-top:10px" data-l="${LKs({ids,title:'Reksadana uang kos mama'})}">Lihat semua ${ids.length} transaksi</button>`,
 ()=>{$('kn').onchange=ev=>{S.rdcur.__kos=+ev.target.value||0;save();closeSheet();invV()}})}
function depSheet(id){const d=deps().find(z=>z.id===id);if(!d)return;const ids=depTx(d),tx=ids.map(byId).filter(Boolean).sort((a,b)=>a.d.localeCompare(b.d));
 sheet(`<h3>Deposito ${esc(d.bpr)}</h3><div class="box">
 <div class="kv"><span>Pokok</span><span>${rp(d.modal)}</span></div><div class="kv"><span>Mulai → jatuh tempo</span><span>${fdate(d.aju)} → ${fdate(d.tempo)}</span></div>
 <div class="kv"><span>Tenor</span><span>${d.tenor} bulan</span></div><div class="kv"><span>${d.riba?'Bunga':'Bunga / nisbah'} per tahun</span><span>${((d.bunga||0)*100).toFixed(2)}%${d.riba?' <span class="pill n">riba</span>':''}</span></div>
 ${d.untung?`<div class="kv"><span>Hasil (dari file)</span><span>${rp(d.untung)}</span></div>`:''}<div class="kv"><span>Status</span><span>${esc(d.status||'')}</span></div></div>
 <h4>${d.src==='app'?'Transaksi deposito ini':'Transaksi terkait (dicari dari nama bank)'}</h4>${tx.map(txRow).join('')||'<div class="tiny">Tidak ditemukan transaksi kas</div>'}
 ${ids.length?`<button class="b p" style="width:100%;margin-top:10px" data-l="${LKs({ids,title:'Deposito '+d.bpr})}">Lihat di Riwayat</button>`:''}`)}
/* ================= RENCANA ================= */
function plan(){LK={};WK={};const G=rdGoals(),g=n=>G.find(x=>x.tujuan===n)||{nilai:0,modal:0};
 const e6=[...Array(6)].map((_,i)=>{const d=new Date();d.setMonth(d.getMonth()-1-i);return expense(ds(new Date(d.getFullYear(),d.getMonth(),1)),mEnd(d.getFullYear(),d.getMonth()),'Pengeluaran Gaji')+expense(ds(new Date(d.getFullYear(),d.getMonth(),1)),mEnd(d.getFullYear(),d.getMonth()),'Pengeluaran Jasa')});
 const i6=[...Array(6)].map((_,i)=>{const d=new Date();d.setMonth(d.getMonth()-1-i);return income(ds(new Date(d.getFullYear(),d.getMonth(),1)),mEnd(d.getFullYear(),d.getMonth()),'Gaji')+income(ds(new Date(d.getFullYear(),d.getMonth(),1)),mEnd(d.getFullYear(),d.getMonth()),'Jasa')});
 const avgE=e6.reduce((a,b)=>a+b,0)/6,avgI=i6.reduce((a,b)=>a+b,0)/6,sur=avgI-avgE;
 const M6=[...Array(6)].map((_,i)=>{const d=new Date();d.setMonth(d.getMonth()-1-i);const a=ds(new Date(d.getFullYear(),d.getMonth(),1)),b=mEnd(d.getFullYear(),d.getMonth());return{a,b,l:BULAN[d.getMonth()]+' '+d.getFullYear()}});
 const A=M6[5].a,Z=M6[0].b;
 const wI=[{ids:idsOf(t=>inR(t,A,Z)&&t.tj==='Pendapatan'&&(t.sb==='Gaji'||t.sb==='Jasa'))},'Pendapatan pribadi 6 bulan',{lines:M6.map((m,i)=>[m.l,i6[i],{ids:idsOf(t=>inR(t,m.a,m.b)&&t.tj==='Pendapatan'&&(t.sb==='Gaji'||t.sb==='Jasa'))}]).concat([['Jumlah 6 bulan',i6.reduce((a,b)=>a+b,0),null],['= Rata-rata per bulan (÷6)',avgI,null,1]])}];
 const wE=[{ids:idsOf(t=>inR(t,A,Z)&&t.tj==='Pengeluaran'&&(t.sb==='Pengeluaran Gaji'||t.sb==='Pengeluaran Jasa'))},'Pengeluaran pribadi 6 bulan',{lines:M6.map((m,i)=>[m.l,e6[i],{ids:idsOf(t=>inR(t,m.a,m.b)&&t.tj==='Pengeluaran'&&(t.sb==='Pengeluaran Gaji'||t.sb==='Pengeluaran Jasa'))}]).concat([['Jumlah 6 bulan',e6.reduce((a,b)=>a+b,0),null],['= Rata-rata per bulan (÷6)',avgE,null,1]])}];
 const base=[{n:'Dana Darurat',t:Math.round(avgE*6),g:'Dana Darurat',dl:'',note:'Target = 6× rata-rata pengeluaran pribadi bulanan'},{n:'Dana Kuliah',t:36000000,g:'Dana Kuliah',dl:'',note:'Target dari simulasi di file portofoliomu'},{n:'Dana Beli Laptop',t:6000000,g:'Dana Beli Laptop',dl:'',note:''}];
 const all=[...base.map(b=>({...b,...(S.goals.find(x=>x.n===b.n)||{})})),...S.goals.filter(x=>!base.find(b=>b.n===x.n))];
 const mo=dl=>{if(!dl)return null;const d=pd(dl),n=new Date();return Math.max(1,(d.getFullYear()-n.getFullYear())*12+d.getMonth()-n.getMonth())};
 $('main').innerHTML=`<div class="card"><h3>Kemampuan menabung (6 bulan terakhir)</h3>
  <div class="kv"><span>Rata-rata pendapatan pribadi (gaji + jasa)</span><span>${X(rp(avgI),...wI)}</span></div>
  <div class="kv"><span>Rata-rata pengeluaran pribadi</span><span>${X(rp(avgE),...wE)}</span></div>
  <div class="kv"><b>Bisa ditabung per bulan</b><b class="${sur>=0?'up':'dn'}">${X(rp(sur),{ids:wI[0].ids.concat(wE[0].ids)},'Bisa ditabung per bulan',{lines:[['Rata-rata pendapatan pribadi',avgI,null],['− Rata-rata pengeluaran pribadi',avgE,null],['= Bisa ditabung per bulan',sur,null,1]]})}</b></div></div>
 <div class="card"><h3>Tujuan keuangan (terhubung ke reksadana per tujuan)</h3>${all.map((x,i)=>{const cur=x.g?g(x.g).nilai:(x.got||0),p=x.t?Math.min(1,cur/x.t):0,sisa=Math.max(0,x.t-cur),m=mo(x.dl),need=m?sisa/m:null;
  return`<div style="padding:10px 0;border-top:1px solid var(--line)"><div style="display:flex;justify-content:space-between"><b>${esc(x.n)}</b><span class="pill ${p>=1?'':(need!=null&&need>sur?'w':'')}">${p>=1?'Tercapai':need==null?'Atur tenggat':need<=sur?'Sesuai jalur':'Perlu usaha lebih'}</span></div>
  <div class="tiny">${x.g?`<span class="ac" data-rg="${esc(x.g)}">${rp(cur)}</span>`:rp(cur)} dari ${rp(x.t)}${x.g?' · dari reksadana '+esc(x.g):''}${x.note?' · '+esc(x.note):''}</div><div class="bar"><i style="width:${p*100}%"></i></div>
  <div class="tiny" style="margin-top:4px">${need!=null?'Perlu '+rp(need)+'/bulan sampai '+fdate(x.dl):'Belum ada tenggat'} · <span class="ac" data-gi="${i}">ubah</span></div></div>`}).join('')}
  <button class="b" style="width:100%;margin-top:8px" id="gAdd">+ Tambah tujuan</button></div>
`;
 const edit=x=>{sheet(`<h3>${x?'Ubah':'Tambah'} tujuan</h3><div class="fl"><input class="w2" id="gn" placeholder="Nama" value="${esc(x?.n||'')}"><input type="number" id="gt" placeholder="Target (Rp)" value="${x?.t||''}"><input type="date" id="gd" value="${x?.dl||''}">
  <select class="w2" id="gg">${opts(rdGoals().map(z=>z.tujuan),x?.g,'Tidak terhubung ke reksadana')}</select><button class="b p w2" id="gs">Simpan</button></div>`,()=>{
  $('gs').onclick=()=>{const o={n:$('gn').value.trim(),t:+$('gt').value||0,dl:$('gd').value,g:$('gg').value||''};if(!o.n)return;S.goals=S.goals.filter(z=>z.n!==(x?.n||o.n));S.goals.push(o);save();closeSheet();plan()}})};
 document.querySelectorAll('[data-gi]').forEach(s=>s.onclick=()=>edit(all[+s.dataset.gi]));$('gAdd').onclick=()=>edit(null)}
/* ================= CATAT ================= */
let EDIT=null,TPL=null,AM='biasa',IJ='saham',JN='Beli';
function add(){LK={};WK={};if(TPL&&TPL.mode==='inv')AM='inv';else if(TPL||EDIT)AM='biasa';
 $('main').innerHTML=`${EDIT?'':`<div class="seg" id="am"><button data-m="biasa" class="${AM==='biasa'?'on':''}">Transaksi biasa</button><button data-m="inv" class="${AM==='inv'?'on':''}">Investasi</button></div>`}
 <div id="amb"></div>
 <div class="card"><h3>Terakhir dicatat (ketuk untuk detail)</h3>${S.tx.slice().sort((a,b)=>b.id-a.id).slice(0,8).map(txRow).join('')}</div>`;
 document.querySelectorAll('#am button').forEach(b=>b.onclick=()=>{AM=b.dataset.m;TPL=null;add()});
 AM==='inv'&&!EDIT?invForm():txForm()}
function txForm(){const t=EDIT?byId(EDIT):null,P=t||TPL||null;TPL=null;const tipe=P&&P.t?P.t:'K';
 const quick=GUIDE.filter(g=>g.quick);
 $('amb').innerHTML=`<div class="card"><h3>${t?'Ubah transaksi':'Catat transaksi baru'}</h3>
 ${t?'':`<div class="tiny">Contoh cepat (ketuk untuk mengisi otomatis):</div><div class="chips">${quick.map(g=>`<span class="chip" data-q="${g.id}">${esc(g.judul)}</span>`).join('')}<span class="chip" id="toGuide">Semua contoh ›</span></div>`}
 ${P&&P.judul?`<div class="st ok" style="margin:6px 0">Diisi dari contoh: ${esc(P.judul)}. Periksa lalu isi jumlahnya.</div>`:''}
 <div class="seg" id="tt">${[['M','Uang masuk'],['K','Uang keluar'],['T','Pindah akun']].map(([k,l])=>`<button data-k="${k}" class="${k===tipe?'on':''}">${l}</button>`).join('')}</div>
 <div class="fl" style="margin-top:8px">
  <label class="lb">Tanggal<input type="date" id="ad" value="${t?t.d:today}"></label><label class="lb">Jumlah (Rp)<input type="number" inputmode="numeric" id="aj" placeholder="0" value="${t?t.j:''}"></label>
  <label class="lb" id="laa">Akun<select id="aa">${opts(accNames(),P&&P.a?P.a:'Dompet')}</select></label><label class="lb" id="latu">Ke akun<select id="atu">${opts(accNames(),P&&P.tu?P.tu:'')}</select></label>
  <label class="lb">Tujuan<select id="atj"></select></label><label class="lb">Sumber<select id="asb"></select></label>
  <label class="lb w2">Kategori<input id="akt" list="ktl" placeholder="Pilih dari daftar atau ketik baru" value="${esc(P&&P.kt?P.kt:'')}"></label><datalist id="ktl"></datalist>
  <label class="lb w2" id="lkos">Kos / kamar<select id="akos">${opts(KOSL,P&&P.kos?P.kos:'','Pilih kos & kamar')}</select></label>
  <label class="lb w2">Keterangan<input id="aket" placeholder="${esc(P&&P.contoh?'Contoh: '+P.contoh:'Tulis keterangan singkat')}" value="${esc(t?t.ket:'')}"></label>
  <button class="b w2 p" id="asave">${t?'Simpan perubahan':'Simpan'}</button>${t?'<button class="b w2" id="acan">Batal</button>':''}</div>
 <div class="tiny" id="ahint" style="margin-top:8px"></div></div>`;
 let tp=tipe;const setT=k=>{tp=k;document.querySelectorAll('#tt button').forEach(b=>b.classList.toggle('on',b.dataset.k===k));
  $('latu').style.display=k==='T'?'':'none';$('laa').firstChild.textContent=k==='T'?'Dari akun':k==='M'?'Masuk ke akun':'Keluar dari akun';
  const tjs=k==='M'?['Pendapatan','Tabungan','Pindah Uang']:k==='K'?['Pengeluaran','Tabungan','Pindah Uang']:['Pindah Uang'];
  $('atj').innerHTML=opts(tjs,P&&tjs.includes(P.tj)?P.tj:tjs[0]);fillSb(true)};
 const fillSb=(first)=>{const tj=$('atj').value;$('asb').innerHTML=opts(SUMBER[tj],first&&P&&P.tj===tj&&P.sb?P.sb:(tj==='Pengeluaran'?({'Uang Jasa':'Pengeluaran Jasa','Uang Kos Mama Cash':'Pengeluaran Uang Kos','Jago - Uang Kos Mama':'Pengeluaran Uang Kos','Uang Disan':'Pengeluaran Uang Disan'}[$('aa').value]||'Pengeluaran Gaji'):SUMBER[tj][0]));fillKt()};
 const fillKt=()=>{$('lkos').style.display=$('asb').value==='Uang Kos Mama'?'':'none';$('ktl').innerHTML=katList($('atj').value,$('asb').value).map(k=>`<option value="${esc(k)}">`).join('');
  const tj=$('atj').value,sb=$('asb').value;$('ahint').innerHTML=(HINT[sb]||HINT[tj]||'')+(tj==='Tabungan'&&(sb==='Saham'||sb==='Reksadana'||sb==='Reksadana uang kos mama')?' <b>Untuk beli/jual saham & reksadana, pakai tab "Investasi" di atas supaya data investasinya ikut tercatat.</b>':'')};
 document.querySelectorAll('#tt button').forEach(b=>b.onclick=()=>setT(b.dataset.k));$('atj').onchange=()=>fillSb(false);$('asb').onchange=fillKt;$('aa').onchange=()=>{if($('atj').value==='Pengeluaran')fillSb(false)};setT(tipe);
 document.querySelectorAll('[data-q]').forEach(c=>c.onclick=()=>{useTpl(c.dataset.q)});if($('toGuide'))$('toGuide').onclick=()=>go('guide');
 if($('acan'))$('acan').onclick=()=>{EDIT=null;go('trx')};
 $('asave').onclick=()=>{const j=+$('aj').value,d=$('ad').value;if(!(j>0)||!d)return alert('Isi tanggal dan jumlah.');
  if(tp==='T'&&$('atu').value===$('aa').value)return alert('Akun tujuan harus berbeda.');
  if($('asb').value==='Uang Kos Mama'&&$('akt').value==='Uang kos anak kos'&&!$('akos').value&&!confirm('Kos/kamar belum dipilih. Simpan tanpa kamar?'))return;
  const o={d,a:$('aa').value,t:tp,j,tj:$('atj').value,sb:$('asb').value,kt:$('akt').value.trim()||(tp==='T'?'Pindah antar akun sendiri':'Lain-lain'),ket:$('aket').value.trim(),tu:tp==='T'?$('atu').value:null,cek:t?t.cek:'',kos:$('asb').value==='Uang Kos Mama'?$('akos').value:''};
  if(t)Object.assign(t,o);else S.tx.push({id:S.next++,...o});save();const wasEdit=!!t;EDIT=null;alert('Tersimpan ✓');if(wasEdit)go('trx');else add()}}
function useTpl(id){const g=GUIDE.find(x=>x.id===id);if(!g)return;EDIT=null;TPL=g.inv?{mode:'inv',ij:g.inv[0],jn:g.inv[1]}:{...g};go('add')}
const HINT={Pendapatan:'Pendapatan = uang yang benar-benar jadi milikmu atau milik mama/Disan (dipisah lewat Sumber).',Pengeluaran:'Pengeluaran = uang yang habis dipakai. Pilih Sumber sesuai uang siapa yang dipakai.',
 'Pindah Uang':'Pindah uang tidak dihitung sebagai pendapatan/pengeluaran (mis. top up, tarik tunai, pinjam-meminjam, riba).',Tabungan:'Tabungan = uang yang disimpan/diinvestasikan. Dihitung sebagai tabungan bersih.',
 Gaji:'Sumber "Gaji" dipakai untuk semua uang pribadimu selain uang jasa.',Jasa:'Sumber "Jasa" untuk uang jasa rujukan pasien.','Uang Kos Mama':'Uang kos milik mama. Pilih kos & kamarnya supaya masuk ke laporan per kamar.',
 'Uang Kedai':'Uang dari kedai milik mama.','Uang Disan':'Uang untuk Disan yang kamu terima (mis. dari kk Lisa). Bukan milikmu.','Pengeluaran Gaji':'Pengeluaran pribadi yang dibayar dari uang gaji.',
 'Pengeluaran Jasa':'Pengeluaran pribadi yang dibayar dari uang jasa.','Pengeluaran Uang Kos':'Pengeluaran yang memakai uang kos mama (listrik kos, perbaikan, pegadaian mama, dll.).',
 'Pengeluaran Uang Kedai':'Pengeluaran yang memakai uang kedai mama.','Pengeluaran Uang Disan':'Uang Disan yang sudah diberikan/dipakai untuk Disan.','Dana riba':'Bunga bank, pajak bunga, dividen bank, dan penyalurannya. Tidak dihitung sebagai pendapatan.',
 'Pindah akun':'Memindahkan uangmu sendiri antar akun. Pakai tombol "Pindah akun" di atas supaya cukup satu catatan.','Utang & piutang':'Piutang Keluar = kamu meminjamkan; Piutang Kembali = dikembalikan; Utang Diterima = kamu meminjam; Bayar Utang = kamu melunasi.',
 'Pinjam uang mama':'Pinjam dari Mama = kamu memakai uang mama sementara; Bayar Utang ke Mama = mengembalikannya.','Titipan orang lain':'Uang orang lain yang lewat akunmu (masuk lalu diserahkan).','Jula-jula':'Setoran arisan/jula-jula.'};
/* ---------- form investasi ---------- */
function invForm(){const P=TPL&&TPL.mode==='inv'?TPL:null;if(P){IJ=P.ij||IJ;JN=P.jn||JN;TPL=null}
 const JL={saham:['Beli','Jual','Dividen'],rd:['Beli','Jual'],dep:['Setor','Cairkan','Bagi hasil / bunga']};if(!JL[IJ].includes(JN))JN=JL[IJ][0];
 const kodes=[...new Set(allSaham().map(e=>e.kode))].sort(),prods=[...new Set(allRd().map(e=>e.produk))].sort(),G=rdGoals(),Dall=S.inv.dep,dAkt=Dall.filter(d=>d.status==='Aktif');
 const defA={saham:'Jago - Kantong Stockbit',rd:JN==='Beli'?'Jago - Kantong Stockbit':'Jago - Kantong Utama',dep:'Bank Mandiri'}[IJ];
 const aLbl=(IJ==='saham'&&JN==='Beli')||(IJ==='rd'&&JN==='Beli')||(IJ==='dep'&&JN==='Setor')?'Uang diambil dari akun':'Uang masuk ke akun';
 let f='';
 if(IJ==='saham'){f+=`<label class="lb w2">Kode saham<input id="ik" list="kdl" placeholder="mis. BBRI" style="text-transform:uppercase"></label><datalist id="kdl">${kodes.map(k=>`<option value="${k}">`).join('')}</datalist>`;
  if(JN!=='Dividen')f+=`<label class="lb">Jumlah lot<input type="number" inputmode="numeric" id="il" placeholder="1 lot = 100 lembar"></label><label class="lb">Harga per lembar<input type="number" inputmode="decimal" id="ih"></label><label class="lb w2">Fee broker (Rp)<input type="number" inputmode="numeric" id="if" placeholder="lihat di Stockbit, mis. 1.050"></label>`;
  else f+=`<label class="lb w2">Dividen yang diterima (Rp, bersih)<input type="number" inputmode="numeric" id="ij2"></label><label class="lb w2 ck"><input type="checkbox" id="ir"> Saham bank konvensional (dividen = riba, dipisahkan)</label>`}
 if(IJ==='rd'){f+=`<label class="lb w2">Tujuan<select id="it">${G.map(g=>`<option value="${esc(g.tujuan)}">${esc(g.tujuan)}</option>`).join('')}<option value="${KOS_RD}">Reksadana uang kos mama (milik mama)</option><option value="__new">+ Tujuan baru…</option></select></label>
  <label class="lb w2" id="litn" style="display:none">Nama tujuan baru<input id="itn" placeholder="mis. Dana Umroh"></label>
  <label class="lb w2">Produk reksadana<input id="ip" list="pdl" placeholder="mis. Majoris Pasar Uang Syariah Indonesia"></label><datalist id="pdl">${prods.map(k=>`<option value="${esc(k)}">`).join('')}</datalist>`;
  if(JN==='Beli')f+=`<label class="lb w2">Jumlah dibeli (Rp)<input type="number" inputmode="numeric" id="ij2"></label>`;
  else f+=`<label class="lb">Uang yang dicairkan (Rp)<input type="number" inputmode="numeric" id="inv"></label><label class="lb">Modal yang dijual (Rp)<input type="number" inputmode="numeric" id="imd"></label><div class="w2 tiny" id="imdh"></div>`}
 if(IJ==='dep'){if(JN==='Setor')f+=`<label class="lb w2">Nama bank / BPR<input id="ib" list="bkl" placeholder="mis. BPRS Almasoem"></label><datalist id="bkl">${[...new Set(deps().map(d=>d.bpr))].map(k=>`<option value="${esc(k)}">`).join('')}</datalist>
   <label class="lb">Jumlah pokok (Rp)<input type="number" inputmode="numeric" id="ij2"></label><label class="lb">Tenor (bulan)<input type="number" id="itn2" value="1"></label>
   <label class="lb">Bunga / nisbah per tahun (%)<input type="number" inputmode="decimal" id="ibg" placeholder="mis. 6.75"></label><label class="lb">Jenis<select id="isy"><option>Syariah</option><option>Konvensional</option></select></label>`;
  else f+=`<label class="lb w2">Deposito<select id="idp">${(JN==='Cairkan'?dAkt:Dall).map(d=>`<option value="${d.id}">${esc(d.bpr)} · ${rp(d.modal)} · ${fdate(d.aju)}${d.status==='Aktif'?'':' ('+esc(d.status)+')'}</option>`).join('')}${JN!=='Cairkan'?'<option value="">Lainnya (tidak ada di daftar)</option>':''}</select></label>
   ${JN!=='Cairkan'?`<label class="lb w2" id="lbk">Nama bank (jika "Lainnya")<input id="ib"></label><label class="lb w2 ck" id="lrb"><input type="checkbox" id="ir"> Bank konvensional (bunga = riba, dipisahkan)</label>`:''}
   <label class="lb w2">${JN==='Cairkan'?'Pokok yang dicairkan (Rp)':'Jumlah diterima (Rp)'}<input type="number" inputmode="numeric" id="ij2"></label>`}
 $('amb').innerHTML=`<div class="card"><h3>Catat investasi</h3>
 <div class="seg" id="ij">${[['saham','Saham'],['rd','Reksadana'],['dep','Deposito']].map(([k,l])=>`<button data-j="${k}" class="${k===IJ?'on':''}">${l}</button>`).join('')}</div>
 <div class="seg" id="jn" style="margin-top:6px">${JL[IJ].map(k=>`<button data-n="${k}" class="${k===JN?'on':''}">${k}</button>`).join('')}</div>
 ${IJ==='dep'&&JN!=='Setor'&&!(JN==='Cairkan'?dAkt:Dall).length?`<div class="st w" style="margin-top:8px">${JN==='Cairkan'?'Belum ada deposito aktif yang dicatat dari aplikasi. Catat dulu lewat "Setor".':'Belum ada deposito dari aplikasi; pilih "Lainnya" dan isi nama bank.'}</div>`:''}
 <div class="fl" style="margin-top:8px"><label class="lb">Tanggal<input type="date" id="id" value="${today}"></label><label class="lb">${aLbl}<select id="ia">${opts(accNames(),defA)}</select></label>
 ${f}<label class="lb w2">Keterangan (boleh kosong, diisi otomatis)<input id="iket"></label></div>
 <div class="box" id="ipv" style="margin-top:8px"></div>
 <button class="b p" style="width:100%;margin-top:8px" id="isave">Simpan</button>
 <div class="tiny" style="margin-top:6px">${esc(INVHINT[IJ+JN]||'')}</div></div>`;
 document.querySelectorAll('#ij button').forEach(b=>b.onclick=()=>{IJ=b.dataset.j;invForm()});document.querySelectorAll('#jn button').forEach(b=>b.onclick=()=>{JN=b.dataset.n;invForm()});
 const ribaK=new Set(allSaham().filter(e=>e.riba).map(e=>e.kode));
 if($('it')){const setP=()=>{const v=$('it').value;$('litn').style.display=v==='__new'?'':'none';const g=G.find(x=>x.tujuan===v);const K=v===KOS_RD?allRd().filter(e=>e.tujuan===KOS_RD):null;
   const hp=g&&g.hold.length?g.hold[0].produk:(K&&K.length?K[K.length-1].produk:'');if(hp)$('ip').value=hp;pv()};$('it').onchange=setP;setP()}
 if($('ik'))$('ik').oninput=()=>{if($('ir'))$('ir').checked=ribaK.has($('ik').value.trim().toUpperCase());pv()};
 if($('idp')){const sd=()=>{const d=Dall.find(x=>x.id===$('idp').value);if(JN==='Cairkan'&&d)$('ij2').value=d.modal;if($('lbk'))$('lbk').style.display=d?'none':'';if($('lrb'))$('lrb').style.display=d?'none':'';pv()};$('idp').onchange=sd;sd()}
 document.querySelectorAll('#amb input,#amb select').forEach(x=>{x.addEventListener('input',pv)});
 function pv(){const n=id=>$(id)?+$(id).value||0:0,a=$('ia').value;let h='';
  if(IJ==='saham'){const k=($('ik').value||'').trim().toUpperCase(),p=saham().find(x=>x.kode===k);
   if(JN==='Beli'){const v=n('il')*100*n('ih');h=`<div class="kv"><span>Nilai = ${n('il')} lot × 100 × ${n('ih').toLocaleString('id-ID')}</span><span>${rp(v)}</span></div><div class="kv"><span>+ Fee</span><span>${rp(n('if'))}</span></div><div class="kv"><b>Uang keluar dari ${esc(a)}</b><b>${rp(v+n('if'))}</b></div>${p?`<div class="tiny">Sekarang kamu memegang ${p.lot} lot ${k}.</div>`:''}`}
   if(JN==='Jual'){const v=n('il')*100*n('ih'),tot=v-n('if'),md=p&&p.blot?p.cost/p.blot*n('il'):0;h=`<div class="kv"><span>Nilai jual</span><span>${rp(v)}</span></div><div class="kv"><span>− Fee</span><span>${rp(n('if'))}</span></div><div class="kv"><b>Uang masuk ke ${esc(a)}</b><b>${rp(tot)}</b></div><div class="kv"><span>Modal rata-rata ${n('il')} lot</span><span>${rp(md)}</span></div><div class="kv"><b>Untung/rugi</b><b class="${tot-md>=0?'up':'dn'}">${rp(tot-md)}</b></div><div class="tiny">${p?`Lot ${k} yang dipegang: ${p.lot}`:'Kode ini belum pernah dibeli.'}</div>`}
   if(JN==='Dividen'){h=`<div class="kv"><b>Dicatat sebagai</b><b>${$('ir').checked?'Pindah Uang › Dana riba › Dividen bank':'Pendapatan › Gaji › Hasil investasi: dividen saham'}</b></div>`}}
  if(IJ==='rd'){const t=$('it').value==='__new'?($('itn').value||'tujuan baru'):$('it').value,g=G.find(x=>x.tujuan===t),pr=($('ip').value||'').trim();
   const pp=g?Object.values(g.prod).find(x=>x.produk.toLowerCase()===pr.toLowerCase()):null,sisa=pp?Math.round(pp.beli-pp.jual):0;
   if(JN==='Beli')h=`<div class="kv"><b>Uang keluar dari ${esc(a)}</b><b>${rp(n('ij2'))}</b></div><div class="kv"><span>Modal ${esc(t)} menjadi</span><span>${rp((g?g.modal:t===KOS_RD?kosRd().modal:0)+n('ij2'))}</span></div><div class="tiny">Dicatat sebagai Tabungan › ${t===KOS_RD?'Reksadana uang kos mama':'Reksadana'} › Disetor</div>`;
   else{h=`<div class="kv"><b>Uang masuk ke ${esc(a)}</b><b>${rp(n('inv'))}</b></div><div class="kv"><span>− Modal yang dijual</span><span>${rp(n('imd'))}</span></div><div class="kv"><b>Untung</b><b class="${n('inv')-n('imd')>=0?'up':'dn'}">${rp(n('inv')-n('imd'))}</b></div>`;
    if($('imdh'))$('imdh').innerHTML=pp?`Sisa modal ${esc(pp.produk)} menurut riwayat: ${rp(sisa)}. <span class="ac" id="imdAll">Jual semua (isi ${rp(sisa)})</span>. Kalau jual sebagian, lihat "modal" di aplikasi Bibit/Stockbit.`:'Lihat angka "modal" yang dijual di aplikasi Bibit/Stockbit.';
    if($('imdAll'))$('imdAll').onclick=()=>{$('imd').value=sisa;pv()}}}
  if(IJ==='dep'){if(JN==='Setor')h=`<div class="kv"><b>Pindah dari ${esc(a)} ke akun Deposito BPR</b><b>${rp(n('ij2'))}</b></div><div class="tiny">Perkiraan hasil ${n('itn2')} bulan: ${rp(n('ij2')*n('ibg')/100*n('itn2')/12)} (sebelum pajak)</div>`;
   if(JN==='Cairkan')h=`<div class="kv"><b>Pindah dari Deposito BPR ke ${esc(a)}</b><b>${rp(n('ij2'))}</b></div>`;
   if(JN==='Bagi hasil / bunga'){const d=Dall.find(x=>x.id===($('idp')||{}).value),rb=d?d.riba:($('ir')&&$('ir').checked);h=`<div class="kv"><b>Masuk ke ${esc(a)}</b><b>${rp(n('ij2'))}</b></div><div class="tiny">Dicatat sebagai ${rb?'Pindah Uang › Dana riba › Bunga bank (riba)':'Pendapatan › Gaji › Hasil investasi: bagi hasil deposito'}</div>`}}
  $('ipv').innerHTML=h}
 pv();$('isave').onclick=invSave}
const INVHINT={sahamBeli:'Uang keluar = nilai saham + fee. Tercatat sebagai Tabungan › Saham › Disetor dan masuk ke riwayat saham.',sahamJual:'Uang masuk = nilai jual − fee. Untung dihitung dari modal rata-rata.',sahamDividen:'Dividen saham bank konvensional (BBRI, BBCA, dll.) otomatis dicentang sebagai riba.',
 rdBeli:'Nilai reksadana tujuan ini ikut bertambah. Samakan nilainya dengan Bibit/Stockbit kapan saja lewat menu Investasi.',rdJual:'Kalau produknya non-syariah, pindahkan untungnya ke Kantong Uang Riba lewat transaksi biasa (Pindah akun).',
 depSetor:'Uang dipindah ke akun "Deposito BPR", jadi saldo akun asal berkurang dan tidak dihitung sebagai pengeluaran.',depCairkan:'Pokok kembali dari akun Deposito BPR ke akun pilihanmu.','depBagi hasil / bunga':'Bagi hasil BPR syariah = pendapatan. Bunga bank konvensional = riba (dipisahkan).'};
function invSave(){const n=id=>$(id)?+$(id).value||0:0,d=$('id').value,a=$('ia').value,ket=$('iket').value.trim();if(!d)return alert('Isi tanggal.');
 const mk=o=>{const t={id:S.next++,d,a,cek:'',kos:'',tu:null,...o};S.tx.push(t);return t};let msg='';
 if(IJ==='saham'){const k=($('ik').value||'').trim().toUpperCase();if(!k)return alert('Isi kode saham.');
  if(JN==='Dividen'){const j=n('ij2');if(!(j>0))return alert('Isi jumlah dividen.');const riba=$('ir').checked;
   const t=mk({t:'M',j,tj:riba?'Pindah Uang':'Pendapatan',sb:riba?'Dana riba':'Gaji',kt:riba?'Dividen bank':'Hasil investasi: dividen saham',ket:ket||`Dividen saham ${k}${riba?' (riba)':''}`});
   S.inv.saham.push({jenis:'Dividen',tgl:d,kode:k,total:j,riba,tx:t.id,app:1});msg=`Dividen ${k} ${rp(j)}`}
  else{const lot=n('il'),h=n('ih'),fee=n('if');if(!(lot>0&&h>0))return alert('Isi jumlah lot dan harga.');const nilai=lot*100*h;
   if(JN==='Beli'){const total=nilai+fee;const t=mk({t:'K',j:Math.round(total),tj:'Tabungan',sb:'Saham',kt:'Disetor',ket:ket||`Beli saham ${k} ${lot} lot @${h.toLocaleString('id-ID')} (fee ${rp(fee)})`});
    S.inv.saham.push({jenis:'Beli',tgl:d,kode:k,lot,harga:h,nilai,fee,total,tx:t.id,app:1});if(!S.price[k])S.price[k]=h;msg=`Beli ${k} ${lot} lot, ${rp(total)}`}
   else{const p=saham().find(x=>x.kode===k);if(!p||p.lot<lot)return alert(`Lot ${k} yang dipegang hanya ${p?p.lot:0}.`);const total=nilai-fee,modal=p.cost/p.blot*lot;
    const t=mk({t:'M',j:Math.round(total),tj:'Tabungan',sb:'Saham',kt:'Dicairkan',ket:ket||`Jual saham ${k} ${lot} lot @${h.toLocaleString('id-ID')} (fee ${rp(fee)})`});
    S.inv.saham.push({jenis:'Jual',tgl:d,kode:k,lot,harga:h,nilai,fee,total,modal,untung:total-modal,tx:t.id,app:1});msg=`Jual ${k} ${lot} lot, untung ${rp(total-modal)}`}}}
 if(IJ==='rd'){let tuj=$('it').value;if(tuj==='__new')tuj=($('itn').value||'').trim();if(!tuj)return alert('Isi nama tujuan.');const prod=($('ip').value||'').trim();if(!prod)return alert('Isi nama produk reksadana.');
  const sb=tuj===KOS_RD?'Reksadana uang kos mama':'Reksadana',cur=rdNilai(tuj);
  if(JN==='Beli'){const j=n('ij2');if(!(j>0))return alert('Isi jumlah dibeli.');const t=mk({t:'K',j,tj:'Tabungan',sb,kt:'Disetor',ket:ket||`Beli reksadana ${prod} — ${tuj}`});
   S.inv.rd.push({jenis:'Beli',tgl:d,tujuan:tuj,produk:prod,modal:j,ket:'Pembelian (dicatat di aplikasi)',tx:t.id,app:1});rdSetNilai(tuj,cur+j);msg=`Beli ${prod} ${rp(j)} untuk ${tuj}`}
  else{const nv=n('inv'),md=n('imd');if(!(nv>0&&md>0))return alert('Isi uang yang dicairkan dan modal yang dijual.');const t=mk({t:'M',j:nv,tj:'Tabungan',sb,kt:'Dicairkan',ket:ket||`Jual reksadana ${prod} — ${tuj}`});
   S.inv.rd.push({jenis:'Jual',tgl:d,tujuan:tuj,produk:prod,modal:md,nilai:nv,untung:nv-md,ket:'Penjualan (dicatat di aplikasi)',tx:t.id,app:1});rdSetNilai(tuj,Math.max(0,cur-nv));msg=`Jual ${prod} ${rp(nv)}, untung ${rp(nv-md)}`}}
 if(IJ==='dep'){if(!S.acc.find(x=>x.n==='Deposito BPR'))S.acc.push({n:'Deposito BPR',o:0,od:today,g:'Investasi',ket:''});const j=n('ij2');if(!(j>0))return alert('Isi jumlahnya.');
  if(JN==='Setor'){const bank=($('ib').value||'').trim();if(!bank)return alert('Isi nama bank.');const ten=n('itn2')||1,riba=$('isy').value==='Konvensional',dd=pd(d);
   const t=mk({t:'T',tu:'Deposito BPR',j,tj:'Pindah Uang',sb:'Pindah akun',kt:'Pindah antar akun sendiri',ket:ket||`Setor deposito ${bank} (${ten} bulan)`});
   S.inv.dep.push({id:'a'+t.id,bpr:bank,aju:d,tempo:ds(new Date(dd.getFullYear(),dd.getMonth()+ten,dd.getDate())),tenor:ten,modal:j,bunga:n('ibg')/100,riba,status:'Aktif',tx:[t.id]});msg=`Deposito ${bank} ${rp(j)}`}
  if(JN==='Cairkan'){const dp=S.inv.dep.find(x=>x.id===$('idp').value);if(!dp)return alert('Pilih depositonya.');
   const t=mk({a:'Deposito BPR',t:'T',tu:a,j,tj:'Pindah Uang',sb:'Pindah akun',kt:'Pindah antar akun sendiri',ket:ket||`Pencairan deposito ${dp.bpr}`});dp.tx.push(t.id);dp.cairTx=t.id;dp.status='Cair';dp.cair=d;msg=`Deposito ${dp.bpr} dicairkan ${rp(j)}`}
  if(JN==='Bagi hasil / bunga'){const dp=S.inv.dep.find(x=>x.id===$('idp').value),bank=dp?dp.bpr:($('ib').value||'').trim();if(!bank)return alert('Isi nama bank.');const riba=dp?dp.riba:$('ir').checked;
   const t=mk({t:'M',j,tj:riba?'Pindah Uang':'Pendapatan',sb:riba?'Dana riba':'Gaji',kt:riba?'Bunga bank':'Hasil investasi: bagi hasil deposito',ket:ket||`${riba?'Bunga':'Bagi hasil'} deposito ${bank}`});if(dp)dp.tx.push(t.id);msg=`${riba?'Bunga':'Bagi hasil'} ${bank} ${rp(j)}`}}
 save();alert('Tersimpan ✓ '+msg);TPL={mode:'inv',ij:IJ,jn:JN};add()}
/* ================= ATUR ================= */
function set(){LK={};WK={};const held=saham().filter(p=>p.lot>0).map(p=>p.kode);
 $('main').innerHTML=`<div class="card"><h3>Harga saham otomatis (Google Sheets)</h3>
  <div class="tiny">Harga diambil dari Google Sheets milikmu (fungsi GOOGLEFINANCE) setiap kali aplikasi dibuka saat online. Yang disimpan hanya 1 harga terakhir per saham, jadi tidak memakan memori. Cara membuat Google Sheets-nya ada di menu Panduan › "Harga saham otomatis".</div>
  <input id="pxu" placeholder="Tempel link CSV dari Google Sheets di sini" value="${esc(S.pxUrl)}" style="margin-top:6px">
  <div class="g2" style="margin-top:6px"><button class="b p" id="pxs">Simpan & perbarui</button><button class="b" id="pxc">Salin daftar kode saham</button></div>
  <div class="tiny" id="pxm" style="margin-top:6px">${esc(pxInfo())}</div>
  <div class="tiny">Kode yang sedang dipegang: ${held.join(', ')}</div></div>
 <div class="card"><h3>Akun (ketuk untuk asal saldonya)</h3>${S.acc.map((a,i)=>`<div class="row" data-acc="${esc(a.n)}"><div class="l"><div class="t1">${esc(a.n)}</div><div class="t2">${esc(a.g)} · awal ${rp(a.o)} (${fdate(a.od)})</div></div><div class="r">${rp(bal(a.n))}</div><span class="chev">›</span></div>`).join('')}
  <div class="fl" style="margin-top:8px"><input id="nn" placeholder="Nama akun baru"><select id="ng">${opts(['Pribadi','Titipan Mama','Titipan Disan','Investasi','Dana Riba'])}</select><input type="number" id="no" placeholder="Saldo awal"><button class="b" id="nadd">Tambah akun</button></div></div>
 <div class="card"><h3>Uang mama sebelum Februari 2024</h3><div class="tiny">Kalau ada uang kos mama yang kamu pegang sebelum Februari 2024, isi di sini supaya status lunas tepat.</div>
  <input type="number" id="mo" value="${S.mamaOpen||0}" style="margin-top:6px"></div>
 <div class="card"><h3>Data</h3><div class="fl">
  <button class="b w2" id="exc">Ekspor untuk Excel (CSV)</button><button class="b" id="bak">Cadangkan (JSON)</button><label class="b" style="text-align:center">Pulihkan<input type="file" id="res" accept=".json" style="display:none"></label>
  <label class="b w2" style="text-align:center">Impor CSV transaksi baru<input type="file" id="imp" accept=".csv" style="display:none"></label>
  <button class="b w2 d" id="rst">Kembalikan ke data awal (hapus semua perubahan)</button></div>
  <div class="tiny" style="margin-top:6px">Data tersimpan di HP ini saja. Cadangkan secara rutin ke Google Drive. ${S.tx.length} transaksi.</div></div>`;
 $('pxs').onclick=()=>{S.pxUrl=$('pxu').value.trim();save();if(S.pxUrl)refreshPx(false,()=>set());else{S.pxAt=null;save();set()}};
 $('pxc').onclick=()=>{const t='Kode\tHarga\n'+held.map((k,i)=>k+'\t=GOOGLEFINANCE("IDX:"&A'+(i+2)+')').join('\n');(navigator.clipboard?navigator.clipboard.writeText(t):Promise.reject()).then(()=>alert('Tersalin. Tempel di sel A1 Google Sheets.'),()=>prompt('Salin teks ini:',t))};
 $('nadd').onclick=()=>{const n=$('nn').value.trim();if(!n||S.acc.find(a=>a.n===n))return;S.acc.push({n,o:+$('no').value||0,od:today,g:$('ng').value,ket:''});save();set()};
 $('mo').onchange=e=>{S.mamaOpen=+e.target.value||0;save()};
 const dl=(txt,name,type)=>{const u=URL.createObjectURL(new Blob([txt],{type})),a=document.createElement('a');a.href=u;a.download=name;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(u),2000)};
 $('exc').onclick=()=>{const rows=[['Tanggal','Akun','Tipe','Akun Tujuan','Jumlah','Tujuan','Sumber','Kategori','Keterangan','Perlu Dicek','Kos / Kamar']];
  S.tx.slice().sort((a,b)=>a.d.localeCompare(b.d)||a.id-b.id).forEach(t=>rows.push([t.d,t.a,{M:'Masuk',K:'Keluar',T:'Pindah'}[t.t],t.tu||'',t.j,t.tj,t.sb,t.kt,t.ket,t.cek,t.kos||'']));dl(Papa.unparse(rows),'dompet-digital-transaksi.csv','text/csv')};
 $('bak').onclick=()=>dl(JSON.stringify(S),'dompet-digital-cadangan-'+today+'.json','application/json');
 $('res').onchange=e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=()=>{try{const x=JSON.parse(r.result);if(!x.tx)throw 0;S=x;save();alert('Dipulihkan ✓');go('home')}catch(_){alert('File tidak valid')}};r.readAsText(f)};
 $('imp').onchange=e=>{const f=e.target.files[0];if(!f)return;Papa.parse(f,{header:true,skipEmptyLines:true,complete:({data})=>{let n=0;for(const r of data){const d=(r.Tanggal||'').trim(),j=+String(r.Jumlah||r.Nominal||'').replace(/[^0-9]/g,'');if(!/^\d{4}-\d{2}-\d{2}$/.test(d)||!(j>0))continue;
  const tp={masuk:'M',keluar:'K',transfer:'T',pindah:'T'}[String(r.Tipe||'').toLowerCase().trim()];if(!tp)continue;
  S.tx.push({id:S.next++,d,a:(r.Akun||'Dompet').trim(),t:tp,j,tj:r.Tujuan||(tp==='M'?'Pendapatan':tp==='K'?'Pengeluaran':'Pindah Uang'),sb:r.Sumber||(tp==='M'?'Gaji':tp==='K'?'Pengeluaran Gaji':'Pindah akun'),kt:r.Kategori||'Lain-lain',ket:r.Keterangan||'',tu:tp==='T'?(r['Akun Tujuan']||'').trim():null,cek:'Diimpor dari CSV',kos:r['Kos / Kamar']||''});n++}
  save();alert(n+' transaksi diimpor');set()}})};
 $('rst').onclick=()=>{if(confirm('Semua perubahan akan hilang dan kembali ke data awal. Lanjut?')){localStorage.removeItem(KEY);load();save();go('home')}}}
/* ---------- harga saham otomatis ---------- */
function parsePx(v){v=String(v||'').replace(/[^\d.,]/g,'');if(!v)return 0;
 if(/^\d{1,3}([.,]\d{3})+$/.test(v))return+v.replace(/[.,]/g,'');
 const m=v.match(/^(.*)[.,](\d{1,2})$/);if(m)return+(m[1].replace(/[.,]/g,'')+'.'+m[2]);return+v.replace(/[.,]/g,'')}
function csvUrl(u){const m=u.match(/docs\.google\.com\/spreadsheets\/d\/([a-zA-Z0-9_-]{20,})/);if(m&&!/\/d\/e\//.test(u)&&!/output=csv|tqx=out:csv/.test(u))return`https://docs.google.com/spreadsheets/d/${m[1]}/gviz/tq?tqx=out:csv`;return u}
let pxBusy=false;
function refreshPx(silent,done){if(!S.pxUrl||pxBusy)return;if(!navigator.onLine){if(!silent)alert('Sedang offline. Harga terakhir tetap dipakai.');return}pxBusy=true;
 fetch(csvUrl(S.pxUrl),{cache:'no-store'}).then(r=>{if(!r.ok)throw new Error('HTTP '+r.status);return r.text()}).then(t=>{const rows=Papa.parseText(t.replace(/^﻿/,''));let n=0;const got=[];
  for(const r of rows){const k=String(r[0]||'').trim().toUpperCase().replace(/^IDX:/,''),v=parsePx(r[1]);if(/^[A-Z0-9-]{3,8}$/.test(k)&&v>0){S.price[k]=v;n++;got.push(k+' '+v.toLocaleString('id-ID'))}}
  if(!n)throw new Error('Tidak ada harga yang terbaca. Pastikan kolom A = kode saham dan kolom B = harga.');
  const d=new Date();S.pxAt=ds(d)+'T'+String(d.getHours()).padStart(2,'0')+':'+String(d.getMinutes()).padStart(2,'0');save();pxBusy=false;
  if(!silent)alert(n+' harga saham diperbarui:\n'+got.join(', '));if(done)done();else if(V==='inv')invV()}).catch(e=>{pxBusy=false;if(!silent)alert('Gagal mengambil harga: '+e.message+'\nPeriksa link Google Sheets-nya (harus sudah "Publikasikan ke web" sebagai CSV, atau dibagikan "Siapa saja yang memiliki link").')})}
function autoPx(){if(!S.pxUrl)return;const q=S.pxAt?S.pxAt.split(/[-T:]/).map(Number):null,last=q?new Date(q[0],q[1]-1,q[2],q[3],q[4]).getTime():0;if(Date.now()-last>15*60*1000)refreshPx(true)}
/* ================= PANDUAN ================= */
const ACC_DESC={'Dompet':'Uang tunai pribadimu.','Uang Jasa':'Uang jasa rujukan pasien yang dipisah dari gaji.','Bank Mandiri':'Rekening gaji.','Bank BRI':'Rekening BRI (BRImo tidak bisa dipakai sejak Agustus 2025).',
 'GoPay Tabungan':'Kantong GoPay untuk memisahkan sisa gaji.','OVO':'Saldo OVO.','Jago - Kantong Utama':'Kantong utama Bank Jago.','Jago - Kantong Stockbit':'Kas RDN Stockbit untuk beli saham & reksadana.',
 'Deposito BPR':'Uang yang sedang didepositokan (setor = pindah ke akun ini, cair = pindah keluar).','Uang Kos Mama Cash':'Uang kos mama dalam bentuk tunai.','Jago - Uang Kos Mama':'Kantong Bank Jago khusus uang kos mama.',
 'Uang Disan':'Uang tunai untuk Disan yang sudah kamu pisahkan.','Kantong Uang Riba':'Menampung bunga bank & dividen riba sampai disalurkan.','Utang ke Mama':'Pencatat uang mama yang kamu pakai sementara.','Usaha Rokok':'Usaha rokok (sudah tutup).','Piutang kk Lisa':'Uang yang dipinjam kk Lisa.'};
const GUIDE=[
 {g:'Pendapatan pribadi',id:'gaji',judul:'Terima gaji',quick:1,t:'M',a:'Bank Mandiri',tj:'Pendapatan',sb:'Gaji',kt:'Gaji bulanan',contoh:'Uang gaji September',langkah:'Pilih akun tempat gaji masuk (biasanya Bank Mandiri).'},
 {g:'Pendapatan pribadi',id:'jasa',judul:'Terima uang jasa',quick:1,t:'M',a:'Uang Jasa',tj:'Pendapatan',sb:'Jasa',kt:'Uang jasa',contoh:'Uang jasa rujuk pasien umum RS …',langkah:'Kalau uang jasanya ditransfer, pilih akun banknya.'},
 {g:'Pendapatan pribadi',id:'thr',judul:'THR / bonus',t:'M',a:'Bank Mandiri',tj:'Pendapatan',sb:'Gaji',kt:'THR / bonus',contoh:'THR lebaran'},
 {g:'Pendapatan pribadi',id:'kasih',judul:'Dikasih uang orang',t:'M',a:'Dompet',tj:'Pendapatan',sb:'Gaji',kt:'Dikasih orang',contoh:'Dikasih uang oleh …'},
 {g:'Pendapatan pribadi',id:'ganti',judul:'Orang mengganti uangmu',t:'M',a:'Dompet',tj:'Pendapatan',sb:'Gaji',kt:'Penggantian',contoh:'Pengganti uang yang dipakai …',langkah:'Kalau itu uang yang kamu pinjamkan, pakai contoh "Piutang kembali".'},
 {g:'Pendapatan pribadi',id:'cb',judul:'Cashback / promo',t:'M',a:'GoPay Tabungan',tj:'Pendapatan',sb:'Gaji',kt:'Cashback & promo',contoh:'Cashback GoPay'},
 {g:'Pendapatan pribadi',id:'tt',judul:'Uang TikTok',t:'M',a:'Bank Mandiri',tj:'Pendapatan',sb:'Gaji',kt:'TikTok',contoh:'Pencairan TikTok'},
 {g:'Pengeluaran pribadi',id:'makan',judul:'Makan & minum',quick:1,t:'K',a:'Dompet',tj:'Pengeluaran',sb:'Pengeluaran Gaji',kt:'Makan & Minum',contoh:'Beli nasi goreng',langkah:'Kalau dibayar pakai uang jasa, ganti akun ke "Uang Jasa" — sumbernya otomatis jadi Pengeluaran Jasa.'},
 {g:'Pengeluaran pribadi',id:'butuh',judul:'Kebutuhan pribadi & rumah',quick:1,t:'K',a:'Dompet',tj:'Pengeluaran',sb:'Pengeluaran Gaji',kt:'Kebutuhan Pribadi & Rumah',contoh:'Belanja kebutuhan bulanan'},
 {g:'Pengeluaran pribadi',id:'masak',judul:'Uang masak / dapur',t:'K',a:'Dompet',tj:'Pengeluaran',sb:'Pengeluaran Gaji',kt:'Uang Masak / Dapur',contoh:'Bayar uang masak ke Disti'},
 {g:'Pengeluaran pribadi',id:'pulsa',judul:'Pulsa & internet',t:'K',a:'GoPay Tabungan',tj:'Pengeluaran',sb:'Pengeluaran Gaji',kt:'Pulsa & Internet',contoh:'Beli paket Smartfren'},
 {g:'Pengeluaran pribadi',id:'admin',judul:'Biaya admin bank',quick:1,t:'K',a:'Bank Mandiri',tj:'Pengeluaran',sb:'Pengeluaran Gaji',kt:'Biaya Admin Transaksi',contoh:'Biaya admin top up GoPay',langkah:'Biaya bulanan rekening pilih kategori "Biaya Administrasi Rekening"; potongan saldo minimum "Biaya Saldo Minimum"; SMS "Biaya SMS Notifikasi".'},
 {g:'Pengeluaran pribadi',id:'sedekah',judul:'Sedekah & sumbangan',t:'K',a:'Dompet',tj:'Pengeluaran',sb:'Pengeluaran Gaji',kt:'Sedekah & Sumbangan',contoh:'Sumbangan …'},
 {g:'Pengeluaran pribadi',id:'jasakeluar',judul:'Belanja pakai uang jasa',t:'K',a:'Uang Jasa',tj:'Pengeluaran',sb:'Pengeluaran Jasa',kt:'Makan & Minum',contoh:'Makan siang pakai uang jasa'},
 {g:'Uang kos & kedai mama',id:'kosin',judul:'Uang kos masuk',quick:1,t:'M',a:'Uang Kos Mama Cash',tj:'Pendapatan',sb:'Uang Kos Mama',kt:'Uang kos anak kos',contoh:'Uang kos cewek kamar no 4 bulan September',langkah:'Wajib pilih Kos / kamar supaya masuk ke laporan per kamar. Kalau ditransfer, pilih akun tempat uangnya masuk.'},
 {g:'Uang kos & kedai mama',id:'lapak',judul:'Sewa lapak pasar',t:'M',a:'Bank Mandiri',tj:'Pendapatan',sb:'Uang Kos Mama',kt:'Sewa lapak pasar',kos:'Sewa lapak pasar',contoh:'Sewa lapak pasar bulan …'},
 {g:'Uang kos & kedai mama',id:'listrik',judul:'Bayar listrik kos',quick:1,t:'K',a:'Jago - Uang Kos Mama',tj:'Pengeluaran',sb:'Pengeluaran Uang Kos',kt:'Listrik kos',contoh:'Bayar listrik kos September',langkah:'Biaya admin bayar listrik dicatat terpisah: Pengeluaran › Pengeluaran Uang Kos › Biaya Admin Transaksi.'},
 {g:'Uang kos & kedai mama',id:'perbaikan',judul:'Kebutuhan & perbaikan kos',t:'K',a:'Uang Kos Mama Cash',tj:'Pengeluaran',sb:'Pengeluaran Uang Kos',kt:'Kebutuhan & perbaikan kosan',contoh:'Beli sapu untuk kos cewek'},
 {g:'Uang kos & kedai mama',id:'gadai',judul:'Cicilan BRI / pegadaian mama',t:'K',a:'Bank Mandiri',tj:'Pengeluaran',sb:'Pengeluaran Uang Kos',kt:'Cicilan BRI & pegadaian mama',contoh:'Bayar pegadaian mama'},
 {g:'Uang kos & kedai mama',id:'kospisah',judul:'Pisahkan uang kos ke Kantong Uang Kos Mama',t:'T',a:'GoPay Tabungan',tu:'Jago - Uang Kos Mama',tj:'Pindah Uang',sb:'Pindah akun',kt:'Pindah antar akun sendiri',contoh:'Mengeluarkan uang kos cewek kamar 4',langkah:'Pakai "Pindah akun": dari akun yang menampung uang kos → Jago - Uang Kos Mama. Cukup satu catatan.'},
 {g:'Uang kos & kedai mama',id:'kedaiin',judul:'Uang kedai masuk',t:'M',a:'Dompet',tj:'Pendapatan',sb:'Uang Kedai',kt:'Penggantian dari kedai',contoh:'Uang air PDAM dari kedai'},
 {g:'Uang kos & kedai mama',id:'kedaiout',judul:'Bayar token listrik kedai',t:'K',a:'Bank Mandiri',tj:'Pengeluaran',sb:'Pengeluaran Uang Kedai',kt:'Token listrik kedai',contoh:'Token listrik kedai'},
 {g:'Uang kos & kedai mama',id:'pinjammama',judul:'Pakai uang mama sementara',t:'M',a:'Dompet',tj:'Pindah Uang',sb:'Pinjam uang mama',kt:'Pinjam dari Mama',contoh:'Pinjam uang di kotak jualan mama',langkah:'Saat mengembalikan: Uang keluar · Pindah Uang › Pinjam uang mama › Bayar Utang ke Mama.'},
 {g:'Uang Disan',id:'disanin',judul:'Terima uang untuk Disan',quick:1,t:'M',a:'Bank Mandiri',tj:'Pendapatan',sb:'Uang Disan',kt:'Uang untuk Disan',contoh:'Tf masuk dari kk Lisa untuk belanja Disan'},
 {g:'Uang Disan',id:'disanout',judul:'Berikan uang ke Disan',quick:1,t:'K',a:'Bank Mandiri',tj:'Pengeluaran',sb:'Pengeluaran Uang Disan',kt:'Belanja / pengeluaran Disan',contoh:'Tarik tunai, kasih uang belanja Disan',langkah:'Pilih akun tempat uangnya diambil (mis. Bank Mandiri kalau tarik tunai, Dompet kalau pakai uang tunai).'},
 {g:'Uang Disan',id:'disanpisah',judul:'Pisahkan uang Disan ke akun Uang Disan',t:'T',a:'Bank Mandiri',tu:'Uang Disan',tj:'Pindah Uang',sb:'Pindah akun',kt:'Pindah antar akun sendiri',contoh:'Tarik tunai untuk uang Disan',langkah:'Dipakai kalau uangnya belum langsung diberikan. Saat diberikan: Uang keluar dari akun Uang Disan · Pengeluaran Uang Disan.'},
 {g:'Riba (bunga & dividen bank)',id:'bunga',judul:'Bunga bank masuk',t:'M',a:'Jago - Kantong Utama',tj:'Pindah Uang',sb:'Dana riba',kt:'Bunga bank',contoh:'Bunga bank Jago'},
 {g:'Riba (bunga & dividen bank)',id:'pajak',judul:'Pajak bunga',t:'K',a:'Jago - Kantong Utama',tj:'Pindah Uang',sb:'Dana riba',kt:'Pajak bunga',contoh:'Pajak bunga bank Jago'},
 {g:'Riba (bunga & dividen bank)',id:'keriba',judul:'Pindahkan bunga ke Kantong Uang Riba',t:'T',a:'Jago - Kantong Utama',tu:'Kantong Uang Riba',tj:'Pindah Uang',sb:'Pindah akun',kt:'Pindah antar akun sendiri',contoh:'Mengeluarkan bunga bank Jago'},
 {g:'Riba (bunga & dividen bank)',id:'salur',judul:'Salurkan uang riba',t:'K',a:'Kantong Uang Riba',tj:'Pindah Uang',sb:'Dana riba',kt:'Disalurkan',contoh:'Disalurkan untuk …'},
 {g:'Pindah uang, utang & piutang',id:'pindah',judul:'Pindah uang antar akun',quick:1,t:'T',a:'Bank Mandiri',tu:'GoPay Tabungan',tj:'Pindah Uang',sb:'Pindah akun',kt:'Pindah antar akun sendiri',contoh:'Top up GoPay tabungan',langkah:'Untuk top up, tarik tunai, transfer ke kantong lain. Biaya admin-nya dicatat terpisah sebagai pengeluaran.'},
 {g:'Pindah uang, utang & piutang',id:'tarik',judul:'Tarik tunai',t:'T',a:'Bank Mandiri',tu:'Dompet',tj:'Pindah Uang',sb:'Pindah akun',kt:'Pindah antar akun sendiri',contoh:'Tarik tunai di ATM Mandiri'},
 {g:'Pindah uang, utang & piutang',id:'piutang',judul:'Meminjamkan uang (piutang)',t:'K',a:'Bank Mandiri',tj:'Pindah Uang',sb:'Utang & piutang',kt:'Piutang Keluar',contoh:'Dipinjam kk Lisa'},
 {g:'Pindah uang, utang & piutang',id:'piutang2',judul:'Piutang dikembalikan',t:'M',a:'Bank Mandiri',tj:'Pindah Uang',sb:'Utang & piutang',kt:'Piutang Kembali',contoh:'kk Lisa mengembalikan pinjaman'},
 {g:'Pindah uang, utang & piutang',id:'utang',judul:'Kamu meminjam uang',t:'M',a:'Dompet',tj:'Pindah Uang',sb:'Utang & piutang',kt:'Utang Diterima',contoh:'Pinjam uang ke …'},
 {g:'Pindah uang, utang & piutang',id:'utang2',judul:'Bayar utang',t:'K',a:'Dompet',tj:'Pindah Uang',sb:'Utang & piutang',kt:'Bayar Utang',contoh:'Bayar utang ke …'},
 {g:'Pindah uang, utang & piutang',id:'titip',judul:'Uang titipan orang lain',t:'M',a:'Bank Mandiri',tj:'Pindah Uang',sb:'Titipan orang lain',kt:'Titipan orang lain',contoh:'Uang jasa bagian bg Yogi',langkah:'Saat diserahkan: Uang keluar dengan kategori yang sama.'},
 {g:'Pindah uang, utang & piutang',id:'jula',judul:'Setor jula-jula',t:'K',a:'Bank Mandiri',tj:'Tabungan',sb:'Jula-jula',kt:'Disetor',contoh:'Bayar jula-jula'},
 {g:'Investasi',id:'isb',judul:'Beli saham / IPO',quick:1,inv:['saham','Beli'],langkah:'Catat › Investasi › Saham › Beli. Isi kode, lot, harga, fee.'},
 {g:'Investasi',id:'isj',judul:'Jual saham',inv:['saham','Jual'],langkah:'Catat › Investasi › Saham › Jual. Untung dihitung otomatis dari modal rata-rata.'},
 {g:'Investasi',id:'isd',judul:'Terima dividen saham',inv:['saham','Dividen'],langkah:'Dividen saham bank konvensional otomatis dicatat sebagai riba.'},
 {g:'Investasi',id:'irb',judul:'Beli reksadana',quick:1,inv:['rd','Beli'],langkah:'Pilih tujuan (Dana Darurat, Dana Kuliah, … atau Reksadana uang kos mama) dan produknya.'},
 {g:'Investasi',id:'irj',judul:'Jual / cairkan reksadana',inv:['rd','Jual'],langkah:'Isi uang yang dicairkan dan modal yang dijual (lihat di Bibit/Stockbit).'},
 {g:'Investasi',id:'ids',judul:'Setor deposito',inv:['dep','Setor'],langkah:'Uang dipindah ke akun Deposito BPR.'},
 {g:'Investasi',id:'idc',judul:'Cairkan deposito',inv:['dep','Cairkan']},
 {g:'Investasi',id:'idb',judul:'Bagi hasil / bunga deposito',inv:['dep','Bagi hasil / bunga']}];
const TPN={M:'Uang masuk',K:'Uang keluar',T:'Pindah akun'};
function guide(){LK={};WK={};const grups=[...new Set(GUIDE.map(x=>x.g))];
 const combos={};for(const t of S.tx){const k=t.tj+'|'+t.sb+'|'+t.kt;const o=combos[k]=combos[k]||{tj:t.tj,sb:t.sb,kt:t.kt,n:0,t:{},a:{}};o.n++;o.t[t.t]=(o.t[t.t]||0)+1;o.a[t.a]=(o.a[t.a]||0)+1}
 const top=o=>Object.entries(o).sort((a,b)=>b[1]-a[1])[0][0];
 const tree={};for(const o of Object.values(combos)){((tree[o.tj]=tree[o.tj]||{})[o.sb]=tree[o.tj][o.sb]||[]).push(o)}
 window._CB=combos;
 $('main').innerHTML=`<div class="card"><h3>Cara mencatat transaksi (langkah umum)</h3><ol class="ol">
  <li>Buka menu <b>Catat</b>. Pilih <b>Transaksi biasa</b> untuk uang masuk/keluar sehari-hari, atau <b>Investasi</b> untuk saham, reksadana, deposito.</li>
  <li>Pilih jenisnya: <b>Uang masuk</b>, <b>Uang keluar</b>, atau <b>Pindah akun</b> (memindahkan uangmu sendiri antar akun).</li>
  <li>Isi <b>Tanggal</b> dan <b>Jumlah</b>.</li>
  <li>Pilih <b>Akun</b>: di mana uangnya masuk/keluar. Untuk pindah akun, isi juga <b>Ke akun</b>.</li>
  <li>Pilih <b>Tujuan → Sumber → Kategori</b>. Tujuan = jenis uangnya, Sumber = uang siapa, Kategori = untuk apa. Kategori bisa dipilih dari daftar atau diketik baru.</li>
  <li>Khusus uang kos masuk, pilih <b>Kos / kamar</b>.</li>
  <li>Tulis <b>Keterangan</b> singkat, lalu <b>Simpan</b>. Transaksi langsung masuk ke Beranda, Laporan, Amanah, dan Riwayat.</li></ol>
  <div class="tiny">Paling mudah: ketuk salah satu contoh di bawah. Formnya terisi otomatis, kamu tinggal isi jumlah & keterangan.</div></div>
 <div class="card"><h3>Memilih Tujuan & Sumber</h3><div class="tw"><table><tr><th>Kalau uangnya…</th><th>Tujuan</th><th>Sumber</th></tr>
  <tr><td>gaji & uang pribadi lain masuk</td><td>Pendapatan</td><td>Gaji</td></tr><tr><td>uang jasa masuk</td><td>Pendapatan</td><td>Jasa</td></tr>
  <tr><td>dipakai dari uang gaji / uang jasa</td><td>Pengeluaran</td><td>Pengeluaran Gaji / Jasa</td></tr>
  <tr><td>uang kos / kedai mama masuk</td><td>Pendapatan</td><td>Uang Kos Mama / Uang Kedai</td></tr><tr><td>uang kos / kedai dipakai</td><td>Pengeluaran</td><td>Pengeluaran Uang Kos / Kedai</td></tr>
  <tr><td>uang untuk Disan diterima / diberikan</td><td>Pendapatan / Pengeluaran</td><td>Uang Disan / Pengeluaran Uang Disan</td></tr>
  <tr><td>ditabung / diinvestasikan</td><td>Tabungan</td><td>Saham, Reksadana, Jula-jula… (pakai Catat › Investasi)</td></tr>
  <tr><td>pindah akun, pinjam-meminjam, bunga/riba</td><td>Pindah Uang</td><td>Pindah akun, Utang & piutang, Pinjam uang mama, Dana riba</td></tr></table></div></div>
 ${grups.map(g=>`<div class="card"><h3>${esc(g)}</h3>${GUIDE.filter(x=>x.g===g).map(x=>`<div class="gi"><div style="display:flex;justify-content:space-between;gap:8px;align-items:flex-start"><div><b>${esc(x.judul)}</b>
   <div class="tiny">${x.inv?'Catat › Investasi':`${TPN[x.t]} · ${esc(x.a)}${x.tu?' → '+esc(x.tu):''} · ${esc(x.tj)} › ${esc(x.sb)} › ${esc(x.kt)}`}</div></div><button class="b sm" data-gd="${x.id}">Isi otomatis ›</button></div>
   ${x.langkah?`<div class="tiny" style="margin-top:3px">${esc(x.langkah)}</div>`:''}${x.contoh?`<div class="tiny">Contoh keterangan: <i>${esc(x.contoh)}</i></div>`:''}</div>`).join('')}</div>`).join('')}
 <div class="card"><h3>Semua akun & kapan dipakai</h3>${S.acc.map(a=>`<div class="row" data-acc="${esc(a.n)}"><div class="l"><div class="t1">${esc(a.n)}</div><div class="t2">${esc(ACC_DESC[a.n]||a.g)}</div></div><div class="r">${rp(bal(a.n))}</div><span class="chev">›</span></div>`).join('')}
  <div class="tiny">Akun baru bisa ditambah di menu Atur.</div></div>
 <div class="card"><h3>Semua kategori (ketuk untuk langsung mencatat)</h3>${TUJ.filter(tj=>tree[tj]).map(tj=>`<h4>${tj}</h4>${Object.entries(tree[tj]).map(([sb,list])=>`<div class="tiny" style="margin-top:6px"><b>${esc(sb)}</b></div><div class="chips">${list.sort((a,b)=>a.kt.localeCompare(b.kt)).map(o=>`<span class="chip" data-cb="${esc(tj+'|'+sb+'|'+o.kt)}">${esc(o.kt)}</span>`).join('')}</div>`).join('')}`).join('')}</div>
 <div class="card"><h3>Harga saham otomatis</h3><ol class="ol">
  <li>Buka <b>Google Sheets</b> (sheets.google.com) dengan akun Google-mu, buat spreadsheet baru, beri nama "Harga Saham".</li>
  <li>Di aplikasi ini buka <b>Atur › Salin daftar kode saham</b>, lalu tempel di sel <b>A1</b> Google Sheets. Kolom A berisi kode, kolom B berisi rumus <i>=GOOGLEFINANCE("IDX:"&A2)</i> yang otomatis menampilkan harga.</li>
  <li>Kalau nanti membeli saham baru, tambahkan kodenya di kolom A dan salin rumus kolom B ke bawah.</li>
  <li>Klik <b>File › Bagikan › Publikasikan ke web</b>. Pilih sheet-nya, format <b>Nilai yang dipisahkan koma (.csv)</b>, klik <b>Publikasikan</b>, lalu salin link-nya.</li>
  <li>Kembali ke aplikasi: <b>Atur › Harga saham otomatis</b>, tempel link-nya, ketuk <b>Simpan & perbarui</b>.</li></ol>
  <div class="tiny">Harga dari Google Finance biasanya tertunda sekitar 20 menit. Aplikasi memperbarui harga saat dibuka dan online (paling sering tiap 15 menit), dan hanya menyimpan 1 harga terakhir per saham. Saat offline, harga terakhir tetap dipakai.</div></div>
 <div class="card"><h3>Menjaga data tetap aman</h3><div class="tiny">Data tersimpan di HP ini. Seminggu sekali buka <b>Atur › Cadangkan (JSON)</b> dan simpan filenya ke Google Drive. Untuk memperbarui Excel, pakai <b>Atur › Ekspor untuk Excel (CSV)</b>.</div></div>`;
 document.querySelectorAll('[data-gd]').forEach(b=>b.onclick=()=>useTpl(b.dataset.gd));
 document.querySelectorAll('[data-cb]').forEach(c=>c.onclick=()=>{const o=combos[c.dataset.cb];EDIT=null;TPL={t:top(o.t),a:top(o.a),tj:o.tj,sb:o.sb,kt:o.kt,judul:o.tj+' › '+o.sb+' › '+o.kt};if(o.tj==='Tabungan'&&['Saham','Reksadana','Reksadana uang kos mama'].includes(o.sb))TPL={mode:'inv',ij:o.sb==='Saham'?'saham':'rd',jn:o.kt==='Disetor'?'Beli':'Jual'};if(o.kt==='Pindah antar akun sendiri')TPL.t='T';if(TPL.t==='T')TPL.tu='';go('add')})}
/* ================= MULAI ================= */
load();save();netS();nav();home();setTimeout(autoPx,800);
