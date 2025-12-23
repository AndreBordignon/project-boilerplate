#!/bin/bash

echo "🚀 Iniciando setup do projeto..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
  echo "❌ Docker não está rodando. Por favor, inicie o Docker primeiro."
  exit 1
fi

# Copy environment files
echo "📝 Copiando arquivos de ambiente..."
cp .env.example .env
cp frontend/.env.example frontend/.env
cp backend/.env.example backend/.env

# Start Docker services
echo "🐳 Iniciando serviços Docker..."
docker-compose up -d

# Wait for PostgreSQL to be ready
echo "⏳ Aguardando PostgreSQL iniciar..."
sleep 5

# Setup Backend
echo "🔧 Configurando Backend..."
cd backend
npm install
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
cd ..

# Setup Frontend
echo "🎨 Configurando Frontend..."
cd frontend
npm install
cd ..

echo ""
echo "✅ Setup concluído com sucesso!"
echo ""
echo "Para iniciar o projeto:"
echo "  Backend:  cd backend && npm run dev"
echo "  Frontend: cd frontend && npm run dev"
echo ""
echo "URLs:"
echo "  Frontend: http://localhost:3000"
echo "  Backend:  http://localhost:4000"
echo "  Prisma Studio: cd backend && npm run prisma:studio"
echo ""
echo "Credenciais de teste:"
echo "  Email: admin@example.com"
echo "  Senha: 123456"
