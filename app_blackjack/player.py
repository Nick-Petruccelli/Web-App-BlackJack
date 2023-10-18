from hand import Hand
from card import Card



class Player:
    has_bust: bool
    standing: bool
    hand: Hand
    id: int
    next_id = 0

    def __init__(self, has_bust: bool, standing: bool, hand: Hand):
        self.has_bust = has_bust
        self.standing = standing
        self.hand = hand
        self.id = Player.next_id
        Player.next_id = Player.next_id+1

    def update_bust(self)->None:
        if self.hand.score_hand() > 21:
            self.has_bust = True
        else:    
            self.has_bust = False

    def stand(self)->None:
        self.standing = True


if __name__ == "__main__":
    p = Player(False, False, Hand([Card('d',10),Card('d',6),Card('h',10)]))
    print(p.has_bust)
    p.update_bust()
    print(p.has_bust)
    print(p.id)
    p2 = Player(False, False, Hand([]))
    print(p2.id)
