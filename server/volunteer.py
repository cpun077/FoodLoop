import user
import json
from supabase import create_client
import datetime

class Volunteer(user.User):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    def request_delivery(self, response):
        time = datetime.datetime.now().strftime("%Y-%m-%dT%H:%M:%S.%f")
        response["in_progress"] = True

        data, count = self.supabase.table('Delivery').update({'in_progress': True}).eq('id', response["id"]).execute()

