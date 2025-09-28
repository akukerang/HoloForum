import { ForumCombobox } from "@/components/combobox";
import InputError from "@/components/input-error";
import Submit from "@/components/submit";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import AppLayout from "@/layouts/app-layout";
import { results } from "@/routes/thread";
import { BreadcrumbItem } from "@/types";
import { Head, useForm } from "@inertiajs/react";

export default function Search() {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: `Search`,
            href: `/search`,
        },
    ];

    const { data, setData, get, processing, errors } = useForm({
        keywords: '',
        user: '',
        forum: '',
        results: 'posts'
    })


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        get(results().url);
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Search" />
            <div className="flex h-full flex-1 flex-col gap-2 overflow-x-auto lg:px-4 pt-4 items-center">
                <div className='w-full md:w-7/8 lg:w-3/4 flex flex-col'>
                    <h1 className="text-2xl font-bold text-blue mb-1">Search</h1>
                    <form
                        onSubmit={handleSubmit}
                    >
                        <div className="rounded-xl overflow-hidden shadow-lg bg-baseColor p-6 flex flex-col gap-y-4">
                            <div className="space-y-1">
                                <Label htmlFor="keywords">Keywords:</Label>
                                <Input
                                    name="keywords"
                                    placeholder="Search by keywords"
                                    value={data.keywords}
                                    onChange={e => setData("keywords", e.target.value)}
                                />
                                <InputError message={errors.keywords} className="mt-2" />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="user">Posted by:</Label>
                                <Input
                                    name="user"
                                    placeholder="Search by user"
                                    value={data.user}
                                    onChange={e => setData("user", e.target.value)}
                                />
                                <InputError message={errors.user} className="mt-2" />
                            </div>
                            <div className="space-x-2">
                                <Label htmlFor="forum">Filter by Forum:</Label>
                                <ForumCombobox
                                    value={data.forum}
                                    onChange={val => setData("forum", val)}
                                />
                                <InputError message={errors.forum} className="mt-2" />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="results">Show results as:</Label>
                                <RadioGroup
                                    value={data.results}
                                    onValueChange={val => setData("results", val)}
                                >
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="posts" id="posts" />
                                        <Label htmlFor="posts">Posts</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="threads" id="threads" />
                                        <Label htmlFor="threads">Threads</Label>
                                    </div>
                                </RadioGroup>
                                <InputError message={errors.results} className="mt-2" />
                                <Submit text='Search' processing={processing} />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    )
}