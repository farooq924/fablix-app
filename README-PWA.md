# Fablix ERP — Installable App (PWA wrapper)

Ye ek chhoti PWA wrapper hai jo aapke **Apps Script Web App** ko ek **install-hone-wali app** bana deti hai (icon + full-screen / standalone). Andar aapka asli ERP chalta hai.

> **Sach saaf-saaf:** Ye wrapper **install** hoti hai aur standalone khulti hai, lekin **offline data nahi chalta** — kyunke ERP ka data Google Sheets par hai jo internet maangta hai. Offline pe sirf ek "No Internet" screen aati hai. (Pure Apps Script pe full-offline mumkin nahi — service worker uske sandboxed iframe me register nahi hota.)

---

## Files
```
index.html            ← wrapper (yahan apna exec URL paste karna hai)
manifest.webmanifest  ← app name, icon, standalone
sw.js                 ← service worker (shell cache + offline page)
offline.html          ← No-internet screen
icon-192.png          ← app icon
icon-512.png          ← app icon
```

## Step 1 — Apna Web App URL daalein
1. Apna Apps Script **/exec** URL copy karein (Deploy → Manage deployments → Web app URL).
2. `index.html` kholein, ye line dhoondein:
   ```js
   var APP_URL = "PASTE_YOUR_APPS_SCRIPT_EXEC_URL_HERE";
   ```
   Aur us jagah apna URL paste karein, e.g.:
   ```js
   var APP_URL = "https://script.google.com/macros/s/AKfycb.../exec";
   ```

## Step 2 — Free hosting (HTTPS zaroori hai)
PWA sirf **HTTPS** par install hoti hai. Sabse aasan free option: **GitHub Pages**.

### GitHub Pages (free)
1. GitHub par ek naya repo banayein (public), e.g. `fablix-app`.
2. Is `pwa` folder ke **saare files** upload karein (Add file → Upload files → drag saari files → Commit).
3. Repo → **Settings → Pages** → Source: `main` branch, folder `/root` → **Save**.
4. Thodi der baad URL milega: `https://<username>.github.io/fablix-app/`
5. Wahi URL mobile Chrome me kholein.

> Netlify / Firebase Hosting / Cloudflare Pages bhi chalega — bas in files ko HTTPS par host karna hai.

## Step 3 — Install karein
- **Android (Chrome):** URL kholein → menu (⋮) → **Install app / Add to Home screen**.
- **iPhone (Safari):** URL kholein → Share → **Add to Home Screen**.
- App icon home screen par aa jayega; tap karne se **full-screen** khulega, splash ke baad aapka ERP.

## Update
- ERP me koi bhi change → aap Apps Script me hamesha ki tarah redeploy karein (wrapper ko haath lagane ki zaroorat nahi).
- Sirf wrapper ke design/icon change par: files dobara upload karein, aur `sw.js` me `CACHE = 'fablix-shell-v1'` ko `-v2` kar dein (purana cache clear ho jayega).

---

## Bina hosting ke — sabse aasan (no offline, no custom icon)
Agar aap hosting nahi karna chahte, to seedha apna `/exec` URL mobile me kholein:
- **Android Chrome:** menu → **Add to Home screen** — icon ban jayega jo ERP kholega.
- **iPhone Safari:** Share → **Add to Home Screen**.
Ye zero-setup hai, lekin custom naam/icon aur standalone splash nahi milega, aur offline screen bhi nahi.
