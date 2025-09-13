// import { Post } from "@/types";
// 
// interface Props {
// postData: Post;
// }

export default function QuoteReply() {
    return (
        <div className="w-1/2 flex flex-col items-stretch border-2 bg-accent mb-2" >
            <div>
                {/* User and link to post */}
                <p className="text-sm font-bold px-2 py-1 ">User said: </p>
            </div>
            <div>
                {/* Content */}
                <p className="text-sm px-2 pb-2">This is a quoted post</p>
            </div>

        </div>
    )

}