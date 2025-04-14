<a name="readme-top"></a>

# Sathwik Reddy's Portfolio with AI Chatbot

A modern space-themed portfolio website built with Next.js 14 and Three.js, featuring an AI-powered chatbot that answers questions based on the resume.

![Portfolio Preview](/.github/images/img_main.png)

## 🌟 Features

- **Modern UI/UX**: Space-themed design with smooth animations
- **3D Visualizations**: Interactive 3D models using Three.js
- **Responsive Design**: Works seamlessly on all devices
- **AI Chatbot**: Powered by Groq's Llama3 model
- **Skills Showcase**: Interactive skills section
- **Project Gallery**: Beautiful project showcase
- **Contact Integration**: Easy way to get in touch

## 🛠️ Tech Stack

### Frontend
- [Next.js 14](https://nextjs.org/)
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Three.js](https://threejs.org/)
- [Framer Motion](https://www.framer.com/motion/)

### Backend
- [Flask](https://flask.palletsprojects.com/)
- [LangChain](https://www.langchain.com/)
- [Groq API](https://groq.com/)
- [HuggingFace](https://huggingface.co/)

## 📁 Project Structure

```
space-portfolio/
├── app/                    # Next.js app directory
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/            # React components
│   ├── main/             # Main components
│   └── sub/              # Sub-components
├── public/               # Static files
│   ├── projects/
│   ├── skills/
│   └── videos/
├── assets/               # Backend assets
│   └── SathwikReddyChelemela.pdf
├── app.py               # Flask backend
└── requirements.txt     # Python dependencies
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- Python (v3.8 or higher)
- npm or yarn

### Frontend Setup

1. Install dependencies:
   ```bash
   npm install --legacy-peer-deps
   # or
   yarn install --legacy-peer-deps
   ```

2. Create `.env.local` file:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:5000
   ```

3. Run development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

### Backend Setup

1. Create Python virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Create `.env` file:
   ```
   GROQ_API_KEY=your_groq_api_key_here
   ```

4. Place your resume PDF in `assets/SathwikReddyChelemela.pdf`

5. Run Flask server:
   ```bash
   python app.py
   ```

## 🌐 Deployment

### Frontend (Vercel)
1. Push code to GitHub
2. Connect to Vercel
3. Add environment variables:
   - `NEXT_PUBLIC_API_URL`: Your backend URL

### Backend (Vercel)
1. Create new Vercel project
2. Add environment variables:
   - `GROQ_API_KEY`: Your Groq API key
3. Include PDF file in deployment

## 🔧 Environment Variables

### Frontend (.env.local)
- `NEXT_PUBLIC_API_URL`: Backend API URL

### Backend (.env)
- `GROQ_API_KEY`: Groq API key for LLM

## 📸 Screenshots

![Modern UI/UX](/.github/images/img1.png)
![Skills Showcase](/.github/images/img2.png)
![Projects Gallery](/.github/images/img4.png)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Sathwik Reddy Chelemela**
- GitHub: [@sathwik](https://github.com/sathwik)
- Portfolio: [sathwikreddy.com](https://sathwikreddy.com)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) team for the amazing framework
- [Three.js](https://threejs.org/) for 3D graphics
- [Groq](https://groq.com/) for the LLM API
- [LangChain](https://www.langchain.com/) for the AI framework

<p align="right">(<a href="#readme-top">back to top</a>)</p>
