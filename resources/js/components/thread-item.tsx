import { editThread, removeThread, showThread } from "@/routes/thread";
import { Link, useForm, usePage } from "@inertiajs/react";
import { SharedData, Thread } from "@/types";
import { SquarePen, TrashIcon } from "lucide-react";
import { formatDate, formatDateTime } from "@/lib/utils";

interface Props {
    thread: Thread;
}


export function ThreadItem({ thread }: Props) {
    const page = usePage<SharedData>();
    const { auth } = page.props;

    const { processing, delete: destroy } = useForm();

    const handleDelete = (id: number) => {
        if (confirm("Are you sure you want to delete this thread?")) {
            destroy(removeThread.url({ id }))
        }
    }

    return (
        <li className="bg-baseColor py-4 px-8 w-full flex gap-x-8 items-center border-b" id={thread.id.toString()}>
            <div className="flex-1">
                <Link href={showThread(thread.id)}>
                    <h1 className="text-md font-bold text-yellow hover:text-yellow-500 ">{thread.title}</h1>
                    <p className="text-sm text-text">By {thread.user.name}, {formatDate(thread.created_at)}</p>
                    <p className="text-xs text-subtext0">{thread.posts_max_created_at ? `Last updated: ${formatDateTime(thread.posts_max_created_at)}` : "No replies"}</p>

                </Link>
            </div>
            <div className="text-center">
                <h1 className="text-lg font-bold">{thread.posts_count}</h1>
                <p className="text-sm text-subtext1">replies</p>
            </div>
            <div className="w-8 flex gap-3 text-center align-middle justify-center">
                {auth.user && auth.user.id === thread.user.id ? (
                    <>
                        <button className="flex items-center" onClick={() => handleDelete(thread.id)} disabled={processing}>
                            <TrashIcon className="w-5 h-5 text-red hover:text-red-400 hover:cursor-pointer" />
                        </button>
                        <Link className="flex items-center" href={editThread(thread.id)}>
                            <SquarePen className="w-5 h-5 text-subtext1 hover:text-subtext0 hover:cursor-pointer" />
                        </Link>
                    </>

                ) : null}
            </div>
        </li>
    );
}
