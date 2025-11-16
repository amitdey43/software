'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Edit2, Trash2, Plus, Calendar, MapPin, DollarSign } from 'lucide-react';

interface DashboardEvent {
  id: string;
  title: string;
  date: string;
  location: string;
  price: number;
  registrations?: number;
  type: 'created' | 'registered';
}

// Placeholder dashboard data
const CREATED_EVENTS: DashboardEvent[] = [
  {
    id: '1',
    title: 'Web Development Conference 2025',
    date: 'March 15, 2025',
    location: 'San Francisco, CA',
    price: 99,
    registrations: 348,
    type: 'created',
  },
  {
    id: '4',
    title: 'Business Summit 2025',
    date: 'May 8, 2025',
    location: 'Chicago, IL',
    price: 149,
    registrations: 156,
    type: 'created',
  },
];

const REGISTERED_EVENTS: DashboardEvent[] = [
  {
    id: '2',
    title: 'Summer Music Festival',
    date: 'July 20, 2025',
    location: 'New York, NY',
    price: 75,
    type: 'registered',
  },
  {
    id: '3',
    title: 'Startup Networking Night',
    date: 'April 10, 2025',
    location: 'Austin, TX',
    price: 0,
    type: 'registered',
  },
  {
    id: '5',
    title: 'React Workshop',
    date: 'February 28, 2025',
    location: 'Seattle, WA',
    price: 49,
    type: 'registered',
  },
];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<'my-events' | 'created' | 'bookings'>('my-events');
  const [eventsCreated, setEventsCreated] = useState(CREATED_EVENTS);
  const [eventsRegistered, setEventsRegistered] = useState(REGISTERED_EVENTS);

  const handleDeleteEvent = (id: string) => {
    setEventsCreated(eventsCreated.filter((e) => e.id !== id));
  };

  const handleCancelRegistration = (id: string) => {
    setEventsRegistered(eventsRegistered.filter((e) => e.id !== id));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">My Dashboard</h1>
          <p className="text-gray-600">Manage your events and bookings</p>
        </div>

        {/* Create Event Button */}
        <div className="mb-8">
          <Link
            href="/create-event"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            <Plus size={20} />
            Create New Event
          </Link>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <div className="flex gap-8">
            {[
              { id: 'my-events', label: 'My Events' },
              { id: 'created', label: 'Events Created' },
              { id: 'bookings', label: 'My Bookings' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-1 py-2 font-semibold transition border-b-2 ${
                  activeTab === tab.id
                    ? 'text-blue-600 border-blue-600'
                    : 'text-gray-600 border-transparent hover:text-gray-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div>
          {/* My Events Tab - combines created and registered */}
          {activeTab === 'my-events' && (
            <div className="space-y-8">
              {eventsCreated.length > 0 && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Events You Created</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {eventsCreated.map((event) => (
                      <DashboardEventCard
                        key={event.id}
                        event={event}
                        onDelete={() => handleDeleteEvent(event.id)}
                        isCreated
                      />
                    ))}
                  </div>
                </div>
              )}

              {eventsRegistered.length > 0 && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Events You Registered For</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {eventsRegistered.map((event) => (
                      <DashboardEventCard
                        key={event.id}
                        event={event}
                        onCancel={() => handleCancelRegistration(event.id)}
                        isCreated={false}
                      />
                    ))}
                  </div>
                </div>
              )}

              {eventsCreated.length === 0 && eventsRegistered.length === 0 && (
                <EmptyState type="all" />
              )}
            </div>
          )}

          {/* Created Events Tab */}
          {activeTab === 'created' && (
            <div>
              {eventsCreated.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {eventsCreated.map((event) => (
                    <DashboardEventCard
                      key={event.id}
                      event={event}
                      onDelete={() => handleDeleteEvent(event.id)}
                      isCreated
                    />
                  ))}
                </div>
              ) : (
                <EmptyState type="created" />
              )}
            </div>
          )}

          {/* Bookings Tab */}
          {activeTab === 'bookings' && (
            <div>
              {eventsRegistered.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {eventsRegistered.map((event) => (
                    <DashboardEventCard
                      key={event.id}
                      event={event}
                      onCancel={() => handleCancelRegistration(event.id)}
                      isCreated={false}
                    />
                  ))}
                </div>
              ) : (
                <EmptyState type="bookings" />
              )}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

interface DashboardEventCardProps {
  event: DashboardEvent;
  isCreated: boolean;
  onDelete?: (id: string) => void;
  onCancel?: (id: string) => void;
}

function DashboardEventCard({ event, isCreated, onDelete, onCancel }: DashboardEventCardProps) {
  return (
    <div className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:shadow-lg transition">
      <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2">{event.title}</h3>

      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-gray-600">
          <Calendar size={16} className="text-blue-600 flex-shrink-0" />
          <span className="text-sm">{event.date}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <MapPin size={16} className="text-blue-600 flex-shrink-0" />
          <span className="text-sm">{event.location}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <DollarSign size={16} className="text-blue-600 flex-shrink-0" />
          <span className="text-sm">{event.price === 0 ? 'Free' : `$${event.price}`}</span>
        </div>
      </div>

      {isCreated && event.registrations && (
        <div className="mb-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-900">
            <span className="font-semibold">{event.registrations}</span> people registered
          </p>
        </div>
      )}

      <div className="flex gap-2 pt-4 border-t">
        {isCreated ? (
          <>
            <button className="flex-1 px-3 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition flex items-center justify-center gap-2 text-sm font-medium">
              <Edit2 size={16} />
              Edit
            </button>
            <button
              onClick={() => onDelete?.(event.id)}
              className="flex-1 px-3 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition flex items-center justify-center gap-2 text-sm font-medium"
            >
              <Trash2 size={16} />
              Delete
            </button>
          </>
        ) : (
          <button
            onClick={() => onCancel?.(event.id)}
            className="w-full px-3 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition font-medium text-sm"
          >
            Cancel Registration
          </button>
        )}
      </div>
    </div>
  );
}

interface EmptyStateProps {
  type: 'all' | 'created' | 'bookings';
}

function EmptyState({ type }: EmptyStateProps) {
  const messages = {
    all: {
      title: 'No events yet',
      description: 'Create your first event or register for upcoming events to get started',
      buttonText: 'Create Event',
      href: '/create-event',
    },
    created: {
      title: 'No events created',
      description: 'Start by creating your first event to share with the community',
      buttonText: 'Create Event',
      href: '/create-event',
    },
    bookings: {
      title: 'No bookings yet',
      description: 'Browse events and register to attend them',
      buttonText: 'Browse Events',
      href: '/events',
    },
  };

  const message = messages[type];

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <p className="text-xl font-semibold text-gray-900 mb-2">{message.title}</p>
      <p className="text-gray-600 mb-6 text-center">{message.description}</p>
      <Link
        href={message.href}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
      >
        {message.buttonText}
      </Link>
    </div>
  );
}
