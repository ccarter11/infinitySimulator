from flask import Flask
import datetime
import random
import string

app = Flask(__name__)


@app.route('/data')
def get_letters():
    alphabet = string.ascii_letters
    n = 10
    letters = random.choices(alphabet, k=n)
	
    return letters 

	
# Running app
if __name__ == '__main__':
	app.run(debug=True)
