import { ProfileRelationsBoxWrapper } from "../profileRelations"

function ProfileRelationsBox(props) {
    return <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle"> {props.title} ({props.itens.length})  </h2>
      <ul>
        {        
          props.itens.slice(0, 6).map((entity) => {
            return (
              <li key={entity}>
  
  
                <a href={`https://github.com/${entity.login}`} >              
                  <img src={`https://github.com/${entity.login}.png`}></img>
                  <span>{entity.login}</span>
                </a>
              </li>
            )
          }) 
        }
      </ul>
    </ProfileRelationsBoxWrapper>
  }
  export default ProfileRelationsBox