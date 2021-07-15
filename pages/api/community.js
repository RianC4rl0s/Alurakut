import { SiteClient } from 'datocms-client'

export default async function requestReciver(request, response) {

    if (request.method == 'POST') {
        const TOLKEN = '9396c1b08b0133aed7ac286750213c'

//LEMBRAR DE VALIDAR DADOS

        const client = new SiteClient(TOLKEN)
        const record = await client.items.create({
            
            itemType: '967657',
            
            ...request.body
            
            //title: 'teste',
            //imageUrl: 'https://github.com/RianC4rl0s.png',
            //link: 'https://www.youtube.com/',
            //creatorSlug: 'teste3'
        })

        response.json({

            data: 'data',

            record: record
        })

        return;
    }
    response.status(404).json({
     message: 'ainda nao tem itens no GET'
 })

}