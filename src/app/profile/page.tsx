'use client';

import { useState, useEffect } from 'react';
import { UserProfile, Gender, ActivityLevel, FitnessGoal, DietaryPreference, Allergy } from '@/types';
import { saveUserProfile, generateId, getActiveProfile, setActiveProfile } from '@/lib/storage';
import { calculateNutrition } from '@/lib/nutritionCalculator';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const initialProfile: UserProfile = {
  id: '',
  name: '',
  height: 0,
  heightUnit: 'cm',
  weight: 0,
  weightUnit: 'kg',
  age: 0,
  gender: 'male',
  activityLevel: 'sedentary',
  goal: 'weight_maintenance',
  dietaryPreference: 'standard',
  allergies: [],
  customRestrictions: [],
  createdAt: '',
};

export default function ProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile>(initialProfile);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const activeProfile = getActiveProfile();
    if (activeProfile) {
      setProfile(activeProfile);
    } else {
      setProfile({ ...initialProfile, id: generateId() });
    }
  }, []);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!profile.name) newErrors.name = 'Name is required';
    if (profile.height <= 0) newErrors.height = 'Height must be greater than 0';
    if (profile.weight <= 0) newErrors.weight = 'Weight must be greater than 0';
    if (profile.age <= 0) newErrors.age = 'Age must be greater than 0';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const savedProfile = {
      ...profile,
      id: profile.id || generateId(),
      createdAt: profile.createdAt || new Date().toISOString(),
    };

    saveUserProfile(savedProfile);
    setActiveProfile(savedProfile.id);
    router.push('/dashboard');
  };

  const toggleAllergy = (allergy: Allergy) => {
    setProfile(prev => ({
      ...prev,
      allergies: prev.allergies.includes(allergy)
        ? prev.allergies.filter(a => a !== allergy)
        : [...prev.allergies, allergy],
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="flex justify-between items-center mb-8">
          <Link href="/" className="text-primary-600 hover:text-primary-700 font-medium">
            ← Back to Home
          </Link>
          <button
            onClick={() => document.documentElement.classList.toggle('dark')}
            className="p-2 rounded-lg bg-white dark:bg-gray-800 shadow"
          >
            🌙
          </button>
        </div>

        <div className="card">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Your Profile</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <InputField
              label="Full Name"
              type="text"
              value={profile.name}
              onChange={v => setProfile({ ...profile, name: v })}
              error={errors.name}
              required
            />

            <div className="grid grid-cols-2 gap-4">
              <InputField
                label="Height"
                type="number"
                value={profile.height || ''}
                onChange={v => setProfile({ ...profile, height: Number(v) })}
                error={errors.height}
                min={1}
                required
              />
              <UnitToggle
                options={[{ value: 'cm', label: 'cm' }, { value: 'ft', label: 'ft' }]}
                value={profile.heightUnit}
                onChange={v => setProfile({ ...profile, heightUnit: v as 'cm' | 'ft' })}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <InputField
                label="Weight"
                type="number"
                value={profile.weight || ''}
                onChange={v => setProfile({ ...profile, weight: Number(v) })}
                error={errors.weight}
                min={1}
                required
              />
              <UnitToggle
                options={[{ value: 'kg', label: 'kg' }, { value: 'lbs', label: 'lbs' }]}
                value={profile.weightUnit}
                onChange={v => setProfile({ ...profile, weightUnit: v as 'kg' | 'lbs' })}
              />
            </div>

            <InputField
              label="Age"
              type="number"
              value={profile.age || ''}
              onChange={v => setProfile({ ...profile, age: Number(v) })}
              error={errors.age}
              min={1}
              max={120}
              required
            />

            <SelectField
              label="Gender"
              value={profile.gender}
              options={[
                { value: 'male', label: 'Male' },
                { value: 'female', label: 'Female' },
                { value: 'other', label: 'Other' },
              ]}
              onChange={v => setProfile({ ...profile, gender: v as Gender })}
            />

            <SelectField
              label="Activity Level"
              value={profile.activityLevel}
              options={[
                { value: 'sedentary', label: 'Sedentary (little/no exercise)' },
                { value: 'lightly_active', label: 'Lightly Active (light exercise 1-3 days/wk)' },
                { value: 'moderately_active', label: 'Moderately Active (moderate exercise 3-5 days/wk)' },
                { value: 'very_active', label: 'Very Active (hard exercise 6-7 days/wk)' },
                { value: 'athlete', label: 'Athlete (very hard exercise + physical job)' },
              ]}
              onChange={v => setProfile({ ...profile, activityLevel: v as ActivityLevel })}
            />

            <SelectField
              label="Fitness Goal"
              value={profile.goal}
              options={[
                { value: 'weight_loss', label: 'Weight Loss' },
                { value: 'weight_maintenance', label: 'Weight Maintenance' },
                { value: 'muscle_gain', label: 'Muscle Gain' },
                { value: 'fat_loss', label: 'Fat Loss' },
              ]}
              onChange={v => setProfile({ ...profile, goal: v as FitnessGoal })}
            />

            <SelectField
              label="Dietary Preference"
              value={profile.dietaryPreference}
              options={[
                { value: 'standard', label: 'Standard' },
                { value: 'vegetarian', label: 'Vegetarian' },
                { value: 'vegan', label: 'Vegan' },
                { value: 'keto', label: 'Keto' },
                { value: 'mediterranean', label: 'Mediterranean' },
                { value: 'low_carb', label: 'Low Carb' },
              ]}
              onChange={v => setProfile({ ...profile, dietaryPreference: v as DietaryPreference })}
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Allergies & Restrictions
              </label>
              <div className="grid grid-cols-2 gap-3">
                {(['dairy', 'gluten', 'nuts', 'shellfish'] as Allergy[]).map(allergy => (
                  <label key={allergy} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={profile.allergies.includes(allergy)}
                      onChange={() => toggleAllergy(allergy)}
                      className="w-4 h-4 text-primary-600 rounded"
                    />
                    <span className="text-gray-700 dark:text-gray-300 capitalize">{allergy}</span>
                  </label>
                ))}
              </div>
            </div>

            <InputField
              label="Custom Restrictions"
              type="text"
              value={profile.customRestrictions.join(', ')}
              onChange={v => setProfile({ ...profile, customRestrictions: v.split(',').map(s => s.trim()).filter(Boolean) })}
              placeholder="Enter other restrictions separated by commas"
            />

            <button type="submit" className="btn-primary w-full">
              Save Profile & View Dashboard
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

function InputField({
  label,
  type,
  value,
  onChange,
  error,
  min,
  max,
  required,
  placeholder,
}: {
  label: string;
  type: string;
  value: string | number;
  onChange: (value: string) => void;
  error?: string;
  min?: number;
  max?: number;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        {label} {required && '*'}
      </label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        min={min}
        max={max}
        placeholder={placeholder}
        className={`input-field ${error ? 'border-danger-500' : ''}`}
        required={required}
      />
      {error && <p className="text-danger-500 text-sm mt-1">{error}</p>}
    </div>
  );
}

function UnitToggle({
  options,
  value,
  onChange,
}: {
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="flex items-end">
      <div className="flex rounded-lg overflow-hidden border border-gray-300 dark:border-gray-600">
        {options.map(opt => (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={`px-4 py-2 text-sm ${
              value === opt.value
                ? 'bg-primary-500 text-white'
                : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function SelectField({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        {label}
      </label>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="input-field"
      >
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}