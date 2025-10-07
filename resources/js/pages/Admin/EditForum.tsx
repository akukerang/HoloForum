import AppLayout from '@/layouts/app-layout';
import { updateForum } from '@/routes/admin';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { Forum } from "@/types";
import FormLayout from '@/layouts/form/form-layout';
import Submit from '@/components/submit';
import Input from '@/components/input';
import Textarea from '@/components/textarea';

interface Props {
    forum: Forum;
}

export default function EditForum({ forum }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Admin - Edit Forum',
            href: `/admin/forum/${forum.slug}/edit`,
        },
    ];

    const { data, setData, put, processing, errors } = useForm({
        title: forum.title,
        description: forum.description,
        parent_forum_slug: forum.parent_forum_slug,
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(updateForum.url(forum.slug));
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Forum" />
            <FormLayout title={"Edit Forum"} onSubmit={handleSubmit}>
                <Input
                    table="forum"
                    name="title"
                    value={data.title}
                    placeholder="Title"
                    onChange={e => setData('title', e.target.value)}
                    errors={errors}
                />
                <Textarea
                    table="forum"
                    name="description"
                    value={data.description}
                    placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                    onChange={e => setData('description', e.target.value)}
                    errors={errors}
                />
                <Input
                    table="forum"
                    name="parent_forum_slug"
                    value={String(data.parent_forum_slug ?? '')}
                    placeholder="Parent Slug"
                    onChange={e => setData('parent_forum_slug', e.target.value)}
                    errors={errors}
                />
                <Submit processing={processing} text='Update' />
            </FormLayout>
        </AppLayout>
    );
}

