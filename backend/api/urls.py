"""api URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import include, path
from rest_framework import routers

from app.storage.views import ProblemViewSet, SubmissionView, HuxleyProblemView, GptApiView, HuxleyLastSubmissionView
from app.controller.views import LoginView, ListQuestions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

schema_view = get_schema_view(
   openapi.Info(
      title="PiOne API",
      default_version='v1',
      description="A very good description",
      contact=openapi.Contact(email="pioneplatform@gmail.com"),
      #license=openapi.License(name="BSD License"),
   ),
   public=True,
)

router = routers.DefaultRouter()

router.register(r'problem', ProblemViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('admin/', admin.site.urls),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
    path('login/',LoginView.as_view(),name='login'),
    path('huxley/list/',ListQuestions.as_view(),name='ListQuestions'),
    path('huxley/submission/<int:problem_id>', SubmissionView.as_view(), name='submission'),
    path('huxley/problem/<int:problem_id>', HuxleyProblemView.as_view(), name='huxley-probems'),
    path('huxley/submission/<int:problem_id>/last/', HuxleyLastSubmissionView.as_view(), name='last-submission'),
    path('gpt/', GptApiView.as_view(), name='gpt-conversation')
]
