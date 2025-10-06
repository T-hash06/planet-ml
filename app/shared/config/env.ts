/**
 * Environment Configuration
 * Centralized access to environment variables with type safety
 */

/**
 * Get the API base URL based on environment
 * In development: uses VITE_API_URL from .env (default: https://backend-nsac.wittywave-105d9d7b.eastus2.azurecontainerapps.io/docs)
 * In production: uses /api path on same domain
 */
export function getApiUrl(): string {
	// Check if we're in browser environment
	if (typeof window === 'undefined') {
		// Server-side: use environment variable or default
		return 'https://backend-nsac.wittywave-105d9d7b.eastus2.azurecontainerapps.io/';
	}

	// Development: use environment variable or default
	return 'https://backend-nsac.wittywave-105d9d7b.eastus2.azurecontainerapps.io/';
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
