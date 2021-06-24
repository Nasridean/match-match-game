import { User } from '../models/user';

export class Database {
  /* constructor() {
    let open: IDBOpenDBRequest = window.indexedDB.open('Nasridean',1);
    open.onsuccess = async () => {
      const db: IDBDatabase = open.result;
      this.transaction = db.transaction("user", "readwrite");
      this.transaction.onerror = () => console.log("Error creating/accessing IndexedDB database");
    };
    open.onerror = () => console.log("Error creating/accessing IndexedDB database");
    open.onupgradeneeded = (e) => open.result.createObjectStore('user');
    //this.request.transaction?.objectStore('user').put('hello', 'key');
    //this.transaction.objectStore('user').get('key').onerror = () => console.log('got that!')
  } */
  getAll = (): Promise<User[]> => new Promise((resolve, reject): void => {
    const open: IDBOpenDBRequest = window.indexedDB.open('Nasridean', 1);

    open.onsuccess = (): void => {
      const db: IDBDatabase = open.result;
      const transaction: IDBTransaction = db.transaction('users', 'readonly');
      const store: IDBObjectStore = transaction.objectStore('users');
      store.get('0').onsuccess = (e: Event): void => resolve((<IDBRequest>e.target).result);
      transaction.onerror = (event): void => reject(event);
      transaction.oncomplete = (): void => db.close();
    };

    open.onerror = (e): void => reject(e);

    open.onupgradeneeded = (e) => open.result.createObjectStore('users');
    /* setTimeout(() => console.log(this.transaction), 1000)
      this.transaction?.objectStore('user').put(data, 'key'); */
  });

  putAll = (data: User[]): Promise<void> => new Promise((resolve, reject): void => {
    const open: IDBOpenDBRequest = window.indexedDB.open('Nasridean', 1);

    open.onsuccess = (): void => {
      const db: IDBDatabase = open.result;
      const transaction: IDBTransaction = db.transaction('users', 'readwrite');
      const store: IDBObjectStore = transaction.objectStore('users');
      store.put(data, '0').onsuccess = (e: Event): void => resolve((<IDBRequest>e.target).result);
      transaction.onerror = (event): void => reject(event);
      transaction.oncomplete = (): void => db.close();
    };

    open.onerror = (e): void => reject(e);

    open.onupgradeneeded = (e) => open.result.createObjectStore('users');
    /* setTimeout(() => console.log(this.transaction), 1000)
      this.transaction?.objectStore('user').put(data, 'key'); */
  });

  /* putData = (store: IDBObjectStore, data: User[] | []): Promise<void> => {
    return new Promise((resolve, reject): void => {
      store.put(data, '0').onsuccess = (e: Event) => {
        resolve();
      }
    })

  }

  getAllData = (store: IDBObjectStore, data: User[] | []): Promise<void> => {
    return new Promise((resolve, reject) => {
      store.get('0').onsuccess = (e: Event): void => {
        const arr = [...((<IDBRequest>e.target).result)]
        arr.forEach((user: User) => data.push(user))
        resolve()
        console.log(arr)
    }
    })
  } */

  /* async returnDatabase(request:IDBOpenDBRequest) {
    let db: IDBDatabase;
    this.request.onerror = () => console.log("Error creating/accessing IndexedDB database");
    this.request.onsuccess = async () => {
       db =   request.result;
      this.request.result.onerror = () => console.log("Error creating/accessing IndexedDB database");
    }
    this.request.onupgradeneeded = (e) => db.createObjectStore('user');
  } */
}
