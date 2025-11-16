'use client';

import { useState } from 'react';
import { ArrowLeft, Upload, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';

interface FormData {
  title: string;
  description: string;
  category: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  venue: string;
  price: string;
  imageFile: string | null;
}

interface FormErrors {
  [key: string]: string;
}

export default function CreateEventPage() {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    category: 'Technology',
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    venue: '',
    price: '0',
    imageFile: null,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.title.trim()) newErrors.title = 'Event title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (formData.description.length < 20) newErrors.description = 'Description must be at least 20 characters';
    if (!formData.startDate) newErrors.startDate = 'Start date is required';
    if (!formData.startTime) newErrors.startTime = 'Start time is required';
    if (!formData.endDate) newErrors.endDate = 'End date is required';
    if (!formData.endTime) newErrors.endTime = 'End time is required';
    if (!formData.venue.trim()) newErrors.venue = 'Venue is required';

    const startDateTime = new Date(`${formData.startDate}T${formData.startTime}`);
    const endDateTime = new Date(`${formData.endDate}T${formData.endTime}`);

    if (endDateTime <= startDateTime) {
      newErrors.endTime = 'End time must be after start time';
    }

    const price = parseFloat(formData.price);
    if (isNaN(price) || price < 0) newErrors.price = 'Price must be a valid number';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
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

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        imageFile: file.name,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({
          title: '',
          description: '',
          category: 'Technology',
          startDate: '',
          startTime: '',
          endDate: '',
          endTime: '',
          venue: '',
          price: '0',
          imageFile: null,
        });
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link href="/" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6">
          <ArrowLeft size={20} />
          Back Home
        </Link>

        <div className="bg-white rounded-lg border-2 border-gray-200 p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Create Your Event</h1>
          <p className="text-gray-600 mb-8">Fill in the details below to create and publish your event</p>

          {/* Success Message */}
          {submitted && (
            <div className="mb-6 p-4 bg-green-50 border-2 border-green-200 rounded-lg">
              <p className="text-green-800 font-semibold">Event created successfully!</p>
              <p className="text-sm text-green-700">Your event has been published and is now visible to users.</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Event Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-semibold text-gray-900 mb-2">
                Event Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g., Web Development Conference 2025"
                className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition ${
                  errors.title ? 'border-red-500 focus:border-red-600' : 'border-gray-300 focus:border-blue-600'
                }`}
              />
              {errors.title && (
                <div className="mt-1 flex items-center gap-1 text-red-600 text-sm">
                  <AlertCircle size={16} />
                  {errors.title}
                </div>
              )}
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-semibold text-gray-900 mb-2">
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your event in detail..."
                rows={5}
                className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition ${
                  errors.description ? 'border-red-500 focus:border-red-600' : 'border-gray-300 focus:border-blue-600'
                }`}
              />
              {errors.description && (
                <div className="mt-1 flex items-center gap-1 text-red-600 text-sm">
                  <AlertCircle size={16} />
                  {errors.description}
                </div>
              )}
            </div>

            {/* Category */}
            <div>
              <label htmlFor="category" className="block text-sm font-semibold text-gray-900 mb-2">
                Category
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none transition"
              >
                <option>Technology</option>
                <option>Music</option>
                <option>Business</option>
                <option>Sports</option>
                <option>Education</option>
                <option>Other</option>
              </select>
            </div>

            {/* Date and Time Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Start Date */}
              <div>
                <label htmlFor="startDate" className="block text-sm font-semibold text-gray-900 mb-2">
                  Start Date *
                </label>
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition ${
                    errors.startDate ? 'border-red-500 focus:border-red-600' : 'border-gray-300 focus:border-blue-600'
                  }`}
                />
                {errors.startDate && (
                  <div className="mt-1 flex items-center gap-1 text-red-600 text-sm">
                    <AlertCircle size={16} />
                    {errors.startDate}
                  </div>
                )}
              </div>

              {/* Start Time */}
              <div>
                <label htmlFor="startTime" className="block text-sm font-semibold text-gray-900 mb-2">
                  Start Time *
                </label>
                <input
                  type="time"
                  id="startTime"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition ${
                    errors.startTime ? 'border-red-500 focus:border-red-600' : 'border-gray-300 focus:border-blue-600'
                  }`}
                />
                {errors.startTime && (
                  <div className="mt-1 flex items-center gap-1 text-red-600 text-sm">
                    <AlertCircle size={16} />
                    {errors.startTime}
                  </div>
                )}
              </div>

              {/* End Date */}
              <div>
                <label htmlFor="endDate" className="block text-sm font-semibold text-gray-900 mb-2">
                  End Date *
                </label>
                <input
                  type="date"
                  id="endDate"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition ${
                    errors.endDate ? 'border-red-500 focus:border-red-600' : 'border-gray-300 focus:border-blue-600'
                  }`}
                />
                {errors.endDate && (
                  <div className="mt-1 flex items-center gap-1 text-red-600 text-sm">
                    <AlertCircle size={16} />
                    {errors.endDate}
                  </div>
                )}
              </div>

              {/* End Time */}
              <div>
                <label htmlFor="endTime" className="block text-sm font-semibold text-gray-900 mb-2">
                  End Time *
                </label>
                <input
                  type="time"
                  id="endTime"
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition ${
                    errors.endTime ? 'border-red-500 focus:border-red-600' : 'border-gray-300 focus:border-blue-600'
                  }`}
                />
                {errors.endTime && (
                  <div className="mt-1 flex items-center gap-1 text-red-600 text-sm">
                    <AlertCircle size={16} />
                    {errors.endTime}
                  </div>
                )}
              </div>
            </div>

            {/* Venue */}
            <div>
              <label htmlFor="venue" className="block text-sm font-semibold text-gray-900 mb-2">
                Venue/Location *
              </label>
              <input
                type="text"
                id="venue"
                name="venue"
                value={formData.venue}
                onChange={handleChange}
                placeholder="e.g., San Francisco Convention Center, CA"
                className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition ${
                  errors.venue ? 'border-red-500 focus:border-red-600' : 'border-gray-300 focus:border-blue-600'
                }`}
              />
              {errors.venue && (
                <div className="mt-1 flex items-center gap-1 text-red-600 text-sm">
                  <AlertCircle size={16} />
                  {errors.venue}
                </div>
              )}
            </div>

            {/* Ticket Price */}
            <div>
              <label htmlFor="price" className="block text-sm font-semibold text-gray-900 mb-2">
                Ticket Price (USD) - 0 for free event
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="e.g., 99"
                min="0"
                step="0.01"
                className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition ${
                  errors.price ? 'border-red-500 focus:border-red-600' : 'border-gray-300 focus:border-blue-600'
                }`}
              />
              {errors.price && (
                <div className="mt-1 flex items-center gap-1 text-red-600 text-sm">
                  <AlertCircle size={16} />
                  {errors.price}
                </div>
              )}
            </div>

            {/* Event Banner Upload */}
            <div>
              <label htmlFor="image" className="block text-sm font-semibold text-gray-900 mb-2">
                Event Banner/Image
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-600 transition">
                <input
                  type="file"
                  id="image"
                  name="image"
                  onChange={handleImageUpload}
                  accept="image/*"
                  className="hidden"
                />
                <label htmlFor="image" className="cursor-pointer">
                  <Upload className="mx-auto mb-2 text-gray-400" size={32} />
                  <p className="text-gray-700 font-medium">
                    {formData.imageFile ? `Selected: ${formData.imageFile}` : 'Click to upload or drag and drop'}
                  </p>
                  <p className="text-sm text-gray-500">PNG, JPG up to 10MB</p>
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Create Event
              </button>
              <Link
                href="/"
                className="flex-1 px-6 py-3 bg-gray-200 text-gray-900 rounded-lg font-semibold hover:bg-gray-300 transition text-center"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
