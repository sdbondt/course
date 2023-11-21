import React, { ReactNode } from 'react'

// Button interface and properties.
interface ButtonProps {
    type?: 'submit' | 'button';
  onClick?: () => void;
  disabled?: boolean;
  children: ReactNode
}

// Custom button component.
const Button: React.FC<ButtonProps> = ({ type = 'button', onClick, disabled = false, children }) => {
  return (
      <button
          type={type}
          onClick={() => {
            if(onClick) {
                onClick();
            }
      }}
      disabled={disabled}
    >{children}</button>
  )
}

export default Button