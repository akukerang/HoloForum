import { Link, useForm } from "@inertiajs/react";
import { markRead } from "@/routes/user";

interface Props {
    id: string;
    type: string;
    subject: string;
    message: string;
    action: string;
}


function getType(type: string) {
    switch (type) {
        case "App\\Notifications\\NewMessage":
            return "New Reply";
        case "new_mention":
            return "New Mention";
        case "new_follower":
            return "New Follower";
        default:
            return "Notification";
    }
}

export default function NotificationItem({ id, type, subject, action }: Props) {
    const { post, processing } = useForm();

    const markAsRead = () => {
        post(markRead.url(id));
    }


    return <div className="flex flex-col items-start gap-y-2 px-4 py-3 border-b-1">
        {/* This should also mark it as read */}
        <Link href={action} className="hover:underline">
            <h4 className="text-sm font-semibold">{getType(type)}</h4>
        </Link>
        <p className="text-xs">{subject}</p>
        <button onClick={markAsRead} disabled={processing} className="text-xs text-green underline hover:cursor-pointer hover:opacity-85">Mark as Read</button>
    </div>


}