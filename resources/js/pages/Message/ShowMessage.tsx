import { useInitials } from "@/hooks/use-initials";
import AppLayout from "@/layouts/app-layout";
import { capitalize, formatDateNoDiff, rolesSwitch } from "@/lib/utils";
import { User, BreadcrumbItem } from "@/types";
import { Head } from "@inertiajs/react";

interface Message {
    sender: User;
    receiver: User;
    message: string;
    created_at: string;
}

interface Props {
    currentUser: User;
    targetUser: User;
    messages: Message[];
}

export default function ShowUser({ currentUser, targetUser, messages }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: `Messages - ${targetUser.name}`,
            href: `/messages/${targetUser.name}`,
        },
    ];
    const getInitials = useInitials();
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Messages - ${targetUser.name}`} />
            <div className="flex h-full flex-1 flex-col gap-2 overflow-x-auto lg:px-4 pt-4 items-center">
                <div className='w-full md:w-7/8 lg:w-3/4 flex flex-col'>
                    <h1 className="text-2xl font-bold text-blue mb-1">Messages</h1>

                </div>
            </div>
        </AppLayout>
    )


}