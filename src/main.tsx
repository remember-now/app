import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { SidebarProvider } from './components/ui/sidebar';
import { ThemeProvider } from './components/theme-provider';
import { APP_ROUTES } from './config/routes';
import { AssistantProvider } from './core/assistant';
import App from './App';
import './index.css';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} position="bottom" />
      <AssistantProvider availableRoutes={APP_ROUTES}>
        <BrowserRouter>
          <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <SidebarProvider defaultOpen>
              <App />
            </SidebarProvider>
          </ThemeProvider>
        </BrowserRouter>
      </AssistantProvider>
    </QueryClientProvider>
  </StrictMode>
);
