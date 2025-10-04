import planetImage from '@assets/planet.webp';

const Background = () => {
	return (
		<div className="relative size-[1px]">
			<div className="absolute top-0 h-dvh w-dvw overflow-hidden">
				{/* Planet Image */}
				<img
					src={planetImage}
					alt="planet"
					className="h-full w-full object-cover opacity-100"
				/>

				{/* Gradient Overlay with improved mask */}
				<div className="mask-[radial-gradient(circle_at_50%_-30%,_transparent_5%,_black_60%)] absolute inset-0 bg-content1" />

				{/* Ambient Glow Effects */}
				<div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-secondary/5 mix-blend-soft-light" />
				<div className="absolute inset-0 bg-gradient-to-tr from-danger/3 via-transparent to-warning/3 mix-blend-overlay" />
			</div>
		</div>
	);
};

export { Background };
