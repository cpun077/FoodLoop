import user
import json
from supabase import create_client
import datetime

class Receiver(user.User):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        with open("config.json", "r") as jsonFile:
            self.config = json.load(jsonFile)

        self.supabase = create_client(self.config["url"], self.config["key"])

    def request_food(self):
        time = datetime.datetime.now().strftime("%Y-%m-%dT%H:%M:%S.%f")

        food = {}
        food["Date"] = time
        food["Poster"] = self.name
        food["Description"] = "fake"
        food["Picture"] = "fake"
        food["Address"] = self.address
        food["City"] = self.city
        food["State"] = self.state
        food["Zip Code"] = self.zipcode

        data, count = self.supabase.table('Food').insert(food).execute()

