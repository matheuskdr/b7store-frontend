import { ImageSlider } from "@/components/product/image-slider";
import { ProductDescription } from "@/components/product/product-description";
import { ProductDatails } from "@/components/product/product-details";
import { RelatedProductSkeleton } from "@/components/product/related-product-skeleton";
import { RelatedProducts } from "@/components/product/related-products";
import { data } from "@/data";
import Link from "next/link";
import { Suspense } from "react";

type Props = {
    params: Promise<{ id: string }>;
};

export default async function Page({ params }: Props) {
    const { id } = await params;

    return (
        <div className="">
            <div className="text-gray-500 mb-4">
                <Link href={"/"}>Home</Link> &gt;{" "}
                <Link href={"/"}>TEMPORARIO</Link> &gt; {data.product.label}
            </div>

            <div className="flex flex-col md:flex-row gap-6 md:gap-32">
                <ImageSlider images={data.product.images} />
                <ProductDatails product={data.product} />
            </div>

            <ProductDescription text={data.product.description} />

            <Suspense fallback={<RelatedProductSkeleton />}>
                <RelatedProducts id={data.product.id} />
            </Suspense>
        </div>
    );
}
