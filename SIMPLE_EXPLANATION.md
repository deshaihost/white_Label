# White Label Login - Simple Explanation

## Current Flow (Normal Login)
1. User visits: `hostbuddy.ai/login`
2. User sees login form
3. User enters email/password
4. Clicks submit → goes to dashboard

## New Flow (White Label Login)
1. User visits: `c.acental.com/login`
2. DNS points to: `hostbuddy.ai/white-label-login`
3. No form shown - credentials sent automatically via URL or API
4. User gets logged in → goes to dashboard

## Three Ways to Send Credentials:

### Method 1: URL Parameters (Simplest)
```
https://hostbuddy.ai/white-label-login?email=john@example.com&password=mypassword
```
- When user visits this URL, they get automatically logged in
- No form needed

### Method 2: POST API (Most Secure)
```javascript
// This code runs on c.acental.com
fetch('https://hostbuddy.ai/api/login', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
        email: 'john@example.com',
        password: 'mypassword'
        // Domain is automatically detected from the request origin
    })
})
```

### Method 3: iframe (Hidden Integration)
```html
<!-- This goes on c.acental.com -->
<iframe src="https://hostbuddy.ai/white-label-login" style="display:none"></iframe>
<script>
// Send credentials to iframe
iframe.contentWindow.postMessage({
    type: 'WHITE_LABEL_LOGIN',
    credentials: {email: 'john@example.com', password: 'mypassword'}
}, '*');
</script>
```

## What I Built for You:

1. **`WhiteLabelLogin.jsx`** - New page that handles automatic login
2. **Updated Routes** - Added `/white-label-login` route
3. **Detection Logic** - Automatically detects if request comes from white-label domain

## How to Test:

1. Visit: `http://localhost:3000/white-label-login?email=deshai@hostbuddy.ai&password=Ridhi@120$`
2. Should automatically try to log you in
3. If credentials are valid → goes to dashboard
4. If invalid → shows error
5. Domain is automatically detected from the URL (localhost in this case)

## For Real White-Label Testing:
If you want to simulate c.acental.com, you can:
1. Add `127.0.0.1 c.acental.com` to your hosts file
2. Visit: `http://c.acental.com:3000/white-label-login?email=deshai@hostbuddy.ai&password=Ridhi@120$`
3. Dashboard will show "Acental" branding automatically

## For c.acental.com Integration:

The client at c.acental.com needs to:
1. Set up DNS: `c.acental.com/login` → `hostbuddy.ai/white-label-login`
2. Send user credentials in one of the 3 ways above

That's it! No complex forms needed.