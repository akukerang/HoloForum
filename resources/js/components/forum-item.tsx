import { Link } from "@inertiajs/react";
import { MessagesSquare } from "lucide-react";

interface Forum {
    id: number;
    title: string;
    slug: string;
    description: string;
}


export function ForumItem({ forum }: { forum: Forum }) {
    return (
        <li className="bg-background py-4 px-6 w-full flex gap-x-8 items-center" id={forum.id.toString()}>
            {/* Icon wrapper centers the icon */}
            <div className="flex items-center justify-center w-12 h-12">
                <MessagesSquare />
            </div>

            {/* Forum info */}
            <div className="flex-1">
                <Link href="#">
                    <h1 className="text-lg hover:text-muted-foreground">{forum.title}</h1>
                </Link>
                <p className="text-sm text-muted-foreground">
                    {forum.description}
                </p>
            </div>

            {/* Post count */}
            <div className="text-center">
                <h1 className="text-lg font-bold">403</h1>
                <p className="text-sm text-muted-foreground">posts</p>
            </div>
        </li>
    );
}
