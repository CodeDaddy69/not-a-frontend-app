// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../lib/mongodb';

// type Data = {
//   listing: string,
//   price: string,
//   name: string,
//   itemType: string,
//   colour: string,
//   condition: string,
//   saleState: string,
//   seller: string
// } | undefined

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    try {
        const { address } = req.query;

        const client = await clientPromise;
        const db = client.db("myApp");

        console.log(address)
        const listing = await db.collection("listings")
        .findOne({listing: address});

        res.status(200).json(listing);
    } catch (e) {
        console.error(e);
    }
}
