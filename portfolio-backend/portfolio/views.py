from rest_framework import generics
from .models import Certificate
from .serializers import CertificateSerializer

class CertificateListView(generics.ListAPIView):
    queryset = Certificate.objects.all()
    serializer_class = CertificateSerializer
