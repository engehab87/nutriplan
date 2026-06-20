import { UserProfile, NutritionCalculations, FitnessGoal, ActivityLevel } from '@/types';

export const calculateBMI = (weightKg: number, heightCm: number): number => {
  const heightM = heightCm / 100;
  return Math.round((weightKg / (heightM * heightM)) * 10) / 10;
};

export const getBMICategory = (bmi: number): 'underweight' | 'normal' | 'overweight' | 'obese' => {
  if (bmi < 18.5) return 'underweight';
  if (bmi < 25) return 'normal';
  if (bmi < 30) return 'overweight';
  return 'obese';
};

export const calculateBMR = (profile: UserProfile): number => {
  const weightKg = profile.weightUnit === 'lbs' ? profile.weight * 0.453592 : profile.weight;
  const heightCm = profile.heightUnit === 'ft' ? profile.height * 30.48 : profile.height;
  
  if (profile.gender === 'male') {
    return Math.round(10 * weightKg + 6.25 * heightCm - 5 * profile.age + 5);
  } else {
    return Math.round(10 * weightKg + 6.25 * heightCm - 5 * profile.age - 161);
  }
};

const activityMultipliers: Record<string, number> = {
  sedentary: 1.2,
  lightly_active: 1.375,
  moderately_active: 1.55,
  very_active: 1.725,
  athlete: 1.9,
};

export const calculateTDEE = (bmr: number, activityLevel: ActivityLevel): number => {
  return Math.round(bmr * activityMultipliers[activityLevel]);
};

const goalCalorieAdjustments: Record<string, number> = {
  weight_loss: -500,
  weight_maintenance: 0,
  muscle_gain: 300,
  fat_loss: -300,
};

export const calculateTargetCalories = (tdee: number, goal: string): number => {
  return Math.max(1200, tdee + goalCalorieAdjustments[goal]);
};

export const calculateMacros = (targetCalories: number, goal: FitnessGoal): { protein: number; carbs: number; fats: number } => {
  let proteinRatio: number;
  let carbRatio: number;
  let fatRatio: number;

  switch (goal) {
    case 'muscle_gain':
      proteinRatio = 0.3;
      carbRatio = 0.5;
      fatRatio = 0.2;
      break;
    case 'keto':
      proteinRatio = 0.25;
      carbRatio = 0.05;
      fatRatio = 0.7;
      break;
    case 'low_carb':
      proteinRatio = 0.35;
      carbRatio = 0.2;
      fatRatio = 0.45;
      break;
    case 'vegan':
    case 'vegetarian':
      proteinRatio = 0.2;
      carbRatio = 0.6;
      fatRatio = 0.2;
      break;
    default:
      proteinRatio = 0.3;
      carbRatio = 0.4;
      fatRatio = 0.3;
  }

  const proteinCalories = targetCalories * proteinRatio;
  const carbCalories = targetCalories * carbRatio;
  const fatCalories = targetCalories * fatRatio;

  return {
    protein: Math.round(proteinCalories / 4),
    carbs: Math.round(carbCalories / 4),
    fats: Math.round(fatCalories / 9),
  };
};

export const calculateWaterIntake = (weightKg: number): number => {
  return Math.round(weightKg * 35);
};

export const calculateNutrition = (profile: UserProfile): NutritionCalculations => {
  const weightKg = profile.weightUnit === 'lbs' ? profile.weight * 0.453592 : profile.weight;
  const heightCm = profile.heightUnit === 'ft' ? profile.height * 30.48 : profile.height;
  
  const bmi = calculateBMI(weightKg, heightCm);
  const bmiCategory = getBMICategory(bmi);
  const bmr = calculateBMR(profile);
  const tdee = calculateTDEE(bmr, profile.activityLevel);
  const targetCalories = calculateTargetCalories(tdee, profile.goal);
  const macros = calculateMacros(targetCalories, profile.goal);
  const waterIntake = calculateWaterIntake(weightKg);

  return {
    bmi,
    bmiCategory,
    bmr,
    tdee,
    targetCalories,
    macros,
    waterIntake,
  };
};