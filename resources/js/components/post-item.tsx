import { createReply, deleteMethod, edit, toggleReaction } from "@/routes/post";
import { Link, router, useForm, usePage } from "@inertiajs/react";
import { Reply, SquarePen, ThumbsUp, TrashIcon } from "lucide-react";
import { Post, SharedData } from "@/types";
import QuoteReply from "./quote-reply";
import { formatDateTime } from "@/lib/utils";
import { useInitials } from "@/hooks/use-initials";

interface Props {
    postData: Post;
}


export function PostItem({ postData }: Props) {
    const { post, processing, delete: destroy } = useForm();
    const page = usePage<SharedData>();
    const { auth } = page.props;
    const getInitials = useInitials();


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
        <li className="w-full flex items-stretch border-1 bg-baseColor" id={`post-${postData.id.toString()}`}>
            <div className="hidden md:flex md:flex-col py-4 mt-4 text-center justify-top items-center gap-y-2 w-1/8">
                {/* Profile Info: Username, Avatar, Bio */}
                {postData.user.avatar ? (
                    <img src={`${window.location.origin}/storage/${postData.user.avatar}`} alt={postData.user.name} className="h-20 w-20" />
                ) : (
                    <div className="h-16 w-16 bg-blue text-baseColor dark:bg-crust dark:text-text flex items-center justify-center text-xl font-medium">
                        {getInitials(postData.user.name)}
                    </div>
                )}
                <h1 className="font-bold text-sm px-2">{postData.user.name}</h1>
            </div>

            <div className="flex flex-col w-full md:w-7/8 border-l-1 px-4 py-4 justify-between">
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
                    <p className="text-sm mb-1.5 rsw-ce" dangerouslySetInnerHTML={{ __html: postData.content }} />
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
