import { useEffect, useState } from 'react';
import { createGlobalStyle } from 'styled-components'

//CODIGO DISPONIBILIZADO PELA ALURA CURSOS ONLINE
const GlobalStyle = createGlobalStyle`
  body {
    font-family: sans-serif;
  }
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  ul {
    width: 300px;
    height: 600px;
    overflow-y: scroll;
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
`;

export default function Home() {
  const [followers, setFollowers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    const perPage = 10;
    const ENDPOINT = 'https://api.github.com/users/omariosouto/followers';
    const URL = `${ENDPOINT}?per_page=${perPage}&page=${currentPage}&order=DESC`;
    fetch(URL)
      .then((response) => response.json())
      .then((newFollowers) => setFollowers((prevFollowers) => [...prevFollowers, ...newFollowers]))
  }, [currentPage]);

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

  return (
    <main>
      <GlobalStyle />
      <h1>GitHub API: Infinite Scroller</h1>
      <h2>Página atual: {currentPage}</h2>

      <ul>
        {followers.map(follower => (
          <li key={follower.login}>
            <div>
              <img src={`https://github.com/${follower.login}.png`} width="45px" ></img>
              <p>
                github.com/<strong>{follower.login}</strong>
              </p>
            </div>
          </li>
        ))}
        <li id="sentinela"></li>
      </ul>
    </main>
  )
} 