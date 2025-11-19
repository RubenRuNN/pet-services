'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { routes } from '@/config/routes';
import {
  LayoutDashboard,
  Users,
  PawPrint,
  Calendar,
  Briefcase,
  UsersRound,
  ClipboardList,
  BarChart3,
  Settings,
} from 'lucide-react';

const navigation = [
  { name: 'dashboard', href: routes.dashboard.root, icon: LayoutDashboard },
  { name: 'customers', href: routes.dashboard.customers, icon: Users },
  { name: 'pets', href: routes.dashboard.pets, icon: PawPrint },
  { name: 'appointments', href: routes.dashboard.appointments, icon: Calendar },
  { name: 'services', href: routes.dashboard.services, icon: Briefcase },
  { name: 'staff', href: routes.dashboard.staff, icon: UsersRound },
  { name: 'tasks', href: routes.dashboard.tasks, icon: ClipboardList },
  { name: 'analytics', href: routes.dashboard.analytics, icon: BarChart3 },
  { name: 'settings', href: routes.dashboard.settings, icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const t = useTranslations('navigation');

  return (
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href={routes.dashboard.root} className="flex items-center gap-2 font-semibold">
            <PawPrint className="h-6 w-6" />
            <span className="hidden lg:inline-block">Pet Services</span>
          </Link>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                    isActive && 'bg-muted text-primary',
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {t(item.name)}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
}

