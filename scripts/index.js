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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNzQ1ZDdlNDkyODNmZGEzN2VjY2QiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvc2NyaXB0cy9cIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA3NDVkN2U0OTI4M2ZkYTM3ZWNjZCIsImRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsICgpID0+IHtcclxuICAvKipcclxuICAgKiBSZW1vdmUgdGhlIGxvYWRlciB3aGVuIGFsbCBzY3JpcHQgaGF2ZSBiZWVuIGxvYWRlZFxyXG4gICAqL1xyXG4gIHJlbW92ZUxvYWRlcigpO1xyXG4gIGZyZWV6ZURvY3VtZW50KCk7XHJcblxyXG4gIGNvbnN0IHNsaWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2xpZGVyXCIpO1xyXG4gIGNvbnN0IHN1bW1hcnkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLndpZGdldF9fY3VycmVudC1zdW1tYXJ5IC5zdW1tYXJ5XCIpO1xyXG4gIGNvbnN0IGJvZHkgPSBkb2N1bWVudC5ib2R5O1xyXG5cclxuICBhZGRFdmVudExpc3RlbmVycygpO1xyXG5cclxuICBpbml0QW5pbWF0aW9ucygpO1xyXG4gIGluaXRTbGlkZXIoKTtcclxuICBpbml0V2F5UG9pbnRzSW50ZXJhY3Rpb24oKTtcclxuXHJcbiAgaW5pdFRpbWVyKCk7XHJcblxyXG4gIGZ1bmN0aW9uIGluaXRXYXlQb2ludHNJbnRlcmFjdGlvbigpIHtcclxuICAgIGxldCByb2FkTWFwUmVhY2hlZCA9IGZhbHNlO1xyXG4gICAgbGV0IG5vdGVib29rUmVhY2hlZCA9IGZhbHNlO1xyXG4gICAgbGV0IHN1cHBvcnRSZWFjaGVkID0gZmFsc2U7XHJcbiAgICBsZXQgYWlyRHJvcFJlYWNoZWQgPSBmYWxzZTtcclxuICAgIGxldCB3aWRnZXRSZWFjaGVkID0gZmFsc2U7XHJcblxyXG4gICAgbGV0IHJvYWRtYXAgPSBuZXcgV2F5cG9pbnQoe1xyXG4gICAgICBlbGVtZW50OiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnJvYWQtbWFwXCIpLFxyXG4gICAgICBoYW5kbGVyOiBmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAoIXJvYWRNYXBSZWFjaGVkKSB7XHJcbiAgICAgICAgICByb2FkTWFwUmVhY2hlZCA9IHRydWU7XHJcbiAgICAgICAgICBjb25zdCByb2FkTGluZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucm9hZC1tYXBfX2xpbmVcIik7XHJcbiAgICAgICAgICBjb25zdCBwbGFuTGluZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnBsYW5fX3JvYWQtbGluZVwiKTtcclxuICAgICAgICAgIGNvbnN0IHBsYW5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5wbGFuXCIpO1xyXG4gICAgICAgICAgY29uc3QgY2lyY2xlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucGxhbl9fY2lyY2xlXCIpO1xyXG5cclxuICAgICAgICAgIHJvYWRMaW5lLmNsYXNzTGlzdC5hZGQoXCJzaG93ZWRcIik7XHJcbiAgICAgICAgICBjb25zdCBkZWxheSA9IDUwMDtcclxuXHJcbiAgICAgICAgICBwbGFuTGluZXMuZm9yRWFjaCgocGwsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IF9kZWxheSA9IGRlbGF5ICsgMTAwICogaW5kZXg7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgIHBsLmNsYXNzTGlzdC5hZGQoXCJzaG93ZWRcIik7XHJcbiAgICAgICAgICAgICAgY2lyY2xlc1tpbmRleF0uY2xhc3NMaXN0LmFkZChcInNob3dlZFwiKTtcclxuICAgICAgICAgICAgICBwbGFuc1tpbmRleF0uY2xhc3NMaXN0LmFkZChcInNob3dlZFwiKTtcclxuICAgICAgICAgICAgfSwgX2RlbGF5KTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfSxcclxuICAgICAgb2Zmc2V0OiBcIjQwJVwiXHJcbiAgICB9KTtcclxuXHJcbiAgICBsZXQgbm90ZWJvb2sgPSBuZXcgV2F5cG9pbnQoe1xyXG4gICAgICBlbGVtZW50OiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLndoaXRlcGFwZXJcIiksXHJcbiAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmICghbm90ZWJvb2tSZWFjaGVkKSB7XHJcbiAgICAgICAgICBub3RlYm9va1JlYWNoZWQgPSB0cnVlO1xyXG4gICAgICAgICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibm90ZWJvb2tcIik7XHJcbiAgICAgICAgICBjb25zdCBhbmltYXRpb25UcmlnZ2VyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtYWluXCIpO1xyXG5cclxuICAgICAgICAgIGVsZW1lbnQuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoXCJjbGlja1wiKSk7XHJcblxyXG4gICAgICAgICAgYW5pbWF0aW9uVHJpZ2dlci5yZW1vdmVBdHRyaWJ1dGUoXCJiZWdpblwiKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICAgIG9mZnNldDogXCIxMDAlXCJcclxuICAgIH0pO1xyXG5cclxuICAgIGxldCBzdXBwb3J0ID0gbmV3IFdheXBvaW50KHtcclxuICAgICAgZWxlbWVudDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zdXBwb3J0XCIpLFxyXG4gICAgICBoYW5kbGVyOiBmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAoIXN1cHBvcnRSZWFjaGVkKSB7XHJcbiAgICAgICAgICBzdXBwb3J0UmVhY2hlZCA9IHRydWU7XHJcblxyXG4gICAgICAgICAgYW5pbWF0ZU1hcCgpO1xyXG5cclxuICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2xhbmQtcGFydHNcIik7XHJcblxyXG4gICAgICAgICAgZWxlbWVudC5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudChcImNsaWNrXCIpKTtcclxuICAgICAgICAgIGVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKFwiYmVnaW5cIik7XHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgICBvZmZzZXQ6IFwiNDAlXCJcclxuICAgIH0pO1xyXG5cclxuICAgIGxldCBhaXJkcm9wID0gbmV3IFdheXBvaW50KHtcclxuICAgICAgZWxlbWVudDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5haXJkcm9wXCIpLFxyXG4gICAgICBoYW5kbGVyOiBmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAoIWFpckRyb3BSZWFjaGVkKSB7XHJcbiAgICAgICAgICBhaXJEcm9wUmVhY2hlZCA9IHRydWU7XHJcblxyXG4gICAgICAgICAgYW5pbWF0ZUNyeXB0b01hY2hpbmUoKTtcclxuXHJcbiAgICAgICAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjcnlwdG9cIik7XHJcbiAgICAgICAgICBlbGVtZW50LmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KFwiY2xpY2tcIikpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSxcclxuICAgICAgb2Zmc2V0OiBcIjEwMCVcIlxyXG4gICAgfSk7XHJcblxyXG4gICAgaWYgKGlzTW9iaWxlKCkpIHtcclxuICAgICAgbGV0IHdpZGdldCA9IG5ldyBXYXlwb2ludCh7XHJcbiAgICAgICAgZWxlbWVudDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5ob21lX19yaWdodFwiKSxcclxuICAgICAgICBoYW5kbGVyOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgIGlmICghd2lkZ2V0UmVhY2hlZCkge1xyXG4gICAgICAgICAgICB3aWRnZXRSZWFjaGVkID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgIGxldCB0b3VjaHN0YXJ0WCA9IDA7XHJcbiAgICAgICAgICAgIGxldCB0b3VjaHN0YXJ0WSA9IDA7XHJcbiAgICAgICAgICAgIGxldCB0b3VjaGVuZFggPSAwO1xyXG4gICAgICAgICAgICBsZXQgdG91Y2hlbmRZID0gMDtcclxuXHJcbiAgICAgICAgICAgIGluaXRNb2JpbGVQb3B1cEludGVyYWN0aW9uKCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBvZmZzZXQ6IFwiMjUlXCJcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBpc01vYmlsZSgpIHtcclxuICAgIHJldHVybiB3aW5kb3cuaW5uZXJXaWR0aCA8PSA2NTA7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBpbml0VGltZXIoeWVhciwgbW9udGgsIHdlZWssIGRheSkge1xyXG4gICAgY29uc3QgdGltZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRpbWVyXCIpO1xyXG4gICAgY29uc3QgZGF5cyA9IHRpbWVyLnF1ZXJ5U2VsZWN0b3IoXCIudGltZXJfX2RheXNcIik7XHJcbiAgICBjb25zdCBtaW5zID0gdGltZXIucXVlcnlTZWxlY3RvcihcIi50aW1lcl9fbWludXRlc1wiKTtcclxuICAgIGNvbnN0IHNlY3MgPSB0aW1lci5xdWVyeVNlbGVjdG9yKFwiLnRpbWVyX19zZWNvbmRzXCIpO1xyXG4gICAgY29uc3QgaG91cnMgPSB0aW1lci5xdWVyeVNlbGVjdG9yKFwiLnRpbWVyX19ob3Vyc1wiKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEluaXRpYWxpemF0aW9uXHJcbiAgICAgKi9cclxuXHJcbiAgICBkYXlzLmlubmVySFRNTCA9IHdyYXBXaXRoWmVybygxNSk7XHJcbiAgICBtaW5zLmlubmVySFRNTCA9IHdyYXBXaXRoWmVybygwKTtcclxuICAgIHNlY3MuaW5uZXJIVE1MID0gd3JhcFdpdGhaZXJvKDApO1xyXG4gICAgaG91cnMuaW5uZXJIVE1MID0gd3JhcFdpdGhaZXJvKDApO1xyXG5cclxuICAgIHNldEludGVydmFsKGRlY3JlYXNlLCAxMDAwKTtcclxuXHJcbiAgICBmdW5jdGlvbiBkZWNyZWFzZSgpIHtcclxuICAgICAgY29uc3QgdGltZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRpbWVyXCIpO1xyXG4gICAgICBjb25zdCBkYXlzID0gdGltZXIucXVlcnlTZWxlY3RvcihcIi50aW1lcl9fZGF5c1wiKTtcclxuICAgICAgY29uc3QgbWlucyA9IHRpbWVyLnF1ZXJ5U2VsZWN0b3IoXCIudGltZXJfX21pbnV0ZXNcIik7XHJcbiAgICAgIGNvbnN0IHNlY3MgPSB0aW1lci5xdWVyeVNlbGVjdG9yKFwiLnRpbWVyX19zZWNvbmRzXCIpO1xyXG4gICAgICBjb25zdCBob3VycyA9IHRpbWVyLnF1ZXJ5U2VsZWN0b3IoXCIudGltZXJfX2hvdXJzXCIpO1xyXG5cclxuICAgICAgbGV0IHMgPSArc2Vjcy5pbm5lckhUTUwsXHJcbiAgICAgICAgbSA9ICttaW5zLmlubmVySFRNTCxcclxuICAgICAgICBoID0gK2hvdXJzLmlubmVySFRNTCxcclxuICAgICAgICBkID0gK2RheXMuaW5uZXJIVE1MO1xyXG5cclxuICAgICAgaWYgKHMgPiAwKSAtLXM7XHJcblxyXG4gICAgICBpZiAocyA9PT0gMCkge1xyXG4gICAgICAgIHMgPSA1OTtcclxuICAgICAgICBpZiAobSA+IDApIG0tLTtcclxuICAgICAgfVxyXG4gICAgICBpZiAobSA9PT0gMCkge1xyXG4gICAgICAgIG0gPSA1OTtcclxuICAgICAgICBpZiAoaCA+IDApIGgtLTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoaCA9PT0gMCkge1xyXG4gICAgICAgIGggPSAyMztcclxuICAgICAgICBpZiAoZCA+IDApIGQtLTtcclxuICAgICAgfVxyXG5cclxuICAgICAgc2Vjcy5pbm5lckhUTUwgPSBzO1xyXG4gICAgICBtaW5zLmlubmVySFRNTCA9IG07XHJcbiAgICAgIGhvdXJzLmlubmVySFRNTCA9IGg7XHJcbiAgICAgIGRheXMuaW5uZXJIVE1MID0gZDtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiB3cmFwV2l0aFplcm8oc3RyaW5nKSB7XHJcbiAgICAgIHN0cmluZyA9IHN0cmluZyArIFwiXCI7XHJcblxyXG4gICAgICBpZiAoc3RyaW5nLmxlbmd0aCA8IDIpIHtcclxuICAgICAgICBzdHJpbmcgPSBcIjBcIiArIHN0cmluZztcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gc3RyaW5nO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gaW5pdFNsaWRlcigpIHtcclxuICAgIGlmICh3aW5kb3cuaW5uZXJXaWR0aCA8PSA2NTApIHtcclxuICAgICAgJChcIi5ob3ctaXQtd29ya3NfX2NhcmRzXCIpLm93bENhcm91c2VsKHtcclxuICAgICAgICBpdGVtczogMSxcclxuICAgICAgICBtYXJnaW46IDMwLFxyXG4gICAgICAgIHBhZGRpbmc6IDMwXHJcbiAgICAgIH0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgJChcIi5ob3ctaXQtd29ya3NfX2NhcmRzXCIpLnRyaWdnZXIoXCJkZXN0cm95Lm93bC5jYXJvdXNlbFwiKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGFuaW1hdGVNYXAoKSB7XHJcbiAgICBjb25zdCBtYXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI21hcFwiKTtcclxuICAgIGNvbnN0IGRvdHMgPSBtYXAucXVlcnlTZWxlY3RvcihcIi5kb3RzXCIpO1xyXG5cclxuICAgIEFycmF5LmZyb20oZG90cy5jaGlsZE5vZGVzKS5mb3JFYWNoKGRvdCA9PiB7XHJcbiAgICAgIGNvbnN0IHBhdGggPSBkb3QucXVlcnlTZWxlY3RvcihcInBhdGhcIik7XHJcbiAgICAgIHBhdGguc2V0QXR0cmlidXRlKFwib3BhY2l0eVwiLCBcIjFcIik7XHJcbiAgICAgIHBhdGguaW5uZXJIVE1MID0gY3JlYXRlQW5pbWF0aW9uRWxlbWVudChcImFuaW1hdGVcIiwge1xyXG4gICAgICAgIFwieGxpbms6aHJlZlwiOiBcIiNcIiArIHBhdGguaWQsXHJcbiAgICAgICAgYXR0cmlidXRlTmFtZTogXCJvcGFjaXR5XCIsXHJcbiAgICAgICAgZHVyOiBgJHtNYXRoLnJhbmRvbSgpICogMiArIDAuNX1zYCxcclxuICAgICAgICBmcm9tOiBcIjFcIixcclxuICAgICAgICB0bzogXCIwXCIsXHJcbiAgICAgICAgcmVwZWF0Q291bnQ6IFwiaW5kZWZpbml0ZVwiLFxyXG4gICAgICAgIGJlZ2luOiBcImRvdHMtYW5pbS5lbmQgKyAuMnNcIlxyXG4gICAgICB9KS5vdXRlckhUTUw7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGNyZWF0ZUFuaW1hdGlvbkVsZW1lbnQoYW5pbWF0aW9uRWxlbWVudCwgY29uZmlnKSB7XHJcbiAgICBpZiAoIWNvbmZpZykge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgYW5pbWF0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChhbmltYXRpb25FbGVtZW50KTtcclxuICAgIGZvciAobGV0IG9wdGlvbiBpbiBjb25maWcpIHtcclxuICAgICAgYW5pbWF0aW9uLnNldEF0dHJpYnV0ZShvcHRpb24sIGNvbmZpZ1tvcHRpb25dKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gYW5pbWF0aW9uO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gYW5pbWF0ZUNyeXB0b01hY2hpbmUoKSB7XHJcbiAgICBjb25zdCBjcnlwdG9NYWNoaW5lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjcnlwdG9cIik7XHJcblxyXG4gICAgY29uc3QgY2lyY2xlcyA9IGNyeXB0b01hY2hpbmUucXVlcnlTZWxlY3RvckFsbChcIi5jaXJjbGVcIik7XHJcbiAgICBjb25zdCBzdWJzdHJhdGVzID0gY3J5cHRvTWFjaGluZS5xdWVyeVNlbGVjdG9yQWxsKFwiLnN1YnN0cmF0ZVwiKTtcclxuXHJcbiAgICBpbml0QW5pbWF0ZWRMaW5lcyhjcnlwdG9NYWNoaW5lKTtcclxuXHJcbiAgICBzdWJzdHJhdGVzLmZvckVhY2goKHN1YnN0cmF0ZSwgaW5kZXgpID0+IHtcclxuICAgICAgc3Vic3RyYXRlLnNldEF0dHJpYnV0ZShcImlkXCIsIGBzdWJzdHJhdGUtJHtpbmRleH1gKTtcclxuICAgICAgc3Vic3RyYXRlLnNldEF0dHJpYnV0ZShcIm9wYWNpdHlcIiwgXCIwXCIpO1xyXG4gICAgICBjb25zdCBhbmltYXRpb24gPSBjcmVhdGVBbmltYXRpb25FbGVtZW50KFwiYW5pbWF0ZVwiLCB7XHJcbiAgICAgICAgXCJ4bGluazpocmVmXCI6IGAjc3Vic3RyYXRlLSR7aW5kZXh9YCxcclxuICAgICAgICBhdHRyaWJ1dGVOYW1lOiBcIm9wYWNpdHlcIixcclxuICAgICAgICBkdXI6IGAyc2AsXHJcbiAgICAgICAgZnJvbTogXCIwXCIsXHJcbiAgICAgICAgdG86IFwiMVwiLFxyXG4gICAgICAgIGJlZ2luOiBcImNyeXB0by1hbmltLmVuZCArIC41c1wiLFxyXG4gICAgICAgIGZpbGw6IFwiZnJlZXplXCJcclxuICAgICAgfSk7XHJcbiAgICAgIGFkZEFuaW1hdGlvblRvU3ZnRWxlbWVudChzdWJzdHJhdGUsIGFuaW1hdGlvbik7XHJcbiAgICB9KTtcclxuXHJcbiAgICBjaXJjbGVzLmZvckVhY2goKGNpcmNsZSwgaW5kZXgpID0+IHtcclxuICAgICAgY2lyY2xlLnNldEF0dHJpYnV0ZShcImlkXCIsIGBjaXJjbGUtJHtpbmRleH1gKTtcclxuICAgICAgY2lyY2xlLnNldEF0dHJpYnV0ZShcIm9wYWNpdHlcIiwgXCIwXCIpO1xyXG4gICAgICBjb25zdCBhbmltYXRpb24gPSBjcmVhdGVBbmltYXRpb25FbGVtZW50KFwiYW5pbWF0ZVwiLCB7XHJcbiAgICAgICAgXCJ4bGluazpocmVmXCI6IGAjY2lyY2xlLSR7aW5kZXh9YCxcclxuICAgICAgICBhdHRyaWJ1dGVOYW1lOiBcIm9wYWNpdHlcIixcclxuICAgICAgICBkdXI6IGAke01hdGgucmFuZG9tKCkgKiAzICsgMX1zYCxcclxuICAgICAgICB2YWx1ZXM6IFwiLjU7IC42OyAxOyAuNzsgLjRcIixcclxuICAgICAgICBiZWdpbjogXCJjcnlwdG8tYW5pbS5lbmQgKyAuNXNcIixcclxuICAgICAgICByZXBlYXRDb3VudDogXCJpbmRlZmluaXRlXCJcclxuICAgICAgfSk7XHJcbiAgICAgIGFkZEFuaW1hdGlvblRvU3ZnRWxlbWVudChjaXJjbGUsIGFuaW1hdGlvbik7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGluaXRBbmltYXRlZExpbmVzKHJvb3QpIHtcclxuICAgIGNyZWF0ZUFuaW1hdGVkTGluZShcIiNsaW5lLTFcIiwgMC4wMDEsIDEwKTtcclxuICAgIGNyZWF0ZUFuaW1hdGVkTGluZShcIiNsaW5lLTJcIiwgMC4xLCAyMCk7XHJcbiAgICBjcmVhdGVBbmltYXRlZExpbmUoXCIjbGluZS0zXCIsIDAuMiwgNTApO1xyXG4gICAgY3JlYXRlQW5pbWF0ZWRMaW5lKFwiI2xpbmUtNFwiLCAwLjMsIDUwKTtcclxuICAgIGNyZWF0ZUFuaW1hdGVkTGluZShcIiNsaW5lLTVcIiwgMC40LCA0MCk7XHJcbiAgICBjcmVhdGVBbmltYXRlZExpbmUoXCIjbGluZS02XCIsIDAuNSwgMTApO1xyXG5cclxuICAgIGZ1bmN0aW9uIGNyZWF0ZUFuaW1hdGVkTGluZShsaW5lSWQsIGRlbGF5LCBtb3ZpbmdIZWlnaHQpIHtcclxuICAgICAgY29uc3QgbGluZSA9IHJvb3QucXVlcnlTZWxlY3RvcihsaW5lSWQpO1xyXG4gICAgICBjb25zdCBsaW5lQW5pbWF0aW9uQ29uZmlnID0gY3JlYXRlQW5pbWF0aW9uRWxlbWVudChcImFuaW1hdGVUcmFuc2Zvcm1cIiwge1xyXG4gICAgICAgIGF0dHJpYnV0ZU5hbWU6IFwidHJhbnNmb3JtXCIsXHJcbiAgICAgICAgZHVyOiBgMnNgLFxyXG4gICAgICAgIGJlZ2luOiBgY3J5cHRvLWFuaW0uZW5kICsgJHtkZWxheX1zYCxcclxuICAgICAgICB0eXBlOiBcInRyYW5zbGF0ZVwiLFxyXG4gICAgICAgIHZhbHVlczogYDAgMDsgMCAtJHttb3ZpbmdIZWlnaHR9OyAwIDA7IDAgJHttb3ZpbmdIZWlnaHR9OyAwIDA7YCxcclxuICAgICAgICByZXBlYXRDb3VudDogXCJpbmRlZmluaXRlXCJcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBhZGRBbmltYXRpb25Ub1N2Z0VsZW1lbnQobGluZSwgbGluZUFuaW1hdGlvbkNvbmZpZyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBhZGRBbmltYXRpb25Ub1N2Z0VsZW1lbnQoZWxlbWVudCwgYW5pbWF0aW9uKSB7XHJcbiAgICBlbGVtZW50LmlubmVySFRNTCA9IGFuaW1hdGlvbi5vdXRlckhUTUw7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBkZWxlZ2F0ZVdpZGdldEV2ZW50TGlzdGVuZXJzKCkge1xyXG4gICAgaWYgKCFpc01vYmlsZSgpKSB7XHJcbiAgICAgIGxldCBmbiA9IGRlYm91bmNlKGlzTW91c2VPbldpZGdldCwgNTApO1xyXG4gICAgICBib2R5LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW1vdmVcIiwgZm4pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGlzTW91c2VPbldpZGdldChldmVudCkge1xyXG4gICAgICBjb25zdCBwb3NYID0gZXZlbnQuY2xpZW50WCxcclxuICAgICAgICBwb3NZID0gZXZlbnQuY2xpZW50WTtcclxuXHJcbiAgICAgIGNvbnN0IHBvcHVwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5ob21lX19tb2RhbFwiKTtcclxuXHJcbiAgICAgIGNvbnN0IGlzT25XaWRnZXQgPSBpc09uRWxlbWVudChwb3NYLCBwb3NZLCBcIi5ob21lX19yaWdodCAud2lkZ2V0XCIpO1xyXG4gICAgICBjb25zdCBpc09uQnV0dG9uID0gaXNPbkVsZW1lbnQocG9zWCwgcG9zWSwgXCIud2lkZ2V0X19idXR0b25cIik7XHJcbiAgICAgIGNvbnN0IGlzT25Qb3B1cCA9IGlzT25FbGVtZW50KHBvc1gsIHBvc1ksIFwiLmhvbWVfX21vZGFsXCIpO1xyXG4gICAgICBjb25zdCBpc09uSW5wdXQgPSBpc09uRWxlbWVudChwb3NYLCBwb3NZLCBcIi53aWRnZXRfX3NsaWRlclwiKTtcclxuXHJcbiAgICAgIGlmIChcclxuICAgICAgICAoaXNPbldpZGdldCB8fCBpc09uUG9wdXApICYmXHJcbiAgICAgICAgIWlzT25CdXR0b24gJiZcclxuICAgICAgICAhaXNPbklucHV0ICYmXHJcbiAgICAgICAgIWhhc01vdXNlKClcclxuICAgICAgKSB7XHJcbiAgICAgICAgYm9keS5jbGFzc0xpc3QuYWRkKFwid2lkZ2V0LW9uLWhvdmVyXCIpO1xyXG4gICAgICAgIHBvcHVwLmNsYXNzTGlzdC5hZGQoXCJzaG93ZWRcIik7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29uc3QgZGVsYXkgPSAzMDA7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICBib2R5LmNsYXNzTGlzdC5yZW1vdmUoXCJ3aWRnZXQtb24taG92ZXJcIik7XHJcbiAgICAgICAgICBwb3B1cC5jbGFzc0xpc3QucmVtb3ZlKFwic2hvd2VkXCIpO1xyXG4gICAgICAgIH0sIGRlbGF5KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gaXNPbkVsZW1lbnQocG9zWCwgcG9zWSwgZWxlbWVudFRhZykge1xyXG4gICAgY29uc3QgZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGVsZW1lbnRUYWcpO1xyXG4gICAgY29uc3QgZWxQb3NJbmZvID0gZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcblxyXG4gICAgY29uc3QgZWxfeDEgPSBlbFBvc0luZm8ueDtcclxuICAgIGNvbnN0IGVsX3kxID0gZWxQb3NJbmZvLnk7XHJcbiAgICBjb25zdCBlbF94MiA9IGVsX3gxICsgZWxQb3NJbmZvLndpZHRoO1xyXG4gICAgY29uc3QgZWxfeTIgPSBlbF95MSArIGVsUG9zSW5mby5oZWlnaHQ7XHJcblxyXG4gICAgcmV0dXJuIHBvc1ggPj0gZWxfeDEgJiYgcG9zWCA8PSBlbF94MiAmJiBwb3NZID49IGVsX3kxICYmIHBvc1kgPD0gZWxfeTI7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBzaG93UG9wdXAoKSB7XHJcbiAgICBjb25zdCBwb3B1cCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaG9tZV9fbW9kYWxcIik7XHJcblxyXG4gICAgYm9keS5jbGFzc0xpc3QuYWRkKFwid2lkZ2V0LW9uLWhvdmVyXCIpO1xyXG4gICAgcG9wdXAuY2xhc3NMaXN0LmFkZChcInNob3dlZFwiKTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGhpZGVXaWRnZXQoKSB7XHJcbiAgICBjb25zdCB3aWRnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmhvbWVfX3JpZ2h0IC53aWRnZXRcIik7XHJcbiAgICB3aWRnZXQuY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGluaXRNb2JpbGVQb3B1cEludGVyYWN0aW9uKCkge1xyXG4gICAgY29uc3Qgd2lkZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5ob21lX19yaWdodCAud2lkZ2V0XCIpO1xyXG4gICAgY29uc3QgcG9wdXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmhvbWVfX21vZGFsXCIpO1xyXG4gICAgY29uc3QgaG9tZVNlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmhvbWVcIik7XHJcblxyXG4gICAgc2hvd1BvcHVwKCk7XHJcbiAgICBoaWRlV2lkZ2V0KCk7XHJcblxyXG4gICAgLy9GcmVlemUgd2luZG93XHJcbiAgICBib2R5LmNsYXNzTGlzdC5hZGQoXCJuby1zY3JvbGxcIik7XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiaHRtbFwiKS5jbGFzc0xpc3QuYWRkKFwibm8tc2Nyb2xsXCIpO1xyXG5cclxuICAgIGhvbWVTZWN0aW9uLmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaHN0YXJ0XCIsIGhpZGVPblRvdWNoLCBmYWxzZSk7XHJcbiAgICBob21lU2VjdGlvbi5hZGRFdmVudExpc3RlbmVyKFwidG91Y2hzdGFydFwiLCBzZXRTdGFydFRvdWNoVmFyaWFibGVzLCBmYWxzZSk7XHJcblxyXG4gICAgaG9tZVNlY3Rpb24uYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoZW5kXCIsIHN3aXBlSGFuZGxlciwgZmFsc2UpO1xyXG5cclxuICAgIGZ1bmN0aW9uIGhpZGVPblRvdWNoKGUpIHtcclxuICAgICAgY29uc3QgZGVsYXkgPSAzMDA7XHJcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIHVuZnJlZXplRG9jdW1lbnQoKTtcclxuICAgICAgICBib2R5LmNsYXNzTGlzdC5yZW1vdmUoXCJ3aWRnZXQtb24taG92ZXJcIik7XHJcbiAgICAgICAgcG9wdXAuY2xhc3NMaXN0LnJlbW92ZShcInNob3dlZFwiKTtcclxuICAgICAgICB3aWRnZXQuY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcclxuICAgICAgfSwgZGVsYXkpO1xyXG5cclxuICAgICAgaG9tZVNlY3Rpb24ucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInRvdWNoc3RhcnRcIiwgaGlkZU9uVG91Y2gsIGZhbHNlKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBzZXRTdGFydFRvdWNoVmFyaWFibGVzKGV2ZW50KSB7XHJcbiAgICAgIHRvdWNoc3RhcnRYID0gZXZlbnQuY2hhbmdlZFRvdWNoZXNbMF0uc2NyZWVuWDtcclxuICAgICAgdG91Y2hzdGFydFkgPSBldmVudC5jaGFuZ2VkVG91Y2hlc1swXS5zY3JlZW5ZO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHN3aXBlSGFuZGxlcihldmVudCkge1xyXG4gICAgICBjb25zdCB3aWRnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmhvbWVfX3JpZ2h0IC53aWRnZXRcIik7XHJcbiAgICAgIGNvbnN0IHBvcHVwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5ob21lX19tb2RhbFwiKTtcclxuXHJcbiAgICAgIHRvdWNoZW5kWCA9IGV2ZW50LmNoYW5nZWRUb3VjaGVzWzBdLnNjcmVlblg7XHJcbiAgICAgIHRvdWNoZW5kWSA9IGV2ZW50LmNoYW5nZWRUb3VjaGVzWzBdLnNjcmVlblk7XHJcbiAgICAgIHRhcmdldCA9IGV2ZW50LnRhcmdldDtcclxuXHJcbiAgICAgIGlmIChNYXRoLmFicyh0b3VjaGVuZFggLSB0b3VjaHN0YXJ0WCkgPD0gd2luZG93LmlubmVyV2lkdGggLyA0KSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9IGVsc2UgaWYgKHRvdWNoZW5kWCA+PSB0b3VjaHN0YXJ0WCkge1xyXG4gICAgICAgIGlmICh0YXJnZXQuY2xvc2VzdChcIi53aWRnZXRcIikpIHtcclxuICAgICAgICAgIHNob3dQb3B1cCgpO1xyXG4gICAgICAgICAgaGlkZVdpZGdldCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBpZiAodGFyZ2V0LmNsb3Nlc3QoXCIud2lkZ2V0XCIpKSB7XHJcbiAgICAgICAgICBib2R5LmNsYXNzTGlzdC5yZW1vdmUoXCJ3aWRnZXQtb24taG92ZXJcIik7XHJcbiAgICAgICAgICBwb3B1cC5jbGFzc0xpc3QucmVtb3ZlKFwic2hvd2VkXCIpO1xyXG4gICAgICAgICAgd2lkZ2V0LmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBkZWJvdW5jZShmLCBtcykge1xyXG4gICAgbGV0IHRpbWVyID0gbnVsbDtcclxuXHJcbiAgICByZXR1cm4gZnVuY3Rpb24oLi4uYXJncykge1xyXG4gICAgICBjb25zdCBvbkNvbXBsZXRlID0gKCkgPT4ge1xyXG4gICAgICAgIGYuYXBwbHkodGhpcywgYXJncyk7XHJcbiAgICAgICAgdGltZXIgPSBudWxsO1xyXG4gICAgICB9O1xyXG5cclxuICAgICAgaWYgKHRpbWVyKSB7XHJcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVyKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgdGltZXIgPSBzZXRUaW1lb3V0KG9uQ29tcGxldGUsIG1zKTtcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBhZGRFdmVudExpc3RlbmVycygpIHtcclxuICAgIGNvbnN0IGRlc2t0b3BCcmVha3BvaW4gPSAxMjAwO1xyXG4gICAgY29uc3QgbW9iaWxlQnJlYWtwb2ludCA9IDY1MDtcclxuXHJcbiAgICBkZWxlZ2F0ZVdpZGdldEV2ZW50TGlzdGVuZXJzKCk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBCaW5kIGEgc2xpZGVyIGRhdGEgY2hhbmdpbmcgd2l0aCBhIHZpZXdcclxuICAgICAqL1xyXG4gICAgc2xpZGVyLmFkZEV2ZW50TGlzdGVuZXIoXHJcbiAgICAgIFwiY2hhbmdlXCIsXHJcbiAgICAgIGV2ZW50ID0+IChzdW1tYXJ5LmlubmVySFRNTCA9IGV2ZW50LmN1cnJlbnRUYXJnZXQudmFsdWUpXHJcbiAgICApO1xyXG5cclxuICAgIGlmICh3aW5kb3cuaW5uZXJXaWR0aCA+PSBkZXNrdG9wQnJlYWtwb2luICYmIGlzRG9jdW1lbnRGcm96ZW4oKSkge1xyXG4gICAgICBib2R5LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZXdoZWVsXCIsIHNjcm9sbFRvU2VjdGlvbiwgeyBwYXNzaXZlOiB0cnVlIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh3aW5kb3cuaW5uZXJXaWR0aCA8PSBtb2JpbGVCcmVha3BvaW50KSB7XHJcbiAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIGluaXRTbGlkZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghaXNNb2JpbGUoKSkge1xyXG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCAoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgaGVhZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5oZWFkZXJcIik7XHJcbiAgICAgICAgaWYgKGhlYWRlci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5ib3R0b20gPCB3aW5kb3cucGFnZVlPZmZzZXQpIHtcclxuICAgICAgICAgIGhlYWRlci5jbGFzc0xpc3QuYWRkKFwiZml4ZWRcIik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGhlYWRlci5jbGFzc0xpc3QucmVtb3ZlKFwiZml4ZWRcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICB3aW5kb3cuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoXCJzY3JvbGxcIikpO1xyXG5cclxuICAgIGFkZEJ1dHRvbnNFdmVudExpc3RlbmVycygpO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gc2Nyb2xsVG9TZWN0aW9uKCkge1xyXG4gICAgY29uc3Qgc2Nyb2xsTW91c2VUbyA9ICQoXCIjc2Nyb2xsLXRvXCIpLm9mZnNldCgpLnRvcDtcclxuICAgIGNvbnN0IHNjcm9sbFRpbWUgPSA5MDA7XHJcbiAgICBjb25zdCBkZWxheSA9IDUwMDtcclxuXHJcbiAgICBoaWRlTW91c2UoKTtcclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICB1bmZyZWV6ZURvY3VtZW50KCk7XHJcbiAgICAgICQoXCJodG1sLCBib2R5XCIpLmFuaW1hdGUoXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgc2Nyb2xsVG9wOiBzY3JvbGxNb3VzZVRvLFxyXG4gICAgICAgICAgZWFzZTogXCJlYXNlT3V0QmFja1wiXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzY3JvbGxUaW1lXHJcbiAgICAgICk7XHJcbiAgICB9LCBkZWxheSk7XHJcblxyXG4gICAgYm9keS5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2V3aGVlbFwiLCBzY3JvbGxUb1NlY3Rpb24pO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gaXNEb2N1bWVudEZyb3plbigpIHtcclxuICAgIHJldHVybiBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5jb250YWlucyhcIm5vLXNjcm9sbFwiKTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHVuZnJlZXplRG9jdW1lbnQoKSB7XHJcbiAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoXCJuby1zY3JvbGxcIik7XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiaHRtbFwiKS5jbGFzc0xpc3QucmVtb3ZlKFwibm8tc2Nyb2xsXCIpO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gcmVtb3ZlTG9hZGVyKCkge1xyXG4gICAgY29uc3QgbG9hZGVySFRNTCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubG9hZGVyLXdyYXBwZXJcIik7XHJcbiAgICBjb25zdCBsb2FkZXJTY3JpcHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2xvYWRlci1zY3JpcHRcIik7XHJcbiAgICBjb25zdCBsb2FkZXJMaWIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2xvYWRlci1saWJcIik7XHJcblxyXG4gICAgbG9hZGVyTGliLnJlbW92ZSgpO1xyXG4gICAgbG9hZGVyU2NyaXB0LnJlbW92ZSgpO1xyXG5cclxuICAgIGNvbnN0IHRpbWVUb0xvYWRlckhpZGUgPSAyMDAwO1xyXG4gICAgbG9hZGVySFRNTC5jbGFzc0xpc3QuYWRkKFwicmVtb3ZlZFwiKTtcclxuICAgIHNldFRpbWVvdXQoKCkgPT4gbG9hZGVySFRNTC5yZW1vdmUoKSwgdGltZVRvTG9hZGVySGlkZSk7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBmcmVlemVEb2N1bWVudCgpIHtcclxuICAgIGNvbnN0IHNjcm9sbE1vdXNlVG8gPSAkKFwiI3Njcm9sbC10b1wiKS5vZmZzZXQoKS50b3A7XHJcblxyXG4gICAgaWYgKFxyXG4gICAgICB3aW5kb3cuaW5uZXJXaWR0aCA+PSAxMjAwICYmXHJcbiAgICAgIChzY3JvbGxNb3VzZVRvICogMTApIC8gMTAgPj0gd2luZG93LnBhZ2VZT2Zmc2V0XHJcbiAgICApIHtcclxuICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKFwibm8tc2Nyb2xsXCIpO1xyXG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiaHRtbFwiKS5jbGFzc0xpc3QuYWRkKFwibm8tc2Nyb2xsXCIpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaGlkZU1vdXNlKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBoaWRlTW91c2UoKSB7XHJcbiAgICBjb25zdCBtb3VzZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibW91c2VcIik7XHJcbiAgICBtb3VzZS5jbGFzc0xpc3QuYWRkKFwic2NhbGVkXCIpO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gaGFzTW91c2UoKSB7XHJcbiAgICByZXR1cm4gIWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibW91c2VcIikuY2xhc3NMaXN0LmNvbnRhaW5zKFwic2NhbGVkXCIpO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gYWRkQnV0dG9uc0V2ZW50TGlzdGVuZXJzKCkge1xyXG4gICAgY29uc3QgYnV0dG9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuYnV0dG9uLS1zY3JvbGwtdG8tdG9wXCIpO1xyXG4gICAgYnV0dG9ucy5mb3JFYWNoKGJ1dHRvbiA9PiBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHNjcm9sbFRvVG9wKSk7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBzY3JvbGxUb1RvcCgpIHtcclxuICAgIGxldCB0byA9IDA7XHJcblxyXG4gICAgaWYgKHdpbmRvdy5pbm5lcldpZHRoIDw9IDY1MCkge1xyXG4gICAgICBjb25zdCB3aWRnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmhvbWVfX3JpZ2h0IC53aWRnZXRcIik7XHJcbiAgICAgIGNvbnN0IHdpZGdldEVsZW1lbnREYXRhID0gd2lkZ2V0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG5cclxuICAgICAgdG8gPSB3aWRnZXRFbGVtZW50RGF0YS5oZWlnaHQgLyAyO1xyXG4gICAgfVxyXG5cclxuICAgICQoXCJodG1sLCBib2R5XCIpLmFuaW1hdGUoXHJcbiAgICAgIHtcclxuICAgICAgICBzY3JvbGxUb3A6IHRvLFxyXG4gICAgICAgIGVhc2U6IFwiZWFzZU91dEJhY2tcIlxyXG4gICAgICB9LFxyXG4gICAgICA5MDBcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBpbml0QW5pbWF0aW9ucygpIHtcclxuICAgIC8qKlxyXG4gICAgICogU2V0dXAgeW91ciBMYXp5IExpbmUgZWxlbWVudC5cclxuICAgICAqIHNlZSBSRUFETUUgZmlsZSBmb3IgbW9yZSBzZXR0aW5nc1xyXG4gICAgICovXHJcbiAgICBjb25zdCBhbmltYXRpb25zQ29uZmlnID0ge1xyXG4gICAgICBlYXNlOiBcImVhc2VJblF1YWRcIixcclxuICAgICAgc3Ryb2tlV2lkdGg6IDAuNSxcclxuICAgICAgc3Ryb2tlT3BhY2l0eTogMSxcclxuICAgICAgc3Ryb2tlQ29sb3I6IFwiI2ZmZmZmZlwiXHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IGxvZ29BbmltYXRpb25zQ29uZmlnID0ge1xyXG4gICAgICBlYXNlOiBcImVhc2VJblF1YWRcIixcclxuICAgICAgc3Ryb2tlV2lkdGg6IDQsXHJcbiAgICAgIHN0cm9rZU9wYWNpdHk6IDEsXHJcbiAgICAgIHN0cm9rZUNvbG9yOiBcIiNmZmZmZmZcIlxyXG4gICAgfTtcclxuXHJcbiAgICBsZXQgdGVhbUljb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3RlYW1cIik7XHJcbiAgICBsZXQgY2FsZW5kYXJJY29uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjYWxlbmRhclwiKTtcclxuICAgIGxldCBsb2dvSWNvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbG9nb1wiKTtcclxuXHJcbiAgICBsZXQgdGVhbUljb25BbmltYXRpb24gPSBuZXcgTGF6eUxpbmVQYWludGVyKHRlYW1JY29uLCBhbmltYXRpb25zQ29uZmlnKTtcclxuICAgIGxldCBjYWxlbmRhckljb25BbmltYXRpb24gPSBuZXcgTGF6eUxpbmVQYWludGVyKFxyXG4gICAgICBjYWxlbmRhckljb24sXHJcbiAgICAgIGFuaW1hdGlvbnNDb25maWdcclxuICAgICk7XHJcbiAgICBsZXQgbG9nb0ljb25BbmltYXRpb24gPSBuZXcgTGF6eUxpbmVQYWludGVyKGxvZ29JY29uLCBsb2dvQW5pbWF0aW9uc0NvbmZpZyk7XHJcblxyXG4gICAgdGVhbUljb25BbmltYXRpb24ucGFpbnQoKTtcclxuICAgIGNhbGVuZGFySWNvbkFuaW1hdGlvbi5wYWludCgpO1xyXG4gICAgbG9nb0ljb25BbmltYXRpb24ucGFpbnQoKTtcclxuICB9XHJcbn0pO1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NjcmlwdHMvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDdENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OzsiLCJzb3VyY2VSb290IjoiIn0=