

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { storeThread } from '@/routes/thread';
import { SharedData, type BreadcrumbItem } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import { Forum } from "@/types";

interface Props {
    forum: Forum;
}

export default function CreateThread({ forum }: Props) {

    const page = usePage<SharedData>();
    const { auth } = page.props;

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Create a New Thread',
            href: `/forum/${forum.id}/thread/create`,
        },
    ];

    const { data, setData, post, processing, errors } = useForm({
        user_id: auth.user.id,
        forum_id: forum.id,
        title: '',
        content: '',
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(storeThread().url)
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create a New Thread" />
            <div className='m-4'>
                <div className='w-8/12 m-4'>
                    <h1 className='text-2xl'>New Thread</h1>
                    <form className='space-y-4' onSubmit={handleSubmit}>
                        <div className='space-y-1'>
                            <Label htmlFor="thread title">Thread Title</Label>
                            <Input placeholder="Example" value={data.title}
                                onChange={(e) => setData('title', e.target.value)} />
                            {errors['title'] && <InputError message={errors['title']} />}
                            <Label htmlFor="post content">First Post</Label>
                            <Textarea placeholder="Write the first post?" value={data.content}
                                onChange={(e) => setData('content', e.target.value)} />
                            {errors['content'] && <InputError message={errors['content']} />}
                        </div>


                        <Button type='submit' disabled={processing}>Create Thread</Button>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
