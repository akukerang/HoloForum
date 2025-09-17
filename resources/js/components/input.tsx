import InputError from "./input-error";
import { Input as ShadInput } from "./ui/input";
import { Label } from "./ui/label";

interface Props {
    table: string;
    name: string;
    value: string;
    placeholder?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    errors?: Record<string, string>;
}


export default function Input({ table, name, value, placeholder, onChange, errors }: Props) {
    return (
        <div className="space-y-1">
            <Label htmlFor={`${table} ${name}`}>{name.charAt(0).toUpperCase() + name.slice(1)}</Label>
            <ShadInput placeholder={placeholder} value={value}
                onChange={onChange} />
            {errors?.[name] && <InputError message={errors[name]} />}
        </div>
    )

}