import os
import webapp2

import saveProfile

class MainHandler(webapp2.RequestHandler):
    """This class gets called when there is a request for '/', upon which it serves 'index.html'."""

    def get(self):
        self.response.headers.add_header('Access-Control-Allow-Origin', '*') #allow other apps to access ours
        content = open(os.path.join(os.path.dirname(__file__), 'index.html'))
        self.response.out.write(content.read())

app = webapp2.WSGIApplication([
    ('/', MainHandler),
    ('/saveProfile', saveProfile.PageHandler)
    ], debug=True)
