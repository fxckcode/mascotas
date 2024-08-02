function Button({ children, disabled, className, ...props }) {
  return (
    <button
      disabled={disabled}
      className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white  transition-all 
        ${disabled ? 'cursor-not-allowed bg-[#4f345e]' : 'hover:bg-[#a56dc4] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#C683EA] bg-[#C683EA]'} 
        ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
