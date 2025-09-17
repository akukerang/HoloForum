import { createReply, deleteMethod, edit, toggleReaction } from "@/routes/post";
import { Link, router, useForm, usePage } from "@inertiajs/react";
import { Reply, SquarePen, ThumbsUp, TrashIcon } from "lucide-react";
import { Post, SharedData } from "@/types";
import QuoteReply from "./quote-reply";
import { formatDateTime } from "@/lib/utils";


interface Props {
    postData: Post;
}


export function PostItem({ postData }: Props) {

    const { post, processing, delete: destroy } = useForm();
    const page = usePage<SharedData>();
    const { auth } = page.props;


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
        <li className="w-full flex items-stretch border-1 bg-base" id={`post-${postData.id.toString()}`}>
            <div className="flex flex-col py-4 text-center justify-center items-center gap-y-2 w-1/8">
                {/* Profile Info: Username, Avatar, Bio */}
                <img src="https://avatars.steamstatic.com/b5bd56c1aa4644a474a2e4972be27ef9e82e517e_full.jpg" alt={postData.user.name} className="h-16" />
                <h1 className="font-bold">{postData.user.name}</h1>
            </div>

            <div className="flex flex-col w-7/8 border-l-1 px-4 py-4 justify-between">
                <div>
                    {/* User, Date, Trash, Reply */}
                    <div className="flex flex-row justify-between pb-1">
                        <p className="text-xs text-subtext0 ">
                            Posted by {postData.user.name} at {formatDateTime(postData.created_at)}
                            {postData.created_at !== postData.updated_at ? <span className="italic"> (edited)</span> : null}
                        </p>
                        <div className="flex flex-row gap-x-3 align-center justify-center">
                            {auth.user && auth.user.id === postData.user.id && (
                                <>
                                    <Link href={edit({ thread: postData.thread_id, post: postData.id })}>
                                        <SquarePen className="w-5 h-5 text-subtext1 hover:text-subtext0 hover:cursor-pointer" />

                                    </Link>
                                    <button onClick={() => handleDelete(postData.id)} disabled={processing}>
                                        <TrashIcon className="w-5 h-5 text-red hover:text-red-400 hover:cursor-pointer" />

                                    </button>

                                </>
                            )}
                            <Link href={createReply({ thread: postData.thread_id, post: postData.id }).url}>
                                <Reply className="w-5 h-5 text-subtext1 hover:text-subtext0 hover:cursor-pointer" />
                            </Link>

                        </div>
                    </div>
                    {/* Quote Reply */}
                    {postData.parent ? (
                        <QuoteReply postData={postData.parent} />
                    ) : null}

                    {/* Content */}
                    <p className="text-sm pb-3 rsw-ce" dangerouslySetInnerHTML={{ __html: postData.content }} />
                </div>

                {/* Reactions */}
                <div className="flex flex-row items-center gap-x-1 text-sm">
                    {postData.liked ? (
                        <ThumbsUp className="w-4 h-4 text-green hover:cursor-pointer" onClick={() => handleLike(postData.id)} />
                    ) : (
                        <ThumbsUp className="w-4 h-4 text-subtext0 hover:cursor-pointer" onClick={() => handleLike(postData.id)} />
                    )}
                    {postData.reactions_count && postData.reactions_count > 0 ? postData.reactions_count : null}

                </div>
            </div>
        </li >

    );
}
