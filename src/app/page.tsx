import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-primary-500 rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-xl">N</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">NutriPlan AI</h1>
        </div>
        <Link href="/dashboard" className="btn-primary">
          Get Started
        </Link>
      </header>

      <section className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
          Your Personal Nutrition
          <span className="text-primary-600"> AI-Powered Meal Planner</span>
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto">
          Generate customized meal plans based on your unique profile. Achieve your fitness goals with science-backed nutrition.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/profile" className="btn-primary text-lg px-8 py-4 inline-flex items-center">
            Create Your Plan →
          </Link>
          <Link href="/dashboard" className="btn-secondary text-lg px-8 py-4">
            View Dashboard
          </Link>
        </div>
      </section>

      <section className="container mx-auto px-4 py-20">
        <h3 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">Features</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard 
            icon="📊"
            title="Smart Calculations"
            description="BMR, TDEE, BMI and macro targets calculated using proven formulas"
          />
          <FeatureCard 
            icon="📅"
            title="7-Day Plans"
            description="Complete weekly meal plans with variety and nutritional balance"
          />
          <FeatureCard 
            icon="🛒"
            title="Shopping Lists"
            description="Auto-generated shopping lists from your meal plans"
          />
          <FeatureCard 
            icon="⚡"
            title="Goal Oriented"
            description="Plans tailored for weight loss, muscle gain, or maintenance"
          />
        </div>
      </section>

      <section className="container mx-auto px-4 py-20">
        <h3 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">How It Works</h3>
        <div className="grid md:grid-cols-3 gap-12 max-w-4xl mx-auto">
          <StepCard step={1} title="Enter Your Details" description="Height, weight, age, goals & preferences" />
          <StepCard step={2} title="Get Calculations" description="We calculate your nutrition targets" />
          <StepCard step={3} title="Receive Meal Plan" description="Your personalized 7-day meal plan" />
        </div>
      </section>

      <section className="container mx-auto px-4 py-20">
        <h3 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">What Users Say</h3>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <TestimonialCard 
            name="Sarah J."
            text="NutriPlan AI helped me lose 20 pounds in 2 months. The meal plans are delicious and easy to follow!"
          />
          <TestimonialCard 
            name="Mike T."
            text="Finally an app that understands my dietary restrictions. The keto options are amazing."
          />
          <TestimonialCard 
            name="Emma L."
            text="I love the shopping list feature. It saves me so much time at the grocery store!"
          />
        </div>
      </section>

      <section className="container mx-auto px-4 py-20">
        <h3 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">FAQ</h3>
        <div className="max-w-3xl mx-auto space-y-6">
          <FAQItem 
            question="How accurate are the calorie calculations?"
            answer="We use the Mifflin-St Jeor Equation, considered the most accurate BMR formula, combined with activity multipliers for TDEE."
          />
          <FAQItem 
            question="Can I customize my meal plan?"
            answer="Yes! Choose from various dietary preferences and exclude foods with allergies or restrictions."
          />
          <FAQItem 
            question="How do I get my shopping list?"
            answer="Simply generate a meal plan and click the Shopping List button to see all ingredients organized by category."
          />
        </div>
      </section>

      <footer className="container mx-auto px-4 py-12 text-center text-gray-600 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700">
        <p>&copy; 2024 NutriPlan AI. All rights reserved.</p>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <div className="card text-center">
      <div className="w-16 h-16 mx-auto mb-4 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center text-primary-600 text-2xl">
        {icon}
      </div>
      <h4 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">{title}</h4>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  );
}

function StepCard({ step, title, description }: { step: number; title: string; description: string }) {
  return (
    <div className="text-center">
      <div className="w-12 h-12 mx-auto mb-4 bg-primary-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
        {step}
      </div>
      <h4 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">{title}</h4>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  );
}

function TestimonialCard({ name, text }: { name: string; text: string }) {
  return (
    <div className="card">
      <p className="text-gray-600 dark:text-gray-300 mb-4">"{text}"</p>
      <p className="font-semibold text-gray-900 dark:text-white">— {name}</p>
    </div>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  return (
    <div className="card">
      <h4 className="font-bold text-gray-900 dark:text-white mb-2">{question}</h4>
      <p className="text-gray-600 dark:text-gray-300">{answer}</p>
    </div>
  );
}