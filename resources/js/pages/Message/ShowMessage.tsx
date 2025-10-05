import InputError from "@/components/input-error";
import MessageItem from "@/components/message-item";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import AppLayout from "@/layouts/app-layout";
import { sendMessage } from "@/routes";
import { User, BreadcrumbItem } from "@/types";
import { Head, useForm } from "@inertiajs/react";
import { Send } from "lucide-react";
import React from "react";
import { useEcho } from "@laravel/echo-react";
import { useState, useEffect, useRef } from "react";

interface Message {
    sender_id: number;
    receiver_id: number;
    message: string;
    created_at: string;
}

type MessageData = {
    message: Message
}

interface Props {
    currentUser: User;
    targetUser: User;
    messages: Message[];
}

export default function ShowMessage({ currentUser, targetUser, messages }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: `Messages - ${targetUser.name}`,
            href: `/messages/${targetUser.name}`,
        },
    ];

    const [liveMessages, setLiveMessages] = useState<Message[]>(messages);

    // Listens for new messages then updates
    useEcho<MessageData>(
        `chat.${currentUser.id}`,
        ".message.sent",
        (e) => {
            setLiveMessages((prevMessages) => [...prevMessages, e.message]);
        },
    );

    // Scroll to new message
    const messagesEndRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [liveMessages]);

    const { data, setData, post, processing, errors } = useForm({
        message: '',
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(sendMessage.url({ user: targetUser.name }), {
            onSuccess: () => {
                // Instead of refetching, just append the message to the list
                setLiveMessages((prevMessages) => [...prevMessages,
                {
                    sender_id: currentUser.id,
                    receiver_id: targetUser.id,
                    message: data.message,
                    created_at: new Date().toISOString(),
                },
                ]);
                // clears field
                setData('message', '')
            },
        });
    }


    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Messages - ${targetUser.name}`} />
            <div className="flex flex-col flex-1 min-h-[calc(100vh-4rem)] max-h-[calc(100vh-4rem)] bg-baseColor align-center mx-auto w-full lg:w-3/4">
                <div className="bg-text text-baseColor dark:bg-crust dark:text-text px-4 py-2">
                    <h1 className="text-2xl font-bold">{targetUser.name}</h1>
                </div>
                <div className="flex flex-col gap-4 overflow-y-auto p-4">
                    {/* Message */}
                    {liveMessages && liveMessages.map((message) => (
                        message.sender_id === currentUser.id ? (
                            // Message sent by current user
                            <MessageItem
                                message={message.message}
                                sender={true}
                                user={currentUser}
                                date={message.created_at}
                            />
                        ) : (
                            // Message received
                            <MessageItem
                                message={message.message}
                                sender={false}
                                user={targetUser}
                                date={message.created_at}
                            />
                        )
                    ))}
                    <div ref={messagesEndRef}></div>
                </div>
                <div className="p-2 flex-1">
                    {errors.message ? (
                        <InputError message={errors.message} className="mb-1.5" />
                    ) : null}
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-1 lg:flex-row ">
                            <Textarea
                                onChange={e => setData('message', e.target.value)}
                                value={data.message}
                                name="message" maxLength={255} placeholder="Send a Message" required autoFocus className="resize-none h-20" />
                            <Button className="rounded-lg" type="submit" disabled={processing}>
                                <Send /> Send
                            </Button>
                        </div>
                    </form>

                </div>

            </div>

        </AppLayout >
    )


}


