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
	    initWayPointsInteraction();

	    if (isMobile()) {
	      initMobilePopupInteraction();
	      showIcons();
	    } else {
	      initDesktopPopupInteraction();
	    }

	    initTimer();
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

	    const desktopBreakpoin = 1200;

	    /**
	     * Bind a slider data changing with a view
	     */
	    slider.addEventListener(
	      "change",
	      event => (summary.innerHTML = event.currentTarget.value)
	    );

	    if (window.innerWidth >= desktopBreakpoin && isDocumentFrozen()) {
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

	  function scrollToSection() {
	    const scrollMouseTo = $("#scroll-to").offset().top;
	    const scrollTime = 900;
	    const delay = 500;

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
	    const loaderScript = document.querySelector("#loader-script");
	    const loaderLib = document.querySelector("#loader-lib");

	    loaderLib.remove();
	    loaderScript.remove();

	    const timeToLoaderHide = 2000;
	    loaderHTML.classList.add("removed");
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

	    $("html, document.body").animate(
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

	    hideMapElements();
	    hideCryptoMachineElements();
	    hideNotebookElements();
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
	        document.body.classList.add('kor');
	      }

	      hideLanguageChoseMenu();

	      if (!isMobile()) {
	        initAnimations();
	      }
	    });

	    function showLanguageChoseMenu() {
	      const choseLanguageMainElement = document.querySelector(
	        ".chose-language"
	      );
	      choseLanguageMainElement.classList.add("showed");
	      const languageButtons = document.querySelectorAll(
	        ".chose-language__language"
	      );
	      languageButtons.forEach(lb => lb.classList.add("showed"));
	    }

	    function hideLanguageChoseMenu() {
	      const languageButtons = document.querySelectorAll(
	        ".chose-language__language"
	      );
	      languageButtons.forEach(lb => lb.classList.remove("showed"));

	      const choseLanguageMainElement = document.querySelector(
	        ".chose-language"
	      );
	      choseLanguageMainElement.classList.remove("showed");

	      setTimeout(removeLoader, 1500);
	    }
	  }

	  function translateToKorean(lang = "ENG") {
	    const koreanData = [
	      "세계 최초의 테조스 c2c <br> 글로벌 거래소",
	      "투자자 되기",
	      "투자자 되기",
	      "히든토큰 구매",
	      "투자",
	      "",
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
	      "",
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
	      "Pre-ico start",
	      "베타버전 런칭",
	      "거래소 런칭",
	      "글로벌 TOP10 거래소 선정",
	      "히든 코인이 거래되는 최고의 거래소",
	      "24 × 7 support service",
	      "문의사항이 있으신경우, 언제든 답변해 드리겠습니다.",
	      "히든비트 거래소 둘러보기",
	      "히든비트 거래소 백서",
	      "복제방지",
	      "POWER FAULT TOLERANCE",
	      "2019 연구 로드맵",
	      "",
	      "",
	      ""
	    ];

	    const textElements = [
	      getElement('.home .info__title'),
	      getElement('.header__button'),
	      getElement('.support__button'), 
	      getElement('.home__modal .widget__button'),
	      getElement('.home__right .widget__logo .text'), 
	      getElement('.home__right .widget__info .text'), 
	      getElement('.home__right .widget__button'),
	      getElement('.home .info__description'),
	      getElement('.home .board__item--1 .board__title'),
	      getElement('.home .board__item--2 .board__title'),
	      getElement('.home .board__item--3 .board__title'),
	      getElement('.how-it-works__title'),
	      getElement('.home__modal .widget__title'),
	      getElement('.timer__days'),
	      getElement('.timer__hours'),
	      getElement('.timer__minutes'),
	      getElement('.timer__sec'),
	      getElement('.home__modal .widget__info .coin__number'),
	      getElement('.home__modal .widget__info .text'),
	      getElement('.home__modal .widget__info .coin__price'),
	      getElement('.home__modal .widget__info--2 .text'),
	      getElement('.card--1 .card__title'),
	      getElement('.card--1 .card__info'),
	      getElement('.card--2 .card__title'),
	      getElement('.card--3 .card__info'),
	      getElement('.card--3 .card__title'),
	      getElement('.card--3 .card__info'),
	      getElement('.card--4 .card__title'),
	      getElement('.card--4 .card__info'),
	      getElement('.card--5 .card__title'),
	      getElement('.card--5 .card__info'),
	      getElement('.card--6 .card__title'),
	      getElement('.card--6 .card__info'),
	      getElement('.whitepaper__title'),
	      getElement('.whitepaper__info'),
	      getElement('.whitepaper__button'),
	      getElement('.airdrop__title'),
	      getElement('.airdrop__info'),
	      getElement('.airdrop__additional-info'),
	      getElement('.release__title'),
	      getElement('.airdrop__table .table__column--1'),
	      getElement('.airdrop__table .table__column--2'),
	      getElement('.release .table__header .table__column'),
	      getElement('.release .table__row--1 .table__column--2'),
	      getElement('.release .table__row--1 .table__column--3'),
	      getElement('.release .table__row--2 .table__column--1'),
	      getElement('.release .table__row--3 .table__column--1'),
	      getElement('.release .table__row--4 .table__column--1'),
	      getElement('.release .table__row--5 .table__column--1'),
	      getElement('.release .table__row--6 .table__column--1'),
	      getElement('.release .table__row--7 .table__column--1'),
	      getElement('.for-miners__title'),
	      getElement('.for-miners__info'),
	      getElement('.for-miners__right .list__item--1 .text'),
	      getElement('.for-miners__right .list__item--1 .coins'),
	      getElement('.for-miners__right .list__item--2 .text'),
	      getElement('.for-miners__right .list__item--2 .coins'),
	      getElement('.for-miners__right .list__item--3 .text'),
	      getElement('.for-miners__right .list__item--3 .coins'),
	      getElement('.for-miners__right .list__item--4 .text'),
	      getElement('.for-miners__right .list__item--4 .coins'),
	      getElement('.road-map__title'),
	      getElement('.road-map .plan--1'),
	      getElement('.road-map .plan--2'),
	      getElement('.road-map .plan--3'),
	      getElement('.road-map .plan--4'),
	      getElement('.road-map .plan--5'),
	      getElement('.exchanges__title'),
	      getElement('.support__title'),
	      getElement('.support__info'),
	      getElement('.research__title'),
	      getElement('.research__items .item--1 .item__title'),
	      getElement('.research__items .item--2 .item__title'),
	      getElement('.research__items .item--3 .item__title'),
	      getElement('.research__items .item--4 .item__title'),
	      getElement('.footer .developed-by'),
	      getElement('.footer__item--email'),
	      getElement('.footer__item--follow-us'),
	    ];

	    if (lang !== 'ENG') {
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
	          if (el.hasAttribute('data-title')) {
	            el.innerHTML = cont;
	            el.setAttribute('data-title', cont);
	          } 
	            /**
	             * Plan lines data
	             */
	          else if (el.classList.contains('plan')) {
	            el.setAttribute('data-plan-description', cont);
	          } 
	            /**
	             * Timer data
	             */
	            else if (el.hasAttribute('data-name')) {
	            el.setAttribute('data-name', cont);
	          } 
	          else if (cont !== '') {
	            el.innerHTML = cont;
	          } 
	        } catch(e) {
	          console.log('Error element index :', index);
	        }
	      });
	    }
	  }
	});


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMDgwZTZmMDVkOGU5NGU4MjQwMjMiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvc2NyaXB0cy9cIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCAwODBlNmYwNWQ4ZTk0ZTgyNDAyMyIsImRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsICgpID0+IHtcclxuICAvKipcclxuICAgKiBSZW1vdmUgdGhlIGxvYWRlciB3aGVuIGFsbCBzY3JpcHQgaGF2ZSBiZWVuIGxvYWRlZFxyXG4gICAqL1xyXG4gIGluaXQoKTtcclxuICBhZGRMYW5ndWFnZUJ1dHRvbnNFdmVudExpc3RlbmVycygpO1xyXG5cclxuICBmdW5jdGlvbiBpbml0KCkge1xyXG4gICAgZnJlZXplRG9jdW1lbnQoKTtcclxuXHJcbiAgICBhZGRFdmVudExpc3RlbmVycygpO1xyXG5cclxuICAgIGluaXRTbGlkZXIoKTtcclxuICAgIGluaXRXYXlQb2ludHNJbnRlcmFjdGlvbigpO1xyXG5cclxuICAgIGlmIChpc01vYmlsZSgpKSB7XHJcbiAgICAgIGluaXRNb2JpbGVQb3B1cEludGVyYWN0aW9uKCk7XHJcbiAgICAgIHNob3dJY29ucygpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaW5pdERlc2t0b3BQb3B1cEludGVyYWN0aW9uKCk7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdFRpbWVyKCk7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBpbml0V2F5UG9pbnRzSW50ZXJhY3Rpb24oKSB7XHJcbiAgICBsZXQgcm9hZE1hcFJlYWNoZWQgPSBmYWxzZTtcclxuICAgIGxldCBub3RlYm9va1JlYWNoZWQgPSBmYWxzZTtcclxuICAgIGxldCBzdXBwb3J0UmVhY2hlZCA9IGZhbHNlO1xyXG4gICAgbGV0IGFpckRyb3BSZWFjaGVkID0gZmFsc2U7XHJcblxyXG4gICAgbGV0IHJvYWRtYXAgPSBuZXcgV2F5cG9pbnQoe1xyXG4gICAgICBlbGVtZW50OiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnJvYWQtbWFwXCIpLFxyXG4gICAgICBoYW5kbGVyOiBmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAoIXJvYWRNYXBSZWFjaGVkKSB7XHJcbiAgICAgICAgICByb2FkTWFwUmVhY2hlZCA9IHRydWU7XHJcbiAgICAgICAgICBjb25zdCByb2FkTGluZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucm9hZC1tYXBfX2xpbmVcIik7XHJcbiAgICAgICAgICBjb25zdCBwbGFuTGluZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnBsYW5fX3JvYWQtbGluZVwiKTtcclxuICAgICAgICAgIGNvbnN0IHBsYW5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5wbGFuXCIpO1xyXG4gICAgICAgICAgY29uc3QgY2lyY2xlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucGxhbl9fY2lyY2xlXCIpO1xyXG5cclxuICAgICAgICAgIHJvYWRMaW5lLmNsYXNzTGlzdC5hZGQoXCJzaG93ZWRcIik7XHJcbiAgICAgICAgICBjb25zdCBkZWxheSA9IDUwMDtcclxuXHJcbiAgICAgICAgICBwbGFuTGluZXMuZm9yRWFjaCgocGwsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IF9kZWxheSA9IGRlbGF5ICsgMTAwICogaW5kZXg7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgIHBsLmNsYXNzTGlzdC5hZGQoXCJzaG93ZWRcIik7XHJcbiAgICAgICAgICAgICAgY2lyY2xlc1tpbmRleF0uY2xhc3NMaXN0LmFkZChcInNob3dlZFwiKTtcclxuICAgICAgICAgICAgICBwbGFuc1tpbmRleF0uY2xhc3NMaXN0LmFkZChcInNob3dlZFwiKTtcclxuICAgICAgICAgICAgfSwgX2RlbGF5KTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfSxcclxuICAgICAgb2Zmc2V0OiBcIjQwJVwiXHJcbiAgICB9KTtcclxuXHJcbiAgICBsZXQgbm90ZWJvb2sgPSBuZXcgV2F5cG9pbnQoe1xyXG4gICAgICBlbGVtZW50OiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLndoaXRlcGFwZXJcIiksXHJcbiAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmICghbm90ZWJvb2tSZWFjaGVkKSB7XHJcbiAgICAgICAgICBub3RlYm9va1JlYWNoZWQgPSB0cnVlO1xyXG4gICAgICAgICAgY29uc3QgdHJpZ2dlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibm90ZWJvb2tcIik7XHJcbiAgICAgICAgICBjb25zdCB0cmlnZ2VyQW5pbWF0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtYWluXCIpO1xyXG5cclxuICAgICAgICAgIGlmICghaXNNb2JpbGUoKSkge1xyXG4gICAgICAgICAgICB0cmlnZ2VyLmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KFwiY2xpY2tcIikpO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIHRyaWdnZXJBbmltYXRpb24ucmVtb3ZlQXR0cmlidXRlKFwiYmVnaW5cIik7XHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgICBvZmZzZXQ6IFwiMTAwJVwiXHJcbiAgICB9KTtcclxuXHJcbiAgICBsZXQgc3VwcG9ydCA9IG5ldyBXYXlwb2ludCh7XHJcbiAgICAgIGVsZW1lbnQ6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc3VwcG9ydFwiKSxcclxuICAgICAgaGFuZGxlcjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKCFzdXBwb3J0UmVhY2hlZCkge1xyXG4gICAgICAgICAgc3VwcG9ydFJlYWNoZWQgPSB0cnVlO1xyXG4gICAgICAgICAgY29uc3QgdHJpZ2dlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbGFuZC1wYXJ0c1wiKTtcclxuICAgICAgICAgIGNvbnN0IHRyaWdnZXJBbmltYXRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2xhbmQtcGFydHMtYW5pbVwiKTtcclxuXHJcbiAgICAgICAgICBpZiAoIWlzTW9iaWxlKCkpIHtcclxuICAgICAgICAgICAgYW5pbWF0ZU1hcCgpO1xyXG4gICAgICAgICAgICB0cmlnZ2VyLmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KFwiY2xpY2tcIikpO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIHRyaWdnZXJBbmltYXRpb24ucmVtb3ZlQXR0cmlidXRlKFwiYmVnaW5cIik7XHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgICBvZmZzZXQ6IFwiNDAlXCJcclxuICAgIH0pO1xyXG5cclxuICAgIGxldCBhaXJkcm9wID0gbmV3IFdheXBvaW50KHtcclxuICAgICAgZWxlbWVudDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5haXJkcm9wXCIpLFxyXG4gICAgICBoYW5kbGVyOiBmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAoIWFpckRyb3BSZWFjaGVkKSB7XHJcbiAgICAgICAgICBhaXJEcm9wUmVhY2hlZCA9IHRydWU7XHJcbiAgICAgICAgICBjb25zdCB0cmlnZ2VyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjcnlwdG9cIik7XHJcbiAgICAgICAgICBjb25zdCB0cmlnZ2VyQW5pbWF0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjcnlwdG8tYW5pbVwiKTtcclxuXHJcbiAgICAgICAgICBpZiAoIWlzTW9iaWxlKCkpIHtcclxuICAgICAgICAgICAgYW5pbWF0ZUNyeXB0b01hY2hpbmUoKTtcclxuICAgICAgICAgICAgdHJpZ2dlci5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudChcImNsaWNrXCIpKTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICB0cmlnZ2VyQW5pbWF0aW9uLnJlbW92ZUF0dHJpYnV0ZShcImJlZ2luXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSxcclxuICAgICAgb2Zmc2V0OiBcIjEwMCVcIlxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBpc01vYmlsZSgpIHtcclxuICAgIHJldHVybiB3aW5kb3cuaW5uZXJXaWR0aCA8PSA2NTA7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBpbml0VGltZXIoeWVhciwgbW9udGgsIHdlZWssIGRheSkge1xyXG4gICAgY29uc3QgdGltZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRpbWVyXCIpO1xyXG4gICAgY29uc3QgZGF5cyA9IHRpbWVyLnF1ZXJ5U2VsZWN0b3IoXCIudGltZXJfX2RheXNcIik7XHJcbiAgICBjb25zdCBtaW5zID0gdGltZXIucXVlcnlTZWxlY3RvcihcIi50aW1lcl9fbWludXRlc1wiKTtcclxuICAgIGNvbnN0IHNlY3MgPSB0aW1lci5xdWVyeVNlbGVjdG9yKFwiLnRpbWVyX19zZWNvbmRzXCIpO1xyXG4gICAgY29uc3QgaG91cnMgPSB0aW1lci5xdWVyeVNlbGVjdG9yKFwiLnRpbWVyX19ob3Vyc1wiKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEluaXRpYWxpemF0aW9uXHJcbiAgICAgKi9cclxuXHJcbiAgICBkYXlzLmlubmVySFRNTCA9IHdyYXBXaXRoWmVybygxNSk7XHJcbiAgICBtaW5zLmlubmVySFRNTCA9IHdyYXBXaXRoWmVybygwKTtcclxuICAgIHNlY3MuaW5uZXJIVE1MID0gd3JhcFdpdGhaZXJvKDApO1xyXG4gICAgaG91cnMuaW5uZXJIVE1MID0gd3JhcFdpdGhaZXJvKDApO1xyXG5cclxuICAgIHNldEludGVydmFsKGRlY3JlYXNlLCAxMDAwKTtcclxuXHJcbiAgICBmdW5jdGlvbiBkZWNyZWFzZSgpIHtcclxuICAgICAgY29uc3QgdGltZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRpbWVyXCIpO1xyXG4gICAgICBjb25zdCBkYXlzID0gdGltZXIucXVlcnlTZWxlY3RvcihcIi50aW1lcl9fZGF5c1wiKTtcclxuICAgICAgY29uc3QgbWlucyA9IHRpbWVyLnF1ZXJ5U2VsZWN0b3IoXCIudGltZXJfX21pbnV0ZXNcIik7XHJcbiAgICAgIGNvbnN0IHNlY3MgPSB0aW1lci5xdWVyeVNlbGVjdG9yKFwiLnRpbWVyX19zZWNvbmRzXCIpO1xyXG4gICAgICBjb25zdCBob3VycyA9IHRpbWVyLnF1ZXJ5U2VsZWN0b3IoXCIudGltZXJfX2hvdXJzXCIpO1xyXG5cclxuICAgICAgbGV0IHMgPSArc2Vjcy5pbm5lckhUTUwsXHJcbiAgICAgICAgbSA9ICttaW5zLmlubmVySFRNTCxcclxuICAgICAgICBoID0gK2hvdXJzLmlubmVySFRNTCxcclxuICAgICAgICBkID0gK2RheXMuaW5uZXJIVE1MO1xyXG5cclxuICAgICAgaWYgKHMgPiAwKSAtLXM7XHJcblxyXG4gICAgICBpZiAocyA9PT0gMCkge1xyXG4gICAgICAgIHMgPSA1OTtcclxuICAgICAgICBpZiAobSA+IDApIG0tLTtcclxuICAgICAgfVxyXG4gICAgICBpZiAobSA9PT0gMCkge1xyXG4gICAgICAgIG0gPSA1OTtcclxuICAgICAgICBpZiAoaCA+IDApIGgtLTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoaCA9PT0gMCkge1xyXG4gICAgICAgIGggPSAyMztcclxuICAgICAgICBpZiAoZCA+IDApIGQtLTtcclxuICAgICAgfVxyXG5cclxuICAgICAgc2Vjcy5pbm5lckhUTUwgPSBzO1xyXG4gICAgICBtaW5zLmlubmVySFRNTCA9IG07XHJcbiAgICAgIGhvdXJzLmlubmVySFRNTCA9IGg7XHJcbiAgICAgIGRheXMuaW5uZXJIVE1MID0gZDtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiB3cmFwV2l0aFplcm8oc3RyaW5nKSB7XHJcbiAgICAgIHN0cmluZyA9IHN0cmluZyArIFwiXCI7XHJcblxyXG4gICAgICBpZiAoc3RyaW5nLmxlbmd0aCA8IDIpIHtcclxuICAgICAgICBzdHJpbmcgPSBcIjBcIiArIHN0cmluZztcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gc3RyaW5nO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gaGlkZUNyeXB0b01hY2hpbmVFbGVtZW50cygpIHtcclxuICAgIGNvbnN0IGNyeXB0byA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY3J5cHRvXCIpO1xyXG4gICAgY3J5cHRvLnNldEF0dHJpYnV0ZShcIm9wYWNpdHlcIiwgXCIwXCIpO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gaGlkZU5vdGVib29rRWxlbWVudHMoKSB7XHJcbiAgICBjb25zdCBub3RlYm9vayA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibm90ZWJvb2tcIik7XHJcbiAgICBjb25zdCBwYWdlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJbaWRePSdwYWdlJ11cIik7XHJcbiAgICBjb25zdCB1bmRlcmxheWVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsYXllci0xXCIpO1xyXG5cclxuICAgIHBhZ2VzLmZvckVhY2gocGFnZSA9PiBwYWdlLnNldEF0dHJpYnV0ZShcIm9wYWNpdHlcIiwgXCIwXCIpKTtcclxuICAgIG5vdGVib29rLnNldEF0dHJpYnV0ZShcIm9wYWNpdHlcIiwgXCIwXCIpO1xyXG4gICAgdW5kZXJsYXllci5zZXRBdHRyaWJ1dGUoXCJvcGFjaXR5XCIsIFwiMFwiKTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGluaXRTbGlkZXIoKSB7XHJcbiAgICBpZiAoaXNNb2JpbGUoKSkge1xyXG4gICAgICAkKFwiLmhvdy1pdC13b3Jrc19fY2FyZHNcIikub3dsQ2Fyb3VzZWwoe1xyXG4gICAgICAgIGl0ZW1zOiAxLFxyXG4gICAgICAgIG1hcmdpbjogMzAsXHJcbiAgICAgICAgcGFkZGluZzogMzBcclxuICAgICAgfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAkKFwiLmhvdy1pdC13b3Jrc19fY2FyZHNcIikudHJpZ2dlcihcImRlc3Ryb3kub3dsLmNhcm91c2VsXCIpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gYW5pbWF0ZU1hcCgpIHtcclxuICAgIGNvbnN0IGRvdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRvdHNcIik7XHJcblxyXG4gICAgQXJyYXkuZnJvbShkb3RzLmNoaWxkTm9kZXMpLmZvckVhY2goZG90ID0+IHtcclxuICAgICAgY29uc3QgcGF0aCA9IGRvdC5xdWVyeVNlbGVjdG9yKFwicGF0aFwiKTtcclxuICAgICAgcGF0aC5zZXRBdHRyaWJ1dGUoXCJvcGFjaXR5XCIsIFwiMVwiKTtcclxuICAgICAgcGF0aC5pbm5lckhUTUwgPSBjcmVhdGVBbmltYXRpb25FbGVtZW50KFwiYW5pbWF0ZVwiLCB7XHJcbiAgICAgICAgXCJ4bGluazpocmVmXCI6IFwiI1wiICsgcGF0aC5pZCxcclxuICAgICAgICBhdHRyaWJ1dGVOYW1lOiBcIm9wYWNpdHlcIixcclxuICAgICAgICBkdXI6IGAke01hdGgucmFuZG9tKCkgKiAyICsgMC41fXNgLFxyXG4gICAgICAgIGZyb206IFwiMVwiLFxyXG4gICAgICAgIHRvOiBcIjBcIixcclxuICAgICAgICByZXBlYXRDb3VudDogXCJpbmRlZmluaXRlXCIsXHJcbiAgICAgICAgYmVnaW46IFwiZG90cy1hbmltLmVuZCArIC4yc1wiXHJcbiAgICAgIH0pLm91dGVySFRNTDtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gaGlkZU1hcEVsZW1lbnRzKCkge1xyXG4gICAgY29uc3QgbGluZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2xpbmVzXCIpO1xyXG4gICAgY29uc3QgZG90cyA9IG1hcC5xdWVyeVNlbGVjdG9yKFwiLmRvdHNcIik7XHJcbiAgICBjb25zdCBsYW5kcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbGFuZC1wYXJ0c1wiKTtcclxuXHJcbiAgICBsaW5lcy5zZXRBdHRyaWJ1dGUoXCJvcGFjaXR5XCIsIFwiMVwiKTtcclxuICAgIGRvdHMuc2V0QXR0cmlidXRlKFwib3BhY2l0eVwiLCBcIjFcIik7XHJcbiAgICBsYW5kcy5zZXRBdHRyaWJ1dGUoXCJvcGFjaXR5XCIsIFwiMVwiKTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGNyZWF0ZUFuaW1hdGlvbkVsZW1lbnQoYW5pbWF0aW9uRWxlbWVudCwgY29uZmlnKSB7XHJcbiAgICBpZiAoIWNvbmZpZykge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgYW5pbWF0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChhbmltYXRpb25FbGVtZW50KTtcclxuICAgIGZvciAobGV0IG9wdGlvbiBpbiBjb25maWcpIHtcclxuICAgICAgYW5pbWF0aW9uLnNldEF0dHJpYnV0ZShvcHRpb24sIGNvbmZpZ1tvcHRpb25dKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gYW5pbWF0aW9uO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gYW5pbWF0ZUNyeXB0b01hY2hpbmUoKSB7XHJcbiAgICBjb25zdCBjcnlwdG9NYWNoaW5lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjcnlwdG9cIik7XHJcblxyXG4gICAgY29uc3QgY2lyY2xlcyA9IGNyeXB0b01hY2hpbmUucXVlcnlTZWxlY3RvckFsbChcIi5jaXJjbGVcIik7XHJcbiAgICBjb25zdCBzdWJzdHJhdGVzID0gY3J5cHRvTWFjaGluZS5xdWVyeVNlbGVjdG9yQWxsKFwiLnN1YnN0cmF0ZVwiKTtcclxuXHJcbiAgICBpbml0QW5pbWF0ZWRMaW5lcyhjcnlwdG9NYWNoaW5lKTtcclxuXHJcbiAgICBzdWJzdHJhdGVzLmZvckVhY2goKHN1YnN0cmF0ZSwgaW5kZXgpID0+IHtcclxuICAgICAgc3Vic3RyYXRlLnNldEF0dHJpYnV0ZShcImlkXCIsIGBzdWJzdHJhdGUtJHtpbmRleH1gKTtcclxuICAgICAgc3Vic3RyYXRlLnNldEF0dHJpYnV0ZShcIm9wYWNpdHlcIiwgXCIwXCIpO1xyXG4gICAgICBjb25zdCBhbmltYXRpb24gPSBjcmVhdGVBbmltYXRpb25FbGVtZW50KFwiYW5pbWF0ZVwiLCB7XHJcbiAgICAgICAgXCJ4bGluazpocmVmXCI6IGAjc3Vic3RyYXRlLSR7aW5kZXh9YCxcclxuICAgICAgICBhdHRyaWJ1dGVOYW1lOiBcIm9wYWNpdHlcIixcclxuICAgICAgICBkdXI6IGAyc2AsXHJcbiAgICAgICAgZnJvbTogXCIwXCIsXHJcbiAgICAgICAgdG86IFwiMVwiLFxyXG4gICAgICAgIGJlZ2luOiBcImNyeXB0by1hbmltLmVuZCArIC41c1wiLFxyXG4gICAgICAgIGZpbGw6IFwiZnJlZXplXCJcclxuICAgICAgfSk7XHJcbiAgICAgIGFkZEFuaW1hdGlvblRvU3ZnRWxlbWVudChzdWJzdHJhdGUsIGFuaW1hdGlvbik7XHJcbiAgICB9KTtcclxuXHJcbiAgICBjaXJjbGVzLmZvckVhY2goKGNpcmNsZSwgaW5kZXgpID0+IHtcclxuICAgICAgY2lyY2xlLnNldEF0dHJpYnV0ZShcImlkXCIsIGBjaXJjbGUtJHtpbmRleH1gKTtcclxuICAgICAgY2lyY2xlLnNldEF0dHJpYnV0ZShcIm9wYWNpdHlcIiwgXCIwXCIpO1xyXG4gICAgICBjb25zdCBhbmltYXRpb24gPSBjcmVhdGVBbmltYXRpb25FbGVtZW50KFwiYW5pbWF0ZVwiLCB7XHJcbiAgICAgICAgXCJ4bGluazpocmVmXCI6IGAjY2lyY2xlLSR7aW5kZXh9YCxcclxuICAgICAgICBhdHRyaWJ1dGVOYW1lOiBcIm9wYWNpdHlcIixcclxuICAgICAgICBkdXI6IGAke01hdGgucmFuZG9tKCkgKiAzICsgMX1zYCxcclxuICAgICAgICB2YWx1ZXM6IFwiLjU7IC42OyAxOyAuNzsgLjRcIixcclxuICAgICAgICBiZWdpbjogXCJjcnlwdG8tYW5pbS5lbmQgKyAuNXNcIixcclxuICAgICAgICByZXBlYXRDb3VudDogXCJpbmRlZmluaXRlXCJcclxuICAgICAgfSk7XHJcbiAgICAgIGFkZEFuaW1hdGlvblRvU3ZnRWxlbWVudChjaXJjbGUsIGFuaW1hdGlvbik7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGluaXRBbmltYXRlZExpbmVzKHJvb3QpIHtcclxuICAgIGNyZWF0ZUFuaW1hdGVkTGluZShcIiNsaW5lLTFcIiwgMC4wMDEsIDEwKTtcclxuICAgIGNyZWF0ZUFuaW1hdGVkTGluZShcIiNsaW5lLTJcIiwgMC4xLCAyMCk7XHJcbiAgICBjcmVhdGVBbmltYXRlZExpbmUoXCIjbGluZS0zXCIsIDAuMiwgNTApO1xyXG4gICAgY3JlYXRlQW5pbWF0ZWRMaW5lKFwiI2xpbmUtNFwiLCAwLjMsIDUwKTtcclxuICAgIGNyZWF0ZUFuaW1hdGVkTGluZShcIiNsaW5lLTVcIiwgMC40LCA0MCk7XHJcbiAgICBjcmVhdGVBbmltYXRlZExpbmUoXCIjbGluZS02XCIsIDAuNSwgMTApO1xyXG5cclxuICAgIGZ1bmN0aW9uIGNyZWF0ZUFuaW1hdGVkTGluZShsaW5lSWQsIGRlbGF5LCBtb3ZpbmdIZWlnaHQpIHtcclxuICAgICAgY29uc3QgbGluZSA9IHJvb3QucXVlcnlTZWxlY3RvcihsaW5lSWQpO1xyXG4gICAgICBjb25zdCBsaW5lQW5pbWF0aW9uQ29uZmlnID0gY3JlYXRlQW5pbWF0aW9uRWxlbWVudChcImFuaW1hdGVUcmFuc2Zvcm1cIiwge1xyXG4gICAgICAgIGF0dHJpYnV0ZU5hbWU6IFwidHJhbnNmb3JtXCIsXHJcbiAgICAgICAgZHVyOiBgMnNgLFxyXG4gICAgICAgIGJlZ2luOiBgY3J5cHRvLWFuaW0uZW5kICsgJHtkZWxheX1zYCxcclxuICAgICAgICB0eXBlOiBcInRyYW5zbGF0ZVwiLFxyXG4gICAgICAgIHZhbHVlczogYDAgMDsgMCAtJHttb3ZpbmdIZWlnaHR9OyAwIDA7IDAgJHttb3ZpbmdIZWlnaHR9OyAwIDA7YCxcclxuICAgICAgICByZXBlYXRDb3VudDogXCJpbmRlZmluaXRlXCJcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBhZGRBbmltYXRpb25Ub1N2Z0VsZW1lbnQobGluZSwgbGluZUFuaW1hdGlvbkNvbmZpZyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBhZGRBbmltYXRpb25Ub1N2Z0VsZW1lbnQoZWxlbWVudCwgYW5pbWF0aW9uKSB7XHJcbiAgICBlbGVtZW50LmlubmVySFRNTCA9IGFuaW1hdGlvbi5vdXRlckhUTUw7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBpbml0RGVza3RvcFBvcHVwSW50ZXJhY3Rpb24oKSB7XHJcbiAgICBsZXQgZGVjb3JhdGl2ZUZ1bmN0aW9uID0gZGVib3VuY2UoaXNNb3VzZU9uV2lkZ2V0LCA1MCk7XHJcbiAgICBsZXQgaGFzVGFwcGVkID0gZmFsc2U7XHJcblxyXG4gICAgZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsIGRlY29yYXRpdmVGdW5jdGlvbik7XHJcblxyXG4gICAgZnVuY3Rpb24gaXNNb3VzZU9uV2lkZ2V0KGV2ZW50KSB7XHJcbiAgICAgIGNvbnN0IHBvc1ggPSBldmVudC5jbGllbnRYLFxyXG4gICAgICAgIHBvc1kgPSBldmVudC5jbGllbnRZO1xyXG5cclxuICAgICAgY29uc3QgcG9wdXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmhvbWVfX21vZGFsXCIpO1xyXG5cclxuICAgICAgY29uc3QgaXNPbldpZGdldCA9IGlzT25FbGVtZW50KHBvc1gsIHBvc1ksIFwiLmhvbWVfX3JpZ2h0IC53aWRnZXRcIik7XHJcbiAgICAgIGNvbnN0IGlzT25CdXR0b24gPSBpc09uRWxlbWVudChwb3NYLCBwb3NZLCBcIi53aWRnZXRfX2J1dHRvblwiKTtcclxuICAgICAgY29uc3QgaXNPblBvcHVwID0gaXNPbkVsZW1lbnQocG9zWCwgcG9zWSwgXCIuaG9tZV9fbW9kYWxcIik7XHJcbiAgICAgIGNvbnN0IGlzT25JbnB1dCA9IGlzT25FbGVtZW50KHBvc1gsIHBvc1ksIFwiLndpZGdldF9fc2xpZGVyXCIpO1xyXG5cclxuICAgICAgaWYgKFxyXG4gICAgICAgIChpc09uV2lkZ2V0IHx8IGlzT25Qb3B1cCkgJiZcclxuICAgICAgICAhaXNPbkJ1dHRvbiAmJlxyXG4gICAgICAgICFpc09uSW5wdXQgJiZcclxuICAgICAgICAhaGFzTW91c2UoKVxyXG4gICAgICApIHtcclxuICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoXCJ3aWRnZXQtb24taG92ZXJcIik7XHJcbiAgICAgICAgcG9wdXAuY2xhc3NMaXN0LmFkZChcInNob3dlZFwiKTtcclxuXHJcbiAgICAgICAgaWYgKCFoYXNUYXBwZWQpIHtcclxuICAgICAgICAgIGNvbnN0IHRhcExpbmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLndpZGdldF9fdGFwLWxpbmVcIik7XHJcbiAgICAgICAgICB0YXBMaW5lLmNsYXNzTGlzdC5hZGQoXCJ0YXBwZWRcIik7XHJcblxyXG4gICAgICAgICAgaGFzVG91Y2hlZCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnN0IGRlbGF5ID0gMzAwO1xyXG5cclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZShcIndpZGdldC1vbi1ob3ZlclwiKTtcclxuICAgICAgICAgIHBvcHVwLmNsYXNzTGlzdC5yZW1vdmUoXCJzaG93ZWRcIik7XHJcbiAgICAgICAgfSwgZGVsYXkpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBpc09uRWxlbWVudChwb3NYLCBwb3NZLCBlbGVtZW50VGFnKSB7XHJcbiAgICBjb25zdCBlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoZWxlbWVudFRhZyk7XHJcbiAgICBjb25zdCBlbFBvc0luZm8gPSBlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuXHJcbiAgICBjb25zdCBlbF94MSA9IGVsUG9zSW5mby54O1xyXG4gICAgY29uc3QgZWxfeTEgPSBlbFBvc0luZm8ueTtcclxuICAgIGNvbnN0IGVsX3gyID0gZWxfeDEgKyBlbFBvc0luZm8ud2lkdGg7XHJcbiAgICBjb25zdCBlbF95MiA9IGVsX3kxICsgZWxQb3NJbmZvLmhlaWdodDtcclxuXHJcbiAgICByZXR1cm4gcG9zWCA+PSBlbF94MSAmJiBwb3NYIDw9IGVsX3gyICYmIHBvc1kgPj0gZWxfeTEgJiYgcG9zWSA8PSBlbF95MjtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHNob3dQb3B1cCgpIHtcclxuICAgIGNvbnN0IHBvcHVwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5ob21lX19tb2RhbFwiKTtcclxuXHJcbiAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoXCJ3aWRnZXQtb24taG92ZXJcIik7XHJcbiAgICBwb3B1cC5jbGFzc0xpc3QuYWRkKFwic2hvd2VkXCIpO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gaGlkZVdpZGdldCgpIHtcclxuICAgIGNvbnN0IHdpZGdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaG9tZV9fcmlnaHQgLndpZGdldFwiKTtcclxuICAgIHdpZGdldC5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gaW5pdE1vYmlsZVBvcHVwSW50ZXJhY3Rpb24oKSB7XHJcbiAgICBsZXQgdG91Y2hzdGFydFggPSAwO1xyXG4gICAgbGV0IHRvdWNoc3RhcnRZID0gMDtcclxuICAgIGxldCB0b3VjaGVuZFggPSAwO1xyXG4gICAgbGV0IHRvdWNoZW5kWSA9IDA7XHJcblxyXG4gICAgbGV0IGhhc1N3aXBlZCA9IGZhbHNlO1xyXG5cclxuICAgIGNvbnN0IGhvbWVTZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5ob21lXCIpO1xyXG5cclxuICAgIGhvbWVTZWN0aW9uLmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaHN0YXJ0XCIsIHNldFN0YXJ0VG91Y2hWYXJpYWJsZXMsIGZhbHNlKTtcclxuICAgIGhvbWVTZWN0aW9uLmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaGVuZFwiLCBzd2lwZUhhbmRsZXIsIGZhbHNlKTtcclxuXHJcbiAgICBoaWRlUG9wdXBzQW5kV2lkZ2V0Qm9yZGVyQm90dG9tKCk7XHJcblxyXG4gICAgZnVuY3Rpb24gc2V0U3RhcnRUb3VjaFZhcmlhYmxlcyhldmVudCkge1xyXG4gICAgICB0b3VjaHN0YXJ0WCA9IGV2ZW50LmNoYW5nZWRUb3VjaGVzWzBdLnNjcmVlblg7XHJcbiAgICAgIHRvdWNoc3RhcnRZID0gZXZlbnQuY2hhbmdlZFRvdWNoZXNbMF0uc2NyZWVuWTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBoaWRlUG9wdXBzQW5kV2lkZ2V0Qm9yZGVyQm90dG9tKCkge1xyXG4gICAgICBjb25zdCBwb3B1cFRvcFNlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxyXG4gICAgICAgIFwiLmhvbWVfX21vZGFsIC53aWRnZXRfX3RvcFwiXHJcbiAgICAgICk7XHJcbiAgICAgIGNvbnN0IHdpZGdldFRvcFNlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxyXG4gICAgICAgIFwiLmhvbWVfX3JpZ2h0IC53aWRnZXRfX3RvcFwiXHJcbiAgICAgICk7XHJcblxyXG4gICAgICBwb3B1cFRvcFNlY3Rpb24uY2xhc3NMaXN0LmFkZChcIm5vLWJvcmRlclwiKTtcclxuICAgICAgd2lkZ2V0VG9wU2VjdGlvbi5jbGFzc0xpc3QuYWRkKFwibm8tYm9yZGVyXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHN3aXBlSGFuZGxlcihldmVudCkge1xyXG4gICAgICBjb25zdCB3aWRnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmhvbWVfX3JpZ2h0IC53aWRnZXRcIik7XHJcbiAgICAgIGNvbnN0IHBvcHVwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5ob21lX19tb2RhbFwiKTtcclxuXHJcbiAgICAgIHRvdWNoZW5kWCA9IGV2ZW50LmNoYW5nZWRUb3VjaGVzWzBdLnNjcmVlblg7XHJcbiAgICAgIHRvdWNoZW5kWSA9IGV2ZW50LmNoYW5nZWRUb3VjaGVzWzBdLnNjcmVlblk7XHJcbiAgICAgIHRhcmdldCA9IGV2ZW50LnRhcmdldDtcclxuXHJcbiAgICAgIGNvbnN0IGlzU3dpcGVJc1Nob3J0ZXJUaGVuUXVhcnRlciA9XHJcbiAgICAgICAgTWF0aC5hYnModG91Y2hlbmRYIC0gdG91Y2hzdGFydFgpIDw9IHdpbmRvdy5pbm5lcldpZHRoIC8gNDtcclxuXHJcbiAgICAgIGlmIChpc1N3aXBlSXNTaG9ydGVyVGhlblF1YXJ0ZXIpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH0gZWxzZSBpZiAodG91Y2hlbmRYID49IHRvdWNoc3RhcnRYKSB7XHJcbiAgICAgICAgaWYgKGlzVXNlclN3aXBlV2FzT25XaWRnZXQoKSkge1xyXG4gICAgICAgICAgc2hvd1BvcHVwKCk7XHJcbiAgICAgICAgICBoaWRlV2lkZ2V0KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIWhhc1N3aXBlZCkge1xyXG4gICAgICAgICAgY29uc3Qgc3dhcExpbmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLndpZGdldF9fc3dpcGUtbGluZVwiKTtcclxuICAgICAgICAgIHN3YXBMaW5lLmNsYXNzTGlzdC5hZGQoXCJ3aWRnZXRfX3N3aXBlLWxpbmUtLW5vLXRpdGxlXCIpO1xyXG5cclxuICAgICAgICAgIGhhc1N3aXBlZCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEhpZGUgcG9wdXBcclxuICAgICAgICAgKi9cclxuICAgICAgICBpZiAoaXNVc2VyU3dpcGVXYXNPbldpZGdldCgpKSB7XHJcbiAgICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoXCJ3aWRnZXQtb24taG92ZXJcIik7XHJcbiAgICAgICAgICBwb3B1cC5jbGFzc0xpc3QucmVtb3ZlKFwic2hvd2VkXCIpO1xyXG4gICAgICAgICAgd2lkZ2V0LmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBmdW5jdGlvbiBpc1VzZXJTd2lwZVdhc09uV2lkZ2V0KCkge1xyXG4gICAgICAgIHJldHVybiB0YXJnZXQuY2xvc2VzdChcIi53aWRnZXRcIik7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGRlYm91bmNlKGYsIG1zKSB7XHJcbiAgICBsZXQgdGltZXIgPSBudWxsO1xyXG5cclxuICAgIHJldHVybiBmdW5jdGlvbiguLi5hcmdzKSB7XHJcbiAgICAgIGNvbnN0IG9uQ29tcGxldGUgPSAoKSA9PiB7XHJcbiAgICAgICAgZi5hcHBseSh0aGlzLCBhcmdzKTtcclxuICAgICAgICB0aW1lciA9IG51bGw7XHJcbiAgICAgIH07XHJcblxyXG4gICAgICBpZiAodGltZXIpIHtcclxuICAgICAgICBjbGVhclRpbWVvdXQodGltZXIpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB0aW1lciA9IHNldFRpbWVvdXQob25Db21wbGV0ZSwgbXMpO1xyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGFkZEV2ZW50TGlzdGVuZXJzKCkge1xyXG4gICAgY29uc3Qgc2xpZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zbGlkZXJcIik7XHJcbiAgICBjb25zdCBzdW1tYXJ5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi53aWRnZXRfX2N1cnJlbnQtc3VtbWFyeSAuc3VtbWFyeVwiKTtcclxuXHJcbiAgICBjb25zdCBkZXNrdG9wQnJlYWtwb2luID0gMTIwMDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEJpbmQgYSBzbGlkZXIgZGF0YSBjaGFuZ2luZyB3aXRoIGEgdmlld1xyXG4gICAgICovXHJcbiAgICBzbGlkZXIuYWRkRXZlbnRMaXN0ZW5lcihcclxuICAgICAgXCJjaGFuZ2VcIixcclxuICAgICAgZXZlbnQgPT4gKHN1bW1hcnkuaW5uZXJIVE1MID0gZXZlbnQuY3VycmVudFRhcmdldC52YWx1ZSlcclxuICAgICk7XHJcblxyXG4gICAgaWYgKHdpbmRvdy5pbm5lcldpZHRoID49IGRlc2t0b3BCcmVha3BvaW4gJiYgaXNEb2N1bWVudEZyb3plbigpKSB7XHJcbiAgICAgIGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNld2hlZWxcIiwgc2Nyb2xsVG9TZWN0aW9uLCB7XHJcbiAgICAgICAgcGFzc2l2ZTogdHJ1ZVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoaXNNb2JpbGUoKSkge1xyXG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCBpbml0U2xpZGVyKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIWlzTW9iaWxlKCkpIHtcclxuICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGhlYWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaGVhZGVyXCIpO1xyXG4gICAgICAgIGlmIChoZWFkZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuYm90dG9tIDwgd2luZG93LnBhZ2VZT2Zmc2V0KSB7XHJcbiAgICAgICAgICBoZWFkZXIuY2xhc3NMaXN0LmFkZChcImZpeGVkXCIpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBoZWFkZXIuY2xhc3NMaXN0LnJlbW92ZShcImZpeGVkXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgd2luZG93LmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KFwic2Nyb2xsXCIpKTtcclxuXHJcbiAgICBhZGRCdXR0b25zRXZlbnRMaXN0ZW5lcnMoKTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHNjcm9sbFRvU2VjdGlvbigpIHtcclxuICAgIGNvbnN0IHNjcm9sbE1vdXNlVG8gPSAkKFwiI3Njcm9sbC10b1wiKS5vZmZzZXQoKS50b3A7XHJcbiAgICBjb25zdCBzY3JvbGxUaW1lID0gOTAwO1xyXG4gICAgY29uc3QgZGVsYXkgPSA1MDA7XHJcblxyXG4gICAgaGlkZU1vdXNlKCk7XHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgdW5mcmVlemVEb2N1bWVudCgpO1xyXG4gICAgICAkKFwiaHRtbCwgZG9jdW1lbnQuYm9keVwiKS5hbmltYXRlKFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIHNjcm9sbFRvcDogc2Nyb2xsTW91c2VUbyxcclxuICAgICAgICAgIGVhc2U6IFwiZWFzZU91dEJhY2tcIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2Nyb2xsVGltZVxyXG4gICAgICApO1xyXG4gICAgfSwgZGVsYXkpO1xyXG5cclxuICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNld2hlZWxcIiwgc2Nyb2xsVG9TZWN0aW9uKTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGlzRG9jdW1lbnRGcm96ZW4oKSB7XHJcbiAgICByZXR1cm4gZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuY29udGFpbnMoXCJuby1zY3JvbGxcIik7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiB1bmZyZWV6ZURvY3VtZW50KCkge1xyXG4gICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QucmVtb3ZlKFwibm8tc2Nyb2xsXCIpO1xyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImh0bWxcIikuY2xhc3NMaXN0LnJlbW92ZShcIm5vLXNjcm9sbFwiKTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHJlbW92ZUxvYWRlcigpIHtcclxuICAgIGNvbnN0IGxvYWRlckhUTUwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNob3NlLWxhbmd1YWdlLXdyYXBwZXJcIik7XHJcbiAgICBjb25zdCBsb2FkZXJTY3JpcHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2xvYWRlci1zY3JpcHRcIik7XHJcbiAgICBjb25zdCBsb2FkZXJMaWIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2xvYWRlci1saWJcIik7XHJcblxyXG4gICAgbG9hZGVyTGliLnJlbW92ZSgpO1xyXG4gICAgbG9hZGVyU2NyaXB0LnJlbW92ZSgpO1xyXG5cclxuICAgIGNvbnN0IHRpbWVUb0xvYWRlckhpZGUgPSAyMDAwO1xyXG4gICAgbG9hZGVySFRNTC5jbGFzc0xpc3QuYWRkKFwicmVtb3ZlZFwiKTtcclxuICAgIHNldFRpbWVvdXQoKCkgPT4gbG9hZGVySFRNTC5yZW1vdmUoKSwgdGltZVRvTG9hZGVySGlkZSk7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBmcmVlemVEb2N1bWVudCgpIHtcclxuICAgIGNvbnN0IHNjcm9sbE1vdXNlVG8gPSAkKFwiI3Njcm9sbC10b1wiKS5vZmZzZXQoKS50b3A7XHJcblxyXG4gICAgaWYgKFxyXG4gICAgICB3aW5kb3cuaW5uZXJXaWR0aCA+PSAxMjAwICYmXHJcbiAgICAgIChzY3JvbGxNb3VzZVRvICogMTApIC8gMTAgPj0gd2luZG93LnBhZ2VZT2Zmc2V0XHJcbiAgICApIHtcclxuICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKFwibm8tc2Nyb2xsXCIpO1xyXG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiaHRtbFwiKS5jbGFzc0xpc3QuYWRkKFwibm8tc2Nyb2xsXCIpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaGlkZU1vdXNlKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBoaWRlTW91c2UoKSB7XHJcbiAgICBjb25zdCBtb3VzZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibW91c2VcIik7XHJcbiAgICBtb3VzZS5jbGFzc0xpc3QuYWRkKFwic2NhbGVkXCIpO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gaGFzTW91c2UoKSB7XHJcbiAgICByZXR1cm4gIWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibW91c2VcIikuY2xhc3NMaXN0LmNvbnRhaW5zKFwic2NhbGVkXCIpO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gYWRkQnV0dG9uc0V2ZW50TGlzdGVuZXJzKCkge1xyXG4gICAgY29uc3QgYnV0dG9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuYnV0dG9uLS1zY3JvbGwtdG8tdG9wXCIpO1xyXG4gICAgYnV0dG9ucy5mb3JFYWNoKGJ1dHRvbiA9PiBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHNjcm9sbFRvVG9wKSk7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBzY3JvbGxUb1RvcCgpIHtcclxuICAgIGxldCB0byA9IDA7XHJcblxyXG4gICAgaWYgKGlzTW9iaWxlKCkpIHtcclxuICAgICAgY29uc3Qgd2lkZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5ob21lX19yaWdodCAud2lkZ2V0XCIpO1xyXG4gICAgICBjb25zdCB3aWRnZXRFbGVtZW50RGF0YSA9IHdpZGdldC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuXHJcbiAgICAgIHRvID0gd2lkZ2V0RWxlbWVudERhdGEuaGVpZ2h0IC8gMjtcclxuICAgIH1cclxuXHJcbiAgICAkKFwiaHRtbCwgZG9jdW1lbnQuYm9keVwiKS5hbmltYXRlKFxyXG4gICAgICB7XHJcbiAgICAgICAgc2Nyb2xsVG9wOiB0byxcclxuICAgICAgICBlYXNlOiBcImVhc2VPdXRCYWNrXCJcclxuICAgICAgfSxcclxuICAgICAgOTAwXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gaW5pdEFuaW1hdGlvbnMoKSB7XHJcbiAgICAvKipcclxuICAgICAqIFNldHVwIHlvdXIgTGF6eSBMaW5lIGVsZW1lbnQuXHJcbiAgICAgKiBzZWUgUkVBRE1FIGZpbGUgZm9yIG1vcmUgc2V0dGluZ3NcclxuICAgICAqL1xyXG4gICAgY29uc3QgYW5pbWF0aW9uc0NvbmZpZyA9IHtcclxuICAgICAgZWFzZTogXCJlYXNlSW5RdWFkXCIsXHJcbiAgICAgIHN0cm9rZVdpZHRoOiAwLjUsXHJcbiAgICAgIHN0cm9rZU9wYWNpdHk6IDEsXHJcbiAgICAgIHN0cm9rZUNvbG9yOiBcIiNmZmZmZmZcIlxyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBsb2dvQW5pbWF0aW9uc0NvbmZpZyA9IHtcclxuICAgICAgZWFzZTogXCJlYXNlSW5RdWFkXCIsXHJcbiAgICAgIHN0cm9rZVdpZHRoOiA0LFxyXG4gICAgICBzdHJva2VPcGFjaXR5OiAxLFxyXG4gICAgICBzdHJva2VDb2xvcjogXCIjZmZmZmZmXCJcclxuICAgIH07XHJcblxyXG4gICAgbGV0IHRlYW1JY29uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0ZWFtXCIpO1xyXG4gICAgbGV0IGNhbGVuZGFySWNvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY2FsZW5kYXJcIik7XHJcbiAgICBsZXQgbG9nb0ljb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2xvZ29cIik7XHJcblxyXG4gICAgbGV0IHRlYW1JY29uQW5pbWF0aW9uID0gbmV3IExhenlMaW5lUGFpbnRlcih0ZWFtSWNvbiwgYW5pbWF0aW9uc0NvbmZpZyk7XHJcbiAgICBsZXQgY2FsZW5kYXJJY29uQW5pbWF0aW9uID0gbmV3IExhenlMaW5lUGFpbnRlcihcclxuICAgICAgY2FsZW5kYXJJY29uLFxyXG4gICAgICBhbmltYXRpb25zQ29uZmlnXHJcbiAgICApO1xyXG4gICAgbGV0IGxvZ29JY29uQW5pbWF0aW9uID0gbmV3IExhenlMaW5lUGFpbnRlcihsb2dvSWNvbiwgbG9nb0FuaW1hdGlvbnNDb25maWcpO1xyXG5cclxuICAgIHRlYW1JY29uQW5pbWF0aW9uLnBhaW50KCk7XHJcbiAgICBjYWxlbmRhckljb25BbmltYXRpb24ucGFpbnQoKTtcclxuICAgIGxvZ29JY29uQW5pbWF0aW9uLnBhaW50KCk7XHJcblxyXG4gICAgaGlkZU1hcEVsZW1lbnRzKCk7XHJcbiAgICBoaWRlQ3J5cHRvTWFjaGluZUVsZW1lbnRzKCk7XHJcbiAgICBoaWRlTm90ZWJvb2tFbGVtZW50cygpO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gc2hvd0ljb25zKCkge1xyXG4gICAgY29uc3QgYm9hcmRJbWFnZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmJvYXJkX19pbWFnZSBzdmdcIik7XHJcblxyXG4gICAgYm9hcmRJbWFnZXMuZm9yRWFjaChpbWFnZSA9PiB7XHJcbiAgICAgIGNvbnN0IG9wYWNpZnlFbGVtZW50cyA9IGltYWdlLnF1ZXJ5U2VsZWN0b3JBbGwoXCJbZmlsbC1vcGFjaXR5XVwiKTtcclxuICAgICAgb3BhY2lmeUVsZW1lbnRzLmZvckVhY2gob3BFbGVtZW50ID0+XHJcbiAgICAgICAgb3BFbGVtZW50LnNldEF0dHJpYnV0ZShcImZpbGwtb3BhY2l0eVwiLCBcIjFcIilcclxuICAgICAgKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gYWRkTGFuZ3VhZ2VCdXR0b25zRXZlbnRMaXN0ZW5lcnMoKSB7XHJcbiAgICBjb25zdCBsYW5ndWFnZUJ1dHRvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxyXG4gICAgICBcIi5jaG9zZS1sYW5ndWFnZV9fbGFuZ3VhZ2VzXCJcclxuICAgICk7XHJcblxyXG4gICAgc2hvd0xhbmd1YWdlQ2hvc2VNZW51KCk7XHJcblxyXG4gICAgbGFuZ3VhZ2VCdXR0b25zLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBldmVudCA9PiB7XHJcbiAgICAgIGNvbnN0IEtPUkVBTiA9IFwiY2hvc2UtbGFuZ3VhZ2VfX2xhbmd1YWdlLS1rb3JlYW5cIjtcclxuICAgICAgY29uc3QgY2xpY2tlZEJ1dHRvbiA9IGV2ZW50LnRhcmdldDtcclxuXHJcbiAgICAgIGlmIChjbGlja2VkQnV0dG9uLmNsYXNzTGlzdC5jb250YWlucyhLT1JFQU4pKSB7XHJcbiAgICAgICAgdHJhbnNsYXRlVG9Lb3JlYW4oXCJLT1JcIik7XHJcbiAgICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKCdrb3InKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaGlkZUxhbmd1YWdlQ2hvc2VNZW51KCk7XHJcblxyXG4gICAgICBpZiAoIWlzTW9iaWxlKCkpIHtcclxuICAgICAgICBpbml0QW5pbWF0aW9ucygpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBmdW5jdGlvbiBzaG93TGFuZ3VhZ2VDaG9zZU1lbnUoKSB7XHJcbiAgICAgIGNvbnN0IGNob3NlTGFuZ3VhZ2VNYWluRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXHJcbiAgICAgICAgXCIuY2hvc2UtbGFuZ3VhZ2VcIlxyXG4gICAgICApO1xyXG4gICAgICBjaG9zZUxhbmd1YWdlTWFpbkVsZW1lbnQuY2xhc3NMaXN0LmFkZChcInNob3dlZFwiKTtcclxuICAgICAgY29uc3QgbGFuZ3VhZ2VCdXR0b25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcclxuICAgICAgICBcIi5jaG9zZS1sYW5ndWFnZV9fbGFuZ3VhZ2VcIlxyXG4gICAgICApO1xyXG4gICAgICBsYW5ndWFnZUJ1dHRvbnMuZm9yRWFjaChsYiA9PiBsYi5jbGFzc0xpc3QuYWRkKFwic2hvd2VkXCIpKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBoaWRlTGFuZ3VhZ2VDaG9zZU1lbnUoKSB7XHJcbiAgICAgIGNvbnN0IGxhbmd1YWdlQnV0dG9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXHJcbiAgICAgICAgXCIuY2hvc2UtbGFuZ3VhZ2VfX2xhbmd1YWdlXCJcclxuICAgICAgKTtcclxuICAgICAgbGFuZ3VhZ2VCdXR0b25zLmZvckVhY2gobGIgPT4gbGIuY2xhc3NMaXN0LnJlbW92ZShcInNob3dlZFwiKSk7XHJcblxyXG4gICAgICBjb25zdCBjaG9zZUxhbmd1YWdlTWFpbkVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxyXG4gICAgICAgIFwiLmNob3NlLWxhbmd1YWdlXCJcclxuICAgICAgKTtcclxuICAgICAgY2hvc2VMYW5ndWFnZU1haW5FbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJzaG93ZWRcIik7XHJcblxyXG4gICAgICBzZXRUaW1lb3V0KHJlbW92ZUxvYWRlciwgMTUwMCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiB0cmFuc2xhdGVUb0tvcmVhbihsYW5nID0gXCJFTkdcIikge1xyXG4gICAgY29uc3Qga29yZWFuRGF0YSA9IFtcclxuICAgICAgXCLshLjqs4Qg7LWc7LSI7J2YIO2FjOyhsOyKpCBjMmMgPGJyPiDquIDroZzrsowg6rGw656Y7IaMXCIsXHJcbiAgICAgIFwi7Yis7J6Q7J6QIOuQmOq4sFwiLFxyXG4gICAgICBcIu2IrOyekOyekCDrkJjquLBcIixcclxuICAgICAgXCLtnojrk6DthqDtgbAg6rWs66ekXCIsXHJcbiAgICAgIFwi7Yis7J6QXCIsXHJcbiAgICAgIFwiXCIsXHJcbiAgICAgIFwiSUNPIO2IrOyekFwiLFxyXG4gICAgICBcIu2FjOyhsOyKpCDrsqDsnbTtgrkuIOyngOq4iOq5jOyngCDssYTqtbTsnYAg6rKw7L2UIOyJrOyatOqyjCDslYTri4jsmIDsirXri4jri6QuIO2eiOuToOu5hO2KuOuKlCDthYzsobDsiqTrsqDsnbTtgrnsnbQg6rCA64ql7ZWcIOqxsOuemOyGjOyeheuLiOuLpC7thYzsobDsiqQg67Kg7J207Luk6rCAIOuQoOyImOyeiOuKlCDquLDtmozrpbwg64aT7LmY7KeAIOuniOyLreyLnOyYpC7tnojrk6DruYTtirjrpbwg7Ya17ZW0IOyXsDUuNSUg7YWM7KGw7IqkIOuyoOydtO2CuSDsiJjsnbXsnYQg7Iuk7ZiE7ZWY7Iut7Iuc7JikLlwiLFxyXG4gICAgICBcIuuqqOq4iOyVoVwiLFxyXG4gICAgICBcIuyEpOumveyekFwiLFxyXG4gICAgICBcIuyngOyGjVwiLFxyXG4gICAgICBcIuyekeuPmeybkOumrFwiLFxyXG4gICAgICBcIu2UhOumrOyEuOydvCDtg4DsnbTrqLhcIixcclxuICAgICAgXCLsnbxcIixcclxuICAgICAgXCLsi5xcIixcclxuICAgICAgXCLrtoRcIixcclxuICAgICAgXCLstIhcIixcclxuICAgICAgXCIxXCIsXHJcbiAgICAgIFwiSElEID0gXCIsXHJcbiAgICAgIFwiMC4xNSRcIixcclxuICAgICAgXCLstJ0gMTcgMDAwIDAwMCDthqDtgbDspJEg7ZiE7J6sIELthqDtgbDsnbQg64Ko7JWY7Iq164uI64ukLlwiLFxyXG4gICAgICBcIuyEuOqzhCDstZzstIjsnZgg7YWM7KGw7IqkIOuniOy8k1wiLFxyXG4gICAgICBcIkhpZGRlbmJpdCDqsbDrnpjshozsl5DshJzripQg6rGw656Y7J2YIOqwgeuptOyXkCDsl4XssrQg67CPIOyImOyImOujjOulvCDrtoDqs7ztlanri4jri6QuIOyekOyCsCAo7KaJLCDsnpDsgrDsnYQg7YyU7JWEIOycoOuPmeyEseydhCDsoJzqs7XtlZjripQg7IKs656MKeydtCAwLjI1ICXsl5Ag642UIOqwgOq5neqyjCDsp4DrtojtlZjripQg64+Z7JWILCDthYzsnbTsu6TsnZgg7IiY7IiY66OM64qUIOydvOuwmOyggeycvOuhnCDtj4nqt6AgMC41LTAuNzUgJSDrhpLsirXri4jri6QuIO2GteyDgeyggeycvOuhnCzsnbQg7IiY7IiY66OM64qUIOqxsOuemOqwgCDsi6TtlonrkJjripQg7Iuc7KCQ7JeQ7IScIOqzteygnOuQqeuLiOuLpFwiLFxyXG4gICAgICBcIuyLnOyepeydhCDsnITtlZwgVVNQXCIsXHJcbiAgICAgIFwi64+F7Yq57ZWcIO2MkOunpCDsoJzslYjsnYAgSElE6rCAIEhpZGRlbmJpdCDrlJTsp4DthLgg7J6Q7IKwIEV4Y2hhbmdlIO2UjOueq+2PvOyXkCDsnZjtlZwg6raM7JyE7J6I64qUIOyngOygleydhCDqsIDsp4Qg64uo7J28IOq2jOychOyeiOuKlCDqs7Xsi50g7Yag7YGw7J2066mwIOuqqOuToCDsgqzsmqnsnpDqsIAg7J6Q7Iug7J2YIO2ZnOyEsSDtlIzrnqvtj7wg7Zmc64+Z7JeQ7IScIO2VtOuLuSBISUQg67O07IOB7J2E67Cb7J2EIOyImCDsnojri6TripQg6rKD7J6F64uI64ukLiDqs6DqsJ3snYAgSElE7J2YIOygleq4sCDthrXqs4Trpbwg7Ya17ZW0IEhJRCDsiJjsl5Ag67mE66GA7ZWY7JesIO2VtOuLuSDruYTsnKjsnZgg67O07JygIOu5hOykkeyXkCDrlLDrnbwg67Cw64u56riI7J2EIOyImOuguSDtlaAg7IiYIOyeiOycvOupsCDsiJjsnbXsnYQg7Zal7JygIO2VoCDsiJgg7J6I7Iq164uI64ukLlwiLFxyXG4gICAgICBcIu2IrO2RnOq2jFwiLFxyXG4gICAgICBcIkhpZGRlbiDthqDtgbAg7IaM7KeA7J6Q64qUIOqzteqwnCDtiKztkZzqtozsnYQg7ZaJ7IKs7ZWgIOyImCDsnojsirXri4jri6QuIDEwMCDqsJzsnZggSGlkZGVuIO2GoO2BsOydgCAxIOqwnOydmCDtiKztkZzqtozqs7wg6rCZ7Iq164uI64ukLiDsoITrsJjsoIHsnLzroZwg7IKs7Jqp7J6Q7JeQ6rKMIOygleq4sOyggeycvOuhnCDrsLDri7kg7IiY7J217J2EIOygnOqzte2VmOq4sCDsnITtlbQgSElE64qUIOyCrOyaqeyekOqwgCDtlIzrnqvtj7wg7J2Y7IKsIOqysOyglSDtlITroZzshLjsiqTsl5Ag7LC47Jes7ZWgIOyImOyeiOuKlCDquLDtmozrpbwg7Ja77J2EIOyImCDsnojrj4TroZ3tlanri4jri6QuXCIsXHJcbiAgICAgIFwi7L2U7J24IOyXkOyWtOuTnOuejVwiLFxyXG4gICAgICBcIklDTyDssLjsl6zrpbwg7JyE7ZWcIOuqqOuwlOydvCDrsI8gSU9TIOyEpOy5mOyLnCDrtoDqs7zrkJjripQg67mE7Jqp7J2AIOydtO2bhCDrs7TrhIjsiqTroZwg7ZmY6riJ65Cp64uI64ukLlwiLFxyXG4gICAgICBcIu2eiOuToOu5hO2KuOuKlCDri7nsi6DsnZgg7ISx6rO17Jy866GcIOyViOuCtO2VqeuLiOuLpC5cIixcclxuICAgICAgXCLthqDtgbAg7IaM7KeA67mE7Jyo7J20IOymneqwgO2VqOyXkCDrlLDrnbwg7KeA6riJ65CY64qUIOuztOuEiOyKpCDrmJDtlZwg7Kad6rCA7ZWp64uI64ukLiDthqDtgbAg7ZmA642U65Ok7JeQ6rKMIOqxsOuemOyImOyImOujjOydmCA4MCXrpbwg7Yag7YGw67mE7Jyo7JeQIOuUsOudvCDtmZjquInrkKnri4jri6QuXCIsXHJcbiAgICAgIFwi66qo65Og6rKD7J20IOqwgOq5jOydtOyXkCDsnojsirXri4jri6QuXCIsXHJcbiAgICAgIFwiXCIsXHJcbiAgICAgIFwi67Cx7KeAXCIsXHJcbiAgICAgIFwi7IOI66Gc7Jq0IO2eiOuToOu5hO2KuCDrsLHshJzrpbwg6rO17Jyg7ZWg7IiYIOyeiOyWtCDquLDsganri4jri6Qu7J2067Cx7ISc64qUIO2UvOyVhO2KuCDthrXtlansnYQg7Ya17ZWcIOyDiOuhnOyatCDrp4jsnbTri53qsbDrnpjshozrpbwg7IaM6rCc7ZWY6rOgIOyeiOyKteuLiOuLpDpQcm9vZi1vZi1SZXBsaWNhdGlvbiAoUG9SKSBhbmQgUHJvb2Ytb2YtU3BhY2V0aW1lIChQb1N0KVwiLFxyXG4gICAgICBcIu2eiOuToOu5hO2KuCDrsLHshJzrs7TquLBcIixcclxuICAgICAgXCLsl5DslrTrk5zrno1cIixcclxuICAgICAgXCJJQ08g7J207ZuELCDsmrDrpqzripQgMTAwIEVUSCDsnbTsg4Eg65iQ64qUIOq3uOyZgCDrj5nrk7HtlZwg6riI7JWh7J2EIOu5hO2KuCDrj5nsoITsnLzroZwg6riw67aAIO2VnCDrqqjrk6Ag7LC46rCA7J6Q65Ok7JeQ6rKMIOy2lOyyqOydhCDsi6Tsi5wg7ZWgIOqyg+yeheuLiOuLpC4g67O064SI7Iqk64qUIOuLpOydjCDruYTsnKjroZwg67Cw67aE65Cp64uI64ukLlwiLFxyXG4gICAgICBcIuugiOuyqOqzvCDrs7TrhIjsiqTsnKjsnYAg6riw67O46rCA6rKp6rO8IOuzhOuPhOuhnCDsoIHsmqnrkKnri4jri6QuXCIsXHJcbiAgICAgIFwi7Z6I65Og67mE7Yq4IO2GoO2BsOydgCDssqvqsbDrnpjrtoDthLAg7Iqk66eI7Yq47Luo7Yq4656Z7Yq466W8IO2Gte2VtCDtlITroZzqt7jrnpjrsI0g65Cp64uI64ukLlwiLFxyXG4gICAgICBcIk1vcmUgdGhhbiwgRVRIXCIsXHJcbiAgICAgIFwi7LaU6rCAIEhJRCDsvZTsnbgsJVwiLFxyXG4gICAgICBcIlNBTEVcIixcclxuICAgICAgXCJQcmUtc2FsZVwiLFxyXG4gICAgICBcIklDT1wiLFxyXG4gICAgICBcIu2MkOunpOyImOufiVwiLFxyXG4gICAgICBcIuyEuOydvFwiLFxyXG4gICAgICBcIuuztOuEiOyKpFwiLFxyXG4gICAgICBcIuqwgOqyqVwiLFxyXG4gICAgICBcIjFldGhcIixcclxuICAgICAgXCLtlZjrk5zsuqFcIixcclxuICAgICAgXCLssYTqtbTsiJjrn4nsnbQg7Ja065a76rKMIOuQmOuKlOqwgD9cIixcclxuICAgICAgXCLssqvrsqDsnbTsu6Qg7KSRIO2VnCDrqoXsnbTrkJjquLAg7JyE7ZWcIOq4sO2ajOulvCDrhpPsuZjsp4Ag66eI7Iut7Iuc7JikLiDsspjsnYwgMTIg6rCc7JuUIOuCtOyXkCDrsqDsnbTtgrnsnYQg7Ya17ZW0IOyXsCA1LjUl7J2YIOyImOydteydhCDsmKzrpqzsi63si5zsmKQuIOuLueyLoOydmCDssqsg7ZW0IOuPmeyViCDqsIDsnqUg66eO7J2AIOydtOydteydhCDrgqjquLQg7L2U7J247J2EIOyerCDrsqDsnbTtgrnsnYQg7Ya17ZW0IOyImOydteydhCDstZzrjIDtmZQg7ZWY7Iut7Iuc7JikLiDsmrDrpqzripQgMjAxOSDrhYQg7LWc7KCAIOyImOykgOyXkOyEnCDrsqDsnbTtgrnsnZgg67O17J6h7ISx7J2EIOykhOydtOq4sCDsnITtlbQg7LWc7ISg7J2EIOuLpO2VmOqzoCDsnojsirXri4jri6Qu7Z6I65Og67mE7Yq464qUIO2YhOq4iOycvOuhnCDqsIDrk50g7LCo6rOgIOqzhOyCsOydmCDrs7XsnqHshLHsnbQg7Kad6rCAIO2VoCDrlYzquYzsp4Ag6rCE64uo7ZWcIOq4sOuzuCDsspjrpqwg64ql66Cl7Jy866Gc64+EIOyWu+ydhCDsiJjsnojripQg6riw7ZqM66W8IOygnOqzte2VqeuLiOuLpC4g67Kg7J207YK57JeQ7IScIOyCrOyaqe2VoCDsiJjsnojripQg6rCA7J6lIOunjuydgCDslpHsnZgg64+Z7KCE7Jy866GcIOqwgSDruJTroZ0g64u5IOy1nOqzoCDtlonsmrTsnYQg64Ko6rmB64uI64ukLiBQb1PrsKnsi53snYAg66eO7J2AIOuFuOugpeydhCDquLDsmrjsnbwg7ZWE7JqU6rCAIOyXhuyKteuLiOuLpC4gUG9T67Cp7Iud7J2AIOusuOuqhe2ZlCDrkJwg7LGE6rW0IOuyhOyghOycvOuhnCDtmITrjIAg6riI7Jy1IOyDge2SiOqzvCDqs7XthrXsoJDsnbQg7J6I7Iq164uI64ukLiBQb1Psl5DshJzripQg7KeA6rCR7JeQIOuztOq0gCDrkJwg7L2U7J247J2YIO2BrOq4sOqwgCDsg4jroZzsmrQg7KeA6rCR7J2EIOyWu+uKlCDquLDtmozrpbwg7Kad6rCA7Iuc7YKk6riwIOuVjOusuOyXkCDqs4TsoJXsl5Ag6rCA7J6lIOunjuydgCDsvZTsnbjsnbTsnojripQg7LKrIOuyiOynuCDssLjqsIDsnpDqsIAg65CgIOyImCDsnojsirXri4jri6RcIixcclxuICAgICAgXCIx6rCc7JuUfjEy6rCc7JuUIC0gXCIsXHJcbiAgICAgIFwiMiA4NTkgMzAyLjg0IOy9lOyduFwiLFxyXG4gICAgICBcIjEz6rCc7JuUfjI06rCc7JuUIC0gXCIsXHJcbiAgICAgIFwiMSA0MjkgNjUxLDQyIOy9lOyduFwiLFxyXG4gICAgICBcIjI16rCc7JuUfjM16rCc7JuULSBcIixcclxuICAgICAgXCI3MTQsODI1LjcxIOy9lOyduFwiLFxyXG4gICAgICBcIjM26rCc7JuUIC0gXCIsXHJcbiAgICAgIFwiNjY5LDQ2Ni4wNyDsvZTsnbhcIixcclxuICAgICAgXCLroZzrk5zrp7VcIixcclxuICAgICAgXCLqs4Ttmo0g67CPIOqwnOuwnFwiLFxyXG4gICAgICBcIlByZS1pY28gc3RhcnRcIixcclxuICAgICAgXCLrsqDtg4DrsoTsoIQg65+w7LmtXCIsXHJcbiAgICAgIFwi6rGw656Y7IaMIOufsOy5rVwiLFxyXG4gICAgICBcIuq4gOuhnOuyjCBUT1AxMCDqsbDrnpjshowg7ISg7KCVXCIsXHJcbiAgICAgIFwi7Z6I65OgIOy9lOyduOydtCDqsbDrnpjrkJjripQg7LWc6rOg7J2YIOqxsOuemOyGjFwiLFxyXG4gICAgICBcIjI0IMOXIDcgc3VwcG9ydCBzZXJ2aWNlXCIsXHJcbiAgICAgIFwi66y47J2Y7IKs7ZWt7J20IOyeiOycvOyLoOqyveyasCwg7Ja47KCc65OgIOuLteuzgO2VtCDrk5zrpqzqsqDsirXri4jri6QuXCIsXHJcbiAgICAgIFwi7Z6I65Og67mE7Yq4IOqxsOuemOyGjCDrkZjrn6zrs7TquLBcIixcclxuICAgICAgXCLtnojrk6DruYTtirgg6rGw656Y7IaMIOuwseyEnFwiLFxyXG4gICAgICBcIuuzteygnOuwqeyngFwiLFxyXG4gICAgICBcIlBPV0VSIEZBVUxUIFRPTEVSQU5DRVwiLFxyXG4gICAgICBcIjIwMTkg7Jew6rWsIOuhnOuTnOuntVwiLFxyXG4gICAgICBcIlwiLFxyXG4gICAgICBcIlwiLFxyXG4gICAgICBcIlwiXHJcbiAgICBdO1xyXG5cclxuICAgIGNvbnN0IHRleHRFbGVtZW50cyA9IFtcclxuICAgICAgZ2V0RWxlbWVudCgnLmhvbWUgLmluZm9fX3RpdGxlJyksXHJcbiAgICAgIGdldEVsZW1lbnQoJy5oZWFkZXJfX2J1dHRvbicpLFxyXG4gICAgICBnZXRFbGVtZW50KCcuc3VwcG9ydF9fYnV0dG9uJyksIFxyXG4gICAgICBnZXRFbGVtZW50KCcuaG9tZV9fbW9kYWwgLndpZGdldF9fYnV0dG9uJyksXHJcbiAgICAgIGdldEVsZW1lbnQoJy5ob21lX19yaWdodCAud2lkZ2V0X19sb2dvIC50ZXh0JyksIFxyXG4gICAgICBnZXRFbGVtZW50KCcuaG9tZV9fcmlnaHQgLndpZGdldF9faW5mbyAudGV4dCcpLCBcclxuICAgICAgZ2V0RWxlbWVudCgnLmhvbWVfX3JpZ2h0IC53aWRnZXRfX2J1dHRvbicpLFxyXG4gICAgICBnZXRFbGVtZW50KCcuaG9tZSAuaW5mb19fZGVzY3JpcHRpb24nKSxcclxuICAgICAgZ2V0RWxlbWVudCgnLmhvbWUgLmJvYXJkX19pdGVtLS0xIC5ib2FyZF9fdGl0bGUnKSxcclxuICAgICAgZ2V0RWxlbWVudCgnLmhvbWUgLmJvYXJkX19pdGVtLS0yIC5ib2FyZF9fdGl0bGUnKSxcclxuICAgICAgZ2V0RWxlbWVudCgnLmhvbWUgLmJvYXJkX19pdGVtLS0zIC5ib2FyZF9fdGl0bGUnKSxcclxuICAgICAgZ2V0RWxlbWVudCgnLmhvdy1pdC13b3Jrc19fdGl0bGUnKSxcclxuICAgICAgZ2V0RWxlbWVudCgnLmhvbWVfX21vZGFsIC53aWRnZXRfX3RpdGxlJyksXHJcbiAgICAgIGdldEVsZW1lbnQoJy50aW1lcl9fZGF5cycpLFxyXG4gICAgICBnZXRFbGVtZW50KCcudGltZXJfX2hvdXJzJyksXHJcbiAgICAgIGdldEVsZW1lbnQoJy50aW1lcl9fbWludXRlcycpLFxyXG4gICAgICBnZXRFbGVtZW50KCcudGltZXJfX3NlYycpLFxyXG4gICAgICBnZXRFbGVtZW50KCcuaG9tZV9fbW9kYWwgLndpZGdldF9faW5mbyAuY29pbl9fbnVtYmVyJyksXHJcbiAgICAgIGdldEVsZW1lbnQoJy5ob21lX19tb2RhbCAud2lkZ2V0X19pbmZvIC50ZXh0JyksXHJcbiAgICAgIGdldEVsZW1lbnQoJy5ob21lX19tb2RhbCAud2lkZ2V0X19pbmZvIC5jb2luX19wcmljZScpLFxyXG4gICAgICBnZXRFbGVtZW50KCcuaG9tZV9fbW9kYWwgLndpZGdldF9faW5mby0tMiAudGV4dCcpLFxyXG4gICAgICBnZXRFbGVtZW50KCcuY2FyZC0tMSAuY2FyZF9fdGl0bGUnKSxcclxuICAgICAgZ2V0RWxlbWVudCgnLmNhcmQtLTEgLmNhcmRfX2luZm8nKSxcclxuICAgICAgZ2V0RWxlbWVudCgnLmNhcmQtLTIgLmNhcmRfX3RpdGxlJyksXHJcbiAgICAgIGdldEVsZW1lbnQoJy5jYXJkLS0zIC5jYXJkX19pbmZvJyksXHJcbiAgICAgIGdldEVsZW1lbnQoJy5jYXJkLS0zIC5jYXJkX190aXRsZScpLFxyXG4gICAgICBnZXRFbGVtZW50KCcuY2FyZC0tMyAuY2FyZF9faW5mbycpLFxyXG4gICAgICBnZXRFbGVtZW50KCcuY2FyZC0tNCAuY2FyZF9fdGl0bGUnKSxcclxuICAgICAgZ2V0RWxlbWVudCgnLmNhcmQtLTQgLmNhcmRfX2luZm8nKSxcclxuICAgICAgZ2V0RWxlbWVudCgnLmNhcmQtLTUgLmNhcmRfX3RpdGxlJyksXHJcbiAgICAgIGdldEVsZW1lbnQoJy5jYXJkLS01IC5jYXJkX19pbmZvJyksXHJcbiAgICAgIGdldEVsZW1lbnQoJy5jYXJkLS02IC5jYXJkX190aXRsZScpLFxyXG4gICAgICBnZXRFbGVtZW50KCcuY2FyZC0tNiAuY2FyZF9faW5mbycpLFxyXG4gICAgICBnZXRFbGVtZW50KCcud2hpdGVwYXBlcl9fdGl0bGUnKSxcclxuICAgICAgZ2V0RWxlbWVudCgnLndoaXRlcGFwZXJfX2luZm8nKSxcclxuICAgICAgZ2V0RWxlbWVudCgnLndoaXRlcGFwZXJfX2J1dHRvbicpLFxyXG4gICAgICBnZXRFbGVtZW50KCcuYWlyZHJvcF9fdGl0bGUnKSxcclxuICAgICAgZ2V0RWxlbWVudCgnLmFpcmRyb3BfX2luZm8nKSxcclxuICAgICAgZ2V0RWxlbWVudCgnLmFpcmRyb3BfX2FkZGl0aW9uYWwtaW5mbycpLFxyXG4gICAgICBnZXRFbGVtZW50KCcucmVsZWFzZV9fdGl0bGUnKSxcclxuICAgICAgZ2V0RWxlbWVudCgnLmFpcmRyb3BfX3RhYmxlIC50YWJsZV9fY29sdW1uLS0xJyksXHJcbiAgICAgIGdldEVsZW1lbnQoJy5haXJkcm9wX190YWJsZSAudGFibGVfX2NvbHVtbi0tMicpLFxyXG4gICAgICBnZXRFbGVtZW50KCcucmVsZWFzZSAudGFibGVfX2hlYWRlciAudGFibGVfX2NvbHVtbicpLFxyXG4gICAgICBnZXRFbGVtZW50KCcucmVsZWFzZSAudGFibGVfX3Jvdy0tMSAudGFibGVfX2NvbHVtbi0tMicpLFxyXG4gICAgICBnZXRFbGVtZW50KCcucmVsZWFzZSAudGFibGVfX3Jvdy0tMSAudGFibGVfX2NvbHVtbi0tMycpLFxyXG4gICAgICBnZXRFbGVtZW50KCcucmVsZWFzZSAudGFibGVfX3Jvdy0tMiAudGFibGVfX2NvbHVtbi0tMScpLFxyXG4gICAgICBnZXRFbGVtZW50KCcucmVsZWFzZSAudGFibGVfX3Jvdy0tMyAudGFibGVfX2NvbHVtbi0tMScpLFxyXG4gICAgICBnZXRFbGVtZW50KCcucmVsZWFzZSAudGFibGVfX3Jvdy0tNCAudGFibGVfX2NvbHVtbi0tMScpLFxyXG4gICAgICBnZXRFbGVtZW50KCcucmVsZWFzZSAudGFibGVfX3Jvdy0tNSAudGFibGVfX2NvbHVtbi0tMScpLFxyXG4gICAgICBnZXRFbGVtZW50KCcucmVsZWFzZSAudGFibGVfX3Jvdy0tNiAudGFibGVfX2NvbHVtbi0tMScpLFxyXG4gICAgICBnZXRFbGVtZW50KCcucmVsZWFzZSAudGFibGVfX3Jvdy0tNyAudGFibGVfX2NvbHVtbi0tMScpLFxyXG4gICAgICBnZXRFbGVtZW50KCcuZm9yLW1pbmVyc19fdGl0bGUnKSxcclxuICAgICAgZ2V0RWxlbWVudCgnLmZvci1taW5lcnNfX2luZm8nKSxcclxuICAgICAgZ2V0RWxlbWVudCgnLmZvci1taW5lcnNfX3JpZ2h0IC5saXN0X19pdGVtLS0xIC50ZXh0JyksXHJcbiAgICAgIGdldEVsZW1lbnQoJy5mb3ItbWluZXJzX19yaWdodCAubGlzdF9faXRlbS0tMSAuY29pbnMnKSxcclxuICAgICAgZ2V0RWxlbWVudCgnLmZvci1taW5lcnNfX3JpZ2h0IC5saXN0X19pdGVtLS0yIC50ZXh0JyksXHJcbiAgICAgIGdldEVsZW1lbnQoJy5mb3ItbWluZXJzX19yaWdodCAubGlzdF9faXRlbS0tMiAuY29pbnMnKSxcclxuICAgICAgZ2V0RWxlbWVudCgnLmZvci1taW5lcnNfX3JpZ2h0IC5saXN0X19pdGVtLS0zIC50ZXh0JyksXHJcbiAgICAgIGdldEVsZW1lbnQoJy5mb3ItbWluZXJzX19yaWdodCAubGlzdF9faXRlbS0tMyAuY29pbnMnKSxcclxuICAgICAgZ2V0RWxlbWVudCgnLmZvci1taW5lcnNfX3JpZ2h0IC5saXN0X19pdGVtLS00IC50ZXh0JyksXHJcbiAgICAgIGdldEVsZW1lbnQoJy5mb3ItbWluZXJzX19yaWdodCAubGlzdF9faXRlbS0tNCAuY29pbnMnKSxcclxuICAgICAgZ2V0RWxlbWVudCgnLnJvYWQtbWFwX190aXRsZScpLFxyXG4gICAgICBnZXRFbGVtZW50KCcucm9hZC1tYXAgLnBsYW4tLTEnKSxcclxuICAgICAgZ2V0RWxlbWVudCgnLnJvYWQtbWFwIC5wbGFuLS0yJyksXHJcbiAgICAgIGdldEVsZW1lbnQoJy5yb2FkLW1hcCAucGxhbi0tMycpLFxyXG4gICAgICBnZXRFbGVtZW50KCcucm9hZC1tYXAgLnBsYW4tLTQnKSxcclxuICAgICAgZ2V0RWxlbWVudCgnLnJvYWQtbWFwIC5wbGFuLS01JyksXHJcbiAgICAgIGdldEVsZW1lbnQoJy5leGNoYW5nZXNfX3RpdGxlJyksXHJcbiAgICAgIGdldEVsZW1lbnQoJy5zdXBwb3J0X190aXRsZScpLFxyXG4gICAgICBnZXRFbGVtZW50KCcuc3VwcG9ydF9faW5mbycpLFxyXG4gICAgICBnZXRFbGVtZW50KCcucmVzZWFyY2hfX3RpdGxlJyksXHJcbiAgICAgIGdldEVsZW1lbnQoJy5yZXNlYXJjaF9faXRlbXMgLml0ZW0tLTEgLml0ZW1fX3RpdGxlJyksXHJcbiAgICAgIGdldEVsZW1lbnQoJy5yZXNlYXJjaF9faXRlbXMgLml0ZW0tLTIgLml0ZW1fX3RpdGxlJyksXHJcbiAgICAgIGdldEVsZW1lbnQoJy5yZXNlYXJjaF9faXRlbXMgLml0ZW0tLTMgLml0ZW1fX3RpdGxlJyksXHJcbiAgICAgIGdldEVsZW1lbnQoJy5yZXNlYXJjaF9faXRlbXMgLml0ZW0tLTQgLml0ZW1fX3RpdGxlJyksXHJcbiAgICAgIGdldEVsZW1lbnQoJy5mb290ZXIgLmRldmVsb3BlZC1ieScpLFxyXG4gICAgICBnZXRFbGVtZW50KCcuZm9vdGVyX19pdGVtLS1lbWFpbCcpLFxyXG4gICAgICBnZXRFbGVtZW50KCcuZm9vdGVyX19pdGVtLS1mb2xsb3ctdXMnKSxcclxuICAgIF07XHJcblxyXG4gICAgaWYgKGxhbmcgIT09ICdFTkcnKSB7XHJcbiAgICAgIHNldENvbnRlbnQodGV4dEVsZW1lbnRzLCBrb3JlYW5EYXRhKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBnZXRFbGVtZW50KGNsYXNzTmFtZSkge1xyXG4gICAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihjbGFzc05hbWUpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHNldENvbnRlbnQoZWxlbWVudHMsIGNvbnRlbnQpIHtcclxuICAgICAgZWxlbWVudHMuZm9yRWFjaCgoZWwsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgY29uc3QgY29udCA9IGNvbnRlbnRbaW5kZXhdO1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAvKipcclxuICAgICAgICAgICAqIEgyIGRhdGFcclxuICAgICAgICAgICAqL1xyXG4gICAgICAgICAgaWYgKGVsLmhhc0F0dHJpYnV0ZSgnZGF0YS10aXRsZScpKSB7XHJcbiAgICAgICAgICAgIGVsLmlubmVySFRNTCA9IGNvbnQ7XHJcbiAgICAgICAgICAgIGVsLnNldEF0dHJpYnV0ZSgnZGF0YS10aXRsZScsIGNvbnQpO1xyXG4gICAgICAgICAgfSBcclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIFBsYW4gbGluZXMgZGF0YVxyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgIGVsc2UgaWYgKGVsLmNsYXNzTGlzdC5jb250YWlucygncGxhbicpKSB7XHJcbiAgICAgICAgICAgIGVsLnNldEF0dHJpYnV0ZSgnZGF0YS1wbGFuLWRlc2NyaXB0aW9uJywgY29udCk7XHJcbiAgICAgICAgICB9IFxyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICogVGltZXIgZGF0YVxyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgZWxzZSBpZiAoZWwuaGFzQXR0cmlidXRlKCdkYXRhLW5hbWUnKSkge1xyXG4gICAgICAgICAgICBlbC5zZXRBdHRyaWJ1dGUoJ2RhdGEtbmFtZScsIGNvbnQpO1xyXG4gICAgICAgICAgfSBcclxuICAgICAgICAgIGVsc2UgaWYgKGNvbnQgIT09ICcnKSB7XHJcbiAgICAgICAgICAgIGVsLmlubmVySFRNTCA9IGNvbnQ7XHJcbiAgICAgICAgICB9IFxyXG4gICAgICAgIH0gY2F0Y2goZSkge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coJ0Vycm9yIGVsZW1lbnQgaW5kZXggOicsIGluZGV4KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxufSk7XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc2NyaXB0cy9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUN0Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OzsiLCJzb3VyY2VSb290IjoiIn0=