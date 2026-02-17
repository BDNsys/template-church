# Church Management System ⛪🚀

A comprehensive, production-ready management system for churches, featuring a robust Django backend and a modern React frontend. This system facilitates managing members, groups, finances, media content, and community interactions.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Python](https://img.shields.io/badge/python-3.12+-blue.svg)
![Django](https://img.shields.io/badge/django-4.2+-green.svg)
![React](https://img.shields.io/badge/react-19+-blue.svg)
![TypeScript](https://img.shields.io/badge/typescript-5.0+-blue.svg)

---

## ✨ Core Features

### 📋 Member & Group Management
- **Membership Tracking**: Manage member profiles, contact info, and status.
- **Church Groups**: Organize and manage cell groups, ministries, and departments.
- **Leadership Roles**: Assign and track leadership positions within groups.

### 💰 Finance & Giving
- **Income Tracking**: Record tithes, offerings, and donations.
- **Expense Management**: Track church expenditures.
- **Dashboard**: Visual summaries of financial health.

### 📝 Content & Media
- **Blogs & News**: Share articles, announcements, and devotionals.
- **Gallery**: Manage and display church event photos.
- **Videos**: Host and organize service recordings or educational content.

### 🔐 Security & Auth
- **JWT Authentication**: Secure token-based access with automatic refresh.
- **Google OAuth**: Integrated social login with PKCE flow.
- **Protected Routes**: Granular access control for dashboard and management tools.

---

## 🛠️ Tech Stack

### Backend
- **Django**: Core framework.
- **Django REST Framework**: API development.
- **Simple JWT**: Authentication tokens.
- **Django Allauth**: Social authentication and account management.
- **DRF Spectacular**: OpenAPI/Swagger documentation.
- **Python-dotenv**: Environment variable management.

### Frontend
- **React (Vite)**: UI development.
- **TanStack Query (React Query)**: State management and data fetching.
- **React Router**: Client-side routing (BrowserRouter).
- **Tailwind CSS / Vanilla CSS**: Modern, responsive styling.
- **Lucide React**: Iconography.

---

## 📁 Project Structure

This project uses a specialized structure where the frontend build is integrated into the root `public_html` directory for easy deployment.

```text
.
├── backend/                # Django project files
├── frontend/               # React application source
├── public_html/            # FINAL BUILD OUTPUT (Static, Media, Frontend Build)
│   ├── .htaccess           # Routing rules for SPA
│   ├── assets/             # Built JS/CSS assets
│   ├── static/             # Backend collected static files
│   ├── media/              # User-uploaded media files
│   └── index.html          # Main entry point for the app
├── .venv/                  # Python virtual environment (root)
├── pyproject.toml / uv.lock # Dependency management
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- **Python 3.12+**
- **Node.js 18+**
- **npm**

### 1. Initial Setup

```bash
git clone <repository-url>
cd template-church
```

### 2. Backend Setup

```bash
# It is recommended to use the root virtual environment
# If not created: python -m venv .venv
source .venv/bin/activate

# Install dependencies
pip install -r requierments.txt

# Configure environment
# Create a .env file in the backend/ directory (see Environment Variables section)

# Run migrations
cd backend
python manage.py migrate

# Create a superuser for admin access
python manage.py createsuperuser

# Start the backend server
python manage.py runserver
```

### 3. Frontend Setup

```bash
cd frontend
npm install

# Start development server
npm run dev
```
The application will be available at `http://localhost:5173`.

---

## 🚢 Production & Deployment

### Building for Production

When preparing for production, the frontend must be built and static files collected:

```bash
# 1. Build Frontend
cd frontend
npm run build # This outputs directly to ../public_html

# 2. Collect Static Files
cd ../backend
python manage.py collectstatic --noinput # Copies Django static to ../public_html/static
```

### Routing & .htaccess

The project uses `BrowserRouter` for clean URLs. To support this on Apache-style servers, a `.htaccess` file is provided in `public_html`:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteCond %{REQUEST_FILENAME} !-l
  RewriteRule . /index.html [L]
</IfModule>
```
This ensures that all application routes are handled by the React entry point.

---

## 📚 API Documentation

The API is fully documented using Swagger. Once the backend is running, visit:
- **Swagger UI**: `http://localhost:8000/api/schema/swagger-ui/`
- **Redoc**: `http://localhost:8000/api/schema/redoc/`

---

## 🔐 Environment Variables

Create a `.env` file in the `backend/` directory:

```env
# Django
SECRET_KEY=your_secret_key
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1

# Auth
SOCIAL_AUTH_GOOGLE_CLIENT_ID=your_id.apps.googleusercontent.com
SOCIAL_AUTH_GOOGLE_CLIENT_SECRET=your_secret
FRONTEND_BASE_URL=http://localhost:5173

# App Config
APP_NAME="Church Management"
```

---

## 📄 License & Contributing

This template is licensed under the MIT License. Contributions are welcome—please submit a PR if you have improvements!

**Happy Coding!** ⛪✨
