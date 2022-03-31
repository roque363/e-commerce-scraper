import { ComponentPropsWithoutRef, CSSProperties, forwardRef } from 'react';
import clsx from 'clsx';

interface InputProps extends ComponentPropsWithoutRef<'input'> {
  className?: string;
  style?: CSSProperties;
}

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { className, style, value, onChange, ...rest } = props;

  return (
    <input
      ref={ref}
      style={style}
      className={clsx(
        'block',
        'w-full',
        'border-gray-300',
        'rounded-md',
        'sm:text-sm',
        'md:rounded-r-none',
        'focus:ring-indigo-500',
        'focus:border-indigo-500',
        className,
      )}
      value={value}
      onChange={onChange}
      {...rest}
    />
  );
});

Input.displayName = 'Input';

export default Input;
