import { index, type RouteConfig, route } from '@react-router/dev/routes';

export default [
	index('pages/index/index.page.tsx'),
	route('app', 'pages/app/app.layout.tsx', [
		index('pages/app/app.page.tsx'),
		route('tabular', 'pages/app/tabular/tabular.page.tsx'),
		route('curves', 'pages/app/curves/curves.page.tsx'),
	]),
] satisfies RouteConfig;
