const Company = require('../models/Company');

module.exports = {
  getCompanys: async (req, res) => {
    // console.log(req.user)
    try {
      const companies = await Company.find({ userId: req.user.id });
      const companiesLeft = await Company.countDocuments({
        userId: req.user.id,
        completed: false,
      });
      // const companies = await Company.find()
      res.render('companies.ejs', {
        companies: companies,
        left: companiesLeft,
        user: req.user,
      });
    } catch (err) {
      console.log(err);
    }
  },
  getCompanyPage: async (req, res) => {
    const companyId = req.params.companyId;
    try {
      const company = await Company.find({ _id: companyId });
      res.render('company.ejs', { company: company[0] });
    } catch (err) {
      console.log(err);
    }
  },
  createCompany: async (req, res) => {
    try {
      await Company.create({
        name: req.body.companyName,
        phone: req.body.phoneNumber,
        completed: false,
        userId: req.user.id,
      });
      console.log('Company has been added!');
      res.redirect('/companies');
    } catch (err) {
      console.log(err);
    }
  },
  editCompany: async (req, res) => {
    try {
      await Company.findOneAndUpdate(
        { _id: req.body.companyIdFromJSFile },
        {
          name: req.body.companyName,
          phone: req.body.phoneNumber,
        }
      );
      console.log('Updated');
      res.json('updated');
    } catch (err) {
      console.log(err);
    }
  },
  markComplete: async (req, res) => {
    try {
      await Company.findOneAndUpdate(
        { _id: req.body.companyIdFromJSFile },
        {
          completed: true,
        }
      );
      console.log('Marked Complete');
      res.json('Marked Complete');
    } catch (err) {
      console.log(err);
    }
  },
  markIncomplete: async (req, res) => {
    try {
      await Company.findOneAndUpdate(
        { _id: req.body.companyIdFromJSFile },
        {
          completed: false,
        }
      );
      console.log('Marked Incomplete');
      res.json('Marked Incomplete');
    } catch (err) {
      console.log(err);
    }
  },
  deleteCompany: async (req, res) => {
    console.log('in delete');
    console.log(req.body);
    console.log(req.body.companyIdFromJSFile);
    try {
      await Company.findOneAndDelete({ _id: req.body.companyIdFromJSFile });
      console.log('Deleted Company');
      res.json('Deleted It');
    } catch (err) {
      console.log(err);
    }
  },
};
