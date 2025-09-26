import Input from '@/components/input';
import Submit from '@/components/submit';
import AppLayout from '@/layouts/app-layout';
import FormLayout from '@/layouts/form/form-layout';
import { updateUser } from '@/routes/admin';
import { BreadcrumbItem, User } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';


interface Props {
    user: User;
}

export default function EditUser({ user }: Props) {

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Admin - Edit User',
            href: `/admin/user/${user.id}/edit`,
        },
    ];

    const { data, setData, put, processing, errors } = useForm({
        name: user.name,
        email: user.email,
        role: user.role
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(updateUser.url(user.id));
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit User" />
            <FormLayout title={"Edit User"} onSubmit={handleSubmit}>
                <Input
                    table="user"
                    name="name"
                    value={data.name}
                    placeholder="Username"
                    onChange={e => setData('name', e.target.value)}
                    errors={errors}
                />
                <Input
                    table="user"
                    name="email"
                    value={String(data.email)}
                    placeholder="Email"
                    onChange={(e) => setData('email', e.target.value)}
                    errors={errors}
                />

                <div className="space-y-1">
                    <Label htmlFor="role">Role</Label>
                    <Select onValueChange={value => setData('role', value)} defaultValue={data.role}>
                        <SelectTrigger className="w-[180px] bg-crust">
                            <SelectValue placeholder="Role" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="user">User</SelectItem>
                            <SelectItem value="moderator">Moderator</SelectItem>
                            <SelectItem value="admin">Admin</SelectItem>
                            <SelectItem value="banned">Banned</SelectItem>
                        </SelectContent>
                    </Select>
                    {errors?.role && <InputError message={errors.role} />}
                </div>


                <Submit processing={processing} text='Update' />
            </FormLayout>
        </AppLayout>
    );
}
