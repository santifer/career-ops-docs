# TODO

## PostHog Integration — Track AI chat queries to improve docs

**Goal:** Log every question users ask the AI so we can identify documentation gaps.

### Steps

1. **Create a free PostHog account**
   - Go to https://posthog.com → Get started → sign up
   - Free tier: 1M events/month
   - After signup, grab your **Project API Key** (`phc_xxxx`) from Project Settings

2. **Install the Node SDK**
   ```bash
   npm install posthog-node
   ```

3. **Add your key to Vercel env vars**
   ```bash
   vercel env add POSTHOG_KEY
   ```
   Paste your `phc_xxxx` key when prompted.

4. **Wire up logging in the API route**
   - File: `src/app/api/chat/route.ts`
   - Create a singleton `posthog-node` client
   - Capture an event (e.g. `ai_query`) with the user's message text and `location.href` (already sent as client context)
   - ~10 lines of code — ask Claude to implement this

5. **View queries in PostHog dashboard**
   - Go to **Activity → Events**, filter by `ai_query`
   - See every question + which doc page triggered it
   - Use this to prioritize docs improvements
