/**
 * Mock data generation functions for tabular prediction API
 * Provides realistic fake responses for development and testing
 */

import type { PredictionRequest, PredictionResponse } from './tabular.types';

/**
 * List of all parameter names for generating attribute weights
 * Matches the PREFERRED_COLUMNS from the original specification
 */
const ALL_FEATURE_NAMES = [
	'pl_trandep',
	'pl_trandep_frac',
	'pl_trandeperr1',
	'pl_trandeperr2',
	'pl_trandur',
	'pl_trandurerr1',
	'pl_trandurerr2',
	'pl_orbper',
	'pl_orbpererr1',
	'pl_orbpererr2',
	'pl_ratror',
	'pl_ratrorerr1',
	'pl_ratrorerr2',
	'st_tmag',
	'sy_gaiamag',
	'sy_kmag',
	'sy_jmag',
	'sy_hmag',
	'sy_vmag',
	'sy_bmag',
	'sy_w1mag',
	'sy_w2mag',
	'sy_dist',
	'sy_plx',
	'sy_pm',
	'sy_pmra',
	'sy_pmdec',
	'st_rad',
	'st_teff',
	'st_mass',
	'st_logg',
	'st_dens',
	'st_vsin',
	'st_met',
	'st_nphot',
	'st_nrvc',
	'pl_ntranspec',
	'pl_nespec',
	'pl_ndispec',
	'st_nspec',
	'R_p_est_Rearth',
	'duty_cycle',
	'B_minus_V',
	'J_minus_K',
	'M_TESS',
	'depth_vs_noise',
	'rho_star_from_transit',
	'ttv_flag',
	'tran_flag',
	'rv_flag',
	'cb_flag',
	'pl_controv_flag',
	'pl_imppar',
	'pl_tranmid',
];

/**
 * Generate a random number within a range
 */
function randomInRange(min: number, max: number): number {
	return Math.random() * (max - min) + min;
}

/**
 * Generate random attribute weights for model interpretability
 * Returns 15-20 random features with positive and negative weights
 */
function generateAttributeWeights(): Record<string, number> {
	const weights: Record<string, number> = {};
	const numFeatures = Math.floor(randomInRange(15, 21)); // 15-20 features

	// Shuffle feature names and select random subset
	const shuffled = [...ALL_FEATURE_NAMES].sort(() => Math.random() - 0.5);
	const selectedFeatures = shuffled.slice(0, numFeatures);

	for (const feature of selectedFeatures) {
		// Generate weight between -1 and 1, with bias toward smaller absolute values
		const sign = Math.random() > 0.5 ? 1 : -1;
		const magnitude = Math.random() ** 2; // Bias toward smaller values
		weights[feature] = sign * magnitude;
	}
	return weights;
}

/**
 * Calculate a pseudo-realistic prediction based on input parameters
 * Uses simple heuristics to make the prediction feel responsive to inputs
 */
function calculatePredictedValue(params: PredictionRequest): number {
	// Simple heuristic: combine multiple factors
	// Higher transit depth -> higher probability
	const depthFactor = Math.min(params.pl_trandep / 10000, 1) * 0.3;

	// Longer orbital period -> slightly lower probability (hot Jupiters easier to detect)
	const periodFactor = Math.max(0, 1 - params.pl_orbper / 1000) * 0.2;

	// More observations -> higher probability
	const obsFactor = Math.min((params.st_nphot + params.st_nrvc) / 20, 1) * 0.15;

	// Better signal-to-noise -> higher probability
	const snrFactor = Math.min(params.depth_vs_noise / 100, 1) * 0.2;

	// Random component for variation
	const randomFactor = randomInRange(0, 0.15);

	// Base probability
	let probability =
		depthFactor + periodFactor + obsFactor + snrFactor + randomFactor;

	// Clamp between 0 and 1
	probability = Math.max(0, Math.min(1, probability));

	return probability;
}

/**
 * Calculate confidence level based on parameter quality
 * Higher confidence when errors are smaller and observations are more numerous
 */
function calculateConfidence(params: PredictionRequest): number {
	// Smaller relative errors -> higher confidence
	const depthError = Math.abs(params.pl_trandeperr1 / params.pl_trandep);
	const periodError = Math.abs(params.pl_orbpererr1 / params.pl_orbper);
	const errorFactor = Math.max(0, 1 - (depthError + periodError) / 2) * 0.4;

	// More observations -> higher confidence
	const totalObs = params.st_nphot + params.st_nrvc + params.pl_ntranspec;
	const obsFactor = Math.min(totalObs / 50, 1) * 0.3;

	// Better SNR -> higher confidence
	const snrFactor = Math.min(params.depth_vs_noise / 100, 1) * 0.2;

	// Random component
	const randomFactor = randomInRange(0, 0.1);

	let confidence = errorFactor + obsFactor + snrFactor + randomFactor;

	// Clamp between 0.5 and 1 (never too low confidence)
	confidence = Math.max(0.5, Math.min(1, confidence));

	return confidence;
}

/**
 * Generate a mocked prediction response
 * Simulates API delay and returns realistic prediction data
 *
 * @param params - The 52 parameter values from the form
 * @returns Promise resolving to prediction response after simulated delay
 */
export async function generateMockPrediction(
	params: PredictionRequest,
): Promise<PredictionResponse> {
	// Simulate API delay (300-800ms)
	const delay = randomInRange(300, 800);
	await new Promise((resolve) => setTimeout(resolve, delay));

	// Calculate prediction and confidence
	const predictedValue = calculatePredictedValue(params);
	const confidence = calculateConfidence(params);

	// Generate attribute weights
	const attributeWeights = generateAttributeWeights();

	return {
		predictedValue,
		confidence,
		attributeWeights,
	};
}

/**
 * Validate that all required parameters are present
 * Used for type safety and error checking
 */
export function validatePredictionRequest(
	params: unknown,
): params is PredictionRequest {
	if (typeof params !== 'object' || params === null) {
		return false;
	}

	const requiredFields = ALL_FEATURE_NAMES;
	const paramObj = params as Record<string, unknown>;

	for (const field of requiredFields) {
		if (typeof paramObj[field] !== 'number') {
			return false;
		}
	}

	return true;
}
