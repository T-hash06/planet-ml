/**
 * Results Panel Component
 * Displays prediction probability with circular progress and confidence indicator
 * Uses HeroUI components with space-themed glassmorphism styling
 */

import { Card, CardBody, CircularProgress, cn, Progress } from '@heroui/react';
import { dataAttr } from '@shared/utility/props';
import { memo } from 'react';

interface ResultsPanelProps {
	/** Predicted probability value (0-1) */
	predictedValue: number | null;
	/** Model confidence level (0-1) */
	confidence: number | null;
	/** Loading state indicator */
	isLoading: boolean;
}

/**
 * Converts probability (0-1) to percentage (0-100)
 */
const toPercentage = (value: number | null): number => {
	if (value === null) return 0;
	return Math.round(value * 100);
};

/**
 * Gets interpretation text based on probability percentage
 */
const getInterpretationText = (percentage: number): string => {
	if (percentage >= 90) return 'Very likely a planet';
	if (percentage >= 75) return 'High probability of being a planet';
	if (percentage >= 50) return 'Moderate probability of being a planet';
	if (percentage >= 25) return 'Low probability of being a planet';
	if (percentage > 0) return 'Unlikely to be a planet';
	return 'No detection';
};

/**
 * Gets semantic color based on probability percentage
 */
const getProbabilityColor = (
	percentage: number,
): 'success' | 'warning' | 'secondary' | 'danger' => {
	if (percentage >= 75) return 'success';
	if (percentage >= 50) return 'warning';
	if (percentage >= 25) return 'secondary';
	return 'danger';
};

/**
 * Gets text color class based on probability percentage
 */
const getTextColorClass = (percentage: number): string => {
	if (percentage >= 75) return 'text-success';
	if (percentage >= 50) return 'text-warning';
	if (percentage >= 25) return 'text-secondary';
	return 'text-danger';
};

/**
 * Gets confidence level description
 */
const getConfidenceDescription = (confidence: number): string => {
	if (confidence >= 0.9) return 'Excellent model certainty';
	if (confidence >= 0.75) return 'High model certainty';
	if (confidence >= 0.6) return 'Moderate model certainty';
	if (confidence >= 0.4) return 'Low model certainty';
	return 'Very low model certainty';
};

const ResultsPanel = memo(function ResultsPanel({
	predictedValue,
	confidence,
	isLoading,
}: ResultsPanelProps) {
	const probabilityPercentage = toPercentage(predictedValue);
	const confidencePercentage = toPercentage(confidence);
	const probabilityColor = getProbabilityColor(probabilityPercentage);
	const textColorClass = getTextColorClass(probabilityPercentage);

	return (
		<Card
			className={cn([
				'relative rounded-large overflow-hidden',
				'bg-gradient-to-br from-primary/15 via-secondary/10 to-primary/5',
				'border border-primary/50',
				'shadow-large shadow-primary/30',
				'backdrop-blur-xl',
				'min-h-[400px]',
				'transition-all duration-300',
				'hover:shadow-[0_16px_48px_0] hover:shadow-primary/40',
				'hover:border-primary/70',
			])}
		>
			<CardBody
				className={cn([
					'p-6 sm:p-8',
					'flex flex-col items-center justify-center',
					'relative z-10',
				])}
			>
				{/* Panel Title */}
				<h3
					className={cn([
						'text-large font-bold text-center mb-8',
						'bg-gradient-to-br from-primary via-secondary to-primary',
						'bg-clip-text text-transparent',
						'drop-shadow-[0_0_25px_rgba(100,100,255,0.4)]',
						'transition-all duration-300',
					])}
				>
					Probability of Being a Planet
				</h3>

				{/* Circular Progress Chart */}
				<div className={cn(['relative mb-8'])}>
					<CircularProgress
						size="lg"
						value={probabilityPercentage}
						isDisabled={isLoading}
						color={probabilityColor}
						strokeWidth={4}
						showValueLabel
						classNames={{
							svg: 'w-48 h-48 sm:w-56 sm:h-56 drop-shadow-md',
							value: 'text-3xl sm:text-4xl font-bold',
							label: 'text-medium font-semibold',
						}}
						aria-label="Exoplanet detection probability"
						data-loading={dataAttr(isLoading)}
					/>
					{/* Glow effect */}
					<div
						className={cn([
							'absolute inset-0 -z-10',
							'animate-pulse rounded-full',
							'bg-gradient-to-br from-primary to-secondary',
							'opacity-20 blur-2xl',
							'transition-opacity duration-500',
							isLoading && 'opacity-10',
						])}
					/>
				</div>

				{/* Status Text */}
				<div className={cn(['mb-6 text-center space-y-2'])}>
					<p className={cn(['text-medium font-semibold', textColorClass])}>
						{getInterpretationText(probabilityPercentage)}
					</p>
					<p className={cn(['text-small text-foreground/60'])}>
						{predictedValue === null
							? 'Adjust parameters to generate prediction'
							: 'Neural network model prediction'}
					</p>
				</div>

				{/* Confidence Indicator */}
				<div className={cn(['w-full max-w-sm space-y-3'])}>
					<div className={cn(['flex items-center justify-between'])}>
						<span className={cn(['text-small font-semibold text-foreground'])}>
							Model Confidence
						</span>
						<span className={cn(['text-small font-bold text-primary'])}>
							{confidencePercentage}%
						</span>
					</div>
					<Progress
						value={confidencePercentage}
						color="primary"
						size="sm"
						aria-label="Model confidence level"
						className={cn(['transition-all duration-300'])}
						classNames={{
							indicator: 'bg-gradient-to-r from-primary to-secondary',
						}}
						data-loading={dataAttr(isLoading)}
					/>
					<p className={cn(['text-tiny text-foreground/60 text-center'])}>
						{confidence !== null
							? getConfidenceDescription(confidence)
							: 'No prediction available'}
					</p>
				</div>

				{/* Corner decorations with enhanced gradients */}
				<div
					className={cn([
						'absolute top-0 right-0 h-24 w-24',
						'bg-gradient-to-bl from-primary/40 via-primary/15 to-transparent',
						'transition-opacity duration-300',
						'pointer-events-none',
					])}
				/>
				<div
					className={cn([
						'absolute bottom-0 right-0 h-24 w-24',
						'bg-gradient-to-tl from-secondary/35 via-secondary/15 to-transparent',
						'transition-opacity duration-300',
						'pointer-events-none',
					])}
				/>

				{/* Loading overlay */}
				{isLoading && (
					<div
						className={cn([
							'absolute inset-0',
							'bg-content1/50 backdrop-blur-sm',
							'flex items-center justify-center',
							'transition-opacity duration-200',
						])}
					>
						<div
							className={cn([
								'text-small font-semibold text-foreground/80',
								'bg-content2/90 rounded-large px-4 py-2',
								'border border-primary/30',
								'shadow-lg',
							])}
						>
							Calculating prediction...
						</div>
					</div>
				)}
			</CardBody>
		</Card>
	);
});

export { ResultsPanel };
