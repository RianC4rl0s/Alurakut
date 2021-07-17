import React from 'react'
import { useEffect, useState } from 'react';
import { createGlobalStyle } from 'styled-components'
import Box from '../box'

//BASEADO NO CODIGO DE OMARIOSOUTO

export default function InfinityScroll(props) {
    const user = props.name
    const [followers, setFollowers] = React.useState([])
    const [currentPage, setCurrentPage] = React.useState(1)
    useEffect(() => {
        const perPage = 10;
        const ENDPOINT = `https://api.github.com/users/${user}/followers`;
        const URL = `${ENDPOINT}?per_page=${perPage}&page=${currentPage}&order=DESC`;
        fetch(URL)
            .then((response) => response.json())
            .then((newFollowers) => setFollowers((prevFollowers) => [...prevFollowers, ...newFollowers]))
    }, [currentPage]);
    console.log(followers)

    useEffect(() => {
        const intersectionObserver = new IntersectionObserver(entries => {
            if (entries.some(entry => entry.isIntersecting)) {
                console.log('Sentinela appears!', currentPage + 1)
                setCurrentPage((currentValue) => currentValue + 1);
            }
        })
        intersectionObserver.observe(document.querySelector('#sentinela'));
        return () => intersectionObserver.disconnect();
    }, []);

    return (<>


        
            <ul>
                {followers.map(follower => (

                    <li key={follower.login}>
                        <div>
                            <hr />
                            <p>
                                github.com/<strong>{follower.login}</strong>
                            </p>
                            <div id="userIcon">
                                <img src={`https://github.com/${follower.login}.png`} />

                            </div>
                            
                        </div>
                    </li>
                ))}
                <div id="sentinela"></div>
            </ul>

       

    </>)
}