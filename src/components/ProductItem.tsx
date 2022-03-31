import { ReactNode } from 'react';

import { Skeleton } from '@root/ui-component';

interface ProductItemTypes {
  isLoading?: boolean;
  title?: string;
  text?: string | ReactNode;
}

const skeleton = (
  <div className="flex flex-col flex-auto min-w-0">
    <Skeleton width={112} height={24} />
    <div className="flex-1 pt-2">
      <Skeleton width="100%" height={24} />
    </div>
  </div>
);

const ProductItem = (props: ProductItemTypes) => {
  const { title, text, isLoading = false } = props;

  if (isLoading) {
    return skeleton;
  }

  return (
    <div className="flex flex-col flex-auto min-w-0">
      <h6 className="text-slate-700 font-bold">{title ? title : '---'}</h6>
      <div className="flex-1 pt-2">
        <p className="text-slate-700 text-base">{text ? text : '---'}</p>
      </div>
    </div>
  );
};

export default ProductItem;
