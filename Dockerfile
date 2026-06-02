# --- Stage 1: Build the React frontend ---
FROM node:20-alpine as frontend-builder

WORKDIR /app/frontend

# Copy package files (wildcard ensures it works even if package-lock.json is missing)
COPY portfolio-frontend/package*.json ./
RUN npm install --legacy-peer-deps --no-audit --no-fund --quiet

# Copy the rest of the frontend code and build it
COPY portfolio-frontend/ ./
RUN npm run build

# --- Stage 2: Build the Django backend ---
FROM python:3.12-slim

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /app

# Safely copy requirements.txt if it exists, otherwise create an empty one to prevent crashes
COPY portfolio-backend/requirements.tx[t] ./
RUN touch requirements.txt
RUN pip install --no-cache-dir -r requirements.txt gunicorn dj-database-url psycopg2-binary whitenoise python-dotenv django-cors-headers groq djangorestframework Pillow

# Copy the backend project code
COPY portfolio-backend/ .

# Copy the built frontend from the first stage
COPY --from=frontend-builder /app/frontend/dist ./portfolio-frontend/dist

# Collect static files
ENV IS_PRODUCTION=True
ENV DATABASE_URL=sqlite:////tmp/db.sqlite3
ENV DJANGO_SECRET_KEY=dummy_build_key
RUN python manage.py collectstatic --no-input

# Expose the port Cloud Run will listen on and run the server
EXPOSE $PORT
CMD ["sh", "-c", "gunicorn portfolio_backend.wsgi --bind 0.0.0.0:${PORT:-8080} --workers 2"]