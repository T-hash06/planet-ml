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
								'text-medium font-bold text-primary',
								'transition-all duration-200',
							])}
						>
							{groupName}
						</span>
						<span
							className={cn([
								'text-tiny font-medium text-foreground/50',
								'rounded-full bg-content2/50 px-2 py-0.5',
							])}
						>
							{parameters.length} {parameters.length === 1 ? 'param' : 'params'}
						</span>
					</div>
				}
				classNames={{
					base: cn([
						'border-b border-divider/30',
						'transition-all duration-200',
					]),
					title: cn(['py-3 px-4']),
					trigger: cn([
						'py-0',
						'hover:bg-content2/30',
						'transition-colors duration-200',
					]),
					content: cn(['px-0 pb-0']),
					indicator: cn(['text-primary']),
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
