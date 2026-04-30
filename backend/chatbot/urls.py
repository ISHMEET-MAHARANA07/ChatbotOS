from django.urls import path
from . import views

urlpatterns = [
    path('chat/', views.chat),
    path('messages/', views.messages),
    path('stats/', views.stats),
]
