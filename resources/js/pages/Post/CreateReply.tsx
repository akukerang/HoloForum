import AppLayout from '@/layouts/app-layout';
import { SharedData, type BreadcrumbItem } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import { Thread, Post } from "@/types";
import { storeReply } from '@/routes/post';
import FormLayout from '@/layouts/form/form-layout';
import Submit from '@/components/submit';
import Editor from '@/components/editor';

interface Props {
    thread: Thread;
    parent_post: Post;
}

export default function CreatePost({ thread, parent_post }: Props) {
    const page = usePage<SharedData>();
    const { auth } = page.props;

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: `Reply to Post`,
            href: `/reply/${thread.id}/${parent_post.id}`,
        },
    ];

    const { data, setData, post, processing, errors } = useForm({
        user_id: auth.user.id,
        thread_id: thread.id,
        parent_id: parent_post.id,
        content: '',
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(storeReply(parent_post.id).url)
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={"Reply to Post"} />
            <FormLayout title={"Reply to Post"} onSubmit={handleSubmit}>
                <Editor
                    table="post"
                    name="content"
                    errors={errors}
                    value={data.content}
                    onChange={(e) => setData('content', e.target.value)}
                />
                <Submit processing={processing} text='Reply' />
            </FormLayout>
        </AppLayout>
    );
}
