# Sistema de Design - Tailwind CSS

Este projeto utiliza **Tailwind CSS** com uma configuração customizada e reutilizável. O sistema de design foi criado para ser facilmente portado para outros projetos mantendo consistência visual.

## 📦 Estrutura

```
src/
├── index.css                 # Estilos base com diretivas Tailwind
├── components/
│   └── common/              # Componentes reutilizáveis
│       ├── Button.tsx       # Botão com variantes
│       ├── Input.tsx        # Input com validação
│       └── Loading.tsx      # Indicador de carregamento
tailwind.config.ts           # Configuração do sistema de design
postcss.config.js            # Configuração do PostCSS
```

## 🎨 Paleta de Cores

### Cores Primárias
```typescript
primary: {
  600: '#007bff',  // Cor principal
  700: '#1d4ed8',  // Hover
}
```

### Cores Secundárias
```typescript
secondary: {
  200: '#e5e7eb',  // Backgrounds
  300: '#d1d5db',  // Texto
  400: '#9ca3af',
}
```

### Cores de Estado
- **Success**: Verde para ações bem-sucedidas
- **Danger**: Vermelho para erros e ações destrutivas
- **Warning**: Amarelo para avisos

### Cores Semânticas
```typescript
border: '#dee2e6'           // Bordas padrão
background: {
  light: '#f8f9fa',         // Fundo claro (header)
  dark: '#212529',          // Fundo escuro (footer)
}
text: {
  primary: 'rgba(0,0,0,0.87)',  // Texto principal
  secondary: '#666666',          // Texto secundário
}
```

## 📏 Espaçamentos

Sistema de espaçamento consistente:
- `2` = 0.5rem (8px)
- `3` = 0.75rem (12px)
- `4` = 1rem (16px)
- `6` = 1.5rem (24px)
- `8` = 2rem (32px)
- `12` = 3rem (48px)
- `16` = 4rem (64px)

## 🔤 Tipografia

### Font Family
Sistema de fontes nativas (system fonts) para melhor performance:
```css
-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', ...
```

### Tamanhos
- `text-sm`: 0.875rem (14px) - Mensagens de erro
- `text-base`: 1rem (16px) - Texto padrão
- `text-lg`: 1.125rem (18px)
- `text-xl`: 1.25rem (20px)
- `text-2xl`: 1.5rem (24px) - Subtítulos
- `text-3xl`: 1.875rem (30px)
- `text-4xl`: 2.25rem (36px) - Títulos
- `text-5xl`: 2.5rem (40px) - Títulos principais

## 🧩 Componentes Reutilizáveis

### Button

Botão com 3 variantes e suporte a `fullWidth`.

```tsx
import Button from '@/components/common/Button'

// Uso básico
<Button>Clique aqui</Button>

// Com variantes
<Button variant="primary">Salvar</Button>
<Button variant="secondary">Cancelar</Button>
<Button variant="danger">Excluir</Button>

// Full width
<Button fullWidth>Botão largo</Button>

// Custom className
<Button className="mt-4">Com margem</Button>
```

**Props:**
- `variant?: 'primary' | 'secondary' | 'danger'` (padrão: 'primary')
- `fullWidth?: boolean` (padrão: false)
- `className?: string` - Classes Tailwind adicionais
- Todas as props nativas de `<button>`

### Input

Input com label opcional e suporte a erros de validação.

```tsx
import Input from '@/components/common/Input'

// Uso básico
<Input
  label="Email"
  type="email"
  name="email"
  placeholder="seu@email.com"
/>

// Com erro
<Input
  label="Senha"
  type="password"
  error="Senha muito curta"
/>

// Custom className
<Input className="mb-4" />
```

**Props:**
- `label?: string` - Label opcional
- `error?: string` - Mensagem de erro (torna a borda vermelha)
- `className?: string` - Classes Tailwind adicionais
- Todas as props nativas de `<input>`

### Loading

Spinner de carregamento animado.

```tsx
import Loading from '@/components/common/Loading'

<Loading />
```

## 🎯 Classes Utilitárias Customizadas

### Container
```tsx
<div className="container">
  {/* Largura máxima de 1200px, centralizado com padding */}
</div>
```

### Card
```tsx
<div className="card">
  {/* Background branco, border, rounded, padding de 2rem */}
</div>
```

### Section
```tsx
<section className="section">
  {/* Padding vertical de 4rem */}
</section>
```

## 🔧 Customização

### Como adaptar para outro projeto

1. **Copiar arquivos de configuração:**
```bash
cp tailwind.config.ts /seu-projeto/
cp postcss.config.js /seu-projeto/
cp src/index.css /seu-projeto/src/
```

2. **Instalar dependências:**
```bash
npm install -D tailwindcss postcss autoprefixer clsx
```

3. **Customizar cores no `tailwind.config.ts`:**
```typescript
colors: {
  primary: {
    600: '#SUA_COR_AQUI',
    700: '#SUA_COR_HOVER',
  },
  // ... outras cores
}
```

4. **Copiar componentes:**
```bash
cp -r src/components/common /seu-projeto/src/components/
```

## 🌙 Suporte a Dark Mode (Futuro)

A configuração já está preparada para dark mode. Para habilitar:

1. Adicione `darkMode: 'class'` no `tailwind.config.ts`
2. Use classes condicionais: `dark:bg-gray-800`

## 📱 Responsividade

Tailwind fornece breakpoints padrão:
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

Exemplo:
```tsx
<div className="text-base md:text-lg lg:text-xl">
  Texto responsivo
</div>
```

## ♿ Acessibilidade

Todos os componentes incluem:
- Estados de foco com `focus:ring-2`
- Estados de hover
- Estados de disabled
- Contraste de cores adequado

## 🚀 Performance

- **Sistema de fontes nativas**: Carregamento instantâneo
- **PurgeCSS automático**: Tailwind remove CSS não utilizado
- **JIT Mode**: Compilação just-in-time

## 📚 Recursos

- [Documentação Tailwind CSS](https://tailwindcss.com/docs)
- [Tailwind CSS IntelliSense (VSCode)](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
- [Biblioteca clsx](https://github.com/lukeed/clsx) - Composição de classes

## 💡 Dicas

1. Use `clsx` para composição condicional de classes
2. Prefira classes Tailwind a CSS customizado
3. Use as classes utilitárias (`container`, `card`, `section`) para consistência
4. Mantenha o `tailwind.config.ts` como fonte única de verdade para design tokens
