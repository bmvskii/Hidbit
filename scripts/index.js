/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/scripts/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

	document.addEventListener("DOMContentLoaded", () => {
	  /**
	   * Remove the loader when all script have been loaded
	   */

	  init();
	  addLanguageButtonsEventListeners();

	  function init() {
	    freezeDocument();
	    addEventListeners();
	    
	    initSlider();

	    if (isMobile()) {
	      initMobilePopupInteraction();
	    } else {
	      hideIllustrations();
	      initDesktopPopupInteraction();
	    }

	    initTimer();
	  }

	  function hideIllustrations() {
	    hideCryptoMachineElements();
	    hideNotebookElements();
	    hideMapElements();
	  }

	  function initWayPointsInteraction() {
	    let roadMapReached = false;
	    let notebookReached = false;
	    let supportReached = false;
	    let airDropReached = false;

	    let roadmap = new Waypoint({
	      element: document.querySelector(".road-map"),
	      handler: function() {
	        if (!roadMapReached) {
	          roadMapReached = true;
	          const roadLine = document.querySelector(".road-map__line");
	          const planLines = document.querySelectorAll(".plan__road-line");
	          const plans = document.querySelectorAll(".plan");
	          const circles = document.querySelectorAll(".plan__circle");

	          roadLine.classList.add("showed");
	          const delay = 500;

	          planLines.forEach((pl, index) => {
	            const _delay = delay + 100 * index;
	            setTimeout(() => {
	              pl.classList.add("showed");
	              circles[index].classList.add("showed");
	              plans[index].classList.add("showed");
	            }, _delay);
	          });
	        }
	      },
	      offset: "40%"
	    });

	    let notebook = new Waypoint({
	      element: document.querySelector(".whitepaper"),
	      handler: function() {
	        if (!notebookReached) {
	          notebookReached = true;
	          console.log('init');
	          const trigger = document.getElementById("notebook");
	          const triggerAnimation = document.getElementById("main");

	          if (!isMobile()) {
	            trigger.dispatchEvent(new Event("click"));
	          }

	          triggerAnimation.removeAttribute("begin");
	        }
	      },
	      offset: "100%"
	    });

	    let support = new Waypoint({
	      element: document.querySelector(".support"),
	      handler: function() {
	        if (!supportReached) {
	          supportReached = true;
	          const trigger = document.querySelector("#land-parts");
	          const triggerAnimation = document.querySelector("#land-parts-anim");

	          if (!isMobile()) {
	            animateMap();
	            trigger.dispatchEvent(new Event("click"));
	          }

	          triggerAnimation.removeAttribute("begin");
	        }
	      },
	      offset: "40%"
	    });

	    let airdrop = new Waypoint({
	      element: document.querySelector(".airdrop"),
	      handler: function() {
	        if (!airDropReached) {
	          airDropReached = true;
	          const trigger = document.querySelector("#crypto");
	          const triggerAnimation = document.querySelector("#crypto-anim");

	          if (!isMobile()) {
	            animateCryptoMachine();
	            trigger.dispatchEvent(new Event("click"));
	          }

	          triggerAnimation.removeAttribute("begin");
	        }
	      },
	      offset: "100%"
	    });
	  }

	  function isMobile() {
	    return window.innerWidth <= 650;
	  }

	  function initTimer(year, month, week, day) {
	    const timer = document.querySelector(".timer");
	    const days = timer.querySelector(".timer__days");
	    const mins = timer.querySelector(".timer__minutes");
	    const secs = timer.querySelector(".timer__seconds");
	    const hours = timer.querySelector(".timer__hours");

	    /**
	     * Initialization
	     */

	    days.innerHTML = wrapWithZero(15);
	    mins.innerHTML = wrapWithZero(0);
	    secs.innerHTML = wrapWithZero(0);
	    hours.innerHTML = wrapWithZero(0);

	    setInterval(decrease, 1000);

	    function decrease() {
	      const timer = document.querySelector(".timer");
	      const days = timer.querySelector(".timer__days");
	      const mins = timer.querySelector(".timer__minutes");
	      const secs = timer.querySelector(".timer__seconds");
	      const hours = timer.querySelector(".timer__hours");

	      let s = +secs.innerHTML,
	        m = +mins.innerHTML,
	        h = +hours.innerHTML,
	        d = +days.innerHTML;

	      if (s > 0) --s;

	      if (s === 0) {
	        s = 59;
	        if (m > 0) m--;
	      }
	      if (m === 0) {
	        m = 59;
	        if (h > 0) h--;
	      }
	      if (h === 0) {
	        h = 23;
	        if (d > 0) d--;
	      }

	      secs.innerHTML = s;
	      mins.innerHTML = m;
	      hours.innerHTML = h;
	      days.innerHTML = d;
	    }

	    function wrapWithZero(string) {
	      string = string + "";

	      if (string.length < 2) {
	        string = "0" + string;
	      }
	      return string;
	    }
	  }

	  function hideCryptoMachineElements() {
	    const crypto = document.getElementById("crypto");
	    crypto.setAttribute("opacity", "0");
	  }

	  function hideNotebookElements() {
	    const notebook = document.getElementById("notebook");
	    const pages = document.querySelectorAll("[id^='page']");
	    const underlayer = document.getElementById("layer-1");

	    pages.forEach(page => page.setAttribute("opacity", "0"));
	    notebook.setAttribute("opacity", "0");
	    underlayer.setAttribute("opacity", "0");
	  }

	  function initSlider() {
	    if (isMobile()) {
	      $(".how-it-works__cards").owlCarousel({
	        items: 1,
	        margin: 30,
	        padding: 30
	      });
	    } else {
	      $(".how-it-works__cards").trigger("destroy.owl.carousel");
	    }
	  }

	  function animateMap() {
	    const dots = document.querySelector(".dots");

	    Array.from(dots.childNodes).forEach(dot => {
	      const path = dot.querySelector("path");
	      path.setAttribute("opacity", "1");
	      path.innerHTML = createAnimationElement("animate", {
	        "xlink:href": "#" + path.id,
	        attributeName: "opacity",
	        dur: `${Math.random() * 2 + 0.5}s`,
	        from: "1",
	        to: "0",
	        repeatCount: "indefinite",
	        begin: "dots-anim.end + .2s"
	      }).outerHTML;
	    });
	  }

	  function hideMapElements() {
	    const lines = document.querySelector("#lines");
	    const dots = map.querySelector(".dots");
	    const lands = document.querySelector("#land-parts");

	    lines.setAttribute("opacity", "1");
	    dots.setAttribute("opacity", "1");
	    lands.setAttribute("opacity", "1");
	  }

	  function createAnimationElement(animationElement, config) {
	    if (!config) {
	      return;
	    }

	    const animation = document.createElement(animationElement);
	    for (let option in config) {
	      animation.setAttribute(option, config[option]);
	    }

	    return animation;
	  }

	  function animateCryptoMachine() {
	    const cryptoMachine = document.querySelector("#crypto");

	    const circles = cryptoMachine.querySelectorAll(".circle");
	    const substrates = cryptoMachine.querySelectorAll(".substrate");

	    initAnimatedLines(cryptoMachine);

	    substrates.forEach((substrate, index) => {
	      substrate.setAttribute("id", `substrate-${index}`);
	      substrate.setAttribute("opacity", "0");
	      const animation = createAnimationElement("animate", {
	        "xlink:href": `#substrate-${index}`,
	        attributeName: "opacity",
	        dur: `2s`,
	        from: "0",
	        to: "1",
	        begin: "crypto-anim.end + .5s",
	        fill: "freeze"
	      });
	      addAnimationToSvgElement(substrate, animation);
	    });

	    circles.forEach((circle, index) => {
	      circle.setAttribute("id", `circle-${index}`);
	      circle.setAttribute("opacity", "0");
	      const animation = createAnimationElement("animate", {
	        "xlink:href": `#circle-${index}`,
	        attributeName: "opacity",
	        dur: `${Math.random() * 3 + 1}s`,
	        values: ".5; .6; 1; .7; .4",
	        begin: "crypto-anim.end + .5s",
	        repeatCount: "indefinite"
	      });
	      addAnimationToSvgElement(circle, animation);
	    });
	  }

	  function initAnimatedLines(root) {
	    createAnimatedLine("#line-1", 0.001, 10);
	    createAnimatedLine("#line-2", 0.1, 20);
	    createAnimatedLine("#line-3", 0.2, 50);
	    createAnimatedLine("#line-4", 0.3, 50);
	    createAnimatedLine("#line-5", 0.4, 40);
	    createAnimatedLine("#line-6", 0.5, 10);

	    function createAnimatedLine(lineId, delay, movingHeight) {
	      const line = root.querySelector(lineId);
	      const lineAnimationConfig = createAnimationElement("animateTransform", {
	        attributeName: "transform",
	        dur: `2s`,
	        begin: `crypto-anim.end + ${delay}s`,
	        type: "translate",
	        values: `0 0; 0 -${movingHeight}; 0 0; 0 ${movingHeight}; 0 0;`,
	        repeatCount: "indefinite"
	      });

	      addAnimationToSvgElement(line, lineAnimationConfig);
	    }
	  }

	  function addAnimationToSvgElement(element, animation) {
	    element.innerHTML = animation.outerHTML;
	  }

	  function initDesktopPopupInteraction() {
	    let decorativeFunction = debounce(isMouseOnWidget, 50);
	    let hasTapped = false;

	    document.body.addEventListener("mousemove", decorativeFunction);

	    function isMouseOnWidget(event) {
	      const posX = event.clientX,
	        posY = event.clientY;

	      const popup = document.querySelector(".home__modal");

	      const isOnWidget = isOnElement(posX, posY, ".home__right .widget");
	      const isOnButton = isOnElement(posX, posY, ".widget__button");
	      const isOnPopup = isOnElement(posX, posY, ".home__modal");
	      const isOnInput = isOnElement(posX, posY, ".widget__slider");

	      if (
	        (isOnWidget || isOnPopup) &&
	        !isOnButton &&
	        !isOnInput &&
	        !hasMouse()
	      ) {
	        document.body.classList.add("widget-on-hover");
	        popup.classList.add("showed");

	        if (!hasTapped) {
	          const tapLine = document.querySelector(".widget__tap-line");
	          tapLine.classList.add("tapped");

	          hasTouched = true;
	        }
	      } else {
	        const delay = 300;

	        setTimeout(() => {
	          document.body.classList.remove("widget-on-hover");
	          popup.classList.remove("showed");
	        }, delay);
	      }
	    }
	  }

	  function isOnElement(posX, posY, elementTag) {
	    const el = document.querySelector(elementTag);
	    const elPosInfo = el.getBoundingClientRect();

	    const el_x1 = elPosInfo.x;
	    const el_y1 = elPosInfo.y;
	    const el_x2 = el_x1 + elPosInfo.width;
	    const el_y2 = el_y1 + elPosInfo.height;

	    return posX >= el_x1 && posX <= el_x2 && posY >= el_y1 && posY <= el_y2;
	  }

	  function showPopup() {
	    const popup = document.querySelector(".home__modal");

	    document.body.classList.add("widget-on-hover");
	    popup.classList.add("showed");
	  }

	  function hideWidget() {
	    const widget = document.querySelector(".home__right .widget");
	    widget.classList.add("hidden");
	  }

	  function initMobilePopupInteraction() {
	    let touchstartX = 0;
	    let touchstartY = 0;
	    let touchendX = 0;
	    let touchendY = 0;

	    let hasSwiped = false;

	    const homeSection = document.querySelector(".home");

	    homeSection.addEventListener("touchstart", setStartTouchVariables, false);
	    homeSection.addEventListener("touchend", swipeHandler, false);

	    hidePopupsAndWidgetBorderBottom();

	    function setStartTouchVariables(event) {
	      touchstartX = event.changedTouches[0].screenX;
	      touchstartY = event.changedTouches[0].screenY;
	    }

	    function hidePopupsAndWidgetBorderBottom() {
	      const popupTopSection = document.querySelector(
	        ".home__modal .widget__top"
	      );
	      const widgetTopSection = document.querySelector(
	        ".home__right .widget__top"
	      );

	      popupTopSection.classList.add("no-border");
	      widgetTopSection.classList.add("no-border");
	    }

	    function swipeHandler(event) {
	      const widget = document.querySelector(".home__right .widget");
	      const popup = document.querySelector(".home__modal");

	      touchendX = event.changedTouches[0].screenX;
	      touchendY = event.changedTouches[0].screenY;
	      target = event.target;

	      const isSwipeIsShorterThenQuarter =
	        Math.abs(touchendX - touchstartX) <= window.innerWidth / 4;

	      if (isSwipeIsShorterThenQuarter) {
	        return;
	      } else if (touchendX >= touchstartX) {
	        if (isUserSwipeWasOnWidget()) {
	          showPopup();
	          hideWidget();
	        }

	        if (!hasSwiped) {
	          const swapLine = document.querySelector(".widget__swipe-line");
	          swapLine.classList.add("widget__swipe-line--no-title");

	          hasSwiped = true;
	        }
	      } else {
	        /**
	         * Hide popup
	         */
	        if (isUserSwipeWasOnWidget()) {
	          document.body.classList.remove("widget-on-hover");
	          popup.classList.remove("showed");
	          widget.classList.remove("hidden");
	        }
	      }

	      function isUserSwipeWasOnWidget() {
	        return target.closest(".widget");
	      }
	    }
	  }

	  function debounce(f, ms) {
	    let timer = null;

	    return function(...args) {
	      const onComplete = () => {
	        f.apply(this, args);
	        timer = null;
	      };

	      if (timer) {
	        clearTimeout(timer);
	      }

	      timer = setTimeout(onComplete, ms);
	    };
	  }

	  function addEventListeners() {
	    const slider = document.querySelector(".slider");
	    const summary = document.querySelector(".widget__current-summary .summary");

	    /**
	     * Bind a slider data changing with a view
	     */
	    slider.addEventListener(
	      "change",
	      event => (summary.innerHTML = event.currentTarget.value)
	    );

	    if (isDesktop() && isDocumentFrozen()) {
	      const howItWorksSection = document.querySelector(".how-it-works");
	      howItWorksSection.classList.add("opacify");
	      document.body.addEventListener("mousewheel", scrollToSection, {
	        passive: true
	      });
	    }

	    if (isMobile()) {
	      window.addEventListener("resize", initSlider);
	    }

	    if (!isMobile()) {
	      window.addEventListener("scroll", () => {
	        const header = document.querySelector(".header");
	        if (header.getBoundingClientRect().bottom < window.pageYOffset) {
	          header.classList.add("fixed");
	        } else {
	          header.classList.remove("fixed");
	        }
	      });
	    }

	    window.dispatchEvent(new Event("scroll"));

	    addButtonsEventListeners();
	  }

	  function isDesktop() {
	    return window.innerWidth > 1200;
	  }

	  function scrollToSection() {
	    const scrollMouseTo = $("#scroll-to").offset().top;
	    const howItWorksSection = document.querySelector(".how-it-works");

	    const scrollTime = 900;
	    const delay = 500;

	    howItWorksSection.classList.remove("opacify");
	    hideMouse();

	    setTimeout(() => {
	      unfreezeDocument();
	      $("html, document.body").animate(
	        {
	          scrollTop: scrollMouseTo,
	          ease: "easeOutBack"
	        },
	        scrollTime
	      );
	    }, delay);

	    document.body.removeEventListener("mousewheel", scrollToSection);
	  }

	  function isDocumentFrozen() {
	    return document.body.classList.contains("no-scroll");
	  }

	  function unfreezeDocument() {
	    document.body.classList.remove("no-scroll");
	    document.querySelector("html").classList.remove("no-scroll");
	  }

	  function removeLoader() {
	    const loaderHTML = document.querySelector(".chose-language-wrapper");
	    const timeToLoaderHide = 2000;
	    loaderHTML.classList.add("removed");

	    // if (!isDesktop()) {
	    //   unfreezeDocument();
	    // }

	    setTimeout(() => loaderHTML.remove(), timeToLoaderHide);
	  }

	  function freezeDocument() {
	    const scrollMouseTo = $("#scroll-to").offset().top;
	    if (
	      window.innerWidth >= 1200 &&
	      (scrollMouseTo * 10) / 10 >= window.pageYOffset
	    ) {
	      document.body.classList.add("no-scroll");
	      document.querySelector("html").classList.add("no-scroll");
	    } else {
	      const howItWorksSection = document.querySelector(".how-it-works");
	      howItWorksSection.classList.remove("opacify");

	      hideMouse();
	    }
	  }

	  function hideMouse() {
	    const mouse = document.getElementById("mouse");
	    mouse.classList.add("scaled");
	  }

	  function hasMouse() {
	    return !document.getElementById("mouse").classList.contains("scaled");
	  }

	  function addButtonsEventListeners() {
	    const buttons = document.querySelectorAll(".button--scroll-to-top");
	    buttons.forEach(button => button.addEventListener("click", scrollToTop));
	  }

	  function scrollToTop() {
	    let to = 0;

	    if (isMobile()) {
	      const widget = document.querySelector(".home__right .widget");
	      const widgetElementData = widget.getBoundingClientRect();

	      to = widgetElementData.height / 2;
	    }

	    $("html, body").animate(
	      {
	        scrollTop: to,
	        ease: "easeOutBack"
	      },
	      900
	    );
	  }

	  function initAnimations() {
	    /**
	     * Setup your Lazy Line element.
	     * see README file for more settings
	     */
	    const animationsConfig = {
	      ease: "easeInQuad",
	      strokeWidth: 0.5,
	      strokeOpacity: 1,
	      strokeColor: "#ffffff"
	    };

	    const logoAnimationsConfig = {
	      ease: "easeInQuad",
	      strokeWidth: 4,
	      strokeOpacity: 1,
	      strokeColor: "#ffffff"
	    };

	    let teamIcon = document.querySelector("#team");
	    let calendarIcon = document.querySelector("#calendar");
	    let logoIcon = document.querySelector("#logo");

	    let teamIconAnimation = new LazyLinePainter(teamIcon, animationsConfig);
	    let calendarIconAnimation = new LazyLinePainter(
	      calendarIcon,
	      animationsConfig
	    );
	    let logoIconAnimation = new LazyLinePainter(logoIcon, logoAnimationsConfig);

	    teamIconAnimation.paint();
	    calendarIconAnimation.paint();
	    logoIconAnimation.paint();
	  }



	  function showIcons() {
	    const boardImages = document.querySelectorAll(".board__image svg");

	    boardImages.forEach(image => {
	      const opacifyElements = image.querySelectorAll("[fill-opacity]");
	      opacifyElements.forEach(opElement =>
	        opElement.setAttribute("fill-opacity", "1")
	      );
	    });
	  }

	  function isMac() {
	    return navigator.platform.match(/(Mac|iPhone|iPod|iPad)/i) ? true : false;
	  }

	  function addLanguageButtonsEventListeners() {
	    const languageButtons = document.querySelector(
	      ".chose-language__languages"
	    );

	    showLanguageChoseMenu();

	    languageButtons.addEventListener("click", event => {
	      const KOREAN = "chose-language__language--korean";
	      const clickedButton = event.target;

	      if (clickedButton.classList.contains(KOREAN)) {
	        translateToKorean("KOR");
	        document.body.classList.add("kor");
	      }

	      hideLanguageChoseMenu();

	      if (!isMobile() && !isMac()) {
	        initAnimations();
	      } else {
	        showIcons();
	      }
	    });

	    function showLanguageChoseMenu() {
	      document.body.classList.add("preloader");
	    }

	    function hideLanguageChoseMenu() {
	      setTimeout(() => {
	        removeLoader();
	        document.body.classList.remove("preloader");
	        
	        initWayPointsInteraction();
	      }, 1500);
	    }
	  }

	  function translateToKorean(lang = "ENG") {
	    const koreanData = [
	      "세계 최초의 테조스 c2c <br> 글로벌 거래소",
	      "투자자 되기",
	      "투자자 되기",
	      "히든토큰 구매",
	      "투자",
	      "X 토큰은 17 000 000 개의 토큰에서 제외됩니다.",
	      "ICO 투자",
	      "테조스 베이킹. 지금까지 채굴은 결코 쉬운게 아니였습니다. 히든비트는 테조스베이킹이 가능한 거래소입니다.테조스 베이커가 될수있는 기회를 놓치지 마십시오.히든비트를 통해 연5.5% 테조스 베이킹 수익을 실현하십시오.",
	      "모금액",
	      "설립자",
	      "지속",
	      "작동원리",
	      "프리세일 타이머",
	      "일",
	      "시",
	      "분",
	      "초",
	      "1",
	      "HID = ",
	      "0.15$",
	      "총 17 000 000 토큰중 현재 B토큰이 남았습니다.",
	      "세계 최초의 테조스 마켓",
	      "Hiddenbit 거래소에서는 거래의 각면에 업체 및 수수료를 부과합니다. 자산 (즉, 자산을 팔아 유동성을 제공하는 사람)이 0.25 %에 더 가깝게 지불하는 동안, 테이커의 수수료는 일반적으로 평균 0.5-0.75 % 높습니다. 통상적으로,이 수수료는 거래가 실행되는 시점에서 공제됩니다",
	      "시장을 위한 USP",
	      "독특한 판매 제안은 HID가 Hiddenbit 디지털 자산 Exchange 플랫폼에 의한 권위있는 지정을 가진 단일 권위있는 공식 토큰이며 모든 사용자가 자신의 활성 플랫폼 활동에서 해당 HID 보상을받을 수 있다는 것입니다. 고객은 HID의 정기 통계를 통해 HID 수에 비례하여 해당 비율의 보유 비중에 따라 배당금을 수령 할 수 있으며 수익을 향유 할 수 있습니다.",
	      "투표권",
	      "Hidden 토큰 소지자는 공개 투표권을 행사할 수 있습니다. 100 개의 Hidden 토큰은 1 개의 투표권과 같습니다. 전반적으로 사용자에게 정기적으로 배당 수익을 제공하기 위해 HID는 사용자가 플랫폼 의사 결정 프로세스에 참여할 수있는 기회를 얻을 수 있도록합니다.",
	      "코인 에어드랍",
	      "ICO 참여를 위한 모바일 및 IOS 설치시 부과되는 비용은 이후 보너스로 환급됩니다.",
	      "히든비트는 당신의 성공으로 안내합니다.",
	      "토큰 소지비율이 증가함에 따라 지급되는 보너스 또한 증가합니다. 토큰 홀더들에게 거래수수료의 80%를 토큰비율에 따라 환급됩니다.",
	      "모든것이 가까이에 있습니다.",
	      "우리는 글로벌 Exchanges UI처럼 토큰 홀더 비율로 지불 할 수있는 거래 수수료를 통해 간단한 인터페이스로 가장 쉬운 사용법을 제공합니다. 마지막으로 이익을 얻으려는 방법은 모두 당신의 손에 달려 있습니다.",
	      "백지",
	      "새로운 히든비트 백서를 공유할수 있어 기쁩니다.이백서는 피아트 통합을 통한 새로운 마이닝거래소를 소개하고 있습니다:Proof-of-Replication (PoR) and Proof-of-Spacetime (PoSt)",
	      "히든비트 백서보기",
	      "에어드랍",
	      "ICO 이후, 우리는 100 ETH 이상 또는 그와 동등한 금액을 비트 동전으로 기부 한 모든 참가자들에게 추첨을 실시 할 것입니다. 보너스는 다음 비율로 배분됩니다.",
	      "레벨과 보너스율은 기본가격과 별도로 적용됩니다.",
	      "히든비트 토큰은 첫거래부터 스마트컨트랙트를 통해 프로그래밍 됩니다.",
	      "More than, ETH",
	      "추가 HID 코인,%",
	      "SALE",
	      "Pre-sale",
	      "ICO",
	      "판매수량",
	      "세일",
	      "보너스",
	      "가격",
	      "1eth",
	      "하드캡",
	      "채굴수량이 어떻게 되는가?",
	      "첫베이커 중 한 명이되기 위한 기회를 놓치지 마십시오. 처음 12 개월 내에 베이킹을 통해 연 5.5%의 수익을 올리십시오. 당신의 첫 해 동안 가장 많은 이익을 남긴 코인을 재 베이킹을 통해 수익을 최대화 하십시오. 우리는 2019 년 최저 수준에서 베이킹의 복잡성을 줄이기 위해 최선을 다하고 있습니다.히든비트는 현금으로 가득 차고 계산의 복잡성이 증가 할 때까지 간단한 기본 처리 능력으로도 얻을 수있는 기회를 제공합니다. 베이킹에서 사용할 수있는 가장 많은 양의 동전으로 각 블록 당 최고 행운을 남깁니다. PoS방식은 많은 노력을 기울일 필요가 없습니다. PoS방식은 문명화 된 채굴 버전으로 현대 금융 상품과 공통점이 있습니다. PoS에서는 지갑에 보관 된 코인의 크기가 새로운 지갑을 얻는 기회를 증가시키기 때문에 계정에 가장 많은 코인이있는 첫 번째 참가자가 될 수 있습니다",
	      "1개월~12개월 - ",
	      "2 859 302.84 코인",
	      "13개월~24개월 - ",
	      "1 429 651,42 코인",
	      "25개월~35개월- ",
	      "714,825.71 코인",
	      "36개월 - ",
	      "669,466.07 코인",
	      "로드맵",
	      "계획 및 개발",
	      "베타버전 런칭",
	      "거래소 런칭",
	      "글로벌 TOP10 거래소 선정",
	      "히든 코인이 거래되는 최고의 거래소",
	      "24 × 7 지원 서비스",
	      "문의사항이 있으신경우, 언제든 답변해 드리겠습니다.",
	      "히든비트 거래소 둘러보기",
	      "히든비트 거래소 백서",
	      "복제방지",
	      "2019 연구 로드맵",
	      " 10억",
	      "전원 결함 허용"
	    ];

	    const textElements = [
	      getElement(".home .info__title"),
	      getElement(".header__button"),
	      getElement(".support__button"),
	      getElement(".home__modal .widget__button"),
	      getElement(".home__right .widget__logo .text"),
	      getElement(".home__right .widget__info .text"),
	      getElement(".home__right .widget__button"),
	      getElement(".home .info__description"),
	      getElement(".home .board__item--1 .board__title"),
	      getElement(".home .board__item--2 .board__title"),
	      getElement(".home .board__item--3 .board__title"),
	      getElement(".how-it-works__title"),
	      getElement(".home__modal .widget__title"),
	      getElement(".timer__days"),
	      getElement(".timer__hours"),
	      getElement(".timer__minutes"),
	      getElement(".timer__sec"),
	      getElement(".home__modal .widget__info .coin__number"),
	      getElement(".home__modal .widget__info .text"),
	      getElement(".home__modal .widget__info .coin__price"),
	      getElement(".home__modal .widget__info--2 .text"),
	      getElement(".card--1 .card__title"),
	      getElement(".card--1 .card__info"),
	      getElement(".card--2 .card__title"),
	      getElement(".card--2 .card__info"),
	      getElement(".card--3 .card__title"),
	      getElement(".card--3 .card__info"),
	      getElement(".card--4 .card__title"),
	      getElement(".card--4 .card__info"),
	      getElement(".card--5 .card__title"),
	      getElement(".card--5 .card__info"),
	      getElement(".card--6 .card__title"),
	      getElement(".card--6 .card__info"),
	      getElement(".whitepaper__title"),
	      getElement(".whitepaper__info"),
	      getElement(".whitepaper__button"),
	      getElement(".airdrop__title"),
	      getElement(".airdrop__info"),
	      getElement(".airdrop__additional-info"),
	      getElement(".release__title"),
	      getElement(".airdrop__table .table__column--1"),
	      getElement(".airdrop__table .table__column--2"),
	      getElement(".release .table__header .table__column"),
	      getElement(".release .table__row--1 .table__column--2"),
	      getElement(".release .table__row--1 .table__column--3"),
	      getElement(".release .table__row--2 .table__column--1"),
	      getElement(".release .table__row--3 .table__column--1"),
	      getElement(".release .table__row--4 .table__column--1"),
	      getElement(".release .table__row--5 .table__column--1"),
	      getElement(".release .table__row--6 .table__column--1"),
	      getElement(".release .table__row--7 .table__column--1"),
	      getElement(".for-miners__title"),
	      getElement(".for-miners__info"),
	      getElement(".for-miners__right .list__item--1 .text"),
	      getElement(".for-miners__right .list__item--1 .coins"),
	      getElement(".for-miners__right .list__item--2 .text"),
	      getElement(".for-miners__right .list__item--2 .coins"),
	      getElement(".for-miners__right .list__item--3 .text"),
	      getElement(".for-miners__right .list__item--3 .coins"),
	      getElement(".for-miners__right .list__item--4 .text"),
	      getElement(".for-miners__right .list__item--4 .coins"),
	      getElement(".road-map__title"),
	      getElement(".road-map .plan--1"),
	      getElement(".road-map .plan--3"),
	      getElement(".road-map .plan--4"),
	      getElement(".road-map .plan--5"),
	      getElement(".exchanges__title"),
	      getElement(".support__title"),
	      getElement(".support__info"),
	      getElement(".research__title"),
	      getElement(".research__items .item--1 .item__title"),
	      getElement(".research__items .item--2 .item__title"),
	      getElement(".research__items .item--4 .item__title"),
	      getElement(".release .table__row--7 .table__column--2 .text"),
	      getElement(".road-map .plan--2")
	    ];

	    if (lang !== "ENG") {
	      setContent(textElements, koreanData);
	    }

	    function getElement(className) {
	      return document.querySelector(className);
	    }

	    function setContent(elements, content) {
	      elements.forEach((el, index) => {
	        const cont = content[index];
	        try {
	          /**
	           * H2 data
	           */
	          if (el.hasAttribute("data-title")) {
	            el.innerHTML = cont;
	            el.setAttribute("data-title", cont);
	          } else if (el.classList.contains("plan")) {
	            /**
	             * Plan lines data
	             */
	            el.setAttribute("data-plan-description", cont);
	          } else if (el.hasAttribute("data-name")) {
	            /**
	             * Timer data
	             */
	            el.setAttribute("data-name", cont);
	          } else if (cont !== "") {
	            el.innerHTML = cont;
	          }
	        } catch (e) {
	          console.log("Error element index :", index);
	        }
	      });
	    }
	  }
	});


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZTQ5ZDkwZWEzMzQxYTQ1NDgwZmMiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvc2NyaXB0cy9cIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBlNDlkOTBlYTMzNDFhNDU0ODBmYyIsImRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsICgpID0+IHtcclxuICAvKipcclxuICAgKiBSZW1vdmUgdGhlIGxvYWRlciB3aGVuIGFsbCBzY3JpcHQgaGF2ZSBiZWVuIGxvYWRlZFxyXG4gICAqL1xyXG5cclxuICBpbml0KCk7XHJcbiAgYWRkTGFuZ3VhZ2VCdXR0b25zRXZlbnRMaXN0ZW5lcnMoKTtcclxuXHJcbiAgZnVuY3Rpb24gaW5pdCgpIHtcclxuICAgIGZyZWV6ZURvY3VtZW50KCk7XHJcbiAgICBhZGRFdmVudExpc3RlbmVycygpO1xyXG4gICAgXHJcbiAgICBpbml0U2xpZGVyKCk7XHJcblxyXG4gICAgaWYgKGlzTW9iaWxlKCkpIHtcclxuICAgICAgaW5pdE1vYmlsZVBvcHVwSW50ZXJhY3Rpb24oKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGhpZGVJbGx1c3RyYXRpb25zKCk7XHJcbiAgICAgIGluaXREZXNrdG9wUG9wdXBJbnRlcmFjdGlvbigpO1xyXG4gICAgfVxyXG5cclxuICAgIGluaXRUaW1lcigpO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gaGlkZUlsbHVzdHJhdGlvbnMoKSB7XHJcbiAgICBoaWRlQ3J5cHRvTWFjaGluZUVsZW1lbnRzKCk7XHJcbiAgICBoaWRlTm90ZWJvb2tFbGVtZW50cygpO1xyXG4gICAgaGlkZU1hcEVsZW1lbnRzKCk7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBpbml0V2F5UG9pbnRzSW50ZXJhY3Rpb24oKSB7XHJcbiAgICBsZXQgcm9hZE1hcFJlYWNoZWQgPSBmYWxzZTtcclxuICAgIGxldCBub3RlYm9va1JlYWNoZWQgPSBmYWxzZTtcclxuICAgIGxldCBzdXBwb3J0UmVhY2hlZCA9IGZhbHNlO1xyXG4gICAgbGV0IGFpckRyb3BSZWFjaGVkID0gZmFsc2U7XHJcblxyXG4gICAgbGV0IHJvYWRtYXAgPSBuZXcgV2F5cG9pbnQoe1xyXG4gICAgICBlbGVtZW50OiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnJvYWQtbWFwXCIpLFxyXG4gICAgICBoYW5kbGVyOiBmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAoIXJvYWRNYXBSZWFjaGVkKSB7XHJcbiAgICAgICAgICByb2FkTWFwUmVhY2hlZCA9IHRydWU7XHJcbiAgICAgICAgICBjb25zdCByb2FkTGluZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucm9hZC1tYXBfX2xpbmVcIik7XHJcbiAgICAgICAgICBjb25zdCBwbGFuTGluZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnBsYW5fX3JvYWQtbGluZVwiKTtcclxuICAgICAgICAgIGNvbnN0IHBsYW5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5wbGFuXCIpO1xyXG4gICAgICAgICAgY29uc3QgY2lyY2xlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucGxhbl9fY2lyY2xlXCIpO1xyXG5cclxuICAgICAgICAgIHJvYWRMaW5lLmNsYXNzTGlzdC5hZGQoXCJzaG93ZWRcIik7XHJcbiAgICAgICAgICBjb25zdCBkZWxheSA9IDUwMDtcclxuXHJcbiAgICAgICAgICBwbGFuTGluZXMuZm9yRWFjaCgocGwsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IF9kZWxheSA9IGRlbGF5ICsgMTAwICogaW5kZXg7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgIHBsLmNsYXNzTGlzdC5hZGQoXCJzaG93ZWRcIik7XHJcbiAgICAgICAgICAgICAgY2lyY2xlc1tpbmRleF0uY2xhc3NMaXN0LmFkZChcInNob3dlZFwiKTtcclxuICAgICAgICAgICAgICBwbGFuc1tpbmRleF0uY2xhc3NMaXN0LmFkZChcInNob3dlZFwiKTtcclxuICAgICAgICAgICAgfSwgX2RlbGF5KTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfSxcclxuICAgICAgb2Zmc2V0OiBcIjQwJVwiXHJcbiAgICB9KTtcclxuXHJcbiAgICBsZXQgbm90ZWJvb2sgPSBuZXcgV2F5cG9pbnQoe1xyXG4gICAgICBlbGVtZW50OiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLndoaXRlcGFwZXJcIiksXHJcbiAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmICghbm90ZWJvb2tSZWFjaGVkKSB7XHJcbiAgICAgICAgICBub3RlYm9va1JlYWNoZWQgPSB0cnVlO1xyXG4gICAgICAgICAgY29uc29sZS5sb2coJ2luaXQnKTtcclxuICAgICAgICAgIGNvbnN0IHRyaWdnZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm5vdGVib29rXCIpO1xyXG4gICAgICAgICAgY29uc3QgdHJpZ2dlckFuaW1hdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWFpblwiKTtcclxuXHJcbiAgICAgICAgICBpZiAoIWlzTW9iaWxlKCkpIHtcclxuICAgICAgICAgICAgdHJpZ2dlci5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudChcImNsaWNrXCIpKTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICB0cmlnZ2VyQW5pbWF0aW9uLnJlbW92ZUF0dHJpYnV0ZShcImJlZ2luXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSxcclxuICAgICAgb2Zmc2V0OiBcIjEwMCVcIlxyXG4gICAgfSk7XHJcblxyXG4gICAgbGV0IHN1cHBvcnQgPSBuZXcgV2F5cG9pbnQoe1xyXG4gICAgICBlbGVtZW50OiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnN1cHBvcnRcIiksXHJcbiAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmICghc3VwcG9ydFJlYWNoZWQpIHtcclxuICAgICAgICAgIHN1cHBvcnRSZWFjaGVkID0gdHJ1ZTtcclxuICAgICAgICAgIGNvbnN0IHRyaWdnZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2xhbmQtcGFydHNcIik7XHJcbiAgICAgICAgICBjb25zdCB0cmlnZ2VyQW5pbWF0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNsYW5kLXBhcnRzLWFuaW1cIik7XHJcblxyXG4gICAgICAgICAgaWYgKCFpc01vYmlsZSgpKSB7XHJcbiAgICAgICAgICAgIGFuaW1hdGVNYXAoKTtcclxuICAgICAgICAgICAgdHJpZ2dlci5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudChcImNsaWNrXCIpKTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICB0cmlnZ2VyQW5pbWF0aW9uLnJlbW92ZUF0dHJpYnV0ZShcImJlZ2luXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSxcclxuICAgICAgb2Zmc2V0OiBcIjQwJVwiXHJcbiAgICB9KTtcclxuXHJcbiAgICBsZXQgYWlyZHJvcCA9IG5ldyBXYXlwb2ludCh7XHJcbiAgICAgIGVsZW1lbnQ6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWlyZHJvcFwiKSxcclxuICAgICAgaGFuZGxlcjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKCFhaXJEcm9wUmVhY2hlZCkge1xyXG4gICAgICAgICAgYWlyRHJvcFJlYWNoZWQgPSB0cnVlO1xyXG4gICAgICAgICAgY29uc3QgdHJpZ2dlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY3J5cHRvXCIpO1xyXG4gICAgICAgICAgY29uc3QgdHJpZ2dlckFuaW1hdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY3J5cHRvLWFuaW1cIik7XHJcblxyXG4gICAgICAgICAgaWYgKCFpc01vYmlsZSgpKSB7XHJcbiAgICAgICAgICAgIGFuaW1hdGVDcnlwdG9NYWNoaW5lKCk7XHJcbiAgICAgICAgICAgIHRyaWdnZXIuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoXCJjbGlja1wiKSk7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgdHJpZ2dlckFuaW1hdGlvbi5yZW1vdmVBdHRyaWJ1dGUoXCJiZWdpblwiKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICAgIG9mZnNldDogXCIxMDAlXCJcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gaXNNb2JpbGUoKSB7XHJcbiAgICByZXR1cm4gd2luZG93LmlubmVyV2lkdGggPD0gNjUwO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gaW5pdFRpbWVyKHllYXIsIG1vbnRoLCB3ZWVrLCBkYXkpIHtcclxuICAgIGNvbnN0IHRpbWVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50aW1lclwiKTtcclxuICAgIGNvbnN0IGRheXMgPSB0aW1lci5xdWVyeVNlbGVjdG9yKFwiLnRpbWVyX19kYXlzXCIpO1xyXG4gICAgY29uc3QgbWlucyA9IHRpbWVyLnF1ZXJ5U2VsZWN0b3IoXCIudGltZXJfX21pbnV0ZXNcIik7XHJcbiAgICBjb25zdCBzZWNzID0gdGltZXIucXVlcnlTZWxlY3RvcihcIi50aW1lcl9fc2Vjb25kc1wiKTtcclxuICAgIGNvbnN0IGhvdXJzID0gdGltZXIucXVlcnlTZWxlY3RvcihcIi50aW1lcl9faG91cnNcIik7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJbml0aWFsaXphdGlvblxyXG4gICAgICovXHJcblxyXG4gICAgZGF5cy5pbm5lckhUTUwgPSB3cmFwV2l0aFplcm8oMTUpO1xyXG4gICAgbWlucy5pbm5lckhUTUwgPSB3cmFwV2l0aFplcm8oMCk7XHJcbiAgICBzZWNzLmlubmVySFRNTCA9IHdyYXBXaXRoWmVybygwKTtcclxuICAgIGhvdXJzLmlubmVySFRNTCA9IHdyYXBXaXRoWmVybygwKTtcclxuXHJcbiAgICBzZXRJbnRlcnZhbChkZWNyZWFzZSwgMTAwMCk7XHJcblxyXG4gICAgZnVuY3Rpb24gZGVjcmVhc2UoKSB7XHJcbiAgICAgIGNvbnN0IHRpbWVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50aW1lclwiKTtcclxuICAgICAgY29uc3QgZGF5cyA9IHRpbWVyLnF1ZXJ5U2VsZWN0b3IoXCIudGltZXJfX2RheXNcIik7XHJcbiAgICAgIGNvbnN0IG1pbnMgPSB0aW1lci5xdWVyeVNlbGVjdG9yKFwiLnRpbWVyX19taW51dGVzXCIpO1xyXG4gICAgICBjb25zdCBzZWNzID0gdGltZXIucXVlcnlTZWxlY3RvcihcIi50aW1lcl9fc2Vjb25kc1wiKTtcclxuICAgICAgY29uc3QgaG91cnMgPSB0aW1lci5xdWVyeVNlbGVjdG9yKFwiLnRpbWVyX19ob3Vyc1wiKTtcclxuXHJcbiAgICAgIGxldCBzID0gK3NlY3MuaW5uZXJIVE1MLFxyXG4gICAgICAgIG0gPSArbWlucy5pbm5lckhUTUwsXHJcbiAgICAgICAgaCA9ICtob3Vycy5pbm5lckhUTUwsXHJcbiAgICAgICAgZCA9ICtkYXlzLmlubmVySFRNTDtcclxuXHJcbiAgICAgIGlmIChzID4gMCkgLS1zO1xyXG5cclxuICAgICAgaWYgKHMgPT09IDApIHtcclxuICAgICAgICBzID0gNTk7XHJcbiAgICAgICAgaWYgKG0gPiAwKSBtLS07XHJcbiAgICAgIH1cclxuICAgICAgaWYgKG0gPT09IDApIHtcclxuICAgICAgICBtID0gNTk7XHJcbiAgICAgICAgaWYgKGggPiAwKSBoLS07XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGggPT09IDApIHtcclxuICAgICAgICBoID0gMjM7XHJcbiAgICAgICAgaWYgKGQgPiAwKSBkLS07XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHNlY3MuaW5uZXJIVE1MID0gcztcclxuICAgICAgbWlucy5pbm5lckhUTUwgPSBtO1xyXG4gICAgICBob3Vycy5pbm5lckhUTUwgPSBoO1xyXG4gICAgICBkYXlzLmlubmVySFRNTCA9IGQ7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gd3JhcFdpdGhaZXJvKHN0cmluZykge1xyXG4gICAgICBzdHJpbmcgPSBzdHJpbmcgKyBcIlwiO1xyXG5cclxuICAgICAgaWYgKHN0cmluZy5sZW5ndGggPCAyKSB7XHJcbiAgICAgICAgc3RyaW5nID0gXCIwXCIgKyBzdHJpbmc7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHN0cmluZztcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGhpZGVDcnlwdG9NYWNoaW5lRWxlbWVudHMoKSB7XHJcbiAgICBjb25zdCBjcnlwdG8gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNyeXB0b1wiKTtcclxuICAgIGNyeXB0by5zZXRBdHRyaWJ1dGUoXCJvcGFjaXR5XCIsIFwiMFwiKTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGhpZGVOb3RlYm9va0VsZW1lbnRzKCkge1xyXG4gICAgY29uc3Qgbm90ZWJvb2sgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm5vdGVib29rXCIpO1xyXG4gICAgY29uc3QgcGFnZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiW2lkXj0ncGFnZSddXCIpO1xyXG4gICAgY29uc3QgdW5kZXJsYXllciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibGF5ZXItMVwiKTtcclxuXHJcbiAgICBwYWdlcy5mb3JFYWNoKHBhZ2UgPT4gcGFnZS5zZXRBdHRyaWJ1dGUoXCJvcGFjaXR5XCIsIFwiMFwiKSk7XHJcbiAgICBub3RlYm9vay5zZXRBdHRyaWJ1dGUoXCJvcGFjaXR5XCIsIFwiMFwiKTtcclxuICAgIHVuZGVybGF5ZXIuc2V0QXR0cmlidXRlKFwib3BhY2l0eVwiLCBcIjBcIik7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBpbml0U2xpZGVyKCkge1xyXG4gICAgaWYgKGlzTW9iaWxlKCkpIHtcclxuICAgICAgJChcIi5ob3ctaXQtd29ya3NfX2NhcmRzXCIpLm93bENhcm91c2VsKHtcclxuICAgICAgICBpdGVtczogMSxcclxuICAgICAgICBtYXJnaW46IDMwLFxyXG4gICAgICAgIHBhZGRpbmc6IDMwXHJcbiAgICAgIH0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgJChcIi5ob3ctaXQtd29ya3NfX2NhcmRzXCIpLnRyaWdnZXIoXCJkZXN0cm95Lm93bC5jYXJvdXNlbFwiKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGFuaW1hdGVNYXAoKSB7XHJcbiAgICBjb25zdCBkb3RzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kb3RzXCIpO1xyXG5cclxuICAgIEFycmF5LmZyb20oZG90cy5jaGlsZE5vZGVzKS5mb3JFYWNoKGRvdCA9PiB7XHJcbiAgICAgIGNvbnN0IHBhdGggPSBkb3QucXVlcnlTZWxlY3RvcihcInBhdGhcIik7XHJcbiAgICAgIHBhdGguc2V0QXR0cmlidXRlKFwib3BhY2l0eVwiLCBcIjFcIik7XHJcbiAgICAgIHBhdGguaW5uZXJIVE1MID0gY3JlYXRlQW5pbWF0aW9uRWxlbWVudChcImFuaW1hdGVcIiwge1xyXG4gICAgICAgIFwieGxpbms6aHJlZlwiOiBcIiNcIiArIHBhdGguaWQsXHJcbiAgICAgICAgYXR0cmlidXRlTmFtZTogXCJvcGFjaXR5XCIsXHJcbiAgICAgICAgZHVyOiBgJHtNYXRoLnJhbmRvbSgpICogMiArIDAuNX1zYCxcclxuICAgICAgICBmcm9tOiBcIjFcIixcclxuICAgICAgICB0bzogXCIwXCIsXHJcbiAgICAgICAgcmVwZWF0Q291bnQ6IFwiaW5kZWZpbml0ZVwiLFxyXG4gICAgICAgIGJlZ2luOiBcImRvdHMtYW5pbS5lbmQgKyAuMnNcIlxyXG4gICAgICB9KS5vdXRlckhUTUw7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGhpZGVNYXBFbGVtZW50cygpIHtcclxuICAgIGNvbnN0IGxpbmVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNsaW5lc1wiKTtcclxuICAgIGNvbnN0IGRvdHMgPSBtYXAucXVlcnlTZWxlY3RvcihcIi5kb3RzXCIpO1xyXG4gICAgY29uc3QgbGFuZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2xhbmQtcGFydHNcIik7XHJcblxyXG4gICAgbGluZXMuc2V0QXR0cmlidXRlKFwib3BhY2l0eVwiLCBcIjFcIik7XHJcbiAgICBkb3RzLnNldEF0dHJpYnV0ZShcIm9wYWNpdHlcIiwgXCIxXCIpO1xyXG4gICAgbGFuZHMuc2V0QXR0cmlidXRlKFwib3BhY2l0eVwiLCBcIjFcIik7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBjcmVhdGVBbmltYXRpb25FbGVtZW50KGFuaW1hdGlvbkVsZW1lbnQsIGNvbmZpZykge1xyXG4gICAgaWYgKCFjb25maWcpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGFuaW1hdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoYW5pbWF0aW9uRWxlbWVudCk7XHJcbiAgICBmb3IgKGxldCBvcHRpb24gaW4gY29uZmlnKSB7XHJcbiAgICAgIGFuaW1hdGlvbi5zZXRBdHRyaWJ1dGUob3B0aW9uLCBjb25maWdbb3B0aW9uXSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGFuaW1hdGlvbjtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGFuaW1hdGVDcnlwdG9NYWNoaW5lKCkge1xyXG4gICAgY29uc3QgY3J5cHRvTWFjaGluZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY3J5cHRvXCIpO1xyXG5cclxuICAgIGNvbnN0IGNpcmNsZXMgPSBjcnlwdG9NYWNoaW5lLnF1ZXJ5U2VsZWN0b3JBbGwoXCIuY2lyY2xlXCIpO1xyXG4gICAgY29uc3Qgc3Vic3RyYXRlcyA9IGNyeXB0b01hY2hpbmUucXVlcnlTZWxlY3RvckFsbChcIi5zdWJzdHJhdGVcIik7XHJcblxyXG4gICAgaW5pdEFuaW1hdGVkTGluZXMoY3J5cHRvTWFjaGluZSk7XHJcblxyXG4gICAgc3Vic3RyYXRlcy5mb3JFYWNoKChzdWJzdHJhdGUsIGluZGV4KSA9PiB7XHJcbiAgICAgIHN1YnN0cmF0ZS5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBgc3Vic3RyYXRlLSR7aW5kZXh9YCk7XHJcbiAgICAgIHN1YnN0cmF0ZS5zZXRBdHRyaWJ1dGUoXCJvcGFjaXR5XCIsIFwiMFwiKTtcclxuICAgICAgY29uc3QgYW5pbWF0aW9uID0gY3JlYXRlQW5pbWF0aW9uRWxlbWVudChcImFuaW1hdGVcIiwge1xyXG4gICAgICAgIFwieGxpbms6aHJlZlwiOiBgI3N1YnN0cmF0ZS0ke2luZGV4fWAsXHJcbiAgICAgICAgYXR0cmlidXRlTmFtZTogXCJvcGFjaXR5XCIsXHJcbiAgICAgICAgZHVyOiBgMnNgLFxyXG4gICAgICAgIGZyb206IFwiMFwiLFxyXG4gICAgICAgIHRvOiBcIjFcIixcclxuICAgICAgICBiZWdpbjogXCJjcnlwdG8tYW5pbS5lbmQgKyAuNXNcIixcclxuICAgICAgICBmaWxsOiBcImZyZWV6ZVwiXHJcbiAgICAgIH0pO1xyXG4gICAgICBhZGRBbmltYXRpb25Ub1N2Z0VsZW1lbnQoc3Vic3RyYXRlLCBhbmltYXRpb24pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgY2lyY2xlcy5mb3JFYWNoKChjaXJjbGUsIGluZGV4KSA9PiB7XHJcbiAgICAgIGNpcmNsZS5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBgY2lyY2xlLSR7aW5kZXh9YCk7XHJcbiAgICAgIGNpcmNsZS5zZXRBdHRyaWJ1dGUoXCJvcGFjaXR5XCIsIFwiMFwiKTtcclxuICAgICAgY29uc3QgYW5pbWF0aW9uID0gY3JlYXRlQW5pbWF0aW9uRWxlbWVudChcImFuaW1hdGVcIiwge1xyXG4gICAgICAgIFwieGxpbms6aHJlZlwiOiBgI2NpcmNsZS0ke2luZGV4fWAsXHJcbiAgICAgICAgYXR0cmlidXRlTmFtZTogXCJvcGFjaXR5XCIsXHJcbiAgICAgICAgZHVyOiBgJHtNYXRoLnJhbmRvbSgpICogMyArIDF9c2AsXHJcbiAgICAgICAgdmFsdWVzOiBcIi41OyAuNjsgMTsgLjc7IC40XCIsXHJcbiAgICAgICAgYmVnaW46IFwiY3J5cHRvLWFuaW0uZW5kICsgLjVzXCIsXHJcbiAgICAgICAgcmVwZWF0Q291bnQ6IFwiaW5kZWZpbml0ZVwiXHJcbiAgICAgIH0pO1xyXG4gICAgICBhZGRBbmltYXRpb25Ub1N2Z0VsZW1lbnQoY2lyY2xlLCBhbmltYXRpb24pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBpbml0QW5pbWF0ZWRMaW5lcyhyb290KSB7XHJcbiAgICBjcmVhdGVBbmltYXRlZExpbmUoXCIjbGluZS0xXCIsIDAuMDAxLCAxMCk7XHJcbiAgICBjcmVhdGVBbmltYXRlZExpbmUoXCIjbGluZS0yXCIsIDAuMSwgMjApO1xyXG4gICAgY3JlYXRlQW5pbWF0ZWRMaW5lKFwiI2xpbmUtM1wiLCAwLjIsIDUwKTtcclxuICAgIGNyZWF0ZUFuaW1hdGVkTGluZShcIiNsaW5lLTRcIiwgMC4zLCA1MCk7XHJcbiAgICBjcmVhdGVBbmltYXRlZExpbmUoXCIjbGluZS01XCIsIDAuNCwgNDApO1xyXG4gICAgY3JlYXRlQW5pbWF0ZWRMaW5lKFwiI2xpbmUtNlwiLCAwLjUsIDEwKTtcclxuXHJcbiAgICBmdW5jdGlvbiBjcmVhdGVBbmltYXRlZExpbmUobGluZUlkLCBkZWxheSwgbW92aW5nSGVpZ2h0KSB7XHJcbiAgICAgIGNvbnN0IGxpbmUgPSByb290LnF1ZXJ5U2VsZWN0b3IobGluZUlkKTtcclxuICAgICAgY29uc3QgbGluZUFuaW1hdGlvbkNvbmZpZyA9IGNyZWF0ZUFuaW1hdGlvbkVsZW1lbnQoXCJhbmltYXRlVHJhbnNmb3JtXCIsIHtcclxuICAgICAgICBhdHRyaWJ1dGVOYW1lOiBcInRyYW5zZm9ybVwiLFxyXG4gICAgICAgIGR1cjogYDJzYCxcclxuICAgICAgICBiZWdpbjogYGNyeXB0by1hbmltLmVuZCArICR7ZGVsYXl9c2AsXHJcbiAgICAgICAgdHlwZTogXCJ0cmFuc2xhdGVcIixcclxuICAgICAgICB2YWx1ZXM6IGAwIDA7IDAgLSR7bW92aW5nSGVpZ2h0fTsgMCAwOyAwICR7bW92aW5nSGVpZ2h0fTsgMCAwO2AsXHJcbiAgICAgICAgcmVwZWF0Q291bnQ6IFwiaW5kZWZpbml0ZVwiXHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgYWRkQW5pbWF0aW9uVG9TdmdFbGVtZW50KGxpbmUsIGxpbmVBbmltYXRpb25Db25maWcpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gYWRkQW5pbWF0aW9uVG9TdmdFbGVtZW50KGVsZW1lbnQsIGFuaW1hdGlvbikge1xyXG4gICAgZWxlbWVudC5pbm5lckhUTUwgPSBhbmltYXRpb24ub3V0ZXJIVE1MO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gaW5pdERlc2t0b3BQb3B1cEludGVyYWN0aW9uKCkge1xyXG4gICAgbGV0IGRlY29yYXRpdmVGdW5jdGlvbiA9IGRlYm91bmNlKGlzTW91c2VPbldpZGdldCwgNTApO1xyXG4gICAgbGV0IGhhc1RhcHBlZCA9IGZhbHNlO1xyXG5cclxuICAgIGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbW92ZVwiLCBkZWNvcmF0aXZlRnVuY3Rpb24pO1xyXG5cclxuICAgIGZ1bmN0aW9uIGlzTW91c2VPbldpZGdldChldmVudCkge1xyXG4gICAgICBjb25zdCBwb3NYID0gZXZlbnQuY2xpZW50WCxcclxuICAgICAgICBwb3NZID0gZXZlbnQuY2xpZW50WTtcclxuXHJcbiAgICAgIGNvbnN0IHBvcHVwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5ob21lX19tb2RhbFwiKTtcclxuXHJcbiAgICAgIGNvbnN0IGlzT25XaWRnZXQgPSBpc09uRWxlbWVudChwb3NYLCBwb3NZLCBcIi5ob21lX19yaWdodCAud2lkZ2V0XCIpO1xyXG4gICAgICBjb25zdCBpc09uQnV0dG9uID0gaXNPbkVsZW1lbnQocG9zWCwgcG9zWSwgXCIud2lkZ2V0X19idXR0b25cIik7XHJcbiAgICAgIGNvbnN0IGlzT25Qb3B1cCA9IGlzT25FbGVtZW50KHBvc1gsIHBvc1ksIFwiLmhvbWVfX21vZGFsXCIpO1xyXG4gICAgICBjb25zdCBpc09uSW5wdXQgPSBpc09uRWxlbWVudChwb3NYLCBwb3NZLCBcIi53aWRnZXRfX3NsaWRlclwiKTtcclxuXHJcbiAgICAgIGlmIChcclxuICAgICAgICAoaXNPbldpZGdldCB8fCBpc09uUG9wdXApICYmXHJcbiAgICAgICAgIWlzT25CdXR0b24gJiZcclxuICAgICAgICAhaXNPbklucHV0ICYmXHJcbiAgICAgICAgIWhhc01vdXNlKClcclxuICAgICAgKSB7XHJcbiAgICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKFwid2lkZ2V0LW9uLWhvdmVyXCIpO1xyXG4gICAgICAgIHBvcHVwLmNsYXNzTGlzdC5hZGQoXCJzaG93ZWRcIik7XHJcblxyXG4gICAgICAgIGlmICghaGFzVGFwcGVkKSB7XHJcbiAgICAgICAgICBjb25zdCB0YXBMaW5lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi53aWRnZXRfX3RhcC1saW5lXCIpO1xyXG4gICAgICAgICAgdGFwTGluZS5jbGFzc0xpc3QuYWRkKFwidGFwcGVkXCIpO1xyXG5cclxuICAgICAgICAgIGhhc1RvdWNoZWQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBjb25zdCBkZWxheSA9IDMwMDtcclxuXHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoXCJ3aWRnZXQtb24taG92ZXJcIik7XHJcbiAgICAgICAgICBwb3B1cC5jbGFzc0xpc3QucmVtb3ZlKFwic2hvd2VkXCIpO1xyXG4gICAgICAgIH0sIGRlbGF5KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gaXNPbkVsZW1lbnQocG9zWCwgcG9zWSwgZWxlbWVudFRhZykge1xyXG4gICAgY29uc3QgZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGVsZW1lbnRUYWcpO1xyXG4gICAgY29uc3QgZWxQb3NJbmZvID0gZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcblxyXG4gICAgY29uc3QgZWxfeDEgPSBlbFBvc0luZm8ueDtcclxuICAgIGNvbnN0IGVsX3kxID0gZWxQb3NJbmZvLnk7XHJcbiAgICBjb25zdCBlbF94MiA9IGVsX3gxICsgZWxQb3NJbmZvLndpZHRoO1xyXG4gICAgY29uc3QgZWxfeTIgPSBlbF95MSArIGVsUG9zSW5mby5oZWlnaHQ7XHJcblxyXG4gICAgcmV0dXJuIHBvc1ggPj0gZWxfeDEgJiYgcG9zWCA8PSBlbF94MiAmJiBwb3NZID49IGVsX3kxICYmIHBvc1kgPD0gZWxfeTI7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBzaG93UG9wdXAoKSB7XHJcbiAgICBjb25zdCBwb3B1cCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaG9tZV9fbW9kYWxcIik7XHJcblxyXG4gICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKFwid2lkZ2V0LW9uLWhvdmVyXCIpO1xyXG4gICAgcG9wdXAuY2xhc3NMaXN0LmFkZChcInNob3dlZFwiKTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGhpZGVXaWRnZXQoKSB7XHJcbiAgICBjb25zdCB3aWRnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmhvbWVfX3JpZ2h0IC53aWRnZXRcIik7XHJcbiAgICB3aWRnZXQuY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGluaXRNb2JpbGVQb3B1cEludGVyYWN0aW9uKCkge1xyXG4gICAgbGV0IHRvdWNoc3RhcnRYID0gMDtcclxuICAgIGxldCB0b3VjaHN0YXJ0WSA9IDA7XHJcbiAgICBsZXQgdG91Y2hlbmRYID0gMDtcclxuICAgIGxldCB0b3VjaGVuZFkgPSAwO1xyXG5cclxuICAgIGxldCBoYXNTd2lwZWQgPSBmYWxzZTtcclxuXHJcbiAgICBjb25zdCBob21lU2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaG9tZVwiKTtcclxuXHJcbiAgICBob21lU2VjdGlvbi5hZGRFdmVudExpc3RlbmVyKFwidG91Y2hzdGFydFwiLCBzZXRTdGFydFRvdWNoVmFyaWFibGVzLCBmYWxzZSk7XHJcbiAgICBob21lU2VjdGlvbi5hZGRFdmVudExpc3RlbmVyKFwidG91Y2hlbmRcIiwgc3dpcGVIYW5kbGVyLCBmYWxzZSk7XHJcblxyXG4gICAgaGlkZVBvcHVwc0FuZFdpZGdldEJvcmRlckJvdHRvbSgpO1xyXG5cclxuICAgIGZ1bmN0aW9uIHNldFN0YXJ0VG91Y2hWYXJpYWJsZXMoZXZlbnQpIHtcclxuICAgICAgdG91Y2hzdGFydFggPSBldmVudC5jaGFuZ2VkVG91Y2hlc1swXS5zY3JlZW5YO1xyXG4gICAgICB0b3VjaHN0YXJ0WSA9IGV2ZW50LmNoYW5nZWRUb3VjaGVzWzBdLnNjcmVlblk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gaGlkZVBvcHVwc0FuZFdpZGdldEJvcmRlckJvdHRvbSgpIHtcclxuICAgICAgY29uc3QgcG9wdXBUb3BTZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcclxuICAgICAgICBcIi5ob21lX19tb2RhbCAud2lkZ2V0X190b3BcIlxyXG4gICAgICApO1xyXG4gICAgICBjb25zdCB3aWRnZXRUb3BTZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcclxuICAgICAgICBcIi5ob21lX19yaWdodCAud2lkZ2V0X190b3BcIlxyXG4gICAgICApO1xyXG5cclxuICAgICAgcG9wdXBUb3BTZWN0aW9uLmNsYXNzTGlzdC5hZGQoXCJuby1ib3JkZXJcIik7XHJcbiAgICAgIHdpZGdldFRvcFNlY3Rpb24uY2xhc3NMaXN0LmFkZChcIm5vLWJvcmRlclwiKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBzd2lwZUhhbmRsZXIoZXZlbnQpIHtcclxuICAgICAgY29uc3Qgd2lkZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5ob21lX19yaWdodCAud2lkZ2V0XCIpO1xyXG4gICAgICBjb25zdCBwb3B1cCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaG9tZV9fbW9kYWxcIik7XHJcblxyXG4gICAgICB0b3VjaGVuZFggPSBldmVudC5jaGFuZ2VkVG91Y2hlc1swXS5zY3JlZW5YO1xyXG4gICAgICB0b3VjaGVuZFkgPSBldmVudC5jaGFuZ2VkVG91Y2hlc1swXS5zY3JlZW5ZO1xyXG4gICAgICB0YXJnZXQgPSBldmVudC50YXJnZXQ7XHJcblxyXG4gICAgICBjb25zdCBpc1N3aXBlSXNTaG9ydGVyVGhlblF1YXJ0ZXIgPVxyXG4gICAgICAgIE1hdGguYWJzKHRvdWNoZW5kWCAtIHRvdWNoc3RhcnRYKSA8PSB3aW5kb3cuaW5uZXJXaWR0aCAvIDQ7XHJcblxyXG4gICAgICBpZiAoaXNTd2lwZUlzU2hvcnRlclRoZW5RdWFydGVyKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9IGVsc2UgaWYgKHRvdWNoZW5kWCA+PSB0b3VjaHN0YXJ0WCkge1xyXG4gICAgICAgIGlmIChpc1VzZXJTd2lwZVdhc09uV2lkZ2V0KCkpIHtcclxuICAgICAgICAgIHNob3dQb3B1cCgpO1xyXG4gICAgICAgICAgaGlkZVdpZGdldCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCFoYXNTd2lwZWQpIHtcclxuICAgICAgICAgIGNvbnN0IHN3YXBMaW5lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi53aWRnZXRfX3N3aXBlLWxpbmVcIik7XHJcbiAgICAgICAgICBzd2FwTGluZS5jbGFzc0xpc3QuYWRkKFwid2lkZ2V0X19zd2lwZS1saW5lLS1uby10aXRsZVwiKTtcclxuXHJcbiAgICAgICAgICBoYXNTd2lwZWQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBIaWRlIHBvcHVwXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgaWYgKGlzVXNlclN3aXBlV2FzT25XaWRnZXQoKSkge1xyXG4gICAgICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QucmVtb3ZlKFwid2lkZ2V0LW9uLWhvdmVyXCIpO1xyXG4gICAgICAgICAgcG9wdXAuY2xhc3NMaXN0LnJlbW92ZShcInNob3dlZFwiKTtcclxuICAgICAgICAgIHdpZGdldC5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgZnVuY3Rpb24gaXNVc2VyU3dpcGVXYXNPbldpZGdldCgpIHtcclxuICAgICAgICByZXR1cm4gdGFyZ2V0LmNsb3Nlc3QoXCIud2lkZ2V0XCIpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBkZWJvdW5jZShmLCBtcykge1xyXG4gICAgbGV0IHRpbWVyID0gbnVsbDtcclxuXHJcbiAgICByZXR1cm4gZnVuY3Rpb24oLi4uYXJncykge1xyXG4gICAgICBjb25zdCBvbkNvbXBsZXRlID0gKCkgPT4ge1xyXG4gICAgICAgIGYuYXBwbHkodGhpcywgYXJncyk7XHJcbiAgICAgICAgdGltZXIgPSBudWxsO1xyXG4gICAgICB9O1xyXG5cclxuICAgICAgaWYgKHRpbWVyKSB7XHJcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVyKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgdGltZXIgPSBzZXRUaW1lb3V0KG9uQ29tcGxldGUsIG1zKTtcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBhZGRFdmVudExpc3RlbmVycygpIHtcclxuICAgIGNvbnN0IHNsaWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2xpZGVyXCIpO1xyXG4gICAgY29uc3Qgc3VtbWFyeSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIud2lkZ2V0X19jdXJyZW50LXN1bW1hcnkgLnN1bW1hcnlcIik7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBCaW5kIGEgc2xpZGVyIGRhdGEgY2hhbmdpbmcgd2l0aCBhIHZpZXdcclxuICAgICAqL1xyXG4gICAgc2xpZGVyLmFkZEV2ZW50TGlzdGVuZXIoXHJcbiAgICAgIFwiY2hhbmdlXCIsXHJcbiAgICAgIGV2ZW50ID0+IChzdW1tYXJ5LmlubmVySFRNTCA9IGV2ZW50LmN1cnJlbnRUYXJnZXQudmFsdWUpXHJcbiAgICApO1xyXG5cclxuICAgIGlmIChpc0Rlc2t0b3AoKSAmJiBpc0RvY3VtZW50RnJvemVuKCkpIHtcclxuICAgICAgY29uc3QgaG93SXRXb3Jrc1NlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmhvdy1pdC13b3Jrc1wiKTtcclxuICAgICAgaG93SXRXb3Jrc1NlY3Rpb24uY2xhc3NMaXN0LmFkZChcIm9wYWNpZnlcIik7XHJcbiAgICAgIGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNld2hlZWxcIiwgc2Nyb2xsVG9TZWN0aW9uLCB7XHJcbiAgICAgICAgcGFzc2l2ZTogdHJ1ZVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoaXNNb2JpbGUoKSkge1xyXG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCBpbml0U2xpZGVyKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIWlzTW9iaWxlKCkpIHtcclxuICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGhlYWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaGVhZGVyXCIpO1xyXG4gICAgICAgIGlmIChoZWFkZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuYm90dG9tIDwgd2luZG93LnBhZ2VZT2Zmc2V0KSB7XHJcbiAgICAgICAgICBoZWFkZXIuY2xhc3NMaXN0LmFkZChcImZpeGVkXCIpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBoZWFkZXIuY2xhc3NMaXN0LnJlbW92ZShcImZpeGVkXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgd2luZG93LmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KFwic2Nyb2xsXCIpKTtcclxuXHJcbiAgICBhZGRCdXR0b25zRXZlbnRMaXN0ZW5lcnMoKTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGlzRGVza3RvcCgpIHtcclxuICAgIHJldHVybiB3aW5kb3cuaW5uZXJXaWR0aCA+IDEyMDA7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBzY3JvbGxUb1NlY3Rpb24oKSB7XHJcbiAgICBjb25zdCBzY3JvbGxNb3VzZVRvID0gJChcIiNzY3JvbGwtdG9cIikub2Zmc2V0KCkudG9wO1xyXG4gICAgY29uc3QgaG93SXRXb3Jrc1NlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmhvdy1pdC13b3Jrc1wiKTtcclxuXHJcbiAgICBjb25zdCBzY3JvbGxUaW1lID0gOTAwO1xyXG4gICAgY29uc3QgZGVsYXkgPSA1MDA7XHJcblxyXG4gICAgaG93SXRXb3Jrc1NlY3Rpb24uY2xhc3NMaXN0LnJlbW92ZShcIm9wYWNpZnlcIik7XHJcbiAgICBoaWRlTW91c2UoKTtcclxuXHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgdW5mcmVlemVEb2N1bWVudCgpO1xyXG4gICAgICAkKFwiaHRtbCwgZG9jdW1lbnQuYm9keVwiKS5hbmltYXRlKFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIHNjcm9sbFRvcDogc2Nyb2xsTW91c2VUbyxcclxuICAgICAgICAgIGVhc2U6IFwiZWFzZU91dEJhY2tcIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2Nyb2xsVGltZVxyXG4gICAgICApO1xyXG4gICAgfSwgZGVsYXkpO1xyXG5cclxuICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNld2hlZWxcIiwgc2Nyb2xsVG9TZWN0aW9uKTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGlzRG9jdW1lbnRGcm96ZW4oKSB7XHJcbiAgICByZXR1cm4gZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuY29udGFpbnMoXCJuby1zY3JvbGxcIik7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiB1bmZyZWV6ZURvY3VtZW50KCkge1xyXG4gICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QucmVtb3ZlKFwibm8tc2Nyb2xsXCIpO1xyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImh0bWxcIikuY2xhc3NMaXN0LnJlbW92ZShcIm5vLXNjcm9sbFwiKTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHJlbW92ZUxvYWRlcigpIHtcclxuICAgIGNvbnN0IGxvYWRlckhUTUwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNob3NlLWxhbmd1YWdlLXdyYXBwZXJcIik7XHJcbiAgICBjb25zdCB0aW1lVG9Mb2FkZXJIaWRlID0gMjAwMDtcclxuICAgIGxvYWRlckhUTUwuY2xhc3NMaXN0LmFkZChcInJlbW92ZWRcIik7XHJcblxyXG4gICAgLy8gaWYgKCFpc0Rlc2t0b3AoKSkge1xyXG4gICAgLy8gICB1bmZyZWV6ZURvY3VtZW50KCk7XHJcbiAgICAvLyB9XHJcblxyXG4gICAgc2V0VGltZW91dCgoKSA9PiBsb2FkZXJIVE1MLnJlbW92ZSgpLCB0aW1lVG9Mb2FkZXJIaWRlKTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGZyZWV6ZURvY3VtZW50KCkge1xyXG4gICAgY29uc3Qgc2Nyb2xsTW91c2VUbyA9ICQoXCIjc2Nyb2xsLXRvXCIpLm9mZnNldCgpLnRvcDtcclxuICAgIGlmIChcclxuICAgICAgd2luZG93LmlubmVyV2lkdGggPj0gMTIwMCAmJlxyXG4gICAgICAoc2Nyb2xsTW91c2VUbyAqIDEwKSAvIDEwID49IHdpbmRvdy5wYWdlWU9mZnNldFxyXG4gICAgKSB7XHJcbiAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZChcIm5vLXNjcm9sbFwiKTtcclxuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImh0bWxcIikuY2xhc3NMaXN0LmFkZChcIm5vLXNjcm9sbFwiKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnN0IGhvd0l0V29ya3NTZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5ob3ctaXQtd29ya3NcIik7XHJcbiAgICAgIGhvd0l0V29ya3NTZWN0aW9uLmNsYXNzTGlzdC5yZW1vdmUoXCJvcGFjaWZ5XCIpO1xyXG5cclxuICAgICAgaGlkZU1vdXNlKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBoaWRlTW91c2UoKSB7XHJcbiAgICBjb25zdCBtb3VzZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibW91c2VcIik7XHJcbiAgICBtb3VzZS5jbGFzc0xpc3QuYWRkKFwic2NhbGVkXCIpO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gaGFzTW91c2UoKSB7XHJcbiAgICByZXR1cm4gIWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibW91c2VcIikuY2xhc3NMaXN0LmNvbnRhaW5zKFwic2NhbGVkXCIpO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gYWRkQnV0dG9uc0V2ZW50TGlzdGVuZXJzKCkge1xyXG4gICAgY29uc3QgYnV0dG9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuYnV0dG9uLS1zY3JvbGwtdG8tdG9wXCIpO1xyXG4gICAgYnV0dG9ucy5mb3JFYWNoKGJ1dHRvbiA9PiBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHNjcm9sbFRvVG9wKSk7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBzY3JvbGxUb1RvcCgpIHtcclxuICAgIGxldCB0byA9IDA7XHJcblxyXG4gICAgaWYgKGlzTW9iaWxlKCkpIHtcclxuICAgICAgY29uc3Qgd2lkZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5ob21lX19yaWdodCAud2lkZ2V0XCIpO1xyXG4gICAgICBjb25zdCB3aWRnZXRFbGVtZW50RGF0YSA9IHdpZGdldC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuXHJcbiAgICAgIHRvID0gd2lkZ2V0RWxlbWVudERhdGEuaGVpZ2h0IC8gMjtcclxuICAgIH1cclxuXHJcbiAgICAkKFwiaHRtbCwgYm9keVwiKS5hbmltYXRlKFxyXG4gICAgICB7XHJcbiAgICAgICAgc2Nyb2xsVG9wOiB0byxcclxuICAgICAgICBlYXNlOiBcImVhc2VPdXRCYWNrXCJcclxuICAgICAgfSxcclxuICAgICAgOTAwXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gaW5pdEFuaW1hdGlvbnMoKSB7XHJcbiAgICAvKipcclxuICAgICAqIFNldHVwIHlvdXIgTGF6eSBMaW5lIGVsZW1lbnQuXHJcbiAgICAgKiBzZWUgUkVBRE1FIGZpbGUgZm9yIG1vcmUgc2V0dGluZ3NcclxuICAgICAqL1xyXG4gICAgY29uc3QgYW5pbWF0aW9uc0NvbmZpZyA9IHtcclxuICAgICAgZWFzZTogXCJlYXNlSW5RdWFkXCIsXHJcbiAgICAgIHN0cm9rZVdpZHRoOiAwLjUsXHJcbiAgICAgIHN0cm9rZU9wYWNpdHk6IDEsXHJcbiAgICAgIHN0cm9rZUNvbG9yOiBcIiNmZmZmZmZcIlxyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBsb2dvQW5pbWF0aW9uc0NvbmZpZyA9IHtcclxuICAgICAgZWFzZTogXCJlYXNlSW5RdWFkXCIsXHJcbiAgICAgIHN0cm9rZVdpZHRoOiA0LFxyXG4gICAgICBzdHJva2VPcGFjaXR5OiAxLFxyXG4gICAgICBzdHJva2VDb2xvcjogXCIjZmZmZmZmXCJcclxuICAgIH07XHJcblxyXG4gICAgbGV0IHRlYW1JY29uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0ZWFtXCIpO1xyXG4gICAgbGV0IGNhbGVuZGFySWNvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY2FsZW5kYXJcIik7XHJcbiAgICBsZXQgbG9nb0ljb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2xvZ29cIik7XHJcblxyXG4gICAgbGV0IHRlYW1JY29uQW5pbWF0aW9uID0gbmV3IExhenlMaW5lUGFpbnRlcih0ZWFtSWNvbiwgYW5pbWF0aW9uc0NvbmZpZyk7XHJcbiAgICBsZXQgY2FsZW5kYXJJY29uQW5pbWF0aW9uID0gbmV3IExhenlMaW5lUGFpbnRlcihcclxuICAgICAgY2FsZW5kYXJJY29uLFxyXG4gICAgICBhbmltYXRpb25zQ29uZmlnXHJcbiAgICApO1xyXG4gICAgbGV0IGxvZ29JY29uQW5pbWF0aW9uID0gbmV3IExhenlMaW5lUGFpbnRlcihsb2dvSWNvbiwgbG9nb0FuaW1hdGlvbnNDb25maWcpO1xyXG5cclxuICAgIHRlYW1JY29uQW5pbWF0aW9uLnBhaW50KCk7XHJcbiAgICBjYWxlbmRhckljb25BbmltYXRpb24ucGFpbnQoKTtcclxuICAgIGxvZ29JY29uQW5pbWF0aW9uLnBhaW50KCk7XHJcbiAgfVxyXG5cclxuXHJcblxyXG4gIGZ1bmN0aW9uIHNob3dJY29ucygpIHtcclxuICAgIGNvbnN0IGJvYXJkSW1hZ2VzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5ib2FyZF9faW1hZ2Ugc3ZnXCIpO1xyXG5cclxuICAgIGJvYXJkSW1hZ2VzLmZvckVhY2goaW1hZ2UgPT4ge1xyXG4gICAgICBjb25zdCBvcGFjaWZ5RWxlbWVudHMgPSBpbWFnZS5xdWVyeVNlbGVjdG9yQWxsKFwiW2ZpbGwtb3BhY2l0eV1cIik7XHJcbiAgICAgIG9wYWNpZnlFbGVtZW50cy5mb3JFYWNoKG9wRWxlbWVudCA9PlxyXG4gICAgICAgIG9wRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJmaWxsLW9wYWNpdHlcIiwgXCIxXCIpXHJcbiAgICAgICk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGlzTWFjKCkge1xyXG4gICAgcmV0dXJuIG5hdmlnYXRvci5wbGF0Zm9ybS5tYXRjaCgvKE1hY3xpUGhvbmV8aVBvZHxpUGFkKS9pKSA/IHRydWUgOiBmYWxzZTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGFkZExhbmd1YWdlQnV0dG9uc0V2ZW50TGlzdGVuZXJzKCkge1xyXG4gICAgY29uc3QgbGFuZ3VhZ2VCdXR0b25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcclxuICAgICAgXCIuY2hvc2UtbGFuZ3VhZ2VfX2xhbmd1YWdlc1wiXHJcbiAgICApO1xyXG5cclxuICAgIHNob3dMYW5ndWFnZUNob3NlTWVudSgpO1xyXG5cclxuICAgIGxhbmd1YWdlQnV0dG9ucy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZXZlbnQgPT4ge1xyXG4gICAgICBjb25zdCBLT1JFQU4gPSBcImNob3NlLWxhbmd1YWdlX19sYW5ndWFnZS0ta29yZWFuXCI7XHJcbiAgICAgIGNvbnN0IGNsaWNrZWRCdXR0b24gPSBldmVudC50YXJnZXQ7XHJcblxyXG4gICAgICBpZiAoY2xpY2tlZEJ1dHRvbi5jbGFzc0xpc3QuY29udGFpbnMoS09SRUFOKSkge1xyXG4gICAgICAgIHRyYW5zbGF0ZVRvS29yZWFuKFwiS09SXCIpO1xyXG4gICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZChcImtvclwiKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaGlkZUxhbmd1YWdlQ2hvc2VNZW51KCk7XHJcblxyXG4gICAgICBpZiAoIWlzTW9iaWxlKCkgJiYgIWlzTWFjKCkpIHtcclxuICAgICAgICBpbml0QW5pbWF0aW9ucygpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHNob3dJY29ucygpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBmdW5jdGlvbiBzaG93TGFuZ3VhZ2VDaG9zZU1lbnUoKSB7XHJcbiAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZChcInByZWxvYWRlclwiKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBoaWRlTGFuZ3VhZ2VDaG9zZU1lbnUoKSB7XHJcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIHJlbW92ZUxvYWRlcigpO1xyXG4gICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZShcInByZWxvYWRlclwiKTtcclxuICAgICAgICBcclxuICAgICAgICBpbml0V2F5UG9pbnRzSW50ZXJhY3Rpb24oKTtcclxuICAgICAgfSwgMTUwMCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiB0cmFuc2xhdGVUb0tvcmVhbihsYW5nID0gXCJFTkdcIikge1xyXG4gICAgY29uc3Qga29yZWFuRGF0YSA9IFtcclxuICAgICAgXCLshLjqs4Qg7LWc7LSI7J2YIO2FjOyhsOyKpCBjMmMgPGJyPiDquIDroZzrsowg6rGw656Y7IaMXCIsXHJcbiAgICAgIFwi7Yis7J6Q7J6QIOuQmOq4sFwiLFxyXG4gICAgICBcIu2IrOyekOyekCDrkJjquLBcIixcclxuICAgICAgXCLtnojrk6DthqDtgbAg6rWs66ekXCIsXHJcbiAgICAgIFwi7Yis7J6QXCIsXHJcbiAgICAgIFwiWCDthqDtgbDsnYAgMTcgMDAwIDAwMCDqsJzsnZgg7Yag7YGw7JeQ7IScIOygnOyZuOuQqeuLiOuLpC5cIixcclxuICAgICAgXCJJQ08g7Yis7J6QXCIsXHJcbiAgICAgIFwi7YWM7KGw7IqkIOuyoOydtO2CuS4g7KeA6riI6rmM7KeAIOyxhOq1tOydgCDqsrDsvZQg7Ims7Jq06rKMIOyVhOuLiOyYgOyKteuLiOuLpC4g7Z6I65Og67mE7Yq464qUIO2FjOyhsOyKpOuyoOydtO2CueydtCDqsIDriqXtlZwg6rGw656Y7IaM7J6F64uI64ukLu2FjOyhsOyKpCDrsqDsnbTsu6TqsIAg65Cg7IiY7J6I64qUIOq4sO2ajOulvCDrhpPsuZjsp4Ag66eI7Iut7Iuc7JikLu2eiOuToOu5hO2KuOulvCDthrXtlbQg7JewNS41JSDthYzsobDsiqQg67Kg7J207YK5IOyImOydteydhCDsi6TtmITtlZjsi63si5zsmKQuXCIsXHJcbiAgICAgIFwi66qo6riI7JWhXCIsXHJcbiAgICAgIFwi7ISk66a97J6QXCIsXHJcbiAgICAgIFwi7KeA7IaNXCIsXHJcbiAgICAgIFwi7J6R64+Z7JuQ66asXCIsXHJcbiAgICAgIFwi7ZSE66as7IS47J28IO2DgOydtOuouFwiLFxyXG4gICAgICBcIuydvFwiLFxyXG4gICAgICBcIuyLnFwiLFxyXG4gICAgICBcIuu2hFwiLFxyXG4gICAgICBcIuy0iFwiLFxyXG4gICAgICBcIjFcIixcclxuICAgICAgXCJISUQgPSBcIixcclxuICAgICAgXCIwLjE1JFwiLFxyXG4gICAgICBcIuy0nSAxNyAwMDAgMDAwIO2GoO2BsOykkSDtmITsnqwgQu2GoO2BsOydtCDrgqjslZjsirXri4jri6QuXCIsXHJcbiAgICAgIFwi7IS46rOEIOy1nOy0iOydmCDthYzsobDsiqQg66eI7LyTXCIsXHJcbiAgICAgIFwiSGlkZGVuYml0IOqxsOuemOyGjOyXkOyEnOuKlCDqsbDrnpjsnZgg6rCB66m07JeQIOyXheyytCDrsI8g7IiY7IiY66OM66W8IOu2gOqzvO2VqeuLiOuLpC4g7J6Q7IKwICjspoksIOyekOyCsOydhCDtjJTslYQg7Jyg64+Z7ISx7J2EIOygnOqzte2VmOuKlCDsgqzrnowp7J20IDAuMjUgJeyXkCDrjZQg6rCA6rmd6rKMIOyngOu2iO2VmOuKlCDrj5nslYgsIO2FjOydtOy7pOydmCDsiJjsiJjro4zripQg7J2867CY7KCB7Jy866GcIO2Pieq3oCAwLjUtMC43NSAlIOuGkuyKteuLiOuLpC4g7Ya17IOB7KCB7Jy866GcLOydtCDsiJjsiJjro4zripQg6rGw656Y6rCAIOyLpO2WieuQmOuKlCDsi5zsoJDsl5DshJwg6rO17KCc65Cp64uI64ukXCIsXHJcbiAgICAgIFwi7Iuc7J6l7J2EIOychO2VnCBVU1BcIixcclxuICAgICAgXCLrj4XtirntlZwg7YyQ66ekIOygnOyViOydgCBISUTqsIAgSGlkZGVuYml0IOuUlOyngO2EuCDsnpDsgrAgRXhjaGFuZ2Ug7ZSM656r7Y+87JeQIOydmO2VnCDqtozsnITsnojripQg7KeA7KCV7J2EIOqwgOynhCDri6jsnbwg6raM7JyE7J6I64qUIOqzteyLnSDthqDtgbDsnbTrqbAg66qo65OgIOyCrOyaqeyekOqwgCDsnpDsi6DsnZgg7Zmc7ISxIO2UjOueq+2PvCDtmZzrj5nsl5DshJwg7ZW064u5IEhJRCDrs7Tsg4HsnYTrsJvsnYQg7IiYIOyeiOuLpOuKlCDqsoPsnoXri4jri6QuIOqzoOqwneydgCBISUTsnZgg7KCV6riwIO2GteqzhOulvCDthrXtlbQgSElEIOyImOyXkCDruYTroYDtlZjsl6wg7ZW064u5IOu5hOycqOydmCDrs7TsnKAg67mE7KSR7JeQIOuUsOudvCDrsLDri7nquIjsnYQg7IiY66C5IO2VoCDsiJgg7J6I7Jy866mwIOyImOydteydhCDtlqXsnKAg7ZWgIOyImCDsnojsirXri4jri6QuXCIsXHJcbiAgICAgIFwi7Yis7ZGc6raMXCIsXHJcbiAgICAgIFwiSGlkZGVuIO2GoO2BsCDshozsp4DsnpDripQg6rO16rCcIO2IrO2RnOq2jOydhCDtlonsgqztlaAg7IiYIOyeiOyKteuLiOuLpC4gMTAwIOqwnOydmCBIaWRkZW4g7Yag7YGw7J2AIDEg6rCc7J2YIO2IrO2RnOq2jOqzvCDqsJnsirXri4jri6QuIOyghOuwmOyggeycvOuhnCDsgqzsmqnsnpDsl5Dqsowg7KCV6riw7KCB7Jy866GcIOuwsOuLuSDsiJjsnbXsnYQg7KCc6rO17ZWY6riwIOychO2VtCBISUTripQg7IKs7Jqp7J6Q6rCAIO2UjOueq+2PvCDsnZjsgqwg6rKw7KCVIO2UhOuhnOyEuOyKpOyXkCDssLjsl6ztlaAg7IiY7J6I64qUIOq4sO2ajOulvCDslrvsnYQg7IiYIOyeiOuPhOuhne2VqeuLiOuLpC5cIixcclxuICAgICAgXCLsvZTsnbgg7JeQ7Ja065Oc656NXCIsXHJcbiAgICAgIFwiSUNPIOywuOyXrOulvCDsnITtlZwg66qo67CU7J28IOuwjyBJT1Mg7ISk7LmY7IucIOu2gOqzvOuQmOuKlCDruYTsmqnsnYAg7J207ZuEIOuztOuEiOyKpOuhnCDtmZjquInrkKnri4jri6QuXCIsXHJcbiAgICAgIFwi7Z6I65Og67mE7Yq464qUIOuLueyLoOydmCDshLHqs7XsnLzroZwg7JWI64K07ZWp64uI64ukLlwiLFxyXG4gICAgICBcIu2GoO2BsCDshozsp4DruYTsnKjsnbQg7Kad6rCA7ZWo7JeQIOuUsOudvCDsp4DquInrkJjripQg67O064SI7IqkIOuYkO2VnCDspp3qsIDtlanri4jri6QuIO2GoO2BsCDtmYDrjZTrk6Tsl5Dqsowg6rGw656Y7IiY7IiY66OM7J2YIDgwJeulvCDthqDtgbDruYTsnKjsl5Ag65Sw6528IO2ZmOq4ieuQqeuLiOuLpC5cIixcclxuICAgICAgXCLrqqjrk6DqsoPsnbQg6rCA6rmM7J207JeQIOyeiOyKteuLiOuLpC5cIixcclxuICAgICAgXCLsmrDrpqzripQg6riA66Gc67KMIEV4Y2hhbmdlcyBVSeyymOufvCDthqDtgbAg7ZmA642UIOu5hOycqOuhnCDsp4Drtogg7ZWgIOyImOyeiOuKlCDqsbDrnpgg7IiY7IiY66OM66W8IO2Gte2VtCDqsITri6jtlZwg7J247YSw7Y6Y7J207Iqk66GcIOqwgOyepSDsiazsmrQg7IKs7Jqp67KV7J2EIOygnOqzte2VqeuLiOuLpC4g66eI7KeA66eJ7Jy866GcIOydtOydteydhCDslrvsnLzroKTripQg67Cp67KV7J2AIOuqqOuRkCDri7nsi6DsnZgg7IaQ7JeQIOuLrOugpCDsnojsirXri4jri6QuXCIsXHJcbiAgICAgIFwi67Cx7KeAXCIsXHJcbiAgICAgIFwi7IOI66Gc7Jq0IO2eiOuToOu5hO2KuCDrsLHshJzrpbwg6rO17Jyg7ZWg7IiYIOyeiOyWtCDquLDsganri4jri6Qu7J2067Cx7ISc64qUIO2UvOyVhO2KuCDthrXtlansnYQg7Ya17ZWcIOyDiOuhnOyatCDrp4jsnbTri53qsbDrnpjshozrpbwg7IaM6rCc7ZWY6rOgIOyeiOyKteuLiOuLpDpQcm9vZi1vZi1SZXBsaWNhdGlvbiAoUG9SKSBhbmQgUHJvb2Ytb2YtU3BhY2V0aW1lIChQb1N0KVwiLFxyXG4gICAgICBcIu2eiOuToOu5hO2KuCDrsLHshJzrs7TquLBcIixcclxuICAgICAgXCLsl5DslrTrk5zrno1cIixcclxuICAgICAgXCJJQ08g7J207ZuELCDsmrDrpqzripQgMTAwIEVUSCDsnbTsg4Eg65iQ64qUIOq3uOyZgCDrj5nrk7HtlZwg6riI7JWh7J2EIOu5hO2KuCDrj5nsoITsnLzroZwg6riw67aAIO2VnCDrqqjrk6Ag7LC46rCA7J6Q65Ok7JeQ6rKMIOy2lOyyqOydhCDsi6Tsi5wg7ZWgIOqyg+yeheuLiOuLpC4g67O064SI7Iqk64qUIOuLpOydjCDruYTsnKjroZwg67Cw67aE65Cp64uI64ukLlwiLFxyXG4gICAgICBcIuugiOuyqOqzvCDrs7TrhIjsiqTsnKjsnYAg6riw67O46rCA6rKp6rO8IOuzhOuPhOuhnCDsoIHsmqnrkKnri4jri6QuXCIsXHJcbiAgICAgIFwi7Z6I65Og67mE7Yq4IO2GoO2BsOydgCDssqvqsbDrnpjrtoDthLAg7Iqk66eI7Yq47Luo7Yq4656Z7Yq466W8IO2Gte2VtCDtlITroZzqt7jrnpjrsI0g65Cp64uI64ukLlwiLFxyXG4gICAgICBcIk1vcmUgdGhhbiwgRVRIXCIsXHJcbiAgICAgIFwi7LaU6rCAIEhJRCDsvZTsnbgsJVwiLFxyXG4gICAgICBcIlNBTEVcIixcclxuICAgICAgXCJQcmUtc2FsZVwiLFxyXG4gICAgICBcIklDT1wiLFxyXG4gICAgICBcIu2MkOunpOyImOufiVwiLFxyXG4gICAgICBcIuyEuOydvFwiLFxyXG4gICAgICBcIuuztOuEiOyKpFwiLFxyXG4gICAgICBcIuqwgOqyqVwiLFxyXG4gICAgICBcIjFldGhcIixcclxuICAgICAgXCLtlZjrk5zsuqFcIixcclxuICAgICAgXCLssYTqtbTsiJjrn4nsnbQg7Ja065a76rKMIOuQmOuKlOqwgD9cIixcclxuICAgICAgXCLssqvrsqDsnbTsu6Qg7KSRIO2VnCDrqoXsnbTrkJjquLAg7JyE7ZWcIOq4sO2ajOulvCDrhpPsuZjsp4Ag66eI7Iut7Iuc7JikLiDsspjsnYwgMTIg6rCc7JuUIOuCtOyXkCDrsqDsnbTtgrnsnYQg7Ya17ZW0IOyXsCA1LjUl7J2YIOyImOydteydhCDsmKzrpqzsi63si5zsmKQuIOuLueyLoOydmCDssqsg7ZW0IOuPmeyViCDqsIDsnqUg66eO7J2AIOydtOydteydhCDrgqjquLQg7L2U7J247J2EIOyerCDrsqDsnbTtgrnsnYQg7Ya17ZW0IOyImOydteydhCDstZzrjIDtmZQg7ZWY7Iut7Iuc7JikLiDsmrDrpqzripQgMjAxOSDrhYQg7LWc7KCAIOyImOykgOyXkOyEnCDrsqDsnbTtgrnsnZgg67O17J6h7ISx7J2EIOykhOydtOq4sCDsnITtlbQg7LWc7ISg7J2EIOuLpO2VmOqzoCDsnojsirXri4jri6Qu7Z6I65Og67mE7Yq464qUIO2YhOq4iOycvOuhnCDqsIDrk50g7LCo6rOgIOqzhOyCsOydmCDrs7XsnqHshLHsnbQg7Kad6rCAIO2VoCDrlYzquYzsp4Ag6rCE64uo7ZWcIOq4sOuzuCDsspjrpqwg64ql66Cl7Jy866Gc64+EIOyWu+ydhCDsiJjsnojripQg6riw7ZqM66W8IOygnOqzte2VqeuLiOuLpC4g67Kg7J207YK57JeQ7IScIOyCrOyaqe2VoCDsiJjsnojripQg6rCA7J6lIOunjuydgCDslpHsnZgg64+Z7KCE7Jy866GcIOqwgSDruJTroZ0g64u5IOy1nOqzoCDtlonsmrTsnYQg64Ko6rmB64uI64ukLiBQb1PrsKnsi53snYAg66eO7J2AIOuFuOugpeydhCDquLDsmrjsnbwg7ZWE7JqU6rCAIOyXhuyKteuLiOuLpC4gUG9T67Cp7Iud7J2AIOusuOuqhe2ZlCDrkJwg7LGE6rW0IOuyhOyghOycvOuhnCDtmITrjIAg6riI7Jy1IOyDge2SiOqzvCDqs7XthrXsoJDsnbQg7J6I7Iq164uI64ukLiBQb1Psl5DshJzripQg7KeA6rCR7JeQIOuztOq0gCDrkJwg7L2U7J247J2YIO2BrOq4sOqwgCDsg4jroZzsmrQg7KeA6rCR7J2EIOyWu+uKlCDquLDtmozrpbwg7Kad6rCA7Iuc7YKk6riwIOuVjOusuOyXkCDqs4TsoJXsl5Ag6rCA7J6lIOunjuydgCDsvZTsnbjsnbTsnojripQg7LKrIOuyiOynuCDssLjqsIDsnpDqsIAg65CgIOyImCDsnojsirXri4jri6RcIixcclxuICAgICAgXCIx6rCc7JuUfjEy6rCc7JuUIC0gXCIsXHJcbiAgICAgIFwiMiA4NTkgMzAyLjg0IOy9lOyduFwiLFxyXG4gICAgICBcIjEz6rCc7JuUfjI06rCc7JuUIC0gXCIsXHJcbiAgICAgIFwiMSA0MjkgNjUxLDQyIOy9lOyduFwiLFxyXG4gICAgICBcIjI16rCc7JuUfjM16rCc7JuULSBcIixcclxuICAgICAgXCI3MTQsODI1LjcxIOy9lOyduFwiLFxyXG4gICAgICBcIjM26rCc7JuUIC0gXCIsXHJcbiAgICAgIFwiNjY5LDQ2Ni4wNyDsvZTsnbhcIixcclxuICAgICAgXCLroZzrk5zrp7VcIixcclxuICAgICAgXCLqs4Ttmo0g67CPIOqwnOuwnFwiLFxyXG4gICAgICBcIuuyoO2DgOuyhOyghCDrn7Dsua1cIixcclxuICAgICAgXCLqsbDrnpjshowg65+w7LmtXCIsXHJcbiAgICAgIFwi6riA66Gc67KMIFRPUDEwIOqxsOuemOyGjCDshKDsoJVcIixcclxuICAgICAgXCLtnojrk6Ag7L2U7J247J20IOqxsOuemOuQmOuKlCDstZzqs6DsnZgg6rGw656Y7IaMXCIsXHJcbiAgICAgIFwiMjQgw5cgNyDsp4Dsm5Ag7ISc67mE7IqkXCIsXHJcbiAgICAgIFwi66y47J2Y7IKs7ZWt7J20IOyeiOycvOyLoOqyveyasCwg7Ja47KCc65OgIOuLteuzgO2VtCDrk5zrpqzqsqDsirXri4jri6QuXCIsXHJcbiAgICAgIFwi7Z6I65Og67mE7Yq4IOqxsOuemOyGjCDrkZjrn6zrs7TquLBcIixcclxuICAgICAgXCLtnojrk6DruYTtirgg6rGw656Y7IaMIOuwseyEnFwiLFxyXG4gICAgICBcIuuzteygnOuwqeyngFwiLFxyXG4gICAgICBcIjIwMTkg7Jew6rWsIOuhnOuTnOuntVwiLFxyXG4gICAgICBcIiAxMOyWtVwiLFxyXG4gICAgICBcIuyghOybkCDqsrDtlagg7ZeI7JqpXCJcclxuICAgIF07XHJcblxyXG4gICAgY29uc3QgdGV4dEVsZW1lbnRzID0gW1xyXG4gICAgICBnZXRFbGVtZW50KFwiLmhvbWUgLmluZm9fX3RpdGxlXCIpLFxyXG4gICAgICBnZXRFbGVtZW50KFwiLmhlYWRlcl9fYnV0dG9uXCIpLFxyXG4gICAgICBnZXRFbGVtZW50KFwiLnN1cHBvcnRfX2J1dHRvblwiKSxcclxuICAgICAgZ2V0RWxlbWVudChcIi5ob21lX19tb2RhbCAud2lkZ2V0X19idXR0b25cIiksXHJcbiAgICAgIGdldEVsZW1lbnQoXCIuaG9tZV9fcmlnaHQgLndpZGdldF9fbG9nbyAudGV4dFwiKSxcclxuICAgICAgZ2V0RWxlbWVudChcIi5ob21lX19yaWdodCAud2lkZ2V0X19pbmZvIC50ZXh0XCIpLFxyXG4gICAgICBnZXRFbGVtZW50KFwiLmhvbWVfX3JpZ2h0IC53aWRnZXRfX2J1dHRvblwiKSxcclxuICAgICAgZ2V0RWxlbWVudChcIi5ob21lIC5pbmZvX19kZXNjcmlwdGlvblwiKSxcclxuICAgICAgZ2V0RWxlbWVudChcIi5ob21lIC5ib2FyZF9faXRlbS0tMSAuYm9hcmRfX3RpdGxlXCIpLFxyXG4gICAgICBnZXRFbGVtZW50KFwiLmhvbWUgLmJvYXJkX19pdGVtLS0yIC5ib2FyZF9fdGl0bGVcIiksXHJcbiAgICAgIGdldEVsZW1lbnQoXCIuaG9tZSAuYm9hcmRfX2l0ZW0tLTMgLmJvYXJkX190aXRsZVwiKSxcclxuICAgICAgZ2V0RWxlbWVudChcIi5ob3ctaXQtd29ya3NfX3RpdGxlXCIpLFxyXG4gICAgICBnZXRFbGVtZW50KFwiLmhvbWVfX21vZGFsIC53aWRnZXRfX3RpdGxlXCIpLFxyXG4gICAgICBnZXRFbGVtZW50KFwiLnRpbWVyX19kYXlzXCIpLFxyXG4gICAgICBnZXRFbGVtZW50KFwiLnRpbWVyX19ob3Vyc1wiKSxcclxuICAgICAgZ2V0RWxlbWVudChcIi50aW1lcl9fbWludXRlc1wiKSxcclxuICAgICAgZ2V0RWxlbWVudChcIi50aW1lcl9fc2VjXCIpLFxyXG4gICAgICBnZXRFbGVtZW50KFwiLmhvbWVfX21vZGFsIC53aWRnZXRfX2luZm8gLmNvaW5fX251bWJlclwiKSxcclxuICAgICAgZ2V0RWxlbWVudChcIi5ob21lX19tb2RhbCAud2lkZ2V0X19pbmZvIC50ZXh0XCIpLFxyXG4gICAgICBnZXRFbGVtZW50KFwiLmhvbWVfX21vZGFsIC53aWRnZXRfX2luZm8gLmNvaW5fX3ByaWNlXCIpLFxyXG4gICAgICBnZXRFbGVtZW50KFwiLmhvbWVfX21vZGFsIC53aWRnZXRfX2luZm8tLTIgLnRleHRcIiksXHJcbiAgICAgIGdldEVsZW1lbnQoXCIuY2FyZC0tMSAuY2FyZF9fdGl0bGVcIiksXHJcbiAgICAgIGdldEVsZW1lbnQoXCIuY2FyZC0tMSAuY2FyZF9faW5mb1wiKSxcclxuICAgICAgZ2V0RWxlbWVudChcIi5jYXJkLS0yIC5jYXJkX190aXRsZVwiKSxcclxuICAgICAgZ2V0RWxlbWVudChcIi5jYXJkLS0yIC5jYXJkX19pbmZvXCIpLFxyXG4gICAgICBnZXRFbGVtZW50KFwiLmNhcmQtLTMgLmNhcmRfX3RpdGxlXCIpLFxyXG4gICAgICBnZXRFbGVtZW50KFwiLmNhcmQtLTMgLmNhcmRfX2luZm9cIiksXHJcbiAgICAgIGdldEVsZW1lbnQoXCIuY2FyZC0tNCAuY2FyZF9fdGl0bGVcIiksXHJcbiAgICAgIGdldEVsZW1lbnQoXCIuY2FyZC0tNCAuY2FyZF9faW5mb1wiKSxcclxuICAgICAgZ2V0RWxlbWVudChcIi5jYXJkLS01IC5jYXJkX190aXRsZVwiKSxcclxuICAgICAgZ2V0RWxlbWVudChcIi5jYXJkLS01IC5jYXJkX19pbmZvXCIpLFxyXG4gICAgICBnZXRFbGVtZW50KFwiLmNhcmQtLTYgLmNhcmRfX3RpdGxlXCIpLFxyXG4gICAgICBnZXRFbGVtZW50KFwiLmNhcmQtLTYgLmNhcmRfX2luZm9cIiksXHJcbiAgICAgIGdldEVsZW1lbnQoXCIud2hpdGVwYXBlcl9fdGl0bGVcIiksXHJcbiAgICAgIGdldEVsZW1lbnQoXCIud2hpdGVwYXBlcl9faW5mb1wiKSxcclxuICAgICAgZ2V0RWxlbWVudChcIi53aGl0ZXBhcGVyX19idXR0b25cIiksXHJcbiAgICAgIGdldEVsZW1lbnQoXCIuYWlyZHJvcF9fdGl0bGVcIiksXHJcbiAgICAgIGdldEVsZW1lbnQoXCIuYWlyZHJvcF9faW5mb1wiKSxcclxuICAgICAgZ2V0RWxlbWVudChcIi5haXJkcm9wX19hZGRpdGlvbmFsLWluZm9cIiksXHJcbiAgICAgIGdldEVsZW1lbnQoXCIucmVsZWFzZV9fdGl0bGVcIiksXHJcbiAgICAgIGdldEVsZW1lbnQoXCIuYWlyZHJvcF9fdGFibGUgLnRhYmxlX19jb2x1bW4tLTFcIiksXHJcbiAgICAgIGdldEVsZW1lbnQoXCIuYWlyZHJvcF9fdGFibGUgLnRhYmxlX19jb2x1bW4tLTJcIiksXHJcbiAgICAgIGdldEVsZW1lbnQoXCIucmVsZWFzZSAudGFibGVfX2hlYWRlciAudGFibGVfX2NvbHVtblwiKSxcclxuICAgICAgZ2V0RWxlbWVudChcIi5yZWxlYXNlIC50YWJsZV9fcm93LS0xIC50YWJsZV9fY29sdW1uLS0yXCIpLFxyXG4gICAgICBnZXRFbGVtZW50KFwiLnJlbGVhc2UgLnRhYmxlX19yb3ctLTEgLnRhYmxlX19jb2x1bW4tLTNcIiksXHJcbiAgICAgIGdldEVsZW1lbnQoXCIucmVsZWFzZSAudGFibGVfX3Jvdy0tMiAudGFibGVfX2NvbHVtbi0tMVwiKSxcclxuICAgICAgZ2V0RWxlbWVudChcIi5yZWxlYXNlIC50YWJsZV9fcm93LS0zIC50YWJsZV9fY29sdW1uLS0xXCIpLFxyXG4gICAgICBnZXRFbGVtZW50KFwiLnJlbGVhc2UgLnRhYmxlX19yb3ctLTQgLnRhYmxlX19jb2x1bW4tLTFcIiksXHJcbiAgICAgIGdldEVsZW1lbnQoXCIucmVsZWFzZSAudGFibGVfX3Jvdy0tNSAudGFibGVfX2NvbHVtbi0tMVwiKSxcclxuICAgICAgZ2V0RWxlbWVudChcIi5yZWxlYXNlIC50YWJsZV9fcm93LS02IC50YWJsZV9fY29sdW1uLS0xXCIpLFxyXG4gICAgICBnZXRFbGVtZW50KFwiLnJlbGVhc2UgLnRhYmxlX19yb3ctLTcgLnRhYmxlX19jb2x1bW4tLTFcIiksXHJcbiAgICAgIGdldEVsZW1lbnQoXCIuZm9yLW1pbmVyc19fdGl0bGVcIiksXHJcbiAgICAgIGdldEVsZW1lbnQoXCIuZm9yLW1pbmVyc19faW5mb1wiKSxcclxuICAgICAgZ2V0RWxlbWVudChcIi5mb3ItbWluZXJzX19yaWdodCAubGlzdF9faXRlbS0tMSAudGV4dFwiKSxcclxuICAgICAgZ2V0RWxlbWVudChcIi5mb3ItbWluZXJzX19yaWdodCAubGlzdF9faXRlbS0tMSAuY29pbnNcIiksXHJcbiAgICAgIGdldEVsZW1lbnQoXCIuZm9yLW1pbmVyc19fcmlnaHQgLmxpc3RfX2l0ZW0tLTIgLnRleHRcIiksXHJcbiAgICAgIGdldEVsZW1lbnQoXCIuZm9yLW1pbmVyc19fcmlnaHQgLmxpc3RfX2l0ZW0tLTIgLmNvaW5zXCIpLFxyXG4gICAgICBnZXRFbGVtZW50KFwiLmZvci1taW5lcnNfX3JpZ2h0IC5saXN0X19pdGVtLS0zIC50ZXh0XCIpLFxyXG4gICAgICBnZXRFbGVtZW50KFwiLmZvci1taW5lcnNfX3JpZ2h0IC5saXN0X19pdGVtLS0zIC5jb2luc1wiKSxcclxuICAgICAgZ2V0RWxlbWVudChcIi5mb3ItbWluZXJzX19yaWdodCAubGlzdF9faXRlbS0tNCAudGV4dFwiKSxcclxuICAgICAgZ2V0RWxlbWVudChcIi5mb3ItbWluZXJzX19yaWdodCAubGlzdF9faXRlbS0tNCAuY29pbnNcIiksXHJcbiAgICAgIGdldEVsZW1lbnQoXCIucm9hZC1tYXBfX3RpdGxlXCIpLFxyXG4gICAgICBnZXRFbGVtZW50KFwiLnJvYWQtbWFwIC5wbGFuLS0xXCIpLFxyXG4gICAgICBnZXRFbGVtZW50KFwiLnJvYWQtbWFwIC5wbGFuLS0zXCIpLFxyXG4gICAgICBnZXRFbGVtZW50KFwiLnJvYWQtbWFwIC5wbGFuLS00XCIpLFxyXG4gICAgICBnZXRFbGVtZW50KFwiLnJvYWQtbWFwIC5wbGFuLS01XCIpLFxyXG4gICAgICBnZXRFbGVtZW50KFwiLmV4Y2hhbmdlc19fdGl0bGVcIiksXHJcbiAgICAgIGdldEVsZW1lbnQoXCIuc3VwcG9ydF9fdGl0bGVcIiksXHJcbiAgICAgIGdldEVsZW1lbnQoXCIuc3VwcG9ydF9faW5mb1wiKSxcclxuICAgICAgZ2V0RWxlbWVudChcIi5yZXNlYXJjaF9fdGl0bGVcIiksXHJcbiAgICAgIGdldEVsZW1lbnQoXCIucmVzZWFyY2hfX2l0ZW1zIC5pdGVtLS0xIC5pdGVtX190aXRsZVwiKSxcclxuICAgICAgZ2V0RWxlbWVudChcIi5yZXNlYXJjaF9faXRlbXMgLml0ZW0tLTIgLml0ZW1fX3RpdGxlXCIpLFxyXG4gICAgICBnZXRFbGVtZW50KFwiLnJlc2VhcmNoX19pdGVtcyAuaXRlbS0tNCAuaXRlbV9fdGl0bGVcIiksXHJcbiAgICAgIGdldEVsZW1lbnQoXCIucmVsZWFzZSAudGFibGVfX3Jvdy0tNyAudGFibGVfX2NvbHVtbi0tMiAudGV4dFwiKSxcclxuICAgICAgZ2V0RWxlbWVudChcIi5yb2FkLW1hcCAucGxhbi0tMlwiKVxyXG4gICAgXTtcclxuXHJcbiAgICBpZiAobGFuZyAhPT0gXCJFTkdcIikge1xyXG4gICAgICBzZXRDb250ZW50KHRleHRFbGVtZW50cywga29yZWFuRGF0YSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0RWxlbWVudChjbGFzc05hbWUpIHtcclxuICAgICAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoY2xhc3NOYW1lKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBzZXRDb250ZW50KGVsZW1lbnRzLCBjb250ZW50KSB7XHJcbiAgICAgIGVsZW1lbnRzLmZvckVhY2goKGVsLCBpbmRleCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGNvbnQgPSBjb250ZW50W2luZGV4XTtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgKiBIMiBkYXRhXHJcbiAgICAgICAgICAgKi9cclxuICAgICAgICAgIGlmIChlbC5oYXNBdHRyaWJ1dGUoXCJkYXRhLXRpdGxlXCIpKSB7XHJcbiAgICAgICAgICAgIGVsLmlubmVySFRNTCA9IGNvbnQ7XHJcbiAgICAgICAgICAgIGVsLnNldEF0dHJpYnV0ZShcImRhdGEtdGl0bGVcIiwgY29udCk7XHJcbiAgICAgICAgICB9IGVsc2UgaWYgKGVsLmNsYXNzTGlzdC5jb250YWlucyhcInBsYW5cIikpIHtcclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIFBsYW4gbGluZXMgZGF0YVxyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgZWwuc2V0QXR0cmlidXRlKFwiZGF0YS1wbGFuLWRlc2NyaXB0aW9uXCIsIGNvbnQpO1xyXG4gICAgICAgICAgfSBlbHNlIGlmIChlbC5oYXNBdHRyaWJ1dGUoXCJkYXRhLW5hbWVcIikpIHtcclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIFRpbWVyIGRhdGFcclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIGVsLnNldEF0dHJpYnV0ZShcImRhdGEtbmFtZVwiLCBjb250KTtcclxuICAgICAgICAgIH0gZWxzZSBpZiAoY29udCAhPT0gXCJcIikge1xyXG4gICAgICAgICAgICBlbC5pbm5lckhUTUwgPSBjb250O1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgZWxlbWVudCBpbmRleCA6XCIsIGluZGV4KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxufSk7XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc2NyaXB0cy9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUN0Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OyIsInNvdXJjZVJvb3QiOiIifQ==