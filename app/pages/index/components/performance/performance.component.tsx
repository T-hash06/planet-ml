import { CompassIcon } from '@phosphor-icons/react';
import { memo } from 'react';

const Chart = memo(() => {
	return (
		<div className="col-span-2 h-[28rem] rounded-large bg-content2 p-8 pt-6 pb-32">
			<h3 className="mb-8 w-full text-center font-bold text-2xl text-foreground">
				Performance Metrics
			</h3>
			<div className="relative h-full w-full">
				{Array.from({ length: 5 }, (_, i) => {
					const percentage = (100 - i * 25) / 100;

					return (
						<div
							key={percentage}
							className="absolute top-0 left-[4rem] h-[1px] w-[calc(100%-4rem)] bg-foreground/10"
							style={{ top: `${i * 25}%` }}
						>
							<span className="-left-14 -top-2.5 absolute text-foreground/50 text-sm">
								{percentage.toFixed(2)}%
							</span>
						</div>
					);
				})}

				<div className="absolute inset-0 left-[4rem] flex items-end justify-evenly">
					<div className="relative flex h-[98.6%] w-32 justify-center rounded-small bg-gradient-to-br from-primary to-secondary">
						<span className="-bottom-10 absolute text-foreground">
							Something
						</span>
					</div>
					<div className="relative flex h-[87.0%] w-32 justify-center rounded-small bg-gradient-to-br from-warning to-danger">
						<span className="-bottom-10 absolute text-foreground">
							Something
						</span>
					</div>
					<div className="relative flex h-[95.2%] w-32 justify-center rounded-small bg-gradient-to-br from-danger to-secondary">
						<span className="-bottom-10 absolute text-foreground">
							Something
						</span>
					</div>
				</div>
			</div>
		</div>
	);
});

const Performance = () => (
	<div className="mt-42 w-full">
		<h2 className="text-center font-bold text-4xl text-foreground">
			AI Performance
		</h2>

		<p className="mx-auto mt-6 max-w-2xl text-center font-light text-foreground/75 leading-7">
			Our model, `ModelName`, is trained on terabytes of cosmic data to identify
			exoplanet candidates with an impressive accuracy rate of 96.8%. This
		</p>

		<div className="mx-auto mt-16 grid w-full max-w-5xl grid-cols-[1fr_3fr] gap-10">
			<div className="flex h-full w-full flex-col items-center justify-center gap-2 place-self-center rounded-large bg-content2">
				<span className="font-bold text-5xl text-foreground">96.8%</span>
				<p className="text-foreground/60">Accuracy</p>
			</div>
			<div className="flex h-max flex-col gap-y-4 rounded-large bg-content2 p-6">
				<h3 className="font-bold text-2xl text-foreground">
					Training Methodology
				</h3>
				<div className="grid grid-cols-[6rem_1fr] gap-4">
					<div className="grid aspect-square w-full place-items-center">
						<CompassIcon className="text-secondary" size={58} />
					</div>
					<div>
						<h4 className="font-semibold text-foreground text-large">
							Cosmic data recalibration
						</h4>
						<p className="mt-1 text-foreground/80 text-small">
							Our model employs a proprietary technique called Cosmic Data
							Recalibration (CDR). This method filters stellar noise and
							enhances faint transit signals from distant exoplanets,
							significantly improving detection sensitivity and reducing false
							positives.
						</p>
					</div>
				</div>
			</div>
			<Chart />
		</div>
	</div>
);

export { Performance };
