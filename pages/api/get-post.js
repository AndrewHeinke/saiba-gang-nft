import { getPost } from "lib/graphcms";

export default async function handler(req, res) {
  res.status(200).json(await getPost());
}
