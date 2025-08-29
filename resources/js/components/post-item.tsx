interface Post {
    id: number;
    content: string;
    user: User;
    created_at: string;
}

interface User {
    id: number;
    name: string;
}


const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).format(date);
};

export function PostItem({ post }: { post: Post }) {

    return (
        <li className="py-4 px-8 w-full flex gap-x-8 items-center" id={post.id.toString()}>
            <div className="flex flex-col items-center gap-y-2 w-[1/5]">
                <img src="https://avatars.steamstatic.com/b5bd56c1aa4644a474a2e4972be27ef9e82e517e_full.jpg" alt={post.user.name} className="h-16" />
                <h1 className="font-bold">{post.user.name}</h1>
            </div>

            <div className="flex-1 px-6 py-8 rounded-xl border-2 bg-card w-[4/5] shadow-xs">
                <p className="text-sm text-muted-foreground pb-4">Posted {formatDate(post.created_at)}</p>
                <h1 className="text-sm">{post.content}</h1>
            </div>
        </li>
    );
}
