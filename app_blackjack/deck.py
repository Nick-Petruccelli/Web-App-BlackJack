from dataclasses import dataclass
from card import Card
from typing import List
from random import randrange

@dataclass
class Deck:
    cards: List[Card]
    
    def create_deck(self)->None:
        """Initilizes deck of cards in order"""
        for i in range(0,4):
            suit: chr
            match i:
                case 0:
                    suit = 's'
                case 1:
                    suit = 'd'
                case 2:
                    suit = 'c'
                case 3:
                    suit = 'h'
            for j in range(1,14):
                self.cards.append(Card(suit=suit, value=j))

    def shuffle_deck(self)->None:
        """Shuffles curent cards in deck"""
        for i in range(len(self.cards)):
            temp = self.cards[i]
            j = randrange(0,len(self.cards))
            self.cards[i] = self.cards[j]
            self.cards[j] = temp

if __name__ == "__main__":
    deck = Deck([])
    deck.create_deck()
    print(deck)
    print(len(deck.cards))
    deck.shuffle_deck()
    print(deck)
    print(len(deck.cards))