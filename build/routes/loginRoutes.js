"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var router = express_1.Router();
exports.router = router;
router.get('/login', function (req, res) {
    res.send("\n\t<form method= \"post\">\n\t<div>\n\t<label>Email</label>\n\t<input name=\"email\">\n\t</div>\n\t<div>\n\t<label>Password</label>\n\t<input name=\"password\" type=\"password\">\n\t</div>\n\t<button>Submit</button>\n\t</form>\n\t");
});
router.post('/login', function (req, res) {
    var _a = req.body, email = _a.email, password = _a.password;
    res.send(email + password);
});
