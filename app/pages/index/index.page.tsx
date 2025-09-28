import { memo } from 'react';

export function meta() {
	return [
		{ title: 'New React Router App' },
		{ name: 'description', content: 'Welcome to React Router!' },
	];
}

const HomePage = memo(() => {
	return (
		<main className="grid h-dvh w-dvw place-items-center">
			<h1 className="font-bold text-4xl">Tomas & Nella 4 ever</h1>
		</main>
	);
});

export default HomePage;
