import { ThreadListNoSort } from "@/components/thread-list-no-sort";
import { useInitials } from "@/hooks/use-initials";
import AppLayout from "@/layouts/app-layout";
import { formatDateNoDiff } from "@/lib/utils";
import { User, BreadcrumbItem, ThreadPaginate } from "@/types";
import { Head } from "@inertiajs/react";

interface Props {
    user: User;
    threads: ThreadPaginate;
}

export default function ShowUser({ user, threads }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: `Profile - ${user.name}`,
            href: `/user/${user.name}`,
        },
    ];
    const getInitials = useInitials();
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Profile - ${user.name}`} />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto lg:p-4 items-center">
                <div className='w-full md:w-7/8 lg:w-3/4 flex flex-col gap-4'>
                    <h1 className="text-2xl font-bold text-blue">Profile</h1>
                    <div className="rounded-xl overflow-hidden shadow-lg">
                        <div className='bg-baseColor p-6 flex flex-col gap-y-2'>
                            <h2 className="text-lg font-bold">{user.name}</h2>
                            <div className="flex">
                                {user.avatar ? (
                                    <img src={`${window.location.origin}/storage/${user.avatar}`} alt={user.name} className="h-40 w-40" />
                                ) : (
                                    <div className="h-30 w-30 bg-blue text-baseColor dark:bg-crust dark:text-text flex items-center justify-center text-xl font-medium">
                                        {getInitials(user.name)}
                                    </div>
                                )}
                                <div className="ml-5">
                                    <dl className="space-y-2 text-sm">
                                        <div>
                                            <dt className="text-green font-medium">Role</dt>
                                            <dd className="text-subtext1">{user.role}</dd>
                                        </div>
                                        <div>
                                            <dt className="text-green font-medium">Status</dt>
                                            <dd className="text-subtext1">{user.status || 'No status yet'}</dd>
                                        </div>
                                        <div>
                                            <dt className="text-green font-medium">Bio</dt>
                                            <dd className="text-subtext1">{user.bio || 'No bio yet'}</dd>
                                        </div>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div className="bg-text text-baseColor flex justify-between align-center">
                            <p className="text-sm p-4">Joined: {formatDateNoDiff(user.created_at)}</p>
                            <p className="text-sm p-4">Posts: {user.posts_count ? user.posts_count : 0}</p>
                        </div>
                    </div>

                    <h1 className="text-xl font-bold text-blue">Threads</h1>
                    <ThreadListNoSort threads={threads} />

                </div>
            </div>
        </AppLayout>
    )


}