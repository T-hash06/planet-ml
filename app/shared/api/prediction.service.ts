/**
 * API Service - Prediction Endpoints
 * Service layer for interacting with the prediction API
 */

import { apiGet, apiPost } from './client';

/**
 * Tabular prediction request payload
 * 21 parameters based on the new model
 */
export interface TabularPredictionRequest {
	// Orbital parameters
	pl_orbper: number; // Orbital Period (days)
	pl_orbsmax: number; // Orbit Semi-Major Axis (AU)

	// Planet physical parameters
	pl_eqt: number; // Equilibrium Temperature (K)
	pl_insol: number; // Insolation Flux (Earth flux)
	pl_imppar: number; // Impact Parameter

	// Transit parameters
	pl_trandep: number; // Transit Depth (fraction)
	pl_trandur: number; // Transit Duration (hours)
	pl_ratdor: number; // Planet-Star Distance over Stellar Radius Ratio
	pl_ratror: number; // Planet-Star Radius Ratio

	// Stellar parameters
	st_teff: number; // Stellar Effective Temperature (K)
	st_rad: number; // Stellar Radius (Solar radii)
	st_mass: number; // Stellar Mass (Solar masses)
	st_met: number; // Stellar Metallicity [Fe/H] (dex)
	st_logg: number; // Stellar Surface Gravity (log10(cm/s²))

	// Photometry parameters (magnitudes)
	sy_gmag: number; // Gaia G-band magnitude
	sy_rmag: number; // r-band magnitude
	sy_imag: number; // i-band magnitude
	sy_zmag: number; // z-band magnitude
	sy_jmag: number; // 2MASS J-band magnitude
	sy_hmag: number; // 2MASS H-band magnitude
	sy_kmag: number; // 2MASS K-band magnitude
}

/**
 * Tabular prediction response
 */
export interface TabularPredictionResponse {
	predictedValue: number; // Probability (0-1)
	confidence: number; // Confidence (0-1)
	attributeWeights: Record<string, number>; // Feature importance weights
}

/**
 * Live preview prediction request payload
 * 6 normalized parameters for interactive demo
 */
export interface LivePreviewPredictionRequest {
	plTranmid: number; // Transit Midpoint (normalized 0-1)
	stPmdec: number; // Stellar Proper Motion (normalized 0-1)
	stTmag: number; // TESS Magnitude (normalized 0-1)
	stRade: number; // Stellar Radius (normalized 0-1)
	stDist: number; // Distance to Star (normalized 0-1)
	plRade: number; // Planetary Radius (normalized 0-1)
}

/**
 * Live preview prediction response
 */
export interface LivePreviewPredictionResponse {
	probability: number; // Probability (0-100)
}

/**
 * Health check response
 */
export interface HealthCheckResponse {
	status: string;
	model_loaded: boolean;
	timestamp: string;
}

/**
 * Make a tabular prediction request
 * @param params - The 21 parameter values
 * @returns Promise with prediction results
 */
export async function predictTabular(
	params: TabularPredictionRequest,
): Promise<TabularPredictionResponse> {
	return apiPost<TabularPredictionResponse>('predict/tabular', params);
}

/**
 * Make a live preview prediction request
 * @param params - The 6 normalized parameter values
 * @returns Promise with prediction results
 */
export async function predictLivePreview(
	params: LivePreviewPredictionRequest,
): Promise<LivePreviewPredictionResponse> {
	return apiPost<LivePreviewPredictionResponse>('predict/live-preview', params);
}

/**
 * Check API health status
 * @returns Promise with health check results
 */
export async function checkHealth(): Promise<HealthCheckResponse> {
	return apiGet<HealthCheckResponse>('health');
}
