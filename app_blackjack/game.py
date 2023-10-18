from typing import List
import json

from deck import Deck
from card import Card
from hand import Hand
from player import Player
from app import player_input


class Game:
    num_players: int
    deck: Deck
    dealer_hand: Hand
    players: List[Player]

    def __init__(self, num_players: int):
        self.num_players = num_players
        self.dealer_hand = Hand([]);
        self.players = []

    def start_game(self)->None:
        self.deck = Deck([])
        self.deck.create_deck()
        self.deck.shuffle_deck()

        self.deal_cards(self.deck, self.num_players)


    def deal_cards(self, deck, num_players) -> None:
        for i in range(num_players):
            self.players.append(Player(False, False, Hand([])))
        for i in range(2):
            for player in self.players:
                player.hand.add_card(deck)
            self.dealer_hand.add_card(deck)
        
    def play_round(self)->None:
        #players turn
        for player in self.players:
            #get input from flask
            if player.standing == False:
                inputs_player_id = -1
                while(inputs_player_id != player.id):
                    with open('player_inputs.json', 'r') as openfile:
                        
                        data = json.load(openfile)

                        if data["is_hit"] == True and data["is_stand"] == False:
                            response = "hit"
                            inputs_player_id = data["player_id"]
                        elif data["is_hit"] == False and data["is_stand"] == True:
                            response = "stand"
                            inputs_player_id = data["player_id"]

                        if inputs_player_id == player.id:
                            break

                if response == "hit":
                    player.hand.add_card(self.deck)
                    print("hit")
                if response == "stand":
                    player.stand()
                    print("stand")

    def dealers_turn(self):
        #check if dealer has ace
        dealer_has_ace = False
        for card in self.dealer_hand:
            if card.value == 1:
                dealer_has_ace = True
                break
        
        if dealer_has_ace:
            dealer_stand_value = 17
        else:
            dealer_stand_value = 16
        
        while self.dealer_hand.score_hand() < dealer_stand_value:
            self.dealer_hand.add_card(self.deck)
        
    def play_game(self)->None:
        players_playing = True
        while(players_playing):
            self.play_round()

            #check if all players have bust or are standing
            for player in self.players:
                if player.stand == False or player.has_bust == False:
                    break
                players_playing = False
        
        self.dealers_turn()

if __name__ == "__main__":
    game = Game(1)
    print(game.players)
    game.start_game()
    print(game.players)
    print(game.players[0].hand)
    print(game.players[0].id)
    game.play_round()
    print(game.players[0].hand)