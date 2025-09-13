import { deleteMethod, toggleReaction } from "@/routes/post";
import { router, useForm } from "@inertiajs/react";
import { Reply, ThumbsUp, TrashIcon } from "lucide-react";
import { Post, User } from "@/types";
import QuoteReply from "./quote-reply";

interface Props {
    postData: Post;
    currentUser: User;
}

const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric' }).format(date);
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
        <li className="w-full flex items-stretch border-2" id={`post-${postData.id.toString()}`}>
            <div className="flex flex-col py-4 text-center justify-center items-center gap-y-2 w-1/8">
                {/* Profile Info: Username, Avatar, Bio */}
                <img src="https://avatars.steamstatic.com/b5bd56c1aa4644a474a2e4972be27ef9e82e517e_full.jpg" alt={postData.user.name} className="h-16" />
                <h1 className="font-bold">{postData.user.name}</h1>
            </div>

            <div className="flex flex-col w-7/8 border-l-2 px-4 py-4 justify-between">
                <div>
                    {/* User, Date, Trash, Reply */}
                    <div className="flex flex-row justify-between pb-2">
                        <p className="text-sm text-muted-foreground ">Posted by {postData.user.name} at {formatDate(postData.created_at)}</p>
                        <div className="flex flex-row gap-x-2 align-center justify-center">
                            {currentUser.id === postData.user.id && (
                                <button className="flex items-center" onClick={() => handleDelete(postData.id)} disabled={processing}>
                                    <TrashIcon className="text-destructive hover:cursor-pointer w-5 h-5 " />
                                </button>
                            )}
                            <Reply className="w-5 h-5 text-muted-foreground hover:cursor-pointer" />
                        </div>
                    </div>
                    {/* Quote Reply */}
                    <QuoteReply />
                    {/* Content */}
                    <p className="text-sm pb-2">{postData.content}</p>
                </div>

                {/* Reactions */}
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
