import { motion } from 'framer-motion';
import { memo, useMemo } from 'react';

// Seeded pseudo-random number generator for deterministic star positions
// This ensures server and client generate the same star positions
const seededRandom = (seed: number) => {
	let value = seed;
	return () => {
		value = (value * 9301 + 49297) % 233280;
		return value / 233280;
	};
};

const StarsBackground = memo(() => {
	// Generate deterministic stars with memoization for performance
	// Using seeded random ensures SSR and client hydration match
	const stars = useMemo(() => {
		const random = seededRandom(42); // Fixed seed for consistency
		return Array.from({ length: 100 }, (_, i) => ({
			id: i,
			x: random() * 100,
			y: random() * 100,
			size: random() * 2 + 1,
			delay: random() * 3,
			duration: random() * 3 + 2,
			repeatDelay: random() * 2, // Deterministic repeat delay
		}));
	}, []);

	return (
		<div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
			{/* Animated Stars Layer */}
			{stars.map((star) => (
				<motion.div
					key={star.id}
					className="absolute rounded-full bg-foreground"
					style={{
						left: `${star.x}%`,
						top: `${star.y}%`,
						width: `${star.size}px`,
						height: `${star.size}px`,
					}}
					initial={{ opacity: 0, scale: 0 }}
					animate={{
						opacity: [0, 1, 0.8, 1, 0],
						scale: [0, 1, 1.2, 1, 0],
					}}
					transition={{
						duration: star.duration,
						delay: star.delay,
						repeat: Number.POSITIVE_INFINITY,
						repeatDelay: star.repeatDelay,
					}}
				/>
			))}
		</div>
	);
});

export { StarsBackground };
