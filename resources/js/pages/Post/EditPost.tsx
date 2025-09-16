import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { Post, SharedData, type BreadcrumbItem } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import { Thread } from "@/types";
import { update } from '@/routes/post';
import EditorCustom from '@/components/editor-custom';

interface Props {
    thread: Thread;
    postData: Post;
}

export default function EditPost({ thread, postData }: Props) {

    const page = usePage<SharedData>();
    const { auth } = page.props;

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: `Edit Post`,
            href: `/reply/${thread.id}/${postData.id}/edit`,
        },
    ];

    const { data, setData, put, processing, errors } = useForm({
        user_id: auth.user.id,
        thread_id: thread.id,
        content: postData.content,
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(update(postData.id).url)
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Post" />
            <div className='m-4'>
                <div className='w-8/12 m-4'>
                    <h1 className='text-2xl'>Edit Post</h1>
                    <form className='space-y-4' onSubmit={handleSubmit}>
                        <div className='space-y-1'>
                            <Label htmlFor="post content">Content</Label>
                            <EditorCustom value={data.content} onChange={(e) => setData('content', e.target.value)} />
                            {errors['content'] && <InputError message={errors['content']} />}
                        </div>
                        <Button type='submit' disabled={processing}>Update Post</Button>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
