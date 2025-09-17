import AppLayout from '@/layouts/app-layout';
import { SharedData, type BreadcrumbItem } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import { Thread } from "@/types";
import { store } from '@/routes/post';
import Editor from '@/components/editor';
import FormLayout from '@/layouts/form/form-layout';
import Submit from '@/components/submit';



interface Props {
    thread: Thread
}

export default function CreatePost({ thread }: Props) {

    const page = usePage<SharedData>();
    const { auth } = page.props;

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: `Reply to ${thread.title}`,
            href: `/reply/${thread.id}`,
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
            <FormLayout title={`Reply to ${thread.title}`} onSubmit={handleSubmit}>
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
