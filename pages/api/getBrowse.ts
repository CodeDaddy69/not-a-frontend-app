// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../lib/mongodb';

// type Data = {
//     listing: string,
//     price: string,
//     name: string,
//     itemType: string,
// }[] | []


// This TypeScript directly accesses mongoDB however we will remove this and access mongoDB via a Python rest API.
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    try {
        const client = await clientPromise;
        const db = client.db("myApp");

        const listings = await db.collection("listings")
        .find( { saleState : { $ne: "sold" } } )
        .limit(10)
        .toArray();

        res.status(200).json(listings);
    } catch (e) {
        console.error(e);
    }
}