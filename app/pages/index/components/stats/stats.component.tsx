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
			transition: { duration: 0.2 },
		}}
		className={cn([
			'grid h-full grid-rows-[50%_2rem_1fr] rounded-large border backdrop-blur-lg',
			'w-full sm:w-64 md:w-72 lg:w-80',
			'p-3 sm:p-4',
			color === 'primary' &&
				'0px 12px -3px] border-primary/70 bg-gradient-to-b from-primary/10 to-primary/5 shadow-[10px_10px_48px_-10px] shadow-primary/20',
			color === 'secondary' &&
				'border-secondary/70 bg-gradient-to-b from-secondary/10 to-secondary/5 shadow-[10px_10px_48px_-10px] shadow-secondary/20',
		])}
	>
		<div
			className={cn([
				'flex items-center place-self-center font-bold',
				'text-2xl sm:text-3xl md:text-4xl',
				color === 'primary' && 'text-primary-600',
				color === 'secondary' && 'text-secondary-600',
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
		<h3
			className={cn([
				'font-semibold text-foreground',
				'text-medium sm:text-large',
			])}
		>
			{title}
		</h3>
		<p className={cn(['text-foreground/80', 'text-tiny sm:text-small'])}>
			{description}
		</p>
	</motion.div>
);

const Stats = memo(() => {
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
				'flex text-center',
				'flex-col justify-center sm:flex-row',
				'gap-8 sm:gap-12 md:gap-16',
				'h-auto sm:h-32 md:h-36 lg:h-40',
				'mt-16 sm:mt-20 md:mt-24',
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
