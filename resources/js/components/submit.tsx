import { Button } from "./ui/button";

interface Props {
    text: string;
    processing: boolean;
}

export default function Submit({ text, processing }: Props) {
    return (
        <Button type='submit' disabled={processing}>{text}</Button>
    )
}