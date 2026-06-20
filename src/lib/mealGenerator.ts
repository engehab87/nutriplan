import { FoodItem, Meal, DailyMealPlan, UserProfile, ShoppingListItem, DietaryPreference, Allergy } from '@/types';

const foodDatabase: FoodItem[] = [
  // Proteins
  { id: 'chicken_breast', name: 'Grilled Chicken Breast', portion: '150g', calories: 165, protein: 31, carbs: 0, fats: 3.6 },
  { id: 'salmon', name: 'Baked Salmon', portion: '150g', calories: 240, protein: 28, carbs: 0, fats: 16 },
  { id: 'tofu', name: 'Firm Tofu', portion: '150g', calories: 110, protein: 14, carbs: 2, fats: 6.5 },
  { id: 'greek_yogurt', name: 'Greek Yogurt', portion: '200g', calories: 110, protein: 10, carbs: 5, fats: 5 },
  { id: 'eggs', name: 'Scrambled Eggs', portion: '2 large', calories: 140, protein: 12, carbs: 2, fats: 10 },
  { id: 'lentils', name: 'Cooked Lentils', portion: '1 cup', calories: 230, protein: 18, carbs: 40, fats: 1 },
  { id: 'black_beans', name: 'Black Beans', portion: '1 cup', calories: 227, protein: 15, carbs: 41, fats: 0.9 },
  { id: 'protein_shake', name: 'Protein Shake', portion: '1 serving', calories: 120, protein: 25, carbs: 3, fats: 2 },
  
  // Carbs
  { id: 'brown_rice', name: 'Brown Rice', portion: '1 cup', calories: 215, protein: 5, carbs: 45, fats: 1.8 },
  { id: 'quinoa', name: 'Quinoa', portion: '1 cup', calories: 222, protein: 8, carbs: 39, fats: 3.6 },
  { id: 'sweet_potato', name: 'Sweet Potato', portion: '1 medium', calories: 112, protein: 2, carbs: 26, fats: 0.1 },
  { id: 'oats', name: 'Rolled Oats', portion: '1 cup', calories: 154, protein: 6, carbs: 27, fats: 3 },
  { id: 'avocado', name: 'Avocado', portion: '1 medium', calories: 240, protein: 3, carbs: 12, fats: 22 },
  { id: 'nuts_mix', name: 'Mixed Nuts', portion: '1/4 cup', calories: 172, protein: 5, carbs: 6, fats: 15 },
  { id: 'berries', name: 'Mixed Berries', portion: '1 cup', calories: 85, protein: 1, carbs: 21, fats: 0.5 },
  { id: 'banana', name: 'Banana', portion: '1 medium', calories: 105, protein: 1, carbs: 27, fats: 0.4 },
  
  // Vegetables
  { id: 'broccoli', name: 'Broccoli', portion: '1 cup', calories: 25, protein: 2.5, carbs: 5, fats: 0.4 },
  { id: 'spinach', name: 'Spinach', portion: '1 cup', calories: 7, protein: 0.9, carbs: 1.1, fats: 0.1 },
  { id: 'mixed_veggies', name: 'Mixed Vegetables', portion: '1 cup', calories: 20, protein: 1, carbs: 4, fats: 0.2 },
  
  // Fruits
  { id: 'apple', name: 'Apple', portion: '1 medium', calories: 95, protein: 0.5, carbs: 25, fats: 0.3 },
  { id: 'orange', name: 'Orange', portion: '1 medium', calories: 62, protein: 1.2, carbs: 15.4, fats: 0.2 },
  
  // Grains & Bread
  { id: 'whole_wheat_bread', name: 'Whole Wheat Bread', portion: '2 slices', calories: 140, protein: 8, carbs: 26, fats: 2 },
  
  // Healthy Fats
  { id: 'olive_oil', name: 'Olive Oil', portion: '1 tbsp', calories: 119, protein: 0, carbs: 0, fats: 13.5 },
  { id: 'chia_seeds', name: 'Chia Seeds', portion: '1 tbsp', calories: 60, protein: 2, carbs: 5, fats: 4 },
  
  // Dairy alternatives
  { id: 'almond_milk', name: 'Almond Milk', portion: '1 cup', calories: 30, protein: 1, carbs: 1, fats: 2.5 },
  { id: 'coconut_milk', name: 'Coconut Milk', portion: '1/4 cup', calories: 120, protein: 1, carbs: 2, fats: 12 },
];

const mealTemplates: Record<DietaryPreference, Meal[]> = {
  standard: [
    {
      id: 'breakfast_1',
      name: 'Classic Breakfast',
      items: [foodDatabase[7], foodDatabase[4], foodDatabase[16]],
      totalCalories: 305,
      totalProtein: 28,
      totalCarbs: 30,
      totalFats: 15.5,
    },
    {
      id: 'lunch_1',
      name: 'Protein Bowl',
      items: [foodDatabase[0], foodDatabase[5], foodDatabase[12], foodDatabase[13]],
      totalCalories: 477,
      totalProtein: 41,
      totalCarbs: 50,
      totalFats: 20.2,
    },
    {
      id: 'dinner_1',
      name: 'Salmon Plate',
      items: [foodDatabase[1], foodDatabase[6], foodDatabase[11], foodDatabase[12]],
      totalCalories: 592,
      totalProtein: 31,
      totalCarbs: 71,
      totalFats: 18.2,
    },
  ],
  vegetarian: [
    {
      id: 'breakfast_2',
      name: 'Veggie Breakfast',
      items: [foodDatabase[14], foodDatabase[5], foodDatabase[4]],
      totalCalories: 294,
      totalProtein: 30,
      totalCarbs: 47,
      totalFats: 11.5,
    },
    {
      id: 'lunch_2',
      name: 'Lentil Bowl',
      items: [foodDatabase[5], foodDatabase[11], foodDatabase[12], foodDatabase[13]],
      totalCalories: 472,
      totalProtein: 26,
      totalCarbs: 90,
      totalFats: 19.5,
    },
    {
      id: 'dinner_2',
      name: 'Veggie Stir Fry',
      items: [foodDatabase[2], foodDatabase[12], foodDatabase[5]],
      totalCalories: 377,
      totalProtein: 28,
      totalCarbs: 46,
      totalFats: 7.5,
    },
  ],
  vegan: [
    {
      id: 'breakfast_3',
      name: 'Vegan Power Bowl',
      items: [foodDatabase[2], foodDatabase[14], foodDatabase[3]],
      totalCalories: 260,
      totalProtein: 24.5,
      totalCarbs: 23,
      totalFats: 8,
    },
    {
      id: 'lunch_3',
      name: 'Tofu Buddha Bowl',
      items: [foodDatabase[2], foodDatabase[5], foodDatabase[12], foodDatabase[13]],
      totalCalories: 467,
      totalProtein: 30,
      totalCarbs: 95,
      totalFats: 19.7,
    },
    {
      id: 'dinner_3',
      name: 'Plant Power Plate',
      items: [foodDatabase[5], foodDatabase[2], foodDatabase[15]],
      totalCalories: 375,
      totalProtein: 26,
      totalCarbs: 43,
      totalFats: 7.5,
    },
  ],
  keto: [
    {
      id: 'breakfast_4',
      name: 'Keto Breakfast',
      items: [foodDatabase[4], foodDatabase[16], foodDatabase[14]],
      totalCalories: 394,
      totalProtein: 15,
      totalCarbs: 27,
      totalFats: 29.9,
    },
    {
      id: 'lunch_4',
      name: 'Keto Salmon Bowl',
      items: [foodDatabase[1], foodDatabase[13], foodDatabase[16]],
      totalCalories: 475,
      totalProtein: 34,
      totalCarbs: 17,
      totalFats: 35.6,
    },
    {
      id: 'dinner_4',
      name: 'Keto Chicken Plate',
      items: [foodDatabase[0], foodDatabase[13], foodDatabase[15]],
      totalCalories: 412,
      totalProtein: 35,
      totalCarbs: 13,
      totalFats: 26.5,
    },
  ],
  mediterranean: [
    {
      id: 'breakfast_5',
      name: 'Mediterranean Morning',
      items: [foodDatabase[4], foodDatabase[15], foodDatabase[17]],
      totalCalories: 230,
      totalProtein: 12.9,
      totalCarbs: 16.4,
      totalFats: 14.8,
    },
    {
      id: 'lunch_5',
      name: 'Mediterranean Bowl',
      items: [foodDatabase[1], foodDatabase[5], foodDatabase[11], foodDatabase[12]],
      totalCalories: 490,
      totalProtein: 35.5,
      totalCarbs: 76,
      totalFats: 18.8,
    },
    {
      id: 'dinner_5',
      name: 'Mediterranean Dinner',
      items: [foodDatabase[0], foodDatabase[12], foodDatabase[13]],
      totalCalories: 385,
      totalProtein: 36,
      totalCarbs: 50,
      totalFats: 11.5,
    },
  ],
  low_carb: [
    {
      id: 'breakfast_6',
      name: 'Low Carb Breakfast',
      items: [foodDatabase[4], foodDatabase[15], foodDatabase[7]],
      totalCalories: 299,
      totalProtein: 27.9,
      totalCarbs: 7,
      totalFats: 19.9,
    },
    {
      id: 'lunch_6',
      name: 'Low Carb Lunch',
      items: [foodDatabase[0], foodDatabase[5], foodDatabase[12]],
      totalCalories: 447,
      totalProtein: 28.5,
      totalCarbs: 49,
      totalFats: 12.8,
    },
    {
      id: 'dinner_6',
      name: 'Low Carb Dinner',
      items: [foodDatabase[1], foodDatabase[12], foodDatabase[16]],
      totalCalories: 466,
      totalProtein: 32,
      totalCarbs: 17,
      totalFats: 33.8,
    },
  ],
};

const allergyRestrictedFoods: Record<Allergy, string[]> = {
  dairy: ['greek_yogurt', 'protein_shake'],
  gluten: ['whole_wheat_bread', 'oats'],
  nuts: ['nuts_mix', 'almond_milk'],
  shellfish: [],
};

export const generateMealPlan = (profile: UserProfile): DailyMealPlan => {
  const templates = mealTemplates[profile.dietaryPreference];
  const restrictedIds = new Set(profile.allergies.flatMap(a => allergyRestrictedFoods[a]));
  
  const days: DailyMealPlan[] = [];
  const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  
  for (let i = 0; i < 7; i++) {
    const breakfast = generateMeal('Breakfast', templates[0], restrictedIds);
    const morningSnack = generateMeal('Morning Snack', {
      id: `snack_${i}_1`,
      name: 'Morning Snack',
      items: [foodDatabase[17], foodDatabase[18]],
      totalCalories: 180,
      totalProtein: 1.5,
      totalCarbs: 42.4,
      totalFats: 0.8,
    }, restrictedIds);
    const lunch = generateMeal('Lunch', templates[1], restrictedIds);
    const afternoonSnack = generateMeal('Afternoon Snack', {
      id: `snack_${i}_2`,
      name: 'Afternoon Snack',
      items: [foodDatabase[19], foodDatabase[20]],
      totalCalories: 157,
      totalProtein: 1.7,
      totalCarbs: 40.4,
      totalFats: 0.5,
    }, restrictedIds);
    const dinner = generateMeal('Dinner', templates[2], restrictedIds);
    
    days.push({
      date: dayNames[i],
      meals: { breakfast, morningSnack, lunch, afternoonSnack, dinner },
      dailyTotal: {
        calories: breakfast.totalCalories + morningSnack.totalCalories + lunch.totalCalories + 
                  afternoonSnack.totalCalories + dinner.totalCalories,
        protein: breakfast.totalProtein + morningSnack.totalProtein + lunch.totalProtein + 
                 afternoonSnack.totalProtein + dinner.totalProtein,
        carbs: breakfast.totalCarbs + morningSnack.totalCarbs + lunch.totalCarbs + 
               afternoonSnack.totalCarbs + dinner.totalCarbs,
        fats: breakfast.totalFats + morningSnack.totalFats + lunch.totalFats + 
              afternoonSnack.totalFats + dinner.totalFats,
      },
    });
  }
  
  return days[0];
};

const generateMeal = (name: string, template: Meal, restrictedIds: Set<string>): Meal => {
  const filteredItems = template.items.filter(item => !restrictedIds.has(item.id));
  const totalCalories = filteredItems.reduce((sum, item) => sum + item.calories, 0);
  const totalProtein = filteredItems.reduce((sum, item) => sum + item.protein, 0);
  const totalCarbs = filteredItems.reduce((sum, item) => sum + item.carbs, 0);
  const totalFats = filteredItems.reduce((sum, item) => sum + item.fats, 0);
  
  return {
    id: template.id,
    name,
    items: filteredItems,
    totalCalories,
    totalProtein,
    totalCarbs,
    totalFats,
  };
};

export const generateWeeklyMealPlan = (profile: UserProfile): DailyMealPlan[] => {
  const days: DailyMealPlan[] = [];
  const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const templates = mealTemplates[profile.dietaryPreference];
  const restrictedIds = new Set(profile.allergies.flatMap(a => allergyRestrictedFoods[a]));
  
  for (let i = 0; i < 7; i++) {
    const dayMeals = generateDayMeals(templates, restrictedIds, i);
    
    days.push({
      date: dayNames[i],
      meals: dayMeals,
      dailyTotal: {
        calories: dayMeals.breakfast.totalCalories + dayMeals.morningSnack.totalCalories + dayMeals.lunch.totalCalories + 
                  dayMeals.afternoonSnack.totalCalories + dayMeals.dinner.totalCalories,
        protein: dayMeals.breakfast.totalProtein + dayMeals.morningSnack.totalProtein + dayMeals.lunch.totalProtein + 
                 dayMeals.afternoonSnack.totalProtein + dayMeals.dinner.totalProtein,
        carbs: dayMeals.breakfast.totalCarbs + dayMeals.morningSnack.totalCarbs + dayMeals.lunch.totalCarbs + 
               dayMeals.afternoonSnack.totalCarbs + dayMeals.dinner.totalCarbs,
        fats: dayMeals.breakfast.totalFats + dayMeals.morningSnack.totalFats + dayMeals.lunch.totalFats + 
              dayMeals.afternoonSnack.totalFats + dayMeals.dinner.totalFats,
      },
    });
  }
  
  return days;
};

const generateDayMeals = (templates: Meal[], restrictedIds: Set<string>, dayIndex: number) => {
  const snackVariations = [
    { id: 'snack_a', name: 'Fruit & Nuts', items: [foodDatabase[17], foodDatabase[19]] },
    { id: 'snack_b', name: 'Yogurt & Berries', items: [foodDatabase[4], foodDatabase[18]] },
  ];
  
  const selectedSnack = snackVariations[dayIndex % 2];
  const snackMeal = createMealFromItems('Snack', selectedSnack.items.filter(i => !restrictedIds.has(i.id)));
  
  return {
    breakfast: generateMeal('Breakfast', templates[0], restrictedIds),
    morningSnack: snackMeal,
    lunch: generateMeal('Lunch', templates[1], restrictedIds),
    afternoonSnack: createMealFromItems('Afternoon Snack', [foodDatabase[19], foodDatabase[20]].filter(i => !restrictedIds.has(i.id))),
    dinner: generateMeal('Dinner', templates[2], restrictedIds),
  };
};

const createMealFromItems = (name: string, items: FoodItem[]): Meal => {
  return {
    id: `generated_${Date.now()}`,
    name,
    items,
    totalCalories: items.reduce((s, i) => s + i.calories, 0),
    totalProtein: items.reduce((s, i) => s + i.protein, 0),
    totalCarbs: items.reduce((s, i) => s + i.carbs, 0),
    totalFats: items.reduce((s, i) => s + i.fats, 0),
  };
};

export const generateShoppingList = (weeklyPlan: DailyMealPlan[]): ShoppingListItem[] => {
  const itemsMap = new Map<string, ShoppingListItem>();
  
  weeklyPlan.forEach(day => {
    Object.values(day.meals).forEach(meal => {
      meal.items.forEach(item => {
        const category = categorizeFood(item.name);
        const key = `${item.name}-${category}`;
        
        if (itemsMap.has(key)) {
          const existing = itemsMap.get(key)!;
          itemsMap.set(key, {
            ...existing,
            quantity: combineQuantities(existing.quantity, item.portion),
          });
        } else {
          itemsMap.set(key, {
            name: item.name,
            category,
            quantity: item.portion,
          });
        }
      });
    });
  });
  
  return Array.from(itemsMap.values()).sort((a, b) => a.category.localeCompare(b.category));
};

const categorizeFood = (name: string): string => {
  const lower = name.toLowerCase();
  if (lower.includes('chicken') || lower.includes('salmon') || lower.includes('egg') || lower.includes('tofu')) {
    return 'Proteins';
  }
  if (lower.includes('rice') || lower.includes('quinoa') || lower.includes('potato') || lower.includes('oats') || lower.includes('bread')) {
    return 'Grains';
  }
  if (lower.includes('berry') || lower.includes('apple') || lower.includes('orange') || lower.includes('banana')) {
    return 'Fruits';
  }
  if (lower.includes('broccoli') || lower.includes('spinach') || lower.includes('veggie')) {
    return 'Vegetables';
  }
  if (lower.includes('nuts') || lower.includes('avocado') || lower.includes('oil') || lower.includes('seeds')) {
    return 'Healthy Fats';
  }
  if (lower.includes('yogurt') || lower.includes('milk')) {
    return 'Dairy';
  }
  return 'Other';
};

const combineQuantities = (q1: string, q2: string): string => {
  return `${q1}, ${q2}`;
};