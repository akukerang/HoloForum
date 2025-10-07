import { useInitials } from "@/hooks/use-initials";
import { User } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { formatDateTime } from "@/lib/utils";

interface Props {
    message: string;
    sender: boolean;
    user: User;
    date: string;
}

export default function MessageItem({ message, sender, user, date }: Props) {
    const getInitials = useInitials();

    return (
        <div
            className={`flex w-full items-end gap-2 mb-2 ${sender ? "justify-end" : "justify-start"
                }`}
        >
            {/* Avatar on left for sender, right for receiver */}
            {!sender && (
                <Avatar className="size-10 overflow-hidden rounded-full hidden md:block">
                    <AvatarImage
                        src={`${window.location.origin}/storage/${user.avatar}`}
                        alt={user.name}
                    />
                    <AvatarFallback className="rounded-lg bg-blue text-baseColor dark:text-text dark:bg-crust">
                        {getInitials(user.name)}
                    </AvatarFallback>
                </Avatar>
            )}

            <div
                className={`max-w-[70%] rounded-2xl px-4 py-2 text-sm shadow-md ${sender
                    ? "bg-blue text-white dark:bg-blue/60 "
                    : "bg-crust text-text"
                    }`}
            >
                <p>{message}</p>
                <span className="text-xs opacity-70 block text-right mt-1">{formatDateTime(date)}</span>
            </div>

            {sender && (
                <Avatar className="size-10 overflow-hidden rounded-full hidden md:block">
                    <AvatarImage
                        src={`${window.location.origin}/storage/${user.avatar}`}
                        alt={user.name}
                    />
                    <AvatarFallback className="rounded-lg bg-blue text-baseColor dark:text-text dark:bg-crust">
                        {getInitials(user.name)}
                    </AvatarFallback>
                </Avatar>
            )}
        </div>
    );
}
