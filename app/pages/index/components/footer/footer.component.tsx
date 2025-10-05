import { cn } from '@heroui/react';
import {
	GithubLogoIcon,
	GraduationCapIcon,
	LinkedinLogoIcon,
	MapPinIcon,
	RocketLaunchIcon,
	UsersIcon,
} from '@phosphor-icons/react';
import { motion, useInView } from 'framer-motion';
import { memo, useRef } from 'react';

// Animation variants for Footer component
const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			duration: 0.8,
			staggerChildren: 0.15,
			delayChildren: 0.2,
		},
	},
};

const itemTransition = {
	duration: 0.6,
	ease: 'easeOut' as const,
};

const itemVariants = {
	hidden: {
		opacity: 0,
		y: 30,
		filter: 'blur(6px)',
	},
	visible: {
		opacity: 1,
		y: 0,
		filter: 'blur(0px)',
	},
};

const Footer = memo(() => {
	const ref = useRef(null);
	const isInView = useInView(ref, {
		once: true,
		margin: '-100px 0px -100px 0px',
	});

	const teamMembers = [
		{ name: 'Juan Pablo Camargo', role: 'DL/ML Engineer' },
		{ name: 'Tomas Panqueva', role: 'Full Stack Developer' },
		{ name: 'Marianella Polo', role: 'Full Stack Developer' },
		{ name: 'Alejandra Guanga', role: 'Backend Developer' },
		{ name: 'Daniel Barrera', role: 'Backend Developer' },
		{ name: 'Julian Moreno', role: 'Mathematician' },
	];

	const socialLinks = [
		{
			name: 'GitHub',
			icon: GithubLogoIcon,
			href: '#github-repo-url',
			color: 'from-foreground to-foreground/80',
		},
		{
			name: 'LinkedIn',
			icon: LinkedinLogoIcon,
			href: '#team-linkedin',
			color: 'from-primary to-secondary text-foreground',
		},
	];

	return (
		<motion.footer
			ref={ref}
			initial="hidden"
			animate={isInView ? 'visible' : 'hidden'}
			variants={containerVariants}
			className={cn([
				'relative w-full overflow-hidden',
				'mt-24 sm:mt-32 md:mt-40 lg:mt-48',
				'border-t border-divider/50',
				'bg-gradient-to-br from-content2 to-content1',
				'backdrop-blur-xl',
			])}
		>
			{/* Ambient gradient overlays */}
			<div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-secondary/5 mix-blend-soft-light pointer-events-none" />
			<div className="absolute inset-0 bg-gradient-to-tr from-danger/3 via-transparent to-warning/3 mix-blend-overlay pointer-events-none" />

			{/* Corner decorations */}
			<div className="absolute top-0 left-0 h-32 w-32 bg-gradient-to-br from-primary/20 to-transparent pointer-events-none" />
			<div className="absolute bottom-0 right-0 h-32 w-32 bg-gradient-to-tl from-secondary/20 to-transparent pointer-events-none" />

			<div
				className={cn([
					'relative z-10 mx-auto max-w-7xl',
					'px-6 sm:px-8 md:px-12 lg:px-16',
					'py-12 sm:py-16 md:py-20',
				])}
			>
				{/* Main Content Grid */}
				<div
					className={cn([
						'grid gap-8 sm:gap-10 md:gap-12 lg:gap-16',
						'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
					])}
				>
					{/* Challenge Info Section */}
					<motion.div
						variants={itemVariants}
						transition={itemTransition}
						className="flex flex-col gap-4 sm:gap-5"
					>
						<div className="flex items-center gap-3">
							<motion.span
								whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
								transition={{ duration: 0.5 }}
								className={cn([
									'relative flex items-center justify-center rounded-full shrink-0',
									'bg-gradient-to-br from-danger via-warning to-danger',
									'shadow-lg shadow-danger/50',
									'border-2 border-foreground/20',
									'w-12 h-12 sm:w-14 sm:h-14',
								])}
							>
								{/* Glow effect */}
								<div className="absolute inset-0 animate-pulse rounded-full bg-gradient-to-br from-danger to-warning opacity-50 blur-md" />
								<span className="relative z-10 flex items-center justify-center">
									<RocketLaunchIcon
										size={28}
										weight="duotone"
										className="text-foreground"
									/>
								</span>
							</motion.span>
							<h3
								className={cn([
									'font-bold text-foreground',
									'text-large sm:text-xl md:text-2xl',
									'drop-shadow-[0_2px_8px_rgba(0,0,0,0.15)]',
								])}
							>
								NASA Space Apps Challenge
							</h3>
						</div>
						<p
							className={cn([
								'text-foreground/80 leading-relaxed',
								'text-small sm:text-medium',
							])}
						>
							Participants in the{' '}
							<span className="font-semibold text-danger">
								NASA Space Apps Challenge 2025
							</span>{' '}
							in{' '}
							<span className="font-semibold text-warning">
								Bogotá, Colombia
							</span>
							. ExoNova advances exoplanet detection using CTAB-GAN+ and Masked
							Autoencoder technologies trained on Kepler, K2, and TESS mission
							data.
						</p>
					</motion.div>

					{/* University Info Section */}
					<motion.div
						variants={itemVariants}
						transition={itemTransition}
						className="flex flex-col gap-4 sm:gap-5"
					>
						<div className="flex items-center gap-3">
							<motion.span
								whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
								transition={{ duration: 0.5 }}
								className={cn([
									'relative flex items-center justify-center rounded-full',
									'bg-gradient-to-br from-primary via-secondary to-primary',
									'shadow-lg shadow-primary/50',
									'border-2 border-foreground/20',
									'w-12 h-12 sm:w-14 sm:h-14',
								])}
							>
								{/* Glow effect */}
								<div className="absolute inset-0 animate-pulse rounded-full bg-gradient-to-br from-primary to-secondary opacity-50 blur-md" />
								<span className="relative z-10 flex items-center justify-center">
									<GraduationCapIcon
										size={28}
										weight="duotone"
										className="text-foreground"
									/>
								</span>
							</motion.span>
							<h3
								className={cn([
									'font-bold text-foreground',
									'text-large sm:text-xl md:text-2xl',
									'drop-shadow-[0_2px_8px_rgba(0,0,0,0.15)]',
								])}
							>
								Our Institution
							</h3>
						</div>
						<p
							className={cn([
								'text-foreground/80 leading-relaxed',
								'text-small sm:text-medium',
							])}
						>
							We are engineering students from the{' '}
							<span className="font-semibold text-primary">
								Escuela Colombiana de Ingeniería Julio Garavito
							</span>
							, one of Colombia's leading technical universities, applying
							machine learning to advance space exploration and planetary
							science.
						</p>
					</motion.div>

					{/* Team Info Section */}
					<motion.div
						variants={itemVariants}
						transition={itemTransition}
						className="flex flex-col gap-4 sm:gap-5 md:col-span-2 lg:col-span-1"
					>
						<div className="flex items-center gap-3">
							<motion.span
								whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
								transition={{ duration: 0.5 }}
								className={cn([
									'relative flex items-center justify-center rounded-full',
									'bg-gradient-to-br from-secondary via-primary to-secondary',
									'shadow-lg shadow-secondary/50',
									'border-2 border-foreground/20',
									'w-12 h-12 sm:w-14 sm:h-14',
								])}
							>
								{/* Glow effect */}
								<div className="absolute inset-0 animate-pulse rounded-full bg-gradient-to-br from-secondary to-primary opacity-50 blur-md" />
								<span className="relative z-10 flex items-center justify-center">
									<UsersIcon
										size={28}
										weight="duotone"
										className="text-foreground"
									/>
								</span>
							</motion.span>
							<h3
								className={cn([
									'font-bold text-foreground',
									'text-large sm:text-xl md:text-2xl',
									'drop-shadow-[0_2px_8px_rgba(0,0,0,0.15)]',
								])}
							>
								Our Team
							</h3>
						</div>
						<div
							className={cn([
								'grid gap-2 sm:gap-3',
								'grid-cols-1 sm:grid-cols-2',
							])}
						>
							{teamMembers.map((member, index) => (
								<motion.div
									key={member.name}
									initial={{ opacity: 0, x: -20 }}
									animate={
										isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }
									}
									transition={{
										duration: 0.4,
										delay: 0.6 + index * 0.1,
										ease: 'easeOut',
									}}
									className={cn([
										'flex flex-col gap-0.5',
										'p-2 sm:p-3 rounded-medium',
										'bg-gradient-to-br from-content2/50 to-content1/50',
										'border border-divider/30',
										'backdrop-blur-sm',
										'transition-all duration-300',
										'hover:border-primary/50 hover:shadow-small hover:shadow-primary/20',
									])}
								>
									<p className="font-semibold text-foreground text-small">
										{member.name}
									</p>
									<p className="text-foreground/60 text-tiny">{member.role}</p>
								</motion.div>
							))}
						</div>
					</motion.div>
				</div>

				{/* Divider */}
				<motion.div
					variants={itemVariants}
					transition={itemTransition}
					className={cn([
						'my-8 sm:my-10 md:my-12',
						'h-[1px] bg-gradient-to-r from-transparent via-divider/50 to-transparent',
					])}
				/>

				{/* Bottom Section */}
				<motion.div
					variants={itemVariants}
					transition={itemTransition}
					className={cn([
						'flex flex-col sm:flex-row items-center justify-between',
						'gap-4 sm:gap-6',
					])}
				>
					{/* Location Info */}
					<div className="flex items-center gap-2">
						<MapPinIcon
							weight="duotone"
							className="text-warning w-5 h-5 sm:w-6 sm:h-6"
						/>
						<p
							className={cn([
								'text-foreground/70 font-medium',
								'text-tiny sm:text-small',
							])}
						>
							Bogotá, Colombia • 2025
						</p>
					</div>

					{/* Social Links */}
					<div className="flex items-center gap-3 sm:gap-4">
						{socialLinks.map((social) => (
							<motion.a
								key={social.name}
								href={social.href}
								target="_blank"
								rel="noopener noreferrer"
								whileHover={{
									scale: 1.1,
									y: -3,
									transition: { duration: 0.2 },
								}}
								whileTap={{ scale: 0.95 }}
								className={cn([
									'relative flex items-center justify-center rounded-full',
									`bg-gradient-to-br ${social.color}`,
									'shadow-lg',
									'border-2 border-foreground/20',
									'aspect-square',
									'w-10 sm:w-11',
									'transition-all duration-300',
								])}
								aria-label={social.name}
							>
								{/* Glow effect */}
								<div
									className={cn([
										'absolute inset-0 animate-pulse rounded-full blur-md opacity-50',
										`bg-gradient-to-br ${social.color}`,
									])}
								/>
								<social.icon
									size={24}
									weight="duotone"
									className="relative z-10"
								/>
							</motion.a>
						))}
					</div>

					{/* Copyright */}
					<p
						className={cn([
							'text-foreground/60 font-light',
							'text-tiny sm:text-small',
						])}
					>
						© 2025 ExoNova. All rights reserved.
					</p>
				</motion.div>
			</div>
		</motion.footer>
	);
});

Footer.displayName = 'Footer';

export { Footer };
