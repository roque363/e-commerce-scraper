import { CSSProperties, forwardRef } from 'react';
import clsx from 'clsx';

interface SkeletonProps {
  className?: string;
  style?: CSSProperties;
  width?: number | string;
  height?: number | string;
}

const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>((props, ref) => {
  const { className, style, width = '100%', height = '100%' } = props;
  return (
    <div
      ref={ref}
      className={clsx('animate-pulse', 'bg-slate-200', 'rounded', className)}
      style={{ width, height, ...style }}
    />
  );
});

Skeleton.displayName = 'Skeleton';

export default Skeleton;
