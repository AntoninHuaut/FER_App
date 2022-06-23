set FLASK_APP=fer_secondary
set FLASK_ENV=devlopment
set FLASK_DEBUG=on
start .\env\Scripts\activate.bat
pip install -r requirements.txt
python -m flask run