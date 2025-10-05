import { cn } from '@heroui/react';
import { motion, useInView } from 'framer-motion';
import { memo, useRef } from 'react';

// Elegant animation variants for Performance component
const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			duration: 0.6,
			staggerChildren: 0.3,
		},
	},
};

const accuracyCardVariants = {
	hidden: {
		opacity: 0,
		x: -60,
		scale: 0.8,
		filter: 'blur(8px)',
	},
	visible: {
		opacity: 1,
		x: 0,
		scale: 1,
		filter: 'blur(0px)',
	},
};

const methodologyCardVariants = {
	hidden: {
		opacity: 0,
		x: 60,
		scale: 0.8,
		filter: 'blur(8px)',
	},
	visible: {
		opacity: 1,
		x: 0,
		scale: 1,
		filter: 'blur(0px)',
	},
};

const Chart = memo(({ isInView }: { isInView: boolean }) => {
	return (
		<motion.div
			initial={{
				opacity: 0,
				y: 80,
				scale: 0.9,
				filter: 'blur(10px)',
			}}
			animate={
				isInView
					? {
							opacity: 1,
							y: 0,
							scale: 1,
							filter: 'blur(0px)',
						}
					: {
							opacity: 0,
							y: 80,
							scale: 0.9,
							filter: 'blur(10px)',
						}
			}
			transition={{
				duration: 1,
				delay: 0.8,
				ease: 'easeOut',
			}}
			className={cn([
				'relative col-span-1 md:col-span-2 rounded-large overflow-hidden',
				'h-[20rem] sm:h-[24rem] md:h-[28rem]',
				'p-4 pt-3 pb-16 sm:p-6 sm:pt-4 sm:pb-20 md:p-8 md:pt-6 md:pb-32',
				'bg-gradient-to-br from-content2 to-content1',
				'border border-divider/50',
				'shadow-lg',
				'backdrop-blur-sm',
			])}
		>
			<motion.h3
				initial={{ opacity: 0, y: -20, filter: 'blur(4px)' }}
				animate={
					isInView
						? { opacity: 1, y: 0, filter: 'blur(0px)' }
						: { opacity: 0, y: -20, filter: 'blur(4px)' }
				}
				transition={{ duration: 0.6, delay: 1.0, ease: 'easeOut' }}
				className={cn([
					'mb-4 sm:mb-6 md:mb-8 w-full text-center font-bold text-foreground',
					'text-large sm:text-xl md:text-2xl',
				])}
			>
				Detection Pipeline Metrics (Example)
			</motion.h3>
			<div className="relative h-full w-full">
				{Array.from({ length: 5 }, (_, i) => {
					const percentage = (100 - i * 25) / 100;

					return (
						<motion.div
							key={percentage}
							initial={{
								opacity: 0,
								scaleX: 0,
								originX: 0,
							}}
							animate={
								isInView
									? {
											opacity: 1,
											scaleX: 1,
										}
									: {
											opacity: 0,
											scaleX: 0,
										}
							}
							transition={{
								duration: 0.6,
								delay: 1.2 + i * 0.1,
								ease: 'easeOut',
							}}
							className={cn([
								'absolute top-0 h-[1px] bg-foreground/10',
								'left-[2.5rem] w-[calc(100%-2.5rem)]',
								'sm:left-[3rem] sm:w-[calc(100%-3rem)]',
								'md:left-[4rem] md:w-[calc(100%-4rem)]',
							])}
							style={{ top: `${i * 25}%` }}
						>
							<motion.span
								initial={{ opacity: 0, x: -10 }}
								animate={
									isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }
								}
								transition={{
									duration: 0.4,
									delay: 1.4 + i * 0.1,
									ease: 'easeOut',
								}}
								className={cn([
									'absolute -top-2.5 text-foreground/50',
									'-left-8 text-tiny sm:-left-10 sm:text-small md:-left-14 md:text-sm',
								])}
							>
								{percentage.toFixed(2)}%
							</motion.span>
						</motion.div>
					);
				})}

				<div
					className={cn([
						'absolute inset-0 flex items-end justify-evenly',
						'left-[2.5rem] sm:left-[3rem] md:left-[4rem]',
					])}
				>
					{[
						// TODO: Update with actual light curve anomaly detection metric
						{
							height: 'h-[95.2%]',
							gradient: 'from-primary to-secondary',
							label: 'Light Curve Anomaly',
						},
						// TODO: Update with actual parameter classification metric
						{
							height: 'h-[89.4%]',
							gradient: 'from-warning to-danger',
							label: 'Parameter Classification',
						},
						// TODO: Update with actual combined confidence metric
						{
							height: 'h-[92.8%]',
							gradient: 'from-danger to-secondary',
							label: 'Combined Confidence',
						},
					].map((bar, i) => (
						<motion.div
							key={bar.label}
							initial={{
								scaleY: 0,
								originY: 1,
								opacity: 0,
							}}
							animate={
								isInView
									? {
											scaleY: 1,
											opacity: 1,
										}
									: {
											scaleY: 0,
											opacity: 0,
										}
							}
							transition={{
								duration: 0.8,
								delay: 1.6 + i * 0.2,
								ease: 'easeOut',
							}}
							whileHover={{
								scale: 1.05,
								y: -8,
								transition: { duration: 0.2 },
							}}
							className={cn([
								'relative flex justify-center rounded-medium bg-gradient-to-br',
								bar.height,
								bar.gradient,
								'w-16 sm:w-24 md:w-32',
								'shadow-lg',
								'border border-foreground/10',
							])}
						>
							{/* Bar glow effect */}
							<div
								className={cn([
									'absolute inset-0 rounded-medium bg-gradient-to-br opacity-50 blur-md',
									bar.gradient,
								])}
							/>

							<motion.span
								initial={{ opacity: 0, y: 10 }}
								animate={
									isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }
								}
								transition={{
									duration: 0.4,
									delay: 2.0 + i * 0.2,
									ease: 'easeOut',
								}}
								className={cn([
									'absolute text-foreground font-medium text-center',
									'-bottom-8 text-tiny sm:-bottom-10 sm:text-small md:-bottom-14 md:text-medium',
								])}
							>
								{bar.label}
							</motion.span>
						</motion.div>
					))}
				</div>
			</div>
		</motion.div>
	);
});

const Performance = memo(() => {
	const ref = useRef(null);
	const isInView = useInView(ref, {
		once: true,
		margin: '-150px 0px -150px 0px',
	});

	return (
		<motion.div
			ref={ref}
			initial="hidden"
			animate={isInView ? 'visible' : 'hidden'}
			variants={containerVariants}
			className={cn([
				'w-full',
				'mt-24 px-4',
				'sm:mt-32 sm:px-6',
				'md:mt-40 md:px-8',
				'lg:mt-48 lg:px-12',
				'xl:mt-56 xl:px-16',
			])}
		>
			<motion.h2
				initial={{ opacity: 0, y: 20 }}
				animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
				transition={{ duration: 0.6 }}
				className={cn([
					'text-center font-bold text-foreground tracking-tight',
					'text-2xl sm:text-3xl md:text-4xl',
					'drop-shadow-[0_2px_10px_rgba(0,0,0,0.2)]',
				])}
			>
				Model Architecture
			</motion.h2>

			<motion.p
				initial={{ opacity: 0, y: 15 }}
				animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
				transition={{ duration: 0.6, delay: 0.2 }}
				className={cn([
					'mx-auto text-center font-light text-foreground/75',
					'mt-4 sm:mt-5 md:mt-6',
					'max-w-xl sm:max-w-2xl',
					'px-4 sm:px-6 md:px-0',
					'text-small sm:text-medium md:text-large',
					'leading-6 sm:leading-7',
				])}
			>
				ExoNova employs two complementary AI models: CTAB-GAN+ for synthetic
				data generation and missing value imputation, and Masked Autoencoder
				(MAE) for self-supervised anomaly detection in light curves and tabular
				data.
			</motion.p>

			<motion.div
				variants={containerVariants}
				className={cn([
					'mx-auto w-full grid',
					'mt-8 sm:mt-12 md:mt-16',
					'max-w-sm sm:max-w-3xl md:max-w-5xl',
					'px-4 sm:px-6 md:px-0',
					'grid-cols-1 md:grid-cols-[1fr_3fr]',
					'gap-4 sm:gap-6 md:gap-10',
				])}
			>
				<motion.div
					variants={accuracyCardVariants}
					transition={{
						duration: 0.8,
						delay: 0.4,
						ease: 'easeOut',
					}}
					whileHover={{
						scale: 1.05,
						y: -5,
						transition: { duration: 0.3 },
					}}
					className={cn([
						'relative flex w-full flex-col items-center justify-center place-self-center rounded-large overflow-hidden',
						'h-32 sm:h-36 md:h-full',
						'gap-1 sm:gap-2',
						'p-4 sm:p-6',
						'bg-gradient-to-br from-secondary/20 via-primary/15 to-secondary/20',
						'border border-primary/30',
						'shadow-lg shadow-primary/30',
						'backdrop-blur-sm',
					])}
				>
					{/* Animated gradient background */}
					<motion.div
						className="absolute inset-0 bg-gradient-to-br from-secondary/30 to-primary/30 opacity-0"
						whileHover={{ opacity: 1 }}
						transition={{ duration: 0.3 }}
					/>

					<motion.span
						initial={{ opacity: 0, scale: 0.5, filter: 'blur(4px)' }}
						animate={
							isInView
								? { opacity: 1, scale: 1, filter: 'blur(0px)' }
								: { opacity: 0, scale: 0.5, filter: 'blur(4px)' }
						}
						transition={{ duration: 0.6, delay: 0.6, ease: 'easeOut' }}
						className={cn([
							'relative z-10 font-bold bg-gradient-to-br from-secondary-600 to-primary-600 bg-clip-text text-transparent',
							'text-3xl sm:text-4xl md:text-5xl',
							'drop-shadow-[0_0_20px_rgba(100,100,255,0.5)]',
						])}
					>
						95.2%
					</motion.span>
					{/* TODO: Update with actual transit detection rate metric */}
					<motion.p
						initial={{ opacity: 0, y: 10 }}
						animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
						transition={{ duration: 0.4, delay: 0.8, ease: 'easeOut' }}
						className={cn([
							'relative z-10 text-foreground/80 font-medium',
							'text-small sm:text-medium',
						])}
					>
						Transit Detection Rate
					</motion.p>

					{/* Corner decoration */}
					<div className="absolute top-0 right-0 h-16 w-16 bg-gradient-to-bl from-primary/30 to-transparent" />
				</motion.div>

				<motion.div
					variants={methodologyCardVariants}
					transition={{
						duration: 0.8,
						delay: 0.6,
						ease: 'easeOut',
					}}
					whileHover={{
						scale: 1.02,
						y: -5,
						transition: { duration: 0.3 },
					}}
					className={cn([
						'relative flex h-max flex-col rounded-large overflow-hidden',
						'gap-y-3 sm:gap-y-4 md:gap-y-5',
						'p-5 sm:p-6 md:p-8',
						'bg-gradient-to-br from-content2 to-content1',
						'border border-divider/50',
						'shadow-medium hover:shadow-large transition-all duration-300',
						'backdrop-blur-sm',
					])}
				>
					<motion.h3
						initial={{ opacity: 0, x: 20, filter: 'blur(3px)' }}
						animate={
							isInView
								? { opacity: 1, x: 0, filter: 'blur(0px)' }
								: { opacity: 0, x: 20, filter: 'blur(3px)' }
						}
						transition={{ duration: 0.5, delay: 0.8, ease: 'easeOut' }}
						className={cn([
							'font-bold text-foreground',
							'text-large sm:text-xl md:text-2xl',
						])}
					>
						Dual-Model Approach
					</motion.h3>
					<motion.p
						initial={{ opacity: 0, y: 10, filter: 'blur(2px)' }}
						animate={
							isInView
								? { opacity: 1, y: 0, filter: 'blur(0px)' }
								: { opacity: 0, y: 10, filter: 'blur(2px)' }
						}
						transition={{ duration: 0.5, delay: 1.0, ease: 'easeOut' }}
						className={cn([
							'text-foreground/80 leading-relaxed',
							'text-small sm:text-medium',
						])}
					>
						CTAB-GAN+ generates synthetic training data and handles missing
						values, while MAE performs self-supervised anomaly detection on both
						time-series light curves and tabular parameters.
					</motion.p>
				</motion.div>
				<Chart isInView={isInView} />
			</motion.div>
		</motion.div>
	);
});

export { Performance };
