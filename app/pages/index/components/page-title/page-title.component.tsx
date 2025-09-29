import { cn } from '@heroui/react';

const PageTitle = () => {
	return (
		<h1
			className={cn([
				'relative z-10 flex flex-col text-center font-extrabold text-foreground/80',
				'mt-16 sm:mt-20 md:mt-24 lg:mt-32',
				'text-[3rem] sm:text-[4rem] md:text-[5rem] lg:text-[6rem]',
				'leading-[3rem] sm:leading-[4rem] md:leading-[5rem] lg:leading-[6rem]',
			])}
		>
			<span>Undercover</span>
			<span>
				new{' '}
				<span className="bg-gradient-to-br from-danger to-warning bg-clip-text text-transparent">
					worlds
				</span>
			</span>
			<span
				className={cn([
					'bg-gradient-to-br from-secondary-600 to-primary-600 bg-clip-text text-transparent',
				])}
			>
				with AI✨
			</span>
		</h1>
	);
};

export { PageTitle };
