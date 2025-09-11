import { InertiaLinkProps } from '@inertiajs/react';
import { LucideIcon } from 'lucide-react';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: NonNullable<InertiaLinkProps['href']>;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface Forum {
    id: number;
    title: string;
    slug: string;
    description: string;
    parent_forum_id: number | null;
    threads_count: number;
    created_at: string;
}

export interface Thread {
    id: number;
    title: string;
    user: User;
    forum: Forum;
    posts_count: number | null;
    posts_max_created_at?: string | null;
    created_at: string;
}

export interface ThreadPaginate {
    data: Thread[];
    links: {
        url: string;
        label: string;
        active: boolean;
    }[]
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

export interface Post {
    id: number;
    content: string;
    user: User;
    thread: Thread;
    reactions_count?: number;
    liked?: boolean;
    created_at: string;
}

interface PostPaginate {
    data: Post[];
    links: {
        url: string;
        label: string;
        active: boolean;
    }[]
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}