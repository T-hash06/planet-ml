/**
 * Parameter Panel Component
 * Floating left panel containing all parameter groups and CSV upload
 * Main control interface for configuring the 21 astronomical parameters
 */

import {
	Autocomplete,
	AutocompleteItem,
	Button,
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	cn,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
} from '@heroui/react';
import {
	DownloadSimple,
	FileArrowDown,
	FileCsv,
	FileJs,
	UploadSimple,
} from '@phosphor-icons/react';
import { memo, useCallback, useRef, useState } from 'react';
import {
	getGroupedParameters,
	PARAMETER_GROUP_LABELS,
	TABULAR_PARAMETERS,
} from '../../tabular.config';
import { ParameterGroup as ParameterGroupEnum } from '../../tabular.types';
import { ParameterGroup } from './parameter-group.component';

interface ParameterPanelProps {
	/** Handle value change for a parameter */
	onChange: (parameterName: string, value: number) => void;
	/** Handle CSV file upload */
	onCSVUpload?: (file: File) => void;
	/** Handle planet selection from CSV */
	onPlanetSelect?: (rowData: Record<string, unknown>) => void;
	/** Current form values for export */
	currentValues?: Record<string, number>;
}

/**
 * Main parameter panel with collapsible groups and CSV upload
 * Displays all 21 parameters organized into logical categories
 */
export const ParameterPanel = memo(function ParameterPanel({
	onChange,
	onCSVUpload,
	onPlanetSelect,
	currentValues = {},
}: ParameterPanelProps) {
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [selectedFileName, setSelectedFileName] = useState<string | null>(null);

	// CSV data state - stores all rows from uploaded CSV
	const [csvRows, setCsvRows] = useState<Array<Record<string, unknown>>>([]);

	// Selected planet state - stores the currently selected planet name
	const [selectedPlanet, setSelectedPlanet] = useState<string | null>(null);

	const groupedParameters = getGroupedParameters();

	/**
	 * Download CSV template with sample data
	 * Provides users with a reference format for uploading their own data
	 */
	const downloadTemplate = useCallback(() => {
		// Create CSV header row with parameter names
		const headers = TABULAR_PARAMETERS.map((param) => param.name);
		const headerRow = headers.join(',');

		// Create three sample rows with realistic values
		const sampleRows = [
			// Sample 1: Hot Jupiter-like planet
			[
				'Kepler-1b', // planet_name
				5.234, // pl_orbper
				0.0512, // pl_orbsmax
				1234, // pl_eqt
				850.5, // pl_insol
				0.42, // pl_imppar
				0.85, // pl_trandep
				3.45, // pl_trandur
				12.3, // pl_ratdor
				0.105, // pl_ratror
				5678, // st_teff
				0.95, // st_rad
				0.92, // st_mass
				-0.12, // st_met
				4.41, // st_logg
				14.5, // sy_gmag
				13.8, // sy_rmag
				13.6, // sy_imag
				13.4, // sy_zmag
				11.9, // sy_jmag
				11.6, // sy_hmag
				11.5, // sy_kmag
			],
			// Sample 2: Super-Earth
			[
				'TOI-200b', // planet_name
				12.456, // pl_orbper
				0.0823, // pl_orbsmax
				892, // pl_eqt
				345.2, // pl_insol
				0.68, // pl_imppar
				0.34, // pl_trandep
				4.12, // pl_trandur
				18.7, // pl_ratdor
				0.067, // pl_ratror
				5890, // st_teff
				1.12, // st_rad
				1.05, // st_mass
				0.05, // st_met
				4.35, // st_logg
				15.2, // sy_gmag
				14.6, // sy_rmag
				14.3, // sy_imag
				14.1, // sy_zmag
				12.5, // sy_jmag
				12.2, // sy_hmag
				12.1, // sy_kmag
			],
			// Sample 3: Warm Neptune
			[
				'K2-300b', // planet_name
				8.789, // pl_orbper
				0.0678, // pl_orbsmax
				1023, // pl_eqt
				567.3, // pl_insol
				0.51, // pl_imppar
				0.56, // pl_trandep
				3.78, // pl_trandur
				14.5, // pl_ratdor
				0.089, // pl_ratror
				5456, // st_teff
				0.87, // st_rad
				0.84, // st_mass
				-0.23, // st_met
				4.46, // st_logg
				15.8, // sy_gmag
				15.1, // sy_rmag
				14.9, // sy_imag
				14.7, // sy_zmag
				13.1, // sy_jmag
				12.8, // sy_hmag
				12.7, // sy_kmag
			],
		];

		// Add planet_name to header
		const fullHeaderRow = `planet_name,${headerRow}`;

		// Convert sample rows to CSV format
		const dataRows = sampleRows.map((row) => row.join(',')).join('\n');

		// Combine header and data
		const csvContent = `${fullHeaderRow}\n${dataRows}`;

		// Create blob and download
		const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
		const url = URL.createObjectURL(blob);
		const link = document.createElement('a');
		link.href = url;
		link.download = 'exoplanet_template.csv';
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
		URL.revokeObjectURL(url);
	}, []);

	/**
	 * Export current parameter values as CSV
	 */
	const exportAsCSV = useCallback(() => {
		// Create CSV header row with parameter names
		const headers = TABULAR_PARAMETERS.map((param) => param.name);
		const headerRow = headers.join(',');

		// Create CSV data row with current values
		const values = TABULAR_PARAMETERS.map((param) => {
			const value = currentValues[param.name] ?? param.defaultValue;
			return value;
		});
		const dataRow = values.join(',');

		// Combine header and data
		const csvContent = `${headerRow}\n${dataRow}`;

		// Create blob and download
		const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
		const url = URL.createObjectURL(blob);
		const link = document.createElement('a');
		link.href = url;
		link.download = `exoplanet_parameters_${new Date().toISOString().split('T')[0]}.csv`;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
		URL.revokeObjectURL(url);
	}, [currentValues]);

	/**
	 * Export current parameter values as JSON
	 */
	const exportAsJSON = useCallback(() => {
		// Create object with parameter names as keys and current values
		const data: Record<string, unknown> = {};

		for (const param of TABULAR_PARAMETERS) {
			const value = currentValues[param.name] ?? param.defaultValue;
			data[param.name] = {
				value,
				label: param.label,
				unit: param.unit,
				description: param.description,
			};
		}

		// Create formatted JSON string
		const jsonContent = JSON.stringify(data, null, 2);

		// Create blob and download
		const blob = new Blob([jsonContent], {
			type: 'application/json;charset=utf-8;',
		});
		const url = URL.createObjectURL(blob);
		const link = document.createElement('a');
		link.href = url;
		link.download = `exoplanet_parameters_${new Date().toISOString().split('T')[0]}.json`;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
		URL.revokeObjectURL(url);
	}, [currentValues]);

	/**
	 * Handle export format selection
	 */
	const handleExport = useCallback(
		(format: 'csv' | 'json') => {
			if (format === 'csv') {
				exportAsCSV();
			} else {
				exportAsJSON();
			}
		},
		[exportAsCSV, exportAsJSON],
	);

	const handleFileButtonClick = useCallback(() => {
		fileInputRef.current?.click();
	}, []);

	const handleFileChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const file = e.target.files?.[0];
			if (file) {
				setSelectedFileName(file.name);

				// Parse CSV file
				const reader = new FileReader();
				reader.onload = (event) => {
					try {
						const csvText = event.target?.result as string;
						if (!csvText) {
							alert('Failed to read CSV file');
							return;
						}

						// Parse CSV (basic implementation)
						const lines = csvText.split('\n').filter((line) => line.trim());
						if (lines.length < 2) {
							alert(
								'CSV file must contain header row and at least one data row',
							);
							return;
						}

						// Extract headers from first line
						const headers = lines[0].split(',').map((h) => h.trim());

						// Parse all data rows
						const parsedRows: Array<Record<string, unknown>> = [];
						for (let i = 1; i < lines.length; i++) {
							const values = lines[i].split(',').map((v) => v.trim());
							const rowData: Record<string, unknown> = {};

							headers.forEach((header, index) => {
								const value = values[index];
								// Try to parse as number, otherwise keep as string
								const numValue = Number.parseFloat(value);
								rowData[header] = Number.isNaN(numValue) ? value : numValue;
							});

							parsedRows.push(rowData);
						}

						// Store all parsed rows
						setCsvRows(parsedRows);

						// Reset selected planet when new CSV is uploaded
						setSelectedPlanet(null);

						// Call the original onCSVUpload callback
						onCSVUpload?.(file);

						// Show success message
						alert(
							`Successfully loaded ${parsedRows.length} rows with ${headers.length} columns from "${file.name}"`,
						);
					} catch (error) {
						console.error('CSV parsing error:', error);
						alert(`Error parsing CSV file: ${error}`);
					}
				};

				reader.onerror = () => {
					alert('Error reading file');
				};

				reader.readAsText(file);
			}
		},
		[onCSVUpload],
	);

	/**
	 * Handle planet selection from Autocomplete
	 * Loads the selected row data into the form
	 */
	const handlePlanetSelection = useCallback(
		(rowIndex: number) => {
			const selectedRow = csvRows[rowIndex];
			if (!selectedRow) return;

			// Set selected planet name
			if ('planet_name' in selectedRow) {
				setSelectedPlanet(String(selectedRow.planet_name));
			} else {
				setSelectedPlanet(`Row ${rowIndex + 1}`);
			}

			// Call parent callback with row data
			onPlanetSelect?.(selectedRow);
		},
		[csvRows, onPlanetSelect],
	);

	// Group order for display
	const groupOrder: ParameterGroupEnum[] = [
		ParameterGroupEnum.ORBITAL,
		ParameterGroupEnum.PLANET,
		ParameterGroupEnum.TRANSIT,
		ParameterGroupEnum.STELLAR,
		ParameterGroupEnum.PHOTOMETRY,
	];

	return (
		<Card
			className={cn([
				'relative rounded-large overflow-hidden',
				'bg-gradient-to-br from-content2 via-content1 to-content2',
				'border border-divider/50',
				'shadow-medium hover:shadow-large',
				'backdrop-blur-xl',
				'h-full',
				'transition-all duration-300',
			])}
		>
			{/* Corner decorations for depth */}
			<div
				className={cn([
					'absolute top-0 right-0 h-24 w-24',
					'bg-gradient-to-bl from-primary/30 via-primary/10 to-transparent',
					'pointer-events-none',
					'transition-opacity duration-300',
				])}
			/>
			<div
				className={cn([
					'absolute bottom-0 left-0 h-24 w-24',
					'bg-gradient-to-tr from-secondary/25 via-secondary/10 to-transparent',
					'pointer-events-none',
					'transition-opacity duration-300',
				])}
			/>

			<CardHeader
				className={cn([
					'flex flex-col gap-3 pb-4',
					'border-b border-divider/30',
					'relative z-10',
					'bg-gradient-to-br from-content2/50 to-transparent',
					'backdrop-blur-sm',
				])}
			>
				{/* Panel title */}
				<div className={cn(['space-y-1'])}>
					<h2
						className={cn([
							'text-large font-bold',
							'bg-gradient-to-br from-primary via-secondary to-primary',
							'bg-clip-text text-transparent',
							'drop-shadow-[0_0_20px_rgba(100,100,255,0.4)]',
							'transition-all duration-300',
						])}
					>
						Parameter Console
					</h2>
					<p
						className={cn([
							'text-tiny text-foreground/70 transition-colors duration-200',
						])}
					>
						Configure astronomical parameters or upload CSV data
					</p>
				</div>

				{/* CSV Upload section */}
				<div className={cn(['space-y-2 w-full'])}>
					<input
						ref={fileInputRef}
						type="file"
						accept=".csv"
						onChange={handleFileChange}
						className={cn(['hidden'])}
					/>

					{/* Action buttons grid */}
					<div className={cn(['grid grid-cols-2 gap-2 w-full'])}>
						{/* Upload button */}
						<Button
							color="primary"
							variant="bordered"
							size="sm"
							startContent={<UploadSimple size={18} weight="duotone" />}
							onClick={handleFileButtonClick}
							className={cn([
								'w-full',
								'transition-all duration-300',
								'hover:scale-[1.03] hover:-translate-y-0.5',
								'hover:shadow-large hover:shadow-primary/40',
								'border-primary/60 hover:border-primary',
								'bg-gradient-to-r from-primary/5 to-secondary/5',
								'hover:bg-gradient-to-r hover:from-primary/10 hover:to-secondary/10',
							])}
						>
							Upload CSV
						</Button>

						{/* Download template button */}
						<Button
							color="secondary"
							variant="bordered"
							size="sm"
							startContent={<DownloadSimple size={18} weight="duotone" />}
							onClick={downloadTemplate}
							className={cn([
								'w-full',
								'transition-all duration-300',
								'hover:scale-[1.03] hover:-translate-y-0.5',
								'hover:shadow-large hover:shadow-secondary/40',
								'border-secondary/60 hover:border-secondary',
								'bg-gradient-to-r from-secondary/5 to-success/5',
								'hover:bg-gradient-to-r hover:from-secondary/10 hover:to-success/10',
							])}
						>
							Template
						</Button>
					</div>

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

				{/* Planet Selection Section */}
				{csvRows.length > 0 && (
					<div className={cn(['space-y-2 w-full'])}>
						<Autocomplete
							className={cn(['w-full'])}
							classNames={{
								base: 'w-full',
							}}
							label="Select Planet"
							placeholder="Choose a planet from CSV..."
							defaultItems={csvRows.map((row, index) => ({
								label:
									'planet_name' in row
										? String(row.planet_name)
										: `Row ${index + 1}`,
								value: index.toString(),
								key: index.toString(),
							}))}
							onSelectionChange={(key) => {
								if (key) {
									handlePlanetSelection(Number.parseInt(key as string, 10));
								}
							}}
						>
							{(item) => (
								<AutocompleteItem key={item.key} className="text-foreground">
									{item.label}
								</AutocompleteItem>
							)}
						</Autocomplete>

						{selectedPlanet && (
							<div
								className={cn([
									'flex items-center gap-2',
									'px-3 py-2 rounded-medium',
									'bg-primary/10 border border-primary/20',
									'text-primary font-medium text-tiny',
								])}
							>
								<span>Selected Planet:</span>
								<span className={cn(['font-bold'])}>{selectedPlanet}</span>
							</div>
						)}
					</div>
				)}
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

			{/* Export Section */}
			<CardFooter
				className={cn([
					'flex flex-col gap-3 pt-4',
					'border-t border-divider/30',
					'relative z-10',
					'bg-gradient-to-br from-content2/50 to-transparent',
					'backdrop-blur-sm',
				])}
			>
				<div className={cn(['space-y-2 w-full'])}>
					<p
						className={cn([
							'text-tiny text-foreground/70 transition-colors duration-200',
						])}
					>
						Export current parameters
					</p>
					<Dropdown>
						<DropdownTrigger>
							<Button
								color="secondary"
								variant="bordered"
								size="sm"
								startContent={<FileArrowDown size={18} weight="duotone" />}
								className={cn([
									'w-full',
									'transition-all duration-300',
									'hover:scale-[1.03] hover:-translate-y-0.5',
									'hover:shadow-large hover:shadow-secondary/40',
									'border-secondary/60 hover:border-secondary',
									'bg-gradient-to-r from-secondary/5 to-success/5',
									'hover:bg-gradient-to-r hover:from-secondary/10 hover:to-success/10',
								])}
							>
								Export Data
							</Button>
						</DropdownTrigger>
						<DropdownMenu
							aria-label="Export format selection"
							onAction={(key) => handleExport(key as 'csv' | 'json')}
						>
							<DropdownItem
								key="csv"
								className="text-foreground"
								description="Export as comma-separated values"
								startContent={<FileCsv size={20} weight="duotone" />}
							>
								Export as CSV
							</DropdownItem>
							<DropdownItem
								key="json"
								className="text-foreground"
								description="Export as JSON with metadata"
								startContent={<FileJs size={20} weight="duotone" />}
							>
								Export as JSON
							</DropdownItem>
						</DropdownMenu>
					</Dropdown>
				</div>
			</CardFooter>
		</Card>
	);
});
