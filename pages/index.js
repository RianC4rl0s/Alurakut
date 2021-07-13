
import React from 'react'
import MainGrid from '../src/components/mainGrid'
import Box from '../src/components/box'
import { ProfileRelationsBoxWrapper } from '../src/components/profileRelations'
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons'

function ProfileSideBar(props) {
  return (
    <Box as="aside">
      {/*pegando o valor do prop  */}
      <img src={`https://www.github.com/${props.githubUser}.png`} style={{ borderRadius: '8px' }} />
      <hr />
      <p>
        <a className="boxLink" href={`https://github.com/${props.githubUser}`}>
          @{props.githubUser}
        </a>
      </p>
      <hr />
      <AlurakutProfileSidebarMenuDefault>
      </AlurakutProfileSidebarMenuDefault>
    </Box>
  )
}

export default function Home() {


  const user = 'RianC4rl0s'
  const favoritePeople = ['yuregsf', 'junior-ch-rc', 'peas', 'araujolucas3005', 'higorbreno']

  const [community, setCommunity] = React.useState(
    [{
      id: '223456853',
      title: 'Eu odeio acrodar cedo',
      image: 'https://alurakut.vercel.app/capa-comunidade-01.jpg',
      link: 'https://github.com/RianC4rl0s'
    }]
  )

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
          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>
            <form onSubmit={function handleCreateCommunity(e) {
              e.preventDefault();
              const formData = new FormData(e.target)

              console.log(formData.get('title'))
              console.log(formData.get('image'))

              const newCommunity = {
                id: new Date().toISOString,
                title: formData.get('title'),
                image: formData.get('image'),
                link: formData.get('link')
              }
              //Os 3 pontos é um spread, significa que ele pega o array e coloca valor nele 
              const attCommunity = [...community, newCommunity]
              setCommunity(attCommunity);
              console.log(attCommunity)

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
        </div>
        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle"> Comunidades ({community.length})  </h2>
            <ul>
              {
                //MAP transforma o array e devolve, o foreach cria as coisas
                community.slice(0,6).map((entity) => {
                  return (
                    <li key={entity.id}>

                      {/*<a href={`/users/${entity.title}`} key={entity.id}>*/}
                      <a href={entity.link} >
                        {/*<img src={`http://placehold.it/300x300`}></img>*/}
                        <img src={entity.image}></img>
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
                favoritePeople.slice(0,6).map((entity) => {
                  return (
                    <li key={entity}>
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
