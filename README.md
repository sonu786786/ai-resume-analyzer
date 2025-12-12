<div align="center">
  <br/>
  <img src="public/readme/hero.webp" alt="Project Banner">

  <h1><b>AI Resume Analyzer</b></h1>

  <div>
    <img src="https://img.shields.io/badge/React-4c84f3?style=for-the-badge&logo=react&logoColor=white"/>
    <img src="https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white"/>
    <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white"/>
    <img src="https://img.shields.io/badge/Puter.js-181758?style=for-the-badge&logoColor=white"/>
  </div>

  <p align="center">
    A smart, client-side resume analyzer powered by AI — offering ATS scoring, job-aligned evaluation, and personalized improvement feedback.
  </p>
</div>

---

## 📋 Table of Contents

1. [Overview](#overview)  
2. [Features](#features)  
3. [Tech Stack](#tech-stack)  
4. [Project Structure](#project-structure)  
5. [Getting Started](#getting-started)  
6. [Environment Notes](#environment-notes)  
7. [Screenshots](#screenshots)  
8. [Future Improvements](#future-improvements)

---

## ✨ Overview

**AI Resume Analyzer** is a modern web application that analyzes resumes using AI — directly in the browser, without any backend.

It allows users to:

- Upload and store resumes  
- Convert PDF → image on the client  
- Extract intelligent, role-specific feedback  
- Measure ATS compatibility  
- Receive strengths, weaknesses, and actionable suggestions  

Built with **React**, **React Router v7**, **Tailwind CSS**, **TypeScript**, and **Puter.js**, the app emphasizes clean architecture, reusable UI components, and a fast, serverless experience.

---

## 🔋 Features

- 🔐 **Browser-based authentication** with Puter.js  
- 📁 **Resume storage** using Puter FileSystem  
- 🧠 **AI-powered analysis** (ATS score + detailed breakdown)  
- 📊 **Job-specific evaluation** based on role & description  
- 🧾 **PDF → PNG conversion** (client-side using pdfjs-dist)  
- 🎨 **Modern UI**, reusable components, mobile-friendly  
- ⚡ **Fast Vite dev server** with instant HMR  
- 📌 **Zero backend needed** — everything runs client-side  

---

## ⚙️ Tech Stack

**Frontend**
- React 19  
- React Router v7  
- TypeScript  
- Zustand  
- Tailwind CSS  

**Client-Side Services**
- Puter.js (Auth, KV store, FS, AI)  
- pdfjs-dist (PDF rendering and conversion)

**Tooling**
- Vite  
- React Router build tools  

---

## 📁 Project Structure

```

ai-resume-analyzer/
│
├── app/
│   ├── components/         # Modular UI components (Summary, ATS, Details…)
│   ├── lib/                # Utilities (pdf2img, puter store, helpers)
│   ├── routes/             # App pages (upload, resume view)
│   ├── styles/             # Global styles
│   └── types/              # TypeScript definitions
│
├── public/                 # Static assets & readme images
├── package.json
└── vite.config.ts

````

---

## 🚀 Getting Started

### **1. Clone the repository**
```bash
git clone https://github.com/YOUR-USERNAME/ai-resume-analyzer.git
cd ai-resume-analyzer
````

### **2. Install dependencies**

```bash
npm install
```

### **3. Run the development server**

```bash
npm run dev
```

Open the app at:

```
http://localhost:5173
```

---

## 🧩 Environment Notes

* This project uses **Puter.js** for:

  * Auth
  * File storage
  * KV storage
  * AI (GPT/Claude)
* No `.env` file or backend server required.
* Make sure PDF worker is correctly configured:

  ```ts
  import("pdfjs-dist/build/pdf.worker.min.mjs?url")
  ```

---

## 🖼 Screenshots

> Add screenshots here once your final UI is ready.

```
public/readme/demo1.webp
public/readme/demo2.webp
public/readme/demo3.webp
```

---

## 🚧 Future Improvements

* Support multiple resume pages
* Downloadable PDF of generated feedback
* Resume rewrite suggestions using AI
* Keyword optimization for ATS
* User dashboard for managing multiple resumes

---

<div align="center">
  <br/>
  ⭐ <b>If this project helped or inspired you, consider starring the repo!</b> ⭐
  <br/><br/>
</div>
```