import socket
import threading
import signal
import os

class Server:
    def __init__(self):
        self.event = threading.Event()
        self.sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        self.host = "localhost"
        self.port = 10000
        self.addr = (self.host, self.port)
        self.sock.bind(self.addr)
        self.sock.listen(10)
        self.rooms = [Room(0)]
        self.room_size = 3
        self.count = 0
        self.clients = {}
        self.num_rooms = 0
        with open(f"logs/room{self.num_rooms}.txt", "w+") as f:
            f.write("Chat created!\n")

    def shut_down_server(self, sig, frame):
        for room in self.rooms:
            for connection in list(room.client_list):
                connection.sendall("Server shutting down!".encode())
                connection.close()
        self.event.set()
        os._exit(1)

    def start(self):
        signal.signal(signal.SIGINT, self.shut_down_server)
        signal.signal(signal.SIGHUP, self.shut_down_server)
        while True:
            client_socket, addr = self.sock.accept()
            name = client_socket.recv(128).decode()

            if name in list(self.clients):
                client_socket.sendall(f"{self.clients[name]}".encode())
                self.rooms[self.clients[name]].start(client_socket, name)
            else:
                client_socket.sendall(f"{self.num_rooms}".encode())
                self.clients[name] = self.num_rooms
                self.rooms[self.num_rooms].start(client_socket, name)
                self.count += 1

            if self.count == self.room_size:
                self.count = 0
                self.num_rooms += 1
                self.rooms.append(Room(self.num_rooms))
                with open(f"logs/room{self.num_rooms}.txt", "w+") as f:
                    f.write("Chat created!\n")
            #print(f"{name}({addr[0]}) has joined the Server.")

class Room:
    def __init__(self, idx):
        self.id = idx
        self.client_list = {}

    def handle_client(self, client_socket):
        while True:
            try:
                data = client_socket.recv(1024)
                if data.decode() == "q":
                    print(f"{self.client_list[client_socket]} has left the server")
                    del self.client_list[client_socket]
                    client_socket.close()
                    return
                self.broadcast(data, self.client_list[client_socket])

            except Exception as e:
                del self.client_list[client_socket]
                client_socket.close()
                return

    def broadcast(self, message, client_name):
        with open(f"logs/room{self.id}.txt", "a+") as f:
            f.write(f"{client_name}: {message.decode()}\n")
        for connection, _ in self.client_list.items():
            connection.sendall(f"{client_name}: {message.decode()}".encode())

    def start(self, client_socket, name):
        self.client_list[client_socket] = name
        print(f"{name} has joined the Room.")
        client = threading.Thread(target=self.handle_client, args=(client_socket,))
        client.start()


if __name__ == "__main__":
    server = Server()
    server.start()
