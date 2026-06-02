import urllib.request
from django.core.cache import cache
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
import os
from groq import Groq
from portfolio.models import Skill, Project, Certificate, Service

BASE_SYSTEM_PROMPT = """# SYSTEM PROMPT — VASHU AI PORTFOLIO AGENT

You are Vashu AI, the personal AI assistant representing Vashu Verma.

Your purpose is to help visitors learn about Vashu's background, skills, projects, services, experience, achievements, and professional journey.

## ABOUT VASHU

Name: Vashu Verma
Role: AI Builder, Software Developer, and Automation Engineer
Location: India

## PERSONALITY

Be: Professional, Friendly, Helpful, Confident, Concise
Never: Invent information, Exaggerate achievements, Make false claims, Discuss topics unrelated to Vashu's portfolio

## WHAT YOU CAN HELP WITH

Answer questions about: About Vashu, Skills & Technologies, Projects & Experience, Services Offered & Certifications, AI & Automation Work, Contact Information.

## CONTACT REQUESTS & LINKS

If a user wants to work with Vashu or asks for his links:
Respond with his exact details:
- **Email:** karanverma24march@gmail.com
- **LinkedIn:** https://www.linkedin.com/in/vashu-verma-61a70a316v
- **GitHub:** https://github.com/vashuvermamarch

"Thank you for your interest in working with Vashu. Please use the contact form on this website or reach out directly at karanverma24march@gmail.com. You can also connect with him on LinkedIn!"

## UNKNOWN QUESTIONS

If information is unavailable:
"I don't currently have information about that. Please contact Vashu directly for the most accurate details."

## GOAL

Your goal is to act as Vashu's digital representative.

## WEBSITE CONTEXT

The visitor is currently viewing Vashu's interactive portfolio website. The website features a dynamic Hero section, an About section, a Featured Projects section, and a Contact form.
When answering, you can acknowledge that they are on his portfolio website and you are here to guide them through it!"""

def get_live_github_activity():
    cache_key = "vashu_github_activity"
    cached_data = cache.get(cache_key)
    
    if cached_data is not None:
        return cached_data
        
    github_text = ""
    try:
        url = "https://api.github.com/users/vashuvermamarch/repos?sort=updated&per_page=3"
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=5) as response:
            if response.status == 200:
                repos = json.loads(response.read().decode('utf-8'))
                if repos:
                    github_text += "\n### LIVE GITHUB ACTIVITY\n"
                    github_text += "Vashu's latest active GitHub repositories right now are:\n"
                    for repo in repos:
                        name = repo.get("name", "Unknown")
                        desc = repo.get("description", "No description") or "No description"
                        github_text += f"- **{name}**: {desc}\n"
    except Exception as e:
        # Silently fail if API limit is reached or network is down
        github_text = ""
        
    # Cache for 1 hour (3600 seconds)
    cache.set(cache_key, github_text, 3600)
    return github_text

def build_dynamic_prompt():
    prompt = BASE_SYSTEM_PROMPT + "\n\n## DYNAMIC CONTEXT FROM DATABASE\n"
    
    # Skills
    skills = Skill.objects.all()
    if skills.exists():
        prompt += "\n### SKILLS\n"
        for s in skills:
            prompt += f"- {s.name} ({s.category})\n"
            
    # Services
    services = Service.objects.all()
    if services.exists():
        prompt += "\n### SERVICES PROVIDED\n"
        for svc in services:
            prompt += f"- **{svc.title}**: {svc.description}\n"
            
    # Projects
    projects = Project.objects.all()
    if projects.exists():
        prompt += "\n### PROJECTS\n"
        for p in projects:
            prompt += f"- **{p.title}**\n  Description: {p.description}\n  Tech: {p.technologies}\n  Impact: {p.impact}\n"
            
    # Certificates
    certs = Certificate.objects.all()
    if certs.exists():
        prompt += "\n### CERTIFICATIONS\n"
        for c in certs:
            file_info = f" (File available)" if c.file else ""
            prompt += f"- {c.name} (Issued by {c.issuer}){file_info}\n"
            
    # Live GitHub Activity
    prompt += get_live_github_activity()
            
    return prompt

@csrf_exempt
def chat_endpoint(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            user_message = data.get("message")
            chat_history = data.get("history", [])

            if not user_message:
                return JsonResponse({"error": "Message is required"}, status=400)

            # Initialize Groq client
            api_key = os.environ.get("GROQ_API_KEY")
            if not api_key:
                return JsonResponse({"error": "Groq API key not configured on server"}, status=500)
                
            client = Groq(api_key=api_key)

            # Build messages for Groq API
            dynamic_system_prompt = build_dynamic_prompt()
            messages = [{"role": "system", "content": dynamic_system_prompt}]
            
            # Append history (ensure we only pass allowed roles: user/assistant)
            for msg in chat_history:
                role = msg.get("role")
                if role in ["user", "assistant"]:
                    messages.append({"role": role, "content": msg.get("content", "")})
                
            # Append current message
            messages.append({"role": "user", "content": user_message})

            chat_completion = client.chat.completions.create(
                messages=messages,
                model="llama-3.1-8b-instant",
                temperature=0.7,
                max_tokens=1024,
            )

            reply = chat_completion.choices[0].message.content

            return JsonResponse({"reply": reply})

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
    
    return JsonResponse({"error": "Method not allowed"}, status=405)
