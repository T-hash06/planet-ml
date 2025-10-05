import { index, route, type RouteConfig } from '@react-router/dev/routes';

export default [
    index('pages/index/index.page.tsx'),
    route('exoplanet', 'pages/exoplanet/exoplanet.page.tsx'),
] satisfies RouteConfig;
