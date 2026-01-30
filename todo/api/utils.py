import random
from .models import Task


def generate_unique_color(user):
    max_attempts = 1000
    
    for _ in range(max_attempts):
        r = random.randint(0, 255)
        g = random.randint(0, 255)
        b = random.randint(0, 255)
        color = f"#{r:02X}{g:02X}{b:02X}"
        if not Task.objects.filter(user=user, color=color).exists():
            return color
            
    raise ValueError(f"Unable to generate unique color after {max_attempts} attempts")
