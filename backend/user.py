class User:
	def __init__(self, name: str, x_id: int, address: str, phone_number: str, organization: bool):
		self.name = name
		self.id = x_id
		self.address = address
		self.phone_number = phone_number
		self.organization = organization