import Image from 'next/image';
import { useState } from 'react';
import { DownloadIcon } from '@heroicons/react/outline';
import { saveAs } from 'file-saver';

import { Button, Paper, Skeleton } from '@root/ui-component';
import { EMPTY_IMAGE } from '@root/constants/variables';
import ResponseInstance from '@root/interfaces/ResponseInstance';

interface ProductImageCardProps {
  isLoading?: boolean;
  data?: ResponseInstance;
}

const ProductImageCard = (props: ProductImageCardProps) => {
  const { data, isLoading = false } = props;
  const [isLoadingImg, setLoadingImg] = useState(false);

  const downloadImage = async () => {
    if (!data?.image) {
      return;
    }
    setLoadingImg(true);
    const image: string | Blob = data?.image;
    saveAs(image, 'image.jpg');
    setLoadingImg(false);
  };

  return (
    <Paper>
      <div className="p-6 bg-transparent opacity-100">
        <h5 className="text-slate-700 font-bold text-xl">Product Image</h5>
        {isLoading ? (
          <>
            <div className="relative block max-w-xs my-4 mx-auto">
              <Skeleton width={320} height={320} />
            </div>
            <Skeleton width="100%" height={40} />
          </>
        ) : (
          <>
            <div className="relative block max-w-xs my-4 mx-auto">
              <Image
                className="rounded-md object-cover"
                src={data?.image ? data.image : EMPTY_IMAGE}
                alt={data?.name ? data?.name : 'Empty Image'}
                layout="responsive"
                width={320}
                height={320}
              />
            </div>
            <Button
              fullWidth
              variant="outlined"
              isLoading={isLoadingImg}
              disabled={!data?.image}
              onClick={downloadImage}
              startIcon={<DownloadIcon className="h-5 w-5  text-inherit" />}>
              Download
            </Button>
          </>
        )}
      </div>
    </Paper>
  );
};

export default ProductImageCard;
