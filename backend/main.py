from flask import Flask,request,jsonify
from flask_jwt_extended import jwt_required,JWTManager,create_access_token,get_jwt_identity
from flask_cors import CORS
from flask import send_file
import io
import mysql.connector
app=Flask(__name__)
app.config["JWT_SECRET_KEY"]="77777"
CORS(app)
jwt=JWTManager(app)
conn=mysql.connector.connect(
    host='localhost',
    port=3306,
    user='root',
    password='',
    database='vapour'
)
cursor=conn.cursor()
@app.route("/image/<name>")

def servee(name):
    cursor.execute("SELECT Image from game WHERE Name=(%s)",(name,))
    data=cursor.fetchone()
    dara=io.BytesIO(data[0])

    return send_file(dara,mimetype='image/jpeg',as_attachment=False)

@app.route("/")
def home():
    return "Hello,welcome to vapour"
@app.route("/signin",methods=["POST"])
def sign():
    credentials=request.get_json()
    name=credentials.get("username")
    passwd=credentials.get("password")
    if not name or not passwd:
        return jsonify({"error": "Username and password are required"}), 400
    
    try:
        
        cursor.execute(
            "INSERT INTO users (Username, Password, `No of Games`, Wishlist) VALUES (%s, %s, %s, %s)",
            (name, passwd, 0, "NIL")
        )
        conn.commit()
         
        access=create_access_token(identity=name)
        return jsonify(access_token=access),200
    
    except Exception as e:
         
        return jsonify({"error": str(e)}), 500


@app.route("/login",methods=["POST"])
def login():
    credentials=request.get_json()
    name=credentials.get("username")
    passwd=credentials.get("password")
    cursor.execute("SELECT * FROM users WHERE Username=(%s)",(name,))
    data=cursor.fetchall()
    if(passwd==data[0][1]):
        access=create_access_token(identity=name)
        return jsonify(access_token=access),200
    else:
        return jsonify({"message":"denied"}),401
@app.route("/allgames")
@jwt_required()
def all():
    cursor.execute("SELECT Name,Price,Genre,Discount FROM game")
    data=cursor.fetchall()
    
    return jsonify(data)
@app.route("/byname/<idd>")
@jwt_required()
def namee(idd):
    cursor.execute("SELECT * FROM game WHERE NAME=(%s)",(idd,))
    data=cursor.fetchall()
    return jsonify(data)
@app.route("/image/genre/<genre>")
def imgenre(genre):
    cursor.execute("SELECT Image from game WHERE Genre=(%s)",(genre,))
    data=cursor.fetchone()
    dara=io.BytesIO(data[0])
    return send_file(dara,mimetype="image/jpeg",as_attachment=False)

@app.route("/genre/<idd>")


def genre(idd):
    cursor.execute("SELECT Name,Price,Genre,Discount From game WHERE Genre=(%s)",(idd,))
    data=cursor.fetchall()
    return jsonify(data)

if(__name__=="__main__"):
    app.run(debug=True)