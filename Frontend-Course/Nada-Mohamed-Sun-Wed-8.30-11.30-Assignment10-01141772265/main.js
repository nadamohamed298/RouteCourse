var localStorageModeKey = "isDark";
var darkAndLightModeToggleBtn = document.querySelector("#theme-toggle-button");
var html = document.documentElement;

document.addEventListener("DOMContentLoaded", function () {
  var isDark = JSON.parse(localStorage.getItem(localStorageModeKey));

  if (isDark === true) {
    html.classList.add("dark");
    html.classList.remove("light");
  } else {
    html.classList.remove("dark");
    html.classList.add("light");
  }
});

function saveModePrefrencesInLocalStorage(modeType) {
  if (modeType === "dark") {
    localStorage.setItem(localStorageModeKey, "true");
  } else {
    localStorage.setItem(localStorageModeKey, "false");
  }
}

darkAndLightModeToggleBtn.addEventListener("click", function () {
  html.classList.toggle("dark");
  if (html.classList.contains("dark")) {
    saveModePrefrencesInLocalStorage("dark");
  } else {
    saveModePrefrencesInLocalStorage("light");
  }
});

// ============================================================================================================================= //

// Sidebar (open sidebar, close sidebar, choose font, choose color, click on reset button)
// A function to open the sidebar
function openSidebar() {
  settingsToggleBtn.style.right = "20rem";
  settingsSidebar.classList.remove("translate-x-full");
}

// A function to close the sidebar
function closeSidebar() {
  settingsToggleBtn.style.right = "0";
  settingsSidebar.classList.add("translate-x-full");
}

var settingsToggleBtn = document.querySelector("#settings-toggle");
var settingsSidebar = document.querySelector("#settings-sidebar");
settingsToggleBtn.addEventListener("click", openSidebar);

var closeBtn = document.querySelector("#close-settings");
closeBtn.addEventListener("click", closeSidebar);

var mainSelect = document.querySelector("main");
mainSelect.addEventListener("click", closeSidebar);

var navSelect = document.querySelector("nav");
navSelect.addEventListener("click", closeSidebar);

var bodySelect = document.querySelector("body");
var alexFontBtn = document.querySelector("[data-font='alexandria']");
var tajawalFontBtn = document.querySelector("[data-font='tajawal']");
var cairoFontBtn = document.querySelector("[data-font='cairo']");

var localStorageFontKey = "selectedFont";
function changeFont(fontName, activeButton) {
  alexFontBtn.classList.remove("active");
  tajawalFontBtn.classList.remove("active");
  cairoFontBtn.classList.remove("active");

  activeButton.classList.add("active");

  bodySelect.classList.remove("font-alexandria", "font-tajawal", "font-cairo");

  bodySelect.classList.add("font-" + fontName);

  localStorage.setItem(localStorageFontKey, fontName);
}

alexFontBtn.addEventListener("click", function () {
  changeFont("alexandria", alexFontBtn);
});

tajawalFontBtn.addEventListener("click", function () {
  changeFont("tajawal", tajawalFontBtn);
});

cairoFontBtn.addEventListener("click", function () {
  changeFont("cairo", cairoFontBtn);
});

window.addEventListener("load", function () {
  var savedFont = localStorage.getItem(localStorageFontKey);

  if (savedFont === null) {
    return;
  }

  if (savedFont === "alexandria") {
    changeFont("alexandria", alexFontBtn);
  } else if (savedFont === "tajawal") {
    changeFont("tajawal", tajawalFontBtn);
  } else if (savedFont === "cairo") {
    changeFont("cairo", cairoFontBtn);
  }
});

var resetBtn = document.querySelector("#reset-settings");
resetBtn.addEventListener("click", function () {
  changeFont("tajawal", tajawalFontBtn);
  closeSidebar();
});

// ============================================================================================================================= //

// Scroll Spy
var navLinks = document.querySelectorAll(".nav-links a");
var sections = document.querySelectorAll("section");
var scrollToTopBtn = document.querySelector("#scroll-to-top");
window.addEventListener("scroll", function () {
  var currentSection;
  for (var i = 0; i < sections.length; i++) {
    var sectionOffsetTop = sections[i].offsetTop - 100;
    var sectionOffsetHeight = sections[i].offsetHeight;
    if (
      window.scrollY >= sectionOffsetTop &&
      window.scrollY < sectionOffsetHeight + sectionOffsetTop
    ) {
      currentSection = sections[i].id;
    }
  }

  for (var i = 0; i < navLinks.length; i++) {
    navLinks[i].classList.remove("active");
  }

  for (var i = 0; i < navLinks.length; i++) {
    if (navLinks[i].getAttribute("href") == "#" + currentSection) {
      navLinks[i].classList.add("active");
    }
  }

  if (currentSection !== "hero-section") {
    scrollToTopBtn.classList.remove("invisible", "opacity-0");
    scrollToTopBtn.classList.add("visible", "opcity-100");
  } else {
    scrollToTopBtn.classList.add("invisible", "opacity-0");
    scrollToTopBtn.classList.remove("visible", "opcity-100");
  }
});

window.dispatchEvent(new Event("scroll"));

var heroSection = document.querySelector("#hero-section");
scrollToTopBtn.addEventListener("click", function () {
  heroSection.scrollIntoView({
    behavior: "smooth",
  });
});

// ==============================================================================================================================//

// Navs & Tabs (Projects section)
var tabButtons = document.querySelectorAll(".portfolio-filter");
var portfolioItems = document.querySelectorAll(".portfolio-item");
for (var i = 0; i < portfolioItems.length; i++) {
  portfolioItems[i].style.transition = "opacity 0.3s, transform 0.3s";
}

for (var i = 0; i < tabButtons.length; i++) {
  tabButtons[i].addEventListener("click", function (e) {
    for (var j = 0; j < tabButtons.length; j++) {
      tabButtons[j].classList.remove(
        "active",
        "bg-linear-to-r",
        "from-primary",
        "to-secondary",
        "text-white",
        "shadow-lg",
        "shadow-primary/50",
      );
      tabButtons[j].classList.add(
        "bg-white",
        "dark:bg-slate-800",
        "text-slate-600",
        "dark:text-slate-300",
        "border",
        "border-slate-300",
        "dark:border-slate-700",
      );
    }
    e.target.classList.remove(
      "bg-white",
      "dark:bg-slate-800",
      "text-slate-600",
      "dark:text-slate-300",
      "border",
      "border-slate-300",
      "dark:border-slate-700",
    );

    e.target.classList.add(
      "active",
      "bg-linear-to-r",
      "from-primary",
      "to-secondary",
      "text-white",
      "shadow-lg",
      "shadow-primary/50",
    );

    var selectedFilter = e.target.getAttribute("data-filter");

    for (var j = 0; j < portfolioItems.length; j++) {
      var projectCategory = portfolioItems[j].getAttribute("data-category");

      if (selectedFilter == "all" || selectedFilter == projectCategory) {
        portfolioItems[j].style.display = "block";
        portfolioItems[j].style.opacity = "1";
        portfolioItems[j].style.transform = "scale(1)";
      } else {
        portfolioItems[j].style.display = "none";
        portfolioItems[j].style.opacity = "0";
        portfolioItems[j].style.transform = "scale(0.8)";
      }
    }
  });
}

// ==============================================================================================================================//

// Carousel prev, next, and indicator buttons
var nextBtn = document.querySelector("#next-testimonial");
var prevBtn = document.querySelector("#prev-testimonial");
var indicatorBtn = document.querySelectorAll(".carousel-indicator");
var carousel = document.querySelector("#testimonials-carousel");
var currentSlide = 0;
updateIndicators();

function updateIndicators() {
  for (var i = 0; i < indicatorBtn.length; i++) {
    indicatorBtn[i].classList.remove("bg-accent", "scale-125");

    indicatorBtn[i].classList.add("bg-slate-400", "dark:bg-slate-600");
  }

  indicatorBtn[currentSlide].classList.remove(
    "bg-slate-400",
    "dark:bg-slate-600",
  );

  indicatorBtn[currentSlide].classList.add("bg-accent", "scale-125");
}

// Carousel next button
nextBtn.addEventListener("click", function () {
  currentSlide++;
  if (currentSlide > 3) {
    currentSlide = 0;
  }
  carousel.style.transform = "translateX(" + currentSlide * 33.333337 + "%)";
  updateIndicators();
});

// Carousel prev button
prevBtn.addEventListener("click", function () {
  currentSlide--;
  if (currentSlide < 0) {
    currentSlide = 3;
  }
  carousel.style.transform = "translateX(" + currentSlide * 33.3333 + "%)";
  updateIndicators();
});

// Carousel indicators
for (var i = 0; i < indicatorBtn.length; i++) {
  indicatorBtn[i].addEventListener("click", function (e) {
    var selectedIndicator = e.target.getAttribute("data-index");
    currentSlide = selectedIndicator;

    for (var j = 0; j < indicatorBtn.length; j++) {
      indicatorBtn[j].classList.remove("active", "bg-accent", "scale-125");
      indicatorBtn[j].classList.add("bg-slate-400", "dark:bg-slate-600");
    }

    e.target.classList.add("active", "bg-accent", "scale-125");
    e.target.classList.remove("bg-slate-400", "dark:bg-slate-600");

    carousel.style.transform = "translateX(" + currentSlide * 33.3333 + "%)";
  });
}

// ==============================================================================================================================//

// Color Palette
var colorBtn = document.querySelectorAll("#colorButtons");
var localStorageColorKey = "selectedColors";

for (var i = 0; i < colorBtn.length; i++) {
  colorBtn[i].addEventListener("click", function (e) {
    var selectedColorBtn = e.target.getAttribute("title");
    var clickedIndex;

    for (var j = 0; j < colorBtn.length; j++) {
      colorBtn[j].classList.remove(
        "active",
        "ring-2",
        "ring-primary",
        "ring-offset-2",
        "ring-offset-white",
        "dark:ring-offset-slate-900",
      );

      if (colorBtn[j] === e.target) {
        clickedIndex = j;
      }
    }

    colorBtn[clickedIndex].classList.add(
      "active",
      "ring-2",
      "ring-primary",
      "ring-offset-2",
      "ring-offset-white",
      "dark:ring-offset-slate-900",
    );

    var selectedColorPaletteObject;

    for (var k = 0; k < colorPalette.length; k++) {
      if (colorPalette[k].title === selectedColorBtn) {
        selectedColorPaletteObject = colorPalette[k];
      }
    }

    setVariablesColor(selectedColorPaletteObject);
    var selectedColorPaletteAsString = JSON.stringify(
      selectedColorPaletteObject,
    );
    localStorage.setItem(localStorageColorKey, selectedColorPaletteAsString);
  });
}

var colorPalette = [
  {
    title: "Purple Blue",
    primaryColor: "#6366f1",
    secondaryColor: "#8b5cf6",
    accentColor: "#a855f7",
  },
  {
    title: "Pink Orange",
    primaryColor: "#ec4899",
    secondaryColor: "#f97316",
    accentColor: "#fb923c",
  },
  {
    title: "Green Emerald",
    primaryColor: "#10b981",
    secondaryColor: "#059669",
    accentColor: "#34d399",
  },
  {
    title: "Blue Cyan",
    primaryColor: "#3b82f6",
    secondaryColor: "#06b6d4",
    accentColor: "#22d3ee",
  },
  {
    title: "Red Rose",
    primaryColor: "#ef4444",
    secondaryColor: "#f43f5e",
    accentColor: "#fb7185",
  },
  {
    title: "Amber Orange",
    primaryColor: "#f59e0b",
    secondaryColor: "#ea580c",
    accentColor: "#fbbf24",
  },
];

function setVariablesColor(colorObjectVariable) {
  html.style.setProperty("--color-primary", colorObjectVariable.primaryColor);
  html.style.setProperty(
    "--color-secondary",
    colorObjectVariable.secondaryColor,
  );
  html.style.setProperty("--color-accent", colorObjectVariable.accentColor);
}

window.addEventListener("load", function () {
  var colorPaletteAsAnObject = JSON.parse(
    localStorage.getItem(localStorageColorKey),
  );

  for (var i = 0; i < colorBtn.length; i++) {
    var colorButtonTitle = colorBtn[i].getAttribute("title");
    if (colorButtonTitle === colorPaletteAsAnObject.title) {
      colorBtn[i].classList.add(
        "active",
        "ring-2",
        "ring-primary",
        "ring-offset-2",
        "ring-offset-white",
        "dark:ring-offset-slate-900",
      );
      setVariablesColor(colorPaletteAsAnObject);
    } else {
      colorBtn[i].classList.remove(
        "active",
        "ring-2",
        "ring-primary",
        "ring-offset-2",
        "ring-offset-white",
        "dark:ring-offset-slate-900",
      );
    }
  }
});
