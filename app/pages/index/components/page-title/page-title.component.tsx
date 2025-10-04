import { cn } from '@heroui/react';
import { motion } from 'framer-motion';

const PageTitle = () => {
	return (
		<motion.h1
			initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
			animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
			transition={{ duration: 0.8, ease: 'easeOut' }}
			className={cn([
				'relative z-10 flex flex-col text-center font-extrabold',
				'mt-16 sm:mt-20 md:mt-24 lg:mt-32',
				'text-[3rem] sm:text-[4rem] md:text-[5rem] lg:text-[6rem]',
				'leading-[3rem] sm:leading-[4rem] md:leading-[5rem] lg:leading-[6rem]',
			])}
		>
			<motion.span
				initial={{ opacity: 0, x: -20 }}
				animate={{ opacity: 1, x: 0 }}
				transition={{ duration: 0.6, delay: 0.2 }}
				className="text-foreground/90 drop-shadow-[0_0_15px_rgba(255,255,255,0.15)]"
			>
				Uncover
			</motion.span>
			<motion.span
				initial={{ opacity: 0, scale: 0.9 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ duration: 0.6, delay: 0.4 }}
				className="text-foreground/90 drop-shadow-[0_0_15px_rgba(255,255,255,0.15)]"
			>
				new{' '}
				<span className="relative inline-block">
					<span className="absolute inset-0 animate-pulse bg-gradient-to-br from-danger via-warning to-danger bg-clip-text opacity-40 blur-lg" />
					<span className="relative bg-gradient-to-br from-danger via-warning to-danger bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(255,100,100,0.4)]">
						worlds
					</span>
				</span>
			</motion.span>
			<motion.span
				initial={{ opacity: 0, x: 20 }}
				animate={{ opacity: 1, x: 0 }}
				transition={{ duration: 0.6, delay: 0.6 }}
				className="relative"
			>
				<span className="absolute inset-0 animate-pulse bg-gradient-to-br from-secondary-600 via-primary-600 to-secondary-600 bg-clip-text opacity-40 blur-lg" />
				<span className="relative bg-gradient-to-br from-secondary-600 via-primary-600 to-secondary-600 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(100,100,255,0.4)]">
					with AI✨
				</span>
			</motion.span>
		</motion.h1>
	);
};

export { PageTitle };
