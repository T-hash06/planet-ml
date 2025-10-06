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
				{/* Navigation Bar */}
				<nav
					className={cn([
						'sticky top-0 z-50',
						'bg-gradient-to-br from-content2/95 to-content1/95',
						'backdrop-blur-xl',
						'border-b border-divider/50',
						'shadow-medium',
						'px-4 sm:px-6 md:px-8 lg:px-12',
						'py-4',
					])}
				>
					<div className="mx-auto max-w-7xl">
						<div className="flex items-center justify-between gap-4">
							{/* App Title */}
							<div className="flex flex-col gap-1">
								<h1
									className={cn([
										'text-large sm:text-xl md:text-2xl font-bold',
										'bg-gradient-to-br from-primary via-secondary to-primary',
										'bg-clip-text text-transparent',
										'drop-shadow-[0_0_15px_rgba(100,100,255,0.3)]',
									])}
								>
									ExoNova AI Platform
								</h1>
								<p className="text-tiny text-foreground/70">
									AI-Driven Exoplanet Detection & Analysis
								</p>
							</div>

							{/* Navigation Tabs */}
							<Tabs
								aria-label="App navigation"
								selectedKey={activeTab}
								onSelectionChange={handleTabChange}
								color="primary"
								variant="underlined"
								classNames={{
									tabList: cn(['gap-4 sm:gap-6', 'border-b border-divider/30']),
									cursor: 'bg-gradient-to-r from-primary to-secondary',
									tab: cn([
										'text-small sm:text-medium',
										'data-[selected=true]:text-primary',
										'transition-colors duration-200',
									]),
								}}
							>
								<Tab key="tabular" title="Tabular Data" />
								<Tab key="curves" title="Light Curves" />
							</Tabs>
						</div>
					</div>

					{/* Subtle Corner Decoration */}
					<div
						className={cn([
							'absolute top-0 right-0 h-16 w-16',
							'bg-gradient-to-bl from-primary/20 to-transparent',
							'pointer-events-none',
						])}
					/>
				</nav>

				{/* Page Content - Outlet for child routes */}
				<div
					className={cn([
						'relative',
						'min-h-[calc(100vh-5rem)]',
						'px-4 sm:px-6 md:px-8 lg:px-12',
						'py-6 sm:py-8 md:py-10',
					])}
				>
					{/* Subtle gradient overlay for depth */}
					<div
						className={cn([
							'fixed inset-0 pointer-events-none',
							'bg-gradient-to-b from-primary/5 via-transparent to-secondary/5',
							'mix-blend-soft-light',
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
