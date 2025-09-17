
import AppLayout from '@/layouts/app-layout';
import { Post, SharedData, type BreadcrumbItem } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import { Thread } from "@/types";
import { update } from '@/routes/post';
import FormLayout from '@/layouts/form/form-layout';
import Editor from '@/components/editor';
import Submit from '@/components/submit';

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
            <FormLayout title={"Edit Post"} onSubmit={handleSubmit}>
                <Editor
                    table="post"
                    name="content"
                    errors={errors}
                    value={data.content}
                    onChange={(e) => setData('content', e.target.value)}
                />
                <Submit processing={processing} text='Update' />
            </FormLayout>
        </AppLayout>
    );
}
