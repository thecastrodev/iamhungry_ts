<h1 align="center">
  🍕 I am Hungry
</h1>

<p align="center">
  <a href="#-tecnologias">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-documentacao">Documentação Oficial</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-sobre-o-projeto">Projeto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-instalação">Instalação</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-uso">Uso</a>&nbsp;&nbsp;&nbsp;
</p>

<br>

## 🌐 Tecnologias

O projeto foi desenvolvido com as seguintes tecnologias:

- [Node.js](https://nodejs.org/pt-br/)
- [Express](https://expressjs.com/pt-br/)
- [Prisma ORM](https://www.prisma.io/)

## 🔧 Funcionalidades

[x] CRUD Usuarios
[x] Autenticação
[x] Validação de Entrada de Dados
[x] Mascaras em Inputs

## 💻 Sobre o Projeto

Um gerenciador de tarefas simples para organizar o dia.

## 📦 Instalação

Para clonar o projeto, com o [Git](https://git-scm.com/) já instalado no seu computador, execute o comando abaixo:

```bash
git clone https://github.com/thecastrodev/syslibrary_ts.git
```

Em seguida, abra seu editor de código na pasta do seu projeto.

Para instalar as dependências execute o comando abaixo na pasta do projeto:

```bash
npm install
```

## 🔨 Uso

A primeira coisa a ser feita é configurar o Banco de Dados com o Prisma. Rode o seguinte comando:
```bash
npx prisma migrate dev
```

Para visualizar as tabelas do banco de dados, execute o comando abaixo:
```bash
npx prisma studio
```

Agora, para rodar o projeto basta executar o comando abaixo com o terminar aberto na pasta do seu projeto:
```bash
npm run dev
```

Com o projeto rodando, agora você pode acessar a seguintes rotas pelo seu navegador:
```bash
http://localhost:3333/
```

Usando o [Insomnia](https://insomnia.rest/download), você poderá acessar as seguintes rotas de usuários:
```bash
GET http://localhost:3333/user/
GET http://localhost:3333/user/id-do-usuario

POST http://localhost:3333/user/
  body (não copie a palavra "body", só o objeto abaixo):
  {
    "name": "Castro",
    "email": "castro@email.com",
    "password": "password123",
    "cpf": "000.111.222-33",
    "phone": "88999999999",
    "cep": "00000-000",
    "state": "CE",
    "city": "Sobral",
    "district": "Centro",
    "street": "Rua Tal",
    "number": "1234",
    "complement": "Apto",
  }
```

<br/>
<br/>
<h3 align="center">
Desenvolvido por <a href="https://www.eduardocastro.dev/" target="_blank">@thecastrodev</a>
<br/>
<br/>
</h3>