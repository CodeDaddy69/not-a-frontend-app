// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../lib/mongodb';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const client = await clientPromise;
    const db = client.db("myApp");
    const { account } = req.query;

    const stats = await db.collection("userstats")
    .findOne({account: account});

    res.status(200).json(stats);
  } catch (e) {
    console.error(e);
  }
}
