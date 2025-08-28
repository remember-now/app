import Dashboard from '../pages/Dashboard';
import Chat from '../pages/Chat';
import Memories from '../pages/Memories';
import Settings from '../pages/Settings';
import Help from '../pages/Help';
import Account from '../pages/Account';
import Billing from '../pages/Billing';

export const ROUTE_CONFIG = {
  chat: { path: '/chat', element: <Chat /> },
  dashboard: { path: '/dashboard', element: <Dashboard /> },
  memories: { path: '/memories', element: <Memories /> },
  settings: { path: '/settings', element: <Settings /> },
  help: { path: '/help', element: <Help /> },
  account: { path: '/account', element: <Account /> },
  billing: { path: '/billing', element: <Billing /> },
} as const;

export const APP_ROUTES = Object.keys(ROUTE_CONFIG);
