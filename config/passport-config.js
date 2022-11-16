const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

function initialize(passport, getUserByEmail, getUserById) {

    console.log('passport config called');


    const authenticateUser = async (email, password, done) => {
        console.log('password: ', password);
        console.log('email: ', email);
        const user = getUserByEmail(email)
        if (user == null) {
            console.log('user is null ');

            return done(null, false, { message: 'No user with that email' })
        }

        try {
            // await bcrypt.compare(password, user.password) nned add this after hashing
            if (password == user.password) {
                return done(null, user)
            } else {
                console.log('Password incorrect');
                return done(null, false, { message: 'Password incorrect' })
            }
        } catch (error) {
            console.log('error: ', error);
            return done(error)
        }
    }

    passport.use(new LocalStrategy({
        usernameField: 'email'
    },
        authenticateUser))

    passport.serializeUser((user, done) => done(null, user))
    passport.deserializeUser((user, done) => {
        return done(null, user)
    })
}

module.exports = initialize