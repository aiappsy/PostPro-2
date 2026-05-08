import express from 'express';
import { createServer as createViteServer } from 'vite';

async function createServer() {
  const app = express();
  const PORT = process.env.PORT || 3000;

  // Create Vite server in middleware mode
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'custom'
  });

  // Use vite's connect instance as middleware
  app.use(vite.middlewares);

  app.use('*', async (req, res, next) => {
    try {
      // Determine which page to mock based on path
      let componentName = "auth/Login"; 
      
      const cookies = req.headers.cookie || '';
      const isLoggedIn = cookies.includes('user_id=');

      if (req.originalUrl === '/dashboard' || req.originalUrl === '/posts' || req.originalUrl === '/') {
        if (isLoggedIn) {
            componentName = "posts/Index";
        } else if (req.originalUrl === '/') {
            componentName = "auth/Login";
        } else {
            componentName = "auth/Login";
        }
      } else if (req.originalUrl === '/settings/profile') {
        componentName = "settings/profile/Profile";
      }

      const inertiaPage = {
        component: componentName,
        props: {
            locale: 'en',
            auth: { user: isLoggedIn ? { id: 1, name: 'Google User', email: 'user@gmail.com' } : null },
            flash: {},
            applicationUrl: 'http://localhost:3000',
            env: 'local',
            errors: {},
            googleAuthEnabled: true,
            githubAuthEnabled: true,
        },
        url: req.originalUrl,
        version: "1.0"
      };

      // If it's an Inertia request, return the JSON page object directly
      if (req.headers['x-inertia']) {
        return res.status(200).set({
          'Content-Type': 'application/json',
          'X-Inertia': 'true'
        }).json(inertiaPage);
      }

      const pageString = JSON.stringify(inertiaPage).replace(/\//g, '\\/');
      
      let html = `
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>PostPro Preview</title>
            <style>
              html { background-color: #faf8f5; }
            </style>
            <script type="module" src="/@vite/client"></script>
            <script type="module" src="/resources/js/app.ts"></script>
          </head>
          <body class="font-sans antialiased">
            <script data-page="app" type="application/json">${pageString}</script>
            <div id="app"></div>
          </body>
        </html>
      `;

      // Apply Vite HTML-transforming plugins
      html = await vite.transformIndexHtml(req.originalUrl, html);

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Vite mock server running on port ${PORT}`);
  });
}

createServer();
