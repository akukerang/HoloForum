import {
    Editor as RSWEditor,
    BtnBold,
    BtnBulletList,
    BtnClearFormatting,
    BtnItalic,
    BtnLink,
    BtnNumberedList,
    BtnRedo,
    BtnStrikeThrough,
    BtnStyles,
    BtnUnderline,
    BtnUndo,
    ContentEditableEvent,
    Separator,
    Toolbar,
    EditorProvider,
} from 'react-simple-wysiwyg';
import { Label } from './ui/label';
import InputError from './input-error';


interface Props {
    table: string;
    name: string;
    value: string;
    onChange: (event: ContentEditableEvent) => void;
    errors?: Record<string, string>;
}


export default function Editor({ table, name, value, onChange, errors }: Props) {
    return (
        <div className='space-y-1 text-left'>
            <Label htmlFor={`${table} ${name}`}>{name.charAt(0).toUpperCase() + name.slice(1)}</Label>
            {/* // TODO: Capitalize function */}
            {errors?.[name] && <InputError message={errors[name]} />}
            <EditorProvider>
                <RSWEditor value={value} onChange={onChange}>
                    <Toolbar>
                        <BtnUndo />
                        <BtnRedo />
                        <Separator />
                        <BtnBold />
                        <BtnItalic />
                        <BtnUnderline />
                        <BtnStrikeThrough />
                        <Separator />
                        <BtnNumberedList />
                        <BtnBulletList />
                        <Separator />
                        <BtnLink />
                        <BtnClearFormatting />
                        <Separator />
                        <BtnStyles />
                    </Toolbar>
                </RSWEditor >
            </EditorProvider>
        </div>
    )
}