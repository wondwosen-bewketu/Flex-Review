import React from 'react';
import type { Property } from '../../types';

interface Props {
  property: Property;
}

const PropertyDetails: React.FC<Props> = ({ property }) => (
  <div className="mb-8">
    <div className="relative">
      <img 
        src={property.image} 
        alt={property.name} 
        className="w-full h-64 md:h-96 object-cover rounded-lg mb-4"
      />
      <div className="absolute bottom-4 left-4 bg-white bg-opacity-90 px-4 py-2 rounded-lg">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{property.name}</h1>
      </div>
    </div>
    
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">About this property</h2>
      <p className="text-gray-700 mb-6">{property.description}</p>
      
      <h3 className="text-lg font-medium mb-3">Amenities</h3>
      <div className="flex flex-wrap gap-2">
        {property.amenities.map((amenity, index) => (
          <span 
            key={index} 
            className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
          >
            {amenity}
          </span>
        ))}
      </div>
    </div>
  </div>
);

export default PropertyDetails;