'use client';

import { useState, useMemo } from 'react';
import { Search, X } from 'lucide-react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { EventCard } from '@/components/event-card';

// Placeholder events data
const ALL_EVENTS = [
  {
    id: '1',
    image: '/placeholder.svg?key=qng5g',
    title: 'Web Development Conference 2025',
    location: 'San Francisco, CA',
    date: 'March 15, 2025',
    time: '09:00 AM',
    price: 99,
    category: 'Technology',
  },
  {
    id: '2',
    image: '/placeholder.svg?key=ai9a7',
    title: 'Summer Music Festival',
    location: 'New York, NY',
    date: 'July 20, 2025',
    time: '06:00 PM',
    price: 75,
    category: 'Music',
  },
  {
    id: '3',
    image: '/placeholder.svg?key=j2dlj',
    title: 'Startup Networking Night',
    location: 'Austin, TX',
    date: 'April 10, 2025',
    time: '05:00 PM',
    price: 0,
    category: 'Business',
  },
  {
    id: '4',
    image: '/placeholder.svg?key=u1lxf',
    title: 'Business Summit 2025',
    location: 'Chicago, IL',
    date: 'May 8, 2025',
    time: '08:30 AM',
    price: 149,
    category: 'Business',
  },
  {
    id: '5',
    image: '/placeholder.svg?key=k8a2p',
    title: 'React Workshop',
    location: 'Seattle, WA',
    date: 'February 28, 2025',
    time: '10:00 AM',
    price: 49,
    category: 'Technology',
  },
  {
    id: '6',
    image: '/placeholder.svg?key=m3n1x',
    title: 'Jazz Night at the Theater',
    location: 'Boston, MA',
    date: 'June 15, 2025',
    time: '08:00 PM',
    price: 60,
    category: 'Music',
  },
  {
    id: '7',
    image: '/placeholder.svg?key=p9q4w',
    title: 'Marketing Strategy Masterclass',
    location: 'Los Angeles, CA',
    date: 'April 25, 2025',
    time: '02:00 PM',
    price: 79,
    category: 'Business',
  },
  {
    id: '8',
    image: '/placeholder.svg?key=r2s7t',
    title: 'AI & Machine Learning Summit',
    location: 'San Jose, CA',
    date: 'May 30, 2025',
    time: '09:30 AM',
    price: 129,
    category: 'Technology',
  },
];

const CATEGORIES = ['All', 'Technology', 'Music', 'Business'];
const PRICE_RANGES = [
  { label: 'All Prices', min: 0, max: Infinity },
  { label: 'Free', min: 0, max: 0 },
  { label: 'Under $50', min: 0, max: 50 },
  { label: '$50 - $100', min: 50, max: 100 },
  { label: 'Over $100', min: 100, max: Infinity },
];

export default function EventsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPriceRange, setSelectedPriceRange] = useState(PRICE_RANGES[0]);
  const [showFilters, setShowFilters] = useState(false);

  const filteredEvents = useMemo(() => {
    return ALL_EVENTS.filter((event) => {
      const matchesSearch =
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || event.category === selectedCategory;
      const matchesPrice = event.price >= selectedPriceRange.min && event.price <= selectedPriceRange.max;

      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [searchTerm, selectedCategory, selectedPriceRange]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Browse Events</h1>
          <p className="text-gray-600">Find and book events that interest you</p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search events by name or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none"
            />
          </div>
        </div>

        {/* Filters Toggle (Mobile) */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="md:hidden mb-6 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium"
        >
          {showFilters ? 'Hide Filters' : 'Show Filters'}
        </button>

        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <aside className={`${showFilters ? 'block' : 'hidden'} md:block md:w-48 flex-shrink-0`}>
            <div className="space-y-6">
              {/* Category Filter */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Category</h3>
                <div className="space-y-2">
                  {CATEGORIES.map((category) => (
                    <label key={category} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="category"
                        value={category}
                        checked={selectedCategory === category}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-4 h-4"
                      />
                      <span className="text-gray-700">{category}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Price Range</h3>
                <div className="space-y-2">
                  {PRICE_RANGES.map((range, idx) => (
                    <label key={idx} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="price"
                        checked={selectedPriceRange === range}
                        onChange={() => setSelectedPriceRange(range)}
                        className="w-4 h-4"
                      />
                      <span className="text-gray-700">{range.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Clear Filters */}
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('All');
                  setSelectedPriceRange(PRICE_RANGES[0]);
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 border-2 border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
              >
                <X size={18} />
                Clear Filters
              </button>
            </div>
          </aside>

          {/* Events Grid */}
          <div className="flex-1">
            {filteredEvents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEvents.map((event) => (
                  <EventCard
                    key={event.id}
                    id={event.id}
                    image={event.image}
                    title={event.title}
                    location={event.location}
                    date={event.date}
                    time={event.time}
                    price={event.price}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16">
                <p className="text-xl text-gray-600 mb-4">No events found matching your criteria</p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('All');
                    setSelectedPriceRange(PRICE_RANGES[0]);
                  }}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Clear Filters
                </button>
              </div>
            )}

            {/* Results Count */}
            <div className="mt-8 text-center text-gray-600">
              Showing {filteredEvents.length} of {ALL_EVENTS.length} events
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
