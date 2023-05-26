"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException

from flask_jwt_extended import  jwt_required, create_access_token



api = Blueprint('api', __name__)


@api.route("/signup", methods=["POST"])
def create_user():
    body = request.json
    new_user = User(
        username=body["username"],
        password=body["password"]
    )
    db.session.add(new_user)
    db.session.commit()
    return jsonify(new_user.to_dict()), 201

@api.route("/login", methods=["POST"])
def handle_login():
    body = request.json
    username = body.get("username")
    password = body.get("password")

    # Perform authentication and validate user credentials
    user = User.query.filter_by(username=username).first()
    if user is None or not user.check_password(password):
        raise APIException("Invalid username or password", 401)

    access_token = create_access_token(identity=username)
    return jsonify(access_token), 200

