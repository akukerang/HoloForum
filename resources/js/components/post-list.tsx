import { usePage, router } from "@inertiajs/react";
import PaginationCustom from "./pagination";
import { PostItem } from "./post-item";
import { Post, PostPaginate } from "@/types";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

interface Props {
    posts: PostPaginate;
    thread_id: number;
}

export function PostList({ posts, thread_id }: Props) {

    const { url } = usePage()
    const params = new URLSearchParams(url.split('?')[1])
    const sort = params.get('sort') || 'oldest'
    const postCount = posts.total;
    const currentSort = sort;

    const onSort = (sortValue: string) => {
        router.get(`/thread/${thread_id}`, { sort: sortValue, page: 1 }, {
            preserveState: true,
            replace: true,
        })
    }

    return (
        <div className="flex flex-col gap-4 bg-card rounded-lg shadow-md">
            {postCount > 0 ? (
                <>
                    <div className="flex border-b p-2 justify-between">
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
                        <PostItem key={post.id} postData={post} />
                    ))}
                </>
            ) : (
                "No threads"
            )}
        </div>
    )


}
