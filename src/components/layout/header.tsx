"use client";

import Image from "next/image";
import { HeaderIcon } from "./header-icon";
import Link from "next/link";

export function Header() {
    return (
        <header className="bg-white border-b border-gray-200">
            <div className="bg-black text-white text-center p-4">
                <strong>FRETE GRÁTIS</strong> para todo o Norderste nas compras
                acima de R$ 199,00. <strong>APROVEITA!</strong>
            </div>
            <div className="w-full max-w-6xl mx-auto p-6">
                <div className="flex items-center justify-between">
                    <div className="">
                        <Image
                            src="/assets/ui/logo-black.png"
                            alt="B7Store"
                            width={120}
                            height={40}
                        />
                    </div>
                    <div className="">
                        <div className="flex gap-4">
                            <Link href={"/my-orders"}>
                                <HeaderIcon
                                    src={"/assets/ui/user-line.png"}
                                    alt={"Perfil"}
                                />
                            </Link>
                            <Link href={"/cart"}>
                                <HeaderIcon
                                    src={"/assets/ui/shopping-bag-4-line.png"}
                                    alt={"Carrinho"}
                                />
                            </Link>
                            <div className="md:hidden">
                                <HeaderIcon
                                    src={"/assets/ui/menu-line.png"}
                                    alt={"Menu"}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
