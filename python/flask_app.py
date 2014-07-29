#!/usr/local/bin/python3.3

from flask import Flask, request, redirect, Response
from flask.ext.mail import Mail, Message
import os
import mysql.connector as conn
import urllib.parse
from random import randint
import requests
from requests.auth import HTTPBasicAuth
from string import Template

######################################################################
########## FUNCTION AND VARIABLE DEFINITIONS USED BY SERVER ##########
######################################################################

# Mail server configuration
app = Flask(__name__)
app.config.update(
    DEBUG = True,
    # Flask-Mail Configuration
    MAIL_SERVER='smtp.gmail.com',
    MAIL_PORT=465,
    MAIL_USE_SSL=True,
    MAIL_USERNAME = 'info@smartypal.com',
    MAIL_PASSWORD = 'Gulmohar1;'
    )
mail = Mail(app)


def connectDB(db_name):
    db = conn.connect(host="mysql.server",user="alexpmil",passwd="gingerpye", database=db_name)
    cur = db.cursor()
    cur.execute("""SET time_zone='America/New_York'""")
    return(db,cur)

def send_confirmation_email(email_addr):
    assert type(email_addr)==str
    os.chdir('/home/alexpmil/SmartyPAL/smarty/emails')
    with open('mailer.html', 'r') as email:
        contents = email.read()
    try:
        msg = Message(
                    'Thanks from SmartyPAL!',
                    sender=('SmartyPAL', 'info@smartypal.com'),
                    recipients=[email_addr],
                    bcc=['smartypalinfo@gmail.com']
                )
        msg.html = contents
        mail.send(msg)
        return "Sent"
    except Exception as e:
        return(str(e))

def send_email(email_addr,mail_file,sujeto):
    assert type(email_addr)==str
    os.chdir('/home/alexpmil/SmartyPAL/smarty/emails')
    with open(mail_file, 'r') as email:
        contents = email.read()
    try:
        msg = Message(
                    sujeto,
                    sender=('SmartyPAL Team', 'info@smartypal.com'),
                    recipients=[email_addr],
                    bcc=['info@smartypal.com']
                )
        msg.html = contents
        mail.send(msg)
        return "Sent"
    except Exception as e:
        return(str(e))


def phonecall(L):
    for em in L:
        send_email(em,'phone-call.html','SmartyPAL needs your help!')

def params(url):
    url = urllib.parse.unquote(url)#.decode('utf8')
    d = {}
    try:
        for each in url.split('?')[1].split('&'):
            try:
                p = each.split('=')
                d[str(p[0])]=str(p[1])
            except:
                d[str(p[0])]=str(p[0])
    except:
        pass
    return(d)

ipdb = "http://api.ipinfodb.com/v3/ip-city/?key=b4d74d674d499b5ad1eab72d83c8ec874e8479f0dfeb387df7344f03749776cf&ip="
def logIP(ip_address, user_agent, js=False):
    import hashlib
    ip_hash = hashlib.sha1(ip_address.encode("UTF-8")).hexdigest()[10:22]
    db, cur = connectDB("alexpmil$smartypal_ips")
    location = " ".join(str(requests.get(ipdb+ip_address).text).split(";")[4:7])
    sql = Template("""INSERT INTO ips VALUES('$hsh', '$ip_val', '$geo', 1, CURDATE(), NOW(),'', $jsc , '$ua')
    ON DUPLICATE KEY UPDATE hash = '$hsh', hits = hits + 1, last_hit = NOW(), geo = '$geo', ua = '$ua' """).substitute(hsh=ip_hash,ip_val=ip_address,geo=location,jsc=js, ua=user_agent)
    cur.execute(sql)
    db.commit()
    cur.close()
    db.close()
    return(ip_hash)

##########################################
########## SERVER URL RESPONSES ##########
##########################################


@app.route('/test')
def newhome():
    try:
        client_ip = request.access_route[0]
        user_agent = str(request.user_agent)
        ip_hash = logIP(client_ip, user_agent)
        os.chdir('/home/alexpmil/SmartyPAL/smarty')
        with open('newhome.html', 'r') as LP:
            contents = LP.read()
        return(contents + "  <script>ga('set', 'dimension1', '"+ ip_hash + "');</script>\n</body>\n</html>")
    except Exception as e:
        return("<html><head><title>500 Error</title></head><body>500 Error: Problem with server <!-- Python Reponse: "+str(e)+" --></body></html>")

@app.route('/')
def hello_world():
    # Logs GA event and redirects to http://www.smartypal.com
    return("""<html><head><title>&nbsp;</title></head><body><script>(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,'script','//www.google-analytics.com/analytics.js','ga');ga('create', 'UA-42710923-2', 'smartypal.com');ga('send', 'pageview');ga('send', 'event', 'Redirect', 'http://info.smartypal.com', 'Sent to: http://www.smartypal.com');window.location = 'http://www.smartypal.com';</script></body></html>""")
    #return(redirect('http://www.smartypal.com', code=301))

@app.route('/fb-free-trial')
def redir():
    try:
        N = randint(0,1)
        if N==0:
            return redirect("http://info.smartypal.com/free-trial", code=301)
        elif N==1:
            return redirect("http://info.smartypal.com/1-month-free-trial", code=301)
    except Exception as e:
        return("<html><head><title>500 Error</title></head><body>500 Error: Problem with server <!-- Python Reponse: "+str(e)+" --></body></html>")

### $7.99/month page

@app.route('/free-trial')
def landing_page():
    try:
        client_ip = request.access_route[0]
        user_agent = str(request.user_agent)
        ip_hash = logIP(client_ip, user_agent)
        os.chdir('/home/alexpmil/SmartyPAL/smarty')
        with open('landing-page-799.html', 'r') as LP:
            contents = LP.read()
        return(contents + "  <script>ga('set', 'dimension1', '"+ ip_hash + "');</script>\n</body>\n</html>")
    except Exception as e:
        return("<html><head><title>500 Error</title></head><body>500 Error: Problem with server <!-- Python Reponse: "+str(e)+" --></body></html>")



### $4.99/month page

@app.route('/1-month-free-trial')
def landing_page2():
    try:
        client_ip = request.access_route[0]
        user_agent = str(request.user_agent)
        ip_hash = logIP(client_ip, user_agent)
        os.chdir('/home/alexpmil/SmartyPAL/smarty')
        with open('landing-page-499.html', 'r') as LP:
            contents = LP.read()
        return(contents + "  <script>ga('set', 'dimension1', '"+ ip_hash + "');</script>\n</body>\n</html>")
    except Exception as e:
        return("<html><head><title>500 Error</title></head><body>500 Error: Problem with server <!-- Python Reponse: "+str(e)+" --></body></html>")


### On email submission

@app.route('/submit-email', methods=['POST'])
def submit_email():
    try:
        name=request.form['name']
        email=request.form['email']
        db, cur = connectDB("alexpmil$smartypal_emails")
        sql = """INSERT INTO emails VALUES('{0}','{1}')
        ON DUPLICATE KEY UPDATE email=email""".format(email,name)
        cur.execute(sql)
        db.commit()
        cur.close()
        db.close()
        send_confirmation_email(email)
        return("success101")
    except Exception as e:
        return(e)

### Push notifications

@app.route('/pushover')
def pushover():
    try:
        payload = {
            'token': 'agk3q6aLeTop6U8CfaFL1mtrbrBjyS',
            'user': 'uJBEdk3CTbZ67ByZR7zauMGcDHFybq',
            'title': 'Landing page conversion!',
            'message': 'Cha-ching! Someone just submitted their email on your Facebook ads landing page.',
            'sound': 'cashregister'
            }
        r = requests.post("https://api.pushover.net/1/messages.json", data=payload)
        return(Response(
        r.text,
        status=r.status_code,
        content_type=r.headers['content-type'],
    ))
    except Exception as e:
        return(str(e))


@app.route('/pushbullet')
def pushbullet():
    try:
        payload = {
            'API_KEY': 'v1HTx4I5McTCfQhvUwzoo6ZXWyhy8qIBlWujBb9B78o4i',
            'device_iden': 'ujBb9B78o4idjAiVsKnSTs',
            'type': 'note',
            'title': 'Landing page conversion!',
            'body': 'Cha-ching! Someone just submitted their email on your Facebook ads landing page.'
            }
        r = requests.post("https://api.pushbullet.com/api/pushes", data=payload, auth=('v1HTx4I5McTCfQhvUwzoo6ZXWyhy8qIBlWujBb9B78o4i', 'v1HTx4I5McTCfQhvUwzoo6ZXWyhy8qIBlWujBb9B78o4i'))
        return(Response(
        r.text,
        status=r.status_code,
        content_type=r.headers['content-type'],
    ))
    except Exception as e:
        return(str(e))

### Credits & Privacy
@app.route('/privacy')
def pricacy():
    try:
        os.chdir('/home/alexpmil/SmartyPAL/smarty')
        with open('privacy.html', 'r') as LP:
            contents = LP.read()
        return(contents)
    except Exception as e:
        return("<html><head><title>500 Error</title></head><body>500 Error: Problem with server <!-- Python Reponse: "+str(e)+" --></body></html>")
@app.route('/credits')
def credits():
    try:
        os.chdir('/home/alexpmil/SmartyPAL/smarty')
        with open('credits.html', 'r') as LP:
            contents = LP.read()
        return(contents)
    except Exception as e:
        return("<html><head><title>500 Error</title></head><body>500 Error: Problem with server <!-- Python Reponse: "+str(e)+" --></body></html>")


@app.route('/templ')
def email_templ():
    try:
        os.chdir('/home/alexpmil/SmartyPAL/smarty/10')
        with open('mailer.html', 'r') as email:
            contents = email.read()
        return(contents)
    except Exception as e:
        return(str(e))

if __name__ == "__main__":
    app.run()
