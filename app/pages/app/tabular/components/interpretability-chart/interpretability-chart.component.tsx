/**
 * Interpretability Chart Component
 * Displays horizontal bar chart of top 8 feature weights using Recharts
 * Shows model interpretability and feature importance for predictions
 */

import { Card, CardBody, CardHeader, cn, Skeleton } from '@heroui/react';
import { memo, useMemo } from 'react';
import {
	Bar,
	BarChart,
	CartesianGrid,
	Cell,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts';
import type { ChartDataPoint } from '../../tabular.types';

/**
 * Component props
 */
interface InterpretabilityChartProps {
	/** Feature weights from prediction response */
	attributeWeights: Record<string, number> | null;
	/** Loading state during prediction */
	isLoading: boolean;
}

/**
 * Format feature name from snake_case to readable label
 * Handles common abbreviations and capitalizes words
 */
function formatFeatureName(name: string): string {
	// Common abbreviations mapping
	const abbreviations: Record<string, string> = {
		pl: 'Planet',
		st: 'Star',
		sy: 'System',
		tran: 'Transit',
		dep: 'Depth',
		dur: 'Duration',
		orb: 'Orbital',
		per: 'Period',
		err: 'Error',
		frac: 'Fraction',
		rat: 'Ratio',
		ror: 'R/R*',
		tmag: 'TESS Mag',
		gaiamag: 'Gaia Mag',
		kmag: 'K Mag',
		jmag: 'J Mag',
		hmag: 'H Mag',
		vmag: 'V Mag',
		bmag: 'B Mag',
		w1mag: 'W1 Mag',
		w2mag: 'W2 Mag',
		dist: 'Distance',
		plx: 'Parallax',
		pm: 'Proper Motion',
		pmra: 'PM RA',
		pmdec: 'PM Dec',
		rad: 'Radius',
		teff: 'Teff',
		logg: 'log(g)',
		dens: 'Density',
		vsin: 'v sin i',
		met: 'Metallicity',
		nphot: 'N Phot',
		nrvc: 'N RVC',
		ntranspec: 'N Tran Spec',
		nespec: 'N E Spec',
		ndispec: 'N Di Spec',
		nspec: 'N Spec',
		ttv: 'TTV',
		rv: 'RV',
		cb: 'CB',
		controv: 'Controversy',
		imppar: 'Impact Param',
		tranmid: 'Transit Mid',
	};

	// Split by underscore
	const parts = name.split('_');

	// Map each part through abbreviations or capitalize
	const formatted = parts
		.map((part) => {
			// Check if entire part is an abbreviation
			if (abbreviations[part.toLowerCase()]) {
				return abbreviations[part.toLowerCase()];
			}

			// Capitalize first letter
			return part.charAt(0).toUpperCase() + part.slice(1);
		})
		.join(' ');

	// Limit length for display
	return formatted.length > 30 ? `${formatted.slice(0, 27)}...` : formatted;
}

/**
 * Custom tooltip component for the chart
 */
const CustomTooltip = memo(function CustomTooltip(
	// biome-ignore lint/suspicious/noExplicitAny: Recharts types are complex and vary
	props: any,
) {
	const { active, payload } = props;

	if (!active || !payload || payload.length === 0) {
		return null;
	}

	const data = payload[0].payload as ChartDataPoint;

	return (
		<div
			className={cn([
				'rounded-medium border border-divider/50',
				'bg-content1/95 backdrop-blur-md',
				'px-4 py-3 shadow-large',
			])}
		>
			<p className={cn(['text-small font-semibold text-foreground'])}>
				{data.feature}
			</p>
			<p
				className={cn([
					'text-tiny font-medium',
					data.weight > 0 ? 'text-primary' : 'text-danger',
				])}
			>
				Weight: {data.weight.toFixed(4)}
			</p>
			<p className={cn(['text-tiny text-foreground/70'])}>
				{data.weight > 0 ? 'Positive influence' : 'Negative influence'}
			</p>
		</div>
	);
});

/**
 * Interpretability Chart Component
 * Shows horizontal bar chart of top 8 feature weights with color-coded bars
 */
export const InterpretabilityChart = memo(function InterpretabilityChart({
	attributeWeights,
	isLoading,
}: InterpretabilityChartProps) {
	/**
	 * Process attribute weights into chart data
	 * - Convert object to array
	 * - Sort by absolute weight (descending)
	 * - Take top 8 features
	 * - Format feature names
	 * - Assign colors based on sign
	 */
	const chartData = useMemo<ChartDataPoint[]>(() => {
		if (!attributeWeights) {
			return [];
		}

		// Convert to array and sort by absolute weight
		const entries = Object.entries(attributeWeights)
			.map(([feature, weight]) => ({
				feature,
				weight,
				absWeight: Math.abs(weight),
			}))
			.sort((a, b) => b.absWeight - a.absWeight)
			.slice(0, 8); // Take top 8

		// Format for Recharts
		return entries.map(({ feature, weight }) => ({
			feature: formatFeatureName(feature),
			weight,
			color: weight > 0 ? 'primary' : 'danger',
		}));
	}, [attributeWeights]);

	// Get CSS variable values for colors
	const getColorValue = (colorName: string): string => {
		if (typeof window === 'undefined') return '#000';
		const style = getComputedStyle(document.documentElement);
		const hslValue =
			colorName === 'primary'
				? style.getPropertyValue('--heroui-primary')
				: style.getPropertyValue('--heroui-danger');
		return hslValue ? `hsl(${hslValue})` : '#000';
	};

	return (
		<Card
			className={cn([
				'relative overflow-hidden rounded-large',
				'bg-gradient-to-br from-content2 to-content1',
				'border border-divider/50',
				'shadow-medium',
				'backdrop-blur-sm',
			])}
		>
			{/* Top-right corner decoration */}
			<div className="absolute right-0 top-0 h-16 w-16 bg-gradient-to-bl from-secondary/30 to-transparent" />

			<CardHeader className={cn(['flex flex-col items-start gap-2 pb-4'])}>
				<h3
					className={cn([
						'text-large font-semibold',
						'bg-gradient-to-br from-primary via-secondary to-primary',
						'bg-clip-text text-transparent',
					])}
				>
					Model Interpretability
				</h3>
				<p className={cn(['text-small text-foreground/70'])}>
					Top 8 features by importance
				</p>
			</CardHeader>

			<CardBody className={cn(['pb-6 pt-2'])}>
				{/* Loading state */}
				{isLoading && (
					<div className={cn(['space-y-3'])}>
						<Skeleton className="h-8 w-full rounded-medium" />
						<Skeleton className="h-8 w-full rounded-medium" />
						<Skeleton className="h-8 w-full rounded-medium" />
						<Skeleton className="h-8 w-full rounded-medium" />
						<Skeleton className="h-8 w-full rounded-medium" />
						<Skeleton className="h-8 w-full rounded-medium" />
						<Skeleton className="h-8 w-full rounded-medium" />
						<Skeleton className="h-8 w-full rounded-medium" />
					</div>
				)}

				{/* Empty state */}
				{!isLoading && chartData.length === 0 && (
					<div
						className={cn([
							'flex min-h-[400px] items-center justify-center',
							'rounded-large bg-content2/50',
							'border border-dashed border-divider',
						])}
					>
						<div className={cn(['text-center'])}>
							<p className={cn(['text-medium font-medium text-foreground/70'])}>
								No data available
							</p>
							<p className={cn(['text-small text-foreground/50 mt-2'])}>
								Adjust parameters to generate predictions
							</p>
						</div>
					</div>
				)}

				{/* Chart */}
				{!isLoading && chartData.length > 0 && (
					<ResponsiveContainer width="100%" height={400}>
						<BarChart
							data={chartData}
							layout="vertical"
							margin={{ top: 5, right: 30, left: 120, bottom: 5 }}
						>
							<CartesianGrid
								strokeDasharray="3 3"
								stroke="hsl(var(--heroui-divider))"
								opacity={0.3}
							/>
							<XAxis
								type="number"
								domain={[-1, 1]}
								ticks={[-1, -0.5, 0, 0.5, 1]}
								stroke="hsl(var(--heroui-foreground))"
								tick={{ fill: 'hsl(var(--heroui-foreground))', fontSize: 12 }}
								label={{
									value: 'Feature Weight',
									position: 'insideBottom',
									offset: -5,
									fill: 'hsl(var(--heroui-foreground))',
									fontSize: 12,
								}}
							/>
							<YAxis
								type="category"
								dataKey="feature"
								width={110}
								stroke="hsl(var(--heroui-foreground))"
								tick={{ fill: 'hsl(var(--heroui-foreground))', fontSize: 11 }}
							/>
							<Tooltip content={<CustomTooltip />} cursor={false} />
							<Bar dataKey="weight" radius={[0, 4, 4, 0]}>
								{chartData.map((entry, index) => (
									<Cell
										key={`cell-${
											// biome-ignore lint/suspicious/noArrayIndexKey: Required by Recharts
											index
										}`}
										fill={getColorValue(entry.color)}
									/>
								))}
							</Bar>
						</BarChart>
					</ResponsiveContainer>
				)}
			</CardBody>

			{/* Bottom-left corner decoration */}
			<div className="absolute bottom-0 left-0 h-16 w-16 bg-gradient-to-tr from-primary/20 to-transparent opacity-30" />
		</Card>
	);
});
