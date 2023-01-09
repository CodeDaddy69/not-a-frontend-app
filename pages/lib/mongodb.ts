import { MongoClient } from 'mongodb'

const uri = 'mongodb://127.0.0.1:27017/myApp'


const client = new MongoClient(uri)
const clientPromise = client.connect()

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise