import { cn } from '@heroui/react';

interface StatCardProps {
	value: string;
	title: string;
	description: string;
	color: 'primary' | 'secondary';
}

const StatCard = ({ value, title, description, color }: StatCardProps) => (
	<div
		className={cn([
			'grid h-full w-72 grid-rows-[50%_2rem_1fr] rounded-large border p-4',
			`border-${color}/20 bg-gradient-to-b from-${color}/10 to-${color}/5`,
		])}
	>
		<span
			className={cn([
				'place-self-center font-bold text-4xl',
				`text-${color}-600`,
			])}
		>
			{value}
		</span>
		<h3 className="font-semibold text-foreground text-large">{title}</h3>
		<p className="text-foreground/80 text-small">{description}</p>
	</div>
);

const Stats = () => (
	<div className="mt-24 flex h-36 gap-16 text-center">
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
	</div>
);

export { Stats };
