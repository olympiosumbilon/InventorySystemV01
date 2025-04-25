import React from 'react'

interface InputProps{
    label: string
    type?: string
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    className?: string
}

const Input: React.FC<InputProps> = ({label, type = 'text', value, onChange, className}) => (
    <div className='mb-4'>
        <label className='block mb-1 text-sm font-medium'>{label}</label>
        <input
            type={type}
            value={value}
            onChange={onChange}
            className={className || "w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"}
        />   
    </div>
)

export default Input