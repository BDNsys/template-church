# Django + React JWT Auth Template 🚀

A modern, production-ready full-stack authentication template combining Django's powerful backend with React's dynamic frontend. Features JWT authentication, TanStack Query for data fetching, beautiful UI with glassmorphism effects, and a scalable architecture.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Python](https://img.shields.io/badge/python-3.12+-blue.svg)
![Django](https://img.shields.io/badge/django-6.0-green.svg)
![React](https://img.shields.io/badge/react-19.2-blue.svg)
![TypeScript](https://img.shields.io/badge/typescript-5.9-blue.svg)

## ✨ Features

### Backend
- 🔐 **JWT Authentication** - Secure token-based authentication with refresh tokens
- 🔄 **Auto Token Refresh** - Automatic token refresh on expiry
- 👤 **Custom Token Claims** - Username, email, and role included in tokens
- 🛡️ **Django REST Framework** - Robust API development
- 📊 **SQLite/PostgreSQL** - Flexible database options

### Frontend
- 🎨 **Beautiful UI** - Glassmorphism, gradients, and smooth animations
- ⚡ **TanStack Query** - Powerful data fetching and caching
- 🔄 **Automatic Token Management** - Seamless token refresh in background
- 📱 **Fully Responsive** - Mobile-first design
- 🎯 **Type-Safe** - Full TypeScript coverage
- 🧩 **Reusable Components** - Scalable component library
- 🎭 **Toast Notifications** - Beautiful feedback system
- 🔍 **Form Validation** - Real-time validation with password strength indicator
- 🎪 **React Query DevTools** - Debug queries in development

### Google Authentication
- 🔐 **Seamless OAuth2 Integration** - Login with Google using `django-allauth`
- 🎨 **Custom UI** - Beautiful glassmorphism Google login button
- 🔄 **Auto Account Selection** - Forces account chooser for better UX
- 🛡️ **Secure Callback Handling** - Validates state and tokens securely

## 🛠️ Tech Stack

### Backend
- **Django 6.0** - Web framework
- **Django REST Framework** - API development
- **djangorestframework-simplejwt** - JWT authentication
- **django-allauth** - Social authentication
- **django-cors-headers** - CORS support
- **Python 3.12+**

### Frontend
- **React 19** - UI library
- **TypeScript 5.9** - Type safety
- **TanStack Query v5** - Data fetching and state management
- **Vite 7** - Build tool and dev server
- **React Router v7** - Client-side routing
- **Axios** - HTTP client
- **jwt-decode** - JWT token decoding
- **Vanilla CSS** - Custom styling with design tokens

## 🚀 Quick Start

### Prerequisites

- Python 3.12 or higher
- Node.js 18 or higher
- npm or yarn

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/django-react-jwt-authtemplate.git
cd django-react-jwt-authtemplate
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On macOS/Linux:
source venv/bin/activate
# On Windows:
venv\Scripts\activate

# Install dependencies
pip install django djangorestframework djangorestframework-simplejwt django-cors-headers django-allauth python-dotenv

# Run migrations
python manage.py migrate

# Create superuser (optional)
python manage.py createsuperuser

# Start Django development server
python manage.py runserver
```

The backend will be available at `http://localhost:8000`

### 3. Frontend Setup

Open a new terminal window:

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend dev server will be available at `http://localhost:5173`

## 📁 Project Structure

```
django-react-jwt-authtemplate/
├── backend/                      # Django backend
│   ├── api/                      # API app
│   ├── users/                    # Users app with JWT auth
│   │   ├── serializers.py        # Custom token serializer
│   │   ├── views.py              # Auth views
│   │   └── urls.py               # Auth endpoints
│   ├── backend/                  # Project settings
│   │   ├── settings.py           # Django configuration
│   │   └── urls.py               # Main URL configuration
│   ├── manage.py
│   └── db.sqlite3
│
├── frontend/                     # React frontend
│   ├── src/
│   │   ├── components/           # Reusable components
│   │   │   ├── ui/               # UI components
│   │   │   │   ├── Button.tsx    # Button with variants
│   │   │   │   ├── Input.tsx     # Input with floating labels
│   │   │   │   ├── Card.tsx      # Card with glassmorphism
│   │   │   │   ├── Toast.tsx     # Toast notifications
│   │   │   │   ├── Spinner.tsx   # Loading spinner
│   │   │   │   └── GoogleLoginButton.tsx # Google Login Button
│   │   │   ├── layout/           # Layout components
│   │   │   │   ├── AuthLayout.tsx      # Auth pages layout
│   │   │   │   └── DashboardLayout.tsx # Dashboard layout
│   │   │   └── ProtectedRoute.tsx      # Route protection
│   │   │
│   │   ├── pages/                # Page components
│   │   │   ├── Login.tsx         # Login page
│   │   │   ├── Register.tsx      # Registration page
│   │   │   ├── Home.tsx          # Dashboard/home page
│   │   │   └── GoogleCallback.tsx # OAuth callback handler
│   │   │
│   │   ├── hooks/                # Custom React hooks
│   │   │   ├── useAuth.ts        # Auth mutations (login/register)
│   │   │   ├── useUser.ts        # User data query
│   │   │   └── useLogout.ts      # Logout mutation
│   │   │
│   │   ├── services/             # API service layer
│   │   │   ├── api.ts            # Axios instance with interceptors
│   │   │   └── auth.ts           # Auth API functions
│   │   │
│   │   ├── contexts/             # React contexts
│   │   │   └── ToastContext.tsx  # Toast notification context
│   │   │
│   │   ├── utils/                # Utility functions
│   │   │   ├── token.ts          # Token management utilities
│   │   │   └── validation.ts     # Form validation helpers
│   │   │
│   │   ├── types/                # TypeScript type definitions
│   │   │   └── index.ts          # Shared types
│   │   │
│   │   ├── config/               # Configuration files
│   │   │   └── queryClient.ts    # TanStack Query config
│   │   │
│   │   ├── App.tsx               # Main app component
│   │   ├── main.tsx              # Entry point
│   │   ├── index.css             # Global styles
│   │   └── constants.ts          # App constants
│   │
│   ├── build/                    # Production build output
│   ├── package.json
│   ├── vite.config.ts
│   └── tsconfig.json
│
└── README.md
```

## 📂 Frontend Structure Guide

### Where to Put What

#### `/components/ui/` - Reusable UI Components
Put **presentational components** that are used across multiple pages:
- Buttons, inputs, cards, modals, dropdowns
- Loading spinners, skeletons
- Toast notifications, alerts
- **Example**: `Button.tsx`, `Input.tsx`, `Card.tsx`

#### `/components/layout/` - Layout Components
Put **layout wrappers** that define page structure:
- Page layouts (auth layout, dashboard layout)
- Headers, footers, sidebars
- Navigation components
- **Example**: `AuthLayout.tsx`, `DashboardLayout.tsx`

#### `/components/` (root) - Feature Components
Put **feature-specific components** that don't fit in ui/ or layout/:
- Route protection (`ProtectedRoute.tsx`)
- Complex feature components
- **Example**: `ProtectedRoute.tsx`

#### `/pages/` - Page Components
Put **top-level page components** that represent routes:
- Each file = one route
- Compose using components from `/components/`
- **Example**: `Login.tsx`, `Register.tsx`, `Home.tsx`

#### `/hooks/` - Custom React Hooks
Put **reusable logic** as custom hooks:
- Data fetching hooks (using TanStack Query)
- Form handling hooks
- Authentication hooks
- **Example**: `useAuth.ts`, `useUser.ts`, `useLogout.ts`

#### `/services/` - API Service Layer
Put **API communication logic**:
- Axios instance configuration
- API endpoint functions
- Request/response transformations
- **Example**: `api.ts`, `auth.ts`

#### `/contexts/` - React Contexts
Put **global state management** using Context API:
- Theme context
- Auth context
- Notification context
- **Example**: `ToastContext.tsx`

#### `/utils/` - Utility Functions
Put **pure helper functions**:
- Validation functions
- Formatting functions
- Token management
- **Example**: `validation.ts`, `token.ts`

#### `/types/` - TypeScript Types
Put **shared TypeScript interfaces and types**:
- API response types
- Component prop types
- Domain models
- **Example**: `index.ts`

#### `/config/` - Configuration Files
Put **app configuration**:
- TanStack Query configuration
- Third-party library configs
- **Example**: `queryClient.ts`

## 🔧 Development Workflow

### Development Mode

Run both servers simultaneously:

**Terminal 1 - Backend:**
```bash
cd backend
source venv/bin/activate  # or venv\Scripts\activate on Windows
python manage.py runserver
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

- Frontend: `http://localhost:5173` (with hot reload)
- Backend API: `http://localhost:8000/api/`
- Django Admin: `http://localhost:8000/admin/`
- React Query DevTools: Available in browser (bottom-left corner)

### Production Build

```bash
# Build frontend
cd frontend
npm run build

# Collect static files
cd ../backend
python manage.py collectstatic --noinput

# Run Django (serves the built React app)
python manage.py runserver
```

Visit `http://localhost:8000` to see the production build.

## 🎨 UI Components

### Button Component

```tsx
import Button from './components/ui/Button';

// Variants: primary, secondary, outline, ghost
<Button variant="primary" size="lg" fullWidth>
  Click Me
</Button>

// With loading state
<Button isLoading={isPending}>
  Submit
</Button>
```

### Input Component

```tsx
import Input from './components/ui/Input';

// Floating label input
<Input
  label="Username"
  value={username}
  onChange={(e) => setUsername(e.target.value)}
  error={errors.username}
  icon={<span>👤</span>}
  fullWidth
/>
```

### Card Component

```tsx
import Card from './components/ui/Card';

// Variants: default, glass, gradient
<Card variant="glass" hover>
  <h3>Card Title</h3>
  <p>Card content</p>
</Card>
```

### Toast Notifications

```tsx
import { useToast } from './contexts/ToastContext';

const { addToast } = useToast();

// Show notification
addToast('Success!', 'success');
addToast('Error occurred', 'error');
addToast('Warning message', 'warning');
addToast('Info message', 'info');
```

## 🎣 Custom Hooks

### Authentication

```tsx
import { useLogin, useRegister } from './hooks/useAuth';

// Login
const loginMutation = useLogin();
loginMutation.mutate({ username, password });

// Register
const registerMutation = useRegister();
registerMutation.mutate({ username, password });
```

### User Data

```tsx
import { useUser } from './hooks/useUser';

const { data: user, isLoading } = useUser();
// user: { id, username, email, is_staff, is_superuser }
```

### Logout

```tsx
import { useLogout } from './hooks/useLogout';

const logoutMutation = useLogout();
logoutMutation.mutate();
```

## 🔐 Authentication Flow

### How It Works

1. **Login**: User submits credentials → Backend returns access + refresh tokens → Stored in localStorage
2. **API Requests**: Axios interceptor adds `Authorization: Bearer {token}` header
3. **Token Expiry**: When access token expires (401 error) → Automatically refresh using refresh token
4. **Logout**: Clear tokens from localStorage → Clear TanStack Query cache → Redirect to login

### Token Management

All token operations are handled by `utils/token.ts`:

```typescript
import { getAccessToken, setTokens, clearTokens, isTokenValid } from './utils/token';

// Check if user is authenticated
const isAuthenticated = isTokenValid();

// Get current user from token
const user = getUserFromToken();
```

## 🎨 Customization

### Change Theme Colors

Edit `frontend/src/index.css`:

```css
:root {
  --color-primary: #8b5cf6;    /* Purple */
  --color-secondary: #ec4899;  /* Pink */
  --color-accent: #3b82f6;     /* Blue */
  --color-success: #10b981;    /* Green */
  --color-error: #ef4444;      /* Red */
}
```

### Add New Pages

1. **Create page component** in `src/pages/`:

```tsx
// src/pages/Profile.tsx
import DashboardLayout from '../components/layout/DashboardLayout';

const Profile = () => {
  return (
    <DashboardLayout>
      <h1>Profile Page</h1>
    </DashboardLayout>
  );
};

export default Profile;
```

2. **Add route** in `src/App.tsx`:

```tsx
import Profile from './pages/Profile';

<Route 
  path="/profile" 
  element={
    <ProtectedRoute>
      <Profile />
    </ProtectedRoute>
  } 
/>
```

### Create New API Endpoints

1. **Backend** - Add view in `backend/users/views.py`:

```python
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_profile(request):
    return Response({
        'username': request.user.username,
        'email': request.user.email,
    })
```

2. **Backend** - Add URL in `backend/users/urls.py`:

```python
path('profile/', get_profile, name='profile'),
```

3. **Frontend** - Add service function in `src/services/`:

```typescript
// src/services/user.ts
import api from '../api';

export const getProfile = async () => {
  const response = await api.get('/api/users/profile/');
  return response.data;
};
```

4. **Frontend** - Create hook in `src/hooks/`:

```typescript
// src/hooks/useProfile.ts
import { useQuery } from '@tanstack/react-query';
import { getProfile } from '../services/user';

export const useProfile = () => {
  return useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
  });
};
```

5. **Use in component**:

```tsx
import { useProfile } from '../hooks/useProfile';

const { data: profile, isLoading } = useProfile();
```

## 🚢 Deployment

### Environment Variables

Create `.env` in backend directory:

```env
# Django Settings
SECRET_KEY=your-secret-key-here
DEBUG=False
ALLOWED_HOSTS=yourdomain.com,www.yourdomain.com
DATABASE_URL=your-database-url
CORS_ALLOWED_ORIGINS=https://yourdomain.com

# Google OAuth Settings
SOCIAL_AUTH_GOOGLE_CLIENT_ID=your_google_client_id
SOCIAL_AUTH_GOOGLE_CLIENT_SECRET=your_google_client_secret
FRONTEND_BASE_URL=http://localhost:5173
```

### Production Checklist

- [ ] Set `DEBUG = False` in production
- [ ] Generate a new `SECRET_KEY`
- [ ] Configure `ALLOWED_HOSTS`
- [ ] Set up production database (PostgreSQL recommended)
- [ ] Configure `CORS_ALLOWED_ORIGINS`
- [ ] Run `python manage.py collectstatic`
- [ ] Set up HTTPS
- [ ] Configure proper logging
- [ ] Set up email backend for password resets
- [ ] Enable CSRF protection
- [ ] Configure session security

## 📚 API Endpoints

### Authentication

- `POST /api/users/register/` - Register new user
- `POST /api/users/token/` - Login (get tokens)
- `POST /api/users/token/refresh/` - Refresh access token

### Custom Token Claims

The access token includes:
```json
{
  "user_id": 1,
  "username": "john",
  "email": "john@example.com",
  "is_staff": false,
  "is_superuser": false,
  "exp": 1234567890,
  "iat": 1234567890
}
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - feel free to use it for your own projects!

## 🙏 Acknowledgments

Built with:
- [Django](https://www.djangoproject.com/)
- [Django REST Framework](https://www.django-rest-framework.org/)
- [Simple JWT](https://django-rest-framework-simplejwt.readthedocs.io/)
- [React](https://react.dev/)
- [TanStack Query](https://tanstack.com/query/)
- [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)

## 📧 Support

If you have any questions or run into issues, please open an issue on GitHub.

---

**Happy coding!** 🎉 Start building your next amazing project with this template.
