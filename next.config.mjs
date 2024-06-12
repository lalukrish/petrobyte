/** @type {import('next').NextConfig} */
import dotenv from 'dotenv'
dotenv.config()

const nextConfig =  {
    env: {
      API_URL: process.env.NEXT_PUBLIC_API_URL,
    },
  };




export default nextConfig;
