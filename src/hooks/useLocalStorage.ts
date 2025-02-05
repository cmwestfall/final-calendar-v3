import { useEffect, useState } from "react";

export function useLocalStorage(key: string, initialValue: Event[]) {
  const [value, setValue] = useState(() => {
    const localValue = localStorage.getItem(key);

    if (localValue === null) {
      return initialValue;
    } else {
      return JSON.parse(localValue);
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
}
