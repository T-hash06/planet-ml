import { cn } from '@heroui/react';

const PageTitle = () => {
	return (
		<h1 className="mt-64 flex flex-col text-center font-extrabold text-7xl text-foreground/80">
			<span className={cn(['py-1'])}>Undercover</span>
			<span className={cn(['py-1'])}>
				new{' '}
				<span className="bg-gradient-to-br from-danger to-warning bg-clip-text text-transparent">
					worlds
				</span>
			</span>
			<span
				className={cn([
					'bg-gradient-to-br from-danger to-secondary bg-clip-text py-1 text-transparent',
				])}
			>
				with AI✨
			</span>
		</h1>
	);
};

export { PageTitle };
