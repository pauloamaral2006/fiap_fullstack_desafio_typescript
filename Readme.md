# 📚 Sistema de Gerenciamento de Biblioteca

## 🎯 Objetivo

Desenvolver uma API para gerenciamento de biblioteca utilizando a versão mais recente do **TypeScript**, com foco na implementação de um CRUD (Create, Read, Update, Delete) para livros.

O sistema deve permitir que uma aplicação **Front-end** consuma os dados e realize operações de cadastro, consulta, atualização e exclusão de livros.

---

## 🚀 Tecnologias Utilizadas

* **TypeScript (6.0.2)**
* **Node.js (22.11.0)**
* **Express (5.2.1)**
* **TypeORM (0.3.6)**
* **SQLite (6.0.1)**

---

## 📌 Requisitos Técnicos

* Implementação utilizando a versão mais recente do TypeScript
* Estrutura organizada em camadas (Controller, Service, Entity)
* Integração com banco de dados
* API RESTful
* Tratamento de erros
* Código limpo e boas práticas

---

## ⚙️ Requisitos Funcionais

### 📖 Gerenciamento de Livros

A API deve permitir:

* ✅ Criar um livro
* ✅ Listar todos os livros
* ✅ Buscar livro por ID
* ✅ Atualizar informações de um livro
* ✅ Deletar um livro

---

## 📚 Estrutura de Dados (Exemplo)

```json
{
  "id": 1,
  "titulo": "Harry Potter e a Pedra Filosofal",
  "autor": "J.K. Rowling",
  "isbn": "9788532511010",
  "ano_publicacao": 1997,
  "editora": {
    "id": 1,
    "nome": "Rocco"
  }
}
```

---

## 🔌 Endpoints da API

| Método | Endpoint     | Descrição               |
| ------ | ------------ | ----------------------- |
| GET    | /editora     | Listar todos os editora |
| GET    | /editora/:id | Buscar por ID           |
| POST   | /editora     | Criar nova editora      |
| PUT    | /editora/:id | Atualizar editora       |
| DELETE | /editora/:id | Remover editora         |
| GET    | /livros      | Listar todos os livros  |
| GET    | /livros/:id  | Buscar por ID           |
| POST   | /livros      | Criar novo livro        |
| PUT    | /livros/:id  | Atualizar livro         |
| DELETE | /livros/:id  | Remover livro           |

---

## 🔍 Filtros (Query Params)

A listagem de livros pode aceitar filtros opcionais:

```
GET /livros?autor=Rowling&titulo=Harry&editoraId=1&editoraNome=Rocco
```

---

## ▶️ Como Executar o Projeto

```bash
# instalar dependências
npm install

# rodar em desenvolvimento
npm run dev

# build
npm run build

# rodar produção
npm start
```

---

## 🧠 Boas Práticas Aplicadas

* Separação de responsabilidades (Controller / Service / Entity)
* Tratamento de erros customizados
* Evitar duplicidade de dados (ex: ISBN único)
* Código tipado com TypeScript

---


## 👨‍💻 Autor

Desenvolvido por Paulo Henrie Lopes como parte de um desafio técnico.

---

## 📄 Licença

Este projeto é apenas para fins educacionais.
