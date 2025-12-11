// types/SignUpTypes.ts

export type Gender = 'male' | 'female' | 'other' | '';

export interface FormData {
    fullName: string;
    email: string;
    password: string;
    username: string;
    profileImage: string;
    gender: Gender;
}

export interface InputFieldProps {
    icon: React.ElementType; // Type for Lucide icons
    name: keyof FormData;
    type?: 'text' | 'email' | 'password' | 'url';
    label: string;
    required?: boolean;
    placeholder?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

export interface AuthUser {
    _id: string,
    fullName: string,
    username: string,
    email: string,
    password: string,
    role: "ADMIN" | "AUTHOR" | "READER",
    gender: "male" | "female" | "other" | "",
    bio: string,
    profileImage: string,
    createdAt : string,
    updatedAt : string,
}