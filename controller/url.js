const { nanoid } = require("nanoid");
const URL = require("../model/url");

module.exports.home = async (req, res) => {
  try {
    const allURL = await URL.find({});
    res.render("home", { allURL });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

module.exports.createShort = async (req, res) => {
  try {
    const { redirectURL } = req.body;

    const shortId = nanoid(8);

    await URL.create({
      shortId,
      redirectURL,
      visitHistory: [],
    });

    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

module.exports.redirect = async (req, res) => {
  try {
    const { shortId } = req.params;

    const entry = await URL.findOne({ shortId });

    if (!entry) return res.status(404).send("URL not found");

    entry.visitHistory.push({ timestamp: Date.now() });
    await entry.save();

    res.redirect(entry.redirectURL);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};