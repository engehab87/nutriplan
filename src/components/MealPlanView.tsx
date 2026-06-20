'use client';

import { DailyMealPlan, Meal } from '@/types';
import { useState } from 'react';

interface MealPlanViewProps {
  weeklyPlan: DailyMealPlan[];
  onPrint: () => void;
  onDownload: () => void;
}

export function MealPlanView({ weeklyPlan, onPrint, onDownload }: MealPlanViewProps) {
  const [selectedDay, setSelectedDay] = useState(0);

  const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  return (
    <div id="meal-plan-content" className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Weekly Meal Plan</h2>
        <div className="flex space-x-2">
          <button onClick={onPrint} className="btn-secondary">
            🖨️ Print
          </button>
          <button onClick={onDownload} className="btn-primary">
            📥 Download PDF
          </button>
        </div>
      </div>

      <div className="flex space-x-2 overflow-x-auto pb-2">
        {dayNames.map((day, index) => (
          <button
            key={day}
            onClick={() => setSelectedDay(index)}
            className={`px-4 py-2 rounded-lg whitespace-nowrap ${
              selectedDay === index
                ? 'bg-primary-500 text-white'
                : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            {day}
          </button>
        ))}
      </div>

      {weeklyPlan[selectedDay] && (
        <DayMealPlan day={weeklyPlan[selectedDay]} dayName={dayNames[selectedDay]} />
      )}

      <WeeklySummary weeklyPlan={weeklyPlan} />
    </div>
  );
}

function DayMealPlan({ day, dayName }: { day: DailyMealPlan; dayName: string }) {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{dayName}</h3>

      <div className="grid gap-4">
        <MealCard meal={day.meals.breakfast} mealType="breakfast" />
        <MealCard meal={day.meals.morningSnack} mealType="morningSnack" />
        <MealCard meal={day.meals.lunch} mealType="lunch" />
        <MealCard meal={day.meals.afternoonSnack} mealType="afternoonSnack" />
        <MealCard meal={day.meals.dinner} mealType="dinner" />
      </div>

      <DailyTotal total={day.dailyTotal} />
    </div>
  );
}

function MealCard({ meal, mealType }: { meal: Meal; mealType: string }) {
  const mealIcons: Record<string, string> = {
    breakfast: '🍳',
    morningSnack: '🍎',
    lunch: '🥗',
    afternoonSnack: '🥜',
    dinner: '🍽️',
  };

  return (
    <div className="card">
      <div className="flex items-center mb-3">
        <span className="text-2xl mr-2">{mealIcons[mealType]}</span>
        <h4 className="font-semibold text-lg text-gray-900 dark:text-white">{meal.name}</h4>
      </div>

<div className="space-y-2 mb-4">
         {meal.items.map((item) => (
           <div key={item.id} className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-700 last:border-0">
             <div>
               <p className="font-medium text-gray-800 dark:text-gray-200">{item.name}</p>
               <p className="text-sm text-gray-500">{item.portion}</p>
             </div>
             <div className="text-right text-sm">
               <p className="text-gray-600 dark:text-gray-300">{item.calories} kcal</p>
               <p className="text-gray-500">P: {item.protein}g • C: {item.carbs}g • F: {item.fats}g</p>
             </div>
           </div>
         ))}
       </div>

      <div className="flex justify-between text-sm pt-2 border-t border-gray-200 dark:border-gray-600">
        <span className="text-gray-600 dark:text-gray-300">Total</span>
        <span className="font-semibold text-gray-900 dark:text-white">
          {meal.totalCalories} kcal
        </span>
      </div>
    </div>
  );
}

function DailyTotal({ total }: { total: { calories: number; protein: number; carbs: number; fats: number } }) {
  return (
    <div className="card bg-primary-50 dark:bg-primary-900/20">
      <h4 className="font-semibold text-lg text-gray-900 dark:text-white mb-3">Daily Totals</h4>
      <div className="grid grid-cols-4 gap-4 text-center">
        <div>
          <p className="text-2xl font-bold text-primary-600">{total.calories}</p>
          <p className="text-sm text-gray-600 dark:text-gray-300">Calories</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-green-600">{total.protein}g</p>
          <p className="text-sm text-gray-600 dark:text-gray-300">Protein</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-amber-600">{total.carbs}g</p>
          <p className="text-sm text-gray-600 dark:text-gray-300">Carbs</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-rose-600">{total.fats}g</p>
          <p className="text-sm text-gray-600 dark:text-gray-300">Fats</p>
        </div>
      </div>
    </div>
  );
}

function WeeklySummary({ weeklyPlan }: { weeklyPlan: DailyMealPlan[] }) {
  const weeklyTotal = weeklyPlan.reduce(
    (acc, day) => ({
      calories: acc.calories + day.dailyTotal.calories,
      protein: acc.protein + day.dailyTotal.protein,
      carbs: acc.carbs + day.dailyTotal.carbs,
      fats: acc.fats + day.dailyTotal.fats,
    }),
    { calories: 0, protein: 0, carbs: 0, fats: 0 }
  );

  const avgDaily = {
    calories: Math.round(weeklyTotal.calories / 7),
    protein: Math.round(weeklyTotal.protein / 7),
    carbs: Math.round(weeklyTotal.carbs / 7),
    fats: Math.round(weeklyTotal.fats / 7),
  };

  return (
    <div className="card">
      <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Weekly Summary</h3>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h4 className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">Total Weekly</h4>
          <div className="space-y-2">
            <p className="text-gray-800 dark:text-gray-200">Calories: {weeklyTotal.calories.toLocaleString()}</p>
            <p className="text-gray-800 dark:text-gray-200">Protein: {weeklyTotal.protein}g</p>
            <p className="text-gray-800 dark:text-gray-200">Carbs: {weeklyTotal.carbs}g</p>
            <p className="text-gray-800 dark:text-gray-200">Fats: {weeklyTotal.fats}g</p>
          </div>
        </div>
        <div>
          <h4 className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">Daily Average</h4>
          <div className="space-y-2">
            <p className="text-gray-800 dark:text-gray-200">Calories: {avgDaily.calories}</p>
            <p className="text-gray-800 dark:text-gray-200">Protein: {avgDaily.protein}g</p>
            <p className="text-gray-800 dark:text-gray-200">Carbs: {avgDaily.carbs}g</p>
            <p className="text-gray-800 dark:text-gray-200">Fats: {avgDaily.fats}g</p>
          </div>
        </div>
      </div>
    </div>
  );
}