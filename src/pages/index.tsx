import Head from 'next/head';
import Image from 'next/image';
import type { NextPage } from 'next';
import { ChangeEvent, ReactNode, useState } from 'react';
import { DownloadIcon, SearchIcon } from '@heroicons/react/outline';

import { trpc } from '@root/utils/trpc';
import { Button, Paper, Skeleton } from '@root/ui-component';
import { EMPTY_IMAGE } from '@root/constants/variables';
import stringIsAValidUrl from '@root/utils/stringIsAValidUrl';
import styles from '@root/styles/Home.module.css';

interface ProductItemTypes {
  title?: string;
  text?: string | ReactNode;
}

const ProductItem = (props: ProductItemTypes) => {
  const { title, text } = props;
  return (
    <div className="flex flex-col flex-auto min-w-0">
      <h6 className="text-slate-700 font-bold">{title}</h6>
      <div className="flex-1 pt-2">
        <p className="text-slate-700 text-base">{text ? text : '---'}</p>
      </div>
    </div>
  );
};

const Home: NextPage = () => {
  const [search, setSearch] = useState('');
  const mutacion = trpc.useMutation(['scrapper']);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleSearch = async () => {
    if (!search) {
      return;
    }
    if (!stringIsAValidUrl(search)) {
      return;
    }
    const url = search;

    mutacion.mutate({ url });
  };

  return (
    <div className="px-8">
      <Head>
        <title>E-Commerce Scraper</title>
        <meta name="description" content="E-Commerce Scraper" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen py-16">
        <div className="relative w-full space-y-4 shadow md:flex md:space-y-0">
          <input
            className="md:rounded-r-none focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            type="text"
            name="initialQuery"
            id="initialQuery"
            value={search}
            onChange={handleSearchChange}
            placeholder="Ej: www.tienda.com/producto"
          />
          <Button
            className="w-full md:w-40 md:rounded-l-none"
            type="button"
            variant="contained"
            onClick={handleSearch}
            disabled={mutacion.isLoading}
            isLoading={mutacion.isLoading}
            startIcon={<SearchIcon className="h-5 w-5 text-inherit" />}>
            Search
          </Button>
        </div>
        <div className="w-full border-b border-gray-300 pb-4 mb-4"></div>
        <Paper className="p-8" shadow={false}>
          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-3 md:col-span-1">
              {mutacion.isLoading ? (
                <Paper className="animate-pulse">
                  <div className="p-6 bg-transparent opacity-100">
                    <Skeleton width="40%" height={28} />
                    <div className="relative block max-w-xs my-4 mx-auto">
                      <Skeleton width={320} height={320} />
                    </div>
                    <Skeleton width="100%" height={40} />
                  </div>
                </Paper>
              ) : (
                <Paper>
                  <div className="p-6 bg-transparent opacity-100">
                    <h5 className="text-slate-700 font-bold text-xl">Product Image</h5>
                    <div className="relative block max-w-xs my-4 mx-auto">
                      <Image
                        className="rounded-md object-cover"
                        src={mutacion.data?.image ? mutacion.data.image : EMPTY_IMAGE}
                        alt={mutacion.data?.name ? mutacion.data?.name : 'Empty Image'}
                        layout="responsive"
                        width={320}
                        height={320}
                      />
                    </div>
                    <Button fullWidth variant="outlined" disabled={!mutacion.data?.image}>
                      <DownloadIcon className="h-5 w-5 mr-2 text-inherit" />
                      Download
                    </Button>
                  </div>
                </Paper>
              )}
            </div>
            <div className="col-span-3 md:col-span-2">
              <Paper>
                <div className="p-6 bg-transparent opacity-100">
                  <h5 className="text-slate-700 font-bold text-xl">Product Information</h5>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="col-span-2">
                      <ProductItem title="Name" text={mutacion.data?.name} />
                    </div>
                    <div className="col-span-2 md:col-span-1">
                      <ProductItem
                        title="Link"
                        text={
                          mutacion.data?.url && (
                            <a
                              className="hover:text-indigo-700 hover:underline"
                              href={mutacion.data?.url}
                              target="_blank"
                              rel="noopener noreferrer">
                              {mutacion.data?.url}
                            </a>
                          )
                        }
                      />
                    </div>
                    <div className="col-span-2 md:col-span-1">
                      <ProductItem
                        title="Store"
                        text={
                          mutacion.data?.onlineStore &&
                          `${mutacion.data?.onlineStore.name} (${mutacion.data?.onlineStore.url})`
                        }
                      />
                    </div>
                    <div className="col-span-2 md:col-span-1">
                      <ProductItem
                        title="Price"
                        text={mutacion.data?.price && `$ ${mutacion.data?.price}`}
                      />
                    </div>
                  </div>
                </div>
              </Paper>
            </div>
          </div>
        </Paper>
      </main>
    </div>
  );
};

export default Home;
