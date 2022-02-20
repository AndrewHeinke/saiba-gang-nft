import withSession from "../../lib/session";
import axios from "axios";

export default withSession(async (req, res) => {
  const wallet = req.session.get("wallet");
  const { saibaName, saibaImg } = req.body;

  const getTokenImage = async () => {
    try {
      const val = await axios.get(saibaImg);
      return val;
    } catch (error) {
      console.log(error);
    }
  };
  const saibaImageUrl = await getTokenImage();

  if (saibaName) {
    res.json({
      isSaibaHolder: true,
      name: saibaName,
      img: saibaImageUrl?.data?.image,
      ...wallet,
    });
  } else {
    res.json({
      isSaibaHolder: false,
      ...wallet,
    });
  }
});
