from fer_backend import create_app

app = create_app(debug=True)

if __name__ == '__main__':
    from waitress import serve
    serve(app, host="0.0.0.0", port=5000)
