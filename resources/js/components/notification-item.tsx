import { Link, useForm } from "@inertiajs/react";
import { Button } from "./ui/button";

interface Props {
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

export default function NotificationItem({ type, subject, action }: Props) {
    const { post, processing } = useForm();



    const markAsRead = () => {
        // post(route("notifications.read", { id: data.id }));
    }


    return <div className="p-4">
        {/* This should also mark it as read */}
        <Link href={action} >
            <h4 className="text-sm font-semibold">{getType(type)}</h4>
        </Link>
        <p className="text-xs">{subject}</p>
        <div className="flex flex-row gap-2 mt-2">
            <button onClick={markAsRead} disabled={processing} className="text-xs text-green underline hover:cursor-pointer">Mark as Read</button>
        </div>
    </div>


}