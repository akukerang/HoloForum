import { showPost } from "@/routes/post";
import { Post } from "@/types";
import { Link, usePage } from "@inertiajs/react";

interface Props {
    postData: Post;
}

//TODO: Truncate and add expand button if too long

export default function QuoteReply({ postData }: Props) {
    const { url } = usePage();
    const params = new URLSearchParams(url.split('?')[1]);
    const currentSort = params.get('sort') || 'oldest';

    return (
        <div className="w-full sm:w-3/4 md:w-1/2 flex flex-col items-stretch border-1 bg-surface0 mb-2" >
            <div>
                {/* User and link to post */}
                <Link href={showPost({
                    thread: postData.thread_id,
                    post: postData.id,
                },
                    { query: { sort: currentSort } }
                )}>

                    <p className="text-sm font-bold px-2 py-1 ">{postData.user.name} said: </p>
                </Link>
            </div>
            <div>
                {/* Content */}
                <p className="text-sm px-2 pb-2" dangerouslySetInnerHTML={{ __html: postData.content }}></p>
            </div>

        </div>

    )

}