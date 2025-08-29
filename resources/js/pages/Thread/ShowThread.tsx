import { PostList } from "@/components/post-list";
import { Button } from "@/components/ui/button";
import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import { Head, Link } from "@inertiajs/react";



interface Thread {
    title: string;
    user: User;
    forum: Forum;
    created_at: string;
    posts: Post[];
}

interface User {
    id: string;
    name: string;
}

interface Forum {
    title: string;
}

interface Post {
    id: number;
    content: string;
    user: User;
    created_at: string;
}

interface Props {
    thread: Thread
}


const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).format(date);
};


export default function ShowThread({ thread }: Props) {

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Forum',
            href: '/forum',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Forum" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4 bg-secondary items-center">
                <div className='w-full flex flex-col gap-4'>
                    <div className='bg-card p-6 flex flex-col gap-y-2 rounded-xl shadow-sm'>
                        <h1 className="text-2xl font-bold">{thread.title}</h1>
                        <p className="text-sm ">By {thread.user.name}</p>
                        <p className="text-sm text-muted-foreground">{formatDate(thread.created_at)} in {thread.forum.title}</p>

                    </div>
                    <div className="flex items-center h-full">
                        <Link href={`#`}>
                            <Button variant="default">Reply</Button>
                        </Link>
                    </div>
                    <div className='flex flex-col my-4 gap-1'>
                        <PostList posts={thread.posts} />
                    </div>

                </div>
            </div>
        </AppLayout>
    );
}
