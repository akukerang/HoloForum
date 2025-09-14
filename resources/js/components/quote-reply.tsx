import { showPost } from "@/routes/post";
import { Post } from "@/types";
import { Link, usePage } from "@inertiajs/react";

interface Props {
    postData: Post;
}


const truncate = (str: string, n: number) => {
    return (str.length > n) ? str.slice(0, n - 1) + '...' : str;
}


export default function QuoteReply({ postData }: Props) {
    const { url } = usePage();
    const params = new URLSearchParams(url.split('?')[1]);
    const currentSort = params.get('sort') || 'oldest';

    return (
        <div className="w-1/2 flex flex-col items-stretch border-2 bg-accent mb-2" >
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
                <p className="text-sm px-2 pb-2">{truncate(postData.content, 120)}</p>
            </div>

        </div>
    )

}