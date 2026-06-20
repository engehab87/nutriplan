import { UserProfile, WeeklyMealPlan } from '@/types';

const USER_PROFILES_KEY = 'nutriplan-user-profiles';
const ACTIVE_PROFILE_KEY = 'nutriplan-active-profile';
const MEAL_PLANS_KEY = 'nutriplan-meal-plans';

export const saveUserProfile = (profile: UserProfile): void => {
  const profiles = getUserProfiles();
  const existingIndex = profiles.findIndex(p => p.id === profile.id);
  
  if (existingIndex >= 0) {
    profiles[existingIndex] = profile;
  } else {
    profiles.push(profile);
  }
  
  localStorage.setItem(USER_PROFILES_KEY, JSON.stringify(profiles));
  localStorage.setItem(ACTIVE_PROFILE_KEY, profile.id);
};

export const getUserProfiles = (): UserProfile[] => {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(USER_PROFILES_KEY);
  return data ? JSON.parse(data) : [];
};

export const deleteUserProfile = (id: string): void => {
  const profiles = getUserProfiles().filter(p => p.id !== id);
  localStorage.setItem(USER_PROFILES_KEY, JSON.stringify(profiles));
  
  if (getActiveProfileId() === id) {
    localStorage.removeItem(ACTIVE_PROFILE_KEY);
  }
};

export const getActiveProfile = (): UserProfile | null => {
  if (typeof window === 'undefined') return null;
  const id = localStorage.getItem(ACTIVE_PROFILE_KEY);
  if (!id) return null;
  
  const profiles = getUserProfiles();
  return profiles.find(p => p.id === id) || null;
};

export const setActiveProfile = (id: string): void => {
  localStorage.setItem(ACTIVE_PROFILE_KEY, id);
};

export const getActiveProfileId = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(ACTIVE_PROFILE_KEY);
};

export const saveMealPlan = (mealPlan: WeeklyMealPlan): void => {
  const plans = getMealPlans();
  const existingIndex = plans.findIndex(p => p.id === mealPlan.id);
  
  if (existingIndex >= 0) {
    plans[existingIndex] = mealPlan;
  } else {
    plans.push(mealPlan);
  }
  
  localStorage.setItem(MEAL_PLANS_KEY, JSON.stringify(plans));
};

export const getMealPlans = (): WeeklyMealPlan[] => {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(MEAL_PLANS_KEY);
  return data ? JSON.parse(data) : [];
};

export const getMealPlanById = (id: string): WeeklyMealPlan | null => {
  const plans = getMealPlans();
  return plans.find(p => p.id === id) || null;
};

export const deleteMealPlan = (id: string): void => {
  const plans = getMealPlans().filter(p => p.id !== id);
  localStorage.setItem(MEAL_PLANS_KEY, JSON.stringify(plans));
};

export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 9);
};