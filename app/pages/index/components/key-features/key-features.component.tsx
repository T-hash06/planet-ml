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
				transition: { duration: 0.2 },
			}}
			className={cn([
				'grid h-full w-full cursor-pointer grid-rows-[30%_3rem_1fr] rounded-large bg-content2 p-4 text-center shadow-small',
				'sm:w-64 sm:p-5',
				'max-w-sm mx-auto sm:mx-0',
			])}
		>
			<motion.span
				className={cn([
					'flex aspect-square h-full items-center justify-center place-self-center rounded-full',
					'bg-gradient-to-br from-secondary to-primary text-background dark:text-foreground',
				])}
			>
				<Icon size={24} weight="duotone" />
			</motion.span>
			<strong
				className={cn([
					'place-self-center font-normal',
					'text-small',
					'sm:text-medium',
				])}
			>
				{title}
			</strong>
			<p
				className={cn([
					'text-foreground/60 leading-5',
					'text-tiny',
					'sm:text-small',
				])}
			>
				{description}
			</p>
		</motion.div>
	);
});

const KeyFeatures = memo(function KeyFeatures() {
	const ref = useRef(null);
	const isInView = useInView(ref, {
		once: true,
		margin: '-50px 0px -50px 0px',
	});

	// Memoize features data to prevent unnecessary re-renders
	const features = useMemo(
		() => [
			{
				icon: MagnifyingGlassIcon,
				title: 'Advanced AI/ML Models',
				description:
					'Utilize cutting-edge AI/ML algorithms to accurate exoplanet detection',
			},
			{
				icon: ChartBarIcon,
				title: 'Data Visualization',
				description:
					'Visualize complex data with interactive charts and graphs.',
			},
			{
				icon: UsersIcon,
				title: 'Community Collaboration',
				description:
					'Collaborate with a global community of researchers and enthusiasts.',
			},
			{
				icon: GlobeIcon,
				title: 'Global Reach',
				description:
					'Access and contribute to exoplanet research from anywhere in the world.',
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
				'mt-12 px-4',
				'sm:mt-16 sm:px-6',
				'md:mt-20 md:px-8',
				'lg:mt-24 lg:px-12',
				'xl:mt-32 xl:px-16',
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
				Key Features
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
				Discover the power of our exoplanet detection application with these key
				features.
			</motion.p>

			<motion.div
				variants={containerVariants}
				className={cn([
					'mt-8 text-foreground',
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
