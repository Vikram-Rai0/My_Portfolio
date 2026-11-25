"use client";

/** Submit button that asks for confirmation first. Use inside a <form action={...}>. */
export default function ConfirmButton({ message, children, className = "" }) {
  return (
    <button
      type="submit"
      className={className}
      onClick={(event) => {
        if (!window.confirm(message)) event.preventDefault();
      }}
    >
      {children}
    </button>
  );
}
