# Projeto Financeiro

Esse é o resultado do meu primeiro tech challenge da FIAP, o projeto financeiro.
É um projeto Next com typescript, que utiliza app router e rotas de api, com um BFF integrando ao MongoDB com a lib mongoose.

## Estrutura do projeto

```
├── src/
│ ├── app/
│ ├── components/
│ ├── context/
│ ├── lib/
│ ├── models/
│ ├── services/
│ ├── types/
├ └── middleware.ts

```

## Como rodar

1. **Instale as dependências**

```bash
npm install
```

2. **Tenha um projeto cloud MongoDB**

caso não tenha acesse:
https://cloud.mongodb.com

copie a uri da sua conexão


3. **Crie um arquivo .env com a URI do mongoDB na raiz do repositório**

Seu arquivo deve ficar parecido com isso
```
MONGODB_URI=mongodb+srv://<username>:<password>@billing-project.ujjvbep.mongodb.net/?retryWrites=true&w=majority&appName=<appName>
```
4. **Rodar em um terminal na raiz do repositório**

bash
```
npm run dev
```

Após isso basta acessar: http://localhost:3000/