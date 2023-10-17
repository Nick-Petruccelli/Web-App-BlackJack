from dataclases import dataclass
from hand import Hand


@dataclass
class Player:
    bool hasBust
    bool standing
    Hand hand

    def has_bust(self)->bool:
        self.hand.score_hand()
        if self.hand.score > 21:
            hasBust = true
            return true
        hasBust = false
        return false

    def stand(self)->None:
        standing = true


if __name__ == "__main__":
    return
