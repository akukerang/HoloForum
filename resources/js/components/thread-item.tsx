import { deleteThread, editThread, showThread } from "@/routes/thread";
import { Link, useForm, usePage } from "@inertiajs/react";
import { SharedData, Thread, Post } from "@/types";
import { SquarePen, TrashIcon, Lock, LockOpen } from "lucide-react";
import { formatDate, formatDateTime } from "@/lib/utils";
import { removeThread, toggleLockThread } from "@/routes/moderator";
import { useInitials } from "@/hooks/use-initials";

interface Props {
    thread: Thread;
}

function LatestPost({ post }: { post: Post }) {
    const getInitials = useInitials();
    return (
        <>
            <div className="max-w-1/3">
                {post.user.avatar ? (
                    <img src={`${window.location.origin}/storage/${post.user.avatar}`} alt={post.user.name} className="h-10 w-10" />
                ) : (
                    <div className="h-10 w-10 bg-blue text-baseColor dark:bg-crust dark:text-text flex items-center justify-center text-xl font-medium">
                        {getInitials(post.user.name)}
                    </div>
                )}
            </div>

            <div className="ml-2 max-w-2/3 flex flex-col">
                <p className="text-sm overflow-hidden text-ellipsis whitespace-nowrap">{post.user.name}</p>
                <p className="text-xs text-subtext0">{formatDateTime(post.created_at)}</p>
            </div>

        </>

    );
}


export function ThreadItem({ thread }: Props) {
    const page = usePage<SharedData>();
    const { auth } = page.props;

    const { processing, delete: destroy, put } = useForm();

    const handleDelete = (id: number) => {
        if (confirm("Are you sure you want to delete this thread?")) {
            destroy(deleteThread.url({ id }), {
                preserveScroll: true,
                preserveState: true,
            })
        }
    }

    const handleModDelete = (id: number) => {
        if (confirm("As a moderator/admin, do you want to delete this thread?")) {
            destroy(removeThread.url({ id }), {
                preserveScroll: true,
                preserveState: true,
            })
        }
    }

    const handleLock = (id: number) => {
        if (thread.locked) {
            if (confirm("As a moderator/admin, do you want to unlock this thread?")) {
                put(toggleLockThread.url({ id }), {
                    preserveScroll: true,
                    preserveState: true,
                })
            }
        } else {
            if (confirm("As a moderator/admin, do you want to lock this thread?")) {
                put(toggleLockThread.url({ id }), {
                    preserveScroll: true,
                    preserveState: true,
                })
            }
        }
    }

    return (
        <li className="bg-baseColor pl-4 w-full flex border-b-2" id={thread.id.toString()}>
            <div className="flex-1 w-5/10 p-4 overflow-hidden">
                <Link href={showThread(thread.id)}>
                    <h1 className="flex text-md font-bold text-yellow hover:text-yellow-500 items-center">
                        {thread.locked ? <Lock className="h-[1em] w-[1em] inline-block mr-1" /> : null}
                        {thread.title}
                    </h1>
                    <p className="text-sm text-text">By {thread.user.name}, {formatDate(thread.created_at)}</p>
                </Link>
            </div>
            <div className="hidden md:block text-center border-l-2 w-1/10 p-4 overflow-hidden">
                <h1 className="text-base font-bold">{thread.posts_count}</h1>
                <p className="text-sm text-subtext1">replies</p>
            </div>

            <div className="hidden lg:flex px-5 items-center justify-items-start border-l-2 w-1/4 overflow-hidden">
                {thread.latest_post ? <LatestPost post={thread.latest_post} /> :
                    <p className="text-sm text-subtext0 italic">No posts yet</p>
                }
            </div>
            <div className="flex w-1/10 gap-3 text-center align-middle justify-center pr-8">
                {auth.user && auth.user.id === thread.user.id ? (
                    <>
                        <button className="flex items-center" onClick={() => handleDelete(thread.id)} disabled={processing}>
                            <TrashIcon className="w-5 h-5 text-red hover:text-red-400 hover:cursor-pointer" />
                        </button>
                        <Link className="flex items-center" href={editThread(thread.id)}>
                            <SquarePen className="w-5 h-5 text-subtext1 hover:text-subtext0 hover:cursor-pointer" />
                        </Link>
                    </>

                ) :
                    auth.user.role === 'admin' || auth.user.role === 'moderator' ? (
                        <button onClick={() => handleModDelete(thread.id)} disabled={processing}>
                            <TrashIcon className="w-5 h-5 text-red hover:text-red-400 hover:cursor-pointer" />
                        </button>

                    ) : null
                }
                {auth.user.role === 'admin' || auth.user.role === 'moderator' ? (
                    <button onClick={() => handleLock(thread.id)} disabled={processing}>
                        {thread.locked ?
                            <LockOpen className="w-5 h-5 text-yellow hover:cursor-pointer" />
                            :
                            <Lock className="w-5 h-5 text-yellow hover:cursor-pointer" />
                        }
                    </button>
                ) : null}
            </div>
        </li>
    );
}
