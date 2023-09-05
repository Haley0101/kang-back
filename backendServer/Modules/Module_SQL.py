from Modules.Module_Basic import *
#from Module_Basic import *

def get_SQL():
    try:
        db = pymysql.connect(
            host='user.cw6wxd45nhbr.ap-northeast-2.rds.amazonaws.com', 
            port=3306, 
            user='root', 
            passwd='00000000', 
            db = 'user',
            charset='utf8')
        SQL = db.cursor()
        return db, SQL

    except Exception as e:
        print(e)
        return False, False
    
def make_db():
    try:
        db, SQL = get_SQL()
        SQL.execute('''
        CREATE TABLE IF NOT EXISTS USER_DATA (
            userId VARCHAR(30) primary key,
            userPw VARCHAR(100) NOT NULL,
            userName VARCHAR(20) NOT NULL,
            userPhoneNumber VARCHAR(15),
            userEmail VARCHAR(100)); ''')
        db.commit()
        db.close()
    except Exception as e:
        print(e)
        return False


def checkPw(abcd, input_id, input_pw):
    if abcd == "hash" or abcd == 0:
        password = (bcrypt.hashpw(input_pw.encode("UTF-8"), bcrypt.gensalt())).decode("utf-8")
    elif abcd == "check" or abcd == 1:
        _result = getPw(input_id)
        print(_result)
        password = bcrypt.checkpw(input_pw.encode("UTF-8"), _result.encode("UTF-8"))
        print(input_pw.encode("UTF-8"))
        print(_result.encode("UTF-8"))
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


def getPw(input_id):
    db, SQL = get_SQL()
    if db == False:
        return False
    try:
        SQL.execute(f"SELECT userPw FROM USER_DATA WHERE userId = '{input_id}'")
        result = SQL.fetchone()[0]
        print("result :",result)
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