import withSession from "../../lib/session";

export default withSession(async (req, res) => {
  const wallet = req.session.get("wallet");

  if (wallet) {
    res.json({
      ...wallet,
      connected: true,
    });
  } else {
    res.json({
      isLoggedIn: false,
    });
  }
});
