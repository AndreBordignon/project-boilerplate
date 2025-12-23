export default function Services() {
  const services = [
    {
      title: 'Condomínios Comerciais',
      description: 'Gestão completa para condomínios comerciais',
      features: [
        'Gestão financeira',
        'Controle de inadimplência',
        'Relatórios gerenciais',
        'Suporte especializado'
      ]
    },
    {
      title: 'Condomínios Residenciais',
      description: 'Administração eficiente para condomínios residenciais',
      features: [
        'Portal do morador',
        'Emissão de boletos',
        'Gestão de reservas',
        'Comunicação facilitada'
      ]
    },
    {
      title: 'Área do Síndico',
      description: 'Portal exclusivo com ferramentas de gestão',
      features: [
        'Acesso a documentos',
        'Aprovação de despesas',
        'Gestão de fornecedores',
        'Relatórios em tempo real'
      ]
    }
  ]

  return (
    <div className="max-w-container mx-auto px-8 py-8">
      <h1 className="text-4xl font-bold text-text-primary mb-12">Nossos Serviços</h1>

      <div className="flex flex-col gap-12">
        {services.map((service, index) => (
          <div
            key={index}
            className="card hover:shadow-lg transition-shadow duration-300"
          >
            <h2 className="text-2xl font-bold text-text-primary mb-4">{service.title}</h2>
            <p className="my-4 text-text-secondary">
              {service.description}
            </p>
            <h3 className="mt-6 mb-4 font-bold text-text-primary">
              Funcionalidades:
            </h3>
            <ul className="text-text-secondary leading-relaxed space-y-2 list-disc list-inside">
              {service.features.map((feature, idx) => (
                <li key={idx}>{feature}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}
