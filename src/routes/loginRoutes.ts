import { Router, Request, Response } from 'express';
import { NextFunction } from 'connect';
interface RequestWithBody extends Request {
	body: {
		[key: string]: string | undefined;
	};
}
function requireAuth(req: Request, res: Response, next: NextFunction): void {
	if (req.session && req.session.loggedIn) {
		next();
		return;
	}
	res.status(403);
	res.send('Not Permitted');
}
const router = Router();

router.get('/login', (req: Request, res: Response) => {
	res.send(`
	<form method= "post">
		<div>
			<label>Email</label>
			<input name="email">
		</div>
		<div>
			<label>Password</label>
			<input name="password" type="password">
		</div>
		<button>Submit</button>
	</form>
	`);
});
router.post('/login', (req: RequestWithBody, res: Response) => {
	const { email, password } = req.body;
	if (email && password && email === 'a@a.com' && password === 'password') {
		// mark person as login
		req.session = { loggedIn: true };
		res.redirect('/');
	} else {
		// not log in
		res.send('invalid email or password');
	}
});

router.get('/', (req: Request, res: Response) => {
	// req.session
	if (req.session && req.session.loggedIn) {
		res.send(`
		<div>
		<div>you are logged in</div>
		<a href="/logout">logot</a>
		</div>
		`);
	} else {
		res.send(`
		<div>
		<div>you are not logged in</div>
		<a href="/login">login</a></div>
		`);
	}
});
router.get('/logout', (req: Request, res: Response) => {
	req.session = undefined;
	res.redirect('/');
});
router.get('/protected', requireAuth, (req: Request, res: Response) => {
	res.send('welcome to protected rout, logged in user');
});
export { router };
