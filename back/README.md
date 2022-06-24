# FER_Secondary

## Dev
- pip install -r requirements.txt
- ./fer_secondary.bat

# Prod
- pip install -r requirements.txt && pip install waitress
- export FLASK_APP=fer_secondary FLASK_ENV=production FLASK_DEBUG=on && waitress-serve --port=5000 --call fer_secondary:create_app