import { createReply, deletePost, edit, toggleReaction } from "@/routes/post";
import { Link, router, useForm, usePage } from "@inertiajs/react";
import { Ban, EllipsisVertical, Flag, Reply, SquarePen, ThumbsUp, TrashIcon } from "lucide-react";
import { Post, SharedData } from "@/types";
import QuoteReply from "./quote-reply";
import { capitalize, formatDateTime, rolesSwitch } from "@/lib/utils";
import { useInitials } from "@/hooks/use-initials";
import { removePost, toggleBanUser } from "@/routes/moderator";
import { showUser } from "@/routes/user";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Props {
    postData: Post;
    locked: boolean;
}


export function PostItem({ postData, locked }: Props) {
    const { post, processing, delete: destroy, put } = useForm();
    const page = usePage<SharedData>();
    const { auth } = page.props;
    const getInitials = useInitials();

    const handleModDelete = (id: number) => {
        if (confirm("As a moderator/admin, do you want to delete this post?")) {
            destroy(removePost.url({ id }), {
                preserveScroll: true,
                onSuccess: () => {
                    router.reload({ only: ["posts"] });
                }
            })
        }
    }

    const handleDelete = (id: number) => {
        if (confirm("Do you want to delete this post?")) {
            destroy(deletePost.url({ id }), {
                preserveScroll: true,
                onSuccess: () => {
                    router.reload({ only: ["posts"] });
                }
            })
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

    function handleBanUser(name: string) {
        if (confirm("As a moderator/admin, do you want to ban this user?")) {
            put(toggleBanUser.url({ name }), {
                preserveScroll: true,
                onSuccess: () => {
                    router.reload({ only: ["posts"] });
                }
            })
        }
    }

    return (
        <li className="w-full flex items-stretch border-1 bg-baseColor" id={`post-${postData.id.toString()}`}>
            <div className="hidden md:flex md:flex-col py-4 mt-4 text-center justify-top items-center w-1/8">
                {/* Profile Info: Username, Avatar, Bio */}
                <Link href={showUser(postData.user.name)} className="flex flex-col items-center text-center">
                    {postData.user.avatar ? (
                        <img src={`${window.location.origin}/storage/${postData.user.avatar}`} alt={postData.user.name} className="h-20 w-20" />
                    ) : (
                        <div className="h-20 w-20 bg-blue text-baseColor dark:bg-crust dark:text-text flex items-center justify-center text-xl font-medium">
                            {getInitials(postData.user.name)}
                        </div>
                    )}
                    <h1 className="mt-2 font-bold text-sm px-2 overflow-hidden text-ellipsis whitespace-nowrap">{postData.user.name}</h1>
                </Link>
                <h1 className={`font-bold text-sm px-2 ${rolesSwitch(postData.user.role)}`}>{capitalize(postData.user.role)}</h1>
                <p className="text-xs text-subtext0">{postData.user.status}</p>
            </div>

            <div className="flex flex-col w-full md:w-7/8 border-l-1 px-4 py-4 justify-between">
                <div>
                    {/* User, Date, Trash, Reply */}
                    <div className="flex flex-row justify-between mb-2">
                        <p className="text-xs text-subtext0 ">
                            Posted by {postData.user.name} at {formatDateTime(postData.created_at)}
                            {postData.created_at !== postData.updated_at ? <span className="italic"> (edited)</span> : null}
                        </p>
                        <div className="flex flex-row gap-x-2">
                            {!locked ? (
                                <Link href={createReply({ thread: postData.thread_id, post: postData.id }).url}>
                                    <Reply className="w-5 h-5 text-subtext1 hover:text-subtext0 hover:cursor-pointer" />
                                </Link>) : null
                            }
                            <DropdownMenu>
                                <DropdownMenuTrigger className="bg-transparent border-0 p-0">
                                    <EllipsisVertical className="w-5 h-5 hover:cursor-pointer text-subtext1 hover:text-subtext0" />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-48">
                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                    {/*Default Action, currently no function */}
                                    <DropdownMenuItem>
                                        <button className="flex items-center">
                                            <Flag className="mr-2" /> Report Post
                                        </button>
                                    </DropdownMenuItem>
                                    {auth.user && auth.user.id === postData.user.id ? (
                                        <>
                                            <DropdownMenuItem>
                                                <Link className="flex items-center hover:cursor-default" href={edit({ thread: postData.thread_id, post: postData.id })}>
                                                    <SquarePen className="mr-2" /> Edit Post
                                                </Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                <button className="flex items-center" onClick={() => handleDelete(postData.id)} disabled={processing}>
                                                    <TrashIcon className="mr-2" /> Delete Post
                                                </button>
                                            </DropdownMenuItem>
                                        </>
                                    ) :
                                        (auth.user && (auth.user.role === 'admin' || auth.user.role === 'moderator')) ? (
                                            <DropdownMenuItem>
                                                <button className="flex items-center" onClick={() => handleModDelete(postData.id)} disabled={processing}>
                                                    <TrashIcon className="mr-2" /> Remove Post
                                                </button>
                                            </DropdownMenuItem>
                                        ) : null

                                    }
                                    {
                                        auth.user && (auth.user.role === 'admin' || auth.user.role === 'moderator') && (postData.user.role !== 'admin' && postData.user.role !== 'moderator') ? (
                                            <DropdownMenuItem>
                                                <button className="flex items-center" onClick={() => handleBanUser(postData.user.name)} disabled={processing}>
                                                    <Ban className="mr-2" /> Ban User
                                                </button>
                                            </DropdownMenuItem>
                                        ) : null
                                    }
                                </DropdownMenuContent>
                            </DropdownMenu>
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
                    <button onClick={() => handleLike(postData.id)} disabled={processing}>
                        {postData.liked ? (
                            <ThumbsUp className="w-4 h-4 text-green hover:cursor-pointer" />
                        ) : (
                            <ThumbsUp className="w-4 h-4 text-subtext0 hover:cursor-pointer" />
                        )}
                    </button>
                    {postData.reactions_count && postData.reactions_count > 0 ? postData.reactions_count : null}
                </div>
            </div>
        </li >

    );
}



