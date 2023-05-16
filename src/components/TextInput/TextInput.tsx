import React, { InputHTMLAttributes } from 'react';
import './TextInput.css'

interface Props extends InputHTMLAttributes<HTMLInputElement> {}

export default function TextInput(props: Props) {
    return (
        <input className='TextInput' {...props} />
    );
}
