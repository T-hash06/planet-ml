import { cn } from '@heroui/react';
import { CompassIcon } from '@phosphor-icons/react';
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
				'col-span-1 md:col-span-2 rounded-large bg-content2 shadow-small',
				'h-[20rem] sm:h-[24rem] md:h-[28rem]',
				'p-4 pt-3 pb-16 sm:p-6 sm:pt-4 sm:pb-20 md:p-8 md:pt-6 md:pb-32',
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
				Performance Metrics
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
						{
							height: 'h-[98.6%]',
							gradient: 'from-primary to-secondary',
							label: 'Detection',
						},
						{
							height: 'h-[87.0%]',
							gradient: 'from-warning to-danger',
							label: 'Validation',
						},
						{
							height: 'h-[95.2%]',
							gradient: 'from-danger to-secondary',
							label: 'Classification',
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
								transition: { duration: 0.2 },
							}}
							className={cn([
								'relative flex justify-center rounded-small bg-gradient-to-br',
								bar.height,
								bar.gradient,
								'w-16 sm:w-24 md:w-32',
							])}
						>
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
									'absolute text-foreground',
									'-bottom-6 text-tiny sm:-bottom-8 sm:text-small md:-bottom-10 md:text-medium',
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

const Performance = () => {
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
			className={cn([
				'w-full',
				'sm:mt-16 sm:px-6',
				'md:mt-20 md:px-8',
				'lg:mt-24 lg:px-12',
				'xl:mt-32 xl:px-16',
			])}
		>
			<h2
				className={cn([
					'text-center font-bold text-foreground',
					'text-2xl sm:text-3xl md:text-4xl',
				])}
			>
				AI Performance
			</h2>

			<p
				className={cn([
					'mx-auto text-center font-light text-foreground/75',
					'mt-4 sm:mt-5 md:mt-6',
					'max-w-xl sm:max-w-2xl',
					'px-4 sm:px-6 md:px-0',
					'text-small sm:text-medium md:text-large',
					'leading-6 sm:leading-7',
				])}
			>
				Our model, `ModelName`, is trained on terabytes of cosmic data to
				identify exoplanet candidates with an impressive accuracy rate of 96.8%.
				This
			</p>

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
						scale: 1.02,
						transition: { duration: 0.2 },
					}}
					className={cn([
						'flex w-full flex-col items-center justify-center place-self-center rounded-large bg-content2 shadow-small',
						'h-32 sm:h-36 md:h-full',
						'gap-1 sm:gap-2',
						'p-4 sm:p-6',
					])}
				>
					<motion.span
						initial={{ opacity: 0, scale: 0.5, filter: 'blur(4px)' }}
						animate={
							isInView
								? { opacity: 1, scale: 1, filter: 'blur(0px)' }
								: { opacity: 0, scale: 0.5, filter: 'blur(4px)' }
						}
						transition={{ duration: 0.6, delay: 0.6, ease: 'easeOut' }}
						className={cn([
							'font-bold text-foreground',
							'text-3xl sm:text-4xl md:text-5xl',
						])}
					>
						96.8%
					</motion.span>
					<motion.p
						initial={{ opacity: 0, y: 10 }}
						animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
						transition={{ duration: 0.4, delay: 0.8, ease: 'easeOut' }}
						className={cn(['text-foreground/60', 'text-small sm:text-medium'])}
					>
						Accuracy
					</motion.p>
				</motion.div>

				<motion.div
					variants={methodologyCardVariants}
					transition={{
						duration: 0.8,
						delay: 0.6,
						ease: 'easeOut',
					}}
					whileHover={{
						scale: 1.01,
						transition: { duration: 0.2 },
					}}
					className={cn([
						'flex h-max flex-col rounded-large bg-content2 shadow-small',
						'gap-y-2 sm:gap-y-3 md:gap-y-4',
						'p-4 sm:p-5 md:p-6',
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
						Training Methodology
					</motion.h3>
					<div
						className={cn([
							'grid gap-3 sm:gap-4',
							'grid-cols-[4rem_1fr] sm:grid-cols-[5rem_1fr] md:grid-cols-[6rem_1fr]',
						])}
					>
						<motion.div
							initial={{ opacity: 0, rotate: -45, scale: 0.8 }}
							animate={
								isInView
									? { opacity: 1, rotate: 0, scale: 1 }
									: { opacity: 0, rotate: -45, scale: 0.8 }
							}
							transition={{ duration: 0.6, delay: 1.0, ease: 'easeOut' }}
							className="grid aspect-square w-full place-items-center"
						>
							<CompassIcon
								className={cn([
									'text-secondary',
									'w-[32px] h-[32px] sm:w-[42px] sm:h-[42px] md:w-[58px] md:h-[58px]',
								])}
							/>
						</motion.div>
						<div>
							<motion.h4
								initial={{ opacity: 0, y: 15, filter: 'blur(2px)' }}
								animate={
									isInView
										? { opacity: 1, y: 0, filter: 'blur(0px)' }
										: { opacity: 0, y: 15, filter: 'blur(2px)' }
								}
								transition={{ duration: 0.5, delay: 1.1, ease: 'easeOut' }}
								className={cn([
									'font-semibold text-foreground',
									'text-medium sm:text-large',
								])}
							>
								Cosmic data recalibration
							</motion.h4>
							<motion.p
								initial={{ opacity: 0, y: 10, filter: 'blur(2px)' }}
								animate={
									isInView
										? { opacity: 1, y: 0, filter: 'blur(0px)' }
										: { opacity: 0, y: 10, filter: 'blur(2px)' }
								}
								transition={{ duration: 0.5, delay: 1.2, ease: 'easeOut' }}
								className={cn([
									'mt-1 text-foreground/80',
									'text-tiny sm:text-small',
								])}
							>
								Our model employs a proprietary technique called Cosmic Data
								Recalibration (CDR). This method filters stellar noise and
								enhances faint transit signals from distant exoplanets,
								significantly improving detection sensitivity and reducing false
								positives.
							</motion.p>
						</div>
					</div>
				</motion.div>
				<Chart isInView={isInView} />
			</motion.div>
		</motion.div>
	);
};

export { Performance };
