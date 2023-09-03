from Modules.Module_Basic import *
from Modules.Module_SQL import *

WebAccountAPI = Blueprint(
    "WebAccountAPI", __name__, template_folder="pages", url_prefix="/api"
)


@WebAccountAPI.route("/sign-up", methods=["POST"])
def sign_up():
    params = request.get_json()

    userId = params["userId"]
    userPw = params["userPw"]
    userName = params["userName"]
    userPhoneNumber = params["userPhoneNumber"]
    userEmail = params["userEmail"]

    db, SQL = get_SQL()
    if db == False:
        return jsonify({"result": "false", "message": "서버와의 연결이 불안정 합니다."})

    try:
        hashpw = checkPw(0, userId, userPw)
        SQL.execute(
            f"INSERT INTO USER_DATA(userId, userPw, userName, userPhoneNumber, userEmail, createTime) VALUES('{userId}', '{hashpw}', '{userName}', '{userPhoneNumber}', '{userEmail}', '{datetime.datetime.now()}')"
        )
        db.commit()
        return jsonify(
            {
                "result": True,
                "message": "정상적으로 회원가입이 완료 되었습니다.",
                "userId": userId,
                "userPw": userPw,
                "userEmail": userEmail
            }
        )

    except Exception as e:
        print(e)
        return jsonify({"result": False, "message": "회원가입이 정상적으로 완료 되지 못 하였습니다."})


@WebAccountAPI.route("/sign-in", methods=["POST"])
def sign_in():
    params = request.get_json()
    userId = params["userId"]
    userPw = params["userPw"]

    try:
        pw_check = checkPw(1, userId, userPw)  # True/False
        userData = getUser(userId)  # 유저 아이디에 따른 유저 정보
        if pw_check == True:
            return jsonify(
                {
                    "result": True,
                    "message": "로그인이 정상적으로 완료 되었습니다.",
                    "userId": userData[0],
                    "userName": userData[2],
                    "userPhoneNumber": userData[3],
                    "userEmail": userData[4]
                }
            )

        else:
            return jsonify({"result": False, "message": "비밀번호 또는 계정이 없습니다."})

    except Exception as e:
        print("error", e)
        return jsonify({"result": False, "message": "로그인이 정상적으로 되지 않았습니다."})