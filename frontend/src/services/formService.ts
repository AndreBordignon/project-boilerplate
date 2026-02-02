// Serviço para envio de formulários sem depender do backend
// Suporta múltiplas opções: webhook, email, localStorage

interface FormSubmissionOptions {
  webhookUrl?: string;
  emailTo?: string;
  backendUrl?: string;
  saveToLocalStorage?: boolean;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  age: string;
  message: string;
  acceptTerms: boolean;
}

/**
 * Envia formulário para o backend próprio
 */
async function sendToBackend(
  data: FormData,
  backendUrl: string
): Promise<void> {
  try {
    const response = await fetch(`${backendUrl}/api/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        phone: data.phone,
        message: data.message,
        age: data.age, // Adicione este campo ao modelo Contact se necessário
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Erro ao enviar: ${response.statusText}`);
    }
  } catch (error) {
    console.error('Erro ao enviar para backend:', error);
    throw error;
  }
}

/**
 * Envia formulário para um webhook (ex: Formspree, Web3Forms, ou webhook customizado)
 */
async function sendToWebhook(
  data: FormData,
  webhookUrl: string
): Promise<void> {
  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
        submittedAt: new Date().toISOString(),
        source: 'Cadastro de Afiliados',
      }),
    });

    if (!response.ok) {
      throw new Error(`Erro ao enviar: ${response.statusText}`);
    }
  } catch (error) {
    console.error('Erro ao enviar para webhook:', error);
    throw error;
  }
}

/**
 * Envia formulário via email usando mailto (fallback)
 */
function sendViaEmail(data: FormData, emailTo: string): void {
  const subject = encodeURIComponent('Novo Cadastro de Afiliado');
  const body = encodeURIComponent(`
Nome: ${data.name}
Email: ${data.email}
Telefone: ${data.phone}
Idade: ${data.age}

Mensagem:
${data.message}

---
Enviado em: ${new Date().toLocaleString('pt-BR')}
  `);

  window.location.href = `mailto:${emailTo}?subject=${subject}&body=${body}`;
}

/**
 * Salva dados no localStorage como backup
 */
export function saveDataToLocalStorage(data: FormData): void {
  try {
    const submissions = JSON.parse(
      localStorage.getItem('formSubmissions') || '[]'
    );

    submissions.push({
      ...data,
      submittedAt: new Date().toISOString(),
      id: Date.now().toString(),
    });

    // Mantém apenas os últimos 50 envios
    const recentSubmissions = submissions.slice(-50);
    localStorage.setItem('formSubmissions', JSON.stringify(recentSubmissions));
  } catch (error) {
    console.error('Erro ao salvar no localStorage:', error);
  }
}

/**
 * Recupera todos os envios salvos no localStorage
 */
export function getSavedSubmissions(): FormData[] {
  try {
    const submissions = JSON.parse(
      localStorage.getItem('formSubmissions') || '[]'
    );
    return submissions;
  } catch (error) {
    console.error('Erro ao recuperar envios:', error);
    return [];
  }
}

/**
 * Função principal para enviar formulário
 * Tenta enviar para webhook se configurado, caso contrário salva localmente
 */
export async function submitForm(
  data: FormData,
  options: FormSubmissionOptions = {}
): Promise<{ success: boolean; message: string; method: string }> {
  // Detecta automaticamente HTTP ou HTTPS baseado no ambiente
  const getBackendUrl = () => {
    const envUrl = import.meta.env.VITE_API_URL
    if (envUrl) {
      // Se já tem protocolo, usa como está
      if (envUrl.startsWith('http://') || envUrl.startsWith('https://')) {
        return envUrl
      }
      // Se não tem protocolo, detecta se está em produção
      const isProduction = typeof window !== 'undefined' && window.location.protocol === 'https:'
      return `${isProduction ? 'https' : 'http'}://${envUrl}`
    }
    // Se está em produção (HTTPS), usa HTTPS
    if (typeof window !== 'undefined' && window.location.protocol === 'https:') {
      return 'https://project-boilerplate-api.vercel.app'
    }
    // Em desenvolvimento local, usa HTTP
    return 'http://localhost:4000'
  }

  const {
    backendUrl = getBackendUrl(),
    webhookUrl = import.meta.env.VITE_FORM_WEBHOOK_URL,
    emailTo = import.meta.env.VITE_FORM_EMAIL_TO,
    saveToLocalStorage = true,
  } = options;

  try {
    // Prioridade 1: Enviar para backend próprio se configurado
    if (backendUrl && import.meta.env.VITE_USE_BACKEND !== 'false') {
      await sendToBackend(data, backendUrl);
      
      if (saveToLocalStorage) {
        saveDataToLocalStorage(data);
      }

      return {
        success: true,
        message: 'Formulário enviado com sucesso!',
        method: 'backend',
      };
    }

    // Prioridade 2: Enviar para webhook se configurado
    if (webhookUrl) {
      await sendToWebhook(data, webhookUrl);
      
      if (saveToLocalStorage) {
        saveDataToLocalStorage(data);
      }

      return {
        success: true,
        message: 'Formulário enviado com sucesso!',
        method: 'webhook',
      };
    }

    // Prioridade 3: Enviar via email se configurado
    if (emailTo) {
      sendViaEmail(data, emailTo);
      
      if (saveToLocalStorage) {
        saveDataToLocalStorage(data);
      }

      return {
        success: true,
        message: 'Abrindo cliente de email...',
        method: 'email',
      };
    }

    // Prioridade 4: Salvar apenas no localStorage
    if (saveToLocalStorage) {
        saveDataToLocalStorage(data);
      return {
        success: true,
        message: 'Formulário salvo localmente com sucesso!',
        method: 'localStorage',
      };
    }

    // Fallback: apenas log
    console.log('Dados do formulário:', data);
    return {
      success: true,
      message: 'Dados registrados no console.',
      method: 'console',
    };
  } catch (error) {
    // Em caso de erro, tenta salvar localmente como backup
    if (saveToLocalStorage) {
        saveDataToLocalStorage(data);
    }

    const errorMessage =
      error instanceof Error
        ? error.message
        : 'Erro ao enviar formulário. Dados salvos localmente.';

    return {
      success: false,
      message: errorMessage,
      method: 'error',
    };
  }
}

/**
 * Formata dados do formulário para exibição/cópia
 */
export function formatFormData(data: FormData): string {
  return `
Nome: ${data.name}
Email: ${data.email}
Telefone: ${data.phone}
Idade: ${data.age}

Mensagem:
${data.message}

---
Enviado em: ${new Date().toLocaleString('pt-BR')}
  `.trim();
}
