'use client';

import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface NutritionChartsProps {
  macros: { protein: number; carbs: number; fats: number };
  targetCalories: number;
}

export function NutritionCharts({ macros, targetCalories }: NutritionChartsProps) {
  const macroData = [
    { name: 'Protein', value: macros.protein, color: '#22c55e' },
    { name: 'Carbs', value: macros.carbs, color: '#f59e0b' },
    { name: 'Fats', value: macros.fats, color: '#f43f5e' },
  ];

  const calorieDistribution = [
    { name: 'Protein', value: macros.protein * 4 },
    { name: 'Carbs', value: macros.carbs * 4 },
    { name: 'Fats', value: macros.fats * 9 },
  ];

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="card">
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Macro Distribution</h3>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie data={macroData} dataKey="value" innerRadius={40} outerRadius={80}>
              {macroData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
        <div className="grid grid-cols-3 gap-2 mt-4 text-center">
          {macroData.map(item => (
            <div key={item.name}>
              <div className="w-4 h-4 rounded-full mx-auto mb-1" style={{ backgroundColor: item.color }} />
              <p className="text-sm text-gray-600 dark:text-gray-300">{item.name}</p>
              <p className="font-bold text-gray-900 dark:text-white">{item.value}g</p>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Calorie Sources</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={calorieDistribution}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip formatter={(value) => `${value} kcal`} />
            <Bar dataKey="value" fill="#22c55e">
              {calorieDistribution.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={macroData[index].color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}