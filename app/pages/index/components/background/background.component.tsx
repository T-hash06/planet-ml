import planetImage from '@assets/planet.webp';

const Background = () => {
	return (
		<div className="-z-10 fixed h-dvh w-dvw">
			<img
				src={planetImage}
				alt="planet"
				className="h-full w-full object-cover opacity-100"
			/>
			<div className="mask-[radial-gradient(circle_at_50%_-30%,_transparent_5%,_black_60%)] absolute inset-0 bg-content1"></div>
		</div>
	);
};

export { Background };
