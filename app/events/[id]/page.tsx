'use client';

import Link from 'next/link';
import { ArrowLeft, Calendar, MapPin, DollarSign, Clock, User, Mail } from 'lucide-react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { useState } from 'react';

// Placeholder event details data
const EVENT_DETAILS: Record<string, any> = {
  '1': {
    id: '1',
    image: '/placeholder.svg?key=qng5g',
    title: 'Web Development Conference 2025',
    location: 'San Francisco, CA',
    date: 'March 15, 2025',
    startTime: '09:00 AM',
    endTime: '06:00 PM',
    price: 99,
    description:
      'Join us for the biggest web development conference of 2025! This comprehensive event brings together industry experts, developers, and innovators to discuss the latest trends in web development. Learn about cutting-edge technologies, frameworks, and best practices from speakers who are shaping the future of the web.',
    agenda: [
      { time: '09:00 AM', title: 'Registration & Breakfast' },
      { time: '10:00 AM', title: 'Keynote: Future of Web Development' },
      { time: '11:00 AM', title: 'React 19 & Server Components' },
      { time: '12:00 PM', title: 'Lunch Break' },
      { time: '01:00 PM', title: 'Workshop: Next.js Performance' },
      { time: '03:00 PM', title: 'Coffee Break' },
      { time: '03:30 PM', title: 'Panel Discussion: Web Standards' },
      { time: '05:00 PM', title: 'Networking Session' },
    ],
    organizer: {
      name: 'Tech Events Pro',
      email: 'contact@techevents.com',
      bio: 'Leading organizer of tech conferences and workshops worldwide',
    },
    capacity: 500,
    registered: 348,
  },
  '2': {
    id: '2',
    image: '/placeholder.svg?key=ai9a7',
    title: 'Summer Music Festival',
    location: 'New York, NY',
    date: 'July 20, 2025',
    startTime: '06:00 PM',
    endTime: '11:00 PM',
    price: 75,
    description:
      'Experience the ultimate summer music festival featuring international artists and live performances. Three stages with continuous entertainment, food vendors, and an incredible atmosphere. Perfect for music lovers of all genres.',
    agenda: [
      { time: '06:00 PM', title: 'Doors Open & Setup' },
      { time: '07:00 PM', title: 'Opening Acts' },
      { time: '08:30 PM', title: 'Main Stage Performances' },
      { time: '10:00 PM', title: 'Headliner Concert' },
    ],
    organizer: {
      name: 'Festival Productions Inc',
      email: 'info@festivalpro.com',
      bio: 'Premier music festival organizer with 15+ years of experience',
    },
    capacity: 2000,
    registered: 1523,
  },
  '3': {
    id: '3',
    image: '/placeholder.svg?key=j2dlj',
    title: 'Startup Networking Night',
    location: 'Austin, TX',
    date: 'April 10, 2025',
    startTime: '05:00 PM',
    endTime: '08:00 PM',
    price: 0,
    description:
      'Connect with fellow entrepreneurs, investors, and startup enthusiasts. This free networking event is perfect for pitching ideas, finding co-founders, and building valuable business relationships in the startup community.',
    agenda: [
      { time: '05:00 PM', title: 'Registration & Welcome' },
      { time: '05:30 PM', title: 'Investor Pitches' },
      { time: '06:30 PM', title: 'Speed Networking' },
      { time: '07:30 PM', title: 'Mingling & Connections' },
    ],
    organizer: {
      name: 'Austin Startup Hub',
      email: 'connect@austinstartup.com',
      bio: 'Supporting the Austin startup ecosystem since 2015',
    },
    capacity: 300,
    registered: 187,
  },
};

export default function EventDetailsPage({ params }: { params: { id: string } }) {
  const event = EVENT_DETAILS[params.id] || EVENT_DETAILS['1'];
  const [isRegistered, setIsRegistered] = useState(false);
  const spotsLeft = event.capacity - event.registered;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Back Button */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/events" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700">
            <ArrowLeft size={20} />
            Back to Events
          </Link>
        </div>

        {/* Hero Image */}
        <div className="h-64 md:h-96 bg-gray-300 relative overflow-hidden"
          style={{
            backgroundImage: `url(${event.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />

        {/* Event Details */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 text-balance">{event.title}</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Column - Event Info */}
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Calendar className="text-blue-600 flex-shrink-0 mt-1" size={24} />
                  <div>
                    <p className="font-semibold text-gray-900">{event.date}</p>
                    <p className="text-gray-600">{event.startTime} - {event.endTime}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="text-blue-600 flex-shrink-0 mt-1" size={24} />
                  <div>
                    <p className="font-semibold text-gray-900">{event.location}</p>
                    <p className="text-gray-600">Venue Location</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <DollarSign className="text-blue-600 flex-shrink-0 mt-1" size={24} />
                  <div>
                    <p className="font-semibold text-gray-900">{event.price === 0 ? 'Free' : `$${event.price}`}</p>
                    <p className="text-gray-600">Ticket Price</p>
                  </div>
                </div>
              </div>

              {/* Right Column - Register */}
              <div className="bg-gray-50 p-6 rounded-lg border-2 border-gray-200">
                <div className="mb-4">
                  <p className="text-sm text-gray-600">Spots Available</p>
                  <p className="text-2xl font-bold text-gray-900">{spotsLeft} of {event.capacity}</p>
                </div>

                <button
                  onClick={() => setIsRegistered(!isRegistered)}
                  className={`w-full py-3 rounded-lg font-semibold transition mb-4 ${
                    isRegistered
                      ? 'bg-gray-300 text-gray-700 hover:bg-gray-400'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {isRegistered ? 'Cancel Registration' : 'Register Now'}
                </button>

                {isRegistered && (
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-sm text-green-800">Successfully registered for this event!</p>
                  </div>
                )}

                <p className="text-xs text-gray-500 mt-4">
                  {event.registered} people have already registered for this event
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Description Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Event</h2>
              <p className="text-gray-600 leading-relaxed mb-8">{event.description}</p>

              {/* Agenda */}
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Schedule</h3>
              <div className="space-y-3">
                {event.agenda.map((item: any, idx: number) => (
                  <div key={idx} className="flex gap-4 p-4 border-l-4 border-blue-600 bg-blue-50">
                    <Clock className="text-blue-600 flex-shrink-0" size={20} />
                    <div>
                      <p className="font-semibold text-gray-900">{item.time}</p>
                      <p className="text-gray-600">{item.title}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar - Organizer */}
            <div>
              <div className="bg-gray-50 p-6 rounded-lg border-2 border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Event Organizer</h3>

                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                    {event.organizer.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{event.organizer.name}</p>
                    <p className="text-sm text-gray-600">Organizer</p>
                  </div>
                </div>

                <p className="text-sm text-gray-600 mb-4">{event.organizer.bio}</p>

                <div className="space-y-2 pt-4 border-t">
                  <a
                    href={`mailto:${event.organizer.email}`}
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm"
                  >
                    <Mail size={16} />
                    {event.organizer.email}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
