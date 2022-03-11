import { Page } from 'puppeteer';

export const getPageElement = async (
  page: Page,
  XPath: string,
  propertyName: string,
): Promise<string | null> => {
  try {
    const [el] = await page.$x(XPath);
    const prop = await el?.getProperty(propertyName);
    const json = await prop?.jsonValue();
    const value = json ? String(json) : null;

    return value;
  } catch (error) {
    return null;
  }
};

export default getPageElement;
