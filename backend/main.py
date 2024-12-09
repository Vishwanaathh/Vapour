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
    database='vapourr'
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
    cursor.execute("SELECT Username,Password FROM users WHERE Username=(%s)",(name,))
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
@app.route("/user")
def nouser():
    return "No such user"
@app.route("/user/<uname>")
def getUser(uname):
    cursor.execute("SELECT Username,Password,`No of games`,Wishlist FROM users WHERE Username=(%s)",(uname,))
    data=cursor.fetchone()
    return jsonify(data)
@app.route("/user/image/<namee>")
def getNameImage(namee):
    cursor.execute("SELECT Image from users WHERE Username=(%s)",(namee,))
    data=cursor.fetchone()
    dara=io.BytesIO(data[0])
    if(dara and data):
        return send_file(dara,mimetype='image/jpeg',as_attachment=False)
    else:
        return send_file("./pfp.jpg",mimetype='image/jpeg',as_attachment=False)
@app.route("/friend/getDetails/<nameee>")
def details(nameee):
    cursor.execute("SELECT `Friend Name`,`Friend Rating` FROM friends WHERE Name=(%s)",(nameee,))
    data=cursor.fetchall()
    return jsonify(data)
@app.route("/friend/enterDetails/<nameee>",methods=["POST"])
def insertFriend(nameee):
    data=request.get_json()
    fname=data.get("fname")
    frate=data.get("frating")
    cursor.execute("INSERT INTO friends (`name`,`Friend Name`,`Friend Rating`) VALUES (%s, %s, %s)",(nameee, fname, frate))
    conn.commit() 
    return jsonify({"message": "Friend inserted successfully"}), 201

if(__name__=="__main__"):
    app.run(debug=True)