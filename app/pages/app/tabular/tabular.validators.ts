/**
 * Validation schemas for tabular prediction form
 * Uses Zod for runtime type validation and error messages
 */

import { z } from 'zod';
import { TABULAR_PARAMETERS } from './tabular.config';

/**
 * Create a Zod number schema with min/max constraints for a parameter
 */
function createParameterSchema(min: number, max: number, name: string) {
	return z
		.number({
			message: `${name} must be a number`,
		})
		.min(min, { message: `${name} must be at least ${min}` })
		.max(max, { message: `${name} must be at most ${max}` });
}

/**
 * Generate validation schema object from parameter configuration
 * Creates a Zod schema for each of the 52 parameters
 */
const schemaObject = TABULAR_PARAMETERS.reduce(
	(acc, param) => {
		acc[param.name] = createParameterSchema(param.min, param.max, param.label);
		return acc;
	},
	{} as Record<string, z.ZodNumber>,
);

/**
 * Complete validation schema for the tabular prediction form
 * Validates all 52 parameters with their respective constraints
 */
export const TabularFormSchema = z.object(schemaObject);

/**
 * Type inference from the schema
 * Provides TypeScript types that match the validated structure
 */
export type TabularFormData = z.infer<typeof TabularFormSchema>;

/**
 * Validator function for individual fields
 * Can be used in TanStack Form field configuration
 *
 * @param value - The field value to validate
 * @param fieldName - The name of the field being validated
 * @returns Error message if invalid, undefined if valid
 */
export function validateField(
	value: unknown,
	fieldName: string,
): string | undefined {
	const param = TABULAR_PARAMETERS.find((p) => p.name === fieldName);

	if (!param) {
		return 'Unknown parameter';
	}

	if (typeof value !== 'number') {
		return `${param.label} must be a number`;
	}

	if (value < param.min) {
		return `${param.label} must be at least ${param.min}`;
	}

	if (value > param.max) {
		return `${param.label} must be at most ${param.max}`;
	}

	return undefined;
}

/**
 * Validate entire form data object
 * Returns validation result with detailed error information
 *
 * @param data - The complete form data to validate
 * @returns Zod SafeParseReturnType with success status and data or errors
 */
export function validateFormData(data: unknown) {
	return TabularFormSchema.safeParse(data);
}
