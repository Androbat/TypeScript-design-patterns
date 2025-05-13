// Proxy Pattern -> applies when the program needs to know about or to intervene the behavior
// of accesing objects. 
// Scenarios:
// 1. Remote proxy -> A proxy with an `INTERFACE` to manipuldate remote objects, sucha as data in a remote server.
// 2. Virtual proxy -> 
// 3. Protection proxy -> 
// 4. Smart proxy -> 

// With `Proxy Pattern`, we could open database on demand and create storage instances sync
// 
let ready = new Promise<string>(resolve => {
    setTimeout(() => {
        resolve("biu~");
    }, Math.random() * 1000);
});

setTimeout(() => {
    ready.then(text => {
        console.log(text)
    });
}, 999);

// The first time we access property `dbReady`, it will open the database and create a Promise
// that will fullfilled with the database being opened.
class IndexDataBaseStorage {
    private dataBasePromise: Promise<IDBDatabase>;
    constructor(public name: string, public storeName = "default") {}

    private get dbReady(): Promise<IDBDatabase> {
        if (!this.dataBasePromise){
            this.dataBasePromise = new Promise<IDBDatabase>((resolve, reject) => {
                let request = indexedDB.open(this.name);

                request.onsuccess = event => {
                    resolve(request.result)
                };

                request.onerror = event => {
                    reject(request.error)
                };
            })
        }

        return this.dataBasePromise
    }

    get<T>(key: string): Promise<T>{
        // if (this.permission.read)
        // return Promise.reject<T>(new Error("Permission denied"))
        return this
            .dbReady
            .then(db => new Promise<T>((resolve, reject) => {
                let transaction = db.transaction(this.storeName);
                let store = transaction.objectStore(this.storeName);

                let request = store.get(key);

                request.onsuccess = event => {
                    resolve(request.result)
                }

                request.onerror = event => {
                    reject(request.error);
                }
            }))
    }

    set<T>(key: string, value: T): Promise<void> {
        return this
            .dbReady
            .then(db => new Promise<void>((resolve, reject) => {
                let transaction = db
                    .transaction(this.storeName, "readwrite");
                let store = transaction.objectStore(this.storeName);
                let request = store.put(value, key);

                request.onsuccess = event => {
                    resolve();
                }

                request.onerror = event => {
                    reject(request.error);
                }
            }))
    }
}