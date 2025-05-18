import {
  ChevronUp,
  Home,
  Inbox,
  LogOut,
  Settings,
  User2,
  LucideDollarSign,
  LucideShield,
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { Link, useNavigate } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { LucideIcon } from 'lucide-react';

const navItems: NavItem[] = [
  {
    title: 'Home',
    url: '/',
    icon: Home,
  },
  {
    title: 'Memories',
    url: '/memories',
    icon: Inbox,
  },
  {
    title: 'Settings',
    url: '/settings',
    icon: Settings,
  },
];

const userMenuItems: UserMenuItem[] = [
  {
    title: 'Account',
    icon: LucideShield,
    action: { type: 'link', destination: '/account' },
  },
  {
    title: 'Billing',
    icon: LucideDollarSign,
    action: { type: 'link', destination: '/billing' },
  },
  {
    title: 'Sign out',
    icon: LogOut,
    action: { type: 'callback', handler: () => console.log('Signing out... (placeholder)') },
  },
];

export function AppSidebar() {
  const navigate = useNavigate();

  const handleMenuItemClick = (item: UserMenuItem) => {
    if (item.action.type === 'link') {
      navigate(item.action.destination);
    } else if (item.action.type === 'callback') {
      item.action.handler();
    }
  };

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>RememberNow</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User2 /> Username
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[var(--radix-dropdown-menu-trigger-width)]"
              >
                {userMenuItems.map((item) => (
                  <DropdownMenuItem key={item.title} onSelect={() => handleMenuItemClick(item)}>
                    <div className="flex items-center gap-2">
                      {item.icon && <item.icon className="h-4 w-4" />}
                      <span>{item.title}</span>
                    </div>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

type NavItem = {
  title: string;
  url: string;
  icon: LucideIcon;
};

type ActionLink = {
  type: 'link';
  destination: string;
};

type ActionCallback = {
  type: 'callback';
  handler: () => void;
};

type UserMenuItem = {
  title: string;
  icon: LucideIcon | null;
  action: ActionLink | ActionCallback;
};
