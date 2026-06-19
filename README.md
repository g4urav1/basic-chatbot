# Basic Chatbot

This is a simple ChatGPT-style chatbot frontend built with React and Vite.

The project focuses on the user interface. It has a sidebar, navigation bar, login/sign up modal, and a message input box. Right now, it does not connect to a real AI model. When a message is sent, it is handled on the frontend only.

## Features

- ChatGPT-style layout
- Sidebar for desktop and mobile screens
- Login and sign up modal UI
- Message input box
- Different UI for logged-in and logged-out views
- Responsive design
- Icons used from Lucide React

## Tech Stack

- React
- Vite
- JavaScript
- Tailwind CSS
- React Router DOM
- Lucide React

## Project Status

This project is still in progress.

The frontend UI is created, but real chatbot replies, backend connection, and proper authentication are not fully added yet.

## Folder Structure

```text
basic-chatbot/
├── src/
│   ├── assets/
│   ├── components/
│   ├── context/
│   ├── Pages/
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── tailwind.config.js
├── eslint.config.js
└── README.md

## Installation

Clone the repository:

```bash
git clone https://github.com/g4urav1/basic-chatbot.git
```

Go to the project folder:

```bash
cd basic-chatbot
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

## Available Scripts

Run the development server:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

Run ESLint:

```bash
npm run lint
```

## Folder Structure

```txt
basic-chatbot/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── context/
│   ├── Pages/
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── tailwind.config.js
├── eslint.config.js
└── README.md
```

## Future Improvements

* Add backend API integration
* Connect chatbot responses with an AI model
* Add proper authentication
* Store chat history
* Improve error handling
* Add loading states for responses
* Add dark/light theme support
* Improve accessibility

## Author

Made by Gaurav.
