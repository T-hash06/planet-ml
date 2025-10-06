import { cn, Tab, Tabs } from '@heroui/react';
import { StarsBackground } from '@shared/components/stars-background/stars-background.component';
import { memo } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router';

/**
 * App Layout Component
 *
 * Provides the main layout structure for all /app routes with:
 * - Space-themed background with animated stars
 * - Navigation tabs for switching between Tabular and Curves routes
 * - Glassmorphism navigation bar with gradient effects
 * - Responsive layout with proper spacing
 *
 * @returns {JSX.Element} The app layout with navigation and outlet
 */
const AppLayout = memo(function AppLayout() {
	const location = useLocation();
	const navigate = useNavigate();

	// Determine active tab based on current route
	const activeTab = location.pathname.includes('/curves')
		? 'curves'
		: 'tabular';

	/**
	 * Handle tab selection change
	 * @param {string | number} key - The selected tab key
	 */
	const handleTabChange = (key: string | number) => {
		const route = key === 'curves' ? '/app/curves' : '/app/tabular';
		navigate(route);
	};

	return (
		<div className="relative min-h-screen w-full overflow-x-hidden bg-content1">
			{/* Animated Stars Background */}
			<StarsBackground />

			{/* Main Content Container */}
			<div className="relative z-10">
				{/* Navigation Bar with enhanced glassmorphism */}
				<nav
					className={cn([
						'sticky top-0 z-50',
						'bg-gradient-to-br from-content2/95 via-content1/90 to-content2/95',
						'backdrop-blur-xl',
						'border-b border-divider/30',
						'shadow-large shadow-primary/10',
						'px-4 sm:px-6 md:px-8 lg:px-12',
						'py-4',
						'transition-all duration-300',
					])}
				>
					<div className="mx-auto max-w-7xl">
						<div className="flex items-center justify-between gap-4">
							{/* App Title with enhanced gradients */}
							<div className="flex flex-col gap-1">
								<h1
									className={cn([
										'text-large sm:text-xl md:text-2xl font-extrabold',
										'bg-gradient-to-br from-primary via-secondary to-primary',
										'bg-clip-text text-transparent',
										'drop-shadow-[0_0_20px_rgba(100,100,255,0.4)]',
										'transition-all duration-300',
									])}
								>
									ExoNova AI Platform
								</h1>
								<p
									className={cn([
										'text-tiny text-foreground/70',
										'transition-colors duration-200',
									])}
								>
									AI-Driven Exoplanet Detection & Analysis
								</p>
							</div>

							{/* Navigation Tabs with enhanced styling */}
							<Tabs
								aria-label="App navigation"
								selectedKey={activeTab}
								onSelectionChange={handleTabChange}
								color="primary"
								variant="underlined"
								classNames={{
									tabList: cn(['gap-4 sm:gap-6', 'border-b border-divider/20']),
									cursor: cn([
										'bg-gradient-to-r from-primary via-secondary to-primary',
										'shadow-small shadow-primary/30',
									]),
									tab: cn([
										'text-small sm:text-medium font-semibold',
										'data-[selected=true]:text-primary',
										'data-[hover=true]:text-primary/80',
										'transition-all duration-300',
									]),
								}}
							>
								<Tab key="tabular" title="Tabular Data" />
								<Tab key="curves" title="Light Curves" />
							</Tabs>
						</div>
					</div>

					{/* Enhanced Corner Decoration */}
					<div
						className={cn([
							'absolute top-0 right-0 h-20 w-20',
							'bg-gradient-to-bl from-primary/30 via-primary/10 to-transparent',
							'pointer-events-none',
							'transition-opacity duration-300',
						])}
					/>
				</nav>

				{/* Page Content - Outlet for child routes */}
				<div
					className={cn([
						'relative',
						'min-h-[calc(100vh-5rem)]',
						'px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16',
						'py-6 sm:py-8 md:py-10 lg:py-12',
					])}
				>
					{/* Enhanced gradient overlays for depth */}
					<div
						className={cn([
							'fixed inset-0 pointer-events-none',
							'bg-gradient-to-b from-primary/5 via-transparent to-secondary/5',
							'mix-blend-soft-light',
							'transition-opacity duration-500',
						])}
					/>
					<div
						className={cn([
							'fixed inset-0 pointer-events-none',
							'bg-gradient-to-tr from-danger/3 via-transparent to-warning/3',
							'mix-blend-overlay',
							'transition-opacity duration-500',
						])}
					/>

					{/* Child route content */}
					<div className="relative z-10">
						<Outlet />
					</div>
				</div>
			</div>
		</div>
	);
});

export default AppLayout;
