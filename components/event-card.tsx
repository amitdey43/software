import Link from 'next/link';
import { Calendar, MapPin, DollarSign } from 'lucide-react';

interface EventCardProps {
  id: string;
  image: string;
  title: string;
  location: string;
  date: string;
  time: string;
  price: number;
}

export function EventCard({
  id,
  image,
  title,
  location,
  date,
  time,
  price,
}: EventCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition overflow-hidden">
      <div
        className="h-48 bg-gray-300 relative"
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      <div className="p-4 space-y-3">
        <h3 className="font-semibold text-lg text-gray-900 line-clamp-2">{title}</h3>

        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-blue-600" />
            <span>{location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar size={16} className="text-blue-600" />
            <span>{date} at {time}</span>
          </div>
          <div className="flex items-center gap-2">
            <DollarSign size={16} className="text-blue-600" />
            <span>{price === 0 ? 'Free' : `$${price}`}</span>
          </div>
        </div>

        <Link
          href={`/events/${id}`}
          className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-center font-medium"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
