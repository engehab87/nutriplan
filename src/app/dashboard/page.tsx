'use client';

import { useEffect, useState } from 'react';
import { UserProfile, NutritionCalculations, DailyMealPlan, ShoppingListItem } from '@/types';
import { getActiveProfile } from '@/lib/storage';
import { calculateNutrition } from '@/lib/nutritionCalculator';
import { generateWeeklyMealPlan, generateShoppingList } from '@/lib/mealGenerator';
import { NutritionCharts } from '@/components/NutritionCharts';
import { MealPlanView } from '@/components/MealPlanView';
import Link from 'next/link';

export default function DashboardPage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [calculations, setCalculations] = useState<NutritionCalculations | null>(null);
  const [weeklyPlan, setWeeklyPlan] = useState<DailyMealPlan[]>([]);
  const [shoppingList, setShoppingList] = useState<ShoppingListItem[]>([]);
  const [activeView, setActiveView] = useState<'dashboard' | 'mealplan' | 'shopping'>('dashboard');

  useEffect(() => {
    const activeProfile = getActiveProfile();
    if (activeProfile) {
      setProfile(activeProfile);
      const nutrition = calculateNutrition(activeProfile);
      setCalculations(nutrition);
      
      const plan = generateWeeklyMealPlan(activeProfile);
      setWeeklyPlan(plan);
      setShoppingList(generateShoppingList(plan));
    } else {
      window.location.href = '/profile';
    }
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head><title>NutriPlan AI - Meal Plan</title></head>
          <body>${document.getElementById('meal-plan-content')?.innerHTML}</body>
        </html>
      `);
      printWindow.print();
    }
  };

  if (!profile || !calculations) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <p className="text-gray-600 dark:text-gray-300">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">N</span>
            </div>
            <span className="font-bold text-xl text-gray-900 dark:text-white">NutriPlan AI</span>
          </Link>
          <div className="flex items-center space-x-4">
            <nav className="flex space-x-2">
              <button
                onClick={() => setActiveView('dashboard')}
                className={`px-4 py-2 rounded-lg ${activeView === 'dashboard' ? 'bg-primary-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
              >
                Dashboard
              </button>
              <button
                onClick={() => setActiveView('mealplan')}
                className={`px-4 py-2 rounded-lg ${activeView === 'mealplan' ? 'bg-primary-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
              >
                Meal Plan
              </button>
              <button
                onClick={() => setActiveView('shopping')}
                className={`px-4 py-2 rounded-lg ${activeView === 'shopping' ? 'bg-primary-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
              >
                Shopping List
              </button>
            </nav>
            <button
              onClick={() => document.documentElement.classList.toggle('dark')}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700"
            >
              🌙
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {activeView === 'dashboard' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <BMIIndicator bmi={calculations.bmi} category={calculations.bmiCategory} />
              <CalorieCard target={calculations.targetCalories} tdee={calculations.tdee} />
              <WaterCard intake={calculations.waterIntake} />
            </div>

            <NutritionCharts macros={calculations.macros} targetCalories={calculations.targetCalories} />

            <MacroBreakdown macros={calculations.macros} dailyTotal={weeklyPlan[0]?.dailyTotal} />
          </div>
        )}

        {activeView === 'mealplan' && (
          <MealPlanView 
            weeklyPlan={weeklyPlan} 
            onPrint={handlePrint} 
            onDownload={handleDownloadPDF}
          />
        )}

        {activeView === 'shopping' && (
          <ShoppingListView shoppingList={shoppingList} />
        )}
      </main>
    </div>
  );
}

function BMIIndicator({ bmi, category }: { bmi: number; category: string }) {
  const categoryColors = {
    underweight: 'text-warning-500',
    normal: 'text-success-500',
    overweight: 'text-warning-500',
    obese: 'text-danger-500',
  };

  return (
    <div className="card">
      <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">BMI Status</h3>
      <div className="text-center">
        <p className="text-5xl font-bold text-primary-600 mb-2">{bmi}</p>
        <p className={`text-lg font-medium capitalize ${categoryColors[category as keyof typeof categoryColors]}`}>
          {category}
        </p>
        <div className="mt-4 h-3 bg-gray-200 rounded-full overflow-hidden">
          <div className="flex h-full">
            <div className="w-[40%] bg-warning-400" />
            <div className="flex-1 bg-success-500" />
            <div className="flex-1 bg-warning-400" />
            <div className="w-[20%] bg-danger-500" />
          </div>
        </div>
      </div>
    </div>
  );
}

function CalorieCard({ target, tdee }: { target: number; tdee: number }) {
  return (
    <div className="card">
      <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Daily Calories</h3>
      <div className="text-center">
        <p className="text-5xl font-bold text-primary-600 mb-2">{target}</p>
        <p className="text-gray-600 dark:text-gray-300">Target Calories</p>
        <p className="text-sm text-gray-500 mt-2">TDEE: {tdee}</p>
      </div>
    </div>
  );
}

function WaterCard({ intake }: { intake: number }) {
  return (
    <div className="card">
      <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Water Intake</h3>
      <div className="text-center">
        <p className="text-5xl font-bold text-secondary-500 mb-2">{intake}ml</p>
        <p className="text-gray-600 dark:text-gray-300">Daily Recommendation</p>
        <div className="mt-4 flex justify-center">
          <div className="flex space-x-1">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="w-4 h-6 border-2 border-secondary-300 rounded-b-lg" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function MacroBreakdown({ macros, dailyTotal }: { macros: { protein: number; carbs: number; fats: number }; dailyTotal?: { protein: number; carbs: number; fats: number } }) {
  return (
    <div className="card">
      <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Macronutrient Targets</h3>
      <div className="space-y-4">
        <MacroBar name="Protein" grams={macros.protein} daily={dailyTotal?.protein} color="bg-primary-500" />
        <MacroBar name="Carbs" grams={macros.carbs} daily={dailyTotal?.carbs} color="bg-amber-500" />
        <MacroBar name="Fats" grams={macros.fats} daily={dailyTotal?.fats} color="bg-rose-500" />
      </div>
    </div>
  );
}

function MacroBar({ name, grams, daily, color }: { name: string; grams: number; daily?: number; color: string }) {
  const percentage = daily ? Math.round((daily / grams) * 100) : 0;
  
  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className="text-gray-700 dark:text-gray-300">{name}</span>
        <span className="text-gray-600 dark:text-gray-400">{grams}g</span>
      </div>
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div className={`${color} h-full rounded-full transition-all`} style={{ width: `${Math.min(percentage, 100)}%` }} />
      </div>
    </div>
  );
}

function ShoppingListView({ shoppingList }: { shoppingList: ShoppingListItem[] }) {
  const categories = [...new Set(shoppingList.map(item => item.category))];
  
  return (
    <div className="card">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Shopping List</h2>
      <div className="space-y-6">
        {categories.map(category => (
          <div key={category}>
            <h3 className="font-semibold text-primary-600 mb-2 capitalize">{category}</h3>
            <ul className="space-y-2 pl-4">
              {shoppingList
                .filter(item => item.category === category)
                .map(item => (
                  <li key={item.name} className="flex items-center">
                    <span className="w-2 h-2 bg-primary-500 rounded-full mr-2" />
                    <span className="text-gray-700 dark:text-gray-300">{item.name} - {item.quantity}</span>
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}