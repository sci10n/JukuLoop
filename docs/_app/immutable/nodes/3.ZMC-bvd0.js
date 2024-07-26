import{s as ft,n as rt,b as pt,o as _t,r as ht}from"../chunks/scheduler.BvLojk_z.js";import{S as gt,i as mt,e as S,s as U,c as w,m as Q,h as R,d as J,g as T,j as $,k as p,n as F,o as st,p as L,q as P,r as at,b as V,f as W,l as X}from"../chunks/index.B6IjQEsh.js";import{e as Y,t as bt}from"../chunks/index.BS81UHqu.js";import{w as vt}from"../chunks/index.BGTSHx9J.js";function Z(t){const n=/([\u3400-\u9FAF]+)[(（](.+?)[)）]|([^\u3400-\u9FAF]+)/g;let o=[],r=[],e;for(;(e=n.exec(t))!==null;)e[1]&&e[2]?(o.push(e[1]),r.push(e[2])):e[3]&&(o.push(e[3]),r.push(""));return{reading:o,furigana:r}}const St="東京(とうきょう)は日本(にほん)の首都(しゅと)です。",wt="私（わたし）は日本語（にほんご）を話（はな）します";console.log(Z(St));console.log(Z(wt));function lt(t,n,o){const r=t.slice();return r[20]=n[o],r[21]=n,r[22]=o,r}function ot(t,n,o){const r=t.slice();return r[23]=n[o],r[25]=o,r}function Tt(t){let n=t[23]+"",o;return{c(){o=V(n)},l(r){o=W(r,n)},m(r,e){$(r,o,e)},p(r,e){e&1&&n!==(n=r[23]+"")&&X(o,n)},d(r){r&&T(o)}}}function yt(t){let n,o=t[23]+"",r,e,l,_=t[20].furigana[t[25]]+"",y,d;return{c(){n=S("ruby"),r=V(o),e=U(),l=S("rt"),y=V(_),d=U()},l(b){n=w(b,"RUBY",{});var h=J(n);r=W(h,o),e=R(h),l=w(h,"RT",{});var v=J(l);y=W(v,_),v.forEach(T),d=R(h),h.forEach(T)},m(b,h){$(b,n,h),p(n,r),p(n,e),p(n,l),p(l,y),p(n,d)},p(b,h){h&1&&o!==(o=b[23]+"")&&X(r,o),h&1&&_!==(_=b[20].furigana[b[25]]+"")&&X(y,_)},d(b){b&&T(n)}}}function ut(t){let n;function o(l,_){return l[20].furigana[l[25]]?yt:Tt}let r=o(t),e=r(t);return{c(){e.c(),n=at()},l(l){e.l(l),n=at()},m(l,_){e.m(l,_),$(l,n,_)},p(l,_){r===(r=o(l))&&e?e.p(l,_):(e.d(1),e=r(l),e&&(e.c(),e.m(n.parentNode,n)))},d(l){l&&T(n),e.d(l)}}}function it(t){let n,o,r,e,l,_,y,d,b,h,v,D,f,u,E,s,O,q="Delete",M,z,B=Y(t[20].reading),k=[];for(let c=0;c<B.length;c+=1)k[c]=ut(ot(t,B,c));function a(){t[8].call(l,t[21],t[22])}function i(...c){return t[9](t[20],...c)}function N(...c){return t[10](t[20],...c)}function C(){t[11].call(d,t[21],t[22])}function I(...c){return t[12](t[20],...c)}function H(){t[13].call(v,t[21],t[22])}function A(...c){return t[14](t[20],...c)}function j(){t[15].call(u,t[21],t[22])}function ct(...c){return t[16](t[20],...c)}function dt(){return t[17](t[20])}return{c(){n=S("tr"),o=S("td");for(let c=0;c<k.length;c+=1)k[c].c();r=U(),e=S("td"),l=S("input"),_=U(),y=S("td"),d=S("input"),b=U(),h=S("td"),v=S("input"),D=U(),f=S("td"),u=S("input"),E=U(),s=S("td"),O=S("button"),O.textContent=q,this.h()},l(c){n=w(c,"TR",{});var g=J(n);o=w(g,"TD",{});var m=J(o);for(let G=0;G<k.length;G+=1)k[G].l(m);m.forEach(T),r=R(g),e=w(g,"TD",{});var K=J(e);l=w(K,"INPUT",{type:!0}),K.forEach(T),_=R(g),y=w(g,"TD",{});var x=J(y);d=w(x,"INPUT",{type:!0}),x.forEach(T),b=R(g),h=w(g,"TD",{});var tt=J(h);v=w(tt,"INPUT",{type:!0}),tt.forEach(T),D=R(g),f=w(g,"TD",{});var et=J(f);u=w(et,"INPUT",{type:!0}),et.forEach(T),E=R(g),s=w(g,"TD",{});var nt=J(s);O=w(nt,"BUTTON",{"data-svelte-h":!0}),Q(O)!=="svelte-qy7xxg"&&(O.textContent=q),nt.forEach(T),g.forEach(T),this.h()},h(){L(l,"type","text"),L(d,"type","text"),L(v,"type","text"),L(u,"type","text")},m(c,g){$(c,n,g),p(n,o);for(let m=0;m<k.length;m+=1)k[m]&&k[m].m(o,null);p(n,r),p(n,e),p(e,l),P(l,t[20].raw),p(n,_),p(n,y),p(y,d),P(d,t[20].translation),p(n,b),p(n,h),p(h,v),P(v,t[20].note),p(n,D),p(n,f),p(f,u),P(u,t[20].hint),p(n,E),p(n,s),p(s,O),M||(z=[F(l,"input",a),F(l,"input",i),F(l,"blur",N),F(d,"input",C),F(d,"blur",I),F(v,"input",H),F(v,"blur",A),F(u,"input",j),F(u,"blur",ct),F(O,"click",dt)],M=!0)},p(c,g){if(t=c,g&1){B=Y(t[20].reading);let m;for(m=0;m<B.length;m+=1){const K=ot(t,B,m);k[m]?k[m].p(K,g):(k[m]=ut(K),k[m].c(),k[m].m(o,null))}for(;m<k.length;m+=1)k[m].d(1);k.length=B.length}g&1&&l.value!==t[20].raw&&P(l,t[20].raw),g&1&&d.value!==t[20].translation&&P(d,t[20].translation),g&1&&v.value!==t[20].note&&P(v,t[20].note),g&1&&u.value!==t[20].hint&&P(u,t[20].hint)},d(c){c&&T(n),st(k,c),M=!1,ht(z)}}}function kt(t){let n,o="Stored Sentences",r,e,l,_,y,d,b="Add",h,v,D=Y(t[0]),f=[];for(let u=0;u<D.length;u+=1)f[u]=it(lt(t,D,u));return{c(){n=S("h2"),n.textContent=o,r=U(),e=S("table");for(let u=0;u<f.length;u+=1)f[u].c();l=U(),_=S("tr"),y=S("td"),d=S("button"),d.textContent=b},l(u){n=w(u,"H2",{"data-svelte-h":!0}),Q(n)!=="svelte-1j8t86n"&&(n.textContent=o),r=R(u),e=w(u,"TABLE",{});var E=J(e);for(let q=0;q<f.length;q+=1)f[q].l(E);l=R(E),_=w(E,"TR",{});var s=J(_);y=w(s,"TD",{});var O=J(y);d=w(O,"BUTTON",{"data-svelte-h":!0}),Q(d)!=="svelte-mbqzgr"&&(d.textContent=b),O.forEach(T),s.forEach(T),E.forEach(T)},m(u,E){$(u,n,E),$(u,r,E),$(u,e,E);for(let s=0;s<f.length;s+=1)f[s]&&f[s].m(e,null);p(e,l),p(e,_),p(_,y),p(y,d),h||(v=F(d,"click",t[2]),h=!0)},p(u,[E]){if(E&251){D=Y(u[0]);let s;for(s=0;s<D.length;s+=1){const O=lt(u,D,s);f[s]?f[s].p(O,E):(f[s]=it(O),f[s].c(),f[s].m(e,l))}for(;s<f.length;s+=1)f[s].d(1);f.length=D.length}},i:rt,o:rt,d(u){u&&(T(n),T(r),T(e)),st(f,u),h=!1,v()}}}function Et(t,n,o){let r,e=vt([]);pt(t,e,a=>o(0,r=a));const l=a=>bt(a,{IMEMode:!0}),_=a=>a.replace(/[\s.,\/#!$%\^&\*;:{}=\-_`~\u3000-\u303f]/g,""),y=()=>{e.update(a=>{const i={raw:"",reading:[],furigana:[],translation:""},N=[...a,i];return localStorage.setItem("sentences",JSON.stringify(N)),N})};function d(a,i){const N=_(i),C=Z(N);e.update(I=>{const H=I.map(A=>A.raw===a?(console.log(C),{...A,raw:N,reading:C.reading,furigana:C.furigana}):A);return localStorage.setItem("sentences",JSON.stringify(H)),H})}const b=(a,i)=>{e.update(N=>{const C=N.map(I=>I.raw===a?{...I,translation:i}:I);return localStorage.setItem("sentences",JSON.stringify(C)),C})},h=(a,i)=>{e.update(N=>{const C=N.map(I=>I.raw===a?{...I,note:i}:I);return localStorage.setItem("sentences",JSON.stringify(C)),C})},v=(a,i)=>{e.update(N=>{const C=N.map(I=>I.raw===a?{...I,updateHint:i}:I);return localStorage.setItem("sentences",JSON.stringify(C)),C})},D=(a,i)=>{const N=a.target.selectionStart,C=a.target.selectionEnd,I=l(a.target.value);e.update(H=>{const A=H.map(j=>j.raw===i?{...j,raw:I}:j);return localStorage.setItem("sentences",JSON.stringify(A)),A}),a.target.focus(),requestAnimationFrame(()=>{a.target.setSelectionRange(N,C)})};_t(()=>{const a=localStorage.getItem("sentences");a&&e.set(JSON.parse(a))});function f(a,i){a[i].raw=this.value,e.set(r)}const u=(a,i)=>D(i,a.raw),E=(a,i)=>d(a.raw,i.target.value);function s(a,i){a[i].translation=this.value,e.set(r)}const O=(a,i)=>b(a.raw,i.target.value);function q(a,i){a[i].note=this.value,e.set(r)}const M=(a,i)=>h(a.raw,i.target.value);function z(a,i){a[i].hint=this.value,e.set(r)}return[r,e,y,d,b,h,v,D,f,u,E,s,O,q,M,z,(a,i)=>v(a.raw,i.target.value),a=>{e.update(i=>i.filter(N=>N.raw!==a.raw)),localStorage.setItem("sentences",JSON.stringify(r))}]}class Dt extends gt{constructor(n){super(),mt(this,n,Et,kt,ft,{})}}export{Dt as component};
