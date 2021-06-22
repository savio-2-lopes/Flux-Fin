<h3 align="center">
    <img alt="kanban" title="kanban" src="./assets/01.gif" width="800px" />
</h3> 
 
<p align="center"> :computer: <strong>Em progresso ...</strong> 🚧</p>

<p align="center"> 
   <img src="https://img.shields.io/badge/version-0.0.1-yellow.svg" />
  
  <a href="https://github.com/savio-2-lopes">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" target="_blank" />
  </a>
 
 <a href="https://github.com/savio-2-lopes">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-blue.svg" target="_blank" />
  </a>
</p>

<br>

## :pushpin: Índice

- [Sobre](#sobre-o-projeto)
- [Progresso](#progresso)
- [Como executar](#executar)
- [Tecnologias](#tecnologia)
- [Desenvolvido por](#desenvolvido)
- [Licença](#licenca)
- [Agradecimentos](#agradecimentos)

<br>

<a id="sobre-o-projeto"></a>

## 💻 Sobre o projeto

:memo: Sistema de organização e gerenciamento de projetos Fluxfin

<br>

<a id="executar"></a>

## 🚀 Como executar o projeto

### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/),[Mongo.db](https://www.mongodb.com/) e o gerenciador de pacotes [Yarn](https://yarnpkg.com/).
Além disto é bom ter um editor para trabalhar com o código, como [VSCode](https://code.visualstudio.com/)

<br>

#### 🧭 Rodando o frontend

```bash

# Clone esse repositório
$ git clone https://github.com/savio-2-lopes/Flux-Fin.git

# Entre na pasta
$ cd Flux-Fin/client

# Crie um arquivo denominado .env.local dentro da pasta client e adicione a chave da api google
$ REACT_APP_SECRET_GOOGLE_CLIENT=<ADD_SECRET_KEY>

# Instale as depedências
$ yarn

# Rode o comando
$ yarn start

```

<br>

<h3 align="center">
    <img alt="kanban" title="kanban" src="./assets/01.gif" width="800px" />
</h3>

<br>

#### 🧭 Rodando o backend

```bash

# Primeiro inicie a conexão com o MongoDB
$ sudo systemctl start mongod

# Caso seja no Windows, rode como admin o comando
$ "C:\Program Files\MongoDB\Server\4.4\bin\mongo.exe"

# Com o repositório clonado entre na pasta
$ cd Flux-Fin/server

# Crie um arquivo .env dentro da pasta server e adicione dentro dele uma senha
$ SECRET=<ADD_SECRET_KEY>

# Instale as depedências
$ yarn

# Rode o comando
$ yarn dev

```

<br>

<h3 align="center">
    <img alt="kanban" title="kanban" src="./assets/02.gif" width="800px" />
</h3>

<br>

<a id="tecnologia"></a>

## 🛠 Tecnologias

As seguintes ferramentas foram usadas na construção do projeto:

- [Mongodb](https://www.mongodb.com/)
- [Node.js](https://nodejs.org/en/)
- [React.js](https://pt-br.reactjs.org/)
- [Electron.js](https://www.electronjs.org/)

<br>

<a id="desenvolvido"></a>

## :tada: Desenvolvido por ✨

<table>
  <tr>
<td align="center"><a href="https://github.com/BrazJu"><img src="https://avatars.githubusercontent.com/u/64876263?v=4" width="100px;" alt=""/><br /><sub><b>Braz</b></sub></a><br /><a href="#" title="Content">:rocket:</a></td>
<td align="center"><a href="http://github.com/ighormello"><img src="https://avatars.githubusercontent.com/u/64975022?s=460&u=4c2e413e158b7fbe1f3251e19f2c56e36a83924c&v=4" width="100px;" alt=""/><br /><sub><b>Ighor Mello</b></sub></a><br /><a href="#" title="Content">:rocket:</a></td>
<td align="center"><a href="https://github.com/Flameuss"><img src="https://avatars.githubusercontent.com/u/64844248?v=4" width="100px;" alt=""/><br /><sub><b>Luis Henrique</b></sub></a><br /><a href="#" title="Content">:rocket:</a></td>
<td align="center"><a href="https://github.com/savio-2-lopes/"><img src="https://avatars.githubusercontent.com/u/60948849?s=460&u=d960a616d3701e0622420a48e5d9db98cb7ee46e&v=4" width="100px;" alt=""/><br /><sub><b>Savio Lopes</b></sub></a><br /><a href="#" title="Content">:rocket:</a></td>
    <td align="center"><a href="https://github.com/CestariTiago/"><img src="https://avatars.githubusercontent.com/u/65381060?v=4" width="100px;" alt=""/><br /><sub><b>Tiago Cestari</b></sub></a><br /><a href="#" title="Content">:rocket:</a></td>
  </tr>
</table>

<br>

<a id="licenca"></a>

## :memo: Licença

Este projeto está sob a licença do MIT. Veja a [página de licença](https://opensource.org/licenses/MIT) para mais detalhes.

<br>

<a id="agradecimento"></a>

## 💙 Agradecimentos

Obrigado [Rocketseat](https://rocketseat.com.br/) por disponibilizar esse conteúdo sensacional 🚀.
