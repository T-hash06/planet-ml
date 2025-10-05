import { cn } from '@heroui/react';
import { motion, useInView } from 'framer-motion';
import { memo, useId, useRef } from 'react';

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

// Animated transit visualization component
const TransitAnimation = memo(function TransitAnimation() {
	const gradientId = useId();

	return (
		<div className="relative w-full h-48 sm:h-56 md:h-64 flex flex-col items-center justify-center">
			{/* Star */}
			<motion.div
				className={cn([
					'absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2',
					'w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40',
					'rounded-full',
					'bg-gradient-to-br from-warning via-danger to-warning',
					'shadow-[0_0_60px_20px] shadow-warning/50',
				])}
				animate={{
					scale: [1, 1.05, 1],
					opacity: [1, 0.9, 1],
				}}
				transition={{
					duration: 3,
					repeat: Number.POSITIVE_INFINITY,
					ease: 'easeInOut',
				}}
			>
				{/* Star glow */}
				<div className="absolute inset-0 rounded-full bg-gradient-to-br from-warning to-danger opacity-50 blur-xl" />
			</motion.div>

			{/* Planet (transiting) */}
			<motion.div
				className={cn([
					'absolute top-1/3 -translate-y-1/2',
					'w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16',
					'rounded-full',
					'bg-gradient-to-br from-primary via-secondary to-primary',
					'shadow-lg shadow-primary/50',
					'border-2 border-foreground/20',
				])}
				animate={{
					left: ['-5%', '105%'],
				}}
				transition={{
					duration: 8,
					repeat: Number.POSITIVE_INFINITY,
					ease: 'linear',
				}}
			>
				{/* Planet glow */}
				<div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary to-secondary opacity-50 blur-md" />
			</motion.div>

			{/* Light curve graph */}
			<div className="absolute bottom-0 w-full h-24 sm:h-28 md:h-32 px-4">
				<div className="relative w-full h-full border-l-2 border-b-2 border-divider/50">
					{/* Y-axis label */}
					<span className="absolute left-4 -top-6 -translate-x-full text-tiny text-foreground/60">
						Brightness
					</span>
					{/* X-axis label */}
					<span className="absolute bottom-0 right-0 translate-y-full mt-1 text-tiny text-foreground/60">
						Time
					</span>

					{/* Light curve line with transit dip */}
					<svg
						className="w-full h-full"
						viewBox="0 0 400 100"
						preserveAspectRatio="none"
						role="img"
						aria-label="Light curve showing brightness dip during planetary transit"
					>
						<title>
							Light curve graph showing brightness variations during transit
						</title>
						<motion.path
							d="M0,20 L110,20 Q125,20 135,35 Q145,50 150,50 Q155,50 165,35 Q175,20 190,20 L400,20"
							stroke="currentColor"
							strokeWidth="2"
							fill="none"
							className="text-primary"
							initial={{ pathLength: 0, opacity: 0 }}
							animate={{ pathLength: 1, opacity: 1 }}
							transition={{
								duration: 8,
								repeat: Number.POSITIVE_INFINITY,
								ease: 'linear',
							}}
						/>
						{/* Gradient fill under the curve */}
						<motion.path
							d="M0,20 L110,20 Q125,20 135,35 Q145,50 150,50 Q155,50 165,35 Q175,20 190,20 L400,20 L400,100 L0,100 Z"
							fill={`url(#${gradientId})`}
							initial={{ opacity: 0 }}
							animate={{ opacity: 0.3 }}
							transition={{
								duration: 1,
								delay: 0.5,
							}}
						/>
						<defs>
							<linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
								<stop
									offset="0%"
									stopColor="currentColor"
									className="text-primary"
									stopOpacity="0.5"
								/>
								<stop
									offset="100%"
									stopColor="currentColor"
									className="text-primary"
									stopOpacity="0"
								/>
							</linearGradient>
						</defs>
					</svg>

					{/* Transit dip annotation */}
					<motion.div
						className="absolute top-1/2 left-[37.5%] text-tiny text-foreground/70 -translate-x-1/2 whitespace-nowrap"
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 1, duration: 0.5 }}
					>
						Transit Dip ↓
					</motion.div>
				</div>
			</div>
		</div>
	);
});

// Phase explanation cards
const PhaseCard = memo(function PhaseCard({
	phase,
	title,
	description,
}: {
	phase: number;
	title: string;
	description: string;
}) {
	return (
		<motion.div
			variants={cardVariants}
			whileHover={{
				scale: 1.05,
				y: -8,
				transition: { duration: 0.3, ease: 'easeOut' },
			}}
			className={cn([
				'relative flex flex-col gap-3 rounded-large p-5 sm:p-6',
				'bg-gradient-to-br from-content2 to-content1',
				'border border-divider/50',
				'shadow-medium hover:shadow-large transition-shadow duration-300',
				'backdrop-blur-sm',
				'overflow-hidden',
			])}
		>
			{/* Animated gradient background on hover */}
			<motion.div
				className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-primary/10 opacity-0"
				whileHover={{ opacity: 1 }}
				transition={{ duration: 0.3 }}
			/>

			{/* Phase number badge */}
			<div
				className={cn([
					'relative z-10 w-10 h-10 rounded-full flex items-center justify-center',
					'bg-gradient-to-br from-primary via-secondary to-primary',
					'text-foreground font-bold text-medium',
					'shadow-lg shadow-primary/50',
				])}
			>
				{phase}
			</div>

			<h3 className="relative z-10 font-semibold text-foreground text-medium sm:text-large">
				{title}
			</h3>

			<p className="relative z-10 text-foreground/70 text-small leading-relaxed">
				{description}
			</p>

			{/* Corner decoration */}
			<div className="absolute bottom-0 right-0 h-16 w-16 bg-gradient-to-tl from-secondary/30 to-transparent" />
		</motion.div>
	);
});

// Key metrics card
const MetricsCard = memo(function MetricsCard() {
	const metrics = [
		{
			label: 'Transit Depth',
			value: '0.5-2%',
			description: 'Brightness reduction during transit',
		},
		{
			label: 'Transit Duration',
			value: '2-6 hrs',
			description: 'Time planet crosses star',
		},
		{
			label: 'Orbital Period',
			value: 'Days-Years',
			description: 'Time between transits',
		},
	];

	return (
		<motion.div
			variants={cardVariants}
			className={cn([
				'relative rounded-large p-6 sm:p-8',
				'bg-gradient-to-br from-primary/15 via-primary/10 to-primary/5',
				'border border-primary/50',
				'shadow-lg shadow-primary/30',
				'backdrop-blur-xl',
				'overflow-hidden',
			])}
		>
			<h3 className="font-bold text-foreground text-large sm:text-xl mb-6">
				Key Detection Parameters
			</h3>

			<div className="grid gap-4 sm:gap-6">
				{metrics.map((metric, index) => (
					<motion.div
						key={metric.label}
						initial={{ opacity: 0, x: -20 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						transition={{ delay: index * 0.1, duration: 0.4 }}
						className="flex flex-col gap-1"
					>
						<div className="flex items-center justify-between">
							<span className="font-semibold text-foreground text-small sm:text-medium">
								{metric.label}
							</span>
							<span className="font-bold text-primary text-medium sm:text-large">
								{metric.value}
							</span>
						</div>
						<p className="text-foreground/60 text-tiny sm:text-small">
							{metric.description}
						</p>
					</motion.div>
				))}
			</div>

			{/* Corner decorations */}
			<div className="absolute top-0 right-0 h-20 w-20 bg-gradient-to-bl from-primary/30 to-transparent" />
			<div className="absolute bottom-0 left-0 h-20 w-20 bg-gradient-to-tr from-secondary/20 to-transparent" />
		</motion.div>
	);
});

const TransitMethod = memo(function TransitMethod() {
	const ref = useRef(null);
	const isInView = useInView(ref, {
		once: true,
		margin: '-100px 0px -100px 0px',
	});

	const phases = [
		{
			phase: 1,
			title: 'Before Transit',
			description:
				'The star emits constant light at full brightness. No planetary obstruction occurs, establishing the baseline luminosity.',
		},
		{
			phase: 2,
			title: 'During Transit',
			description:
				"As the planet crosses in front of the star, it blocks a small fraction of light, creating a measurable brightness dip that reveals the planet's presence.",
		},
		{
			phase: 3,
			title: 'After Transit',
			description:
				'The planet completes its crossing and the star returns to full brightness, creating a characteristic light curve pattern used for detection.',
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
				id="transit-method"
				variants={titleVariants}
				className={cn([
					'text-center font-bold text-foreground tracking-wider',
					'text-2xl',
					'sm:text-3xl',
					'md:text-4xl',
					'lg:text-5xl',
				])}
			>
				The Transit Method
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
				The transit method is the most successful technique for detecting
				exoplanets. When a planet passes in front of its host star, it blocks a
				small fraction of the star's light, creating a temporary dip in
				brightness that we can measure.
			</motion.p>

			{/* Animated transit visualization */}
			<motion.div
				variants={cardVariants}
				className={cn([
					'mt-12 sm:mt-16 md:mt-20 mx-auto max-w-4xl',
					'relative rounded-large p-6 sm:p-8 md:p-10',
					'bg-gradient-to-br from-content2 to-content1',
					'border border-divider/50',
					'shadow-lg',
					'backdrop-blur-sm',
					'overflow-hidden',
				])}
			>
				<h3 className="text-center font-semibold text-foreground text-large sm:text-xl mb-6">
					Visualizing a Transit Event
				</h3>

				<TransitAnimation />

				{/* Corner decorations */}
				<div className="absolute top-0 left-0 h-24 w-24 bg-gradient-to-br from-warning/20 to-transparent" />
				<div className="absolute bottom-0 right-0 h-24 w-24 bg-gradient-to-tl from-danger/20 to-transparent" />
			</motion.div>

			{/* Phase explanation cards */}
			<motion.div
				variants={containerVariants}
				className={cn([
					'mt-8 sm:mt-12 md:mt-16',
					'grid gap-4 sm:gap-6 md:gap-8',
					'grid-cols-1 md:grid-cols-3',
					'max-w-6xl mx-auto',
				])}
			>
				{phases.map((phase) => (
					<PhaseCard key={phase.phase} {...phase} />
				))}
			</motion.div>

			{/* Key metrics and "Why It Works" section */}
			<motion.div
				variants={containerVariants}
				className={cn([
					'mt-8 sm:mt-12 md:mt-16',
					'grid gap-6 sm:gap-8',
					'grid-cols-1 lg:grid-cols-2',
					'max-w-6xl mx-auto',
				])}
			>
				{/* Metrics card */}
				<MetricsCard />

				{/* Why It Works card */}
				<motion.div
					variants={cardVariants}
					whileHover={{
						scale: 1.02,
						y: -5,
						transition: { duration: 0.3, ease: 'easeOut' },
					}}
					className={cn([
						'relative rounded-large p-6 sm:p-8',
						'bg-gradient-to-br from-content2 to-content1',
						'border border-divider/50',
						'shadow-medium hover:shadow-large transition-shadow duration-300',
						'backdrop-blur-sm',
						'overflow-hidden',
					])}
				>
					<h3 className="font-bold text-foreground text-large sm:text-xl mb-4">
						Why It Works
					</h3>

					<div className="space-y-4">
						<p className="text-foreground/80 text-small sm:text-medium leading-relaxed">
							The transit method's success relies on precise photometric
							measurements. Even a small planet like Earth blocks approximately
							0.01% of the Sun's light—a tiny but detectable signal.
						</p>

						<p className="text-foreground/80 text-small sm:text-medium leading-relaxed">
							By observing repeated transits, we can determine the planet's
							orbital period, size, and distance from its star. Combined with
							additional observations, this enables characterization of
							potentially habitable worlds.
						</p>

						<div className="mt-6 p-4 rounded-medium bg-gradient-to-br from-success/20 to-success/10 border border-success/30">
							<p className="text-foreground/90 text-small font-medium">
								<strong>ExoNova's Advantage:</strong> Our AI models can detect
								subtle transit patterns that might be missed by traditional
								analysis, increasing discovery rates and reducing false
								positives.
							</p>
						</div>
					</div>

					{/* Corner decoration */}
					<div className="absolute bottom-0 right-0 h-20 w-20 bg-gradient-to-tl from-primary/20 to-transparent" />
				</motion.div>
			</motion.div>
		</motion.div>
	);
});

export { TransitMethod };
