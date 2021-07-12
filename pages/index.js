
import MainGrid from '../src/components/mainGrid'
import Box from '../src/components/box'
import { ProfileRelationsBoxWrapper } from '../src/components/profileRelations'
import { AlurakutMenu,OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons'

function ProfileSideBar(props) {
  return (
    <Box >
      {/*pegando o valor do prop  */}
      <img src={`https://www.github.com/${props.githubUser}.png`} style={{ borderRadius: '8px' }} />
    </Box>
  )
}

export default function Home() {
  const user = 'RianC4rl0s'
  const favoritePeople = ['yuregsf', 'junior-ch-rc', 'peas', 'araujolucas3005', 'higorbreno']

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
              Welcome!!!
            </h1>
            <OrkutNostalgicIconSet></OrkutNostalgicIconSet>
          </Box>
        </div>
        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              People ({favoritePeople.length})
            </h2>

            <ul>

              {
                //MAP transforma o array e devolve, o foreach cria as coisas
                favoritePeople.map((entity) => {
                  return (
                    <li>

                      <a href={`/users/${entity}`} key={entity}>
                        <img src={`https://github.com/${entity}.png`}></img>
                        <span>{entity}</span>
                      </a>
                    </li>
                  )

                })
              }
            </ul>

          </ProfileRelationsBoxWrapper>
          <Box >
            Community
          </Box>

        </div>
      </MainGrid>
    </>
  )
}
