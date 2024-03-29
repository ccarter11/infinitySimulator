from flask import Flask
import datetime
import random
import string

app = Flask(__name__)

#parallel process word front , back and in each language
@app.route('/data')
def get_letters():
    alphabet = string.ascii_uppercase
    n = 100
    letters = random.choices(alphabet, k=n*n)
	
    return letters

	
if __name__ == '__main__':
	app.run(debug=True)
