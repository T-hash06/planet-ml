import { memo } from 'react';
import { Background } from './components/background/background.component';
import { PageDescription } from './components/page-description/page-description';
import { PageTitle } from './components/page-title/page-title.component';

export function meta() {
	return [
		{ title: 'New React Router App' },
		{ name: 'description', content: 'Welcome to React Router!' },
	];
}

const HomePage = memo(() => {
	return (
		<main className="h-dvh w-dvw place-items-center overflow-x-hidden">
			<Background />
			<PageTitle />
			<PageDescription />
		</main>
	);
});

export default HomePage;
