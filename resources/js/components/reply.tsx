import { useForm } from "@inertiajs/react"
import { Textarea } from "@headlessui/react";
import { Button } from "./ui/button";
import { store } from "@/routes/post";
import InputError from "./input-error";

interface Props {
    thread_id: number;
    user_id: number;
}

export default function Reply({ thread_id, user_id }: Props) {
    const { data, setData, post, processing, errors, reset } = useForm({
        user_id: user_id,
        thread_id: thread_id,
        content: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(store.url(), {
            onSuccess: () => {
                reset("content")
                setData("content", "")
            }
        });
    };

    return (
        <div
            id="reply-box"
            className='bg-card p-6 flex flex-col rounded-xl shadow-sm w-3/5 h-44'
        >
            <form className="space-y-2" onSubmit={handleSubmit}>
                <div>
                    <Textarea
                        value={data.content}
                        onChange={(e) => setData('content', e.target.value)}
                        className="w-full p-2 border-1 rounded-lg shadow-sm text-sm resize-none h-24"
                        placeholder="Reply to this topic..."
                    />
                </div>
                <div className="flex justify-between">
                    <div>
                        {errors['content'] && <InputError message={errors['content']} />}
                    </div>

                    <Button type="submit" disabled={processing}>Reply</Button>
                </div>
            </form>
        </div>
    )
}
