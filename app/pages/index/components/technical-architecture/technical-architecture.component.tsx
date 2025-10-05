import { cn } from '@heroui/react';
import {
	ArrowRightIcon,
	BrainIcon,
	ChartLineIcon,
} from '@phosphor-icons/react';
import { motion, useInView } from 'framer-motion';
import { memo, useCallback, useMemo, useRef, useState } from 'react';

// Animation variants for smooth, elegant animations with blur effect
const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			duration: 0.4,
			staggerChildren: 0.15,
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

const cardVariants = {
	hidden: {
		opacity: 0,
		y: 40,
		scale: 0.9,
		filter: 'blur(8px)',
	},
	visible: {
		opacity: 1,
		y: 0,
		scale: 1,
		filter: 'blur(0px)',
		transition: {
			duration: 0.5,
		},
	},
};

interface IconProps {
	size?: number;
	weight?: 'thin' | 'light' | 'regular' | 'bold' | 'fill' | 'duotone';
}

interface ModelCardProps {
	icon: React.ComponentType<IconProps>;
	title: string;
	purpose: string;
	capabilities: string[];
	referenceLink: string;
	referenceText: string;
	colorScheme: 'primary' | 'secondary';
	technicalDetails: {
		architecture: string[];
		training: string[];
		performance: string[];
	};
}

// Model card component with expandable technical details
const ModelCard = memo(function ModelCard({
	icon: Icon,
	title,
	purpose,
	capabilities,
	referenceLink,
	referenceText,
	colorScheme,
	technicalDetails,
}: ModelCardProps) {
	const [isExpanded, setIsExpanded] = useState(false);

	const toggleExpanded = useCallback(() => {
		setIsExpanded((prev) => !prev);
	}, []);

	const colorClasses = useMemo(() => {
		if (colorScheme === 'primary') {
			return {
				gradient: 'from-primary/15 via-primary/10 to-primary/5',
				border: 'border-primary/50',
				shadow: 'shadow-primary/30',
				iconGradient: 'from-primary via-secondary to-primary',
				iconShadow: 'shadow-primary/50',
				cornerGradient: 'from-primary/30 to-transparent',
				hoverGradient: 'from-primary/10 via-secondary/10 to-primary/10',
			};
		}
		return {
			gradient: 'from-secondary/15 via-secondary/10 to-secondary/5',
			border: 'border-secondary/50',
			shadow: 'shadow-secondary/30',
			iconGradient: 'from-secondary via-primary to-secondary',
			iconShadow: 'shadow-secondary/50',
			cornerGradient: 'from-secondary/30 to-transparent',
			hoverGradient: 'from-secondary/10 via-primary/10 to-secondary/10',
		};
	}, [colorScheme]);

	return (
		<motion.div
			variants={cardVariants}
			whileHover={{
				scale: 1.02,
				y: -8,
				transition: { duration: 0.3, ease: 'easeOut' },
			}}
			className={cn([
				'relative rounded-large p-6 sm:p-8',
				`bg-gradient-to-br ${colorClasses.gradient}`,
				`border ${colorClasses.border}`,
				`shadow-lg ${colorClasses.shadow}`,
				'hover:shadow-xl transition-all duration-300',
				'backdrop-blur-xl',
				'overflow-hidden',
			])}
		>
			{/* Animated gradient background on hover */}
			<motion.div
				className={cn([
					'absolute inset-0 opacity-0',
					`bg-gradient-to-br ${colorClasses.hoverGradient}`,
				])}
				whileHover={{ opacity: 1 }}
				transition={{ duration: 0.3 }}
			/>

			{/* Icon container */}
			<motion.div
				whileHover={{ rotate: [0, -5, 5, -5, 0], scale: 1.1 }}
				transition={{ duration: 0.5 }}
				className={cn([
					'relative z-10 flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full mb-6',
					`bg-gradient-to-br ${colorClasses.iconGradient}`,
					`shadow-lg ${colorClasses.iconShadow}`,
					'border-2 border-foreground/20',
				])}
			>
				{/* Glow effect */}
				<div
					className={cn([
						'absolute inset-0 animate-pulse rounded-full opacity-50 blur-md',
						`bg-gradient-to-br ${colorClasses.iconGradient}`,
					])}
				/>
				<span className="relative z-10 text-foreground">
					<Icon size={32} weight="duotone" />
				</span>
			</motion.div>

			{/* Content */}
			<div className="relative z-10">
				<h3 className="font-bold text-foreground text-xl sm:text-2xl mb-2">
					{title}
				</h3>

				<p className="text-foreground/90 font-semibold text-medium sm:text-large mb-4">
					{purpose}
				</p>

				<div className="space-y-3 mb-6">
					<h4 className="font-semibold text-foreground text-small sm:text-medium">
						Key Capabilities:
					</h4>
					<ul className="space-y-2">
						{capabilities.map((capability, index) => (
							<motion.li
								key={capability}
								initial={{ opacity: 0, x: -20 }}
								whileInView={{ opacity: 1, x: 0 }}
								viewport={{ once: true }}
								transition={{ delay: index * 0.1, duration: 0.4 }}
								className="flex items-start gap-2 text-foreground/80 text-small"
							>
								<span className="text-primary mt-1">•</span>
								<span>{capability}</span>
							</motion.li>
						))}
					</ul>
				</div>

				{/* Expandable Technical Details */}
				<motion.div
					initial={false}
					animate={{ height: isExpanded ? 'auto' : 0 }}
					transition={{ duration: 0.3, ease: 'easeOut' }}
					className="overflow-hidden"
				>
					<div className="space-y-4 mb-6 pt-4 border-t border-divider/30">
						{/* Architecture */}
						<div>
							<h5 className="font-semibold text-foreground text-small mb-2">
								Architecture:
							</h5>
							<ul className="space-y-1">
								{technicalDetails.architecture.map((item) => (
									<li
										key={item}
										className="text-foreground/70 text-tiny sm:text-small ml-4"
									>
										→ {item}
									</li>
								))}
							</ul>
						</div>

						{/* Training Approach */}
						<div>
							<h5 className="font-semibold text-foreground text-small mb-2">
								Training Approach:
							</h5>
							<ul className="space-y-1">
								{technicalDetails.training.map((item) => (
									<li
										key={item}
										className="text-foreground/70 text-tiny sm:text-small ml-4"
									>
										→ {item}
									</li>
								))}
							</ul>
						</div>

						{/* Performance Metrics */}
						<div>
							<h5 className="font-semibold text-foreground text-small mb-2">
								Performance Metrics:
							</h5>
							<ul className="space-y-1">
								{technicalDetails.performance.map((item) => (
									<li
										key={item}
										className="text-foreground/70 text-tiny sm:text-small ml-4"
									>
										→ {item}
									</li>
								))}
							</ul>
						</div>
					</div>
				</motion.div>

				{/* Toggle button */}
				<button
					type="button"
					onClick={toggleExpanded}
					className={cn([
						'w-full py-2 px-4 rounded-medium',
						'bg-gradient-to-r from-content2 to-content1',
						'border border-divider/50',
						'hover:border-divider transition-colors duration-200',
						'text-foreground text-small font-medium',
						'flex items-center justify-center gap-2',
					])}
				>
					<span>{isExpanded ? 'Hide' : 'Show'} Technical Details</span>
					<motion.span
						animate={{ rotate: isExpanded ? 180 : 0 }}
						transition={{ duration: 0.3 }}
					>
						▼
					</motion.span>
				</button>

				{/* Reference link */}
				<a
					href={referenceLink}
					target="_blank"
					rel="noopener noreferrer"
					className={cn([
						'mt-4 inline-flex items-center gap-2',
						'text-primary hover:text-primary-600 transition-colors duration-200',
						'text-tiny sm:text-small font-medium',
					])}
				>
					<span>{referenceText}</span>
					<ArrowRightIcon size={16} weight="bold" />
				</a>
			</div>

			{/* Corner decorations */}
			<div
				className={cn([
					'absolute top-0 right-0 h-24 w-24 rounded-large',
					`bg-gradient-to-bl ${colorClasses.cornerGradient}`,
				])}
			/>
			<div
				className={cn([
					'absolute bottom-0 left-0 h-16 w-16',
					`bg-gradient-to-tr ${colorClasses.cornerGradient} opacity-50`,
				])}
			/>
		</motion.div>
	);
});

// Pipeline visualization component
const PipelineVisualization = memo(function PipelineVisualization() {
	const steps = useMemo(
		() => [
			'Raw Data',
			'Light Curve Extraction',
			'MAE Detection',
			'Parameter Extraction',
			'CTAB-GAN+ Augmentation',
			'Final Classification',
		],
		[],
	);

	return (
		<motion.div
			variants={cardVariants}
			className={cn([
				'relative rounded-large p-6 sm:p-8 md:p-10',
				'bg-gradient-to-br from-content2 to-content1',
				'border border-divider/50',
				'shadow-lg',
				'backdrop-blur-sm',
				'overflow-hidden',
			])}
		>
			<h3 className="font-bold text-foreground text-large sm:text-xl mb-8 text-center">
				Detection Pipeline Flow
			</h3>

			{/* Pipeline steps */}
			<div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-2">
				{steps.map((step, index) => (
					<div key={step} className="flex items-center gap-2 md:gap-0 flex-1">
						{/* Step box */}
						<motion.div
							initial={{ opacity: 0, scale: 0.8 }}
							whileInView={{ opacity: 1, scale: 1 }}
							viewport={{ once: true }}
							transition={{ delay: index * 0.1, duration: 0.4 }}
							className={cn([
								'flex-1 px-4 py-3 rounded-medium text-center',
								'bg-gradient-to-br from-primary/20 to-secondary/20',
								'border border-primary/30',
								'shadow-sm',
							])}
						>
							<span className="text-foreground font-medium text-tiny sm:text-small block">
								{step}
							</span>
						</motion.div>

						{/* Arrow (not after last step) */}
						{index < steps.length - 1 && (
							<motion.div
								initial={{ opacity: 0, x: -10 }}
								whileInView={{ opacity: 1, x: 0 }}
								viewport={{ once: true }}
								transition={{ delay: index * 0.1 + 0.2, duration: 0.3 }}
								className="hidden md:flex items-center justify-center px-2"
							>
								<ArrowRightIcon
									size={20}
									weight="bold"
									className="text-primary"
								/>
							</motion.div>
						)}

						{/* Down arrow for mobile (not after last step) */}
						{index < steps.length - 1 && (
							<motion.div
								initial={{ opacity: 0, y: -10 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ delay: index * 0.1 + 0.2, duration: 0.3 }}
								className="flex md:hidden"
							>
								<motion.div
									animate={{ y: [0, 5, 0] }}
									transition={{
										duration: 1.5,
										repeat: Number.POSITIVE_INFINITY,
										ease: 'easeInOut',
									}}
								>
									<ArrowRightIcon
										size={20}
										weight="bold"
										className="text-primary rotate-90"
									/>
								</motion.div>
							</motion.div>
						)}
					</div>
				))}
			</div>

			{/* Pipeline description */}
			<motion.p
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				transition={{ delay: 0.8, duration: 0.4 }}
				className="mt-8 text-center text-foreground/70 text-small max-w-3xl mx-auto"
			>
				Our dual-pathway system processes astronomical data through both
				time-series analysis and tabular parameter evaluation, combining the
				strengths of CTAB-GAN+ for data quality enhancement and MAE for pattern
				recognition.
			</motion.p>

			{/* Corner decorations */}
			<div className="absolute top-0 left-0 h-20 w-20 bg-gradient-to-br from-primary/20 to-transparent" />
			<div className="absolute bottom-0 right-0 h-20 w-20 bg-gradient-to-tl from-secondary/20 to-transparent" />
		</motion.div>
	);
});

const TechnicalArchitecture = memo(function TechnicalArchitecture() {
	const ref = useRef(null);
	const isInView = useInView(ref, {
		once: true,
		margin: '-100px 0px -100px 0px',
	});

	const models = useMemo(
		() => [
			{
				icon: ChartLineIcon,
				title: 'CTAB-GAN+',
				purpose: 'Synthetic Data Generation & Imputation',
				capabilities: [
					'Generates physically plausible synthetic exoplanet samples',
					'Handles missing values in observational data',
					'Preserves correlations between astronomical parameters',
					'Addresses class imbalance in training datasets',
				],
				referenceLink: 'https://arxiv.org/abs/2204.00401',
				referenceText: 'Read CTAB-GAN+ Research Paper',
				colorScheme: 'primary' as const,
				technicalDetails: {
					architecture: [
						'Conditional Generative Adversarial Network',
						'Mixed data type handling (continuous & categorical)',
						'Mode-specific normalization for tabular data',
						'Classifier and regressor guidance for generation',
					],
					training: [
						'Adversarial training with generator-discriminator dynamics',
						'Conditional generation based on exoplanet class labels',
						'Regularization to enforce physical constraints',
						'Progressive training for stability',
					],
					performance: [
						'Classification accuracy improvement: Placeholder (TODO)',
						'Data augmentation ratio: Placeholder (TODO)',
						'Missing data imputation accuracy: Placeholder (TODO)',
						'Correlation preservation score: Placeholder (TODO)',
					],
				},
			},
			{
				icon: BrainIcon,
				title: 'Masked Autoencoder (MAE)',
				purpose: 'Self-Supervised Anomaly Detection',
				capabilities: [
					'Detects transit signals in light curves',
					'Learns from unlabeled stellar observations',
					'Processes both time-series and tabular data',
					'Provides reconstruction-based anomaly scores',
				],
				referenceLink:
					'https://medium.com/@jimcanary/masked-autoencoders-a-simple-yet-powerful-approach-to-self-supervised-vision-learning-0ec9dc849dd2',
				referenceText: 'Learn about Masked Autoencoders',
				colorScheme: 'secondary' as const,
				technicalDetails: {
					architecture: [
						'Transformer-based encoder-decoder architecture',
						'High masking ratio (75%) for efficient learning',
						'Asymmetric design (lightweight decoder)',
						'Positional embeddings for sequence data',
					],
					training: [
						'Self-supervised pre-training on unlabeled data',
						'Random masking of input segments',
						'Reconstruction loss minimization',
						'Fine-tuning on labeled exoplanet samples',
					],
					performance: [
						'Light curve anomaly detection: Placeholder (TODO)',
						'False positive reduction: Placeholder (TODO)',
						'Early discard efficiency: Placeholder (TODO)',
						'Combined classification accuracy: Placeholder (TODO)',
					],
				},
			},
		],
		[],
	);

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
				id="technical-architecture"
				variants={titleVariants}
				className={cn([
					'text-center font-bold text-foreground tracking-wider',
					'text-2xl',
					'sm:text-3xl',
					'md:text-4xl',
					'lg:text-5xl',
				])}
			>
				Technical Architecture
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
				ExoNova's dual-pathway detection system combines two state-of-the-art AI
				models: CTAB-GAN+ for data quality enhancement and Masked Autoencoder
				for anomaly detection. This approach enables accurate exoplanet
				identification while handling the challenges of incomplete and
				imbalanced astronomical datasets.
			</motion.p>

			{/* Model cards grid */}
			<motion.div
				variants={containerVariants}
				className={cn([
					'mt-12 sm:mt-16 md:mt-20',
					'grid gap-6 sm:gap-8 md:gap-10',
					'grid-cols-1 lg:grid-cols-2',
					'max-w-7xl mx-auto',
				])}
			>
				{models.map((model) => (
					<ModelCard key={model.title} {...model} />
				))}
			</motion.div>

			{/* Pipeline visualization */}
			<motion.div
				variants={containerVariants}
				className={cn(['mt-12 sm:mt-16 md:mt-20', 'max-w-7xl mx-auto'])}
			>
				<PipelineVisualization />
			</motion.div>
		</motion.div>
	);
});

export { TechnicalArchitecture };
