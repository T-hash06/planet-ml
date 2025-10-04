import { Button, cn } from '@heroui/react';
import { RocketLaunchIcon } from '@phosphor-icons/react';
import { motion } from 'framer-motion';

const PageDescription = () => (
	<motion.div
		initial={{ opacity: 0, y: 20 }}
		animate={{ opacity: 1, y: 0 }}
		transition={{ duration: 0.8, delay: 0.8 }}
		className={cn([
			'flex flex-col items-center',
			'gap-8 sm:gap-10 md:gap-12',
			'mt-8 sm:mt-10 md:mt-12 lg:mt-16',
		])}
	>
		<p
			className={cn([
				'z-10 text-center text-foreground/90',
				'mt-2 sm:mt-3 md:mt-4',
				'max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl',
				'text-lg sm:text-xl md:text-2xl',
				'leading-6 sm:leading-7 md:leading-8 lg:leading-9',
				'drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]',
			])}
		>
			Explore the universe's hidden exoplanets using our advanced AI/ML models.
			Join the search for new worlds and contribute to the future of space
			exploration
		</p>
		<motion.div
			whileHover={{ scale: 1.05 }}
			whileTap={{ scale: 0.95 }}
			className="relative"
		>
			{/* Glow effect */}
			<div className="absolute inset-0 animate-pulse rounded-large bg-gradient-to-br from-primary via-secondary to-primary opacity-50 blur-xl" />

			<Button
				size="lg"
				radius="lg"
				endContent={<RocketLaunchIcon size={20} weight="duotone" />}
				className={cn([
					'relative overflow-hidden border-2 border-primary/50',
					'bg-gradient-to-br from-primary/90 via-secondary/90 to-primary/90',
					'text-foreground font-semibold shadow-lg shadow-primary/50',
					'hover:shadow-xl hover:shadow-primary/60 transition-all duration-300',
					'dark:border-primary/70 dark:shadow-primary/40',
				])}
			>
				<span className="relative z-10">Start Exploring</span>
				{/* Animated shimmer effect */}
				<motion.div
					className="absolute inset-0 bg-gradient-to-r from-transparent via-foreground/30 to-transparent"
					initial={{ x: '-100%' }}
					animate={{ x: '200%' }}
					transition={{
						duration: 2,
						repeat: Number.POSITIVE_INFINITY,
						repeatDelay: 3,
					}}
				/>
			</Button>
		</motion.div>
	</motion.div>
);

export { PageDescription };
