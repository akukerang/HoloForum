import { showThread } from "@/routes/thread";
import { Link } from "@inertiajs/react";

interface Thread {
    id: number;
    title: string;
    user: User;
    created_at: string;
    posts_count: number;
}

interface User {
    id: number;
    name: string;
}

const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).format(date);
};

export function ThreadItem({ thread }: { thread: Thread }) {
    return (
        <li className="bg-background py-4 px-8 w-full flex gap-x-8 items-center border-b" id={thread.id.toString()}>
            <div className="flex-1">
                <Link href={showThread(thread.id)}>
                    <h1 className="text-md font-bold hover:text-muted-foreground ">{thread.title}</h1>
                    <p className="text-sm text-muted-foreground">By {thread.user.name}, {formatDate(thread.created_at)}</p>

                </Link>
            </div>
            <div className="text-center">
                <h1 className="text-lg font-bold">{thread.posts_count}</h1>
                <p className="text-sm text-muted-foreground">replies</p>
            </div>
        </li>
    );
}
