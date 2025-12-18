"use client";

import { useCartStore } from "@/store/cart";
import { CartListItem } from "@/types/cart-list-item";
import Image from "next/image";
import { useEffect } from "react";
import { CartProductList } from "./cart-product-list";
import { FinishPurchaseButton } from "./fnish-purchase-button";
import Link from "next/link";

type Props = {
    initialCartProducts: CartListItem[];
    initialSubTotal: number;
};
export const CartContainer = ({
    initialCartProducts,
    initialSubTotal,
}: Props) => {
    const cartStore = useCartStore((state) => state);

    useEffect(() => {
        cartStore.clearShipping();
    }, []);

    let total = initialSubTotal + cartStore.shippingCost;

    return (
        <div>
            <div className="flex items-center gap-2">
                <Image
                    src={"/assets/ui/shopping-bag-4-line-black.png"}
                    alt=""
                    width={24}
                    height={2}
                />
                <div className="text-lg">
                    Seu carrinho de compras{" "}
                    <span className="text-gray-500">
                        ( {cartStore.cart.length}
                        {cartStore.cart.length !== 1 ? "itens" : "item"} )
                    </span>
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-8 mt-9">
                <div className="flex-1">
                    <CartProductList initialList={initialCartProducts} />
                </div>
                <div className="flex-1 md:max-w-sm flex flex-col gap-4">
                    <div className="bg-white border border-gray-200 rounded-sm">
                        <div className="border-b border-gray-200 p-6">
                            <div className="flex justify-between items-center mb-5">
                                <div className="">Subtotal</div>
                                <div className="font-bold">
                                    R$ {initialSubTotal.toFixed(2)}
                                </div>
                            </div>
                            <div className="flex justify-between items-center">
                                <div className="">Frete</div>
                                <div className="font-bold">
                                    R$ {cartStore.shippingCost.toFixed(2)}
                                </div>
                            </div>
                        </div>
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-3">
                                <div className="">Total</div>
                                <div className="font-bold text-2xl text-blue-600">
                                    R$ {total.toFixed(2)}
                                </div>
                            </div>
                            <div className="text-right text-xs text-gray-500 mb-5">
                                Em até 12x no cartão
                            </div>

                            <FinishPurchaseButton />
                            <div className="text-center mt-6">
                                <Link
                                    href={"/"}
                                    className="text-xs text-gray-500"
                                >
                                    Comprar outros produtos
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
