!function(e){var t={};function o(n){if(t[n])return t[n].exports;var r=t[n]={exports:{},id:n,loaded:!1};return e[n].call(r.exports,r,r.exports,o),r.loaded=!0,r.exports}o.m=e,o.c=t,o.p="/scripts/",o(0)}([function(e,t){document.addEventListener("DOMContentLoaded",()=>{function e(){return window.innerWidth<=650}function t(){e()?$(".how-it-works__cards").owlCarousel({items:1,margin:30,padding:30}):$(".how-it-works__cards").trigger("destroy.owl.carousel")}function o(e,t){if(!t)return;const o=document.createElement(e);for(let e in t)o.setAttribute(e,t[e]);return o}function n(e,t){e.innerHTML=t.outerHTML}function r(e,t,o){const n=document.querySelector(o).getBoundingClientRect(),r=n.x,i=n.y,c=r+n.width,s=i+n.height;return e>=r&&e<=c&&t>=i&&t<=s}function i(){const e=$("#scroll-to").offset().top,t=document.querySelector(".how-it-works");t.classList.remove("opacify"),c(),setTimeout(()=>{document.body.classList.remove("no-scroll"),document.querySelector("html").classList.remove("no-scroll"),$("html, document.body").animate({scrollTop:e,ease:"easeOutBack"},900)},500),document.body.removeEventListener("mousewheel",i),document.body.removeEventListener("wheel",i)}function c(){document.getElementById("mouse").classList.add("scaled")}function s(){let t=0;if(e()){t=document.querySelector(".home__right .widget").getBoundingClientRect().height/2}$("html, body").animate({scrollTop:t,ease:"easeOutBack"},900)}!function(){(function(){const e=$("#scroll-to").offset().top;if(window.innerWidth>=1200&&10*e/10>=window.pageYOffset)document.body.classList.add("no-scroll"),document.querySelector("html").classList.add("no-scroll");else{const e=document.querySelector(".how-it-works");e.classList.remove("opacify"),c()}})(),function(){const o=document.querySelector(".slider"),n=document.querySelector(".widget__current-summary .summary");if(window.innerWidth>1200&&document.body.classList.contains("no-scroll")){const e=document.querySelector(".how-it-works");e.classList.add("opacify"),document.body.addEventListener("wheel",i,{passive:!0}),document.body.addEventListener("mousewheel",i,{passive:!0})}e(),e()?window.addEventListener("resize",t):window.addEventListener("scroll",()=>{const e=document.querySelector(".header");e.getBoundingClientRect().bottom<window.pageYOffset?e.classList.add("fixed"):e.classList.remove("fixed")}),o.addEventListener("change",e=>n.innerHTML=e.currentTarget.value),window.dispatchEvent(new Event("scroll")),document.querySelectorAll(".button--scroll-to-top").forEach(e=>e.addEventListener("click",s))}(),t(),e()?function(){let e=0,t=0,o=0,n=0,r=!1;const i=document.querySelector(".home");i.addEventListener("touchstart",function(o){e=o.changedTouches[0].screenX,t=o.changedTouches[0].screenY},{passive:!0}),i.addEventListener("touchend",function(t){const i=document.querySelector(".home__right .widget"),c=document.querySelector(".home__modal");if(o=t.changedTouches[0].screenX,n=t.changedTouches[0].screenY,target=t.target,Math.abs(o-e)<=window.innerWidth/4)return;if(o>=e){if(s()&&(!function(){const e=document.querySelector(".home__modal");document.body.classList.add("widget-on-hover"),e.classList.add("showed")}(),document.querySelector(".home__right .widget").classList.add("hidden")),!r){const e=document.querySelector(".widget__swipe-line");e.classList.add("widget__swipe-line--no-title"),r=!0}}else s()&&(document.body.classList.remove("widget-on-hover"),c.classList.remove("showed"),i.classList.remove("hidden"));function s(){return target.closest(".widget")}},{passive:!0}),function(){const e=document.querySelector(".home__modal .widget__top"),t=document.querySelector(".home__right .widget__top");e.classList.add("no-border"),t.classList.add("no-border")}()}():function(){let e=function(e,t){let o=null;return function(...n){o&&clearTimeout(o),o=setTimeout(()=>{e.apply(this,n),o=null},t)}}(function(e){const o=e.clientX,n=e.clientY,i=document.querySelector(".home__modal"),c=r(o,n,".home__right .widget"),s=r(o,n,".widget__button"),a=r(o,n,".home__modal"),d=r(o,n,".widget__slider");if(!c&&!a||s||d||!document.getElementById("mouse").classList.contains("scaled")){const e=300;setTimeout(()=>{document.body.classList.remove("widget-on-hover"),i.classList.remove("showed")},e)}else if(document.body.classList.add("widget-on-hover"),i.classList.add("showed"),!t){const e=document.querySelector(".widget__tap-line");e.classList.add("tapped"),hasTouched=!0}},50),t=!1;document.body.addEventListener("mousemove",e)}();window.navigator.userAgent.indexOf("Edge")>-1||navigator.userAgent.toLowerCase().indexOf("firefox")>-1||e()||(document.getElementById("crypto").setAttribute("opacity","0"),function(){const e=document.getElementById("notebook"),t=document.querySelectorAll("[id^='page']"),o=document.getElementById("layer-1");t.forEach(e=>e.setAttribute("opacity","0")),e.setAttribute("opacity","0"),o.setAttribute("opacity","0")}(),function(){const e=document.querySelector("#lines"),t=map.querySelector(".dots"),o=document.querySelector("#land-parts");e.setAttribute("opacity","0"),t.setAttribute("opacity","0"),o.setAttribute("opacity","0")}());!function(e,t,o,n){const r=document.querySelector(".timer"),i=r.querySelector(".timer__days"),c=r.querySelector(".timer__minutes"),s=r.querySelector(".timer__seconds"),a=r.querySelector(".timer__hours");function d(e){return(e+="").length<2&&(e="0"+e),e}i.innerHTML=d(15),c.innerHTML=d(0),s.innerHTML=d(0),a.innerHTML=d(0),setInterval(function(){const e=document.querySelector(".timer"),t=e.querySelector(".timer__days"),o=e.querySelector(".timer__minutes"),n=e.querySelector(".timer__seconds"),r=e.querySelector(".timer__hours");let i=+n.innerHTML,c=+o.innerHTML,s=+r.innerHTML,a=+t.innerHTML;i>0&&--i;0===i&&(i=59,c>0&&c--);0===c&&(c=59,s>0&&s--);0===s&&(s=23,a>0&&a--);n.innerHTML=i,o.innerHTML=c,r.innerHTML=s,t.innerHTML=a},1e3)}()}(),function(){const t=document.querySelector(".chose-language__languages");function r(){setTimeout(()=>{!function(){const e=document.querySelector(".chose-language-wrapper");e.classList.add("removed"),setTimeout(()=>e.remove(),2e3)}(),document.body.classList.remove("preloader"),function(){let t=!1,r=!1,i=!1,c=!1;new Waypoint({element:document.querySelector(".road-map"),handler:function(){if(!t){t=!0;const e=document.querySelector(".road-map__line"),o=document.querySelectorAll(".plan__road-line"),n=document.querySelectorAll(".plan"),r=document.querySelectorAll(".plan__circle");e.classList.add("showed");const i=500;o.forEach((e,t)=>{const o=i+100*t;setTimeout(()=>{e.classList.add("showed"),r[t].classList.add("showed"),n[t].classList.add("showed")},o)})}},offset:"40%"}),new Waypoint({element:document.querySelector(".whitepaper"),handler:function(){if(!r){r=!0;const t=document.getElementById("notebook"),o=document.getElementById("main");e()||t.dispatchEvent(new Event("click")),o.removeAttribute("begin")}},offset:"100%"}),new Waypoint({element:document.querySelector(".support"),handler:function(){if(!i){i=!0;const t=document.querySelector("#land-parts"),n=document.querySelector("#land-parts-anim");e()||(!function(){const e=document.querySelector(".dots");Array.from(e.childNodes).forEach(e=>{const t=e.querySelector("path");t.setAttribute("opacity","1"),t.innerHTML=o("animate",{"xlink:href":"#"+t.id,attributeName:"opacity",dur:`${2*Math.random()+.5}s`,from:"1",to:"0",repeatCount:"indefinite",begin:"dots-anim.end + 0.2s"}).outerHTML})}(),t.dispatchEvent(new Event("click"))),n.removeAttribute("begin")}},offset:"40%"}),new Waypoint({element:document.querySelector(".airdrop"),handler:function(){if(!c){c=!0;const t=document.querySelector("#crypto"),r=document.querySelector("#crypto-anim");e()||(!function(){const e=document.querySelector("#crypto"),t=e.querySelectorAll(".circle"),r=e.querySelectorAll(".substrate");(function(e){function t(t,r,i){const c=e.querySelector(t),s=o("animateTransform",{attributeName:"transform",dur:"2s",begin:`crypto-anim.end + ${r}s`,type:"translate",values:`0 0; 0 -${i}; 0 0; 0 ${i}; 0 0;`,repeatCount:"indefinite"});n(c,s)}t("#line-1",.001,10),t("#line-2",.1,20),t("#line-3",.2,50),t("#line-4",.3,50),t("#line-5",.4,40),t("#line-6",.5,10)})(e),r.forEach((e,t)=>{e.setAttribute("id",`substrate-${t}`),e.setAttribute("opacity","0");const r=o("animate",{"xlink:href":`#substrate-${t}`,attributeName:"opacity",dur:"2s",from:"0",to:"1",begin:"crypto-anim.end + 0.5s",fill:"freeze"});n(e,r)}),t.forEach((e,t)=>{e.setAttribute("id",`circle-${t}`),e.setAttribute("opacity","0");const r=o("animate",{"xlink:href":`#circle-${t}`,attributeName:"opacity",dur:`${3*Math.random()+1}s`,values:"0.5; 0.6; 1; 0.7; 0.4",begin:"crypto-anim.end + 0.5s",repeatCount:"indefinite"});n(e,r)})}(),t.dispatchEvent(new Event("click"))),r.removeAttribute("begin")}},offset:"100%"})}()},1500)}document.body.classList.add("preloader"),t.addEventListener("click",t=>{const o=t.target;o.classList.contains("chose-language__language--korean")&&(!function(e="ENG"){const t=["투자하기","차별화된 글로벌 거래소 플랫폼","히든토큰 구매","투자","X 토큰은 17 000 000 개의 토큰에서 제외됩니다.","ICO 투자","세계 최초 코인 구매부터 각종 ICO 참여까지 가능한 거래소 플랫폼","모금액","설립자","지속","특징","프리세일 타이머","일","시","분","초","1","HID = ","0.15$","총 17 000 000 토큰중 현재 B토큰이 남았습니다.","세계 최초의 테조스 마켓 신설","세계 최초 tezos를 기축통화로 도입. 그 외 (BTC,ETH,EOS,KRW)","베이킹 노드 운영","블록체인 노드를 운영을 통해 연 5.5% 상당의 TEZOS를 보상.","거래소를 통한 ICO 참여 가능","개인 계정을 통해 ICO참여한 토큰 보호.","투표권","HID 토큰 보유량에 따른 상장토큰에 대한 투표권을 행사 가능.","세계 최초 손실 방지 보험제도 도입.","투자 손실예방에 대한 보험제도 도입으로 손실금액 보상.","분기별 HID 토큰 바이백 및 소각.","거래소 수익금 일부를 HID 토큰 바이백 및 소각으로 시장 안정화.","백지","새로운 히든비트 백서를 공유할수 있어 기쁩니다.이백서는 피아트 통합을 통한 새로운 마이닝거래소를 소개하고 있습니다:Proof-of-Replication (PoR) and Proof-of-Spacetime (PoSt)","히든비트 백서보기","거래소를 통한 ICO참여가능","독자적인 기술력으로 코인 구매부터 ico 참여까지 hiddenbit 에서 해결.","레벨과 보너스율은 기본가격과 별도로 적용됩니다.","추가 HID 코인,%","히든비트 토큰은 첫거래부터 스마트컨트랙트를 통해 프로그래밍 됩니다.","판매수량","판매비율(%)","보너스","가격($)","하드캡($)","채굴수량이 어떻게 되는가?","1개월~12개월 - ","2 859 302.84 코인","13개월~24개월 - ","1 429 651,42 코인","25개월~35개월- ","714,825.71 코인","36개월 - ","669,466.07 코인","로드맵","계획 및 개발","베타버전 런칭","거래소 런칭","글로벌 TOP10 거래소 선정","히든 코인이 거래되는 최고의 거래소","24 × 7 지원 서비스","문의사항이 있으신경우, 언제든 답변해 드리겠습니다.","투자하기","히든비트 거래소 둘러보기","히든비트 거래소 백서","복제방지","2019 연구 로드맵"],o=[r(".header__button"),r(".home .info__title"),r(".home__modal .widget__button"),r(".home__right .widget__logo .text"),r(".home__right .widget__info .text"),r(".home__right .widget__button"),r(".home .info__description"),r(".home .board__item--1 .board__title"),r(".home .board__item--2 .board__title"),r(".home .board__item--3 .board__title"),r(".how-it-works__title"),r(".home__modal .widget__title"),r(".timer__days"),r(".timer__hours"),r(".timer__minutes"),r(".timer__seconds"),r(".home__modal .widget__info .coin__number"),r(".home__modal .widget__info .text"),r(".home__modal .widget__info .coin__price"),r(".home__modal .widget__info--2 .text"),r(".card--1 .card__title"),r(".card--1 .card__info"),r(".card--2 .card__title"),r(".card--2 .card__info"),r(".card--3 .card__title"),r(".card--3 .card__info"),r(".card--4 .card__title"),r(".card--4 .card__info"),r(".card--5 .card__title"),r(".card--5 .card__info"),r(".card--6 .card__title"),r(".card--6 .card__info"),r(".whitepaper__title"),r(".whitepaper__info"),r(".whitepaper__button"),r(".airdrop__title"),r(".airdrop__info"),r(".airdrop__additional-info"),r(".airdrop__table .table__column--2"),r(".release__title"),r(".release .table__row--2 .table__column--1"),r(".release .table__row--3 .table__column--1"),r(".release .table__row--4 .table__column--1"),r(".release .table__row--5 .table__column--1"),r(".release .table__row--6 .table__column--1"),r(".for-miners__title"),r(".for-miners .list__item--1 .text"),r(".for-miners .list__item--1 .coins"),r(".for-miners .list__item--2 .text"),r(".for-miners .list__item--2 .coins"),r(".for-miners .list__item--3 .text"),r(".for-miners .list__item--3 .coins"),r(".for-miners .list__item--4 .text"),r(".for-miners .list__item--4 .coins"),r(".road-map__title"),r(".road-map .plan--1"),r(".road-map .plan--3"),r(".road-map .plan--4"),r(".road-map .plan--5"),r(".exchanges__title"),r(".support__title"),r(".support__info"),r(".support__button"),r(".research__title"),r(".research__items .item--1 .item__title"),r(".research__items .item--2 .item__title"),r(".research__items .item--3 .item__title")];"ENG"!==e&&(n=t,o.forEach((e,t)=>{const o=n[t];try{e.hasAttribute("data-title")?(e.innerHTML=o,e.setAttribute("data-title",o)):e.classList.contains("plan")?e.setAttribute("data-plan-description",o):e.hasAttribute("data-name")?e.setAttribute("data-name",o):""!==o&&(e.innerHTML=o)}catch(e){console.log("Error element index :",t)}}));var n;function r(e){return document.querySelector(e)}}("KOR"),document.body.classList.add("kor")),r(),e()||navigator.platform.match(/(Mac|iPhone|iPod|iPad)/i)?document.querySelectorAll(".board__image svg").forEach(e=>{const t=e.querySelectorAll("[fill-opacity]");t.forEach(e=>e.setAttribute("fill-opacity","1"))}):function(){const e={ease:"easeInQuad",strokeWidth:.5,strokeOpacity:1,strokeColor:"#ffffff"};let t=document.querySelector("#team"),o=document.querySelector("#calendar"),n=document.querySelector("#logo"),r=new LazyLinePainter(t,e),i=new LazyLinePainter(o,e),c=new LazyLinePainter(n,{ease:"easeInQuad",strokeWidth:4,strokeOpacity:1,strokeColor:"#ffffff"});r.paint(),i.paint(),c.paint()}()})}()})}]);!function(e){var t={};function o(n){if(t[n])return t[n].exports;var r=t[n]={exports:{},id:n,loaded:!1};return e[n].call(r.exports,r,r.exports,o),r.loaded=!0,r.exports}o.m=e,o.c=t,o.p="/scripts/",o(0)}([function(e,t){document.addEventListener("DOMContentLoaded",()=>{function e(){return window.innerWidth<=650}function t(){e()?$(".how-it-works__cards").owlCarousel({items:1,margin:30,padding:30}):$(".how-it-works__cards").trigger("destroy.owl.carousel")}function o(e,t){if(!t)return;const o=document.createElement(e);for(let e in t)o.setAttribute(e,t[e]);return o}function n(e,t){e.innerHTML=t.outerHTML}function r(e,t,o){const n=document.querySelector(o).getBoundingClientRect(),r=n.x,i=n.y,c=r+n.width,s=i+n.height;return e>=r&&e<=c&&t>=i&&t<=s}function i(){const e=$("#scroll-to").offset().top,t=document.querySelector(".how-it-works");t.classList.remove("opacify"),c(),setTimeout(()=>{document.body.classList.remove("no-scroll"),document.querySelector("html").classList.remove("no-scroll"),$("html, document.body").animate({scrollTop:e,ease:"easeOutBack"},900)},500),document.body.removeEventListener("mousewheel",i),document.body.removeEventListener("wheel",i)}function c(){document.getElementById("mouse").classList.add("scaled")}function s(){let t=0;if(e()){t=document.querySelector(".home__right .widget").getBoundingClientRect().height/2}$("html, body").animate({scrollTop:t,ease:"easeOutBack"},900)}!function(){(function(){const e=$("#scroll-to").offset().top;if(window.innerWidth>=1200&&10*e/10>=window.pageYOffset)document.body.classList.add("no-scroll"),document.querySelector("html").classList.add("no-scroll");else{const e=document.querySelector(".how-it-works");e.classList.remove("opacify"),c()}})(),function(){const o=document.querySelector(".slider"),n=document.querySelector(".widget__current-summary .summary");if(window.innerWidth>1200&&document.body.classList.contains("no-scroll")){const e=document.querySelector(".how-it-works");e.classList.add("opacify"),document.body.addEventListener("wheel",i,{passive:!0}),document.body.addEventListener("mousewheel",i,{passive:!0})}e(),e()?window.addEventListener("resize",t):window.addEventListener("scroll",()=>{const e=document.querySelector(".header");e.getBoundingClientRect().bottom<window.pageYOffset?e.classList.add("fixed"):e.classList.remove("fixed")}),o.addEventListener("change",e=>n.innerHTML=e.currentTarget.value),window.dispatchEvent(new Event("scroll")),document.querySelectorAll(".button--scroll-to-top").forEach(e=>e.addEventListener("click",s))}(),t(),e()?function(){let e=0,t=0,o=0,n=0,r=!1;const i=document.querySelector(".home");i.addEventListener("touchstart",function(o){e=o.changedTouches[0].screenX,t=o.changedTouches[0].screenY},{passive:!0}),i.addEventListener("touchend",function(t){const i=document.querySelector(".home__right .widget"),c=document.querySelector(".home__modal");if(o=t.changedTouches[0].screenX,n=t.changedTouches[0].screenY,target=t.target,Math.abs(o-e)<=window.innerWidth/4)return;if(o>=e){if(s()&&(!function(){const e=document.querySelector(".home__modal");document.body.classList.add("widget-on-hover"),e.classList.add("showed")}(),document.querySelector(".home__right .widget").classList.add("hidden")),!r){const e=document.querySelector(".widget__swipe-line");e.classList.add("widget__swipe-line--no-title"),r=!0}}else s()&&(document.body.classList.remove("widget-on-hover"),c.classList.remove("showed"),i.classList.remove("hidden"));function s(){return target.closest(".widget")}},{passive:!0}),function(){const e=document.querySelector(".home__modal .widget__top"),t=document.querySelector(".home__right .widget__top");e.classList.add("no-border"),t.classList.add("no-border")}()}():function(){let e=function(e,t){let o=null;return function(...n){o&&clearTimeout(o),o=setTimeout(()=>{e.apply(this,n),o=null},t)}}(function(e){const o=e.clientX,n=e.clientY,i=document.querySelector(".home__modal"),c=r(o,n,".home__right .widget"),s=r(o,n,".widget__button"),a=r(o,n,".home__modal"),d=r(o,n,".widget__slider");if(!c&&!a||s||d||!document.getElementById("mouse").classList.contains("scaled")){const e=300;setTimeout(()=>{document.body.classList.remove("widget-on-hover"),i.classList.remove("showed")},e)}else if(document.body.classList.add("widget-on-hover"),i.classList.add("showed"),!t){const e=document.querySelector(".widget__tap-line");e.classList.add("tapped"),hasTouched=!0}},50),t=!1;document.body.addEventListener("mousemove",e)}();window.navigator.userAgent.indexOf("Edge")>-1||navigator.userAgent.toLowerCase().indexOf("firefox")>-1||e()||(document.getElementById("crypto").setAttribute("opacity","0"),function(){const e=document.getElementById("notebook"),t=document.querySelectorAll("[id^='page']"),o=document.getElementById("layer-1");t.forEach(e=>e.setAttribute("opacity","0")),e.setAttribute("opacity","0"),o.setAttribute("opacity","0")}(),function(){const e=document.querySelector("#lines"),t=map.querySelector(".dots"),o=document.querySelector("#land-parts");e.setAttribute("opacity","0"),t.setAttribute("opacity","0"),o.setAttribute("opacity","0")}());!function(e,t,o,n){const r=document.querySelector(".timer"),i=r.querySelector(".timer__days"),c=r.querySelector(".timer__minutes"),s=r.querySelector(".timer__seconds"),a=r.querySelector(".timer__hours");function d(e){return(e+="").length<2&&(e="0"+e),e}i.innerHTML=d(15),c.innerHTML=d(0),s.innerHTML=d(0),a.innerHTML=d(0),setInterval(function(){const e=document.querySelector(".timer"),t=e.querySelector(".timer__days"),o=e.querySelector(".timer__minutes"),n=e.querySelector(".timer__seconds"),r=e.querySelector(".timer__hours");let i=+n.innerHTML,c=+o.innerHTML,s=+r.innerHTML,a=+t.innerHTML;i>0&&--i;0===i&&(i=59,c>0&&c--);0===c&&(c=59,s>0&&s--);0===s&&(s=23,a>0&&a--);n.innerHTML=i,o.innerHTML=c,r.innerHTML=s,t.innerHTML=a},1e3)}()}(),function(){const t=document.querySelector(".chose-language__languages");function r(){setTimeout(()=>{!function(){const e=document.querySelector(".chose-language-wrapper");e.classList.add("removed"),setTimeout(()=>e.remove(),2e3)}(),document.body.classList.remove("preloader"),function(){let t=!1,r=!1,i=!1,c=!1;new Waypoint({element:document.querySelector(".road-map"),handler:function(){if(!t){t=!0;const e=document.querySelector(".road-map__line"),o=document.querySelectorAll(".plan__road-line"),n=document.querySelectorAll(".plan"),r=document.querySelectorAll(".plan__circle");e.classList.add("showed");const i=500;o.forEach((e,t)=>{const o=i+100*t;setTimeout(()=>{e.classList.add("showed"),r[t].classList.add("showed"),n[t].classList.add("showed")},o)})}},offset:"40%"}),new Waypoint({element:document.querySelector(".whitepaper"),handler:function(){if(!r){r=!0;const t=document.getElementById("notebook"),o=document.getElementById("main");e()||t.dispatchEvent(new Event("click")),o.removeAttribute("begin")}},offset:"100%"}),new Waypoint({element:document.querySelector(".support"),handler:function(){if(!i){i=!0;const t=document.querySelector("#land-parts"),n=document.querySelector("#land-parts-anim");e()||(!function(){const e=document.querySelector(".dots");Array.from(e.childNodes).forEach(e=>{const t=e.querySelector("path");t.setAttribute("opacity","1"),t.innerHTML=o("animate",{"xlink:href":"#"+t.id,attributeName:"opacity",dur:`${2*Math.random()+.5}s`,from:"1",to:"0",repeatCount:"indefinite",begin:"dots-anim.end + 0.2s"}).outerHTML})}(),t.dispatchEvent(new Event("click"))),n.removeAttribute("begin")}},offset:"40%"}),new Waypoint({element:document.querySelector(".airdrop"),handler:function(){if(!c){c=!0;const t=document.querySelector("#crypto"),r=document.querySelector("#crypto-anim");e()||(!function(){const e=document.querySelector("#crypto"),t=e.querySelectorAll(".circle"),r=e.querySelectorAll(".substrate");(function(e){function t(t,r,i){const c=e.querySelector(t),s=o("animateTransform",{attributeName:"transform",dur:"2s",begin:`crypto-anim.end + ${r}s`,type:"translate",values:`0 0; 0 -${i}; 0 0; 0 ${i}; 0 0;`,repeatCount:"indefinite"});n(c,s)}t("#line-1",.001,10),t("#line-2",.1,20),t("#line-3",.2,50),t("#line-4",.3,50),t("#line-5",.4,40),t("#line-6",.5,10)})(e),r.forEach((e,t)=>{e.setAttribute("id",`substrate-${t}`),e.setAttribute("opacity","0");const r=o("animate",{"xlink:href":`#substrate-${t}`,attributeName:"opacity",dur:"2s",from:"0",to:"1",begin:"crypto-anim.end + 0.5s",fill:"freeze"});n(e,r)}),t.forEach((e,t)=>{e.setAttribute("id",`circle-${t}`),e.setAttribute("opacity","0");const r=o("animate",{"xlink:href":`#circle-${t}`,attributeName:"opacity",dur:`${3*Math.random()+1}s`,values:"0.5; 0.6; 1; 0.7; 0.4",begin:"crypto-anim.end + 0.5s",repeatCount:"indefinite"});n(e,r)})}(),t.dispatchEvent(new Event("click"))),r.removeAttribute("begin")}},offset:"100%"})}()},1500)}document.body.classList.add("preloader"),t.addEventListener("click",t=>{const o=t.target;o.classList.contains("chose-language__language--korean")&&(!function(e="ENG"){const t=["투자하기","차별화된 글로벌 거래소 플랫폼","히든토큰 구매","투자","X 토큰은 17 000 000 개의 토큰에서 제외됩니다.","ICO 투자","세계 최초 코인 구매부터 각종 ICO 참여까지 가능한 거래소 플랫폼","모금액","설립자","지속","특징","프리세일 타이머","일","시","분","초","1","HID = ","0.15$","총 17 000 000 토큰중 현재 B토큰이 남았습니다.","세계 최초의 테조스 마켓 신설","세계 최초 tezos를 기축통화로 도입. 그 외 (BTC,ETH,EOS,KRW)","베이킹 노드 운영","블록체인 노드를 운영을 통해 연 5.5% 상당의 TEZOS를 보상.","거래소를 통한 ICO 참여 가능","개인 계정을 통해 ICO참여한 토큰 보호.","투표권","HID 토큰 보유량에 따른 상장토큰에 대한 투표권을 행사 가능.","세계 최초 손실 방지 보험제도 도입.","투자 손실예방에 대한 보험제도 도입으로 손실금액 보상.","분기별 HID 토큰 바이백 및 소각.","거래소 수익금 일부를 HID 토큰 바이백 및 소각으로 시장 안정화.","백지","새로운 히든비트 백서를 공유할수 있어 기쁩니다.이백서는 피아트 통합을 통한 새로운 마이닝거래소를 소개하고 있습니다:Proof-of-Replication (PoR) and Proof-of-Spacetime (PoSt)","히든비트 백서보기","거래소를 통한 ICO참여가능","독자적인 기술력으로 코인 구매부터 ico 참여까지 hiddenbit 에서 해결.","레벨과 보너스율은 기본가격과 별도로 적용됩니다.","추가 HID 코인,%","히든비트 토큰은 첫거래부터 스마트컨트랙트를 통해 프로그래밍 됩니다.","판매수량","판매비율(%)","보너스","가격($)","하드캡($)","채굴수량이 어떻게 되는가?","1개월~12개월 - ","2 859 302.84 코인","13개월~24개월 - ","1 429 651,42 코인","25개월~35개월- ","714,825.71 코인","36개월 - ","669,466.07 코인","로드맵","계획 및 개발","베타버전 런칭","거래소 런칭","글로벌 TOP10 거래소 선정","히든 코인이 거래되는 최고의 거래소","24 × 7 지원 서비스","문의사항이 있으신경우, 언제든 답변해 드리겠습니다.","투자하기","히든비트 거래소 둘러보기","히든비트 거래소 백서","복제방지","2019 연구 로드맵"],o=[r(".header__button"),r(".home .info__title"),r(".home__modal .widget__button"),r(".home__right .widget__logo .text"),r(".home__right .widget__info .text"),r(".home__right .widget__button"),r(".home .info__description"),r(".home .board__item--1 .board__title"),r(".home .board__item--2 .board__title"),r(".home .board__item--3 .board__title"),r(".how-it-works__title"),r(".home__modal .widget__title"),r(".timer__days"),r(".timer__hours"),r(".timer__minutes"),r(".timer__seconds"),r(".home__modal .widget__info .coin__number"),r(".home__modal .widget__info .text"),r(".home__modal .widget__info .coin__price"),r(".home__modal .widget__info--2 .text"),r(".card--1 .card__title"),r(".card--1 .card__info"),r(".card--2 .card__title"),r(".card--2 .card__info"),r(".card--3 .card__title"),r(".card--3 .card__info"),r(".card--4 .card__title"),r(".card--4 .card__info"),r(".card--5 .card__title"),r(".card--5 .card__info"),r(".card--6 .card__title"),r(".card--6 .card__info"),r(".whitepaper__title"),r(".whitepaper__info"),r(".whitepaper__button"),r(".airdrop__title"),r(".airdrop__info"),r(".airdrop__additional-info"),r(".airdrop__table .table__column--2"),r(".release__title"),r(".release .table__row--2 .table__column--1"),r(".release .table__row--3 .table__column--1"),r(".release .table__row--4 .table__column--1"),r(".release .table__row--5 .table__column--1"),r(".release .table__row--6 .table__column--1"),r(".for-miners__title"),r(".for-miners .list__item--1 .text"),r(".for-miners .list__item--1 .coins"),r(".for-miners .list__item--2 .text"),r(".for-miners .list__item--2 .coins"),r(".for-miners .list__item--3 .text"),r(".for-miners .list__item--3 .coins"),r(".for-miners .list__item--4 .text"),r(".for-miners .list__item--4 .coins"),r(".road-map__title"),r(".road-map .plan--1"),r(".road-map .plan--3"),r(".road-map .plan--4"),r(".road-map .plan--5"),r(".exchanges__title"),r(".support__title"),r(".support__info"),r(".support__button"),r(".research__title"),r(".research__items .item--1 .item__title"),r(".research__items .item--2 .item__title"),r(".research__items .item--3 .item__title")];"ENG"!==e&&(n=t,o.forEach((e,t)=>{const o=n[t];try{e.hasAttribute("data-title")?(e.innerHTML=o,e.setAttribute("data-title",o)):e.classList.contains("plan")?e.setAttribute("data-plan-description",o):e.hasAttribute("data-name")?e.setAttribute("data-name",o):""!==o&&(e.innerHTML=o)}catch(e){console.log("Error element index :",t)}}));var n;function r(e){return document.querySelector(e)}}("KOR"),document.body.classList.add("kor")),r(),e()||navigator.platform.match(/(Mac|iPhone|iPod|iPad)/i)?document.querySelectorAll(".board__image svg").forEach(e=>{const t=e.querySelectorAll("[fill-opacity]");t.forEach(e=>e.setAttribute("fill-opacity","1"))}):function(){const e={ease:"easeInQuad",strokeWidth:.5,strokeOpacity:1,strokeColor:"#ffffff"};let t=document.querySelector("#team"),o=document.querySelector("#calendar"),n=document.querySelector("#logo"),r=new LazyLinePainter(t,e),i=new LazyLinePainter(o,e),c=new LazyLinePainter(n,{ease:"easeInQuad",strokeWidth:4,strokeOpacity:1,strokeColor:"#ffffff"});r.paint(),i.paint(),c.paint()}()})}()})}]);
