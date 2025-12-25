'use client';
import { useProperty } from '../context/PropertyContext';

export default function Notification() {
  const { notification, setNotification } = useProperty();

  if (!notification) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-in slide-in-from-bottom duration-300">
      <div className={`p-4 rounded-lg shadow-lg border ${
        notification.type === 'success' 
          ? 'bg-green-50 border-green-200 text-green-800' 
          : 'bg-blue-50 border-blue-200 text-blue-800'
      }`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {notification.type === 'success' && (
              <svg className="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            )}
            <p className="font-medium">{notification.message}</p>
          </div>
          <button
            onClick={() => setNotification(null)}
            className="ml-4 text-gray-500 hover:text-gray-700 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}