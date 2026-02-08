# Deploy from GitHub

Your repo is deployable: push to GitHub, then connect it to a host. The **Build** workflow runs on every push to `main` so you can see the project builds successfully.

## 1. Push your code

```bash
git add .
git commit -m "Your message"
git push origin main
```

## 2. Deploy with Vercel (recommended)

1. Go to [vercel.com](https://vercel.com) and sign in (use **Continue with GitHub**).
2. Click **Add New** → **Project**.
3. Import the repo `DivyanshuDubey17/ai-voice-detection-platform`.
4. Before deploying, set **Environment Variables** in the project settings:
   - `NEXTAUTH_SECRET` – generate one: `openssl rand -base64 32`
   - `NEXTAUTH_URL` – your live URL, e.g. `https://your-app.vercel.app`
   - `GOOGLE_CLIENT_ID` – from Google Cloud Console (if using Google sign-in)
   - `GOOGLE_CLIENT_SECRET` – from Google Cloud Console (if using Google sign-in)
5. Click **Deploy**. Vercel will build and host the app; future pushes to `main` auto-deploy.

## 3. Optional: GitHub Actions secrets

To run the CI build with real config (or avoid placeholder env in the workflow), add repository secrets:

- **Settings** → **Secrets and variables** → **Actions** → **New repository secret**
- Add `NEXTAUTH_SECRET` (and optionally `NEXTAUTH_URL`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`) if you want the workflow to use them. The workflow currently uses placeholders so the build passes without any secrets.

## Summary

| Step | Action |
|------|--------|
| Code | Push to `main` on GitHub |
| CI | `.github/workflows/build.yml` runs `npm run build` on push/PR |
| Deploy | Connect the repo to Vercel (or Netlify, etc.) and set env vars |

For more options (Docker, VPS), see [DEPLOYMENT.md](DEPLOYMENT.md).
