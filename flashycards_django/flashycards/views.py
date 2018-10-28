from rest_framework import viewsets
from models import Flashcard
from serializers import FlashcardSerializer


class FlashcardViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows Flashcard to be CRUDed.
    """
    queryset = Flashcard.objects.all()
    serializer_class = FlashcardSerializer
