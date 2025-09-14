import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { SharedData, type BreadcrumbItem } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import { Thread } from "@/types";
import { store } from '@/routes/post';

interface Props {
    thread: Thread
}

export default function CreatePost({ thread }: Props) {

    const page = usePage<SharedData>();
    const { auth } = page.props;

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: `Reply to ${thread.title}`,
            href: `/thread/${thread.id}/reply`,
        },
    ];

    const { data, setData, post, processing, errors } = useForm({
        user_id: auth.user.id,
        thread_id: thread.id,
        content: '',
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(store().url)
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Reply to ${thread.title}`} />
            <div className='m-4'>
                <div className='w-8/12 m-4'>
                    <h1 className='text-2xl'>Reply to {thread.title}</h1>
                    <form className='space-y-4' onSubmit={handleSubmit}>
                        <div className='space-y-1'>
                            <Label htmlFor="post content">Content</Label>
                            <Textarea placeholder="Your reply here..." value={data.content}
                                onChange={(e) => setData('content', e.target.value)} />
                            {errors['content'] && <InputError message={errors['content']} />}
                        </div>
                        <Button type='submit' disabled={processing}>Reply to Thread</Button>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
