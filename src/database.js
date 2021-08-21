import localForage from 'localforage';


localForage.setDriver(localForage.INDEXEDDB);


export const StocksDB = localForage.createInstance({
    name: "Stocks"
});
export const InvoicesDB = localForage.createInstance({
    name: "Invoices"
});