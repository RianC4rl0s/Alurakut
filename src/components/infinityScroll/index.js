import React from 'react'
import { useEffect, useState } from 'react';
import { createGlobalStyle } from 'styled-components'
import Box from '../box'

const FeedStyle = createGlobalStyle`
  /*body {
    font-family: sans-serif;
  }
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
  }*/
  
  ul {
    width: 300px;
    height: 600px;
    //overflow-y: scroll;
    padding: 0;
    background-color: #ddd;
  }
  li {
    height: 150px;
    padding: 15px;
  }
  li img {
    --size: 75px;
    width: var(--size);
    height: var(--size);
    border-radius: 50%;
  }
  li div {
    padding: 15px;
    background-color: #fff;
    height: calc(100% - 30px);
  }
  #sentinela {
    width: 100%;
    height: 5px;
    background-color: red;
  }
  #userIcon{
      width: 40px;
      height: auto;
  }
`;

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


        <Box>
            <ul>
                {followers.map(follower => (

                    <li key={follower.login}>
                        <div>
                            <hr />
                            <div id="userIcon">
                                <img src={`https://github.com/${follower.login}.png`} />

                            </div>
                            <p>
                                github.com/<strong>{follower.login}</strong>
                            </p>
                        </div>
                    </li>
                ))}
                <li id="sentinela"></li>
            </ul>

        </Box>

    </>)
}