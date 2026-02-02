# Guia de Envio de Formulários

Este guia explica as diferentes opções para enviar o formulário de cadastro de afiliados.

## 📊 Comparação das Opções

| Característica | Webhook | Nodemailer | Backend (sem email) |
|----------------|---------|------------|---------------------|
| **Facilidade** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ |
| **Setup** | 5 minutos | 15-30 minutos | 2 minutos |
| **Custo** | Gratuito (até certo limite) | Gratuito (Gmail) ou pago | Gratuito |
| **Manutenção** | Nenhuma | Baixa | Baixa |
| **Controle** | Médio | Alto | Alto |
| **Backend necessário** | ❌ Não | ✅ Sim | ✅ Sim |
| **Salva no banco** | ❌ Não* | ✅ Sim | ✅ Sim |

*Depende do serviço escolhido

---

## 🎯 Recomendação

### Para começar rápido: **Webhook** ⚡
- Mais simples de configurar
- Não precisa de backend
- Serviços gratuitos disponíveis
- Ideal para MVP ou projetos pequenos

### Para produção com controle total: **Nodemailer + Backend** 🚀
- Salva no banco de dados
- Envia email automaticamente
- Controle total sobre o processo
- Ideal para projetos em produção

---

## 🔧 Opção 1: Webhook (Recomendado para começar)

### Serviços Gratuitos Recomendados:

1. **Formspree** (https://formspree.io)
   - 50 envios/mês grátis
   - Muito fácil de configurar
   - Recebe emails automaticamente

2. **Web3Forms** (https://web3forms.com)
   - 250 envios/mês grátis
   - Não precisa de backend
   - Recebe emails diretamente

3. **Zapier Webhooks** (https://zapier.com)
   - Conecta com outros serviços
   - Automatiza workflows

### Como Configurar:

1. Crie uma conta em um dos serviços acima
2. Obtenha a URL do webhook
3. Adicione no arquivo `.env` do frontend:

```env
VITE_FORM_WEBHOOK_URL=https://formspree.io/f/YOUR_FORM_ID
```

4. Pronto! O formulário enviará automaticamente.

---

## 📧 Opção 2: Nodemailer (Backend + Email)

### Vantagens:
- ✅ Salva no banco de dados
- ✅ Envia email automaticamente
- ✅ Controle total
- ✅ Templates personalizados

### Como Configurar:

#### 1. Instalar dependências:

```bash
cd backend
npm install nodemailer @types/nodemailer
```

#### 2. Configurar variáveis de ambiente no `.env` do backend:

**Opção A: Gmail (para testes)**
```env
EMAIL_SERVICE=gmail
EMAIL_USER=seu-email@gmail.com
EMAIL_PASSWORD=sua-app-password  # Use App Password, não a senha normal
ADMIN_EMAIL=admin@seusite.com
```

**Opção B: SMTP Genérico (recomendado para produção)**
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=seu-email@gmail.com
SMTP_PASSWORD=sua-app-password
EMAIL_FROM=noreply@seusite.com
ADMIN_EMAIL=admin@seusite.com
```

#### 3. Descomentar código no `ContactController.ts`:

```typescript
import { sendEmail, createAffiliateEmailTemplate } from '../services/emailService'

if (process.env.ADMIN_EMAIL) {
  await sendEmail({
    to: process.env.ADMIN_EMAIL,
    subject: 'Novo Cadastro de Afiliado',
    html: createAffiliateEmailTemplate({
      name: contact.name,
      email: contact.email,
      phone: contact.phone || '',
      age: req.body.age || 'N/A',
      message: contact.message
    })
  })
}
```

#### 4. Configurar frontend para usar backend:

No `.env` do frontend:
```env
VITE_API_URL=http://localhost:4000
VITE_USE_BACKEND=true
```

---

## 💾 Opção 3: Apenas Backend (sem email)

### Quando usar:
- Você só quer salvar no banco
- Não precisa de notificação por email
- Vai verificar os cadastros manualmente

### Como Configurar:

1. No `.env` do frontend:
```env
VITE_API_URL=http://localhost:4000
VITE_USE_BACKEND=true
```

2. O formulário enviará para `/api/contact` e salvará no banco.

---

## 🔄 Ordem de Prioridade

O sistema tenta enviar nesta ordem:

1. **Backend próprio** (se `VITE_USE_BACKEND=true`)
2. **Webhook** (se `VITE_FORM_WEBHOOK_URL` configurado)
3. **Email via mailto** (se `VITE_FORM_EMAIL_TO` configurado)
4. **LocalStorage** (sempre salva como backup)

---

## 📝 Exemplo de Configuração Completa

### Frontend `.env`:
```env
# Use backend (descomente para ativar)
VITE_API_URL=http://localhost:4000
VITE_USE_BACKEND=true

# OU use webhook (descomente para ativar)
# VITE_FORM_WEBHOOK_URL=https://formspree.io/f/YOUR_FORM_ID

# OU use email direto (descomente para ativar)
# VITE_FORM_EMAIL_TO=admin@seusite.com
```

### Backend `.env` (se usar Nodemailer):
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=seu-email@gmail.com
SMTP_PASSWORD=sua-app-password
EMAIL_FROM=noreply@seusite.com
ADMIN_EMAIL=admin@seusite.com
```

---

## 🚀 Para Produção

### Recomendações:

1. **Use um serviço de email profissional:**
   - SendGrid (100 emails/dia grátis)
   - Mailgun (5.000 emails/mês grátis)
   - AWS SES (muito barato)

2. **Configure CORS corretamente** no backend

3. **Adicione rate limiting** para evitar spam

4. **Use HTTPS** em produção

5. **Valide dados** no backend também (não confie apenas no frontend)

---

## ❓ Dúvidas Frequentes

**P: Posso usar mais de uma opção?**
R: Sim! O sistema tenta na ordem de prioridade. Você pode ter webhook como backup.

**P: O que acontece se o envio falhar?**
R: Os dados são salvos automaticamente no localStorage como backup.

**P: Como vejo os dados salvos no localStorage?**
R: Use a função `getSavedSubmissions()` do `formService.ts` ou abra o DevTools > Application > Local Storage.

**P: Preciso de backend para webhook?**
R: Não! Webhooks funcionam sem backend próprio.

---

## 📚 Recursos Úteis

- [Formspree Docs](https://help.formspree.io/)
- [Nodemailer Docs](https://nodemailer.com/about/)
- [Web3Forms Docs](https://docs.web3forms.com/)
