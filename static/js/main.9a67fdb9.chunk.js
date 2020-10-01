(this.webpackJsonptetris=this.webpackJsonptetris||[]).push([[0],{184:function(e,t,n){},185:function(e,t,n){},186:function(e,t,n){},187:function(e,t,n){"use strict";n.r(t);var r,o=n(0),c=n.n(o),i=n(68),a=(n(78),function(e){var t=e.state,n=e.columnsCount;return c.a.createElement("div",{className:"display",style:{gridTemplateColumns:"repeat(".concat(n,", 1fr)")}},t.map((function(e,t){return e.map((function(e,r){return c.a.createElement(ee,{key:r*n+t,state:e})}))})))}),u=n(28),s=(n(84),function(){return c.a.createElement("footer",null,c.a.createElement("span",null,"Powered by",c.a.createElement("a",{className:"icon",href:"https://github.com/FakeMetalFan",target:"_blank",rel:"noopener noreferrer"},c.a.createElement(u.a,{icon:["fab","github"]})),"\xa9",c.a.createElement("span",null,(new Date).getFullYear())))}),l=(n(85),function(){return c.a.createElement("header",null,c.a.createElement("span",{className:"title"},"Tetris"),c.a.createElement("a",{className:"icon",href:"https://github.com/FakeMetalFan/tetris",target:"_blank",rel:"noopener noreferrer"},c.a.createElement(u.a,{icon:["fab","github"]})))}),f=n(6),w=function(e){for(var t=Object(o.useRef)(!1),n=arguments.length,r=new Array(n>1?n-1:0),c=1;c<n;c++)r[c-1]=arguments[c];Object(o.useEffect)((function(){t.current?e():t.current=!0}),r)},d=n(5),h=n(69),b=n.n(h),m=n(17),p=n(16),O=n(2),j=n(10),v=n(188),y=37,g=38,E=39,A=40,k=1,C=2,x=3,D=4,R=function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;Object(O.a)(this,e),this[d.b]=!0,this.rowAddress=t,this.colAddress=n},M={Left:new R(0,-1),Right:new R(0,1),Down:new R(1)},S=0,_=1,N=2,F=3,P=4,I=5,z=6,J=7,K=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:S;Object(O.a)(this,e),this[d.b]=!0,this.fill=t}return Object(j.a)(e,[{key:"isEmpty",get:function(){return this.fill===S}}]),e}(),L=n(15),T=n(70),U=n.n(T),B=function(e,t,n){var r=n.value;return n.value=function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return U()(r.apply(this,t))},n},Y=(r=function(){function e(t){Object(O.a)(this,e),this.id=Object(v.a)(),this.position=new R,this.matrix=t}return Object(j.a)(e,[{key:"getCloned",value:function(){return this.id=Object(v.a)(),this}},{key:"setColAddress",value:function(e){return this.position.colAddress=e,this}},{key:"move",value:function(e){var t=e.rowAddress,n=void 0===t?0:t,r=e.colAddress,o=void 0===r?0:r;return this.position=Object(d.a)(this.position,(function(e){e.rowAddress+=n,e.colAddress+=o})),this}},{key:"rotate",value:function(){var e=this;return this.matrix=Object(d.a)(this.matrix,(function(t){t.forEach((function(n,r){t[r]=e.matrix.map((function(e){return e[r]}))})),t.map((function(e){return e.reverse()}))})),this}},{key:"width",get:function(){return this.matrix.length}},{key:"rowAddress",get:function(){return this.position.rowAddress}},{key:"colAddress",get:function(){return this.position.colAddress}}]),e}(),Object(L.a)(r.prototype,"getCloned",[B],Object.getOwnPropertyDescriptor(r.prototype,"getCloned"),r.prototype),Object(L.a)(r.prototype,"setColAddress",[B],Object.getOwnPropertyDescriptor(r.prototype,"setColAddress"),r.prototype),Object(L.a)(r.prototype,"move",[B],Object.getOwnPropertyDescriptor(r.prototype,"move"),r.prototype),Object(L.a)(r.prototype,"rotate",[B],Object.getOwnPropertyDescriptor(r.prototype,"rotate"),r.prototype),r),q=[new Y([[new K,new K(_),new K,new K],[new K,new K(_),new K,new K],[new K,new K(_),new K,new K],[new K,new K(_),new K,new K]]),new Y([[new K,new K(N),new K],[new K,new K(N),new K],[new K(N),new K(N),new K]]),new Y([[new K,new K(F),new K],[new K,new K(F),new K],[new K,new K(F),new K(F)]]),new Y([[new K(P),new K(P)],[new K(P),new K(P)]]),new Y([[new K,new K(I),new K(I)],[new K(I),new K(I),new K],[new K,new K,new K]]),new Y([[new K,new K(z),new K],[new K(z),new K(z),new K(z)],[new K,new K,new K]]),new Y([[new K(J),new K(J),new K],[new K,new K(J),new K(J)],[new K,new K,new K]])],G=function(){function e(t){Object(O.a)(this,e),this._id=Object(v.a)(),this._code=t}return Object(j.a)(e,[{key:"isRotation",get:function(){return this._code===C}},{key:"isDown",get:function(){return this._code===D}}]),e}(),H=function(e){Object(m.a)(n,e);var t=Object(p.a)(n);function n(){var e;return Object(O.a)(this,n),(e=t.call(this,k)).offset=M.Left,e}return n}(G),Q=function(e){Object(m.a)(n,e);var t=Object(p.a)(n);function n(){return Object(O.a)(this,n),t.call(this,C)}return n}(G),V=function(e){Object(m.a)(n,e);var t=Object(p.a)(n);function n(){var e;return Object(O.a)(this,n),(e=t.call(this,x)).offset=M.Right,e}return n}(G),W=function(e){Object(m.a)(n,e);var t=Object(p.a)(n);function n(){var e;return Object(O.a)(this,n),(e=t.call(this,D)).offset=M.Down,e}return n}(G),X=function(e){var t=e.width,n=function(){var e=q[Math.random()*q.length|0].getCloned();return e.setColAddress((t-e.width)/2|0)},r=Object(o.useState)((function(){return n()})),c=Object(f.a)(r,2),i=c[0],a=c[1];return{tetromino:i,randomize:function(){a(n())},makeMove:function(e){a(e.isRotation?i.rotate():i.move(e.offset))}}},Z=(n(184),function(){var e=Object(o.useState)(800),t=Object(f.a)(e,2),n=t[0],r=t[1],i=Object(o.useState)(0),u=Object(f.a)(i,2),s=u[0],l=u[1],h=Object(o.useState)(null),m=Object(f.a)(h,2),p=m[0],O=m[1],j=function(e){var t=e.width,n=e.height,r=e.move,c=Object(o.useMemo)((function(){return Array(t).fill(new K)}),[t]),i=Object(o.useMemo)((function(){return Array(n).fill(c)}),[c,n]),a=Object(o.useState)(i),u=Object(f.a)(a,2),s=u[0],l=u[1],h=Object(o.useState)(s),m=Object(f.a)(h,2),p=m[0],O=m[1],j=Object(o.useState)(0),v=Object(f.a)(j,2),y=v[0],g=v[1],E=X({width:t}),A=E.tetromino,k=E.randomize,C=E.makeMove,x=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},r=e.matrix,o=void 0===r?A.matrix:r,c=e.offset,i=void 0===c?new R:c;return o.some((function(e,r){return e.some((function(e,o){var c,a,u=e.isEmpty,s=r+A.rowAddress+i.rowAddress,l=o+A.colAddress+i.colAddress;return!u&&(!(null===(c=p[s])||void 0===c||null===(a=c[l])||void 0===a?void 0:a.isEmpty)||s>=n||l>=t||l<0)}))}))};return Object(o.useEffect)((function(){l(Object(d.a)(p,(function(e){A.matrix.forEach((function(t,n){t.forEach((function(t,r){!t.isEmpty&&(e[n+A.rowAddress][r+A.colAddress]=t)}))}))})))}),[A.matrix,A.position]),w((function(){if(x(r.isRotation?A.getCloned().rotate():r)){if(!r.isDown)return;var e=s.reduce((function(e,t,n){return!b()(t,"isEmpty")&&e.push(n),e}),[]);e.length?(O(Object(d.a)(s,(function(t){e.forEach((function(e){t.splice(e,1),t.unshift(c)}))}))),g((function(t){return t+e.length}))):O(s)}else C(r)}),r),w((function(){k()}),p),w((function(){x()&&(l(i),O(i),g(0))}),A.id),{display:s,sweptRowsCount:y}}({width:10,move:p,height:20}),v=j.display,k=j.sweptRowsCount,C=Object(o.useRef)(),x=function(){O(new W)};return Object(o.useEffect)((function(){C.current.focus()}),[]),w((function(){l((function(e){return k?e+10*k:0}))}),k),function(e,t){var n=Object(o.useRef)();Object(o.useEffect)((function(){n.current=e}),[e]),Object(o.useEffect)((function(){if(t){var e=setInterval((function(){n.current()}),t);return function(){clearInterval(e)}}}),[t])}((function(){x()}),n),c.a.createElement("div",{className:"tetris",tabIndex:"0",onKeyDown:function(e){var t=e.keyCode;t===y&&O(new H),t===g&&O(new Q),t===E&&O(new V),t===A&&(r(null),x())},onKeyUp:function(e){e.keyCode===A&&r(800)},ref:C},c.a.createElement("div",{className:"score"},s),c.a.createElement(a,{state:v,columnsCount:10}))}),$=function(e){var t="tile tile__";switch(e){case S:return"".concat(t,"none");case _:return"".concat(t,"i");case N:return"".concat(t,"j");case F:return"".concat(t,"l");case P:return"".concat(t,"o");case I:return"".concat(t,"s");case z:return"".concat(t,"t");case J:return"".concat(t,"z");default:throw new Error('Unexpected tile fill of "'.concat(e,'"!'))}},ee=(n(185),Object(o.memo)((function(e){var t=e.state;return c.a.createElement("div",{className:$(t.fill)})}))),te=function(){return c.a.createElement(c.a.Fragment,null,c.a.createElement(l,null),c.a.createElement(Z,null),c.a.createElement(s,null))},ne=n(14),re=n(71);n(186);ne.b.add(re.a),Object(i.render)(c.a.createElement(o.StrictMode,null,c.a.createElement(te,null)),document.getElementById("root"))},73:function(e,t,n){e.exports=n(187)},78:function(e,t,n){},84:function(e,t,n){},85:function(e,t,n){}},[[73,1,2]]]);
//# sourceMappingURL=main.9a67fdb9.chunk.js.map