# Configuração de CORS para Produção (Vercel)

## 🚨 Problema

Se você está vendo este erro:
```
Access to XMLHttpRequest at 'https://project-boilerplate-api.vercel.app/api/...' 
from origin 'https://project-boilerplate-navy.vercel.app' has been blocked by CORS policy
```

Isso significa que o backend não está configurado para aceitar requisições do seu frontend em produção.

## ✅ Solução Rápida

### 1. Configure a variável de ambiente `CORS_ORIGIN` no backend (Vercel)

1. Acesse o dashboard da Vercel
2. Vá para o projeto do **backend** (`project-boilerplate-api`)
3. Vá em **Settings** → **Environment Variables**
4. Adicione a variável:

```
CORS_ORIGIN=https://project-boilerplate-navy.vercel.app
```

**Ou se tiver múltiplas origens:**
```
CORS_ORIGIN=https://project-boilerplate-navy.vercel.app,https://www.seudominio.com
```

### 2. Configure `NODE_ENV` (opcional mas recomendado)

```
NODE_ENV=production
```

### 3. Faça o redeploy

Após adicionar as variáveis de ambiente, você precisa fazer um novo deploy:

- Vercel faz deploy automático quando você faz push
- Ou você pode forçar um redeploy em **Deployments** → **Redeploy**

## 🔍 Verificação

Após o deploy, teste fazendo uma requisição:

```bash
curl -X OPTIONS https://project-boilerplate-api.vercel.app/api/auth/register \
  -H "Origin: https://project-boilerplate-navy.vercel.app" \
  -H "Access-Control-Request-Method: POST" \
  -v
```

Você deve ver os headers:
```
< Access-Control-Allow-Origin: https://project-boilerplate-navy.vercel.app
< Access-Control-Allow-Credentials: true
< Access-Control-Allow-Methods: GET,POST,PUT,DELETE,PATCH,OPTIONS
```

## 📝 Variáveis de Ambiente Completas

### Backend (Vercel)

```env
# CORS - IMPORTANTE!
CORS_ORIGIN=https://project-boilerplate-navy.vercel.app

# Ambiente
NODE_ENV=production

# Database
DATABASE_URL=postgresql://...

# JWT
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=7d

# Email (se usar)
ADMIN_EMAIL=admin@seusite.com
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=seu-email@gmail.com
SMTP_PASSWORD=sua-app-password
```

### Frontend (Vercel)

```env
VITE_API_URL=https://project-boilerplate-api.vercel.app
VITE_USE_BACKEND=true
```

## 🐛 Troubleshooting

### Erro persiste após configurar CORS_ORIGIN?

1. **Verifique se a variável está correta:**
   - Sem espaços extras
   - Com `https://` (não `http://`)
   - Sem barra no final (`/`)

2. **Verifique se fez redeploy:**
   - Variáveis de ambiente só são aplicadas em novos deploys

3. **Verifique os logs do backend:**
   - Vercel → Deployments → Seu deploy → Functions → Ver logs
   - Procure por mensagens de CORS

4. **Teste manualmente:**
   ```bash
   # Teste o preflight
   curl -X OPTIONS https://project-boilerplate-api.vercel.app/api/auth/register \
     -H "Origin: https://project-boilerplate-navy.vercel.app" \
     -H "Access-Control-Request-Method: POST" \
     -v
   ```

### Múltiplas origens

Se você tem múltiplos frontends ou domínios:

```env
CORS_ORIGIN=https://project-boilerplate-navy.vercel.app,https://www.seudominio.com,https://app.seudominio.com
```

**Importante:** Separe por vírgula, sem espaços extras.

## 🔒 Segurança

- ✅ **Nunca** use `*` como origem em produção
- ✅ Sempre especifique as origens exatas
- ✅ Use HTTPS em produção
- ✅ Mantenha `credentials: true` apenas se necessário

## 📚 Recursos

- [CORS na Vercel](https://vercel.com/docs/concepts/functions/serverless-functions#cors)
- [MDN CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)
