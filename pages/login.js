import React from 'react';
import { useRouter } from 'next/router'
import nookies from 'nookies'
import MainGrid from '../src/components/mainGrid';
export default function LoginScreen() {
    const router = useRouter()
    const [githubUser, setGithubUser] = React.useState('')
    return (
        <MainGrid style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <div className="loginScreen">
                <section className="logoArea">
                    <img src="https://alurakut.vercel.app/logo.svg" />

                    <p><strong>Conecte-se</strong> aos seus amigos e familiares usando recados e mensagens instantâneas</p>
                    <p><strong>Conheça</strong> novas pessoas através de amigos de seus amigos e comunidades</p>
                    <p><strong>Compartilhe</strong> seus vídeos, fotos e paixões em um só lugar</p>
                </section>

                <section className="formArea">
                    <form className="box" onSubmit={(eventInfo) => {


                        //impede que  pagina recarregue
                        eventInfo.preventDefault()
                        //js puro
                        //window.location.href = '/' 
                       // alert('clicou');

                        //api que aluta criou para retornar um token caso o usuario seja valido

                        fetch('https://alurakut.vercel.app/api/login', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ githubUser: githubUser })

                        })
                            .then(async (serverReturn) => {
                                const returnData = await serverReturn.json()
                                const token =returnData.token
                                //AQUI SE CRIA UM COOKIE E SALVA DADOS
                                nookies.set(null, 'USER_TOKEN',token,{
                                    path : '/',
                                    maxAge : 86400 * 7
                                })
                                console.log(returnData.token)
                                //redireciona a pagina (siglepage) 
                                router.push('/', {})
                            })



                    }}>
                        <p>
                            Acesse agora mesmo com seu usuário do <strong>GitHub</strong>!
                        </p>
                        <input
                            placeholder="Usuário"
                            value={githubUser}
                            onChange={(event) => {
                                //o .target.value retorna as letras digitadas dentro do campo com onChange()
                                setGithubUser(event.target.value)
                                console.log(event.target.value)

                            }}

                        />
                        {githubUser.length === 0 ? 'Preencha o Campo' : ''}
                        <button type="submit">
                            Login
                        </button>
                    </form>

                    <footer className="box">
                        <p>
                            Ainda não é membro? <br />
                            <a href="/login">
                                <strong>
                                    ENTRAR JÁ
                                </strong>
                            </a>
                        </p>
                    </footer>
                </section>

                <footer className="footerArea">
                    <p>
                        © 2021 alura.com.br - <a href="/">Sobre o Orkut.br</a> - <a href="/">Centro de segurança</a> - <a href="/">Privacidade</a> - <a href="/">Termos</a> - <a href="/">Contato</a>
                    </p>
                </footer>
            </div>
        </MainGrid>
    )
}
