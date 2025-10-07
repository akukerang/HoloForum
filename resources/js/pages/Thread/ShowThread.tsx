import { PostList } from "@/components/post-list";
import { Button } from "@/components/ui/button";
import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import { Head, Link, useForm } from "@inertiajs/react";
import { PostPaginate, Thread } from "@/types";
import { createPost } from "@/routes/post";
import { useEffect } from "react";
import { formatDate } from "@/lib/utils";
import { Bookmark, Lock } from "lucide-react";
import { toggleBookmark } from "@/routes/thread";

interface Props {
    thread: Thread;
    posts: PostPaginate;
    flash: {
        message?: string
    };
    bookmarked: boolean;
}


export default function ShowThread({ thread, posts, flash, bookmarked }: Props) {
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
            href: `/thread/${thread.id}`,
        },
    ];

    const { post, processing } = useForm();

    const handleBookmark = (id: number) => {
        post(toggleBookmark.url({ id }), {
            preserveScroll: true,
        });
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`${thread.title} - ${thread.forum.title}`} />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4 items-center">
                <div className='w-full flex flex-col gap-3'>
                    <div className='bg-baseColor p-6 flex flex-col gap-y-2 rounded-xl shadow-md'>
                        <div className="flex flex-row justify-between">

                            <h1 className="flex text-2xl font-bold text-blue items-center">
                                {thread.locked ? <Lock className="h-[1em] w-[1em] inline-block mr-1.5 text-yellow" /> : null}
                                {thread.title}
                            </h1>
                            <button onClick={() => handleBookmark(thread.id)} className="hover:cursor-pointer" disabled={processing}>
                                <Bookmark className={`h-5 w-5 ${bookmarked ? 'text-yellow' : 'text-text'}`} />
                            </button>

                        </div>
                        <p className="text-sm ">By {thread.user.name}</p>
                        <p className="text-sm text-subtext1">{formatDate(thread.created_at)} in {thread.forum.title}</p>
                    </div>
                    <div className="flex items-center h-full">
                        {!thread.locked ? (
                            <Link href={createPost(thread.id).url}>
                                <Button variant="default">Reply</Button>
                            </Link>
                        ) : (
                            <p className="text-sm text-red-500 italic">This thread is locked. You cannot reply.</p>
                        )}
                    </div>
                    <div className='flex flex-col gap-1'>
                        <PostList posts={posts} thread_id={thread.id} locked={thread.locked} />
                    </div>
                </div>
            </div>
        </AppLayout >
    );
}
