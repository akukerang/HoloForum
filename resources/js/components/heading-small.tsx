export default function HeadingSmall({ title, description }: { title: string; description?: string }) {
    return (
        <header>
            <h3 className="mb-0.5 text-blue font-medium">{title}</h3>
            {description && <p className="text-sm text-text">{description}</p>}
        </header>
    );
}
