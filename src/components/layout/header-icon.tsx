import Image from "next/image";

type Props = {
    src: string;
    alt: string;
};

export const HeaderIcon = ({ src, alt }: Props) => {
    return (
        <div className="size-12 border border-gray-200 rounded-sm flex justify-center items-center hover:bg-gray-50">
            <Image
                src={src}
                alt={alt}
                width={24}
                height={24}
                className="size-6"
            />
        </div>
    );
};
