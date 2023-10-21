from typing import List
import json

from deck import Deck
from card import Card
from hand import Hand
from player import Player


class Game:
    deck: Deck
    dealer_hand: Hand
    players: List[Player]

    def __init__(self):
        self.dealer_hand = Hand([]);
        self.players = []

    def start_game(self)->None:
        self.deck = Deck([])
        self.deck.create_deck()
        self.deck.shuffle_deck()

        self.deal_cards(self.deck)


    def deal_cards(self, deck) -> None:
        self.players.clear()
        with open('data/players.json', 'r') as openfile:
            data  = json.load(openfile)
        
        for player in data:
            if data[player] != '':
                self.players.append(Player(False, False, Hand([])))
        for i in range(2):
            for player in self.players:
                player.hand.add_card(deck)
            self.dealer_hand.add_card(deck)
        
        self.update_game_data()
        
    def play_round(self)->None:
        #players turn
        for player in self.players:
            #get input from flask
            print(player.id)
            if player.standing == False:
                inputs_player_id = -1
                while(inputs_player_id != player.id):
                    try:
                        with open('data/player_inputs.json', 'r') as openfile:
                            data = json.load(openfile)
                    except:
                        ...

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
        for card in self.dealer_hand.cards:
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
                player.update_bust()
                if player.standing == False and player.has_bust == False:
                    players_playing =True
                    break
                else:
                    players_playing = False
        
        self.dealers_turn()
    
    def update_game_data(self):
        
        with open('data/current_game_data.json', 'r') as openfile:
            data = json.load(openfile)

        data["dealer_hand"].clear()
        for card in self.dealer_hand.cards:
            data["dealer_hand"].append([card.suit, card.value])

        for player in self.players:
            data[f"player{player.id}_hand"].clear()
            for card in player.hand.cards:
                data[f"player{player.id}_hand"].append([card.suit, card.value])

        data["Version"] = data["Version"]+1
        
        with open('data/current_game_data.json', 'w') as outfile:
            json.dump(data, outfile)

if __name__ == "__main__":
    game = Game()
    print(game.players)
    game.start_game()
    print(game.players)
    for player in game.players:
        print(player.hand)
    print(game.dealer_hand)
    game.play_game()
    for player in game.players:
        print(player.hand)
    print(game.dealer_hand)