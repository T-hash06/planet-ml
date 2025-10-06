/**
 * API Client
 * Centralized HTTP client with error handling and type safety
 */

import { getApiEndpoint } from '../config/env';

/**
 * Standard API error response from backend
 */
export interface ApiErrorResponse {
	error: {
		code: string;
		message: string;
		details?: Record<string, unknown>;
	};
	timestamp: string;
	requestId: string;
}

/**
 * Standard API success response wrapper from backend
 */
export interface ApiResponse<T> {
	data: T;
	timestamp: string;
	requestId: string;
}

/**
 * Custom error class for API errors
 */
export class ApiError extends Error {
	constructor(
		public code: string,
		message: string,
		public details?: Record<string, unknown>,
		public requestId?: string,
	) {
		super(message);
		this.name = 'ApiError';
	}
}

/**
 * HTTP request options
 */
interface RequestOptions {
	method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
	body?: unknown;
	headers?: Record<string, string>;
}

/**
 * Make an HTTP request to the API
 * @param endpoint - The API endpoint path (e.g., 'predict/tabular')
 * @param options - Request options (method, body, headers)
 * @returns Promise with the response data
 * @throws ApiError if the request fails
 */
export async function apiRequest<T>(
	endpoint: string,
	options: RequestOptions = {},
): Promise<T> {
	const { method = 'GET', body, headers = {} } = options;

	const url = getApiEndpoint(endpoint);

	const requestHeaders: Record<string, string> = {
		'Content-Type': 'application/json',
		...headers,
	};

	try {
		const response = await fetch(url, {
			method,
			headers: requestHeaders,
			body: body ? JSON.stringify(body) : undefined,
		});

		// Parse response as JSON
		const responseData = await response.json();

		// Handle error responses
		if (!response.ok) {
			const errorResponse = responseData as ApiErrorResponse;
			throw new ApiError(
				errorResponse.error.code,
				errorResponse.error.message,
				errorResponse.error.details,
				errorResponse.requestId,
			);
		}

		// Extract data from the standard response wrapper
		const successResponse = responseData as ApiResponse<T>;
		return successResponse.data;
	} catch (error) {
		// Re-throw ApiError as is
		if (error instanceof ApiError) {
			throw error;
		}

		// Handle network errors
		if (error instanceof TypeError) {
			throw new ApiError(
				'NETWORK_ERROR',
				'Unable to connect to the API. Please check your internet connection.',
			);
		}

		// Handle JSON parse errors
		if (error instanceof SyntaxError) {
			throw new ApiError(
				'PARSE_ERROR',
				'Invalid response from the server. Please try again.',
			);
		}

		// Handle unknown errors
		throw new ApiError(
			'UNKNOWN_ERROR',
			error instanceof Error ? error.message : 'An unexpected error occurred.',
		);
	}
}

/**
 * Make a GET request
 */
export async function apiGet<T>(endpoint: string): Promise<T> {
	return apiRequest<T>(endpoint, { method: 'GET' });
}

/**
 * Make a POST request
 */
export async function apiPost<T>(endpoint: string, body: unknown): Promise<T> {
	return apiRequest<T>(endpoint, { method: 'POST', body });
}
