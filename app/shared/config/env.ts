/**
 * Environment Configuration
 * Centralized access to environment variables with type safety
 */

/**
 * Get the API base URL based on environment
 * In development: uses VITE_API_URL from .env (default: http://localhost:8000)
 * In production: uses /api path on same domain
 */
export function getApiUrl(): string {
	// Check if we're in browser environment
	if (typeof window === 'undefined') {
		// Server-side: use environment variable or default
		return import.meta.env.VITE_API_URL || 'http://localhost:8000';
	}

	// Client-side: check if we're in production
	if (import.meta.env.PROD) {
		// Production: use /api path on same domain
		return `${window.location.origin}/api`;
	}

	// Development: use environment variable or default
	return import.meta.env.VITE_API_URL || 'http://localhost:8000';
}

/**
 * API version prefix
 */
export const API_VERSION = 'v1';

/**
 * Get full API endpoint URL
 * @param path - The endpoint path (e.g., 'predict/tabular')
 * @returns Full URL including base URL and version
 */
export function getApiEndpoint(path: string): string {
	const baseUrl = getApiUrl();
	return `${baseUrl}/api/${API_VERSION}/${path}`;
}
