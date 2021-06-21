export class Database {
  IDBTransaction: Promise<IDBTransaction>;

  constructor() {
    this.IDBTransaction = new Promise(function (resolve, reject) {
      let open: IDBOpenDBRequest = window.indexedDB.open('Nasridean',1);
      
      open.onsuccess = function() {
        const db: IDBDatabase = open.result;
        const transaction = db.transaction("user", "readwrite");
        resolve(transaction);
  
        transaction.onerror = function(event) { reject(event) }
      };
      open.onerror = function(event) { reject(event) }
      open.onupgradeneeded = (e) => open.result.createObjectStore('user');
    })
    
    //this.request.transaction?.objectStore('user').put('hello', 'key');
    //this.transaction.objectStore('user').get('key').onerror = () => console.log('got that!')
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