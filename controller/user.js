const { nanoid } = require("nanoid");
const URL = require("../model/url");

module.exports.createShort = async (req, res) => {
  try {
    const { redirectURL } = req.body;

    if (!redirectURL) {
      return res.status(400).send("URL is required");
    }

    const shortId = nanoid(8); // generates 8-char ID

    await URL.create({
      shortId,
      redirectURL,
      visitHistory: [],
    });

    return res.redirect("/");
  } catch (err) {
    console.error("CreateShort error:", err);
    res.status(500).send("Internal Server Error");
  }
};