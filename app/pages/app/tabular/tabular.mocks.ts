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
 * Generate attribute weights based on actual parameter values and predicted probability
 * Weights are correlated with:
 * 1. Parameter values (deviation from defaults)
 * 2. Predicted probability (positive weights dominate when probability is high)
 * Prioritizes features with non-default values
 * Returns 15-20 features with positive and negative weights
 */
function generateAttributeWeights(
	params: PredictionRequest,
	predictedProbability: number,
): Record<string, number> {
	const weights: Record<string, number> = {};

	// Get default values to identify modified parameters
	const defaultValues: Record<string, number> = {
		pl_trandep: 5000,
		pl_trandep_frac: 0.005,
		pl_trandeperr1: 100,
		pl_trandeperr2: -100,
		pl_trandur: 3.5,
		pl_trandurerr1: 0.1,
		pl_trandurerr2: -0.1,
		pl_orbper: 10,
		pl_orbpererr1: 0.01,
		pl_orbpererr2: -0.01,
		pl_ratror: 0.1,
		pl_ratrorerr1: 0.005,
		pl_ratrorerr2: -0.005,
		st_tmag: 10,
		sy_gaiamag: 12,
		sy_kmag: 9,
		sy_jmag: 10,
		sy_hmag: 9.5,
		sy_vmag: 11,
		sy_bmag: 11.5,
		sy_w1mag: 8.5,
		sy_w2mag: 8.5,
		sy_dist: 100,
		sy_plx: 10,
		sy_pm: 50,
		sy_pmra: 0,
		sy_pmdec: 0,
		st_rad: 1,
		st_teff: 5778,
		st_mass: 1,
		st_logg: 4.44,
		st_dens: 1.41,
		st_vsin: 2,
		st_met: 0,
		st_nphot: 1,
		st_nrvc: 0,
		pl_ntranspec: 0,
		pl_nespec: 0,
		pl_ndispec: 0,
		st_nspec: 0,
		R_p_est_Rearth: 1,
		duty_cycle: 0.05,
		B_minus_V: 0.65,
		J_minus_K: 0.5,
		M_TESS: 5,
		depth_vs_noise: 10,
		rho_star_from_transit: 1.41,
		ttv_flag: 0,
		tran_flag: 1,
		rv_flag: 0,
		cb_flag: 0,
		pl_controv_flag: 0,
		pl_imppar: 0.5,
		pl_tranmid: 2458000,
	};

	// Calculate importance scores based on deviation from defaults
	const featureImportance: Array<{
		name: string;
		importance: number;
		contributeToDetection: boolean;
	}> = [];

	for (const featureName of ALL_FEATURE_NAMES) {
		const currentValue = params[featureName as keyof PredictionRequest];
		const defaultValue = defaultValues[featureName];

		// Calculate relative deviation from default
		let deviation = 0;
		if (defaultValue !== 0) {
			deviation = Math.abs((currentValue - defaultValue) / defaultValue);
		} else {
			deviation = Math.abs(currentValue) > 0 ? 1 : 0;
		}

		// Add baseline importance for key features (always include these)
		const keyFeatures = [
			'pl_trandep',
			'pl_orbper',
			'pl_trandur',
			'depth_vs_noise',
			'st_tmag',
			'st_teff',
			'st_rad',
			'pl_ratror',
		];
		const baselineImportance = keyFeatures.includes(featureName) ? 0.3 : 0;

		// Combine deviation with baseline
		const importance = Math.min(deviation + baselineImportance, 1);

		// Determine if this feature contributes positively to detection
		let contributeToDetection = false;

		// Transit depth, SNR, observations -> contribute positively
		if (
			featureName.includes('trandep') ||
			featureName.includes('depth_vs_noise') ||
			featureName.includes('nphot') ||
			featureName.includes('nrvc') ||
			featureName === 'tran_flag'
		) {
			contributeToDetection = currentValue > defaultValue;
		}
		// Magnitude values -> brighter (lower values) contribute positively
		else if (featureName.includes('mag')) {
			contributeToDetection = currentValue < defaultValue;
		}
		// Errors -> smaller errors contribute positively
		else if (featureName.includes('err')) {
			contributeToDetection = Math.abs(currentValue) < Math.abs(defaultValue);
		}
		// Distance -> closer (lower values) contribute positively
		else if (featureName === 'sy_dist') {
			contributeToDetection = currentValue < defaultValue;
		}
		// Stellar radius/mass -> appropriate values contribute positively
		else if (featureName === 'st_rad' || featureName === 'st_mass') {
			contributeToDetection = currentValue > defaultValue * 0.8;
		}
		// Default: based on value relative to default
		else {
			contributeToDetection = currentValue > defaultValue;
		}

		featureImportance.push({
			name: featureName,
			importance,
			contributeToDetection,
		});
	}

	// Sort by importance (descending)
	featureImportance.sort((a, b) => b.importance - a.importance);

	// Select top 18-22 features (with some randomness)
	const numFeatures = Math.floor(randomInRange(18, 23));
	const selectedFeatures = featureImportance.slice(0, numFeatures);

	// Calculate desired ratio of positive to negative weights based on probability
	// High probability (>0.7) -> 70-80% positive weights
	// Medium probability (0.4-0.7) -> 50-60% positive weights
	// Low probability (<0.4) -> 20-30% positive weights
	let targetPositiveRatio: number;
	if (predictedProbability > 0.7) {
		targetPositiveRatio = randomInRange(0.7, 0.8);
	} else if (predictedProbability > 0.4) {
		targetPositiveRatio = randomInRange(0.5, 0.6);
	} else {
		targetPositiveRatio = randomInRange(0.2, 0.3);
	}

	// Separate features by their natural contribution tendency
	const positiveContributors = selectedFeatures.filter(
		(f) => f.contributeToDetection,
	);
	const negativeContributors = selectedFeatures.filter(
		(f) => !f.contributeToDetection,
	);

	// Calculate how many positive weights we need
	const targetPositiveCount = Math.round(
		selectedFeatures.length * targetPositiveRatio,
	);

	// Generate weights ensuring the ratio matches predicted probability
	let positiveCount = 0;

	for (const feature of selectedFeatures) {
		const { name, importance, contributeToDetection } = feature;

		// Decide sign based on:
		// 1. Natural contribution of the feature
		// 2. Target positive/negative ratio
		let sign = 1;

		if (positiveCount < targetPositiveCount) {
			// Need more positive weights
			if (contributeToDetection || negativeContributors.length === 0) {
				sign = 1;
				positiveCount++;
			} else {
				sign = -1;
			}
		} else {
			// Need more negative weights
			if (!contributeToDetection || positiveContributors.length === 0) {
				sign = -1;
			} else {
				sign = 1;
				positiveCount++;
			}
		}

		// Weight magnitude based on importance (0 to 1)
		// Higher importance = higher absolute weight
		// Scale magnitude slightly with probability for realism
		const probabilityScale = 0.7 + predictedProbability * 0.3; // Range: 0.7-1.0
		const magnitude = importance * randomInRange(0.6, 1.0) * probabilityScale;

		weights[name] = sign * magnitude;
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

	// Generate attribute weights based on parameter values AND predicted probability
	// This ensures weights are consistent with the prediction result
	const attributeWeights = generateAttributeWeights(params, predictedValue);

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
