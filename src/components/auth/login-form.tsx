"use client";

import { login } from "@/actions/login";
import { setAuthCookie } from "@/actions/set-auth-cookie";
import { useAuthStore } from "@/store/auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState, useTransition } from "react";
import z from "zod";

const schema = z.object({
    email: z.email({ message: "Email inválido" }),
    password: z
        .string()
        .min(6, { message: "Senha deve ter no mínimo 6 caracteres" }),
});

type ErrorStructure = {
    email?: string;
    password?: string;
    form?: string;
};

export const LoginForm = () => {
    const [form, setForm] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState<ErrorStructure>({});
    const [pending, startTransition] = useTransition();
    const authStore = useAuthStore((state) => state);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm((form) => ({ ...form, [e.target.name]: e.target.value }));
        setErrors((errors) => ({
            ...errors,
            [e.target.name]: undefined,
            form: undefined,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const result = schema.safeParse(form);
        if (!result.success) {
            const fieldErros: any = {};
            result.error.issues.forEach((err) => {
                if (err.path[0]) {
                    fieldErros[err.path[0]] = err.message;
                }
            });
            setErrors(fieldErros);
            return;
        }

        setErrors({});
        startTransition(async () => {
            const res = await login(form);
            if (res.error) {
                setErrors({ form: res.error });
            } else if (res.token) {
                await setAuthCookie(res.token);
                authStore.setToken(res.token);
                redirect("/");
            }
        });
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white border border-gray-200 rounded-sm p-8"
        >
            <h2 className="text-xl font-bold mb-4">Login</h2>
            <div className="mb-4">
                <label className="mb-1">E-mail</label>
                <input
                    autoFocus
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-sm px-3 py-2"
                    disabled={pending}
                />
                {errors.email && (
                    <div className="text-red-500 text-sm mt-1">
                        {errors.email}
                    </div>
                )}
            </div>
            <div className="mb-4">
                <label className="mb-1">Senha</label>
                <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-sm px-3 py-2"
                    disabled={pending}
                />
                {errors.password && (
                    <div className="text-red-500 text-sm mt-1">
                        {errors.password}
                    </div>
                )}
            </div>
            <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-sm"
                disabled={pending}
            >
                {pending ? "Entrando..." : "Entrar"}
            </button>
            {errors.form && (
                <div className="text-red-500 text-sm mt-1 cursor-pointer">
                    {errors.form}
                </div>
            )}
            <div className="text-center mt-4">
                <Link className="text-gray-500 text-sm" href={"/register"}>
                    Ainda não tem conta? Cadastre-se!
                </Link>
            </div>
        </form>
    );
};
