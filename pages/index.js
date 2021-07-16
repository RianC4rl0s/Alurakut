
import React from 'react'

import jwt from 'jsonwebtoken'
import nookies from 'nookies'
import MainGrid from '../src/components/mainGrid'
import Box from '../src/components/box'
import InfinityScroll from '../src/components/infinityScroll'
import ProfileRelationsBox from '../src/components/profileRelationsBox'
import { ProfileRelationsBoxWrapper } from '../src/components/profileRelations'
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons'
import ProfileSideBar from '../src/components/profileSidedBar'


export default function Home(props) {

  //console.log(props.teste)

  const user = props.githubUser
  //const user = 'RianC4rl0s'
  const favoritePeople = ['yuregsf', 'junior-ch-rc', 'peas', 'araujolucas3005', 'higorbreno']

  const [community, setCommunity] = React.useState(
    [
      /*{
      id: '223456853',
      title: 'Eu odeio acordar cedo',
      image: 'https://alurakut.vercel.app/capa-comunidade-01.jpg',
      link: 'https://github.com/RianC4rl0s'
    }
  */
    ]
  )
  const [followers, setSeguidores] = React.useState([])
  //Não usar useEffect iria criar um loop infinito, que dependendo da api pode gerar problemas ou ban de ip
  React.useEffect(function () {
    //fetch de followers
    //GET http protocol
    fetch('https://api.github.com/users/RianC4rl0s/followers')
      .then(function (serverReturn) {
        return serverReturn.json()
      })
      .then(function (jsonPromise) {
        setSeguidores(jsonPromise)
      })

    //fetch de comunidades
    fetch('https://graphql.datocms.com/', {
      method: 'POST',
      headers: {
        'Authorization': 'efcb7f0f79864c2682894ccae319b2',
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        "query": `query {
        allCommunities {
          id
          title
          imageUrl
          link
          creatorSlug
          #_status
          #_firstPublishedAt
        }
      }` })

    })
      .then((serverReturn) => serverReturn.json())
      .then((jsonPromise) => {
        const dowloadedCommunity = jsonPromise.data.allCommunities
        setCommunity(dowloadedCommunity)
        console.log(jsonPromise)
      })
    //esse segundo parametro  com array vazio faz com que o useEffect só execute 1x
  }, [])

  /*
    //fetch retorn uma promessa
  fetch('https://api.github.com/users/RianC4rl0s/followers')
.then(function (serverReturn){
    if(serverReturn.ok){
        return serverReturn.json()
    }
    throw new Error('Error')
})
.then(function (serverReturn){
    console.log(serverReturn)

})
.catch(function (erro){
    console.log(erro)
})
  */

  //O que sera renderizado
  return (
    <>
      <AlurakutMenu githubUser={user} />
      <MainGrid>
        {/*<Box style="grid-area: profileArea;">*/}
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          {/* PASSANDO O PROP COMO VARIAVEL*/}
          <ProfileSideBar githubUser={user} />
        </div>
        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box >
            <h1 className="title">
              Bem vindo!!!
            </h1>
            <OrkutNostalgicIconSet></OrkutNostalgicIconSet>
          </Box>
          {/*FORMULARIO*/}
          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>
            <form onSubmit={function handleCreateCommunity(e) {
              e.preventDefault();
              const formData = new FormData(e.target)

              console.log(formData.get('title'))
              console.log(formData.get('image'))

              const newCommunity = {
                //id: new Date().toISOString(),
                title: formData.get('title'),
                imageUrl: formData.get('image'),
                link: formData.get('link'),
                creatorSlug: user
              }


              //NOVA FORMA DE USAR O .then
              fetch('/api/community', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(newCommunity)
              })
                .then(async (response) => {
                  const data = await response.json();
                  console.log(data.record)

                  const comu = data.record
                  //Os 3 pontos é um spread, significa que ele pega o array e coloca valor nele 
                  const attCommunity = [...community, comu]
                  setCommunity(attCommunity);
                  //console.log(attCommunity)
                })




            }
            }>
              <div>
                <input
                  name="title"
                  placeholder="Qual o nome da sau comunidade?"
                  area-aria-label="Qual o nome da sau comunidade?"
                  type="text"
                />
              </div>
              <div>
                <input
                  name="image"
                  placeholder="URL da imagem"
                  area-aria-label="URL da imagem"
                  type="text"
                />
                <input
                  name="link"
                  placeholder="Link da comunidade"
                  area-aria-label="Link da comunidade"
                  type="text"
                />
              </div>
              <button>Criar comunidade</button>
            </form>
          </Box>




          <InfinityScroll name={user}>

          </InfinityScroll>





        </div>
        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>

          <ProfileRelationsBox title="Seguidores" itens={followers}></ProfileRelationsBox>

          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle"> Comunidades ({community.length})  </h2>
            <ul>
              {
                //MAP transforma o array e devolve, o foreach cria as coisas
                community.slice(0, 6).map((entity) => {
                  return (
                    <li key={entity.id}>

                      {/*<a href={`/users/${entity.title}`} key={entity.id}>*/}
                      <a href={entity.link} >
                        {/*<img src={`http://placehold.it/300x300`}></img>*/}
                        <img src={entity.imageUrl}></img>
                        <span>{entity.title}</span>
                      </a>
                    </li>
                  )
                })
              }
            </ul>
          </ProfileRelationsBoxWrapper>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle"> Pessoas ({favoritePeople.length})  </h2>
            <ul>
              {
                //MAP transforma o array e devolve, o foreach cria as coisas
                favoritePeople.slice(0, 6).map((entity) => {
                  return (
                    <li key={entity.id}>
                      <a href={`/users/${entity}`} >
                        <img src={`https://github.com/${entity}.png`}></img>
                        <span>{entity}</span>
                      </a>
                    </li>
                  )
                })
              }
            </ul>
          </ProfileRelationsBoxWrapper>

        </div>
      </MainGrid>
    </>
  )
}
export async function getServerSideProps(context) {
  const cookies = nookies.get(context)
  const token = cookies.USER_TOKEN;
  console.log('cookie token', jwt.decode(token))



  const decodedToken = jwt.decode(token);
  const githubUser = decodedToken?.githubUser;

  if (!githubUser) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }


  //verificando autenticaçao da api
  //o retorno do fetch só é possivel por causa do await  
  /*const { isAuthenticated } = await fetch('https://alurakut.vercel.app/api/auth', {
    headers: {
      Authorization: token
    }
  })
    .then((resposta) => resposta.json())
*/
  //isso deveria autenticar o user, mas a API NAO FUNCIONA
  /*console.log(isAuthenticated)
  if (!isAuthenticated) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      }
    }
  }
*/
  //const { githubUser } = jwt.decode(token)
  return {
    props: {
      githubUser,
      teste: token

    }, // will be passed to the page component as props
  }
}
