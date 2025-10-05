import { cn } from '@heroui/react';
import { DatabaseIcon, GlobeIcon, RocketIcon } from '@phosphor-icons/react';
import { motion, useInView } from 'framer-motion';
import { memo, useRef } from 'react';

interface IconProps {
	size?: number;
	weight?: 'thin' | 'light' | 'regular' | 'bold' | 'fill' | 'duotone';
}

interface MissionCardProps {
	icon: React.ComponentType<IconProps>;
	name: string;
	launchYear: string;
	status: string;
	discoveries: string;
	description: string;
	accentColor: 'primary' | 'secondary' | 'success';
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

// Mission card component
const MissionCard = memo(function MissionCard({
	icon: Icon,
	name,
	launchYear,
	status,
	discoveries,
	description,
	accentColor,
}: MissionCardProps) {
	const colorClasses = {
		primary: {
			gradient: 'from-primary via-primary-600 to-primary',
			border: 'border-primary/50',
			shadow: 'shadow-primary/30',
			glow: 'from-primary to-primary-600',
			hover: 'from-primary/10 via-primary/5 to-primary/10',
		},
		secondary: {
			gradient: 'from-secondary via-secondary-600 to-secondary',
			border: 'border-secondary/50',
			shadow: 'shadow-secondary/30',
			glow: 'from-secondary to-secondary-600',
			hover: 'from-secondary/10 via-secondary/5 to-secondary/10',
		},
		success: {
			gradient: 'from-success via-success-600 to-success',
			border: 'border-success/50',
			shadow: 'shadow-success/30',
			glow: 'from-success to-success-600',
			hover: 'from-success/10 via-success/5 to-success/10',
		},
	};

	const colors = colorClasses[accentColor];

	return (
		<motion.div
			variants={cardVariants}
			whileHover={{
				scale: 1.05,
				y: -8,
				transition: { duration: 0.3, ease: 'easeOut' },
			}}
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
			{/* Animated gradient background on hover */}
			<motion.div
				className={cn([
					'absolute inset-0 bg-gradient-to-br opacity-0',
					colors.hover,
				])}
				whileHover={{ opacity: 1 }}
				transition={{ duration: 0.3 }}
			/>

			{/* Icon container */}
			<motion.div
				whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
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

			{/* Mission name and year */}
			<div className="relative z-10">
				<h3 className="font-bold text-foreground text-large sm:text-xl">
					{name}
				</h3>
				<p className="text-foreground/60 text-small mt-1">
					Launched: {launchYear}
				</p>
			</div>

			{/* Status badge */}
			<div className="relative z-10">
				<span
					className={cn([
						'inline-block px-3 py-1 rounded-full text-tiny font-semibold',
						status === 'Active'
							? 'bg-success/20 text-success border border-success/30'
							: 'bg-foreground/10 text-foreground/70 border border-foreground/20',
					])}
				>
					{status}
				</span>
			</div>

			{/* Discoveries */}
			<div
				className={cn([
					'relative z-10 p-3 rounded-medium bg-gradient-to-br',
					colors.hover,
					'border',
					colors.border,
				])}
			>
				<p className="font-bold text-foreground text-medium sm:text-large">
					{discoveries}
				</p>
				<p className="text-foreground/60 text-tiny">Confirmed Discoveries</p>
			</div>

			{/* Description */}
			<p className="relative z-10 text-foreground/70 text-small leading-relaxed">
				{description}
			</p>

			{/* Corner decoration */}
			<div
				className={cn([
					'absolute top-0 right-0 h-20 w-20 bg-gradient-to-bl to-transparent opacity-30',
					colors.gradient,
				])}
			/>
		</motion.div>
	);
});

// Dataset information card
const DatasetCard = memo(function DatasetCard() {
	return (
		<motion.div
			variants={cardVariants}
			whileHover={{
				scale: 1.02,
				y: -5,
				transition: { duration: 0.3, ease: 'easeOut' },
			}}
			className={cn([
				'relative rounded-large p-6 sm:p-8',
				'bg-gradient-to-br from-warning/15 via-warning/10 to-warning/5',
				'border border-warning/50',
				'shadow-lg shadow-warning/30',
				'backdrop-blur-xl',
				'overflow-hidden',
			])}
		>
			{/* Icon */}
			<motion.div
				whileHover={{ scale: 1.1, rotate: 5 }}
				className={cn([
					'relative w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-full mb-4',
					'bg-gradient-to-br from-warning via-danger to-warning',
					'text-foreground shadow-lg shadow-warning/50',
					'border-2 border-foreground/20',
				])}
			>
				<div className="absolute inset-0 animate-pulse rounded-full bg-gradient-to-br from-warning to-danger opacity-50 blur-md" />
				<span className="relative z-10">
					<DatabaseIcon size={24} weight="duotone" />
				</span>
			</motion.div>{' '}
			<h3 className="font-bold text-foreground text-large sm:text-xl mb-4">
				Training Datasets
			</h3>
			<div className="space-y-4">
				<div>
					<h4 className="font-semibold text-foreground text-medium mb-2">
						Planetary Systems Composite Parameters
					</h4>
					<p className="text-foreground/70 text-small leading-relaxed mb-2">
						Comprehensive database of 6,022 confirmed exoplanets with detailed
						orbital and physical parameters from all NASA missions.
					</p>
					<a
						href="https://exoplanetarchive.ipac.caltech.edu/TAP/sync?query=select+*+from+pscomppars&format=json"
						target="_blank"
						rel="noopener noreferrer"
						className="text-warning hover:text-warning-600 text-tiny font-medium underline transition-colors"
						aria-label="View Planetary Systems Composite Parameters dataset"
					>
						View Dataset API →
					</a>
				</div>

				<div className="pt-4 border-t border-divider/30">
					<h4 className="font-semibold text-foreground text-medium mb-2">
						TESS Objects of Interest (TOI)
					</h4>
					<p className="text-foreground/70 text-small leading-relaxed mb-2">
						Catalog of planetary candidates and false positives from TESS,
						providing crucial negative examples for balanced model training.
					</p>
					<a
						href="https://exoplanetarchive.ipac.caltech.edu/docs/API_TOI_columns.html"
						target="_blank"
						rel="noopener noreferrer"
						className="text-warning hover:text-warning-600 text-tiny font-medium underline transition-colors"
						aria-label="View TESS Objects of Interest documentation"
					>
						View TOI Documentation →
					</a>
				</div>
			</div>
			{/* Corner decorations */}
			<div className="absolute top-0 right-0 h-24 w-24 bg-gradient-to-bl from-warning/30 to-transparent" />
			<div className="absolute bottom-0 left-0 h-24 w-24 bg-gradient-to-tr from-danger/20 to-transparent" />
		</motion.div>
	);
});

// Data coverage statistics
const CoverageStats = memo(function CoverageStats() {
	const stats = [
		{
			label: 'Light Curves',
			value: '200,000+',
			description: 'Time-series observations analyzed',
		},
		{
			label: 'Parameters',
			value: '50+',
			description: 'Astronomical features tracked per object',
		},
		{
			label: 'Observation Span',
			value: '15+ Years',
			description: 'From Kepler (2009) to TESS (present)',
		},
	];

	return (
		<motion.div
			variants={cardVariants}
			className={cn([
				'relative rounded-large p-6 sm:p-8',
				'bg-gradient-to-br from-content2 to-content1',
				'border border-divider/50',
				'shadow-medium',
				'backdrop-blur-sm',
				'overflow-hidden',
			])}
		>
			<h3 className="font-bold text-foreground text-large sm:text-xl mb-6">
				Data Coverage
			</h3>

			<div className="grid gap-6 sm:grid-cols-3">
				{stats.map((stat, index) => (
					<motion.div
						key={stat.label}
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ delay: index * 0.1, duration: 0.4 }}
						className="flex flex-col gap-2"
					>
						<div className="font-bold text-primary text-xl sm:text-2xl">
							{stat.value}
						</div>
						<div className="font-semibold text-foreground text-small sm:text-medium">
							{stat.label}
						</div>
						<p className="text-foreground/60 text-tiny leading-relaxed">
							{stat.description}
						</p>
					</motion.div>
				))}
			</div>

			{/* Timeline visualization */}
			<div className="mt-8 pt-6 border-t border-divider/30">
				<h4 className="font-semibold text-foreground text-medium mb-4">
					Mission Timeline
				</h4>
				<div className="relative h-2 bg-gradient-to-r from-primary via-secondary to-success rounded-full overflow-hidden">
					<motion.div
						className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
						animate={{ x: ['-100%', '200%'] }}
						transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
					/>
				</div>
				<div className="flex justify-between mt-2 text-tiny text-foreground/60">
					<span>2009 (Kepler)</span>
					<span>2014 (K2)</span>
					<span>2018 (TESS)</span>
					<span>Present</span>
				</div>
			</div>

			{/* Corner decoration */}
			<div className="absolute bottom-0 right-0 h-20 w-20 bg-gradient-to-tl from-primary/20 to-transparent" />
		</motion.div>
	);
});

const DataSources = memo(function DataSources() {
	const ref = useRef(null);
	const isInView = useInView(ref, {
		once: true,
		margin: '-100px 0px -100px 0px',
	});

	const missions = [
		{
			icon: RocketIcon,
			name: 'Kepler Mission',
			launchYear: '2009',
			status: 'Completed (2018)',
			discoveries: '2,662 Exoplanets',
			description:
				"NASA's first dedicated exoplanet hunting mission. Continuously monitored 150,000 stars in the Cygnus constellation, discovering thousands of planets and revolutionizing our understanding of planetary systems.",
			accentColor: 'primary' as const,
		},
		{
			icon: RocketIcon,
			name: 'K2 Mission',
			launchYear: '2014',
			status: 'Completed (2018)',
			discoveries: '500+ Exoplanets',
			description:
				'Extended Kepler mission using a modified observing strategy. Despite mechanical failures, K2 observed various star fields, discovering hundreds of additional planets and demonstrating mission adaptability.',
			accentColor: 'secondary' as const,
		},
		{
			icon: GlobeIcon,
			name: 'TESS Mission',
			launchYear: '2018',
			status: 'Active',
			discoveries: '400+ Exoplanets',
			description:
				'Transiting Exoplanet Survey Satellite conducting an all-sky survey. TESS monitors 200,000+ nearby bright stars, discovering planets around our stellar neighbors and enabling detailed follow-up observations.',
			accentColor: 'success' as const,
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
				id="data-sources"
				variants={titleVariants}
				className={cn([
					'text-center font-bold text-foreground tracking-wider',
					'text-2xl',
					'sm:text-3xl',
					'md:text-4xl',
					'lg:text-5xl',
				])}
			>
				Data Sources & NASA Missions
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
				ExoNova is trained on publicly available data from NASA's most
				successful exoplanet hunting missions, representing decades of
				astronomical observations and thousands of confirmed planetary
				discoveries.
			</motion.p>

			{/* Mission cards */}
			<motion.div
				variants={containerVariants}
				className={cn([
					'mt-12 sm:mt-16 md:mt-20',
					'grid gap-6 sm:gap-8',
					'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
					'max-w-7xl mx-auto',
				])}
			>
				{missions.map((mission) => (
					<MissionCard key={mission.name} {...mission} />
				))}
			</motion.div>

			{/* Dataset information and coverage stats */}
			<motion.div
				variants={containerVariants}
				className={cn([
					'mt-8 sm:mt-12 md:mt-16',
					'grid gap-6 sm:gap-8',
					'grid-cols-1 lg:grid-cols-2',
					'max-w-6xl mx-auto',
				])}
			>
				<DatasetCard />
				<CoverageStats />
			</motion.div>

			{/* Additional info section */}
			<motion.div
				variants={cardVariants}
				className={cn([
					'mt-8 sm:mt-12',
					'max-w-4xl mx-auto',
					'relative rounded-large p-6 sm:p-8',
					'bg-gradient-to-br from-content2 to-content1',
					'border border-divider/50',
					'shadow-medium',
					'backdrop-blur-sm',
					'overflow-hidden',
				])}
			>
				<h3 className="font-bold text-foreground text-large sm:text-xl mb-4">
					Open Data Philosophy
				</h3>

				<p className="text-foreground/80 text-small sm:text-medium leading-relaxed mb-4">
					All training data comes from NASA's publicly accessible Exoplanet
					Archive, ensuring transparency and reproducibility. This open science
					approach allows researchers worldwide to validate our methods and
					contribute to planetary discovery.
				</p>

				<div className="flex flex-wrap gap-3 mt-6">
					<a
						href="https://exoplanetarchive.ipac.caltech.edu/"
						target="_blank"
						rel="noopener noreferrer"
						className={cn([
							'inline-flex items-center gap-2 px-4 py-2 rounded-medium',
							'bg-gradient-to-br from-primary/20 to-primary/10',
							'border border-primary/30',
							'text-primary hover:text-primary-600',
							'text-small font-medium',
							'transition-colors duration-200',
							'hover:bg-primary/30',
						])}
						aria-label="Visit NASA Exoplanet Archive"
					>
						NASA Exoplanet Archive →
					</a>
					<a
						href="https://www.nasa.gov/tess-transiting-exoplanet-survey-satellite"
						target="_blank"
						rel="noopener noreferrer"
						className={cn([
							'inline-flex items-center gap-2 px-4 py-2 rounded-medium',
							'bg-gradient-to-br from-success/20 to-success/10',
							'border border-success/30',
							'text-success hover:text-success-600',
							'text-small font-medium',
							'transition-colors duration-200',
							'hover:bg-success/30',
						])}
						aria-label="Learn about TESS Mission"
					>
						TESS Mission →
					</a>
				</div>

				{/* Corner decoration */}
				<div className="absolute bottom-0 right-0 h-24 w-24 bg-gradient-to-tl from-secondary/20 to-transparent" />
			</motion.div>
		</motion.div>
	);
});

export { DataSources };
