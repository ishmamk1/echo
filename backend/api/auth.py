from flask import Flask, Blueprint, abort, jsonify, request, session

from flask_cors import CORS

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager

from service.firestore import db, check_user_exists, register_new_user, check_email_exists

from .models import Post, UserProfileImg, sql_db

auth = Blueprint('auth', __name__)

@auth.route("/token", methods=["POST"])
def create_token():
    if not db:
        return "Firestore database is not initialized."

    username = request.json.get("username", None)
    password = request.json.get("password", None)

    user = check_user_exists(username)

    if not user:
        return jsonify({"error": "Invalid email or password"}), 401

    access_token = create_access_token(identity=username)
    return jsonify(access_token=access_token)

@auth.route("/register", methods=["POST"])
def register():
    # username = "eee"
    # email = "abc"
    # password = "abc"

    username = request.json.get("username", None)
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    if not username or not password or not password:
        return jsonify({"error": "Email and password are required"}), 400
    
    user = check_user_exists(username)
    checked_email = check_email_exists(email)

    if user:
        return jsonify({"error": "User already exists"}), 400
    
    if checked_email:
        return jsonify({"error": "Email already exists"}), 400

    user = register_new_user(username, email, password)
    user_profile_img = UserProfileImg(username=username)
    sql_db.session.add(user_profile_img)
    sql_db.session.commit()
    access_token = create_access_token(identity=username)
    return jsonify(access_token=access_token)
