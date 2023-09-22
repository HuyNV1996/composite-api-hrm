import { useState } from 'react';

type IKeyLocalStorage = 'token' | 'username';

const useLocalStorage = (keyName: IKeyLocalStorage, defaultValue?: string) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const value = window.localStorage.getItem(keyName);
      if (value) {
        return value;
      } else {
        defaultValue &&
          window.localStorage.setItem(keyName, JSON.stringify(defaultValue));
        return defaultValue;
      }
    } catch (err) {
      return defaultValue;
    }
  });

  return { storedValue };
};

export default useLocalStorage;
