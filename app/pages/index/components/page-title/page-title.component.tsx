import { cn } from '@heroui/react';

const PageTitle = () => {
	return (
		<h1 className="mt-48 flex flex-col text-center font-extrabold text-[6rem] text-foreground/80 leading-[6rem]">
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
