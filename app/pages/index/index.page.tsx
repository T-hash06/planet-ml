import { StarsBackground } from '@shared/components/stars-background/stars-background.component';
import { memo } from 'react';
import { Background } from './components/background/background.component';
import { Footer } from './components/footer/footer.component';
import { KeyFeatures } from './components/key-features/key-features.component';
import { LivePreview } from './components/live-preview/live-preview.component';
import { PageDescription } from './components/page-description/page-description';
import { PageTitle } from './components/page-title/page-title.component';
import { Performance } from './components/performance/performance.component';
import { Stats } from './components/stats/stats.component';
import { TransitMethod } from './components/transit-method/transit-method.component';

export function meta() {
	return [
		{ title: 'ExoNova - AI-Driven Exoplanet Detection' },
		{
			name: 'description',
			content:
				"Discover hidden exoplanets using cutting-edge AI models trained on NASA's Kepler, K2, and TESS mission data. ExoNova combines CTAB-GAN+ and Masked Autoencoder technologies for accurate exoplanet detection.",
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
			<LivePreview />
			<Performance />
			<TransitMethod />
			<Footer />
		</main>
	);
});

export default HomePage;
