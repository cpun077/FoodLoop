class User:
    def __init__(self, response):#name, email, phone, address, city, state, zipcode, is_organization):
        self.name = response["Name"]
        self.email = response["Email"]
        self.phone = response["PhoneNumber"]
        self.address = response["Address"]
        self.city = response["City"]
        self.state = response["State"]
        self.zipcode = response["Zip Code"]
        self.is_organization = response["Organization"]
