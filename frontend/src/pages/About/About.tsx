export default function About() {
  return (
    <div className="max-w-container mx-auto px-8 py-8">
      <h1 className="text-4xl font-bold text-text-primary mb-8">Sobre Nós</h1>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-text-primary mb-4">Nossa História</h2>
        <p className="leading-relaxed text-text-secondary">
          Texto sobre a história da empresa...
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-text-primary mb-4">Nossa Missão</h2>
        <p className="leading-relaxed text-text-secondary">
          Texto sobre a missão da empresa...
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-text-primary mb-4">Nossos Valores</h2>
        <ul className="leading-relaxed text-text-secondary space-y-2 list-disc list-inside">
          <li>Transparência</li>
          <li>Eficiência</li>
          <li>Comprometimento</li>
          <li>Inovação</li>
        </ul>
      </section>
    </div>
  )
}
