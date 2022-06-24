# FER_Secondary

## Dev
- pip install -r requirements.txt
- python -m flask run

# Prod
- pip install -r requirements.txt && pip install waitress
- waitress-serve --port=5000 --call fer_secondary:create_app