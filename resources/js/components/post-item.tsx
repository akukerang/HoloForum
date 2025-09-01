import { deleteMethod } from "@/routes/post";
import { useForm } from "@inertiajs/react";
import { TrashIcon } from "lucide-react";

interface Post {
    id: number;
    content: string;
    user: User;
    created_at: string;
}

interface User {
    id: number;
    name: string;
}

interface Props {
    post: Post;
    currentUser: User;
}


const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).format(date);
};

export function PostItem({ post, currentUser }: Props) {

    const { processing, delete: destroy } = useForm();

    const handleDelete = (id: number) => {
        if (confirm("Do you want to delete this post?")) {
            destroy(deleteMethod.url({ id }))
        }
    }

    return (
        <li className="py-4 px-2 w-full flex gap-x-8 items-center" id={post.id.toString()}>
            <div className="flex flex-col items-center gap-y-2 w-1/8">
                <img src="https://avatars.steamstatic.com/b5bd56c1aa4644a474a2e4972be27ef9e82e517e_full.jpg" alt={post.user.name} className="h-16" />
                <h1 className="font-bold">{post.user.name}</h1>
            </div>
            <div className="w-7/8 flex flex-row">
                <div className="flex-1 px-6 py-8 rounded-xl border-2 shadow-xs">
                    <p className="text-sm text-muted-foreground pb-4">Posted {formatDate(post.created_at)}</p>
                    <h1 className="text-sm">{post.content}</h1>
                </div>
                <div className="p-2">
                    {
                        currentUser.id === post.user.id && (
                            <button className="flex items-center" onClick={() => handleDelete(post.id)} disabled={processing}>
                                <TrashIcon className="text-red-500 hover:cursor-pointer" />
                            </button>
                        )
                    }
                </div>
            </div>
        </li>
    );
}
