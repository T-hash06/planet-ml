/**
 * Tabular Form Context
 * Provides TanStack Form instance to child components via React Context
 * Ensures type-safe access to form state throughout the component tree
 */

import { createContext, useContext } from 'react';

/**
 * Type definition for the tabular form values
 * Maps parameter names to their numeric values
 */
export type TabularFormValues = Record<string, number>;

/**
 * Type for the TanStack Form API instance
 * Using a simplified type that captures the essential form API
 * This avoids the complexity of FormApi's 11+ generic parameters
 */
export type TabularFormApi = unknown;

/**
 * Context for sharing the TanStack Form instance
 * Initialized with undefined to enforce proper provider usage
 */
const TabularFormContext = createContext<TabularFormApi | undefined>(undefined);

/**
 * Provider component props
 */
interface TabularFormProviderProps {
	/** The TanStack Form instance to provide */
	form: TabularFormApi;
	/** Child components that need access to the form */
	children: React.ReactNode;
}

/**
 * Provider component that makes the form instance available to all children
 * Wrap your component tree with this provider to enable form context access
 *
 * @example
 * ```tsx
 * const form = useForm({ ... });
 * return (
 *   <TabularFormProvider form={form}>
 *     <YourComponents />
 *   </TabularFormProvider>
 * );
 * ```
 */
export function TabularFormProvider({
	form,
	children,
}: TabularFormProviderProps) {
	return (
		<TabularFormContext.Provider value={form}>
			{children}
		</TabularFormContext.Provider>
	);
}

/**
 * Custom hook to access the tabular form instance from context
 * Throws an error if used outside of a TabularFormProvider
 *
 * @returns The TanStack Form instance
 * @throws Error if used outside of TabularFormProvider
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const form = useTabularForm();
 *   const value = useStore(form.store, (state) => state.values.pl_trandep);
 *   return <div>{value}</div>;
 * }
 * ```
 */
export function useTabularForm(): TabularFormApi {
	const context = useContext(TabularFormContext);

	if (context === undefined) {
		throw new Error(
			'useTabularForm must be used within a TabularFormProvider. ' +
				'Make sure to wrap your component tree with <TabularFormProvider>.',
		);
	}

	return context;
}
