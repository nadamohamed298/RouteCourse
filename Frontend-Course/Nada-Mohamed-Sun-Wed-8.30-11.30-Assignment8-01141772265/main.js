var recipes = [
  {
    rating: 4.6,
    reviewsNumber: 289,
    prepTime: 20,
    cookTime: 30,
    servings: 4,
    recipeName: "Vegetable Curry",
    recipeDescription: "Hearty vegetarian curry with coconut milk",
    levelOfDifficulty: "Easy",
    recipeType: "Asian",
    hasWarning: true,
    image: "./pics/photo-1585032226651-759b368d7246.avif",
    ingredients: [
      "2 potatoes, cubed",
      "1 cauliflower, florets",
      "2 carrots, sliced",
      "1 can chickpeas",
      "400ml coconut milk",
      "3 tablespoons curry powder",
      "1 onion, diced",
      "3 cloves garlic, minced",
      "Fresh spinach",
    ],
    instructions: [
      "Heat oil in a large pot. Sauté onion until soft, add garlic and curry powder, cook for 1 minute.",
      "Add potatoes and carrots, cook for 5 minutes.",
      "Pour in coconut milk and 1 cup water. Bring to simmer.",
      "Add cauliflower and chickpeas. Cook for 20 minutes until vegetables are tender.",
      "Stir in fresh spinach and cook until wilted.",
      "Serve hot over basmati rice or with naan bread.",
    ],
    nutrition: {
      calories: 380,
      protein: 14,
      carbohydrates: 48,
      fat: 16,
      fiber: 12,
      sodium: 480,
    },
    chefsTips: [
      "Add vegetables in order of cooking time needed",
      "Adjust curry powder amount to taste",
      "Use full-fat coconut milk for creamier curry",
      "Add protein like tofu or paneer if desired",
    ],
  },
  {
    rating: 4.8,
    reviewsNumber: 445,
    prepTime: 20,
    cookTime: 15,
    servings: 2,
    recipeName: "Pad Thai",
    recipeDescription:
      "Popular Thai stir-fried noodles with shrimp and peanuts",
    levelOfDifficulty: "Intermediate",
    recipeType: "Asian",
    hasWarning: false,
    image: "./pics/photo-1559314809-0d155014e29e.avif",
    ingredients: [
      "200g rice noodles",
      "200g shrimp, peeled",
      "2 eggs",
      "3 tablespoons tamarind paste",
      "2 tablespoons fish sauce",
      "1 tablespoon palm sugar",
      "Bean sprouts",
      "Crushed peanuts",
      "Lime wedges and cilantro",
    ],
    instructions: [
      "Soak rice noodles in warm water for 30 minutes. Drain and set aside.",
      "Mix tamarind paste, fish sauce, and palm sugar to make the sauce.",
      "Heat wok over high heat. Scramble eggs and set aside.",
      "Cook shrimp until pink. Add noodles and sauce, toss for 2-3 minutes.",
      "Add scrambled eggs and bean sprouts. Toss everything together.",
      "Serve topped with crushed peanuts, lime wedges, and cilantro.",
    ],
    nutrition: {
      calories: 540,
      protein: 32,
      carbohydrates: 62,
      fat: 16,
      fiber: 4,
      sodium: 1120,
    },
    chefsTips: [
      "Don't oversoak noodles or they'll be mushy",
      "Cook on high heat for authentic wok flavor",
      "Balance sweet, sour, and salty flavors",
      "Prepare all ingredients before starting to cook",
    ],
  },
  {
    rating: 4.8,
    reviewsNumber: 234,
    prepTime: 30,
    cookTime: 60,
    servings: 4,
    recipeName: "Greek Moussaka",
    recipeDescription: "Traditional layered eggplant casserole with lamb",
    levelOfDifficulty: "Intermediate",
    recipeType: "Mediterranean",
    hasWarning: true,
    image: "./pics/photo-1601050690597-df0568f70950.avif",
    ingredients: [
      "3 large eggplants, sliced",
      "500g ground lamb",
      "400g canned tomatoes",
      "1 onion, diced",
      "3 cloves garlic, minced",
      "500ml béchamel sauce",
      "100g parmesan cheese",
      "Cinnamon and oregano",
      "Olive oil",
    ],
    instructions: [
      "Slice eggplants, salt them, and let sit for 30 minutes. Rinse and pat dry.",
      "Brush eggplant slices with olive oil, grill or bake until softened.",
      "Cook ground lamb with onion and garlic. Add tomatoes, cinnamon, oregano. Simmer 20 minutes.",
      "Preheat oven to 180°C (350°F).",
      "Layer in baking dish: eggplant, meat sauce, eggplant, meat sauce. Top with béchamel and parmesan.",
      "Bake for 45 minutes until golden. Let rest 15 minutes before serving.",
    ],
    nutrition: {
      calories: 580,
      protein: 36,
      carbohydrates: 32,
      fat: 32,
      fiber: 8,
      sodium: 820,
    },
    chefsTips: [
      "Salt eggplant to remove bitterness",
      "Don't skip the resting time - it helps set the layers",
      "Use ground beef if lamb is unavailable",
      "Make ahead and reheat for easier serving",
    ],
  },
  {
    rating: 4.7,
    reviewsNumber: 367,
    prepTime: 15,
    cookTime: 20,
    servings: 2,
    recipeName: "Teriyaki Chicken Bowl",
    recipeDescription: "Sweet and savory chicken over rice with vegetables",
    levelOfDifficulty: "Easy",
    recipeType: "Asian",
    hasWarning: false,
    image: "./pics/photo-1546069901-eacef0df6022.avif",
    ingredients: [
      "400g chicken thighs, sliced",
      "1/2 cup teriyaki sauce",
      "2 cups cooked rice",
      "1 broccoli head, florets",
      "1 carrot, julienned",
      "Sesame seeds",
      "Green onions, sliced",
      "1 tablespoon sesame oil",
    ],
    instructions: [
      "Heat sesame oil in a pan. Cook chicken until browned on all sides.",
      "Add teriyaki sauce to chicken, simmer for 5 minutes until sauce thickens.",
      "Meanwhile, steam broccoli and carrots until tender-crisp.",
      "Divide rice between bowls.",
      "Top with teriyaki chicken and steamed vegetables.",
      "Garnish with sesame seeds and green onions. Serve hot.",
    ],
    nutrition: {
      calories: 540,
      protein: 42,
      carbohydrates: 58,
      fat: 14,
      fiber: 4,
      sodium: 1240,
    },
    chefsTips: [
      "Use chicken thighs for juicier meat",
      "Make homemade teriyaki sauce for better flavor control",
      "Add edamame for extra protein",
      "Meal prep by cooking rice and chicken ahead",
    ],
  },
  {
    rating: 4.9,
    reviewsNumber: 512,
    prepTime: 90,
    cookTime: 12,
    servings: 2,
    recipeName: "Margherita Pizza",
    recipeDescription: "Classic Italian pizza with fresh mozzarella and basil",
    levelOfDifficulty: "Intermediate",
    recipeType: "Italian",
    hasWarning: true,
    image: "./pics/photo-1574071318508-1cdbab80d002.avif",
    ingredients: [
      "300g pizza dough",
      "200g crushed tomatoes",
      "250g fresh mozzarella",
      "Fresh basil leaves",
      "2 tablespoons olive oil",
      "2 cloves garlic, minced",
      "Salt and pepper to taste",
      "Parmesan cheese for topping",
    ],
    instructions: [
      "Let pizza dough come to room temperature and rest for 1 hour.",
      "Preheat oven to maximum temperature (usually 250°C/480°F).",
      "Mix crushed tomatoes with olive oil, garlic, salt, and pepper for the sauce.",
      "Roll out dough on a floured surface to desired thickness.",
      "Spread tomato sauce, add torn mozzarella pieces, and drizzle with olive oil.",
      "Bake for 10-12 minutes until crust is golden. Top with fresh basil and parmesan.",
    ],
    nutrition: {
      calories: 580,
      protein: 24,
      carbohydrates: 68,
      fat: 22,
      fiber: 4,
      sodium: 920,
    },
    chefsTips: [
      "Use a pizza stone for crispier crust",
      "Don't overload with toppings - less is more",
      "Add basil after baking to keep it fresh",
      "Let dough rest properly for best texture",
    ],
  },
  {
    rating: 4.7,
    reviewsNumber: 412,
    prepTime: 15,
    cookTime: 240,
    servings: 4,
    recipeName: "BBQ Pulled Pork",
    recipeDescription: "Slow-cooked tender pork in smoky barbecue sauce",
    levelOfDifficulty: "Easy",
    recipeType: "American",
    hasWarning: true,
    image: "./pics/photo-1529692236671-f1f6cf9683ba.avif",
    ingredients: [
      "1kg pork shoulder",
      "1 cup BBQ sauce",
      "1/2 cup apple cider vinegar",
      "2 tablespoons brown sugar",
      "1 tablespoon paprika",
      "1 tablespoon garlic powder",
      "Burger buns",
      "Coleslaw for serving",
    ],
    instructions: [
      "Mix paprika, garlic powder, brown sugar, salt and pepper. Rub all over pork shoulder.",
      "Place pork in slow cooker with apple cider vinegar and 1/2 cup water.",
      "Cook on low for 8 hours or high for 4 hours until meat is very tender.",
      "Remove pork and shred with two forks. Discard excess fat.",
      "Return shredded pork to slow cooker, mix with BBQ sauce.",
      "Serve on toasted buns with coleslaw on top.",
    ],
    nutrition: {
      calories: 620,
      protein: 48,
      carbohydrates: 52,
      fat: 22,
      fiber: 3,
      sodium: 1180,
    },
    chefsTips: [
      "Use pork shoulder for best results - it stays moist",
      "Let pork rest before shredding for juicier meat",
      "Make your own BBQ sauce for better flavor",
      "Leftovers freeze well for up to 3 months",
    ],
  },
  {
    rating: 4.7,
    reviewsNumber: 267,
    prepTime: 20,
    cookTime: 15,
    servings: 2,
    recipeName: "French Onion Soup",
    recipeDescription:
      "Rich beef broth with caramelized onions and melted cheese",
    levelOfDifficulty: "Intermediate",
    recipeType: "Mediterranean",
    hasWarning: true,
    image: "./pics/photo-1547592166-23ac45744acd.avif",
    ingredients: [
      "4 large onions, thinly sliced",
      "4 tablespoons butter",
      "1 liter beef broth",
      "1/2 cup white wine",
      "2 bay leaves",
      "Fresh thyme",
      "Baguette slices",
      "200g Gruyère cheese, grated",
    ],
    instructions: [
      "Melt butter in a large pot. Add onions and cook slowly for 40 minutes, stirring occasionally until caramelized.",
      "Add white wine and deglaze the pot, scraping up brown bits.",
      "Pour in beef broth, add bay leaves and thyme. Simmer for 20 minutes.",
      "Meanwhile, toast baguette slices until golden.",
      "Ladle soup into oven-safe bowls. Top with toasted bread and cheese.",
      "Broil for 3-5 minutes until cheese is melted and bubbly. Serve hot.",
    ],
    nutrition: {
      calories: 380,
      protein: 18,
      carbohydrates: 36,
      fat: 18,
      fiber: 4,
      sodium: 980,
    },
    chefsTips: [
      "Patience is key - don't rush the onion caramelization",
      "Use good quality beef broth for best flavor",
      "Gruyère can be substituted with Swiss cheese",
      "Watch carefully when broiling to avoid burning",
    ],
  },
  {
    rating: 4.4,
    reviewsNumber: 198,
    prepTime: 15,
    cookTime: 0,
    servings: 2,
    recipeName: "Caesar Salad",
    recipeDescription: "Classic salad with crispy romaine and creamy dressing",
    levelOfDifficulty: "Easy",
    recipeType: "Mediterranean",
    hasWarning: false,
    image: "./pics/photo-1546793665-c74683f339c1.avif",
    ingredients: [
      "1 large romaine lettuce",
      "1/2 cup Caesar dressing",
      "1/2 cup parmesan cheese, shaved",
      "1 cup croutons",
      "2 anchovy fillets (optional)",
      "Lemon wedges",
      "Black pepper",
    ],
    instructions: [
      "Wash and dry romaine lettuce thoroughly. Tear into bite-sized pieces.",
      "Place lettuce in a large salad bowl.",
      "Add Caesar dressing and toss until evenly coated.",
      "Add croutons and half the parmesan cheese. Toss gently.",
      "Top with remaining parmesan shavings and anchovies if using.",
      "Serve immediately with lemon wedges and fresh black pepper.",
    ],
    nutrition: {
      calories: 320,
      protein: 12,
      carbohydrates: 18,
      fat: 22,
      fiber: 3,
      sodium: 680,
    },
    chefsTips: [
      "Use cold, crisp lettuce for best texture",
      "Make homemade croutons for better flavor",
      "Add grilled chicken for a complete meal",
      "Don't dress salad until ready to serve",
    ],
  },
  {
    rating: 4.7,
    reviewsNumber: 312,
    prepTime: 15,
    cookTime: 25,
    servings: 4,
    recipeName: "Thai Green Curry",
    recipeDescription:
      "Vibrant and aromatic curry with vegetables and coconut milk",
    levelOfDifficulty: "Intermediate",
    recipeType: "Asian",
    hasWarning: false,
    image: "./pics/photo-1455619452474-d2be8b1e70cd.avif",
    ingredients: [
      "2 tablespoons green curry paste",
      "400ml coconut milk",
      "300g chicken breast, sliced",
      "1 red bell pepper, sliced",
      "100g green beans",
      "1 eggplant, cubed",
      "2 tablespoons fish sauce",
      "1 tablespoon palm sugar",
      "Fresh Thai basil leaves",
    ],
    instructions: [
      "Heat a large pot or wok over medium heat. Add curry paste and cook for 1 minute until fragrant.",
      "Add half the coconut milk and stir to combine with the curry paste.",
      "Add sliced chicken and cook until no longer pink, about 5 minutes.",
      "Add remaining coconut milk, vegetables, fish sauce, and palm sugar.",
      "Simmer for 15-20 minutes until vegetables are tender and sauce has thickened.",
      "Stir in fresh Thai basil leaves. Serve hot with jasmine rice.",
    ],
    nutrition: {
      calories: 420,
      protein: 26,
      carbohydrates: 22,
      fat: 26,
      fiber: 5,
      sodium: 890,
    },
    chefsTips: [
      "Adjust spice level by using more or less curry paste",
      "Add vegetables in stages based on cooking time needed",
      "Fresh Thai basil is essential for authentic flavor",
      "Use full-fat coconut milk for richest, creamiest sauce",
    ],
  },
  {
    rating: 4.6,
    reviewsNumber: 278,
    prepTime: 15,
    cookTime: 20,
    servings: 4,
    recipeName: "Beef Tacos",
    recipeDescription: "Flavorful Mexican tacos with seasoned ground beef",
    levelOfDifficulty: "Easy",
    recipeType: "American",
    hasWarning: false,
    image: "./pics/photo-1565299585323-38d6b0865b47.avif",
    ingredients: [
      "500g ground beef",
      "8 taco shells",
      "1 onion, diced",
      "2 tablespoons taco seasoning",
      "Shredded lettuce",
      "Diced tomatoes",
      "Shredded cheddar cheese",
      "Sour cream",
      "Salsa",
    ],
    instructions: [
      "Heat a large skillet over medium-high heat. Cook ground beef until browned.",
      "Add diced onion and cook until softened, about 5 minutes.",
      "Stir in taco seasoning and 1/2 cup water. Simmer for 10 minutes.",
      "Warm taco shells according to package directions.",
      "Fill each shell with seasoned beef.",
      "Top with lettuce, tomatoes, cheese, sour cream, and salsa. Serve immediately.",
    ],
    nutrition: {
      calories: 420,
      protein: 26,
      carbohydrates: 32,
      fat: 20,
      fiber: 4,
      sodium: 780,
    },
    chefsTips: [
      "Drain excess fat from beef for healthier tacos",
      "Warm shells in oven for better texture",
      "Prepare all toppings before cooking beef",
      "Use ground turkey for a lighter option",
    ],
  },
  {
    rating: 4.5,
    reviewsNumber: 156,
    prepTime: 20,
    cookTime: 35,
    servings: 2,
    recipeName: "Mediterranean Quinoa Bowl",
    recipeDescription:
      "Healthy bowl with quinoa, vegetables, and tahini dressing",
    levelOfDifficulty: "Easy",
    recipeType: "Mediterranean",
    hasWarning: true,
    image: "./pics/photo-1546069901-ba9599a7e63c.avif",
    ingredients: [
      "1 cup quinoa",
      "Cherry tomatoes, halved",
      "Cucumber, diced",
      "Red onion, sliced",
      "Kalamata olives",
      "Feta cheese, crumbled",
      "Fresh parsley",
      "Tahini dressing",
    ],
    instructions: [
      "Rinse quinoa thoroughly. Cook according to package directions, usually 15 minutes.",
      "While quinoa cooks, prepare all vegetables and set aside.",
      "For tahini dressing: mix tahini, lemon juice, garlic, and water until smooth.",
      "Fluff cooked quinoa with a fork and let cool slightly.",
      "Arrange quinoa in bowls. Top with tomatoes, cucumber, onion, and olives.",
      "Sprinkle with feta cheese and fresh parsley. Drizzle with tahini dressing.",
    ],
    nutrition: {
      calories: 480,
      protein: 18,
      carbohydrates: 58,
      fat: 20,
      fiber: 10,
      sodium: 540,
    },
    chefsTips: [
      "Rinse quinoa well to remove bitter coating",
      "Let quinoa cool before adding fresh ingredients",
      "Make extra tahini dressing - it keeps well in the fridge",
      "Add grilled chicken or chickpeas for extra protein",
    ],
  },
  {
    rating: 4.5,
    reviewsNumber: 189,
    prepTime: 10,
    cookTime: 5,
    servings: 2,
    recipeName: "Caprese Sandwich",
    recipeDescription:
      "Fresh Italian sandwich with mozzarella, tomato, and basil",
    levelOfDifficulty: "Easy",
    recipeType: "Italian",
    hasWarning: false,
    image: "./pics/photo-1509722747041-616f39b57569.avif",
    ingredients: [
      "1 ciabatta bread",
      "200g fresh mozzarella, sliced",
      "2 large tomatoes, sliced",
      "Fresh basil leaves",
      "3 tablespoons pesto",
      "2 tablespoons balsamic glaze",
      "Olive oil",
      "Salt and pepper",
    ],
    instructions: [
      "Slice ciabatta bread in half horizontally.",
      "Toast bread lightly until just crispy.",
      "Spread pesto on both sides of bread.",
      "Layer mozzarella slices, tomato slices, and fresh basil leaves.",
      "Drizzle with olive oil and balsamic glaze. Season with salt and pepper.",
      "Close sandwich, cut in half, and serve immediately.",
    ],
    nutrition: {
      calories: 480,
      protein: 22,
      carbohydrates: 48,
      fat: 22,
      fiber: 3,
      sodium: 680,
    },
    chefsTips: [
      "Use ripe, in-season tomatoes for best flavor",
      "Buffalo mozzarella is traditional but harder to slice",
      "Toast bread lightly - not too crispy",
      "Add prosciutto or salami for a heartier sandwich",
    ],
  },
  {
    rating: 4.9,
    reviewsNumber: 478,
    prepTime: 30,
    cookTime: 90,
    servings: 4,
    recipeName: "Lasagna Bolognese",
    recipeDescription:
      "Layered Italian pasta with rich meat sauce and béchamel",
    levelOfDifficulty: "Intermediate",
    recipeType: "Italian",
    hasWarning: true,
    image: "./pics/photo-1574894709920-11b28e7367e3.avif",
    ingredients: [
      "12 lasagna sheets",
      "500g ground beef",
      "400g canned tomatoes",
      "1 onion, diced",
      "2 carrots, diced",
      "500ml béchamel sauce",
      "200g mozzarella, grated",
      "100g parmesan cheese",
      "Fresh basil",
    ],
    instructions: [
      "Cook ground beef with onion and carrots until browned. Add tomatoes and simmer for 30 minutes.",
      "Cook lasagna sheets according to package directions. Drain and set aside.",
      "Preheat oven to 180°C (350°F).",
      "In a baking dish, layer: meat sauce, lasagna sheets, béchamel sauce. Repeat 3-4 times.",
      "Top final layer with béchamel, mozzarella, and parmesan cheese.",
      "Bake for 45 minutes until golden and bubbly. Let rest 10 minutes before serving.",
    ],
    nutrition: {
      calories: 680,
      protein: 42,
      carbohydrates: 58,
      fat: 28,
      fiber: 6,
      sodium: 920,
    },
    chefsTips: [
      "Make bolognese sauce a day ahead for better flavor",
      "Don't skip the resting time after baking",
      "Use fresh pasta sheets for best texture",
      "Freeze leftovers in individual portions",
    ],
  },
  {
    rating: 4.5,
    reviewsNumber: 324,
    prepTime: 15,
    cookTime: 15,
    servings: 4,
    recipeName: "Chicken Stir-Fry",
    recipeDescription: "Quick and healthy stir-fry with colorful vegetables",
    levelOfDifficulty: "Easy",
    recipeType: "Asian",
    hasWarning: false,
    image: "./pics/photo-1603133872878-684f208fb84b.avif",
    ingredients: [
      "500g chicken breast, sliced",
      "2 bell peppers, sliced",
      "1 broccoli head, florets",
      "2 carrots, julienned",
      "3 tablespoons soy sauce",
      "2 tablespoons oyster sauce",
      "1 tablespoon sesame oil",
      "2 cloves garlic, minced",
      "Fresh ginger, grated",
    ],
    instructions: [
      "Mix soy sauce, oyster sauce, and sesame oil for the sauce.",
      "Heat wok over high heat with oil. Cook chicken until golden, remove and set aside.",
      "Add more oil if needed. Stir-fry garlic and ginger for 30 seconds.",
      "Add vegetables, starting with hardest ones (carrots, broccoli). Cook for 3-4 minutes.",
      "Return chicken to wok, add bell peppers and sauce. Toss for 2 minutes.",
      "Serve immediately over steamed rice or noodles.",
    ],
    nutrition: {
      calories: 320,
      protein: 34,
      carbohydrates: 18,
      fat: 12,
      fiber: 5,
      sodium: 840,
    },
    chefsTips: [
      "Cut all ingredients before starting to cook",
      "Keep heat high for authentic stir-fry texture",
      "Don't overcrowd the wok or vegetables will steam",
      "Add cashews or peanuts for extra crunch",
    ],
  },
  {
    rating: 4.7,
    reviewsNumber: 389,
    prepTime: 20,
    cookTime: 30,
    servings: 4,
    recipeName: "Chicken Tikka Masala",
    recipeDescription:
      "Rich and creamy Indian curry with tender chicken pieces",
    levelOfDifficulty: "Intermediate",
    recipeType: "Asian",
    hasWarning: true,
    image: "./pics/photo-1565557623262-b51c2513a641.avif",
    ingredients: [
      "600g chicken breast, cubed",
      "1 cup plain yogurt",
      "2 tablespoons tikka masala paste",
      "400ml coconut cream",
      "1 onion, diced",
      "4 cloves garlic, minced",
      "2 tablespoons ginger, grated",
      "400g canned tomatoes",
      "Fresh cilantro for garnish",
    ],
    instructions: [
      "Marinate chicken in half the yogurt and 1 tablespoon tikka paste for at least 30 minutes.",
      "Heat oil in a large pan, cook marinated chicken until browned. Remove and set aside.",
      "In the same pan, sauté onion until soft. Add garlic and ginger, cook for 1 minute.",
      "Add remaining tikka paste and canned tomatoes. Simmer for 10 minutes.",
      "Stir in coconut cream and remaining yogurt. Add chicken back to the pan.",
      "Simmer for 15 minutes until sauce thickens. Garnish with cilantro and serve with rice.",
    ],
    nutrition: {
      calories: 450,
      protein: 38,
      carbohydrates: 24,
      fat: 22,
      fiber: 4,
      sodium: 760,
    },
    chefsTips: [
      "Marinate chicken overnight for deeper flavor",
      "Use full-fat coconut cream for richest sauce",
      "Adjust spice level by varying the tikka paste amount",
      "Serve with naan bread and basmati rice",
    ],
  },
  {
    rating: 4.8,
    reviewsNumber: 234,
    prepTime: 15,
    cookTime: 20,
    servings: 4,
    recipeName: "Creamy Spaghetti Carbonara",
    recipeDescription:
      "A classic Italian pasta dish with eggs, cheese, and pancetta",
    levelOfDifficulty: "Easy",
    recipeType: "Italian",
    hasWarning: false,
    image: "./pics/photo-1612874742237-6526221588e3.avif",
    ingredients: [
      "400g spaghetti pasta",
      "200g pancetta or guanciale, diced",
      "4 large eggs",
      "100g Pecorino Romano cheese, grated",
      "50g Parmesan cheese, grated",
      "Freshly ground black pepper",
      "Salt for pasta water",
    ],
    instructions: [
      "Bring a large pot of salted water to boil. Cook spaghetti according to package directions until al dente.",
      "While pasta cooks, heat a large skillet over medium heat. Add diced pancetta and cook until crispy, about 5-7 minutes.",
      "In a bowl, whisk together eggs, grated Pecorino Romano, and Parmesan cheese. Add plenty of freshly ground black pepper.",
      "Reserve 1 cup of pasta cooking water before draining. Drain pasta and immediately add to the skillet with pancetta.",
      "Remove skillet from heat. Quickly pour in egg mixture while tossing pasta vigorously. Add reserved pasta water as needed to create a creamy sauce.",
      "Serve immediately with extra cheese and black pepper on top. Enjoy your authentic carbonara!",
    ],
    nutrition: {
      calories: 520,
      protein: 28,
      carbohydrates: 62,
      fat: 18,
      fiber: 3,
      sodium: 680,
    },
    chefsTips: [
      "Use room temperature eggs for a smoother sauce consistency",
      "Work quickly when mixing eggs with hot pasta to avoid scrambling",
      "Reserve extra pasta water - it's the secret to perfect creaminess",
      "Freshly grated cheese makes all the difference in flavor",
      "Never add cream - authentic carbonara is made with eggs only",
    ],
  },
  {
    rating: 4.8,
    reviewsNumber: 356,
    prepTime: 10,
    cookTime: 15,
    servings: 2,
    recipeName: "Shrimp Scampi",
    recipeDescription: "Garlicky shrimp in white wine butter sauce",
    levelOfDifficulty: "Easy",
    recipeType: "Seafood",
    hasWarning: false,
    image: "./pics/photo-1633504581786-316c8002b1b9.avif",
    ingredients: [
      "400g large shrimp, peeled",
      "300g linguine pasta",
      "6 cloves garlic, minced",
      "1/2 cup white wine",
      "4 tablespoons butter",
      "2 tablespoons olive oil",
      "Fresh parsley, chopped",
      "Lemon juice and zest",
      "Red pepper flakes",
    ],
    instructions: [
      "Cook linguine according to package directions. Reserve 1 cup pasta water.",
      "Heat olive oil and 2 tablespoons butter in a large pan. Add garlic and red pepper flakes, cook for 1 minute.",
      "Add shrimp, cook until pink on both sides, about 3-4 minutes. Remove and set aside.",
      "Add white wine to pan, simmer for 2 minutes. Add remaining butter and lemon juice.",
      "Return shrimp to pan, add cooked pasta and toss. Add pasta water if needed.",
      "Garnish with parsley, lemon zest, and serve immediately.",
    ],
    nutrition: {
      calories: 520,
      protein: 36,
      carbohydrates: 54,
      fat: 18,
      fiber: 3,
      sodium: 620,
    },
    chefsTips: [
      "Don't overcook shrimp - they cook very quickly",
      "Use good quality white wine for best flavor",
      "Toss pasta in sauce for maximum flavor absorption",
      "Add extra lemon for bright, fresh taste",
    ],
  },
  {
    rating: 4.6,
    reviewsNumber: 421,
    prepTime: 15,
    cookTime: 20,
    servings: 4,
    recipeName: "Classic Beef Burger",
    recipeDescription: "Juicy homemade burger with all the fixings",
    levelOfDifficulty: "Easy",
    recipeType: "American",
    hasWarning: false,
    image: "./pics/photo-1568901346375-23c9450c58cd.avif",
    ingredients: [
      "500g ground beef (80/20)",
      "4 burger buns",
      "4 slices cheddar cheese",
      "Lettuce leaves",
      "Tomato slices",
      "Red onion, sliced",
      "Pickles",
      "Burger sauce or condiments",
    ],
    instructions: [
      "Divide ground beef into 4 equal portions. Form into patties, making a small indent in the center.",
      "Season patties generously with salt and pepper on both sides.",
      "Heat a grill or skillet over high heat. Cook patties for 4-5 minutes per side for medium.",
      "Add cheese slices in the last minute of cooking and cover to melt.",
      "Toast burger buns lightly on the grill or in a pan.",
      "Assemble burgers with lettuce, tomato, onion, pickles, and your favorite sauce.",
    ],
    nutrition: {
      calories: 650,
      protein: 38,
      carbohydrates: 42,
      fat: 35,
      fiber: 2,
      sodium: 920,
    },
    chefsTips: [
      "Don't press down on burgers while cooking - keeps them juicy",
      "Make indent in center to prevent burger from puffing up",
      "Let patties rest for 2-3 minutes before serving",
      "Toast buns for better texture and flavor",
    ],
  },
  {
    rating: 4.9,
    reviewsNumber: 187,
    prepTime: 10,
    cookTime: 15,
    servings: 2,
    recipeName: "Honey Garlic Salmon",
    recipeDescription: "Pan-seared salmon with a sweet and savory glaze",
    levelOfDifficulty: "Easy",
    recipeType: "Seafood",
    hasWarning: false,
    image: "./pics/photo-1467003909585-2f8a72700288.avif",
    ingredients: [
      "2 salmon fillets (6oz each)",
      "3 tablespoons honey",
      "2 tablespoons soy sauce",
      "4 cloves garlic, minced",
      "1 tablespoon olive oil",
      "1 teaspoon fresh ginger, grated",
      "Sesame seeds for garnish",
      "Green onions, sliced",
    ],
    instructions: [
      "Pat salmon fillets dry with paper towels. Season with salt and pepper.",
      "In a small bowl, whisk together honey, soy sauce, minced garlic, and grated ginger.",
      "Heat olive oil in a large skillet over medium-high heat.",
      "Place salmon fillets skin-side up in the pan. Cook for 4-5 minutes until golden.",
      "Flip salmon and pour honey garlic sauce over the top. Cook for another 4-5 minutes.",
      "Garnish with sesame seeds and sliced green onions. Serve with steamed vegetables or rice.",
    ],
    nutrition: {
      calories: 380,
      protein: 35,
      carbohydrates: 28,
      fat: 14,
      fiber: 0,
      sodium: 720,
    },
    chefsTips: [
      "Don't overcook salmon - it should be slightly pink in the center",
      "Use wild-caught salmon for best flavor and nutrition",
      "Let the sauce caramelize slightly for deeper flavor",
      "Pair with steamed broccoli or asparagus for a complete meal",
    ],
  },
];

function displayAllImageContent(allImageContent) {
  var recipeImage = document.getElementById("recipeImg");
  var recipeOverallRating = document.getElementById("overallRating");
  var recipeReviewsNumber = document.getElementById("reviewsNumber");
  var recipePrepTimeNumber = document.getElementById("prepTimeNumber");
  var recipeCookTimeNumber = document.getElementById("cookTimeNumber");
  var recipeServingsNumber = document.getElementById("servingsNumber");

  var recipeImg = allImageContent.image;
  var overallRating = allImageContent.rating;
  var reviewsNumber = allImageContent.reviewsNumber;
  var prepTimeNumber = allImageContent.prepTime;
  var cookTimeNumber = allImageContent.cookTime;
  var servingsNumber = allImageContent.servings;

  recipeImage.src = recipeImg;
  recipeOverallRating.textContent = `${overallRating}`;
  recipeReviewsNumber.textContent = `(${reviewsNumber} reviews)`;
  recipePrepTimeNumber.textContent = `${prepTimeNumber} min`;
  recipeCookTimeNumber.textContent = `${cookTimeNumber} min`;
  recipeServingsNumber.textContent = `${servingsNumber} people`;
}

function displayLevelOfDifficultyAndType(recipeLevelOfDifficultyAndType) {
  var difficultyLevelAndType = document.getElementById(
    "recipeLevelOfDifficultyAndType",
  );
  difficultyLevelAndType.innerHTML = "";
  difficultyLevel = recipeLevelOfDifficultyAndType.levelOfDifficulty;
  Type = recipeLevelOfDifficultyAndType.recipeType;
  difficultyLevelAndType.innerHTML += `<span class="green-rec fw-semibold py-1">${difficultyLevel}</span>
                                        <span class="blue-rec fw-semibold py-1">${Type}</span>`;
}

function displayNameAndDescription(recipeNameAndDescription) {
  var mealNameAndDescription = document.getElementById(
    "mealNameAndDescription",
  );
  var nameProperty = recipeNameAndDescription.recipeName;
  var descriptionProperty = recipeNameAndDescription.recipeDescription;
  mealNameAndDescription.innerHTML = "";
  mealNameAndDescription.innerHTML += `<h3 class="meal-name fw-bold">${nameProperty}</h3>
                                <p class="meal-description m-0">${descriptionProperty}</p>`;
}

function displayRecipeWarning(recipeWarning) {
  var warning = document.getElementById("recipeContainer");
  if (recipeWarning.hasWarning) {
    warning.innerHTML = `<div class="warning-red-rectangle p-3 mb-4 rounded-3">
                                    <div class="warning-icon-text d-flex align-items-center">
                                        <i class="fa-solid fa-triangle-exclamation"></i>
                                        <div class="warning-text">
                                            <p class="red-text1 fs-6 fw-semibold lh-base m-0">Extended Preparation Time</p>
                                            <p class="red-text2 m-0">This recipe requires more than 45 minutes to prepare. Plan accordingly!</p>
                                        </div>
                                    </div>
                                </div>`;
  } else {
    warning.innerHTML = "";
  }
}

function displayIngredients(recipeIngredients) {
  var ingredientsList = document.getElementById("ingredientsList");
  ingredientsList.innerHTML = "";
  for (var i = 0; i < recipeIngredients.length; ++i) {
    var Currentingredients = recipeIngredients[i];
    ingredientsList.innerHTML += `<li class="ingredients-li d-flex align-items-start">
             <div class="ingredients-number fw-bold d-flex justify-content-center align-items-center flex-shrink-0 rounded-circle">${i + 1}</div>
            <span>${Currentingredients}</span>
        </li>`;
  }
}

function displayInstructions(recipeInstructions) {
  var instructionsHTMLList = document.getElementById("instructions-tab-pane");
  instructionsHTMLList.innerHTML = "";
  for (var i = 0; i < recipeInstructions.length; ++i) {
    var currentInstruction = recipeInstructions[i];
    instructionsHTMLList.innerHTML += `<div class="instruction-number-and-text mb-4 d-flex align-items-start">
            <div class="step-number me-3 fw-bold rounded-4 d-flex justify-content-center align-items-center flex-shrink-0">${i + 1}</div>
                <div class="step-text pt-2">
                    <p class="step-text-p m-0">${currentInstruction}</p>
                </div>
        </div>`;
  }
}

function displayNutritions(recipeNutritions) {
  var caloriesOfMeal = document.getElementById("caloriesId");
  var proteinOfMeal = document.getElementById("proteinId");
  var carbohydratesOfMeal = document.getElementById("carbohydratesId");
  var fatOfMeal = document.getElementById("fatId");
  var fiberOfMeal = document.getElementById("fiberId");
  var sodiumOfMeal = document.getElementById("sodiumId");

  var nutritionCalories = recipeNutritions.calories;
  var nutritionProtein = recipeNutritions.protein;
  var nutritionCarbohydrates = recipeNutritions.carbohydrates;
  var nutritionFat = recipeNutritions.fat;
  var nutritionFiber = recipeNutritions.fiber;
  var nutritionSodium = recipeNutritions.sodium;

  caloriesOfMeal.innerHTML = `${nutritionCalories} kcal`;
  proteinOfMeal.innerHTML = `${nutritionProtein}g`;
  carbohydratesOfMeal.innerHTML = `${nutritionCarbohydrates}g`;
  fatOfMeal.innerHTML = `${nutritionFat}g`;
  fiberOfMeal.innerHTML = `${nutritionFiber}g`;
  sodiumOfMeal.innerHTML = `${nutritionSodium}mg`;
}

function displayChefsTips(recipeChefsTips) {
  var chefsTips = document.getElementById("chefsTipContent");
  chefsTips.innerHTML = "";
  for (var i = 0; i < recipeChefsTips.length; ++i) {
    var currentChefsTips = recipeChefsTips[i];
    chefsTips.innerHTML += `<div class="tip-one p-3 mb-3 d-flex align-items-start">
                                <i class="fa-solid fa-circle-check mt-1"></i>
                                <p class="m-0">${currentChefsTips}</p>
                            </div>`;
  }
}

function getRandomIndex(arrayLength) {
  var randomIndex = Math.floor(Math.random() * arrayLength);
  return randomIndex;
}

function showRandomRecipe() {
  var randomIndex = getRandomIndex(recipes.length);
  var randomRecipe = recipes[randomIndex];

  displayAllImageContent(randomRecipe);
  displayLevelOfDifficultyAndType(randomRecipe);
  displayNameAndDescription(randomRecipe);
  displayRecipeWarning(randomRecipe);

  var ingredientsFullList = randomRecipe.ingredients;
  displayIngredients(ingredientsFullList);

  var instructionsFullList = randomRecipe.instructions;
  displayInstructions(instructionsFullList);

  var ChefsTipsFullList = randomRecipe.chefsTips;
  displayChefsTips(ChefsTipsFullList);

  var nutritionFullObj = randomRecipe.nutrition;
  displayNutritions(nutritionFullObj);
}
showRandomRecipe();