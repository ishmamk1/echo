import base64
from flask import Flask, Blueprint, abort, jsonify, request, session

from flask_cors import CORS
from flask_jwt_extended import jwt_required

from service.firestore import db, create_posts

from .models import sql_db, Post, UserProfileImg

from datetime import date


posts = Blueprint('posts', __name__)

@jwt_required()
@posts.route("/create_post", methods=["POST"])
def create_post():
    print(request.files)
    print(request.form)
    content = request.form.get('content')
    username = request.form.get('username')
    media = request.files.get('media')
    likes = []
    comments = []
    created = date.today()  # Use the current date

    media_data = None
    if media:
        media_data = media.read()

    new_post = Post(
        username=username,
        content=content,
        media=media_data,
        created=created
    )
    new_post.set_comments(comments)
    new_post.set_likes(likes)

    try:
        # Add the new post to the database
        sql_db.session.add(new_post)
        sql_db.session.commit()  # Commit the transaction
        return jsonify({"message": "Test post added successfully", "post_id": new_post.id}), 200
    except Exception as e:
        # Rollback the transaction in case of an error
        sql_db.session.rollback()
        print(e)
        return jsonify({"error": str(e)}), 500

@posts.route('/all_posts', methods=["GET"])
def get_all_posts():
    try:
        # Query all posts from the database
        all_posts = Post.query.all()
        
        # Serialize the posts into a list of dictionaries
        posts_data = [
            {
                "id": post.id,
                "username": post.username,
                "content": post.content,
                "media": base64.b64encode(post.media).decode("utf-8") if post.media else None,
                "created": post.created.isoformat(),
                "likes": post.likes,
                "comments": post.comments,
            }
            for post in all_posts
        ]
        
        return jsonify(posts_data), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@posts.route("/get_profile", methods=["POST"])
def user_profile():
    try:
        # Query all posts from the database
        username = request.json.get("username")
        print(username)
        user_data = UserProfileImg.query.filter_by(username=username).first()

        if not user_data:
            return jsonify({"error": "User not found"}), 404
        
        user_data = [
            {
                "id": user_data.id,
                "username": user_data.username,
                "profile_picture": base64.b64encode(user_data.profile_picture).decode("utf-8"),
            }
        ]

        return jsonify(user_data), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@posts.route("/user_img", methods=["GET"])
def user():
    try:
        # Query all posts from the database
        all_users = UserProfileImg.query.all()
        
        # Serialize the posts into a list of dictionaries
        user_data = [
            {
                "id": user.id,
                "username": user.username,
                "profile_picture": base64.b64encode(user.profile_picture).decode("utf-8") if user.profile_picture else None,
            }
            for user in all_users
        ]
        
        return jsonify(user_data), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    

