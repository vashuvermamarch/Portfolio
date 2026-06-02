import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.mail import EmailMessage
from django.conf import settings

@csrf_exempt
def contact_view(request):
    if request.method == 'POST':
        try:
            # Parse JSON body
            data = json.loads(request.body)
            name = data.get('name', 'No Name')
            email = data.get('email', 'No Email')
            message = data.get('message', 'No Message')
            
            # Construct email
            subject = f"New Contact Form Submission from {name}"
            body = f"Name: {name}\nEmail: {email}\n\nMessage:\n{message}"
            
            # Send email
            email_message = EmailMessage(
                subject=subject,
                body=body,
                from_email=settings.DEFAULT_FROM_EMAIL,
                to=[settings.DEFAULT_FROM_EMAIL],
                reply_to=[email],
            )
            email_message.send(fail_silently=False)
            return JsonResponse({"success": True})
        except Exception as e:
            print("Email Error:", e)
            return JsonResponse({"success": False, "error": str(e)}, status=500)
            
    return JsonResponse({"error": "Only POST allowed"}, status=405)
