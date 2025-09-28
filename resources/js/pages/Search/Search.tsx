import { ForumCombobox } from "@/components/combobox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import { Form, Head } from "@inertiajs/react";

export default function Search() {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: `Search`,
            href: `/search`,
        },
    ];
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Search" />
            <div className="flex h-full flex-1 flex-col gap-2 overflow-x-auto lg:px-4 pt-4 items-center">
                <div className='w-full md:w-7/8 lg:w-3/4 flex flex-col'>
                    <h1 className="text-2xl font-bold text-blue mb-1">Search</h1>
                    <Form>
                        <div className="rounded-xl overflow-hidden shadow-lg bg-baseColor p-6 flex flex-col gap-y-4">
                            <div className="space-y-1">
                                <Label htmlFor="keyword">Keywords:</Label>

                                <Input
                                    name="keyword"
                                    placeholder="Search by keywords"
                                />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="user">Posted by:</Label>
                                <Input
                                    name="user"
                                    placeholder="Search by user"
                                />
                            </div>
                            <div className="space-x-2">
                                <Label htmlFor="forum">Filter by Forum:</Label>
                                <ForumCombobox />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="user">Show results as:</Label>
                                <RadioGroup defaultValue="posts">
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="posts" id="posts" />
                                        <Label htmlFor="posts">Posts</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="threads" id="threads" />
                                        <Label htmlFor="threads">Threads</Label>
                                    </div>
                                </RadioGroup>
                            </div>




                        </div>
                    </Form>
                </div>
            </div>
        </AppLayout>
    )
}