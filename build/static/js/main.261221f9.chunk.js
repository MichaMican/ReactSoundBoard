(window.webpackJsonpreactsoundboard=window.webpackJsonpreactsoundboard||[]).push([[0],{14:function(t,e,n){t.exports=n(23)},19:function(t,e,n){},20:function(t,e,n){},21:function(t,e,n){t.exports=n.p+"static/media/refresh.7c649a6f.png"},23:function(t,e,n){"use strict";n.r(e);var o=n(0),a=n.n(o),r=n(7),i=n.n(r),s=(n(19),n(8)),c=n(12),u=n(9),l=n(13),h=n(5),d=(n(20),n(26)),f=n(25),m=function(t){function e(t){var n;return Object(h.a)(this,e),(n=Object(c.a)(this,Object(u.a)(e).call(this,t))).refresh=function(){n.getButtonElements().then((function(t){n.setState({buttons:t})}))},n.getButtonElements=function(){return new Promise((function(t){fetch("http://localhost/getButtons").then((function(t){return t.json()})).then((function(e){console.log(e),t(e.buttons)}))}))},n.sendPlaySoundRequest=function(t){var e=new XMLHttpRequest;e.addEventListener("load",(function(){console.log(e.responseText)})),e.open("POST","http://localhost/play"),e.send(JSON.stringify({playId:t}))},n.getDOM=function(){return n.state.buttons.map((function(t){return a.a.createElement(d.a,{onClick:function(){return n.sendPlaySoundRequest(t.id)},className:"button"},t.title)}))},n.state={buttons:[]},n.getButtonElements().then((function(t){n.setState({buttons:t})})),n}return Object(l.a)(e,t),Object(s.a)(e,[{key:"render",value:function(){return a.a.createElement("div",null,a.a.createElement("div",null,a.a.createElement(d.a,{onClick:this.refresh,style:{width:50,height:50,marginLeft:10,marginTop:10}},a.a.createElement(f.a,{src:n(21),style:{height:"100%",width:"150%",marginLeft:-5}}))),this.getDOM())}}]),e}(a.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));n(22);i.a.render(a.a.createElement(m,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(t){t.unregister()}))}},[[14,1,2]]]);
//# sourceMappingURL=main.261221f9.chunk.js.map