'use client';

import { cn } from '@heroui/react';
import {
	ArrowDownIcon,
	BrainIcon,
	ChartLineIcon,
	CheckCircleIcon,
	DatabaseIcon,
	FunnelIcon,
	UploadIcon,
} from '@phosphor-icons/react';
import { motion, useInView } from 'framer-motion';
import { memo, useRef, useState } from 'react';

interface IconProps {
	size?: number;
	weight?: 'thin' | 'light' | 'regular' | 'bold' | 'fill' | 'duotone';
}

interface ProcessStepProps {
	stepNumber: number;
	icon: React.ComponentType<IconProps>;
	title: string;
	description: string;
	details: string[];
	processingTime: string;
	accentColor: 'primary' | 'secondary' | 'success';
	delay?: number;
}

// Animation variants for smooth, elegant animations with blur effect
const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			duration: 0.4,
			staggerChildren: 0.2,
		},
	},
};

const titleVariants = {
	hidden: {
		opacity: 0,
		y: 20,
		filter: 'blur(4px)',
	},
	visible: {
		opacity: 1,
		y: 0,
		filter: 'blur(0px)',
		transition: {
			duration: 0.4,
		},
	},
};

const descriptionVariants = {
	hidden: {
		opacity: 0,
		y: 15,
		filter: 'blur(3px)',
	},
	visible: {
		opacity: 1,
		y: 0,
		filter: 'blur(0px)',
		transition: {
			duration: 0.4,
			delay: 0.1,
		},
	},
};

const stepVariants = {
	hidden: {
		opacity: 0,
		y: 60,
		scale: 0.9,
		filter: 'blur(10px)',
	},
	visible: {
		opacity: 1,
		y: 0,
		scale: 1,
		filter: 'blur(0px)',
		transition: {
			duration: 0.6,
		},
	},
};

const arrowVariants = {
	hidden: {
		opacity: 0,
		scale: 0.5,
	},
	visible: {
		opacity: 1,
		scale: 1,
		transition: {
			duration: 0.4,
			delay: 0.3,
		},
	},
};

// Process step card component
const ProcessStep = memo(function ProcessStep({
	stepNumber,
	icon: Icon,
	title,
	description,
	details,
	processingTime,
	accentColor,
	delay = 0,
}: ProcessStepProps) {
	const [isExpanded, setIsExpanded] = useState(false);

	const colorClasses = {
		primary: {
			gradient: 'from-primary via-primary-600 to-primary',
			border: 'border-primary/50',
			shadow: 'shadow-primary/30',
			glow: 'from-primary to-primary-600',
			hover: 'from-primary/10 via-primary/5 to-primary/10',
			badge: 'bg-primary/20 text-primary border-primary/30',
			text: 'text-primary',
		},
		secondary: {
			gradient: 'from-secondary via-secondary-600 to-secondary',
			border: 'border-secondary/50',
			shadow: 'shadow-secondary/30',
			glow: 'from-secondary to-secondary-600',
			hover: 'from-secondary/10 via-secondary/5 to-secondary/10',
			badge: 'bg-secondary/20 text-secondary border-secondary/30',
			text: 'text-secondary',
		},
		success: {
			gradient: 'from-success via-success-600 to-success',
			border: 'border-success/50',
			shadow: 'shadow-success/30',
			glow: 'from-success to-success-600',
			hover: 'from-success/10 via-success/5 to-success/10',
			badge: 'bg-success/20 text-success border-success/30',
			text: 'text-success',
		},
	};

	const colors = colorClasses[accentColor];

	return (
		<motion.div
			variants={stepVariants}
			custom={delay}
			className={cn([
				'relative flex flex-col gap-4 rounded-large p-5 sm:p-6',
				'bg-gradient-to-br from-content2 to-content1',
				'border',
				colors.border,
				'shadow-lg hover:shadow-xl',
				colors.shadow,
				'transition-shadow duration-300',
				'backdrop-blur-sm',
				'overflow-hidden',
			])}
		>
			{/* Step number badge */}
			<div
				className={cn([
					'absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full',
					'border-2',
					colors.badge,
					'font-bold text-medium',
				])}
			>
				{stepNumber}
			</div>

			{/* Icon container */}
			<motion.div
				whileHover={{ rotate: [0, -5, 5, -5, 0], scale: 1.05 }}
				transition={{ duration: 0.5 }}
				className={cn([
					'relative z-10 w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center rounded-full',
					'bg-gradient-to-br',
					colors.gradient,
					'text-foreground shadow-lg',
					colors.shadow,
					'border-2 border-foreground/20',
				])}
			>
				{/* Glow effect */}
				<div
					className={cn([
						'absolute inset-0 animate-pulse rounded-full bg-gradient-to-br opacity-50 blur-md',
						colors.glow,
					])}
				/>
				<span className="relative z-10">
					<Icon size={28} weight="duotone" />
				</span>
			</motion.div>

			{/* Title and description */}
			<div className="relative z-10">
				<h3 className="font-bold text-foreground text-large sm:text-xl mb-2">
					{title}
				</h3>
				<p className="text-foreground/70 text-small sm:text-medium leading-relaxed">
					{description}
				</p>
			</div>

			{/* Processing time */}
			<div
				className={cn([
					'relative z-10 inline-flex items-center gap-2 px-3 py-1.5 rounded-medium w-fit',
					'bg-gradient-to-br',
					colors.hover,
					'border',
					colors.border,
				])}
			>
				<span className="text-foreground/60 text-tiny font-medium">
					Processing Time:
				</span>
				<span className={cn(['text-tiny font-bold', colors.text])}>
					{processingTime}
				</span>
			</div>

			{/* Expandable technical details */}
			<motion.button
				type="button"
				onClick={() => setIsExpanded(!isExpanded)}
				whileHover={{ scale: 1.02 }}
				whileTap={{ scale: 0.98 }}
				className={cn([
					'relative z-10 flex items-center justify-between gap-2 px-4 py-2.5 rounded-medium',
					'bg-gradient-to-br from-content1 to-content2',
					'border border-divider/50',
					'hover:border-divider transition-colors duration-200',
					'text-foreground/80 text-small font-medium',
				])}
				aria-label={`Toggle technical details for ${title}`}
			>
				<span>Technical Details</span>
				<motion.span
					animate={{ rotate: isExpanded ? 180 : 0 }}
					transition={{ duration: 0.3 }}
				>
					▼
				</motion.span>
			</motion.button>

			{/* Expanded details */}
			<motion.div
				initial={false}
				animate={{
					height: isExpanded ? 'auto' : 0,
					opacity: isExpanded ? 1 : 0,
				}}
				transition={{ duration: 0.3 }}
				className="overflow-hidden"
			>
				<ul className="space-y-2 pt-2">
					{details.map((detail, index) => (
						<motion.li
							key={detail}
							initial={{ opacity: 0, x: -10 }}
							animate={
								isExpanded ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }
							}
							transition={{ delay: index * 0.05, duration: 0.2 }}
							className="flex items-start gap-2 text-foreground/70 text-tiny sm:text-small"
						>
							<span
								className={cn([
									'inline-block w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0',
									'bg-gradient-to-br',
									colors.gradient,
								])}
							/>
							<span>{detail}</span>
						</motion.li>
					))}
				</ul>
			</motion.div>

			{/* Corner decoration */}
			<div
				className={cn([
					'absolute top-0 right-0 h-20 w-20 bg-gradient-to-bl to-transparent opacity-20',
					colors.gradient,
				])}
			/>
		</motion.div>
	);
});

// Animated arrow connector
const ArrowConnector = memo(function ArrowConnector({
	delay = 0,
}: {
	delay?: number;
}) {
	return (
		<motion.div
			variants={arrowVariants}
			custom={delay}
			className="flex items-center justify-center my-2 sm:my-4"
		>
			<motion.div
				animate={{
					y: [0, 10, 0],
				}}
				transition={{
					duration: 2,
					repeat: Number.POSITIVE_INFINITY,
					ease: 'easeInOut',
				}}
				className="flex flex-col items-center gap-1"
			>
				<ArrowDownIcon size={32} weight="bold" className="text-primary/60" />
				<div className="w-0.5 h-8 bg-gradient-to-b from-primary/60 to-transparent" />
			</motion.div>
		</motion.div>
	);
});

const DetectionProcess = memo(function DetectionProcess() {
	const ref = useRef(null);
	const isInView = useInView(ref, {
		once: true,
		margin: '-100px 0px -100px 0px',
	});

	const processSteps: ProcessStepProps[] = [
		{
			stepNumber: 1,
			icon: UploadIcon,
			title: 'Data Ingestion',
			description:
				'Upload light curve time-series and tabular astronomical parameters from your observations or NASA archives.',
			details: [
				'Supports multiple data formats (CSV, FITS, JSON)',
				'Automatic format detection and validation',
				'Handles both complete and partial datasets',
				'Batch processing for multiple observations',
			],
			processingTime: '< 1 second',
			accentColor: 'primary',
		},
		{
			stepNumber: 2,
			icon: ChartLineIcon,
			title: 'Light Curve & Initial Tabular Analysis',
			description:
				'MAE model processes both time-series photometric data and tabular parameters to detect anomalous patterns indicating potential transits.',
			details: [
				'Self-supervised reconstruction learning on light curves',
				'Initial tabular data feature extraction',
				'Identifies periodic brightness dips and parameter anomalies',
				'Generates preliminary anomaly score (0-100)',
			],
			processingTime: '2-5 seconds',
			accentColor: 'secondary',
		},
		{
			stepNumber: 3,
			icon: FunnelIcon,
			title: 'Early Filtering',
			description:
				'Configurable threshold discards obvious non-candidates, reducing computational load and focusing on promising detections.',
			details: [
				'User-adjustable sensitivity threshold',
				'Trade-off between completeness and precision',
				'Filters out ~70-80% of non-planetary objects',
				'Configurable for discovery vs. validation mode',
			],
			processingTime: '< 0.5 seconds',
			accentColor: 'success',
		},
		{
			stepNumber: 4,
			icon: DatabaseIcon,
			title: 'Parameter Extraction',
			description:
				'Extracts astronomical features from surviving candidates and uses CTAB-GAN+ to handle missing values.',
			details: [
				'Extracts 50+ physical and orbital parameters',
				'CTAB-GAN+ imputes missing values',
				'Preserves physical constraints and correlations',
				'Normalizes data for consistent analysis',
			],
			processingTime: '1-3 seconds',
			accentColor: 'primary',
		},
		{
			stepNumber: 5,
			icon: ChartLineIcon,
			title: 'Exploratory Data Analysis',
			description:
				'Random Forest model performs feature importance analysis and exploratory classification on the tabular astronomical parameters.',
			details: [
				'Feature importance ranking for each parameter',
				'Statistical correlation analysis',
				'Exploratory classification for data insights',
				'Identifies key discriminative features',
			],
			processingTime: '1-2 seconds',
			accentColor: 'secondary',
		},
		{
			stepNumber: 6,
			icon: BrainIcon,
			title: 'Anomaly Detection',
			description:
				'Masked Autoencoder performs final anomaly detection on combined features to predict exoplanet probability with confidence scoring.',
			details: [
				'Multi-modal anomaly detection (light curves + tabular)',
				'Self-supervised deep learning analysis',
				'Exoplanet probability score (0-100%)',
				'Uncertainty quantification and confidence intervals',
			],
			processingTime: '3-5 seconds',
			accentColor: 'primary',
		},
		{
			stepNumber: 7,
			icon: CheckCircleIcon,
			title: 'Classification & Results',
			description:
				'Final determination combining all analyses with detailed feature importance, confidence metrics, and exportable scientific report.',
			details: [
				'Classification: Confirmed / Candidate / False Positive',
				'Combined confidence score from all models',
				'Comprehensive feature importance attribution',
				'Exportable report (PDF, JSON, CSV)',
			],
			processingTime: '< 1 second',
			accentColor: 'success',
		},
	];

	return (
		<motion.div
			ref={ref}
			initial="hidden"
			animate={isInView ? 'visible' : 'hidden'}
			variants={containerVariants}
			className={cn([
				'mt-24 px-4',
				'sm:mt-32 sm:px-6',
				'md:mt-40 md:px-8',
				'lg:mt-48 lg:px-12',
				'xl:mt-56 xl:px-16',
			])}
		>
			{/** biome-ignore lint/correctness/useUniqueElementIds: Because this is a static page */}
			<motion.h2
				id="detection-process"
				variants={titleVariants}
				className={cn([
					'text-center font-bold text-foreground tracking-wider',
					'text-2xl',
					'sm:text-3xl',
					'md:text-4xl',
					'lg:text-5xl',
				])}
			>
				How ExoNova Detects Exoplanets
			</motion.h2>

			<motion.p
				variants={descriptionVariants}
				className={cn([
					'mt-4 text-center font-light text-foreground/75 max-w-3xl mx-auto px-4',
					'sm:mt-6 sm:px-0',
					'text-small',
					'sm:text-medium',
					'md:text-large',
					'leading-relaxed',
				])}
			>
				Our end-to-end detection pipeline combines dual-modal anomaly detection
				with exploratory data analysis, processing your data through seven
				specialized stages to deliver accurate, scientifically validated
				exoplanet classifications with full explainability.
			</motion.p>

			{/* Process steps with connectors */}
			<motion.div
				variants={containerVariants}
				className={cn([
					'mt-12 sm:mt-16 md:mt-20',
					'max-w-4xl mx-auto',
					'flex flex-col',
				])}
			>
				{processSteps.map((step, index) => (
					<div key={step.title}>
						<ProcessStep {...step} delay={index * 0.1} />
						{index < processSteps.length - 1 && (
							<ArrowConnector delay={index * 0.1 + 0.3} />
						)}
					</div>
				))}
			</motion.div>

			{/* Summary statistics */}
			<motion.div
				variants={stepVariants}
				className={cn([
					'mt-12 sm:mt-16',
					'max-w-4xl mx-auto',
					'relative rounded-large p-6 sm:p-8',
					'bg-gradient-to-br from-primary/15 via-secondary/10 to-success/15',
					'border border-primary/50',
					'shadow-lg shadow-primary/30',
					'backdrop-blur-xl',
					'overflow-hidden',
				])}
			>
				<h3 className="font-bold text-foreground text-large sm:text-xl mb-4 text-center">
					Pipeline Performance Summary
				</h3>

				<div className="grid gap-4 sm:grid-cols-3 mb-6">
					<div className="flex flex-col items-center gap-2 text-center">
						<div className="font-bold text-primary text-2xl sm:text-3xl">
							10-21s
						</div>
						<div className="text-foreground/70 text-small">
							Total Processing Time
						</div>
					</div>
					<div className="flex flex-col items-center gap-2 text-center">
						<div className="font-bold text-secondary text-2xl sm:text-3xl">
							95.2%
						</div>
						<div className="text-foreground/70 text-small">
							Detection Accuracy (Example)
						</div>
					</div>
					<div className="flex flex-col items-center gap-2 text-center">
						<div className="font-bold text-success text-2xl sm:text-3xl">
							7 Stages
						</div>
						<div className="text-foreground/70 text-small">
							Comprehensive Analysis
						</div>
					</div>
				</div>

				<p className="text-foreground/70 text-small sm:text-medium leading-relaxed text-center">
					Each stage is optimized for speed and accuracy, with automatic
					checkpoints and error handling to ensure reliable results. The entire
					pipeline can process hundreds of observations in parallel for
					large-scale surveys.
				</p>

				{/* Corner decorations */}
				<div className="absolute top-0 right-0 h-24 w-24 bg-gradient-to-bl from-primary/30 to-transparent" />
				<div className="absolute bottom-0 left-0 h-24 w-24 bg-gradient-to-tr from-success/20 to-transparent" />
			</motion.div>
		</motion.div>
	);
});

export { DetectionProcess };
