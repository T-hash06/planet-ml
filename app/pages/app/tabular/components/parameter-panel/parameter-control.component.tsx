/**
 * Parameter Control Component
 * Displays a single parameter with synchronized slider and input field
 * Supports bidirectional value synchronization and proper formatting
 */

import { cn, Input, Slider } from '@heroui/react';
import { useStore } from '@tanstack/react-form';
import { memo, useCallback } from 'react';
import { useTabularForm } from '../../tabular.context';
import type { TabularParameter } from '../../tabular.types';

interface ParameterControlProps {
	/** Parameter configuration */
	parameter: TabularParameter;
	/** Change handler */
	onChange: (value: number) => void;
}

/**
 * Formats a number for display based on the step value
 * Uses appropriate decimal places based on step precision
 */
function formatValue(value: number, step: number): string {
	if (step >= 1) {
		return value.toFixed(0);
	}
	if (step >= 0.1) {
		return value.toFixed(1);
	}
	if (step >= 0.01) {
		return value.toFixed(2);
	}
	if (step >= 0.001) {
		return value.toFixed(3);
	}
	return value.toFixed(4);
}

/**
 * Parameter control with synchronized slider and input
 * Provides real-time bidirectional sync between controls
 */
export const ParameterControl = memo(function ParameterControl({
	parameter,
	onChange,
}: ParameterControlProps) {
	// Access form from context
	const form = useTabularForm();

	// Use useStore for reactive access to the parameter value
	const value = useStore(
		form.store,
		(state) =>
			// @ts-expect-error - Form state type inference issue
			state.values[parameter.name] ?? parameter.defaultValue,
	);
	const handleSliderChange = useCallback(
		(sliderValue: number | number[]) => {
			const numValue = Array.isArray(sliderValue)
				? sliderValue[0]
				: sliderValue;
			onChange(numValue);
		},
		[onChange],
	);

	const handleInputChange = useCallback(
		(inputValue: string) => {
			const numValue = Number.parseFloat(inputValue);
			if (!Number.isNaN(numValue)) {
				// Clamp value to min/max bounds
				const clampedValue = Math.max(
					parameter.min,
					Math.min(parameter.max, numValue),
				);
				onChange(clampedValue);
			}
		},
		[onChange, parameter.min, parameter.max],
	);

	return (
		<div
			className={cn([
				'space-y-3 p-4',
				'border-b border-divider/30 last:border-b-0',
				'transition-colors duration-200',
				'hover:bg-content2/30',
			])}
		>
			{/* Label and description */}
			<div className={cn(['space-y-1'])}>
				<div className={cn(['flex items-center justify-between gap-2'])}>
					<span
						className={cn([
							'text-small font-semibold text-foreground',
							'transition-colors duration-200',
						])}
					>
						{parameter.label}
					</span>
					{parameter.unit && (
						<span
							className={cn([
								'text-tiny font-medium text-foreground/60',
								'rounded-small bg-content2/50 px-2 py-0.5',
							])}
						>
							{parameter.unit}
						</span>
					)}
				</div>
				<p className={cn(['text-tiny text-foreground/60'])}>
					{parameter.description}
				</p>
			</div>

			{/* Slider and input grid */}
			<div className={cn(['grid grid-cols-[1fr_auto] gap-3 items-center'])}>
				{/* Slider */}
				<Slider
					size="sm"
					color="primary"
					minValue={parameter.min}
					maxValue={parameter.max}
					step={parameter.step}
					value={value}
					onChange={handleSliderChange}
					className={cn(['flex-1'])}
					classNames={{
						track: cn(['transition-all duration-200']),
						thumb: cn([
							'transition-all duration-200',
							'hover:scale-110',
							'active:scale-100',
						]),
					}}
				/>

				{/* Input field */}
				<Input
					type="number"
					size="sm"
					variant="bordered"
					value={formatValue(value, parameter.step)}
					onValueChange={handleInputChange}
					min={parameter.min}
					max={parameter.max}
					step={parameter.step}
					className={cn(['w-24'])}
					classNames={{
						input: cn(['text-center text-small font-medium']),
						inputWrapper: cn([
							'transition-all duration-200',
							'hover:border-primary/50',
						]),
					}}
				/>
			</div>

			{/* Range indicator */}
			<div
				className={cn([
					'flex justify-between text-tiny text-foreground/50 font-mono',
				])}
			>
				<span>{formatValue(parameter.min, parameter.step)}</span>
				<span>{formatValue(parameter.max, parameter.step)}</span>
			</div>
		</div>
	);
});
