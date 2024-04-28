import geopy.distance
from geopy.geocoders import Nominatim


def get_coordinates(address):
    geolocator = Nominatim(user_agent="app")
    location = geolocator.geocode(address)
    print(location.address)
    if location == None:
        return -1
    return (location.latitude, location.longitude)

def get_distance(c1, c2):
    return geopy.distance.geodesic(c1, c2).miles


    