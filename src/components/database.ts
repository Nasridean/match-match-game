export class Database {
  private transaction?: IDBTransaction;
 
  /* constructor() {
    let open: IDBOpenDBRequest =  window.indexedDB.open('Nasridean',1); 
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
  managaDatabase(data: {data: string, key: string}, key: string) {
    let open: IDBOpenDBRequest =  window.indexedDB.open('Nasridean',1); 
    open.onsuccess = async () => {
      const db: IDBDatabase = open.result;
      this.transaction = db.transaction("users", "readwrite");  
      this.transaction?.objectStore('users').put(data, key);
      this.transaction.onerror = () => console.log("Error creating/accessing IndexedDB database");
    };
    open.onerror = () => console.log("Error creating/accessing IndexedDB database");
    open.onupgradeneeded = (e) => open.result.createObjectStore('users');
    /* setTimeout(() => console.log(this.transaction), 1000)
    this.transaction?.objectStore('user').put(data, 'key'); */
  }

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