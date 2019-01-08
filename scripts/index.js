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
	      initDesktopPopupInteraction();
	    }

	    if (isAnimationSupportableBrowser() && !isMobile()) {
	      hideIllustrations();
	    }

	    initTimer();
	  }

	  function isEdge() {
	    return window.navigator.userAgent.indexOf("Edge") > -1;
	  }

	  function isAnimationSupportableBrowser() {
	    return !isEdge() && !isMozilla();
	  }

	  function isMozilla() {
	    return navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
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
	        begin: "dots-anim.end + 0.2s"
	      }).outerHTML;
	    });
	  }

	  function hideMapElements() {
	    const lines = document.querySelector("#lines");
	    const dots = map.querySelector(".dots");
	    const lands = document.querySelector("#land-parts");

	    lines.setAttribute("opacity", "0");
	    dots.setAttribute("opacity", "0");
	    lands.setAttribute("opacity", "0");
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
	        begin: "crypto-anim.end + 0.5s",
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
	        values: "0.5; 0.6; 1; 0.7; 0.4",
	        begin: "crypto-anim.end + 0.5s",
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

	    homeSection.addEventListener("touchstart", setStartTouchVariables, {passive: true});
	    homeSection.addEventListener("touchend", swipeHandler, {passive: true});

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

	    if (isDesktop() && isDocumentFrozen()) {
	      const howItWorksSection = document.querySelector(".how-it-works");
	      howItWorksSection.classList.add("opacify");

	      /**
	       * For Firefox
	       */
	      document.body.addEventListener("wheel", scrollToSection, {passive : true});

	      /**
	       * For Chrome
	       */
	      document.body.addEventListener("mousewheel", scrollToSection, {passive : true});
	    }

	    if (isMobile()) {
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
	    } else {
	      window.addEventListener("resize", initSlider);
	    }

	    
	    /**
	     * Bind a slider data changing with a view
	     */
	    slider.addEventListener("change",event => (summary.innerHTML = event.currentTarget.value));
	    /**
	     * Trigger scroll event
	     */
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

	    /**
	     * For Chrome
	     */
	    document.body.removeEventListener("mousewheel", scrollToSection);
	    /**
	     * For Mozilla
	     */
	    document.body.removeEventListener("wheel", scrollToSection);
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
	      "투자자 되기", //header button
	      "차별화된 글로벌 거래소 플랫폼", //home title
	      "히든토큰 구매", //home modal widget button
	      "투자", // home right widget logo text
	      "X 토큰은 17 000 000 개의 토큰에서 제외됩니다.", // home right widget info text
	      "ICO 투자", // home right widget button
	      "세계 최초 코인 구매부터 각종 ICO 참여까지 가능한 거래소 플랫폼", // home info description
	      "모금액", // home board item 1 board title
	      "설립자", //.home board item 2 board title
	      "지속", // home board item 3 board title
	      "특징", // how it works title
	      "프리세일 타이머",// popup title
	      "일", //timer days
	      "시", //timer hours
	      "분", //timer minutes
	      "초", //timer seconds
	      "1", //popup coin number
	      "HID = ",
	      "0.15$", //popup coin value
	      "총 17 000 000 토큰중 현재 B토큰이 남았습니다.", //popup second info
	      /**
	       * How it works Cards
	       */
	      /**
	       * Card 1
	       */
	      "세계 최초의 테조스 마켓 신설",
	      "세계 최초 tezos를 기축통화로 도입. 그 외 (BTC,ETH,EOS,KRW)",
	      /**
	       * Card 2
	       */
	      "베이킹 노드 운영",
	      "블록체인 노드를 운영을 통해 연 5.5% 상당의 TEZOS를 보상.",
	      /**
	       * Card 3
	       */
	      "거래소를 통한 ICO 참여 가능",
	      "개인 계정을 통해 ICO참여한 토큰 보호.",
	      /**
	       * Card 4
	       */
	      "투표권",
	      "HID 토큰 보유량에 따른 상장토큰에 대한 투표권을 행사 가능.",
	      /**
	       * Card 5
	       */
	      "세계 최초 손실 방지 보험제도 도입.",
	      "투자 손실예방에 대한 보험제도 도입으로 손실금액 보상.",
	      /**
	      * Card 6
	      */
	      "분기별 HID 토큰 바이백 및 소각.",
	      "거래소 수익금 일부를 HID 토큰 바이백 및 소각으로 시장 안정화.",
	      /**
	       * The whipaper
	       */
	      "백지",
	      "새로운 히든비트 백서를 공유할수 있어 기쁩니다.이백서는 피아트 통합을 통한 새로운 마이닝거래소를 소개하고 있습니다:Proof-of-Replication (PoR) and Proof-of-Spacetime (PoSt)",
	      "히든비트 백서보기",
	      /**
	       * The airdrop system
	       */
	      "에어드랍",
	      "독자적인 기술력으로 코인 구매부터 ico 참여까지 hiddenbit 에서 해결.",
	      "레벨과 보너스율은 기본가격과 별도로 적용됩니다.",
	      "추가 HID 코인,%",
	      /**
	       * The release 
	       */
	      "히든비트 토큰은 첫거래부터 스마트컨트랙트를 통해 프로그래밍 됩니다.",
	      "판매수량",
	      "판매비율(%)",
	      "보너스",
	      "가격($)",
	      "하드캡($)",
	      /**
	       * For miners
	       */
	      "채굴수량이 어떻게 되는가?",
	      "1개월~12개월 - ",
	      "2 859 302.84 코인",
	      "13개월~24개월 - ",
	      "1 429 651,42 코인",
	      "25개월~35개월- ",
	      "714,825.71 코인",
	      "36개월 - ",
	      "669,466.07 코인",
	      "로드맵",
	      /**
	       * Road map
	       */
	      "계획 및 개발",
	      "베타버전 런칭",
	      "거래소 런칭",
	      "글로벌 TOP10 거래소 선정",
	      /**
	       * Echanges title
	       */
	      "히든 코인이 거래되는 최고의 거래소",
	      /**
	       * Support
	       */
	      "24 × 7 지원 서비스",
	      "문의사항이 있으신경우, 언제든 답변해 드리겠습니다.",
	      "투자자 되기",
	      /**
	       * Research
	       */
	      "히든비트 거래소 둘러보기",
	      "히든비트 거래소 백서",
	      "복제방지",
	      "전원 결함 허용",
	      "2019 연구 로드맵",
	    ];

	    const textElements = [
	      getElement(".header__button"),
	      
	      getElement(".home .info__title"),
	      getElement(".home__modal .widget__button"),
	      getElement(".home__right .widget__logo .text"),
	      getElement(".home__right .widget__info .text"),
	      getElement(".home__right .widget__button"),
	      getElement(".home .info__description"),
	      getElement(".home .board__item--1 .board__title"),
	      getElement(".home .board__item--2 .board__title"),
	      getElement(".home .board__item--3 .board__title"),
	      getElement(".how-it-works__title"),
	      /**
	       * Timer and popup info
	       */
	      getElement(".home__modal .widget__title"),
	      getElement(".timer__days"),
	      getElement(".timer__hours"),
	      getElement(".timer__minutes"),
	      getElement(".timer__seconds"),
	      getElement(".home__modal .widget__info .coin__number"),
	      getElement(".home__modal .widget__info .text"),
	      getElement(".home__modal .widget__info .coin__price"),
	      getElement(".home__modal .widget__info--2 .text"),
	      /**
	       * How it works cards
	       */
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
	      /**
	       * Whitepaper
	       */
	      getElement(".whitepaper__title"),
	      getElement(".whitepaper__info"),
	      getElement(".whitepaper__button"),
	      /**
	       * Airdrop
	       */
	      getElement(".airdrop__title"),
	      getElement(".airdrop__info"),
	      getElement(".airdrop__additional-info"),
	      getElement(".airdrop__table .table__column--2"),
	      /**
	       * Tables
	       */
	      getElement(".release__title"),
	      getElement(".release .table__row--2 .table__column--1"),
	      getElement(".release .table__row--3 .table__column--1"),
	      getElement(".release .table__row--4 .table__column--1"),
	      getElement(".release .table__row--5 .table__column--1"),
	      getElement(".release .table__row--6 .table__column--1"),
	      /**
	       * For miners info
	       */
	      getElement(".for-miners__title"),
	      getElement(".for-miners .list__item--1 .text"),
	      getElement(".for-miners .list__item--1 .coins"),
	      getElement(".for-miners .list__item--2 .text"),
	      getElement(".for-miners .list__item--2 .coins"),
	      getElement(".for-miners .list__item--3 .text"),
	      getElement(".for-miners .list__item--3 .coins"),
	      getElement(".for-miners .list__item--4 .text"),
	      getElement(".for-miners .list__item--4 .coins"),
	      /**
	       * Road map
	       */
	      getElement(".road-map__title"),
	      getElement(".road-map .plan--1"),
	      getElement(".road-map .plan--3"),
	      getElement(".road-map .plan--4"),
	      getElement(".road-map .plan--5"),

	      getElement(".exchanges__title"),
	      /**
	       * Support
	       */ 
	      getElement(".support__title"),
	      getElement(".support__info"),
	      getElement(".support__button"),
	      /**
	       * Research
	       */
	      getElement(".research__title"),
	      getElement(".research__items .item--1 .item__title"),
	      getElement(".research__items .item--2 .item__title"),
	      getElement(".research__items .item--3 .item__title"),
	      getElement(".research__items .item--4 .item__title"),
	    ];

	    console.log('Length: ' + textElements.length);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNDEyNWRjZTI4MTViNzc2OGNjZDYiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvc2NyaXB0cy9cIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA0MTI1ZGNlMjgxNWI3NzY4Y2NkNiIsImRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsICgpID0+IHtcclxuICAvKipcclxuICAgKiBSZW1vdmUgdGhlIGxvYWRlciB3aGVuIGFsbCBzY3JpcHQgaGF2ZSBiZWVuIGxvYWRlZFxyXG4gICAqL1xyXG5cclxuICBpbml0KCk7XHJcbiAgYWRkTGFuZ3VhZ2VCdXR0b25zRXZlbnRMaXN0ZW5lcnMoKTtcclxuXHJcbiAgZnVuY3Rpb24gaW5pdCgpIHtcclxuICAgIGZyZWV6ZURvY3VtZW50KCk7XHJcbiAgICBhZGRFdmVudExpc3RlbmVycygpO1xyXG4gICAgXHJcbiAgICBpbml0U2xpZGVyKCk7XHJcblxyXG4gICAgaWYgKGlzTW9iaWxlKCkpIHtcclxuICAgICAgaW5pdE1vYmlsZVBvcHVwSW50ZXJhY3Rpb24oKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGluaXREZXNrdG9wUG9wdXBJbnRlcmFjdGlvbigpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChpc0FuaW1hdGlvblN1cHBvcnRhYmxlQnJvd3NlcigpICYmICFpc01vYmlsZSgpKSB7XHJcbiAgICAgIGhpZGVJbGx1c3RyYXRpb25zKCk7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdFRpbWVyKCk7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBpc0VkZ2UoKSB7XHJcbiAgICByZXR1cm4gd2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZihcIkVkZ2VcIikgPiAtMTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGlzQW5pbWF0aW9uU3VwcG9ydGFibGVCcm93c2VyKCkge1xyXG4gICAgcmV0dXJuICFpc0VkZ2UoKSAmJiAhaXNNb3ppbGxhKCk7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBpc01vemlsbGEoKSB7XHJcbiAgICByZXR1cm4gbmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpLmluZGV4T2YoJ2ZpcmVmb3gnKSA+IC0xO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gaGlkZUlsbHVzdHJhdGlvbnMoKSB7XHJcbiAgICBoaWRlQ3J5cHRvTWFjaGluZUVsZW1lbnRzKCk7XHJcbiAgICBoaWRlTm90ZWJvb2tFbGVtZW50cygpO1xyXG4gICAgaGlkZU1hcEVsZW1lbnRzKCk7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBpbml0V2F5UG9pbnRzSW50ZXJhY3Rpb24oKSB7XHJcbiAgICBsZXQgcm9hZE1hcFJlYWNoZWQgPSBmYWxzZTtcclxuICAgIGxldCBub3RlYm9va1JlYWNoZWQgPSBmYWxzZTtcclxuICAgIGxldCBzdXBwb3J0UmVhY2hlZCA9IGZhbHNlO1xyXG4gICAgbGV0IGFpckRyb3BSZWFjaGVkID0gZmFsc2U7XHJcblxyXG4gICAgbGV0IHJvYWRtYXAgPSBuZXcgV2F5cG9pbnQoe1xyXG4gICAgICBlbGVtZW50OiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnJvYWQtbWFwXCIpLFxyXG4gICAgICBoYW5kbGVyOiBmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAoIXJvYWRNYXBSZWFjaGVkKSB7XHJcbiAgICAgICAgICByb2FkTWFwUmVhY2hlZCA9IHRydWU7XHJcbiAgICAgICAgICBjb25zdCByb2FkTGluZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucm9hZC1tYXBfX2xpbmVcIik7XHJcbiAgICAgICAgICBjb25zdCBwbGFuTGluZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnBsYW5fX3JvYWQtbGluZVwiKTtcclxuICAgICAgICAgIGNvbnN0IHBsYW5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5wbGFuXCIpO1xyXG4gICAgICAgICAgY29uc3QgY2lyY2xlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucGxhbl9fY2lyY2xlXCIpO1xyXG5cclxuICAgICAgICAgIHJvYWRMaW5lLmNsYXNzTGlzdC5hZGQoXCJzaG93ZWRcIik7XHJcbiAgICAgICAgICBjb25zdCBkZWxheSA9IDUwMDtcclxuXHJcbiAgICAgICAgICBwbGFuTGluZXMuZm9yRWFjaCgocGwsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IF9kZWxheSA9IGRlbGF5ICsgMTAwICogaW5kZXg7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgIHBsLmNsYXNzTGlzdC5hZGQoXCJzaG93ZWRcIik7XHJcbiAgICAgICAgICAgICAgY2lyY2xlc1tpbmRleF0uY2xhc3NMaXN0LmFkZChcInNob3dlZFwiKTtcclxuICAgICAgICAgICAgICBwbGFuc1tpbmRleF0uY2xhc3NMaXN0LmFkZChcInNob3dlZFwiKTtcclxuICAgICAgICAgICAgfSwgX2RlbGF5KTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfSxcclxuICAgICAgb2Zmc2V0OiBcIjQwJVwiXHJcbiAgICB9KTtcclxuXHJcbiAgICBsZXQgbm90ZWJvb2sgPSBuZXcgV2F5cG9pbnQoe1xyXG4gICAgICBlbGVtZW50OiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLndoaXRlcGFwZXJcIiksXHJcbiAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmICghbm90ZWJvb2tSZWFjaGVkKSB7XHJcbiAgICAgICAgICBub3RlYm9va1JlYWNoZWQgPSB0cnVlO1xyXG5cclxuICAgICAgICAgIGNvbnN0IHRyaWdnZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm5vdGVib29rXCIpO1xyXG4gICAgICAgICAgY29uc3QgdHJpZ2dlckFuaW1hdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWFpblwiKTtcclxuXHJcbiAgICAgICAgICBpZiAoIWlzTW9iaWxlKCkpIHtcclxuICAgICAgICAgICAgdHJpZ2dlci5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudChcImNsaWNrXCIpKTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICB0cmlnZ2VyQW5pbWF0aW9uLnJlbW92ZUF0dHJpYnV0ZShcImJlZ2luXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSxcclxuICAgICAgb2Zmc2V0OiBcIjEwMCVcIlxyXG4gICAgfSk7XHJcblxyXG4gICAgbGV0IHN1cHBvcnQgPSBuZXcgV2F5cG9pbnQoe1xyXG4gICAgICBlbGVtZW50OiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnN1cHBvcnRcIiksXHJcbiAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmICghc3VwcG9ydFJlYWNoZWQpIHtcclxuICAgICAgICAgIHN1cHBvcnRSZWFjaGVkID0gdHJ1ZTtcclxuICAgICAgICAgIGNvbnN0IHRyaWdnZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2xhbmQtcGFydHNcIik7XHJcbiAgICAgICAgICBjb25zdCB0cmlnZ2VyQW5pbWF0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNsYW5kLXBhcnRzLWFuaW1cIik7XHJcblxyXG4gICAgICAgICAgaWYgKCFpc01vYmlsZSgpKSB7XHJcbiAgICAgICAgICAgIGFuaW1hdGVNYXAoKTtcclxuICAgICAgICAgICAgdHJpZ2dlci5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudChcImNsaWNrXCIpKTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICB0cmlnZ2VyQW5pbWF0aW9uLnJlbW92ZUF0dHJpYnV0ZShcImJlZ2luXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSxcclxuICAgICAgb2Zmc2V0OiBcIjQwJVwiXHJcbiAgICB9KTtcclxuXHJcbiAgICBsZXQgYWlyZHJvcCA9IG5ldyBXYXlwb2ludCh7XHJcbiAgICAgIGVsZW1lbnQ6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWlyZHJvcFwiKSxcclxuICAgICAgaGFuZGxlcjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKCFhaXJEcm9wUmVhY2hlZCkge1xyXG4gICAgICAgICAgYWlyRHJvcFJlYWNoZWQgPSB0cnVlO1xyXG4gICAgICAgICAgY29uc3QgdHJpZ2dlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY3J5cHRvXCIpO1xyXG4gICAgICAgICAgY29uc3QgdHJpZ2dlckFuaW1hdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY3J5cHRvLWFuaW1cIik7XHJcblxyXG4gICAgICAgICAgaWYgKCFpc01vYmlsZSgpKSB7XHJcbiAgICAgICAgICAgIGFuaW1hdGVDcnlwdG9NYWNoaW5lKCk7XHJcbiAgICAgICAgICAgIHRyaWdnZXIuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoXCJjbGlja1wiKSk7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgdHJpZ2dlckFuaW1hdGlvbi5yZW1vdmVBdHRyaWJ1dGUoXCJiZWdpblwiKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICAgIG9mZnNldDogXCIxMDAlXCJcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gaXNNb2JpbGUoKSB7XHJcbiAgICByZXR1cm4gd2luZG93LmlubmVyV2lkdGggPD0gNjUwO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gaW5pdFRpbWVyKHllYXIsIG1vbnRoLCB3ZWVrLCBkYXkpIHtcclxuICAgIGNvbnN0IHRpbWVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50aW1lclwiKTtcclxuICAgIGNvbnN0IGRheXMgPSB0aW1lci5xdWVyeVNlbGVjdG9yKFwiLnRpbWVyX19kYXlzXCIpO1xyXG4gICAgY29uc3QgbWlucyA9IHRpbWVyLnF1ZXJ5U2VsZWN0b3IoXCIudGltZXJfX21pbnV0ZXNcIik7XHJcbiAgICBjb25zdCBzZWNzID0gdGltZXIucXVlcnlTZWxlY3RvcihcIi50aW1lcl9fc2Vjb25kc1wiKTtcclxuICAgIGNvbnN0IGhvdXJzID0gdGltZXIucXVlcnlTZWxlY3RvcihcIi50aW1lcl9faG91cnNcIik7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJbml0aWFsaXphdGlvblxyXG4gICAgICovXHJcblxyXG4gICAgZGF5cy5pbm5lckhUTUwgPSB3cmFwV2l0aFplcm8oMTUpO1xyXG4gICAgbWlucy5pbm5lckhUTUwgPSB3cmFwV2l0aFplcm8oMCk7XHJcbiAgICBzZWNzLmlubmVySFRNTCA9IHdyYXBXaXRoWmVybygwKTtcclxuICAgIGhvdXJzLmlubmVySFRNTCA9IHdyYXBXaXRoWmVybygwKTtcclxuXHJcbiAgICBzZXRJbnRlcnZhbChkZWNyZWFzZSwgMTAwMCk7XHJcblxyXG4gICAgZnVuY3Rpb24gZGVjcmVhc2UoKSB7XHJcbiAgICAgIGNvbnN0IHRpbWVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50aW1lclwiKTtcclxuICAgICAgY29uc3QgZGF5cyA9IHRpbWVyLnF1ZXJ5U2VsZWN0b3IoXCIudGltZXJfX2RheXNcIik7XHJcbiAgICAgIGNvbnN0IG1pbnMgPSB0aW1lci5xdWVyeVNlbGVjdG9yKFwiLnRpbWVyX19taW51dGVzXCIpO1xyXG4gICAgICBjb25zdCBzZWNzID0gdGltZXIucXVlcnlTZWxlY3RvcihcIi50aW1lcl9fc2Vjb25kc1wiKTtcclxuICAgICAgY29uc3QgaG91cnMgPSB0aW1lci5xdWVyeVNlbGVjdG9yKFwiLnRpbWVyX19ob3Vyc1wiKTtcclxuXHJcbiAgICAgIGxldCBzID0gK3NlY3MuaW5uZXJIVE1MLFxyXG4gICAgICAgIG0gPSArbWlucy5pbm5lckhUTUwsXHJcbiAgICAgICAgaCA9ICtob3Vycy5pbm5lckhUTUwsXHJcbiAgICAgICAgZCA9ICtkYXlzLmlubmVySFRNTDtcclxuXHJcbiAgICAgIGlmIChzID4gMCkgLS1zO1xyXG5cclxuICAgICAgaWYgKHMgPT09IDApIHtcclxuICAgICAgICBzID0gNTk7XHJcbiAgICAgICAgaWYgKG0gPiAwKSBtLS07XHJcbiAgICAgIH1cclxuICAgICAgaWYgKG0gPT09IDApIHtcclxuICAgICAgICBtID0gNTk7XHJcbiAgICAgICAgaWYgKGggPiAwKSBoLS07XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGggPT09IDApIHtcclxuICAgICAgICBoID0gMjM7XHJcbiAgICAgICAgaWYgKGQgPiAwKSBkLS07XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHNlY3MuaW5uZXJIVE1MID0gcztcclxuICAgICAgbWlucy5pbm5lckhUTUwgPSBtO1xyXG4gICAgICBob3Vycy5pbm5lckhUTUwgPSBoO1xyXG4gICAgICBkYXlzLmlubmVySFRNTCA9IGQ7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gd3JhcFdpdGhaZXJvKHN0cmluZykge1xyXG4gICAgICBzdHJpbmcgPSBzdHJpbmcgKyBcIlwiO1xyXG5cclxuICAgICAgaWYgKHN0cmluZy5sZW5ndGggPCAyKSB7XHJcbiAgICAgICAgc3RyaW5nID0gXCIwXCIgKyBzdHJpbmc7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHN0cmluZztcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGhpZGVDcnlwdG9NYWNoaW5lRWxlbWVudHMoKSB7XHJcbiAgICBjb25zdCBjcnlwdG8gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNyeXB0b1wiKTtcclxuICAgIGNyeXB0by5zZXRBdHRyaWJ1dGUoXCJvcGFjaXR5XCIsIFwiMFwiKTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGhpZGVOb3RlYm9va0VsZW1lbnRzKCkge1xyXG4gICAgY29uc3Qgbm90ZWJvb2sgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm5vdGVib29rXCIpO1xyXG4gICAgY29uc3QgcGFnZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiW2lkXj0ncGFnZSddXCIpO1xyXG4gICAgY29uc3QgdW5kZXJsYXllciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibGF5ZXItMVwiKTtcclxuXHJcbiAgICBwYWdlcy5mb3JFYWNoKHBhZ2UgPT4gcGFnZS5zZXRBdHRyaWJ1dGUoXCJvcGFjaXR5XCIsIFwiMFwiKSk7XHJcbiAgICBub3RlYm9vay5zZXRBdHRyaWJ1dGUoXCJvcGFjaXR5XCIsIFwiMFwiKTtcclxuICAgIHVuZGVybGF5ZXIuc2V0QXR0cmlidXRlKFwib3BhY2l0eVwiLCBcIjBcIik7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBpbml0U2xpZGVyKCkge1xyXG4gICAgaWYgKGlzTW9iaWxlKCkpIHtcclxuICAgICAgJChcIi5ob3ctaXQtd29ya3NfX2NhcmRzXCIpLm93bENhcm91c2VsKHtcclxuICAgICAgICBpdGVtczogMSxcclxuICAgICAgICBtYXJnaW46IDMwLFxyXG4gICAgICAgIHBhZGRpbmc6IDMwXHJcbiAgICAgIH0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgJChcIi5ob3ctaXQtd29ya3NfX2NhcmRzXCIpLnRyaWdnZXIoXCJkZXN0cm95Lm93bC5jYXJvdXNlbFwiKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGFuaW1hdGVNYXAoKSB7XHJcbiAgICBjb25zdCBkb3RzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kb3RzXCIpO1xyXG5cclxuICAgIEFycmF5LmZyb20oZG90cy5jaGlsZE5vZGVzKS5mb3JFYWNoKGRvdCA9PiB7XHJcbiAgICAgIGNvbnN0IHBhdGggPSBkb3QucXVlcnlTZWxlY3RvcihcInBhdGhcIik7XHJcbiAgICAgIHBhdGguc2V0QXR0cmlidXRlKFwib3BhY2l0eVwiLCBcIjFcIik7XHJcbiAgICAgIHBhdGguaW5uZXJIVE1MID0gY3JlYXRlQW5pbWF0aW9uRWxlbWVudChcImFuaW1hdGVcIiwge1xyXG4gICAgICAgIFwieGxpbms6aHJlZlwiOiBcIiNcIiArIHBhdGguaWQsXHJcbiAgICAgICAgYXR0cmlidXRlTmFtZTogXCJvcGFjaXR5XCIsXHJcbiAgICAgICAgZHVyOiBgJHtNYXRoLnJhbmRvbSgpICogMiArIDAuNX1zYCxcclxuICAgICAgICBmcm9tOiBcIjFcIixcclxuICAgICAgICB0bzogXCIwXCIsXHJcbiAgICAgICAgcmVwZWF0Q291bnQ6IFwiaW5kZWZpbml0ZVwiLFxyXG4gICAgICAgIGJlZ2luOiBcImRvdHMtYW5pbS5lbmQgKyAwLjJzXCJcclxuICAgICAgfSkub3V0ZXJIVE1MO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBoaWRlTWFwRWxlbWVudHMoKSB7XHJcbiAgICBjb25zdCBsaW5lcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbGluZXNcIik7XHJcbiAgICBjb25zdCBkb3RzID0gbWFwLnF1ZXJ5U2VsZWN0b3IoXCIuZG90c1wiKTtcclxuICAgIGNvbnN0IGxhbmRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNsYW5kLXBhcnRzXCIpO1xyXG5cclxuICAgIGxpbmVzLnNldEF0dHJpYnV0ZShcIm9wYWNpdHlcIiwgXCIwXCIpO1xyXG4gICAgZG90cy5zZXRBdHRyaWJ1dGUoXCJvcGFjaXR5XCIsIFwiMFwiKTtcclxuICAgIGxhbmRzLnNldEF0dHJpYnV0ZShcIm9wYWNpdHlcIiwgXCIwXCIpO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gY3JlYXRlQW5pbWF0aW9uRWxlbWVudChhbmltYXRpb25FbGVtZW50LCBjb25maWcpIHtcclxuICAgIGlmICghY29uZmlnKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBhbmltYXRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGFuaW1hdGlvbkVsZW1lbnQpO1xyXG4gICAgZm9yIChsZXQgb3B0aW9uIGluIGNvbmZpZykge1xyXG4gICAgICBhbmltYXRpb24uc2V0QXR0cmlidXRlKG9wdGlvbiwgY29uZmlnW29wdGlvbl0pO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBhbmltYXRpb247XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBhbmltYXRlQ3J5cHRvTWFjaGluZSgpIHtcclxuICAgIGNvbnN0IGNyeXB0b01hY2hpbmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NyeXB0b1wiKTtcclxuXHJcbiAgICBjb25zdCBjaXJjbGVzID0gY3J5cHRvTWFjaGluZS5xdWVyeVNlbGVjdG9yQWxsKFwiLmNpcmNsZVwiKTtcclxuICAgIGNvbnN0IHN1YnN0cmF0ZXMgPSBjcnlwdG9NYWNoaW5lLnF1ZXJ5U2VsZWN0b3JBbGwoXCIuc3Vic3RyYXRlXCIpO1xyXG5cclxuICAgIGluaXRBbmltYXRlZExpbmVzKGNyeXB0b01hY2hpbmUpO1xyXG5cclxuICAgIHN1YnN0cmF0ZXMuZm9yRWFjaCgoc3Vic3RyYXRlLCBpbmRleCkgPT4ge1xyXG4gICAgICBzdWJzdHJhdGUuc2V0QXR0cmlidXRlKFwiaWRcIiwgYHN1YnN0cmF0ZS0ke2luZGV4fWApO1xyXG4gICAgICBzdWJzdHJhdGUuc2V0QXR0cmlidXRlKFwib3BhY2l0eVwiLCBcIjBcIik7XHJcbiAgICAgIGNvbnN0IGFuaW1hdGlvbiA9IGNyZWF0ZUFuaW1hdGlvbkVsZW1lbnQoXCJhbmltYXRlXCIsIHtcclxuICAgICAgICBcInhsaW5rOmhyZWZcIjogYCNzdWJzdHJhdGUtJHtpbmRleH1gLFxyXG4gICAgICAgIGF0dHJpYnV0ZU5hbWU6IFwib3BhY2l0eVwiLFxyXG4gICAgICAgIGR1cjogYDJzYCxcclxuICAgICAgICBmcm9tOiBcIjBcIixcclxuICAgICAgICB0bzogXCIxXCIsXHJcbiAgICAgICAgYmVnaW46IFwiY3J5cHRvLWFuaW0uZW5kICsgMC41c1wiLFxyXG4gICAgICAgIGZpbGw6IFwiZnJlZXplXCJcclxuICAgICAgfSk7XHJcbiAgICAgIGFkZEFuaW1hdGlvblRvU3ZnRWxlbWVudChzdWJzdHJhdGUsIGFuaW1hdGlvbik7XHJcbiAgICB9KTtcclxuXHJcbiAgICBjaXJjbGVzLmZvckVhY2goKGNpcmNsZSwgaW5kZXgpID0+IHtcclxuICAgICAgY2lyY2xlLnNldEF0dHJpYnV0ZShcImlkXCIsIGBjaXJjbGUtJHtpbmRleH1gKTtcclxuICAgICAgY2lyY2xlLnNldEF0dHJpYnV0ZShcIm9wYWNpdHlcIiwgXCIwXCIpO1xyXG4gICAgICBjb25zdCBhbmltYXRpb24gPSBjcmVhdGVBbmltYXRpb25FbGVtZW50KFwiYW5pbWF0ZVwiLCB7XHJcbiAgICAgICAgXCJ4bGluazpocmVmXCI6IGAjY2lyY2xlLSR7aW5kZXh9YCxcclxuICAgICAgICBhdHRyaWJ1dGVOYW1lOiBcIm9wYWNpdHlcIixcclxuICAgICAgICBkdXI6IGAke01hdGgucmFuZG9tKCkgKiAzICsgMX1zYCxcclxuICAgICAgICB2YWx1ZXM6IFwiMC41OyAwLjY7IDE7IDAuNzsgMC40XCIsXHJcbiAgICAgICAgYmVnaW46IFwiY3J5cHRvLWFuaW0uZW5kICsgMC41c1wiLFxyXG4gICAgICAgIHJlcGVhdENvdW50OiBcImluZGVmaW5pdGVcIlxyXG4gICAgICB9KTtcclxuICAgICAgYWRkQW5pbWF0aW9uVG9TdmdFbGVtZW50KGNpcmNsZSwgYW5pbWF0aW9uKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gaW5pdEFuaW1hdGVkTGluZXMocm9vdCkge1xyXG4gICAgY3JlYXRlQW5pbWF0ZWRMaW5lKFwiI2xpbmUtMVwiLCAwLjAwMSwgMTApO1xyXG4gICAgY3JlYXRlQW5pbWF0ZWRMaW5lKFwiI2xpbmUtMlwiLCAwLjEsIDIwKTtcclxuICAgIGNyZWF0ZUFuaW1hdGVkTGluZShcIiNsaW5lLTNcIiwgMC4yLCA1MCk7XHJcbiAgICBjcmVhdGVBbmltYXRlZExpbmUoXCIjbGluZS00XCIsIDAuMywgNTApO1xyXG4gICAgY3JlYXRlQW5pbWF0ZWRMaW5lKFwiI2xpbmUtNVwiLCAwLjQsIDQwKTtcclxuICAgIGNyZWF0ZUFuaW1hdGVkTGluZShcIiNsaW5lLTZcIiwgMC41LCAxMCk7XHJcblxyXG4gICAgZnVuY3Rpb24gY3JlYXRlQW5pbWF0ZWRMaW5lKGxpbmVJZCwgZGVsYXksIG1vdmluZ0hlaWdodCkge1xyXG4gICAgICBjb25zdCBsaW5lID0gcm9vdC5xdWVyeVNlbGVjdG9yKGxpbmVJZCk7XHJcbiAgICAgIGNvbnN0IGxpbmVBbmltYXRpb25Db25maWcgPSBjcmVhdGVBbmltYXRpb25FbGVtZW50KFwiYW5pbWF0ZVRyYW5zZm9ybVwiLCB7XHJcbiAgICAgICAgYXR0cmlidXRlTmFtZTogXCJ0cmFuc2Zvcm1cIixcclxuICAgICAgICBkdXI6IGAyc2AsXHJcbiAgICAgICAgYmVnaW46IGBjcnlwdG8tYW5pbS5lbmQgKyAke2RlbGF5fXNgLFxyXG4gICAgICAgIHR5cGU6IFwidHJhbnNsYXRlXCIsXHJcbiAgICAgICAgdmFsdWVzOiBgMCAwOyAwIC0ke21vdmluZ0hlaWdodH07IDAgMDsgMCAke21vdmluZ0hlaWdodH07IDAgMDtgLFxyXG4gICAgICAgIHJlcGVhdENvdW50OiBcImluZGVmaW5pdGVcIlxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGFkZEFuaW1hdGlvblRvU3ZnRWxlbWVudChsaW5lLCBsaW5lQW5pbWF0aW9uQ29uZmlnKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGFkZEFuaW1hdGlvblRvU3ZnRWxlbWVudChlbGVtZW50LCBhbmltYXRpb24pIHtcclxuICAgIGVsZW1lbnQuaW5uZXJIVE1MID0gYW5pbWF0aW9uLm91dGVySFRNTDtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGluaXREZXNrdG9wUG9wdXBJbnRlcmFjdGlvbigpIHtcclxuICAgIGxldCBkZWNvcmF0aXZlRnVuY3Rpb24gPSBkZWJvdW5jZShpc01vdXNlT25XaWRnZXQsIDUwKTtcclxuICAgIGxldCBoYXNUYXBwZWQgPSBmYWxzZTtcclxuXHJcbiAgICBkb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW1vdmVcIiwgZGVjb3JhdGl2ZUZ1bmN0aW9uKTtcclxuXHJcbiAgICBmdW5jdGlvbiBpc01vdXNlT25XaWRnZXQoZXZlbnQpIHtcclxuICAgICAgY29uc3QgcG9zWCA9IGV2ZW50LmNsaWVudFgsXHJcbiAgICAgICAgcG9zWSA9IGV2ZW50LmNsaWVudFk7XHJcblxyXG4gICAgICBjb25zdCBwb3B1cCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaG9tZV9fbW9kYWxcIik7XHJcblxyXG4gICAgICBjb25zdCBpc09uV2lkZ2V0ID0gaXNPbkVsZW1lbnQocG9zWCwgcG9zWSwgXCIuaG9tZV9fcmlnaHQgLndpZGdldFwiKTtcclxuICAgICAgY29uc3QgaXNPbkJ1dHRvbiA9IGlzT25FbGVtZW50KHBvc1gsIHBvc1ksIFwiLndpZGdldF9fYnV0dG9uXCIpO1xyXG4gICAgICBjb25zdCBpc09uUG9wdXAgPSBpc09uRWxlbWVudChwb3NYLCBwb3NZLCBcIi5ob21lX19tb2RhbFwiKTtcclxuICAgICAgY29uc3QgaXNPbklucHV0ID0gaXNPbkVsZW1lbnQocG9zWCwgcG9zWSwgXCIud2lkZ2V0X19zbGlkZXJcIik7XHJcblxyXG4gICAgICBpZiAoXHJcbiAgICAgICAgKGlzT25XaWRnZXQgfHwgaXNPblBvcHVwKSAmJlxyXG4gICAgICAgICFpc09uQnV0dG9uICYmXHJcbiAgICAgICAgIWlzT25JbnB1dCAmJlxyXG4gICAgICAgICFoYXNNb3VzZSgpXHJcbiAgICAgICkge1xyXG4gICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZChcIndpZGdldC1vbi1ob3ZlclwiKTtcclxuICAgICAgICBwb3B1cC5jbGFzc0xpc3QuYWRkKFwic2hvd2VkXCIpO1xyXG5cclxuICAgICAgICBpZiAoIWhhc1RhcHBlZCkge1xyXG4gICAgICAgICAgY29uc3QgdGFwTGluZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIud2lkZ2V0X190YXAtbGluZVwiKTtcclxuICAgICAgICAgIHRhcExpbmUuY2xhc3NMaXN0LmFkZChcInRhcHBlZFwiKTtcclxuXHJcbiAgICAgICAgICBoYXNUb3VjaGVkID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29uc3QgZGVsYXkgPSAzMDA7XHJcblxyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QucmVtb3ZlKFwid2lkZ2V0LW9uLWhvdmVyXCIpO1xyXG4gICAgICAgICAgcG9wdXAuY2xhc3NMaXN0LnJlbW92ZShcInNob3dlZFwiKTtcclxuICAgICAgICB9LCBkZWxheSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGlzT25FbGVtZW50KHBvc1gsIHBvc1ksIGVsZW1lbnRUYWcpIHtcclxuICAgIGNvbnN0IGVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihlbGVtZW50VGFnKTtcclxuICAgIGNvbnN0IGVsUG9zSW5mbyA9IGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG5cclxuICAgIGNvbnN0IGVsX3gxID0gZWxQb3NJbmZvLng7XHJcbiAgICBjb25zdCBlbF95MSA9IGVsUG9zSW5mby55O1xyXG4gICAgY29uc3QgZWxfeDIgPSBlbF94MSArIGVsUG9zSW5mby53aWR0aDtcclxuICAgIGNvbnN0IGVsX3kyID0gZWxfeTEgKyBlbFBvc0luZm8uaGVpZ2h0O1xyXG5cclxuICAgIHJldHVybiBwb3NYID49IGVsX3gxICYmIHBvc1ggPD0gZWxfeDIgJiYgcG9zWSA+PSBlbF95MSAmJiBwb3NZIDw9IGVsX3kyO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gc2hvd1BvcHVwKCkge1xyXG4gICAgY29uc3QgcG9wdXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmhvbWVfX21vZGFsXCIpO1xyXG5cclxuICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZChcIndpZGdldC1vbi1ob3ZlclwiKTtcclxuICAgIHBvcHVwLmNsYXNzTGlzdC5hZGQoXCJzaG93ZWRcIik7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBoaWRlV2lkZ2V0KCkge1xyXG4gICAgY29uc3Qgd2lkZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5ob21lX19yaWdodCAud2lkZ2V0XCIpO1xyXG4gICAgd2lkZ2V0LmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBpbml0TW9iaWxlUG9wdXBJbnRlcmFjdGlvbigpIHtcclxuICAgIGxldCB0b3VjaHN0YXJ0WCA9IDA7XHJcbiAgICBsZXQgdG91Y2hzdGFydFkgPSAwO1xyXG4gICAgbGV0IHRvdWNoZW5kWCA9IDA7XHJcbiAgICBsZXQgdG91Y2hlbmRZID0gMDtcclxuXHJcbiAgICBsZXQgaGFzU3dpcGVkID0gZmFsc2U7XHJcblxyXG4gICAgY29uc3QgaG9tZVNlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmhvbWVcIik7XHJcblxyXG4gICAgaG9tZVNlY3Rpb24uYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoc3RhcnRcIiwgc2V0U3RhcnRUb3VjaFZhcmlhYmxlcywge3Bhc3NpdmU6IHRydWV9KTtcclxuICAgIGhvbWVTZWN0aW9uLmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaGVuZFwiLCBzd2lwZUhhbmRsZXIsIHtwYXNzaXZlOiB0cnVlfSk7XHJcblxyXG4gICAgaGlkZVBvcHVwc0FuZFdpZGdldEJvcmRlckJvdHRvbSgpO1xyXG5cclxuICAgIGZ1bmN0aW9uIHNldFN0YXJ0VG91Y2hWYXJpYWJsZXMoZXZlbnQpIHtcclxuICAgICAgdG91Y2hzdGFydFggPSBldmVudC5jaGFuZ2VkVG91Y2hlc1swXS5zY3JlZW5YO1xyXG4gICAgICB0b3VjaHN0YXJ0WSA9IGV2ZW50LmNoYW5nZWRUb3VjaGVzWzBdLnNjcmVlblk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gaGlkZVBvcHVwc0FuZFdpZGdldEJvcmRlckJvdHRvbSgpIHtcclxuICAgICAgY29uc3QgcG9wdXBUb3BTZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcclxuICAgICAgICBcIi5ob21lX19tb2RhbCAud2lkZ2V0X190b3BcIlxyXG4gICAgICApO1xyXG4gICAgICBjb25zdCB3aWRnZXRUb3BTZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcclxuICAgICAgICBcIi5ob21lX19yaWdodCAud2lkZ2V0X190b3BcIlxyXG4gICAgICApO1xyXG5cclxuICAgICAgcG9wdXBUb3BTZWN0aW9uLmNsYXNzTGlzdC5hZGQoXCJuby1ib3JkZXJcIik7XHJcbiAgICAgIHdpZGdldFRvcFNlY3Rpb24uY2xhc3NMaXN0LmFkZChcIm5vLWJvcmRlclwiKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBzd2lwZUhhbmRsZXIoZXZlbnQpIHtcclxuICAgICAgY29uc3Qgd2lkZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5ob21lX19yaWdodCAud2lkZ2V0XCIpO1xyXG4gICAgICBjb25zdCBwb3B1cCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaG9tZV9fbW9kYWxcIik7XHJcblxyXG4gICAgICB0b3VjaGVuZFggPSBldmVudC5jaGFuZ2VkVG91Y2hlc1swXS5zY3JlZW5YO1xyXG4gICAgICB0b3VjaGVuZFkgPSBldmVudC5jaGFuZ2VkVG91Y2hlc1swXS5zY3JlZW5ZO1xyXG4gICAgICB0YXJnZXQgPSBldmVudC50YXJnZXQ7XHJcblxyXG4gICAgICBjb25zdCBpc1N3aXBlSXNTaG9ydGVyVGhlblF1YXJ0ZXIgPVxyXG4gICAgICAgIE1hdGguYWJzKHRvdWNoZW5kWCAtIHRvdWNoc3RhcnRYKSA8PSB3aW5kb3cuaW5uZXJXaWR0aCAvIDQ7XHJcblxyXG4gICAgICBpZiAoaXNTd2lwZUlzU2hvcnRlclRoZW5RdWFydGVyKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9IGVsc2UgaWYgKHRvdWNoZW5kWCA+PSB0b3VjaHN0YXJ0WCkge1xyXG4gICAgICAgIGlmIChpc1VzZXJTd2lwZVdhc09uV2lkZ2V0KCkpIHtcclxuICAgICAgICAgIHNob3dQb3B1cCgpO1xyXG4gICAgICAgICAgaGlkZVdpZGdldCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCFoYXNTd2lwZWQpIHtcclxuICAgICAgICAgIGNvbnN0IHN3YXBMaW5lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi53aWRnZXRfX3N3aXBlLWxpbmVcIik7XHJcbiAgICAgICAgICBzd2FwTGluZS5jbGFzc0xpc3QuYWRkKFwid2lkZ2V0X19zd2lwZS1saW5lLS1uby10aXRsZVwiKTtcclxuXHJcbiAgICAgICAgICBoYXNTd2lwZWQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBIaWRlIHBvcHVwXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgaWYgKGlzVXNlclN3aXBlV2FzT25XaWRnZXQoKSkge1xyXG4gICAgICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QucmVtb3ZlKFwid2lkZ2V0LW9uLWhvdmVyXCIpO1xyXG4gICAgICAgICAgcG9wdXAuY2xhc3NMaXN0LnJlbW92ZShcInNob3dlZFwiKTtcclxuICAgICAgICAgIHdpZGdldC5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgZnVuY3Rpb24gaXNVc2VyU3dpcGVXYXNPbldpZGdldCgpIHtcclxuICAgICAgICByZXR1cm4gdGFyZ2V0LmNsb3Nlc3QoXCIud2lkZ2V0XCIpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBkZWJvdW5jZShmLCBtcykge1xyXG4gICAgbGV0IHRpbWVyID0gbnVsbDtcclxuXHJcbiAgICByZXR1cm4gZnVuY3Rpb24oLi4uYXJncykge1xyXG4gICAgICBjb25zdCBvbkNvbXBsZXRlID0gKCkgPT4ge1xyXG4gICAgICAgIGYuYXBwbHkodGhpcywgYXJncyk7XHJcbiAgICAgICAgdGltZXIgPSBudWxsO1xyXG4gICAgICB9O1xyXG5cclxuICAgICAgaWYgKHRpbWVyKSB7XHJcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVyKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgdGltZXIgPSBzZXRUaW1lb3V0KG9uQ29tcGxldGUsIG1zKTtcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBhZGRFdmVudExpc3RlbmVycygpIHtcclxuICAgIGNvbnN0IHNsaWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2xpZGVyXCIpO1xyXG4gICAgY29uc3Qgc3VtbWFyeSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIud2lkZ2V0X19jdXJyZW50LXN1bW1hcnkgLnN1bW1hcnlcIik7XHJcblxyXG4gICAgaWYgKGlzRGVza3RvcCgpICYmIGlzRG9jdW1lbnRGcm96ZW4oKSkge1xyXG4gICAgICBjb25zdCBob3dJdFdvcmtzU2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaG93LWl0LXdvcmtzXCIpO1xyXG4gICAgICBob3dJdFdvcmtzU2VjdGlvbi5jbGFzc0xpc3QuYWRkKFwib3BhY2lmeVwiKTtcclxuXHJcbiAgICAgIC8qKlxyXG4gICAgICAgKiBGb3IgRmlyZWZveFxyXG4gICAgICAgKi9cclxuICAgICAgZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyKFwid2hlZWxcIiwgc2Nyb2xsVG9TZWN0aW9uLCB7cGFzc2l2ZSA6IHRydWV9KTtcclxuXHJcbiAgICAgIC8qKlxyXG4gICAgICAgKiBGb3IgQ2hyb21lXHJcbiAgICAgICAqL1xyXG4gICAgICBkb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZXdoZWVsXCIsIHNjcm9sbFRvU2VjdGlvbiwge3Bhc3NpdmUgOiB0cnVlfSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGlzTW9iaWxlKCkpIHtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIWlzTW9iaWxlKCkpIHtcclxuICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGhlYWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaGVhZGVyXCIpO1xyXG4gICAgICAgIGlmIChoZWFkZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuYm90dG9tIDwgd2luZG93LnBhZ2VZT2Zmc2V0KSB7XHJcbiAgICAgICAgICBoZWFkZXIuY2xhc3NMaXN0LmFkZChcImZpeGVkXCIpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBoZWFkZXIuY2xhc3NMaXN0LnJlbW92ZShcImZpeGVkXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCBpbml0U2xpZGVyKTtcclxuICAgIH1cclxuXHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogQmluZCBhIHNsaWRlciBkYXRhIGNoYW5naW5nIHdpdGggYSB2aWV3XHJcbiAgICAgKi9cclxuICAgIHNsaWRlci5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsZXZlbnQgPT4gKHN1bW1hcnkuaW5uZXJIVE1MID0gZXZlbnQuY3VycmVudFRhcmdldC52YWx1ZSkpO1xyXG4gICAgLyoqXHJcbiAgICAgKiBUcmlnZ2VyIHNjcm9sbCBldmVudFxyXG4gICAgICovXHJcbiAgICB3aW5kb3cuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoXCJzY3JvbGxcIikpO1xyXG4gICAgYWRkQnV0dG9uc0V2ZW50TGlzdGVuZXJzKCk7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBpc0Rlc2t0b3AoKSB7XHJcbiAgICByZXR1cm4gd2luZG93LmlubmVyV2lkdGggPiAxMjAwO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gc2Nyb2xsVG9TZWN0aW9uKCkge1xyXG4gICAgY29uc3Qgc2Nyb2xsTW91c2VUbyA9ICQoXCIjc2Nyb2xsLXRvXCIpLm9mZnNldCgpLnRvcDtcclxuICAgIGNvbnN0IGhvd0l0V29ya3NTZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5ob3ctaXQtd29ya3NcIik7XHJcblxyXG4gICAgY29uc3Qgc2Nyb2xsVGltZSA9IDkwMDtcclxuICAgIGNvbnN0IGRlbGF5ID0gNTAwO1xyXG5cclxuICAgIGhvd0l0V29ya3NTZWN0aW9uLmNsYXNzTGlzdC5yZW1vdmUoXCJvcGFjaWZ5XCIpO1xyXG4gICAgaGlkZU1vdXNlKCk7XHJcblxyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIHVuZnJlZXplRG9jdW1lbnQoKTtcclxuICAgICAgJChcImh0bWwsIGRvY3VtZW50LmJvZHlcIikuYW5pbWF0ZShcclxuICAgICAgICB7XHJcbiAgICAgICAgICBzY3JvbGxUb3A6IHNjcm9sbE1vdXNlVG8sXHJcbiAgICAgICAgICBlYXNlOiBcImVhc2VPdXRCYWNrXCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNjcm9sbFRpbWVcclxuICAgICAgKTtcclxuICAgIH0sIGRlbGF5KTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEZvciBDaHJvbWVcclxuICAgICAqL1xyXG4gICAgZG9jdW1lbnQuYm9keS5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2V3aGVlbFwiLCBzY3JvbGxUb1NlY3Rpb24pO1xyXG4gICAgLyoqXHJcbiAgICAgKiBGb3IgTW96aWxsYVxyXG4gICAgICovXHJcbiAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ3aGVlbFwiLCBzY3JvbGxUb1NlY3Rpb24pO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gaXNEb2N1bWVudEZyb3plbigpIHtcclxuICAgIHJldHVybiBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5jb250YWlucyhcIm5vLXNjcm9sbFwiKTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHVuZnJlZXplRG9jdW1lbnQoKSB7XHJcbiAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoXCJuby1zY3JvbGxcIik7XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiaHRtbFwiKS5jbGFzc0xpc3QucmVtb3ZlKFwibm8tc2Nyb2xsXCIpO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gcmVtb3ZlTG9hZGVyKCkge1xyXG4gICAgY29uc3QgbG9hZGVySFRNTCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2hvc2UtbGFuZ3VhZ2Utd3JhcHBlclwiKTtcclxuICAgIGNvbnN0IHRpbWVUb0xvYWRlckhpZGUgPSAyMDAwO1xyXG4gICAgbG9hZGVySFRNTC5jbGFzc0xpc3QuYWRkKFwicmVtb3ZlZFwiKTtcclxuXHJcbiAgICAvLyBpZiAoIWlzRGVza3RvcCgpKSB7XHJcbiAgICAvLyAgIHVuZnJlZXplRG9jdW1lbnQoKTtcclxuICAgIC8vIH1cclxuXHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IGxvYWRlckhUTUwucmVtb3ZlKCksIHRpbWVUb0xvYWRlckhpZGUpO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gZnJlZXplRG9jdW1lbnQoKSB7XHJcbiAgICBjb25zdCBzY3JvbGxNb3VzZVRvID0gJChcIiNzY3JvbGwtdG9cIikub2Zmc2V0KCkudG9wO1xyXG4gICAgaWYgKFxyXG4gICAgICB3aW5kb3cuaW5uZXJXaWR0aCA+PSAxMjAwICYmXHJcbiAgICAgIChzY3JvbGxNb3VzZVRvICogMTApIC8gMTAgPj0gd2luZG93LnBhZ2VZT2Zmc2V0XHJcbiAgICApIHtcclxuICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKFwibm8tc2Nyb2xsXCIpO1xyXG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiaHRtbFwiKS5jbGFzc0xpc3QuYWRkKFwibm8tc2Nyb2xsXCIpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc3QgaG93SXRXb3Jrc1NlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmhvdy1pdC13b3Jrc1wiKTtcclxuICAgICAgaG93SXRXb3Jrc1NlY3Rpb24uY2xhc3NMaXN0LnJlbW92ZShcIm9wYWNpZnlcIik7XHJcblxyXG4gICAgICBoaWRlTW91c2UoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGhpZGVNb3VzZSgpIHtcclxuICAgIGNvbnN0IG1vdXNlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtb3VzZVwiKTtcclxuICAgIG1vdXNlLmNsYXNzTGlzdC5hZGQoXCJzY2FsZWRcIik7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBoYXNNb3VzZSgpIHtcclxuICAgIHJldHVybiAhZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtb3VzZVwiKS5jbGFzc0xpc3QuY29udGFpbnMoXCJzY2FsZWRcIik7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBhZGRCdXR0b25zRXZlbnRMaXN0ZW5lcnMoKSB7XHJcbiAgICBjb25zdCBidXR0b25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5idXR0b24tLXNjcm9sbC10by10b3BcIik7XHJcbiAgICBidXR0b25zLmZvckVhY2goYnV0dG9uID0+IGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgc2Nyb2xsVG9Ub3ApKTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHNjcm9sbFRvVG9wKCkge1xyXG4gICAgbGV0IHRvID0gMDtcclxuXHJcbiAgICBpZiAoaXNNb2JpbGUoKSkge1xyXG4gICAgICBjb25zdCB3aWRnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmhvbWVfX3JpZ2h0IC53aWRnZXRcIik7XHJcbiAgICAgIGNvbnN0IHdpZGdldEVsZW1lbnREYXRhID0gd2lkZ2V0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG5cclxuICAgICAgdG8gPSB3aWRnZXRFbGVtZW50RGF0YS5oZWlnaHQgLyAyO1xyXG4gICAgfVxyXG5cclxuICAgICQoXCJodG1sLCBib2R5XCIpLmFuaW1hdGUoXHJcbiAgICAgIHtcclxuICAgICAgICBzY3JvbGxUb3A6IHRvLFxyXG4gICAgICAgIGVhc2U6IFwiZWFzZU91dEJhY2tcIlxyXG4gICAgICB9LFxyXG4gICAgICA5MDBcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBpbml0QW5pbWF0aW9ucygpIHtcclxuICAgIC8qKlxyXG4gICAgICogU2V0dXAgeW91ciBMYXp5IExpbmUgZWxlbWVudC5cclxuICAgICAqIHNlZSBSRUFETUUgZmlsZSBmb3IgbW9yZSBzZXR0aW5nc1xyXG4gICAgICovXHJcbiAgICBjb25zdCBhbmltYXRpb25zQ29uZmlnID0ge1xyXG4gICAgICBlYXNlOiBcImVhc2VJblF1YWRcIixcclxuICAgICAgc3Ryb2tlV2lkdGg6IDAuNSxcclxuICAgICAgc3Ryb2tlT3BhY2l0eTogMSxcclxuICAgICAgc3Ryb2tlQ29sb3I6IFwiI2ZmZmZmZlwiXHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IGxvZ29BbmltYXRpb25zQ29uZmlnID0ge1xyXG4gICAgICBlYXNlOiBcImVhc2VJblF1YWRcIixcclxuICAgICAgc3Ryb2tlV2lkdGg6IDQsXHJcbiAgICAgIHN0cm9rZU9wYWNpdHk6IDEsXHJcbiAgICAgIHN0cm9rZUNvbG9yOiBcIiNmZmZmZmZcIlxyXG4gICAgfTtcclxuXHJcbiAgICBsZXQgdGVhbUljb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3RlYW1cIik7XHJcbiAgICBsZXQgY2FsZW5kYXJJY29uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjYWxlbmRhclwiKTtcclxuICAgIGxldCBsb2dvSWNvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbG9nb1wiKTtcclxuXHJcbiAgICBsZXQgdGVhbUljb25BbmltYXRpb24gPSBuZXcgTGF6eUxpbmVQYWludGVyKHRlYW1JY29uLCBhbmltYXRpb25zQ29uZmlnKTtcclxuICAgIGxldCBjYWxlbmRhckljb25BbmltYXRpb24gPSBuZXcgTGF6eUxpbmVQYWludGVyKFxyXG4gICAgICBjYWxlbmRhckljb24sXHJcbiAgICAgIGFuaW1hdGlvbnNDb25maWdcclxuICAgICk7XHJcbiAgICBsZXQgbG9nb0ljb25BbmltYXRpb24gPSBuZXcgTGF6eUxpbmVQYWludGVyKGxvZ29JY29uLCBsb2dvQW5pbWF0aW9uc0NvbmZpZyk7XHJcblxyXG4gICAgdGVhbUljb25BbmltYXRpb24ucGFpbnQoKTtcclxuICAgIGNhbGVuZGFySWNvbkFuaW1hdGlvbi5wYWludCgpO1xyXG4gICAgbG9nb0ljb25BbmltYXRpb24ucGFpbnQoKTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHNob3dJY29ucygpIHtcclxuICAgIGNvbnN0IGJvYXJkSW1hZ2VzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5ib2FyZF9faW1hZ2Ugc3ZnXCIpO1xyXG5cclxuICAgIGJvYXJkSW1hZ2VzLmZvckVhY2goaW1hZ2UgPT4ge1xyXG4gICAgICBjb25zdCBvcGFjaWZ5RWxlbWVudHMgPSBpbWFnZS5xdWVyeVNlbGVjdG9yQWxsKFwiW2ZpbGwtb3BhY2l0eV1cIik7XHJcbiAgICAgIG9wYWNpZnlFbGVtZW50cy5mb3JFYWNoKG9wRWxlbWVudCA9PlxyXG4gICAgICAgIG9wRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJmaWxsLW9wYWNpdHlcIiwgXCIxXCIpXHJcbiAgICAgICk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGlzTWFjKCkge1xyXG4gICAgcmV0dXJuIG5hdmlnYXRvci5wbGF0Zm9ybS5tYXRjaCgvKE1hY3xpUGhvbmV8aVBvZHxpUGFkKS9pKSA/IHRydWUgOiBmYWxzZTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGFkZExhbmd1YWdlQnV0dG9uc0V2ZW50TGlzdGVuZXJzKCkge1xyXG4gICAgY29uc3QgbGFuZ3VhZ2VCdXR0b25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcclxuICAgICAgXCIuY2hvc2UtbGFuZ3VhZ2VfX2xhbmd1YWdlc1wiXHJcbiAgICApO1xyXG5cclxuICAgIHNob3dMYW5ndWFnZUNob3NlTWVudSgpO1xyXG5cclxuICAgIGxhbmd1YWdlQnV0dG9ucy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZXZlbnQgPT4ge1xyXG4gICAgICBjb25zdCBLT1JFQU4gPSBcImNob3NlLWxhbmd1YWdlX19sYW5ndWFnZS0ta29yZWFuXCI7XHJcbiAgICAgIGNvbnN0IGNsaWNrZWRCdXR0b24gPSBldmVudC50YXJnZXQ7XHJcblxyXG4gICAgICBpZiAoY2xpY2tlZEJ1dHRvbi5jbGFzc0xpc3QuY29udGFpbnMoS09SRUFOKSkge1xyXG4gICAgICAgIHRyYW5zbGF0ZVRvS29yZWFuKFwiS09SXCIpO1xyXG4gICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZChcImtvclwiKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaGlkZUxhbmd1YWdlQ2hvc2VNZW51KCk7XHJcblxyXG4gICAgICBpZiAoIWlzTW9iaWxlKCkgJiYgIWlzTWFjKCkpIHtcclxuICAgICAgICBpbml0QW5pbWF0aW9ucygpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHNob3dJY29ucygpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBmdW5jdGlvbiBzaG93TGFuZ3VhZ2VDaG9zZU1lbnUoKSB7XHJcbiAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZChcInByZWxvYWRlclwiKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBoaWRlTGFuZ3VhZ2VDaG9zZU1lbnUoKSB7XHJcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIHJlbW92ZUxvYWRlcigpO1xyXG4gICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZShcInByZWxvYWRlclwiKTtcclxuICAgICAgICBcclxuICAgICAgICBpbml0V2F5UG9pbnRzSW50ZXJhY3Rpb24oKTtcclxuICAgICAgfSwgMTUwMCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiB0cmFuc2xhdGVUb0tvcmVhbihsYW5nID0gXCJFTkdcIikge1xyXG4gICAgY29uc3Qga29yZWFuRGF0YSA9IFtcclxuICAgICAgXCLtiKzsnpDsnpAg65CY6riwXCIsIC8vaGVhZGVyIGJ1dHRvblxyXG4gICAgICBcIuywqOuzhO2ZlOuQnCDquIDroZzrsowg6rGw656Y7IaMIO2UjOueq+2PvFwiLCAvL2hvbWUgdGl0bGVcclxuICAgICAgXCLtnojrk6DthqDtgbAg6rWs66ekXCIsIC8vaG9tZSBtb2RhbCB3aWRnZXQgYnV0dG9uXHJcbiAgICAgIFwi7Yis7J6QXCIsIC8vIGhvbWUgcmlnaHQgd2lkZ2V0IGxvZ28gdGV4dFxyXG4gICAgICBcIlgg7Yag7YGw7J2AIDE3IDAwMCAwMDAg6rCc7J2YIO2GoO2BsOyXkOyEnCDsoJzsmbjrkKnri4jri6QuXCIsIC8vIGhvbWUgcmlnaHQgd2lkZ2V0IGluZm8gdGV4dFxyXG4gICAgICBcIklDTyDtiKzsnpBcIiwgLy8gaG9tZSByaWdodCB3aWRnZXQgYnV0dG9uXHJcbiAgICAgIFwi7IS46rOEIOy1nOy0iCDsvZTsnbgg6rWs66ek67aA7YSwIOqwgeyihSBJQ08g7LC47Jes6rmM7KeAIOqwgOuKpe2VnCDqsbDrnpjshowg7ZSM656r7Y+8XCIsIC8vIGhvbWUgaW5mbyBkZXNjcmlwdGlvblxyXG4gICAgICBcIuuqqOq4iOyVoVwiLCAvLyBob21lIGJvYXJkIGl0ZW0gMSBib2FyZCB0aXRsZVxyXG4gICAgICBcIuyEpOumveyekFwiLCAvLy5ob21lIGJvYXJkIGl0ZW0gMiBib2FyZCB0aXRsZVxyXG4gICAgICBcIuyngOyGjVwiLCAvLyBob21lIGJvYXJkIGl0ZW0gMyBib2FyZCB0aXRsZVxyXG4gICAgICBcIu2KueynlVwiLCAvLyBob3cgaXQgd29ya3MgdGl0bGVcclxuICAgICAgXCLtlITrpqzshLjsnbwg7YOA7J2066i4XCIsLy8gcG9wdXAgdGl0bGVcclxuICAgICAgXCLsnbxcIiwgLy90aW1lciBkYXlzXHJcbiAgICAgIFwi7IucXCIsIC8vdGltZXIgaG91cnNcclxuICAgICAgXCLrtoRcIiwgLy90aW1lciBtaW51dGVzXHJcbiAgICAgIFwi7LSIXCIsIC8vdGltZXIgc2Vjb25kc1xyXG4gICAgICBcIjFcIiwgLy9wb3B1cCBjb2luIG51bWJlclxyXG4gICAgICBcIkhJRCA9IFwiLFxyXG4gICAgICBcIjAuMTUkXCIsIC8vcG9wdXAgY29pbiB2YWx1ZVxyXG4gICAgICBcIuy0nSAxNyAwMDAgMDAwIO2GoO2BsOykkSDtmITsnqwgQu2GoO2BsOydtCDrgqjslZjsirXri4jri6QuXCIsIC8vcG9wdXAgc2Vjb25kIGluZm9cclxuICAgICAgLyoqXHJcbiAgICAgICAqIEhvdyBpdCB3b3JrcyBDYXJkc1xyXG4gICAgICAgKi9cclxuICAgICAgLyoqXHJcbiAgICAgICAqIENhcmQgMVxyXG4gICAgICAgKi9cclxuICAgICAgXCLshLjqs4Qg7LWc7LSI7J2YIO2FjOyhsOyKpCDrp4jsvJMg7Iug7ISkXCIsXHJcbiAgICAgIFwi7IS46rOEIOy1nOy0iCB0ZXpvc+ulvCDquLDstpXthrXtmZTroZwg64+E7J6FLiDqt7gg7Jm4IChCVEMsRVRILEVPUyxLUlcpXCIsXHJcbiAgICAgIC8qKlxyXG4gICAgICAgKiBDYXJkIDJcclxuICAgICAgICovXHJcbiAgICAgIFwi67Kg7J207YK5IOuFuOuTnCDsmrTsmIFcIixcclxuICAgICAgXCLruJTroZ3ssrTsnbgg64W465Oc66W8IOyatOyYgeydhCDthrXtlbQg7JewIDUuNSUg7IOB64u57J2YIFRFWk9T66W8IOuztOyDgS5cIixcclxuICAgICAgLyoqXHJcbiAgICAgICAqIENhcmQgM1xyXG4gICAgICAgKi9cclxuICAgICAgXCLqsbDrnpjshozrpbwg7Ya17ZWcIElDTyDssLjsl6wg6rCA64qlXCIsXHJcbiAgICAgIFwi6rCc7J24IOqzhOygleydhCDthrXtlbQgSUNP7LC47Jes7ZWcIO2GoO2BsCDrs7TtmLguXCIsXHJcbiAgICAgIC8qKlxyXG4gICAgICAgKiBDYXJkIDRcclxuICAgICAgICovXHJcbiAgICAgIFwi7Yis7ZGc6raMXCIsXHJcbiAgICAgIFwiSElEIO2GoO2BsCDrs7TsnKDrn4nsl5Ag65Sw66W4IOyDgeyepe2GoO2BsOyXkCDrjIDtlZwg7Yis7ZGc6raM7J2EIO2WieyCrCDqsIDriqUuXCIsXHJcbiAgICAgIC8qKlxyXG4gICAgICAgKiBDYXJkIDVcclxuICAgICAgICovXHJcbiAgICAgIFwi7IS46rOEIOy1nOy0iCDshpDsi6Qg67Cp7KeAIOuztO2XmOygnOuPhCDrj4TsnoUuXCIsXHJcbiAgICAgIFwi7Yis7J6QIOyGkOyLpOyYiOuwqeyXkCDrjIDtlZwg67O07ZeY7KCc64+EIOuPhOyeheycvOuhnCDshpDsi6TquIjslaEg67O07IOBLlwiLFxyXG4gICAgICAvKipcclxuICAgICAgKiBDYXJkIDZcclxuICAgICAgKi9cclxuICAgICAgXCLrtoTquLDrs4QgSElEIO2GoO2BsCDrsJTsnbTrsLEg67CPIOyGjOqwgS5cIixcclxuICAgICAgXCLqsbDrnpjshowg7IiY7J216riIIOydvOu2gOulvCBISUQg7Yag7YGwIOuwlOydtOuwsSDrsI8g7IaM6rCB7Jy866GcIOyLnOyepSDslYjsoJXtmZQuXCIsXHJcbiAgICAgIC8qKlxyXG4gICAgICAgKiBUaGUgd2hpcGFwZXJcclxuICAgICAgICovXHJcbiAgICAgIFwi67Cx7KeAXCIsXHJcbiAgICAgIFwi7IOI66Gc7Jq0IO2eiOuToOu5hO2KuCDrsLHshJzrpbwg6rO17Jyg7ZWg7IiYIOyeiOyWtCDquLDsganri4jri6Qu7J2067Cx7ISc64qUIO2UvOyVhO2KuCDthrXtlansnYQg7Ya17ZWcIOyDiOuhnOyatCDrp4jsnbTri53qsbDrnpjshozrpbwg7IaM6rCc7ZWY6rOgIOyeiOyKteuLiOuLpDpQcm9vZi1vZi1SZXBsaWNhdGlvbiAoUG9SKSBhbmQgUHJvb2Ytb2YtU3BhY2V0aW1lIChQb1N0KVwiLFxyXG4gICAgICBcIu2eiOuToOu5hO2KuCDrsLHshJzrs7TquLBcIixcclxuICAgICAgLyoqXHJcbiAgICAgICAqIFRoZSBhaXJkcm9wIHN5c3RlbVxyXG4gICAgICAgKi9cclxuICAgICAgXCLsl5DslrTrk5zrno1cIixcclxuICAgICAgXCLrj4XsnpDsoIHsnbgg6riw7Iig66Cl7Jy866GcIOy9lOyduCDqtazrp6TrtoDthLAgaWNvIOywuOyXrOq5jOyngCBoaWRkZW5iaXQg7JeQ7IScIO2VtOqysC5cIixcclxuICAgICAgXCLroIjrsqjqs7wg67O064SI7Iqk7Jyo7J2AIOq4sOuzuOqwgOqyqeqzvCDrs4Trj4TroZwg7KCB7Jqp65Cp64uI64ukLlwiLFxyXG4gICAgICBcIuy2lOqwgCBISUQg7L2U7J24LCVcIixcclxuICAgICAgLyoqXHJcbiAgICAgICAqIFRoZSByZWxlYXNlIFxyXG4gICAgICAgKi9cclxuICAgICAgXCLtnojrk6DruYTtirgg7Yag7YGw7J2AIOyyq+qxsOuemOu2gO2EsCDsiqTrp4jtirjsu6jtirjrnpntirjrpbwg7Ya17ZW0IO2UhOuhnOq3uOuemOuwjSDrkKnri4jri6QuXCIsXHJcbiAgICAgIFwi7YyQ66ek7IiY65+JXCIsXHJcbiAgICAgIFwi7YyQ66ek67mE7JyoKCUpXCIsXHJcbiAgICAgIFwi67O064SI7IqkXCIsXHJcbiAgICAgIFwi6rCA6rKpKCQpXCIsXHJcbiAgICAgIFwi7ZWY65Oc7LqhKCQpXCIsXHJcbiAgICAgIC8qKlxyXG4gICAgICAgKiBGb3IgbWluZXJzXHJcbiAgICAgICAqL1xyXG4gICAgICBcIuyxhOq1tOyImOufieydtCDslrTrlrvqsowg65CY64qU6rCAP1wiLFxyXG4gICAgICBcIjHqsJzsm5R+MTLqsJzsm5QgLSBcIixcclxuICAgICAgXCIyIDg1OSAzMDIuODQg7L2U7J24XCIsXHJcbiAgICAgIFwiMTPqsJzsm5R+MjTqsJzsm5QgLSBcIixcclxuICAgICAgXCIxIDQyOSA2NTEsNDIg7L2U7J24XCIsXHJcbiAgICAgIFwiMjXqsJzsm5R+MzXqsJzsm5QtIFwiLFxyXG4gICAgICBcIjcxNCw4MjUuNzEg7L2U7J24XCIsXHJcbiAgICAgIFwiMzbqsJzsm5QgLSBcIixcclxuICAgICAgXCI2NjksNDY2LjA3IOy9lOyduFwiLFxyXG4gICAgICBcIuuhnOuTnOuntVwiLFxyXG4gICAgICAvKipcclxuICAgICAgICogUm9hZCBtYXBcclxuICAgICAgICovXHJcbiAgICAgIFwi6rOE7ZqNIOuwjyDqsJzrsJxcIixcclxuICAgICAgXCLrsqDtg4DrsoTsoIQg65+w7LmtXCIsXHJcbiAgICAgIFwi6rGw656Y7IaMIOufsOy5rVwiLFxyXG4gICAgICBcIuq4gOuhnOuyjCBUT1AxMCDqsbDrnpjshowg7ISg7KCVXCIsXHJcbiAgICAgIC8qKlxyXG4gICAgICAgKiBFY2hhbmdlcyB0aXRsZVxyXG4gICAgICAgKi9cclxuICAgICAgXCLtnojrk6Ag7L2U7J247J20IOqxsOuemOuQmOuKlCDstZzqs6DsnZgg6rGw656Y7IaMXCIsXHJcbiAgICAgIC8qKlxyXG4gICAgICAgKiBTdXBwb3J0XHJcbiAgICAgICAqL1xyXG4gICAgICBcIjI0IMOXIDcg7KeA7JuQIOyEnOu5hOyKpFwiLFxyXG4gICAgICBcIuusuOydmOyCrO2VreydtCDsnojsnLzsi6Dqsr3smrAsIOyWuOygnOuToCDri7Xrs4DtlbQg65Oc66as6rKg7Iq164uI64ukLlwiLFxyXG4gICAgICBcIu2IrOyekOyekCDrkJjquLBcIixcclxuICAgICAgLyoqXHJcbiAgICAgICAqIFJlc2VhcmNoXHJcbiAgICAgICAqL1xyXG4gICAgICBcIu2eiOuToOu5hO2KuCDqsbDrnpjshowg65GY65+s67O06riwXCIsXHJcbiAgICAgIFwi7Z6I65Og67mE7Yq4IOqxsOuemOyGjCDrsLHshJxcIixcclxuICAgICAgXCLrs7XsoJzrsKnsp4BcIixcclxuICAgICAgXCLsoITsm5Ag6rKw7ZWoIO2XiOyaqVwiLFxyXG4gICAgICBcIjIwMTkg7Jew6rWsIOuhnOuTnOuntVwiLFxyXG4gICAgXTtcclxuXHJcbiAgICBjb25zdCB0ZXh0RWxlbWVudHMgPSBbXHJcbiAgICAgIGdldEVsZW1lbnQoXCIuaGVhZGVyX19idXR0b25cIiksXHJcbiAgICAgIFxyXG4gICAgICBnZXRFbGVtZW50KFwiLmhvbWUgLmluZm9fX3RpdGxlXCIpLFxyXG4gICAgICBnZXRFbGVtZW50KFwiLmhvbWVfX21vZGFsIC53aWRnZXRfX2J1dHRvblwiKSxcclxuICAgICAgZ2V0RWxlbWVudChcIi5ob21lX19yaWdodCAud2lkZ2V0X19sb2dvIC50ZXh0XCIpLFxyXG4gICAgICBnZXRFbGVtZW50KFwiLmhvbWVfX3JpZ2h0IC53aWRnZXRfX2luZm8gLnRleHRcIiksXHJcbiAgICAgIGdldEVsZW1lbnQoXCIuaG9tZV9fcmlnaHQgLndpZGdldF9fYnV0dG9uXCIpLFxyXG4gICAgICBnZXRFbGVtZW50KFwiLmhvbWUgLmluZm9fX2Rlc2NyaXB0aW9uXCIpLFxyXG4gICAgICBnZXRFbGVtZW50KFwiLmhvbWUgLmJvYXJkX19pdGVtLS0xIC5ib2FyZF9fdGl0bGVcIiksXHJcbiAgICAgIGdldEVsZW1lbnQoXCIuaG9tZSAuYm9hcmRfX2l0ZW0tLTIgLmJvYXJkX190aXRsZVwiKSxcclxuICAgICAgZ2V0RWxlbWVudChcIi5ob21lIC5ib2FyZF9faXRlbS0tMyAuYm9hcmRfX3RpdGxlXCIpLFxyXG4gICAgICBnZXRFbGVtZW50KFwiLmhvdy1pdC13b3Jrc19fdGl0bGVcIiksXHJcbiAgICAgIC8qKlxyXG4gICAgICAgKiBUaW1lciBhbmQgcG9wdXAgaW5mb1xyXG4gICAgICAgKi9cclxuICAgICAgZ2V0RWxlbWVudChcIi5ob21lX19tb2RhbCAud2lkZ2V0X190aXRsZVwiKSxcclxuICAgICAgZ2V0RWxlbWVudChcIi50aW1lcl9fZGF5c1wiKSxcclxuICAgICAgZ2V0RWxlbWVudChcIi50aW1lcl9faG91cnNcIiksXHJcbiAgICAgIGdldEVsZW1lbnQoXCIudGltZXJfX21pbnV0ZXNcIiksXHJcbiAgICAgIGdldEVsZW1lbnQoXCIudGltZXJfX3NlY29uZHNcIiksXHJcbiAgICAgIGdldEVsZW1lbnQoXCIuaG9tZV9fbW9kYWwgLndpZGdldF9faW5mbyAuY29pbl9fbnVtYmVyXCIpLFxyXG4gICAgICBnZXRFbGVtZW50KFwiLmhvbWVfX21vZGFsIC53aWRnZXRfX2luZm8gLnRleHRcIiksXHJcbiAgICAgIGdldEVsZW1lbnQoXCIuaG9tZV9fbW9kYWwgLndpZGdldF9faW5mbyAuY29pbl9fcHJpY2VcIiksXHJcbiAgICAgIGdldEVsZW1lbnQoXCIuaG9tZV9fbW9kYWwgLndpZGdldF9faW5mby0tMiAudGV4dFwiKSxcclxuICAgICAgLyoqXHJcbiAgICAgICAqIEhvdyBpdCB3b3JrcyBjYXJkc1xyXG4gICAgICAgKi9cclxuICAgICAgZ2V0RWxlbWVudChcIi5jYXJkLS0xIC5jYXJkX190aXRsZVwiKSxcclxuICAgICAgZ2V0RWxlbWVudChcIi5jYXJkLS0xIC5jYXJkX19pbmZvXCIpLFxyXG4gICAgICBnZXRFbGVtZW50KFwiLmNhcmQtLTIgLmNhcmRfX3RpdGxlXCIpLFxyXG4gICAgICBnZXRFbGVtZW50KFwiLmNhcmQtLTIgLmNhcmRfX2luZm9cIiksXHJcbiAgICAgIGdldEVsZW1lbnQoXCIuY2FyZC0tMyAuY2FyZF9fdGl0bGVcIiksXHJcbiAgICAgIGdldEVsZW1lbnQoXCIuY2FyZC0tMyAuY2FyZF9faW5mb1wiKSxcclxuICAgICAgZ2V0RWxlbWVudChcIi5jYXJkLS00IC5jYXJkX190aXRsZVwiKSxcclxuICAgICAgZ2V0RWxlbWVudChcIi5jYXJkLS00IC5jYXJkX19pbmZvXCIpLFxyXG4gICAgICBnZXRFbGVtZW50KFwiLmNhcmQtLTUgLmNhcmRfX3RpdGxlXCIpLFxyXG4gICAgICBnZXRFbGVtZW50KFwiLmNhcmQtLTUgLmNhcmRfX2luZm9cIiksXHJcbiAgICAgIGdldEVsZW1lbnQoXCIuY2FyZC0tNiAuY2FyZF9fdGl0bGVcIiksXHJcbiAgICAgIGdldEVsZW1lbnQoXCIuY2FyZC0tNiAuY2FyZF9faW5mb1wiKSxcclxuICAgICAgLyoqXHJcbiAgICAgICAqIFdoaXRlcGFwZXJcclxuICAgICAgICovXHJcbiAgICAgIGdldEVsZW1lbnQoXCIud2hpdGVwYXBlcl9fdGl0bGVcIiksXHJcbiAgICAgIGdldEVsZW1lbnQoXCIud2hpdGVwYXBlcl9faW5mb1wiKSxcclxuICAgICAgZ2V0RWxlbWVudChcIi53aGl0ZXBhcGVyX19idXR0b25cIiksXHJcbiAgICAgIC8qKlxyXG4gICAgICAgKiBBaXJkcm9wXHJcbiAgICAgICAqL1xyXG4gICAgICBnZXRFbGVtZW50KFwiLmFpcmRyb3BfX3RpdGxlXCIpLFxyXG4gICAgICBnZXRFbGVtZW50KFwiLmFpcmRyb3BfX2luZm9cIiksXHJcbiAgICAgIGdldEVsZW1lbnQoXCIuYWlyZHJvcF9fYWRkaXRpb25hbC1pbmZvXCIpLFxyXG4gICAgICBnZXRFbGVtZW50KFwiLmFpcmRyb3BfX3RhYmxlIC50YWJsZV9fY29sdW1uLS0yXCIpLFxyXG4gICAgICAvKipcclxuICAgICAgICogVGFibGVzXHJcbiAgICAgICAqL1xyXG4gICAgICBnZXRFbGVtZW50KFwiLnJlbGVhc2VfX3RpdGxlXCIpLFxyXG4gICAgICBnZXRFbGVtZW50KFwiLnJlbGVhc2UgLnRhYmxlX19yb3ctLTIgLnRhYmxlX19jb2x1bW4tLTFcIiksXHJcbiAgICAgIGdldEVsZW1lbnQoXCIucmVsZWFzZSAudGFibGVfX3Jvdy0tMyAudGFibGVfX2NvbHVtbi0tMVwiKSxcclxuICAgICAgZ2V0RWxlbWVudChcIi5yZWxlYXNlIC50YWJsZV9fcm93LS00IC50YWJsZV9fY29sdW1uLS0xXCIpLFxyXG4gICAgICBnZXRFbGVtZW50KFwiLnJlbGVhc2UgLnRhYmxlX19yb3ctLTUgLnRhYmxlX19jb2x1bW4tLTFcIiksXHJcbiAgICAgIGdldEVsZW1lbnQoXCIucmVsZWFzZSAudGFibGVfX3Jvdy0tNiAudGFibGVfX2NvbHVtbi0tMVwiKSxcclxuICAgICAgLyoqXHJcbiAgICAgICAqIEZvciBtaW5lcnMgaW5mb1xyXG4gICAgICAgKi9cclxuICAgICAgZ2V0RWxlbWVudChcIi5mb3ItbWluZXJzX190aXRsZVwiKSxcclxuICAgICAgZ2V0RWxlbWVudChcIi5mb3ItbWluZXJzIC5saXN0X19pdGVtLS0xIC50ZXh0XCIpLFxyXG4gICAgICBnZXRFbGVtZW50KFwiLmZvci1taW5lcnMgLmxpc3RfX2l0ZW0tLTEgLmNvaW5zXCIpLFxyXG4gICAgICBnZXRFbGVtZW50KFwiLmZvci1taW5lcnMgLmxpc3RfX2l0ZW0tLTIgLnRleHRcIiksXHJcbiAgICAgIGdldEVsZW1lbnQoXCIuZm9yLW1pbmVycyAubGlzdF9faXRlbS0tMiAuY29pbnNcIiksXHJcbiAgICAgIGdldEVsZW1lbnQoXCIuZm9yLW1pbmVycyAubGlzdF9faXRlbS0tMyAudGV4dFwiKSxcclxuICAgICAgZ2V0RWxlbWVudChcIi5mb3ItbWluZXJzIC5saXN0X19pdGVtLS0zIC5jb2luc1wiKSxcclxuICAgICAgZ2V0RWxlbWVudChcIi5mb3ItbWluZXJzIC5saXN0X19pdGVtLS00IC50ZXh0XCIpLFxyXG4gICAgICBnZXRFbGVtZW50KFwiLmZvci1taW5lcnMgLmxpc3RfX2l0ZW0tLTQgLmNvaW5zXCIpLFxyXG4gICAgICAvKipcclxuICAgICAgICogUm9hZCBtYXBcclxuICAgICAgICovXHJcbiAgICAgIGdldEVsZW1lbnQoXCIucm9hZC1tYXBfX3RpdGxlXCIpLFxyXG4gICAgICBnZXRFbGVtZW50KFwiLnJvYWQtbWFwIC5wbGFuLS0xXCIpLFxyXG4gICAgICBnZXRFbGVtZW50KFwiLnJvYWQtbWFwIC5wbGFuLS0zXCIpLFxyXG4gICAgICBnZXRFbGVtZW50KFwiLnJvYWQtbWFwIC5wbGFuLS00XCIpLFxyXG4gICAgICBnZXRFbGVtZW50KFwiLnJvYWQtbWFwIC5wbGFuLS01XCIpLFxyXG5cclxuICAgICAgZ2V0RWxlbWVudChcIi5leGNoYW5nZXNfX3RpdGxlXCIpLFxyXG4gICAgICAvKipcclxuICAgICAgICogU3VwcG9ydFxyXG4gICAgICAgKi8gXHJcbiAgICAgIGdldEVsZW1lbnQoXCIuc3VwcG9ydF9fdGl0bGVcIiksXHJcbiAgICAgIGdldEVsZW1lbnQoXCIuc3VwcG9ydF9faW5mb1wiKSxcclxuICAgICAgZ2V0RWxlbWVudChcIi5zdXBwb3J0X19idXR0b25cIiksXHJcbiAgICAgIC8qKlxyXG4gICAgICAgKiBSZXNlYXJjaFxyXG4gICAgICAgKi9cclxuICAgICAgZ2V0RWxlbWVudChcIi5yZXNlYXJjaF9fdGl0bGVcIiksXHJcbiAgICAgIGdldEVsZW1lbnQoXCIucmVzZWFyY2hfX2l0ZW1zIC5pdGVtLS0xIC5pdGVtX190aXRsZVwiKSxcclxuICAgICAgZ2V0RWxlbWVudChcIi5yZXNlYXJjaF9faXRlbXMgLml0ZW0tLTIgLml0ZW1fX3RpdGxlXCIpLFxyXG4gICAgICBnZXRFbGVtZW50KFwiLnJlc2VhcmNoX19pdGVtcyAuaXRlbS0tMyAuaXRlbV9fdGl0bGVcIiksXHJcbiAgICAgIGdldEVsZW1lbnQoXCIucmVzZWFyY2hfX2l0ZW1zIC5pdGVtLS00IC5pdGVtX190aXRsZVwiKSxcclxuICAgIF07XHJcblxyXG4gICAgY29uc29sZS5sb2coJ0xlbmd0aDogJyArIHRleHRFbGVtZW50cy5sZW5ndGgpO1xyXG5cclxuICAgIGlmIChsYW5nICE9PSBcIkVOR1wiKSB7XHJcbiAgICAgIHNldENvbnRlbnQodGV4dEVsZW1lbnRzLCBrb3JlYW5EYXRhKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBnZXRFbGVtZW50KGNsYXNzTmFtZSkge1xyXG4gICAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihjbGFzc05hbWUpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHNldENvbnRlbnQoZWxlbWVudHMsIGNvbnRlbnQpIHtcclxuICAgICAgZWxlbWVudHMuZm9yRWFjaCgoZWwsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgY29uc3QgY29udCA9IGNvbnRlbnRbaW5kZXhdO1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAvKipcclxuICAgICAgICAgICAqIEgyIGRhdGFcclxuICAgICAgICAgICAqL1xyXG4gICAgICAgICAgaWYgKGVsLmhhc0F0dHJpYnV0ZShcImRhdGEtdGl0bGVcIikpIHtcclxuICAgICAgICAgICAgZWwuaW5uZXJIVE1MID0gY29udDtcclxuICAgICAgICAgICAgZWwuc2V0QXR0cmlidXRlKFwiZGF0YS10aXRsZVwiLCBjb250KTtcclxuICAgICAgICAgIH0gZWxzZSBpZiAoZWwuY2xhc3NMaXN0LmNvbnRhaW5zKFwicGxhblwiKSkge1xyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICogUGxhbiBsaW5lcyBkYXRhXHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICBlbC5zZXRBdHRyaWJ1dGUoXCJkYXRhLXBsYW4tZGVzY3JpcHRpb25cIiwgY29udCk7XHJcbiAgICAgICAgICB9IGVsc2UgaWYgKGVsLmhhc0F0dHJpYnV0ZShcImRhdGEtbmFtZVwiKSkge1xyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICogVGltZXIgZGF0YVxyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgZWwuc2V0QXR0cmlidXRlKFwiZGF0YS1uYW1lXCIsIGNvbnQpO1xyXG4gICAgICAgICAgfSBlbHNlIGlmIChjb250ICE9PSBcIlwiKSB7XHJcbiAgICAgICAgICAgIGVsLmlubmVySFRNTCA9IGNvbnQ7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciBlbGVtZW50IGluZGV4IDpcIiwgaW5kZXgpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG59KTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NjcmlwdHMvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDdENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OzsiLCJzb3VyY2VSb290IjoiIn0=