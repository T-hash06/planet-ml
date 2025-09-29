import { cn } from '@heroui/react';
import {
	ChartBarIcon,
	GlobeIcon,
	MagnifyingGlassIcon,
	UsersIcon,
} from '@phosphor-icons/react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

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

const FeatureCard = ({ icon: Icon, title, description }: FeatureCardProps) => (
	<motion.div
		variants={cardVariants}
		whileHover={{
			scale: 1.05,
			transition: { duration: 0.2 },
		}}
		className={cn([
			'grid h-full w-64 cursor-pointer grid-rows-[30%_3rem_1fr] rounded-large bg-content2 p-5 text-center shadow-small',
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
		<strong className="place-self-center font-normal">{title}</strong>
		<p className="text-foreground/60 text-tiny leading-5">{description}</p>
	</motion.div>
);

const KeyFeatures = () => {
	const ref = useRef(null);
	const isInView = useInView(ref, {
		once: true,
		margin: '-100px 0px -100px 0px',
	});

	return (
		<motion.div
			ref={ref}
			initial="hidden"
			animate={isInView ? 'visible' : 'hidden'}
			variants={containerVariants}
			className="mt-42"
		>
			{/** biome-ignore lint/correctness/useUniqueElementIds: Because this is a static page */}
			<motion.h2
				id="key-features"
				variants={titleVariants}
				className="text-center font-bold text-4xl text-foreground tracking-wider"
			>
				Key Features
			</motion.h2>

			<motion.p
				variants={descriptionVariants}
				className="mt-6 text-center font-light text-foreground/75"
			>
				Discover the power of our exoplanet detection application with these key
				features.
			</motion.p>

			<motion.div
				variants={containerVariants}
				className="mt-16 flex h-48 items-center justify-center gap-10 text-foreground"
			>
				<FeatureCard
					icon={MagnifyingGlassIcon}
					title="Advanced AI/ML Models"
					description="Utilize cutting-edge AI/ML algorithms to accurate exoplanet detection"
				/>
				<FeatureCard
					icon={ChartBarIcon}
					title="Data Visualization"
					description="Visualize complex data with interactive charts and graphs."
				/>
				<FeatureCard
					icon={UsersIcon}
					title="Community Collaboration"
					description="Collaborate with a global community of researchers and enthusiasts."
				/>
				<FeatureCard
					icon={GlobeIcon}
					title="Global Reach"
					description="Access and contribute to exoplanet research from anywhere in the world."
				/>
			</motion.div>
		</motion.div>
	);
};

export { KeyFeatures };
