import user from './user.js';
import feedback from './feedBack.js';
const routeConstructor = (app) => {
    app.use('/user', user)
    app.use('/feedbacks',feedback)

    app.use("*", (req, res) => {
        res.status(404).json({  error: 'Not Found'  })
    })
}

export default routeConstructor;