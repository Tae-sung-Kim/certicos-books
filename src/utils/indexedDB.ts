export const openDB = (
  dbName: string,
  storeName: string,
  version = 1
): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, version);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(storeName)) {
        db.createObjectStore(storeName, { keyPath: 'id' });
      }
    };

    request.onsuccess = (event) => {
      resolve((event.target as IDBOpenDBRequest).result);
    };

    request.onerror = (event) => {
      reject((event.target as IDBOpenDBRequest).error);
    };
  });
};

export const addItem = async <T extends { id: string }>(
  dbName: string,
  storeName: string,
  item: T
): Promise<void> => {
  const db = await openDB(dbName, storeName);
  const transaction = db.transaction(storeName, 'readwrite');
  const store = transaction.objectStore(storeName);
  store.add(item);
};

export const removeItem = async (
  dbName: string,
  storeName: string,
  id: string
): Promise<void> => {
  const db = await openDB(dbName, storeName);
  const transaction = db.transaction(storeName, 'readwrite');
  const store = transaction.objectStore(storeName);
  store.delete(id);
};

export const getItem = async <T>(
  dbName: string,
  storeName: string,
  id: string
): Promise<T | undefined> => {
  const db = await openDB(dbName, storeName);
  const transaction = db.transaction(storeName, 'readonly');
  const store = transaction.objectStore(storeName);
  return new Promise((resolve, reject) => {
    const request = store.get(id);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

export const getAllItems = async <T>(
  dbName: string,
  storeName: string
): Promise<T[]> => {
  const db = await openDB(dbName, storeName);
  const transaction = db.transaction(storeName, 'readonly');
  const store = transaction.objectStore(storeName);
  return new Promise((resolve, reject) => {
    const request = store.getAll();
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};
