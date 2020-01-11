import Auth from '../models/AuthModel'

export default class AuthController {

    login(req, res) {
        const username = req.body.username;
        
        Auth().authenticate(username, (value) => {
            if (value.length != 0) {
                // Valid login
                return res.sendStatus(200);
              } else {
                // Incorrect password
                return res.sendStatus(401);
            }
        })
    }
}


