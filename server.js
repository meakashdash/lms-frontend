const express = require('express');
const next = require('next');
const { createProxyMiddleware } = require('http-proxy-middleware');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    const server = express();

    // Apply the proxy middleware for both development and production modes
    server.use('/api', createProxyMiddleware({
        target: "http://13.232.228.155:8000",
        changeOrigin: true,
    }));

    // Handle all other requests
    server.all('*', (req, res) => {
        return handle(req, res);
    });

    // Start the server
    server.listen(3000, (err) => {
        if (err) {
            throw err;
        }
        console.log("Ready on http://13.232.228.155:3000");
    });
}).catch(err => {
    console.log('Error:', err);
});
