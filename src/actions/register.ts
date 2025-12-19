"use server";

type RegisterData = {
    name: string;
    email: string;
    password: string;
};

export const register = async ({
    email,
    password,
    name,
}: RegisterData): Promise<{ error: string | null }> => {
    return { error: null };
};
