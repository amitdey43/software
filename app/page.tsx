'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { EventCard } from '@/components/event-card';

// Placeholder featured events data
const FEATURED_EVENTS = [
  {
    id: '1',
    image: '/web-development-conference.png',
    title: 'Web Development Conference 2025',
    location: 'San Francisco, CA',
    date: 'March 15, 2025',
    time: '09:00 AM',
    price: 99,
  },
  {
    id: '2',
    image: '/music-festival-concert.jpg',
    title: 'Summer Music Festival',
    location: 'New York, NY',
    date: 'July 20, 2025',
    time: '06:00 PM',
    price: 75,
  },
  {
    id: '3',
    image: '/startup-networking-event.png',
    title: 'Startup Networking Night',
    location: 'Austin, TX',
    date: 'April 10, 2025',
    time: '05:00 PM',
    price: 0,
  },
  {
    id: '4',
    image: '/business-summit-conference.png',
    title: 'Business Summit 2025',
    location: 'Chicago, IL',
    date: 'May 8, 2025',
    time: '08:30 AM',
    price: 149,
  },
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-balance">
              Online Event Management System
            </h1>
            <p className="text-lg md:text-xl text-blue-100 mb-8 text-balance">
              Create, manage, and book amazing events effortlessly
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/events"
                className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition flex items-center justify-center gap-2"
              >
                Browse Events
                <ArrowRight size={20} />
              </Link>
              <Link
                href="/create-event"
                className="px-8 py-3 bg-blue-700 text-white rounded-lg font-semibold hover:bg-blue-900 transition border border-blue-500"
              >
                Create Event
              </Link>
            </div>
          </div>
        </section>

        {/* Featured Events Section */}
        <section className="py-16 md:py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Featured Events
              </h2>
              <p className="text-gray-600 text-lg">
                Discover the most exciting events happening near you
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {FEATURED_EVENTS.map((event) => (
                <EventCard key={event.id} {...event} />
              ))}
            </div>

            <div className="mt-12 text-center">
              <Link
                href="/events"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                View All Events
                <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
              Why Choose EventHub?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Easy Event Creation',
                  description: 'Create and publish events in minutes with our intuitive event creation form',
                },
                {
                  title: 'Secure Bookings',
                  description: 'Manage registrations and bookings with complete control over your events',
                },
                {
                  title: 'Event Analytics',
                  description: 'Track attendance, get insights, and manage your events effectively',
                },
              ].map((feature, idx) => (
                <div key={idx} className="p-6 border-2 border-gray-200 rounded-lg hover:border-blue-600 transition">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
