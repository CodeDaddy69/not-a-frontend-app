// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../lib/mongodb';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    try {
        const client = await clientPromise;
        const db = client.db("myApp");

        const listings = await db.collection("listings")
        .find( { saleState : { $nin: ["disputed", "sold", "under sale"] } } )
        .limit(10)
        .toArray();

        res.status(200).json(listings);
    } catch (e) {
        console.error(e);
    }
}