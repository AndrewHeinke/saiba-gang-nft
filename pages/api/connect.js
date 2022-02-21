import withSession from "../../lib/session";

export default withSession(async (req, res) => {
  const { connected } = req.body;

  const wallet = {
    connected: connected,
  };
  req.session.set("wallet", wallet);
  await req.session.save();
  res.json(wallet);
});
