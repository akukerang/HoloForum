import { Link, useForm } from "@inertiajs/react";
import { markRead } from "@/routes/user";
import { formatDateTime } from "@/lib/utils";

interface Props {
    id: string;
    type: string;
    subject: string;
    message: string;
    action: string;
    created_at: string;
}


interface TypeReturn {
    typeFormat: string;
    subjectTemplate: string
}

function getType(type: string): TypeReturn {
    switch (type) {
        case "App\\Notifications\\NewMessage":
            return { typeFormat: "New Message", subjectTemplate: "You have a new message from " };
        case "App\\Notifications\\NewPost":
            return { typeFormat: "New Post", subjectTemplate: "New post in " };
        case "App\\Notifications\\NewReply":
            return { typeFormat: "New Reply", subjectTemplate: "You have a new reply from" };
        default:
            return { typeFormat: "Notification", subjectTemplate: "Default Subject" };
    }
}

export default function NotificationItem({ id, type, subject, action, created_at }: Props) {
    const { post, processing } = useForm();

    const markAsRead = () => {
        post(markRead.url(id));
    }

    const { typeFormat, subjectTemplate } = getType(type);


    return <div className="flex flex-col items-start gap-y-1.5 px-4 py-3 border-b-1">
        {/* This should also mark it as read */}
        <div className="flex flex-row justify-between w-full">
            <Link href={action} className="hover:underline">
                <h4 className="text-sm font-semibold text-blue">{typeFormat}</h4>
            </Link>
            <span className="text-xs text-subtext0">{formatDateTime(created_at, true)}</span>
        </div>
        <p className="text-xs">{subjectTemplate} <span className="text-red">{subject}</span></p>
        <button onClick={markAsRead} disabled={processing} className="text-xs text-green underline hover:cursor-pointer hover:opacity-85">Mark as Read</button>
    </div>


}