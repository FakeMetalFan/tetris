(this.webpackJsonptetris=this.webpackJsonptetris||[]).push([[0],{184:function(e,t,n){},185:function(e,t,n){},186:function(e,t,n){},187:function(e,t,n){"use strict";n.r(t);var r,o=n(0),c=n.n(o),i=n(68),a=(n(78),function(e){var t=e.state,n=e.width;return c.a.createElement("div",{className:"display",style:{gridTemplateColumns:"repeat(".concat(n,", 1fr)")}},t.map((function(e,t){return e.map((function(e,r){return c.a.createElement($,{key:r*n+t,state:e})}))})))}),s=n(28),u=(n(84),function(){return c.a.createElement("footer",null,c.a.createElement("span",null,"Powered by",c.a.createElement("a",{className:"icon",href:"https://github.com/FakeMetalFan",target:"_blank",rel:"noopener noreferrer"},c.a.createElement(s.a,{icon:["fab","github"]})),"\xa9",c.a.createElement("span",null,(new Date).getFullYear())))}),f=(n(85),function(){return c.a.createElement("header",null,c.a.createElement("span",{className:"title"},"Tetris"),c.a.createElement("a",{className:"icon",href:"https://github.com/FakeMetalFan/tetris",target:"_blank",rel:"noopener noreferrer"},c.a.createElement(s.a,{icon:["fab","github"]})))}),l=n(6),w=function(e){for(var t=Object(o.useRef)(!1),n=arguments.length,r=new Array(n>1?n-1:0),c=1;c<n;c++)r[c-1]=arguments[c];Object(o.useEffect)((function(){t.current?e():t.current=!0}),r)},d=n(5),h=n(69),b=n.n(h),p=n(17),m=n(16),O=n(2),j=n(10),v=n(188),y=37,E=38,g=39,k=40,A=1,x=2,D=3,R=4,C=function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;Object(O.a)(this,e),this[d.b]=!0,this.rowAddress=t,this.colAddress=n},M={Left:new C(0,-1),Right:new C(0,1),Down:new C(1)},S=0,_=1,N=2,F=3,P=4,I=5,z=6,J=7,K=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:S;Object(O.a)(this,e),this[d.b]=!0,this.fill=t}return Object(j.a)(e,[{key:"isEmpty",get:function(){return this.fill===S}}]),e}(),L=n(15),T=n(70),U=n.n(T),B=function(e,t,n){var r=n.value;return n.value=function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return U()(r.apply(this,t))},n},Y=(r=function(){function e(t){Object(O.a)(this,e),this.id=Object(v.a)(),this.position=new C,this.matrix=t}return Object(j.a)(e,[{key:"clone",value:function(){return this.id=Object(v.a)(),this}},{key:"setColAddress",value:function(e){return this.position.colAddress=e,this}},{key:"move",value:function(e){var t=e.rowAddress,n=void 0===t?0:t,r=e.colAddress,o=void 0===r?0:r;return this.position=Object(d.a)(this.position,(function(e){e.rowAddress+=n,e.colAddress+=o})),this}},{key:"rotate",value:function(){var e=this;return this.matrix=Object(d.a)(this.matrix,(function(t){t.forEach((function(n,r){t[r]=e.matrix.map((function(e){return e[r]}))})),t.map((function(e){return e.reverse()}))})),this}},{key:"width",get:function(){return this.matrix.length}},{key:"rowAddress",get:function(){return this.position.rowAddress}},{key:"colAddress",get:function(){return this.position.colAddress}}]),e}(),Object(L.a)(r.prototype,"clone",[B],Object.getOwnPropertyDescriptor(r.prototype,"clone"),r.prototype),Object(L.a)(r.prototype,"setColAddress",[B],Object.getOwnPropertyDescriptor(r.prototype,"setColAddress"),r.prototype),Object(L.a)(r.prototype,"move",[B],Object.getOwnPropertyDescriptor(r.prototype,"move"),r.prototype),Object(L.a)(r.prototype,"rotate",[B],Object.getOwnPropertyDescriptor(r.prototype,"rotate"),r.prototype),r),q=[new Y([[new K,new K(_),new K,new K],[new K,new K(_),new K,new K],[new K,new K(_),new K,new K],[new K,new K(_),new K,new K]]),new Y([[new K,new K(N),new K],[new K,new K(N),new K],[new K(N),new K(N),new K]]),new Y([[new K,new K(F),new K],[new K,new K(F),new K],[new K,new K(F),new K(F)]]),new Y([[new K(P),new K(P)],[new K(P),new K(P)]]),new Y([[new K,new K(I),new K(I)],[new K(I),new K(I),new K],[new K,new K,new K]]),new Y([[new K,new K(z),new K],[new K(z),new K(z),new K(z)],[new K,new K,new K]]),new Y([[new K(J),new K(J),new K],[new K,new K(J),new K(J)],[new K,new K,new K]])],G=function(){function e(t){Object(O.a)(this,e),this._id=Object(v.a)(),this._code=t}return Object(j.a)(e,[{key:"isRotation",get:function(){return this._code===x}},{key:"isDown",get:function(){return this._code===R}}]),e}(),H=function(e){Object(p.a)(n,e);var t=Object(m.a)(n);function n(){var e;return Object(O.a)(this,n),(e=t.call(this,A)).offset=M.Left,e}return n}(G),Q=function(e){Object(p.a)(n,e);var t=Object(m.a)(n);function n(){return Object(O.a)(this,n),t.call(this,x)}return n}(G),V=function(e){Object(p.a)(n,e);var t=Object(m.a)(n);function n(){var e;return Object(O.a)(this,n),(e=t.call(this,D)).offset=M.Right,e}return n}(G),W=function(e){Object(p.a)(n,e);var t=Object(m.a)(n);function n(){var e;return Object(O.a)(this,n),(e=t.call(this,R)).offset=M.Down,e}return n}(G),X=function(e){var t=e.width,n=function(){var e=q[Math.random()*q.length|0].clone();return e.setColAddress((t-e.width)/2|0)},r=Object(o.useState)((function(){return n()})),c=Object(l.a)(r,2),i=c[0],a=c[1];return{tetromino:i,randomize:function(){a(n())},makeMove:function(e){a(e.isRotation?i.rotate():i.move(e.offset))}}},Z=(n(184),function(){var e=Object(o.useState)(800),t=Object(l.a)(e,2),n=t[0],r=t[1],i=Object(o.useState)(0),s=Object(l.a)(i,2),u=s[0],f=s[1],h=Object(o.useState)(null),p=Object(l.a)(h,2),m=p[0],O=p[1],j=function(e){var t=e.width,n=e.height,r=e.move,c=Object(o.useMemo)((function(){return Array(t).fill(new K)}),[t]),i=Object(o.useMemo)((function(){return Array(n).fill(c)}),[c,n]),a=Object(o.useState)(i),s=Object(l.a)(a,2),u=s[0],f=s[1],h=Object(o.useState)(u),p=Object(l.a)(h,2),m=p[0],O=p[1],j=Object(o.useState)(0),v=Object(l.a)(j,2),y=v[0],E=v[1],g=X({width:t}),k=g.tetromino,A=g.randomize,x=g.makeMove,D=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},r=e.matrix,o=void 0===r?k.matrix:r,c=e.offset,i=void 0===c?new C:c;return o.some((function(e,r){return e.some((function(e,o){var c,a,s=e.isEmpty,u=r+k.rowAddress+i.rowAddress,f=o+k.colAddress+i.colAddress;return!s&&(!(null===(c=m[u])||void 0===c||null===(a=c[f])||void 0===a?void 0:a.isEmpty)||u>=n||f>=t||f<0)}))}))};return Object(o.useEffect)((function(){f(Object(d.a)(m,(function(e){k.matrix.forEach((function(t,n){t.forEach((function(t,r){!t.isEmpty&&(e[n+k.rowAddress][r+k.colAddress]=t)}))}))})))}),[k.matrix,k.position]),w((function(){if(D(r.isRotation?k.clone().rotate():r)){if(!r.isDown)return;var e=u.reduce((function(e,t,n){return!b()(t,"isEmpty")&&e.push(n),e}),[]);e.length?(O(Object(d.a)(u,(function(t){e.forEach((function(e){t.splice(e,1),t.unshift(c)}))}))),E((function(t){return t+e.length}))):O(u)}else x(r)}),r),w((function(){A()}),m),w((function(){D()&&(f(i),O(i),E(0))}),k.id),{display:u,sweptRowsCount:y}}({width:10,move:m,height:20}),v=j.display,A=j.sweptRowsCount,x=Object(o.useRef)(),D=function(){O(new W)};return Object(o.useEffect)((function(){x.current.focus()}),[]),w((function(){f((function(e){return A?e+10*A:0}))}),A),function(e,t){var n=Object(o.useRef)();Object(o.useEffect)((function(){n.current=e}),[e]),Object(o.useEffect)((function(){if(t){var e=setInterval((function(){n.current()}),t);return function(){clearInterval(e)}}}),[t])}((function(){D()}),n),c.a.createElement("div",{className:"tetris",tabIndex:"0",onKeyDown:function(e){var t=e.keyCode;t===y&&O(new H),t===E&&O(new Q),t===g&&O(new V),t===k&&(r(null),D())},onKeyUp:function(e){e.keyCode===k&&r(800)},ref:x},c.a.createElement("div",{className:"score"},u),c.a.createElement(a,{state:v,width:10}))}),$=(n(185),Object(o.memo)((function(e){var t=e.state.fill,n="tile tile__";switch(t){case S:n+="none";break;case _:n+="i";break;case N:n+="j";break;case F:n+="l";break;case P:n+="o";break;case I:n+="s";break;case z:n+="t";break;case J:n+="z";break;default:throw new Error('Unexpected tile fill of "'.concat(t,'"!'))}return c.a.createElement("div",{className:n})}))),ee=function(){return c.a.createElement(c.a.Fragment,null,c.a.createElement(f,null),c.a.createElement(Z,null),c.a.createElement(u,null))},te=n(14),ne=n(71);n(186);te.b.add(ne.a),Object(i.render)(c.a.createElement(o.StrictMode,null,c.a.createElement(ee,null)),document.getElementById("root"))},73:function(e,t,n){e.exports=n(187)},78:function(e,t,n){},84:function(e,t,n){},85:function(e,t,n){}},[[73,1,2]]]);
//# sourceMappingURL=main.5ccf38cf.chunk.js.map