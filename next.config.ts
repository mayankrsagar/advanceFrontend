import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
   domains: [
      'ml.globenewswire.com',
      // include other domains as needed
      'openweathermap.org',
      'www.zdnet.com',
      'i12.haber7.net',
      "scienceblog.com",
      "i0.wp.com" ,
    ],
  },
};

export default nextConfig;
