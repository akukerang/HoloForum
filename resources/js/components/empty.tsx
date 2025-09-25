import { MessageSquare } from "lucide-react";

interface Props {
    message?: string;
}

export default function Empty({ message }: Props) {
    return <div className="flex flex-col gap-4 justify-center items-center p-16">
        <MessageSquare size={72} />
        <p className="text-lg text-subtext1">
            {message || "No content available"}
        </p>
    </div>
}