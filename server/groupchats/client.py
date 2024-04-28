import socket
import threading
import sys
import os
import signal


class Client:
    def __init__(self):
        self.event = threading.Event()
        self.sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        self.host = "tcp://0.tcp.us-cal-1.ngrok.io"
        self.port = 12376
        self.addr = (self.host, self.port)

    def send(self):
        while True:
            try:
                inp = input()
                sys.stdout.write("\x1b[1A\x1b[2K")
                self.sock.sendall(inp.encode())
                if inp == "q":
                    self.sock.close()
                    return
            except:
                self.sock.close()
                return

    def recv(self):
        while True:
            try:
                data = self.sock.recv(1024).decode()
                print(data)
                if data == "Server shutting down!":
                    self.sock.close()
                    os._exit(1)
                    return
            except:
                self.sock.close()
                os._exit(1)
                return

    def kill_client(self, sig, frame):
        self.sock.sendall("q".encode())
        self.sock.close()
        self.event.set()
        os._exit()

    def start(self):

        name = "Aayush is my bitch"#sys.argv[1]
        self.sock.connect(self.addr)
        self.sock.sendall(name.encode())
        signal.signal(signal.SIGINT, self.kill_client)
        signal.signal(signal.SIGHUP, self.kill_client)
        send_msg = threading.Thread(target=self.send)
        recv_msg = threading.Thread(target=self.recv)
        send_msg.start()
        recv_msg.start()


if __name__ == "__main__":
    client = Client()
    client.start()
