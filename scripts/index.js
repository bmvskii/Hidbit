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

    function setStartTouchVariables(e) {
      touchstartX = event.changedTouches[0].screenX;
      touchstartY = event.changedTouches[0].screenY;
    }

    function swipeHandler(e) {
      const widget = document.querySelector(".home__right .widget");
      const popup = document.querySelector(".home__modal");

      touchendX = event.changedTouches[0].screenX;
      touchendY = event.changedTouches[0].screenY;

      if (touchendX >= touchstartX) {
        showPopup();
        hideWidget();
      } else {
        body.classList.remove("widget-on-hover");
        popup.classList.remove("showed");
        widget.classList.remove("hidden");
      }
    }
  }

  function debounce(f, ms) {
    let timer = null;
  
    return function (...args) {
      const onComplete = () => {
        f.apply(this, args);
        timer = null;
      }
  
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
