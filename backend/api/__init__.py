from flask import Flask
from flask_jwt_extended import JWTManager
from flask_cors import CORS


def create_app():
    app = Flask(__name__)

    app.config["SECRET_KEY"] = "hello"
    app.config["JWT_SECRET_KEY"] = "super-secret"
    
    jwt = JWTManager(app)
    CORS(app, supports_credentials=True, origins=["http://localhost:5173"])

    from .auth import auth

    app.register_blueprint(auth, url_prefix="/")

    return app

