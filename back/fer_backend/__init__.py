from flask import Flask


def create_app(debug=False):

    app = Flask(__name__)
    app.debug = debug

    from .paths import paths
    app.register_blueprint(paths.bpapi)

    return app
