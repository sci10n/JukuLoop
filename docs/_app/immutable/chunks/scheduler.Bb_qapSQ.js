function S(){}const Q=t=>t;function D(t,e){for(const n in e)t[n]=e[n];return t}function P(t){return t()}function V(){return Object.create(null)}function q(t){t.forEach(P)}function X(t){return typeof t=="function"}function Y(t,e){return t!=t?e==e:t!==e||t&&typeof t=="object"||typeof t=="function"}function Z(t){return Object.keys(t).length===0}function B(t,...e){if(t==null){for(const i of e)i(void 0);return S}const n=t.subscribe(...e);return n.unsubscribe?()=>n.unsubscribe():n}function $(t,e,n){t.$$.on_destroy.push(B(e,n))}function tt(t,e,n,i){if(t){const c=E(t,e,n,i);return t[0](c)}}function E(t,e,n,i){return t[1]&&i?D(n.ctx.slice(),t[1](i(e))):n.ctx}function et(t,e,n,i){if(t[2]&&i){const c=t[2](i(n));if(e.dirty===void 0)return c;if(typeof c=="object"){const o=[],r=Math.max(e.dirty.length,c.length);for(let s=0;s<r;s+=1)o[s]=e.dirty[s]|c[s];return o}return e.dirty|c}return e.dirty}function nt(t,e,n,i,c,o){if(c){const r=E(e,n,i,o);t.p(r,c)}}function it(t){if(t.ctx.length>32){const e=[],n=t.ctx.length/32;for(let i=0;i<n;i++)e[i]=-1;return e}return-1}function ct(t){const e=typeof t=="string"&&t.match(/^\s*(-?[\d.]+)([^\s]*)\s*$/);return e?[parseFloat(e[1]),e[2]||"px"]:[t,"px"]}let m=!1;function rt(){m=!0}function lt(){m=!1}function I(t,e,n,i){for(;t<e;){const c=t+(e-t>>1);n(c)<=i?t=c+1:e=c}return t}function M(t){if(t.hydrate_init)return;t.hydrate_init=!0;let e=t.childNodes;if(t.nodeName==="HEAD"){const l=[];for(let u=0;u<e.length;u++){const a=e[u];a.claim_order!==void 0&&l.push(a)}e=l}const n=new Int32Array(e.length+1),i=new Int32Array(e.length);n[0]=-1;let c=0;for(let l=0;l<e.length;l++){const u=e[l].claim_order,a=(c>0&&e[n[c]].claim_order<=u?c+1:I(1,c,C=>e[n[C]].claim_order,u))-1;i[l]=n[a]+1;const k=a+1;n[k]=l,c=Math.max(k,c)}const o=[],r=[];let s=e.length-1;for(let l=n[c]+1;l!=0;l=i[l-1]){for(o.push(e[l-1]);s>=l;s--)r.push(e[s]);s--}for(;s>=0;s--)r.push(e[s]);o.reverse(),r.sort((l,u)=>l.claim_order-u.claim_order);for(let l=0,u=0;l<r.length;l++){for(;u<o.length&&r[l].claim_order>=o[u].claim_order;)u++;const a=u<o.length?o[u]:null;t.insertBefore(r[l],a)}}function O(t,e){t.appendChild(e)}function T(t){if(!t)return document;const e=t.getRootNode?t.getRootNode():t.ownerDocument;return e&&e.host?e:t.ownerDocument}function st(t){const e=N("style");return e.textContent="/* empty */",F(T(t),e),e.sheet}function F(t,e){return O(t.head||t,e),e.sheet}function H(t,e){if(m){for(M(t),(t.actual_end_child===void 0||t.actual_end_child!==null&&t.actual_end_child.parentNode!==t)&&(t.actual_end_child=t.firstChild);t.actual_end_child!==null&&t.actual_end_child.claim_order===void 0;)t.actual_end_child=t.actual_end_child.nextSibling;e!==t.actual_end_child?(e.claim_order!==void 0||e.parentNode!==t)&&t.insertBefore(e,t.actual_end_child):t.actual_end_child=e.nextSibling}else(e.parentNode!==t||e.nextSibling!==null)&&t.appendChild(e)}function ot(t,e,n){m&&!n?H(t,e):(e.parentNode!==t||e.nextSibling!=n)&&t.insertBefore(e,n||null)}function ut(t){t.parentNode&&t.parentNode.removeChild(t)}function at(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function N(t){return document.createElement(t)}function x(t){return document.createTextNode(t)}function ft(){return x(" ")}function _t(){return x("")}function dt(t,e,n,i){return t.addEventListener(e,n,i),()=>t.removeEventListener(e,n,i)}function ht(t,e,n){n==null?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function mt(t){return t.dataset.svelteH}function pt(t){return Array.from(t.childNodes)}function L(t){t.claim_info===void 0&&(t.claim_info={last_index:0,total_claimed:0})}function A(t,e,n,i,c=!1){L(t);const o=(()=>{for(let r=t.claim_info.last_index;r<t.length;r++){const s=t[r];if(e(s)){const l=n(s);return l===void 0?t.splice(r,1):t[r]=l,c||(t.claim_info.last_index=r),s}}for(let r=t.claim_info.last_index-1;r>=0;r--){const s=t[r];if(e(s)){const l=n(s);return l===void 0?t.splice(r,1):t[r]=l,c?l===void 0&&t.claim_info.last_index--:t.claim_info.last_index=r,s}}return i()})();return o.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1,o}function R(t,e,n,i){return A(t,c=>c.nodeName===e,c=>{const o=[];for(let r=0;r<c.attributes.length;r++){const s=c.attributes[r];n[s.name]||o.push(s.name)}o.forEach(r=>c.removeAttribute(r))},()=>i(e))}function yt(t,e,n){return R(t,e,n,N)}function z(t,e){return A(t,n=>n.nodeType===3,n=>{const i=""+e;if(n.data.startsWith(i)){if(n.data.length!==i.length)return n.splitText(i.length)}else n.data=i},()=>x(e),!0)}function bt(t){return z(t," ")}function gt(t,e){e=""+e,t.data!==e&&(t.data=e)}function xt(t,e){t.value=e??""}function vt(t,e,n,i){n==null?t.style.removeProperty(e):t.style.setProperty(e,n,"")}function kt(t,e,n){for(let i=0;i<t.options.length;i+=1){const c=t.options[i];if(c.__value===e){c.selected=!0;return}}(!n||e!==void 0)&&(t.selectedIndex=-1)}function wt(t){const e=t.querySelector(":checked");return e&&e.__value}function U(t,e,{bubbles:n=!1,cancelable:i=!1}={}){return new CustomEvent(t,{detail:e,bubbles:n,cancelable:i})}function Et(t,e){return new t(e)}let h;function p(t){h=t}function v(){if(!h)throw new Error("Function called outside component initialization");return h}function Nt(t){v().$$.on_mount.push(t)}function At(t){v().$$.after_update.push(t)}function jt(){const t=v();return(e,n,{cancelable:i=!1}={})=>{const c=t.$$.callbacks[e];if(c){const o=U(e,n,{cancelable:i});return c.slice().forEach(r=>{r.call(t,o)}),!o.defaultPrevented}return!0}}const d=[],w=[];let _=[];const b=[],j=Promise.resolve();let g=!1;function W(){g||(g=!0,j.then(J))}function Ct(){return W(),j}function G(t){_.push(t)}function St(t){b.push(t)}const y=new Set;let f=0;function J(){if(f!==0)return;const t=h;do{try{for(;f<d.length;){const e=d[f];f++,p(e),K(e.$$)}}catch(e){throw d.length=0,f=0,e}for(p(null),d.length=0,f=0;w.length;)w.pop()();for(let e=0;e<_.length;e+=1){const n=_[e];y.has(n)||(y.add(n),n())}_.length=0}while(d.length);for(;b.length;)b.pop()();g=!1,y.clear(),p(t)}function K(t){if(t.fragment!==null){t.update(),q(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(G)}}function Dt(t){const e=[],n=[];_.forEach(i=>t.indexOf(i)===-1?e.push(i):n.push(i)),n.forEach(i=>i()),_=e}export{T as A,st as B,q as C,X as D,G as E,U as F,Q as G,V as H,J as I,Z as J,Dt as K,h as L,p as M,P as N,d as O,W as P,rt as Q,lt as R,at as S,jt as T,dt as U,mt as V,xt as W,kt as X,wt as Y,ct as Z,St as _,et as a,ft as b,tt as c,yt as d,N as e,pt as f,it as g,z as h,ut as i,bt as j,ot as k,H as l,gt as m,S as n,$ as o,_t as p,At as q,Nt as r,Y as s,x as t,nt as u,ht as v,vt as w,w as x,Et as y,Ct as z};
