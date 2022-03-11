type RepositoryItemProps = {
    repository: {
    name: string;
    description: string;
    html_url: string;
    }
}

// two levels of destructuring repository => name, description, html_url
export function RepositoryItem({repository: {name, description, html_url}}: RepositoryItemProps) {
    return (
        <li>
            <strong>{name}</strong>
            <p>{description}</p>
            <a href={html_url}>Open Repository</a>
        </li>
    )
}