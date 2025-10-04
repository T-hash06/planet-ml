import { Card, CardBody, CircularProgress, cn, Slider } from '@heroui/react';
import { dataAttr } from '@shared/utility/props';
import { useForm } from '@tanstack/react-form';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { memo, useEffect, useState } from 'react';
import {
	LivePreviewForm,
	type LivePreviewFormOutput,
} from './live-preview.validators';

const calculatePlanetProbability = async (
	data: LivePreviewFormOutput,
): Promise<number> => {
	await new Promise((resolve) => setTimeout(resolve, 300));
	const avg =
		(data.plTranmid +
			data.stPmdec +
			data.stTmag +
			data.stRade +
			data.stDist +
			data.plRade) /
		6;
	return Math.round(avg * 100);
};

const SLIDER_CONFIGS = [
	{
		name: 'plTranmid' as const,
		label: 'Planet Transit Midpoint',
		description: 'Average time the planet crosses the stellar limb [BJD]',
		color: 'primary' as const,
	},
	{
		name: 'stPmdec' as const,
		label: 'PMDec',
		description: 'Angular change in declination [mas/yr]',
		color: 'secondary' as const,
	},
	{
		name: 'stTmag' as const,
		label: 'TESS Magnitude',
		description: 'Brightness of the host star',
		color: 'primary' as const,
	},
	{
		name: 'stRade' as const,
		label: 'Stellar Radius',
		description: 'Star radius in Solar radii [R_Sun]',
		color: 'secondary' as const,
	},
	{
		name: 'stDist' as const,
		label: 'Stellar Distance',
		description: 'Distance to the system [pc]',
		color: 'primary' as const,
	},
	{
		name: 'plRade' as const,
		label: 'Planet Radius',
		description: 'Planet radius in Earth radii [R_Earth]',
		color: 'secondary' as const,
	},
];

const LivePreview = memo(() => {
	const form = useForm({
		defaultValues: {
			plTranmid: 0.5,
			stPmdec: 0.5,
			stTmag: 0.5,
			stRade: 0.5,
			stDist: 0.5,
			plRade: 0.5,
		},
		listeners: {
			onChange: () => {
				form.handleSubmit();
			},
			onChangeDebounceMs: 100,
		},
		onSubmit: async () => {
			probabilityQuery.refetch();
		},
	});

	const probabilityQuery = useQuery({
		queryKey: ['calculate-planet-probability', form.state.values],
		queryFn: () => calculatePlanetProbability(form.state.values),
		enabled: form.state.isValid,
	});

	const [lastProbabilityValue, setLastProbabilityValue] = useState<number>(0);

	useEffect(() => {
		if (
			probabilityQuery.data !== undefined &&
			probabilityQuery.data !== null &&
			!probabilityQuery.isFetching
		) {
			setLastProbabilityValue(probabilityQuery.data);
		}
	}, [probabilityQuery.data, probabilityQuery.isFetching]);

	const probabilityValue = probabilityQuery.data ?? lastProbabilityValue;

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				duration: 0.4,
				staggerChildren: 0.1,
			},
		},
	};

	const itemVariants = {
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
			transition: { duration: 0.5 },
		},
	};

	return (
		<section
			className={cn([
				'relative w-full',
				'mt-24 px-4',
				'sm:mt-32 sm:px-6',
				'md:mt-40 md:px-8',
				'lg:mt-48 lg:px-12',
				'xl:mt-56 xl:px-16',
			])}
		>
			<motion.div
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, margin: '-100px' }}
				variants={containerVariants}
				className="mx-auto max-w-7xl"
			>
				{/* Section Title */}
				<motion.div variants={itemVariants} className="mb-12 text-center">
					<h2
						className={cn([
							'mb-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl',
							'font-bold bg-gradient-to-br from-primary via-secondary to-primary',
							'bg-clip-text text-transparent',
							'drop-shadow-[0_0_25px_rgba(100,100,255,0.4)]',
						])}
					>
						Live Preview
					</h2>
					<p
						className={cn([
							'text-small sm:text-medium text-foreground/80',
							'max-w-2xl mx-auto',
						])}
					>
						Adjust the parameters below to see the probability of planetary
						detection
					</p>
				</motion.div>

				{/* Main Content Grid */}
				<div
					className={cn([
						'grid grid-cols-1 md:grid-cols-[2fr_1fr]',
						'gap-6 md:gap-8 lg:gap-10',
					])}
				>
					{/* Sliders Section */}
					<motion.div variants={itemVariants}>
						<Card
							className={cn([
								'relative rounded-large overflow-hidden',
								'bg-gradient-to-br from-content2 to-content1',
								'border border-divider/50',
								'shadow-lg hover:shadow-xl transition-shadow duration-300',
								'backdrop-blur-sm',
							])}
						>
							<CardBody className="p-6 sm:p-8">
								<div
									data-loading={dataAttr(probabilityQuery.isPending)}
									className="space-y-6"
								>
									{SLIDER_CONFIGS.map((config) => (
										<form.Field
											key={config.name}
											name={config.name}
											validators={{
												onChange: LivePreviewForm.validationRules[config.name],
											}}
										>
											{(field) => (
												<div className="space-y-2">
													<Slider
														label={config.label}
														color={config.color}
														size="md"
														step={0.01}
														minValue={0}
														maxValue={1}
														value={field.state.value}
														onChange={(value) => {
															field.handleChange(
																typeof value === 'number' ? value : value[0],
															);
														}}
														showTooltip
														showOutline
														formatOptions={{
															minimumFractionDigits: 2,
															maximumFractionDigits: 2,
														}}
														className={cn(['w-full'])}
														classNames={{
															label: 'text-small font-semibold',
															value: 'text-small text-foreground/70',
														}}
													/>
													<p
														className={cn([
															'text-tiny text-foreground/60',
															'pl-1',
														])}
													>
														{config.description}
													</p>
												</div>
											)}
										</form.Field>
									))}
								</div>
							</CardBody>
						</Card>
					</motion.div>

					{/* Probability Chart Section */}
					<motion.div variants={itemVariants}>
						<Card
							className={cn([
								'relative rounded-large overflow-hidden',
								'bg-gradient-to-br from-primary/15 via-primary/10 to-primary/5',
								'border border-primary/50',
								'shadow-[0_8px_32px_0] shadow-primary/30',
								'backdrop-blur-xl',
								'h-full',
							])}
						>
							<CardBody
								className={cn([
									'p-6 sm:p-8',
									'flex flex-col items-center justify-center',
									'min-h-[400px]',
								])}
							>
								<h3
									className={cn([
										'text-large font-bold text-foreground mb-8',
										'text-center',
									])}
								>
									Planet Detection Probability{' '}
								</h3>
								{/* Circular Progress Chart */}
								<div className="relative">
									<CircularProgress
										size="lg"
										value={probabilityValue}
										isDisabled={probabilityQuery.isPending}
										color={
											probabilityValue >= 75
												? 'success'
												: probabilityValue >= 50
													? 'warning'
													: probabilityValue >= 25
														? 'secondary'
														: 'danger'
										}
										strokeWidth={4}
										showValueLabel
										classNames={{
											svg: 'w-48 h-48 sm:w-56 sm:h-56 drop-shadow-md',
											value: 'text-3xl sm:text-4xl font-bold',
											label: 'text-medium font-semibold',
										}}
										aria-label="Planet probability"
									/>
									{/* Glow effect */}
									<div
										className={cn([
											'absolute inset-0 -z-10',
											'animate-pulse rounded-full',
											'bg-gradient-to-br from-primary to-secondary',
											'opacity-20 blur-2xl',
										])}
									/>
								</div>

								{/* Status Text */}
								<div className="mt-8 text-center space-y-2">
									<p
										className={cn([
											'text-medium font-semibold',
											probabilityValue >= 75 && 'text-success',
											probabilityValue >= 50 &&
												probabilityValue < 75 &&
												'text-warning',
											probabilityValue >= 25 &&
												probabilityValue < 50 &&
												'text-secondary',
											probabilityValue < 25 && 'text-danger',
										])}
									>
										{probabilityValue >= 75 && 'High Probability'}
										{probabilityValue >= 50 &&
											probabilityValue < 75 &&
											'Moderate Probability'}
										{probabilityValue >= 25 &&
											probabilityValue < 50 &&
											'Low Probability'}
										{probabilityValue < 25 && 'Very Low Probability'}
									</p>
									<p className="text-small text-foreground/60">
										{probabilityValue === 0
											? 'Adjust parameters and calculate'
											: 'Based on the input parameters'}
									</p>
								</div>

								{/* Corner decoration */}
								<div className="absolute top-0 right-0 h-16 w-16 bg-gradient-to-bl from-primary/30 to-transparent" />
								<div className="absolute bottom-0 right-0 h-16 w-16 opacity-30 bg-gradient-to-tl from-secondary/40 to-transparent" />
							</CardBody>
						</Card>
					</motion.div>
				</div>
			</motion.div>
		</section>
	);
});

LivePreview.displayName = 'LivePreview';

export { LivePreview };
