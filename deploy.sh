#!/bin/bash

echo "==================================================="
echo "  Deploying Portfolio App to Google Cloud Run"
echo "==================================================="
echo ""

SERVICE_NAME="vashu-verma-portfolio-app"
REGION="us-central1"

echo "Step 1/3: Deploying container to Cloud Run (this takes a few minutes)..."
gcloud run deploy "$SERVICE_NAME" \
  --source . \
  --platform managed \
  --region "$REGION" \
  --allow-unauthenticated \
  --set-env-vars="IS_PRODUCTION=True,DJANGO_SECRET_KEY=django-insecure-production-key-change-me,GROQ_API_KEY=YOUR_GROQ_API_KEY_HERE,EMAIL_HOST=smtp.gmail.com,EMAIL_PORT=587,EMAIL_USE_TLS=True,EMAIL_HOST_USER=karanverma24march@gmail.com,EMAIL_HOST_PASSWORD=YOUR_EMAIL_APP_PASSWORD,DEFAULT_FROM_EMAIL=karanverma24march@gmail.com,DATABASE_URL=sqlite:////app/db.sqlite3"

if [ $? -ne 0 ]; then
    echo ""
    echo "==================================================="
    echo " BUILD FAILED! FETCHING THE EXACT ERROR LOG NOW..."
    echo "==================================================="
    BUILD_ID=$(gcloud builds list --region="$REGION" --limit=1 --format="value(id)")
    PROJECT_ID=$(gcloud config get-value project)
    echo ""
    echo "We are saving the log to 'build_error.txt'."
    echo "You can also view the full log online in your browser here:"
    echo "https://console.cloud.google.com/cloud-build/builds;region=$REGION/$BUILD_ID?project=$PROJECT_ID"
    echo ""
    gcloud builds log "$BUILD_ID" --region="$REGION" > build_error.txt 2>&1
    cat build_error.txt
    exit 1
fi

echo ""
echo "Step 2/3: Fetching the live Service URL..."
SERVICE_URL=$(gcloud run services describe "$SERVICE_NAME" --region "$REGION" --format="value(status.url)")

echo "Live URL is: $SERVICE_URL"

echo ""
echo "Step 3/3: Updating GCP_HOST for Django ALLOWED_HOSTS..."
CLEAN_URL="${SERVICE_URL/https:\/\//}"
gcloud run services update "$SERVICE_NAME" --region "$REGION" --update-env-vars="GCP_HOST=$CLEAN_URL"

echo ""
echo "==================================================="
echo "  Deployment 100% Complete!"
echo "  Your website is live at: $SERVICE_URL"
echo "==================================================="