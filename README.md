## Tecnologias

- [Node.js](https://nodejs.org/en/)
- [Typescript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/pt-br/)
- [Socket.io](https://socket.io/)

## 💻 Projeto

O Chatty é um chat para atendimento de clientes em tempo real.

## Executar

Após clonar o repositório adicione um arquivo `src/database/database.sqlite`.

Rode o comando para criar as tabelas no bando de dados.

```
yarn typeorm migration:run
```

e depois `yarn dev` para iniciar a aplicaçao

## Rotas

#### Chat cliente

```
http://localhost:3333/client
```
#### Chat suport

```
http://localhost:3333/admin
```