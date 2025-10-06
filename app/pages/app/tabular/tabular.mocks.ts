/**
 * Mock data generation functions for tabular prediction API
 * Provides realistic fake responses for development and testing
 */

import type { PredictionRequest, PredictionResponse } from './tabular.types';

/**
 * List of all parameter names for generating attribute weights
 * Matches the new 21-parameter model structure
 */
const ALL_FEATURE_NAMES = [
	'pl_orbper',
	'pl_orbsmax',
	'pl_eqt',
	'pl_insol',
	'pl_imppar',
	'pl_trandep',
	'pl_trandur',
	'pl_ratdor',
	'pl_ratror',
	'st_teff',
	'st_rad',
	'st_mass',
	'st_met',
	'st_logg',
	'sy_gmag',
	'sy_rmag',
	'sy_imag',
	'sy_zmag',
	'sy_jmag',
	'sy_hmag',
	'sy_kmag',
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
		pl_orbper: 10,
		pl_orbsmax: 0.06,
		pl_eqt: 1000,
		pl_insol: 500,
		pl_imppar: 0.55,
		pl_trandep: 0.2,
		pl_trandur: 4,
		pl_ratdor: 15,
		pl_ratror: 0.1,
		st_teff: 5700,
		st_rad: 1,
		st_mass: 0.96,
		st_met: -0.05,
		st_logg: 4.45,
		sy_gmag: 15,
		sy_rmag: 14.4,
		sy_imag: 14.2,
		sy_zmag: 14.2,
		sy_jmag: 12.8,
		sy_hmag: 12.5,
		sy_kmag: 12.4,
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
			'pl_ratror',
			'st_teff',
			'st_rad',
			'st_mass',
			'pl_insol',
		];
		const baselineImportance = keyFeatures.includes(featureName) ? 0.3 : 0;

		// Combine deviation with baseline
		const importance = Math.min(deviation + baselineImportance, 1);

		// Determine if this feature contributes positively to detection
		let contributeToDetection = false;

		// Transit depth, duration -> larger values contribute positively
		if (featureName === 'pl_trandep' || featureName === 'pl_trandur') {
			contributeToDetection = currentValue > defaultValue;
		}
		// Magnitude values -> brighter (lower values) contribute positively
		else if (featureName.includes('mag')) {
			contributeToDetection = currentValue < defaultValue;
		}
		// Orbital period -> shorter periods (hot planets) easier to detect
		else if (featureName === 'pl_orbper') {
			contributeToDetection = currentValue < defaultValue * 1.2;
		}
		// Stellar parameters -> solar-like values contribute positively
		else if (featureName === 'st_teff') {
			contributeToDetection = Math.abs(currentValue - 5700) < 1000;
		} else if (featureName === 'st_rad' || featureName === 'st_mass') {
			contributeToDetection =
				currentValue > defaultValue * 0.7 && currentValue < defaultValue * 1.3;
		}
		// Impact parameter -> lower values (central transits) contribute positively
		else if (featureName === 'pl_imppar') {
			contributeToDetection = currentValue < defaultValue;
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
	// Higher transit depth -> higher probability (depth in %)
	const depthFactor = Math.min(params.pl_trandep / 3, 1) * 0.25;

	// Shorter orbital period -> higher probability (hot planets easier to detect)
	const periodFactor = Math.max(0, 1 - params.pl_orbper / 100) * 0.2;

	// Longer transit duration -> higher probability
	const durationFactor = Math.min(params.pl_trandur / 10, 1) * 0.15;

	// Brighter star (lower magnitude) -> higher probability
	const brightnessFactor = Math.max(0, 1 - (params.sy_gmag - 10) / 10) * 0.15;

	// Higher insolation flux -> higher probability (easier to detect hot planets)
	const insolFactor = Math.min(params.pl_insol / 2000, 1) * 0.1;

	// Random component for variation
	const randomFactor = randomInRange(0, 0.15);

	// Base probability
	let probability =
		depthFactor +
		periodFactor +
		durationFactor +
		brightnessFactor +
		insolFactor +
		randomFactor;

	// Clamp between 0 and 1
	probability = Math.max(0, Math.min(1, probability));

	return probability;
}

/**
 * Calculate confidence level based on parameter quality
 * Higher confidence when data quality is better
 */
function calculateConfidence(params: PredictionRequest): number {
	// Higher transit depth -> higher confidence (easier to detect)
	const depthFactor = Math.min(params.pl_trandep / 2, 1) * 0.25;

	// Longer transit duration -> higher confidence
	const durationFactor = Math.min(params.pl_trandur / 8, 1) * 0.2;

	// Brighter star -> higher confidence
	const brightnessFactor = Math.max(0, 1 - (params.sy_gmag - 10) / 10) * 0.25;

	// Impact parameter close to 0 (central transit) -> higher confidence
	const impactFactor = Math.max(0, 1 - Math.abs(params.pl_imppar) / 1) * 0.2;

	// Random component
	const randomFactor = randomInRange(0, 0.1);

	let confidence =
		depthFactor +
		durationFactor +
		brightnessFactor +
		impactFactor +
		randomFactor;

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
