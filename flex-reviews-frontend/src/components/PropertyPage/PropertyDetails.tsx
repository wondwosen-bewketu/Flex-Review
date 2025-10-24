import React from 'react';
import type { Property } from '../../types';
import { FiMapPin, FiWifi, FiAirplay, FiCoffee, FiHeart } from "react-icons/fi";

interface Props {
  property: Property;
}

const PropertyDetails: React.FC<Props> = ({ property }) => {
  const renderAmenityIcon = (amenity: string) => {
    switch (amenity) {
      case "WiFi":
        return <FiWifi className="mr-2 text-indigo-500" />;
      case "AC":
        return <FiAirplay className="mr-2 text-indigo-500" />;
      case "Coffee":
        return <FiCoffee className="mr-2 text-indigo-500" />;
      default:
        return <FiHeart className="mr-2 text-indigo-500" />;
    }
  };

  return (
    <div className="max-w-5xl mx-auto my-12 shadow-2xl rounded-3xl overflow-hidden bg-gradient-to-b from-white/80 to-white/90 backdrop-blur-md border border-white/20">
      {/* Hero Section */}
      <div className="relative w-full h-96">
        <img
          src={property.image}
          alt={property.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        <div className="absolute bottom-8 left-8">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg animate-fadeIn">
            {property.name}
          </h1>
          <p className="mt-2 text-lg md:text-xl text-blue-100 tracking-wide">
            Premium Urban Retreat
          </p>
        </div>
      </div>

      {/* Details Card */}
      <div className="p-10 space-y-6">
        <h2 className="text-3xl font-semibold text-slate-800 border-b pb-3">
          Property Highlights
        </h2>
        <p className="text-slate-700 text-lg leading-relaxed tracking-wide">
          {property.description}
        </p>

        {/* Amenities */}
        <h3 className="text-2xl font-medium text-slate-800 mb-4 flex items-center">
          <FiMapPin className="mr-3 text-amber-500 text-xl" />
          Amenities
        </h3>
        <div className="flex flex-wrap gap-4">
          {property.amenities.map((amenity, index) => (
            <div
              key={index}
              className="flex items-center gap-2 px-5 py-3 bg-indigo-50 text-indigo-700 rounded-full font-medium shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
            >
              {renderAmenityIcon(amenity)}
              {amenity}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
