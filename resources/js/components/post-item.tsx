import { deleteMethod, toggleReaction } from "@/routes/post";
import { router, useForm } from "@inertiajs/react";
import { ThumbsUp, TrashIcon } from "lucide-react";
import { Post, User } from "@/types";

interface Props {
    postData: Post;
    currentUser: User;
}

const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).format(date);
};

export function PostItem({ postData, currentUser }: Props) {

    const { post, processing, delete: destroy } = useForm();


    const handleDelete = (id: number) => {
        if (confirm("Do you want to delete this post?")) {
            destroy(deleteMethod.url({ id }))
        }
    }

    const handleLike = (id: number) => {
        post(toggleReaction.url({ id }), {
            preserveScroll: true,
            onSuccess: () => {
                router.reload({ only: ["posts"] });
            }
        })
    }

    return (
        <li className="py-4 px-4 w-full flex gap-x-8 items-center" id={postData.id.toString()}>
            <div className="flex flex-col items-center gap-y-2 w-1/8">
                <img src="https://avatars.steamstatic.com/b5bd56c1aa4644a474a2e4972be27ef9e82e517e_full.jpg" alt={postData.user.name} className="h-16" />
                <h1 className="font-bold">{postData.user.name}</h1>
            </div>
            <div className="w-7/8 flex flex-col px-6 py-5 rounded-xl border-2 shadow-xs align-top justify-items-start">
                <div className="flex flex-row justify-between pb-2">
                    <p className="text-sm text-muted-foreground ">Posted {formatDate(postData.created_at)}</p>
                    {
                        currentUser.id === postData.user.id && (
                            <button className="flex items-center" onClick={() => handleDelete(postData.id)} disabled={processing}>
                                <TrashIcon className="text-destructive hover:cursor-pointer" />
                            </button>
                        )
                    }
                </div>
                <p className="text-sm align-text-top pb-2">{postData.content}</p>
                <div className="flex flex-row items-center gap-x-1 text-sm">
                    {postData.liked ? (
                        <ThumbsUp className="w-4 h-4 text-blue-500 hover:cursor-pointer" onClick={() => handleLike(postData.id)} />
                    ) : (
                        <ThumbsUp className="w-4 h-4 text-muted-foreground hover:cursor-pointer" onClick={() => handleLike(postData.id)} />
                    )}
                    {postData.reactions_count && postData.reactions_count > 0 ? postData.reactions_count : null}
                </div>


            </div>

        </li>
    );
}
