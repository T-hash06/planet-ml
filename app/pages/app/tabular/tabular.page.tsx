import { cn } from '@heroui/react';
import { useForm } from '@tanstack/react-form';
import { useMutation } from '@tanstack/react-query';
import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { InterpretabilityChart } from './components/interpretability-chart';
import { ParameterPanel } from './components/parameter-panel';
import { ResultsPanel } from './components/results-panel';
import { getDefaultValues } from './tabular.config';
import { TabularFormProvider } from './tabular.context';
import { generateMockPrediction } from './tabular.mocks';
import type { PredictionRequest, PredictionResponse } from './tabular.types';
import { validateField } from './tabular.validators';

/**
 * Tabular Data Predictor Page
 *
 * Interactive interface for exoplanet detection using tabular astronomical data.
 * Features:
 * - Floating parameter panel with 52 configurable astronomical parameters
 * - Real-time prediction results with circular progress display
 * - Model interpretability visualization with feature importance chart
 * - CSV file upload support for batch predictions
 *
 * Uses TanStack Form for state management and TanStack Query for API interactions.
 *
 * @returns {JSX.Element} The tabular data predictor page
 */
const TabularPage = memo(function TabularPage() {
	// Prediction results state - persists during loading
	const [lastPrediction, setLastPrediction] =
		useState<PredictionResponse | null>(null);

	// Debounce timer ref for manual submission triggering
	const submitTimerRef = useRef<NodeJS.Timeout | null>(null);

	// TanStack Query mutation for prediction API
	const predictionMutation = useMutation({
		mutationFn: async (data: PredictionRequest) => {
			// Simulate API delay
			await new Promise((resolve) => setTimeout(resolve, 300));
			return generateMockPrediction(data);
		},
		onSuccess: (data) => {
			setLastPrediction(data);
		},
		onError: (error) => {
			console.error('Prediction error:', error);
		},
	});

	// TanStack Form initialization with all 52 parameters
	const form = useForm({
		defaultValues: getDefaultValues(),
		validators: {
			onChange: ({ value }) => {
				// Validate all fields
				const errors: Record<string, string> = {};
				for (const [fieldName, fieldValue] of Object.entries(value)) {
					const error = validateField(fieldValue, fieldName);
					if (error) {
						errors[fieldName] = error;
					}
				}
				return Object.keys(errors).length > 0 ? errors : undefined;
			},
		},
		onSubmit: async ({ value }) => {
			// Trigger mutation with current form values
			// Cast to unknown first, then to PredictionRequest for type safety
			predictionMutation.mutate(value as unknown as PredictionRequest);
		},
	});

	// Get current prediction data (use last prediction during loading)
	const currentPrediction = predictionMutation.data ?? lastPrediction;
	const predictedValue = currentPrediction?.predictedValue ?? null;
	const confidence = currentPrediction?.confidence ?? null;
	const attributeWeights = currentPrediction?.attributeWeights ?? null;
	const isLoading = predictionMutation.isPending;

	/**
	 * Handle parameter value change from ParameterPanel
	 * Updates form field value and triggers debounced submission
	 */
	const handleParameterChange = useCallback(
		(parameterName: string, value: number) => {
			form.setFieldValue(parameterName, value);

			// Clear existing timer
			if (submitTimerRef.current) {
				clearTimeout(submitTimerRef.current);
			}

			// Set new debounced submission timer (500ms)
			submitTimerRef.current = setTimeout(() => {
				form.handleSubmit();
			}, 500);
		},
		[form],
	);

	// Cleanup timer on unmount
	useEffect(() => {
		return () => {
			if (submitTimerRef.current) {
				clearTimeout(submitTimerRef.current);
			}
		};
	}, []);

	/**
	 * Handle planet selection from Autocomplete
	 * Loads the selected row data into the form
	 */
	const handlePlanetSelection = useCallback(
		(rowData: Record<string, unknown>) => {
			// Update form fields with selected row values
			const defaultValues = getDefaultValues();
			for (const [fieldName, fieldValue] of Object.entries(rowData)) {
				if (fieldName in defaultValues && typeof fieldValue === 'number') {
					form.setFieldValue(fieldName, fieldValue);
				}
			}

			// Trigger form submission
			form.handleSubmit();
		},
		[form],
	);
	const handleCSVUpload = useCallback((file: File) => {
		// CSV parsing is now handled in ParameterPanel
		console.log(`CSV uploaded: ${file.name}`);
	}, []);

	return (
		<TabularFormProvider form={form}>
			<div className={cn(['relative min-h-screen w-full'])}>
				{/* Page Header with enhanced styling */}
				<div className={cn(['mb-8 sm:mb-10 md:mb-12'])}>
					<h2
						className={cn([
							'text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4',
							'bg-gradient-to-br from-danger via-warning to-danger',
							'bg-clip-text text-transparent',
							'drop-shadow-[0_0_30px_rgba(255,100,100,0.4)]',
							'transition-all duration-300',
						])}
					>
						Tabular Data Predictor
					</h2>
					<p
						className={cn([
							'text-small sm:text-medium text-foreground/80',
							'max-w-3xl',
							'transition-colors duration-200',
						])}
					>
						Configure astronomical parameters and get real-time exoplanet
						detection predictions with AI-powered interpretability.
					</p>
				</div>

				{/* Main Layout - Parameter Panel + Results with enhanced spacing */}
				<div
					className={cn([
						'grid grid-cols-1 lg:grid-cols-[440px_1fr]',
						'gap-6 md:gap-8 lg:gap-10',
						'items-start',
					])}
				>
					{/* Left Side - Parameter Panel with sticky positioning */}
					<div
						className={cn([
							'lg:sticky lg:top-4',
							'max-h-[calc(100vh-8rem)]',
							'overflow-hidden',
							'transition-all duration-300',
						])}
					>
						<ParameterPanel
							onChange={handleParameterChange}
							onCSVUpload={handleCSVUpload}
							onPlanetSelect={handlePlanetSelection}
						/>
					</div>

					{/* Right Side - Results Panel with improved spacing */}
					<div className={cn(['space-y-6 md:space-y-8 lg:space-y-10'])}>
						<ResultsPanel
							predictedValue={predictedValue}
							confidence={confidence}
							isLoading={isLoading}
						/>

						{/* Interpretability Chart - Feature Importance */}
						<InterpretabilityChart
							attributeWeights={attributeWeights}
							isLoading={isLoading}
						/>
					</div>
				</div>
			</div>
		</TabularFormProvider>
	);
});

export default TabularPage;
