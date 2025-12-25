// app/properties/[id]/page.js
//import PropertyDetails from '../../components/PropertyDetails';
//import { properties } from '../../data/properties';

import PropertyDetails from '../../components/PropertyDetails';
import { properties } from '../../data/properties';

export default async function PropertyPage({ params }) {
  // Await the params promise
  const { id } = await params;
  
  console.log('Property ID from URL:', id);
  
  const property = properties.find(p => p.id === id);

  if (!property) {
    return (
      <div className="page-container">
        <div className="content-container">
          <div className="card text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Property Not Found</h1>
            <p className="text-gray-600 mb-2">
              The property with ID "{id}" doesn't exist.
            </p>
            <p className="text-sm text-gray-500 mb-4">Available IDs: {properties.map(p => p.id).join(', ')}</p>
            <a 
              href="/" 
              className="btn-primary"
            >
              Back to Home
            </a>
          </div>
        </div>
      </div>
    );
  }

  return <PropertyDetails property={property} />;
}