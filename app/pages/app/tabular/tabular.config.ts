/**
 * Configuration for all 21 tabular parameters
 * Defines bounds, defaults, labels, and groupings for the parameter panel
 * Based on the new simplified model structure
 */

import { ParameterGroup, type TabularParameter } from './tabular.types';

/**
 * Complete configuration array for all tabular parameters
 * Organized by parameter groups for logical UI presentation
 */
export const TABULAR_PARAMETERS: TabularParameter[] = [
	// ==================== ORBITAL GROUP ====================
	{
		name: 'pl_orbper',
		label: 'Orbital Period',
		description: 'Time for one complete orbit around the host star',
		min: 0,
		max: 100,
		step: 0.01,
		defaultValue: 10,
		unit: 'days',
		group: ParameterGroup.ORBITAL,
	},
	{
		name: 'pl_orbsmax',
		label: 'Orbit Semi-Major Axis',
		description: 'Semi-major axis of the planetary orbit',
		min: 0,
		max: 0.5,
		step: 0.001,
		defaultValue: 0.06,
		unit: 'AU',
		group: ParameterGroup.ORBITAL,
	},

	// ==================== PLANET GROUP ====================
	{
		name: 'pl_eqt',
		label: 'Equilibrium Temperature',
		description: 'Planetary equilibrium temperature',
		min: 0,
		max: 4000,
		step: 10,
		defaultValue: 1000,
		unit: 'K',
		group: ParameterGroup.PLANET,
	},
	{
		name: 'pl_insol',
		label: 'Insolation Flux',
		description: 'Incident stellar flux on the planet',
		min: 0,
		max: 7000,
		step: 10,
		defaultValue: 500,
		unit: 'Earth flux',
		group: ParameterGroup.PLANET,
	},
	{
		name: 'pl_imppar',
		label: 'Impact Parameter',
		description: 'Impact parameter of the planetary transit',
		min: -1,
		max: 2,
		step: 0.01,
		defaultValue: 0.55,
		unit: '',
		group: ParameterGroup.PLANET,
	},

	// ==================== TRANSIT GROUP ====================
	{
		name: 'pl_trandep',
		label: 'Transit Depth',
		description: 'Depth of the planetary transit',
		min: 0,
		max: 6,
		step: 0.0001,
		defaultValue: 0.2,
		unit: '%',
		group: ParameterGroup.TRANSIT,
	},
	{
		name: 'pl_trandur',
		label: 'Transit Duration',
		description: 'Duration of the planetary transit',
		min: 0,
		max: 15,
		step: 0.01,
		defaultValue: 4,
		unit: 'hours',
		group: ParameterGroup.TRANSIT,
	},
	{
		name: 'pl_ratdor',
		label: 'Distance-to-Radius Ratio',
		description: 'Ratio of planet-star distance to stellar radius',
		min: 0,
		max: 100,
		step: 0.1,
		defaultValue: 15,
		unit: '',
		group: ParameterGroup.TRANSIT,
	},
	{
		name: 'pl_ratror',
		label: 'Planet-Star Radius Ratio',
		description: 'Ratio of planet radius to stellar radius',
		min: 0,
		max: 1,
		step: 0.0001,
		defaultValue: 0.1,
		unit: '',
		group: ParameterGroup.TRANSIT,
	},

	// ==================== STELLAR GROUP ====================
	{
		name: 'st_teff',
		label: 'Stellar Temperature',
		description: 'Effective temperature of the host star',
		min: 3000,
		max: 8000,
		step: 10,
		defaultValue: 5700,
		unit: 'K',
		group: ParameterGroup.STELLAR,
	},
	{
		name: 'st_rad',
		label: 'Stellar Radius',
		description: 'Radius of the host star',
		min: 0,
		max: 3,
		step: 0.01,
		defaultValue: 1,
		unit: 'R☉',
		group: ParameterGroup.STELLAR,
	},
	{
		name: 'st_mass',
		label: 'Stellar Mass',
		description: 'Mass of the host star',
		min: 0,
		max: 2,
		step: 0.01,
		defaultValue: 0.96,
		unit: 'M☉',
		group: ParameterGroup.STELLAR,
	},
	{
		name: 'st_met',
		label: 'Stellar Metallicity',
		description: 'Metallicity [Fe/H] of the host star',
		min: -1,
		max: 0.5,
		step: 0.01,
		defaultValue: -0.05,
		unit: 'dex',
		group: ParameterGroup.STELLAR,
	},
	{
		name: 'st_logg',
		label: 'Surface Gravity',
		description: 'Logarithm of stellar surface gravity',
		min: 3,
		max: 5.5,
		step: 0.01,
		defaultValue: 4.45,
		unit: 'log(cm/s²)',
		group: ParameterGroup.STELLAR,
	},

	// ==================== PHOTOMETRY GROUP ====================
	{
		name: 'sy_gmag',
		label: 'G-band Magnitude',
		description: 'Gaia G-band apparent magnitude',
		min: 10,
		max: 20,
		step: 0.01,
		defaultValue: 15,
		unit: 'mag',
		group: ParameterGroup.PHOTOMETRY,
	},
	{
		name: 'sy_rmag',
		label: 'r-band Magnitude',
		description: 'Sloan r-band apparent magnitude',
		min: 10,
		max: 19,
		step: 0.01,
		defaultValue: 14.4,
		unit: 'mag',
		group: ParameterGroup.PHOTOMETRY,
	},
	{
		name: 'sy_imag',
		label: 'i-band Magnitude',
		description: 'Sloan i-band apparent magnitude',
		min: 10,
		max: 18,
		step: 0.01,
		defaultValue: 14.2,
		unit: 'mag',
		group: ParameterGroup.PHOTOMETRY,
	},
	{
		name: 'sy_zmag',
		label: 'z-band Magnitude',
		description: 'Sloan z-band apparent magnitude',
		min: 10,
		max: 18,
		step: 0.01,
		defaultValue: 14.2,
		unit: 'mag',
		group: ParameterGroup.PHOTOMETRY,
	},
	{
		name: 'sy_jmag',
		label: 'J-band Magnitude',
		description: '2MASS J-band apparent magnitude',
		min: 6,
		max: 17,
		step: 0.01,
		defaultValue: 12.8,
		unit: 'mag',
		group: ParameterGroup.PHOTOMETRY,
	},
	{
		name: 'sy_hmag',
		label: 'H-band Magnitude',
		description: '2MASS H-band apparent magnitude',
		min: 6,
		max: 17,
		step: 0.01,
		defaultValue: 12.5,
		unit: 'mag',
		group: ParameterGroup.PHOTOMETRY,
	},
	{
		name: 'sy_kmag',
		label: 'K-band Magnitude',
		description: '2MASS K-band apparent magnitude',
		min: 6,
		max: 17,
		step: 0.01,
		defaultValue: 12.4,
		unit: 'mag',
		group: ParameterGroup.PHOTOMETRY,
	},
];

/**
 * Helper function to get default values for all parameters
 * Used for form initialization
 */
export function getDefaultValues(): Record<string, number> {
	return TABULAR_PARAMETERS.reduce(
		(acc, param) => {
			acc[param.name] = param.defaultValue;
			return acc;
		},
		{} as Record<string, number>,
	);
}

/**
 * Helper function to group parameters by their group type
 * Returns a map of group -> parameters array
 */
export function getGroupedParameters(): Map<
	ParameterGroup,
	TabularParameter[]
> {
	const grouped = new Map<ParameterGroup, TabularParameter[]>();

	for (const param of TABULAR_PARAMETERS) {
		const existing = grouped.get(param.group);
		if (existing) {
			existing.push(param);
		} else {
			grouped.set(param.group, [param]);
		}
	}

	return grouped;
}

/**
 * Human-readable labels for parameter groups
 * Used for UI display in accordion headers
 */
export const PARAMETER_GROUP_LABELS: Record<ParameterGroup, string> = {
	[ParameterGroup.ORBITAL]: 'Orbital Parameters',
	[ParameterGroup.PLANET]: 'Planetary Properties',
	[ParameterGroup.TRANSIT]: 'Transit Parameters',
	[ParameterGroup.STELLAR]: 'Stellar Properties',
	[ParameterGroup.PHOTOMETRY]: 'Photometry & Magnitudes',
};
