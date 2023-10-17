from typing import List, field
from hand import Hand
from deck import Deck

class Game:
    num_players: int
    deck: Deck
    dealer_hand: Hand
    players_hands: List[Hand] = field(defualt_factory = list)

