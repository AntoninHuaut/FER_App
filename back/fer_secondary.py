#!/bin/env python
from fer_backend import create_app
from flask import Flask

app = create_app(debug=True)

if __name__ == '__main__':
   Flask.run(app)