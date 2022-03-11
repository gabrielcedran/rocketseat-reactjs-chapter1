import { useState, useEffect } from 'react';
import { RepositoryItem } from "./RepositoryItem";
import '../styles/repositories.scss'

// https://api.github.com/orgs/rocketseat/repos


export function RepositoryList() {

    const [repositories, setRepositories] = useState([])

    useEffect(() => {
        fetch('https://api.github.com/orgs/rocketseat/repos')
        .then(response => response.json())
        .then(json => setRepositories(json))

        // this is another way of doing it. Instead of using promises, use await and async keywords 
        // (but another function is necessary as it is not possible to declare the useEffect anonymous function as async)
        // requestRepositories()
    }, [])

    // async function requestRepositories() {
    //     const response = await fetch('https://api.github.com/orgs/rocketseat/repos')

    //     const json = await response.json()

    //     console.log(json)

    //     setRepositories(json)
    // }

    return(
        <section className="repository-list">
            <h1>Repository List</h1>

            <ul>
            {
                !repositories ? (<h1>No repositories</h1>) : 
                repositories.map((repository) => <RepositoryItem key={repository.id} repository={repository}/>)
            }
            </ul>
        </section>
    )
}