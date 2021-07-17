import React from 'react'
import nookies from 'nookies'

export default () => {

  return (
    <div>Logout</div>

  )

}

export async function getServerSideProps(context) {
  /*const cookies = nookies.get(context)
  const token = cookies.USER_TOKEN;
  console.log('cookie token', jwt.decode(token))*/

  nookies.destroy(context, 'USER_TOKEN')

  return {
    redirect: {
      destination: '/login',
      permanent: false,
    }
  }
}





/*import React from "react"

import nookies from 'nookies'

export default class Remove extends React.Component {
    static getInitialProps(ctx) {
      const USER_TOKEN = nookies.get(ctx).USER_TOKEN


        nookies.destroy(ctx, USER_TOKEN)


      return {

        server: true,
        redirect: {
            destination: '/login',
            permanent: false,
          }
      }
    }
}*/