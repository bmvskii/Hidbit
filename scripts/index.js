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
	  
	  basicInit();
	  addLanguageButtonsEventListeners();

	  function basicInit() {
	    initWayPointsInteraction();
	    
	    if (isMobile()) {
	      initMobilePopupInteraction();
	    } else {
	      initDesktopPopupInteraction();
	    }
	    
	    initTimer();
	  }

	  function init() {
	    addEventListeners();
	    
	    initSlider();
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
	    
	    if (!isDesktop()) {
	      unfreezeDocument();
	    }

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
	      const howItWorksSection = document.querySelector('.how-it-works');
	      howItWorksSection.classList.remove('opacify');

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

	  function isMac() {
	    return navigator.platform.match(/(Mac|iPhone|iPod|iPad)/i) ? true : false;
	  }

	  function addLanguageButtonsEventListeners() {
	    const languageButtons = document.querySelector(
	      ".chose-language__languages"
	    );
	    
	    showLanguageChoseMenu();
	    freezeDocument();

	    languageButtons.addEventListener("click", event => {
	      const KOREAN = "chose-language__language--korean";
	      const clickedButton = event.target;

	      clickedButton.classList.remove('showed');

	      if (clickedButton.classList.contains(KOREAN)) {
	        translateToKorean("KOR");
	        document.body.classList.add('kor');
	        
	      }

	      hideLanguageChoseMenu();

	      if (!isMobile() && !isMac()) {
	        initAnimations();
	      } else {
	        showIcons();
	      }

	      init();
	    });

	    function showLanguageChoseMenu() {
	      document.body.classList.add('preloader');
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

	      setTimeout(() => {
	        removeLoader();
	        document.body.classList.remove('preloader');
	        window.scrollTo(0,0);
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
	      getElement('.card--2 .card__info'),
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZTU0MDRhNzZlMzcxOWJhMTRiNmUiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvc2NyaXB0cy9cIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBlNTQwNGE3NmUzNzE5YmExNGI2ZSIsImRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsICgpID0+IHtcclxuICAvKipcclxuICAgKiBSZW1vdmUgdGhlIGxvYWRlciB3aGVuIGFsbCBzY3JpcHQgaGF2ZSBiZWVuIGxvYWRlZFxyXG4gICAqL1xyXG4gIFxyXG4gIGJhc2ljSW5pdCgpO1xyXG4gIGFkZExhbmd1YWdlQnV0dG9uc0V2ZW50TGlzdGVuZXJzKCk7XHJcblxyXG4gIGZ1bmN0aW9uIGJhc2ljSW5pdCgpIHtcclxuICAgIGluaXRXYXlQb2ludHNJbnRlcmFjdGlvbigpO1xyXG4gICAgXHJcbiAgICBpZiAoaXNNb2JpbGUoKSkge1xyXG4gICAgICBpbml0TW9iaWxlUG9wdXBJbnRlcmFjdGlvbigpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaW5pdERlc2t0b3BQb3B1cEludGVyYWN0aW9uKCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGluaXRUaW1lcigpO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gaW5pdCgpIHtcclxuICAgIGFkZEV2ZW50TGlzdGVuZXJzKCk7XHJcbiAgICBcclxuICAgIGluaXRTbGlkZXIoKTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGluaXRXYXlQb2ludHNJbnRlcmFjdGlvbigpIHtcclxuICAgIGxldCByb2FkTWFwUmVhY2hlZCA9IGZhbHNlO1xyXG4gICAgbGV0IG5vdGVib29rUmVhY2hlZCA9IGZhbHNlO1xyXG4gICAgbGV0IHN1cHBvcnRSZWFjaGVkID0gZmFsc2U7XHJcbiAgICBsZXQgYWlyRHJvcFJlYWNoZWQgPSBmYWxzZTtcclxuXHJcbiAgICBsZXQgcm9hZG1hcCA9IG5ldyBXYXlwb2ludCh7XHJcbiAgICAgIGVsZW1lbnQ6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucm9hZC1tYXBcIiksXHJcbiAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmICghcm9hZE1hcFJlYWNoZWQpIHtcclxuICAgICAgICAgIHJvYWRNYXBSZWFjaGVkID0gdHJ1ZTtcclxuICAgICAgICAgIGNvbnN0IHJvYWRMaW5lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5yb2FkLW1hcF9fbGluZVwiKTtcclxuICAgICAgICAgIGNvbnN0IHBsYW5MaW5lcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucGxhbl9fcm9hZC1saW5lXCIpO1xyXG4gICAgICAgICAgY29uc3QgcGxhbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnBsYW5cIik7XHJcbiAgICAgICAgICBjb25zdCBjaXJjbGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5wbGFuX19jaXJjbGVcIik7XHJcblxyXG4gICAgICAgICAgcm9hZExpbmUuY2xhc3NMaXN0LmFkZChcInNob3dlZFwiKTtcclxuICAgICAgICAgIGNvbnN0IGRlbGF5ID0gNTAwO1xyXG5cclxuICAgICAgICAgIHBsYW5MaW5lcy5mb3JFYWNoKChwbCwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgX2RlbGF5ID0gZGVsYXkgKyAxMDAgKiBpbmRleDtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgcGwuY2xhc3NMaXN0LmFkZChcInNob3dlZFwiKTtcclxuICAgICAgICAgICAgICBjaXJjbGVzW2luZGV4XS5jbGFzc0xpc3QuYWRkKFwic2hvd2VkXCIpO1xyXG4gICAgICAgICAgICAgIHBsYW5zW2luZGV4XS5jbGFzc0xpc3QuYWRkKFwic2hvd2VkXCIpO1xyXG4gICAgICAgICAgICB9LCBfZGVsYXkpO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgICBvZmZzZXQ6IFwiNDAlXCJcclxuICAgIH0pO1xyXG5cclxuICAgIGxldCBub3RlYm9vayA9IG5ldyBXYXlwb2ludCh7XHJcbiAgICAgIGVsZW1lbnQ6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIud2hpdGVwYXBlclwiKSxcclxuICAgICAgaGFuZGxlcjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKCFub3RlYm9va1JlYWNoZWQpIHtcclxuICAgICAgICAgIG5vdGVib29rUmVhY2hlZCA9IHRydWU7XHJcbiAgICAgICAgICBjb25zdCB0cmlnZ2VyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJub3RlYm9va1wiKTtcclxuICAgICAgICAgIGNvbnN0IHRyaWdnZXJBbmltYXRpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1haW5cIik7XHJcblxyXG4gICAgICAgICAgaWYgKCFpc01vYmlsZSgpKSB7XHJcbiAgICAgICAgICAgIHRyaWdnZXIuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoXCJjbGlja1wiKSk7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgdHJpZ2dlckFuaW1hdGlvbi5yZW1vdmVBdHRyaWJ1dGUoXCJiZWdpblwiKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICAgIG9mZnNldDogXCIxMDAlXCJcclxuICAgIH0pO1xyXG5cclxuICAgIGxldCBzdXBwb3J0ID0gbmV3IFdheXBvaW50KHtcclxuICAgICAgZWxlbWVudDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zdXBwb3J0XCIpLFxyXG4gICAgICBoYW5kbGVyOiBmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAoIXN1cHBvcnRSZWFjaGVkKSB7XHJcbiAgICAgICAgICBzdXBwb3J0UmVhY2hlZCA9IHRydWU7XHJcbiAgICAgICAgICBjb25zdCB0cmlnZ2VyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNsYW5kLXBhcnRzXCIpO1xyXG4gICAgICAgICAgY29uc3QgdHJpZ2dlckFuaW1hdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbGFuZC1wYXJ0cy1hbmltXCIpO1xyXG5cclxuICAgICAgICAgIGlmICghaXNNb2JpbGUoKSkge1xyXG4gICAgICAgICAgICBhbmltYXRlTWFwKCk7XHJcbiAgICAgICAgICAgIHRyaWdnZXIuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoXCJjbGlja1wiKSk7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgdHJpZ2dlckFuaW1hdGlvbi5yZW1vdmVBdHRyaWJ1dGUoXCJiZWdpblwiKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICAgIG9mZnNldDogXCI0MCVcIlxyXG4gICAgfSk7XHJcblxyXG4gICAgbGV0IGFpcmRyb3AgPSBuZXcgV2F5cG9pbnQoe1xyXG4gICAgICBlbGVtZW50OiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFpcmRyb3BcIiksXHJcbiAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmICghYWlyRHJvcFJlYWNoZWQpIHtcclxuICAgICAgICAgIGFpckRyb3BSZWFjaGVkID0gdHJ1ZTtcclxuICAgICAgICAgIGNvbnN0IHRyaWdnZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NyeXB0b1wiKTtcclxuICAgICAgICAgIGNvbnN0IHRyaWdnZXJBbmltYXRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NyeXB0by1hbmltXCIpO1xyXG5cclxuICAgICAgICAgIGlmICghaXNNb2JpbGUoKSkge1xyXG4gICAgICAgICAgICBhbmltYXRlQ3J5cHRvTWFjaGluZSgpO1xyXG4gICAgICAgICAgICB0cmlnZ2VyLmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KFwiY2xpY2tcIikpO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIHRyaWdnZXJBbmltYXRpb24ucmVtb3ZlQXR0cmlidXRlKFwiYmVnaW5cIik7XHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgICBvZmZzZXQ6IFwiMTAwJVwiXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGlzTW9iaWxlKCkge1xyXG4gICAgcmV0dXJuIHdpbmRvdy5pbm5lcldpZHRoIDw9IDY1MDtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGluaXRUaW1lcih5ZWFyLCBtb250aCwgd2VlaywgZGF5KSB7XHJcbiAgICBjb25zdCB0aW1lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGltZXJcIik7XHJcbiAgICBjb25zdCBkYXlzID0gdGltZXIucXVlcnlTZWxlY3RvcihcIi50aW1lcl9fZGF5c1wiKTtcclxuICAgIGNvbnN0IG1pbnMgPSB0aW1lci5xdWVyeVNlbGVjdG9yKFwiLnRpbWVyX19taW51dGVzXCIpO1xyXG4gICAgY29uc3Qgc2VjcyA9IHRpbWVyLnF1ZXJ5U2VsZWN0b3IoXCIudGltZXJfX3NlY29uZHNcIik7XHJcbiAgICBjb25zdCBob3VycyA9IHRpbWVyLnF1ZXJ5U2VsZWN0b3IoXCIudGltZXJfX2hvdXJzXCIpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogSW5pdGlhbGl6YXRpb25cclxuICAgICAqL1xyXG5cclxuICAgIGRheXMuaW5uZXJIVE1MID0gd3JhcFdpdGhaZXJvKDE1KTtcclxuICAgIG1pbnMuaW5uZXJIVE1MID0gd3JhcFdpdGhaZXJvKDApO1xyXG4gICAgc2Vjcy5pbm5lckhUTUwgPSB3cmFwV2l0aFplcm8oMCk7XHJcbiAgICBob3Vycy5pbm5lckhUTUwgPSB3cmFwV2l0aFplcm8oMCk7XHJcblxyXG4gICAgc2V0SW50ZXJ2YWwoZGVjcmVhc2UsIDEwMDApO1xyXG5cclxuICAgIGZ1bmN0aW9uIGRlY3JlYXNlKCkge1xyXG4gICAgICBjb25zdCB0aW1lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGltZXJcIik7XHJcbiAgICAgIGNvbnN0IGRheXMgPSB0aW1lci5xdWVyeVNlbGVjdG9yKFwiLnRpbWVyX19kYXlzXCIpO1xyXG4gICAgICBjb25zdCBtaW5zID0gdGltZXIucXVlcnlTZWxlY3RvcihcIi50aW1lcl9fbWludXRlc1wiKTtcclxuICAgICAgY29uc3Qgc2VjcyA9IHRpbWVyLnF1ZXJ5U2VsZWN0b3IoXCIudGltZXJfX3NlY29uZHNcIik7XHJcbiAgICAgIGNvbnN0IGhvdXJzID0gdGltZXIucXVlcnlTZWxlY3RvcihcIi50aW1lcl9faG91cnNcIik7XHJcblxyXG4gICAgICBsZXQgcyA9ICtzZWNzLmlubmVySFRNTCxcclxuICAgICAgICBtID0gK21pbnMuaW5uZXJIVE1MLFxyXG4gICAgICAgIGggPSAraG91cnMuaW5uZXJIVE1MLFxyXG4gICAgICAgIGQgPSArZGF5cy5pbm5lckhUTUw7XHJcblxyXG4gICAgICBpZiAocyA+IDApIC0tcztcclxuXHJcbiAgICAgIGlmIChzID09PSAwKSB7XHJcbiAgICAgICAgcyA9IDU5O1xyXG4gICAgICAgIGlmIChtID4gMCkgbS0tO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChtID09PSAwKSB7XHJcbiAgICAgICAgbSA9IDU5O1xyXG4gICAgICAgIGlmIChoID4gMCkgaC0tO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChoID09PSAwKSB7XHJcbiAgICAgICAgaCA9IDIzO1xyXG4gICAgICAgIGlmIChkID4gMCkgZC0tO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBzZWNzLmlubmVySFRNTCA9IHM7XHJcbiAgICAgIG1pbnMuaW5uZXJIVE1MID0gbTtcclxuICAgICAgaG91cnMuaW5uZXJIVE1MID0gaDtcclxuICAgICAgZGF5cy5pbm5lckhUTUwgPSBkO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHdyYXBXaXRoWmVybyhzdHJpbmcpIHtcclxuICAgICAgc3RyaW5nID0gc3RyaW5nICsgXCJcIjtcclxuXHJcbiAgICAgIGlmIChzdHJpbmcubGVuZ3RoIDwgMikge1xyXG4gICAgICAgIHN0cmluZyA9IFwiMFwiICsgc3RyaW5nO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBzdHJpbmc7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBoaWRlQ3J5cHRvTWFjaGluZUVsZW1lbnRzKCkge1xyXG4gICAgY29uc3QgY3J5cHRvID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjcnlwdG9cIik7XHJcbiAgICBjcnlwdG8uc2V0QXR0cmlidXRlKFwib3BhY2l0eVwiLCBcIjBcIik7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBoaWRlTm90ZWJvb2tFbGVtZW50cygpIHtcclxuICAgIGNvbnN0IG5vdGVib29rID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJub3RlYm9va1wiKTtcclxuICAgIGNvbnN0IHBhZ2VzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIltpZF49J3BhZ2UnXVwiKTtcclxuICAgIGNvbnN0IHVuZGVybGF5ZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxheWVyLTFcIik7XHJcblxyXG4gICAgcGFnZXMuZm9yRWFjaChwYWdlID0+IHBhZ2Uuc2V0QXR0cmlidXRlKFwib3BhY2l0eVwiLCBcIjBcIikpO1xyXG4gICAgbm90ZWJvb2suc2V0QXR0cmlidXRlKFwib3BhY2l0eVwiLCBcIjBcIik7XHJcbiAgICB1bmRlcmxheWVyLnNldEF0dHJpYnV0ZShcIm9wYWNpdHlcIiwgXCIwXCIpO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gaW5pdFNsaWRlcigpIHtcclxuICAgIGlmIChpc01vYmlsZSgpKSB7XHJcbiAgICAgICQoXCIuaG93LWl0LXdvcmtzX19jYXJkc1wiKS5vd2xDYXJvdXNlbCh7XHJcbiAgICAgICAgaXRlbXM6IDEsXHJcbiAgICAgICAgbWFyZ2luOiAzMCxcclxuICAgICAgICBwYWRkaW5nOiAzMFxyXG4gICAgICB9KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICQoXCIuaG93LWl0LXdvcmtzX19jYXJkc1wiKS50cmlnZ2VyKFwiZGVzdHJveS5vd2wuY2Fyb3VzZWxcIik7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBhbmltYXRlTWFwKCkge1xyXG4gICAgY29uc3QgZG90cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZG90c1wiKTtcclxuXHJcbiAgICBBcnJheS5mcm9tKGRvdHMuY2hpbGROb2RlcykuZm9yRWFjaChkb3QgPT4ge1xyXG4gICAgICBjb25zdCBwYXRoID0gZG90LnF1ZXJ5U2VsZWN0b3IoXCJwYXRoXCIpO1xyXG4gICAgICBwYXRoLnNldEF0dHJpYnV0ZShcIm9wYWNpdHlcIiwgXCIxXCIpO1xyXG4gICAgICBwYXRoLmlubmVySFRNTCA9IGNyZWF0ZUFuaW1hdGlvbkVsZW1lbnQoXCJhbmltYXRlXCIsIHtcclxuICAgICAgICBcInhsaW5rOmhyZWZcIjogXCIjXCIgKyBwYXRoLmlkLFxyXG4gICAgICAgIGF0dHJpYnV0ZU5hbWU6IFwib3BhY2l0eVwiLFxyXG4gICAgICAgIGR1cjogYCR7TWF0aC5yYW5kb20oKSAqIDIgKyAwLjV9c2AsXHJcbiAgICAgICAgZnJvbTogXCIxXCIsXHJcbiAgICAgICAgdG86IFwiMFwiLFxyXG4gICAgICAgIHJlcGVhdENvdW50OiBcImluZGVmaW5pdGVcIixcclxuICAgICAgICBiZWdpbjogXCJkb3RzLWFuaW0uZW5kICsgLjJzXCJcclxuICAgICAgfSkub3V0ZXJIVE1MO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBoaWRlTWFwRWxlbWVudHMoKSB7XHJcbiAgICBjb25zdCBsaW5lcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbGluZXNcIik7XHJcbiAgICBjb25zdCBkb3RzID0gbWFwLnF1ZXJ5U2VsZWN0b3IoXCIuZG90c1wiKTtcclxuICAgIGNvbnN0IGxhbmRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNsYW5kLXBhcnRzXCIpO1xyXG5cclxuICAgIGxpbmVzLnNldEF0dHJpYnV0ZShcIm9wYWNpdHlcIiwgXCIxXCIpO1xyXG4gICAgZG90cy5zZXRBdHRyaWJ1dGUoXCJvcGFjaXR5XCIsIFwiMVwiKTtcclxuICAgIGxhbmRzLnNldEF0dHJpYnV0ZShcIm9wYWNpdHlcIiwgXCIxXCIpO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gY3JlYXRlQW5pbWF0aW9uRWxlbWVudChhbmltYXRpb25FbGVtZW50LCBjb25maWcpIHtcclxuICAgIGlmICghY29uZmlnKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBhbmltYXRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGFuaW1hdGlvbkVsZW1lbnQpO1xyXG4gICAgZm9yIChsZXQgb3B0aW9uIGluIGNvbmZpZykge1xyXG4gICAgICBhbmltYXRpb24uc2V0QXR0cmlidXRlKG9wdGlvbiwgY29uZmlnW29wdGlvbl0pO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBhbmltYXRpb247XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBhbmltYXRlQ3J5cHRvTWFjaGluZSgpIHtcclxuICAgIGNvbnN0IGNyeXB0b01hY2hpbmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NyeXB0b1wiKTtcclxuXHJcbiAgICBjb25zdCBjaXJjbGVzID0gY3J5cHRvTWFjaGluZS5xdWVyeVNlbGVjdG9yQWxsKFwiLmNpcmNsZVwiKTtcclxuICAgIGNvbnN0IHN1YnN0cmF0ZXMgPSBjcnlwdG9NYWNoaW5lLnF1ZXJ5U2VsZWN0b3JBbGwoXCIuc3Vic3RyYXRlXCIpO1xyXG5cclxuICAgIGluaXRBbmltYXRlZExpbmVzKGNyeXB0b01hY2hpbmUpO1xyXG5cclxuICAgIHN1YnN0cmF0ZXMuZm9yRWFjaCgoc3Vic3RyYXRlLCBpbmRleCkgPT4ge1xyXG4gICAgICBzdWJzdHJhdGUuc2V0QXR0cmlidXRlKFwiaWRcIiwgYHN1YnN0cmF0ZS0ke2luZGV4fWApO1xyXG4gICAgICBzdWJzdHJhdGUuc2V0QXR0cmlidXRlKFwib3BhY2l0eVwiLCBcIjBcIik7XHJcbiAgICAgIGNvbnN0IGFuaW1hdGlvbiA9IGNyZWF0ZUFuaW1hdGlvbkVsZW1lbnQoXCJhbmltYXRlXCIsIHtcclxuICAgICAgICBcInhsaW5rOmhyZWZcIjogYCNzdWJzdHJhdGUtJHtpbmRleH1gLFxyXG4gICAgICAgIGF0dHJpYnV0ZU5hbWU6IFwib3BhY2l0eVwiLFxyXG4gICAgICAgIGR1cjogYDJzYCxcclxuICAgICAgICBmcm9tOiBcIjBcIixcclxuICAgICAgICB0bzogXCIxXCIsXHJcbiAgICAgICAgYmVnaW46IFwiY3J5cHRvLWFuaW0uZW5kICsgLjVzXCIsXHJcbiAgICAgICAgZmlsbDogXCJmcmVlemVcIlxyXG4gICAgICB9KTtcclxuICAgICAgYWRkQW5pbWF0aW9uVG9TdmdFbGVtZW50KHN1YnN0cmF0ZSwgYW5pbWF0aW9uKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGNpcmNsZXMuZm9yRWFjaCgoY2lyY2xlLCBpbmRleCkgPT4ge1xyXG4gICAgICBjaXJjbGUuc2V0QXR0cmlidXRlKFwiaWRcIiwgYGNpcmNsZS0ke2luZGV4fWApO1xyXG4gICAgICBjaXJjbGUuc2V0QXR0cmlidXRlKFwib3BhY2l0eVwiLCBcIjBcIik7XHJcbiAgICAgIGNvbnN0IGFuaW1hdGlvbiA9IGNyZWF0ZUFuaW1hdGlvbkVsZW1lbnQoXCJhbmltYXRlXCIsIHtcclxuICAgICAgICBcInhsaW5rOmhyZWZcIjogYCNjaXJjbGUtJHtpbmRleH1gLFxyXG4gICAgICAgIGF0dHJpYnV0ZU5hbWU6IFwib3BhY2l0eVwiLFxyXG4gICAgICAgIGR1cjogYCR7TWF0aC5yYW5kb20oKSAqIDMgKyAxfXNgLFxyXG4gICAgICAgIHZhbHVlczogXCIuNTsgLjY7IDE7IC43OyAuNFwiLFxyXG4gICAgICAgIGJlZ2luOiBcImNyeXB0by1hbmltLmVuZCArIC41c1wiLFxyXG4gICAgICAgIHJlcGVhdENvdW50OiBcImluZGVmaW5pdGVcIlxyXG4gICAgICB9KTtcclxuICAgICAgYWRkQW5pbWF0aW9uVG9TdmdFbGVtZW50KGNpcmNsZSwgYW5pbWF0aW9uKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gaW5pdEFuaW1hdGVkTGluZXMocm9vdCkge1xyXG4gICAgY3JlYXRlQW5pbWF0ZWRMaW5lKFwiI2xpbmUtMVwiLCAwLjAwMSwgMTApO1xyXG4gICAgY3JlYXRlQW5pbWF0ZWRMaW5lKFwiI2xpbmUtMlwiLCAwLjEsIDIwKTtcclxuICAgIGNyZWF0ZUFuaW1hdGVkTGluZShcIiNsaW5lLTNcIiwgMC4yLCA1MCk7XHJcbiAgICBjcmVhdGVBbmltYXRlZExpbmUoXCIjbGluZS00XCIsIDAuMywgNTApO1xyXG4gICAgY3JlYXRlQW5pbWF0ZWRMaW5lKFwiI2xpbmUtNVwiLCAwLjQsIDQwKTtcclxuICAgIGNyZWF0ZUFuaW1hdGVkTGluZShcIiNsaW5lLTZcIiwgMC41LCAxMCk7XHJcblxyXG4gICAgZnVuY3Rpb24gY3JlYXRlQW5pbWF0ZWRMaW5lKGxpbmVJZCwgZGVsYXksIG1vdmluZ0hlaWdodCkge1xyXG4gICAgICBjb25zdCBsaW5lID0gcm9vdC5xdWVyeVNlbGVjdG9yKGxpbmVJZCk7XHJcbiAgICAgIGNvbnN0IGxpbmVBbmltYXRpb25Db25maWcgPSBjcmVhdGVBbmltYXRpb25FbGVtZW50KFwiYW5pbWF0ZVRyYW5zZm9ybVwiLCB7XHJcbiAgICAgICAgYXR0cmlidXRlTmFtZTogXCJ0cmFuc2Zvcm1cIixcclxuICAgICAgICBkdXI6IGAyc2AsXHJcbiAgICAgICAgYmVnaW46IGBjcnlwdG8tYW5pbS5lbmQgKyAke2RlbGF5fXNgLFxyXG4gICAgICAgIHR5cGU6IFwidHJhbnNsYXRlXCIsXHJcbiAgICAgICAgdmFsdWVzOiBgMCAwOyAwIC0ke21vdmluZ0hlaWdodH07IDAgMDsgMCAke21vdmluZ0hlaWdodH07IDAgMDtgLFxyXG4gICAgICAgIHJlcGVhdENvdW50OiBcImluZGVmaW5pdGVcIlxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGFkZEFuaW1hdGlvblRvU3ZnRWxlbWVudChsaW5lLCBsaW5lQW5pbWF0aW9uQ29uZmlnKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGFkZEFuaW1hdGlvblRvU3ZnRWxlbWVudChlbGVtZW50LCBhbmltYXRpb24pIHtcclxuICAgIGVsZW1lbnQuaW5uZXJIVE1MID0gYW5pbWF0aW9uLm91dGVySFRNTDtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGluaXREZXNrdG9wUG9wdXBJbnRlcmFjdGlvbigpIHtcclxuICAgIGxldCBkZWNvcmF0aXZlRnVuY3Rpb24gPSBkZWJvdW5jZShpc01vdXNlT25XaWRnZXQsIDUwKTtcclxuICAgIGxldCBoYXNUYXBwZWQgPSBmYWxzZTtcclxuXHJcbiAgICBkb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW1vdmVcIiwgZGVjb3JhdGl2ZUZ1bmN0aW9uKTtcclxuXHJcbiAgICBmdW5jdGlvbiBpc01vdXNlT25XaWRnZXQoZXZlbnQpIHtcclxuICAgICAgY29uc3QgcG9zWCA9IGV2ZW50LmNsaWVudFgsXHJcbiAgICAgICAgcG9zWSA9IGV2ZW50LmNsaWVudFk7XHJcblxyXG4gICAgICBjb25zdCBwb3B1cCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaG9tZV9fbW9kYWxcIik7XHJcblxyXG4gICAgICBjb25zdCBpc09uV2lkZ2V0ID0gaXNPbkVsZW1lbnQocG9zWCwgcG9zWSwgXCIuaG9tZV9fcmlnaHQgLndpZGdldFwiKTtcclxuICAgICAgY29uc3QgaXNPbkJ1dHRvbiA9IGlzT25FbGVtZW50KHBvc1gsIHBvc1ksIFwiLndpZGdldF9fYnV0dG9uXCIpO1xyXG4gICAgICBjb25zdCBpc09uUG9wdXAgPSBpc09uRWxlbWVudChwb3NYLCBwb3NZLCBcIi5ob21lX19tb2RhbFwiKTtcclxuICAgICAgY29uc3QgaXNPbklucHV0ID0gaXNPbkVsZW1lbnQocG9zWCwgcG9zWSwgXCIud2lkZ2V0X19zbGlkZXJcIik7XHJcblxyXG4gICAgICBpZiAoXHJcbiAgICAgICAgKGlzT25XaWRnZXQgfHwgaXNPblBvcHVwKSAmJlxyXG4gICAgICAgICFpc09uQnV0dG9uICYmXHJcbiAgICAgICAgIWlzT25JbnB1dCAmJlxyXG4gICAgICAgICFoYXNNb3VzZSgpXHJcbiAgICAgICkge1xyXG4gICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZChcIndpZGdldC1vbi1ob3ZlclwiKTtcclxuICAgICAgICBwb3B1cC5jbGFzc0xpc3QuYWRkKFwic2hvd2VkXCIpO1xyXG5cclxuICAgICAgICBpZiAoIWhhc1RhcHBlZCkge1xyXG4gICAgICAgICAgY29uc3QgdGFwTGluZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIud2lkZ2V0X190YXAtbGluZVwiKTtcclxuICAgICAgICAgIHRhcExpbmUuY2xhc3NMaXN0LmFkZChcInRhcHBlZFwiKTtcclxuXHJcbiAgICAgICAgICBoYXNUb3VjaGVkID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29uc3QgZGVsYXkgPSAzMDA7XHJcblxyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QucmVtb3ZlKFwid2lkZ2V0LW9uLWhvdmVyXCIpO1xyXG4gICAgICAgICAgcG9wdXAuY2xhc3NMaXN0LnJlbW92ZShcInNob3dlZFwiKTtcclxuICAgICAgICB9LCBkZWxheSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGlzT25FbGVtZW50KHBvc1gsIHBvc1ksIGVsZW1lbnRUYWcpIHtcclxuICAgIGNvbnN0IGVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihlbGVtZW50VGFnKTtcclxuICAgIGNvbnN0IGVsUG9zSW5mbyA9IGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG5cclxuICAgIGNvbnN0IGVsX3gxID0gZWxQb3NJbmZvLng7XHJcbiAgICBjb25zdCBlbF95MSA9IGVsUG9zSW5mby55O1xyXG4gICAgY29uc3QgZWxfeDIgPSBlbF94MSArIGVsUG9zSW5mby53aWR0aDtcclxuICAgIGNvbnN0IGVsX3kyID0gZWxfeTEgKyBlbFBvc0luZm8uaGVpZ2h0O1xyXG5cclxuICAgIHJldHVybiBwb3NYID49IGVsX3gxICYmIHBvc1ggPD0gZWxfeDIgJiYgcG9zWSA+PSBlbF95MSAmJiBwb3NZIDw9IGVsX3kyO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gc2hvd1BvcHVwKCkge1xyXG4gICAgY29uc3QgcG9wdXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmhvbWVfX21vZGFsXCIpO1xyXG5cclxuICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZChcIndpZGdldC1vbi1ob3ZlclwiKTtcclxuICAgIHBvcHVwLmNsYXNzTGlzdC5hZGQoXCJzaG93ZWRcIik7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBoaWRlV2lkZ2V0KCkge1xyXG4gICAgY29uc3Qgd2lkZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5ob21lX19yaWdodCAud2lkZ2V0XCIpO1xyXG4gICAgd2lkZ2V0LmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBpbml0TW9iaWxlUG9wdXBJbnRlcmFjdGlvbigpIHtcclxuICAgIGxldCB0b3VjaHN0YXJ0WCA9IDA7XHJcbiAgICBsZXQgdG91Y2hzdGFydFkgPSAwO1xyXG4gICAgbGV0IHRvdWNoZW5kWCA9IDA7XHJcbiAgICBsZXQgdG91Y2hlbmRZID0gMDtcclxuXHJcbiAgICBsZXQgaGFzU3dpcGVkID0gZmFsc2U7XHJcblxyXG4gICAgY29uc3QgaG9tZVNlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmhvbWVcIik7XHJcblxyXG4gICAgaG9tZVNlY3Rpb24uYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoc3RhcnRcIiwgc2V0U3RhcnRUb3VjaFZhcmlhYmxlcywgZmFsc2UpO1xyXG4gICAgaG9tZVNlY3Rpb24uYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoZW5kXCIsIHN3aXBlSGFuZGxlciwgZmFsc2UpO1xyXG5cclxuICAgIGhpZGVQb3B1cHNBbmRXaWRnZXRCb3JkZXJCb3R0b20oKTtcclxuXHJcbiAgICBmdW5jdGlvbiBzZXRTdGFydFRvdWNoVmFyaWFibGVzKGV2ZW50KSB7XHJcbiAgICAgIHRvdWNoc3RhcnRYID0gZXZlbnQuY2hhbmdlZFRvdWNoZXNbMF0uc2NyZWVuWDtcclxuICAgICAgdG91Y2hzdGFydFkgPSBldmVudC5jaGFuZ2VkVG91Y2hlc1swXS5zY3JlZW5ZO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGhpZGVQb3B1cHNBbmRXaWRnZXRCb3JkZXJCb3R0b20oKSB7XHJcbiAgICAgIGNvbnN0IHBvcHVwVG9wU2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXHJcbiAgICAgICAgXCIuaG9tZV9fbW9kYWwgLndpZGdldF9fdG9wXCJcclxuICAgICAgKTtcclxuICAgICAgY29uc3Qgd2lkZ2V0VG9wU2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXHJcbiAgICAgICAgXCIuaG9tZV9fcmlnaHQgLndpZGdldF9fdG9wXCJcclxuICAgICAgKTtcclxuXHJcbiAgICAgIHBvcHVwVG9wU2VjdGlvbi5jbGFzc0xpc3QuYWRkKFwibm8tYm9yZGVyXCIpO1xyXG4gICAgICB3aWRnZXRUb3BTZWN0aW9uLmNsYXNzTGlzdC5hZGQoXCJuby1ib3JkZXJcIik7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gc3dpcGVIYW5kbGVyKGV2ZW50KSB7XHJcbiAgICAgIGNvbnN0IHdpZGdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaG9tZV9fcmlnaHQgLndpZGdldFwiKTtcclxuICAgICAgY29uc3QgcG9wdXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmhvbWVfX21vZGFsXCIpO1xyXG5cclxuICAgICAgdG91Y2hlbmRYID0gZXZlbnQuY2hhbmdlZFRvdWNoZXNbMF0uc2NyZWVuWDtcclxuICAgICAgdG91Y2hlbmRZID0gZXZlbnQuY2hhbmdlZFRvdWNoZXNbMF0uc2NyZWVuWTtcclxuICAgICAgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0O1xyXG5cclxuICAgICAgY29uc3QgaXNTd2lwZUlzU2hvcnRlclRoZW5RdWFydGVyID1cclxuICAgICAgICBNYXRoLmFicyh0b3VjaGVuZFggLSB0b3VjaHN0YXJ0WCkgPD0gd2luZG93LmlubmVyV2lkdGggLyA0O1xyXG5cclxuICAgICAgaWYgKGlzU3dpcGVJc1Nob3J0ZXJUaGVuUXVhcnRlcikge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfSBlbHNlIGlmICh0b3VjaGVuZFggPj0gdG91Y2hzdGFydFgpIHtcclxuICAgICAgICBpZiAoaXNVc2VyU3dpcGVXYXNPbldpZGdldCgpKSB7XHJcbiAgICAgICAgICBzaG93UG9wdXAoKTtcclxuICAgICAgICAgIGhpZGVXaWRnZXQoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICghaGFzU3dpcGVkKSB7XHJcbiAgICAgICAgICBjb25zdCBzd2FwTGluZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIud2lkZ2V0X19zd2lwZS1saW5lXCIpO1xyXG4gICAgICAgICAgc3dhcExpbmUuY2xhc3NMaXN0LmFkZChcIndpZGdldF9fc3dpcGUtbGluZS0tbm8tdGl0bGVcIik7XHJcblxyXG4gICAgICAgICAgaGFzU3dpcGVkID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogSGlkZSBwb3B1cFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGlmIChpc1VzZXJTd2lwZVdhc09uV2lkZ2V0KCkpIHtcclxuICAgICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZShcIndpZGdldC1vbi1ob3ZlclwiKTtcclxuICAgICAgICAgIHBvcHVwLmNsYXNzTGlzdC5yZW1vdmUoXCJzaG93ZWRcIik7XHJcbiAgICAgICAgICB3aWRnZXQuY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGZ1bmN0aW9uIGlzVXNlclN3aXBlV2FzT25XaWRnZXQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRhcmdldC5jbG9zZXN0KFwiLndpZGdldFwiKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gZGVib3VuY2UoZiwgbXMpIHtcclxuICAgIGxldCB0aW1lciA9IG51bGw7XHJcblxyXG4gICAgcmV0dXJuIGZ1bmN0aW9uKC4uLmFyZ3MpIHtcclxuICAgICAgY29uc3Qgb25Db21wbGV0ZSA9ICgpID0+IHtcclxuICAgICAgICBmLmFwcGx5KHRoaXMsIGFyZ3MpO1xyXG4gICAgICAgIHRpbWVyID0gbnVsbDtcclxuICAgICAgfTtcclxuXHJcbiAgICAgIGlmICh0aW1lcikge1xyXG4gICAgICAgIGNsZWFyVGltZW91dCh0aW1lcik7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRpbWVyID0gc2V0VGltZW91dChvbkNvbXBsZXRlLCBtcyk7XHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gYWRkRXZlbnRMaXN0ZW5lcnMoKSB7XHJcbiAgICBjb25zdCBzbGlkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNsaWRlclwiKTtcclxuICAgIGNvbnN0IHN1bW1hcnkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLndpZGdldF9fY3VycmVudC1zdW1tYXJ5IC5zdW1tYXJ5XCIpO1xyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIEJpbmQgYSBzbGlkZXIgZGF0YSBjaGFuZ2luZyB3aXRoIGEgdmlld1xyXG4gICAgICovXHJcbiAgICBzbGlkZXIuYWRkRXZlbnRMaXN0ZW5lcihcclxuICAgICAgXCJjaGFuZ2VcIixcclxuICAgICAgZXZlbnQgPT4gKHN1bW1hcnkuaW5uZXJIVE1MID0gZXZlbnQuY3VycmVudFRhcmdldC52YWx1ZSlcclxuICAgICk7XHJcblxyXG4gICAgaWYgKGlzRGVza3RvcCgpICYmIGlzRG9jdW1lbnRGcm96ZW4oKSkge1xyXG4gICAgICBjb25zdCBob3dJdFdvcmtzU2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ob3ctaXQtd29ya3MnKTtcclxuICAgICAgaG93SXRXb3Jrc1NlY3Rpb24uY2xhc3NMaXN0LmFkZCgnb3BhY2lmeScpO1xyXG5cclxuICAgICAgZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyKFwibW91c2V3aGVlbFwiLCBzY3JvbGxUb1NlY3Rpb24sIHtcclxuICAgICAgICBwYXNzaXZlOiB0cnVlXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChpc01vYmlsZSgpKSB7XHJcbiAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIGluaXRTbGlkZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghaXNNb2JpbGUoKSkge1xyXG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCAoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgaGVhZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5oZWFkZXJcIik7XHJcbiAgICAgICAgaWYgKGhlYWRlci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5ib3R0b20gPCB3aW5kb3cucGFnZVlPZmZzZXQpIHtcclxuICAgICAgICAgIGhlYWRlci5jbGFzc0xpc3QuYWRkKFwiZml4ZWRcIik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGhlYWRlci5jbGFzc0xpc3QucmVtb3ZlKFwiZml4ZWRcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICB3aW5kb3cuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoXCJzY3JvbGxcIikpO1xyXG5cclxuICAgIGFkZEJ1dHRvbnNFdmVudExpc3RlbmVycygpO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gaXNEZXNrdG9wKCkge1xyXG4gICAgcmV0dXJuIHdpbmRvdy5pbm5lcldpZHRoID4gMTIwMDtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHNjcm9sbFRvU2VjdGlvbigpIHtcclxuICAgIGNvbnN0IHNjcm9sbE1vdXNlVG8gPSAkKFwiI3Njcm9sbC10b1wiKS5vZmZzZXQoKS50b3A7XHJcbiAgICBjb25zdCBob3dJdFdvcmtzU2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ob3ctaXQtd29ya3MnKTtcclxuICAgIFxyXG4gICAgY29uc3Qgc2Nyb2xsVGltZSA9IDkwMDtcclxuICAgIGNvbnN0IGRlbGF5ID0gNTAwO1xyXG5cclxuICAgIGhvd0l0V29ya3NTZWN0aW9uLmNsYXNzTGlzdC5yZW1vdmUoJ29wYWNpZnknKTtcclxuICAgIGhpZGVNb3VzZSgpO1xyXG4gICAgXHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgdW5mcmVlemVEb2N1bWVudCgpO1xyXG4gICAgICAkKFwiaHRtbCwgZG9jdW1lbnQuYm9keVwiKS5hbmltYXRlKFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIHNjcm9sbFRvcDogc2Nyb2xsTW91c2VUbyxcclxuICAgICAgICAgIGVhc2U6IFwiZWFzZU91dEJhY2tcIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2Nyb2xsVGltZVxyXG4gICAgICApO1xyXG4gICAgfSwgZGVsYXkpO1xyXG5cclxuICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNld2hlZWxcIiwgc2Nyb2xsVG9TZWN0aW9uKTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGlzRG9jdW1lbnRGcm96ZW4oKSB7XHJcbiAgICByZXR1cm4gZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuY29udGFpbnMoXCJuby1zY3JvbGxcIik7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiB1bmZyZWV6ZURvY3VtZW50KCkge1xyXG4gICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QucmVtb3ZlKFwibm8tc2Nyb2xsXCIpO1xyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImh0bWxcIikuY2xhc3NMaXN0LnJlbW92ZShcIm5vLXNjcm9sbFwiKTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHJlbW92ZUxvYWRlcigpIHtcclxuICAgIGNvbnN0IGxvYWRlckhUTUwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNob3NlLWxhbmd1YWdlLXdyYXBwZXJcIik7XHJcbiAgICBjb25zdCBsb2FkZXJTY3JpcHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2xvYWRlci1zY3JpcHRcIik7XHJcbiAgICBjb25zdCBsb2FkZXJMaWIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2xvYWRlci1saWJcIik7XHJcblxyXG4gICAgbG9hZGVyTGliLnJlbW92ZSgpO1xyXG4gICAgbG9hZGVyU2NyaXB0LnJlbW92ZSgpO1xyXG5cclxuICAgIGNvbnN0IHRpbWVUb0xvYWRlckhpZGUgPSAyMDAwO1xyXG4gICAgbG9hZGVySFRNTC5jbGFzc0xpc3QuYWRkKFwicmVtb3ZlZFwiKTtcclxuICAgIFxyXG4gICAgaWYgKCFpc0Rlc2t0b3AoKSkge1xyXG4gICAgICB1bmZyZWV6ZURvY3VtZW50KCk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0VGltZW91dCgoKSA9PiBsb2FkZXJIVE1MLnJlbW92ZSgpLCB0aW1lVG9Mb2FkZXJIaWRlKTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGZyZWV6ZURvY3VtZW50KCkge1xyXG4gICAgY29uc3Qgc2Nyb2xsTW91c2VUbyA9ICQoXCIjc2Nyb2xsLXRvXCIpLm9mZnNldCgpLnRvcDtcclxuICAgIGlmIChcclxuICAgICAgd2luZG93LmlubmVyV2lkdGggPj0gMTIwMCAmJlxyXG4gICAgICAoc2Nyb2xsTW91c2VUbyAqIDEwKSAvIDEwID49IHdpbmRvdy5wYWdlWU9mZnNldFxyXG4gICAgKSB7XHJcbiAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZChcIm5vLXNjcm9sbFwiKTtcclxuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImh0bWxcIikuY2xhc3NMaXN0LmFkZChcIm5vLXNjcm9sbFwiKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnN0IGhvd0l0V29ya3NTZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhvdy1pdC13b3JrcycpO1xyXG4gICAgICBob3dJdFdvcmtzU2VjdGlvbi5jbGFzc0xpc3QucmVtb3ZlKCdvcGFjaWZ5Jyk7XHJcblxyXG4gICAgICBoaWRlTW91c2UoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGhpZGVNb3VzZSgpIHtcclxuICAgIGNvbnN0IG1vdXNlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtb3VzZVwiKTtcclxuICAgIG1vdXNlLmNsYXNzTGlzdC5hZGQoXCJzY2FsZWRcIik7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBoYXNNb3VzZSgpIHtcclxuICAgIHJldHVybiAhZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtb3VzZVwiKS5jbGFzc0xpc3QuY29udGFpbnMoXCJzY2FsZWRcIik7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBhZGRCdXR0b25zRXZlbnRMaXN0ZW5lcnMoKSB7XHJcbiAgICBjb25zdCBidXR0b25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5idXR0b24tLXNjcm9sbC10by10b3BcIik7XHJcbiAgICBidXR0b25zLmZvckVhY2goYnV0dG9uID0+IGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgc2Nyb2xsVG9Ub3ApKTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHNjcm9sbFRvVG9wKCkge1xyXG4gICAgbGV0IHRvID0gMDtcclxuXHJcbiAgICBpZiAoaXNNb2JpbGUoKSkge1xyXG4gICAgICBjb25zdCB3aWRnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmhvbWVfX3JpZ2h0IC53aWRnZXRcIik7XHJcbiAgICAgIGNvbnN0IHdpZGdldEVsZW1lbnREYXRhID0gd2lkZ2V0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG5cclxuICAgICAgdG8gPSB3aWRnZXRFbGVtZW50RGF0YS5oZWlnaHQgLyAyO1xyXG4gICAgfVxyXG5cclxuICAgICQoXCJodG1sLCBkb2N1bWVudC5ib2R5XCIpLmFuaW1hdGUoXHJcbiAgICAgIHtcclxuICAgICAgICBzY3JvbGxUb3A6IHRvLFxyXG4gICAgICAgIGVhc2U6IFwiZWFzZU91dEJhY2tcIlxyXG4gICAgICB9LFxyXG4gICAgICA5MDBcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBpbml0QW5pbWF0aW9ucygpIHtcclxuICAgIC8qKlxyXG4gICAgICogU2V0dXAgeW91ciBMYXp5IExpbmUgZWxlbWVudC5cclxuICAgICAqIHNlZSBSRUFETUUgZmlsZSBmb3IgbW9yZSBzZXR0aW5nc1xyXG4gICAgICovXHJcbiAgICBjb25zdCBhbmltYXRpb25zQ29uZmlnID0ge1xyXG4gICAgICBlYXNlOiBcImVhc2VJblF1YWRcIixcclxuICAgICAgc3Ryb2tlV2lkdGg6IDAuNSxcclxuICAgICAgc3Ryb2tlT3BhY2l0eTogMSxcclxuICAgICAgc3Ryb2tlQ29sb3I6IFwiI2ZmZmZmZlwiXHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IGxvZ29BbmltYXRpb25zQ29uZmlnID0ge1xyXG4gICAgICBlYXNlOiBcImVhc2VJblF1YWRcIixcclxuICAgICAgc3Ryb2tlV2lkdGg6IDQsXHJcbiAgICAgIHN0cm9rZU9wYWNpdHk6IDEsXHJcbiAgICAgIHN0cm9rZUNvbG9yOiBcIiNmZmZmZmZcIlxyXG4gICAgfTtcclxuXHJcbiAgICBsZXQgdGVhbUljb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3RlYW1cIik7XHJcbiAgICBsZXQgY2FsZW5kYXJJY29uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjYWxlbmRhclwiKTtcclxuICAgIGxldCBsb2dvSWNvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbG9nb1wiKTtcclxuXHJcbiAgICBsZXQgdGVhbUljb25BbmltYXRpb24gPSBuZXcgTGF6eUxpbmVQYWludGVyKHRlYW1JY29uLCBhbmltYXRpb25zQ29uZmlnKTtcclxuICAgIGxldCBjYWxlbmRhckljb25BbmltYXRpb24gPSBuZXcgTGF6eUxpbmVQYWludGVyKFxyXG4gICAgICBjYWxlbmRhckljb24sXHJcbiAgICAgIGFuaW1hdGlvbnNDb25maWdcclxuICAgICk7XHJcbiAgICBsZXQgbG9nb0ljb25BbmltYXRpb24gPSBuZXcgTGF6eUxpbmVQYWludGVyKGxvZ29JY29uLCBsb2dvQW5pbWF0aW9uc0NvbmZpZyk7XHJcblxyXG4gICAgdGVhbUljb25BbmltYXRpb24ucGFpbnQoKTtcclxuICAgIGNhbGVuZGFySWNvbkFuaW1hdGlvbi5wYWludCgpO1xyXG4gICAgbG9nb0ljb25BbmltYXRpb24ucGFpbnQoKTtcclxuXHJcbiAgICBoaWRlTWFwRWxlbWVudHMoKTtcclxuICAgIGhpZGVDcnlwdG9NYWNoaW5lRWxlbWVudHMoKTtcclxuICAgIGhpZGVOb3RlYm9va0VsZW1lbnRzKCk7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBzaG93SWNvbnMoKSB7XHJcbiAgICBjb25zdCBib2FyZEltYWdlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuYm9hcmRfX2ltYWdlIHN2Z1wiKTtcclxuXHJcbiAgICBib2FyZEltYWdlcy5mb3JFYWNoKGltYWdlID0+IHtcclxuICAgICAgY29uc3Qgb3BhY2lmeUVsZW1lbnRzID0gaW1hZ2UucXVlcnlTZWxlY3RvckFsbChcIltmaWxsLW9wYWNpdHldXCIpO1xyXG4gICAgICBvcGFjaWZ5RWxlbWVudHMuZm9yRWFjaChvcEVsZW1lbnQgPT5cclxuICAgICAgICBvcEVsZW1lbnQuc2V0QXR0cmlidXRlKFwiZmlsbC1vcGFjaXR5XCIsIFwiMVwiKVxyXG4gICAgICApO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBpc01hYygpIHtcclxuICAgIHJldHVybiBuYXZpZ2F0b3IucGxhdGZvcm0ubWF0Y2goLyhNYWN8aVBob25lfGlQb2R8aVBhZCkvaSkgPyB0cnVlIDogZmFsc2U7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBhZGRMYW5ndWFnZUJ1dHRvbnNFdmVudExpc3RlbmVycygpIHtcclxuICAgIGNvbnN0IGxhbmd1YWdlQnV0dG9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXHJcbiAgICAgIFwiLmNob3NlLWxhbmd1YWdlX19sYW5ndWFnZXNcIlxyXG4gICAgKTtcclxuICAgIFxyXG4gICAgc2hvd0xhbmd1YWdlQ2hvc2VNZW51KCk7XHJcbiAgICBmcmVlemVEb2N1bWVudCgpO1xyXG5cclxuICAgIGxhbmd1YWdlQnV0dG9ucy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZXZlbnQgPT4ge1xyXG4gICAgICBjb25zdCBLT1JFQU4gPSBcImNob3NlLWxhbmd1YWdlX19sYW5ndWFnZS0ta29yZWFuXCI7XHJcbiAgICAgIGNvbnN0IGNsaWNrZWRCdXR0b24gPSBldmVudC50YXJnZXQ7XHJcblxyXG4gICAgICBjbGlja2VkQnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3dlZCcpO1xyXG5cclxuICAgICAgaWYgKGNsaWNrZWRCdXR0b24uY2xhc3NMaXN0LmNvbnRhaW5zKEtPUkVBTikpIHtcclxuICAgICAgICB0cmFuc2xhdGVUb0tvcmVhbihcIktPUlwiKTtcclxuICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoJ2tvcicpO1xyXG4gICAgICAgIFxyXG4gICAgICB9XHJcblxyXG4gICAgICBoaWRlTGFuZ3VhZ2VDaG9zZU1lbnUoKTtcclxuXHJcbiAgICAgIGlmICghaXNNb2JpbGUoKSAmJiAhaXNNYWMoKSkge1xyXG4gICAgICAgIGluaXRBbmltYXRpb25zKCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgc2hvd0ljb25zKCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGluaXQoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGZ1bmN0aW9uIHNob3dMYW5ndWFnZUNob3NlTWVudSgpIHtcclxuICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKCdwcmVsb2FkZXInKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBoaWRlTGFuZ3VhZ2VDaG9zZU1lbnUoKSB7XHJcbiAgICAgIGNvbnN0IGxhbmd1YWdlQnV0dG9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXHJcbiAgICAgICAgXCIuY2hvc2UtbGFuZ3VhZ2VfX2xhbmd1YWdlXCJcclxuICAgICAgKTtcclxuICAgICAgbGFuZ3VhZ2VCdXR0b25zLmZvckVhY2gobGIgPT4gbGIuY2xhc3NMaXN0LnJlbW92ZShcInNob3dlZFwiKSk7XHJcblxyXG4gICAgICBjb25zdCBjaG9zZUxhbmd1YWdlTWFpbkVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxyXG4gICAgICAgIFwiLmNob3NlLWxhbmd1YWdlXCJcclxuICAgICAgKTtcclxuICAgICAgY2hvc2VMYW5ndWFnZU1haW5FbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJzaG93ZWRcIik7XHJcblxyXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICByZW1vdmVMb2FkZXIoKTtcclxuICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoJ3ByZWxvYWRlcicpO1xyXG4gICAgICAgIHdpbmRvdy5zY3JvbGxUbygwLDApO1xyXG4gICAgICB9LCAxNTAwKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHRyYW5zbGF0ZVRvS29yZWFuKGxhbmcgPSBcIkVOR1wiKSB7XHJcbiAgICBjb25zdCBrb3JlYW5EYXRhID0gW1xyXG4gICAgICBcIuyEuOqzhCDstZzstIjsnZgg7YWM7KGw7IqkIGMyYyA8YnI+IOq4gOuhnOuyjCDqsbDrnpjshoxcIixcclxuICAgICAgXCLtiKzsnpDsnpAg65CY6riwXCIsXHJcbiAgICAgIFwi7Yis7J6Q7J6QIOuQmOq4sFwiLFxyXG4gICAgICBcIu2eiOuToO2GoO2BsCDqtazrp6RcIixcclxuICAgICAgXCLtiKzsnpBcIixcclxuICAgICAgXCJcIixcclxuICAgICAgXCJJQ08g7Yis7J6QXCIsXHJcbiAgICAgIFwi7YWM7KGw7IqkIOuyoOydtO2CuS4g7KeA6riI6rmM7KeAIOyxhOq1tOydgCDqsrDsvZQg7Ims7Jq06rKMIOyVhOuLiOyYgOyKteuLiOuLpC4g7Z6I65Og67mE7Yq464qUIO2FjOyhsOyKpOuyoOydtO2CueydtCDqsIDriqXtlZwg6rGw656Y7IaM7J6F64uI64ukLu2FjOyhsOyKpCDrsqDsnbTsu6TqsIAg65Cg7IiY7J6I64qUIOq4sO2ajOulvCDrhpPsuZjsp4Ag66eI7Iut7Iuc7JikLu2eiOuToOu5hO2KuOulvCDthrXtlbQg7JewNS41JSDthYzsobDsiqQg67Kg7J207YK5IOyImOydteydhCDsi6TtmITtlZjsi63si5zsmKQuXCIsXHJcbiAgICAgIFwi66qo6riI7JWhXCIsXHJcbiAgICAgIFwi7ISk66a97J6QXCIsXHJcbiAgICAgIFwi7KeA7IaNXCIsXHJcbiAgICAgIFwi7J6R64+Z7JuQ66asXCIsXHJcbiAgICAgIFwi7ZSE66as7IS47J28IO2DgOydtOuouFwiLFxyXG4gICAgICBcIuydvFwiLFxyXG4gICAgICBcIuyLnFwiLFxyXG4gICAgICBcIuu2hFwiLFxyXG4gICAgICBcIuy0iFwiLFxyXG4gICAgICBcIjFcIixcclxuICAgICAgXCJISUQgPSBcIixcclxuICAgICAgXCIwLjE1JFwiLFxyXG4gICAgICBcIuy0nSAxNyAwMDAgMDAwIO2GoO2BsOykkSDtmITsnqwgQu2GoO2BsOydtCDrgqjslZjsirXri4jri6QuXCIsXHJcbiAgICAgIFwi7IS46rOEIOy1nOy0iOydmCDthYzsobDsiqQg66eI7LyTXCIsXHJcbiAgICAgIFwiSGlkZGVuYml0IOqxsOuemOyGjOyXkOyEnOuKlCDqsbDrnpjsnZgg6rCB66m07JeQIOyXheyytCDrsI8g7IiY7IiY66OM66W8IOu2gOqzvO2VqeuLiOuLpC4g7J6Q7IKwICjspoksIOyekOyCsOydhCDtjJTslYQg7Jyg64+Z7ISx7J2EIOygnOqzte2VmOuKlCDsgqzrnowp7J20IDAuMjUgJeyXkCDrjZQg6rCA6rmd6rKMIOyngOu2iO2VmOuKlCDrj5nslYgsIO2FjOydtOy7pOydmCDsiJjsiJjro4zripQg7J2867CY7KCB7Jy866GcIO2Pieq3oCAwLjUtMC43NSAlIOuGkuyKteuLiOuLpC4g7Ya17IOB7KCB7Jy866GcLOydtCDsiJjsiJjro4zripQg6rGw656Y6rCAIOyLpO2WieuQmOuKlCDsi5zsoJDsl5DshJwg6rO17KCc65Cp64uI64ukXCIsXHJcbiAgICAgIFwi7Iuc7J6l7J2EIOychO2VnCBVU1BcIixcclxuICAgICAgXCLrj4XtirntlZwg7YyQ66ekIOygnOyViOydgCBISUTqsIAgSGlkZGVuYml0IOuUlOyngO2EuCDsnpDsgrAgRXhjaGFuZ2Ug7ZSM656r7Y+87JeQIOydmO2VnCDqtozsnITsnojripQg7KeA7KCV7J2EIOqwgOynhCDri6jsnbwg6raM7JyE7J6I64qUIOqzteyLnSDthqDtgbDsnbTrqbAg66qo65OgIOyCrOyaqeyekOqwgCDsnpDsi6DsnZgg7Zmc7ISxIO2UjOueq+2PvCDtmZzrj5nsl5DshJwg7ZW064u5IEhJRCDrs7Tsg4HsnYTrsJvsnYQg7IiYIOyeiOuLpOuKlCDqsoPsnoXri4jri6QuIOqzoOqwneydgCBISUTsnZgg7KCV6riwIO2GteqzhOulvCDthrXtlbQgSElEIOyImOyXkCDruYTroYDtlZjsl6wg7ZW064u5IOu5hOycqOydmCDrs7TsnKAg67mE7KSR7JeQIOuUsOudvCDrsLDri7nquIjsnYQg7IiY66C5IO2VoCDsiJgg7J6I7Jy866mwIOyImOydteydhCDtlqXsnKAg7ZWgIOyImCDsnojsirXri4jri6QuXCIsXHJcbiAgICAgIFwi7Yis7ZGc6raMXCIsXHJcbiAgICAgIFwiSGlkZGVuIO2GoO2BsCDshozsp4DsnpDripQg6rO16rCcIO2IrO2RnOq2jOydhCDtlonsgqztlaAg7IiYIOyeiOyKteuLiOuLpC4gMTAwIOqwnOydmCBIaWRkZW4g7Yag7YGw7J2AIDEg6rCc7J2YIO2IrO2RnOq2jOqzvCDqsJnsirXri4jri6QuIOyghOuwmOyggeycvOuhnCDsgqzsmqnsnpDsl5Dqsowg7KCV6riw7KCB7Jy866GcIOuwsOuLuSDsiJjsnbXsnYQg7KCc6rO17ZWY6riwIOychO2VtCBISUTripQg7IKs7Jqp7J6Q6rCAIO2UjOueq+2PvCDsnZjsgqwg6rKw7KCVIO2UhOuhnOyEuOyKpOyXkCDssLjsl6ztlaAg7IiY7J6I64qUIOq4sO2ajOulvCDslrvsnYQg7IiYIOyeiOuPhOuhne2VqeuLiOuLpC5cIixcclxuICAgICAgXCLsvZTsnbgg7JeQ7Ja065Oc656NXCIsXHJcbiAgICAgIFwiSUNPIOywuOyXrOulvCDsnITtlZwg66qo67CU7J28IOuwjyBJT1Mg7ISk7LmY7IucIOu2gOqzvOuQmOuKlCDruYTsmqnsnYAg7J207ZuEIOuztOuEiOyKpOuhnCDtmZjquInrkKnri4jri6QuXCIsXHJcbiAgICAgIFwi7Z6I65Og67mE7Yq464qUIOuLueyLoOydmCDshLHqs7XsnLzroZwg7JWI64K07ZWp64uI64ukLlwiLFxyXG4gICAgICBcIu2GoO2BsCDshozsp4DruYTsnKjsnbQg7Kad6rCA7ZWo7JeQIOuUsOudvCDsp4DquInrkJjripQg67O064SI7IqkIOuYkO2VnCDspp3qsIDtlanri4jri6QuIO2GoO2BsCDtmYDrjZTrk6Tsl5Dqsowg6rGw656Y7IiY7IiY66OM7J2YIDgwJeulvCDthqDtgbDruYTsnKjsl5Ag65Sw6528IO2ZmOq4ieuQqeuLiOuLpC5cIixcclxuICAgICAgXCLrqqjrk6DqsoPsnbQg6rCA6rmM7J207JeQIOyeiOyKteuLiOuLpC5cIixcclxuICAgICAgXCJcIixcclxuICAgICAgXCLrsLHsp4BcIixcclxuICAgICAgXCLsg4jroZzsmrQg7Z6I65Og67mE7Yq4IOuwseyEnOulvCDqs7XsnKDtlaDsiJgg7J6I7Ja0IOq4sOyBqeuLiOuLpC7snbTrsLHshJzripQg7ZS87JWE7Yq4IO2Gte2VqeydhCDthrXtlZwg7IOI66Gc7Jq0IOuniOydtOuLneqxsOuemOyGjOulvCDshozqsJztlZjqs6Ag7J6I7Iq164uI64ukOlByb29mLW9mLVJlcGxpY2F0aW9uIChQb1IpIGFuZCBQcm9vZi1vZi1TcGFjZXRpbWUgKFBvU3QpXCIsXHJcbiAgICAgIFwi7Z6I65Og67mE7Yq4IOuwseyEnOuztOq4sFwiLFxyXG4gICAgICBcIuyXkOyWtOuTnOuejVwiLFxyXG4gICAgICBcIklDTyDsnbTtm4QsIOyasOumrOuKlCAxMDAgRVRIIOydtOyDgSDrmJDripQg6re47JmAIOuPmeuTse2VnCDquIjslaHsnYQg67mE7Yq4IOuPmeyghOycvOuhnCDquLDrtoAg7ZWcIOuqqOuToCDssLjqsIDsnpDrk6Tsl5Dqsowg7LaU7LKo7J2EIOyLpOyLnCDtlaAg6rKD7J6F64uI64ukLiDrs7TrhIjsiqTripQg64uk7J2MIOu5hOycqOuhnCDrsLDrtoTrkKnri4jri6QuXCIsXHJcbiAgICAgIFwi66CI67Ko6rO8IOuztOuEiOyKpOycqOydgCDquLDrs7jqsIDqsqnqs7wg67OE64+E66GcIOyggeyaqeuQqeuLiOuLpC5cIixcclxuICAgICAgXCLtnojrk6DruYTtirgg7Yag7YGw7J2AIOyyq+qxsOuemOu2gO2EsCDsiqTrp4jtirjsu6jtirjrnpntirjrpbwg7Ya17ZW0IO2UhOuhnOq3uOuemOuwjSDrkKnri4jri6QuXCIsXHJcbiAgICAgIFwiTW9yZSB0aGFuLCBFVEhcIixcclxuICAgICAgXCLstpTqsIAgSElEIOy9lOyduCwlXCIsXHJcbiAgICAgIFwiU0FMRVwiLFxyXG4gICAgICBcIlByZS1zYWxlXCIsXHJcbiAgICAgIFwiSUNPXCIsXHJcbiAgICAgIFwi7YyQ66ek7IiY65+JXCIsXHJcbiAgICAgIFwi7IS47J28XCIsXHJcbiAgICAgIFwi67O064SI7IqkXCIsXHJcbiAgICAgIFwi6rCA6rKpXCIsXHJcbiAgICAgIFwiMWV0aFwiLFxyXG4gICAgICBcIu2VmOuTnOy6oVwiLFxyXG4gICAgICBcIuyxhOq1tOyImOufieydtCDslrTrlrvqsowg65CY64qU6rCAP1wiLFxyXG4gICAgICBcIuyyq+uyoOydtOy7pCDspJEg7ZWcIOuqheydtOuQmOq4sCDsnITtlZwg6riw7ZqM66W8IOuGk+y5mOyngCDrp4jsi63si5zsmKQuIOyymOydjCAxMiDqsJzsm5Qg64K07JeQIOuyoOydtO2CueydhCDthrXtlbQg7JewIDUuNSXsnZgg7IiY7J217J2EIOyYrOumrOyLreyLnOyYpC4g64u57Iug7J2YIOyyqyDtlbQg64+Z7JWIIOqwgOyepSDrp47snYAg7J207J217J2EIOuCqOq4tCDsvZTsnbjsnYQg7J6sIOuyoOydtO2CueydhCDthrXtlbQg7IiY7J217J2EIOy1nOuMgO2ZlCDtlZjsi63si5zsmKQuIOyasOumrOuKlCAyMDE5IOuFhCDstZzsoIAg7IiY7KSA7JeQ7IScIOuyoOydtO2CueydmCDrs7XsnqHshLHsnYQg7KSE7J206riwIOychO2VtCDstZzshKDsnYQg64uk7ZWY6rOgIOyeiOyKteuLiOuLpC7tnojrk6DruYTtirjripQg7ZiE6riI7Jy866GcIOqwgOuTnSDssKjqs6Ag6rOE7IKw7J2YIOuzteyeoeyEseydtCDspp3qsIAg7ZWgIOuVjOq5jOyngCDqsITri6jtlZwg6riw67O4IOyymOumrCDriqXroKXsnLzroZzrj4Qg7Ja77J2EIOyImOyeiOuKlCDquLDtmozrpbwg7KCc6rO17ZWp64uI64ukLiDrsqDsnbTtgrnsl5DshJwg7IKs7Jqp7ZWgIOyImOyeiOuKlCDqsIDsnqUg66eO7J2AIOyWkeydmCDrj5nsoITsnLzroZwg6rCBIOu4lOuhnSDri7kg7LWc6rOgIO2WieyatOydhCDrgqjquYHri4jri6QuIFBvU+uwqeyLneydgCDrp47snYAg64W466Cl7J2EIOq4sOyauOydvCDtlYTsmpTqsIAg7JeG7Iq164uI64ukLiBQb1PrsKnsi53snYAg66y466qF7ZmUIOuQnCDssYTqtbQg67KE7KCE7Jy866GcIO2YhOuMgCDquIjsnLUg7IOB7ZKI6rO8IOqzte2GteygkOydtCDsnojsirXri4jri6QuIFBvU+yXkOyEnOuKlCDsp4DqsJHsl5Ag67O06rSAIOuQnCDsvZTsnbjsnZgg7YGs6riw6rCAIOyDiOuhnOyatCDsp4DqsJHsnYQg7Ja764qUIOq4sO2ajOulvCDspp3qsIDsi5ztgqTquLAg65WM66y47JeQIOqzhOygleyXkCDqsIDsnqUg66eO7J2AIOy9lOyduOydtOyeiOuKlCDssqsg67KI7Ke4IOywuOqwgOyekOqwgCDrkKAg7IiYIOyeiOyKteuLiOuLpFwiLFxyXG4gICAgICBcIjHqsJzsm5R+MTLqsJzsm5QgLSBcIixcclxuICAgICAgXCIyIDg1OSAzMDIuODQg7L2U7J24XCIsXHJcbiAgICAgIFwiMTPqsJzsm5R+MjTqsJzsm5QgLSBcIixcclxuICAgICAgXCIxIDQyOSA2NTEsNDIg7L2U7J24XCIsXHJcbiAgICAgIFwiMjXqsJzsm5R+MzXqsJzsm5QtIFwiLFxyXG4gICAgICBcIjcxNCw4MjUuNzEg7L2U7J24XCIsXHJcbiAgICAgIFwiMzbqsJzsm5QgLSBcIixcclxuICAgICAgXCI2NjksNDY2LjA3IOy9lOyduFwiLFxyXG4gICAgICBcIuuhnOuTnOuntVwiLFxyXG4gICAgICBcIuqzhO2ajSDrsI8g6rCc67CcXCIsXHJcbiAgICAgIFwiUHJlLWljbyBzdGFydFwiLFxyXG4gICAgICBcIuuyoO2DgOuyhOyghCDrn7Dsua1cIixcclxuICAgICAgXCLqsbDrnpjshowg65+w7LmtXCIsXHJcbiAgICAgIFwi6riA66Gc67KMIFRPUDEwIOqxsOuemOyGjCDshKDsoJVcIixcclxuICAgICAgXCLtnojrk6Ag7L2U7J247J20IOqxsOuemOuQmOuKlCDstZzqs6DsnZgg6rGw656Y7IaMXCIsXHJcbiAgICAgIFwiMjQgw5cgNyBzdXBwb3J0IHNlcnZpY2VcIixcclxuICAgICAgXCLrrLjsnZjsgqztla3snbQg7J6I7Jy87Iug6rK97JqwLCDslrjsoJzrk6Ag64u167OA7ZW0IOuTnOumrOqyoOyKteuLiOuLpC5cIixcclxuICAgICAgXCLtnojrk6DruYTtirgg6rGw656Y7IaMIOuRmOufrOuztOq4sFwiLFxyXG4gICAgICBcIu2eiOuToOu5hO2KuCDqsbDrnpjshowg67Cx7IScXCIsXHJcbiAgICAgIFwi67O17KCc67Cp7KeAXCIsXHJcbiAgICAgIFwiUE9XRVIgRkFVTFQgVE9MRVJBTkNFXCIsXHJcbiAgICAgIFwiMjAxOSDsl7Dqtawg66Gc65Oc66e1XCIsXHJcbiAgICAgIFwiXCIsXHJcbiAgICAgIFwiXCIsXHJcbiAgICAgIFwiXCJcclxuICAgIF07XHJcblxyXG4gICAgY29uc3QgdGV4dEVsZW1lbnRzID0gW1xyXG4gICAgICBnZXRFbGVtZW50KCcuaG9tZSAuaW5mb19fdGl0bGUnKSxcclxuICAgICAgZ2V0RWxlbWVudCgnLmhlYWRlcl9fYnV0dG9uJyksXHJcbiAgICAgIGdldEVsZW1lbnQoJy5zdXBwb3J0X19idXR0b24nKSwgXHJcbiAgICAgIGdldEVsZW1lbnQoJy5ob21lX19tb2RhbCAud2lkZ2V0X19idXR0b24nKSxcclxuICAgICAgZ2V0RWxlbWVudCgnLmhvbWVfX3JpZ2h0IC53aWRnZXRfX2xvZ28gLnRleHQnKSwgXHJcbiAgICAgIGdldEVsZW1lbnQoJy5ob21lX19yaWdodCAud2lkZ2V0X19pbmZvIC50ZXh0JyksIFxyXG4gICAgICBnZXRFbGVtZW50KCcuaG9tZV9fcmlnaHQgLndpZGdldF9fYnV0dG9uJyksXHJcbiAgICAgIGdldEVsZW1lbnQoJy5ob21lIC5pbmZvX19kZXNjcmlwdGlvbicpLFxyXG4gICAgICBnZXRFbGVtZW50KCcuaG9tZSAuYm9hcmRfX2l0ZW0tLTEgLmJvYXJkX190aXRsZScpLFxyXG4gICAgICBnZXRFbGVtZW50KCcuaG9tZSAuYm9hcmRfX2l0ZW0tLTIgLmJvYXJkX190aXRsZScpLFxyXG4gICAgICBnZXRFbGVtZW50KCcuaG9tZSAuYm9hcmRfX2l0ZW0tLTMgLmJvYXJkX190aXRsZScpLFxyXG4gICAgICBnZXRFbGVtZW50KCcuaG93LWl0LXdvcmtzX190aXRsZScpLFxyXG4gICAgICBnZXRFbGVtZW50KCcuaG9tZV9fbW9kYWwgLndpZGdldF9fdGl0bGUnKSxcclxuICAgICAgZ2V0RWxlbWVudCgnLnRpbWVyX19kYXlzJyksXHJcbiAgICAgIGdldEVsZW1lbnQoJy50aW1lcl9faG91cnMnKSxcclxuICAgICAgZ2V0RWxlbWVudCgnLnRpbWVyX19taW51dGVzJyksXHJcbiAgICAgIGdldEVsZW1lbnQoJy50aW1lcl9fc2VjJyksXHJcbiAgICAgIGdldEVsZW1lbnQoJy5ob21lX19tb2RhbCAud2lkZ2V0X19pbmZvIC5jb2luX19udW1iZXInKSxcclxuICAgICAgZ2V0RWxlbWVudCgnLmhvbWVfX21vZGFsIC53aWRnZXRfX2luZm8gLnRleHQnKSxcclxuICAgICAgZ2V0RWxlbWVudCgnLmhvbWVfX21vZGFsIC53aWRnZXRfX2luZm8gLmNvaW5fX3ByaWNlJyksXHJcbiAgICAgIGdldEVsZW1lbnQoJy5ob21lX19tb2RhbCAud2lkZ2V0X19pbmZvLS0yIC50ZXh0JyksXHJcbiAgICAgIGdldEVsZW1lbnQoJy5jYXJkLS0xIC5jYXJkX190aXRsZScpLFxyXG4gICAgICBnZXRFbGVtZW50KCcuY2FyZC0tMSAuY2FyZF9faW5mbycpLFxyXG4gICAgICBnZXRFbGVtZW50KCcuY2FyZC0tMiAuY2FyZF9fdGl0bGUnKSxcclxuICAgICAgZ2V0RWxlbWVudCgnLmNhcmQtLTIgLmNhcmRfX2luZm8nKSxcclxuICAgICAgZ2V0RWxlbWVudCgnLmNhcmQtLTMgLmNhcmRfX3RpdGxlJyksXHJcbiAgICAgIGdldEVsZW1lbnQoJy5jYXJkLS0zIC5jYXJkX19pbmZvJyksXHJcbiAgICAgIGdldEVsZW1lbnQoJy5jYXJkLS00IC5jYXJkX190aXRsZScpLFxyXG4gICAgICBnZXRFbGVtZW50KCcuY2FyZC0tNCAuY2FyZF9faW5mbycpLFxyXG4gICAgICBnZXRFbGVtZW50KCcuY2FyZC0tNSAuY2FyZF9fdGl0bGUnKSxcclxuICAgICAgZ2V0RWxlbWVudCgnLmNhcmQtLTUgLmNhcmRfX2luZm8nKSxcclxuICAgICAgZ2V0RWxlbWVudCgnLmNhcmQtLTYgLmNhcmRfX3RpdGxlJyksXHJcbiAgICAgIGdldEVsZW1lbnQoJy5jYXJkLS02IC5jYXJkX19pbmZvJyksXHJcbiAgICAgIGdldEVsZW1lbnQoJy53aGl0ZXBhcGVyX190aXRsZScpLFxyXG4gICAgICBnZXRFbGVtZW50KCcud2hpdGVwYXBlcl9faW5mbycpLFxyXG4gICAgICBnZXRFbGVtZW50KCcud2hpdGVwYXBlcl9fYnV0dG9uJyksXHJcbiAgICAgIGdldEVsZW1lbnQoJy5haXJkcm9wX190aXRsZScpLFxyXG4gICAgICBnZXRFbGVtZW50KCcuYWlyZHJvcF9faW5mbycpLFxyXG4gICAgICBnZXRFbGVtZW50KCcuYWlyZHJvcF9fYWRkaXRpb25hbC1pbmZvJyksXHJcbiAgICAgIGdldEVsZW1lbnQoJy5yZWxlYXNlX190aXRsZScpLFxyXG4gICAgICBnZXRFbGVtZW50KCcuYWlyZHJvcF9fdGFibGUgLnRhYmxlX19jb2x1bW4tLTEnKSxcclxuICAgICAgZ2V0RWxlbWVudCgnLmFpcmRyb3BfX3RhYmxlIC50YWJsZV9fY29sdW1uLS0yJyksXHJcbiAgICAgIGdldEVsZW1lbnQoJy5yZWxlYXNlIC50YWJsZV9faGVhZGVyIC50YWJsZV9fY29sdW1uJyksXHJcbiAgICAgIGdldEVsZW1lbnQoJy5yZWxlYXNlIC50YWJsZV9fcm93LS0xIC50YWJsZV9fY29sdW1uLS0yJyksXHJcbiAgICAgIGdldEVsZW1lbnQoJy5yZWxlYXNlIC50YWJsZV9fcm93LS0xIC50YWJsZV9fY29sdW1uLS0zJyksXHJcbiAgICAgIGdldEVsZW1lbnQoJy5yZWxlYXNlIC50YWJsZV9fcm93LS0yIC50YWJsZV9fY29sdW1uLS0xJyksXHJcbiAgICAgIGdldEVsZW1lbnQoJy5yZWxlYXNlIC50YWJsZV9fcm93LS0zIC50YWJsZV9fY29sdW1uLS0xJyksXHJcbiAgICAgIGdldEVsZW1lbnQoJy5yZWxlYXNlIC50YWJsZV9fcm93LS00IC50YWJsZV9fY29sdW1uLS0xJyksXHJcbiAgICAgIGdldEVsZW1lbnQoJy5yZWxlYXNlIC50YWJsZV9fcm93LS01IC50YWJsZV9fY29sdW1uLS0xJyksXHJcbiAgICAgIGdldEVsZW1lbnQoJy5yZWxlYXNlIC50YWJsZV9fcm93LS02IC50YWJsZV9fY29sdW1uLS0xJyksXHJcbiAgICAgIGdldEVsZW1lbnQoJy5yZWxlYXNlIC50YWJsZV9fcm93LS03IC50YWJsZV9fY29sdW1uLS0xJyksXHJcbiAgICAgIGdldEVsZW1lbnQoJy5mb3ItbWluZXJzX190aXRsZScpLFxyXG4gICAgICBnZXRFbGVtZW50KCcuZm9yLW1pbmVyc19faW5mbycpLFxyXG4gICAgICBnZXRFbGVtZW50KCcuZm9yLW1pbmVyc19fcmlnaHQgLmxpc3RfX2l0ZW0tLTEgLnRleHQnKSxcclxuICAgICAgZ2V0RWxlbWVudCgnLmZvci1taW5lcnNfX3JpZ2h0IC5saXN0X19pdGVtLS0xIC5jb2lucycpLFxyXG4gICAgICBnZXRFbGVtZW50KCcuZm9yLW1pbmVyc19fcmlnaHQgLmxpc3RfX2l0ZW0tLTIgLnRleHQnKSxcclxuICAgICAgZ2V0RWxlbWVudCgnLmZvci1taW5lcnNfX3JpZ2h0IC5saXN0X19pdGVtLS0yIC5jb2lucycpLFxyXG4gICAgICBnZXRFbGVtZW50KCcuZm9yLW1pbmVyc19fcmlnaHQgLmxpc3RfX2l0ZW0tLTMgLnRleHQnKSxcclxuICAgICAgZ2V0RWxlbWVudCgnLmZvci1taW5lcnNfX3JpZ2h0IC5saXN0X19pdGVtLS0zIC5jb2lucycpLFxyXG4gICAgICBnZXRFbGVtZW50KCcuZm9yLW1pbmVyc19fcmlnaHQgLmxpc3RfX2l0ZW0tLTQgLnRleHQnKSxcclxuICAgICAgZ2V0RWxlbWVudCgnLmZvci1taW5lcnNfX3JpZ2h0IC5saXN0X19pdGVtLS00IC5jb2lucycpLFxyXG4gICAgICBnZXRFbGVtZW50KCcucm9hZC1tYXBfX3RpdGxlJyksXHJcbiAgICAgIGdldEVsZW1lbnQoJy5yb2FkLW1hcCAucGxhbi0tMScpLFxyXG4gICAgICBnZXRFbGVtZW50KCcucm9hZC1tYXAgLnBsYW4tLTInKSxcclxuICAgICAgZ2V0RWxlbWVudCgnLnJvYWQtbWFwIC5wbGFuLS0zJyksXHJcbiAgICAgIGdldEVsZW1lbnQoJy5yb2FkLW1hcCAucGxhbi0tNCcpLFxyXG4gICAgICBnZXRFbGVtZW50KCcucm9hZC1tYXAgLnBsYW4tLTUnKSxcclxuICAgICAgZ2V0RWxlbWVudCgnLmV4Y2hhbmdlc19fdGl0bGUnKSxcclxuICAgICAgZ2V0RWxlbWVudCgnLnN1cHBvcnRfX3RpdGxlJyksXHJcbiAgICAgIGdldEVsZW1lbnQoJy5zdXBwb3J0X19pbmZvJyksXHJcbiAgICAgIGdldEVsZW1lbnQoJy5yZXNlYXJjaF9fdGl0bGUnKSxcclxuICAgICAgZ2V0RWxlbWVudCgnLnJlc2VhcmNoX19pdGVtcyAuaXRlbS0tMSAuaXRlbV9fdGl0bGUnKSxcclxuICAgICAgZ2V0RWxlbWVudCgnLnJlc2VhcmNoX19pdGVtcyAuaXRlbS0tMiAuaXRlbV9fdGl0bGUnKSxcclxuICAgICAgZ2V0RWxlbWVudCgnLnJlc2VhcmNoX19pdGVtcyAuaXRlbS0tMyAuaXRlbV9fdGl0bGUnKSxcclxuICAgICAgZ2V0RWxlbWVudCgnLnJlc2VhcmNoX19pdGVtcyAuaXRlbS0tNCAuaXRlbV9fdGl0bGUnKSxcclxuICAgICAgZ2V0RWxlbWVudCgnLmZvb3RlciAuZGV2ZWxvcGVkLWJ5JyksXHJcbiAgICAgIGdldEVsZW1lbnQoJy5mb290ZXJfX2l0ZW0tLWVtYWlsJyksXHJcbiAgICAgIGdldEVsZW1lbnQoJy5mb290ZXJfX2l0ZW0tLWZvbGxvdy11cycpLFxyXG4gICAgXTtcclxuXHJcbiAgICBpZiAobGFuZyAhPT0gJ0VORycpIHtcclxuICAgICAgc2V0Q29udGVudCh0ZXh0RWxlbWVudHMsIGtvcmVhbkRhdGEpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGdldEVsZW1lbnQoY2xhc3NOYW1lKSB7XHJcbiAgICAgIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGNsYXNzTmFtZSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gc2V0Q29udGVudChlbGVtZW50cywgY29udGVudCkge1xyXG4gICAgICBlbGVtZW50cy5mb3JFYWNoKChlbCwgaW5kZXgpID0+IHtcclxuICAgICAgICBjb25zdCBjb250ID0gY29udGVudFtpbmRleF07XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICogSDIgZGF0YVxyXG4gICAgICAgICAgICovXHJcbiAgICAgICAgICBpZiAoZWwuaGFzQXR0cmlidXRlKCdkYXRhLXRpdGxlJykpIHtcclxuICAgICAgICAgICAgZWwuaW5uZXJIVE1MID0gY29udDtcclxuICAgICAgICAgICAgZWwuc2V0QXR0cmlidXRlKCdkYXRhLXRpdGxlJywgY29udCk7XHJcbiAgICAgICAgICB9IFxyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICogUGxhbiBsaW5lcyBkYXRhXHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgZWxzZSBpZiAoZWwuY2xhc3NMaXN0LmNvbnRhaW5zKCdwbGFuJykpIHtcclxuICAgICAgICAgICAgZWwuc2V0QXR0cmlidXRlKCdkYXRhLXBsYW4tZGVzY3JpcHRpb24nLCBjb250KTtcclxuICAgICAgICAgIH0gXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBUaW1lciBkYXRhXHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICBlbHNlIGlmIChlbC5oYXNBdHRyaWJ1dGUoJ2RhdGEtbmFtZScpKSB7XHJcbiAgICAgICAgICAgIGVsLnNldEF0dHJpYnV0ZSgnZGF0YS1uYW1lJywgY29udCk7XHJcbiAgICAgICAgICB9IFxyXG4gICAgICAgICAgZWxzZSBpZiAoY29udCAhPT0gJycpIHtcclxuICAgICAgICAgICAgZWwuaW5uZXJIVE1MID0gY29udDtcclxuICAgICAgICAgIH0gXHJcbiAgICAgICAgfSBjYXRjaChlKSB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZygnRXJyb3IgZWxlbWVudCBpbmRleCA6JywgaW5kZXgpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG59KTtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zY3JpcHRzL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ3RDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OyIsInNvdXJjZVJvb3QiOiIifQ==