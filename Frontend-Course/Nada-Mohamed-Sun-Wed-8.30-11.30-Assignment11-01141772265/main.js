const PLANET_API_URL =
  "https://solar-system-opendata-proxy.vercel.app/api/planets";

document.addEventListener("DOMContentLoaded", async function () {
  var response = await fetch(PLANET_API_URL);
  var data = await response.json();
  planets = data.bodies;
  for (var i = 0; i < planets.length; i++) {
    if (planets[i].englishName === "Earth") {
      displayPlanetData(planets[i]);
    }
  }
});

function asideButtonsClickSubscription() {
  // Aside buttons.
  var asideButtons = document.querySelectorAll(".nav-link");
  var sections = document.querySelectorAll("section");

  for (var i = 0; i < asideButtons.length; i++) {
    asideButtons[i].addEventListener("click", function (e) {
      closeSidebar();
      var selectedAsideButton = e.currentTarget.getAttribute("data-section");

      for (var i = 0; i < asideButtons.length; i++) {
        // remove active state from all buttons.
        asideButtons[i].classList.remove(
          "active",
          "bg-blue-500/10",
          "text-blue-400",
        );
        asideButtons[i].classList.add("text-slate-300", "hover:bg-slate-800");
      }

      // add active state to the selected button.
      e.currentTarget.classList.add(
        "active",
        "bg-blue-500/10",
        "text-blue-400",
      );
      e.currentTarget.classList.remove("text-slate-300", "hover:bg-slate-800");

      for (var j = 0; j < sections.length; j++) {
        sections[j].classList.add("hidden");

        if (selectedAsideButton === sections[j].getAttribute("data-section")) {
          sections[j].classList.remove("hidden");
        } else {
          sections[j].classList.add("hidden");
        }
      }
    });
  }
}
asideButtonsClickSubscription();

// Menu button.
var burgerMenuButton = document.querySelector("#sidebar-toggle");
var aside = document.querySelector("aside");
var darkOverlay = document.querySelector(".sidebar-overlay");
darkOverlay.style.display = "none";

function openSidebar() {
  aside.classList.add("sidebar-open");
  darkOverlay.style.display = "block";
}

burgerMenuButton.addEventListener("click", openSidebar);

function closeSidebar() {
  aside.classList.remove("sidebar-open");
  darkOverlay.style.display = "none";
}

darkOverlay.addEventListener("click", closeSidebar);

// Styling the text of the planets in the table based on their type (Gas Giant, Ice Giant, Terrestrial).
// Gas Giant Color, And Background Color Styling.
function gasGiantCssStyling() {
  var gasGiantPurpleText = document.querySelectorAll(".gas-giant-purple-text");
  for (var i = 0; i < gasGiantPurpleText.length; i++) {
    gasGiantPurpleText[i].style.backgroundColor = "#a855f780";
    gasGiantPurpleText[i].style.color = "#c084fc";
  }
}
gasGiantCssStyling();

// Ice Giant Color, And Background Color Styling.
function iceGiantCssStyling() {
  var iceGiantBlueText = document.querySelectorAll(".ice-giant-blue-text");
  for (var j = 0; j < iceGiantBlueText.length; j++) {
    iceGiantBlueText[j].style.backgroundColor = "#3b82f680";
    iceGiantBlueText[j].style.color = "#60a5fa";
  }
}
iceGiantCssStyling();

// Terrestrial Color, And Background Color Styling.
function terrestrialCssStyling() {
  var terrestrialOrangeText = document.querySelectorAll(
    ".terrestrial-orange-text",
  );
  for (var k = 0; k < terrestrialOrangeText.length; k++) {
    terrestrialOrangeText[k].style.backgroundColor = "#f9731680";
    terrestrialOrangeText[k].style.color = "#fb923c";
  }
}
terrestrialCssStyling();

// 8 Planet cards.
var planetCards = document.querySelectorAll(".planet-card");
var planets = [];

// Selecting the elements of the planet content to display the data of the selected planet card.
// Planet info:
var planetDetailImage = document.querySelector("#planet-detail-image");
var planetDetailName = document.querySelector("#planet-detail-name");
var planetDetailDescription = document.querySelector(
  "#planet-detail-description",
);

var planetDistance = document.querySelector("#planet-distance");
var planetRadius = document.querySelector("#planet-radius");
var planetMass = document.querySelector("#planet-mass");
var planetDensity = document.querySelector("#planet-density");
var planetOrbitalPeriod = document.querySelector("#planet-orbital-period");
var planetRotation = document.querySelector("#planet-rotation");
var planetMoons = document.querySelector("#planet-moons");
var planetGravity = document.querySelector("#planet-gravity");

// Discovery Info:
var planetDiscoverer = document.querySelector("#planet-discoverer");
var planetDiscoveryDate = document.querySelector("#planet-discovery-date");
var planetBodyType = document.querySelector("#planet-body-type");
var planetVolume = document.querySelector("#planet-volume");

// Planet Quick Facts:
var planetMassFact = document.querySelector("#planetMass");
var planetGravityFact = document.querySelector("#planetGravity");
var planetDensityFact = document.querySelector("#planetDensity");
var planetAxialTiltFact = document.querySelector("#planetAxialTilt");

// Orbital Characteristics:
var planetPerihelion = document.querySelector("#planet-perihelion");
var planetAphelion = document.querySelector("#planet-aphelion");
var planetEccentricity = document.querySelector("#planet-eccentricity");
var planetInclination = document.querySelector("#planet-inclination");
var planetAxialTilt = document.querySelector("#planet-axial-tilt");
var planetTemp = document.querySelector("#planet-temp");
var planetEscapeVelocity = document.querySelector("#planet-escape");

function displayPlanetData(planet) {
  planetDetailImage.src = planet.image;
  planetDetailName.textContent = planet.englishName;
  planetDetailDescription.textContent = planet.description;

  planetDistance.textContent =
    (planet.semimajorAxis / 1000000).toFixed(1) + "M km";
  planetRadius.textContent = planet.meanRadius.toFixed(0) + " km";
  planetMass.textContent =
    planet.mass.massValue + " x 10^" + planet.mass.massExponent + " kg";
  planetDensity.textContent = planet.density.toFixed(2) + " g/cm³";
  planetOrbitalPeriod.textContent = planet.sideralOrbit.toFixed(2) + " days";
  planetRotation.textContent = planet.sideralRotation.toFixed(2) + " hours";

  if (planet.moons === null) {
    planetMoons.textContent = "0";
  } else {
    planetMoons.textContent = planet.moons.length;
  }

  planetGravity.textContent = planet.gravity.toFixed(2) + " m/s²";

  if (planet.discoveredBy === "") {
    planetDiscoverer.textContent = "Known since antiquity";
  } else {
    planetDiscoverer.textContent = planet.discoveredBy;
  }

  if (planet.discoveryDate === "") {
    planetDiscoveryDate.textContent = "Ancient times";
  } else {
    planetDiscoveryDate.textContent = planet.discoveryDate;
  }

  planetBodyType.textContent = planet.bodyType;
  planetVolume.textContent =
    planet.vol.volValue + " x 10^" + planet.vol.volExponent + " km³";

  planetMassFact.textContent =
    "Mass: " +
    planet.mass.massValue +
    " x 10^" +
    planet.mass.massExponent +
    " kg";
  planetGravityFact.textContent =
    "Surface gravity: " + planet.gravity + " m/s²";
  planetDensityFact.textContent = "Density: " + planet.density + " g/cm³";
  planetAxialTiltFact.textContent = "Axial tilt: " + planet.axialTilt + "°";

  planetPerihelion.textContent =
    (planet.perihelion / 1000000).toFixed(1) + "M km";
  planetAphelion.textContent = (planet.aphelion / 1000000).toFixed(1) + "M km";
  planetEccentricity.textContent = planet.eccentricity.toFixed(5);

  if (planet.inclination === 0) {
    planetInclination.textContent = "N/A";
  } else {
    planetInclination.textContent = planet.inclination.toFixed(2) + "°";
  }

  planetAxialTilt.textContent = planet.axialTilt.toFixed(2) + "°";

  if (planet.avgTemp === 0) {
    planetTemp.textContent = "N/A";
  } else {
    planetTemp.textContent = planet.avgTemp + "°C";
  }

  planetEscapeVelocity.textContent =
    (planet.escape / 1000).toFixed(2) + " km/s";
}

async function planetData() {
  var response = await fetch(PLANET_API_URL);
  var data = await response.json();

  planets = data.bodies;
  for (var i = 0; i < planetCards.length; i++) {
    planetCards[i].addEventListener("click", function (e) {
      // select the planet name from the data-planet-id attribute of the clicked card
      //  and convert the first letter to upper case to match the englishName property
      //  of the planet object in the bodies (planets) array.
      var selectedPlanetNameLowerCase =
        e.currentTarget.getAttribute("data-planet-id");
      var selectedPlanetCard =
        selectedPlanetNameLowerCase.charAt(0).toUpperCase() +
        selectedPlanetNameLowerCase.slice(1);

      for (var j = 0; j < planets.length; j++) {
        if (selectedPlanetCard === planets[j].englishName) {
          // display the planet data
          displayPlanetData(planets[j]);
        }
      }
    });
  }
}

planetData();

var launches = [];
const LAUNCHES_API_URL =
  "https://lldev.thespacedevs.com/2.3.0/launches/upcoming/?limit=10";

async function launchData() {
  var response = await fetch(LAUNCHES_API_URL);
  var data = await response.json();
  launches = data.results;
  displayFeaturedLaunchData(launches[0]);
  displayAllUpcomingLaunches(launches);
}

launchData();

function displayFeaturedLaunchData(featuredLaunch) {
  // Select Launch Dynamic Data Elements.
  var featuredLaunchImage = document.querySelector("#featuredLaunchImage");
  var launchTitle = document.querySelector("#launchTitle");
  var buildingText = document.querySelector("#buildingText");
  var rocketText = document.querySelector("#rocketText");
  var countdownContainer = document.querySelector("#countdownContainer");
  var daysLeftUntilLaunch = document.querySelector("#daysLeftUntilLaunch");
  var launchDate = document.querySelector("#launchDate");
  var launchTime = document.querySelector("#launchTime");
  var launchLocation = document.querySelector("#launchLocation");
  var launchCountry = document.querySelector("#launchCountry");
  var launchDescription = document.querySelector("#launchDescription");

  // Convert the launch date/time from the API (a string) into a JavaScript Date object.
  var launchDateObject = new Date(featuredLaunch.net);
  // Create a Date object representing the current date and time.
  var today = new Date();
  // Subtract today's date/time from the launch date/time.
  // The result is the remaining time in milliseconds until the launch.
  var differenceInMilliseconds = launchDateObject - today;
  // Convert the remaining milliseconds into days.
  // 1000 = milliseconds in 1 second.
  // 60 = seconds in 1 minute.
  // 60 = minutes in 1 hour.
  // 24 = hours in 1 day.
  // Math.ceil() rounds the result UP to the next whole day.

  var differenceInDays = Math.ceil(
    differenceInMilliseconds / (1000 * 60 * 60 * 24),
  );

  // Change the source (src) of the featured launch image
  // to the image URL received from the API.
  featuredLaunchImage.src = featuredLaunch.image.image_url;
  // Add Tailwind CSS classes to the featured launch image.
  // "object-cover" makes the image cover its container.
  // "h-full" makes the image take the full height of its container.
  featuredLaunchImage.classList.add("object-cover", "h-full");
  // Display the launch name received from the API
  // inside the element that has the ID "launchTitle".
  launchTitle.textContent = featuredLaunch.name;
  // Display the name of the company/organization responsible for the launch.
  buildingText.textContent = featuredLaunch.launch_service_provider.name;
  // Display the name of the rocket configuration.
  rocketText.textContent = featuredLaunch.rocket.configuration.name;

  // Display the number of days remaining until the launch.
  daysLeftUntilLaunch.textContent = differenceInDays;

  // Check whether the launch date has already arrived
  // or has passed.
  if (differenceInDays <= 0) {
    // Hide the countdown container if there are 0 days or fewer remaining.
    // "!important" is used to make sure this display rule overrides
    // other CSS rules that might otherwise show the element.
    countdownContainer.style.cssText = "display: none !important;";
  }

  launchDate.textContent = launchDateObject.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  launchTime.textContent = launchDateObject.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "UTC",
    timeZoneName: "short",
  });

  launchLocation.textContent = featuredLaunch.pad.location.name;
  launchCountry.textContent = featuredLaunch.pad.country.name;
  launchDescription.textContent = featuredLaunch.mission.description;
}

function displayAllUpcomingLaunches(allUpcomingLaunches) {
  var launchesGrid = document.querySelector("#launches-grid");
  launchesGrid.innerHTML = "";
  for (var i = 1; i < allUpcomingLaunches.length; i++) {
    var launchDateObject = new Date(allUpcomingLaunches[i].net);
    launchesGrid.innerHTML += `<div
                        class="bg-slate-800/50 border border-slate-700 rounded-2xl overflow-hidden hover:border-blue-500/30 transition-all group cursor-pointer">
                        <div class="relative h-48 bg-slate-900/50 flex items-center justify-center">
                            <div class="relative h-48 bg-slate-900/50 flex items-center justify-center overflow-hidden">
                        <img class="launch-image" src="${allUpcomingLaunches[i].image.image_url}">
                        </div>
                            <div class="absolute top-3 right-3">
                                <span
                                    class="px-3 py-1 bg-green-500/90 text-white backdrop-blur-sm rounded-full text-xs font-semibold">
                                    Go
                                </span>
                            </div>
                        </div>
                        <div class="p-5">
                            <div class="mb-3">
                                <h4
                                    class="font-bold text-lg mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors">
                                    ${allUpcomingLaunches[i].name}
                                </h4>
                                <p class="text-sm text-slate-400 flex items-center gap-2">
                                    <i class="fas fa-building text-xs"></i>
                                    ${allUpcomingLaunches[i].launch_service_provider.name}
                                </p>
                            </div>
                            <div class="space-y-2 mb-4">
                                <div class="flex items-center gap-2 text-sm">
                                    <i class="fas fa-calendar text-slate-500 w-4"></i>
                                    <span class="text-slate-300">${launchDateObject.toLocaleDateString(
                                      "en-US",
                                      {
                                        year: "numeric",
                                        month: "short",
                                        day: "numeric",
                                      },
                                    )}
                                      </span>
                                </div>
                                <div class="flex items-center gap-2 text-sm">
                                    <i class="fas fa-clock text-slate-500 w-4"></i>
                                    <span class="text-slate-300">${launchDateObject.toLocaleTimeString(
                                      "en-US",
                                      {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                        hour12: true,
                                        timeZone: "UTC",
                                        timeZoneName: "short",
                                      },
                                    )}
                                    </span>
                                </div>
                                <div class="flex items-center gap-2 text-sm">
                                    <i class="fas fa-rocket text-slate-500 w-4"></i>
                                    <span class="text-slate-300">${allUpcomingLaunches[i].rocket.configuration.name}</span>
                                </div>
                                <div class="flex items-center gap-2 text-sm">
                                    <i class="fas fa-map-marker-alt text-slate-500 w-4"></i>
                                    <span class="text-slate-300 line-clamp-1">${allUpcomingLaunches[i].pad.location.name}</span>
                                </div>
                            </div>
                            <div class="flex items-center gap-2 pt-4 border-t border-slate-700">
                                <button
                                    class="flex-1 px-4 py-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors text-sm font-semibold">
                                    Details
                                </button>
                                <button class="px-3 py-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors">
                                    <i class="far fa-heart"></i>
                                </button>
                            </div>
                        </div>
                    </div>`;
  }
  addDefaultImage();
  addImageHoverEffect();
}

function addDefaultImage() {
  var launchImages = document.querySelectorAll("#launches img");

  for (var i = 0; i < launchImages.length; i++) {
    launchImages[i].addEventListener("error", function () {
      this.src = "./pics/launch-placeholder.png";
    });
  }
}

function addImageHoverEffect() {
  var launchImages = document.querySelectorAll("#launches-grid img");

  for (var i = 0; i < launchImages.length; i++) {
    launchImages[i].classList.add("object-cover", "w-full");
    launchImages[i].style.transition = "transform 0.5s";
    launchImages[i].style.transform = "scale(1.6)";

    launchImages[i].addEventListener("mouseenter", function () {
      this.style.transform = "scale(1.8)";
    });

    launchImages[i].addEventListener("mouseleave", function () {
      this.style.transform = "scale(1.6)";
    });
  }
}

var apod = {};
async function astronomyPictureOfTheDayData(date) {
  const APOD_API_URL =
    "https://api.nasa.gov/planetary/apod?api_key=7gLBv6D4H65N4wexrEC1wssMuTiQDkd9XSKFMb0q";
  var url = APOD_API_URL;

  if (date) {
    url += "&date=" + date;
  }

  var response = await fetch(url);
  var data = await response.json();
  apod = data;
  displayAPOD(apod);
}

astronomyPictureOfTheDayData();

function displayAPOD(apodData) {
  var apodDate = new Date(apodData.date);
  var longDate = longDateFormat(apodDate);
  var shortDate = shortDateFormat(apodDate);
  var apodSection = document.querySelector("#today-in-space");
  apodSection.innerHTML = "";
  var mediaHTML = "";

  if (apodData.media_type === "image") {
    mediaHTML = `<img id="apod-image"
      class="w-full h-full object-cover"
      src="${apodData.hdurl || apodData.url}"
      alt="${apodData.title}"/>`;
  } else if (apodData.media_type === "video") {
    mediaHTML = `
    <iframe
      id="apod-video"
      class="w-full h-full"
      src="${apodData.url}"
      title="${apodData.title}"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen>
    </iframe>`;
  }

  apodSection.innerHTML = `<div class="max-w-7xl mx-auto">
                <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                    <div>
                        <h2 class="text-xl md:text-2xl font-space font-bold mb-1">
                            Today in Space
                        </h2>
                        <p id="apod-date" class="text-slate-400 text-xs md:text-sm">
                            Astronomy Picture of the Day - ${longDate}
                        </p>
                    </div>
                    <div class="flex items-center space-x-2 md:space-x-3">
                        <label for="apod-date-input" class="date-input-wrapper">
                            <input type="date" id="apod-date-input" class="custom-date-input" value="${apodData.date}" max="" min="1995-06-16"/>
                            <span id="dateLabelText" class="text-sm">${shortDate}</span>
                        </label>
                        <button id="load-date-btn"
                            class="px-3 md:px-4 py-2 bg-blue-500 rounded-xl hover:bg-blue-600 transition-colors font-semibold text-sm flex items-center space-x-1 md:space-x-2">
                            <i class="fas fa-search"></i>
                            <span class="hidden sm:inline">Load</span>
                        </button>
                        <button id="today-apod-btn"
                            class="px-3 md:px-4 py-2 bg-slate-800 border border-slate-700 rounded-xl hover:bg-slate-700 transition-colors font-semibold text-sm">
                            Today
                        </button>
                    </div>
                </div>
                <div class="grid grid-cols-1 xl:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
                    <div class="xl:col-span-2">
                        <div id="apod-image-container"
                            class="relative rounded-2xl overflow-hidden group h-[300px] md:h-[400px] lg:h-[600px] bg-slate-800/50 flex items-center justify-center">
                            <div id="apod-loading" class="text-center hidden">
                                <i class="fas fa-spinner fa-spin text-4xl text-blue-400 mb-4"></i>
                                <p class="text-slate-400">Loading today's image...</p>
                            </div>
                            ${mediaHTML}
                            <div
                                class="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                                <div class="absolute bottom-6 left-6 right-6">
                                    <button id="viewFullResolutionBtn"
                                        class="w-full py-3 bg-white/10 backdrop-blur-md rounded-lg font-semibold hover:bg-white/20 transition-colors">
                                        <i class="fas fa-expand mr-2"></i>View Full Resolution
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="space-y-4 md:space-y-6">
                        <div class="bg-slate-800/50 border border-slate-700 rounded-xl md:rounded-2xl p-4 md:p-6">
                            <h3 id="apod-title" class="text-lg md:text-2xl font-semibold mb-3 md:mb-4">
                                ${apodData.title}
                            </h3>
                            <div class="flex items-center space-x-4 mb-4 text-sm text-slate-400">
                                <span id="apod-date-detail"><i class="far fa-calendar mr-2"></i>${longDate}</span>
                            </div>
                            <p id="apod-explanation" class="text-slate-300 leading-relaxed mb-4">
                                ${apodData.explanation}
                            </p>
                            <div id="apod-copyright" class="text-xs text-slate-400 italic mb-4">
                                ${apodData.copyright || ""}
                            </div>
                        </div>
                        <div class="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
                            <h4 class="font-semibold mb-3 flex items-center">
                                <i class="fas fa-info-circle text-blue-400 mr-2"></i>
                                Image Details
                            </h4>
                            <div class="space-y-3 text-sm">
                                <div class="flex justify-between">
                                    <span class="text-slate-400">Date</span>
                                    <span id="apod-date-info" class="font-medium">${apodDate.toLocaleDateString(
                                      "en-US",
                                      {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                      },
                                    )}</span>
                                </div>
                                <div class="flex justify-between">
                                    <span class="text-slate-400">Media Type</span>
                                    <span id="apod-media-type" class="font-medium">${apodData.media_type}</span>
                                </div>
                                <div class="flex justify-between">
                                    <span class="text-slate-400">Source</span>
                                    <span class="font-medium">NASA APOD</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;

  dateInputMax();
  viewFullResolutionButton(apodData);
  dateInputChangeOnSelect();
  todayButton();
  loadButton();
}

function dateInputFormat(date) {
  return date.toISOString().slice(0, 10);
}

function todayButton() {
  var todayBtn = document.querySelector("#today-apod-btn");
  var apodDate = document.querySelector("#apod-date");
  var dateLabelText = document.querySelector("#dateLabelText");
  var dateInput = document.querySelector("#apod-date-input");

  todayBtn.addEventListener("click", function () {
    var today = new Date();
    // Update the calendar input
    dateInput.value = dateInputFormat(today);
    // Update the date label inside the calendar
    dateLabelText.textContent = shortDateFormat(today);
    // Update APOD heading date
    apodDate.textContent =
      "Astronomy Picture of the Day - " + longDateFormat(today);
    astronomyPictureOfTheDayData();
  });
}

function viewFullResolutionButton(apodData) {
  var viewFullResolutionBtn = document.querySelector("#viewFullResolutionBtn");

  viewFullResolutionBtn.addEventListener("click", function () {
    if (apodData.hdurl) {
      window.open(apodData.hdurl, "_blank");
    } else {
      window.open(apodData.url, "_blank");
    }
  });
}

function dateInputChangeOnSelect() {
  var dateLabelText = document.querySelector("#dateLabelText");
  var dateInput = document.querySelector("#apod-date-input");

  dateInput.addEventListener("change", function () {
    var inputValue = dateInput.value;
    var selectedDate = new Date(inputValue);
    dateLabelText.textContent = shortDateFormat(selectedDate);
  });
}

// A function that make the user not able to select a date in the future that has not come yet.
function dateInputMax() {
  var dateInput = document.querySelector("#apod-date-input");
  // var today = new Date();
  dateInput.max = new Date().toISOString().slice(0, 10);
}

function loadButton() {
  var loadBtn = document.querySelector("#load-date-btn");
  var dateInput = document.querySelector("#apod-date-input");
  var dateLabelText = document.querySelector("#dateLabelText");
  var apodDate = document.querySelector("#apod-date");

  loadBtn.addEventListener("click", function () {
    // Read the selected date from the calendar
    var selectedDate = dateInput.value;
    // Convert it to a Date object
    var selectedDateObject = new Date(selectedDate);

    dateLabelText.textContent = shortDateFormat(selectedDateObject);
    apodDate.textContent =
      "Astronomy Picture of the Day - " + longDateFormat(selectedDateObject);
    astronomyPictureOfTheDayData(selectedDate);
  });
}

function longDateFormat(date) {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function shortDateFormat(date) {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
