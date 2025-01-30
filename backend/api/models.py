import json
from sqlalchemy import Column, Integer, String, LargeBinary, Text, Date, create_engine, Table
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship, sessionmaker
from datetime import date

from flask_sqlalchemy import SQLAlchemy
from service.helper import read_default_image

sql_db = SQLAlchemy()

Base = declarative_base()

class UserProfileImg(sql_db.Model):
    id = sql_db.Column(Integer, primary_key=True, autoincrement=True)
    username = sql_db.Column(String, nullable=False) 
    profile_picture = sql_db.Column(LargeBinary, nullable=True, default=lambda: read_default_image())

class Post(sql_db.Model):
    __tablename__ = 'posts'

    id = sql_db.Column(Integer, primary_key=True, autoincrement=True)  # Primary key
    username = sql_db.Column(String, nullable=False)                  # User's name
    content = sql_db.Column(Text, nullable=False)                     # Post content
    media = sql_db.Column(LargeBinary, nullable=True)                 # Binary file data for media
    created = sql_db.Column(Date, default=date.today)                 # Date of creation
    likes = sql_db.Column(Text, default='[]')  # Store as JSON string
    comments = sql_db.Column(Text, default='[]')  # Store as JSON string

    def __repr__(self):
        return f"<Post(username={self.username}, created={self.created})>"
    
    def get_likes(self):
        return json.loads(self.likes) if self.likes else []

    # Serialize the 'comments' field to a Python list
    def get_comments(self):
        return json.loads(self.comments) if self.comments else []

    # Set the 'likes' field as a JSON string
    def set_likes(self, likes):
        self.likes = json.dumps(likes)

    # Set the 'comments' field as a JSON string
    def set_comments(self, comments):
        self.comments = json.dumps(comments)
