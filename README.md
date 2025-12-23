# Project Boilerplate

Boilerplate completo para projetos freelancer com React, TypeScript, Node.js e PostgreSQL.

## Tecnologias

### Frontend
- React 18
- TypeScript
- Vite
- React Router DOM
- Zustand (State Management)
- Axios
- React Hook Form + Zod

### Backend
- Node.js
- TypeScript
- Express
- Prisma ORM
- PostgreSQL
- JWT Authentication
- bcryptjs

### DevOps
- Docker & Docker Compose
- PostgreSQL 15

## Estrutura do Projeto

```
project-boilerplate/
├── frontend/               # Aplicação React
│   ├── src/
│   │   ├── components/    # Componentes reutilizáveis
│   │   │   ├── common/   # Componentes comuns
│   │   │   └── layout/   # Layout (Header, Footer)
│   │   ├── pages/        # Páginas da aplicação
│   │   ├── services/     # Serviços de API
│   │   ├── hooks/        # Custom hooks
│   │   ├── store/        # Gerenciamento de estado
│   │   ├── types/        # Tipos TypeScript
│   │   └── utils/        # Funções utilitárias
│   └── ...
├── backend/               # API Node.js
│   ├── src/
│   │   ├── controllers/  # Controllers
│   │   ├── routes/       # Rotas da API
│   │   ├── middlewares/  # Middlewares
│   │   ├── services/     # Lógica de negócio
│   │   ├── types/        # Tipos TypeScript
│   │   └── config/       # Configurações
│   ├── prisma/           # Schema e migrations
│   └── ...
└── docker-compose.yml     # Configuração Docker

```

## Configuração Inicial

### 1. Clone e Configure

```bash
cd project-boilerplate
cp .env.example .env
```

### 2. Configure o Banco de Dados

Inicie o PostgreSQL com Docker:

```bash
docker-compose up -d
```

### 3. Configure o Backend

```bash
cd backend
npm install
cp .env.example .env

# Execute as migrations
npm run prisma:migrate

# (Opcional) Popule o banco com dados de teste
npm run prisma:seed

# Inicie o servidor de desenvolvimento
npm run dev
```

O backend estará rodando em `http://localhost:4000`

### 4. Configure o Frontend

```bash
cd frontend
npm install
cp .env.example .env

# Inicie o servidor de desenvolvimento
npm run dev
```

O frontend estará rodando em `http://localhost:3000`

## Scripts Disponíveis

### Frontend

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Cria build de produção
- `npm run preview` - Preview do build de produção
- `npm run lint` - Executa o linter

### Backend

- `npm run dev` - Inicia o servidor com hot reload
- `npm run build` - Compila o TypeScript
- `npm start` - Inicia o servidor de produção
- `npm run prisma:generate` - Gera o Prisma Client
- `npm run prisma:migrate` - Executa migrations
- `npm run prisma:studio` - Abre o Prisma Studio
- `npm run prisma:seed` - Popula o banco com dados de teste

## Páginas Implementadas

- **Home** (`/`) - Página inicial
- **Sobre** (`/sobre`) - Sobre a empresa
- **Serviços** (`/servicos`) - Serviços oferecidos
- **Contato** (`/contato`) - Formulário de contato
- **Login** (`/login`) - Autenticação de usuários
- **Cadastro** (`/cadastro`) - Registro de novos usuários

## API Endpoints

### Autenticação
- `POST /api/auth/register` - Registrar novo usuário
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Dados do usuário autenticado
- `POST /api/auth/logout` - Logout

### Usuários (Requer autenticação)
- `GET /api/users` - Listar usuários
- `GET /api/users/:id` - Buscar usuário
- `PUT /api/users/:id` - Atualizar usuário
- `DELETE /api/users/:id` - Deletar usuário

### Contato
- `POST /api/contact` - Enviar mensagem de contato

## Credenciais de Teste

Após executar `npm run prisma:seed`, você pode usar:

- Email: `admin@example.com`
- Senha: `123456`

## Personalizando para Seu Projeto

### 1. Atualize as informações do projeto

- Altere o nome em `package.json` (frontend e backend)
- Atualize o `README.md` com informações do seu projeto
- Modifique o título em `frontend/index.html`

### 2. Customize o conteúdo

- Atualize textos nas páginas em `frontend/src/pages/`
- Modifique os serviços em `Services.tsx`
- Ajuste informações de contato no `Footer.tsx`

### 3. Adicione seus próprios modelos

- Edite `backend/prisma/schema.prisma`
- Execute `npm run prisma:migrate` para criar as migrations
- Crie controllers e rotas correspondentes

### 4. Estilize sua aplicação

- Adicione Tailwind CSS, Styled Components ou sua solução preferida
- Customize o CSS em `frontend/src/index.css`
- Crie seu design system em `components/common/`

## Segurança

- Altere `JWT_SECRET` no `.env` para produção
- Use senhas fortes para o banco de dados
- Implemente rate limiting em produção
- Configure CORS adequadamente
- Valide todas as entradas do usuário

## Deploy

### Frontend (Vercel/Netlify)

1. Faça build: `npm run build`
2. Configure as variáveis de ambiente
3. Deploy da pasta `dist/`

### Backend (Railway/Heroku/DigitalOcean)

1. Configure as variáveis de ambiente
2. Execute as migrations: `npm run prisma:migrate`
3. Inicie com: `npm start`

## Suporte

Para problemas ou dúvidas, abra uma issue no repositório.

## Licença

MIT
