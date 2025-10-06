import { cn } from '@heroui/react';
import { memo } from 'react';

/**
 * Light Curves Predictor Page
 *
 * Interactive interface for exoplanet detection using light curve data.
 * This is a placeholder for future implementation.
 *
 * @returns {JSX.Element} The light curves predictor page
 */
const CurvesPage = memo(function CurvesPage() {
	return (
		<div className={cn(['relative min-h-screen w-full'])}>
			{/* Page Header */}
			<div className={cn(['mb-8 sm:mb-12'])}>
				<h2
					className={cn([
						'text-2xl sm:text-3xl md:text-4xl font-bold mb-4',
						'bg-gradient-to-br from-secondary via-primary to-secondary',
						'bg-clip-text text-transparent',
						'drop-shadow-[0_0_25px_rgba(100,100,255,0.3)]',
					])}
				>
					Light Curves Predictor
				</h2>
				<p className={cn(['text-small sm:text-medium text-foreground/80'])}>
					Analyze time-series photometric data to detect exoplanet transits
					using advanced AI models.
				</p>
			</div>

			{/* Placeholder Content */}
			<div
				className={cn([
					'relative rounded-large overflow-hidden',
					'bg-gradient-to-br from-content2 to-content1',
					'border border-divider/50',
					'shadow-large',
					'backdrop-blur-sm',
					'p-8 sm:p-12',
					'text-center',
				])}
			>
				<p className={cn(['text-medium text-foreground/70'])}>
					Light curves predictor interface coming soon...
				</p>
			</div>
		</div>
	);
});

export default CurvesPage;
