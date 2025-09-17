import Input from '@/components/input';
import Submit from '@/components/submit';
import AppLayout from '@/layouts/app-layout';
import FormLayout from '@/layouts/form/form-layout';
import { storeThread } from '@/routes/admin';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admin - Create Thread',
        href: '/admin/thread/create',
    },
];

export default function CreateThread() {

    const { data, setData, post, processing, errors } = useForm({
        user_id: '',
        forum_id: '',
        title: '',
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(storeThread.url());
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Thread" />
            <FormLayout title={"Create thread"} onSubmit={handleSubmit}>
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
                    value={data.forum_id}
                    placeholder="Forum ID"
                    onChange={(e) => setData('forum_id', e.target.value)}
                    errors={errors}
                />
                <Input
                    table="thread"
                    name="user_id"
                    value={data.user_id}
                    placeholder="User ID"
                    onChange={e => setData('user_id', e.target.value)}
                    errors={errors}
                />
                <Submit processing={processing} text='Create' />
            </FormLayout>
        </AppLayout>
    );
}
