function E(){}const V=t=>t;function D(t,n){for(const e in n)t[e]=n[e];return t}function P(t){return t()}function X(){return Object.create(null)}function q(t){t.forEach(P)}function B(t){return typeof t=="function"}function Y(t,n){return t!=t?n==n:t!==n||t&&typeof t=="object"||typeof t=="function"}function Z(t){return Object.keys(t).length===0}function I(t,...n){if(t==null){for(const i of n)i(void 0);return E}const e=t.subscribe(...n);return e.unsubscribe?()=>e.unsubscribe():e}function $(t,n,e){t.$$.on_destroy.push(I(n,e))}function tt(t,n,e,i){if(t){const r=N(t,n,e,i);return t[0](r)}}function N(t,n,e,i){return t[1]&&i?D(e.ctx.slice(),t[1](i(n))):e.ctx}function nt(t,n,e,i){if(t[2]&&i){const r=t[2](i(e));if(n.dirty===void 0)return r;if(typeof r=="object"){const s=[],c=Math.max(n.dirty.length,r.length);for(let o=0;o<c;o+=1)s[o]=n.dirty[o]|r[o];return s}return n.dirty|r}return n.dirty}function et(t,n,e,i,r,s){if(r){const c=N(n,e,i,s);t.p(c,r)}}function it(t){if(t.ctx.length>32){const n=[],e=t.ctx.length/32;for(let i=0;i<e;i++)n[i]=-1;return n}return-1}function rt(t){return t??""}function ct(t){return t&&B(t.destroy)?t.destroy:E}function lt(t){const n=typeof t=="string"&&t.match(/^\s*(-?[\d.]+)([^\s]*)\s*$/);return n?[parseFloat(n[1]),n[2]||"px"]:[t,"px"]}let m=!1;function ot(){m=!0}function st(){m=!1}function M(t,n,e,i){for(;t<n;){const r=t+(n-t>>1);e(r)<=i?t=r+1:n=r}return t}function O(t){if(t.hydrate_init)return;t.hydrate_init=!0;let n=t.childNodes;if(t.nodeName==="HEAD"){const l=[];for(let u=0;u<n.length;u++){const a=n[u];a.claim_order!==void 0&&l.push(a)}n=l}const e=new Int32Array(n.length+1),i=new Int32Array(n.length);e[0]=-1;let r=0;for(let l=0;l<n.length;l++){const u=n[l].claim_order,a=(r>0&&n[e[r]].claim_order<=u?r+1:M(1,r,S=>n[e[S]].claim_order,u))-1;i[l]=e[a]+1;const k=a+1;e[k]=l,r=Math.max(k,r)}const s=[],c=[];let o=n.length-1;for(let l=e[r]+1;l!=0;l=i[l-1]){for(s.push(n[l-1]);o>=l;o--)c.push(n[o]);o--}for(;o>=0;o--)c.push(n[o]);s.reverse(),c.sort((l,u)=>l.claim_order-u.claim_order);for(let l=0,u=0;l<c.length;l++){for(;u<s.length&&c[l].claim_order>=s[u].claim_order;)u++;const a=u<s.length?s[u]:null;t.insertBefore(c[l],a)}}function T(t,n){t.appendChild(n)}function F(t){if(!t)return document;const n=t.getRootNode?t.getRootNode():t.ownerDocument;return n&&n.host?n:t.ownerDocument}function ut(t){const n=A("style");return n.textContent="/* empty */",H(F(t),n),n.sheet}function H(t,n){return T(t.head||t,n),n.sheet}function L(t,n){if(m){for(O(t),(t.actual_end_child===void 0||t.actual_end_child!==null&&t.actual_end_child.parentNode!==t)&&(t.actual_end_child=t.firstChild);t.actual_end_child!==null&&t.actual_end_child.claim_order===void 0;)t.actual_end_child=t.actual_end_child.nextSibling;n!==t.actual_end_child?(n.claim_order!==void 0||n.parentNode!==t)&&t.insertBefore(n,t.actual_end_child):t.actual_end_child=n.nextSibling}else(n.parentNode!==t||n.nextSibling!==null)&&t.appendChild(n)}function at(t,n,e){m&&!e?L(t,n):(n.parentNode!==t||n.nextSibling!=e)&&t.insertBefore(n,e||null)}function ft(t){t.parentNode&&t.parentNode.removeChild(t)}function _t(t,n){for(let e=0;e<t.length;e+=1)t[e]&&t[e].d(n)}function A(t){return document.createElement(t)}function x(t){return document.createTextNode(t)}function dt(){return x(" ")}function ht(){return x("")}function mt(t,n,e,i){return t.addEventListener(n,e,i),()=>t.removeEventListener(n,e,i)}function pt(t,n,e){e==null?t.removeAttribute(n):t.getAttribute(n)!==e&&t.setAttribute(n,e)}function yt(t){return t.dataset.svelteH}function bt(t){return Array.from(t.childNodes)}function R(t){t.claim_info===void 0&&(t.claim_info={last_index:0,total_claimed:0})}function j(t,n,e,i,r=!1){R(t);const s=(()=>{for(let c=t.claim_info.last_index;c<t.length;c++){const o=t[c];if(n(o)){const l=e(o);return l===void 0?t.splice(c,1):t[c]=l,r||(t.claim_info.last_index=c),o}}for(let c=t.claim_info.last_index-1;c>=0;c--){const o=t[c];if(n(o)){const l=e(o);return l===void 0?t.splice(c,1):t[c]=l,r?l===void 0&&t.claim_info.last_index--:t.claim_info.last_index=c,o}}return i()})();return s.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1,s}function z(t,n,e,i){return j(t,r=>r.nodeName===n,r=>{const s=[];for(let c=0;c<r.attributes.length;c++){const o=r.attributes[c];e[o.name]||s.push(o.name)}s.forEach(c=>r.removeAttribute(c))},()=>i(n))}function gt(t,n,e){return z(t,n,e,A)}function U(t,n){return j(t,e=>e.nodeType===3,e=>{const i=""+n;if(e.data.startsWith(i)){if(e.data.length!==i.length)return e.splitText(i.length)}else e.data=i},()=>x(n),!0)}function xt(t){return U(t," ")}function vt(t,n){n=""+n,t.data!==n&&(t.data=n)}function kt(t,n){t.value=n??""}function wt(t,n,e,i){e==null?t.style.removeProperty(n):t.style.setProperty(n,e,"")}function Et(t,n,e){for(let i=0;i<t.options.length;i+=1){const r=t.options[i];if(r.__value===n){r.selected=!0;return}}(!e||n!==void 0)&&(t.selectedIndex=-1)}function Nt(t){const n=t.querySelector(":checked");return n&&n.__value}function W(t,n,{bubbles:e=!1,cancelable:i=!1}={}){return new CustomEvent(t,{detail:n,bubbles:e,cancelable:i})}function At(t,n){return new t(n)}let h;function p(t){h=t}function v(){if(!h)throw new Error("Function called outside component initialization");return h}function jt(t){v().$$.on_mount.push(t)}function Ct(t){v().$$.after_update.push(t)}function St(){const t=v();return(n,e,{cancelable:i=!1}={})=>{const r=t.$$.callbacks[n];if(r){const s=W(n,e,{cancelable:i});return r.slice().forEach(c=>{c.call(t,s)}),!s.defaultPrevented}return!0}}const d=[],w=[];let _=[];const b=[],C=Promise.resolve();let g=!1;function G(){g||(g=!0,C.then(K))}function Dt(){return G(),C}function J(t){_.push(t)}function Pt(t){b.push(t)}const y=new Set;let f=0;function K(){if(f!==0)return;const t=h;do{try{for(;f<d.length;){const n=d[f];f++,p(n),Q(n.$$)}}catch(n){throw d.length=0,f=0,n}for(p(null),d.length=0,f=0;w.length;)w.pop()();for(let n=0;n<_.length;n+=1){const e=_[n];y.has(e)||(y.add(e),e())}_.length=0}while(d.length);for(;b.length;)b.pop()();g=!1,y.clear(),p(t)}function Q(t){if(t.fragment!==null){t.update(),q(t.before_update);const n=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,n),t.after_update.forEach(J)}}function qt(t){const n=[],e=[];_.forEach(i=>t.indexOf(i)===-1?n.push(i):e.push(i)),e.forEach(i=>i()),_=n}export{st as $,lt as A,J as B,St as C,Nt as D,ct as E,yt as F,mt as G,Et as H,_t as I,rt as J,kt as K,F as L,ut as M,q as N,B as O,W as P,V as Q,X as R,K as S,Z as T,qt as U,h as V,p as W,P as X,d as Y,G as Z,ot as _,nt as a,Pt as a0,dt as b,tt as c,gt as d,A as e,bt as f,it as g,U as h,ft as i,xt as j,at as k,L as l,vt as m,E as n,$ as o,ht as p,Ct as q,jt as r,Y as s,x as t,et as u,pt as v,wt as w,w as x,At as y,Dt as z};
