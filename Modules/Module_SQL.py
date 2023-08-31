from Modules.Module_Basic import *


def get_SQL():
    try:
        db = sqlite3.connect("./data/data.db")
        SQL = db.cursor()
        return db, SQL

    except Exception as e:
        print(e)
        return False, False


def checkPw(type, input_id, input_pw):
    if type == "hash" or type == 0:
        password = (bcrypt.hashpw(input_pw.encode("UTF-8"), bcrypt.gensalt())).decode(
            "utf-8"
        )
    elif type == "check" or type == 1:
        _result = getPw(input_id, input_pw)
        password = bcrypt.checkpw(input_pw.encode("UTF-8"), _result.encode("UTF-8"))
    return password


def getUser(userId):
    db, SQL = get_SQL()
    if db == False:
        return False
    try:
        SQL.execute(f"SELECT * FROM USER_DATA WHERE userId = '{userId}'")
        result = SQL.fetchone()
        return result

    except Exception as e:
        print(e)
        return False


def getPw(input_id, input_pw):
    db, SQL = get_SQL()
    if db == False:
        return False
    try:
        SQL.execute(f"SELECT * FROM USER_DATA WHERE userId = '{input_id}'")
        result = SQL.fetchone()[1]
        return result

    except Exception as e:
        print(e)
        return False


def getUserLang(userId):
    db, SQL = get_SQL()
    if db == False:
        return False
    try:
        SQL.execute(f"SELECT * FROM USER_DATA WHERE userId = '{userId}'")
        result = SQL.fetchone()[5]
        return result

    except Exception as e:
        print(e)
        return False


def editUserInfo(userId, targetValue, editValue):
    db, SQL = get_SQL()
    if db == False:
        return False
    
    try:
        SQL.execute(f"UPDATE USER_DATA SET {targetValue} = '{editValue}' WHERE userId = '{userId}'")
        db.commit()
        return True

    except Exception as e:
        print(e)
        return False