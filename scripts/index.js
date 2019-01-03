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
	  removeLoader();
	  freezeDocument();

	  const slider = document.querySelector(".slider");
	  const summary = document.querySelector(".widget__current-summary .summary");
	  const body = document.body;

	  addEventListeners();

	  initAnimations();
	  initSlider();
	  initWayPointsInteraction();

	  initTimer(2019, 0, 1, 15);

	  function initWayPointsInteraction() {
	    let roadMapReached = false;
	    let notebookReached = false;
	    let supportReached = false;
	    let airDropReached = false;
	    let widgetReached = false;

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
	          const element = document.getElementById("notebook");
	          const animationTrigger = document.getElementById("main");

	          element.dispatchEvent(new Event("click"));

	          animationTrigger.removeAttribute("begin");
	        }
	      },
	      offset: "100%"
	    });

	    let support = new Waypoint({
	      element: document.querySelector(".support"),
	      handler: function() {
	        if (!supportReached) {
	          supportReached = true;

	          animateMap();

	          const element = document.querySelector("#land-parts");

	          element.dispatchEvent(new Event("click"));
	          element.removeAttribute("begin");
	        }
	      },
	      offset: "40%"
	    });

	    let airdrop = new Waypoint({
	      element: document.querySelector(".airdrop"),
	      handler: function() {
	        if (!airDropReached) {
	          airDropReached = true;

	          animateCryptoMachine();

	          const element = document.querySelector("#crypto");
	          element.dispatchEvent(new Event("click"));
	        }
	      },
	      offset: "100%"
	    });

	    if (isMobile()) {
	      let widget = new Waypoint({
	        element: document.querySelector(".home__right"),
	        handler: function() {
	          if (!widgetReached) {
	            widgetReached = true;

	            let touchstartX = 0;
	            let touchstartY = 0;
	            let touchendX = 0;
	            let touchendY = 0;

	            initMobilePopupInteraction();
	          }
	        },
	        offset: "25%"
	      });
	    }
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
	    let date = new Date(year, month, day, 0, 0, 0);

	    days.innerHTML = wrapWithZero(date.getDay());
	    mins.innerHTML = wrapWithZero(date.getMinutes());
	    secs.innerHTML = wrapWithZero(date.getSeconds());
	    hours.innerHTML = wrapWithZero(date.getHours());

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

	  function initSlider() {
	    if (window.innerWidth <= 650) {
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
	    const map = document.querySelector("#map");
	    const dots = map.querySelector(".dots");

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

	  function delegateWidgetEventListeners() {
	    if (!isMobile()) {
	      let fn = debounce(isMouseOnWidget, 50);
	      body.addEventListener("mousemove", fn);
	    }

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
	        body.classList.add("widget-on-hover");
	        popup.classList.add("showed");
	      } else {
	        const delay = 300;
	        setTimeout(() => {
	          body.classList.remove("widget-on-hover");
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

	    body.classList.add("widget-on-hover");
	    popup.classList.add("showed");
	  }

	  function hideWidget() {
	    const widget = document.querySelector(".home__right .widget");
	    widget.classList.add("hidden");
	  }

	  function initMobilePopupInteraction() {
	    const widget = document.querySelector(".home__right .widget");
	    const popup = document.querySelector(".home__modal");
	    const homeSection = document.querySelector(".home");

	    showPopup();
	    hideWidget();

	    //Freeze window
	    body.classList.add("no-scroll");
	    document.querySelector("html").classList.add("no-scroll");

	    homeSection.addEventListener("touchstart", hideOnTouch, false);
	    homeSection.addEventListener("touchstart", setStartTouchVariables, false);

	    homeSection.addEventListener("touchend", swipeHandler, false);

	    function hideOnTouch(e) {
	      const delay = 300;
	      setTimeout(() => {
	        unfreezeDocument();
	        body.classList.remove("widget-on-hover");
	        popup.classList.remove("showed");
	        widget.classList.remove("hidden");
	      }, delay);

	      homeSection.removeEventListener("touchstart", hideOnTouch, false);
	    }

	    function setStartTouchVariables(event) {
	      touchstartX = event.changedTouches[0].screenX;
	      touchstartY = event.changedTouches[0].screenY;
	    }

	    function swipeHandler(event) {
	      const widget = document.querySelector(".home__right .widget");
	      const popup = document.querySelector(".home__modal");

	      touchendX = event.changedTouches[0].screenX;
	      touchendY = event.changedTouches[0].screenY;
	      target = event.target;
	      
	      if (Math.abs(touchendX - touchstartX) <= window.innerWidth / 4) {
	        return;
	      } else if (touchendX >= touchstartX) {
	        if (target.closest(".widget")) {
	          showPopup();
	          hideWidget();
	        }
	      } else {
	        if (target.closest(".widget")) {
	          body.classList.remove("widget-on-hover");
	          popup.classList.remove("showed");
	          widget.classList.remove("hidden");
	        }
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
	    const desktopBreakpoin = 1200;
	    const mobileBreakpoint = 650;

	    delegateWidgetEventListeners();

	    /**
	     * Bind a slider data changing with a view
	     */
	    slider.addEventListener(
	      "change",
	      event => (summary.innerHTML = event.currentTarget.value)
	    );

	    if (window.innerWidth >= desktopBreakpoin && isDocumentFrozen()) {
	      body.addEventListener("mousewheel", scrollToSection, { passive: true });
	    }

	    if (window.innerWidth <= mobileBreakpoint) {
	      window.addEventListener("resize", initSlider);
	    }

	    window.addEventListener("scroll", () => {
	      const header = document.querySelector(".header");

	      if (header.getBoundingClientRect().bottom < window.pageYOffset) {
	        header.classList.add("fixed");
	      } else {
	        header.classList.remove("fixed");
	      }
	    });

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
	      $("html, body").animate(
	        {
	          scrollTop: scrollMouseTo,
	          ease: "easeOutBack"
	        },
	        scrollTime
	      );
	    }, delay);

	    body.removeEventListener("mousewheel", scrollToSection);
	  }

	  function isDocumentFrozen() {
	    return document.body.classList.contains("no-scroll");
	  }

	  function unfreezeDocument() {
	    document.body.classList.remove("no-scroll");
	    document.querySelector("html").classList.remove("no-scroll");
	  }

	  function removeLoader() {
	    const loaderHTML = document.querySelector(".loader-wrapper");
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

	    if (window.innerWidth <= 650) {
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
	});


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMGJmYTQ4MjJmYjA0ZjY0NTgzZDUiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvc2NyaXB0cy9cIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCAwYmZhNDgyMmZiMDRmNjQ1ODNkNSIsImRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsICgpID0+IHtcclxuICAvKipcclxuICAgKiBSZW1vdmUgdGhlIGxvYWRlciB3aGVuIGFsbCBzY3JpcHQgaGF2ZSBiZWVuIGxvYWRlZFxyXG4gICAqL1xyXG4gIHJlbW92ZUxvYWRlcigpO1xyXG4gIGZyZWV6ZURvY3VtZW50KCk7XHJcblxyXG4gIGNvbnN0IHNsaWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2xpZGVyXCIpO1xyXG4gIGNvbnN0IHN1bW1hcnkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLndpZGdldF9fY3VycmVudC1zdW1tYXJ5IC5zdW1tYXJ5XCIpO1xyXG4gIGNvbnN0IGJvZHkgPSBkb2N1bWVudC5ib2R5O1xyXG5cclxuICBhZGRFdmVudExpc3RlbmVycygpO1xyXG5cclxuICBpbml0QW5pbWF0aW9ucygpO1xyXG4gIGluaXRTbGlkZXIoKTtcclxuICBpbml0V2F5UG9pbnRzSW50ZXJhY3Rpb24oKTtcclxuXHJcbiAgaW5pdFRpbWVyKDIwMTksIDAsIDEsIDE1KTtcclxuXHJcbiAgZnVuY3Rpb24gaW5pdFdheVBvaW50c0ludGVyYWN0aW9uKCkge1xyXG4gICAgbGV0IHJvYWRNYXBSZWFjaGVkID0gZmFsc2U7XHJcbiAgICBsZXQgbm90ZWJvb2tSZWFjaGVkID0gZmFsc2U7XHJcbiAgICBsZXQgc3VwcG9ydFJlYWNoZWQgPSBmYWxzZTtcclxuICAgIGxldCBhaXJEcm9wUmVhY2hlZCA9IGZhbHNlO1xyXG4gICAgbGV0IHdpZGdldFJlYWNoZWQgPSBmYWxzZTtcclxuXHJcbiAgICBsZXQgcm9hZG1hcCA9IG5ldyBXYXlwb2ludCh7XHJcbiAgICAgIGVsZW1lbnQ6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucm9hZC1tYXBcIiksXHJcbiAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmICghcm9hZE1hcFJlYWNoZWQpIHtcclxuICAgICAgICAgIHJvYWRNYXBSZWFjaGVkID0gdHJ1ZTtcclxuICAgICAgICAgIGNvbnN0IHJvYWRMaW5lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5yb2FkLW1hcF9fbGluZVwiKTtcclxuICAgICAgICAgIGNvbnN0IHBsYW5MaW5lcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucGxhbl9fcm9hZC1saW5lXCIpO1xyXG4gICAgICAgICAgY29uc3QgcGxhbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnBsYW5cIik7XHJcbiAgICAgICAgICBjb25zdCBjaXJjbGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5wbGFuX19jaXJjbGVcIik7XHJcblxyXG4gICAgICAgICAgcm9hZExpbmUuY2xhc3NMaXN0LmFkZChcInNob3dlZFwiKTtcclxuICAgICAgICAgIGNvbnN0IGRlbGF5ID0gNTAwO1xyXG5cclxuICAgICAgICAgIHBsYW5MaW5lcy5mb3JFYWNoKChwbCwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgX2RlbGF5ID0gZGVsYXkgKyAxMDAgKiBpbmRleDtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgcGwuY2xhc3NMaXN0LmFkZChcInNob3dlZFwiKTtcclxuICAgICAgICAgICAgICBjaXJjbGVzW2luZGV4XS5jbGFzc0xpc3QuYWRkKFwic2hvd2VkXCIpO1xyXG4gICAgICAgICAgICAgIHBsYW5zW2luZGV4XS5jbGFzc0xpc3QuYWRkKFwic2hvd2VkXCIpO1xyXG4gICAgICAgICAgICB9LCBfZGVsYXkpO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgICBvZmZzZXQ6IFwiNDAlXCJcclxuICAgIH0pO1xyXG5cclxuICAgIGxldCBub3RlYm9vayA9IG5ldyBXYXlwb2ludCh7XHJcbiAgICAgIGVsZW1lbnQ6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIud2hpdGVwYXBlclwiKSxcclxuICAgICAgaGFuZGxlcjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKCFub3RlYm9va1JlYWNoZWQpIHtcclxuICAgICAgICAgIG5vdGVib29rUmVhY2hlZCA9IHRydWU7XHJcbiAgICAgICAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJub3RlYm9va1wiKTtcclxuICAgICAgICAgIGNvbnN0IGFuaW1hdGlvblRyaWdnZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1haW5cIik7XHJcblxyXG4gICAgICAgICAgZWxlbWVudC5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudChcImNsaWNrXCIpKTtcclxuXHJcbiAgICAgICAgICBhbmltYXRpb25UcmlnZ2VyLnJlbW92ZUF0dHJpYnV0ZShcImJlZ2luXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSxcclxuICAgICAgb2Zmc2V0OiBcIjEwMCVcIlxyXG4gICAgfSk7XHJcblxyXG4gICAgbGV0IHN1cHBvcnQgPSBuZXcgV2F5cG9pbnQoe1xyXG4gICAgICBlbGVtZW50OiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnN1cHBvcnRcIiksXHJcbiAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmICghc3VwcG9ydFJlYWNoZWQpIHtcclxuICAgICAgICAgIHN1cHBvcnRSZWFjaGVkID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICBhbmltYXRlTWFwKCk7XHJcblxyXG4gICAgICAgICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbGFuZC1wYXJ0c1wiKTtcclxuXHJcbiAgICAgICAgICBlbGVtZW50LmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KFwiY2xpY2tcIikpO1xyXG4gICAgICAgICAgZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoXCJiZWdpblwiKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICAgIG9mZnNldDogXCI0MCVcIlxyXG4gICAgfSk7XHJcblxyXG4gICAgbGV0IGFpcmRyb3AgPSBuZXcgV2F5cG9pbnQoe1xyXG4gICAgICBlbGVtZW50OiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFpcmRyb3BcIiksXHJcbiAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmICghYWlyRHJvcFJlYWNoZWQpIHtcclxuICAgICAgICAgIGFpckRyb3BSZWFjaGVkID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICBhbmltYXRlQ3J5cHRvTWFjaGluZSgpO1xyXG5cclxuICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NyeXB0b1wiKTtcclxuICAgICAgICAgIGVsZW1lbnQuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoXCJjbGlja1wiKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgICBvZmZzZXQ6IFwiMTAwJVwiXHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAoaXNNb2JpbGUoKSkge1xyXG4gICAgICBsZXQgd2lkZ2V0ID0gbmV3IFdheXBvaW50KHtcclxuICAgICAgICBlbGVtZW50OiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmhvbWVfX3JpZ2h0XCIpLFxyXG4gICAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgaWYgKCF3aWRnZXRSZWFjaGVkKSB7XHJcbiAgICAgICAgICAgIHdpZGdldFJlYWNoZWQgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgbGV0IHRvdWNoc3RhcnRYID0gMDtcclxuICAgICAgICAgICAgbGV0IHRvdWNoc3RhcnRZID0gMDtcclxuICAgICAgICAgICAgbGV0IHRvdWNoZW5kWCA9IDA7XHJcbiAgICAgICAgICAgIGxldCB0b3VjaGVuZFkgPSAwO1xyXG5cclxuICAgICAgICAgICAgaW5pdE1vYmlsZVBvcHVwSW50ZXJhY3Rpb24oKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIG9mZnNldDogXCIyNSVcIlxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGlzTW9iaWxlKCkge1xyXG4gICAgcmV0dXJuIHdpbmRvdy5pbm5lcldpZHRoIDw9IDY1MDtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGluaXRUaW1lcih5ZWFyLCBtb250aCwgd2VlaywgZGF5KSB7XHJcbiAgICBjb25zdCB0aW1lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGltZXJcIik7XHJcbiAgICBjb25zdCBkYXlzID0gdGltZXIucXVlcnlTZWxlY3RvcihcIi50aW1lcl9fZGF5c1wiKTtcclxuICAgIGNvbnN0IG1pbnMgPSB0aW1lci5xdWVyeVNlbGVjdG9yKFwiLnRpbWVyX19taW51dGVzXCIpO1xyXG4gICAgY29uc3Qgc2VjcyA9IHRpbWVyLnF1ZXJ5U2VsZWN0b3IoXCIudGltZXJfX3NlY29uZHNcIik7XHJcbiAgICBjb25zdCBob3VycyA9IHRpbWVyLnF1ZXJ5U2VsZWN0b3IoXCIudGltZXJfX2hvdXJzXCIpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogSW5pdGlhbGl6YXRpb25cclxuICAgICAqL1xyXG4gICAgbGV0IGRhdGUgPSBuZXcgRGF0ZSh5ZWFyLCBtb250aCwgZGF5LCAwLCAwLCAwKTtcclxuXHJcbiAgICBkYXlzLmlubmVySFRNTCA9IHdyYXBXaXRoWmVybyhkYXRlLmdldERheSgpKTtcclxuICAgIG1pbnMuaW5uZXJIVE1MID0gd3JhcFdpdGhaZXJvKGRhdGUuZ2V0TWludXRlcygpKTtcclxuICAgIHNlY3MuaW5uZXJIVE1MID0gd3JhcFdpdGhaZXJvKGRhdGUuZ2V0U2Vjb25kcygpKTtcclxuICAgIGhvdXJzLmlubmVySFRNTCA9IHdyYXBXaXRoWmVybyhkYXRlLmdldEhvdXJzKCkpO1xyXG5cclxuICAgIHNldEludGVydmFsKGRlY3JlYXNlLCAxMDAwKTtcclxuXHJcbiAgICBmdW5jdGlvbiBkZWNyZWFzZSgpIHtcclxuICAgICAgY29uc3QgdGltZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRpbWVyXCIpO1xyXG4gICAgICBjb25zdCBkYXlzID0gdGltZXIucXVlcnlTZWxlY3RvcihcIi50aW1lcl9fZGF5c1wiKTtcclxuICAgICAgY29uc3QgbWlucyA9IHRpbWVyLnF1ZXJ5U2VsZWN0b3IoXCIudGltZXJfX21pbnV0ZXNcIik7XHJcbiAgICAgIGNvbnN0IHNlY3MgPSB0aW1lci5xdWVyeVNlbGVjdG9yKFwiLnRpbWVyX19zZWNvbmRzXCIpO1xyXG4gICAgICBjb25zdCBob3VycyA9IHRpbWVyLnF1ZXJ5U2VsZWN0b3IoXCIudGltZXJfX2hvdXJzXCIpO1xyXG5cclxuICAgICAgbGV0IHMgPSArc2Vjcy5pbm5lckhUTUwsXHJcbiAgICAgICAgbSA9ICttaW5zLmlubmVySFRNTCxcclxuICAgICAgICBoID0gK2hvdXJzLmlubmVySFRNTCxcclxuICAgICAgICBkID0gK2RheXMuaW5uZXJIVE1MO1xyXG5cclxuICAgICAgaWYgKHMgPiAwKSAtLXM7XHJcblxyXG4gICAgICBpZiAocyA9PT0gMCkge1xyXG4gICAgICAgIHMgPSA1OTtcclxuICAgICAgICBpZiAobSA+IDApIG0tLTtcclxuICAgICAgfVxyXG4gICAgICBpZiAobSA9PT0gMCkge1xyXG4gICAgICAgIG0gPSA1OTtcclxuICAgICAgICBpZiAoaCA+IDApIGgtLTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoaCA9PT0gMCkge1xyXG4gICAgICAgIGggPSAyMztcclxuICAgICAgICBpZiAoZCA+IDApIGQtLTtcclxuICAgICAgfVxyXG5cclxuICAgICAgc2Vjcy5pbm5lckhUTUwgPSBzO1xyXG4gICAgICBtaW5zLmlubmVySFRNTCA9IG07XHJcbiAgICAgIGhvdXJzLmlubmVySFRNTCA9IGg7XHJcbiAgICAgIGRheXMuaW5uZXJIVE1MID0gZDtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiB3cmFwV2l0aFplcm8oc3RyaW5nKSB7XHJcbiAgICAgIHN0cmluZyA9IHN0cmluZyArIFwiXCI7XHJcblxyXG4gICAgICBpZiAoc3RyaW5nLmxlbmd0aCA8IDIpIHtcclxuICAgICAgICBzdHJpbmcgPSBcIjBcIiArIHN0cmluZztcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gc3RyaW5nO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gaW5pdFNsaWRlcigpIHtcclxuICAgIGlmICh3aW5kb3cuaW5uZXJXaWR0aCA8PSA2NTApIHtcclxuICAgICAgJChcIi5ob3ctaXQtd29ya3NfX2NhcmRzXCIpLm93bENhcm91c2VsKHtcclxuICAgICAgICBpdGVtczogMSxcclxuICAgICAgICBtYXJnaW46IDMwLFxyXG4gICAgICAgIHBhZGRpbmc6IDMwXHJcbiAgICAgIH0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgJChcIi5ob3ctaXQtd29ya3NfX2NhcmRzXCIpLnRyaWdnZXIoXCJkZXN0cm95Lm93bC5jYXJvdXNlbFwiKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGFuaW1hdGVNYXAoKSB7XHJcbiAgICBjb25zdCBtYXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI21hcFwiKTtcclxuICAgIGNvbnN0IGRvdHMgPSBtYXAucXVlcnlTZWxlY3RvcihcIi5kb3RzXCIpO1xyXG5cclxuICAgIEFycmF5LmZyb20oZG90cy5jaGlsZE5vZGVzKS5mb3JFYWNoKGRvdCA9PiB7XHJcbiAgICAgIGNvbnN0IHBhdGggPSBkb3QucXVlcnlTZWxlY3RvcihcInBhdGhcIik7XHJcbiAgICAgIHBhdGguc2V0QXR0cmlidXRlKFwib3BhY2l0eVwiLCBcIjFcIik7XHJcbiAgICAgIHBhdGguaW5uZXJIVE1MID0gY3JlYXRlQW5pbWF0aW9uRWxlbWVudChcImFuaW1hdGVcIiwge1xyXG4gICAgICAgIFwieGxpbms6aHJlZlwiOiBcIiNcIiArIHBhdGguaWQsXHJcbiAgICAgICAgYXR0cmlidXRlTmFtZTogXCJvcGFjaXR5XCIsXHJcbiAgICAgICAgZHVyOiBgJHtNYXRoLnJhbmRvbSgpICogMiArIDAuNX1zYCxcclxuICAgICAgICBmcm9tOiBcIjFcIixcclxuICAgICAgICB0bzogXCIwXCIsXHJcbiAgICAgICAgcmVwZWF0Q291bnQ6IFwiaW5kZWZpbml0ZVwiLFxyXG4gICAgICAgIGJlZ2luOiBcImRvdHMtYW5pbS5lbmQgKyAuMnNcIlxyXG4gICAgICB9KS5vdXRlckhUTUw7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGNyZWF0ZUFuaW1hdGlvbkVsZW1lbnQoYW5pbWF0aW9uRWxlbWVudCwgY29uZmlnKSB7XHJcbiAgICBpZiAoIWNvbmZpZykge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgYW5pbWF0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChhbmltYXRpb25FbGVtZW50KTtcclxuICAgIGZvciAobGV0IG9wdGlvbiBpbiBjb25maWcpIHtcclxuICAgICAgYW5pbWF0aW9uLnNldEF0dHJpYnV0ZShvcHRpb24sIGNvbmZpZ1tvcHRpb25dKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gYW5pbWF0aW9uO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gYW5pbWF0ZUNyeXB0b01hY2hpbmUoKSB7XHJcbiAgICBjb25zdCBjcnlwdG9NYWNoaW5lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjcnlwdG9cIik7XHJcblxyXG4gICAgY29uc3QgY2lyY2xlcyA9IGNyeXB0b01hY2hpbmUucXVlcnlTZWxlY3RvckFsbChcIi5jaXJjbGVcIik7XHJcbiAgICBjb25zdCBzdWJzdHJhdGVzID0gY3J5cHRvTWFjaGluZS5xdWVyeVNlbGVjdG9yQWxsKFwiLnN1YnN0cmF0ZVwiKTtcclxuXHJcbiAgICBpbml0QW5pbWF0ZWRMaW5lcyhjcnlwdG9NYWNoaW5lKTtcclxuXHJcbiAgICBzdWJzdHJhdGVzLmZvckVhY2goKHN1YnN0cmF0ZSwgaW5kZXgpID0+IHtcclxuICAgICAgc3Vic3RyYXRlLnNldEF0dHJpYnV0ZShcImlkXCIsIGBzdWJzdHJhdGUtJHtpbmRleH1gKTtcclxuICAgICAgc3Vic3RyYXRlLnNldEF0dHJpYnV0ZShcIm9wYWNpdHlcIiwgXCIwXCIpO1xyXG4gICAgICBjb25zdCBhbmltYXRpb24gPSBjcmVhdGVBbmltYXRpb25FbGVtZW50KFwiYW5pbWF0ZVwiLCB7XHJcbiAgICAgICAgXCJ4bGluazpocmVmXCI6IGAjc3Vic3RyYXRlLSR7aW5kZXh9YCxcclxuICAgICAgICBhdHRyaWJ1dGVOYW1lOiBcIm9wYWNpdHlcIixcclxuICAgICAgICBkdXI6IGAyc2AsXHJcbiAgICAgICAgZnJvbTogXCIwXCIsXHJcbiAgICAgICAgdG86IFwiMVwiLFxyXG4gICAgICAgIGJlZ2luOiBcImNyeXB0by1hbmltLmVuZCArIC41c1wiLFxyXG4gICAgICAgIGZpbGw6IFwiZnJlZXplXCJcclxuICAgICAgfSk7XHJcbiAgICAgIGFkZEFuaW1hdGlvblRvU3ZnRWxlbWVudChzdWJzdHJhdGUsIGFuaW1hdGlvbik7XHJcbiAgICB9KTtcclxuXHJcbiAgICBjaXJjbGVzLmZvckVhY2goKGNpcmNsZSwgaW5kZXgpID0+IHtcclxuICAgICAgY2lyY2xlLnNldEF0dHJpYnV0ZShcImlkXCIsIGBjaXJjbGUtJHtpbmRleH1gKTtcclxuICAgICAgY2lyY2xlLnNldEF0dHJpYnV0ZShcIm9wYWNpdHlcIiwgXCIwXCIpO1xyXG4gICAgICBjb25zdCBhbmltYXRpb24gPSBjcmVhdGVBbmltYXRpb25FbGVtZW50KFwiYW5pbWF0ZVwiLCB7XHJcbiAgICAgICAgXCJ4bGluazpocmVmXCI6IGAjY2lyY2xlLSR7aW5kZXh9YCxcclxuICAgICAgICBhdHRyaWJ1dGVOYW1lOiBcIm9wYWNpdHlcIixcclxuICAgICAgICBkdXI6IGAke01hdGgucmFuZG9tKCkgKiAzICsgMX1zYCxcclxuICAgICAgICB2YWx1ZXM6IFwiLjU7IC42OyAxOyAuNzsgLjRcIixcclxuICAgICAgICBiZWdpbjogXCJjcnlwdG8tYW5pbS5lbmQgKyAuNXNcIixcclxuICAgICAgICByZXBlYXRDb3VudDogXCJpbmRlZmluaXRlXCJcclxuICAgICAgfSk7XHJcbiAgICAgIGFkZEFuaW1hdGlvblRvU3ZnRWxlbWVudChjaXJjbGUsIGFuaW1hdGlvbik7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGluaXRBbmltYXRlZExpbmVzKHJvb3QpIHtcclxuICAgIGNyZWF0ZUFuaW1hdGVkTGluZShcIiNsaW5lLTFcIiwgMC4wMDEsIDEwKTtcclxuICAgIGNyZWF0ZUFuaW1hdGVkTGluZShcIiNsaW5lLTJcIiwgMC4xLCAyMCk7XHJcbiAgICBjcmVhdGVBbmltYXRlZExpbmUoXCIjbGluZS0zXCIsIDAuMiwgNTApO1xyXG4gICAgY3JlYXRlQW5pbWF0ZWRMaW5lKFwiI2xpbmUtNFwiLCAwLjMsIDUwKTtcclxuICAgIGNyZWF0ZUFuaW1hdGVkTGluZShcIiNsaW5lLTVcIiwgMC40LCA0MCk7XHJcbiAgICBjcmVhdGVBbmltYXRlZExpbmUoXCIjbGluZS02XCIsIDAuNSwgMTApO1xyXG5cclxuICAgIGZ1bmN0aW9uIGNyZWF0ZUFuaW1hdGVkTGluZShsaW5lSWQsIGRlbGF5LCBtb3ZpbmdIZWlnaHQpIHtcclxuICAgICAgY29uc3QgbGluZSA9IHJvb3QucXVlcnlTZWxlY3RvcihsaW5lSWQpO1xyXG4gICAgICBjb25zdCBsaW5lQW5pbWF0aW9uQ29uZmlnID0gY3JlYXRlQW5pbWF0aW9uRWxlbWVudChcImFuaW1hdGVUcmFuc2Zvcm1cIiwge1xyXG4gICAgICAgIGF0dHJpYnV0ZU5hbWU6IFwidHJhbnNmb3JtXCIsXHJcbiAgICAgICAgZHVyOiBgMnNgLFxyXG4gICAgICAgIGJlZ2luOiBgY3J5cHRvLWFuaW0uZW5kICsgJHtkZWxheX1zYCxcclxuICAgICAgICB0eXBlOiBcInRyYW5zbGF0ZVwiLFxyXG4gICAgICAgIHZhbHVlczogYDAgMDsgMCAtJHttb3ZpbmdIZWlnaHR9OyAwIDA7IDAgJHttb3ZpbmdIZWlnaHR9OyAwIDA7YCxcclxuICAgICAgICByZXBlYXRDb3VudDogXCJpbmRlZmluaXRlXCJcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBhZGRBbmltYXRpb25Ub1N2Z0VsZW1lbnQobGluZSwgbGluZUFuaW1hdGlvbkNvbmZpZyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBhZGRBbmltYXRpb25Ub1N2Z0VsZW1lbnQoZWxlbWVudCwgYW5pbWF0aW9uKSB7XHJcbiAgICBlbGVtZW50LmlubmVySFRNTCA9IGFuaW1hdGlvbi5vdXRlckhUTUw7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBkZWxlZ2F0ZVdpZGdldEV2ZW50TGlzdGVuZXJzKCkge1xyXG4gICAgaWYgKCFpc01vYmlsZSgpKSB7XHJcbiAgICAgIGxldCBmbiA9IGRlYm91bmNlKGlzTW91c2VPbldpZGdldCwgNTApO1xyXG4gICAgICBib2R5LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW1vdmVcIiwgZm4pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGlzTW91c2VPbldpZGdldChldmVudCkge1xyXG4gICAgICBjb25zdCBwb3NYID0gZXZlbnQuY2xpZW50WCxcclxuICAgICAgICBwb3NZID0gZXZlbnQuY2xpZW50WTtcclxuXHJcbiAgICAgIGNvbnN0IHBvcHVwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5ob21lX19tb2RhbFwiKTtcclxuXHJcbiAgICAgIGNvbnN0IGlzT25XaWRnZXQgPSBpc09uRWxlbWVudChwb3NYLCBwb3NZLCBcIi5ob21lX19yaWdodCAud2lkZ2V0XCIpO1xyXG4gICAgICBjb25zdCBpc09uQnV0dG9uID0gaXNPbkVsZW1lbnQocG9zWCwgcG9zWSwgXCIud2lkZ2V0X19idXR0b25cIik7XHJcbiAgICAgIGNvbnN0IGlzT25Qb3B1cCA9IGlzT25FbGVtZW50KHBvc1gsIHBvc1ksIFwiLmhvbWVfX21vZGFsXCIpO1xyXG4gICAgICBjb25zdCBpc09uSW5wdXQgPSBpc09uRWxlbWVudChwb3NYLCBwb3NZLCBcIi53aWRnZXRfX3NsaWRlclwiKTtcclxuXHJcbiAgICAgIGlmIChcclxuICAgICAgICAoaXNPbldpZGdldCB8fCBpc09uUG9wdXApICYmXHJcbiAgICAgICAgIWlzT25CdXR0b24gJiZcclxuICAgICAgICAhaXNPbklucHV0ICYmXHJcbiAgICAgICAgIWhhc01vdXNlKClcclxuICAgICAgKSB7XHJcbiAgICAgICAgYm9keS5jbGFzc0xpc3QuYWRkKFwid2lkZ2V0LW9uLWhvdmVyXCIpO1xyXG4gICAgICAgIHBvcHVwLmNsYXNzTGlzdC5hZGQoXCJzaG93ZWRcIik7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29uc3QgZGVsYXkgPSAzMDA7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICBib2R5LmNsYXNzTGlzdC5yZW1vdmUoXCJ3aWRnZXQtb24taG92ZXJcIik7XHJcbiAgICAgICAgICBwb3B1cC5jbGFzc0xpc3QucmVtb3ZlKFwic2hvd2VkXCIpO1xyXG4gICAgICAgIH0sIGRlbGF5KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gaXNPbkVsZW1lbnQocG9zWCwgcG9zWSwgZWxlbWVudFRhZykge1xyXG4gICAgY29uc3QgZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGVsZW1lbnRUYWcpO1xyXG4gICAgY29uc3QgZWxQb3NJbmZvID0gZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcblxyXG4gICAgY29uc3QgZWxfeDEgPSBlbFBvc0luZm8ueDtcclxuICAgIGNvbnN0IGVsX3kxID0gZWxQb3NJbmZvLnk7XHJcbiAgICBjb25zdCBlbF94MiA9IGVsX3gxICsgZWxQb3NJbmZvLndpZHRoO1xyXG4gICAgY29uc3QgZWxfeTIgPSBlbF95MSArIGVsUG9zSW5mby5oZWlnaHQ7XHJcblxyXG4gICAgcmV0dXJuIHBvc1ggPj0gZWxfeDEgJiYgcG9zWCA8PSBlbF94MiAmJiBwb3NZID49IGVsX3kxICYmIHBvc1kgPD0gZWxfeTI7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBzaG93UG9wdXAoKSB7XHJcbiAgICBjb25zdCBwb3B1cCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaG9tZV9fbW9kYWxcIik7XHJcblxyXG4gICAgYm9keS5jbGFzc0xpc3QuYWRkKFwid2lkZ2V0LW9uLWhvdmVyXCIpO1xyXG4gICAgcG9wdXAuY2xhc3NMaXN0LmFkZChcInNob3dlZFwiKTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGhpZGVXaWRnZXQoKSB7XHJcbiAgICBjb25zdCB3aWRnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmhvbWVfX3JpZ2h0IC53aWRnZXRcIik7XHJcbiAgICB3aWRnZXQuY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGluaXRNb2JpbGVQb3B1cEludGVyYWN0aW9uKCkge1xyXG4gICAgY29uc3Qgd2lkZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5ob21lX19yaWdodCAud2lkZ2V0XCIpO1xyXG4gICAgY29uc3QgcG9wdXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmhvbWVfX21vZGFsXCIpO1xyXG4gICAgY29uc3QgaG9tZVNlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmhvbWVcIik7XHJcblxyXG4gICAgc2hvd1BvcHVwKCk7XHJcbiAgICBoaWRlV2lkZ2V0KCk7XHJcblxyXG4gICAgLy9GcmVlemUgd2luZG93XHJcbiAgICBib2R5LmNsYXNzTGlzdC5hZGQoXCJuby1zY3JvbGxcIik7XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiaHRtbFwiKS5jbGFzc0xpc3QuYWRkKFwibm8tc2Nyb2xsXCIpO1xyXG5cclxuICAgIGhvbWVTZWN0aW9uLmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaHN0YXJ0XCIsIGhpZGVPblRvdWNoLCBmYWxzZSk7XHJcbiAgICBob21lU2VjdGlvbi5hZGRFdmVudExpc3RlbmVyKFwidG91Y2hzdGFydFwiLCBzZXRTdGFydFRvdWNoVmFyaWFibGVzLCBmYWxzZSk7XHJcblxyXG4gICAgaG9tZVNlY3Rpb24uYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoZW5kXCIsIHN3aXBlSGFuZGxlciwgZmFsc2UpO1xyXG5cclxuICAgIGZ1bmN0aW9uIGhpZGVPblRvdWNoKGUpIHtcclxuICAgICAgY29uc3QgZGVsYXkgPSAzMDA7XHJcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIHVuZnJlZXplRG9jdW1lbnQoKTtcclxuICAgICAgICBib2R5LmNsYXNzTGlzdC5yZW1vdmUoXCJ3aWRnZXQtb24taG92ZXJcIik7XHJcbiAgICAgICAgcG9wdXAuY2xhc3NMaXN0LnJlbW92ZShcInNob3dlZFwiKTtcclxuICAgICAgICB3aWRnZXQuY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcclxuICAgICAgfSwgZGVsYXkpO1xyXG5cclxuICAgICAgaG9tZVNlY3Rpb24ucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInRvdWNoc3RhcnRcIiwgaGlkZU9uVG91Y2gsIGZhbHNlKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBzZXRTdGFydFRvdWNoVmFyaWFibGVzKGV2ZW50KSB7XHJcbiAgICAgIHRvdWNoc3RhcnRYID0gZXZlbnQuY2hhbmdlZFRvdWNoZXNbMF0uc2NyZWVuWDtcclxuICAgICAgdG91Y2hzdGFydFkgPSBldmVudC5jaGFuZ2VkVG91Y2hlc1swXS5zY3JlZW5ZO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHN3aXBlSGFuZGxlcihldmVudCkge1xyXG4gICAgICBjb25zdCB3aWRnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmhvbWVfX3JpZ2h0IC53aWRnZXRcIik7XHJcbiAgICAgIGNvbnN0IHBvcHVwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5ob21lX19tb2RhbFwiKTtcclxuXHJcbiAgICAgIHRvdWNoZW5kWCA9IGV2ZW50LmNoYW5nZWRUb3VjaGVzWzBdLnNjcmVlblg7XHJcbiAgICAgIHRvdWNoZW5kWSA9IGV2ZW50LmNoYW5nZWRUb3VjaGVzWzBdLnNjcmVlblk7XHJcbiAgICAgIHRhcmdldCA9IGV2ZW50LnRhcmdldDtcclxuICAgICAgXHJcbiAgICAgIGlmIChNYXRoLmFicyh0b3VjaGVuZFggLSB0b3VjaHN0YXJ0WCkgPD0gd2luZG93LmlubmVyV2lkdGggLyA0KSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9IGVsc2UgaWYgKHRvdWNoZW5kWCA+PSB0b3VjaHN0YXJ0WCkge1xyXG4gICAgICAgIGlmICh0YXJnZXQuY2xvc2VzdChcIi53aWRnZXRcIikpIHtcclxuICAgICAgICAgIHNob3dQb3B1cCgpO1xyXG4gICAgICAgICAgaGlkZVdpZGdldCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBpZiAodGFyZ2V0LmNsb3Nlc3QoXCIud2lkZ2V0XCIpKSB7XHJcbiAgICAgICAgICBib2R5LmNsYXNzTGlzdC5yZW1vdmUoXCJ3aWRnZXQtb24taG92ZXJcIik7XHJcbiAgICAgICAgICBwb3B1cC5jbGFzc0xpc3QucmVtb3ZlKFwic2hvd2VkXCIpO1xyXG4gICAgICAgICAgd2lkZ2V0LmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBkZWJvdW5jZShmLCBtcykge1xyXG4gICAgbGV0IHRpbWVyID0gbnVsbDtcclxuXHJcbiAgICByZXR1cm4gZnVuY3Rpb24oLi4uYXJncykge1xyXG4gICAgICBjb25zdCBvbkNvbXBsZXRlID0gKCkgPT4ge1xyXG4gICAgICAgIGYuYXBwbHkodGhpcywgYXJncyk7XHJcbiAgICAgICAgdGltZXIgPSBudWxsO1xyXG4gICAgICB9O1xyXG5cclxuICAgICAgaWYgKHRpbWVyKSB7XHJcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVyKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgdGltZXIgPSBzZXRUaW1lb3V0KG9uQ29tcGxldGUsIG1zKTtcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBhZGRFdmVudExpc3RlbmVycygpIHtcclxuICAgIGNvbnN0IGRlc2t0b3BCcmVha3BvaW4gPSAxMjAwO1xyXG4gICAgY29uc3QgbW9iaWxlQnJlYWtwb2ludCA9IDY1MDtcclxuXHJcbiAgICBkZWxlZ2F0ZVdpZGdldEV2ZW50TGlzdGVuZXJzKCk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBCaW5kIGEgc2xpZGVyIGRhdGEgY2hhbmdpbmcgd2l0aCBhIHZpZXdcclxuICAgICAqL1xyXG4gICAgc2xpZGVyLmFkZEV2ZW50TGlzdGVuZXIoXHJcbiAgICAgIFwiY2hhbmdlXCIsXHJcbiAgICAgIGV2ZW50ID0+IChzdW1tYXJ5LmlubmVySFRNTCA9IGV2ZW50LmN1cnJlbnRUYXJnZXQudmFsdWUpXHJcbiAgICApO1xyXG5cclxuICAgIGlmICh3aW5kb3cuaW5uZXJXaWR0aCA+PSBkZXNrdG9wQnJlYWtwb2luICYmIGlzRG9jdW1lbnRGcm96ZW4oKSkge1xyXG4gICAgICBib2R5LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZXdoZWVsXCIsIHNjcm9sbFRvU2VjdGlvbiwgeyBwYXNzaXZlOiB0cnVlIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh3aW5kb3cuaW5uZXJXaWR0aCA8PSBtb2JpbGVCcmVha3BvaW50KSB7XHJcbiAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIGluaXRTbGlkZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsICgpID0+IHtcclxuICAgICAgY29uc3QgaGVhZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5oZWFkZXJcIik7XHJcblxyXG4gICAgICBpZiAoaGVhZGVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmJvdHRvbSA8IHdpbmRvdy5wYWdlWU9mZnNldCkge1xyXG4gICAgICAgIGhlYWRlci5jbGFzc0xpc3QuYWRkKFwiZml4ZWRcIik7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaGVhZGVyLmNsYXNzTGlzdC5yZW1vdmUoXCJmaXhlZFwiKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgd2luZG93LmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KFwic2Nyb2xsXCIpKTtcclxuXHJcbiAgICBhZGRCdXR0b25zRXZlbnRMaXN0ZW5lcnMoKTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHNjcm9sbFRvU2VjdGlvbigpIHtcclxuICAgIGNvbnN0IHNjcm9sbE1vdXNlVG8gPSAkKFwiI3Njcm9sbC10b1wiKS5vZmZzZXQoKS50b3A7XHJcbiAgICBjb25zdCBzY3JvbGxUaW1lID0gOTAwO1xyXG4gICAgY29uc3QgZGVsYXkgPSA1MDA7XHJcblxyXG4gICAgaGlkZU1vdXNlKCk7XHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgdW5mcmVlemVEb2N1bWVudCgpO1xyXG4gICAgICAkKFwiaHRtbCwgYm9keVwiKS5hbmltYXRlKFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIHNjcm9sbFRvcDogc2Nyb2xsTW91c2VUbyxcclxuICAgICAgICAgIGVhc2U6IFwiZWFzZU91dEJhY2tcIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2Nyb2xsVGltZVxyXG4gICAgICApO1xyXG4gICAgfSwgZGVsYXkpO1xyXG5cclxuICAgIGJvZHkucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNld2hlZWxcIiwgc2Nyb2xsVG9TZWN0aW9uKTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGlzRG9jdW1lbnRGcm96ZW4oKSB7XHJcbiAgICByZXR1cm4gZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuY29udGFpbnMoXCJuby1zY3JvbGxcIik7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiB1bmZyZWV6ZURvY3VtZW50KCkge1xyXG4gICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QucmVtb3ZlKFwibm8tc2Nyb2xsXCIpO1xyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImh0bWxcIikuY2xhc3NMaXN0LnJlbW92ZShcIm5vLXNjcm9sbFwiKTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHJlbW92ZUxvYWRlcigpIHtcclxuICAgIGNvbnN0IGxvYWRlckhUTUwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmxvYWRlci13cmFwcGVyXCIpO1xyXG4gICAgY29uc3QgbG9hZGVyU2NyaXB0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNsb2FkZXItc2NyaXB0XCIpO1xyXG4gICAgY29uc3QgbG9hZGVyTGliID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNsb2FkZXItbGliXCIpO1xyXG5cclxuICAgIGxvYWRlckxpYi5yZW1vdmUoKTtcclxuICAgIGxvYWRlclNjcmlwdC5yZW1vdmUoKTtcclxuXHJcbiAgICBjb25zdCB0aW1lVG9Mb2FkZXJIaWRlID0gMjAwMDtcclxuICAgIGxvYWRlckhUTUwuY2xhc3NMaXN0LmFkZChcInJlbW92ZWRcIik7XHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IGxvYWRlckhUTUwucmVtb3ZlKCksIHRpbWVUb0xvYWRlckhpZGUpO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gZnJlZXplRG9jdW1lbnQoKSB7XHJcbiAgICBjb25zdCBzY3JvbGxNb3VzZVRvID0gJChcIiNzY3JvbGwtdG9cIikub2Zmc2V0KCkudG9wO1xyXG5cclxuICAgIGlmIChcclxuICAgICAgd2luZG93LmlubmVyV2lkdGggPj0gMTIwMCAmJlxyXG4gICAgICAoc2Nyb2xsTW91c2VUbyAqIDEwKSAvIDEwID49IHdpbmRvdy5wYWdlWU9mZnNldFxyXG4gICAgKSB7XHJcbiAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZChcIm5vLXNjcm9sbFwiKTtcclxuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImh0bWxcIikuY2xhc3NMaXN0LmFkZChcIm5vLXNjcm9sbFwiKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGhpZGVNb3VzZSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gaGlkZU1vdXNlKCkge1xyXG4gICAgY29uc3QgbW91c2UgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1vdXNlXCIpO1xyXG4gICAgbW91c2UuY2xhc3NMaXN0LmFkZChcInNjYWxlZFwiKTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGhhc01vdXNlKCkge1xyXG4gICAgcmV0dXJuICFkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1vdXNlXCIpLmNsYXNzTGlzdC5jb250YWlucyhcInNjYWxlZFwiKTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGFkZEJ1dHRvbnNFdmVudExpc3RlbmVycygpIHtcclxuICAgIGNvbnN0IGJ1dHRvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmJ1dHRvbi0tc2Nyb2xsLXRvLXRvcFwiKTtcclxuICAgIGJ1dHRvbnMuZm9yRWFjaChidXR0b24gPT4gYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBzY3JvbGxUb1RvcCkpO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gc2Nyb2xsVG9Ub3AoKSB7XHJcbiAgICBsZXQgdG8gPSAwO1xyXG5cclxuICAgIGlmICh3aW5kb3cuaW5uZXJXaWR0aCA8PSA2NTApIHtcclxuICAgICAgY29uc3Qgd2lkZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5ob21lX19yaWdodCAud2lkZ2V0XCIpO1xyXG4gICAgICBjb25zdCB3aWRnZXRFbGVtZW50RGF0YSA9IHdpZGdldC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuXHJcbiAgICAgIHRvID0gd2lkZ2V0RWxlbWVudERhdGEuaGVpZ2h0IC8gMjtcclxuICAgIH1cclxuXHJcbiAgICAkKFwiaHRtbCwgYm9keVwiKS5hbmltYXRlKFxyXG4gICAgICB7XHJcbiAgICAgICAgc2Nyb2xsVG9wOiB0byxcclxuICAgICAgICBlYXNlOiBcImVhc2VPdXRCYWNrXCJcclxuICAgICAgfSxcclxuICAgICAgOTAwXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gaW5pdEFuaW1hdGlvbnMoKSB7XHJcbiAgICAvKipcclxuICAgICAqIFNldHVwIHlvdXIgTGF6eSBMaW5lIGVsZW1lbnQuXHJcbiAgICAgKiBzZWUgUkVBRE1FIGZpbGUgZm9yIG1vcmUgc2V0dGluZ3NcclxuICAgICAqL1xyXG4gICAgY29uc3QgYW5pbWF0aW9uc0NvbmZpZyA9IHtcclxuICAgICAgZWFzZTogXCJlYXNlSW5RdWFkXCIsXHJcbiAgICAgIHN0cm9rZVdpZHRoOiAwLjUsXHJcbiAgICAgIHN0cm9rZU9wYWNpdHk6IDEsXHJcbiAgICAgIHN0cm9rZUNvbG9yOiBcIiNmZmZmZmZcIlxyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBsb2dvQW5pbWF0aW9uc0NvbmZpZyA9IHtcclxuICAgICAgZWFzZTogXCJlYXNlSW5RdWFkXCIsXHJcbiAgICAgIHN0cm9rZVdpZHRoOiA0LFxyXG4gICAgICBzdHJva2VPcGFjaXR5OiAxLFxyXG4gICAgICBzdHJva2VDb2xvcjogXCIjZmZmZmZmXCJcclxuICAgIH07XHJcblxyXG4gICAgbGV0IHRlYW1JY29uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0ZWFtXCIpO1xyXG4gICAgbGV0IGNhbGVuZGFySWNvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY2FsZW5kYXJcIik7XHJcbiAgICBsZXQgbG9nb0ljb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2xvZ29cIik7XHJcblxyXG4gICAgbGV0IHRlYW1JY29uQW5pbWF0aW9uID0gbmV3IExhenlMaW5lUGFpbnRlcih0ZWFtSWNvbiwgYW5pbWF0aW9uc0NvbmZpZyk7XHJcbiAgICBsZXQgY2FsZW5kYXJJY29uQW5pbWF0aW9uID0gbmV3IExhenlMaW5lUGFpbnRlcihcclxuICAgICAgY2FsZW5kYXJJY29uLFxyXG4gICAgICBhbmltYXRpb25zQ29uZmlnXHJcbiAgICApO1xyXG4gICAgbGV0IGxvZ29JY29uQW5pbWF0aW9uID0gbmV3IExhenlMaW5lUGFpbnRlcihsb2dvSWNvbiwgbG9nb0FuaW1hdGlvbnNDb25maWcpO1xyXG5cclxuICAgIHRlYW1JY29uQW5pbWF0aW9uLnBhaW50KCk7XHJcbiAgICBjYWxlbmRhckljb25BbmltYXRpb24ucGFpbnQoKTtcclxuICAgIGxvZ29JY29uQW5pbWF0aW9uLnBhaW50KCk7XHJcbiAgfVxyXG59KTtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zY3JpcHRzL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ3RDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Iiwic291cmNlUm9vdCI6IiJ9