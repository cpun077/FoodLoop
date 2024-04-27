class Receiver(User):
    def __init__(self, name, email, address, city, state, is_organization, password):
        super().__init__(name, email, address, city, state, is_organization, password)

    def request_food(self, food_details):
        #request a food object and create a delivery object
        food_object = Food(**food_details)
        delivery_object = self.create_delivery(food_object)
        return delivery_object
    def create_delivery(self, food_object):
        # create a delivery object
        delivery = Delivery(food_object, self)
        return delivery
