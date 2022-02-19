import withSession from "../../lib/session";
import axios from "axios";

export default withSession(async (req, res) => {
  const wallet = {
    connected: true,
  };
  req.session.set("wallet", wallet);
  await req.session.save();
  res.json(wallet);
});
