import { Router, Request, Response } from 'express';
interface RequestWithBody extends Request {
	body: {
		[key: string]: string | undefined;
	};
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
export { router };
