module.exports = {
  getIndex: (req, res) => {
    console.log("This is the Home controller.");
    res.render("index.ejs");
  },
};
