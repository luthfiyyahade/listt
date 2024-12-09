import immutablePersistenceTransform from '../services/ImmutablePersistenceTransform'
// import storage from 'redux-persist/lib/storage'
import storage from 'redux-persist-indexeddb-storage';

// More info here:  https://shift.infinite.red/shipping-persistant-reducers-7341691232b1
const REDUX_PERSIST = {
  active: true,
  reducerVersion: '1.1',
  storeConfig: {
    key: 'primary', 
    storage: storage('KBIJPersistDB'),
    // Reducer keys that you do NOT want stored to persistence here.
    //blacklist: ['login', 'search', 'nav'],
    // Optionally, just specify the keys you DO want stored to persistence.
    // An empty array means 'don't store any reducers' -> infinitered/ignite#409
    whitelist: ['template', 'genericreport'],
    transforms: [immutablePersistenceTransform]
  }
}

export default REDUX_PERSIST
