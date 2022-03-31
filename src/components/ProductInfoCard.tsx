import React from 'react';

import { Paper, Skeleton } from '@root/ui-component';
import ProductItem from './ProductItem';
import ResponseInstance from '@root/interfaces/ResponseInstance';

interface ProductInfoCardProps {
  isLoading?: boolean;
  data?: ResponseInstance;
}

const ProductInfoCard = (props: ProductInfoCardProps) => {
  const { data, isLoading = false } = props;

  return (
    <Paper>
      <div className="p-6 bg-transparent opacity-100">
        <h5 className="text-slate-700 font-bold text-xl">Product Information</h5>
        {isLoading ? (
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="col-span-2">
              <ProductItem isLoading title="Name" />
            </div>
            <div className="col-span-2 md:col-span-1">
              <ProductItem isLoading title="Link" />
            </div>
            <div className="col-span-2 md:col-span-1">
              <ProductItem isLoading title="Store" />
            </div>
            <div className="col-span-2 md:col-span-1">
              <ProductItem isLoading title="Price" />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="col-span-2">
              <ProductItem title="Name" text={data?.name} />
            </div>
            <div className="col-span-2 md:col-span-1">
              <ProductItem
                title="Link"
                text={
                  data?.url && (
                    <a
                      className="hover:text-indigo-700 hover:underline"
                      href={data?.url}
                      target="_blank"
                      rel="noopener noreferrer">
                      {data?.url}
                    </a>
                  )
                }
              />
            </div>
            <div className="col-span-2 md:col-span-1">
              <ProductItem
                title="Store"
                text={
                  data?.onlineStore && `${data?.onlineStore.name} (${data?.onlineStore.url})`
                }
              />
            </div>
            <div className="col-span-2 md:col-span-1">
              <ProductItem title="Price" text={data?.price && `$ ${data?.price}`} />
            </div>
          </div>
        )}
      </div>
    </Paper>
  );
};

export default ProductInfoCard;
