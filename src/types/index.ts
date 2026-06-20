export type Gender = 'male' | 'female' | 'other';

export type ActivityLevel = 'sedentary' | 'lightly_active' | 'moderately_active' | 'very_active' | 'athlete';

export type FitnessGoal = 'weight_loss' | 'weight_maintenance' | 'muscle_gain' | 'fat_loss';

export type DietaryPreference = 'standard' | 'vegetarian' | 'vegan' | 'keto' | 'mediterranean' | 'low_carb';

export type Allergy = 'dairy' | 'gluten' | 'nuts' | 'shellfish';

export interface UserProfile {
  id: string;
  name: string;
  height: number;
  heightUnit: 'cm' | 'ft';
  weight: number;
  weightUnit: 'kg' | 'lbs';
  age: number;
  gender: Gender;
  activityLevel: ActivityLevel;
  goal: FitnessGoal;
  dietaryPreference: DietaryPreference;
  allergies: Allergy[];
  customRestrictions: string[];
  createdAt: string;
}

export interface NutritionCalculations {
  bmi: number;
  bmiCategory: 'underweight' | 'normal' | 'overweight' | 'obese';
  bmr: number;
  tdee: number;
  targetCalories: number;
  macros: {
    protein: number;
    carbs: number;
    fats: number;
  };
  waterIntake: number;
}

export interface FoodItem {
  id: string;
  name: string;
  portion: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
}

export interface Meal {
  id: string;
  name: string;
  items: FoodItem[];
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFats: number;
}

export interface DailyMealPlan {
  date: string;
  meals: {
    breakfast: Meal;
    morningSnack: Meal;
    lunch: Meal;
    afternoonSnack: Meal;
    dinner: Meal;
  };
  dailyTotal: {
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
  };
}

export interface WeeklyMealPlan {
  id: string;
  userId: string;
  days: DailyMealPlan[];
  createdAt: string;
}

export interface ShoppingListItem {
  name: string;
  category: string;
  quantity: string;
}