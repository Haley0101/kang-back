from Modules.Module_Basic import *

app = Flask(__name__, template_folder="pages", static_folder="asset")


def newWeb(app):
    ### Back ###
    from WebAPI.API_Account import WebAccountAPI
    app.register_blueprint(WebAccountAPI)

    from WebAPI.API_UserInfo import WebUserInfoAPI
    app.register_blueprint(WebUserInfoAPI)


if __name__ == "__main__":
    newWeb(app)
    app.run(debug=True)

# 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