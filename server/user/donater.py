import user


class Donater(user.User):
	def __init__(self, name: str, x_id: int, address: str, phone_number: str, organization: bool):
		super().__init__()

	def post_food(self):
		