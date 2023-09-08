<h1 align="center"> <img src="https://raw.githubusercontent.com/wiltonmartinsdev/FoodExplorer-Front-end/1b71719f4470b524b48d83db6a86c084c658f796/src/assets/polygon.svg"/> Food Explorer </h1>

<p align="center">
  <a href="#usedStacks">Stacks utilizadas</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#prerequisite">Pré-requisitos</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#installation">Instalação</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#database">Banco de Dados</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#environmentVariables">Variáveis de Ambiente</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#applicationExecution">Execução da Aplicação</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#functionalities">Funcionalidades</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#license">Licença</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#projectStatus">Status do Projeto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#learnings">Aprendizados</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
</p>

- Este projeto consiste em desenvolver um menu interativo de ponta a ponta, ou seja, do Front-End ao Back-End onde terá duas personas que serão o Admin e Usuário.

- Projeto Final proposto pelo programa de formação [Explorer](https://www.rocketseat.com.br/explorer) da [RocketSeat](https://www.rocketseat.com.br/).


<h2 id="usedStacks"> Stacks utilizadas </h2>

**No Front-end:** `React.js`, `Styled-Component`.
- React.js: Uma biblioteca JavaScript para criar interfaces de usuário.
- Styled-components: Uma biblioteca que permite escrever CSS em JavaScript para estilizar componentes React.
  
**E no Back-end:** `Node.js`, `Express.js`, `Cors`, `Axios`, `JWT`, `SQLite`, `Knex.js`.
- Node.js: Um ambiente de tempo de execução JavaScript que permite executar código JavaScript fora do navegador.
- Express: Um framework para Node.js que simplifica a criação de aplicativos da web e APIs.
- Cors: Um middleware que adiciona cabeçalhos CORS (Cross-Origin Resource Sharing) às solicitações e respostas HTTP.
- Axios: Uma biblioteca para fazer requisições HTTP no navegador e no Node.js.
- JWT (JSON Web Tokens): Uma forma segura de transmitir informações entre partes como um objeto JSON.
- SQLite e Knex.js: Um banco de dados SQL leve e uma biblioteca query builder para Node.js.


<h2 id="prerequisite"> Pré-requisitos </h2>

- Node.js instalado na máquina.
- NPM (Node Package Manager) para instalar as dependências necessárias do projeto.
- Esse repositório é o Back-end da aplicação e para o correto funcionamento, em ambiente local, é necessário executá-lo em conjunto com o repositório Front-end. Você pode acessar o repositório Front-end em: https://github.com/wiltonmartinsdev/FoodExplorer-Front-end


<h2 id="installation"> Instalação </h2>

- Clone o repositório.
- Acesse o diretório do projeto: `cd FoodExplorer-Back-end`.
- Certifique-se de ter o Node.js e o NPM instalados em sua máquina e depois digite no terminal o comando abaixo para instalar todas as dependências necessárias do projeto.

        npm install


<h2 id="database"> Banco de Dados </h2>

- O banco de dados SQLite já se encontra configurado ao instalar as dependências do projeto, e não requer mais etapas de configuração.


<h2 id="environmentVariables"> Variáveis de Ambiente </h2>

- Renomeie o arquivo .env.example para .env no diretório back-end e configure as variáveis de ambiente necessárias.


<h2 id="applicationExecution"> Execução da Aplicação </h2>

- Após instalar todas as dependências necessárias do projeto, agora poderá executá-lo com o seguinte passo:

- Para executar a aplicação digite no terminal o comando abaixo:

        npm run dev
        
        Após esse comando, o servidor irá ser inicializado e aparecerá a mensagem: "Server is running on Port: 3333" informando que o servidor esta sendo executado na porta 3333. A partir, desta etapa podemos testar a aplicação, lembrando que o Front-end tem que estar sendo executado em conjunto com o Back-end, para o correto funcionamento da aplicação.


<h2 id="functionalities"> Funcionalidades </h2>

Autenticação:

- Criar Conta: Novos usuários podem criar uma conta, fornecendo informações de registro.

- Fazer Login: Admin e usuário poderão fazer login na aplicação para acessar as funcionalidades referentes a cada persona, que são descritas logo abaixo.

<img src="https://github.com/wiltonmartinsdev/FoodExplorer-Front-end/blob/main/src/assets/authenticationRoutes.gif?raw=true" />

Para o Usuário:

- Buscar Pratos: O usuário pode buscar pratos tanto pelo nome quanto pelos ingredientes, para encontrar pratos específicos.
- Visualizar Pratos: Ao clicar na imagem do prato o usuário será redirecionado para uma nova tela com informações mais detalhadas como nome, descrição, ingredientes, preço e imagem.
- Marcar como Favorito: O usuário pode marcar seus pratos favoritos para fácil acesso posterior.

<img src="https://github.com/wiltonmartinsdev/FoodExplorer-Front-end/blob/main/src/assets/userRoutes.gif?raw=true" />

Para o Admin:

- Visualizar Pratos: O admin pode ver a lista completa de pratos, assim como os usuários.
- Criar Pratos: O admin tem a capacidade de criar novos pratos, inserindo informações como nome, descrição, ingredientes, categoria, preço e imagem.
- Editar Pratos: O admin pode editar as informações dos pratos existentes, como nome, descrição, ingredientes, categoria, preço e imagem.
- Apagar Pratos: O admin pode remover pratos do menu, se necessário.
- Fazer Upload de Imagens: O admin pode fazer upload de imagens para cada prato, tornando a apresentação visual mais atrativa.
- OBSERVAÇÃO: Para acessar as funcionalidades do Admin, utilize as seguintes credencias: `Email: adminuser@foodexplorer.com` e `Senha: 123456`.

<img src="https://github.com/wiltonmartinsdev/FoodExplorer-Front-end/blob/main/src/assets/adminRoutes.gif?raw=true" />


<h2 id="license"> Licença </h2>
<p>
  <img alt="License" src="https://img.shields.io/github/license/wiltonmartinsdev/FoodExplorer-Back-end">
</p>


<h2 id="projectStatus"> Status do Projeto </h2>

-   Conforme com o que foi proposto, pelos requisitos obrigatórios para desenvolver o projeto, o Back-end, temporariamente, não encontra-se finalizado! A aplicação esta integrada, com o Front-end, até a parte de autenticação do usuário e cadastro de um novo prato!


<h2 id="learnings"> Aprendizados </h2>

- A cada novo projeto proposto no Explorer sempre há novos aprendizados e desafios, focados em nos levar a pensar fora da caixa e com isso sempre aprimorando cada vez mais o meu conhecimento adquirido em desenvolvimento Web FullStack.

- Foram inúmeras horas de dedicação intensa, envolvendo estudos e práticas. Renunciei a muitas coisas para embarcar nesse processo de aprendizagem pelo Explorer, enfrentando inúmeras dificuldades ao longo do caminho. Embora eu esteja ciente de que a jornada ainda é longa e o aprendizado é contínuo, é extremamente gratificante olhar para trás e perceber todas as adversidades superadas durante o desenvolvimento deste projeto. Ver que sou capaz de criar uma aplicação completa, desde o Front-end até o Back-end, é um testemunho tangível de todo o progresso alcançado.

- Este projeto se destacou como um desafio significativo, mas todos os desafios anteriores também desempenharam um papel crucial em minha jornada. No entanto, este é especial, pois marca o capítulo final da minha jornada no Explorer.

- Durante a realização deste projeto, adquiri proficiência em uma série de novas tecnologias, incluindo React.js, Styled-Components, Node.js, Express.js, Cors, Axios, JWT, Sqlite e Knex.js. Aprender a criptografar senhas de usuário, validar e-mails e explorar outras nuances foram aspectos muito importantes nessa minha experiência.

- Minha jornada de aprendizado foi moldada não apenas pela prática, mas também pela pesquisa em diversas fontes, incluindo o fórum do Explorer, Google, YouTube, Stack Overflow, MDN Web Docs e, até mesmo, minhas interações com o chatGPT. Rever as aulas e trabalhar não só neste projeto, mas também nos anteriores, permitiu a aplicação prática de todo o conhecimento acumulado ao longo do Explorer.

