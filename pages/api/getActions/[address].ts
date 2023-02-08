// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../lib/mongodb';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    try {
        const { address } = req.query;
        const update = req.body

        const client = await clientPromise;
        const db = client.db("myApp");

        console.log(address)
        const listings = await db.collection("listings")
        .find({ $or: [{ "escrow.buyer": address  }, { "seller": address }], saleState: {$ne: "sold"}}).toArray()
        res.status(200).json(listings);
    } catch (e) {
        console.error(e);
    }
}
