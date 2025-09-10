import { editThread, removeThread, showThread } from "@/routes/thread";
import { Link, useForm } from "@inertiajs/react";
import { Thread, User } from "@/types";
import { SquarePen, TrashIcon } from "lucide-react";

const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).format(date);
};

interface Props {
    thread: Thread;
    user: User;
}


export function ThreadItem({ thread, user }: Props) {
    const { processing, delete: destroy } = useForm();

    const handleDelete = (id: number) => {
        if (confirm("Are you sure you want to delete this thread?")) {
            destroy(removeThread.url({ id }))
        }
    }

    return (
        <li className="bg-background py-4 px-8 w-full flex gap-x-8 items-center border-b" id={thread.id.toString()}>
            <div className="flex-1">
                <Link href={showThread(thread.id)}>
                    <h1 className="text-md font-bold hover:text-muted-foreground ">{thread.title}</h1>
                    <p className="text-sm text-muted-foreground">By {thread.user.name}, {formatDate(thread.created_at)}</p>
                    <p className="text-xs text-muted-foreground">{thread.posts_max_created_at ? `Last updated: ${formatDate(thread.posts_max_created_at)}` : "No replies"}</p>

                </Link>
            </div>
            <div className="text-center">
                <h1 className="text-lg font-bold">{thread.posts_count}</h1>
                <p className="text-sm text-muted-foreground">replies</p>
            </div>
            <div className="w-8 flex gap-2 text-center align-middle justify-center">
                {user.id === thread.user.id ? (
                    <>
                        <button className="flex items-center" onClick={() => handleDelete(thread.id)} disabled={processing}>
                            <TrashIcon className="text-destructive hover:cursor-pointer" />
                        </button>
                        <Link className="flex items-center" href={editThread(thread.id)}>
                            <SquarePen className="text-muted-foreground hover:cursor-pointer" />
                        </Link>
                    </>
                ) : null}
            </div>
        </li>
    );
}
