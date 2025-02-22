# Task Management Application - Frontend

##  Description
This is the frontend for a Task Management Application built with React and Vite.js. Users can add, edit, delete, and reorder tasks using a drag-and-drop interface. Tasks are categorized into three sections: **To-Do**, **In Progress**, and **Done**. The app has a clean, minimalistic UI and is fully responsive for both desktop and mobile users. Firebase Authentication (Google Sign-In) is implemented for user login.

---

## Live Links
- **Live Site**: [https://to-do-app-f5d34.web.app/](https://to-do-app-f5d34.web.app/)
- **GitHub Repository**: [https://github.com/ashrafulhossain1/to-do-client](https://github.com/ashrafulhossain1/to-do-client)

---

## Dependencies
The following dependencies are used in this project:
- `@ant-design/icons`: ^5.6.1
- `@dnd-kit/core`: ^6.3.1
- `@dnd-kit/sortable`: ^10.0.0
- `@dnd-kit/utilities`: ^3.2.2
- `antd`: ^5.24.1
- `axios`: ^1.7.9
- `firebase`: ^11.3.1
- `framer-motion`: ^12.4.7
- `react`: ^18.2.0
- `react-dom`: ^18.2.0
- `react-icons`: ^5.5.0
- `react-router`: ^7.2.0
- `tailwindcss`: ^4.0.7
- `daisyui`: ^5.0.0-beta.8
- `eslint`: ^9.19.0
- `vite`: ^6.1.0

---

## Installation Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/ashrafulhossain1/to-do-client.git
   cd to-do-client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add the following Firebase environment variables:
   ```env
   # Firebase Configuration
   VITE_FIREBASE_API_KEY=your-api-key
   VITE_FIREBASE_AUTH_DOMAIN=your-auth-domain
   VITE_FIREBASE_PROJECT_ID=your-project-id
   VITE_FIREBASE_STORAGE_BUCKET=your-storage-bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
   VITE_FIREBASE_APP_ID=your-app-id
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. The app will run on `http://localhost:5173` (default Vite port).

---

## Technologies Used
- **React**: A JavaScript library for building user interfaces.
- **Vite.js**: A fast build tool and development server.
- **Tailwind CSS**: A utility-first CSS framework for styling.
- **DaisyUI**: A component library built on top of Tailwind CSS.
- **Firebase**: For authentication (Google Sign-In) and hosting.
- **Ant Design**: For additional UI components.
- **React Router**: For routing between pages.
- **@dnd-kit**: For drag-and-drop functionality.
- **Axios**: For making API requests to the backend.

---

## Firebase Setup
To integrate Firebase Authentication, ensure you have created a Firebase project and enabled Google Sign-In. Replace the placeholders in the `.env` file with your actual Firebase credentials.

---

## Screenshot
Here’s a preview of the application:

![Task Management System](https://i.ibb.co.com/jP3xXtTf/Fire-Shot-Capture-058-Task-Management-System-to-do-app-f5d34-web-app.png)

