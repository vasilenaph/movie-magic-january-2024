const mongoose = require('mongoose');

exports.getErrorMessage = (err) => {
    let message = '';

    if (err.errors && Object.values(err.errors).length > 0) {
        message = Object.values(err.errors)[0].message;
    } else {
        // Handle the case where err.errors is undefined or empty
        message = "Unknown error occurred";
    }

    return message;
}

// middleware factory
exports.validate = (Model) => async (req, res, next) => {
    try {
        const modelInstance = new Model(req.body);

        const isValid = await modelInstance.validate();

        if (!isValid) {
            return res.redirect('/404');
        }

        next();
    } catch (err) {
        // Its too disruptive
        const message = this.getErrorMessage(err);

        res.render('404', { error: message });
    }
}
