/**
 * Parameter Panel Component
 * Floating left panel containing all parameter groups and CSV upload
 * Main control interface for configuring the 52 astronomical parameters
 */

import { Button, Card, CardBody, CardHeader, cn } from '@heroui/react';
import { UploadSimple } from '@phosphor-icons/react';
import { memo, useCallback, useRef, useState } from 'react';
import {
	getGroupedParameters,
	PARAMETER_GROUP_LABELS,
} from '../../tabular.config';
import { ParameterGroup as ParameterGroupEnum } from '../../tabular.types';
import { ParameterGroup } from './parameter-group.component';

interface ParameterPanelProps {
	/** Handle value change for a parameter */
	onChange: (parameterName: string, value: number) => void;
	/** Handle CSV file upload */
	onCSVUpload?: (file: File) => void;
}

/**
 * Main parameter panel with collapsible groups and CSV upload
 * Displays all 52 parameters organized into logical categories
 */
export const ParameterPanel = memo(function ParameterPanel({
	onChange,
	onCSVUpload,
}: ParameterPanelProps) {
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [selectedFileName, setSelectedFileName] = useState<string | null>(null);

	const groupedParameters = getGroupedParameters();

	const handleFileButtonClick = useCallback(() => {
		fileInputRef.current?.click();
	}, []);

	const handleFileChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const file = e.target.files?.[0];
			if (file) {
				setSelectedFileName(file.name);
				onCSVUpload?.(file);
			}
		},
		[onCSVUpload],
	);

	// Group order for display
	const groupOrder: ParameterGroupEnum[] = [
		ParameterGroupEnum.TRANSIT,
		ParameterGroupEnum.DURATION,
		ParameterGroupEnum.ORBITAL,
		ParameterGroupEnum.RATIO,
		ParameterGroupEnum.PHOTOMETRY,
		ParameterGroupEnum.ASTROMETRY,
		ParameterGroupEnum.STELLAR,
		ParameterGroupEnum.OBSERVATIONS,
		ParameterGroupEnum.DERIVED,
		ParameterGroupEnum.FLAGS,
	];

	return (
		<Card
			className={cn([
				'relative rounded-large overflow-hidden',
				'bg-gradient-to-br from-content2 to-content1',
				'border border-divider/50',
				'shadow-lg',
				'backdrop-blur-lg',
				'h-full',
				'transition-shadow duration-300',
				'hover:shadow-xl',
			])}
		>
			{/* Subtle corner decoration */}
			<div
				className={cn([
					'absolute top-0 right-0 h-16 w-16',
					'bg-gradient-to-bl from-primary/20 to-transparent',
					'pointer-events-none',
				])}
			/>
			<div
				className={cn([
					'absolute bottom-0 left-0 h-16 w-16',
					'bg-gradient-to-tr from-secondary/20 to-transparent',
					'pointer-events-none',
				])}
			/>

			<CardHeader
				className={cn([
					'flex flex-col gap-3 pb-4',
					'border-b border-divider/50',
					'relative z-10',
				])}
			>
				{/* Panel title */}
				<div className={cn(['space-y-1'])}>
					<h2
						className={cn([
							'text-large font-bold',
							'bg-gradient-to-br from-primary via-secondary to-primary',
							'bg-clip-text text-transparent',
							'drop-shadow-[0_0_15px_rgba(255,255,255,0.15)]',
						])}
					>
						Parameter Console
					</h2>
					<p className={cn(['text-tiny text-foreground/60'])}>
						Configure astronomical parameters or upload CSV data
					</p>
				</div>

				{/* CSV Upload button */}
				<div className={cn(['space-y-2'])}>
					<input
						ref={fileInputRef}
						type="file"
						accept=".csv"
						onChange={handleFileChange}
						className={cn(['hidden'])}
					/>
					<Button
						color="primary"
						variant="bordered"
						size="sm"
						startContent={<UploadSimple size={18} weight="duotone" />}
						onClick={handleFileButtonClick}
						className={cn([
							'w-full',
							'transition-all duration-200',
							'hover:scale-[1.02]',
							'hover:shadow-medium hover:shadow-primary/30',
							'border-primary/50',
						])}
					>
						Upload CSV File
					</Button>
					{selectedFileName && (
						<div
							className={cn([
								'text-tiny text-foreground/70',
								'px-3 py-2',
								'rounded-medium',
								'bg-success/10 border border-success/30',
								'truncate',
							])}
						>
							<span className={cn(['font-semibold text-success'])}>
								Selected:
							</span>{' '}
							{selectedFileName}
						</div>
					)}
				</div>
			</CardHeader>

			<CardBody
				className={cn([
					'overflow-y-auto',
					'max-h-[calc(100vh-16rem)]',
					'scrollbar-thin scrollbar-thumb-primary/30 scrollbar-track-transparent',
					'p-0',
				])}
			>
				{/* Parameter groups */}
				<div className={cn(['divide-y divide-divider/30'])}>
					{groupOrder.map((groupKey, index) => {
						const parameters = groupedParameters.get(groupKey);
						if (!parameters || parameters.length === 0) return null;

						return (
							<ParameterGroup
								key={groupKey}
								groupName={PARAMETER_GROUP_LABELS[groupKey]}
								parameters={parameters}
								onChange={onChange}
								defaultExpanded={index === 0} // First group starts expanded
							/>
						);
					})}
				</div>
			</CardBody>
		</Card>
	);
});
