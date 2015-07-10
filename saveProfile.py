import os
import cgi
import json
import webapp2
from google.appengine.ext import ndb

true = True
false = False

class Member(ndb.Model):
    """The data-prototype for an NC member."""
    socialMedia_kind = ndb.StringProperty()
    socialMedia_id = ndb.StringProperty()
    socialMedia_verified = ndb.BooleanProperty()
    name = ndb.StringProperty()
    gender = ndb.StringProperty()
    member_since = ndb.DateTimeProperty(auto_now_add = True) #automatically timestamp an entity when it is created
    last_visit = ndb.DateTimeProperty(auto_now = True) #same as above, but updated whenever the entity is put()

class PageHandler(webapp2.RequestHandler):

    def post(self):
        profile = json.loads(cgi.escape(self.request.body))

        q = Member.query(Member.socialMedia_kind == profile['socialMedia_kind'],
                         Member.socialMedia_id == profile['socialMedia_id'])
        if not q.count(limit = 1):
            #we have a new signee!
            m = Member(parent = ndb.Key('Member','ROOT_MEMBER'))
            m.populate(
                socialMedia_kind = profile['socialMedia_kind'],
                socialMedia_id = profile['socialMedia_id'],
                socialMedia_verified = profile['socialMedia_verified'],
                name = profile['name'],
                gender = profile['gender'])
            m.put()
        else:
            #the visitor has already signed up
            qf = q.fetch(1) #only one match exists in the datastore (at most), so fetch(1) is it
            qf[0].put() #update last_visit
