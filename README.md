# **Building Planner Web Application**

This project is a web application for drawing and annotating building plans. It allows users to select, draw, resize, and annotate shapes such as rectangles and circles. The application is built with **React** using **Vite** for faster development, and it interacts with a Django backend for saving and loading drawings.

## **Features**
- Draw shapes like rectangles and circles.
- Resize and move shapes using the selection tool.
- Annotate shapes with dimensions.
- Show or hide annotations.
- Save and load drawings to and from a Django API.

## **Tech Stack**
- **Frontend**: React.js, Konva.js, Axios
- **Backend**: Django (with Django Rest Framework)
- **Build Tool**: Vite
- **Environment Variables**: Managed using `.env` files

## **Getting Started**

### **1. Prerequisites**
Make sure you have the following installed on your machine:
- [Node.js](https://nodejs.org/) (v14 or higher)
- [Python](https://www.python.org/) (for Django backend)
- [Vite](https://vitejs.dev/)

### **2. Installation**

1. Clone the repository:

   ```bash
   git clone https://github.com/arristigit/building-planner-fe
   ```
2. Navigate into the project directory:
   ```bash
   cd building-planner-fe
   ```
3. Install frontend dependencies:
   ```bash
   npm install
   ```
4. Create a .env file in the root directory:
   ```bash
   touch .env
   ```
   Add the following content to the .env file:
   ```bash
   VITE_BASE_URL=http://localhost:8000  # your Django backend URL
   ```

### **3. Running the Development Server**
To start the Vite development server, run the following command:

```bash
npm run dev
```
This will start the development server at http://localhost:3000.

### **5. Django API Integration**
The application interacts with a Django backend for saving and loading drawings. Make sure the Django server is running and accessible at the VITE_BASE_URL specified in your .env file.

**Basic API Endpoints:**

 - `POST trackdraw/api/drawings/` — Save a new drawing.
 - `GET trackdraw/api/drawings/` — Fetch all saved drawings.
 - `GET trackdraw/api/drawings/<id>`/ — Fetch a single drawing by ID.
