import { Outlet } from 'react-router-dom';
import { SidebarTrigger } from '@/components/ui/sidebar';
import ReloadPrompt from '../pwa/ReloadPrompt';
import { AppSidebar } from '../app-sidebar';

export default function AppLayout() {
  return (
    <div className="flex min-h-screen w-screen">
      <AppSidebar />

      <div className="flex flex-1 relative">
        <div className="absolute top-3 left-3">
          <SidebarTrigger />
        </div>

        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>

        <ReloadPrompt />
      </div>
    </div>
  );
}
