import React from 'react';
import './Button.css'

interface Props extends React.HTMLProps<HTMLButtonElement> {
    type?: "button" | "submit" | "reset"
}

export default function Button({ children, className, ...props }: Props) {
    return (
        <button className={`Button ${className}`} {...props}>{children}</button>
    );
}
