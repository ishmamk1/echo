import os

def read_default_image():
    """Reads the default profile picture and returns its binary data."""
    default_image_path = "/Users/ishmam/echo/backend/static/images/default-pfp.jpeg"
    if os.path.exists(default_image_path):
        with open(default_image_path, "rb") as img_file:
            return img_file.read()
    else:
        raise FileNotFoundError(f"Default profile picture not found at {default_image_path}")