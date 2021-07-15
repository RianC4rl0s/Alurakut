import React from 'react'


export default function InfinityScroll() {
    const [followers, setFollowers] = React.useState([])
    const [currentPage, setCurrentPage] = React.useState(1)
    React.useEffect(() => {
        const per_page = 10
        const URL_CONFIG = `?per_page=${per_page}&page=${currentPage}&order=DESC`
        const URL = `https://api.github.com/users/peas/followers${URL_CONFIG}`
        
        
      
        fetch(URL)
            .then(function (serverReturn) {
                return serverReturn.json()
            })
            .then(function (jsonPromise) {
                
                setFollowers(jsonPromise)
            })
        //esse segundo parametro com array vazio faz com que o useEffect só execute 1x
    }, [currentPage])
    console.log(followers)
    React.useEffect(() => {

    
        const intersectionObserver = new IntersectionObserver(entries => {
            console.log('olhou')

            if (entries.some(entry => entry.isIntersecting)) {
                console.log(currentPage + 1)
                setCurrentPage((currentPageInState) => currentPageInState + 1)

            }
        })
        intersectionObserver.observe(document.querySelector('#sentinela'))

        return () => intersectionObserver.disconnect()

    }, [])

    return (<>


        <ul>
            {
                followers.map((entity, index) => {
                    <li key={entity.login + index} >

                       
                        <p>
                            {entity.login}
                        </p>
                    </li>
                })
            }
            <li id='sentinela'></li>
        </ul>

    </>)
}