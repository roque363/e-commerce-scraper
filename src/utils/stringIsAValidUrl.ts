const stringIsAValidUrl = (s: string): Boolean => {
  try {
    new URL(s);
    return true;
  } catch (err) {
    return false;
  }
};

export default stringIsAValidUrl;
