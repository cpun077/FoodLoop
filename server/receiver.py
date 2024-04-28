import user
import json
from supabase import create_client
import datetime

class Receiver(user.User):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    def request_food(self, response):
        time = datetime.datetime.now().strftime("%Y-%m-%dT%H:%M:%S.%f")

        delivery = {} 
        delivery["Date"] = time
        delivery["Poster"] = response["Poster"]
        delivery["Description"] = response["Description"]
        delivery["Picture"] = response["Picture"]
        delivery["DAddress"] = response["Address"]
        delivery["DCity"] = response["City"]
        delivery["DState"] = response["State"]
        delivery["DZip Code"] = response["Zip Code"]
        delivery["RAddress"] = self.address
        delivery["RCity"] = self.city
        delivery["RState"] = self.state
        delivery["RZip Code"] = self.zipcode
        delivery["in_progress"] = False

        data, count = self.supabase.table('Delivery').insert(delivery).execute()