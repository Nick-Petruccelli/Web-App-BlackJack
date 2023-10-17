from typing import List, field

from deck import Deck
from hand import Hand


class Game:
    num_players: int
    deck: Deck
    dealer_hand: Hand

    def start_game(deck, num_players) -> None:
        ...
