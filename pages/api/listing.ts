// FILE COMMENTED OUT AS IT WRITES DIRECTLY TO THE MONGODB WE WILL DO GET, POST, PUT, DELETE FUNCTIONALITY DIRECTLY IN OUR FLASK SERVER!

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import type { NextApiRequest, NextApiResponse } from 'next';
// import clientPromise from '../lib/mongodb';

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

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<Data>
// ) {
//     try {
//         const client = await clientPromise;
//         const db = client.db("myApp");

//         switch (req.method) {
//             case "POST":
//                 const insert = (await db.collection("listings").insertOne(req.body)).acknowledged;
//                 res.status(200).json(insert ? "success": "failure");
//                 break;
//             case "PATCH":
//                 // escrow initialised
//                 if (req.body.toEscrow) {
//                     console.log("here")
//                     const listing = await db.collection("listings")
//                     .updateOne({listing: req.body.listing}, {$set: {"saleState": req.body.content.saleState, "escrow": req.body.content.escrow}});
//                     res.status(200).json("success");
//                     break;
//                 }

//                 // state updates
//                 const listing = await db.collection("listings")
//                 .updateOne({listing: req.body.listing}, {$set: {"saleState": req.body.content.saleState, "escrow.escrowState": req.body.content.escrowState}});
//                 res.status(200).json("success");
//                 break;
//             case "GET":
//                 const listings = await db.collection("listings")
//                 .find({ "escrow.buyer": req.body.buyer }).toArray()
//                 res.status(200).json(listings);
//             default:
//                 break;

//         }
        
//     } catch (e) {
//         console.error(e);
//     }
// }
