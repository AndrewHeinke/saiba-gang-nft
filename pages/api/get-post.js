import { getPost } from "lib/graphcms";

export default async function handler(req, res) {
  const slug = await req.body;
  res.status(200).json(await getPost(slug));
}
