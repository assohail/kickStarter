import { createServer } from 'http';
import next from 'next';

const app = next({
    dev: process.env.NODE_ENV !== 'production'
});

const routes = require('./routes').default.default;
const handler = routes.getRequestHandler(app);

app.prepare().then(() => {
    createServer(handler).listen(3000, (err) => {
        if (err) throw err;
        console.log('Ready on localhost:3000');
    })
})