# Guia de Setup Rápido

Este guia mostra como configurar o projeto em menos de 5 minutos.

## Pré-requisitos

- Node.js 18+ instalado
- Docker e Docker Compose instalados
- Git instalado

## Setup Rápido

### 1. Configuração Inicial

```bash
# Copie o arquivo de variáveis de ambiente
cp .env.example .env

# Inicie o banco de dados
docker-compose up -d
```

### 2. Backend

```bash
cd backend

# Instale as dependências
npm install

# Copie as variáveis de ambiente
cp .env.example .env

# Execute as migrations do banco
npm run prisma:migrate

# (Opcional) Popule com dados de teste
npm run prisma:seed

# Inicie o servidor
npm run dev
```

O backend estará rodando em `http://localhost:4000`

### 3. Frontend

Abra um novo terminal:

```bash
cd frontend

# Instale as dependências
npm install

# Copie as variáveis de ambiente
cp .env.example .env

# Inicie o servidor
npm run dev
```

O frontend estará rodando em `http://localhost:3000`

## Verificação

1. Acesse `http://localhost:3000` - você deve ver a página inicial
2. Acesse `http://localhost:4000/health` - deve retornar `{"status":"ok"}`
3. Tente fazer login com:
   - Email: `admin@example.com`
   - Senha: `123456`

## Próximos Passos

1. Personalize o conteúdo das páginas
2. Ajuste o schema do banco em `backend/prisma/schema.prisma`
3. Adicione suas próprias funcionalidades
4. Estilize a aplicação

## Problemas Comuns

### Porta já em uso

Se a porta 4000 ou 3000 já estiver em uso, você pode alterá-las:

**Backend**: Edite `backend/.env` e altere `PORT`
**Frontend**: Edite `frontend/vite.config.ts` e altere `server.port`

### Erro de conexão com banco

Certifique-se de que o Docker está rodando:

```bash
docker-compose ps
```

Se não estiver rodando:

```bash
docker-compose up -d
```

### Prisma Client não encontrado

Execute:

```bash
cd backend
npm run prisma:generate
```

## Ferramentas Úteis

### Prisma Studio

Interface visual para o banco de dados:

```bash
cd backend
npm run prisma:studio
```

Abre em `http://localhost:5555`

### Docker Logs

Para ver logs do PostgreSQL:

```bash
docker-compose logs -f postgres
```

## Limpeza

Para parar e remover tudo:

```bash
# Parar containers
docker-compose down

# Remover volumes (apaga dados do banco)
docker-compose down -v
```
