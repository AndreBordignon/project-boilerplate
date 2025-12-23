import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login:", formData);
    // Aqui você adicionará a integração com o backend
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-8 py-8">
      <div className="w-full max-w-form card">
        <h1 className="text-3xl font-bold text-center text-text-primary mb-8">
          Login
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <Input
            label="Senha"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <Button type="submit" variant="primary" fullWidth className="mt-4">
            Entrar
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
