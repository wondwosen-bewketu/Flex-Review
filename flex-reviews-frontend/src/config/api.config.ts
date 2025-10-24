// API Configuration
// For development: uses Vite proxy (empty string)
// For production: set VITE_API_BASE environment variable in Vercel project settings
// Example: VITE_API_BASE=https://your-backend-url.vercel.app
export const API_BASE = import.meta.env.VITE_API_BASE || "";

// Note: For Vercel deployment, set the VITE_API_BASE environment variable
// in your Vercel project settings under Environment Variables