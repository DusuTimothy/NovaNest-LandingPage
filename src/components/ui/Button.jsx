import React from "react";

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  href,
  onClick,
  disabled = false,
  type = "button",
  ...props
}) {
  const baseStyles =
    "inline-flex flex-row items-center justify-center font-medium transition-all duration-200 select-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-sage-400/40";

  const sizeStyles = {
    sm: "text-xs px-4 py-2 min-h-[38px] rounded-[10px] gap-2",
    md: "text-sm md:text-[15px] px-6 py-2.5 min-h-[46px] rounded-[12px] gap-2.5",
    lg: "text-base px-[42px] py-4 h-[56px] min-h-[56px] rounded-[12px] gap-2.5",
    icon: "w-10 h-10 md:w-11 md:h-11 rounded-full p-0 shrink-0",
  };

  const variantStyles = {
    primary:
      "bg-gradient-to-b from-[#9ECABC] to-[#638B7E] hover:brightness-105 text-brand-forest-900 shadow-md active:scale-[0.98]",
    outline:
      "bg-transparent border border-brand-sage-400/50 hover:border-brand-sage-300 text-brand-cream-50 hover:bg-brand-sage-500/10 active:scale-[0.98]",
    ghost:
      "bg-transparent text-brand-cream-50 hover:bg-brand-forest-600/30 active:scale-[0.98]",
    dark:
      "bg-ink-900 hover:bg-black text-brand-cream-50 shadow-md active:scale-[0.98] rounded-full",
    icon:
      "bg-brand-sage-500/30 hover:bg-brand-sage-500/60 text-brand-cream-50 border border-brand-sage-400/30 backdrop-blur-sm active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed rounded-full",
  };

  const combinedClasses = `${baseStyles} ${variant === "icon" ? sizeStyles.icon : sizeStyles[size]} ${
    variantStyles[variant] || variantStyles.primary
  } ${disabled ? "opacity-50 pointer-events-none" : ""} ${className}`;

  if (href) {
    return (
      <a href={href} className={combinedClasses} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={combinedClasses}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
