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
	 * Handle CSV file upload
	 * Parses CSV file and populates form fields with extracted values
	 */
	const handleCSVUpload = useCallback(
		(file: File) => {
			const reader = new FileReader();

			reader.onload = (event) => {
				try {
					const csvText = event.target?.result as string;
					if (!csvText) {
						alert('Failed to read CSV file');
						return;
					}

					// Parse CSV (basic implementation)
					const lines = csvText.split('\n').filter((line) => line.trim());
					if (lines.length < 2) {
						alert('CSV file must contain header row and at least one data row');
						return;
					}

					// Extract headers from first line
					const headers = lines[0].split(',').map((h) => h.trim());

					// Extract values from second line (first data row)
					const values = lines[1].split(',').map((v) => v.trim());

					// Create object mapping parameter names to values
					const parsedData: Record<string, number> = {};
					headers.forEach((header, index) => {
						const value = Number.parseFloat(values[index]);
						if (!Number.isNaN(value)) {
							parsedData[header] = value;
						}
					});

					// Validate that we have some valid data
					if (Object.keys(parsedData).length === 0) {
						alert('No valid numeric data found in CSV file');
						return;
					}

					// Update form fields with parsed values
					// Only update fields that exist in the configuration
					const defaultValues = getDefaultValues();
					for (const [fieldName, fieldValue] of Object.entries(parsedData)) {
						if (fieldName in defaultValues) {
							form.setFieldValue(fieldName, fieldValue);
						}
					}

					// Show success message
					alert(
						`Successfully loaded ${Object.keys(parsedData).length} parameters from "${file.name}"`,
					);
				} catch (error) {
					console.error('CSV parsing error:', error);
					alert(`Error parsing CSV file: ${error}`);
				}
			};

			reader.onerror = () => {
				alert('Error reading file');
			};

			reader.readAsText(file);
		},
		[form],
	);

	return (
		<TabularFormProvider form={form}>
			<div className={cn(['relative min-h-screen w-full'])}>
				{/* Page Header */}
				<div className={cn(['mb-8 sm:mb-12'])}>
					<h2
						className={cn([
							'text-2xl sm:text-3xl md:text-4xl font-bold mb-4',
							'bg-gradient-to-br from-danger via-warning to-danger',
							'bg-clip-text text-transparent',
							'drop-shadow-[0_0_25px_rgba(255,100,100,0.3)]',
						])}
					>
						Tabular Data Predictor
					</h2>
					<p className={cn(['text-small sm:text-medium text-foreground/80'])}>
						Configure astronomical parameters and get real-time exoplanet
						detection predictions with AI-powered interpretability.
					</p>
				</div>

				{/* Main Layout - Parameter Panel + Results */}
				<div
					className={cn([
						'grid grid-cols-1 lg:grid-cols-[420px_1fr]',
						'gap-6 md:gap-8',
						'items-start',
					])}
				>
					{/* Left Side - Parameter Panel */}
					<div
						className={cn([
							'lg:sticky lg:top-4',
							'max-h-[calc(100vh-8rem)]',
							'overflow-hidden',
						])}
					>
						<ParameterPanel
							onChange={handleParameterChange}
							onCSVUpload={handleCSVUpload}
						/>
					</div>

					{/* Right Side - Results Panel */}
					<div className={cn(['space-y-6 md:space-y-8'])}>
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
