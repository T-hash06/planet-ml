'use client';

import { cn } from '@heroui/react';
import {
	BookOpenIcon,
	GraduationCapIcon,
	MagnifyingGlassIcon,
	UsersIcon,
} from '@phosphor-icons/react';
import { motion, useInView } from 'framer-motion';
import { memo, useRef } from 'react';

interface IconProps {
	size?: number;
	weight?: 'thin' | 'light' | 'regular' | 'bold' | 'fill' | 'duotone';
}

interface UseCaseCardProps {
	icon: React.ComponentType<IconProps>;
	title: string;
	subtitle: string;
	capabilities: string[];
	workflow: string;
	accentColor: 'primary' | 'secondary' | 'success' | 'warning';
	delay?: number;
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

// Use case card component
const UseCaseCard = memo(function UseCaseCard({
	icon: Icon,
	title,
	subtitle,
	capabilities,
	workflow,
	accentColor,
	delay = 0,
}: UseCaseCardProps) {
	const colorClasses = {
		primary: {
			gradient: 'from-primary via-primary-600 to-primary',
			border: 'border-primary/50',
			shadow: 'shadow-primary/30',
			glow: 'from-primary to-primary-600',
			hover: 'from-primary/10 via-primary/5 to-primary/10',
			badge: 'bg-primary/20 text-primary border-primary/30',
		},
		secondary: {
			gradient: 'from-secondary via-secondary-600 to-secondary',
			border: 'border-secondary/50',
			shadow: 'shadow-secondary/30',
			glow: 'from-secondary to-secondary-600',
			hover: 'from-secondary/10 via-secondary/5 to-secondary/10',
			badge: 'bg-secondary/20 text-secondary border-secondary/30',
		},
		success: {
			gradient: 'from-success via-success-600 to-success',
			border: 'border-success/50',
			shadow: 'shadow-success/30',
			glow: 'from-success to-success-600',
			hover: 'from-success/10 via-success/5 to-success/10',
			badge: 'bg-success/20 text-success border-success/30',
		},
		warning: {
			gradient: 'from-warning via-warning-600 to-warning',
			border: 'border-warning/50',
			shadow: 'shadow-warning/30',
			glow: 'from-warning to-warning-600',
			hover: 'from-warning/10 via-warning/5 to-warning/10',
			badge: 'bg-warning/20 text-warning border-warning/30',
		},
	};

	const colors = colorClasses[accentColor];

	return (
		<motion.div
			variants={cardVariants}
			custom={delay}
			whileHover={{
				scale: 1.05,
				y: -8,
				transition: { duration: 0.3, ease: 'easeOut' },
			}}
			className={cn([
				'relative flex flex-col gap-5 rounded-large p-6 sm:p-7',
				'bg-gradient-to-br from-content2 to-content1',
				'border',
				colors.border,
				'shadow-lg hover:shadow-xl',
				colors.shadow,
				'transition-shadow duration-300',
				'backdrop-blur-sm',
				'overflow-hidden',
				'h-full',
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
					'relative z-10 w-16 h-16 sm:w-18 sm:h-18 flex items-center justify-center rounded-full',
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
					<Icon size={32} weight="duotone" />
				</span>
			</motion.div>

			{/* Title and subtitle */}
			<div className="relative z-10">
				<h3 className="font-bold text-foreground text-xl sm:text-2xl mb-2">
					{title}
				</h3>
				<p className="text-foreground/70 text-small sm:text-medium">
					{subtitle}
				</p>
			</div>

			{/* Capabilities list */}
			<div className="relative z-10 flex-1">
				<h4 className="font-semibold text-foreground text-medium mb-3">
					Key Capabilities:
				</h4>
				<ul className="space-y-2">
					{capabilities.map((capability, index) => (
						<motion.li
							key={capability}
							initial={{ opacity: 0, x: -10 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true }}
							transition={{ delay: index * 0.1, duration: 0.3 }}
							className="flex items-start gap-2 text-foreground/80 text-small"
						>
							<span
								className={cn([
									'inline-block w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0',
									'bg-gradient-to-br',
									colors.gradient,
								])}
							/>
							<span>{capability}</span>
						</motion.li>
					))}
				</ul>
			</div>

			{/* Workflow */}
			<div
				className={cn([
					'relative z-10 p-3 rounded-medium',
					'bg-gradient-to-br',
					colors.hover,
					'border',
					colors.border,
				])}
			>
				<p className="text-foreground/70 text-tiny font-medium mb-1">
					Typical Workflow:
				</p>
				<p className="text-foreground text-small font-semibold">{workflow}</p>
			</div>

			{/* Getting Started button */}
			<motion.a
				href="#live-preview"
				whileHover={{ scale: 1.02 }}
				whileTap={{ scale: 0.98 }}
				className={cn([
					'relative z-10 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-medium',
					'bg-gradient-to-br',
					colors.gradient,
					'text-foreground font-semibold text-small',
					'shadow-md',
					colors.shadow,
					'hover:shadow-lg transition-shadow duration-300',
					'border border-foreground/10',
				])}
				aria-label={`Get started with ${title}`}
			>
				<span>Get Started</span>
				<span className="text-lg">→</span>
			</motion.a>

			{/* Corner decoration */}
			<div
				className={cn([
					'absolute top-0 right-0 h-24 w-24 bg-gradient-to-bl to-transparent opacity-20',
					colors.gradient,
				])}
			/>
		</motion.div>
	);
});

// Impact statistics component
const ImpactStats = memo(function ImpactStats() {
	const stats = [
		{
			value: '200K+',
			label: 'Light Curves',
			description: 'Ready for automated analysis',
		},
		{
			value: '50+',
			label: 'Research Projects',
			description: 'Potential collaborative studies',
		},
		{
			value: '24/7',
			label: 'Availability',
			description: 'Continuous detection service',
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
			<h3 className="font-bold text-foreground text-large sm:text-xl mb-6 text-center">
				Real-World Impact
			</h3>

			<div className="grid gap-6 sm:grid-cols-3">
				{stats.map((stat, index) => (
					<motion.div
						key={stat.label}
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ delay: index * 0.1, duration: 0.4 }}
						className="flex flex-col items-center gap-2 text-center"
					>
						<div className="font-bold text-primary text-3xl sm:text-4xl">
							{stat.value}
						</div>
						<div className="font-semibold text-foreground text-medium">
							{stat.label}
						</div>
						<div className="text-foreground/60 text-tiny">
							{stat.description}
						</div>
					</motion.div>
				))}
			</div>

			{/* Corner decoration */}
			<div className="absolute bottom-0 right-0 h-20 w-20 bg-gradient-to-tl from-primary/20 to-transparent" />
		</motion.div>
	);
});

const UseCases = memo(function UseCases() {
	const ref = useRef(null);
	const isInView = useInView(ref, {
		once: true,
		margin: '-100px 0px -100px 0px',
	});

	const useCases: UseCaseCardProps[] = [
		{
			icon: MagnifyingGlassIcon,
			title: 'For Researchers',
			subtitle: 'Advanced astronomical data analysis',
			capabilities: [
				'Automated dataset analysis with batch processing',
				'Confidence scoring for each detection',
				'Feature importance attribution for validation',
				'Export results in standard astronomical formats',
			],
			workflow: 'Upload → Analyze → Validate → Publish',
			accentColor: 'primary',
		},
		{
			icon: BookOpenIcon,
			title: 'For Educators',
			subtitle: 'Engaging classroom demonstrations',
			capabilities: [
				'Interactive demonstrations of transit method',
				'Visual explanations of detection algorithms',
				'Real-time parameter adjustment for learning',
				'Curriculum integration materials',
			],
			workflow: 'Demonstrate → Adjust → Explain → Engage',
			accentColor: 'secondary',
		},
		{
			icon: GraduationCapIcon,
			title: 'For Students',
			subtitle: 'Hands-on learning experience',
			capabilities: [
				'Accessible interface requiring no coding',
				'Instant feedback on parameter changes',
				'Learn by experimentation approach',
				'Understand real astronomical data',
			],
			workflow: 'Explore → Experiment → Learn → Discover',
			accentColor: 'success',
		},
		{
			icon: UsersIcon,
			title: 'For Citizen Scientists',
			subtitle: 'Contribute to planetary discovery',
			capabilities: [
				'Upload your own astronomical observations',
				'Community collaboration and data sharing',
				'Contribute to open science initiatives',
				'Access to same tools as professionals',
			],
			workflow: 'Observe → Upload → Collaborate → Contribute',
			accentColor: 'warning',
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
				id="use-cases"
				variants={titleVariants}
				className={cn([
					'text-center font-bold text-foreground tracking-wider',
					'text-2xl',
					'sm:text-3xl',
					'md:text-4xl',
					'lg:text-5xl',
				])}
			>
				Applications & Use Cases
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
				ExoNova serves diverse audiences from professional astronomers to
				curious students, providing accessible AI-powered exoplanet detection
				capabilities for everyone.
			</motion.p>

			{/* Use case cards */}
			<motion.div
				variants={containerVariants}
				className={cn([
					'mt-12 sm:mt-16 md:mt-20',
					'grid gap-6 sm:gap-8',
					'grid-cols-1 md:grid-cols-2 xl:grid-cols-4',
					'max-w-7xl mx-auto',
				])}
			>
				{useCases.map((useCase, index) => (
					<UseCaseCard key={useCase.title} {...useCase} delay={index * 0.1} />
				))}
			</motion.div>

			{/* Impact statistics */}
			<motion.div
				variants={containerVariants}
				className={cn(['mt-8 sm:mt-12 md:mt-16', 'max-w-5xl mx-auto'])}
			>
				<ImpactStats />
			</motion.div>

			{/* Additional information */}
			<motion.div
				variants={cardVariants}
				className={cn([
					'mt-8 sm:mt-12',
					'max-w-4xl mx-auto',
					'relative rounded-large p-6 sm:p-8',
					'bg-gradient-to-br from-danger/15 via-warning/10 to-danger/15',
					'border border-danger/50',
					'shadow-lg shadow-danger/30',
					'backdrop-blur-xl',
					'overflow-hidden',
				])}
			>
				<h3 className="font-bold text-foreground text-large sm:text-xl mb-4">
					Universal Access to Exoplanet Science
				</h3>

				<p className="text-foreground/80 text-small sm:text-medium leading-relaxed mb-4">
					Whether you're conducting cutting-edge research, teaching the next
					generation of scientists, or simply curious about planets beyond our
					solar system, ExoNova provides the tools and accessibility to make
					exoplanet detection available to everyone.
				</p>

				<p className="text-foreground/70 text-small leading-relaxed">
					Our open-source platform eliminates barriers to entry while
					maintaining the rigor and accuracy required for professional
					astronomical research. Join our community and start your exoplanet
					discovery journey today.
				</p>

				{/* Corner decorations */}
				<div className="absolute top-0 right-0 h-24 w-24 bg-gradient-to-bl from-danger/30 to-transparent" />
				<div className="absolute bottom-0 left-0 h-24 w-24 bg-gradient-to-tr from-warning/20 to-transparent" />
			</motion.div>
		</motion.div>
	);
});

export { UseCases };
