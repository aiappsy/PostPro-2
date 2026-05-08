# Project Settings & Deployment Configuration

## Application Context: PostPro

"PostPro" is a high-performance social media management SaaS.

### Core Technical Specs:
- **Backend**: Laravel 12 (PHP 8.4)
- **Frontend**: Vue 3 + Tailwind CSS 4 + Inertia.js v2
- **Auth**: Firebase Authentication (Email/Password & Google)
- **Database**: PostgreSQL (Firestore is used for secondary metadata)
- **Deployment**: Google Cloud Run + Cloud SQL

### Environment Configuration:
The application uses the provided environment variables for its core logic. 
- The `APP_ENV` is set to the project identifier `190368361945`.
- Database connections use PostgreSQL (`pgsql`) on port 5432.
- Frontend Firebase config is strictly isolated to the `postpro-auth-777` project.

## 1. Environment Variables Needed (`.env.example`)

```env
APP_NAME=PostPro
APP_ENV=190368361945
APP_KEY=
APP_DEBUG=false
APP_URL=https://localhost

LOG_CHANNEL=stack
LOG_DEPRECATIONS_CHANNEL=null
LOG_LEVEL=info

DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=postpro
DB_USERNAME=postgres
DB_PASSWORD=

BROADCAST_CONNECTION=reverb
CACHE_STORE=redis
CACHE_PREFIX=postpro_cache
QUEUE_CONNECTION=redis
SESSION_STORE=database
SESSION_ENCLAVE=null
SESSION_LIFETIME=1440

VITE_FIREBASE_API_KEY=AIzaSyBFQTncQu0DvvjUCw4tpehTAJa8sMiOxK8
VITE_FIREBASE_PROJECT_ID=postpro-auth-777
```

## 2. Docker container settings (`Dockerfile`)

We have packaged the infrastructure to run PHP 8.4 & Apache. Here is a summary of the container settings:
- **Base Image:** `php:8.4-apache`
- **System Dependencies:** `git, curl, zip, unzip, libpq-dev, nodejs, npm, libpng-dev, libonig-dev, libxml2-dev`
- **PHP Extensions:** `pdo_mysql, pdo_pgsql, mbstring, exif, pcntl, bcmath, gd`
- **Apache Config:** The container is specifically set up to parse the `$PORT` environment variable and alter the default Apache port bindings to satisfy Google Cloud Run's requirements.

## 3. Build & Compile Settings (`vite.config.ts` & `package.json`)

Your client dependencies use Vue 3 and TailwindCSS:
- The `package.json` maps building your node module assets using `vite build`. 
- `vite.config.ts` has been set up with `laravel-vite-plugin` and `@vitejs/plugin-vue`.
- `@tailwindcss/vite` runs the Tailwind compiler using the latest syntax.
- Inertia.js v2 is used for rendering.

## 4. How to Deploy

To take this codebase and deploy it to Google Cloud Run:
1. Use the **Deploy** or **Export** option provided by Google AI Studio.
2. Select **Google Cloud Run**.
3. It will automatically build the image using the provided `Dockerfile` and configure Cloud SQL based on the environment variables.
4. It will provision a secure HTTPS endpoint where your application will be served live.
