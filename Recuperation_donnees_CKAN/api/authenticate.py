# api/authenticate.py
from graphql_jwt.backends import JSONWebTokenBackend

class CustomJSONWebTokenBackend(JSONWebTokenBackend):
    def authenticate(self, request=None, **kwargs):
        user = super().authenticate(request, **kwargs)
        if user is None:
            return None
        auth_header = request.META.get('HTTP_AUTHORIZATION', '')
        token = auth_header.split(' ')[1] if ' ' in auth_header else None
        return (user, token)