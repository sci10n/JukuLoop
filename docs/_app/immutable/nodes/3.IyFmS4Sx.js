import{s as _e,e as k,t as z,d as p,f as S,h as F,i as v,w as He,k as G,l as c,m as oe,n as ce,v as E,C as Se,b as R,j as $,F as te,K as ee,G as J,N as Me,r as je,x as we,B as at,H as Pe,I as rt,D as it,a0 as De}from"../chunks/scheduler.Bw6tUycq.js";import{S as ve,i as ge,g as fe,a as U,c as he,t as V,b as se,d as le,m as ae,e as re,h as Te}from"../chunks/index.k7AtM7IC.js";import{s as $e,a as Xe,S as ot,f as Ee,N as Be,u as nt,o as ct,C as st,g as Ce,h as ut,d as ze,i as lt,j as dt,k as ft,l as ht,c as _t}from"../chunks/srs.Clr09k6p.js";import{b as vt}from"../chunks/paths.gYmycE6g.js";function gt(l){let e,t=$e(l[0])+"",s;return{c(){e=k("p"),s=z(t),this.h()},l(r){e=p(r,"P",{style:!0});var n=S(e);s=F(n,t),n.forEach(v),this.h()},h(){He(e,"color",Xe(l[0]))},m(r,n){G(r,e,n),c(e,s)},p(r,[n]){n&1&&t!==(t=$e(r[0])+"")&&oe(s,t),n&1&&He(e,"color",Xe(r[0]))},i:ce,o:ce,d(r){r&&v(e)}}}function kt(l,e,t){let{stage:s}=e,{srs:r}=e;return l.$$set=n=>{"stage"in n&&t(0,s=n.stage),"srs"in n&&t(1,r=n.srs)},[s,r]}class pt extends ve{constructor(e){super(),ge(this,e,kt,gt,_e,{stage:0,srs:1})}}function Fe(l,e,t){const s=l.slice();return s[12]=e[t],s}function mt(l){let e,t,s,r,n,a,o,i='<tr><th class="svelte-eaqrys">Translation</th> <th class="svelte-eaqrys">Sentence</th> <th class="svelte-eaqrys">Notes</th> <th class="svelte-eaqrys">Hint</th> <th class="svelte-eaqrys">Stage</th> <th class="svelte-eaqrys">Review</th> <th class="svelte-eaqrys">Actions</th></tr>',d,_,f=[],T=new Map,C,D,b="Add Sentence",I,L,m,g,u,q=Ee(l[3]);const H=h=>h[12].id;for(let h=0;h<q.length;h+=1){let w=Fe(l,q,h),N=H(w);T.set(N,f[h]=Je(N,w))}return L=new Be({props:{view:[{to:"cancel",label:"Cancel",active:!0},{to:"save",label:"Save",active:!0}]}}),L.$on("navigate",l[11]),{c(){e=k("div"),t=k("input"),s=R(),r=k("textarea"),n=R(),a=k("table"),o=k("thead"),o.innerHTML=i,d=R(),_=k("tbody");for(let h=0;h<f.length;h+=1)f[h].c();C=R(),D=k("button"),D.textContent=b,I=R(),se(L.$$.fragment),this.h()},l(h){e=p(h,"DIV",{class:!0});var w=S(e);t=p(w,"INPUT",{placeholder:!0,class:!0}),s=$(w),r=p(w,"TEXTAREA",{placeholder:!0,class:!0}),S(r).forEach(v),w.forEach(v),n=$(h),a=p(h,"TABLE",{class:!0});var N=S(a);o=p(N,"THEAD",{"data-svelte-h":!0}),te(o)!=="svelte-8zpm6h"&&(o.innerHTML=i),d=$(N),_=p(N,"TBODY",{});var O=S(_);for(let y=0;y<f.length;y+=1)f[y].l(O);O.forEach(v),N.forEach(v),C=$(h),D=p(h,"BUTTON",{class:!0,"data-svelte-h":!0}),te(D)!=="svelte-1f1ee0k"&&(D.textContent=b),I=$(h),le(L.$$.fragment,h),this.h()},h(){E(t,"placeholder","Deck Name"),E(t,"class","svelte-eaqrys"),E(r,"placeholder","Deck Description"),E(r,"class","svelte-eaqrys"),E(e,"class","deck-info svelte-eaqrys"),E(a,"class","sentence-table svelte-eaqrys"),E(D,"class","primary add-sentence svelte-eaqrys")},m(h,w){G(h,e,w),c(e,t),ee(t,l[1]),c(e,s),c(e,r),ee(r,l[2]),G(h,n,w),G(h,a,w),c(a,o),c(a,d),c(a,_);for(let N=0;N<f.length;N+=1)f[N]&&f[N].m(_,null);G(h,C,w),G(h,D,w),G(h,I,w),ae(L,h,w),m=!0,g||(u=[J(t,"input",l[8]),J(r,"input",l[9]),J(D,"click",l[6])],g=!0)},p(h,w){w&2&&t.value!==h[1]&&ee(t,h[1]),w&4&&ee(r,h[2]),w&25&&(q=Ee(h[3]),fe(),f=nt(f,w,H,1,h,q,T,_,ct,Je,null,Fe),he())},i(h){if(!m){for(let w=0;w<q.length;w+=1)V(f[w]);V(L.$$.fragment,h),m=!0}},o(h){for(let w=0;w<f.length;w+=1)U(f[w]);U(L.$$.fragment,h),m=!1},d(h){h&&(v(e),v(n),v(a),v(C),v(D),v(I));for(let w=0;w<f.length;w+=1)f[w].d();re(L,h),g=!1,Me(u)}}}function bt(l){let e,t="Deck not found";return{c(){e=k("p"),e.textContent=t},l(s){e=p(s,"P",{"data-svelte-h":!0}),te(e)!=="svelte-vs2gpw"&&(e.textContent=t)},m(s,r){G(s,e,r)},p:ce,i:ce,o:ce,d(s){s&&v(e)}}}function Ke(l){let e,t;return e=new pt({props:{stage:l[12].srs.stage,srs:l[12].srs}}),{c(){se(e.$$.fragment)},l(s){le(e.$$.fragment,s)},m(s,r){ae(e,s,r),t=!0},p(s,r){const n={};r&8&&(n.stage=s[12].srs.stage),r&8&&(n.srs=s[12].srs),e.$set(n)},i(s){t||(V(e.$$.fragment,s),t=!0)},o(s){U(e.$$.fragment,s),t=!1},d(s){re(e,s)}}}function Ge(l){let e=Ce(l[12].srs)+"",t;return{c(){t=z(e)},l(s){t=F(s,e)},m(s,r){G(s,t,r)},p(s,r){r&8&&e!==(e=Ce(s[12].srs)+"")&&oe(t,e)},d(s){s&&v(t)}}}function Je(l,e){let t,s,r=e[12].translation+"",n,a,o,i,d,_,f=e[12].note+"",T,C,D,b=e[12].hint+"",I,L,m,g,u,q,H,h,w="Edit",N,O,y,Y;i=new st({props:{readings:e[12].reading,furigana:e[12].furigana,colors:e[12].optional.map(Ye)}});let j=e[12].srs&&Ke(e),B=e[12].srs&&Ge(e);function ke(){return e[10](e[12])}return{key:l,first:null,c(){t=k("tr"),s=k("td"),n=z(r),a=R(),o=k("td"),se(i.$$.fragment),d=R(),_=k("td"),T=z(f),C=R(),D=k("td"),I=z(b),L=R(),m=k("td"),j&&j.c(),g=R(),u=k("td"),B&&B.c(),q=R(),H=k("td"),h=k("button"),h.textContent=w,N=R(),this.h()},l(P){t=p(P,"TR",{});var M=S(t);s=p(M,"TD",{class:!0});var W=S(s);n=F(W,r),W.forEach(v),a=$(M),o=p(M,"TD",{class:!0});var ne=S(o);le(i.$$.fragment,ne),ne.forEach(v),d=$(M),_=p(M,"TD",{class:!0});var ue=S(_);T=F(ue,f),ue.forEach(v),C=$(M),D=p(M,"TD",{class:!0});var Z=S(D);I=F(Z,b),Z.forEach(v),L=$(M),m=p(M,"TD",{class:!0});var pe=S(m);j&&j.l(pe),pe.forEach(v),g=$(M),u=p(M,"TD",{class:!0});var de=S(u);B&&B.l(de),de.forEach(v),q=$(M),H=p(M,"TD",{class:!0});var x=S(H);h=p(x,"BUTTON",{class:!0,"data-svelte-h":!0}),te(h)!=="svelte-dkigzt"&&(h.textContent=w),x.forEach(v),N=$(M),M.forEach(v),this.h()},h(){E(s,"class","svelte-eaqrys"),E(o,"class","reading svelte-eaqrys"),E(_,"class","svelte-eaqrys"),E(D,"class","svelte-eaqrys"),E(m,"class","srs-container svelte-eaqrys"),E(u,"class","svelte-eaqrys"),E(h,"class","primary svelte-eaqrys"),E(H,"class","svelte-eaqrys"),this.first=t},m(P,M){G(P,t,M),c(t,s),c(s,n),c(t,a),c(t,o),ae(i,o,null),c(t,d),c(t,_),c(_,T),c(t,C),c(t,D),c(D,I),c(t,L),c(t,m),j&&j.m(m,null),c(t,g),c(t,u),B&&B.m(u,null),c(t,q),c(t,H),c(H,h),c(t,N),O=!0,y||(Y=J(h,"click",ke),y=!0)},p(P,M){e=P,(!O||M&8)&&r!==(r=e[12].translation+"")&&oe(n,r);const W={};M&8&&(W.readings=e[12].reading),M&8&&(W.furigana=e[12].furigana),M&8&&(W.colors=e[12].optional.map(Ye)),i.$set(W),(!O||M&8)&&f!==(f=e[12].note+"")&&oe(T,f),(!O||M&8)&&b!==(b=e[12].hint+"")&&oe(I,b),e[12].srs?j?(j.p(e,M),M&8&&V(j,1)):(j=Ke(e),j.c(),V(j,1),j.m(m,null)):j&&(fe(),U(j,1,1,()=>{j=null}),he()),e[12].srs?B?B.p(e,M):(B=Ge(e),B.c(),B.m(u,null)):B&&(B.d(1),B=null)},i(P){O||(V(i.$$.fragment,P),V(j),O=!0)},o(P){U(i.$$.fragment,P),U(j),O=!1},d(P){P&&v(t),re(i),j&&j.d(),B&&B.d(),y=!1,Y()}}}function wt(l){let e,t,s,r;const n=[bt,mt],a=[];function o(i,d){return i[0]?1:0}return t=o(l),s=a[t]=n[t](l),{c(){e=k("div"),s.c(),this.h()},l(i){e=p(i,"DIV",{class:!0});var d=S(e);s.l(d),d.forEach(v),this.h()},h(){E(e,"class","container svelte-eaqrys")},m(i,d){G(i,e,d),a[t].m(e,null),r=!0},p(i,[d]){let _=t;t=o(i),t===_?a[t].p(i,d):(fe(),U(a[_],1,1,()=>{a[_]=null}),he(),s=a[t],s?s.p(i,d):(s=a[t]=n[t](i),s.c()),V(s,1),s.m(e,null))},i(i){r||(V(s),r=!0)},o(i){U(s),r=!1},d(i){i&&v(e),a[t].d()}}}const Ye=l=>l?"blue":"black";function Et(l,e,t){let s;const r=Se();let{deckMetadata:n}=e,{storage:a}=e,o=n.name,i=n.description;function d(){t(0,n.sentenceIds=s.map(b=>b.id),n),t(0,n.name=o,n),t(0,n.description=i,n),a.addOrUpdateDeck(n),r("navigate",{to:"decks"})}function _(){const I={id:Math.random().toString(36).substring(7),furigana:[],hint:"",note:"",optional:[],optionalCluster:[],raw:"",reading:[],srs:{stage:ot.Apprentice1,nextReview:new Date,lastReview:new Date,streak:0,maxStreak:0},translation:""};r("edit",{deck:n,sentence:I})}function f(){o=this.value,t(1,o)}function T(){i=this.value,t(2,i)}const C=b=>r("edit",{deck:n,sentence:b}),D=b=>b.detail.to==="save"?d():r("cancel");return l.$$set=b=>{"deckMetadata"in b&&t(0,n=b.deckMetadata),"storage"in b&&t(7,a=b.storage)},l.$$.update=()=>{l.$$.dirty&129&&t(3,s=n&&a&&a.getSentencesForDeck(n.id))},[n,o,i,s,r,d,_,a,f,T,C,D]}class Dt extends ve{constructor(e){super(),ge(this,e,Et,wt,_e,{deckMetadata:0,storage:7})}}function Qe(l,e,t){const s=l.slice();return s[8]=e[t],s}function We(l,e){let t,s,r=e[8].name+"",n,a,o=e[8].sentenceIds.length+"",i,d,_,f,T=e[8].description+"",C,D,b,I,L="Edit",m,g,u="Delete",q,H,h;function w(){return e[5](e[8])}function N(){return e[6](e[8])}return{key:l,first:null,c(){t=k("div"),s=k("h2"),n=z(r),a=z(" ("),i=z(o),d=z(")"),_=R(),f=k("p"),C=z(T),D=R(),b=k("div"),I=k("button"),I.textContent=L,m=R(),g=k("button"),g.textContent=u,q=R(),this.h()},l(O){t=p(O,"DIV",{class:!0});var y=S(t);s=p(y,"H2",{class:!0});var Y=S(s);n=F(Y,r),a=F(Y," ("),i=F(Y,o),d=F(Y,")"),Y.forEach(v),_=$(y),f=p(y,"P",{});var j=S(f);C=F(j,T),j.forEach(v),D=$(y),b=p(y,"DIV",{class:!0});var B=S(b);I=p(B,"BUTTON",{class:!0,"data-svelte-h":!0}),te(I)!=="svelte-xkyu9k"&&(I.textContent=L),m=$(B),g=p(B,"BUTTON",{class:!0,"data-svelte-h":!0}),te(g)!=="svelte-1v25wbx"&&(g.textContent=u),B.forEach(v),q=$(y),y.forEach(v),this.h()},h(){E(s,"class","svelte-1jx2618"),E(I,"class","edit-button svelte-1jx2618"),E(g,"class","delete-button svelte-1jx2618"),E(b,"class","deck-actions svelte-1jx2618"),E(t,"class","deck-card svelte-1jx2618"),this.first=t},m(O,y){G(O,t,y),c(t,s),c(s,n),c(s,a),c(s,i),c(s,d),c(t,_),c(t,f),c(f,C),c(t,D),c(t,b),c(b,I),c(b,m),c(b,g),c(t,q),H||(h=[J(I,"click",w),J(g,"click",N)],H=!0)},p(O,y){e=O,y&1&&r!==(r=e[8].name+"")&&oe(n,r),y&1&&o!==(o=e[8].sentenceIds.length+"")&&oe(i,o),y&1&&T!==(T=e[8].description+"")&&oe(C,T)},d(O){O&&v(t),H=!1,Me(h)}}}function Tt(l){let e,t,s="Decks",r,n,a=[],o=new Map,i,d,_="Add Deck",f,T,C,D,b,I=Ee(l[0]);const L=m=>m[8].id;for(let m=0;m<I.length;m+=1){let g=Qe(l,I,m),u=L(g);o.set(u,a[m]=We(u,g))}return T=new Be({props:{view:[{to:"review",label:"Review",active:!0},{to:"decks",label:"Edit Decks",active:!1}]}}),T.$on("navigate",l[7]),{c(){e=k("div"),t=k("h1"),t.textContent=s,r=R(),n=k("div");for(let m=0;m<a.length;m+=1)a[m].c();i=R(),d=k("button"),d.textContent=_,f=R(),se(T.$$.fragment),this.h()},l(m){e=p(m,"DIV",{class:!0});var g=S(e);t=p(g,"H1",{"data-svelte-h":!0}),te(t)!=="svelte-1txjx0s"&&(t.textContent=s),r=$(g),n=p(g,"DIV",{class:!0});var u=S(n);for(let q=0;q<a.length;q+=1)a[q].l(u);u.forEach(v),i=$(g),d=p(g,"BUTTON",{class:!0,"data-svelte-h":!0}),te(d)!=="svelte-2g2ez9"&&(d.textContent=_),f=$(g),le(T.$$.fragment,g),g.forEach(v),this.h()},h(){E(n,"class","deck-list svelte-1jx2618"),E(d,"class","add-deck-button svelte-1jx2618"),E(e,"class","decks-view svelte-1jx2618")},m(m,g){G(m,e,g),c(e,t),c(e,r),c(e,n);for(let u=0;u<a.length;u+=1)a[u]&&a[u].m(n,null);c(e,i),c(e,d),c(e,f),ae(T,e,null),C=!0,D||(b=J(d,"click",l[2]),D=!0)},p(m,[g]){g&11&&(I=Ee(m[0]),a=nt(a,g,L,1,m,I,o,n,ut,We,null,Qe))},i(m){C||(V(T.$$.fragment,m),C=!0)},o(m){U(T.$$.fragment,m),C=!1},d(m){m&&v(e);for(let g=0;g<a.length;g+=1)a[g].d();re(T),D=!1,b()}}}function Ct(l,e,t){const s=Se();let{decks:r=[]}=e,{storage:n}=e;function a(){const f=prompt("Enter the name of the deck"),T=prompt("Enter the description of the deck");if(f&&T){const D={id:Math.random().toString(36).substring(7),name:f,description:T,sentenceIds:[]};n.addOrUpdateDeck(D),t(0,r=n.getDecks())}}function o(f){confirm("Are you sure you want to delete this deck?")&&(n.deleteDeck(f),t(0,r=n.getDecks()))}je(()=>{});const i=f=>s("edit",{deck:f}),d=f=>o(f.id),_=f=>s("navigate",{to:f.detail.to});return l.$$set=f=>{"decks"in f&&t(0,r=f.decks),"storage"in f&&t(4,n=f.storage)},[r,s,a,o,n,i,d,_]}class St extends ve{constructor(e){super(),ge(this,e,Ct,Tt,_e,{decks:0,storage:4})}}function qt(l){let e;return{c(){e=k("textarea"),this.h()},l(t){e=p(t,"TEXTAREA",{class:!0}),S(e).forEach(v),this.h()},h(){e.value=l[0],E(e,"class","svelte-lhjhtv")},m(t,s){G(t,e,s),l[2](e)},p(t,[s]){s&1&&(e.value=t[0])},i:ce,o:ce,d(t){t&&v(e),l[2](null)}}}function At(l,e,t){const s=Se();let{value:r}=e,n;je(()=>{ze(n),n.addEventListener("input",o=>{t(0,r=o.target.value)}),t(1,n.value=r,n)});function a(o){we[o?"unshift":"push"](()=>{n=o,t(1,n)})}return l.$$set=o=>{"value"in o&&t(0,r=o.value)},l.$$.update=()=>{l.$$.dirty&2&&n&&(n&&ze(n),n.addEventListener("input",o=>{t(0,r=o.target.value)})),l.$$.dirty&1&&r&&s("input",r)},[r,n,a]}class It extends ve{constructor(e){super(),ge(this,e,At,qt,_e,{value:0})}}function yt(l,e,t){const s=l.slice();return s[17]=e[t],s}function Lt(l){let e,t=$e(l[17])+"",s;return{c(){e=k("option"),s=z(t),this.h()},l(r){e=p(r,"OPTION",{});var n=S(e);s=F(n,t),n.forEach(v),this.h()},h(){e.__value=l[17],ee(e,e.__value)},m(r,n){G(r,e,n),c(e,s)},p:ce,d(r){r&&v(e)}}}function Nt(l){let e,t,s="Edit Sentence",r,n,a,o,i,d,_,f,T,C,D,b,I,L,m,g,u,q,H,h,w,N,O,y,Y,j=Ce(l[0].srs)+"",B,ke,P,M="Reset SRS",W,ne,ue,Z,pe="Delete Sentence",de,x,me,qe,Ve;a=new It({props:{value:l[0].raw}}),a.$on("input",l[8]),i=new st({props:{readings:l[0].reading,furigana:l[0].furigana,colors:l[0].optional.map(Ze)}});let Oe=Ee(lt),ie=[];for(let A=0;A<Oe.length;A+=1)ie[A]=Lt(yt(l,Oe,A));return x=new Be({props:{view:[{to:"cancel",label:"Cancel",active:!0},{to:"save",label:"Save",active:!0}]}}),x.$on("navigate",l[16]),{c(){e=k("div"),t=k("h1"),t.textContent=s,r=R(),n=k("div"),se(a.$$.fragment),o=R(),se(i.$$.fragment),d=R(),_=k("div"),f=k("label"),T=z(`Translation\r
            `),C=k("input"),D=R(),b=k("label"),I=z(`Notes\r
            `),L=k("textarea"),m=R(),g=k("label"),u=z(`Hint\r
            `),q=k("textarea"),H=R(),h=k("label"),w=z(`SRS Stage\r
            `),N=k("select");for(let A=0;A<ie.length;A+=1)ie[A].c();O=R(),y=k("label"),Y=z("Time until Review: "),B=z(j),ke=R(),P=k("button"),P.textContent=M,W=R(),ne=k("label"),ue=z(`Delete\r
            `),Z=k("button"),Z.textContent=pe,de=R(),se(x.$$.fragment),this.h()},l(A){e=p(A,"DIV",{class:!0});var X=S(e);t=p(X,"H1",{"data-svelte-h":!0}),te(t)!=="svelte-x8bscl"&&(t.textContent=s),r=$(X),n=p(X,"DIV",{class:!0});var Q=S(n);le(a.$$.fragment,Q),o=$(Q),le(i.$$.fragment,Q),Q.forEach(v),d=$(X),_=p(X,"DIV",{class:!0});var K=S(_);f=p(K,"LABEL",{class:!0});var Ae=S(f);T=F(Ae,`Translation\r
            `),C=p(Ae,"INPUT",{class:!0}),Ae.forEach(v),D=$(K),b=p(K,"LABEL",{class:!0});var Ie=S(b);I=F(Ie,`Notes\r
            `),L=p(Ie,"TEXTAREA",{class:!0}),S(L).forEach(v),Ie.forEach(v),m=$(K),g=p(K,"LABEL",{class:!0});var ye=S(g);u=F(ye,`Hint\r
            `),q=p(ye,"TEXTAREA",{class:!0}),S(q).forEach(v),ye.forEach(v),H=$(K),h=p(K,"LABEL",{class:!0});var Le=S(h);w=F(Le,`SRS Stage\r
            `),N=p(Le,"SELECT",{class:!0});var Ue=S(N);for(let Re=0;Re<ie.length;Re+=1)ie[Re].l(Ue);Ue.forEach(v),Le.forEach(v),O=$(K),y=p(K,"LABEL",{class:!0});var be=S(y);Y=F(be,"Time until Review: "),B=F(be,j),ke=$(be),P=p(be,"BUTTON",{class:!0,"data-svelte-h":!0}),te(P)!=="svelte-1cluvep"&&(P.textContent=M),be.forEach(v),W=$(K),ne=p(K,"LABEL",{class:!0});var Ne=S(ne);ue=F(Ne,`Delete\r
            `),Z=p(Ne,"BUTTON",{class:!0,"data-svelte-h":!0}),te(Z)!=="svelte-1kuu88f"&&(Z.textContent=pe),Ne.forEach(v),K.forEach(v),de=$(X),le(x.$$.fragment,X),X.forEach(v),this.h()},h(){E(n,"class","sentence-input svelte-6khvqs"),E(C,"class","svelte-6khvqs"),E(f,"class","svelte-6khvqs"),E(L,"class","svelte-6khvqs"),E(b,"class","svelte-6khvqs"),E(q,"class","svelte-6khvqs"),E(g,"class","svelte-6khvqs"),E(N,"class","svelte-6khvqs"),l[0].srs.stage===void 0&&at(()=>l[15].call(N)),E(h,"class","svelte-6khvqs"),E(P,"class","reset-btn svelte-6khvqs"),E(y,"class","svelte-6khvqs"),E(Z,"class","reset-btn svelte-6khvqs"),E(ne,"class","svelte-6khvqs"),E(_,"class","form-grid svelte-6khvqs"),E(e,"class","edit-container svelte-6khvqs")},m(A,X){G(A,e,X),c(e,t),c(e,r),c(e,n),ae(a,n,null),c(n,o),ae(i,n,null),c(e,d),c(e,_),c(_,f),c(f,T),c(f,C),ee(C,l[0].translation),c(_,D),c(_,b),c(b,I),c(b,L),ee(L,l[0].note),c(_,m),c(_,g),c(g,u),c(g,q),ee(q,l[0].hint),c(_,H),c(_,h),c(h,w),c(h,N);for(let Q=0;Q<ie.length;Q+=1)ie[Q]&&ie[Q].m(N,null);Pe(N,l[0].srs.stage,!0),c(_,O),c(_,y),c(y,Y),c(y,B),c(y,ke),c(y,P),c(_,W),c(_,ne),c(ne,ue),c(ne,Z),c(e,de),ae(x,e,null),me=!0,qe||(Ve=[J(C,"input",l[9]),J(C,"input",l[10]),J(L,"input",l[11]),J(L,"input",l[12]),J(q,"input",l[13]),J(q,"input",l[14]),J(N,"change",l[15]),J(P,"click",l[4]),J(Z,"click",l[3])],qe=!0)},p(A,[X]){const Q={};X&1&&(Q.value=A[0].raw),a.$set(Q);const K={};X&1&&(K.readings=A[0].reading),X&1&&(K.furigana=A[0].furigana),X&1&&(K.colors=A[0].optional.map(Ze)),i.$set(K),X&1&&C.value!==A[0].translation&&ee(C,A[0].translation),X&1&&ee(L,A[0].note),X&1&&ee(q,A[0].hint),X&1&&Pe(N,A[0].srs.stage),(!me||X&1)&&j!==(j=Ce(A[0].srs)+"")&&oe(B,j)},i(A){me||(V(a.$$.fragment,A),V(i.$$.fragment,A),V(x.$$.fragment,A),me=!0)},o(A){U(a.$$.fragment,A),U(i.$$.fragment,A),U(x.$$.fragment,A),me=!1},d(A){A&&v(e),re(a),re(i),rt(ie,A),re(x),qe=!1,Me(Ve)}}}const Ze=l=>l?"blue":"black";function Rt(l,e,t){const s=Se();let{deck:r=null}=e,{sentence:n}=e,{storage:a}=e;function o(u,q){if(u==="raw"){const H=q.split("").map(dt).join(""),h=ft(H),{reading:w,furigana:N,optional:O,optionalCluster:y}=ht(h);t(0,n={...n,raw:H,reading:w,furigana:N,optional:O,optionalCluster:y})}else t(0,n={...n,[u]:q})}const i=()=>{confirm("Are you sure you want to delete this sentence?")&&(r&&a.removeSentenceFromDeck(r.id,n.id),a.deleteSentence(n.id),s("cancel"))};function d(){t(0,n.srs={...n.srs,streak:0,maxStreak:0,stage:lt[0],nextReview:new Date},n)}function _(){a.addOrUpdateSentence(n),r&&a.addSentenceToDeck(r.id,n.id),s("edit",{deck:r,sentence:n})}const f=u=>o("raw",u.detail);function T(){n.translation=this.value,t(0,n)}const C=u=>o("translation",u.target.value);function D(){n.note=this.value,t(0,n)}const b=u=>o("note",u.target.value);function I(){n.hint=this.value,t(0,n)}const L=u=>o("hint",u.target.value);function m(){n.srs.stage=it(this),t(0,n)}const g=u=>u.detail.to==="save"?_():s("cancel");return l.$$set=u=>{"deck"in u&&t(6,r=u.deck),"sentence"in u&&t(0,n=u.sentence),"storage"in u&&t(7,a=u.storage)},[n,s,o,i,d,_,r,a,f,T,C,D,b,I,L,m,g]}class $t extends ve{constructor(e){super(),ge(this,e,Rt,Nt,_e,{deck:6,sentence:0,storage:7})}}function xe(l){let e,t,s;function r(a){l[6](a)}let n={storage:l[0]};return l[1]!==void 0&&(n.decks=l[1]),e=new St({props:n}),we.push(()=>Te(e,"decks",r)),e.$on("edit",l[7]),e.$on("navigate",l[8]),{c(){se(e.$$.fragment)},l(a){le(e.$$.fragment,a)},m(a,o){ae(e,a,o),s=!0},p(a,o){const i={};o&1&&(i.storage=a[0]),!t&&o&2&&(t=!0,i.decks=a[1],De(()=>t=!1)),e.$set(i)},i(a){s||(V(e.$$.fragment,a),s=!0)},o(a){U(e.$$.fragment,a),s=!1},d(a){re(e,a)}}}function et(l){let e,t,s;function r(a){l[9](a)}let n={storage:l[0]};return l[2]!==void 0&&(n.deckMetadata=l[2]),e=new Dt({props:n}),we.push(()=>Te(e,"deckMetadata",r)),e.$on("edit",l[10]),e.$on("cancel",l[11]),e.$on("navigate",l[12]),{c(){se(e.$$.fragment)},l(a){le(e.$$.fragment,a)},m(a,o){ae(e,a,o),s=!0},p(a,o){const i={};o&1&&(i.storage=a[0]),!t&&o&4&&(t=!0,i.deckMetadata=a[2],De(()=>t=!1)),e.$set(i)},i(a){s||(V(e.$$.fragment,a),s=!0)},o(a){U(e.$$.fragment,a),s=!1},d(a){re(e,a)}}}function tt(l){let e,t,s,r;function n(i){l[13](i)}function a(i){l[14](i)}let o={storage:l[0]};return l[2]!==void 0&&(o.deck=l[2]),l[3]!==void 0&&(o.sentence=l[3]),e=new $t({props:o}),we.push(()=>Te(e,"deck",n)),we.push(()=>Te(e,"sentence",a)),e.$on("edit",l[15]),e.$on("cancel",l[16]),{c(){se(e.$$.fragment)},l(i){le(e.$$.fragment,i)},m(i,d){ae(e,i,d),r=!0},p(i,d){const _={};d&1&&(_.storage=i[0]),!t&&d&4&&(t=!0,_.deck=i[2],De(()=>t=!1)),!s&&d&8&&(s=!0,_.sentence=i[3],De(()=>s=!1)),e.$set(_)},i(i){r||(V(e.$$.fragment,i),r=!0)},o(i){U(e.$$.fragment,i),r=!1},d(i){re(e,i)}}}function Mt(l){let e,t,s,r,n=l[4]==="decks"&&xe(l),a=l[4]==="edit-deck"&&l[2]&&et(l),o=l[4]==="edit-card"&&l[2]&&l[3]&&tt(l);return{c(){e=k("div"),n&&n.c(),t=R(),a&&a.c(),s=R(),o&&o.c(),this.h()},l(i){e=p(i,"DIV",{class:!0});var d=S(e);n&&n.l(d),t=$(d),a&&a.l(d),s=$(d),o&&o.l(d),d.forEach(v),this.h()},h(){E(e,"class","container svelte-1365wnv")},m(i,d){G(i,e,d),n&&n.m(e,null),c(e,t),a&&a.m(e,null),c(e,s),o&&o.m(e,null),r=!0},p(i,[d]){i[4]==="decks"?n?(n.p(i,d),d&16&&V(n,1)):(n=xe(i),n.c(),V(n,1),n.m(e,t)):n&&(fe(),U(n,1,1,()=>{n=null}),he()),i[4]==="edit-deck"&&i[2]?a?(a.p(i,d),d&20&&V(a,1)):(a=et(i),a.c(),V(a,1),a.m(e,s)):a&&(fe(),U(a,1,1,()=>{a=null}),he()),i[4]==="edit-card"&&i[2]&&i[3]?o?(o.p(i,d),d&28&&V(o,1)):(o=tt(i),o.c(),V(o,1),o.m(e,null)):o&&(fe(),U(o,1,1,()=>{o=null}),he())},i(i){r||(V(n),V(a),V(o),r=!0)},o(i){U(n),U(a),U(o),r=!1},d(i){i&&v(e),n&&n.d(),a&&a.d(),o&&o.d()}}}function jt(l,e,t){let s,r=[],n=null,a=null,o="decks";const i=u=>{t(4,o=u),o==="review"&&(window.location.href=`${vt}/`)};je(()=>{t(0,s=_t()),t(1,r=s.getDecks())});function d(u){r=u,t(1,r)}const _=u=>{t(2,n=u.detail.deck),i("edit-deck")},f=u=>{const q=u.detail.to;i(q)};function T(u){n=u,t(2,n)}const C=u=>{t(3,a=u.detail.sentence),i("edit-card")},D=u=>{t(3,a=null),t(2,n=null),i("decks")},b=u=>{const q=u.detail.to;i(q)};function I(u){n=u,t(2,n)}function L(u){a=u,t(3,a)}return[s,r,n,a,o,i,d,_,f,T,C,D,b,I,L,u=>{t(3,a=null),i("edit-deck")},u=>{t(3,a=null),i("edit-deck")}]}class Ht extends ve{constructor(e){super(),ge(this,e,jt,Mt,_e,{})}}export{Ht as component};
