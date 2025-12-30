// This is a Server Component by default
import PropertyDetailsClient from './PropertyDetailsClient';

export default async function PropertyDetailsPage({ params }) {
  // Await params because it's now a Promise in Next.js 13+
  const unwrappedParams = await params;
  const propertyId = unwrappedParams.id;

  // Pass propertyId as prop to your Client Component
  return <PropertyDetailsClient propertyId={propertyId} />;
}
