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


	    /**
	     * Bind a slider data changing with a view
	     */
	    slider.addEventListener(
	      "change",
	      event => (summary.innerHTML = event.currentTarget.value)
	    );

	    if (isDesktop() && isDocumentFrozen()) {
	      const howItWorksSection = document.querySelector('.how-it-works');
	      howItWorksSection.classList.add('opacify');

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
	    const howItWorksSection = document.querySelector('.how-it-works');
	    
	    const scrollTime = 900;
	    const delay = 500;

	    howItWorksSection.classList.remove('opacify');
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

	      clickedButton.classList.remove('showed');

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgM2MzZTdlNjNkM2VkYzlhMjJlYWMiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvc2NyaXB0cy9cIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCAzYzNlN2U2M2QzZWRjOWEyMmVhYyIsImRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsICgpID0+IHtcclxuICAvKipcclxuICAgKiBSZW1vdmUgdGhlIGxvYWRlciB3aGVuIGFsbCBzY3JpcHQgaGF2ZSBiZWVuIGxvYWRlZFxyXG4gICAqL1xyXG4gIGluaXQoKTtcclxuICBhZGRMYW5ndWFnZUJ1dHRvbnNFdmVudExpc3RlbmVycygpO1xyXG5cclxuICBmdW5jdGlvbiBpbml0KCkge1xyXG4gICAgZnJlZXplRG9jdW1lbnQoKTtcclxuXHJcbiAgICBhZGRFdmVudExpc3RlbmVycygpO1xyXG5cclxuICAgIGluaXRTbGlkZXIoKTtcclxuICAgIGluaXRXYXlQb2ludHNJbnRlcmFjdGlvbigpO1xyXG5cclxuICAgIGlmIChpc01vYmlsZSgpKSB7XHJcbiAgICAgIGluaXRNb2JpbGVQb3B1cEludGVyYWN0aW9uKCk7XHJcbiAgICAgIHNob3dJY29ucygpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaW5pdERlc2t0b3BQb3B1cEludGVyYWN0aW9uKCk7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdFRpbWVyKCk7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBpbml0V2F5UG9pbnRzSW50ZXJhY3Rpb24oKSB7XHJcbiAgICBsZXQgcm9hZE1hcFJlYWNoZWQgPSBmYWxzZTtcclxuICAgIGxldCBub3RlYm9va1JlYWNoZWQgPSBmYWxzZTtcclxuICAgIGxldCBzdXBwb3J0UmVhY2hlZCA9IGZhbHNlO1xyXG4gICAgbGV0IGFpckRyb3BSZWFjaGVkID0gZmFsc2U7XHJcblxyXG4gICAgbGV0IHJvYWRtYXAgPSBuZXcgV2F5cG9pbnQoe1xyXG4gICAgICBlbGVtZW50OiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnJvYWQtbWFwXCIpLFxyXG4gICAgICBoYW5kbGVyOiBmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAoIXJvYWRNYXBSZWFjaGVkKSB7XHJcbiAgICAgICAgICByb2FkTWFwUmVhY2hlZCA9IHRydWU7XHJcbiAgICAgICAgICBjb25zdCByb2FkTGluZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucm9hZC1tYXBfX2xpbmVcIik7XHJcbiAgICAgICAgICBjb25zdCBwbGFuTGluZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnBsYW5fX3JvYWQtbGluZVwiKTtcclxuICAgICAgICAgIGNvbnN0IHBsYW5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5wbGFuXCIpO1xyXG4gICAgICAgICAgY29uc3QgY2lyY2xlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucGxhbl9fY2lyY2xlXCIpO1xyXG5cclxuICAgICAgICAgIHJvYWRMaW5lLmNsYXNzTGlzdC5hZGQoXCJzaG93ZWRcIik7XHJcbiAgICAgICAgICBjb25zdCBkZWxheSA9IDUwMDtcclxuXHJcbiAgICAgICAgICBwbGFuTGluZXMuZm9yRWFjaCgocGwsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IF9kZWxheSA9IGRlbGF5ICsgMTAwICogaW5kZXg7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgIHBsLmNsYXNzTGlzdC5hZGQoXCJzaG93ZWRcIik7XHJcbiAgICAgICAgICAgICAgY2lyY2xlc1tpbmRleF0uY2xhc3NMaXN0LmFkZChcInNob3dlZFwiKTtcclxuICAgICAgICAgICAgICBwbGFuc1tpbmRleF0uY2xhc3NMaXN0LmFkZChcInNob3dlZFwiKTtcclxuICAgICAgICAgICAgfSwgX2RlbGF5KTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfSxcclxuICAgICAgb2Zmc2V0OiBcIjQwJVwiXHJcbiAgICB9KTtcclxuXHJcbiAgICBsZXQgbm90ZWJvb2sgPSBuZXcgV2F5cG9pbnQoe1xyXG4gICAgICBlbGVtZW50OiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLndoaXRlcGFwZXJcIiksXHJcbiAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmICghbm90ZWJvb2tSZWFjaGVkKSB7XHJcbiAgICAgICAgICBub3RlYm9va1JlYWNoZWQgPSB0cnVlO1xyXG4gICAgICAgICAgY29uc3QgdHJpZ2dlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibm90ZWJvb2tcIik7XHJcbiAgICAgICAgICBjb25zdCB0cmlnZ2VyQW5pbWF0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtYWluXCIpO1xyXG5cclxuICAgICAgICAgIGlmICghaXNNb2JpbGUoKSkge1xyXG4gICAgICAgICAgICB0cmlnZ2VyLmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KFwiY2xpY2tcIikpO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIHRyaWdnZXJBbmltYXRpb24ucmVtb3ZlQXR0cmlidXRlKFwiYmVnaW5cIik7XHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgICBvZmZzZXQ6IFwiMTAwJVwiXHJcbiAgICB9KTtcclxuXHJcbiAgICBsZXQgc3VwcG9ydCA9IG5ldyBXYXlwb2ludCh7XHJcbiAgICAgIGVsZW1lbnQ6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc3VwcG9ydFwiKSxcclxuICAgICAgaGFuZGxlcjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKCFzdXBwb3J0UmVhY2hlZCkge1xyXG4gICAgICAgICAgc3VwcG9ydFJlYWNoZWQgPSB0cnVlO1xyXG4gICAgICAgICAgY29uc3QgdHJpZ2dlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbGFuZC1wYXJ0c1wiKTtcclxuICAgICAgICAgIGNvbnN0IHRyaWdnZXJBbmltYXRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2xhbmQtcGFydHMtYW5pbVwiKTtcclxuXHJcbiAgICAgICAgICBpZiAoIWlzTW9iaWxlKCkpIHtcclxuICAgICAgICAgICAgYW5pbWF0ZU1hcCgpO1xyXG4gICAgICAgICAgICB0cmlnZ2VyLmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KFwiY2xpY2tcIikpO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIHRyaWdnZXJBbmltYXRpb24ucmVtb3ZlQXR0cmlidXRlKFwiYmVnaW5cIik7XHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgICBvZmZzZXQ6IFwiNDAlXCJcclxuICAgIH0pO1xyXG5cclxuICAgIGxldCBhaXJkcm9wID0gbmV3IFdheXBvaW50KHtcclxuICAgICAgZWxlbWVudDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5haXJkcm9wXCIpLFxyXG4gICAgICBoYW5kbGVyOiBmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAoIWFpckRyb3BSZWFjaGVkKSB7XHJcbiAgICAgICAgICBhaXJEcm9wUmVhY2hlZCA9IHRydWU7XHJcbiAgICAgICAgICBjb25zdCB0cmlnZ2VyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjcnlwdG9cIik7XHJcbiAgICAgICAgICBjb25zdCB0cmlnZ2VyQW5pbWF0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjcnlwdG8tYW5pbVwiKTtcclxuXHJcbiAgICAgICAgICBpZiAoIWlzTW9iaWxlKCkpIHtcclxuICAgICAgICAgICAgYW5pbWF0ZUNyeXB0b01hY2hpbmUoKTtcclxuICAgICAgICAgICAgdHJpZ2dlci5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudChcImNsaWNrXCIpKTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICB0cmlnZ2VyQW5pbWF0aW9uLnJlbW92ZUF0dHJpYnV0ZShcImJlZ2luXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSxcclxuICAgICAgb2Zmc2V0OiBcIjEwMCVcIlxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBpc01vYmlsZSgpIHtcclxuICAgIHJldHVybiB3aW5kb3cuaW5uZXJXaWR0aCA8PSA2NTA7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBpbml0VGltZXIoeWVhciwgbW9udGgsIHdlZWssIGRheSkge1xyXG4gICAgY29uc3QgdGltZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRpbWVyXCIpO1xyXG4gICAgY29uc3QgZGF5cyA9IHRpbWVyLnF1ZXJ5U2VsZWN0b3IoXCIudGltZXJfX2RheXNcIik7XHJcbiAgICBjb25zdCBtaW5zID0gdGltZXIucXVlcnlTZWxlY3RvcihcIi50aW1lcl9fbWludXRlc1wiKTtcclxuICAgIGNvbnN0IHNlY3MgPSB0aW1lci5xdWVyeVNlbGVjdG9yKFwiLnRpbWVyX19zZWNvbmRzXCIpO1xyXG4gICAgY29uc3QgaG91cnMgPSB0aW1lci5xdWVyeVNlbGVjdG9yKFwiLnRpbWVyX19ob3Vyc1wiKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEluaXRpYWxpemF0aW9uXHJcbiAgICAgKi9cclxuXHJcbiAgICBkYXlzLmlubmVySFRNTCA9IHdyYXBXaXRoWmVybygxNSk7XHJcbiAgICBtaW5zLmlubmVySFRNTCA9IHdyYXBXaXRoWmVybygwKTtcclxuICAgIHNlY3MuaW5uZXJIVE1MID0gd3JhcFdpdGhaZXJvKDApO1xyXG4gICAgaG91cnMuaW5uZXJIVE1MID0gd3JhcFdpdGhaZXJvKDApO1xyXG5cclxuICAgIHNldEludGVydmFsKGRlY3JlYXNlLCAxMDAwKTtcclxuXHJcbiAgICBmdW5jdGlvbiBkZWNyZWFzZSgpIHtcclxuICAgICAgY29uc3QgdGltZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRpbWVyXCIpO1xyXG4gICAgICBjb25zdCBkYXlzID0gdGltZXIucXVlcnlTZWxlY3RvcihcIi50aW1lcl9fZGF5c1wiKTtcclxuICAgICAgY29uc3QgbWlucyA9IHRpbWVyLnF1ZXJ5U2VsZWN0b3IoXCIudGltZXJfX21pbnV0ZXNcIik7XHJcbiAgICAgIGNvbnN0IHNlY3MgPSB0aW1lci5xdWVyeVNlbGVjdG9yKFwiLnRpbWVyX19zZWNvbmRzXCIpO1xyXG4gICAgICBjb25zdCBob3VycyA9IHRpbWVyLnF1ZXJ5U2VsZWN0b3IoXCIudGltZXJfX2hvdXJzXCIpO1xyXG5cclxuICAgICAgbGV0IHMgPSArc2Vjcy5pbm5lckhUTUwsXHJcbiAgICAgICAgbSA9ICttaW5zLmlubmVySFRNTCxcclxuICAgICAgICBoID0gK2hvdXJzLmlubmVySFRNTCxcclxuICAgICAgICBkID0gK2RheXMuaW5uZXJIVE1MO1xyXG5cclxuICAgICAgaWYgKHMgPiAwKSAtLXM7XHJcblxyXG4gICAgICBpZiAocyA9PT0gMCkge1xyXG4gICAgICAgIHMgPSA1OTtcclxuICAgICAgICBpZiAobSA+IDApIG0tLTtcclxuICAgICAgfVxyXG4gICAgICBpZiAobSA9PT0gMCkge1xyXG4gICAgICAgIG0gPSA1OTtcclxuICAgICAgICBpZiAoaCA+IDApIGgtLTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoaCA9PT0gMCkge1xyXG4gICAgICAgIGggPSAyMztcclxuICAgICAgICBpZiAoZCA+IDApIGQtLTtcclxuICAgICAgfVxyXG5cclxuICAgICAgc2Vjcy5pbm5lckhUTUwgPSBzO1xyXG4gICAgICBtaW5zLmlubmVySFRNTCA9IG07XHJcbiAgICAgIGhvdXJzLmlubmVySFRNTCA9IGg7XHJcbiAgICAgIGRheXMuaW5uZXJIVE1MID0gZDtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiB3cmFwV2l0aFplcm8oc3RyaW5nKSB7XHJcbiAgICAgIHN0cmluZyA9IHN0cmluZyArIFwiXCI7XHJcblxyXG4gICAgICBpZiAoc3RyaW5nLmxlbmd0aCA8IDIpIHtcclxuICAgICAgICBzdHJpbmcgPSBcIjBcIiArIHN0cmluZztcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gc3RyaW5nO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gaGlkZUNyeXB0b01hY2hpbmVFbGVtZW50cygpIHtcclxuICAgIGNvbnN0IGNyeXB0byA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY3J5cHRvXCIpO1xyXG4gICAgY3J5cHRvLnNldEF0dHJpYnV0ZShcIm9wYWNpdHlcIiwgXCIwXCIpO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gaGlkZU5vdGVib29rRWxlbWVudHMoKSB7XHJcbiAgICBjb25zdCBub3RlYm9vayA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibm90ZWJvb2tcIik7XHJcbiAgICBjb25zdCBwYWdlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJbaWRePSdwYWdlJ11cIik7XHJcbiAgICBjb25zdCB1bmRlcmxheWVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsYXllci0xXCIpO1xyXG5cclxuICAgIHBhZ2VzLmZvckVhY2gocGFnZSA9PiBwYWdlLnNldEF0dHJpYnV0ZShcIm9wYWNpdHlcIiwgXCIwXCIpKTtcclxuICAgIG5vdGVib29rLnNldEF0dHJpYnV0ZShcIm9wYWNpdHlcIiwgXCIwXCIpO1xyXG4gICAgdW5kZXJsYXllci5zZXRBdHRyaWJ1dGUoXCJvcGFjaXR5XCIsIFwiMFwiKTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGluaXRTbGlkZXIoKSB7XHJcbiAgICBpZiAoaXNNb2JpbGUoKSkge1xyXG4gICAgICAkKFwiLmhvdy1pdC13b3Jrc19fY2FyZHNcIikub3dsQ2Fyb3VzZWwoe1xyXG4gICAgICAgIGl0ZW1zOiAxLFxyXG4gICAgICAgIG1hcmdpbjogMzAsXHJcbiAgICAgICAgcGFkZGluZzogMzBcclxuICAgICAgfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAkKFwiLmhvdy1pdC13b3Jrc19fY2FyZHNcIikudHJpZ2dlcihcImRlc3Ryb3kub3dsLmNhcm91c2VsXCIpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gYW5pbWF0ZU1hcCgpIHtcclxuICAgIGNvbnN0IGRvdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRvdHNcIik7XHJcblxyXG4gICAgQXJyYXkuZnJvbShkb3RzLmNoaWxkTm9kZXMpLmZvckVhY2goZG90ID0+IHtcclxuICAgICAgY29uc3QgcGF0aCA9IGRvdC5xdWVyeVNlbGVjdG9yKFwicGF0aFwiKTtcclxuICAgICAgcGF0aC5zZXRBdHRyaWJ1dGUoXCJvcGFjaXR5XCIsIFwiMVwiKTtcclxuICAgICAgcGF0aC5pbm5lckhUTUwgPSBjcmVhdGVBbmltYXRpb25FbGVtZW50KFwiYW5pbWF0ZVwiLCB7XHJcbiAgICAgICAgXCJ4bGluazpocmVmXCI6IFwiI1wiICsgcGF0aC5pZCxcclxuICAgICAgICBhdHRyaWJ1dGVOYW1lOiBcIm9wYWNpdHlcIixcclxuICAgICAgICBkdXI6IGAke01hdGgucmFuZG9tKCkgKiAyICsgMC41fXNgLFxyXG4gICAgICAgIGZyb206IFwiMVwiLFxyXG4gICAgICAgIHRvOiBcIjBcIixcclxuICAgICAgICByZXBlYXRDb3VudDogXCJpbmRlZmluaXRlXCIsXHJcbiAgICAgICAgYmVnaW46IFwiZG90cy1hbmltLmVuZCArIC4yc1wiXHJcbiAgICAgIH0pLm91dGVySFRNTDtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gaGlkZU1hcEVsZW1lbnRzKCkge1xyXG4gICAgY29uc3QgbGluZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2xpbmVzXCIpO1xyXG4gICAgY29uc3QgZG90cyA9IG1hcC5xdWVyeVNlbGVjdG9yKFwiLmRvdHNcIik7XHJcbiAgICBjb25zdCBsYW5kcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbGFuZC1wYXJ0c1wiKTtcclxuXHJcbiAgICBsaW5lcy5zZXRBdHRyaWJ1dGUoXCJvcGFjaXR5XCIsIFwiMVwiKTtcclxuICAgIGRvdHMuc2V0QXR0cmlidXRlKFwib3BhY2l0eVwiLCBcIjFcIik7XHJcbiAgICBsYW5kcy5zZXRBdHRyaWJ1dGUoXCJvcGFjaXR5XCIsIFwiMVwiKTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGNyZWF0ZUFuaW1hdGlvbkVsZW1lbnQoYW5pbWF0aW9uRWxlbWVudCwgY29uZmlnKSB7XHJcbiAgICBpZiAoIWNvbmZpZykge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgYW5pbWF0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChhbmltYXRpb25FbGVtZW50KTtcclxuICAgIGZvciAobGV0IG9wdGlvbiBpbiBjb25maWcpIHtcclxuICAgICAgYW5pbWF0aW9uLnNldEF0dHJpYnV0ZShvcHRpb24sIGNvbmZpZ1tvcHRpb25dKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gYW5pbWF0aW9uO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gYW5pbWF0ZUNyeXB0b01hY2hpbmUoKSB7XHJcbiAgICBjb25zdCBjcnlwdG9NYWNoaW5lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjcnlwdG9cIik7XHJcblxyXG4gICAgY29uc3QgY2lyY2xlcyA9IGNyeXB0b01hY2hpbmUucXVlcnlTZWxlY3RvckFsbChcIi5jaXJjbGVcIik7XHJcbiAgICBjb25zdCBzdWJzdHJhdGVzID0gY3J5cHRvTWFjaGluZS5xdWVyeVNlbGVjdG9yQWxsKFwiLnN1YnN0cmF0ZVwiKTtcclxuXHJcbiAgICBpbml0QW5pbWF0ZWRMaW5lcyhjcnlwdG9NYWNoaW5lKTtcclxuXHJcbiAgICBzdWJzdHJhdGVzLmZvckVhY2goKHN1YnN0cmF0ZSwgaW5kZXgpID0+IHtcclxuICAgICAgc3Vic3RyYXRlLnNldEF0dHJpYnV0ZShcImlkXCIsIGBzdWJzdHJhdGUtJHtpbmRleH1gKTtcclxuICAgICAgc3Vic3RyYXRlLnNldEF0dHJpYnV0ZShcIm9wYWNpdHlcIiwgXCIwXCIpO1xyXG4gICAgICBjb25zdCBhbmltYXRpb24gPSBjcmVhdGVBbmltYXRpb25FbGVtZW50KFwiYW5pbWF0ZVwiLCB7XHJcbiAgICAgICAgXCJ4bGluazpocmVmXCI6IGAjc3Vic3RyYXRlLSR7aW5kZXh9YCxcclxuICAgICAgICBhdHRyaWJ1dGVOYW1lOiBcIm9wYWNpdHlcIixcclxuICAgICAgICBkdXI6IGAyc2AsXHJcbiAgICAgICAgZnJvbTogXCIwXCIsXHJcbiAgICAgICAgdG86IFwiMVwiLFxyXG4gICAgICAgIGJlZ2luOiBcImNyeXB0by1hbmltLmVuZCArIC41c1wiLFxyXG4gICAgICAgIGZpbGw6IFwiZnJlZXplXCJcclxuICAgICAgfSk7XHJcbiAgICAgIGFkZEFuaW1hdGlvblRvU3ZnRWxlbWVudChzdWJzdHJhdGUsIGFuaW1hdGlvbik7XHJcbiAgICB9KTtcclxuXHJcbiAgICBjaXJjbGVzLmZvckVhY2goKGNpcmNsZSwgaW5kZXgpID0+IHtcclxuICAgICAgY2lyY2xlLnNldEF0dHJpYnV0ZShcImlkXCIsIGBjaXJjbGUtJHtpbmRleH1gKTtcclxuICAgICAgY2lyY2xlLnNldEF0dHJpYnV0ZShcIm9wYWNpdHlcIiwgXCIwXCIpO1xyXG4gICAgICBjb25zdCBhbmltYXRpb24gPSBjcmVhdGVBbmltYXRpb25FbGVtZW50KFwiYW5pbWF0ZVwiLCB7XHJcbiAgICAgICAgXCJ4bGluazpocmVmXCI6IGAjY2lyY2xlLSR7aW5kZXh9YCxcclxuICAgICAgICBhdHRyaWJ1dGVOYW1lOiBcIm9wYWNpdHlcIixcclxuICAgICAgICBkdXI6IGAke01hdGgucmFuZG9tKCkgKiAzICsgMX1zYCxcclxuICAgICAgICB2YWx1ZXM6IFwiLjU7IC42OyAxOyAuNzsgLjRcIixcclxuICAgICAgICBiZWdpbjogXCJjcnlwdG8tYW5pbS5lbmQgKyAuNXNcIixcclxuICAgICAgICByZXBlYXRDb3VudDogXCJpbmRlZmluaXRlXCJcclxuICAgICAgfSk7XHJcbiAgICAgIGFkZEFuaW1hdGlvblRvU3ZnRWxlbWVudChjaXJjbGUsIGFuaW1hdGlvbik7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGluaXRBbmltYXRlZExpbmVzKHJvb3QpIHtcclxuICAgIGNyZWF0ZUFuaW1hdGVkTGluZShcIiNsaW5lLTFcIiwgMC4wMDEsIDEwKTtcclxuICAgIGNyZWF0ZUFuaW1hdGVkTGluZShcIiNsaW5lLTJcIiwgMC4xLCAyMCk7XHJcbiAgICBjcmVhdGVBbmltYXRlZExpbmUoXCIjbGluZS0zXCIsIDAuMiwgNTApO1xyXG4gICAgY3JlYXRlQW5pbWF0ZWRMaW5lKFwiI2xpbmUtNFwiLCAwLjMsIDUwKTtcclxuICAgIGNyZWF0ZUFuaW1hdGVkTGluZShcIiNsaW5lLTVcIiwgMC40LCA0MCk7XHJcbiAgICBjcmVhdGVBbmltYXRlZExpbmUoXCIjbGluZS02XCIsIDAuNSwgMTApO1xyXG5cclxuICAgIGZ1bmN0aW9uIGNyZWF0ZUFuaW1hdGVkTGluZShsaW5lSWQsIGRlbGF5LCBtb3ZpbmdIZWlnaHQpIHtcclxuICAgICAgY29uc3QgbGluZSA9IHJvb3QucXVlcnlTZWxlY3RvcihsaW5lSWQpO1xyXG4gICAgICBjb25zdCBsaW5lQW5pbWF0aW9uQ29uZmlnID0gY3JlYXRlQW5pbWF0aW9uRWxlbWVudChcImFuaW1hdGVUcmFuc2Zvcm1cIiwge1xyXG4gICAgICAgIGF0dHJpYnV0ZU5hbWU6IFwidHJhbnNmb3JtXCIsXHJcbiAgICAgICAgZHVyOiBgMnNgLFxyXG4gICAgICAgIGJlZ2luOiBgY3J5cHRvLWFuaW0uZW5kICsgJHtkZWxheX1zYCxcclxuICAgICAgICB0eXBlOiBcInRyYW5zbGF0ZVwiLFxyXG4gICAgICAgIHZhbHVlczogYDAgMDsgMCAtJHttb3ZpbmdIZWlnaHR9OyAwIDA7IDAgJHttb3ZpbmdIZWlnaHR9OyAwIDA7YCxcclxuICAgICAgICByZXBlYXRDb3VudDogXCJpbmRlZmluaXRlXCJcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBhZGRBbmltYXRpb25Ub1N2Z0VsZW1lbnQobGluZSwgbGluZUFuaW1hdGlvbkNvbmZpZyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBhZGRBbmltYXRpb25Ub1N2Z0VsZW1lbnQoZWxlbWVudCwgYW5pbWF0aW9uKSB7XHJcbiAgICBlbGVtZW50LmlubmVySFRNTCA9IGFuaW1hdGlvbi5vdXRlckhUTUw7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBpbml0RGVza3RvcFBvcHVwSW50ZXJhY3Rpb24oKSB7XHJcbiAgICBsZXQgZGVjb3JhdGl2ZUZ1bmN0aW9uID0gZGVib3VuY2UoaXNNb3VzZU9uV2lkZ2V0LCA1MCk7XHJcbiAgICBsZXQgaGFzVGFwcGVkID0gZmFsc2U7XHJcblxyXG4gICAgZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsIGRlY29yYXRpdmVGdW5jdGlvbik7XHJcblxyXG4gICAgZnVuY3Rpb24gaXNNb3VzZU9uV2lkZ2V0KGV2ZW50KSB7XHJcbiAgICAgIGNvbnN0IHBvc1ggPSBldmVudC5jbGllbnRYLFxyXG4gICAgICAgIHBvc1kgPSBldmVudC5jbGllbnRZO1xyXG5cclxuICAgICAgY29uc3QgcG9wdXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmhvbWVfX21vZGFsXCIpO1xyXG5cclxuICAgICAgY29uc3QgaXNPbldpZGdldCA9IGlzT25FbGVtZW50KHBvc1gsIHBvc1ksIFwiLmhvbWVfX3JpZ2h0IC53aWRnZXRcIik7XHJcbiAgICAgIGNvbnN0IGlzT25CdXR0b24gPSBpc09uRWxlbWVudChwb3NYLCBwb3NZLCBcIi53aWRnZXRfX2J1dHRvblwiKTtcclxuICAgICAgY29uc3QgaXNPblBvcHVwID0gaXNPbkVsZW1lbnQocG9zWCwgcG9zWSwgXCIuaG9tZV9fbW9kYWxcIik7XHJcbiAgICAgIGNvbnN0IGlzT25JbnB1dCA9IGlzT25FbGVtZW50KHBvc1gsIHBvc1ksIFwiLndpZGdldF9fc2xpZGVyXCIpO1xyXG5cclxuICAgICAgaWYgKFxyXG4gICAgICAgIChpc09uV2lkZ2V0IHx8IGlzT25Qb3B1cCkgJiZcclxuICAgICAgICAhaXNPbkJ1dHRvbiAmJlxyXG4gICAgICAgICFpc09uSW5wdXQgJiZcclxuICAgICAgICAhaGFzTW91c2UoKVxyXG4gICAgICApIHtcclxuICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoXCJ3aWRnZXQtb24taG92ZXJcIik7XHJcbiAgICAgICAgcG9wdXAuY2xhc3NMaXN0LmFkZChcInNob3dlZFwiKTtcclxuXHJcbiAgICAgICAgaWYgKCFoYXNUYXBwZWQpIHtcclxuICAgICAgICAgIGNvbnN0IHRhcExpbmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLndpZGdldF9fdGFwLWxpbmVcIik7XHJcbiAgICAgICAgICB0YXBMaW5lLmNsYXNzTGlzdC5hZGQoXCJ0YXBwZWRcIik7XHJcblxyXG4gICAgICAgICAgaGFzVG91Y2hlZCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnN0IGRlbGF5ID0gMzAwO1xyXG5cclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZShcIndpZGdldC1vbi1ob3ZlclwiKTtcclxuICAgICAgICAgIHBvcHVwLmNsYXNzTGlzdC5yZW1vdmUoXCJzaG93ZWRcIik7XHJcbiAgICAgICAgfSwgZGVsYXkpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBpc09uRWxlbWVudChwb3NYLCBwb3NZLCBlbGVtZW50VGFnKSB7XHJcbiAgICBjb25zdCBlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoZWxlbWVudFRhZyk7XHJcbiAgICBjb25zdCBlbFBvc0luZm8gPSBlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuXHJcbiAgICBjb25zdCBlbF94MSA9IGVsUG9zSW5mby54O1xyXG4gICAgY29uc3QgZWxfeTEgPSBlbFBvc0luZm8ueTtcclxuICAgIGNvbnN0IGVsX3gyID0gZWxfeDEgKyBlbFBvc0luZm8ud2lkdGg7XHJcbiAgICBjb25zdCBlbF95MiA9IGVsX3kxICsgZWxQb3NJbmZvLmhlaWdodDtcclxuXHJcbiAgICByZXR1cm4gcG9zWCA+PSBlbF94MSAmJiBwb3NYIDw9IGVsX3gyICYmIHBvc1kgPj0gZWxfeTEgJiYgcG9zWSA8PSBlbF95MjtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHNob3dQb3B1cCgpIHtcclxuICAgIGNvbnN0IHBvcHVwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5ob21lX19tb2RhbFwiKTtcclxuXHJcbiAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoXCJ3aWRnZXQtb24taG92ZXJcIik7XHJcbiAgICBwb3B1cC5jbGFzc0xpc3QuYWRkKFwic2hvd2VkXCIpO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gaGlkZVdpZGdldCgpIHtcclxuICAgIGNvbnN0IHdpZGdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaG9tZV9fcmlnaHQgLndpZGdldFwiKTtcclxuICAgIHdpZGdldC5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gaW5pdE1vYmlsZVBvcHVwSW50ZXJhY3Rpb24oKSB7XHJcbiAgICBsZXQgdG91Y2hzdGFydFggPSAwO1xyXG4gICAgbGV0IHRvdWNoc3RhcnRZID0gMDtcclxuICAgIGxldCB0b3VjaGVuZFggPSAwO1xyXG4gICAgbGV0IHRvdWNoZW5kWSA9IDA7XHJcblxyXG4gICAgbGV0IGhhc1N3aXBlZCA9IGZhbHNlO1xyXG5cclxuICAgIGNvbnN0IGhvbWVTZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5ob21lXCIpO1xyXG5cclxuICAgIGhvbWVTZWN0aW9uLmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaHN0YXJ0XCIsIHNldFN0YXJ0VG91Y2hWYXJpYWJsZXMsIGZhbHNlKTtcclxuICAgIGhvbWVTZWN0aW9uLmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaGVuZFwiLCBzd2lwZUhhbmRsZXIsIGZhbHNlKTtcclxuXHJcbiAgICBoaWRlUG9wdXBzQW5kV2lkZ2V0Qm9yZGVyQm90dG9tKCk7XHJcblxyXG4gICAgZnVuY3Rpb24gc2V0U3RhcnRUb3VjaFZhcmlhYmxlcyhldmVudCkge1xyXG4gICAgICB0b3VjaHN0YXJ0WCA9IGV2ZW50LmNoYW5nZWRUb3VjaGVzWzBdLnNjcmVlblg7XHJcbiAgICAgIHRvdWNoc3RhcnRZID0gZXZlbnQuY2hhbmdlZFRvdWNoZXNbMF0uc2NyZWVuWTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBoaWRlUG9wdXBzQW5kV2lkZ2V0Qm9yZGVyQm90dG9tKCkge1xyXG4gICAgICBjb25zdCBwb3B1cFRvcFNlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxyXG4gICAgICAgIFwiLmhvbWVfX21vZGFsIC53aWRnZXRfX3RvcFwiXHJcbiAgICAgICk7XHJcbiAgICAgIGNvbnN0IHdpZGdldFRvcFNlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxyXG4gICAgICAgIFwiLmhvbWVfX3JpZ2h0IC53aWRnZXRfX3RvcFwiXHJcbiAgICAgICk7XHJcblxyXG4gICAgICBwb3B1cFRvcFNlY3Rpb24uY2xhc3NMaXN0LmFkZChcIm5vLWJvcmRlclwiKTtcclxuICAgICAgd2lkZ2V0VG9wU2VjdGlvbi5jbGFzc0xpc3QuYWRkKFwibm8tYm9yZGVyXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHN3aXBlSGFuZGxlcihldmVudCkge1xyXG4gICAgICBjb25zdCB3aWRnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmhvbWVfX3JpZ2h0IC53aWRnZXRcIik7XHJcbiAgICAgIGNvbnN0IHBvcHVwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5ob21lX19tb2RhbFwiKTtcclxuXHJcbiAgICAgIHRvdWNoZW5kWCA9IGV2ZW50LmNoYW5nZWRUb3VjaGVzWzBdLnNjcmVlblg7XHJcbiAgICAgIHRvdWNoZW5kWSA9IGV2ZW50LmNoYW5nZWRUb3VjaGVzWzBdLnNjcmVlblk7XHJcbiAgICAgIHRhcmdldCA9IGV2ZW50LnRhcmdldDtcclxuXHJcbiAgICAgIGNvbnN0IGlzU3dpcGVJc1Nob3J0ZXJUaGVuUXVhcnRlciA9XHJcbiAgICAgICAgTWF0aC5hYnModG91Y2hlbmRYIC0gdG91Y2hzdGFydFgpIDw9IHdpbmRvdy5pbm5lcldpZHRoIC8gNDtcclxuXHJcbiAgICAgIGlmIChpc1N3aXBlSXNTaG9ydGVyVGhlblF1YXJ0ZXIpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH0gZWxzZSBpZiAodG91Y2hlbmRYID49IHRvdWNoc3RhcnRYKSB7XHJcbiAgICAgICAgaWYgKGlzVXNlclN3aXBlV2FzT25XaWRnZXQoKSkge1xyXG4gICAgICAgICAgc2hvd1BvcHVwKCk7XHJcbiAgICAgICAgICBoaWRlV2lkZ2V0KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIWhhc1N3aXBlZCkge1xyXG4gICAgICAgICAgY29uc3Qgc3dhcExpbmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLndpZGdldF9fc3dpcGUtbGluZVwiKTtcclxuICAgICAgICAgIHN3YXBMaW5lLmNsYXNzTGlzdC5hZGQoXCJ3aWRnZXRfX3N3aXBlLWxpbmUtLW5vLXRpdGxlXCIpO1xyXG5cclxuICAgICAgICAgIGhhc1N3aXBlZCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEhpZGUgcG9wdXBcclxuICAgICAgICAgKi9cclxuICAgICAgICBpZiAoaXNVc2VyU3dpcGVXYXNPbldpZGdldCgpKSB7XHJcbiAgICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoXCJ3aWRnZXQtb24taG92ZXJcIik7XHJcbiAgICAgICAgICBwb3B1cC5jbGFzc0xpc3QucmVtb3ZlKFwic2hvd2VkXCIpO1xyXG4gICAgICAgICAgd2lkZ2V0LmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBmdW5jdGlvbiBpc1VzZXJTd2lwZVdhc09uV2lkZ2V0KCkge1xyXG4gICAgICAgIHJldHVybiB0YXJnZXQuY2xvc2VzdChcIi53aWRnZXRcIik7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGRlYm91bmNlKGYsIG1zKSB7XHJcbiAgICBsZXQgdGltZXIgPSBudWxsO1xyXG5cclxuICAgIHJldHVybiBmdW5jdGlvbiguLi5hcmdzKSB7XHJcbiAgICAgIGNvbnN0IG9uQ29tcGxldGUgPSAoKSA9PiB7XHJcbiAgICAgICAgZi5hcHBseSh0aGlzLCBhcmdzKTtcclxuICAgICAgICB0aW1lciA9IG51bGw7XHJcbiAgICAgIH07XHJcblxyXG4gICAgICBpZiAodGltZXIpIHtcclxuICAgICAgICBjbGVhclRpbWVvdXQodGltZXIpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB0aW1lciA9IHNldFRpbWVvdXQob25Db21wbGV0ZSwgbXMpO1xyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGFkZEV2ZW50TGlzdGVuZXJzKCkge1xyXG4gICAgY29uc3Qgc2xpZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zbGlkZXJcIik7XHJcbiAgICBjb25zdCBzdW1tYXJ5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi53aWRnZXRfX2N1cnJlbnQtc3VtbWFyeSAuc3VtbWFyeVwiKTtcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBCaW5kIGEgc2xpZGVyIGRhdGEgY2hhbmdpbmcgd2l0aCBhIHZpZXdcclxuICAgICAqL1xyXG4gICAgc2xpZGVyLmFkZEV2ZW50TGlzdGVuZXIoXHJcbiAgICAgIFwiY2hhbmdlXCIsXHJcbiAgICAgIGV2ZW50ID0+IChzdW1tYXJ5LmlubmVySFRNTCA9IGV2ZW50LmN1cnJlbnRUYXJnZXQudmFsdWUpXHJcbiAgICApO1xyXG5cclxuICAgIGlmIChpc0Rlc2t0b3AoKSAmJiBpc0RvY3VtZW50RnJvemVuKCkpIHtcclxuICAgICAgY29uc3QgaG93SXRXb3Jrc1NlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaG93LWl0LXdvcmtzJyk7XHJcbiAgICAgIGhvd0l0V29ya3NTZWN0aW9uLmNsYXNzTGlzdC5hZGQoJ29wYWNpZnknKTtcclxuXHJcbiAgICAgIGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNld2hlZWxcIiwgc2Nyb2xsVG9TZWN0aW9uLCB7XHJcbiAgICAgICAgcGFzc2l2ZTogdHJ1ZVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoaXNNb2JpbGUoKSkge1xyXG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCBpbml0U2xpZGVyKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIWlzTW9iaWxlKCkpIHtcclxuICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGhlYWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaGVhZGVyXCIpO1xyXG4gICAgICAgIGlmIChoZWFkZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuYm90dG9tIDwgd2luZG93LnBhZ2VZT2Zmc2V0KSB7XHJcbiAgICAgICAgICBoZWFkZXIuY2xhc3NMaXN0LmFkZChcImZpeGVkXCIpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBoZWFkZXIuY2xhc3NMaXN0LnJlbW92ZShcImZpeGVkXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgd2luZG93LmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KFwic2Nyb2xsXCIpKTtcclxuXHJcbiAgICBhZGRCdXR0b25zRXZlbnRMaXN0ZW5lcnMoKTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGlzRGVza3RvcCgpIHtcclxuICAgIHJldHVybiB3aW5kb3cuaW5uZXJXaWR0aCA+IDEyMDA7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBzY3JvbGxUb1NlY3Rpb24oKSB7XHJcbiAgICBjb25zdCBzY3JvbGxNb3VzZVRvID0gJChcIiNzY3JvbGwtdG9cIikub2Zmc2V0KCkudG9wO1xyXG4gICAgY29uc3QgaG93SXRXb3Jrc1NlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaG93LWl0LXdvcmtzJyk7XHJcbiAgICBcclxuICAgIGNvbnN0IHNjcm9sbFRpbWUgPSA5MDA7XHJcbiAgICBjb25zdCBkZWxheSA9IDUwMDtcclxuXHJcbiAgICBob3dJdFdvcmtzU2VjdGlvbi5jbGFzc0xpc3QucmVtb3ZlKCdvcGFjaWZ5Jyk7XHJcbiAgICBoaWRlTW91c2UoKTtcclxuICAgIFxyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIHVuZnJlZXplRG9jdW1lbnQoKTtcclxuICAgICAgJChcImh0bWwsIGRvY3VtZW50LmJvZHlcIikuYW5pbWF0ZShcclxuICAgICAgICB7XHJcbiAgICAgICAgICBzY3JvbGxUb3A6IHNjcm9sbE1vdXNlVG8sXHJcbiAgICAgICAgICBlYXNlOiBcImVhc2VPdXRCYWNrXCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNjcm9sbFRpbWVcclxuICAgICAgKTtcclxuICAgIH0sIGRlbGF5KTtcclxuXHJcbiAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZXdoZWVsXCIsIHNjcm9sbFRvU2VjdGlvbik7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBpc0RvY3VtZW50RnJvemVuKCkge1xyXG4gICAgcmV0dXJuIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmNvbnRhaW5zKFwibm8tc2Nyb2xsXCIpO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gdW5mcmVlemVEb2N1bWVudCgpIHtcclxuICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZShcIm5vLXNjcm9sbFwiKTtcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJodG1sXCIpLmNsYXNzTGlzdC5yZW1vdmUoXCJuby1zY3JvbGxcIik7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiByZW1vdmVMb2FkZXIoKSB7XHJcbiAgICBjb25zdCBsb2FkZXJIVE1MID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jaG9zZS1sYW5ndWFnZS13cmFwcGVyXCIpO1xyXG4gICAgY29uc3QgbG9hZGVyU2NyaXB0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNsb2FkZXItc2NyaXB0XCIpO1xyXG4gICAgY29uc3QgbG9hZGVyTGliID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNsb2FkZXItbGliXCIpO1xyXG5cclxuICAgIGxvYWRlckxpYi5yZW1vdmUoKTtcclxuICAgIGxvYWRlclNjcmlwdC5yZW1vdmUoKTtcclxuXHJcbiAgICBjb25zdCB0aW1lVG9Mb2FkZXJIaWRlID0gMjAwMDtcclxuICAgIGxvYWRlckhUTUwuY2xhc3NMaXN0LmFkZChcInJlbW92ZWRcIik7XHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IGxvYWRlckhUTUwucmVtb3ZlKCksIHRpbWVUb0xvYWRlckhpZGUpO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gZnJlZXplRG9jdW1lbnQoKSB7XHJcbiAgICBjb25zdCBzY3JvbGxNb3VzZVRvID0gJChcIiNzY3JvbGwtdG9cIikub2Zmc2V0KCkudG9wO1xyXG5cclxuICAgIGlmIChcclxuICAgICAgd2luZG93LmlubmVyV2lkdGggPj0gMTIwMCAmJlxyXG4gICAgICAoc2Nyb2xsTW91c2VUbyAqIDEwKSAvIDEwID49IHdpbmRvdy5wYWdlWU9mZnNldFxyXG4gICAgKSB7XHJcbiAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZChcIm5vLXNjcm9sbFwiKTtcclxuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImh0bWxcIikuY2xhc3NMaXN0LmFkZChcIm5vLXNjcm9sbFwiKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGhpZGVNb3VzZSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gaGlkZU1vdXNlKCkge1xyXG4gICAgY29uc3QgbW91c2UgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1vdXNlXCIpO1xyXG4gICAgbW91c2UuY2xhc3NMaXN0LmFkZChcInNjYWxlZFwiKTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGhhc01vdXNlKCkge1xyXG4gICAgcmV0dXJuICFkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1vdXNlXCIpLmNsYXNzTGlzdC5jb250YWlucyhcInNjYWxlZFwiKTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGFkZEJ1dHRvbnNFdmVudExpc3RlbmVycygpIHtcclxuICAgIGNvbnN0IGJ1dHRvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmJ1dHRvbi0tc2Nyb2xsLXRvLXRvcFwiKTtcclxuICAgIGJ1dHRvbnMuZm9yRWFjaChidXR0b24gPT4gYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBzY3JvbGxUb1RvcCkpO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gc2Nyb2xsVG9Ub3AoKSB7XHJcbiAgICBsZXQgdG8gPSAwO1xyXG5cclxuICAgIGlmIChpc01vYmlsZSgpKSB7XHJcbiAgICAgIGNvbnN0IHdpZGdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaG9tZV9fcmlnaHQgLndpZGdldFwiKTtcclxuICAgICAgY29uc3Qgd2lkZ2V0RWxlbWVudERhdGEgPSB3aWRnZXQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcblxyXG4gICAgICB0byA9IHdpZGdldEVsZW1lbnREYXRhLmhlaWdodCAvIDI7XHJcbiAgICB9XHJcblxyXG4gICAgJChcImh0bWwsIGRvY3VtZW50LmJvZHlcIikuYW5pbWF0ZShcclxuICAgICAge1xyXG4gICAgICAgIHNjcm9sbFRvcDogdG8sXHJcbiAgICAgICAgZWFzZTogXCJlYXNlT3V0QmFja1wiXHJcbiAgICAgIH0sXHJcbiAgICAgIDkwMFxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGluaXRBbmltYXRpb25zKCkge1xyXG4gICAgLyoqXHJcbiAgICAgKiBTZXR1cCB5b3VyIExhenkgTGluZSBlbGVtZW50LlxyXG4gICAgICogc2VlIFJFQURNRSBmaWxlIGZvciBtb3JlIHNldHRpbmdzXHJcbiAgICAgKi9cclxuICAgIGNvbnN0IGFuaW1hdGlvbnNDb25maWcgPSB7XHJcbiAgICAgIGVhc2U6IFwiZWFzZUluUXVhZFwiLFxyXG4gICAgICBzdHJva2VXaWR0aDogMC41LFxyXG4gICAgICBzdHJva2VPcGFjaXR5OiAxLFxyXG4gICAgICBzdHJva2VDb2xvcjogXCIjZmZmZmZmXCJcclxuICAgIH07XHJcblxyXG4gICAgY29uc3QgbG9nb0FuaW1hdGlvbnNDb25maWcgPSB7XHJcbiAgICAgIGVhc2U6IFwiZWFzZUluUXVhZFwiLFxyXG4gICAgICBzdHJva2VXaWR0aDogNCxcclxuICAgICAgc3Ryb2tlT3BhY2l0eTogMSxcclxuICAgICAgc3Ryb2tlQ29sb3I6IFwiI2ZmZmZmZlwiXHJcbiAgICB9O1xyXG5cclxuICAgIGxldCB0ZWFtSWNvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGVhbVwiKTtcclxuICAgIGxldCBjYWxlbmRhckljb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NhbGVuZGFyXCIpO1xyXG4gICAgbGV0IGxvZ29JY29uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNsb2dvXCIpO1xyXG5cclxuICAgIGxldCB0ZWFtSWNvbkFuaW1hdGlvbiA9IG5ldyBMYXp5TGluZVBhaW50ZXIodGVhbUljb24sIGFuaW1hdGlvbnNDb25maWcpO1xyXG4gICAgbGV0IGNhbGVuZGFySWNvbkFuaW1hdGlvbiA9IG5ldyBMYXp5TGluZVBhaW50ZXIoXHJcbiAgICAgIGNhbGVuZGFySWNvbixcclxuICAgICAgYW5pbWF0aW9uc0NvbmZpZ1xyXG4gICAgKTtcclxuICAgIGxldCBsb2dvSWNvbkFuaW1hdGlvbiA9IG5ldyBMYXp5TGluZVBhaW50ZXIobG9nb0ljb24sIGxvZ29BbmltYXRpb25zQ29uZmlnKTtcclxuXHJcbiAgICB0ZWFtSWNvbkFuaW1hdGlvbi5wYWludCgpO1xyXG4gICAgY2FsZW5kYXJJY29uQW5pbWF0aW9uLnBhaW50KCk7XHJcbiAgICBsb2dvSWNvbkFuaW1hdGlvbi5wYWludCgpO1xyXG5cclxuICAgIGhpZGVNYXBFbGVtZW50cygpO1xyXG4gICAgaGlkZUNyeXB0b01hY2hpbmVFbGVtZW50cygpO1xyXG4gICAgaGlkZU5vdGVib29rRWxlbWVudHMoKTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHNob3dJY29ucygpIHtcclxuICAgIGNvbnN0IGJvYXJkSW1hZ2VzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5ib2FyZF9faW1hZ2Ugc3ZnXCIpO1xyXG5cclxuICAgIGJvYXJkSW1hZ2VzLmZvckVhY2goaW1hZ2UgPT4ge1xyXG4gICAgICBjb25zdCBvcGFjaWZ5RWxlbWVudHMgPSBpbWFnZS5xdWVyeVNlbGVjdG9yQWxsKFwiW2ZpbGwtb3BhY2l0eV1cIik7XHJcbiAgICAgIG9wYWNpZnlFbGVtZW50cy5mb3JFYWNoKG9wRWxlbWVudCA9PlxyXG4gICAgICAgIG9wRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJmaWxsLW9wYWNpdHlcIiwgXCIxXCIpXHJcbiAgICAgICk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGFkZExhbmd1YWdlQnV0dG9uc0V2ZW50TGlzdGVuZXJzKCkge1xyXG4gICAgY29uc3QgbGFuZ3VhZ2VCdXR0b25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcclxuICAgICAgXCIuY2hvc2UtbGFuZ3VhZ2VfX2xhbmd1YWdlc1wiXHJcbiAgICApO1xyXG5cclxuICAgIHNob3dMYW5ndWFnZUNob3NlTWVudSgpO1xyXG5cclxuICAgIGxhbmd1YWdlQnV0dG9ucy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZXZlbnQgPT4ge1xyXG4gICAgICBjb25zdCBLT1JFQU4gPSBcImNob3NlLWxhbmd1YWdlX19sYW5ndWFnZS0ta29yZWFuXCI7XHJcbiAgICAgIGNvbnN0IGNsaWNrZWRCdXR0b24gPSBldmVudC50YXJnZXQ7XHJcblxyXG4gICAgICBjbGlja2VkQnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3dlZCcpO1xyXG5cclxuICAgICAgaWYgKGNsaWNrZWRCdXR0b24uY2xhc3NMaXN0LmNvbnRhaW5zKEtPUkVBTikpIHtcclxuICAgICAgICB0cmFuc2xhdGVUb0tvcmVhbihcIktPUlwiKTtcclxuICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoJ2tvcicpO1xyXG4gICAgICAgIFxyXG4gICAgICB9XHJcblxyXG4gICAgICBoaWRlTGFuZ3VhZ2VDaG9zZU1lbnUoKTtcclxuXHJcbiAgICAgIGlmICghaXNNb2JpbGUoKSkge1xyXG4gICAgICAgIGluaXRBbmltYXRpb25zKCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGZ1bmN0aW9uIHNob3dMYW5ndWFnZUNob3NlTWVudSgpIHtcclxuICAgICAgY29uc3QgY2hvc2VMYW5ndWFnZU1haW5FbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcclxuICAgICAgICBcIi5jaG9zZS1sYW5ndWFnZVwiXHJcbiAgICAgICk7XHJcbiAgICAgIGNob3NlTGFuZ3VhZ2VNYWluRWxlbWVudC5jbGFzc0xpc3QuYWRkKFwic2hvd2VkXCIpO1xyXG4gICAgICBjb25zdCBsYW5ndWFnZUJ1dHRvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFxyXG4gICAgICAgIFwiLmNob3NlLWxhbmd1YWdlX19sYW5ndWFnZVwiXHJcbiAgICAgICk7XHJcbiAgICAgIGxhbmd1YWdlQnV0dG9ucy5mb3JFYWNoKGxiID0+IGxiLmNsYXNzTGlzdC5hZGQoXCJzaG93ZWRcIikpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGhpZGVMYW5ndWFnZUNob3NlTWVudSgpIHtcclxuICAgICAgY29uc3QgbGFuZ3VhZ2VCdXR0b25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcclxuICAgICAgICBcIi5jaG9zZS1sYW5ndWFnZV9fbGFuZ3VhZ2VcIlxyXG4gICAgICApO1xyXG4gICAgICBsYW5ndWFnZUJ1dHRvbnMuZm9yRWFjaChsYiA9PiBsYi5jbGFzc0xpc3QucmVtb3ZlKFwic2hvd2VkXCIpKTtcclxuXHJcbiAgICAgIGNvbnN0IGNob3NlTGFuZ3VhZ2VNYWluRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXHJcbiAgICAgICAgXCIuY2hvc2UtbGFuZ3VhZ2VcIlxyXG4gICAgICApO1xyXG4gICAgICBjaG9zZUxhbmd1YWdlTWFpbkVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcInNob3dlZFwiKTtcclxuXHJcbiAgICAgIHNldFRpbWVvdXQocmVtb3ZlTG9hZGVyLCAxNTAwKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHRyYW5zbGF0ZVRvS29yZWFuKGxhbmcgPSBcIkVOR1wiKSB7XHJcbiAgICBjb25zdCBrb3JlYW5EYXRhID0gW1xyXG4gICAgICBcIuyEuOqzhCDstZzstIjsnZgg7YWM7KGw7IqkIGMyYyA8YnI+IOq4gOuhnOuyjCDqsbDrnpjshoxcIixcclxuICAgICAgXCLtiKzsnpDsnpAg65CY6riwXCIsXHJcbiAgICAgIFwi7Yis7J6Q7J6QIOuQmOq4sFwiLFxyXG4gICAgICBcIu2eiOuToO2GoO2BsCDqtazrp6RcIixcclxuICAgICAgXCLtiKzsnpBcIixcclxuICAgICAgXCJcIixcclxuICAgICAgXCJJQ08g7Yis7J6QXCIsXHJcbiAgICAgIFwi7YWM7KGw7IqkIOuyoOydtO2CuS4g7KeA6riI6rmM7KeAIOyxhOq1tOydgCDqsrDsvZQg7Ims7Jq06rKMIOyVhOuLiOyYgOyKteuLiOuLpC4g7Z6I65Og67mE7Yq464qUIO2FjOyhsOyKpOuyoOydtO2CueydtCDqsIDriqXtlZwg6rGw656Y7IaM7J6F64uI64ukLu2FjOyhsOyKpCDrsqDsnbTsu6TqsIAg65Cg7IiY7J6I64qUIOq4sO2ajOulvCDrhpPsuZjsp4Ag66eI7Iut7Iuc7JikLu2eiOuToOu5hO2KuOulvCDthrXtlbQg7JewNS41JSDthYzsobDsiqQg67Kg7J207YK5IOyImOydteydhCDsi6TtmITtlZjsi63si5zsmKQuXCIsXHJcbiAgICAgIFwi66qo6riI7JWhXCIsXHJcbiAgICAgIFwi7ISk66a97J6QXCIsXHJcbiAgICAgIFwi7KeA7IaNXCIsXHJcbiAgICAgIFwi7J6R64+Z7JuQ66asXCIsXHJcbiAgICAgIFwi7ZSE66as7IS47J28IO2DgOydtOuouFwiLFxyXG4gICAgICBcIuydvFwiLFxyXG4gICAgICBcIuyLnFwiLFxyXG4gICAgICBcIuu2hFwiLFxyXG4gICAgICBcIuy0iFwiLFxyXG4gICAgICBcIjFcIixcclxuICAgICAgXCJISUQgPSBcIixcclxuICAgICAgXCIwLjE1JFwiLFxyXG4gICAgICBcIuy0nSAxNyAwMDAgMDAwIO2GoO2BsOykkSDtmITsnqwgQu2GoO2BsOydtCDrgqjslZjsirXri4jri6QuXCIsXHJcbiAgICAgIFwi7IS46rOEIOy1nOy0iOydmCDthYzsobDsiqQg66eI7LyTXCIsXHJcbiAgICAgIFwiSGlkZGVuYml0IOqxsOuemOyGjOyXkOyEnOuKlCDqsbDrnpjsnZgg6rCB66m07JeQIOyXheyytCDrsI8g7IiY7IiY66OM66W8IOu2gOqzvO2VqeuLiOuLpC4g7J6Q7IKwICjspoksIOyekOyCsOydhCDtjJTslYQg7Jyg64+Z7ISx7J2EIOygnOqzte2VmOuKlCDsgqzrnowp7J20IDAuMjUgJeyXkCDrjZQg6rCA6rmd6rKMIOyngOu2iO2VmOuKlCDrj5nslYgsIO2FjOydtOy7pOydmCDsiJjsiJjro4zripQg7J2867CY7KCB7Jy866GcIO2Pieq3oCAwLjUtMC43NSAlIOuGkuyKteuLiOuLpC4g7Ya17IOB7KCB7Jy866GcLOydtCDsiJjsiJjro4zripQg6rGw656Y6rCAIOyLpO2WieuQmOuKlCDsi5zsoJDsl5DshJwg6rO17KCc65Cp64uI64ukXCIsXHJcbiAgICAgIFwi7Iuc7J6l7J2EIOychO2VnCBVU1BcIixcclxuICAgICAgXCLrj4XtirntlZwg7YyQ66ekIOygnOyViOydgCBISUTqsIAgSGlkZGVuYml0IOuUlOyngO2EuCDsnpDsgrAgRXhjaGFuZ2Ug7ZSM656r7Y+87JeQIOydmO2VnCDqtozsnITsnojripQg7KeA7KCV7J2EIOqwgOynhCDri6jsnbwg6raM7JyE7J6I64qUIOqzteyLnSDthqDtgbDsnbTrqbAg66qo65OgIOyCrOyaqeyekOqwgCDsnpDsi6DsnZgg7Zmc7ISxIO2UjOueq+2PvCDtmZzrj5nsl5DshJwg7ZW064u5IEhJRCDrs7Tsg4HsnYTrsJvsnYQg7IiYIOyeiOuLpOuKlCDqsoPsnoXri4jri6QuIOqzoOqwneydgCBISUTsnZgg7KCV6riwIO2GteqzhOulvCDthrXtlbQgSElEIOyImOyXkCDruYTroYDtlZjsl6wg7ZW064u5IOu5hOycqOydmCDrs7TsnKAg67mE7KSR7JeQIOuUsOudvCDrsLDri7nquIjsnYQg7IiY66C5IO2VoCDsiJgg7J6I7Jy866mwIOyImOydteydhCDtlqXsnKAg7ZWgIOyImCDsnojsirXri4jri6QuXCIsXHJcbiAgICAgIFwi7Yis7ZGc6raMXCIsXHJcbiAgICAgIFwiSGlkZGVuIO2GoO2BsCDshozsp4DsnpDripQg6rO16rCcIO2IrO2RnOq2jOydhCDtlonsgqztlaAg7IiYIOyeiOyKteuLiOuLpC4gMTAwIOqwnOydmCBIaWRkZW4g7Yag7YGw7J2AIDEg6rCc7J2YIO2IrO2RnOq2jOqzvCDqsJnsirXri4jri6QuIOyghOuwmOyggeycvOuhnCDsgqzsmqnsnpDsl5Dqsowg7KCV6riw7KCB7Jy866GcIOuwsOuLuSDsiJjsnbXsnYQg7KCc6rO17ZWY6riwIOychO2VtCBISUTripQg7IKs7Jqp7J6Q6rCAIO2UjOueq+2PvCDsnZjsgqwg6rKw7KCVIO2UhOuhnOyEuOyKpOyXkCDssLjsl6ztlaAg7IiY7J6I64qUIOq4sO2ajOulvCDslrvsnYQg7IiYIOyeiOuPhOuhne2VqeuLiOuLpC5cIixcclxuICAgICAgXCLsvZTsnbgg7JeQ7Ja065Oc656NXCIsXHJcbiAgICAgIFwiSUNPIOywuOyXrOulvCDsnITtlZwg66qo67CU7J28IOuwjyBJT1Mg7ISk7LmY7IucIOu2gOqzvOuQmOuKlCDruYTsmqnsnYAg7J207ZuEIOuztOuEiOyKpOuhnCDtmZjquInrkKnri4jri6QuXCIsXHJcbiAgICAgIFwi7Z6I65Og67mE7Yq464qUIOuLueyLoOydmCDshLHqs7XsnLzroZwg7JWI64K07ZWp64uI64ukLlwiLFxyXG4gICAgICBcIu2GoO2BsCDshozsp4DruYTsnKjsnbQg7Kad6rCA7ZWo7JeQIOuUsOudvCDsp4DquInrkJjripQg67O064SI7IqkIOuYkO2VnCDspp3qsIDtlanri4jri6QuIO2GoO2BsCDtmYDrjZTrk6Tsl5Dqsowg6rGw656Y7IiY7IiY66OM7J2YIDgwJeulvCDthqDtgbDruYTsnKjsl5Ag65Sw6528IO2ZmOq4ieuQqeuLiOuLpC5cIixcclxuICAgICAgXCLrqqjrk6DqsoPsnbQg6rCA6rmM7J207JeQIOyeiOyKteuLiOuLpC5cIixcclxuICAgICAgXCJcIixcclxuICAgICAgXCLrsLHsp4BcIixcclxuICAgICAgXCLsg4jroZzsmrQg7Z6I65Og67mE7Yq4IOuwseyEnOulvCDqs7XsnKDtlaDsiJgg7J6I7Ja0IOq4sOyBqeuLiOuLpC7snbTrsLHshJzripQg7ZS87JWE7Yq4IO2Gte2VqeydhCDthrXtlZwg7IOI66Gc7Jq0IOuniOydtOuLneqxsOuemOyGjOulvCDshozqsJztlZjqs6Ag7J6I7Iq164uI64ukOlByb29mLW9mLVJlcGxpY2F0aW9uIChQb1IpIGFuZCBQcm9vZi1vZi1TcGFjZXRpbWUgKFBvU3QpXCIsXHJcbiAgICAgIFwi7Z6I65Og67mE7Yq4IOuwseyEnOuztOq4sFwiLFxyXG4gICAgICBcIuyXkOyWtOuTnOuejVwiLFxyXG4gICAgICBcIklDTyDsnbTtm4QsIOyasOumrOuKlCAxMDAgRVRIIOydtOyDgSDrmJDripQg6re47JmAIOuPmeuTse2VnCDquIjslaHsnYQg67mE7Yq4IOuPmeyghOycvOuhnCDquLDrtoAg7ZWcIOuqqOuToCDssLjqsIDsnpDrk6Tsl5Dqsowg7LaU7LKo7J2EIOyLpOyLnCDtlaAg6rKD7J6F64uI64ukLiDrs7TrhIjsiqTripQg64uk7J2MIOu5hOycqOuhnCDrsLDrtoTrkKnri4jri6QuXCIsXHJcbiAgICAgIFwi66CI67Ko6rO8IOuztOuEiOyKpOycqOydgCDquLDrs7jqsIDqsqnqs7wg67OE64+E66GcIOyggeyaqeuQqeuLiOuLpC5cIixcclxuICAgICAgXCLtnojrk6DruYTtirgg7Yag7YGw7J2AIOyyq+qxsOuemOu2gO2EsCDsiqTrp4jtirjsu6jtirjrnpntirjrpbwg7Ya17ZW0IO2UhOuhnOq3uOuemOuwjSDrkKnri4jri6QuXCIsXHJcbiAgICAgIFwiTW9yZSB0aGFuLCBFVEhcIixcclxuICAgICAgXCLstpTqsIAgSElEIOy9lOyduCwlXCIsXHJcbiAgICAgIFwiU0FMRVwiLFxyXG4gICAgICBcIlByZS1zYWxlXCIsXHJcbiAgICAgIFwiSUNPXCIsXHJcbiAgICAgIFwi7YyQ66ek7IiY65+JXCIsXHJcbiAgICAgIFwi7IS47J28XCIsXHJcbiAgICAgIFwi67O064SI7IqkXCIsXHJcbiAgICAgIFwi6rCA6rKpXCIsXHJcbiAgICAgIFwiMWV0aFwiLFxyXG4gICAgICBcIu2VmOuTnOy6oVwiLFxyXG4gICAgICBcIuyxhOq1tOyImOufieydtCDslrTrlrvqsowg65CY64qU6rCAP1wiLFxyXG4gICAgICBcIuyyq+uyoOydtOy7pCDspJEg7ZWcIOuqheydtOuQmOq4sCDsnITtlZwg6riw7ZqM66W8IOuGk+y5mOyngCDrp4jsi63si5zsmKQuIOyymOydjCAxMiDqsJzsm5Qg64K07JeQIOuyoOydtO2CueydhCDthrXtlbQg7JewIDUuNSXsnZgg7IiY7J217J2EIOyYrOumrOyLreyLnOyYpC4g64u57Iug7J2YIOyyqyDtlbQg64+Z7JWIIOqwgOyepSDrp47snYAg7J207J217J2EIOuCqOq4tCDsvZTsnbjsnYQg7J6sIOuyoOydtO2CueydhCDthrXtlbQg7IiY7J217J2EIOy1nOuMgO2ZlCDtlZjsi63si5zsmKQuIOyasOumrOuKlCAyMDE5IOuFhCDstZzsoIAg7IiY7KSA7JeQ7IScIOuyoOydtO2CueydmCDrs7XsnqHshLHsnYQg7KSE7J206riwIOychO2VtCDstZzshKDsnYQg64uk7ZWY6rOgIOyeiOyKteuLiOuLpC7tnojrk6DruYTtirjripQg7ZiE6riI7Jy866GcIOqwgOuTnSDssKjqs6Ag6rOE7IKw7J2YIOuzteyeoeyEseydtCDspp3qsIAg7ZWgIOuVjOq5jOyngCDqsITri6jtlZwg6riw67O4IOyymOumrCDriqXroKXsnLzroZzrj4Qg7Ja77J2EIOyImOyeiOuKlCDquLDtmozrpbwg7KCc6rO17ZWp64uI64ukLiDrsqDsnbTtgrnsl5DshJwg7IKs7Jqp7ZWgIOyImOyeiOuKlCDqsIDsnqUg66eO7J2AIOyWkeydmCDrj5nsoITsnLzroZwg6rCBIOu4lOuhnSDri7kg7LWc6rOgIO2WieyatOydhCDrgqjquYHri4jri6QuIFBvU+uwqeyLneydgCDrp47snYAg64W466Cl7J2EIOq4sOyauOydvCDtlYTsmpTqsIAg7JeG7Iq164uI64ukLiBQb1PrsKnsi53snYAg66y466qF7ZmUIOuQnCDssYTqtbQg67KE7KCE7Jy866GcIO2YhOuMgCDquIjsnLUg7IOB7ZKI6rO8IOqzte2GteygkOydtCDsnojsirXri4jri6QuIFBvU+yXkOyEnOuKlCDsp4DqsJHsl5Ag67O06rSAIOuQnCDsvZTsnbjsnZgg7YGs6riw6rCAIOyDiOuhnOyatCDsp4DqsJHsnYQg7Ja764qUIOq4sO2ajOulvCDspp3qsIDsi5ztgqTquLAg65WM66y47JeQIOqzhOygleyXkCDqsIDsnqUg66eO7J2AIOy9lOyduOydtOyeiOuKlCDssqsg67KI7Ke4IOywuOqwgOyekOqwgCDrkKAg7IiYIOyeiOyKteuLiOuLpFwiLFxyXG4gICAgICBcIjHqsJzsm5R+MTLqsJzsm5QgLSBcIixcclxuICAgICAgXCIyIDg1OSAzMDIuODQg7L2U7J24XCIsXHJcbiAgICAgIFwiMTPqsJzsm5R+MjTqsJzsm5QgLSBcIixcclxuICAgICAgXCIxIDQyOSA2NTEsNDIg7L2U7J24XCIsXHJcbiAgICAgIFwiMjXqsJzsm5R+MzXqsJzsm5QtIFwiLFxyXG4gICAgICBcIjcxNCw4MjUuNzEg7L2U7J24XCIsXHJcbiAgICAgIFwiMzbqsJzsm5QgLSBcIixcclxuICAgICAgXCI2NjksNDY2LjA3IOy9lOyduFwiLFxyXG4gICAgICBcIuuhnOuTnOuntVwiLFxyXG4gICAgICBcIuqzhO2ajSDrsI8g6rCc67CcXCIsXHJcbiAgICAgIFwiUHJlLWljbyBzdGFydFwiLFxyXG4gICAgICBcIuuyoO2DgOuyhOyghCDrn7Dsua1cIixcclxuICAgICAgXCLqsbDrnpjshowg65+w7LmtXCIsXHJcbiAgICAgIFwi6riA66Gc67KMIFRPUDEwIOqxsOuemOyGjCDshKDsoJVcIixcclxuICAgICAgXCLtnojrk6Ag7L2U7J247J20IOqxsOuemOuQmOuKlCDstZzqs6DsnZgg6rGw656Y7IaMXCIsXHJcbiAgICAgIFwiMjQgw5cgNyBzdXBwb3J0IHNlcnZpY2VcIixcclxuICAgICAgXCLrrLjsnZjsgqztla3snbQg7J6I7Jy87Iug6rK97JqwLCDslrjsoJzrk6Ag64u167OA7ZW0IOuTnOumrOqyoOyKteuLiOuLpC5cIixcclxuICAgICAgXCLtnojrk6DruYTtirgg6rGw656Y7IaMIOuRmOufrOuztOq4sFwiLFxyXG4gICAgICBcIu2eiOuToOu5hO2KuCDqsbDrnpjshowg67Cx7IScXCIsXHJcbiAgICAgIFwi67O17KCc67Cp7KeAXCIsXHJcbiAgICAgIFwiUE9XRVIgRkFVTFQgVE9MRVJBTkNFXCIsXHJcbiAgICAgIFwiMjAxOSDsl7Dqtawg66Gc65Oc66e1XCIsXHJcbiAgICAgIFwiXCIsXHJcbiAgICAgIFwiXCIsXHJcbiAgICAgIFwiXCJcclxuICAgIF07XHJcblxyXG4gICAgY29uc3QgdGV4dEVsZW1lbnRzID0gW1xyXG4gICAgICBnZXRFbGVtZW50KCcuaG9tZSAuaW5mb19fdGl0bGUnKSxcclxuICAgICAgZ2V0RWxlbWVudCgnLmhlYWRlcl9fYnV0dG9uJyksXHJcbiAgICAgIGdldEVsZW1lbnQoJy5zdXBwb3J0X19idXR0b24nKSwgXHJcbiAgICAgIGdldEVsZW1lbnQoJy5ob21lX19tb2RhbCAud2lkZ2V0X19idXR0b24nKSxcclxuICAgICAgZ2V0RWxlbWVudCgnLmhvbWVfX3JpZ2h0IC53aWRnZXRfX2xvZ28gLnRleHQnKSwgXHJcbiAgICAgIGdldEVsZW1lbnQoJy5ob21lX19yaWdodCAud2lkZ2V0X19pbmZvIC50ZXh0JyksIFxyXG4gICAgICBnZXRFbGVtZW50KCcuaG9tZV9fcmlnaHQgLndpZGdldF9fYnV0dG9uJyksXHJcbiAgICAgIGdldEVsZW1lbnQoJy5ob21lIC5pbmZvX19kZXNjcmlwdGlvbicpLFxyXG4gICAgICBnZXRFbGVtZW50KCcuaG9tZSAuYm9hcmRfX2l0ZW0tLTEgLmJvYXJkX190aXRsZScpLFxyXG4gICAgICBnZXRFbGVtZW50KCcuaG9tZSAuYm9hcmRfX2l0ZW0tLTIgLmJvYXJkX190aXRsZScpLFxyXG4gICAgICBnZXRFbGVtZW50KCcuaG9tZSAuYm9hcmRfX2l0ZW0tLTMgLmJvYXJkX190aXRsZScpLFxyXG4gICAgICBnZXRFbGVtZW50KCcuaG93LWl0LXdvcmtzX190aXRsZScpLFxyXG4gICAgICBnZXRFbGVtZW50KCcuaG9tZV9fbW9kYWwgLndpZGdldF9fdGl0bGUnKSxcclxuICAgICAgZ2V0RWxlbWVudCgnLnRpbWVyX19kYXlzJyksXHJcbiAgICAgIGdldEVsZW1lbnQoJy50aW1lcl9faG91cnMnKSxcclxuICAgICAgZ2V0RWxlbWVudCgnLnRpbWVyX19taW51dGVzJyksXHJcbiAgICAgIGdldEVsZW1lbnQoJy50aW1lcl9fc2VjJyksXHJcbiAgICAgIGdldEVsZW1lbnQoJy5ob21lX19tb2RhbCAud2lkZ2V0X19pbmZvIC5jb2luX19udW1iZXInKSxcclxuICAgICAgZ2V0RWxlbWVudCgnLmhvbWVfX21vZGFsIC53aWRnZXRfX2luZm8gLnRleHQnKSxcclxuICAgICAgZ2V0RWxlbWVudCgnLmhvbWVfX21vZGFsIC53aWRnZXRfX2luZm8gLmNvaW5fX3ByaWNlJyksXHJcbiAgICAgIGdldEVsZW1lbnQoJy5ob21lX19tb2RhbCAud2lkZ2V0X19pbmZvLS0yIC50ZXh0JyksXHJcbiAgICAgIGdldEVsZW1lbnQoJy5jYXJkLS0xIC5jYXJkX190aXRsZScpLFxyXG4gICAgICBnZXRFbGVtZW50KCcuY2FyZC0tMSAuY2FyZF9faW5mbycpLFxyXG4gICAgICBnZXRFbGVtZW50KCcuY2FyZC0tMiAuY2FyZF9fdGl0bGUnKSxcclxuICAgICAgZ2V0RWxlbWVudCgnLmNhcmQtLTMgLmNhcmRfX2luZm8nKSxcclxuICAgICAgZ2V0RWxlbWVudCgnLmNhcmQtLTMgLmNhcmRfX3RpdGxlJyksXHJcbiAgICAgIGdldEVsZW1lbnQoJy5jYXJkLS0zIC5jYXJkX19pbmZvJyksXHJcbiAgICAgIGdldEVsZW1lbnQoJy5jYXJkLS00IC5jYXJkX190aXRsZScpLFxyXG4gICAgICBnZXRFbGVtZW50KCcuY2FyZC0tNCAuY2FyZF9faW5mbycpLFxyXG4gICAgICBnZXRFbGVtZW50KCcuY2FyZC0tNSAuY2FyZF9fdGl0bGUnKSxcclxuICAgICAgZ2V0RWxlbWVudCgnLmNhcmQtLTUgLmNhcmRfX2luZm8nKSxcclxuICAgICAgZ2V0RWxlbWVudCgnLmNhcmQtLTYgLmNhcmRfX3RpdGxlJyksXHJcbiAgICAgIGdldEVsZW1lbnQoJy5jYXJkLS02IC5jYXJkX19pbmZvJyksXHJcbiAgICAgIGdldEVsZW1lbnQoJy53aGl0ZXBhcGVyX190aXRsZScpLFxyXG4gICAgICBnZXRFbGVtZW50KCcud2hpdGVwYXBlcl9faW5mbycpLFxyXG4gICAgICBnZXRFbGVtZW50KCcud2hpdGVwYXBlcl9fYnV0dG9uJyksXHJcbiAgICAgIGdldEVsZW1lbnQoJy5haXJkcm9wX190aXRsZScpLFxyXG4gICAgICBnZXRFbGVtZW50KCcuYWlyZHJvcF9faW5mbycpLFxyXG4gICAgICBnZXRFbGVtZW50KCcuYWlyZHJvcF9fYWRkaXRpb25hbC1pbmZvJyksXHJcbiAgICAgIGdldEVsZW1lbnQoJy5yZWxlYXNlX190aXRsZScpLFxyXG4gICAgICBnZXRFbGVtZW50KCcuYWlyZHJvcF9fdGFibGUgLnRhYmxlX19jb2x1bW4tLTEnKSxcclxuICAgICAgZ2V0RWxlbWVudCgnLmFpcmRyb3BfX3RhYmxlIC50YWJsZV9fY29sdW1uLS0yJyksXHJcbiAgICAgIGdldEVsZW1lbnQoJy5yZWxlYXNlIC50YWJsZV9faGVhZGVyIC50YWJsZV9fY29sdW1uJyksXHJcbiAgICAgIGdldEVsZW1lbnQoJy5yZWxlYXNlIC50YWJsZV9fcm93LS0xIC50YWJsZV9fY29sdW1uLS0yJyksXHJcbiAgICAgIGdldEVsZW1lbnQoJy5yZWxlYXNlIC50YWJsZV9fcm93LS0xIC50YWJsZV9fY29sdW1uLS0zJyksXHJcbiAgICAgIGdldEVsZW1lbnQoJy5yZWxlYXNlIC50YWJsZV9fcm93LS0yIC50YWJsZV9fY29sdW1uLS0xJyksXHJcbiAgICAgIGdldEVsZW1lbnQoJy5yZWxlYXNlIC50YWJsZV9fcm93LS0zIC50YWJsZV9fY29sdW1uLS0xJyksXHJcbiAgICAgIGdldEVsZW1lbnQoJy5yZWxlYXNlIC50YWJsZV9fcm93LS00IC50YWJsZV9fY29sdW1uLS0xJyksXHJcbiAgICAgIGdldEVsZW1lbnQoJy5yZWxlYXNlIC50YWJsZV9fcm93LS01IC50YWJsZV9fY29sdW1uLS0xJyksXHJcbiAgICAgIGdldEVsZW1lbnQoJy5yZWxlYXNlIC50YWJsZV9fcm93LS02IC50YWJsZV9fY29sdW1uLS0xJyksXHJcbiAgICAgIGdldEVsZW1lbnQoJy5yZWxlYXNlIC50YWJsZV9fcm93LS03IC50YWJsZV9fY29sdW1uLS0xJyksXHJcbiAgICAgIGdldEVsZW1lbnQoJy5mb3ItbWluZXJzX190aXRsZScpLFxyXG4gICAgICBnZXRFbGVtZW50KCcuZm9yLW1pbmVyc19faW5mbycpLFxyXG4gICAgICBnZXRFbGVtZW50KCcuZm9yLW1pbmVyc19fcmlnaHQgLmxpc3RfX2l0ZW0tLTEgLnRleHQnKSxcclxuICAgICAgZ2V0RWxlbWVudCgnLmZvci1taW5lcnNfX3JpZ2h0IC5saXN0X19pdGVtLS0xIC5jb2lucycpLFxyXG4gICAgICBnZXRFbGVtZW50KCcuZm9yLW1pbmVyc19fcmlnaHQgLmxpc3RfX2l0ZW0tLTIgLnRleHQnKSxcclxuICAgICAgZ2V0RWxlbWVudCgnLmZvci1taW5lcnNfX3JpZ2h0IC5saXN0X19pdGVtLS0yIC5jb2lucycpLFxyXG4gICAgICBnZXRFbGVtZW50KCcuZm9yLW1pbmVyc19fcmlnaHQgLmxpc3RfX2l0ZW0tLTMgLnRleHQnKSxcclxuICAgICAgZ2V0RWxlbWVudCgnLmZvci1taW5lcnNfX3JpZ2h0IC5saXN0X19pdGVtLS0zIC5jb2lucycpLFxyXG4gICAgICBnZXRFbGVtZW50KCcuZm9yLW1pbmVyc19fcmlnaHQgLmxpc3RfX2l0ZW0tLTQgLnRleHQnKSxcclxuICAgICAgZ2V0RWxlbWVudCgnLmZvci1taW5lcnNfX3JpZ2h0IC5saXN0X19pdGVtLS00IC5jb2lucycpLFxyXG4gICAgICBnZXRFbGVtZW50KCcucm9hZC1tYXBfX3RpdGxlJyksXHJcbiAgICAgIGdldEVsZW1lbnQoJy5yb2FkLW1hcCAucGxhbi0tMScpLFxyXG4gICAgICBnZXRFbGVtZW50KCcucm9hZC1tYXAgLnBsYW4tLTInKSxcclxuICAgICAgZ2V0RWxlbWVudCgnLnJvYWQtbWFwIC5wbGFuLS0zJyksXHJcbiAgICAgIGdldEVsZW1lbnQoJy5yb2FkLW1hcCAucGxhbi0tNCcpLFxyXG4gICAgICBnZXRFbGVtZW50KCcucm9hZC1tYXAgLnBsYW4tLTUnKSxcclxuICAgICAgZ2V0RWxlbWVudCgnLmV4Y2hhbmdlc19fdGl0bGUnKSxcclxuICAgICAgZ2V0RWxlbWVudCgnLnN1cHBvcnRfX3RpdGxlJyksXHJcbiAgICAgIGdldEVsZW1lbnQoJy5zdXBwb3J0X19pbmZvJyksXHJcbiAgICAgIGdldEVsZW1lbnQoJy5yZXNlYXJjaF9fdGl0bGUnKSxcclxuICAgICAgZ2V0RWxlbWVudCgnLnJlc2VhcmNoX19pdGVtcyAuaXRlbS0tMSAuaXRlbV9fdGl0bGUnKSxcclxuICAgICAgZ2V0RWxlbWVudCgnLnJlc2VhcmNoX19pdGVtcyAuaXRlbS0tMiAuaXRlbV9fdGl0bGUnKSxcclxuICAgICAgZ2V0RWxlbWVudCgnLnJlc2VhcmNoX19pdGVtcyAuaXRlbS0tMyAuaXRlbV9fdGl0bGUnKSxcclxuICAgICAgZ2V0RWxlbWVudCgnLnJlc2VhcmNoX19pdGVtcyAuaXRlbS0tNCAuaXRlbV9fdGl0bGUnKSxcclxuICAgICAgZ2V0RWxlbWVudCgnLmZvb3RlciAuZGV2ZWxvcGVkLWJ5JyksXHJcbiAgICAgIGdldEVsZW1lbnQoJy5mb290ZXJfX2l0ZW0tLWVtYWlsJyksXHJcbiAgICAgIGdldEVsZW1lbnQoJy5mb290ZXJfX2l0ZW0tLWZvbGxvdy11cycpLFxyXG4gICAgXTtcclxuXHJcbiAgICBpZiAobGFuZyAhPT0gJ0VORycpIHtcclxuICAgICAgc2V0Q29udGVudCh0ZXh0RWxlbWVudHMsIGtvcmVhbkRhdGEpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGdldEVsZW1lbnQoY2xhc3NOYW1lKSB7XHJcbiAgICAgIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGNsYXNzTmFtZSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gc2V0Q29udGVudChlbGVtZW50cywgY29udGVudCkge1xyXG4gICAgICBlbGVtZW50cy5mb3JFYWNoKChlbCwgaW5kZXgpID0+IHtcclxuICAgICAgICBjb25zdCBjb250ID0gY29udGVudFtpbmRleF07XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICogSDIgZGF0YVxyXG4gICAgICAgICAgICovXHJcbiAgICAgICAgICBpZiAoZWwuaGFzQXR0cmlidXRlKCdkYXRhLXRpdGxlJykpIHtcclxuICAgICAgICAgICAgZWwuaW5uZXJIVE1MID0gY29udDtcclxuICAgICAgICAgICAgZWwuc2V0QXR0cmlidXRlKCdkYXRhLXRpdGxlJywgY29udCk7XHJcbiAgICAgICAgICB9IFxyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICogUGxhbiBsaW5lcyBkYXRhXHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgZWxzZSBpZiAoZWwuY2xhc3NMaXN0LmNvbnRhaW5zKCdwbGFuJykpIHtcclxuICAgICAgICAgICAgZWwuc2V0QXR0cmlidXRlKCdkYXRhLXBsYW4tZGVzY3JpcHRpb24nLCBjb250KTtcclxuICAgICAgICAgIH0gXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBUaW1lciBkYXRhXHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICBlbHNlIGlmIChlbC5oYXNBdHRyaWJ1dGUoJ2RhdGEtbmFtZScpKSB7XHJcbiAgICAgICAgICAgIGVsLnNldEF0dHJpYnV0ZSgnZGF0YS1uYW1lJywgY29udCk7XHJcbiAgICAgICAgICB9IFxyXG4gICAgICAgICAgZWxzZSBpZiAoY29udCAhPT0gJycpIHtcclxuICAgICAgICAgICAgZWwuaW5uZXJIVE1MID0gY29udDtcclxuICAgICAgICAgIH0gXHJcbiAgICAgICAgfSBjYXRjaChlKSB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZygnRXJyb3IgZWxlbWVudCBpbmRleCA6JywgaW5kZXgpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG59KTtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zY3JpcHRzL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ3RDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Iiwic291cmNlUm9vdCI6IiJ9