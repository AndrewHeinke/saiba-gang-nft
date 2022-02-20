import withSession from "../../lib/session";

export default withSession(async (req, res) => {
  const { publicKey } = req.body;

  const wallet = {
    connected: true,
    publicKey: publicKey,
  };
  req.session.set("wallet", wallet);
  await req.session.save();
  res.json(wallet);
});
