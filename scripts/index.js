!function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={exports:{},id:o,loaded:!1};return e[o].call(r.exports,r,r.exports,n),r.loaded=!0,r.exports}n.m=e,n.c=t,n.p="/scripts/",n(0)}([function(e,t){document.addEventListener("DOMContentLoaded",()=>{!function(){const e=document.querySelector(".loader-wrapper"),t=document.querySelector("#loader-script");document.querySelector("#loader-lib").remove(),t.remove();e.classList.add("removed"),setTimeout(()=>e.remove(),2e3)}(),function(){const e=$("#scroll-to").offset().top;window.innerWidth>=1200&&10*e/10>=window.pageYOffset?(document.body.classList.add("no-scroll"),document.querySelector("html").classList.add("no-scroll")):a()}();const e=document.querySelector(".slider"),t=document.querySelector(".widget__current-summary .summary"),n=document.body;function o(){return window.innerWidth<=650}function r(){window.innerWidth<=650?$(".how-it-works__cards").owlCarousel({items:1,margin:30,padding:30}):$(".how-it-works__cards").trigger("destroy.owl.carousel")}function i(e,t){if(!t)return;const n=document.createElement(e);for(let e in t)n.setAttribute(e,t[e]);return n}function c(e,t){e.innerHTML=t.outerHTML}function s(){const e=document.querySelector(".home__modal");n.classList.add("widget-on-hover"),e.classList.add("showed")}function d(){document.querySelector(".home__right .widget").classList.add("hidden")}function u(){const e=$("#scroll-to").offset().top;a(),setTimeout(()=>{l(),$("html, body").animate({scrollTop:e,ease:"easeOutBack"},900)},500),n.removeEventListener("mousewheel",u)}function l(){document.body.classList.remove("no-scroll"),document.querySelector("html").classList.remove("no-scroll")}function a(){document.getElementById("mouse").classList.add("scaled")}function m(){let e=0;if(window.innerWidth<=650){e=document.querySelector(".home__right .widget").getBoundingClientRect().height/2}$("html, body").animate({scrollTop:e,ease:"easeOutBack"},900)}!function(){(function(){const e=document.querySelector(".home__modal");o()||n.addEventListener("mousemove",t=>(function(t){const o=t.clientX,r=t.clientY,i=document.querySelector(".home__right .widget"),c=i.getBoundingClientRect(),s=i.querySelector(".widget__button").getBoundingClientRect(),d=i.querySelector(".widget__slider").getBoundingClientRect(),u=e.getBoundingClientRect(),l=c.x,a=c.y,m=l+c.width,h=a+c.height,f=s.x,y=s.y,w=f+s.width,g=y+s.height,L=u.x,p=u.y,S=L+u.width,q=p+u.height,_=d.x,v=d.y,b=_+d.width,T=v+d.height;if(!(o>=l&&o<=m&&r>=a&&r<=h||o>=L&&o<=S&&r>=p&&r<=q)||o>=f&&o<=w&&r>=y&&r<=g||o>=_&&o<=b&&r>=v&&r<=T||!document.getElementById("mouse").classList.contains("scaled")){const t=300;setTimeout(()=>{n.classList.remove("widget-on-hover"),e.classList.remove("showed")},t)}else n.classList.add("widget-on-hover"),e.classList.add("showed");return i})(t))})(),e.addEventListener("change",e=>t.innerHTML=e.currentTarget.value),window.innerWidth>=1200&&document.body.classList.contains("no-scroll")&&n.addEventListener("mousewheel",u,{passive:!0});window.innerWidth<=650&&window.addEventListener("resize",r);window.addEventListener("scroll",()=>{const e=document.querySelector(".header");e.getBoundingClientRect().bottom<window.pageYOffset?e.classList.add("fixed"):e.classList.remove("fixed")}),window.dispatchEvent(new Event("scroll")),document.querySelectorAll(".button--scroll-to-top").forEach(e=>e.addEventListener("click",m))}(),function(){const e={ease:"easeInQuad",strokeWidth:.5,strokeOpacity:1,strokeColor:"#ffffff"};let t=document.querySelector("#team"),n=document.querySelector("#calendar"),o=document.querySelector("#logo"),r=new LazyLinePainter(t,e),i=new LazyLinePainter(n,e),c=new LazyLinePainter(o,{ease:"easeInQuad",strokeWidth:4,strokeOpacity:1,strokeColor:"#ffffff"});r.paint(),i.paint(),c.paint()}(),r(),function(){let e=!1,t=!1,r=!1,u=!1,a=!1;new Waypoint({element:document.querySelector(".road-map"),handler:function(){if(!e){e=!0;const t=document.querySelector(".road-map__line"),n=document.querySelectorAll(".plan__road-line"),o=document.querySelectorAll(".plan"),r=document.querySelectorAll(".plan__circle");t.classList.add("showed");const i=500;n.forEach((e,t)=>{const n=i+100*t;setTimeout(()=>{e.classList.add("showed"),r[t].classList.add("showed"),o[t].classList.add("showed")},n)})}},offset:"40%"}),new Waypoint({element:document.querySelector(".whitepaper"),handler:function(){if(!t){t=!0;const e=document.getElementById("notebook"),n=document.getElementById("main");e.dispatchEvent(new Event("click")),n.removeAttribute("begin")}},offset:"100%"}),new Waypoint({element:document.querySelector(".support"),handler:function(){if(!r){r=!0,function(){const e=document.querySelector("#map").querySelector(".dots");Array.from(e.childNodes).forEach(e=>{const t=e.querySelector("path");t.setAttribute("opacity","1"),t.innerHTML=i("animate",{"xlink:href":"#"+t.id,attributeName:"opacity",dur:`${2*Math.random()+.5}s`,from:"1",to:"0",repeatCount:"indefinite",begin:"dots-anim.end + .2s"}).outerHTML})}();const e=document.querySelector("#land-parts");e.dispatchEvent(new Event("click")),e.removeAttribute("begin")}},offset:"40%"}),new Waypoint({element:document.querySelector(".airdrop"),handler:function(){if(!u){u=!0,function(){const e=document.querySelector("#crypto"),t=e.querySelectorAll(".circle"),n=e.querySelectorAll(".substrate");(function(e){function t(t,n,o){const r=e.querySelector(t),s=i("animateTransform",{attributeName:"transform",dur:"2s",begin:`crypto-anim.end + ${n}s`,type:"translate",values:`0 0; 0 -${o}; 0 0; 0 ${o}; 0 0;`,repeatCount:"indefinite"});c(r,s)}t("#line-1",.001,10),t("#line-2",.1,20),t("#line-3",.2,50),t("#line-4",.3,50),t("#line-5",.4,40),t("#line-6",.5,10)})(e),n.forEach((e,t)=>{e.setAttribute("id",`substrate-${t}`),e.setAttribute("opacity","0");const n=i("animate",{"xlink:href":`#substrate-${t}`,attributeName:"opacity",dur:"2s",from:"0",to:"1",begin:"crypto-anim.end + .5s",fill:"freeze"});c(e,n)}),t.forEach((e,t)=>{e.setAttribute("id",`circle-${t}`),e.setAttribute("opacity","0");const n=i("animate",{"xlink:href":`#circle-${t}`,attributeName:"opacity",dur:`${3*Math.random()+1}s`,values:".5; .6; 1; .7; .4",begin:"crypto-anim.end + .5s",repeatCount:"indefinite"});c(e,n)})}();const e=document.querySelector("#crypto");e.dispatchEvent(new Event("click"))}},offset:"100%"});if(o())new Waypoint({element:document.querySelector(".home__right"),handler:function(){if(!a){a=!0;!function(){const e=document.querySelector(".home__right .widget"),t=document.querySelector(".home__modal"),o=document.querySelector(".home");s(),d(),n.classList.add("no-scroll"),document.querySelector("html").classList.add("no-scroll"),o.addEventListener("touchstart",function(o){if(touchstartX=event.changedTouches[0].screenX,touchstartY=event.changedTouches[0].screenY,!function(e,t,n){const o=document.querySelector(n).getBoundingClientRect(),r=o.x,i=o.y,c=r+o.width,s=i+o.height;return e>=r&&e<=c&&t>=i&&t<=s}(touchstartX,touchstartY,".home__modal .widget")){const o=300;setTimeout(()=>{l(),n.classList.remove("widget-on-hover"),t.classList.remove("showed"),e.classList.remove("hidden")},o)}},!1),o.addEventListener("touchend",function(e){const t=document.querySelector(".home__right .widget"),o=document.querySelector(".home__modal");touchendX=event.changedTouches[0].screenX,touchendY=event.changedTouches[0].screenY,touchendX>=touchstartX?(s(),d()):(n.classList.remove("widget-on-hover"),o.classList.remove("showed"),t.classList.remove("hidden"))},!1)}()}},offset:"25%"})}(),function(e,t,n,o){const r=document.querySelector(".timer"),i=r.querySelector(".timer__days"),c=r.querySelector(".timer__minutes"),s=r.querySelector(".timer__seconds"),d=r.querySelector(".timer__hours");let u=new Date(e,t,o,0,0,0);function l(e){return(e+="").length<2&&(e="0"+e),e}i.innerHTML=l(u.getDay()),c.innerHTML=l(u.getMinutes()),s.innerHTML=l(u.getSeconds()),d.innerHTML=l(u.getHours()),setInterval(function(){const e=document.querySelector(".timer"),t=e.querySelector(".timer__days"),n=e.querySelector(".timer__minutes"),o=e.querySelector(".timer__seconds"),r=e.querySelector(".timer__hours");let i=+o.innerHTML,c=+n.innerHTML,s=+r.innerHTML,d=+t.innerHTML;i>0&&--i;0===i&&(i=59,c>0&&c--);0===c&&(c=59,s>0&&s--);0===s&&(s=23,d>0&&d--);o.innerHTML=i,n.innerHTML=c,r.innerHTML=s,t.innerHTML=d},1e3)}(2019,0,0,15)})}]);