import * as trpc from '@trpc/server';
import { z } from 'zod';

import ProductData from '@root/interfaces/ProductData';
import { getDomainData } from '@root/utils/getDomainData';
import { scraperAmazon } from '@root/utils/scraper';
import stores from '@root/constants/onlineStores.json';

export interface ResponseInstance extends ProductData {
  onlineStore: any;
}

const handleStore = async (url: string, domain: string) => {
  let productData;
  switch (domain) {
    case 'amazon':
      productData = await scraperAmazon(url);
      break;
    case 'ebay':
      productData = null;
      break;
    case 'apple':
      productData = null;
      break;
    default:
      productData = null;
  }

  return productData;
};

export const appRouter = trpc.router().query('scrapper', {
  input: z.object({ url: z.string() }).nullish(),
  async resolve({ input }) {
    const rawUrl = input?.url;

    if (!rawUrl) {
      throw new trpc.TRPCError({
        code: 'PARSE_ERROR',
        message: 'Campo url requerido',
      });
    }

    const [name, extension] = getDomainData(input?.url);

    if (!name) {
      throw new trpc.TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'No se pudo obtener el nombre de la tienda',
      });
    }

    if (extension !== 'com') {
      throw new trpc.TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'La tienda especificada está fuera de EE. UU.',
      });
    }

    const onlineStore = stores.find((store) => store?.slug === name);

    if (!onlineStore) {
      throw new trpc.TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: `Tienda no encontrada - ${name}`,
      });
    }

    const productData = await handleStore(rawUrl, name);

    console.log(productData);

    const response: ResponseInstance = {
      ...productData,
      onlineStore,
    };

    return response;
  },
});

// export type definition of API
export type AppRouter = typeof appRouter;
