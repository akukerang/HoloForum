import AppLayout from '@/layouts/app-layout';
import { storeThread } from '@/routes/thread';
import { SharedData, type BreadcrumbItem } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import { Forum } from "@/types";
import FormLayout from '@/layouts/form/form-layout';
import Editor from '@/components/editor';
import Submit from '@/components/submit';
import Input from '@/components/input';

interface Props {
    forum: Forum;
}

export default function CreateThread({ forum }: Props) {

    const page = usePage<SharedData>();
    const { auth } = page.props;

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Create a New Thread',
            href: `/forum/${forum.slug}/thread/create`,
        },
    ];

    const { data, setData, post, processing, errors } = useForm({
        user_id: auth.user.id,
        forum_slug: forum.slug,
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
            <FormLayout title={"Create a New Thread"} onSubmit={handleSubmit}>
                <Input
                    table="thread"
                    name="title"
                    value={data.title}
                    placeholder="Title"
                    onChange={(e) => setData('title', e.target.value)}
                    errors={errors}
                />
                <Editor
                    table="post"
                    name="content"
                    errors={errors}
                    value={data.content}
                    onChange={(e) => setData('content', e.target.value)}
                />
                <Submit processing={processing} text='Create Thread' />
            </FormLayout>
        </AppLayout>
    );
}
