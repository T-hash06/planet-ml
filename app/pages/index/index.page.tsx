import { StarsBackground } from '@shared/components/stars-background/stars-background.component';
import { memo } from 'react';
import { Background } from './components/background/background.component';
import { Footer } from './components/footer/footer.component';
import { KeyFeatures } from './components/key-features/key-features.component';
import { PageDescription } from './components/page-description/page-description';
import { PageTitle } from './components/page-title/page-title.component';
import { Performance } from './components/performance/performance.component';
import { Stats } from './components/stats/stats.component';

export function meta() {
	return [
		{ title: 'Planet ML' },
		{
			name: 'description',
			content:
				"Explore the universe's hidden exoplanets using our advanced AI/ML models.",
		},
	];
}

const HomePage = memo(() => {
	return (
		<main className="h-dvh w-dvw overflow-x-hidden">
			<StarsBackground />
			<Background />
			<PageTitle />
			<PageDescription />
			<Stats />
			<KeyFeatures />
			<Performance />
			<Footer />
		</main>
	);
});

export default HomePage;
