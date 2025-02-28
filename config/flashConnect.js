module.exports.setFalsh = (req, res, next) => {
    res.locals.flash = {
        'success': req.flash('success'),
        'error': req.flash('error'),
        'warning': req.flash('warning'),
        'delete': req.flash('delete'),
        'edit': req.flash('edit'),
    };
next();
}