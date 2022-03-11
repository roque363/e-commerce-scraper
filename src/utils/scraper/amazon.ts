import puppeteer from 'puppeteer';

import ProductData from '@root/interfaces/ProductData';
import { getPageElement } from '../getPageElement';

const NAME_XPATH = '//*[@id="productTitle"]';
const IMAGE_ROOT_XPATH = '//*[@id="landingImage"]';
const IMAGE_BOOK_XPATH = '//*[@id="imgBlkFront"]';
const PRICE_ROOT_XPATH = '//*[@id="corePrice_feature_div"]/div/span/span[1]';
const PRICE_BOOK_XPATH = '//*[@id="price"]';

const refactorImage = (image: string) => {
  const imageSplit = image.split('.');
  imageSplit[imageSplit.length - 2] = '_SL500_';
  const strImage = imageSplit.join('.');

  return strImage;
};

const refactorPrice = (price: string) => {
  const strPrice = price?.replace(/US\$/gi, '').trim();

  return strPrice;
};

const cleanUrl = (url: string) => {
  const strUrl = url.split('?')[0];
  return strUrl;
};

const refactorUrl = (url: string) => {
  const productId = url.replace(/.+\/dp\/|\/.+/g, '');
  const strUrl = 'https://www.amazon.com/dp/' + productId;

  return strUrl;
};

const scraperAmazon = async (url: string): Promise<ProductData | null> => {
  try {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(url);

    const nameRoot = await getPageElement(page, NAME_XPATH, 'textContent');
    const imageRoot = await getPageElement(page, IMAGE_ROOT_XPATH, 'src');
    const imgBook = await getPageElement(page, IMAGE_BOOK_XPATH, 'src');
    const priceRoot = await getPageElement(page, PRICE_ROOT_XPATH, 'textContent');
    const priceBook = await getPageElement(page, PRICE_BOOK_XPATH, 'textContent');

    await browser.close();

    const urlRoot = cleanUrl(url);
    const urlRef = urlRoot && refactorUrl(urlRoot);

    const imageRoot500 = imageRoot && refactorImage(imageRoot);
    const imageBook500 = imgBook && refactorImage(imgBook);

    const priceRootRef = priceRoot && refactorPrice(priceRoot);
    const priceBookRef = priceBook && refactorPrice(priceBook);

    const name = nameRoot ? nameRoot?.trim() : null;
    const image = imageRoot500 ? imageRoot500 : imageBook500 ? imageBook500 : null;
    const price = priceRootRef ? priceRootRef : priceBookRef ? priceBookRef : null;

    return {
      url: urlRef ? urlRef : urlRoot,
      name,
      image,
      price,
    };
  } catch (error) {
    return null;
  }
};

export default scraperAmazon;
