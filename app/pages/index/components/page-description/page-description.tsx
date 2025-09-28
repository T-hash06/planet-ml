import { Button, cn } from '@heroui/react';

const PageDescription = () => (
	<div className="flex flex-col items-center gap-12">
		<p className="mt-4 max-w-xl text-center text-2xl text-foreground/90 leading-9">
			Explore the universe's hidden exoplanets using out advanced AI/ML models.
			Join the search for new worlds and contribute to the future of space
			exploration
		</p>
		<Button
			size="lg"
			radius="lg"
			className={cn(['bg-gradient-to-br from-transparent to-secondary/80'])}
		>
			Start Exploring
		</Button>
	</div>
);

export { PageDescription };
