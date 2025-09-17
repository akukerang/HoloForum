import { PostList } from "@/components/post-list";
import { Button } from "@/components/ui/button";
import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import { Head, Link } from "@inertiajs/react";
import { PostPaginate, Thread } from "@/types";
import { createPost } from "@/routes/post";
import { useEffect } from "react";

interface Props {
    thread: Thread;
    posts: PostPaginate;
    flash: {
        message?: string
    };
}

const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).format(date);
};


export default function ShowThread({ thread, posts, flash }: Props) {
    useEffect(() => {
        if (flash?.message) {
            const element = document.getElementById(`post-${flash.message}`);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [flash?.message]);


    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: `${thread.title} - ${thread.forum.title}`,
            href: `/thread/${thread.forum.id}`,
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`${thread.title} - ${thread.forum.title}`} />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4 items-center">
                <div className='w-full flex flex-col gap-3'>
                    <div className='bg-base p-6 flex flex-col gap-y-2 rounded-xl shadow-md'>
                        <h1 className="text-2xl font-bold text-blue">{thread.title}</h1>
                        <p className="text-sm ">By {thread.user.name}</p>
                        <p className="text-sm text-subtext1">{formatDate(thread.created_at)} in {thread.forum.title}</p>
                    </div>
                    <div className="flex items-center h-full">
                        <Link href={createPost(thread.id).url}>
                            <Button variant="default">Reply</Button>
                        </Link>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <PostList posts={posts} thread_id={thread.id} />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
