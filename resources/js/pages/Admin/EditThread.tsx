import Input from '@/components/input';
import Submit from '@/components/submit';
import AppLayout from '@/layouts/app-layout';
import FormLayout from '@/layouts/form/form-layout';
import { updateThread } from '@/routes/admin';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';


interface Props {
    thread: {
        id: number;
        title: string;
        description: string;
        user_id: number;
        forum_id: number;
    };
}

export default function EditThread({ thread }: Props) {

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Admin - Edit Thread',
            href: `/admin/thread/${thread.id}/edit`,
        },
    ];

    const { data, setData, put, processing, errors } = useForm({
        user_id: thread.user_id,
        forum_id: thread.forum_id,
        title: thread.title,
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(updateThread.url(thread.id));
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Thread" />
            <FormLayout title={"Edit thread"} onSubmit={handleSubmit}>
                <Input
                    table="thread"
                    name="title"
                    value={data.title}
                    placeholder="Title"
                    onChange={e => setData('title', e.target.value)}
                    errors={errors}
                />
                <Input
                    table="thread"
                    name="forum_id"
                    value={String(data.forum_id)}
                    placeholder="Forum ID"
                    onChange={(e) => setData('forum_id', Number(e.target.value))}
                    errors={errors}
                />
                <Input
                    table="thread"
                    name="user_id"
                    value={String(data.user_id)}
                    placeholder="User ID"
                    onChange={(e) => setData('user_id', Number(e.target.value))}
                    errors={errors}
                />
                <Submit processing={processing} text='Update' />
            </FormLayout>
        </AppLayout>
    );
}
