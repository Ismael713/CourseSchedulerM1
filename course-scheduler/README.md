# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

First, an .env file must be added in the course-scheduler folder. Enter in the file:
    VITE_API_BASE_URL=http://localhost:3333

Direct yourself in terminal and install required packages by typing:
    cd course-scheduler
    npm install
    npm run dev

Start a second terminal and enter:
    npm run api

# Course Scheduler - M2

This project upgrades the Course Scheduler application
from M1 by replacing JSON Server with an Express API
and a MySQL database.

The application uses React and Vite for the front end,
Node.js and Express for the back end, and MySQL to
store course information and completed courses.

## Setup

Create an .env file in the course-scheduler folder:

VITE_API_BASE_URL=http://localhost:3000

## Running the Application

Install dependencies:

npm install

Start the React development server:

npm run dev

In a second terminal, navigate to the server folder:

cd server
npm install
npm start

## Features

- View and filter courses.
- View course prerequisites.
- Track completed courses.
- Save completed courses to MySQL.
- Display academic progress.

## Version

2.0.0 - M2 Express API and MySQL Integration