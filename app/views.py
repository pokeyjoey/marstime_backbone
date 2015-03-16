from flask import render_template
from app import app
from app.mars.marsdate import MarsDate


@app.route('/zubrin_calendar')
def zubrin_calendar():
    return render_template('zubrin_calendar.html', title='Grid')

@app.route('/')
def calendar_index():
    # get todays zubrin calendar date
    marsdate = MarsDate()
    todays_mars_calendar_date = marsdate.today()

    return render_template('calendar_index.html', **locals())

