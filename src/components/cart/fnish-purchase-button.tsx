"use client";

import { clearCartCookie } from "@/actions/clear-cart-cookie";
import { finishCart } from "@/actions/finish-cart";
import { useAuthStore } from "@/store/auth";
import { useCartStore } from "@/store/cart";
import Link from "next/link";
import { redirect } from "next/navigation";

export const FinishPurchaseButton = () => {
    const { token, hydrated } = useAuthStore((state) => state);
    const cartStore = useCartStore((state) => state);

    const handleFinishButton = async () => {
        if (!token || !cartStore.selectedAdressId) return;

        const sessionUrl = await finishCart(
            token,
            cartStore.selectedAdressId,
            cartStore.cart
        );
        if (sessionUrl) {
            await clearCartCookie();
            cartStore.clearCart();
            redirect(sessionUrl);
        } else {
            alert("Erro ao finalizar a compra");
        }
    };

    if (!hydrated) null;

    if (!token) {
        return (
            <Link
                className="block w-full text-center px-6 py-5 bg-blue-600 text-white border-0 rounded-sm"
                href={"/login"}
            >
                Faça login para finalizar
            </Link>
        );
    }

    return (
        <button
            disabled={!cartStore.selectedAdressId ? true : false}
            onClick={handleFinishButton}
            className="cursor-pointer w-full text-center px-6 py-5 bg-blue-600 text-white border-0 rounded-sm disabled:opacity-20"
        >
            Finalizar compra
        </button>
    );
};
