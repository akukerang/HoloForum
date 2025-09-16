import Editor, {
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
    // HtmlButton,
    Separator,
    Toolbar,
} from 'react-simple-wysiwyg';


interface Props {
    value: string;
    onChange: (event: ContentEditableEvent) => void
}


export default function EditorCustom({ value, onChange }: Props) {
    return (
        <Editor value={value} onChange={onChange} className='bg-card'>
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
                {/* <HtmlButton /> */}
                <Separator />
                <BtnLink />
                <BtnClearFormatting />
                <Separator />
                <BtnStyles />
            </Toolbar>
        </Editor >
    )
}