/**
 * Parameter Group Component
 * Collapsible accordion section containing related parameters
 * Groups parameters by their logical category (Transit, Orbital, etc.)
 */

import { Accordion, AccordionItem, cn } from '@heroui/react';
import { memo } from 'react';
import type { TabularParameter } from '../../tabular.types';
import { ParameterControl } from './parameter-control.component';

interface ParameterGroupProps {
	/** Group display name */
	groupName: string;
	/** Parameters in this group */
	parameters: TabularParameter[];
	/** Handle value change for a parameter */
	onChange: (parameterName: string, value: number) => void;
	/** Whether this group should start expanded */
	defaultExpanded?: boolean;
}

/**
 * Collapsible parameter group using HeroUI Accordion
 * Contains multiple parameter controls organized by category
 */
export const ParameterGroup = memo(function ParameterGroup({
	groupName,
	parameters,
	onChange,
	defaultExpanded = false,
}: ParameterGroupProps) {
	return (
		<Accordion
			variant="bordered"
			defaultExpandedKeys={defaultExpanded ? ['group-content'] : []}
			className={cn(['border-none'])}
		>
			<AccordionItem
				key="group-content"
				aria-label={groupName}
				title={
					<div className={cn(['flex items-center justify-between gap-2'])}>
						<span
							className={cn([
								'text-medium font-bold',
								'bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent',
								'transition-all duration-300',
							])}
						>
							{groupName}
						</span>
						<span
							className={cn([
								'text-tiny font-medium text-foreground/60',
								'rounded-full bg-gradient-to-r from-primary/10 to-secondary/10',
								'border border-primary/20',
								'px-2.5 py-0.5',
								'transition-all duration-200',
							])}
						>
							{parameters.length} {parameters.length === 1 ? 'param' : 'params'}
						</span>
					</div>
				}
				classNames={{
					base: cn([
						'border-b border-divider/30',
						'transition-all duration-300',
					]),
					title: cn(['py-3 px-4']),
					trigger: cn([
						'py-0',
						'hover:bg-gradient-to-r hover:from-primary/5 hover:to-secondary/5',
						'transition-all duration-300',
					]),
					content: cn(['px-0 pb-0']),
					indicator: cn(['text-primary', 'transition-transform duration-300']),
				}}
			>
				<div className={cn(['divide-y divide-divider/20'])}>
					{parameters.map((parameter) => (
						<ParameterControl
							key={parameter.name}
							parameter={parameter}
							onChange={(value) => onChange(parameter.name, value)}
						/>
					))}
				</div>
			</AccordionItem>
		</Accordion>
	);
});
