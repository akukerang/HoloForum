import { usePage, router } from "@inertiajs/react";
import PaginationCustom from "./pagination";
import { Post, PostPaginate } from "@/types";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import Empty from "./empty";
import { ResultPostItem } from "./result-post-item";

interface Props {
    posts: PostPaginate;
}


export function ResultPostList({ posts }: Props) {

    const { url } = usePage()
    const params = new URLSearchParams(url.split('?')[1])
    const sort = params.get('sort') || 'oldest'
    const keywords = params.get('keywords') || ''
    const user = params.get('user') || ''
    const forum = params.get('forum') || ''
    const results = params.get('results') || ''

    const postCount = posts.total;
    const currentSort = sort;

    const onSort = (sortValue: string) => {
        router.get(`/results`, {
            sort: sortValue,
            page: 1,
            keywords: keywords,
            user: user,
            forum: forum,
            results: results
        }, {
            preserveState: true,
            replace: true,
        })
    }

    return (
        <div className="flex flex-col gap-2">
            {postCount > 0 ? (
                <>
                    <div className="flex border-1 py-2 px-3 justify-between bg-crust shadow-sm">
                        {posts.last_page > 1 ? (
                            <PaginationCustom links={posts.links} />)
                            : <div></div>
                        }
                        <div>
                            <Select
                                value={currentSort}
                                onValueChange={(value) => onSort(value)}
                            >
                                <SelectTrigger className="w-[160px]">
                                    <SelectValue placeholder="Sort By" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="latest">Latest</SelectItem>
                                    <SelectItem value="reactions">Reactions</SelectItem>
                                    <SelectItem value="oldest">Oldest</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    {posts.data.map((post: Post) => (
                        <ResultPostItem key={post.id} postData={post} />
                    ))}

                </>
            ) : (
                <Empty message="No posts available" />
            )}
        </div>
    )


}
