import Input from '@/components/input';
import Submit from '@/components/submit';
import AppLayout from '@/layouts/app-layout';
import FormLayout from '@/layouts/form/form-layout';
import { updateThread } from '@/routes/thread';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';

interface Props {
    thread: {
        id: number;
        title: string;
        slug: string;
        description: string;
        user_id: number;
        forum_id: number;
    };
}

export default function EditThread({ thread }: Props) {

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Edit Thread',
            href: `/thread/${thread.id}/edit`,
        },
    ];

    const { data, setData, put, processing, errors } = useForm({
        title: thread.title,
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(updateThread.url(thread.id));
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Thread" />

            <FormLayout title={"Edit Thread"} onSubmit={handleSubmit}>
                <Input
                    table="thread"
                    name="title"
                    value={data.title}
                    placeholder="Title"
                    onChange={(e) => setData('title', e.target.value)}
                    errors={errors}
                />
                <Submit processing={processing} text='Update' />
            </FormLayout>
        </AppLayout>
    );
}
