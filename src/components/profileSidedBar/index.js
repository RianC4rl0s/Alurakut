import React from 'react'
import Box from '../box'
import {AlurakutProfileSidebarMenuDefault} from '../../lib/AlurakutCommons'


export default function ProfileSideBar(props) {
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