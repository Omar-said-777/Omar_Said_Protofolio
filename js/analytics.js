/**
 * Vercel Web Analytics Initialization
 * 
 * This file initializes Vercel Web Analytics using the @vercel/analytics package.
 * The inject() function automatically loads and configures the analytics script.
 */

import { inject } from '../node_modules/@vercel/analytics/dist/index.mjs';

// Initialize Vercel Analytics
// In development, this will show debug messages
// In production (when deployed to Vercel), this will track page views
inject();

// Analytics is now active and will automatically track page views
// You can also manually track custom events using window.va if needed
