/**
 * Type definitions for the Tabular Data Predictor feature
 * Defines parameter configurations, API request/response types, and enums
 */

/**
 * Parameter group categories for logical organization
 * Groups astronomical parameters by their measurement domain
 */
export enum ParameterGroup {
	ORBITAL = 'ORBITAL',
	PLANET = 'PLANET',
	TRANSIT = 'TRANSIT',
	STELLAR = 'STELLAR',
	PHOTOMETRY = 'PHOTOMETRY',
}

/**
 * Configuration for a single tabular parameter
 * Defines bounds, display properties, and metadata
 */
export interface TabularParameter {
	/** Internal parameter name (matches PREFERRED_COLUMNS) */
	name: string;
	/** Human-readable label for UI display */
	label: string;
	/** Detailed description of the parameter */
	description: string;
	/** Minimum allowed value */
	min: number;
	/** Maximum allowed value */
	max: number;
	/** Step increment for slider */
	step: number;
	/** Default value on initial load */
	defaultValue: number;
	/** Unit of measurement (optional) */
	unit?: string;
	/** Parameter group for organization */
	group: ParameterGroup;
}

/**
 * Request payload for prediction API
 * Contains all 21 parameter values based on the new model
 */
export interface PredictionRequest {
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
 * Single feature weight/importance from model
 * Represents the contribution of a feature to the prediction
 */
export interface AttributeWeight {
	/** Feature name */
	feature: string;
	/** Weight value (positive or negative) */
	weight: number;
}

/**
 * Response from prediction API
 * Contains prediction result, confidence, and model interpretability
 */
export interface PredictionResponse {
	/** Predicted probability value (0-1) */
	predictedValue: number;
	/** Model confidence level (0-1) */
	confidence: number;
	/** Object mapping feature names to their weights */
	attributeWeights: Record<string, number>;
}

/**
 * Processed chart data for Recharts visualization
 * Ready-to-render format for horizontal bar chart
 */
export interface ChartDataPoint {
	/** Human-readable feature name */
	feature: string;
	/** Weight value */
	weight: number;
	/** Color identifier (primary or danger) */
	color: string;
}
