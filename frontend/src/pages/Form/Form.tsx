import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import { submitForm, formatFormData } from "@/services/formService";

// Schema de validação com Zod
const formSchema = z.object({
  name: z
    .string()
    .min(1, "Nome é obrigatório")
    .min(3, "Nome deve ter no mínimo 3 caracteres"),
  email: z
    .string()
    .min(1, "Email é obrigatório")
    .email("Email inválido"),
  phone: z
    .string()
    .min(1, "Telefone é obrigatório")
    .regex(/^[0-9\s\-()]+$/, "Telefone inválido"),
  age: z
    .string()
    .min(1, "Idade é obrigatória")
    .refine((val) => {
      const num = parseInt(val);
      return !isNaN(num) && num >= 18 && num <= 120;
    }, "Idade deve ser entre 18 e 120 anos"),
  message: z
    .string()
    .min(1, "Mensagem é obrigatória")
    .min(10, "Mensagem deve ter no mínimo 10 caracteres")
    .max(500, "Mensagem deve ter no máximo 500 caracteres"),
  acceptTerms: z
    .boolean()
    .refine((val) => val === true, "Você deve aceitar os termos"),
});

type FormData = z.infer<typeof formSchema>;

export default function Form() {
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
    method?: string;
  } | null>(null);
  const [showData, setShowData] = useState(false);
  const [formattedData, setFormattedData] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      age: "",
      message: "",
      acceptTerms: false,
    },
  });

  const onSubmit = async (data: FormData) => {
    setSubmitStatus(null);
    setShowData(false);

    try {
      const result = await submitForm(data);

      if (result.success) {
        setSubmitStatus({
          type: "success",
          message: result.message,
          method: result.method,
        });
        setFormattedData(formatFormData(data));
        reset();
      } else {
        setSubmitStatus({
          type: "error",
          message: result.message,
          method: result.method,
        });
        setFormattedData(formatFormData(data));
      }
    } catch (error) {
      console.error("Erro ao enviar formulário:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Erro ao enviar formulário. Tente novamente.";
      setSubmitStatus({
        type: "error",
        message: errorMessage,
      });
      setFormattedData(formatFormData(data));
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(formattedData);
    alert("Dados copiados para a área de transferência!");
  };

  return (
    <div className="max-w-container mx-auto px-8 py-8">
      <h1 className="text-4xl font-bold text-text-primary mb-8">
        Cadastro de afiliados
      </h1>

      <div className="max-w-2xl mx-auto">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-6 bg-white p-8 rounded-lg shadow-lg"
        >
          {/* Mensagem de sucesso/erro */}
          {submitStatus && (
            <div
              className={`px-4 py-3 rounded ${
                submitStatus.type === "success"
                  ? "bg-green-100 border border-green-400 text-green-700"
                  : "bg-red-100 border border-red-400 text-red-700"
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{submitStatus.message}</p>
                  {submitStatus.method && (
                    <p className="text-sm mt-1 opacity-80">
                      Método: {submitStatus.method}
                    </p>
                  )}
                </div>
                {submitStatus.type === "success" && formattedData && (
                  <button
                    type="button"
                    onClick={() => setShowData(!showData)}
                    className="text-sm underline hover:no-underline"
                  >
                    {showData ? "Ocultar" : "Ver dados"}
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Exibir dados formatados */}
          {showData && formattedData && (
            <div className="bg-gray-50 border border-gray-200 rounded p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-text-primary">
                  Dados do formulário:
                </h3>
                <button
                  type="button"
                  onClick={copyToClipboard}
                  className="text-sm text-primary-600 hover:text-primary-700 underline"
                >
                  Copiar
                </button>
              </div>
              <pre className="text-sm text-text-secondary whitespace-pre-wrap font-sans">
                {formattedData}
              </pre>
            </div>
          )}

          {/* Erro geral do formulário */}
          {errors.root && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {errors.root.message}
            </div>
          )}

          <div>
            <Input
              label="Nome completo"
              type="text"
              placeholder="Digite seu nome"
              {...register("name")}
              error={errors.name?.message}
            />
          </div>

          <div>
            <Input
              label="Email"
              type="email"
              placeholder="seu@email.com"
              {...register("email")}
              error={errors.email?.message}
            />
          </div>

          <div>
            <Input
              label="Telefone"
              type="tel"
              placeholder="(00) 00000-0000"
              {...register("phone")}
              error={errors.phone?.message}
            />
          </div>

          <div>
            <Input
              label="Idade"
              type="number"
              placeholder="Digite sua idade"
              {...register("age")}
              error={errors.age?.message}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-text-primary">
              Mensagem
            </label>
            <textarea
              {...register("message")}
              placeholder="Digite sua mensagem..."
              rows={5}
              className={`
                px-4 py-2 rounded-lg border resize-y
                ${errors.message ? 'border-red-500' : 'border-gray-300'}
                focus:outline-none focus:ring-2 
                ${errors.message ? 'focus:ring-red-500' : 'focus:ring-primary-500'}
                transition-colors
              `}
            />
            {errors.message && (
              <span className="text-sm text-red-600">
                {errors.message.message}
              </span>
            )}
          </div>

          <div className="flex items-start gap-2">
            <input
              type="checkbox"
              id="acceptTerms"
              {...register("acceptTerms")}
              className="mt-1 w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
            />
            <label
              htmlFor="acceptTerms"
              className="text-sm text-text-primary cursor-pointer"
            >
              Aceito os termos e condições
            </label>
          </div>
          {errors.acceptTerms && (
            <span className="text-sm text-red-600 -mt-4">
              {errors.acceptTerms.message}
            </span>
          )}

          <div className="flex gap-4 mt-4">
            <Button
              type="submit"
              variant="primary"
              fullWidth
              disabled={isSubmitting}
            >
              {isSubmitting ? "Enviando..." : "Enviar Formulário"}
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => reset()}
              disabled={isSubmitting}
            >
              Limpar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
