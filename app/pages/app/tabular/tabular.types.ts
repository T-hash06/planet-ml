/**
 * Type definitions for the Tabular Data Predictor feature
 * Defines parameter configurations, API request/response types, and enums
 */

/**
 * Parameter group categories for logical organization
 * Groups astronomical parameters by their measurement domain
 */
export enum ParameterGroup {
	TRANSIT = 'TRANSIT',
	DURATION = 'DURATION',
	ORBITAL = 'ORBITAL',
	RATIO = 'RATIO',
	PHOTOMETRY = 'PHOTOMETRY',
	ASTROMETRY = 'ASTROMETRY',
	STELLAR = 'STELLAR',
	OBSERVATIONS = 'OBSERVATIONS',
	DERIVED = 'DERIVED',
	FLAGS = 'FLAGS',
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
 * Contains all 52 parameter values
 */
export interface PredictionRequest {
	// Transit parameters
	pl_trandep: number;
	pl_trandep_frac: number;
	pl_trandeperr1: number;
	pl_trandeperr2: number;

	// Duration parameters
	pl_trandur: number;
	pl_trandurerr1: number;
	pl_trandurerr2: number;

	// Orbital period parameters
	pl_orbper: number;
	pl_orbpererr1: number;
	pl_orbpererr2: number;

	// Ratio parameters
	pl_ratror: number;
	pl_ratrorerr1: number;
	pl_ratrorerr2: number;

	// Photometry parameters
	st_tmag: number;
	sy_gaiamag: number;
	sy_kmag: number;
	sy_jmag: number;
	sy_hmag: number;
	sy_vmag: number;
	sy_bmag: number;
	sy_w1mag: number;
	sy_w2mag: number;

	// Astrometry parameters
	sy_dist: number;
	sy_plx: number;
	sy_pm: number;
	sy_pmra: number;
	sy_pmdec: number;

	// Stellar parameters
	st_rad: number;
	st_teff: number;
	st_mass: number;
	st_logg: number;
	st_dens: number;
	st_vsin: number;
	st_met: number;

	// Observation parameters
	st_nphot: number;
	st_nrvc: number;
	pl_ntranspec: number;
	pl_nespec: number;
	pl_ndispec: number;
	st_nspec: number;

	// Derived parameters
	R_p_est_Rearth: number;
	duty_cycle: number;
	B_minus_V: number;
	J_minus_K: number;
	M_TESS: number;
	depth_vs_noise: number;
	rho_star_from_transit: number;

	// Flag parameters
	ttv_flag: number;
	tran_flag: number;
	rv_flag: number;
	cb_flag: number;
	pl_controv_flag: number;
	pl_imppar: number;
	pl_tranmid: number;
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
