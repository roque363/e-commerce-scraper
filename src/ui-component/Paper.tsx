import { CSSProperties, ReactNode, forwardRef } from 'react';
import clsx from 'clsx';

interface PaperProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  border?: boolean;
  shadow?: boolean;
}

const Paper = forwardRef<HTMLDivElement, PaperProps>((props, ref) => {
  const { children, className, style, border = true, shadow = true } = props;

  return (
    <div
      ref={ref}
      className={clsx(
        'bg-white',
        'bg-clip-border',
        'flex',
        'flex-col',
        'relative',
        'min-w-0',
        'rounded-md',
        'overflow-hidden',
        shadow && 'shadow',
        border && ['border', 'border-slate-200'],
        className,
      )}
      style={style}>
      {children}
    </div>
  );
});

Paper.displayName = 'Paper';

export default Paper;
