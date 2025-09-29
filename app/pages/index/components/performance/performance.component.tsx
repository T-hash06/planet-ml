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

const titleVariants = {
	hidden: {
		opacity: 0,
		y: -30,
		filter: 'blur(6px)',
	},
	visible: {
		opacity: 1,
		y: 0,
		filter: 'blur(0px)',
	},
};

const subtitleVariants = {
	hidden: {
		opacity: 0,
		y: 20,
		filter: 'blur(4px)',
	},
	visible: {
		opacity: 1,
		y: 0,
		filter: 'blur(0px)',
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
			className="col-span-2 h-[28rem] rounded-large bg-content2 p-8 pt-6 pb-32 shadow-small"
		>
			<motion.h3
				initial={{ opacity: 0, y: -20, filter: 'blur(4px)' }}
				animate={
					isInView
						? { opacity: 1, y: 0, filter: 'blur(0px)' }
						: { opacity: 0, y: -20, filter: 'blur(4px)' }
				}
				transition={{ duration: 0.6, delay: 1.0, ease: 'easeOut' }}
				className="mb-8 w-full text-center font-bold text-2xl text-foreground"
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
							className="absolute top-0 left-[4rem] h-[1px] w-[calc(100%-4rem)] bg-foreground/10"
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
								className="-left-14 -top-2.5 absolute text-foreground/50 text-sm"
							>
								{percentage.toFixed(2)}%
							</motion.span>
						</motion.div>
					);
				})}

				<div className="absolute inset-0 left-[4rem] flex items-end justify-evenly">
					{[
						{
							height: '98.6%',
							gradient: 'from-primary to-secondary',
							label: 'Detection',
						},
						{
							height: '87.0%',
							gradient: 'from-warning to-danger',
							label: 'Validation',
						},
						{
							height: '95.2%',
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
								'relative flex w-32 justify-center rounded-small bg-gradient-to-br',
								`h-[${bar.height}]`,
								bar.gradient,
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
								className="-bottom-10 absolute text-foreground"
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
			className="mt-42 w-full"
		>
			<motion.h2
				variants={titleVariants}
				transition={{
					duration: 0.7,
					ease: 'easeOut',
				}}
				className="text-center font-bold text-4xl text-foreground"
			>
				AI Performance
			</motion.h2>

			<motion.p
				variants={subtitleVariants}
				transition={{
					duration: 0.6,
					delay: 0.2,
					ease: 'easeOut',
				}}
				className="mx-auto mt-6 max-w-2xl text-center font-light text-foreground/75 leading-7"
			>
				Our model, `ModelName`, is trained on terabytes of cosmic data to
				identify exoplanet candidates with an impressive accuracy rate of 96.8%.
				This
			</motion.p>

			<motion.div
				variants={containerVariants}
				className="mx-auto mt-16 grid w-full max-w-5xl grid-cols-[1fr_3fr] gap-10"
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
						'flex h-full w-full flex-col items-center justify-center gap-2 place-self-center rounded-large bg-content2',
						'shadow-small',
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
						className="font-bold text-5xl text-foreground"
					>
						96.8%
					</motion.span>
					<motion.p
						initial={{ opacity: 0, y: 10 }}
						animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
						transition={{ duration: 0.4, delay: 0.8, ease: 'easeOut' }}
						className="text-foreground/60"
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
					className="flex h-max flex-col gap-y-4 rounded-large bg-content2 p-6 shadow-small"
				>
					<motion.h3
						initial={{ opacity: 0, x: 20, filter: 'blur(3px)' }}
						animate={
							isInView
								? { opacity: 1, x: 0, filter: 'blur(0px)' }
								: { opacity: 0, x: 20, filter: 'blur(3px)' }
						}
						transition={{ duration: 0.5, delay: 0.8, ease: 'easeOut' }}
						className="font-bold text-2xl text-foreground"
					>
						Training Methodology
					</motion.h3>
					<div className="grid grid-cols-[6rem_1fr] gap-4">
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
							<CompassIcon className="text-secondary" size={58} />
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
								className="font-semibold text-foreground text-large"
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
								className="mt-1 text-foreground/80 text-small"
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
