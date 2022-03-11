export function RepositoryItem({repository}) {
    return (
        <li>
            <strong>{repository?.name ?? "unform"}</strong>
            <p>{repository?.description}</p>
            <a href={repository?.html_url}>Open Repository</a>
        </li>
    )
}