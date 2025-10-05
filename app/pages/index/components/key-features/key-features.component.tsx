import { cn } from '@heroui/react';
import {
	ChartBarIcon,
	GlobeIcon,
	MagnifyingGlassIcon,
	UsersIcon,
} from '@phosphor-icons/react';
import { motion, useInView } from 'framer-motion';
import { memo, useMemo, useRef } from 'react';

interface IconProps {
	size?: number;
	weight?: 'thin' | 'light' | 'regular' | 'bold' | 'fill' | 'duotone';
}

interface FeatureCardProps {
	icon: React.ComponentType<IconProps>;
	title: string;
	description: string;
}

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

const FeatureCard = memo(function FeatureCard({
	icon: Icon,
	title,
	description,
}: FeatureCardProps) {
	return (
		<motion.div
			variants={cardVariants}
			whileHover={{
				scale: 1.05,
				y: -8,
				transition: { duration: 0.3, ease: 'easeOut' },
			}}
			className={cn([
				'relative grid h-full w-full cursor-pointer grid-rows-[30%_3rem_1fr] rounded-large p-4 text-center',
				'sm:w-64 sm:p-5',
				'max-w-sm mx-auto sm:mx-0',
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

			{/* Icon container with enhanced styling */}
			<motion.span
				whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
				transition={{ duration: 0.5 }}
				className={cn([
					'relative z-10 flex aspect-square h-full items-center justify-center place-self-center rounded-full',
					'bg-gradient-to-br from-secondary via-primary to-secondary',
					'text-foreground dark:text-foreground',
					'shadow-lg shadow-primary/50',
					'border-2 border-foreground/20',
				])}
			>
				{/* Glow effect */}
				<div className="absolute inset-0 animate-pulse rounded-full bg-gradient-to-br from-secondary to-primary opacity-50 blur-md" />
				<span className="relative z-10">
					<Icon size={28} weight="duotone" />
				</span>
			</motion.span>

			<strong
				className={cn([
					'relative z-10 place-self-center font-semibold text-foreground',
					'text-small',
					'sm:text-medium',
				])}
			>
				{title}
			</strong>
			<p
				className={cn([
					'relative z-10 text-foreground/70 leading-5',
					'text-tiny',
					'sm:text-small',
				])}
			>
				{description}
			</p>

			{/* Corner decoration */}
			<div className="absolute top-0 right-0 h-20 w-20 bg-gradient-to-bl from-primary/10 to-transparent rounded-large" />
		</motion.div>
	);
});

const KeyFeatures = memo(function KeyFeatures() {
	const ref = useRef(null);
	const isInView = useInView(ref, {
		once: true,
		margin: '-100px 0px -100px 0px',
	});

	// Memoize features data to prevent unnecessary re-renders
	const features = useMemo(
		() => [
			{
				icon: ChartBarIcon,
				title: 'Dual-Modal Detection',
				description:
					'Analyzes both time-series light curves and tabular parameters using MAE-based anomaly detection for comprehensive exoplanet identification.',
			},
			{
				icon: GlobeIcon,
				title: 'Self-Supervised Learning',
				description:
					'Leverages vast unlabeled datasets from Kepler, K2, and TESS missions to learn robust stellar behavior patterns without extensive manual labeling.',
			},
			{
				icon: MagnifyingGlassIcon,
				title: 'Explainable AI',
				description:
					'Provides confidence scores and feature importance attribution for every prediction, enabling scientific validation and interpretation.',
			},
			{
				icon: UsersIcon,
				title: 'Open-Source Platform',
				description:
					'Freely accessible web interface for researchers and enthusiasts to upload data, receive classifications, and contribute to planetary discovery.',
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
				id="key-features"
				variants={titleVariants}
				className={cn([
					'text-center font-bold text-foreground tracking-wider',
					'text-2xl',
					'sm:text-3xl',
					'md:text-4xl',
					'lg:text-5xl',
				])}
			>
				Why ExoNova?
			</motion.h2>

			<motion.p
				variants={descriptionVariants}
				className={cn([
					'mt-4 text-center font-light text-foreground/75 max-w-2xl mx-auto px-4',
					'sm:mt-6 sm:px-0',
					'text-small',
					'sm:text-medium',
					'md:text-large',
				])}
			>
				ExoNova combines state-of-the-art machine learning architectures with
				NASA's comprehensive astronomical datasets to revolutionize exoplanet
				discovery.
			</motion.p>

			<motion.div
				variants={containerVariants}
				className={cn([
					'mt-8 text-foreground h-64',
					'sm:mt-12',
					'md:mt-16',
					'grid gap-6 auto-rows-fr',
					'grid-cols-1',
					'sm:grid-cols-2 sm:gap-8',
					'lg:grid-cols-4 lg:gap-10',
					'max-w-7xl mx-auto',
				])}
			>
				{features.map((feature) => (
					<FeatureCard
						key={feature.title}
						icon={feature.icon}
						title={feature.title}
						description={feature.description}
					/>
				))}
			</motion.div>
		</motion.div>
	);
});

export { KeyFeatures };
