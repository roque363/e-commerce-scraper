import Head from 'next/head';
import Image from 'next/image';
import type { NextPage } from 'next';
import { ChangeEvent, ReactNode, useState } from 'react';
import { DownloadIcon } from '@heroicons/react/outline';

import { trpc } from '@root/utils/trpc';
import { Paper } from '@root/components';
import { EMPTY_IMAGE } from '@root/constants/variables';
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
        <div className="relative flex w-full border-gray-300 border-b pb-4 mb-4">
          <input
            className="rounded-r-none focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow sm:text-sm border-gray-300 rounded-md"
            type="text"
            name="initialQuery"
            id="initialQuery"
            value={search}
            onChange={handleSearchChange}
            placeholder="Ej: www.tienda.com/producto"
          />
          <button
            disabled={mutacion.isLoading}
            onClick={handleSearch}
            type="button"
            className="w-32 rounded-l-none bg-blue-500 border border-transparent shadow-sm rounded-md flex items-center justify-center text-base font-medium text-white  hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 disabled:opacity-50">
            Search
          </button>
        </div>
        <Paper className="p-8" shadow={false}>
          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-3 md:col-span-1">
              <Paper>
                <div className="p-6 bg-transparent opacity-100">
                  <h5 className="text-slate-700 font-bold text-xl ">Product Image</h5>
                  <div className="relative block max-w-xs my-4 mx-auto">
                    <Image
                      className="rounded-md"
                      src={mutacion.data?.image ? mutacion.data.image : EMPTY_IMAGE}
                      alt={mutacion.data?.name ? mutacion.data?.name : 'Empty Image'}
                      layout="responsive"
                      width={320}
                      height={320}
                    />
                  </div>
                  <div>
                    <button
                      type="button"
                      disabled={!mutacion.data?.image}
                      className="w-full py-1.5 bg-blue-500 border border-transparent rounded-md flex items-center justify-center text-base font-medium text-white  hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 disabled:opacity-50">
                      <DownloadIcon className="h-5 w-5 mr-2 text-white" />
                      Download
                    </button>
                  </div>
                </div>
              </Paper>
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
