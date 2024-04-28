from user import User
import geopy.distance
from geopy.geocoders import Nominatim


def get_coordinates(address):
    geolocator = Nominatim(user_agent="app")
    location = geolocator.geocode(address)
    return (location.latitude, location.longitude)

def get_distance(c1, c2):
    return geopy.distance.geodesic(c1, c2).miles

class Volunteer(User):
    def __init__(self, name, email, address, city, state, zip_code, is_organization):
        super().__init__(name, email, address, city, state, is_organization)

    def request_delivery(self, delivery_object):
        
        matched = self.match_delivery(delivery_object)
        if matched:
            self.create_group_chat(delivery_object)
            return True
        else:
            return False
    
    def match_delivery(self, food, filter_miles=10):
        volunteer_location = f"{self.address}, {self.city}, {self.state}"
        delivery_location = f"{food.address}, {food.city}, {food.state}"

        #need to figure out calculate distance method
        distance = get_distance(get_coordinates(volunteer_location), get_coordinates(volunteer_location))

        if distance < filter_miles:
            pass #do stuff
