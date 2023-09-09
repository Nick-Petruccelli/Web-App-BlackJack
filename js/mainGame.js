let handValue = 0;
class Card{
    constructor(suit, value){
        this.suit = suit;
        this.value = value;
    }


}

class Deck{
    constructor(){
        this.cardList = [];
    }

    instantiate(){
        for(let i = 1; i <= 4; i++){
            let suit;
            switch(i){
                case 1:
                    suit = "s";
                    break;
                case 2:
                    suit = "d";
                    break;
                case 3:
                    suit = "c";
                    break;
                case 4:
                    suit = "h";
                    break;
            }
            for(let j = 1; j <= 13; j++){

                this.cardList.push(new Card(suit, j));
            }
        }
    }

    shuffle(){
        let temp;
        let randIndex;
        for(let i = 0; i < this.cardList.length; i++){
            temp = this.cardList[i];
            randIndex = parseInt(Math.random()*this.cardList.length)
            this.cardList[i] = this.cardList[randIndex];
            this.cardList[randIndex] = temp;
        }
    }

    draw(){
        let randIndex = parseInt(Math.random()*this.cardList.length);
        let drawnCard = this.cardList[randIndex];
        this.cardList.splice(randIndex,1);
        return drawnCard;
    }
}

function createDeck(){
    let deck = new Deck();
    deck.instantiate();
    deck.shuffle();
    return deck;
}

function hit(){
    let card = deck.draw();
    let cardLay = document.getElementById("CardLay");
    let img = document.createElement("img");
    img.src = "images/cards/"+card.suit+card.value+".png";
    img.id = "Card";
    cardLay.appendChild(img);
}

let deck = createDeck();
