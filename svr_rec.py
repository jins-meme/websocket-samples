import logging
from websocket_server import WebsocketServer

def new_client(client, server, message):
        print(message)

server = WebsocketServer(5001, host='0.0.0.0', loglevel=logging.INFO)
server.set_fn_message_received(new_client)
server.run_forever()
