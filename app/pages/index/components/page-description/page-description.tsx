import { Button, cn } from '@heroui/react';

const PageDescription = () => (
	<div
		className={cn(['flex flex-col items-center', 'gap-8 sm:gap-10 md:gap-12'])}
	>
		<p
			className={cn([
				'z-10 text-center text-foreground/90',
				'mt-2 sm:mt-3 md:mt-4',
				'max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl',
				'text-lg sm:text-xl md:text-2xl',
				'leading-6 sm:leading-7 md:leading-8 lg:leading-9',
			])}
		>
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
