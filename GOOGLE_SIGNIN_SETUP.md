# Continue with Google – Simple Guide

---

## Part A: How It Works (No Setup Yet)

When a user clicks **"Continue with Google"** on your `/auth` page, this is what happens:

1. **User clicks the button**  
   → Your app sends them to Google’s login page.

2. **User signs in on Google**  
   → Google asks: “Allow VoiceDetect to see your email and name?” User says Yes.

3. **Google sends the user back to your app**  
   → Google redirects to: `http://localhost:3000/api/auth/callback/google`  
   → NextAuth (your auth library) receives the response, creates a session, and redirects the user to your home page.

4. **User is signed in**  
   → The navbar shows their name and “Sign out”.

**Why you need Google credentials:**  
Google only does step 2 and 3 if your app is **registered** in Google Cloud and you use a **Client ID** and **Client secret**. Without them, “Continue with Google” cannot work.

---

## Part B: What Your Code Does (Implementation)

| File | What it does |
|------|----------------|
| **`app/auth/page.tsx`** | Auth page. The “Continue with Google” button calls `signIn("google", …)`. That sends the user to Google. |
| **`app/api/auth/[...nextauth]/route.ts`** | NextAuth API. It registers the **Google provider** with `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`. It also handles the callback URL when Google redirects back. |
| **`app/providers.tsx`** | Wraps the app in `SessionProvider` so any page can know if the user is logged in. |
| **`components/navbar.tsx`** | Uses `useSession()` to show “Log in / Sign up” when logged out, or the user’s name + “Sign out” when logged in. |

**Flow in code:**

- **Button click:**  
  `app/auth/page.tsx` → `handleGoogleSignIn()` → `signIn("google", { callbackUrl })`  
  (from `next-auth/react`).

- **NextAuth:**  
  Uses `GoogleProvider` in `app/api/auth/[...nextauth]/route.ts` with `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` from `.env.local`.  
  NextAuth redirects the user to Google, then handles `GET/POST` at `/api/auth/callback/google` when Google redirects back.

- **After login:**  
  NextAuth sets a session (cookie). `SessionProvider` and `useSession()` in the navbar (and anywhere else) then show the user as logged in.

So: **implementation is already in your app**. You only need to add the **Google credentials and env vars** (Part C).

---

## Part C: Setup (What You Need to Do)

You need to create **one OAuth “Web application”** in Google Cloud and put two values into `.env.local`.

### C1. Go to Google Cloud

1. Open: **https://console.cloud.google.com/**
2. Sign in with your Google account.

### C2. Create a project (if you don’t have one)

1. Top bar: click the **project name** (dropdown).
2. Click **“New Project”**.
3. Name it (e.g. `VoiceDetect`), click **Create**.
4. Select this project from the dropdown.

### C3. OAuth consent screen (one-time)

1. Left menu: **APIs & Services** → **OAuth consent screen**.
2. User type: **External** → **Create**.
3. **App name**: e.g. `VoiceDetect`.  
   **User support email** and **Developer contact email**: your email.  
   **Save and Continue**.
4. **Scopes**: **Add or Remove Scopes** → add **email**, **profile**, **openid** (or the full scope names that include `userinfo.email` and `userinfo.profile`).  
   **Update** → **Save and Continue**.
5. **Test users**: If the app is in “Testing”, add your Gmail address so you can sign in.  
   **Save and Continue**.
6. Back to dashboard.

### C4. Create OAuth credentials (Client ID and Secret)

1. Left menu: **APIs & Services** → **Credentials**.
2. **+ Create Credentials** → **OAuth client ID**.
3. **Application type**: **Web application**.
4. **Name**: e.g. `VoiceDetect Web`.
5. **Authorized JavaScript origins** – add one line:
   - `http://localhost:3000`
6. **Authorized redirect URIs** – add one line (copy exactly):
   - `http://localhost:3000/api/auth/callback/google`
7. Click **Create**.
8. In the popup you will see:
   - **Client ID** (long string like `xxxxx.apps.googleusercontent.com`)
   - **Client secret**  
   Copy both (you’ll paste them in the next step).

### C5. Put the credentials in your app

In your **project root** (same folder as `package.json`), create or edit the file **`.env.local`**.

Paste this and replace the placeholders with your real values:

```env
GOOGLE_CLIENT_ID=paste_your_client_id_here
GOOGLE_CLIENT_SECRET=paste_your_client_secret_here
NEXTAUTH_SECRET=any_long_random_string_at_least_32_characters
NEXTAUTH_URL=http://localhost:3000
```

- **GOOGLE_CLIENT_ID** and **GOOGLE_CLIENT_SECRET**: from the popup in C4.
- **NEXTAUTH_SECRET**: any long random string (e.g. 32+ characters). You can use: https://generate-secret.vercel.app/32
- **NEXTAUTH_URL**: keep `http://localhost:3000` for local dev (no trailing slash).

Save the file.

### C6. Restart the app

1. Stop the dev server (Ctrl+C in the terminal).
2. Start it again: `npm run dev`
3. Open: **http://localhost:3000/auth**
4. Click **“Continue with Google”**.

You should be sent to Google to sign in, then back to your app, and the navbar should show you as logged in.

---

## Quick checklist

- [ ] Google Cloud project created/selected  
- [ ] OAuth consent screen set (External, email/profile/openid)  
- [ ] OAuth client created (Web application)  
- [ ] Redirect URI added: `http://localhost:3000/api/auth/callback/google`  
- [ ] `.env.local` has: `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `NEXTAUTH_SECRET`, `NEXTAUTH_URL`  
- [ ] Dev server restarted, then tested on `/auth` with “Continue with Google”

---

## When you deploy (e.g. Vercel)

1. In Google Cloud, in the same OAuth client, add:
   - **Authorized JavaScript origins:** `https://your-domain.com`
   - **Authorized redirect URIs:** `https://your-domain.com/api/auth/callback/google`
2. In Vercel (or your host), set the same four environment variables, and set **NEXTAUTH_URL** to `https://your-domain.com`.

After that, “Continue with Google” will work in production too.
