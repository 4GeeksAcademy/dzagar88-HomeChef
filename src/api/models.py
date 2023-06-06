from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    menu_items = db.relationship("MenuItem",backref="user")

    def __repr__(self):
        return f'<User {self.username}>'

    def to_dict(self):
        return {
            "id": self.id,
            "username": self.username,
            # do not serialize the password, its a security breach
        }
    def __init__(self, username, password):
        self.username = username
        self.password = password
        self.is_active = True
    
    def check_password(self, password):
        if password == self.password:
            return True
        else: 
            return False
        
class MenuItem(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    title = db.Column(db.String(40), nullable=False)
    image = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(500), nullable=False)
    ingredients = db.Column(db.String(500), nullable=False)
    dietary_preferences = db.Column(db.String(500))
    allergen = db.Column(db.String(500))
    estimated_time = db.Column(db.String(100), nullable=False)
    quantity_available = db.Column(db.String(100), nullable=False)
    street = db.Column(db.String(500), nullable=False)
    city = db.Column(db.String(500), nullable=False)
    state = db.Column(db.String(500), nullable=False)

    def to_dict(self):
        return {
            "id":self.id,
            "user_id":self.user_id,
            "title":self.title,
            "image":self.image,
            "description":self.description,
            "ingredients":self.ingredients,
            "dietary_preferences":self.dietary_preferences,
            "allergen":self.allergen,
            "estimated_time":self.estimated_time,
            "quantity_available":self.quantity_available,
            "street":self.street,
            "city":self.city,
            "state":self.state,
        }