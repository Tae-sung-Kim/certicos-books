import { useState } from 'react';

function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  // 값 세팅
  const setValue = (value: T) => {
    try {
      setStoredValue(value);
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  };

  // 값 삭제
  const deleteValue = (options?: { key?: string; value?: string }) => {
    const targetKey = options?.key ?? key;

    // value가 있다면 특정 값만 삭제
    if (options?.value) {
      if (Array.isArray(storedValue)) {
        // 배열일때 삭제 처리
        const updatedValue = storedValue.filter(
          (item) => item !== options.value
        );
        setStoredValue(updatedValue as T);
        localStorage.setItem(targetKey, JSON.stringify(updatedValue));
      }
    } else {
      setStoredValue(initialValue);
      localStorage.removeItem(targetKey);
    }
  };

  return [storedValue, setValue, deleteValue] as const;
}

export default useLocalStorage;
