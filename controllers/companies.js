const Company = require('../models/Company');


// @desc    Show add page
// @route   GET /companies/addCompany
exports.showAddPage = (req, res) => {
    res.render('addCompany.ejs');
};

// @desc    Process add form
// @route   POST /companies
exports.createCompany = async (req, res) => {
    try {
        await Company.create(req.body);
        res.redirect('/companies');
    } catch (err) {
        console.error(err);
    }
};

// @desc    Show all companies 
// @route   GET /companies
exports.showCompanies = async (req, res) => {
    try {
        const companies = await Company.find({ user: req.user.id }).lean();
        res.render('companies.ejs', {
            companies,
        });
    } catch (err) {
        console.error(err);
        res.render('error/500');
    }
}

// @desc    Show edit page
// @route   GET /companies/edit/:id
exports.editCompany = async (req, res) => {
    try {
        const company = await Company.findOne({
            _id: req.params.id,
        }).lean();
        if (!company) {
            return res.render('error/404');
        }
        if (company.userId != req.user.id) {
            res.redirect('/companies');
        } else {
            res.render('companies/edit', {
                company,
            });
        }
    } catch (err) {
        console.error(err);
        return res.render('error/500');
    }
}

// @desc    Update company
// @route   PUT /companies/:id
exports.updateCompany = async (req, res) => {
    try {
        let company = await Company.findById(req.params.id).lean();
        if (!company) {
            return res.render('error/404');
        }
        if (company.userId != req.user.id) {
            res.redirect('/companies');
        } else {
            company = await Company.findOneAndUpdate({ _id: req.params.id }, req.body, {
                new: true,
                runValidators: true,
            });
            res.redirect('/companies');
        }
    } catch (err) {
        console.error(err);
        return res.render('error/500');
    }
}

// @desc    Delete company
// @route   DELETE /companies/:id
exports.deleteCompany = async (req, res) => {
    try {
        await Company.remove({ _id: req.params.id });
        res.redirect('/companies');
    } catch (err) {
        console.error(err);
        return res.render('error/500');
    }
}





