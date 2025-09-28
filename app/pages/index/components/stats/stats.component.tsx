import { cn } from '@heroui/react';
import { motion, useInView } from 'framer-motion';
import { memo, useRef } from 'react';

interface StatCardProps {
	value: string;
	title: string;
	description: string;
	color: 'primary' | 'secondary';
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

const StatCard = ({ value, title, description, color }: StatCardProps) => (
	<motion.div
		variants={cardVariants}
		whileHover={{
			scale: 1.05,
			transition: { duration: 0.2 },
		}}
		className={cn([
			'grid h-full w-72 grid-rows-[50%_2rem_1fr] rounded-large border p-4 backdrop-blur-lg',
			color === 'primary' &&
				'border-primary/20 bg-gradient-to-b from-primary/10 to-primary/5',
			color === 'secondary' &&
				'border-secondary/20 bg-gradient-to-b from-secondary/10 to-secondary/5',
		])}
	>
		<span
			className={cn([
				'place-self-center font-bold text-4xl',
				color === 'primary' && 'text-primary-600',
				color === 'secondary' && 'text-secondary-600',
			])}
		>
			{value}
		</span>
		<h3 className="font-semibold text-foreground text-large">{title}</h3>
		<p className="text-foreground/80 text-small">{description}</p>
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
			className="mt-24 flex h-36 gap-16 text-center"
		>
			<StatCard
				value="5,235"
				title="Confirmed Exoplanets"
				description="NASA Archive Database"
				color="primary"
			/>
			<StatCard
				value="96.8%"
				title="AI Classification"
				description="Transition Detection Accuracy"
				color="secondary"
			/>
			<StatCard
				value="200K+"
				title="Light Curves"
				description="Processed from Kepler & TESS"
				color="primary"
			/>
		</motion.div>
	);
});

export { Stats };
