'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AlertCircle, Eye, EyeOff, Check } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  [key: string]: string;
}

export default function RegisterPage() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      setRegisterSuccess(true);
      setTimeout(() => {
        setRegisterSuccess(false);
        setFormData({
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
        });
      }, 3000);
    }
  };

  const passwordStrength = formData.password.length >= 8 ? 'strong' : formData.password.length >= 6 ? 'medium' : 'weak';

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <span className="text-blue-600 font-bold text-xl">E</span>
            </div>
            <span className="text-white text-2xl font-bold hidden sm:inline">EventHub</span>
          </Link>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-lg shadow-xl p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 text-center">Create Account</h1>
          <p className="text-gray-600 text-center mb-8">Join EventHub and start managing events</p>

          {/* Success Message */}
          {registerSuccess && (
            <div className="mb-6 p-4 bg-green-50 border-2 border-green-200 rounded-lg">
              <div className="flex items-center gap-2">
                <Check className="text-green-600" size={20} />
                <div>
                  <p className="text-green-800 font-semibold text-sm">Account created successfully!</p>
                  <p className="text-green-700 text-xs mt-1">Redirecting to login...</p>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-gray-900 mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition ${
                  errors.name ? 'border-red-500 focus:border-red-600' : 'border-gray-300 focus:border-blue-600'
                }`}
              />
              {errors.name && (
                <div className="mt-1 flex items-center gap-1 text-red-600 text-sm">
                  <AlertCircle size={16} />
                  {errors.name}
                </div>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition ${
                  errors.email ? 'border-red-500 focus:border-red-600' : 'border-gray-300 focus:border-blue-600'
                }`}
              />
              {errors.email && (
                <div className="mt-1 flex items-center gap-1 text-red-600 text-sm">
                  <AlertCircle size={16} />
                  {errors.email}
                </div>
              )}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-900 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition pr-10 ${
                    errors.password ? 'border-red-500 focus:border-red-600' : 'border-gray-300 focus:border-blue-600'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && (
                <div className="mt-1 flex items-center gap-1 text-red-600 text-sm">
                  <AlertCircle size={16} />
                  {errors.password}
                </div>
              )}
              {formData.password && !errors.password && (
                <div className="mt-2 flex items-center gap-2 text-xs">
                  <div
                    className={`h-1 w-8 rounded ${
                      passwordStrength === 'strong' ? 'bg-green-600' : passwordStrength === 'medium' ? 'bg-yellow-600' : 'bg-red-600'
                    }`}
                  ></div>
                  <span className={passwordStrength === 'strong' ? 'text-green-600' : passwordStrength === 'medium' ? 'text-yellow-600' : 'text-red-600'}>
                    {passwordStrength} password
                  </span>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-900 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition pr-10 ${
                    errors.confirmPassword ? 'border-red-500 focus:border-red-600' : 'border-gray-300 focus:border-blue-600'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.confirmPassword && (
                <div className="mt-1 flex items-center gap-1 text-red-600 text-sm">
                  <AlertCircle size={16} />
                  {errors.confirmPassword}
                </div>
              )}
            </div>

            {/* Terms Agreement */}
            <label className="flex items-start gap-2 cursor-pointer mt-3">
              <input type="checkbox" className="w-4 h-4 mt-1" />
              <span className="text-sm text-gray-600">
                I agree to the{' '}
                <a href="#" className="text-blue-600 hover:underline">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="text-blue-600 hover:underline">
                  Privacy Policy
                </a>
              </span>
            </label>

            {/* Create Account Button */}
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition mt-4"
            >
              Create Account
            </button>

            {/* Divider */}
            <div className="relative mt-6 mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Already have an account?</span>
              </div>
            </div>

            {/* Sign In Link */}
            <Link
              href="/login"
              className="w-full py-3 border-2 border-gray-300 text-gray-900 rounded-lg font-semibold hover:bg-gray-50 transition text-center"
            >
              Sign In
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
