import Input from '@/components/input';
import Submit from '@/components/submit';
import Textarea from '@/components/textarea';
import AppLayout from '@/layouts/app-layout';
import FormLayout from '@/layouts/form/form-layout';
import { storeForum } from '@/routes/admin';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admin - Create Forum',
        href: '/admin/forum/create',
    },
];

export default function CreateForum() {


    const { data, setData, post, processing, errors } = useForm({
        title: '',
        slug: '',
        description: '',
        parent_forum_id: '',
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(storeForum.url());
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Forum" />
            <FormLayout title={"Create Forum"} onSubmit={handleSubmit}>
                <Input
                    table="forum"
                    name="title"
                    value={data.title}
                    placeholder="Title"
                    onChange={e => setData('title', e.target.value)}
                    errors={errors}
                />
                <Input
                    table="forum"
                    name="slug"
                    value={data.slug}
                    placeholder="example-forum"
                    onChange={(e) => setData('slug', e.target.value)}
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
                    name="parent_forum_id"
                    value={data.parent_forum_id}
                    placeholder="Parent ID"
                    onChange={e => setData('parent_forum_id', e.target.value)}
                    errors={errors}
                />
                <Submit processing={processing} text='Create' />
            </FormLayout>
        </AppLayout>
    );
}
