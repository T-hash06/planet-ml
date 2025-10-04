import { z } from 'zod';

// Input types (for form state)
const stateSchema = z.object({
	plTranmid: z.number(),
	stPmdec: z.number(),
	stTmag: z.number(),
	stRade: z.number(),
	stDist: z.number(),
	plRade: z.number(),
});

// Validation rules (composable with z.pipe)
const validationRules = {
	plTranmid: z.number().min(0).max(1),
	stPmdec: z.number().min(0).max(1),
	stTmag: z.number().min(0).max(1),
	stRade: z.number().min(0).max(1),
	stDist: z.number().min(0).max(1),
	plRade: z.number().min(0).max(1),
};

// Output schema (with transformations if needed)
const validationSchema = z.object({
	plTranmid: validationRules.plTranmid,
	stPmdec: validationRules.stPmdec,
	stTmag: validationRules.stTmag,
	stRade: validationRules.stRade,
	stDist: validationRules.stDist,
	plRade: validationRules.plRade,
});

export const LivePreviewForm = {
	stateSchema,
	validationRules,
	validationSchema,
};

export type LivePreviewFormState = z.infer<typeof stateSchema>;
export type LivePreviewFormOutput = z.infer<typeof validationSchema>;
