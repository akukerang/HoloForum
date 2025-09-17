import InputError from "./input-error";
import { Label } from "./ui/label";
import { Textarea as ShadTextarea } from "./ui/textarea";

interface Props {
    table: string;
    name: string;
    value: string;
    placeholder?: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
    errors?: Record<string, string>;
}


export default function Textarea({ table, name, value, placeholder, onChange, errors }: Props) {
    return (
        <div>
            <Label htmlFor={`${table} ${name}`}>{name}</Label>
            <ShadTextarea placeholder={placeholder} value={value}
                onChange={onChange} />
            {errors?.[name] && <InputError message={errors[name]} />}
        </div>
    )

}