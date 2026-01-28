# VoiceDetect - Quick Start Guide

Get up and running with VoiceDetect in 5 minutes.

## Prerequisites

- Node.js 18+ 
- npm or yarn
- A code editor (VS Code recommended)
- A modern web browser

## Installation

### 1. Install Dependencies (1 minute)

```bash
npm install
```

### 2. Start Development Server (1 minute)

```bash
npm run dev
```

Output will show:
```
  ▲ Next.js 16.x
  - Local:        http://localhost:3000
```

### 3. Open in Browser (30 seconds)

Visit: http://localhost:3000

You'll see the VoiceDetect homepage with the voice detection tool ready to use.

## Using the Application

### Test Voice Detection

1. **Upload Audio**
   - Click "Upload File" tab
   - Click the upload area or drag-and-drop an MP3/WAV file
   - Results appear instantly

2. **Record Audio**
   - Click "Record Audio" tab
   - Click "Start Recording"
   - Speak for a few seconds
   - Click "Stop Recording"
   - Analysis runs automatically

3. **View Results**
   - Classification: AI_GENERATED or HUMAN
   - Confidence Score: 0-100%
   - Detected Language
   - Analysis Explanation

### Explore Pages

- **Home** (`/`) - Main detection tool
- **API Docs** (`/api-docs`) - Integration guide
- **Features** (scroll down) - Features showcase
- **Use Cases** (scroll down) - Real-world applications
- **Contact** (`/contact`) - Contact form
- **Privacy** (`/privacy`) - Privacy policy
- **Terms** (`/terms`) - Terms of service

### Test Dark Mode

Click the moon/sun icon in the top-right navigation bar to toggle dark/light mode.

## API Integration

### Simple API Test

```bash
# Terminal: Create a test file
cat > test-api.js << 'EOF'
const testAudio = "SUQzBAAAI1MTT1BODQAwMDAwMDAwMjM3TkFNRQAAAAA=";

fetch('/api/voice-detect', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    audio_base64: testAudio,
    language: 'en'
  })
})
.then(r => r.json())
.then(data => console.log(data));
EOF

# Run with Node.js
node test-api.js
```

### JavaScript Example

```javascript
// In browser console (F12)
const audioBase64 = "SUQzBAAAI1MTT1BODQAwMDAwMDAwMjM3TkFNRQAAAAA=";

fetch('/api/voice-detect', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    audio_base64: audioBase64,
    language: 'en'
  })
})
.then(res => res.json())
.then(data => {
  console.log('Classification:', data.classification);
  console.log('Confidence:', data.confidence + '%');
  console.log('Language:', data.language);
  console.log('Explanation:', data.explanation);
});
```

## Project Structure (Key Files)

```
voicedetect/
├── app/
│   ├── page.tsx              # Homepage with detection tool
│   ├── api-docs/page.tsx     # API documentation
│   ├── api/voice-detect/     # Backend API endpoint
│   ├── contact/page.tsx      # Contact page
│   ├── privacy/page.tsx      # Privacy policy
│   └── terms/page.tsx        # Terms of service
├── components/
│   ├── navbar.tsx            # Navigation
│   ├── footer.tsx            # Footer
│   ├── voice-detection-tool.tsx  # Main tool
│   ├── hero-section.tsx      # Hero content
│   ├── features-section.tsx  # Features list
│   └── use-cases-section.tsx # Use cases
├── app/globals.css           # Design system colors
└── README.md                 # Full documentation
```

## Customization

### Change App Title

Edit `app/layout.tsx`:
```tsx
export const metadata: Metadata = {
  title: 'Your App Name',
  description: 'Your description',
}
```

### Change Brand Colors

Edit `app/globals.css`:
```css
:root {
  --primary: oklch(0.35 0.15 280);  /* Change the hue value (280) */
  --secondary: oklch(0.3 0.12 260);
  --accent: oklch(0.45 0.2 280);
}
```

### Add Your Logo

Replace the "V" logo in `components/navbar.tsx`:
```tsx
<img src="/your-logo.png" alt="Logo" className="w-8 h-8" />
```

## Common Tasks

### Run Tests
```bash
npm test
```

### Build for Production
```bash
npm run build
npm start
```

### Deploy to Vercel
```bash
git push origin main
# Visit vercel.com and import your repository
```

### View API Documentation
Visit: http://localhost:3000/api-docs

### View Privacy Policy
Visit: http://localhost:3000/privacy

## Troubleshooting

### Port 3000 Already in Use
```bash
npm run dev -- -p 3001
# Or kill the process using port 3000
```

### Dependencies Installation Error
```bash
rm -rf node_modules package-lock.json
npm install
```

### Audio Upload Not Working
- Check browser supports File API
- Verify file is valid audio format
- Check browser console for errors (F12)

### Dark Mode Not Toggling
- Clear browser cache
- Check if `dark` class is on `<html>` element
- Verify `globals.css` has dark mode styles

## Next Steps

1. **Customize**: Update branding, colors, text
2. **Deploy**: Push to Vercel (see DEPLOYMENT.md)
3. **Integrate**: Add to your application (see `/api-docs`)
4. **Monitor**: Setup analytics and uptime monitoring

## Resources

- **Full Documentation**: See `README.md`
- **Deployment Guide**: See `DEPLOYMENT.md`
- **API Documentation**: Visit `/api-docs` page
- **Code Comments**: Review component files for inline documentation

## Getting Help

- **API Documentation**: http://localhost:3000/api-docs
- **Contact Form**: http://localhost:3000/contact
- **Privacy Policy**: http://localhost:3000/privacy
- **Code Repository**: Check source code comments

## What's Next?

After running locally:

1. **Test everything** - Upload files, record audio, test all pages
2. **Review the code** - Understand the structure
3. **Customize** - Change colors, text, branding
4. **Deploy** - Follow `DEPLOYMENT.md` for production setup
5. **Integrate** - Use API documentation to integrate with other apps

---

**Version**: 1.0.0  
**Status**: Ready to use  
**Time to first interaction**: < 5 minutes  

Enjoy using VoiceDetect!
