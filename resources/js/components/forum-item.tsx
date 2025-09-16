import { Link } from "@inertiajs/react";
import { MessagesSquare } from "lucide-react";
import { Forum } from "@/types";


export function ForumItem({ forum }: { forum: Forum }) {
    return (
        <li className="py-4 px-6 w-full flex gap-x-8 items-center border-b" id={forum.id.toString()}>
            <div className="flex items-center justify-center w-12 h-12">
                <MessagesSquare className="text-peach" />
            </div>

            <div className="flex-1">
                <Link href={`forum/${forum.id}`}>
                    <h1 className="text-lg font-bold text-blue hover:text-blue-600">{forum.title}</h1>
                </Link>
                <p className="text-sm">
                    {forum.description}
                </p>
            </div>

            <div className="text-center">
                <h1 className="text-lg font-bold">{forum.threads_count}</h1>
                <p className="text-sm">Threads</p>
            </div>
        </li>
    );
}
