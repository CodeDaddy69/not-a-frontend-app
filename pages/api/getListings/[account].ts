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
//   saleState: string
// }[] | []

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const client = await clientPromise;
    const db = client.db("myApp");
    const { account } = req.query;

    console.log(account)
    const listings = await db.collection("listings")
    .find({seller: account})
    .toArray();

    res.status(200).json(listings);
  } catch (e) {
    console.error(e);
  }
}
