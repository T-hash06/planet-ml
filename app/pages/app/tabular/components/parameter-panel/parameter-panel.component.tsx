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

		// Create sample rows with real exoplanet data
		const sampleRows = [
			// Sample 1: Kepler-186f - Hot Jupiter with short orbital period
			[
				'Kepler-186f', // planet_name
				2.991885335, // pl_orbper
				0.0369, // pl_orbsmax
				1209, // pl_eqt
				505.77, // pl_insol
				0.95, // pl_imppar
				0.13569, // pl_trandep
				7.4319, // pl_trandur
				1.6504, // pl_ratdor
				0.042959, // pl_ratror
				5750, // st_teff
				0.839, // st_rad
				0.747, // st_mass
				-0.68, // st_met
				4.464, // st_logg
				'', // sy_gmag
				'', // sy_rmag
				13.794, // sy_imag
				'', // sy_zmag
				'', // sy_jmag
				'', // sy_hmag
				'', // sy_kmag
			],
			// Sample 2: HAT-P-7b - Warm Neptune
			[
				'HAT-P-7b', // planet_name
				13.24934059, // pl_orbper
				0.11248, // pl_orbsmax
				806, // pl_eqt
				101.143, // pl_insol
				0.3503, // pl_imppar
				0.06476, // pl_trandep
				4.4634, // pl_trandur
				21.82, // pl_ratdor
				0.023423, // pl_ratror
				5882, // st_teff
				1.07, // st_rad
				1.04, // st_mass
				0.03, // st_met
				4.39, // st_logg
				'', // sy_gmag
				'', // sy_rmag
				13.965, // sy_imag
				'', // sy_zmag
				'', // sy_jmag
				'', // sy_hmag
				'', // sy_kmag
			],
			// Sample 3: WASP-12b - Super-Earth
			[
				'WASP-12b', // planet_name
				12.8345022, // pl_orbper
				0.1075, // pl_orbsmax
				891, // pl_eqt
				149.42, // pl_insol
				0.902, // pl_imppar
				0.0281, // pl_trandep
				3.2666, // pl_trandur
				14.2, // pl_ratdor
				0.016209, // pl_ratror
				6087, // st_teff
				1.14, // st_rad
				1.07, // st_mass
				-0.1, // st_met
				4.35, // st_logg
				'', // sy_gmag
				'', // sy_rmag
				13.616, // sy_imag
				'', // sy_zmag
				'', // sy_jmag
				'', // sy_hmag
				'', // sy_kmag
			],
			// Sample 4: K2-18b - Sub-Neptune
			[
				'K2-18b', // planet_name
				14.70748976, // pl_orbper
				0.11945, // pl_orbsmax
				819, // pl_eqt
				90.384, // pl_insol
				0.127, // pl_imppar
				0.0262, // pl_trandep
				3.1584, // pl_trandur
				35.9, // pl_ratdor
				0.014671, // pl_ratror
				5665, // st_teff
				1.19, // st_rad
				1.02, // st_mass
				0.23, // st_met
				4.29, // st_logg
				'', // sy_gmag
				'', // sy_rmag
				13.182, // sy_imag
				'', // sy_zmag
				'', // sy_jmag
				'', // sy_hmag
				'', // sy_kmag
			],
			// Sample 5: 55 Cancri e - Ultra-short period planet
			[
				'55 Cancri e', // planet_name
				1.049406508, // pl_orbper
				0.0244, // pl_orbsmax
				'', // pl_eqt
				'', // pl_insol
				0.112, // pl_imppar
				0.04475, // pl_trandep
				3.0072, // pl_trandur
				2.766, // pl_ratdor
				0.018735, // pl_ratror
				4745, // st_teff
				'', // st_rad
				'', // st_mass
				-0.24, // st_met
				'', // st_logg
				'', // sy_gmag
				'', // sy_rmag
				11.973, // sy_imag
				'', // sy_zmag
				'', // sy_jmag
				'', // sy_hmag
				'', // sy_kmag
			],
			// Sample 6: Qatar-1b - Hot Neptune
			[
				'Qatar-1b', // planet_name
				8.765528, // pl_orbper
				0.082, // pl_orbsmax
				992.91, // pl_eqt
				228.913, // pl_insol
				0.493868, // pl_imppar
				0.05726987, // pl_trandep
				3.9154065, // pl_trandur
				'', // pl_ratdor
				0.02296595, // pl_ratror
				5631, // st_teff
				1.3162, // st_rad
				0.9698, // st_mass
				0.035, // st_met
				4.184, // st_logg
				'', // sy_gmag
				'', // sy_rmag
				'', // sy_imag
				'', // sy_zmag
				'', // sy_jmag
				'', // sy_hmag
				'', // sy_kmag
			],
			// Sample 7: HD 209458 b - Hot Jupiter (Osiris)
			[
				'HD 209458 b', // planet_name
				4.553370029, // pl_orbper
				0.0537, // pl_orbsmax
				1264, // pl_eqt
				603.58, // pl_insol
				0.951, // pl_imppar
				2.3692, // pl_trandep
				3.2209, // pl_trandur
				8.201, // pl_ratdor
				0.213383, // pl_ratror
				6306, // st_teff
				1.109, // st_rad
				0.991, // st_mass
				-0.36, // st_met
				4.346, // st_logg
				'', // sy_gmag
				'', // sy_rmag
				11.338, // sy_imag
				'', // sy_zmag
				'', // sy_jmag
				'', // sy_hmag
				'', // sy_kmag
			],
			// Sample 8: Kepler-22b - Temperate planet in habitable zone
			[
				'Kepler-22b', // planet_name
				52.884577, // pl_orbper
				0.2861, // pl_orbsmax
				555, // pl_eqt
				22.44, // pl_insol
				1.272, // pl_imppar
				1.1969, // pl_trandep
				7.892, // pl_trandur
				31, // pl_ratdor
				0.408862, // pl_ratror
				6483, // st_teff
				1.078, // st_rad
				1.114, // st_mass
				-0.28, // st_met
				4.42, // st_logg
				'', // sy_gmag
				'', // sy_rmag
				15.522, // sy_imag
				'', // sy_zmag
				'', // sy_jmag
				'', // sy_hmag
				'', // sy_kmag
			],
			// Sample 9: Kepler-10b - Cool Neptune
			[
				'Kepler-10b', // planet_name
				16.332995, // pl_orbper
				0.118, // pl_orbsmax
				591, // pl_eqt
				26.373, // pl_insol
				0.12, // pl_imppar
				0.0289, // pl_trandep
				2.122, // pl_trandur
				61.27, // pl_ratdor
				0.01528, // pl_ratror
				5212, // st_teff
				0.781, // st_rad
				0.798, // st_mass
				-0.11, // st_met
				4.566, // st_logg
				'', // sy_gmag
				'', // sy_rmag
				12.694, // sy_imag
				'', // sy_zmag
				'', // sy_jmag
				'', // sy_hmag
				'', // sy_kmag
			],
			// Sample 10: WASP-33b - Warm Jupiter
			[
				'WASP-33b', // planet_name
				5.25449393, // pl_orbper
				0.0602, // pl_orbsmax
				975, // pl_eqt
				213.25, // pl_insol
				0.837, // pl_imppar
				0.0169, // pl_trandep
				3.078, // pl_trandur
				7.52, // pl_ratdor
				0.013572, // pl_ratror
				5550, // st_teff
				0.954, // st_rad
				1.05, // st_mass
				'', // st_met
				4.5, // st_logg
				'', // sy_gmag
				'', // sy_rmag
				15.073, // sy_imag
				'', // sy_zmag
				'', // sy_jmag
				'', // sy_hmag
				'', // sy_kmag
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
