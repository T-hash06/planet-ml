import { cn } from '@heroui/react';
import { NumberTicker } from '@shared/components/number-ticker/number-ticker.component';
import { motion, useInView } from 'framer-motion';
import { memo, useRef } from 'react';

interface StatCardProps {
	value: number;
	suffix?: string;
	title: string;
	description: string;
	color: 'primary' | 'secondary';
	decimalPlaces?: number;
	delay?: number;
}

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

const StatCard = ({
	value,
	suffix = '',
	title,
	description,
	color,
	decimalPlaces = 0,
	delay = 0,
}: StatCardProps) => (
	<motion.div
		variants={cardVariants}
		whileHover={{
			scale: 1.05,
			y: -8,
			transition: { duration: 0.3, ease: 'easeOut' },
		}}
		className={cn([
			'relative grid h-full grid-rows-[50%_2rem_1fr] rounded-large border backdrop-blur-xl',
			'w-full sm:w-64 md:w-72 lg:w-80',
			'p-3 sm:p-4',
			'overflow-hidden',
			color === 'primary' &&
				'border-primary/50 bg-gradient-to-br from-primary/15 via-primary/10 to-primary/5 shadow-[0_8px_32px_0] shadow-primary/30',
			color === 'secondary' &&
				'border-secondary/50 bg-gradient-to-br from-secondary/15 via-secondary/10 to-secondary/5 shadow-[0_8px_32px_0] shadow-secondary/30',
		])}
	>
		{/* Animated background glow */}
		<motion.div
			className={cn([
				'absolute inset-0 opacity-0',
				color === 'primary' &&
					'bg-gradient-to-br from-primary/20 to-transparent',
				color === 'secondary' &&
					'bg-gradient-to-br from-secondary/20 to-transparent',
			])}
			whileHover={{ opacity: 1 }}
			transition={{ duration: 0.3 }}
		/>

		{/* Content */}
		<div className="relative z-10">
			<div
				className={cn([
					'flex items-center place-self-center font-bold',
					'text-2xl sm:text-3xl md:text-4xl',
					'drop-shadow-[0_0_10px_rgba(0,0,0,0.3)]',
					color === 'primary' && 'text-primary-600 dark:text-primary-500',
					color === 'secondary' && 'text-secondary-600 dark:text-secondary-500',
				])}
			>
				<NumberTicker
					value={value}
					decimalPlaces={decimalPlaces}
					delay={delay}
					className="tabular-nums tracking-wider"
				/>
				{suffix && <span>{suffix}</span>}
			</div>
		</div>
		<h3
			className={cn([
				'relative z-10 font-semibold text-foreground',
				'text-medium sm:text-large',
			])}
		>
			{title}
		</h3>
		<p
			className={cn([
				'relative z-10 text-foreground/80',
				'text-tiny sm:text-small',
			])}
		>
			{description}
		</p>

		{/* Corner accent */}
		<div
			className={cn([
				'absolute bottom-0 right-0 h-16 w-16 opacity-30',
				color === 'primary' &&
					'bg-gradient-to-tl from-primary/40 to-transparent',
				color === 'secondary' &&
					'bg-gradient-to-tl from-secondary/40 to-transparent',
			])}
		/>
	</motion.div>
);

const Stats = memo(() => {
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
				'flex text-center',
				'flex-col justify-center sm:flex-row',
				'gap-8 sm:gap-12 md:gap-16',
				'h-auto sm:h-32 md:h-36 lg:h-40',
				'mt-24 sm:mt-32 md:mt-40 lg:mt-48',
				'px-4 md:px-0',
			])}
		>
			<StatCard
				value={5235}
				title="Confirmed Exoplanets"
				description="NASA Archive Database"
				color="primary"
			/>
			<StatCard
				value={96.8}
				suffix="%"
				title="AI Classification"
				description="Transition Detection Accuracy"
				color="secondary"
				decimalPlaces={1}
			/>
			<StatCard
				value={200}
				suffix="K+"
				title="Light Curves"
				description="Processed from Kepler & TESS"
				color="primary"
			/>
		</motion.div>
	);
});

export { Stats };
