# React + Firebase
For mor info about Firebase action check the [link](https://github.com/marketplace/actions/github-action-for-firebase)

```yaml
name: Build and Deploy

on:
  push:
    branches:
      - master

jobs:
  build:
    name: Build
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Repo
        uses: actions/checkout@master
      - name: Create .env file
        uses: ozaytsev86/create-env-file@v1
        with:
          REACT_APP_API_KEY: ${{ secrets.APP_API_KEY }}
          REACT_APP_AUTH_DOMAIN: ${{ secrets.APP_AUTH_DOMAIN }}
          REACT_APP_DATABASE_URL: ${{ secrets.APP_DATABASE_URL }}
          REACT_APP_PROJECT_ID: ${{ secrets.APP_PROJECT_ID }}
          REACT_APP_STORAGE_BUCKET: ${{ secrets.APP_STORAGE_BUCKET }}
          REACT_APP_MESSAGING_SENDER_ID: ${{ secrets.APP_MESSAGING_SENDER_ID }}
          REACT_APP_APP_ID: ${{ secrets.APP_APP_ID }}
      - name: Install Dependencies
        run: npm install
      - name: Build
        run: npm run build
      - name: Archive Production Artifact
        uses: actions/upload-artifact@master
        with:
          name: build
          path: build
  deploy:
    name: Deploy
    needs: build
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Repo
        uses: actions/checkout@master
      - name: Download Artifact
        uses: actions/download-artifact@v2
        with:
          name: build
          path: build
      - name: Deploy to Firebase
        uses: w9jds/firebase-action@master
        with:
          args: deploy
        env:
          FIREBASE_TOKEN: ${{ secrets.FIREBASE_TOKEN }}
```