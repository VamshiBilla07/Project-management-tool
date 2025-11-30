# 🚀 GitHub Repository Setup Guide

This guide will help you create a GitHub repository and push your project to it.

## Step 1: Create a GitHub Repository

1. Go to [GitHub](https://github.com) and sign in
2. Click the **"+"** icon in the top right corner
3. Select **"New repository"**
4. Fill in the repository details:
   - **Repository name**: `project-management-tool`
   - **Description**: "Full-stack project management tool built with React, Node.js, Express, and SQLite"
   - **Visibility**: Choose Public or Private
   - **DO NOT** initialize with README, .gitignore, or license (we already have these)
5. Click **"Create repository"**

## Step 2: Initialize Git and Push to GitHub

Open PowerShell in the project directory and run these commands:

### Initialize Git Repository

```powershell
# Navigate to project directory
cd "c:\Users\vamsh\OneDrive\Desktop\Project management tool"

# Initialize git repository
git init

# Add all files to git
git add .

# Create first commit
git commit -m "Initial commit: Full-stack project management tool"
```

### Connect to GitHub and Push

Replace `YOUR_USERNAME` with your actual GitHub username:

```powershell
# Add remote repository (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/project-management-tool.git

# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

## Step 3: Verify Upload

1. Go to your GitHub repository URL: `https://github.com/YOUR_USERNAME/project-management-tool`
2. You should see all your files uploaded
3. The README.md will be displayed on the repository homepage

## Alternative: Using GitHub CLI

If you have GitHub CLI installed:

```powershell
# Navigate to project directory
cd "c:\Users\vamsh\OneDrive\Desktop\Project management tool"

# Initialize git
git init
git add .
git commit -m "Initial commit: Full-stack project management tool"

# Create GitHub repository and push (will prompt for login)
gh repo create project-management-tool --public --source=. --push
```

## Troubleshooting

### Authentication Issues

If you get authentication errors:

1. **Use Personal Access Token:**
   - Go to GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
   - Generate new token with `repo` scope
   - Use token as password when pushing

2. **Or use SSH:**
   ```powershell
   # Generate SSH key
   ssh-keygen -t ed25519 -C "your_email@example.com"
   
   # Add SSH key to GitHub
   # Copy the public key: cat ~/.ssh/id_ed25519.pub
   # Add it to GitHub Settings → SSH and GPG keys
   
   # Use SSH URL instead
   git remote set-url origin git@github.com:YOUR_USERNAME/project-management-tool.git
   ```

### Large Files Warning

If you see warnings about large files:

```powershell
# Add node_modules to .gitignore (should already be there)
echo "node_modules" >> .gitignore
echo "dist" >> .gitignore

# Remove cached node_modules if accidentally added
git rm -r --cached node_modules
git commit -m "Remove node_modules from tracking"
```

## Next Steps After Pushing

### 1. Add Repository Description

On GitHub, edit your repository to add:
- Description
- Topics/Tags: `react`, `nodejs`, `express`, `prisma`, `sqlite`, `project-management`
- Website (if deployed)

### 2. Enable GitHub Pages (Optional)

If you want to deploy the frontend:
1. Go to repository Settings → Pages
2. Select source branch and folder
3. Click Save

### 3. Add Badges to README (Optional)

Your README already has some badges. You can add more from [shields.io](https://shields.io)

### 4. Invite Collaborators (Optional)

Settings → Collaborators → Add people

## Keeping Repository Updated

After making changes:

```powershell
# Check status
git status

# Add changed files
git add .

# Commit with message
git commit -m "Description of changes"

# Push to GitHub
git push
```

## Success! 🎉

Your project is now on GitHub! Share the repository URL:
`https://github.com/YOUR_USERNAME/project-management-tool`

Anyone can now:
- Clone your repository
- Install dependencies
- Run the project following the README instructions
