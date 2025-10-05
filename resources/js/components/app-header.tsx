import { Breadcrumbs } from '@/components/breadcrumbs';
import { Icon } from '@/components/icon';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { NavigationMenu, NavigationMenuItem, NavigationMenuList, navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { UserMenuContent } from '@/components/user-menu-content';
import { useInitials } from '@/hooks/use-initials';
import { cn } from '@/lib/utils';
import { login } from '@/routes';
import { type BreadcrumbItem, type NavItem, type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { LayoutGrid, Menu, Search, MessagesSquare, Bell, Bookmark, BellDot } from 'lucide-react';
import AppLogo from './app-logo';
import AppLogoIcon from './app-logo-icon';
import { searchPage } from '@/routes/thread';
import { useEffect, useState } from 'react';
import { useEchoNotification } from "@laravel/echo-react";

const mainNavItems: NavItem[] = [

    {
        title: 'Forums',
        href: '/',
        icon: MessagesSquare,
    },
    {
        title: 'Bookmarks',
        href: '/bookmarks',
        icon: Bookmark,
    },
    {
        title: 'Dashboard',
        href: '/admin',
        icon: LayoutGrid,
        requireAdmin: true,
    }
];

const activeItemStyles = 'text-blue';

interface AppHeaderProps {
    breadcrumbs?: BreadcrumbItem[];
}


type Notification = {
    type: string;
    subject: string;
    action_url: string;
}


export function AppHeader({ breadcrumbs = [] }: AppHeaderProps) {
    const page = usePage<SharedData>();
    const { auth } = page.props;
    const getInitials = useInitials();
    const userId = auth.user ? auth.user.id : 0;

    const [notifications, setNotifications] = useState<Notification[]>([]);

    useEchoNotification<Notification>(
        `App.Models.User.${userId}`,
        (e) => {
            setNotifications((prev) => [...prev, e]);
        }
    );


    return (
        <>
            <div className="border-b border-crust bg-baseColor">
                <div className="mx-auto flex h-16 items-center px-4 md:max-w-7xl">
                    {/* Mobile Menu */}
                    <div className="lg:hidden">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="mr-2 h-[34px] w-[34px]">
                                    <Menu className="h-5 w-5" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="flex h-full w-64 flex-col items-stretch justify-between bg-baseColor">
                                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                                <SheetHeader className="flex justify-start text-left">
                                    <AppLogoIcon className="h-6 w-6 fill-current" />
                                </SheetHeader>
                                <div className="flex h-full flex-1 flex-col space-y-4 p-4">
                                    <div className="flex h-full flex-col justify-between text-sm">
                                        <div className="flex flex-col space-y-4">
                                            {mainNavItems.map((item) => (
                                                (!item.requireAdmin || (item.requireAdmin && auth.user && auth.user.role === 'admin')) ? (
                                                    <Link key={item.title} href={item.href} className="flex items-center space-x-2 font-medium">
                                                        {item.icon && <Icon iconNode={item.icon} className="h-5 w-5" />}
                                                        <span>{item.title}</span>
                                                    </Link>
                                                ) : null
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>

                    <Link href="/" prefetch className="flex items-center space-x-2">
                        <AppLogo />
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="ml-6 hidden h-full items-center space-x-6 lg:flex">
                        <NavigationMenu className="flex h-full items-stretch">
                            <NavigationMenuList className="flex h-full items-stretch space-x-2">
                                {mainNavItems.map((item, index) => (
                                    (!item.requireAdmin || (item.requireAdmin && auth.user && auth.user.role === 'admin')) ? (
                                        <NavigationMenuItem key={index} className="relative flex h-full items-center">
                                            <Link
                                                href={item.href}
                                                className={cn(
                                                    navigationMenuTriggerStyle(),
                                                    page.url === (typeof item.href === 'string' ? item.href : item.href.url) && activeItemStyles,
                                                    'h-9 cursor-pointer px-3',
                                                )}
                                            >
                                                {item.icon && <Icon iconNode={item.icon} className="mr-2 h-4 w-4" />}
                                                {item.title}
                                            </Link>
                                            {page.url === item.href && (
                                                <div className="absolute bottom-0 left-0 h-0.5 w-full translate-y-px bg-blue"></div>
                                            )}
                                        </NavigationMenuItem>
                                    ) : null
                                ))}
                            </NavigationMenuList>
                        </NavigationMenu>
                    </div>

                    <div className="ml-auto flex items-center space-x-2">
                        <div className="relative flex items-center space-x-1">
                            <Button variant="ghost" size="icon" className="group h-9 w-9 cursor-pointer">
                                <Link href={searchPage()} >
                                    <Search className="!size-5 opacity-80 group-hover:opacity-100" />
                                </Link>
                            </Button>
                            {/* Notifications */}
                            {auth.user ? (
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon" className="group h-9 w-9 cursor-pointer">
                                            <Link href="#" >
                                                {notifications.length > 0 ? (
                                                    <BellDot className="!size-5 opacity-80 group-hover:opacity-100" />
                                                ) :
                                                    <Bell className="!size-5 opacity-80 group-hover:opacity-100" />

                                                }
                                            </Link>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-56" align="end">
                                        {notifications.length > 0 ? (
                                            notifications.map((notification, index) => (
                                                <div key={index}>{notification.subject}</div>
                                            ))
                                        ) : (
                                            <div>No New Notifications</div>
                                        )}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            ) : null}
                        </div>
                        {auth.user ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="size-10 rounded-full p-1">
                                        <Avatar className="size-8 overflow-hidden rounded-full">
                                            <AvatarImage src={`${window.location.origin}/storage/${auth.user.avatar}`} alt={auth.user.name} />
                                            <AvatarFallback className="rounded-lg bg-blue text-baseColor dark:text-text dark:bg-crust">

                                                {getInitials(auth.user.name)}
                                            </AvatarFallback>
                                        </Avatar>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56" align="end">
                                    <UserMenuContent user={auth.user} />
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) :
                            <Link href={login()} className="ml-2">
                                <Button>Login</Button>
                            </Link>
                        }

                    </div>
                </div>
            </div>
            {breadcrumbs.length > 1 && (
                <div className="flex w-full border-b border-crust">
                    <div className="mx-auto flex h-12 w-full items-center justify-start px-4  md:max-w-7xl">
                        <Breadcrumbs breadcrumbs={breadcrumbs} />
                    </div>
                </div>
            )}
        </>
    );
}
