export const getDomainExtension = (url?: string | null) => {
  if (!url) return null;
  const hostname = new URL(url).hostname;
  const hostnameArray = hostname.split('.');

  if (hostnameArray.length > 0) {
    const extension = hostnameArray[hostnameArray.length - 1];
    return extension;
  }

  return null;
};

export const getDomainName = (url?: string | null) => {
  if (!url) return null;
  const name = url.replace(/.+\/\/|www.|\..+/g, '');

  return name ? name : null;
};

export const getDomainData = (url?: string | null) => {
  const name = getDomainName(url);
  const extension = getDomainExtension(url);

  return [name, extension];
};
