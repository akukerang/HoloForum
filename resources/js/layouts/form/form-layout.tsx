import { type ReactNode } from 'react';

interface Props {
    children: ReactNode;
    title: string;
    onSubmit: (e: React.FormEvent) => void;
}

export default function FormLayout({ children, title, onSubmit }: Props) {
    return (
        <div className='flex justify-center'>
            <div className='flex flex-col bg-baseColor text-left items-left p-8 m-8 w-8/12 shadow-md rounded-md '>
                <h1 className='text-2xl font-bold text-blue'>{title}</h1>
                <form className='space-y-4' onSubmit={onSubmit}>
                    {children}
                </form>
            </div>
        </div>
    )
}