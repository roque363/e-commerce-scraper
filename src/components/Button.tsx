import { ComponentPropsWithoutRef, CSSProperties, ReactNode, forwardRef } from 'react';
import clsx from 'clsx';

import { LoaderIcon } from '@root/icons';

interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  isLoading?: boolean;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  fullWidth?: boolean;
  variant?: 'contained' | 'outlined';
  startIcon?: ReactNode;
  endIcon?: ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const {
    isLoading,
    children,
    className,
    style,
    disabled = false,
    fullWidth = false,
    variant = 'contained',
    onClick,
    startIcon: startIconProp,
    endIcon: endIconProp,
    ...rest
  } = props;

  const startIcon = startIconProp && <span className="mr-2 -ml-1">{startIconProp}</span>;

  const loadingIcon = <LoaderIcon className="animate-spin mr-2 -ml-1 h-5 w-5 text-inherit" />;

  return (
    <button
      ref={ref}
      disabled={disabled}
      onClick={onClick}
      className={clsx(
        'flex',
        'items-center',
        'justify-center',
        fullWidth && 'w-full',
        'py-1.5',
        'px-4',
        'rounded-md',
        'text-base',
        'font-medium',
        'disabled:opacity-50',
        variant === 'contained' && [
          'bg-blue-500',
          'border',
          'border-transparent',
          'text-white',
          'hover:bg-blue-500',
          'focus:outline-none',
          'focus:ring-2',
          'disabled:opacity-50',
        ],
        variant === 'outlined' && [
          'bg-transparent',
          'border-2',
          'border-blue-500',
          'text-blue-500',
          'hover:bg-blue-100',
          'focus:outline-none',
          'focus:ring-2',
          'disabled:hover:bg-transparent',
        ],
        className,
      )}
      style={style}
      {...rest}>
      {startIcon && isLoading ? loadingIcon : startIcon}
      {children}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;
