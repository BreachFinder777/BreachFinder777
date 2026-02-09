# How to Deploy to GitHub Pages

This project is built with React, Vite, and Tailwind CSS. Here is how you can deploy it to GitHub Pages.

## Prerequisites

- A GitHub account
- Git installed on your computer
- Node.js and npm installed

## Step 1: Create a GitHub Repository

1. Go to [GitHub.com](https://github.com) and create a new repository.
2. Name it something like `soham-portfolio`.
3. Do not initialize it with a README, .gitignore, or License (since you already have code).

## Step 2: Configure Vite (Important)

If you are deploying to a User Page (e.g., `username.github.io`), you can skip this step.

If you are deploying to a Project Page (e.g., `username.github.io/repo-name`), you must open `vite.config.ts` and add the `base` property:

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/your-repo-name/', // <--- Add this line (replace with your repo name)
})
```

## Step 3: Initialize Git and Push

Open your terminal in the project folder and run:

```bash
# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit"

# Link to your GitHub repo (replace URL with your actual repo URL)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Push to main
git push -u origin main
```

## Step 4: Deploy

There are two common ways to deploy: using GitHub Actions (Recommended) or the `gh-pages` package.

### Option A: GitHub Actions (Recommended)

1. Go to your repository on GitHub.
2. Click on **Settings** > **Pages** (sidebar).
3. Under **Build and deployment**, select **GitHub Actions**.
4. GitHub usually suggests a "Static HTML" or "Vite" workflow. If not, create a file in your project at `.github/workflows/deploy.yml` with the following content:

```yaml
# Simple workflow for deploying static content to GitHub Pages
name: Deploy static content to Pages

on:
  push:
    branches: ["main"]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Set up Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'
      - name: Install dependencies
        run: npm ci
      - name: Build
        run: npm run build
      - name: Setup Pages
        uses: actions/configure-pages@v5
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'
      - name: Deploy to GitHub Pages
        uses: actions/deploy-pages@v4
```

5. Commit and push this new file. The action will run automatically and deploy your site.

### Option B: Using gh-pages package

1. Install the package:
   ```bash
   npm install gh-pages --save-dev
   ```

2. Add these scripts to your `package.json`:
   ```json
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist",
     ...
   }
   ```

3. Run the deploy command:
   ```bash
   npm run deploy
   ```

## Final Step

Once deployed, your site will be available at:
`https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`
