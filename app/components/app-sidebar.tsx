import React from 'react'
import NavFooter from '~/components/nav-footer';
import NavMain from '~/components/nav-main';
import NavUser from '~/components/nav-user';
import { 
    LayoutGrid,
    Camera,
    Logs,
    ClipboardClock,
    UserCog
} from 'lucide-react';

import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '~/components/ui/sidebar';
import AppLogo from './app-logo';
import { Link } from 'react-router';

import type { NavItem } from '../types';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/',
        icon: LayoutGrid,
    },
    {
        title: 'Logs',
        href: '/page/logs',
        icon: Logs,
    },
    {
        title: 'Weigh and Snap',
        href: '/page/weigh-and-snap',
        icon: Camera,
    }
];


const footerNavItems: NavItem[] = [
    {
        title: 'Controller`s Shedule',
        href: '/settings/controllers-shedule',
        icon: ClipboardClock,
    },
    {
        title: 'User Management',
        href: '/settings/users-settings',
        icon: UserCog,
    },
];

const AppSidebar = () => {
    return (

        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link to="/dashboard">
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} name="Main" />
                {/* <NavMain items={employeeNavItems} name="Employee Management" /> */}
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    )
}

export default AppSidebar