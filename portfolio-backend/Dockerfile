FROM python:3.12-slim

WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy project files
COPY . .

# Collect static files
RUN python manage.py collectstatic --noinput

# Run migrations and start server
EXPOSE 8080
CMD sh -c "python manage.py migrate --noinput && python manage.py setup_superuser && gunicorn portfolio_backend.wsgi:application --bind 0.0.0.0:8080 --workers 2 --timeout 120"
