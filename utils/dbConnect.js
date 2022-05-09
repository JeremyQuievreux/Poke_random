//For Connect with MongoDB
import mongoose from 'mongoose';

const MONGODB_URL = process.env.MONGODB_URL;

if (!MONGODB_URL) {
    throw new Error(
    )
}

let cached = global.mongoose
if (!cached) {
    cached = global.mongoose = {
        conn: null,
        promise: null
    }
}

async function dbConnect() {
    if (cached.conn) {
        return cached.conn
    }

    if (!cached.promise) {
        const opts = {
            bufferComands: false,
        }

        cached.promise = mongoose.connect(MONGODB_URL).then((mongoose) => {
            return mongoose
        })
    }

    cached.conn = await cached.promise
    return cached.conn
}

export default dbConnect