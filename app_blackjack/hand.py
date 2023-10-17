from dataclasses import dataclass, field
from random import randomrange
from typing import List

from card import Card


@dataclass
class Hand:
    """Stores data for hands of both player and dealer
    param: score: value of hand
    param: cards: list of cards in hand
    """

    score: int
    cards: List[Card] = field(default_factory=list)

    def score_hand(self) -> None:
        """Sets hands score based on card in hand"""
        self.score = 0
        for card in self.cards:
            if card.value == 1:
                self.score = self.score + 11
            if card.value > 10:
                self.score = self.score + 10
            else:
                self.score = self.score + card.value
        if self.score > 21:
            for card in self.cards:
                if card.value == 1:
                    self.score = self.score - 10
                if self.score <= 21:
                    break

    def add_card(self, deck: Deck) -> None:
        """Adds card from deck random_rangeto hand"""
        i = randomrange(0, len(deck.cards))
        card = deck[i]
        self.cards.append(card)
        deck.remove(i)

