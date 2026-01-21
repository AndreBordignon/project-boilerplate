import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import { authService } from "@/services/authService";
import { useAuthStore } from "@/store/authStore";

// Schema de validação com Zod
const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email é obrigatório")
    .email("Email inválido"),
  password: z
    .string()
    .min(6, "A senha deve ter no mínimo 6 caracteres"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function Login() {
  const navigate = useNavigate();
  const authStore = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await authService.login(data);
      authStore.setUser(response.user);
      navigate("/painel-adm");
    } catch (error: any) {
      // Define erro no formulário se a API retornar erro
      setError("root", {
        message: error.message || "Erro ao fazer login. Tente novamente.",
      });
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-8 py-8">
      <div className="w-full max-w-form card">
        <h1 className="text-3xl font-bold text-center text-text-primary mb-8">
          Login
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          {/* Erro geral do formulário */}
          {errors.root && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {errors.root.message}
            </div>
          )}

          <div>
            <Input
              label="Email"
              type="email"
              {...register("email")}
              error={errors.email?.message}
            />
          </div>

          <div>
            <Input
              label="Senha"
              type="password"
              {...register("password")}
              error={errors.password?.message}
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            fullWidth
            className="mt-4"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Entrando..." : "Entrar"}
          </Button>
        </form>

        <p className="text-center mt-6 text-text-primary">
          Não tem uma conta?{" "}
          <Link
            to="/cadastro"
            className="text-primary-600 hover:text-primary-700 font-medium transition-colors"
          >
            Cadastre-se
          </Link>
        </p>
      </div>
    </div>
  );
}