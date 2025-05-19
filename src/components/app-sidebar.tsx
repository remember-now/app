import {
  ChevronUp,
  ChevronRight,
  LogOut,
  User2,
  LucideShield,
  ShipWheel,
  LucideLifeBuoy,
  MessageSquare,
  Brain,
  Settings2,
  LucideDollarSign,
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import { Link, useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { LucideIcon } from 'lucide-react';
import { Collapsible, CollapsibleContent } from './ui/collapsible';
import { useState } from 'react';

const headerGroup: CollapsibleItem = {
  title: 'Dashboard',
  url: `/dashboard`,
  icon: ShipWheel,
  children: [
    {
      title: 'Overview',
      url: '/dashboard?goto=overview',
    },
  ],
};

const navGroup: NavItem[] = [
  {
    title: 'Chat',
    url: '/chat',
    icon: MessageSquare,
  },
  {
    title: 'Memories',
    url: '/memories',
    icon: Brain,
  },
];

const controlsGroup: CollapsibleItem = {
  title: 'Settings',
  url: '/settings',
  icon: Settings2,
  children: [
    {
      title: 'General',
      url: '/settings?goto=general',
    },
    {
      title: 'Limits',
      url: '/settings?goto=limits',
    },
  ],
};

const infoGroup: CollapsibleItem = {
  title: 'Help',
  url: '/help',
  icon: LucideLifeBuoy,
  children: [
    {
      title: 'FAQ',
      url: '/help?goto=faq',
    },
    {
      title: 'File ticket',
      url: '/help?goto=ticket',
    },
  ],
};

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
  const location = useLocation();
  const searchParams = useSearchParams()[0];

  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
    RememberNow: false,
    Controls: false,
    Help: false,
  });

  const handleMenuItemClick = (item: UserMenuItem) => {
    if (item.action.type === 'link') {
      navigate(item.action.destination);
    } else if (item.action.type === 'callback') {
      item.action.handler();
    }
  };

  const toggleGroup = (groupName: string, on: boolean = false) => {
    setOpenGroups((prev) => ({
      ...prev,
      [groupName]: on || !prev[groupName],
    }));
  };

  const isCurrentPath = (path: string) => {
    const currentPath =
      location.pathname + (searchParams.size > 0 ? '?' + searchParams.toString() : '');
    return currentPath === path;
  };

  function makeSidebarGroup(items: NavItem[], label?: string): JSX.Element {
    return (
      <SidebarGroup>
        {label && <SidebarGroupLabel>{label}</SidebarGroupLabel>}

        <SidebarGroupContent>
          <SidebarMenu>
            {items.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild isActive={isCurrentPath(item.url)}>
                  <Link to={item.url}>
                    {item.icon && <item.icon className="h-5 w-5" />}
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    );
  }

  function makeCollapsibleGroup(item: CollapsibleItem, label?: string): JSX.Element {
    const groupKey = label || item.title;
    const isOpen = openGroups[groupKey] || false;
    const isActive = isCurrentPath(item.url);

    return (
      <SidebarGroup>
        {label && <SidebarGroupLabel>{label}</SidebarGroupLabel>}

        <SidebarGroupContent>
          <SidebarMenu>
            <Collapsible open={isOpen} className="group/collapsible">
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={isActive}
                  onClick={() => {
                    navigate(item.url);
                    if (isActive) {
                      toggleGroup(groupKey);
                    } else {
                      toggleGroup(groupKey, true);
                    }
                  }}
                  className="cursor-pointer"
                >
                  {item.icon && <item.icon className="h-4 w-3.5" />}
                  <span>{item.title}</span>
                </SidebarMenuButton>

                <SidebarMenuBadge
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleGroup(groupKey);
                  }}
                  className="cursor-pointer"
                >
                  <ChevronRight
                    className={`h-4 w-4 transition-transform duration-200 ease-in-out ${
                      isOpen ? 'rotate-90' : ''
                    }`}
                  />
                </SidebarMenuBadge>
              </SidebarMenuItem>

              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.children.map((subItem) => (
                    <SidebarMenuItem key={subItem.title}>
                      <SidebarMenuButton asChild isActive={isCurrentPath(subItem.url)}>
                        <Link to={subItem.url}>
                          {subItem.icon && <subItem.icon className="h-5 w-5" />}
                          <span>{subItem.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </Collapsible>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    );
  }

  return (
    <Sidebar collapsible="icon">
      <SidebarContent className="overflow-x-hidden">
        <div className="mt-1 min-h-30">{makeCollapsibleGroup(headerGroup, 'RememberNow')}</div>
        {makeSidebarGroup(navGroup)}
        <SidebarSeparator className="ml-0 mt-2 mb-2" />
        <div className="min-h-40 mb-55">{makeCollapsibleGroup(controlsGroup, 'Controls')}</div>
        {makeCollapsibleGroup(infoGroup, 'Info')}
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User2 className="h-5 w-5" />
                  Username
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
                      {item.icon && <item.icon className="h-5 w-5" />}
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
  icon?: LucideIcon;
};

type CollapsibleItem = {
  title: string;
  url: string;
  icon?: LucideIcon;
  children: NavItem[];
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
