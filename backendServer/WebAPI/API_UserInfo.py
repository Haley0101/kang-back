from Modules.Module_Basic import *
from Modules.Module_SQL import *

WebUserInfoAPI = Blueprint(
    "WebUserInfoAPI", __name__, template_folder="pages", url_prefix="/api"
)


@WebUserInfoAPI.route("/user-info", methods=["POST"])
def userInfo():
    params = request.get_json()
    userId = params["userId"]
    
    userData = getUser(userId)  # 유저 아이디에 따른 유저 정보
    return jsonify(
        {
            "result": True,
            "userId": userData[0],
            "userName": userData[2],
            "userPhoneNumber": userData[3],
            "userEmail": userData[4]
        }
    )


@WebUserInfoAPI.route("/user-edit", methods=["POST"])
def userEdit():
    params = request.get_json()
    userId = params["userId"]
    targetValue = params["targetValue"]
    editValue = params["editValue"]
    
    editResult = editUserInfo(userId, targetValue, editValue)  # 유저 아이디에 따른 유저 정보

    if editResult == True:
        return jsonify(
            {
                "result": True,
                "userId": userId,
                "targetValue": targetValue,
                "editValue": editResult
            }
        )
    else:
        return jsonify({
            "result": False,
            "message": "상상도 못한 에러 발생 후후"
        })

@WebUserInfoAPI.route("/id_list", methods=['GET'])
def getuserID():
    db, SQL = get_SQL()

    SQL.execute("SELECT userId FROM USER_DATA")

    userId = SQL.fetchall()

    binlist = []
    for id in userId:
        binlist.append(id)

    return jsonify({"id_list" : binlist})