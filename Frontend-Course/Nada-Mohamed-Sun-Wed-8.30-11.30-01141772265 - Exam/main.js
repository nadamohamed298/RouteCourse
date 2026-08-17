// Aside buttons
const ASIDE_BUTTONS = document.querySelectorAll(".nav-link");

// sections
const SEARCH_FILTER = document.querySelector("#search-filters-section");
const MEAL_CATEGORIES = document.querySelector("#meal-categories-section");
const ALL_RECIPES = document.querySelector("#all-recipes-section");
const MEAL_DETAILS = document.querySelector("#meal-details");
const PRODUCTS_SECTION = document.querySelector("#products-section");
const FOOD_LOG = document.querySelector("#foodlog-section");

// Search input
const SEARCH_INPUT = document.querySelector("#search-input");

// Header
const HEADER_TITLE = document.querySelector("#header h1");
const HEADER_SUBTITLE = document.querySelector("#header p");

// API
const USDA_API_KEY = "wWhGfrdV0zW9J3SDJxcZ6Id5RGJ63Zhk2jmF2d3T";
const NUTRITION_API_URL = "https://nutriplan-api.vercel.app/api/nutrition/analyze";

let currentMealNutrition = {
  calories: 0,
  protein: 0,
  carbs: 0,
  fat: 0
};
let currentMealForLog = null;

let SECTIONS = [
  SEARCH_FILTER,
  MEAL_CATEGORIES,
  ALL_RECIPES,
  MEAL_DETAILS,
  PRODUCTS_SECTION,
  FOOD_LOG,
];

// Function to handle aside button clicks and section switching
function asideButtons() {
  for (let i = 0; i < ASIDE_BUTTONS.length; i++) {
    ASIDE_BUTTONS[i].addEventListener("click", function (e) {
      closeSidebar();

      let buttonText = e.currentTarget.textContent.trim();

      for (let i = 0; i < ASIDE_BUTTONS.length; i++) {
        ASIDE_BUTTONS[i].classList.remove("bg-emerald-50", "text-emerald-700");
        ASIDE_BUTTONS[i].classList.add("text-gray-600", "hover:bg-gray-50");
      }

      e.currentTarget.classList.add("bg-emerald-50", "text-emerald-700");
      e.currentTarget.classList.remove("text-gray-600", "hover:bg-gray-50");

      for (let j = 0; j < SECTIONS.length; j++) {
        SECTIONS[j].classList.add("hidden");
      }

      if (buttonText === "Meals & Recipes") {
        SECTIONS[0].classList.remove("hidden");
        SECTIONS[1].classList.remove("hidden");
        SECTIONS[2].classList.remove("hidden");
        updateHeaderText("Meals & Recipes", "Discover delicious and nutritious recipes tailored for you");
      } else if (buttonText === "Product Scanner") {
        SECTIONS[4].classList.remove("hidden");
        updateHeaderText("Product Scanner", "Scan products to view nutrition information");
        resetProductScanner();
      } else if (buttonText === "Food Log") {
        SECTIONS[5].classList.remove("hidden");
        updateHeaderText("Food Log", "Track and monitor your daily nutrition intake");
      }
    });
  }
}
asideButtons();

// Function to update header title and subtitle
function updateHeaderText(title, subtitle) {
  if (HEADER_TITLE) {
    HEADER_TITLE.textContent = title;
  }
  if (HEADER_SUBTITLE) {
    HEADER_SUBTITLE.textContent = subtitle;
  }
}

// SIDEBAR MENU
const BURGER_MENU_BUTTON = document.querySelector("#header-menu-btn");
const CLOSE_BUTTON = document.querySelector("#sidebar-close-btn");
const ASIDE = document.querySelector("#sidebar");
const DARK_OVERLAY = document.querySelector(".sidebar-overlay");

DARK_OVERLAY.style.display = "none";

// Function to open sidebar
function openSidebar() {
  ASIDE.classList.add("open");
  DARK_OVERLAY.style.display = "block";
}

BURGER_MENU_BUTTON.addEventListener("click", openSidebar);

// Function to close sidebar
function closeSidebar() {
  ASIDE.classList.remove("open");
  DARK_OVERLAY.style.display = "none";
}

CLOSE_BUTTON.addEventListener("click", closeSidebar);
DARK_OVERLAY.addEventListener("click", closeSidebar);

// Function to hide all sections on page load
function hideAllSectionsOnLoad() {
  for (let i = 0; i < SECTIONS.length; i++) {
    if (SECTIONS[i]) {
      SECTIONS[i].classList.add("hidden");
    }
  }
}

// Function to show default sections
function showDefaultSections() {
  for (let i = 0; i < 3 && i < SECTIONS.length; i++) {
    if (SECTIONS[i]) {
      SECTIONS[i].classList.remove("hidden");
    }
  }
}

hideAllSectionsOnLoad();
showDefaultSections();

// Function to display meal details section when a recipe card is clicked
function displayMealDetailsSection() {
  setTimeout(function() {
    const RECIPE_CARD = document.querySelectorAll(".recipe-card");

    for (let i = 0; i < RECIPE_CARD.length; i++) {
      RECIPE_CARD[i].addEventListener("click", function (e) {
        for (let j = 0; j < SECTIONS.length; j++) {
          SECTIONS[j].classList.add("hidden");
        }

        const mealId = this.getAttribute("data-meal-id");

        if (mealId) {
          getMealById(mealId);
          MEAL_DETAILS.classList.remove("hidden");
          updateHeaderText("Recipe Details", "View full recipe information and nutrition facts");
        }
      });
    }
  }, 0);
}

// Back arrow button function
function backArrowButton() {
  const BACK_TO_MEALS_BTN = document.querySelector("#back-to-meals-btn");
  if (BACK_TO_MEALS_BTN) {
    BACK_TO_MEALS_BTN.addEventListener("click", function () {
      SEARCH_FILTER.classList.remove("hidden");
      MEAL_CATEGORIES.classList.remove("hidden");
      ALL_RECIPES.classList.remove("hidden");

      MEAL_DETAILS.classList.add("hidden");
      PRODUCTS_SECTION.classList.add("hidden");
      FOOD_LOG.classList.add("hidden");
      
      updateHeaderText("Meals & Recipes", "Discover delicious and nutritious recipes tailored for you");
    });
  }
}

// Function to fetch nutrition facts from API
async function getNutritionFacts(recipeName, ingredients) {
  let formattedIngredients = [];
  for (let i = 0; i < ingredients.length; i++) {
    let ingredientItem = "";
    if (typeof ingredients[i] === "string") {
      ingredientItem = ingredients[i];
    } else if (ingredients[i].ingredient) {
      ingredientItem = ingredients[i].ingredient;
    } else {
      ingredientItem = ingredients[i];
    }
    formattedIngredients.push(ingredientItem);
  }

  // Fetch nutrition data
  let response = await fetch(NUTRITION_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': USDA_API_KEY
    },
    body: JSON.stringify({
      recipeName: recipeName,
      ingredients: formattedIngredients
    })
  });

  let data = await response.json();

  if (data && data.success && data.data && data.data.perServing) {
    return data.data;
  }
  if (data && data.nutrition) {
    return data.nutrition;
  }
  if (data && data.perServing) {
    return data;
  }
  return null;
}

// Function to display meal details section
function displayMealDetails(meal) {
  const mealDetailsContainer = document.querySelector("#meal-details-container");

  if (meal === null || meal === undefined || meal.name === null || meal.name === undefined || meal.name === "") {
    mealDetailsContainer.innerHTML = `
      <div class="text-center py-12">
        <p class="text-red-500">Error loading meal details. Please try again.</p>
      </div>`;
    return;
  }

  let ingredientsHTML = "";
  let ingredientsList = [];

  if (meal.ingredients && Array.isArray(meal.ingredients)) {
    for (let i = 0; i < meal.ingredients.length; i++) {
      ingredientsHTML += `
        <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
          <i class="fa-solid fa-check text-emerald-600"></i>
          <span class="text-gray-700">
            <strong class="text-gray-900">
              ${meal.ingredients[i].measure || ""}
            </strong>
            ${meal.ingredients[i].ingredient}
          </span>
        </div>`;

      const measureText = meal.ingredients[i].measure || "";
      const ingredientText = meal.ingredients[i].ingredient || "";
      const fullIngredient = (measureText + " " + ingredientText).trim();
      ingredientsList.push(fullIngredient || ingredientText);
    }
  } else {
    for (let i = 1; i <= 20; i++) {
      const ingredientItem = meal["ingredient" + i];
      const measureItem = meal["measure" + i];

      if (ingredientItem && ingredientItem.trim() !== "") {
        ingredientsHTML += `<div class="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
          <i class="fa-solid fa-check text-emerald-600"></i>
          <span class="text-gray-700">
            <strong class="text-gray-900">
              ${measureItem || ""}
            </strong>
            ${ingredientItem}
          </span>
        </div>`;

        const fullIngredient = ((measureItem || "") + " " + ingredientItem).trim();
        ingredientsList.push(fullIngredient || ingredientItem);
      }
    }
  }

  let youtubeHTML = "";

  if (meal.youtube) {
    const videoId = meal.youtube.split("v=")[1];

    youtubeHTML = `<div class="bg-white rounded-2xl shadow-lg p-6 mt-8">
      <h2 class="text-xl font-bold mb-4">
        <i class="fa-solid fa-video text-red-500"></i>
        Video Tutorial
      </h2>
      <div class="aspect-video rounded-xl overflow-hidden">
        <iframe class="w-full h-full" src="https://www.youtube.com/embed/${videoId}" allowfullscreen>
        </iframe>
      </div>
    </div>`;
  }

  mealDetailsContainer.innerHTML = `<div class="max-w-7xl mx-auto">
    <button id="back-to-meals-btn" class="flex items-center gap-2 text-gray-600 hover:text-emerald-600 font-medium mb-6">
      <i class="fa-solid fa-arrow-left"></i>
      <span>Back to Recipes</span>
    </button>
    <div class="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
      <div class="relative h-96">
        <img class="w-full h-full object-cover" src="${meal.thumbnail}" alt="${meal.name}">
        <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <div class="absolute bottom-0 left-0 p-8 w-full">
          <div class="flex gap-3 mb-3">
            <span class="px-3 py-1 rounded-full bg-emerald-500 text-white text-sm">${meal.category}</span>
            <span class="px-3 py-1 rounded-full bg-blue-500 text-white text-sm">${meal.area}</span>
          </div>
          <h1 class="text-4xl font-bold text-white mb-3">${meal.name}</h1>
          <div class="flex items-center gap-6 text-white/90">
            <span class="flex items-center gap-2"><i class="fa-solid fa-clock"></i><span>30 min</span></span>
            <span class="flex items-center gap-2"><i class="fa-solid fa-utensils"></i><span id="hero-servings">4 servings</span></span>
            <span class="flex items-center gap-2"><i class="fa-solid fa-fire"></i><span id="hero-calories">Calculating...</span></span>
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-wrap gap-3 mb-8">
      <button id="log-meal-btn" class="flex items-center gap-2 px-6 py-3 bg-gray-200 text-gray-500 rounded-xl font-semibold cursor-not-allowed transition-all" data-meal-id="${meal.id}" disabled>
        <i class="fa-solid fa-spinner fa-spin"></i>
        <span>Calculating...</span>
      </button>
    </div>
    <div class="grid lg:grid-cols-3 gap-8">
      <div class="lg:col-span-2 space-y-8">
        <div class="bg-white rounded-2xl shadow-lg p-6">
          <h2 class="text-xl font-bold mb-4"><i class="fa-solid fa-list-check text-emerald-600"></i> Ingredients</h2>
          <div class="grid md:grid-cols-2 gap-3">${ingredientsHTML}</div>
        </div>
        <div class="bg-white rounded-2xl shadow-lg p-6">
          <h2 class="text-xl font-bold mb-4"><i class="fa-solid fa-book-open text-emerald-600"></i> Instructions</h2>
          <p class="leading-8 text-gray-700">${meal.instructions}</p>
        </div>
        ${youtubeHTML}
      </div>
      <div class="sticky top-24 space-y-4">
        <div class="bg-white rounded-2xl shadow-lg p-6">
          <h2 class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <i class="fa-solid fa-chart-pie text-emerald-600"></i> Nutrition Facts
          </h2>
          <div id="nutrition-facts-container">
            <div id="nutrition-loading">
              <div class="text-center py-8">
                <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-50 flex items-center justify-center">
                  <i class="fa-solid fa-calculator text-2xl text-emerald-500"></i>
                </div>
                <p class="text-gray-800 font-medium text-base">Calculating Nutrition</p>
                <p class="text-sm text-gray-500 mt-1">Analyzing ingredients...</p>
                <div class="flex items-center justify-center gap-1.5 mt-4">
                  <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
                </div>
              </div>
            </div>
            <div id="nutrition-content" style="display: none;">
              <p class="text-sm text-gray-500 mb-4">Per serving</p>
              <div class="text-center py-4 mb-4 bg-linear-to-br from-emerald-50 to-teal-50 rounded-xl">
                <p class="text-sm text-gray-600">Calories per serving</p>
                <p class="text-4xl font-bold text-emerald-600" id="nutrition-calories">--</p>
                <p class="text-xs text-gray-500 mt-1" id="nutrition-total-calories">Total: -- cal</p>
              </div>
              <div class="space-y-4" id="nutrition-nutrients">
                <div>
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2"><div class="w-3 h-3 rounded-full bg-emerald-500"></div><span class="text-gray-700">Protein</span></div>
                    <span class="font-bold text-gray-900" id="nutrition-protein">--g</span>
                  </div>
                  <div class="w-full bg-gray-100 rounded-full h-2 mt-1"><div class="bg-emerald-500 h-2 rounded-full" id="protein-bar" style="width: 0%"></div></div>
                </div>
                <div>
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2"><div class="w-3 h-3 rounded-full bg-blue-500"></div><span class="text-gray-700">Carbs</span></div>
                    <span class="font-bold text-gray-900" id="nutrition-carbs">--g</span>
                  </div>
                  <div class="w-full bg-gray-100 rounded-full h-2 mt-1"><div class="bg-blue-500 h-2 rounded-full" id="carbs-bar" style="width: 0%"></div></div>
                </div>
                <div>
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2"><div class="w-3 h-3 rounded-full bg-purple-500"></div><span class="text-gray-700">Fat</span></div>
                    <span class="font-bold text-gray-900" id="nutrition-fat">--g</span>
                  </div>
                  <div class="w-full bg-gray-100 rounded-full h-2 mt-1"><div class="bg-purple-500 h-2 rounded-full" id="fat-bar" style="width: 0%"></div></div>
                </div>
                <div>
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2"><div class="w-3 h-3 rounded-full bg-orange-500"></div><span class="text-gray-700">Fiber</span></div>
                    <span class="font-bold text-gray-900" id="nutrition-fiber">--g</span>
                  </div>
                  <div class="w-full bg-gray-100 rounded-full h-2 mt-1"><div class="bg-orange-500 h-2 rounded-full" id="fiber-bar" style="width: 0%"></div></div>
                </div>
                <div>
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2"><div class="w-3 h-3 rounded-full bg-pink-500"></div><span class="text-gray-700">Sugar</span></div>
                    <span class="font-bold text-gray-900" id="nutrition-sugar">--g</span>
                  </div>
                  <div class="w-full bg-gray-100 rounded-full h-2 mt-1"><div class="bg-pink-500 h-2 rounded-full" id="sugar-bar" style="width: 0%"></div></div>
                </div>
                <div>
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2"><div class="w-3 h-3 rounded-full bg-red-500"></div><span class="text-gray-700">Saturated Fat</span></div>
                    <span class="font-bold text-gray-900" id="nutrition-saturated-fat">--g</span>
                  </div>
                  <div class="w-full bg-gray-100 rounded-full h-2 mt-1"><div class="bg-red-500 h-2 rounded-full" id="saturated-fat-bar" style="width: 0%"></div></div>
                </div>
              </div>
              <div class="mt-6 pt-6 border-t border-gray-100">
                <h3 class="text-sm font-semibold text-gray-900 mb-3">Other</h3>
                <div class="grid grid-cols-2 gap-3 text-sm">
                  <div class="flex justify-between"><span class="text-gray-600">Cholesterol</span><span class="font-medium" id="nutrition-cholesterol">--mg</span></div>
                  <div class="flex justify-between"><span class="text-gray-600">Sodium</span><span class="font-medium" id="nutrition-sodium">--mg</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="bg-white rounded-2xl shadow-lg p-5">
          <h3 class="text-sm font-semibold text-gray-900 mb-3">Recipe Source</h3>
          <a href="${meal.source || meal.youtube || '#'}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 text-sm text-emerald-600 hover:text-emerald-700 font-medium">
            <i class="fa-solid fa-external-link-alt"></i> View Original Recipe
          </a>
        </div>
      </div>
    </div>
  </div>`;

  backArrowButton();

  currentMealForLog = meal;
  currentMealNutrition = {
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0
  };

  setupLogMealButton();
  fetchAndDisplayNutrition(meal.name, ingredientsList);
}

// Function to fetch and display nutrition facts
async function fetchAndDisplayNutrition(recipeName, ingredients) {
  const loadingElement = document.getElementById("nutrition-loading");
  const contentElement = document.getElementById("nutrition-content");
  
  const nutritionData = await getNutritionFacts(recipeName, ingredients);
  
  let calories = 0;
  let totalCalories = 0;
  let protein = 0;
  let carbs = 0;
  let fat = 0;
  let fiber = 0;
  let sugar = 0;
  let saturatedFat = 0;
  let cholesterol = 0;
  let sodium = 0;
  
  if (nutritionData && nutritionData.perServing) {
    const perServingData = nutritionData.perServing;
    const totalsData = nutritionData.totals || {};
    calories = perServingData.calories || 0;
    totalCalories = totalsData.calories || (calories * (nutritionData.servings || 4));
    protein = perServingData.protein || 0;
    carbs = perServingData.carbs || 0;
    fat = perServingData.fat || 0;
    fiber = perServingData.fiber || 0;
    sugar = perServingData.sugar || 0;
    saturatedFat = perServingData.saturatedFat || 0;
    cholesterol = perServingData.cholesterol || 0;
    sodium = perServingData.sodium || 0;
  } else if (nutritionData && (nutritionData.calories || nutritionData.caloriesPerServing)) {
    calories = nutritionData.caloriesPerServing || nutritionData.calories || 0;
    totalCalories = nutritionData.totalCalories || (calories * 4);
    protein = nutritionData.protein || 0;
    carbs = nutritionData.carbs || 0;
    fat = nutritionData.fat || 0;
    fiber = nutritionData.fiber || 0;
    sugar = nutritionData.sugar || 0;
    saturatedFat = nutritionData.saturatedFat || 0;
    cholesterol = nutritionData.cholesterol || 0;
    sodium = nutritionData.sodium || 0;
  } else {
    calories = 0;
    totalCalories = 0;
    protein = 0;
    carbs = 0;
    fat = 0;
    fiber = 0;
    sugar = 0;
    saturatedFat = 0;
    cholesterol = 0;
    sodium = 0;
  }
  
  if (loadingElement) {
    loadingElement.style.display = "none";
  }
  if (contentElement) {
    contentElement.style.display = "block";
  }
  
  currentMealNutrition = {
    calories: Math.round(calories),
    protein: Math.round(protein),
    carbs: Math.round(carbs),
    fat: Math.round(fat)
  };

  const heroCalories = document.getElementById("hero-calories");
  if (heroCalories) {
    heroCalories.textContent = Math.round(calories) + " cal/serving";
  }
  
  const maxProtein = 60;
  const maxCarbs = 300;
  const maxFat = 100;
  const maxFiber = 40;
  const maxSugar = 50;
  const maxSaturatedFat = 30;
  
  document.getElementById("nutrition-calories").textContent = Math.round(calories);
  document.getElementById("nutrition-total-calories").textContent = "Total: " + Math.round(totalCalories) + " cal";
  document.getElementById("nutrition-protein").textContent = Math.round(protein) + "g";
  document.getElementById("protein-bar").style.width = Math.min((protein / maxProtein) * 100, 100) + "%";
  document.getElementById("nutrition-carbs").textContent = Math.round(carbs) + "g";
  document.getElementById("carbs-bar").style.width = Math.min((carbs / maxCarbs) * 100, 100) + "%";
  document.getElementById("nutrition-fat").textContent = Math.round(fat) + "g";
  document.getElementById("fat-bar").style.width = Math.min((fat / maxFat) * 100, 100) + "%";
  document.getElementById("nutrition-fiber").textContent = Math.round(fiber) + "g";
  document.getElementById("fiber-bar").style.width = Math.min((fiber / maxFiber) * 100, 100) + "%";
  document.getElementById("nutrition-sugar").textContent = Math.round(sugar) + "g";
  document.getElementById("sugar-bar").style.width = Math.min((sugar / maxSugar) * 100, 100) + "%";
  document.getElementById("nutrition-saturated-fat").textContent = Math.round(saturatedFat) + "g";
  document.getElementById("saturated-fat-bar").style.width = Math.min((saturatedFat / maxSaturatedFat) * 100, 100) + "%";
  document.getElementById("nutrition-cholesterol").textContent = Math.round(cholesterol) + "mg";
  document.getElementById("nutrition-sodium").textContent = Math.round(sodium) + "mg";

  enableLogMealButton();
}

// Function to enable log meal button
function enableLogMealButton() {
  const buttonElement = document.getElementById("log-meal-btn");
  if (!buttonElement) {
    return;
  }
  buttonElement.disabled = false;
  buttonElement.className = "flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all";
  buttonElement.innerHTML = `<i class="fa-solid fa-clipboard-list"></i><span>Log This Meal</span>`;
  setupLogMealButton();
}

// MEAL SEARCH AND FILTER FUNCTIONS
let searchMealsData = [];
const SEARCH_MEAL_API = "https://nutriplan-api.vercel.app/api/meals/search?q=chicken&page=1&limit=25";

// Function to fetch search meals data
async function searchMealsDataFetch() {
  let response = await fetch(SEARCH_MEAL_API);
  let data = await response.json();

  if (data && data.results && Array.isArray(data.results)) {
    searchMealsData = data.results;
    displayMealsByArea(searchMealsData);
  } else {
    searchMealsData = [];
    displayMealsByArea([]);
  }
}
searchMealsDataFetch();

// Function to display meals by area
function displayMealsByArea(meals) {
  const recipesGrid = document.querySelector("#recipes-grid");
  recipesGrid.innerHTML = "";
  
  if (meals === null || meals === undefined || meals.length === 0) {
    recipesGrid.innerHTML = `
      <div class="flex flex-col items-center justify-center py-12 text-center col-span-full">
        <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <i class="fa-solid fa-magnifying-glass text-2xl text-gray-400"></i>
        </div>
        <p class="text-gray-500 text-lg">No recipes found. Try a different search term.</p>
      </div>`;

    const recipesCount = document.querySelector("#recipes-count");
    if (recipesCount) {
      recipesCount.textContent = "Showing 0 recipes";
    }
    return;
  }

  for (let mealIndex = 0; mealIndex < meals.length; mealIndex++) {
    let instructionsText = "";
    if (meals[mealIndex].instructions) {
      if (typeof meals[mealIndex].instructions === "string") {
        instructionsText = meals[mealIndex].instructions;
      } else if (Array.isArray(meals[mealIndex].instructions)) {
        instructionsText = meals[mealIndex].instructions.join(" ");
      } else if (typeof meals[mealIndex].instructions === "object") {
        instructionsText = JSON.stringify(meals[mealIndex].instructions);
      }
    }

    let truncatedInstructions = "Delicious recipe to try!";
    if (instructionsText) {
      if (instructionsText.length > 100) {
        truncatedInstructions = instructionsText.substring(0, 100) + "...";
      } else {
        truncatedInstructions = instructionsText;
      }
    }

    recipesGrid.innerHTML += `
      <div class="recipe-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group" data-meal-id="${meals[mealIndex].id}">
        <div class="relative h-48 overflow-hidden">
          <img class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src="${meals[mealIndex].thumbnail}" alt="${meals[mealIndex].name}" loading="lazy" />
          <div class="absolute bottom-3 left-3 flex gap-2">
            <span class="px-2 py-1 bg-white/90 backdrop-blur-sm text-xs font-semibold rounded-full text-gray-700">${meals[mealIndex].category || "Unknown"}</span>
            <span class="px-2 py-1 bg-emerald-500 text-xs font-semibold rounded-full text-white">${meals[mealIndex].area || "International"}</span>
          </div>
        </div>
        <div class="p-4">
          <h3 class="text-base font-bold text-gray-900 mb-1 group-hover:text-emerald-600 transition-colors line-clamp-1">${meals[mealIndex].name || "Unnamed Recipe"}</h3>
          <p class="text-xs text-gray-600 mb-3 line-clamp-2">${truncatedInstructions}</p>
          <div class="flex items-center justify-between text-xs">
            <span class="font-semibold text-gray-900"><i class="fa-solid fa-utensils text-emerald-600 mr-1"></i>${meals[mealIndex].category || "Unknown"}</span>
            <span class="font-semibold text-gray-500"><i class="fa-solid fa-globe text-blue-500 mr-1"></i>${meals[mealIndex].area || "International"}</span>
          </div>
        </div>
      </div>`;
  }
  displayMealDetailsSection();
  
  const recipesCount = document.querySelector("#recipes-count");
  if (recipesCount) {
    recipesCount.textContent = "Showing " + meals.length + " recipes";
  }
}

// Function to handle search input
async function searchMeals() {
  SEARCH_INPUT.addEventListener("input", async function () {
    const searchValue = SEARCH_INPUT.value.toLowerCase().trim();
    
    if (searchValue === "") {
      searchMealsDataFetch();
      return;
    }

    const response = await fetch("https://nutriplan-api.vercel.app/api/meals/search?q=" + searchValue + "&page=1&limit=50");
    const data = await response.json();
    
    if (data && data.results && Array.isArray(data.results) && data.results.length > 0) {
      displayMealsByArea(data.results);
      return;
    }
  });
}

searchMeals();

// Function to get meal by ID
let mealsIdData = {};
async function getMealById(id) {
  const response = await fetch("https://nutriplan-api.vercel.app/api/meals/" + id);
  const data = await response.json();
  
  mealsIdData = data.result;
  displayMealDetails(mealsIdData);
}

// MEAL CATEGORIES FUNCTIONS
let mealCategoryData = [];
let MEAL_CATEGORY_API = "https://nutriplan-api.vercel.app/api/meals/categories";

// Function to fetch meal categories
async function mealsCategoryDataFetch() {
  const response = await fetch(MEAL_CATEGORY_API);
  const data = await response.json();
  
  if (data && data.results && Array.isArray(data.results)) {
    mealCategoryData = data.results;
    const limitedCategories = mealCategoryData.slice(0, 12);
    displayAllMealCategories(limitedCategories);
    addMealCategoryEvents();
  } else {
    mealCategoryData = [];
  }
}
mealsCategoryDataFetch();

// Function to get meals by category
async function getMealsByCategory(categoryName) {
  const response = await fetch("https://nutriplan-api.vercel.app/api/meals/filter?category=" + categoryName + "&page=1&limit=25");
  const data = await response.json();
  
  if (data && data.results && Array.isArray(data.results)) {
    displayMealsByArea(data.results);
  } else {
    displayMealsByArea([]);
  }
}

// Function to add category click events
function addMealCategoryEvents() {
  const CATEGORY_CARDS = document.querySelectorAll(".category-card");

  for (let i = 0; i < CATEGORY_CARDS.length; i++) {
    CATEGORY_CARDS[i].addEventListener("click", function () {
      let SELECTED_CATEGORY = this.getAttribute("data-category");
      getMealsByCategory(SELECTED_CATEGORY);
    });
  }
}

// Category styles
let CATEGORY_STYLES = {
  Beef: {
    cardFrom: "#fef2f2",
    cardTo: "#fff1f2",
    border: "#fff1f2",
    iconFrom: "#ff6467",
    iconTo: "#ff2056",
    icon: "fa-drumstick-bite",
  },
  Chicken: {
    cardFrom: "#fffbeb",
    cardTo: "#fff7ed",
    border: "#fee685",
    iconFrom: "#ffb900",
    iconTo: "#ff6900",
    icon: "fa-drumstick-bite",
  },
  Dessert: {
    cardFrom: "#fdf2f8",
    cardTo: "#fff1f2",
    border: "#fccee8",
    iconFrom: "#fb64b6",
    iconTo: "#ff2056",
    icon: "fa-cake-candles",
  },
  Lamb: {
    cardFrom: "#fff7ed",
    cardTo: "#fffbeb",
    border: "#ffd7a8",
    iconFrom: "#ff8904",
    iconTo: "#fe9a00",
    icon: "fa-drumstick-bite",
  },
  Miscellaneous: {
    cardFrom: "#fcf9fa",
    cardTo: "#fbf9fa",
    border: "#e2e8f0",
    iconFrom: "#90a1b9",
    iconTo: "#6a7282",
    icon: "fa-bowl-rice",
  },
  Pasta: {
    cardFrom: "#fefce8",
    cardTo: "#fffbeb",
    border: "#fff085",
    iconFrom: "#fdc700",
    iconTo: "#fe9a00",
    icon: "fa-bowl-food",
  },
  Pork: {
    cardFrom: "#fff1f2",
    cardTo: "#fef2f2",
    border: "#ffccd3",
    iconFrom: "#ff637e",
    iconTo: "#fb2c36",
    icon: "fa-bacon",
  },
  Seafood: {
    cardFrom: "#ecfeff",
    cardTo: "#eff6ff",
    border: "#a2f4fd",
    iconFrom: "#00d3f3",
    iconTo: "#2b7fff",
    icon: "fa-fish",
  },
  Side: {
    cardFrom: "#f0fdf4",
    cardTo: "#ecfdf5",
    border: "#b9f8cf",
    iconFrom: "#05df72",
    iconTo: "#00bc7d",
    icon: "fa-plate-wheat",
  },
  Starter: {
    cardFrom: "#f0fdfa",
    cardTo: "#ecfeff",
    border: "#96f7e4",
    iconFrom: "#00d5be",
    iconTo: "#00b8db",
    icon: "fa-utensils",
  },
  Vegan: {
    cardFrom: "#ecfdf5",
    cardTo: "#f0fdf4",
    border: "#a4f4cf",
    iconFrom: "#00d492",
    iconTo: "#00c951",
    icon: "fa-leaf",
  },
  Vegetarian: {
    cardFrom: "#f7fee7",
    cardTo: "#f0fdf4",
    border: "#d8fa99",
    iconFrom: "#9ae600",
    iconTo: "#00c951",
    icon: "fa-seedling",
  },
};

// Function to display all meal categories
function displayAllMealCategories(mealCategory) {
  const categoriesGrid = document.querySelector("#categories-grid");
  categoriesGrid.innerHTML = "";

  for (let i = 0; i < mealCategory.length; i++) {
    let categoryName = mealCategory[i].name;
    let style = CATEGORY_STYLES[categoryName] || {
      cardFrom: "#fffbeb",
      cardTo: "#fff7ed",
      border: "#fee685",
      iconFrom: "#ffb900",
      iconTo: "#ff6900",
      icon: "fa-drumstick-bite",
    };

    categoriesGrid.innerHTML += `
      <div class="category-card rounded-xl p-3 border hover:shadow-md cursor-pointer transition-all group" data-category="${categoryName}" style="background: linear-gradient(to bottom right, ${style.cardFrom}, ${style.cardTo}); border-color: ${style.border};">
        <div class="flex items-center gap-2.5">
          <div class="text-white w-9 h-9 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm" style="background: linear-gradient(to bottom right, ${style.iconFrom}, ${style.iconTo});">
            <i class="fa-solid ${style.icon}"></i>
          </div>
          <div><h3 class="text-sm font-bold text-gray-900">${categoryName}</h3></div>
        </div>
      </div>`;
  }
}

// MEAL AREAS FUNCTIONS
let mealAreasData = [];
let MEAL_AREAS_API = "https://nutriplan-api.vercel.app/api/meals/areas";

// Function to fetch meal areas
async function mealAreasDataFetch() {
  const response = await fetch(MEAL_AREAS_API);
  const data = await response.json();
  
  if (data && data.results && Array.isArray(data.results)) {
    mealAreasData = data.results;
    const limitedAreas = mealAreasData.slice(0, 11);
    displayAllMealAreas(limitedAreas);
    addMealAreaEvents();
  } else {
    mealAreasData = [];
  }
}

mealAreasDataFetch();

// Function to display all meal areas
function displayAllMealAreas(mealArea) {
  const mealAreasContainer = document.querySelector("#mealAreas");
  mealAreasContainer.innerHTML = "";

  mealAreasContainer.innerHTML += `
    <button class="meal-area-btn px-4 py-2 rounded-full font-medium text-sm whitespace-nowrap transition-all bg-emerald-600 text-white hover:bg-emerald-700 active-button" data-area="all">All Cuisines</button>`;

  for (let i = 0; i < mealArea.length; i++) {
    mealAreasContainer.innerHTML += `
      <button class="meal-area-btn px-4 py-2 rounded-full font-medium text-sm whitespace-nowrap transition-all bg-gray-100 text-gray-700 hover:bg-gray-200 inactive-button" data-area="${mealArea[i].name}">${mealArea[i].name}</button>`;
  }
}

// Function to get meals by area
async function getMealsByArea(areaName) {
  const response = await fetch("https://nutriplan-api.vercel.app/api/meals/filter?area=" + areaName + "&page=1&limit=25");
  const data = await response.json();
  
  if (data && data.results && Array.isArray(data.results)) {
    displayMealsByArea(data.results);
  } else {
    displayMealsByArea([]);
  }
}

// Function to add area click events
function addMealAreaEvents() {
  const MEAL_AREA_BUTTONS = document.querySelectorAll(".meal-area-btn");

  for (let i = 0; i < MEAL_AREA_BUTTONS.length; i++) {
    MEAL_AREA_BUTTONS[i].addEventListener("click", function (e) {
      let SELECTED_AREA = e.currentTarget.getAttribute("data-area");
      if (SELECTED_AREA === "all") {
        searchMealsDataFetch();
      } else {
        getMealsByArea(SELECTED_AREA);
      }

      for (let j = 0; j < MEAL_AREA_BUTTONS.length; j++) {
        MEAL_AREA_BUTTONS[j].classList.remove("bg-emerald-600", "text-white");
        MEAL_AREA_BUTTONS[j].classList.add("bg-gray-100", "text-gray-700");
      }

      this.classList.remove("bg-gray-100", "text-gray-700");
      this.classList.add("bg-emerald-600", "text-white");
    });
  }
}

// GRID/LIST VIEW FUNCTIONS
const GRID_VIEW_BTN = document.querySelector("#grid-view-btn");
const LIST_VIEW_BTN = document.querySelector("#list-view-btn");

let listStyles = document.createElement('style');
listStyles.textContent = 
  '.list-view { display: grid !important; grid-template-columns: 1fr 1fr !important; gap: 20px !important; } ' +
  '.list-view .recipe-card { display: flex !important; flex-direction: row !important; height: auto !important; min-height: 140px !important; } ' +
  '.list-view .recipe-card .relative { width: 130px !important; min-width: 130px !important; height: 100% !important; min-height: 140px !important; flex-shrink: 0 !important; } ' +
  '.list-view .recipe-card .relative img { width: 130px !important; min-width: 130px !important; height: 100% !important; object-fit: cover !important; } ' +
  '.list-view .recipe-card .relative .absolute { display: none !important; } ' +
  '.list-view .recipe-card .p-4 { flex: 1 !important; display: flex !important; flex-direction: column !important; justify-content: space-between !important; padding: 12px 14px !important; }';
document.head.appendChild(listStyles);

GRID_VIEW_BTN.addEventListener("click", function () {
  GRID_VIEW_BTN.classList.add("bg-white", "shadow-sm");
  LIST_VIEW_BTN.classList.remove("bg-white", "shadow-sm");
  
  GRID_VIEW_BTN.querySelector('i').classList.remove('text-gray-500');
  GRID_VIEW_BTN.querySelector('i').classList.add('text-gray-700');
  LIST_VIEW_BTN.querySelector('i').classList.remove('text-gray-700');
  LIST_VIEW_BTN.querySelector('i').classList.add('text-gray-500');
  
  const recipesGrid = document.querySelector("#recipes-grid");
  recipesGrid.classList.remove('list-view');
  recipesGrid.classList.add('grid', 'grid-cols-4', 'gap-5');
  recipesGrid.style.display = '';
  
  const RECIPE_CARDS = document.querySelectorAll(".recipe-card");
  for (let i = 0; i < RECIPE_CARDS.length; i++) {
    RECIPE_CARDS[i].classList.remove("flex", "flex-row", "h-40");
    RECIPE_CARDS[i].style.height = '';
    RECIPE_CARDS[i].style.minHeight = '';
    RECIPE_CARDS[i].style.flexDirection = '';
  }
  
  const imageContainers = document.querySelectorAll(".recipe-card .relative");
  for (let i = 0; i < imageContainers.length; i++) {
    imageContainers[i].style.width = '';
    imageContainers[i].style.minWidth = '';
    imageContainers[i].style.height = '';
    imageContainers[i].style.minHeight = '';
    imageContainers[i].style.flexShrink = '';
  }
  
  const badges = document.querySelectorAll(".recipe-card .relative .absolute");
  for (let i = 0; i < badges.length; i++) {
    badges[i].style.display = '';
  }
  
  const images = document.querySelectorAll(".recipe-card .relative img");
  for (let i = 0; i < images.length; i++) {
    images[i].style.width = '';
    images[i].style.minWidth = '';
    images[i].style.height = '';
    images[i].style.objectFit = '';
  }
});

LIST_VIEW_BTN.addEventListener("click", function () {
  LIST_VIEW_BTN.classList.add("bg-white", "shadow-sm");
  GRID_VIEW_BTN.classList.remove("bg-white", "shadow-sm");
  
  LIST_VIEW_BTN.querySelector('i').classList.remove('text-gray-500');
  LIST_VIEW_BTN.querySelector('i').classList.add('text-gray-700');
  GRID_VIEW_BTN.querySelector('i').classList.remove('text-gray-700');
  GRID_VIEW_BTN.querySelector('i').classList.add('text-gray-500');
  
  const recipesGrid = document.querySelector("#recipes-grid");
  recipesGrid.classList.remove('grid', 'grid-cols-4', 'gap-5');
  recipesGrid.classList.add('list-view');
  recipesGrid.style.display = '';
  
  const RECIPE_CARDS = document.querySelectorAll(".recipe-card");
  for (let i = 0; i < RECIPE_CARDS.length; i++) {
    RECIPE_CARDS[i].classList.add("flex", "flex-row");
    RECIPE_CARDS[i].classList.remove("h-40");
    RECIPE_CARDS[i].style.height = 'auto';
    RECIPE_CARDS[i].style.minHeight = '140px';
    RECIPE_CARDS[i].style.flexDirection = 'row';
  }
  
  const imageContainers = document.querySelectorAll(".recipe-card .relative");
  for (let i = 0; i < imageContainers.length; i++) {
    imageContainers[i].style.width = '130px';
    imageContainers[i].style.minWidth = '130px';
    imageContainers[i].style.height = '100%';
    imageContainers[i].style.minHeight = '140px';
    imageContainers[i].style.flexShrink = '0';
  }
  
  const badges = document.querySelectorAll(".recipe-card .relative .absolute");
  for (let i = 0; i < badges.length; i++) {
    badges[i].style.display = 'none';
  }
  
  const images = document.querySelectorAll(".recipe-card .relative img");
  for (let i = 0; i < images.length; i++) {
    images[i].style.width = '130px';
    images[i].style.minWidth = '130px';
    images[i].style.height = '100%';
    images[i].style.objectFit = 'cover';
  }
});

// Function to ensure log meal modal exists
function ensureLogMealModal() {
  if (document.getElementById("log-meal-modal")) {
    return;
  }

  let modalHTML = `<div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 hidden" id="log-meal-modal">
    <div class="bg-white rounded-2xl p-6 max-w-md w-full mx-4">
        <div class="flex items-center gap-4 mb-6">
            <img id="log-meal-modal-img" src="" alt="" class="w-16 h-16 rounded-xl object-cover">
            <div>
                <h3 class="text-xl font-bold text-gray-900">Log This Meal</h3>
                <p class="text-gray-500 text-sm" id="log-meal-modal-name"></p>
            </div>
        </div>
        <div class="mb-6">
            <label class="block text-sm font-semibold text-gray-700 mb-2">Number of Servings</label>
            <div class="flex items-center gap-3">
                <button type="button" id="decrease-servings"
                    class="w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center">
                    <i class="fa-solid fa-minus text-gray-600"></i>
                </button>
                <input type="number" id="meal-servings" value="1" min="0.5" max="10" step="0.5"
                    class="w-20 text-center text-xl font-bold border-2 border-gray-200 rounded-lg py-2">
                <button type="button" id="increase-servings"
                    class="w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center">
                    <i class="fa-solid fa-plus text-gray-600"></i>
                </button>
            </div>
        </div>
        <div class="bg-emerald-50 rounded-xl p-4 mb-6">
            <p class="text-sm text-gray-600 mb-2">Estimated nutrition per serving:</p>
            <div class="grid grid-cols-4 gap-2 text-center">
                <div>
                    <p class="text-lg font-bold text-emerald-600" id="modal-calories">--</p>
                    <p class="text-xs text-gray-500">Calories</p>
                </div>
                <div>
                    <p class="text-lg font-bold text-blue-600" id="modal-protein">--</p>
                    <p class="text-xs text-gray-500">Protein</p>
                </div>
                <div>
                    <p class="text-lg font-bold text-amber-600" id="modal-carbs">--</p>
                    <p class="text-xs text-gray-500">Carbs</p>
                </div>
                <div>
                    <p class="text-lg font-bold text-purple-600" id="modal-fat">--</p>
                    <p class="text-xs text-gray-500">Fat</p>
                </div>
            </div>
        </div>
        <div class="flex gap-3">
            <button type="button" id="cancel-log-meal"
                class="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all">Cancel</button>
            <button type="button" id="confirm-log-meal"
                class="flex-1 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all"><i
                    class="fa-solid fa-clipboard-list mr-2"></i>Log Meal</button>
        </div>
    </div>
</div>`;

  let tempElement = document.createElement("div");
  tempElement.innerHTML = modalHTML;
  document.body.appendChild(tempElement.firstChild);

  document.getElementById("cancel-log-meal").addEventListener("click", function () {
    cancelLogMealModal();
  });

  document.getElementById("decrease-servings").addEventListener("click", function () {
    const inputElement = document.getElementById("meal-servings");
    let value = parseFloat(inputElement.value) || 1;
    value = value - 0.5;
    if (value < 0.5) {
      value = 0.5;
    }
    inputElement.value = value;
    updateModalNutrition(value);
  });

  document.getElementById("increase-servings").addEventListener("click", function () {
    const inputElement = document.getElementById("meal-servings");
    let value = parseFloat(inputElement.value) || 1;
    value = value + 0.5;
    if (value > 10) {
      value = 10;
    }
    inputElement.value = value;
    updateModalNutrition(value);
  });

  document.getElementById("meal-servings").addEventListener("input", function () {
    let value = parseFloat(this.value) || 1;
    if (value < 0.5) {
      value = 0.5;
    }
    if (value > 10) {
      value = 10;
    }
    updateModalNutrition(value);
  });

  document.getElementById("confirm-log-meal").addEventListener("click", function () {
    let servingsInput = document.getElementById("meal-servings");
    let servings = parseFloat(servingsInput.value) || 1;
    let mealName = "Meal";
    let thumbnail = "";
    if (currentMealForLog && currentMealForLog.name) {
      mealName = currentMealForLog.name;
    }
    if (currentMealForLog && currentMealForLog.thumbnail) {
      thumbnail = currentMealForLog.thumbnail;
    }
    let totalCalories = Math.round(currentMealNutrition.calories * servings);
    let totalProtein = Math.round(currentMealNutrition.protein * servings * 10) / 10;
    let totalCarbs = Math.round(currentMealNutrition.carbs * servings * 10) / 10;
    let totalFat = Math.round(currentMealNutrition.fat * servings * 10) / 10;

    addFoodLogItem({
      id: "meal-" + Date.now(),
      name: mealName,
      brand: "",
      type: "meal",
      servings: servings,
      thumbnail: thumbnail,
      loggedAt: new Date().toISOString(),
      nutrition: {
        calories: totalCalories,
        protein: totalProtein,
        carbs: totalCarbs,
        fat: totalFat
      }
    });

    cancelLogMealModal();
    showMealLoggedAlert(mealName, servings, totalCalories);
  });
}

// Function to update modal nutrition display
function updateModalNutrition(servings) {
  let servingCount = parseFloat(servings) || 1;
  document.getElementById("modal-calories").textContent = Math.round(currentMealNutrition.calories * servingCount);
  document.getElementById("modal-protein").textContent = Math.round(currentMealNutrition.protein * servingCount) + "g";
  document.getElementById("modal-carbs").textContent = Math.round(currentMealNutrition.carbs * servingCount) + "g";
  document.getElementById("modal-fat").textContent = Math.round(currentMealNutrition.fat * servingCount) + "g";
}

// Function to open log meal modal
function openLogMealModal() {
  ensureLogMealModal();

  let meal = currentMealForLog;
  if (meal === null || meal === undefined) {
    return;
  }

  const imageElement = document.getElementById("log-meal-modal-img");
  const nameElement = document.getElementById("log-meal-modal-name");
  const servingsInput = document.getElementById("meal-servings");

  imageElement.src = meal.thumbnail || "";
  imageElement.alt = meal.name || "Meal";
  nameElement.textContent = meal.name || "Selected Meal";
  servingsInput.value = 1;

  updateModalNutrition(1);

  let modalElement = document.getElementById("log-meal-modal");
  modalElement.classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

// Function for cancel button in modal
function cancelLogMealModal() {
  const modalElement = document.getElementById("log-meal-modal");
  if (modalElement) {
    modalElement.classList.add("hidden");
  }
  document.body.style.overflow = "";
}

// Function to load SweetAlert2
function loadSweetAlert2(callback) {
  if (typeof Swal !== "undefined") {
    callback();
    return;
  }
  let scriptElement = document.createElement("script");
  scriptElement.src = "https://cdn.jsdelivr.net/npm/sweetalert2@11";
  scriptElement.addEventListener("load", function () {
    callback();
  });
  document.head.appendChild(scriptElement);
}

function showNotification(message, type) {
  if (type === null || type === undefined || type === "") {
    type = "info";
  }
  let colors = {
    success: "bg-emerald-500",
    error: "bg-red-500",
    info: "bg-blue-500",
    warning: "bg-amber-500"
  };
  let bgClass = colors[type] || colors.info;
  let notificationElement = document.createElement("div");
  notificationElement.className =
    "fixed bottom-4 right-4 " +
    bgClass +
    " text-white px-6 py-3 rounded-lg shadow-lg z-50 toast-notification";
  notificationElement.textContent = message;
  document.body.appendChild(notificationElement);
  setTimeout(function () {
    if (notificationElement.parentNode) {
      notificationElement.parentNode.removeChild(notificationElement);
    }
  }, 3000);
}

// Function to show meal logged alert
function showMealLoggedAlert(mealName, servings, totalCalories) {
  let servingText = "1 serving";
  if (servings !== 1) {
    servingText = servings + " servings";
  }

  loadSweetAlert2(function () {
    Swal.fire({
      icon: "success",
      title: "Meal Logged!",
      text: mealName + " (" + servingText + ") has been added to your daily log. +" + totalCalories + " calories",
      showConfirmButton: false,
      timer: 2500,
      width: "540px",
    });
  });
}

// Function to setup log meal button click
function setupLogMealButton() {
  const buttonElement = document.getElementById("log-meal-btn");
  if (buttonElement === null || buttonElement === undefined) {
    return;
  }
  buttonElement.addEventListener("click", function () {
    if (buttonElement.disabled) {
      return;
    }
    openLogMealModal();
  });
}

ensureLogMealModal();

// PRODUCT SCANNER FUNCTIONS
let allProductsData = [];
let currentNutritionGradeFilter = "all";
let currentSearchQuery = "";
let currentProductCategory = null;
let lastProductsTotal = 0;
let currentProductForLog = null;

let OFF_BASE = "https://world.openfoodfacts.org";
let OFF_PRODUCT_API = OFF_BASE + "/api/v0/product/";

// Function to map Open Food Facts product data
function mapOpenFoodFactsProduct(sourceProduct) {
  if (sourceProduct === null || sourceProduct === undefined) {
    return null;
  }
  let nutriments = sourceProduct.nutriments || sourceProduct.nutrients || {};
  let image = sourceProduct.image_front_url ||
    sourceProduct.image_url ||
    sourceProduct.image_front_small_url ||
    sourceProduct.image_small_url ||
    sourceProduct.image ||
    "";

  let ingredients = sourceProduct.ingredients_text_en ||
    sourceProduct.ingredients_text ||
    sourceProduct.ingredients ||
    sourceProduct.ingredientsText ||
    "";
  if (!ingredients && Array.isArray(sourceProduct.ingredients)) {
    let ingredientTexts = [];
    for (let i = 0; i < sourceProduct.ingredients.length; i++) {
      let ingredientItem = (sourceProduct.ingredients[i] && (sourceProduct.ingredients[i].text || sourceProduct.ingredients[i].id)) || "";
      if (ingredientItem) {
        ingredientTexts.push(ingredientItem);
      }
    }
    ingredients = ingredientTexts.join(", ");
  }

  let allergens = sourceProduct.allergens || "";
  if (!allergens && Array.isArray(sourceProduct.allergens_tags)) {
    let allergenTexts = [];
    for (let i = 0; i < sourceProduct.allergens_tags.length; i++) {
      allergenTexts.push(String(sourceProduct.allergens_tags[i]));
    }
    allergens = allergenTexts.join(", ");
  }

  let resultObject = {
    barcode: sourceProduct.code || sourceProduct._id || sourceProduct.barcode || "",
    name: sourceProduct.product_name || sourceProduct.product_name_en || sourceProduct.name || "Unknown Product",
    brand: sourceProduct.brands || sourceProduct.brand || "Unknown Brand",
    image: image,
    nutritionGrade: sourceProduct.nutrition_grades || sourceProduct.nutrition_grade_fr || sourceProduct.nutritionGrade || null,
    novaGroup: sourceProduct.nova_group || sourceProduct.novaGroup || null,
    quantity: sourceProduct.quantity || "",
    ingredients: ingredients,
    allergens: allergens,
    nutrition: {
      calories: nutriments["energy-kcal_100g"] || nutriments.energy_100g || nutriments.calories || 0,
      fat: nutriments.fat_100g || nutriments.fat || 0,
      carbs: nutriments.carbohydrates_100g || nutriments.carbs || 0,
      sugar: nutriments.sugars_100g || nutriments.sugar || 0,
      fiber: nutriments.fiber_100g || nutriments.fiber || 0,
      protein: nutriments.proteins_100g || nutriments.protein || 0,
      sodium: nutriments.sodium_100g || nutriments.sodium || 0,
      saturatedFat: nutriments["saturated-fat_100g"] || nutriments.saturatedFat || 0,
      salt: nutriments.salt_100g || nutriments.salt ||
        (nutriments.sodium_100g ? nutriments.sodium_100g * 2.5 : 0)
    }
  };
  return resultObject;
}

// Function to fetch product from Open Food Facts
async function fetchProductFromOpenFoodFacts(product) {
  if (!product || !product.barcode) {
    return product;
  }
  if (product.ingredients && product.allergens) {
    return product;
  }

  const url = OFF_PRODUCT_API + product.barcode + ".json";
  const response = await fetch(url);
  const data = await response.json();

  if (!data || data.status !== 1 || !data.product) {
    return product;
  }

  const offProduct = data.product;
  const nutriments = offProduct.nutriments || {};

  let ingredientsText = offProduct.ingredients_text_en ||
    offProduct.ingredients_text ||
    offProduct.ingredients_text_fr ||
    offProduct.ingredients_text_de ||
    "";
  
  if (!ingredientsText && Array.isArray(offProduct.ingredients)) {
    const ingredientTexts = [];
    for (let i = 0; i < offProduct.ingredients.length; i++) {
      const ingredientItem = offProduct.ingredients[i].text || offProduct.ingredients[i].id || "";
      if (ingredientItem) {
        ingredientTexts.push(ingredientItem);
      }
    }
    ingredientsText = ingredientTexts.join(", ");
  }

  let allergensText = offProduct.allergens || "";
  if (!allergensText && Array.isArray(offProduct.allergens_tags)) {
    const allergenTexts = [];
    for (let i = 0; i < offProduct.allergens_tags.length; i++) {
      allergenTexts.push(String(offProduct.allergens_tags[i]));
    }
    allergensText = allergenTexts.join(", ");
  }

  if (!product.ingredients && ingredientsText) {
    product.ingredients = ingredientsText;
  }
  if (!product.allergens && allergensText) {
    product.allergens = allergensText;
  }
  if (!product.quantity && offProduct.quantity) {
    product.quantity = offProduct.quantity;
  }
  if (!product.image && (offProduct.image_front_url || offProduct.image_url)) {
    product.image = offProduct.image_front_url || offProduct.image_url;
  }
  if ((!product.nutritionGrade || product.nutritionGrade === "unknown") &&
      (offProduct.nutrition_grades || offProduct.nutrition_grade_fr)) {
    product.nutritionGrade = offProduct.nutrition_grades || offProduct.nutrition_grade_fr;
  }
  if (!product.novaGroup && offProduct.nova_group) {
    product.novaGroup = offProduct.nova_group;
  }

  const nutritionData = product.nutrition || {};
  const hasZeroMacros = !nutritionData.calories && !nutritionData.protein && !nutritionData.carbs && !nutritionData.fat;
  
  if (hasZeroMacros && nutriments) {
    product.nutrition = {
      calories: nutriments["energy-kcal_100g"] || nutriments.energy_100g || 0,
      fat: nutriments.fat_100g || 0,
      carbs: nutriments.carbohydrates_100g || 0,
      sugar: nutriments.sugars_100g || 0,
      fiber: nutriments.fiber_100g || 0,
      protein: nutriments.proteins_100g || 0,
      sodium: nutriments.sodium_100g || 0,
      saturatedFat: nutriments["saturated-fat_100g"] || 0,
      salt: nutriments.salt_100g || (nutriments.sodium_100g ? nutriments.sodium_100g * 2.5 : 0)
    };
  }

  return product;
}

function getProductsGrid() {
  return document.getElementById("products-grid") || document.querySelector("#products-section #products-grid");
}

function getProductsCountEl() {
  return document.getElementById("products-count") || document.querySelector("#products-section #products-count");
}

function getProductsEmptyEl() {
  return document.getElementById("products-empty") || document.querySelector("#products-section #products-empty");
}

function getProductsLoadingEl() {
  return document.getElementById("products-loading") || document.querySelector("#products-section #products-loading");
}

function getProductSearchInput() {
  return document.getElementById("product-search-input") ||
    document.querySelector("#products-section input[placeholder*='product name']") ||
    document.querySelector("#products-section input[placeholder*='Search by product']");
}

function getBarcodeInput() {
  return document.getElementById("barcode-input") ||
    document.getElementById("product-barcode-input") ||
    document.querySelector("#products-section input[placeholder*='barcode']");
}

function showProductsLoading(show) {
  let loadingElement = getProductsLoadingEl();
  if (loadingElement) {
    if (show) {
      loadingElement.classList.remove("hidden");
    } else {
      loadingElement.classList.add("hidden");
    }
  }
}

function updateProductsCount(text) {
  let countElement = getProductsCountEl();
  if (countElement) {
    countElement.textContent = text;
  }
}

function getGradeMeta(grade) {
  let gradeLower = String(grade || "").toLowerCase();
  let gradeMap = {
    a: { color: "#038141", label: "Excellent", bg: "#03814120" },
    b: { color: "#85bb2f", label: "Good", bg: "#85bb2f20" },
    c: { color: "#fecb02", label: "Average", bg: "#fecb0220" },
    d: { color: "#ee8100", label: "Poor", bg: "#ee810020" },
    e: { color: "#e63e11", label: "Bad", bg: "#e63e1120" }
  };
  if (gradeMap[gradeLower]) {
    return gradeMap[gradeLower];
  }
  return { color: "#9ca3af", label: "Unknown", bg: "#9ca3af20" };
}

function getNovaMeta(nova) {
  let novaNumber = Number(nova) || 0;
  let novaMap = {
    1: { color: "#038141", label: "Unprocessed" },
    2: { color: "#85bb2f", label: "Processed culinary" },
    3: { color: "#ee8100", label: "Processed" },
    4: { color: "#e63e11", label: "Ultra-processed" }
  };
  if (novaMap[novaNumber]) {
    return novaMap[novaNumber];
  }
  return { color: "#9ca3af", label: "Unknown" };
}

// Function to create product card HTML
function createProductCard(product) {
  let gradeColors = {
    a: "bg-green-500",
    b: "bg-lime-500",
    c: "bg-yellow-500",
    d: "bg-orange-500",
    e: "bg-red-500"
  };
  let novaColors = {
    1: "bg-green-500",
    2: "bg-lime-500",
    3: "bg-orange-500",
    4: "bg-red-500"
  };

  let grade = "";
  if (product.nutritionGrade) {
    grade = String(product.nutritionGrade).toLowerCase();
  }
  let gradeClass = gradeColors[grade] || "bg-gray-400";
  let novaClass = novaColors[product.novaGroup] || "bg-gray-400";

  let safeName = (product.name || "");

  let imageHTML = "";
  if (product.image) {
    imageHTML = `<img class="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300" src="${product.image}" alt="${safeName}" loading="lazy">
      <div class="w-16 h-16 bg-gray-200 rounded-xl items-center justify-center" style="display:none"><i class="fa-solid fa-box text-gray-400 text-2xl"></i></div>`;
  } else {
    imageHTML = `<div class="w-16 h-16 bg-gray-200 rounded-xl flex items-center justify-center"><i class="fa-solid fa-box text-gray-400 text-2xl"></i></div>`;
  }

  let gradeBadge = "";
  if (grade && grade !== "unknown") {
    gradeBadge = `
      <div class="absolute top-2 left-2 ${gradeClass} text-white text-xs font-bold px-2 py-1 rounded uppercase">NUTRI-SCORE ${grade.toUpperCase()}</div>`;
  }

  let novaBadge = "";
  if (product.novaGroup) {
    novaBadge = `
      <div class="absolute top-2 right-2 ${novaClass} text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center" title="NOVA ${product.novaGroup}">${product.novaGroup}</div>`;
  }

  let quantityHTML = "";
  if (product.quantity) {
    quantityHTML = `<span><i class="fa-solid fa-weight-scale mr-1"></i>${product.quantity}</span>`;
  }

  let caloriesHTML = "";
  if (product.nutrition && product.nutrition.calories) {
    caloriesHTML = `<span><i class="fa-solid fa-fire mr-1"></i>${Math.round(product.nutrition.calories)} kcal/100g</span>`;
  }

  let proteinValue = "0.0";
  let carbsValue = "0.0";
  let fatValue = "0.0";
  let sugarValue = "0.0";
  if (product.nutrition) {
    if (product.nutrition.protein) {
      proteinValue = Number(product.nutrition.protein).toFixed(1);
    }
    if (product.nutrition.carbs) {
      carbsValue = Number(product.nutrition.carbs).toFixed(1);
    }
    if (product.nutrition.fat) {
      fatValue = Number(product.nutrition.fat).toFixed(1);
    }
    if (product.nutrition.sugar) {
      sugarValue = Number(product.nutrition.sugar).toFixed(1);
    }
  }

  return `<div class="product-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group" data-barcode="${product.barcode || ""}">
      <div class="relative h-40 bg-gray-100 flex items-center justify-center overflow-hidden">
        ${imageHTML}
        ${gradeBadge}
        ${novaBadge}
      </div>
      <div class="p-4">
        <p class="text-xs text-emerald-600 font-semibold mb-1 truncate">${product.brand || "Unknown Brand"}</p>
        <h3 class="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors">${product.name || "Unknown Product"}</h3>
        <div class="flex items-center gap-3 text-xs text-gray-500 mb-3">${quantityHTML}${caloriesHTML}</div>
        <div class="grid grid-cols-4 gap-1 text-center">
          <div class="bg-emerald-50 rounded p-1.5"><p class="text-xs font-bold text-emerald-700">${proteinValue}g</p><p class="text-[10px] text-gray-500">Protein</p></div>
          <div class="bg-blue-50 rounded p-1.5"><p class="text-xs font-bold text-blue-700">${carbsValue}g</p><p class="text-[10px] text-gray-500">Carbs</p></div>
          <div class="bg-purple-50 rounded p-1.5"><p class="text-xs font-bold text-purple-700">${fatValue}g</p><p class="text-[10px] text-gray-500">Fat</p></div>
          <div class="bg-orange-50 rounded p-1.5"><p class="text-xs font-bold text-orange-700">${sugarValue}g</p><p class="text-[10px] text-gray-500">Sugar</p></div>
        </div>
      </div>
    </div>`;
}

// Function to filter products by grade
function filterProductsByGrade(products) {
  if (products === null || products === undefined || Array.isArray(products) === false) {
    return [];
  }
  if (currentNutritionGradeFilter === "all") {
    return products;
  }
  let filteredProducts = [];
  let gradeFilter = currentNutritionGradeFilter.toLowerCase();
  for (let i = 0; i < products.length; i++) {
    let productGrade = "";
    if (products[i].nutritionGrade) {
      productGrade = String(products[i].nutritionGrade).toLowerCase();
    }
    if (productGrade === gradeFilter) {
      filteredProducts.push(products[i]);
    }
  }
  return filteredProducts;
}

// Function to setup product card click events
function setupProductCardClicks() {
  const cardElements = document.querySelectorAll(".product-card");
  for (let i = 0; i < cardElements.length; i++) {
    cardElements[i].addEventListener("click", function () {
      let barcode = this.getAttribute("data-barcode");
      if (!barcode) {
        return;
      }
      let foundProduct = null;
      for (let j = 0; j < allProductsData.length; j++) {
        if (String(allProductsData[j].barcode) === String(barcode)) {
          foundProduct = allProductsData[j];
          break;
        }
      }
      if (foundProduct) {
        openProductDetailModal(foundProduct);
      } else {
        fetchProductByBarcodeAndOpen(barcode);
      }
    });
  }
}

// Function to display products
function displayProducts(products, countMessage) {
  let gridElement = getProductsGrid();
  let emptyElement = getProductsEmptyEl();
  showProductsLoading(false);

  if (gridElement === null || gridElement === undefined) {
    return;
  }

  gridElement.innerHTML = "";

  if (products === null || products === undefined || products.length === 0) {
    if (emptyElement) {
      emptyElement.classList.remove("hidden");
    }
    if (countMessage) {
      updateProductsCount(countMessage);
    } else {
      updateProductsCount("No products found");
    }
    return;
  }

  if (emptyElement) {
    emptyElement.classList.add("hidden");
  }

  let htmlString = "";
  for (let i = 0; i < products.length; i++) {
    htmlString += createProductCard(products[i]);
  }
  gridElement.innerHTML = htmlString;
  setupProductCardClicks();

  if (countMessage) {
    updateProductsCount(countMessage);
  }
}

// Function to search products by name
async function searchProductsByName(query, gradeFilter) {
  if (query === null || query === undefined || query.trim() === "") {
    return;
  }

  currentSearchQuery = query.trim();
  currentProductCategory = null;
  showProductsLoading(true);

  let url = OFF_BASE + "/cgi/search.pl?search_terms=" + currentSearchQuery + "&page=1&page_size=24&json=1";

  const grade = gradeFilter || currentNutritionGradeFilter;
  if (grade && grade !== "all") {
    url += "&nutrition_grades_tags=" + String(grade).toLowerCase();
  }

  const response = await fetch(url);
  const data = await response.json();

  allProductsData = [];
  lastProductsTotal = 0;

  if (data && data.products && Array.isArray(data.products)) {
    for (let i = 0; i < data.products.length; i++) {
      const mappedProduct = mapOpenFoodFactsProduct(data.products[i]);
      if (mappedProduct) {
        allProductsData.push(mappedProduct);
      }
    }
    lastProductsTotal = data.count || allProductsData.length;
  }

  const filteredProducts = filterProductsByGrade(allProductsData);
  let countToShow = lastProductsTotal;
  if (currentNutritionGradeFilter !== "all") {
    countToShow = filteredProducts.length;
  }
  const messageText = "Found " + countToShow + ' products for "' + currentSearchQuery + '"';
  displayProducts(filteredProducts, messageText);
}

// Function to search product by barcode
async function searchProductByBarcode(barcode) {
  if (barcode === null || barcode === undefined || barcode.trim() === "") {
    return;
  }

  currentSearchQuery = "";
  currentProductCategory = null;
  showProductsLoading(true);

  const code = barcode.trim();
  const url = OFF_PRODUCT_API + code + ".json";

  const response = await fetch(url);
  const data = await response.json();

  allProductsData = [];
  lastProductsTotal = 0;

  let product = null;
  if (data && data.status === 1 && data.product) {
    product = mapOpenFoodFactsProduct(data.product);
  }

  if (product) {
    allProductsData = [product];
    lastProductsTotal = 1;
  }

  const filteredProducts = filterProductsByGrade(allProductsData);
  let messageText = "No product found with barcode: " + code;
  if (filteredProducts.length > 0) {
    messageText = "Found product: " + filteredProducts[0].name;
    displayProducts(filteredProducts, messageText);
    openProductDetailModal(filteredProducts[0]);
  } else {
    displayProducts(filteredProducts, messageText);
  }
}

// Function to fetch product by barcode
async function fetchProductByBarcodeAndOpen(barcode) {
  const url = OFF_PRODUCT_API + barcode + ".json";
  const response = await fetch(url);
  const data = await response.json();
  
  let product = null;
  if (data && data.status === 1 && data.product) {
    product = mapOpenFoodFactsProduct(data.product);
  }
  if (product) {
    openProductDetailModal(product);
  }
}

let CATEGORY_TAG_MAP = {
  breakfast_cereals: "breakfast-cereals",
  "breakfast-cereals": "breakfast-cereals",
  beverages: "beverages",
  snacks: "snacks",
  dairy: "dairies",
  dairy_products: "dairies",
  "dairy-products": "dairies",
  fruits: "fruits",
  vegetables: "vegetables",
  breads: "breads",
  bread: "breads",
  meats: "meats",
  meat: "meats",
  frozen_foods: "frozen-foods",
  "frozen-foods": "frozen-foods",
  sauces: "sauces"
};

function normalizeCategoryId(categoryId) {
  if (!categoryId) {
    return "";
  }
  let id = String(categoryId).trim().toLowerCase();
  if (id === "breakfast-cereals") {
    id = "breakfast_cereals";
  }
  if (id === "frozen-foods") {
    id = "frozen_foods";
  }
  if (id === "dairy-products" || id === "dairy_products") {
    id = "dairy";
  }
  return id;
}

// Function to load products by category
async function loadProductsByCategory(categoryId, categoryLabel) {
  if (categoryId === null || categoryId === undefined || categoryId === "") {
    return;
  }

  const normalizedId = normalizeCategoryId(categoryId);
  currentProductCategory = normalizedId;
  currentSearchQuery = "";
  showProductsLoading(true);

  const offTag = CATEGORY_TAG_MAP[normalizedId] ||
    CATEGORY_TAG_MAP[String(categoryId).toLowerCase()] ||
    String(categoryId).toLowerCase();

  const label = categoryLabel || normalizedId;
  const searchUrl = OFF_BASE + "/cgi/search.pl?action=process&tagtype_0=categories&tag_contains_0=contains&tag_0=" + offTag + "&page_size=24&page=1&json=1";
  const response = await fetch(searchUrl);
  
  if (!response.ok) {
    showProductsLoading(false);
    displayProducts([], "Error loading category: " + label);
    return;
  }
  
  const data = await response.json();
  
  allProductsData = [];
  lastProductsTotal = 0;

  if (data && data.products && Array.isArray(data.products) && data.products.length > 0) {
    for (let i = 0; i < data.products.length; i++) {
      const mappedProduct = mapOpenFoodFactsProduct(data.products[i]);
      if (mappedProduct) {
        allProductsData.push(mappedProduct);
      }
    }
    lastProductsTotal = data.count || allProductsData.length;
    const filteredProducts = filterProductsByGrade(allProductsData);
    const messageText = "Found " + filteredProducts.length + " products in " + label;
    displayProducts(filteredProducts, messageText);
    return;
  }

  showProductsLoading(false);
  displayProducts([], "No products found in " + label);
}

// Function to apply nutrition grade filter
function applyNutritionGradeFilter(grade) {
  if (grade) {
    currentNutritionGradeFilter = String(grade).toLowerCase();
  } else {
    currentNutritionGradeFilter = "all";
  }

  if (currentSearchQuery) {
    searchProductsByName(currentSearchQuery, currentNutritionGradeFilter);
    return;
  }

  let filteredProducts = filterProductsByGrade(allProductsData);
  let messageText = "";

  if (currentProductCategory) {
    let label = currentProductCategory;
    messageText = "Found " + filteredProducts.length + " products in " + label;
  } else if (filteredProducts.length > 0) {
    messageText = "Found " + filteredProducts.length + " products";
  } else {
    messageText = "No products to display";
  }

  displayProducts(filteredProducts, messageText);
}

// Function to ensure product detail modal exists
function ensureProductDetailModal() {
  if (document.getElementById("product-detail-modal")) {
    return;
  }

  let modalHTML = `<div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 hidden" id="product-detail-modal">
      <div class="bg-white rounded-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div class="p-6" id="product-detail-modal-body">
        </div>
      </div>
    </div>`;

  let tempElement = document.createElement("div");
  tempElement.innerHTML = modalHTML;
  document.body.appendChild(tempElement.firstChild);

  document.getElementById("product-detail-modal").addEventListener("click", function (event) {
    if (event.target === this) {
      closeProductDetailModal();
    }
  });
}

// Function to format allergens
function formatAllergens(allergens) {
  if (!allergens) {
    return "";
  }
  if (Array.isArray(allergens)) {
    let formattedAllergens = [];
    for (let i = 0; i < allergens.length; i++) {
      formattedAllergens.push(String(allergens[i]));
    }
    return formattedAllergens.join(", ");
  }
  return String(allergens).trim();
}

// Function to open product detail modal
function openProductDetailModal(product) {
  if (!product) {
    return;
  }
  ensureProductDetailModal();

  fetchProductFromOpenFoodFacts(product).then(function(enrichedProduct) {
    displayProductDetailModal(enrichedProduct);
  });
}

// Function to display product detail modal
function displayProductDetailModal(product) {
  if (!product) {
    return;
  }
  currentProductForLog = product;

  let nutritionData = product.nutrition || {};
  let calories = Math.round(nutritionData.calories || 0);
  let protein = Number(nutritionData.protein || 0);
  let carbs = Number(nutritionData.carbs || 0);
  let fat = Number(nutritionData.fat || 0);
  let sugar = Number(nutritionData.sugar || 0);
  let fiber = Number(nutritionData.fiber || 0);
  let saturatedFat = Number(nutritionData.saturatedFat || 0);
  let salt = Number(nutritionData.salt || (nutritionData.sodium ? nutritionData.sodium * 2.5 : 0));

  let maxP = 50;
  let maxC = 100;
  let maxF = 50;
  let maxS = 50;

  let grade = product.nutritionGrade ? String(product.nutritionGrade).toLowerCase() : "";
  let gradeMeta = getGradeMeta(grade);
  let novaMeta = getNovaMeta(product.novaGroup);

  let imageBlock = "";
  if (product.image) {
    imageBlock = `<img src="${product.image}" alt="${(product.name || "")}" class="w-full h-full object-contain">`;
  } else {
    imageBlock = `<div class="w-full h-full flex items-center justify-center"><i class="fa-solid fa-box text-gray-300 text-4xl"></i></div>`;
  }

  let gradeBlock = "";
  if (grade && grade !== "unknown") {
    gradeBlock = `<div class="flex items-center gap-2 px-3 py-1.5 rounded-lg" style="background-color: ${gradeMeta.bg}">
        <span class="w-8 h-8 rounded flex items-center justify-center text-white font-bold" style="background-color: ${gradeMeta.color}">${grade.toUpperCase()}</span>
        <div><p class="text-xs font-bold" style="color: ${gradeMeta.color}">Nutri-Score</p><p class="text-[10px] text-gray-600">${gradeMeta.label}</p></div>
      </div>`;
  }

  let novaBlock = "";
  if (product.novaGroup) {
    novaBlock = `<div class="flex items-center gap-2 px-3 py-1.5 rounded-lg" style="background-color: ${novaMeta.color}20">
        <span class="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold" style="background-color: ${novaMeta.color}">${product.novaGroup}</span>
        <div><p class="text-xs font-bold" style="color: ${novaMeta.color}">NOVA</p><p class="text-[10px] text-gray-600">${novaMeta.label}</p></div>
      </div>`;
  }

  let ingredientsBlock = "";
  if (product.ingredients) {
    ingredientsBlock = `<div class="bg-gray-50 rounded-xl p-5 mb-6">
        <h3 class="font-bold text-gray-900 mb-3 flex items-center gap-2"><i class="fa-solid fa-list text-gray-600"></i> Ingredients</h3>
        <p class="text-sm text-gray-600 leading-relaxed">${product.ingredients}</p>
      </div>`;
  }

  let allergensText = formatAllergens(product.allergens);
  let allergensBlock = "";
  if (allergensText) {
    allergensBlock = `<div class="bg-red-50 rounded-xl p-5 mb-6 border border-red-200">
        <h3 class="font-bold text-red-700 mb-2 flex items-center gap-2"><i class="fa-solid fa-triangle-exclamation"></i> Allergens</h3>
        <p class="text-sm text-red-600">${allergensText}</p>
      </div>`;
  }

  const bodyElement = document.getElementById("product-detail-modal-body");
  bodyElement.innerHTML = `<div class="flex items-start gap-6 mb-6">
      <div class="w-32 h-32 bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden flex-shrink-0">${imageBlock}</div>
      <div class="flex-1">
        <p class="text-sm text-emerald-600 font-semibold mb-1">${product.brand || "Unknown Brand"}</p>
        <h2 class="text-2xl font-bold text-gray-900 mb-2">${product.name || "Unknown Product"}</h2>
        ${product.quantity ? `<p class="text-sm text-gray-500 mb-3">${product.quantity}</p>` : `<p class="text-sm text-gray-500 mb-3"></p>`}
        <div class="flex items-center gap-3">${gradeBlock}${novaBlock}</div>
      </div>
      <button type="button" class="close-product-modal text-gray-400 hover:text-gray-600"><i class="fa-solid fa-xmark text-2xl"></i></button>
    </div>
    <div class="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-5 mb-6 border border-emerald-200">
      <h3 class="font-bold text-gray-900 mb-4 flex items-center gap-2"><i class="fa-solid fa-chart-pie text-emerald-600"></i> Nutrition Facts <span class="text-sm font-normal text-gray-500">(per 100g)</span></h3>
      <div class="text-center mb-4 pb-4 border-b border-emerald-200"><p class="text-4xl font-bold text-gray-900">${calories}</p><p class="text-sm text-gray-500">Calories</p></div>
      <div class="grid grid-cols-4 gap-4">
        <div class="text-center"><div class="w-full bg-gray-200 rounded-full h-2 mb-2"><div class="bg-emerald-500 h-2 rounded-full" style="width: ${Math.min((protein / maxP) * 100, 100)}%"></div></div><p class="text-lg font-bold text-emerald-600">${protein.toFixed(1)}g</p><p class="text-xs text-gray-500">Protein</p></div>
        <div class="text-center"><div class="w-full bg-gray-200 rounded-full h-2 mb-2"><div class="bg-blue-500 h-2 rounded-full" style="width: ${Math.min((carbs / maxC) * 100, 100)}%"></div></div><p class="text-lg font-bold text-blue-600">${carbs.toFixed(1)}g</p><p class="text-xs text-gray-500">Carbs</p></div>
        <div class="text-center"><div class="w-full bg-gray-200 rounded-full h-2 mb-2"><div class="bg-purple-500 h-2 rounded-full" style="width: ${Math.min((fat / maxF) * 100, 100)}%"></div></div><p class="text-lg font-bold text-purple-600">${fat.toFixed(1)}g</p><p class="text-xs text-gray-500">Fat</p></div>
        <div class="text-center"><div class="w-full bg-gray-200 rounded-full h-2 mb-2"><div class="bg-orange-500 h-2 rounded-full" style="width: ${Math.min((sugar / maxS) * 100, 100)}%"></div></div><p class="text-lg font-bold text-orange-600">${sugar.toFixed(1)}g</p><p class="text-xs text-gray-500">Sugar</p></div>
      </div>
      <div class="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-emerald-200">
        <div class="text-center"><p class="text-sm font-semibold text-gray-900">${saturatedFat.toFixed(1)}g</p><p class="text-xs text-gray-500">Saturated Fat</p></div>
        <div class="text-center"><p class="text-sm font-semibold text-gray-900">${fiber.toFixed(1)}g</p><p class="text-xs text-gray-500">Fiber</p></div>
        <div class="text-center"><p class="text-sm font-semibold text-gray-900">${salt.toFixed(2)}g</p><p class="text-xs text-gray-500">Salt</p></div>
      </div>
    </div>
    ${ingredientsBlock}
    ${allergensBlock}
    <div class="flex gap-3">
      <button type="button" class="add-product-to-log flex-1 py-3 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transition-all" data-barcode="${product.barcode || ""}"><i class="fa-solid fa-plus mr-2"></i>Log This Food</button>
      <button type="button" class="close-product-modal flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all">Close</button>
    </div>`;

  const closeButtons = bodyElement.querySelectorAll(".close-product-modal");
  for (let i = 0; i < closeButtons.length; i++) {
    closeButtons[i].addEventListener("click", function () {
      closeProductDetailModal();
    });
  }

  const logButton = bodyElement.querySelector(".add-product-to-log");
  if (logButton) {
    logButton.addEventListener("click", function () {
      logCurrentProduct();
    });
  }

  const modalElement = document.getElementById("product-detail-modal");
  modalElement.classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

// Function to close product detail modal
function closeProductDetailModal() {
  const modalElement = document.getElementById("product-detail-modal");
  if (modalElement) {
    modalElement.classList.add("hidden");
  }
  document.body.style.overflow = "";
}

// Function to log current product
function logCurrentProduct() {
  let product = currentProductForLog;
  if (!product) {
    return;
  }

  let nutritionData = product.nutrition || {};
  let totalCalories = Math.round(nutritionData.calories || 0);
  let totalProtein = Math.round((nutritionData.protein || 0) * 10) / 10;
  let totalCarbs = Math.round((nutritionData.carbs || 0) * 10) / 10;
  let totalFat = Math.round((nutritionData.fat || 0) * 10) / 10;

  addFoodLogItem({
    id: "product-" + (product.barcode || Date.now()) + "-" + Date.now(),
    name: product.name || "Product",
    brand: product.brand || "",
    type: "product",
    servings: 1,
    thumbnail: product.image || "",
    loggedAt: new Date().toISOString(),
    nutrition: {
      calories: totalCalories,
      protein: totalProtein,
      carbs: totalCarbs,
      fat: totalFat
    }
  });

  closeProductDetailModal();

  showNotification(
    (product.name || "Product") + " logged to your daily intake! 📝",
    "success"
  );
}

// Function to setup product search
function setupProductSearch() {
  let searchInput = getProductSearchInput();
  if (searchInput) {
    searchInput.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.keyCode === 13) {
        searchProductsByName(searchInput.value, currentNutritionGradeFilter);
      }
    });
  }

  const buttonElements = document.querySelectorAll("#products-section button");
  for (let i = 0; i < buttonElements.length; i++) {
    let buttonText = buttonElements[i].textContent.trim().toLowerCase();
    if (buttonText === "search") {
      buttonElements[i].addEventListener("click", function () {
        let inputElement = getProductSearchInput();
        if (inputElement) {
          searchProductsByName(inputElement.value, currentNutritionGradeFilter);
        }
      });
    }
    if (buttonText.indexOf("lookup") !== -1) {
      buttonElements[i].addEventListener("click", function () {
        let inputElement = getBarcodeInput();
        if (inputElement) {
          searchProductByBarcode(inputElement.value);
        }
      });
    }
  }
}

// Function to setup barcode search
function setupBarcodeSearch() {
  let barcodeInput = getBarcodeInput();
  if (barcodeInput) {
    barcodeInput.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.keyCode === 13) {
        searchProductByBarcode(barcodeInput.value);
      }
    });
  }
}

// Function to setup nutrition grade filters
function setupNutritionGradeFilters() {
  let filterButtons = document.querySelectorAll(".nutri-score-filter, [data-grade]");

  if (filterButtons.length === 0) {
    let allButtons = document.querySelectorAll("#products-section button");
    for (let i = 0; i < allButtons.length; i++) {
      let text = allButtons[i].textContent.trim().toUpperCase();
      if (text === "ALL" || text === "A" || text === "B" || text === "C" || text === "D" || text === "E") {
        allButtons[i].className = (allButtons[i].className || "") + " nutri-score-filter";
        allButtons[i].setAttribute("data-grade", text.toLowerCase());
      }
    }
    filterButtons = document.querySelectorAll(".nutri-score-filter, [data-grade]");
  }

  for (let j = 0; j < filterButtons.length; j++) {
    filterButtons[j].addEventListener("click", function () {
      let grade = this.getAttribute("data-grade") || this.textContent.trim().toLowerCase();

      const allFilters = document.querySelectorAll(".nutri-score-filter, [data-grade]");
      for (let k = 0; k < allFilters.length; k++) {
        allFilters[k].classList.remove("ring-2", "ring-gray-900");
      }
      this.classList.add("ring-2", "ring-gray-900");

      applyNutritionGradeFilter(grade);
    });
  }
}

// Function to map category label to ID
function mapCategoryLabelToId(text) {
  let labelText = String(text || "").trim().toLowerCase();

  if (labelText.indexOf("breakfast") !== -1) {
    return "breakfast_cereals";
  }
  if (labelText.indexOf("beverage") !== -1 || labelText === "drinks") {
    return "beverages";
  }
  if (labelText.indexOf("snack") !== -1) {
    return "snacks";
  }
  if (labelText.indexOf("dairy") !== -1) {
    return "dairy";
  }
  if (labelText.indexOf("fruit") !== -1) {
    return "fruits";
  }
  if (labelText.indexOf("vegetable") !== -1) {
    return "vegetables";
  }
  if (labelText.indexOf("bread") !== -1) {
    return "breads";
  }
  if (labelText.indexOf("meat") !== -1) {
    return "meats";
  }
  if (labelText.indexOf("frozen") !== -1) {
    return "frozen_foods";
  }
  if (labelText.indexOf("sauce") !== -1) {
    return "sauces";
  }
}

// Function to setup product categories
function setupProductCategories() {
  let categoryButtons = document.querySelectorAll(".product-category-btn");

  for (let j = 0; j < categoryButtons.length; j++) {
    categoryButtons[j].addEventListener("click", function (e) {
      e.preventDefault();
      let category = this.getAttribute("data-category");
      let label = this.getAttribute("data-category-label") || this.textContent.trim();
      if (!category) {
        category = mapCategoryLabelToId(label);
      }
      category = normalizeCategoryId(category);
      loadProductsByCategory(category, label);
    });
  }
}

// Function to reset product scanner
function resetProductScanner() {
  allProductsData = [];
  currentSearchQuery = "";
  currentProductCategory = null;
  currentNutritionGradeFilter = "all";
  lastProductsTotal = 0;
  currentProductForLog = null;
  closeProductDetailModal();

  let searchInput = getProductSearchInput();
  if (searchInput) {
    searchInput.value = "";
  }

  let barcodeInput = getBarcodeInput();
  if (barcodeInput) {
    barcodeInput.value = "";
  }

  let gridElement = getProductsGrid();
  if (gridElement) {
    gridElement.innerHTML = "";
  }

  let emptyElement = getProductsEmptyEl();
  if (emptyElement) {
    emptyElement.classList.remove("hidden");
  }

  updateProductsCount("Search for products to see results");
  showProductsLoading(false);

  const allFilters = document.querySelectorAll(".nutri-score-filter, [data-grade]");
  for (let i = 0; i < allFilters.length; i++) {
    allFilters[i].classList.remove("ring-2", "ring-gray-900");
    let grade = allFilters[i].getAttribute("data-grade");
    if (grade === "all") {
      allFilters[i].classList.add("ring-2", "ring-gray-900");
    }
  }
}

// Function to initialize product scanner
function initProductScanner() {
  ensureProductDetailModal();
  setupProductSearch();
  setupBarcodeSearch();
  setupNutritionGradeFilters();
  setupProductCategories();
}
initProductScanner();

for (let productIndex = 0; productIndex < ASIDE_BUTTONS.length; productIndex++) {
  ASIDE_BUTTONS[productIndex].addEventListener("click", function (e) {
    let buttonText = e.currentTarget.textContent.trim();
    if (buttonText === "Product Scanner") {
      setTimeout(function () {
        resetProductScanner();
        initProductScanner();
      }, 100);
    }
  });
}

// FOOD LOG FUNCTIONS
let FOOD_LOG_STORAGE_KEY = "nutriplan_daily_log";
let CALORIE_GOAL = 2000;
let PROTEIN_GOAL = 50;
let CARBS_GOAL = 250;
let FAT_GOAL = 65;

// Function to get today's date key
function getTodayDateKey() {
  let now = new Date();
  let year = now.getFullYear();
  let month = now.getMonth() + 1;
  let day = now.getDate();
  if (month < 10) {
    month = "0" + month;
  }
  if (day < 10) {
    day = "0" + day;
  }
  return year + "-" + month + "-" + day;
}

// Function to format display date
function formatDisplayDate(dateObject) {
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return days[dateObject.getDay()] + ", " + months[dateObject.getMonth()] + " " + dateObject.getDate();
}

// Function to load daily log from localStorage
function loadDailyLog() {
  let rawData = localStorage.getItem(FOOD_LOG_STORAGE_KEY);
  if (rawData === null || rawData === undefined || rawData === "") {
    return {};
  }
  return JSON.parse(rawData);
}

// Function to save daily log to localStorage
function saveDailyLog(logData) {
  localStorage.setItem(FOOD_LOG_STORAGE_KEY, JSON.stringify(logData));
}

// Function to get or create day entry
function getOrCreateDayEntry(logData, dateKey) {
  if (logData[dateKey] === null || logData[dateKey] === undefined) {
    logData[dateKey] = {
      meals: [],
      totalCalories: 0,
      totalProtein: 0,
      totalCarbs: 0,
      totalFat: 0
    };
  }
  return logData[dateKey];
}

// Function to recalculate day totals
function recalculateDayTotals(dayEntry) {
  let totalCalories = 0;
  let totalProtein = 0;
  let totalCarbs = 0;
  let totalFat = 0;
  for (let i = 0; i < dayEntry.meals.length; i++) {
    let nutritionData = dayEntry.meals[i].nutrition || {};
    totalCalories = totalCalories + (nutritionData.calories || 0);
    totalProtein = totalProtein + (nutritionData.protein || 0);
    totalCarbs = totalCarbs + (nutritionData.carbs || 0);
    totalFat = totalFat + (nutritionData.fat || 0);
  }
  dayEntry.totalCalories = Math.round(totalCalories);
  dayEntry.totalProtein = Math.round(totalProtein * 10) / 10;
  dayEntry.totalCarbs = Math.round(totalCarbs * 10) / 10;
  dayEntry.totalFat = Math.round(totalFat * 10) / 10;
}

// Function to add food log item
function addFoodLogItem(item) {
  let logData = loadDailyLog();
  let dateKey = getTodayDateKey();
  let dayEntry = getOrCreateDayEntry(logData, dateKey);
  dayEntry.meals.push(item);
  recalculateDayTotals(dayEntry);
  saveDailyLog(logData);
  displayFoodLog();
}

// Function to remove food log item
function removeFoodLogItem(itemId) {
  let logData = loadDailyLog();
  let dateKey = getTodayDateKey();
  let dayEntry = getOrCreateDayEntry(logData, dateKey);
  let newMeals = [];
  for (let i = 0; i < dayEntry.meals.length; i++) {
    if (dayEntry.meals[i].id !== itemId) {
      newMeals.push(dayEntry.meals[i]);
    }
  }
  dayEntry.meals = newMeals;
  recalculateDayTotals(dayEntry);
  saveDailyLog(logData);
  displayFoodLog();
  showNotification("Item removed from log", "info");
}

// Function to clear all food log items
function clearAllFoodLogItems() {
  let logData = loadDailyLog();
  let dateKey = getTodayDateKey();
  logData[dateKey] = {
    meals: [],
    totalCalories: 0,
    totalProtein: 0,
    totalCarbs: 0,
    totalFat: 0
  };
  saveDailyLog(logData);
  displayFoodLog();
}

// Function to get week dates
function getWeekDates() {
  let today = new Date();
  let dayOfWeek = today.getDay();
  let weekDates = [];
  for (let i = 0; i < 7; i++) {
    let dateObject = new Date(today);
    dateObject.setDate(today.getDate() - dayOfWeek + i);
    weekDates.push(dateObject);
  }
  return weekDates;
}

// Function to create nutrition progress
function createNutritionProgress(label, value, goal, unit, color) {
  let percentage = 0;
  if (goal > 0) {
    percentage = Math.round((value / goal) * 100);
  }
  if (percentage > 100) {
    percentage = 100;
  }
  let isOver = value > goal;
  let percentageClass = "text-" + color + "-600";
  let barClass = "bg-" + color + "-500";
  let valueClass = "text-" + color + "-600";
  if (isOver) {
    percentageClass = "text-red-500";
    barClass = "bg-red-500";
    valueClass = "text-red-600";
  }
  
  return `<div class="bg-gray-50 rounded-xl p-4">
      <div class="flex items-center justify-between mb-2">
        <span class="text-sm font-medium text-gray-700">${label}</span>
        <span class="text-xs ${percentageClass}">${percentage}%</span>
      </div>
      <div class="w-full bg-gray-200 rounded-full h-2.5 mb-2">
        <div class="h-2.5 rounded-full ${barClass}" style="width: ${percentage}%"></div>
      </div>
      <div class="flex items-center justify-between text-xs">
        <span class="font-bold ${valueClass}">${value} ${unit}</span>
        <span class="text-gray-400">/ ${goal} ${unit}</span>
      </div>
    </div>`;
}

// Function to create logged items list
function createLoggedItemsList(meals) {
  if (meals.length === 0) {
    return `
      <div class="text-center py-12">
        <div class="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <i class="fa-solid fa-utensils text-gray-300 text-3xl"></i>
        </div>
        <p class="text-gray-500 font-medium mb-2">No food logged today</p>
        <p class="text-gray-400 text-sm mb-4">Start tracking your nutrition by logging meals or scanning products</p>
        <div class="flex justify-center gap-3">
          <button type="button" id="foodlog-browse-recipes" class="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-all">
            <i class="fa-solid fa-plus"></i> Browse Recipes
          </button>
          <button type="button" id="foodlog-scan-product" class="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all">
            <i class="fa-solid fa-barcode"></i> Scan Product
          </button>
        </div>
      </div>`;
  }

  let htmlString = `<div class="space-y-3 max-h-96 overflow-y-auto">`;
  for (let i = meals.length - 1; i >= 0; i--) {
    let mealItem = meals[i];
    let nutritionData = mealItem.nutrition || {};
    let imageHTML = "";
    if (mealItem.type === "meal" && mealItem.thumbnail) {
      imageHTML = `<img src="${mealItem.thumbnail}" alt="${mealItem.name}" class="w-14 h-14 rounded-xl object-cover"/>`;
    } else {
      let boxBg = "bg-emerald-100";
      let icon = "utensils";
      let iconColor = "text-emerald-600";
      if (mealItem.type === "product") {
        boxBg = "bg-blue-100";
        icon = "box";
        iconColor = "text-blue-600";
      }
      imageHTML = `<div class="w-14 h-14 ${boxBg} rounded-xl flex items-center justify-center"><i class="fa-solid fa-${icon} ${iconColor} text-xl"></i></div>`;
    }

    let servingsLine = "Product";
    let typeLabel = "Recipe";
    let typeColor = "text-emerald-600";
    if (mealItem.type === "meal") {
      servingsLine = mealItem.servings + " serving";
      if (mealItem.servings !== 1) {
        servingsLine = mealItem.servings + " servings";
      }
    } else {
      typeLabel = "Product";
      typeColor = "text-blue-600";
      if (mealItem.brand) {
        servingsLine = mealItem.brand;
      }
    }

    htmlString += `
      <div class="flex items-center justify-between bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-all">
        <div class="flex items-center gap-4">
          ${imageHTML}
          <div>
            <p class="font-semibold text-gray-900">${mealItem.name}</p>
            <p class="text-sm text-gray-500">${servingsLine} <span class="mx-1">•</span> <span class="${typeColor}">${typeLabel}</span></p>
          </div>
        </div>
        <div class="flex items-center gap-4">
          <div class="text-right"><p class="text-lg font-bold text-emerald-600">${nutritionData.calories || 0}</p><p class="text-xs text-gray-500">kcal</p></div>
          <div class="hidden md:flex gap-2 text-xs text-gray-500">
            <span class="px-2 py-1 bg-blue-50 rounded">${nutritionData.protein || 0}g P</span>
            <span class="px-2 py-1 bg-amber-50 rounded">${nutritionData.carbs || 0}g C</span>
            <span class="px-2 py-1 bg-purple-50 rounded">${nutritionData.fat || 0}g F</span>
          </div>
          <button type="button" class="food-log-delete text-gray-400 hover:text-red-500 p-2" data-id="${mealItem.id}"><i class="fa-solid fa-trash"></i></button>
        </div>
      </div>`;
  }
  htmlString += `</div>`;
  return htmlString;
}

// Function to display food log
function displayFoodLog() {
  const sectionElement = document.getElementById("foodlog-section");
  if (sectionElement === null || sectionElement === undefined) {
    return;
  }

  let logData = loadDailyLog();
  let dateKey = getTodayDateKey();
  let dayEntry = getOrCreateDayEntry(logData, dateKey);
  let today = new Date();
  let displayDate = formatDisplayDate(today);

  let clearAllHTML = "";
  if (dayEntry.meals.length > 0) {
    clearAllHTML = `<button id="clear-foodlog" class="text-red-500 hover:text-red-600 text-sm font-medium"><i class="fa-solid fa-trash mr-1"></i>Clear All</button>`;
  }

  let weekDates = getWeekDates();
  let dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let weekHTML = "";
  let weekTotalCalories = 0;
  let weekTotalItems = 0;
  let daysOnGoal = 0;

  for (let weekIndex = 0; weekIndex < weekDates.length; weekIndex++) {
    let weekDate = weekDates[weekIndex];
    let year = weekDate.getFullYear();
    let month = weekDate.getMonth() + 1;
    let day = weekDate.getDate();
    if (month < 10) {
      month = "0" + month;
    }
    if (day < 10) {
      day = "0" + day;
    }
    let key = year + "-" + month + "-" + day;
    let entry = logData[key];
    let dayCal = 0;
    let dayItems = 0;
    if (entry) {
      dayCal = entry.totalCalories || 0;
      if (entry.meals) {
        dayItems = entry.meals.length;
      }
    }
    weekTotalCalories = weekTotalCalories + dayCal;
    weekTotalItems = weekTotalItems + dayItems;
    if (dayCal > 0 && dayCal <= CALORIE_GOAL) {
      daysOnGoal = daysOnGoal + 1;
    }

    let isToday = key === dateKey;
    let cellClass = "text-center";
    if (isToday) {
      cellClass = "text-center bg-indigo-100 rounded-xl";
    }
    let calClass = "text-gray-300";
    if (dayCal > 0) {
      calClass = "text-emerald-600";
    }

    weekHTML += `<div class="${cellClass} p-2">
        <p class="text-xs text-gray-500 mb-1">${dayNames[weekIndex]}</p>
        <p class="text-sm font-medium text-gray-900">${day}</p>
        <div class="mt-2 ${calClass}">
          <p class="text-lg font-bold">${dayCal}</p>
          <p class="text-xs">kcal</p>
        </div>
        ${dayItems > 0 ? `<p class="text-xs text-gray-400 mt-1">${dayItems} items</p>` : ""}
      </div>`;
  }

  let weeklyAverage = Math.round(weekTotalCalories / 7);

  sectionElement.innerHTML = `<div class="max-w-7xl mx-auto px-4 py-6">
      <div class="bg-linear-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 mb-6 text-white">
        <div class="flex items-center justify-between">
          <div>
            <h2 class="text-2xl font-bold mb-2"><i class="fa-solid fa-clipboard-list mr-2"></i>Daily Food Log</h2>
            <p class="opacity-90">Track and monitor your daily nutrition intake</p>
          </div>
          <div class="text-right">
            <p class="text-sm opacity-80">Today</p>
            <p class="text-xl font-bold" id="foodlog-today-date">${displayDate}</p>
          </div>
        </div>
      </div>
      <div id="foodlog-today-section" class="bg-white rounded-2xl p-6 mb-6 border-2 border-gray-200">
        <h3 class="text-lg font-bold text-gray-900 mb-4"><i class="fa-solid fa-fire text-orange-500 mr-2"></i>Today's Nutrition</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          ${createNutritionProgress("Calories", dayEntry.totalCalories, CALORIE_GOAL, "kcal", "emerald")}
          ${createNutritionProgress("Protein", dayEntry.totalProtein, PROTEIN_GOAL, "g", "blue")}
          ${createNutritionProgress("Carbs", dayEntry.totalCarbs, CARBS_GOAL, "g", "amber")}
          ${createNutritionProgress("Fat", dayEntry.totalFat, FAT_GOAL, "g", "purple")}
        </div>
        <div class="border-t border-gray-200 pt-4">
          <div class="flex items-center justify-between mb-3">
            <h4 class="text-sm font-semibold text-gray-700">Logged Items (${dayEntry.meals.length})</h4>
            ${clearAllHTML}
          </div>
          ${createLoggedItemsList(dayEntry.meals)}
        </div>
      </div>
      <div class="bg-white rounded-2xl p-6 mb-6 border-2 border-gray-200">
        <h3 class="text-lg font-bold text-gray-900 mb-4"><i class="fa-solid fa-calendar-week text-indigo-500 mr-2"></i>Weekly Overview</h3>
        <div class="grid grid-cols-7 gap-2">${weekHTML}</div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div class="bg-white rounded-xl p-4 border-2 border-gray-200">
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center"><i class="fa-solid fa-chart-line text-emerald-600 text-xl"></i></div>
            <div><p class="text-sm text-gray-500">Weekly Average</p><p class="text-xl font-bold text-gray-900">${weeklyAverage} kcal</p></div>
          </div>
        </div>
        <div class="bg-white rounded-xl p-4 border-2 border-gray-200">
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center"><i class="fa-solid fa-utensils text-blue-600 text-xl"></i></div>
            <div><p class="text-sm text-gray-500">Total Items This Week</p><p class="text-xl font-bold text-gray-900">${weekTotalItems} items</p></div>
          </div>
        </div>
        <div class="bg-white rounded-xl p-4 border-2 border-gray-200">
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center"><i class="fa-solid fa-bullseye text-purple-600 text-xl"></i></div>
            <div><p class="text-sm text-gray-500">Days On Goal</p><p class="text-xl font-bold text-gray-900">${daysOnGoal} / 7</p></div>
          </div>
        </div>
      </div>
    </div>`;

  const deleteButtons = sectionElement.querySelectorAll(".food-log-delete");
  for (let i = 0; i < deleteButtons.length; i++) {
    deleteButtons[i].addEventListener("click", function () {
      removeFoodLogItem(this.getAttribute("data-id"));
    });
  }

  const clearButton = document.getElementById("clear-foodlog");
  if (clearButton) {
    clearButton.addEventListener("click", function () {
      clearAllFoodLogItems();
    });
  }

  const browseButton = document.getElementById("foodlog-browse-recipes");
  if (browseButton) {
    browseButton.addEventListener("click", function () {
      for (let i = 0; i < ASIDE_BUTTONS.length; i++) {
        if (ASIDE_BUTTONS[i].textContent.trim() === "Meals & Recipes") {
          ASIDE_BUTTONS[i].click();
          break;
        }
      }
    });
  }
  const scanButton = document.getElementById("foodlog-scan-product");
  if (scanButton) {
    scanButton.addEventListener("click", function () {
      for (let i = 0; i < ASIDE_BUTTONS.length; i++) {
        if (ASIDE_BUTTONS[i].textContent.trim() === "Product Scanner") {
          ASIDE_BUTTONS[i].click();
          break;
        }
      }
    });
  }
}

// Function to setup food log navigation
function setupFoodLogNav() {
  for (let i = 0; i < ASIDE_BUTTONS.length; i++) {
    ASIDE_BUTTONS[i].addEventListener("click", function (e) {
      let buttonText = e.currentTarget.textContent.trim();
      if (buttonText === "Food Log") {
        setTimeout(function () {
          displayFoodLog();
        }, 50);
      }
    });
  }
}
setupFoodLogNav();

if (FOOD_LOG && FOOD_LOG.classList.contains("hidden") === false) {
  displayFoodLog();
}