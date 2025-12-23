# Guia de Customização

Este documento explica como adaptar o boilerplate para o seu projeto específico.

## Conteúdo Baseado em resolvcondominios.com.br

O boilerplate foi estruturado com base nas páginas e funcionalidades do site Resolv Condomínios:

### Páginas Implementadas

1. **Home** (`frontend/src/pages/Home/Home.tsx`)
   - Seção hero/destaque
   - Cards de serviços (Comerciais, Residenciais, Área do Síndico)
   - Customize os textos e adicione seu conteúdo

2. **Sobre** (`frontend/src/pages/About/About.tsx`)
   - História da empresa
   - Missão
   - Valores
   - Adicione informações específicas do seu cliente

3. **Serviços** (`frontend/src/pages/Services/Services.tsx`)
   - Três categorias principais de serviços
   - Features de cada serviço
   - Adapte para os serviços do seu projeto

4. **Contato** (`frontend/src/pages/Contact/Contact.tsx`)
   - Formulário de contato funcional
   - Informações de localização (preparado para múltiplas localizações)
   - Integrado com backend

5. **Autenticação** (`frontend/src/pages/Auth/`)
   - Login e Registro completos
   - Pronto para área do cliente/síndico

## Passos para Customização

### 1. Informações Básicas

#### package.json (Frontend e Backend)
```json
{
  "name": "nome-do-seu-projeto",
  "description": "Descrição do projeto"
}
```

#### frontend/index.html
```html
<title>Nome do Seu Projeto</title>
```

#### .env
```env
VITE_APP_NAME=Nome do Seu Projeto
```

### 2. Conteúdo das Páginas

#### Home Page
Edite `frontend/src/pages/Home/Home.tsx`:

```tsx
// Altere o título principal
<h1>Bem-vindo ao [Seu Negócio]</h1>

// Customize os cards de serviços
const services = [
  {
    title: 'Seu Serviço 1',
    description: 'Descrição...'
  },
  // ...
]
```

#### Página Sobre
Edite `frontend/src/pages/About/About.tsx` com:
- História da empresa do seu cliente
- Missão e visão
- Valores corporativos

#### Serviços
Edite `frontend/src/pages/Services/Services.tsx`:

```tsx
const services = [
  {
    title: 'Nome do Serviço',
    description: 'Descrição detalhada',
    features: [
      'Feature 1',
      'Feature 2',
      // ...
    ]
  }
]
```

#### Contato
Edite `frontend/src/pages/Contact/Contact.tsx`:

```tsx
// Atualize as localizações
<h3>Localização 1</h3>
<p>Endereço completo do seu cliente</p>
<p>Telefone: (XX) XXXXX-XXXX</p>
```

### 3. Layout e Navegação

#### Header
Edite `frontend/src/components/layout/Header.tsx`:

```tsx
// Adicione/remova itens do menu
<li><Link to="/sua-rota">Seu Link</Link></li>

// Customize o logo
<Link to="/">
  <img src="/logo.svg" alt="Logo" />
</Link>
```

#### Footer
Edite `frontend/src/components/layout/Footer.tsx`:

```tsx
// Atualize informações de contato
<p>Email: seuemail@exemplo.com</p>
<p>Telefone: (XX) XXXXX-XXXX</p>

// Adicione links de redes sociais
```

### 4. Modelos do Banco de Dados

Edite `backend/prisma/schema.prisma`:

```prisma
// Exemplo: Adicionar modelo de Serviço
model Service {
  id          String   @id @default(uuid())
  title       String
  description String   @db.Text
  price       Decimal  @db.Decimal(10, 2)
  active      Boolean  @default(true)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@map("services")
}
```

Depois execute:
```bash
cd backend
npm run prisma:migrate
```

### 5. Adicionar Novas Rotas/Páginas

1. Crie a página:
```bash
mkdir frontend/src/pages/NovaPage
```

2. Crie o componente:
```tsx
// frontend/src/pages/NovaPage/NovaPage.tsx
export default function NovaPage() {
  return <div>Nova Página</div>
}
```

3. Adicione a rota:
```tsx
// frontend/src/App.tsx
import NovaPage from './pages/NovaPage/NovaPage'

<Route path="nova-page" element={<NovaPage />} />
```

4. Adicione ao menu:
```tsx
// frontend/src/components/layout/Header.tsx
<li><Link to="/nova-page">Nova Page</Link></li>
```

### 6. Backend - Novos Endpoints

1. Crie o controller:
```typescript
// backend/src/controllers/ServiceController.ts
export class ServiceController {
  async list(req: Request, res: Response) {
    // Sua lógica
  }
}
```

2. Crie as rotas:
```typescript
// backend/src/routes/service.routes.ts
import { Router } from 'express'
import { ServiceController } from '../controllers/ServiceController'

const router = Router()
const controller = new ServiceController()

router.get('/', controller.list)

export default router
```

3. Registre no router principal:
```typescript
// backend/src/routes/index.ts
import serviceRoutes from './service.routes'

router.use('/services', serviceRoutes)
```

### 7. Estilização

O boilerplate usa CSS inline para máxima flexibilidade. Você pode:

#### Opção 1: Adicionar Tailwind CSS
```bash
cd frontend
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

#### Opção 2: Usar Styled Components
```bash
cd frontend
npm install styled-components
npm install -D @types/styled-components
```

#### Opção 3: CSS Modules
Já suportado pelo Vite, crie arquivos `.module.css`

### 8. Variáveis de Tema

Crie um arquivo de tema:

```typescript
// frontend/src/styles/theme.ts
export const theme = {
  colors: {
    primary: '#007bff',
    secondary: '#6c757d',
    success: '#28a745',
    danger: '#dc3545',
  },
  spacing: {
    sm: '0.5rem',
    md: '1rem',
    lg: '2rem',
  }
}
```

## Funcionalidades Prontas

- ✅ Autenticação JWT
- ✅ CRUD de Usuários
- ✅ Formulário de Contato
- ✅ Gerenciamento de Estado (Zustand)
- ✅ Validação de Formulários
- ✅ Integração Frontend/Backend
- ✅ Docker Compose
- ✅ TypeScript em todo o projeto
- ✅ Migrations do banco

## Próximos Passos Sugeridos

1. Adicione validação com Zod/React Hook Form
2. Implemente upload de arquivos
3. Adicione sistema de notificações
4. Implemente área do cliente/síndico
5. Adicione internacionalização (i18n)
6. Implemente testes (Jest/Vitest)
7. Configure CI/CD

## Dicas de Produção

### Antes do Deploy

- [ ] Altere JWT_SECRET para uma chave forte
- [ ] Configure variáveis de ambiente de produção
- [ ] Adicione rate limiting
- [ ] Configure logs apropriados
- [ ] Implemente backup do banco de dados
- [ ] Adicione monitoramento (Sentry, etc)
- [ ] Configure SSL/HTTPS
- [ ] Otimize imagens e assets
- [ ] Habilite compressão gzip
- [ ] Configure CORS corretamente

### SEO (Se necessário)

- [ ] Adicione meta tags
- [ ] Implemente SSR/SSG (Next.js)
- [ ] Crie sitemap.xml
- [ ] Adicione robots.txt
- [ ] Configure Open Graph tags

## Suporte

Se tiver dúvidas durante a customização, consulte:
- `README.md` - Documentação geral
- `SETUP.md` - Guia de instalação
- Documentação do Prisma: https://www.prisma.io/docs
- Documentação do React Router: https://reactrouter.com
