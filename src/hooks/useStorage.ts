declare global {
  interface Window {
    setItem: any;
    removeItem: any;
  }
}

type IStorageType = "session" | "local";

// Hook to perform curd operations on localstorage variables.
const useStorage = () => {
  // type would be 'session' | 'local'

  const storageType: any = (type: IStorageType) => `${type ?? "local"}Storage`;

  const isBrowser = typeof window !== "undefined";

  // function to get local storage value
  const getItem = (key: any, type: IStorageType) => {
    return isBrowser ? window[storageType(type)][key] : "";
  };

  // function to set value to local storage
  const setItem = (key: string, value: any, type: IStorageType) => {
    if (isBrowser) {
      window[storageType(type)].setItem(key, value);
      return true;
    }
    return false;
  };

  // function to remove value from local storage
  const removeItem = (key: string, type: string) => {
    window[storageType(type)].removeItem(key);
  };

  return {
    getItem,
    setItem,
    removeItem,
  };
};

export default useStorage;
