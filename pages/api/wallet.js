import withSession from "../../lib/session";

export default withSession(async (req, res) => {
  const wallet = req.session.get("wallet");

  if (wallet) {
    res.json({
      connected: true,
      ...wallet,
    });
  } else {
    res.json({
      connected: false,
    });
  }
});
