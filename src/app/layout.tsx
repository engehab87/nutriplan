import '../../styles/globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NutriPlan AI - Personalized Nutrition Meal Plans',
  description: 'Generate personalized nutrition meal plans based on your height, weight, age, gender, activity level, and fitness goals.',
  keywords: 'nutrition, meal plan, diet, fitness, health, calories, macros',
  openGraph: {
    title: 'NutriPlan AI',
    description: 'AI-powered personalized nutrition meal plans',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full transition-colors duration-300">
        {children}
      </body>
    </html>
  );
}