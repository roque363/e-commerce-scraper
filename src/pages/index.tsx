import Head from 'next/head';
import Image from 'next/image';
import type { NextPage } from 'next';
import { ChangeEvent, KeyboardEvent, useState } from 'react';
import { SearchIcon } from '@heroicons/react/outline';

import { trpc } from '@root/utils/trpc';
import { Button, Input, Paper } from '@root/ui-component';
import searchPic from '@public/images/icons/search.png';
import stringIsAValidUrl from '@root/utils/stringIsAValidUrl';
import ProductImageCard from '@root/components/ProductImageCard';
import ProductInfoCard from '@root/components/ProductInfoCard';

const Home: NextPage = () => {
  const [query, setQuery] = useState('');
  const mutacion = trpc.useMutation(['scrapper']);

  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSearch = async () => {
    if (!query) {
      return;
    }
    if (!stringIsAValidUrl(query)) {
      return;
    }
    const url = query;

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
          <Input
            placeholder="E.g. www.store.com/product"
            name="initialQuery"
            id="initialQuery"
            type="text"
            value={query}
            onChange={handleQueryChange}
            onKeyDown={handleKeyDown}
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
          {!mutacion.data && !mutacion.isLoading && (
            <div className="flex flex-col items-center">
              <h3 className="text-2xl mb-4">
                No se encontro ningun producto, en la url proporcionada.
              </h3>
              <Image src={searchPic} alt="Search Image" />
            </div>
          )}
          {mutacion.isLoading && (
            <div className="grid grid-cols-3 gap-6">
              <div className="col-span-3 md:col-span-1">
                <ProductImageCard isLoading />
              </div>
              <div className="col-span-3 md:col-span-2">
                <ProductInfoCard isLoading />
              </div>
            </div>
          )}
          {mutacion.data && (
            <div className="grid grid-cols-3 gap-6">
              <div className="col-span-3 md:col-span-1">
                <ProductImageCard data={mutacion.data} />
              </div>
              <div className="col-span-3 md:col-span-2">
                <ProductInfoCard data={mutacion.data} />
              </div>
            </div>
          )}
        </Paper>
      </main>
    </div>
  );
};

export default Home;
