import user from './user.js';
import feedback from './feedBack.js';
import chat from './chat.js';
const routeConstructor = (app) => {
    app.use('/user', user)
    app.use('/feedbacks',feedback)
    app.use('/chat', chat)

    app.use("*", (req, res) => {
        res.status(404).json({  error: 'Not Found'  })
    })
}

export default routeConstructor;