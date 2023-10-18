from dataclasses import dataclass, field
from random import randrange
from typing import List

from card import Card
from deck import Deck


@dataclass
class Hand:
    """Stores data for hands of both player and dealer
    param: cards: list of cards in hand
    """
    cards: List[Card]

    def score_hand(self) -> int:
        """Sets hands score based on card in hand"""
        score = 0
        for card in self.cards:
            if card.value == 1:
                score = score + 11
            if card.value > 10:
                score = score + 10
            else:
                score = score + card.value
        if score > 21:
            for card in self.cards:
                if card.value == 1:
                    score = score - 10
                if score <= 21:
                    break
        return score

    def add_card(self, deck: Deck) -> None:
        """Adds card from deck random_rangeto hand"""
        i = randrange(0, len(deck.cards))
        card = deck.cards[i]
        self.cards.append(card)
        deck.cards.pop(i)

if __name__ == "__main__":
    d = Deck([])
    d.create_deck()
    d.shuffle_deck()

    h = Hand([])
    h.add_card(d)
    print(h.cards)

    print(h.score_hand())
