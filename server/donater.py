import user
import json
from supabase import create_client
import datetime

class Donater(user.User):
	def __init__(self, *args, **kwargs):
		super().__init__(*args, **kwargs)

	def post_food(self, description="Yummy Food", picture="pic"):
		time = datetime.datetime.now().strftime("%Y-%m-%dT%H:%M:%S.%f")

		food = {}
		food["Date"] = time
		food["Poster"] = self.name
		food["Description"] = description
		food["Picture"] = picture
		food["Address"] = self.address
		food["City"] = self.city
		food["State"] = self.state
		food["Zip Code"] = self.zipcode

		data, count = self.supabase.table('Food').insert(food).execute()


