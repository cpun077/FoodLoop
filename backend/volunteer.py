class Volunteer(User):
    def __init__(self, name, email, address, city, state, is_organization, password):
        super().__init__(name, email, address, city, state, is_organization, password)

    def request_delivery(self, delivery_object):
        
        matched = self.match_delivery(delivery_object)
        if matched:
            self.create_group_chat(delivery_object)
            return True
        else:
            return False
    
    def match_delivery(self, delivery_object):
        volunteer_location = (self.address, self.city, self.state)  
        delivery_location = (delivery_object.receiever.address, delivery_object.receiever.city, delivery_object.receiever.state) 
        
        distance = self.calculate_distance(volunteer_location, delivery_location)
        if distance < 10:  # 10 miles
            return True
        else:
            return False
