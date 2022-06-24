FROM python:3.10-slim

WORKDIR /app

COPY requirements.txt ./

RUN pip install waitress && pip install -r requirements.txt

ENV FLASK_APP=fer_secondary \
    FLASK_ENV=production \
    FLASK_DEBUG=on

COPY . .

CMD [ "waitress-serve", "--port=5000", "--call", "fer_secondary:create_app"]