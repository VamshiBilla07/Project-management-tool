# GitHub Push Script
# Replace YOUR_USERNAME with your actual GitHub username before running

# Navigate to project directory
Set-Location "c:\Users\vamsh\OneDrive\Desktop\Project management tool"

# Initialize git repository
Write-Host "Initializing Git repository..." -ForegroundColor Cyan
git init

# Add all files
Write-Host "Adding files to Git..." -ForegroundColor Cyan
git add .

# Create first commit
Write-Host "Creating initial commit..." -ForegroundColor Cyan
git commit -m "Initial commit: Full-stack project management tool with React, Node.js, and SQLite"

# Prompt for GitHub username
$username = Read-Host "Enter your GitHub username"

# Add remote repository
Write-Host "Adding remote repository..." -ForegroundColor Cyan
git remote add origin "https://github.com/$username/project-management-tool.git"

# Rename branch to main
Write-Host "Setting branch to main..." -ForegroundColor Cyan
git branch -M main

# Push to GitHub
Write-Host "Pushing to GitHub..." -ForegroundColor Cyan
Write-Host "Note: You may be prompted for your GitHub credentials" -ForegroundColor Yellow
git push -u origin main

Write-Host "`nSuccess! Your repository is now on GitHub!" -ForegroundColor Green
Write-Host "Visit: https://github.com/$username/project-management-tool" -ForegroundColor Green
