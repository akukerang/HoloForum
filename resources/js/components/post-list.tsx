import PaginationCustom from "./pagination";
import { PostItem } from "./post-item";
import { Post, PostPaginate, User } from "@/types";

interface Props {
    posts: PostPaginate;
    currentUser: User;
    thread_id: number;
}

export function PostList({ posts, currentUser, thread_id }: Props) {
    const postCount = posts.total;
    const totalPages = posts.last_page;
    const currentPage = posts.current_page;

    return (
        <div className="flex flex-col gap-4 bg-card rounded-lg shadow-md">
            {postCount > 0 ? (
                <>
                    <div className="flex border-b p-2">
                        <PaginationCustom links={posts.links} />
                    </div>

                    {posts.data.map((post: Post) => (
                        <PostItem key={post.id} post={post} currentUser={currentUser} />
                    ))}

                    <div className="flex border-t p-2">
                        <PaginationCustom links={posts.links} />
                    </div>

                </>
            ) : (
                "No threads"
            )}
        </div>
    )


}
