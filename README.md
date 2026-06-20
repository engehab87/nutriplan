# NutriPlan AI

A modern, responsive web application for generating personalized nutrition meal plans.

## Features

- **User Profile Input**: Height, weight, age, gender, activity level, fitness goals, dietary preferences, and allergies
- **Nutrition Calculations**: BMI, BMR (Mifflin-St Jeor), TDEE, and macro targets
- **7-Day Meal Plans**: Complete daily meal plans with breakfast, snacks, lunch, and dinner
- **Dashboard**: BMI indicator, calorie target, macro breakdown charts using Recharts
- **Shopping List**: Auto-generated shopping list from meal plans
- **Dark/Light Mode**: Toggle between themes
- **PDF/Print**: Download or print your meal plan

## Tech Stack

- Next.js 14 (App Router)
- React with TypeScript
- Tailwind CSS
- Recharts for data visualization

## Setup

```bash
npm install
npm run dev
```

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Landing page
│   ├── profile/            # Profile input form
│   └── dashboard/          # Main dashboard
├── components/
│   ├── NutritionCharts.tsx   # Recharts components
│   └── MealPlanView.tsx      # Meal plan display
├── lib/
│   ├── nutritionCalculator.ts  # BMI, BMR, TDEE calculations
│   ├── mealGenerator.ts        # Meal plan generator
│   └── storage.ts             # Local storage utilities
└── types/
    └── index.ts              # TypeScript interfaces
```

## Science-Based Formulas

- **BMI**: weight (kg) / height² (m)
- **BMR**: Mifflin-St Jeor Equation
- **TDEE**: BMR × activity multiplier
- **Macros**: Goal-adjusted protein, carbs, and fat ratios