import { Button, Card, CardBody, cn, Link } from '@heroui/react';
import { ChartBar, Graph } from '@phosphor-icons/react';
import { memo } from 'react';
import { useNavigate } from 'react-router';

/**
 * App Index Page Component
 *
 * Landing page for the /app route that provides navigation to different analysis tools.
 * Displays two main options: Tabular Data Analysis and Light Curve Analysis.
 */
const AppIndexPage = memo(function AppIndexPage() {
	const navigate = useNavigate();

	return (
		<div className="mx-auto max-w-6xl">
			{/* Page Header */}
			<div className="mb-12 text-center">
				<h1
					className={cn([
						'text-3xl sm:text-4xl md:text-5xl font-bold mb-4',
						'bg-gradient-to-br from-danger via-warning to-danger',
						'bg-clip-text text-transparent',
						'drop-shadow-[0_0_20px_rgba(255,100,100,0.3)]',
					])}
				>
					Choose Your Analysis Method
				</h1>
				<p className="text-medium text-foreground/80 max-w-2xl mx-auto">
					Select the type of exoplanet detection analysis you want to perform
				</p>
			</div>

			{/* Analysis Options Grid */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
				{/* Tabular Data Card */}
				<Card
					isPressable
					onPress={() => navigate('/app/tabular')}
					className={cn([
						'relative rounded-large overflow-hidden',
						'bg-gradient-to-br from-content2 to-content1',
						'border border-primary/50',
						'shadow-[0_8px_32px_0] shadow-primary/30',
						'backdrop-blur-xl',
						'transition-all duration-300',
						'hover:shadow-[0_12px_40px_0] hover:shadow-primary/40',
						'hover:transform hover:scale-105',
					])}
				>
					<CardBody className="p-6 sm:p-8">
						{/* Icon */}
						<div className="mb-6 flex justify-center">
							<div
								className={cn([
									'relative flex aspect-square w-20 h-20 items-center justify-center rounded-full',
									'bg-gradient-to-br from-primary via-secondary to-primary',
									'text-white shadow-lg shadow-primary/50',
									'border-2 border-white/20',
								])}
							>
								<div className="absolute inset-0 animate-pulse rounded-full bg-gradient-to-br from-primary to-secondary opacity-50 blur-md" />
								<ChartBar
									size={40}
									weight="duotone"
									className="relative z-10"
								/>
							</div>
						</div>

						{/* Content */}
						<h2 className="text-xl sm:text-2xl font-bold text-center mb-3 text-foreground">
							Tabular Data Analysis
						</h2>
						<p className="text-small text-foreground/70 text-center mb-6">
							Input astronomical parameters directly or upload CSV data to
							predict exoplanet detection probability with model
							interpretability insights.
						</p>

						{/* Features List */}
						<ul className="space-y-2 mb-6 text-small text-foreground/80">
							<li className="flex items-start gap-2">
								<span className="text-primary">✓</span>
								<span>52 configurable astronomical parameters</span>
							</li>
							<li className="flex items-start gap-2">
								<span className="text-primary">✓</span>
								<span>Real-time prediction with confidence scoring</span>
							</li>
							<li className="flex items-start gap-2">
								<span className="text-primary">✓</span>
								<span>Feature importance visualization</span>
							</li>
							<li className="flex items-start gap-2">
								<span className="text-primary">✓</span>
								<span>CSV file upload support</span>
							</li>
						</ul>

						{/* Button */}
						<Link
							color="primary"
							as={Button}
							variant="solid"
							href="/app/tabular"
							size="lg"
							className={cn([
								'text-secondary-foreground text-small',
								'w-full',
								'bg-gradient-to-r from-primary to-secondary',
								'font-semibold shadow-lg shadow-primary/50',
								'transition-all duration-200',
							])}
							endContent={<ChartBar size={20} weight="bold" />}
						>
							Start Tabular Analysis
						</Link>
					</CardBody>

					{/* Corner Decoration */}
					<div className="absolute top-0 right-0 h-20 w-20 bg-gradient-to-bl from-primary/30 to-transparent" />
					<div className="absolute bottom-0 left-0 h-20 w-20 bg-gradient-to-tr from-secondary/30 to-transparent" />
				</Card>

				{/* Light Curves Card */}
				<Card
					isPressable
					onPress={() => navigate('/app/curves')}
					className={cn([
						'relative rounded-large overflow-hidden',
						'bg-gradient-to-br from-content2 to-content1',
						'border border-secondary/50',
						'shadow-[0_8px_32px_0] shadow-secondary/30',
						'backdrop-blur-xl',
						'transition-all duration-300',
						'hover:shadow-[0_12px_40px_0] hover:shadow-secondary/40',
						'hover:transform hover:scale-105',
					])}
				>
					<CardBody className="p-6 sm:p-8">
						{/* Icon */}
						<div className="mb-6 flex justify-center">
							<div
								className={cn([
									'relative flex aspect-square w-20 h-20 items-center justify-center rounded-full',
									'bg-gradient-to-br from-secondary via-primary to-secondary',
									'text-white shadow-lg shadow-secondary/50',
									'border-2 border-white/20',
								])}
							>
								<div className="absolute inset-0 animate-pulse rounded-full bg-gradient-to-br from-secondary to-primary opacity-50 blur-md" />
								<Graph size={40} weight="duotone" className="relative z-10" />
							</div>
						</div>

						{/* Content */}
						<h2 className="text-xl sm:text-2xl font-bold text-center mb-3 text-foreground">
							Light Curve Analysis
						</h2>
						<p className="text-small text-foreground/70 text-center mb-6">
							Upload and analyze time-series photometric data to detect transit
							events and identify potential exoplanets using deep learning
							models.
						</p>

						{/* Features List */}
						<ul className="space-y-2 mb-6 text-small text-foreground/80">
							<li className="flex items-start gap-2">
								<span className="text-secondary">✓</span>
								<span>Time-series data visualization</span>
							</li>
							<li className="flex items-start gap-2">
								<span className="text-secondary">✓</span>
								<span>Transit event detection</span>
							</li>
							<li className="flex items-start gap-2">
								<span className="text-secondary">✓</span>
								<span>Deep learning-based classification</span>
							</li>
							<li className="flex items-start gap-2">
								<span className="text-secondary">✓</span>
								<span>Multi-file batch processing</span>
							</li>
						</ul>

						{/* Button */}
						<Link
							color="secondary"
							as={Button}
							href="/app/curves"
							variant="solid"
							size="lg"
							className={cn([
								'text-secondary-foreground text-small',
								'w-full',
								'bg-gradient-to-r from-secondary to-primary',
								'font-semibold shadow-lg shadow-secondary/50',
								'transition-all duration-200',
							])}
							endContent={<Graph size={20} weight="bold" />}
						>
							Start Curve Analysis
						</Link>
					</CardBody>

					{/* Corner Decoration */}
					<div className="absolute top-0 right-0 h-20 w-20 bg-gradient-to-bl from-secondary/30 to-transparent" />
					<div className="absolute bottom-0 left-0 h-20 w-20 bg-gradient-to-tr from-primary/30 to-transparent" />
				</Card>
			</div>

			{/* Additional Info */}
			<div className="mt-12 text-center">
				<p className="text-small text-foreground/60">
					Both methods utilize advanced machine learning models trained on NASA
					mission data
				</p>
			</div>
		</div>
	);
});

export default AppIndexPage;
