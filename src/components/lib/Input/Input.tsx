import { props } from 'cypress/types/bluebird';
import React from 'react';

export interface InputProps {
    value: string;
    type: string;
    name: string;
    placeholder: string;
    onChange: (value: string) => void;
    id?: string;
}

export default function Input({ value, type, name, placeholder, onChange, id }: InputProps) {
    return (
      /* c8 ignore start */
      <input
        id={id}
        value={value}
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-full bg-gray-200 px-8 py-3 text-black font-semibold"
      />
      /* c8 ignore stop */
    );
};
