import React from "react"

// Input interface: define an input element and its properties
interface InputProps {
  type?: "email" | "text" | "password";
  name: string;
  value: string;
  placeholder?: string;
  isInvalid?: boolean;
  isInvalidMessage?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyUp?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onBlur: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

// Custom input element with custom error messages.
const Input: React.FC<InputProps> = ({
  type = "text",
  name,
  value,
  placeholder,
  isInvalid = false,
  isInvalidMessage = "",
  onChange,
  onBlur,
  onKeyUp
}) => {
  return (
    <div>
      <input
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) => {
          if (onKeyUp) {
            onKeyUp(e)
          }
        }}
        onBlur={onBlur}
      />
      {isInvalid && <p aria-live="polite">{isInvalidMessage}</p>}
    </div>
  )
}

export default Input
