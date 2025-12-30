'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function AuthSideVisual({ role = 'tenant' }) {
  const isTenant = role === 'tenant';

  return (
    <div
      className={`hidden lg:flex w-1/2 relative overflow-hidden
        ${isTenant
          ? 'bg-gradient-to-br from-blue-600 via-sky-500 to-blue-400'
          : 'bg-gradient-to-br from-emerald-600 via-green-500 to-emerald-400'
        }`}
    >
      {/* Floating blobs */}
      <motion.div
        className="absolute top-20 left-20 w-72 h-72 bg-white/20 rounded-full blur-3xl"
        animate={{ y: [0, 30, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-20 right-20 w-96 h-96 bg-white/10 rounded-full blur-3xl"
        animate={{ y: [0, -40, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 flex flex-col justify-center px-16 text-white"
      >
        <h2 className="text-4xl font-bold mb-4 leading-tight">
          {isTenant
            ? 'Find your next home'
            : 'Manage properties smarter'}
        </h2>

        <p className="text-lg opacity-90 max-w-md mb-10">
          {isTenant
            ? 'Search, apply, and settle in — stress free.'
            : 'Track rent, tenants, and growth from one dashboard.'}
        </p>

        {/* Floating Image */}
        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
        >
          <Image
            src={isTenant ? 'Rentmate\frontend\app\(public)\auth\tenant.svg' : '/auth/owner.svg'}
            alt="Auth Illustration"
            width={420}
            height={420}
            priority
          />
        </motion.div>
      </motion.div>
    </div>
  );
}