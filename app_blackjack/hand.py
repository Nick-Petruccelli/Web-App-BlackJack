from dataclasses import dataclass, field
from typing import List
from card import Card

@dataclass
class Hand:
    score: int
    cards: List[Card] = field(default_factory = list)

    def score_hand(self)->None:
        """Sets hands score based on card in hand"""
        self.score = 0
        for card in self.cards:
            if card.value == 1:
                self.score = self.score+11
            if card.value > 10:
                self.score = self.score+10
            else:
                self.score = self.score+card.value
        if self.score > 21:
            for card in self.cards:
                if card.value == 1:
                    self.score = self.score-10
                if self.score <= 21:
                    break

    def add_card(self, card: Card)->None:
        self.cards.append(card)