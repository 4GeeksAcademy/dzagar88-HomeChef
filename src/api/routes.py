"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, MenuItem
from api.utils import generate_sitemap, APIException

from flask_jwt_extended import  jwt_required, create_access_token, get_jwt_identity

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

@api.route('/chef', methods=['POST'])
@jwt_required()
def add_menu_item():
    body = request.get_json()

    chef_username = get_jwt_identity()
    chef = User.query.filter_by(username = chef_username).one_or_none()

    menu_item = MenuItem(
        user_id=chef.id,
        image=body["image"],
        title=body["title"],
        ingredients=body["ingredients"],
        estimated_time=body["estimated_time"],
        dietary_preferences=body["dietary_preferences"],
        allergen=body["allergen"],
        quantity_available=body["quantity_available"],
        description=body["description"],
        street=body["street"],
        city=body["city"],
        state=body["state"]
    )
    db.session.add(menu_item)
    db.session.commit()
    menu_query = MenuItem.query.all()
    all_menus = list(map(lambda x: x.to_dict(), menu_query))

    return jsonify(all_menus), 200

@api.route('/chef',methods=['GET'])
@jwt_required()
def view_menu_items():
    chef_username = get_jwt_identity()
    chef = User.query.filter_by(username = chef_username).one_or_none()

    if chef:
        menu_items = MenuItem.query.filter_by(user_id=chef.id)

    menu_items_dictionaries = []
    for menu_item in menu_items:
        menu_items_dictionaries.append(menu_item.to_dict())

    return jsonify(menu_items_dictionaries),200

@api.route('/profile',methods=['POST'])
@jwt_required()
def view_profile():
    body = request.json
    user_id = get_jwt_identity()

    user = User.query.get(user_id)
    if not user:
        raise APIException("User not found", 404)

    user.name = body["name"]
    user.bio = body["bio"]
    db.session.commit()

    return jsonify(User.to_dict()), 201

if __name__ == '__main__':
    api.run()