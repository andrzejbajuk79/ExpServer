"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
function requireAuth(req, res, next) {
    if (req.session && req.session.loggedIn) {
        next();
        return;
    }
    res.status(403);
    res.send('Not Permitted');
}
var router = express_1.Router();
exports.router = router;
router.get('/login', function (req, res) {
    res.send("\n\t<form method= \"post\">\n\t\t<div>\n\t\t\t<label>Email</label>\n\t\t\t<input name=\"email\">\n\t\t</div>\n\t\t<div>\n\t\t\t<label>Password</label>\n\t\t\t<input name=\"password\" type=\"password\">\n\t\t</div>\n\t\t<button>Submit</button>\n\t</form>\n\t");
});
router.post('/login', function (req, res) {
    var _a = req.body, email = _a.email, password = _a.password;
    if (email && password && email === 'a@a.com' && password === 'password') {
        // mark person as login
        req.session = { loggedIn: true };
        res.redirect('/');
    }
    else {
        // not log in
        res.send('invalid email or password');
    }
});
router.get('/', function (req, res) {
    // req.session
    if (req.session && req.session.loggedIn) {
        res.send("\n\t\t<div>\n\t\t<div>you are logged in</div>\n\t\t<a href=\"/logout\">logot</a>\n\t\t</div>\n\t\t");
    }
    else {
        res.send("\n\t\t<div>\n\t\t<div>you are not logged in</div>\n\t\t<a href=\"/login\">login</a></div>\n\t\t");
    }
});
router.get('/logout', function (req, res) {
    req.session = undefined;
    res.redirect('/');
});
router.get('/protected', requireAuth, function (req, res) {
    res.send('welcome to protected rout, logged in user');
});
