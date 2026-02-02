# Configuração para Requisições HTTP em Desenvolvimento

Este guia explica como configurar o projeto para fazer requisições HTTP (sem HTTPS) em ambiente de desenvolvimento/teste.

## ✅ O que foi configurado

### 1. **Backend - CORS Permissivo para Desenvolvimento**
- O CORS agora aceita automaticamente requisições de `http://localhost` em qualquer porta
- Permite requisições HTTP em desenvolvimento
- Em produção, usa as origens configuradas em `CORS_ORIGIN`

### 2. **Frontend - URLs HTTP em Desenvolvimento**
- O `api.ts` agora detecta automaticamente o ambiente
- Em desenvolvimento, usa `http://localhost:4000` por padrão
- O `formService.ts` garante que URLs usem `http://` em desenvolvimento

## 🔧 Configuração

### Backend (.env)

Crie um arquivo `.env` na pasta `backend/`:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/dbname?schema=public"

# Server
PORT=4000
NODE_ENV=development

# CORS - Deixe vazio ou use múltiplas origens separadas por vírgula
# Em desenvolvimento, o servidor aceita automaticamente localhost
CORS_ORIGIN=

# JWT
JWT_SECRET=your-secret-key-here
JWT_EXPIRES_IN=7d

# Email (opcional)
ADMIN_EMAIL=admin@seusite.com
```

### Frontend (.env)

Crie um arquivo `.env` na pasta `frontend/`:

```env
# API Configuration - Use HTTP para desenvolvimento
VITE_API_URL=http://localhost:4000

# Para usar o backend para formulários
VITE_USE_BACKEND=true
```

## 🚀 Como Testar

1. **Inicie o backend:**
   ```bash
   cd backend
   npm run dev
   ```
   O servidor deve iniciar em `http://localhost:4000`

2. **Inicie o frontend:**
   ```bash
   cd frontend
   npm run dev
   ```
   O frontend deve iniciar em `http://localhost:3000`

3. **Teste uma requisição:**
   - Abra o DevTools (F12)
   - Vá para a aba Network
   - Faça uma requisição (ex: login, formulário)
   - Verifique que a requisição é feita para `http://localhost:4000` (não HTTPS)

## 🔍 Verificações

### Se ainda tiver problemas com CORS:

1. **Verifique se o backend está rodando:**
   ```bash
   curl http://localhost:4000/health
   ```
   Deve retornar: `{"status":"ok","timestamp":"..."}`

2. **Verifique o CORS no backend:**
   - O servidor deve aceitar requisições de `http://localhost:3000`
   - Em desenvolvimento, aceita qualquer `localhost` ou `127.0.0.1`

3. **Verifique a URL no frontend:**
   - Abra o console do navegador
   - Verifique se não há erros de CORS
   - As requisições devem ir para `http://localhost:4000`

### Se o navegador bloquear requisições HTTP:

Alguns navegadores podem bloquear requisições HTTP se a página estiver em HTTPS. Para resolver:

1. **Use HTTP para o frontend também:**
   - Acesse `http://localhost:3000` (não `https://`)
   - O Vite por padrão usa HTTP

2. **Desabilite HTTPS no navegador (apenas para desenvolvimento):**
   - Chrome: `chrome://flags/#block-insecure-private-network-requests` → Disable
   - Firefox: Não bloqueia por padrão

3. **Use o proxy do Vite:**
   - O `vite.config.ts` já está configurado com proxy
   - Requisições para `/api` são automaticamente redirecionadas para `http://localhost:4000`

## 📝 Exemplo de Requisição

```typescript
// O api.ts já está configurado para usar HTTP em desenvolvimento
import api from '@/services/api'

// Esta requisição vai para http://localhost:4000/api/contact
const response = await api.post('/contact', {
  name: 'Teste',
  email: 'teste@example.com',
  // ...
})
```

## ⚠️ Importante

- **Desenvolvimento:** Use HTTP (`http://localhost`)
- **Produção:** Use HTTPS (`https://seusite.com`)
- O código detecta automaticamente o ambiente
- Em produção, configure `CORS_ORIGIN` com as URLs corretas

## 🐛 Troubleshooting

### Erro: "Mixed Content" ou "Blocked by CORS"

1. Verifique se ambos (frontend e backend) estão usando HTTP
2. Verifique se o backend está rodando na porta 4000
3. Limpe o cache do navegador
4. Reinicie ambos os servidores

### Erro: "Network Error" ou "Connection Refused"

1. Verifique se o backend está rodando: `curl http://localhost:4000/health`
2. Verifique se a porta 4000 não está sendo usada por outro processo
3. Verifique o firewall

### Erro: "CORS policy: No 'Access-Control-Allow-Origin'"

1. Verifique se `NODE_ENV=development` no `.env` do backend
2. Verifique se o frontend está acessando via `http://localhost:3000`
3. Reinicie o servidor backend
