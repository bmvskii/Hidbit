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

	  initTimer();

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
	          if (!isMobile()) {
	            const trigger = document.querySelector("#land-parts");

	            animateMap();

	            trigger.dispatchEvent(new Event("click"));
	            trigger.removeAttribute("begin");
	          }
	        }
	      },
	      offset: "40%"
	    });

	    let airdrop = new Waypoint({
	      element: document.querySelector(".airdrop"),
	      handler: function() {
	        if (!airDropReached) {
	          airDropReached = true;
	          if (!isMobile()) {
	            const trigger = document.querySelector("#crypto");

	            animateCryptoMachine();
	            
	            trigger.dispatchEvent(new Event("click"));
	          }
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

	  function hideMapElements() {
	    const map = document.querySelector("#map");
	    const dots = map.querySelector(".dots");
	    const lands = document.querySelector("#land-parts");

	    map.setAttribute("opacity", "1");
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

	    if (!isMobile()) {
	      hideMapElements();
	      hideCryptoMachineElements();
	    }
	  }
	});


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZmM2MTJmODEyMjAzZmI2ZjI0MDAiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvc2NyaXB0cy9cIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBmYzYxMmY4MTIyMDNmYjZmMjQwMCIsImRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsICgpID0+IHtcclxuICAvKipcclxuICAgKiBSZW1vdmUgdGhlIGxvYWRlciB3aGVuIGFsbCBzY3JpcHQgaGF2ZSBiZWVuIGxvYWRlZFxyXG4gICAqL1xyXG4gIHJlbW92ZUxvYWRlcigpO1xyXG4gIGZyZWV6ZURvY3VtZW50KCk7XHJcblxyXG4gIGNvbnN0IHNsaWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2xpZGVyXCIpO1xyXG4gIGNvbnN0IHN1bW1hcnkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLndpZGdldF9fY3VycmVudC1zdW1tYXJ5IC5zdW1tYXJ5XCIpO1xyXG4gIGNvbnN0IGJvZHkgPSBkb2N1bWVudC5ib2R5O1xyXG5cclxuICBhZGRFdmVudExpc3RlbmVycygpO1xyXG5cclxuICBpbml0QW5pbWF0aW9ucygpO1xyXG4gIGluaXRTbGlkZXIoKTtcclxuICBpbml0V2F5UG9pbnRzSW50ZXJhY3Rpb24oKTtcclxuXHJcbiAgaW5pdFRpbWVyKCk7XHJcblxyXG4gIGZ1bmN0aW9uIGluaXRXYXlQb2ludHNJbnRlcmFjdGlvbigpIHtcclxuICAgIGxldCByb2FkTWFwUmVhY2hlZCA9IGZhbHNlO1xyXG4gICAgbGV0IG5vdGVib29rUmVhY2hlZCA9IGZhbHNlO1xyXG4gICAgbGV0IHN1cHBvcnRSZWFjaGVkID0gZmFsc2U7XHJcbiAgICBsZXQgYWlyRHJvcFJlYWNoZWQgPSBmYWxzZTtcclxuICAgIGxldCB3aWRnZXRSZWFjaGVkID0gZmFsc2U7XHJcblxyXG4gICAgbGV0IHJvYWRtYXAgPSBuZXcgV2F5cG9pbnQoe1xyXG4gICAgICBlbGVtZW50OiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnJvYWQtbWFwXCIpLFxyXG4gICAgICBoYW5kbGVyOiBmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAoIXJvYWRNYXBSZWFjaGVkKSB7XHJcbiAgICAgICAgICByb2FkTWFwUmVhY2hlZCA9IHRydWU7XHJcbiAgICAgICAgICBjb25zdCByb2FkTGluZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucm9hZC1tYXBfX2xpbmVcIik7XHJcbiAgICAgICAgICBjb25zdCBwbGFuTGluZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnBsYW5fX3JvYWQtbGluZVwiKTtcclxuICAgICAgICAgIGNvbnN0IHBsYW5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5wbGFuXCIpO1xyXG4gICAgICAgICAgY29uc3QgY2lyY2xlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucGxhbl9fY2lyY2xlXCIpO1xyXG5cclxuICAgICAgICAgIHJvYWRMaW5lLmNsYXNzTGlzdC5hZGQoXCJzaG93ZWRcIik7XHJcbiAgICAgICAgICBjb25zdCBkZWxheSA9IDUwMDtcclxuXHJcbiAgICAgICAgICBwbGFuTGluZXMuZm9yRWFjaCgocGwsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IF9kZWxheSA9IGRlbGF5ICsgMTAwICogaW5kZXg7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgIHBsLmNsYXNzTGlzdC5hZGQoXCJzaG93ZWRcIik7XHJcbiAgICAgICAgICAgICAgY2lyY2xlc1tpbmRleF0uY2xhc3NMaXN0LmFkZChcInNob3dlZFwiKTtcclxuICAgICAgICAgICAgICBwbGFuc1tpbmRleF0uY2xhc3NMaXN0LmFkZChcInNob3dlZFwiKTtcclxuICAgICAgICAgICAgfSwgX2RlbGF5KTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfSxcclxuICAgICAgb2Zmc2V0OiBcIjQwJVwiXHJcbiAgICB9KTtcclxuXHJcbiAgICBsZXQgbm90ZWJvb2sgPSBuZXcgV2F5cG9pbnQoe1xyXG4gICAgICBlbGVtZW50OiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLndoaXRlcGFwZXJcIiksXHJcbiAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmICghbm90ZWJvb2tSZWFjaGVkKSB7XHJcbiAgICAgICAgICBub3RlYm9va1JlYWNoZWQgPSB0cnVlO1xyXG4gICAgICAgICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibm90ZWJvb2tcIik7XHJcbiAgICAgICAgICBjb25zdCBhbmltYXRpb25UcmlnZ2VyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtYWluXCIpO1xyXG5cclxuICAgICAgICAgIGVsZW1lbnQuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoXCJjbGlja1wiKSk7XHJcblxyXG4gICAgICAgICAgYW5pbWF0aW9uVHJpZ2dlci5yZW1vdmVBdHRyaWJ1dGUoXCJiZWdpblwiKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICAgIG9mZnNldDogXCIxMDAlXCJcclxuICAgIH0pO1xyXG5cclxuICAgIGxldCBzdXBwb3J0ID0gbmV3IFdheXBvaW50KHtcclxuICAgICAgZWxlbWVudDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zdXBwb3J0XCIpLFxyXG4gICAgICBoYW5kbGVyOiBmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAoIXN1cHBvcnRSZWFjaGVkKSB7XHJcbiAgICAgICAgICBzdXBwb3J0UmVhY2hlZCA9IHRydWU7XHJcbiAgICAgICAgICBpZiAoIWlzTW9iaWxlKCkpIHtcclxuICAgICAgICAgICAgY29uc3QgdHJpZ2dlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbGFuZC1wYXJ0c1wiKTtcclxuXHJcbiAgICAgICAgICAgIGFuaW1hdGVNYXAoKTtcclxuXHJcbiAgICAgICAgICAgIHRyaWdnZXIuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoXCJjbGlja1wiKSk7XHJcbiAgICAgICAgICAgIHRyaWdnZXIucmVtb3ZlQXR0cmlidXRlKFwiYmVnaW5cIik7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgICBvZmZzZXQ6IFwiNDAlXCJcclxuICAgIH0pO1xyXG5cclxuICAgIGxldCBhaXJkcm9wID0gbmV3IFdheXBvaW50KHtcclxuICAgICAgZWxlbWVudDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5haXJkcm9wXCIpLFxyXG4gICAgICBoYW5kbGVyOiBmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAoIWFpckRyb3BSZWFjaGVkKSB7XHJcbiAgICAgICAgICBhaXJEcm9wUmVhY2hlZCA9IHRydWU7XHJcbiAgICAgICAgICBpZiAoIWlzTW9iaWxlKCkpIHtcclxuICAgICAgICAgICAgY29uc3QgdHJpZ2dlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY3J5cHRvXCIpO1xyXG5cclxuICAgICAgICAgICAgYW5pbWF0ZUNyeXB0b01hY2hpbmUoKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRyaWdnZXIuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoXCJjbGlja1wiKSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgICBvZmZzZXQ6IFwiMTAwJVwiXHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAoaXNNb2JpbGUoKSkge1xyXG4gICAgICBsZXQgd2lkZ2V0ID0gbmV3IFdheXBvaW50KHtcclxuICAgICAgICBlbGVtZW50OiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmhvbWVfX3JpZ2h0XCIpLFxyXG4gICAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgaWYgKCF3aWRnZXRSZWFjaGVkKSB7XHJcbiAgICAgICAgICAgIHdpZGdldFJlYWNoZWQgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgbGV0IHRvdWNoc3RhcnRYID0gMDtcclxuICAgICAgICAgICAgbGV0IHRvdWNoc3RhcnRZID0gMDtcclxuICAgICAgICAgICAgbGV0IHRvdWNoZW5kWCA9IDA7XHJcbiAgICAgICAgICAgIGxldCB0b3VjaGVuZFkgPSAwO1xyXG5cclxuICAgICAgICAgICAgaW5pdE1vYmlsZVBvcHVwSW50ZXJhY3Rpb24oKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIG9mZnNldDogXCIyNSVcIlxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGlzTW9iaWxlKCkge1xyXG4gICAgcmV0dXJuIHdpbmRvdy5pbm5lcldpZHRoIDw9IDY1MDtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGluaXRUaW1lcih5ZWFyLCBtb250aCwgd2VlaywgZGF5KSB7XHJcbiAgICBjb25zdCB0aW1lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGltZXJcIik7XHJcbiAgICBjb25zdCBkYXlzID0gdGltZXIucXVlcnlTZWxlY3RvcihcIi50aW1lcl9fZGF5c1wiKTtcclxuICAgIGNvbnN0IG1pbnMgPSB0aW1lci5xdWVyeVNlbGVjdG9yKFwiLnRpbWVyX19taW51dGVzXCIpO1xyXG4gICAgY29uc3Qgc2VjcyA9IHRpbWVyLnF1ZXJ5U2VsZWN0b3IoXCIudGltZXJfX3NlY29uZHNcIik7XHJcbiAgICBjb25zdCBob3VycyA9IHRpbWVyLnF1ZXJ5U2VsZWN0b3IoXCIudGltZXJfX2hvdXJzXCIpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogSW5pdGlhbGl6YXRpb25cclxuICAgICAqL1xyXG5cclxuICAgIGRheXMuaW5uZXJIVE1MID0gd3JhcFdpdGhaZXJvKDE1KTtcclxuICAgIG1pbnMuaW5uZXJIVE1MID0gd3JhcFdpdGhaZXJvKDApO1xyXG4gICAgc2Vjcy5pbm5lckhUTUwgPSB3cmFwV2l0aFplcm8oMCk7XHJcbiAgICBob3Vycy5pbm5lckhUTUwgPSB3cmFwV2l0aFplcm8oMCk7XHJcblxyXG4gICAgc2V0SW50ZXJ2YWwoZGVjcmVhc2UsIDEwMDApO1xyXG5cclxuICAgIGZ1bmN0aW9uIGRlY3JlYXNlKCkge1xyXG4gICAgICBjb25zdCB0aW1lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGltZXJcIik7XHJcbiAgICAgIGNvbnN0IGRheXMgPSB0aW1lci5xdWVyeVNlbGVjdG9yKFwiLnRpbWVyX19kYXlzXCIpO1xyXG4gICAgICBjb25zdCBtaW5zID0gdGltZXIucXVlcnlTZWxlY3RvcihcIi50aW1lcl9fbWludXRlc1wiKTtcclxuICAgICAgY29uc3Qgc2VjcyA9IHRpbWVyLnF1ZXJ5U2VsZWN0b3IoXCIudGltZXJfX3NlY29uZHNcIik7XHJcbiAgICAgIGNvbnN0IGhvdXJzID0gdGltZXIucXVlcnlTZWxlY3RvcihcIi50aW1lcl9faG91cnNcIik7XHJcblxyXG4gICAgICBsZXQgcyA9ICtzZWNzLmlubmVySFRNTCxcclxuICAgICAgICBtID0gK21pbnMuaW5uZXJIVE1MLFxyXG4gICAgICAgIGggPSAraG91cnMuaW5uZXJIVE1MLFxyXG4gICAgICAgIGQgPSArZGF5cy5pbm5lckhUTUw7XHJcblxyXG4gICAgICBpZiAocyA+IDApIC0tcztcclxuXHJcbiAgICAgIGlmIChzID09PSAwKSB7XHJcbiAgICAgICAgcyA9IDU5O1xyXG4gICAgICAgIGlmIChtID4gMCkgbS0tO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChtID09PSAwKSB7XHJcbiAgICAgICAgbSA9IDU5O1xyXG4gICAgICAgIGlmIChoID4gMCkgaC0tO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChoID09PSAwKSB7XHJcbiAgICAgICAgaCA9IDIzO1xyXG4gICAgICAgIGlmIChkID4gMCkgZC0tO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBzZWNzLmlubmVySFRNTCA9IHM7XHJcbiAgICAgIG1pbnMuaW5uZXJIVE1MID0gbTtcclxuICAgICAgaG91cnMuaW5uZXJIVE1MID0gaDtcclxuICAgICAgZGF5cy5pbm5lckhUTUwgPSBkO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHdyYXBXaXRoWmVybyhzdHJpbmcpIHtcclxuICAgICAgc3RyaW5nID0gc3RyaW5nICsgXCJcIjtcclxuXHJcbiAgICAgIGlmIChzdHJpbmcubGVuZ3RoIDwgMikge1xyXG4gICAgICAgIHN0cmluZyA9IFwiMFwiICsgc3RyaW5nO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBzdHJpbmc7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBoaWRlQ3J5cHRvTWFjaGluZUVsZW1lbnRzKCkge1xyXG4gICAgY29uc3QgY3J5cHRvID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjcnlwdG9cIik7XHJcbiAgICBjcnlwdG8uc2V0QXR0cmlidXRlKFwib3BhY2l0eVwiLCBcIjBcIik7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBpbml0U2xpZGVyKCkge1xyXG4gICAgaWYgKGlzTW9iaWxlKCkpIHtcclxuICAgICAgJChcIi5ob3ctaXQtd29ya3NfX2NhcmRzXCIpLm93bENhcm91c2VsKHtcclxuICAgICAgICBpdGVtczogMSxcclxuICAgICAgICBtYXJnaW46IDMwLFxyXG4gICAgICAgIHBhZGRpbmc6IDMwXHJcbiAgICAgIH0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgJChcIi5ob3ctaXQtd29ya3NfX2NhcmRzXCIpLnRyaWdnZXIoXCJkZXN0cm95Lm93bC5jYXJvdXNlbFwiKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGFuaW1hdGVNYXAoKSB7XHJcbiAgICBjb25zdCBtYXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI21hcFwiKTtcclxuICAgIGNvbnN0IGRvdHMgPSBtYXAucXVlcnlTZWxlY3RvcihcIi5kb3RzXCIpO1xyXG5cclxuICAgIEFycmF5LmZyb20oZG90cy5jaGlsZE5vZGVzKS5mb3JFYWNoKGRvdCA9PiB7XHJcbiAgICAgIGNvbnN0IHBhdGggPSBkb3QucXVlcnlTZWxlY3RvcihcInBhdGhcIik7XHJcbiAgICAgIHBhdGguc2V0QXR0cmlidXRlKFwib3BhY2l0eVwiLCBcIjFcIik7XHJcbiAgICAgIHBhdGguaW5uZXJIVE1MID0gY3JlYXRlQW5pbWF0aW9uRWxlbWVudChcImFuaW1hdGVcIiwge1xyXG4gICAgICAgIFwieGxpbms6aHJlZlwiOiBcIiNcIiArIHBhdGguaWQsXHJcbiAgICAgICAgYXR0cmlidXRlTmFtZTogXCJvcGFjaXR5XCIsXHJcbiAgICAgICAgZHVyOiBgJHtNYXRoLnJhbmRvbSgpICogMiArIDAuNX1zYCxcclxuICAgICAgICBmcm9tOiBcIjFcIixcclxuICAgICAgICB0bzogXCIwXCIsXHJcbiAgICAgICAgcmVwZWF0Q291bnQ6IFwiaW5kZWZpbml0ZVwiLFxyXG4gICAgICAgIGJlZ2luOiBcImRvdHMtYW5pbS5lbmQgKyAuMnNcIlxyXG4gICAgICB9KS5vdXRlckhUTUw7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGhpZGVNYXBFbGVtZW50cygpIHtcclxuICAgIGNvbnN0IG1hcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbWFwXCIpO1xyXG4gICAgY29uc3QgZG90cyA9IG1hcC5xdWVyeVNlbGVjdG9yKFwiLmRvdHNcIik7XHJcbiAgICBjb25zdCBsYW5kcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbGFuZC1wYXJ0c1wiKTtcclxuXHJcbiAgICBtYXAuc2V0QXR0cmlidXRlKFwib3BhY2l0eVwiLCBcIjFcIik7XHJcbiAgICBkb3RzLnNldEF0dHJpYnV0ZShcIm9wYWNpdHlcIiwgXCIxXCIpO1xyXG4gICAgbGFuZHMuc2V0QXR0cmlidXRlKFwib3BhY2l0eVwiLCBcIjFcIik7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBjcmVhdGVBbmltYXRpb25FbGVtZW50KGFuaW1hdGlvbkVsZW1lbnQsIGNvbmZpZykge1xyXG4gICAgaWYgKCFjb25maWcpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGFuaW1hdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoYW5pbWF0aW9uRWxlbWVudCk7XHJcbiAgICBmb3IgKGxldCBvcHRpb24gaW4gY29uZmlnKSB7XHJcbiAgICAgIGFuaW1hdGlvbi5zZXRBdHRyaWJ1dGUob3B0aW9uLCBjb25maWdbb3B0aW9uXSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGFuaW1hdGlvbjtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGFuaW1hdGVDcnlwdG9NYWNoaW5lKCkge1xyXG4gICAgY29uc3QgY3J5cHRvTWFjaGluZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY3J5cHRvXCIpO1xyXG5cclxuICAgIGNvbnN0IGNpcmNsZXMgPSBjcnlwdG9NYWNoaW5lLnF1ZXJ5U2VsZWN0b3JBbGwoXCIuY2lyY2xlXCIpO1xyXG4gICAgY29uc3Qgc3Vic3RyYXRlcyA9IGNyeXB0b01hY2hpbmUucXVlcnlTZWxlY3RvckFsbChcIi5zdWJzdHJhdGVcIik7XHJcblxyXG4gICAgaW5pdEFuaW1hdGVkTGluZXMoY3J5cHRvTWFjaGluZSk7XHJcblxyXG4gICAgc3Vic3RyYXRlcy5mb3JFYWNoKChzdWJzdHJhdGUsIGluZGV4KSA9PiB7XHJcbiAgICAgIHN1YnN0cmF0ZS5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBgc3Vic3RyYXRlLSR7aW5kZXh9YCk7XHJcbiAgICAgIHN1YnN0cmF0ZS5zZXRBdHRyaWJ1dGUoXCJvcGFjaXR5XCIsIFwiMFwiKTtcclxuICAgICAgY29uc3QgYW5pbWF0aW9uID0gY3JlYXRlQW5pbWF0aW9uRWxlbWVudChcImFuaW1hdGVcIiwge1xyXG4gICAgICAgIFwieGxpbms6aHJlZlwiOiBgI3N1YnN0cmF0ZS0ke2luZGV4fWAsXHJcbiAgICAgICAgYXR0cmlidXRlTmFtZTogXCJvcGFjaXR5XCIsXHJcbiAgICAgICAgZHVyOiBgMnNgLFxyXG4gICAgICAgIGZyb206IFwiMFwiLFxyXG4gICAgICAgIHRvOiBcIjFcIixcclxuICAgICAgICBiZWdpbjogXCJjcnlwdG8tYW5pbS5lbmQgKyAuNXNcIixcclxuICAgICAgICBmaWxsOiBcImZyZWV6ZVwiXHJcbiAgICAgIH0pO1xyXG4gICAgICBhZGRBbmltYXRpb25Ub1N2Z0VsZW1lbnQoc3Vic3RyYXRlLCBhbmltYXRpb24pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgY2lyY2xlcy5mb3JFYWNoKChjaXJjbGUsIGluZGV4KSA9PiB7XHJcbiAgICAgIGNpcmNsZS5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBgY2lyY2xlLSR7aW5kZXh9YCk7XHJcbiAgICAgIGNpcmNsZS5zZXRBdHRyaWJ1dGUoXCJvcGFjaXR5XCIsIFwiMFwiKTtcclxuICAgICAgY29uc3QgYW5pbWF0aW9uID0gY3JlYXRlQW5pbWF0aW9uRWxlbWVudChcImFuaW1hdGVcIiwge1xyXG4gICAgICAgIFwieGxpbms6aHJlZlwiOiBgI2NpcmNsZS0ke2luZGV4fWAsXHJcbiAgICAgICAgYXR0cmlidXRlTmFtZTogXCJvcGFjaXR5XCIsXHJcbiAgICAgICAgZHVyOiBgJHtNYXRoLnJhbmRvbSgpICogMyArIDF9c2AsXHJcbiAgICAgICAgdmFsdWVzOiBcIi41OyAuNjsgMTsgLjc7IC40XCIsXHJcbiAgICAgICAgYmVnaW46IFwiY3J5cHRvLWFuaW0uZW5kICsgLjVzXCIsXHJcbiAgICAgICAgcmVwZWF0Q291bnQ6IFwiaW5kZWZpbml0ZVwiXHJcbiAgICAgIH0pO1xyXG4gICAgICBhZGRBbmltYXRpb25Ub1N2Z0VsZW1lbnQoY2lyY2xlLCBhbmltYXRpb24pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBpbml0QW5pbWF0ZWRMaW5lcyhyb290KSB7XHJcbiAgICBjcmVhdGVBbmltYXRlZExpbmUoXCIjbGluZS0xXCIsIDAuMDAxLCAxMCk7XHJcbiAgICBjcmVhdGVBbmltYXRlZExpbmUoXCIjbGluZS0yXCIsIDAuMSwgMjApO1xyXG4gICAgY3JlYXRlQW5pbWF0ZWRMaW5lKFwiI2xpbmUtM1wiLCAwLjIsIDUwKTtcclxuICAgIGNyZWF0ZUFuaW1hdGVkTGluZShcIiNsaW5lLTRcIiwgMC4zLCA1MCk7XHJcbiAgICBjcmVhdGVBbmltYXRlZExpbmUoXCIjbGluZS01XCIsIDAuNCwgNDApO1xyXG4gICAgY3JlYXRlQW5pbWF0ZWRMaW5lKFwiI2xpbmUtNlwiLCAwLjUsIDEwKTtcclxuXHJcbiAgICBmdW5jdGlvbiBjcmVhdGVBbmltYXRlZExpbmUobGluZUlkLCBkZWxheSwgbW92aW5nSGVpZ2h0KSB7XHJcbiAgICAgIGNvbnN0IGxpbmUgPSByb290LnF1ZXJ5U2VsZWN0b3IobGluZUlkKTtcclxuICAgICAgY29uc3QgbGluZUFuaW1hdGlvbkNvbmZpZyA9IGNyZWF0ZUFuaW1hdGlvbkVsZW1lbnQoXCJhbmltYXRlVHJhbnNmb3JtXCIsIHtcclxuICAgICAgICBhdHRyaWJ1dGVOYW1lOiBcInRyYW5zZm9ybVwiLFxyXG4gICAgICAgIGR1cjogYDJzYCxcclxuICAgICAgICBiZWdpbjogYGNyeXB0by1hbmltLmVuZCArICR7ZGVsYXl9c2AsXHJcbiAgICAgICAgdHlwZTogXCJ0cmFuc2xhdGVcIixcclxuICAgICAgICB2YWx1ZXM6IGAwIDA7IDAgLSR7bW92aW5nSGVpZ2h0fTsgMCAwOyAwICR7bW92aW5nSGVpZ2h0fTsgMCAwO2AsXHJcbiAgICAgICAgcmVwZWF0Q291bnQ6IFwiaW5kZWZpbml0ZVwiXHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgYWRkQW5pbWF0aW9uVG9TdmdFbGVtZW50KGxpbmUsIGxpbmVBbmltYXRpb25Db25maWcpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gYWRkQW5pbWF0aW9uVG9TdmdFbGVtZW50KGVsZW1lbnQsIGFuaW1hdGlvbikge1xyXG4gICAgZWxlbWVudC5pbm5lckhUTUwgPSBhbmltYXRpb24ub3V0ZXJIVE1MO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gZGVsZWdhdGVXaWRnZXRFdmVudExpc3RlbmVycygpIHtcclxuICAgIGlmICghaXNNb2JpbGUoKSkge1xyXG4gICAgICBsZXQgZm4gPSBkZWJvdW5jZShpc01vdXNlT25XaWRnZXQsIDUwKTtcclxuICAgICAgYm9keS5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsIGZuKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBpc01vdXNlT25XaWRnZXQoZXZlbnQpIHtcclxuICAgICAgY29uc3QgcG9zWCA9IGV2ZW50LmNsaWVudFgsXHJcbiAgICAgICAgcG9zWSA9IGV2ZW50LmNsaWVudFk7XHJcblxyXG4gICAgICBjb25zdCBwb3B1cCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaG9tZV9fbW9kYWxcIik7XHJcblxyXG4gICAgICBjb25zdCBpc09uV2lkZ2V0ID0gaXNPbkVsZW1lbnQocG9zWCwgcG9zWSwgXCIuaG9tZV9fcmlnaHQgLndpZGdldFwiKTtcclxuICAgICAgY29uc3QgaXNPbkJ1dHRvbiA9IGlzT25FbGVtZW50KHBvc1gsIHBvc1ksIFwiLndpZGdldF9fYnV0dG9uXCIpO1xyXG4gICAgICBjb25zdCBpc09uUG9wdXAgPSBpc09uRWxlbWVudChwb3NYLCBwb3NZLCBcIi5ob21lX19tb2RhbFwiKTtcclxuICAgICAgY29uc3QgaXNPbklucHV0ID0gaXNPbkVsZW1lbnQocG9zWCwgcG9zWSwgXCIud2lkZ2V0X19zbGlkZXJcIik7XHJcblxyXG4gICAgICBpZiAoXHJcbiAgICAgICAgKGlzT25XaWRnZXQgfHwgaXNPblBvcHVwKSAmJlxyXG4gICAgICAgICFpc09uQnV0dG9uICYmXHJcbiAgICAgICAgIWlzT25JbnB1dCAmJlxyXG4gICAgICAgICFoYXNNb3VzZSgpXHJcbiAgICAgICkge1xyXG4gICAgICAgIGJvZHkuY2xhc3NMaXN0LmFkZChcIndpZGdldC1vbi1ob3ZlclwiKTtcclxuICAgICAgICBwb3B1cC5jbGFzc0xpc3QuYWRkKFwic2hvd2VkXCIpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnN0IGRlbGF5ID0gMzAwO1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgYm9keS5jbGFzc0xpc3QucmVtb3ZlKFwid2lkZ2V0LW9uLWhvdmVyXCIpO1xyXG4gICAgICAgICAgcG9wdXAuY2xhc3NMaXN0LnJlbW92ZShcInNob3dlZFwiKTtcclxuICAgICAgICB9LCBkZWxheSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGlzT25FbGVtZW50KHBvc1gsIHBvc1ksIGVsZW1lbnRUYWcpIHtcclxuICAgIGNvbnN0IGVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihlbGVtZW50VGFnKTtcclxuICAgIGNvbnN0IGVsUG9zSW5mbyA9IGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG5cclxuICAgIGNvbnN0IGVsX3gxID0gZWxQb3NJbmZvLng7XHJcbiAgICBjb25zdCBlbF95MSA9IGVsUG9zSW5mby55O1xyXG4gICAgY29uc3QgZWxfeDIgPSBlbF94MSArIGVsUG9zSW5mby53aWR0aDtcclxuICAgIGNvbnN0IGVsX3kyID0gZWxfeTEgKyBlbFBvc0luZm8uaGVpZ2h0O1xyXG5cclxuICAgIHJldHVybiBwb3NYID49IGVsX3gxICYmIHBvc1ggPD0gZWxfeDIgJiYgcG9zWSA+PSBlbF95MSAmJiBwb3NZIDw9IGVsX3kyO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gc2hvd1BvcHVwKCkge1xyXG4gICAgY29uc3QgcG9wdXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmhvbWVfX21vZGFsXCIpO1xyXG5cclxuICAgIGJvZHkuY2xhc3NMaXN0LmFkZChcIndpZGdldC1vbi1ob3ZlclwiKTtcclxuICAgIHBvcHVwLmNsYXNzTGlzdC5hZGQoXCJzaG93ZWRcIik7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBoaWRlV2lkZ2V0KCkge1xyXG4gICAgY29uc3Qgd2lkZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5ob21lX19yaWdodCAud2lkZ2V0XCIpO1xyXG4gICAgd2lkZ2V0LmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBpbml0TW9iaWxlUG9wdXBJbnRlcmFjdGlvbigpIHtcclxuICAgIGNvbnN0IHdpZGdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaG9tZV9fcmlnaHQgLndpZGdldFwiKTtcclxuICAgIGNvbnN0IHBvcHVwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5ob21lX19tb2RhbFwiKTtcclxuICAgIGNvbnN0IGhvbWVTZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5ob21lXCIpO1xyXG5cclxuICAgIHNob3dQb3B1cCgpO1xyXG4gICAgaGlkZVdpZGdldCgpO1xyXG5cclxuICAgIC8vRnJlZXplIHdpbmRvd1xyXG4gICAgYm9keS5jbGFzc0xpc3QuYWRkKFwibm8tc2Nyb2xsXCIpO1xyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImh0bWxcIikuY2xhc3NMaXN0LmFkZChcIm5vLXNjcm9sbFwiKTtcclxuXHJcbiAgICBob21lU2VjdGlvbi5hZGRFdmVudExpc3RlbmVyKFwidG91Y2hzdGFydFwiLCBoaWRlT25Ub3VjaCwgZmFsc2UpO1xyXG4gICAgaG9tZVNlY3Rpb24uYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoc3RhcnRcIiwgc2V0U3RhcnRUb3VjaFZhcmlhYmxlcywgZmFsc2UpO1xyXG5cclxuICAgIGhvbWVTZWN0aW9uLmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaGVuZFwiLCBzd2lwZUhhbmRsZXIsIGZhbHNlKTtcclxuXHJcbiAgICBmdW5jdGlvbiBoaWRlT25Ub3VjaChlKSB7XHJcbiAgICAgIGNvbnN0IGRlbGF5ID0gMzAwO1xyXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICB1bmZyZWV6ZURvY3VtZW50KCk7XHJcbiAgICAgICAgYm9keS5jbGFzc0xpc3QucmVtb3ZlKFwid2lkZ2V0LW9uLWhvdmVyXCIpO1xyXG4gICAgICAgIHBvcHVwLmNsYXNzTGlzdC5yZW1vdmUoXCJzaG93ZWRcIik7XHJcbiAgICAgICAgd2lkZ2V0LmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XHJcbiAgICAgIH0sIGRlbGF5KTtcclxuXHJcbiAgICAgIGhvbWVTZWN0aW9uLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ0b3VjaHN0YXJ0XCIsIGhpZGVPblRvdWNoLCBmYWxzZSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gc2V0U3RhcnRUb3VjaFZhcmlhYmxlcyhldmVudCkge1xyXG4gICAgICB0b3VjaHN0YXJ0WCA9IGV2ZW50LmNoYW5nZWRUb3VjaGVzWzBdLnNjcmVlblg7XHJcbiAgICAgIHRvdWNoc3RhcnRZID0gZXZlbnQuY2hhbmdlZFRvdWNoZXNbMF0uc2NyZWVuWTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBzd2lwZUhhbmRsZXIoZXZlbnQpIHtcclxuICAgICAgY29uc3Qgd2lkZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5ob21lX19yaWdodCAud2lkZ2V0XCIpO1xyXG4gICAgICBjb25zdCBwb3B1cCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaG9tZV9fbW9kYWxcIik7XHJcblxyXG4gICAgICB0b3VjaGVuZFggPSBldmVudC5jaGFuZ2VkVG91Y2hlc1swXS5zY3JlZW5YO1xyXG4gICAgICB0b3VjaGVuZFkgPSBldmVudC5jaGFuZ2VkVG91Y2hlc1swXS5zY3JlZW5ZO1xyXG4gICAgICB0YXJnZXQgPSBldmVudC50YXJnZXQ7XHJcblxyXG4gICAgICBpZiAoTWF0aC5hYnModG91Y2hlbmRYIC0gdG91Y2hzdGFydFgpIDw9IHdpbmRvdy5pbm5lcldpZHRoIC8gNCkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfSBlbHNlIGlmICh0b3VjaGVuZFggPj0gdG91Y2hzdGFydFgpIHtcclxuICAgICAgICBpZiAodGFyZ2V0LmNsb3Nlc3QoXCIud2lkZ2V0XCIpKSB7XHJcbiAgICAgICAgICBzaG93UG9wdXAoKTtcclxuICAgICAgICAgIGhpZGVXaWRnZXQoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaWYgKHRhcmdldC5jbG9zZXN0KFwiLndpZGdldFwiKSkge1xyXG4gICAgICAgICAgYm9keS5jbGFzc0xpc3QucmVtb3ZlKFwid2lkZ2V0LW9uLWhvdmVyXCIpO1xyXG4gICAgICAgICAgcG9wdXAuY2xhc3NMaXN0LnJlbW92ZShcInNob3dlZFwiKTtcclxuICAgICAgICAgIHdpZGdldC5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gZGVib3VuY2UoZiwgbXMpIHtcclxuICAgIGxldCB0aW1lciA9IG51bGw7XHJcblxyXG4gICAgcmV0dXJuIGZ1bmN0aW9uKC4uLmFyZ3MpIHtcclxuICAgICAgY29uc3Qgb25Db21wbGV0ZSA9ICgpID0+IHtcclxuICAgICAgICBmLmFwcGx5KHRoaXMsIGFyZ3MpO1xyXG4gICAgICAgIHRpbWVyID0gbnVsbDtcclxuICAgICAgfTtcclxuXHJcbiAgICAgIGlmICh0aW1lcikge1xyXG4gICAgICAgIGNsZWFyVGltZW91dCh0aW1lcik7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRpbWVyID0gc2V0VGltZW91dChvbkNvbXBsZXRlLCBtcyk7XHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gYWRkRXZlbnRMaXN0ZW5lcnMoKSB7XHJcbiAgICBjb25zdCBkZXNrdG9wQnJlYWtwb2luID0gMTIwMDtcclxuICAgIGNvbnN0IG1vYmlsZUJyZWFrcG9pbnQgPSA2NTA7XHJcblxyXG4gICAgZGVsZWdhdGVXaWRnZXRFdmVudExpc3RlbmVycygpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQmluZCBhIHNsaWRlciBkYXRhIGNoYW5naW5nIHdpdGggYSB2aWV3XHJcbiAgICAgKi9cclxuICAgIHNsaWRlci5hZGRFdmVudExpc3RlbmVyKFxyXG4gICAgICBcImNoYW5nZVwiLFxyXG4gICAgICBldmVudCA9PiAoc3VtbWFyeS5pbm5lckhUTUwgPSBldmVudC5jdXJyZW50VGFyZ2V0LnZhbHVlKVxyXG4gICAgKTtcclxuXHJcbiAgICBpZiAod2luZG93LmlubmVyV2lkdGggPj0gZGVza3RvcEJyZWFrcG9pbiAmJiBpc0RvY3VtZW50RnJvemVuKCkpIHtcclxuICAgICAgYm9keS5hZGRFdmVudExpc3RlbmVyKFwibW91c2V3aGVlbFwiLCBzY3JvbGxUb1NlY3Rpb24sIHsgcGFzc2l2ZTogdHJ1ZSB9KTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAod2luZG93LmlubmVyV2lkdGggPD0gbW9iaWxlQnJlYWtwb2ludCkge1xyXG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCBpbml0U2xpZGVyKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIWlzTW9iaWxlKCkpIHtcclxuICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGhlYWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaGVhZGVyXCIpO1xyXG4gICAgICAgIGlmIChoZWFkZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuYm90dG9tIDwgd2luZG93LnBhZ2VZT2Zmc2V0KSB7XHJcbiAgICAgICAgICBoZWFkZXIuY2xhc3NMaXN0LmFkZChcImZpeGVkXCIpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBoZWFkZXIuY2xhc3NMaXN0LnJlbW92ZShcImZpeGVkXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgd2luZG93LmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KFwic2Nyb2xsXCIpKTtcclxuXHJcbiAgICBhZGRCdXR0b25zRXZlbnRMaXN0ZW5lcnMoKTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHNjcm9sbFRvU2VjdGlvbigpIHtcclxuICAgIGNvbnN0IHNjcm9sbE1vdXNlVG8gPSAkKFwiI3Njcm9sbC10b1wiKS5vZmZzZXQoKS50b3A7XHJcbiAgICBjb25zdCBzY3JvbGxUaW1lID0gOTAwO1xyXG4gICAgY29uc3QgZGVsYXkgPSA1MDA7XHJcblxyXG4gICAgaGlkZU1vdXNlKCk7XHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgdW5mcmVlemVEb2N1bWVudCgpO1xyXG4gICAgICAkKFwiaHRtbCwgYm9keVwiKS5hbmltYXRlKFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIHNjcm9sbFRvcDogc2Nyb2xsTW91c2VUbyxcclxuICAgICAgICAgIGVhc2U6IFwiZWFzZU91dEJhY2tcIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2Nyb2xsVGltZVxyXG4gICAgICApO1xyXG4gICAgfSwgZGVsYXkpO1xyXG5cclxuICAgIGJvZHkucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNld2hlZWxcIiwgc2Nyb2xsVG9TZWN0aW9uKTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGlzRG9jdW1lbnRGcm96ZW4oKSB7XHJcbiAgICByZXR1cm4gZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuY29udGFpbnMoXCJuby1zY3JvbGxcIik7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiB1bmZyZWV6ZURvY3VtZW50KCkge1xyXG4gICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QucmVtb3ZlKFwibm8tc2Nyb2xsXCIpO1xyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImh0bWxcIikuY2xhc3NMaXN0LnJlbW92ZShcIm5vLXNjcm9sbFwiKTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHJlbW92ZUxvYWRlcigpIHtcclxuICAgIGNvbnN0IGxvYWRlckhUTUwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmxvYWRlci13cmFwcGVyXCIpO1xyXG4gICAgY29uc3QgbG9hZGVyU2NyaXB0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNsb2FkZXItc2NyaXB0XCIpO1xyXG4gICAgY29uc3QgbG9hZGVyTGliID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNsb2FkZXItbGliXCIpO1xyXG5cclxuICAgIGxvYWRlckxpYi5yZW1vdmUoKTtcclxuICAgIGxvYWRlclNjcmlwdC5yZW1vdmUoKTtcclxuXHJcbiAgICBjb25zdCB0aW1lVG9Mb2FkZXJIaWRlID0gMjAwMDtcclxuICAgIGxvYWRlckhUTUwuY2xhc3NMaXN0LmFkZChcInJlbW92ZWRcIik7XHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IGxvYWRlckhUTUwucmVtb3ZlKCksIHRpbWVUb0xvYWRlckhpZGUpO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gZnJlZXplRG9jdW1lbnQoKSB7XHJcbiAgICBjb25zdCBzY3JvbGxNb3VzZVRvID0gJChcIiNzY3JvbGwtdG9cIikub2Zmc2V0KCkudG9wO1xyXG5cclxuICAgIGlmIChcclxuICAgICAgd2luZG93LmlubmVyV2lkdGggPj0gMTIwMCAmJlxyXG4gICAgICAoc2Nyb2xsTW91c2VUbyAqIDEwKSAvIDEwID49IHdpbmRvdy5wYWdlWU9mZnNldFxyXG4gICAgKSB7XHJcbiAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZChcIm5vLXNjcm9sbFwiKTtcclxuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImh0bWxcIikuY2xhc3NMaXN0LmFkZChcIm5vLXNjcm9sbFwiKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGhpZGVNb3VzZSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gaGlkZU1vdXNlKCkge1xyXG4gICAgY29uc3QgbW91c2UgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1vdXNlXCIpO1xyXG4gICAgbW91c2UuY2xhc3NMaXN0LmFkZChcInNjYWxlZFwiKTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGhhc01vdXNlKCkge1xyXG4gICAgcmV0dXJuICFkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1vdXNlXCIpLmNsYXNzTGlzdC5jb250YWlucyhcInNjYWxlZFwiKTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGFkZEJ1dHRvbnNFdmVudExpc3RlbmVycygpIHtcclxuICAgIGNvbnN0IGJ1dHRvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmJ1dHRvbi0tc2Nyb2xsLXRvLXRvcFwiKTtcclxuICAgIGJ1dHRvbnMuZm9yRWFjaChidXR0b24gPT4gYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBzY3JvbGxUb1RvcCkpO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gc2Nyb2xsVG9Ub3AoKSB7XHJcbiAgICBsZXQgdG8gPSAwO1xyXG5cclxuICAgIGlmIChpc01vYmlsZSgpKSB7XHJcbiAgICAgIGNvbnN0IHdpZGdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaG9tZV9fcmlnaHQgLndpZGdldFwiKTtcclxuICAgICAgY29uc3Qgd2lkZ2V0RWxlbWVudERhdGEgPSB3aWRnZXQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcblxyXG4gICAgICB0byA9IHdpZGdldEVsZW1lbnREYXRhLmhlaWdodCAvIDI7XHJcbiAgICB9XHJcblxyXG4gICAgJChcImh0bWwsIGJvZHlcIikuYW5pbWF0ZShcclxuICAgICAge1xyXG4gICAgICAgIHNjcm9sbFRvcDogdG8sXHJcbiAgICAgICAgZWFzZTogXCJlYXNlT3V0QmFja1wiXHJcbiAgICAgIH0sXHJcbiAgICAgIDkwMFxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGluaXRBbmltYXRpb25zKCkge1xyXG4gICAgLyoqXHJcbiAgICAgKiBTZXR1cCB5b3VyIExhenkgTGluZSBlbGVtZW50LlxyXG4gICAgICogc2VlIFJFQURNRSBmaWxlIGZvciBtb3JlIHNldHRpbmdzXHJcbiAgICAgKi9cclxuICAgIGNvbnN0IGFuaW1hdGlvbnNDb25maWcgPSB7XHJcbiAgICAgIGVhc2U6IFwiZWFzZUluUXVhZFwiLFxyXG4gICAgICBzdHJva2VXaWR0aDogMC41LFxyXG4gICAgICBzdHJva2VPcGFjaXR5OiAxLFxyXG4gICAgICBzdHJva2VDb2xvcjogXCIjZmZmZmZmXCJcclxuICAgIH07XHJcblxyXG4gICAgY29uc3QgbG9nb0FuaW1hdGlvbnNDb25maWcgPSB7XHJcbiAgICAgIGVhc2U6IFwiZWFzZUluUXVhZFwiLFxyXG4gICAgICBzdHJva2VXaWR0aDogNCxcclxuICAgICAgc3Ryb2tlT3BhY2l0eTogMSxcclxuICAgICAgc3Ryb2tlQ29sb3I6IFwiI2ZmZmZmZlwiXHJcbiAgICB9O1xyXG5cclxuICAgIGxldCB0ZWFtSWNvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGVhbVwiKTtcclxuICAgIGxldCBjYWxlbmRhckljb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NhbGVuZGFyXCIpO1xyXG4gICAgbGV0IGxvZ29JY29uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNsb2dvXCIpO1xyXG5cclxuICAgIGxldCB0ZWFtSWNvbkFuaW1hdGlvbiA9IG5ldyBMYXp5TGluZVBhaW50ZXIodGVhbUljb24sIGFuaW1hdGlvbnNDb25maWcpO1xyXG4gICAgbGV0IGNhbGVuZGFySWNvbkFuaW1hdGlvbiA9IG5ldyBMYXp5TGluZVBhaW50ZXIoXHJcbiAgICAgIGNhbGVuZGFySWNvbixcclxuICAgICAgYW5pbWF0aW9uc0NvbmZpZ1xyXG4gICAgKTtcclxuICAgIGxldCBsb2dvSWNvbkFuaW1hdGlvbiA9IG5ldyBMYXp5TGluZVBhaW50ZXIobG9nb0ljb24sIGxvZ29BbmltYXRpb25zQ29uZmlnKTtcclxuXHJcbiAgICB0ZWFtSWNvbkFuaW1hdGlvbi5wYWludCgpO1xyXG4gICAgY2FsZW5kYXJJY29uQW5pbWF0aW9uLnBhaW50KCk7XHJcbiAgICBsb2dvSWNvbkFuaW1hdGlvbi5wYWludCgpO1xyXG5cclxuICAgIGlmICghaXNNb2JpbGUoKSkge1xyXG4gICAgICBoaWRlTWFwRWxlbWVudHMoKTtcclxuICAgICAgaGlkZUNyeXB0b01hY2hpbmVFbGVtZW50cygpO1xyXG4gICAgfVxyXG4gIH1cclxufSk7XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc2NyaXB0cy9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUN0Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OzsiLCJzb3VyY2VSb290IjoiIn0=