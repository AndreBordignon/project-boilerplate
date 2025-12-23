export default function Home() {
  return (
    <div className="max-w-container mx-auto px-8">
      <section className="text-center py-16">
        <h1 className="text-5xl font-bold text-text-primary mb-4">
          Bem-vindo
        </h1>
        <p className="text-xl text-text-secondary">
          Solução completa para gestão
        </p>
      </section>

      <section className="py-16">
        <h2 className="text-3xl font-bold text-center text-text-primary mb-12">
          Nossos Serviços
        </h2>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-8">
          <div className="card hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-xl font-bold mb-3 text-text-primary">Condomínios Comerciais</h3>
            <p className="text-text-secondary">Gestão completa para condomínios comerciais</p>
          </div>
          <div className="card hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-xl font-bold mb-3 text-text-primary">Condomínios Residenciais</h3>
            <p className="text-text-secondary">Administração eficiente para condomínios residenciais</p>
          </div>
          <div className="card hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-xl font-bold mb-3 text-text-primary">Área do Síndico</h3>
            <p className="text-text-secondary">Portal exclusivo com ferramentas de gestão</p>
          </div>
        </div>
      </section>
    </div>
  )
}
