import { Link } from "@inertiajs/react";
import { Post } from "@/types";
import QuoteReply from "./quote-reply";
import { capitalize, formatDateTime, rolesSwitch } from "@/lib/utils";
import { useInitials } from "@/hooks/use-initials";
import { showUser } from "@/routes/user";

interface Props {
    postData: Post;
}


export function ResultPostItem({ postData }: Props) {
    const getInitials = useInitials();



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
                    {postData.thread ?
                        <h1 className="font-bold text-blue text-lg">Re: {postData.thread.title || ""}</h1>
                        : null
                    }

                    <div className="flex flex-row justify-between mb-2">
                        <p className="text-xs text-subtext0 ">
                            Posted by {postData.user.name} at {formatDateTime(postData.created_at)}
                            {postData.created_at !== postData.updated_at ? <span className="italic"> (edited)</span> : null}
                        </p>
                    </div>
                    {/* Quote Reply */}
                    {postData.parent ? (
                        <QuoteReply postData={postData.parent} />
                    ) : null}

                    {/* Content */}
                    <p className="text-sm mb-1.5 rsw-ce" dangerouslySetInnerHTML={{ __html: postData.content }} />
                </div>
            </div>
        </li >

    );
}



