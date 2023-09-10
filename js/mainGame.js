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

class BlackJackGame{
    constructor(deck){
        this.deck = deck;
        this.playerHandValue = 0;
        this.dealerHandValue = 0;
        this.playerCards = [];
        this.dealersCards = [];
        this.playerWins = 0;
        this.dealerWins = 0;
        this.dealersDownCard;
    }

    startGame(){
        let playerHand = document.getElementById("PlayerHand");

        for(let i = 0; i < 2; i++){
            let card = this.deck.draw();
            this.playerCards.push(card);
            game.scorePlayerHand();
            let div = document.createElement("div");
            let img = document.createElement("img");
            div.appendChild(img)
            img.src = "images/cards/"+card.suit+card.value+".png";
            img.id = "Card";
            playerHand.appendChild(div);
            div.style.position = "absolute";
            div.style.width = "10vw";
            div.style.height = "14.52vw";
            let leftOffSet = (i/2)*100;
            div.style.left = leftOffSet+"%";
        }

        let dealerHand = document.getElementById("DealerHand")
        let card = this.deck.draw();
        this.dealerHandValue += card.value;
        let div = document.createElement("div");
        let img = document.createElement("img");
        div.appendChild(img)
        img.src = "images/cards/"+card.suit+card.value+".png";
        img.id = "Card";
        dealerHand.appendChild(div);
        div.style.position = "absolute";
        div.style.width = "10vw";
        div.style.height = "14.52vw";
        div.style.left = "0";

        card = this.deck.draw();
        this.dealersDownCard = card;
        div = document.createElement("div");
        img = document.createElement("img");
        div.appendChild(img)
        img.src = "images/cards/back.png";
        img.id = "Card";
        dealerHand.appendChild(div);
        div.style.position = "absolute";
        div.style.width = "10vw";
        div.style.height = "14.52vw";
        div.style.left = "50%";
    }

    hit(){
        let card = this.deck.draw();
        this.scorePlayerHand();
        this.playerCards.push(card);
        game.scorePlayerHand();
        let cardLay = document.getElementById("PlayerCardLay");
        let div = document.createElement("div");
        let img = document.createElement("img");
        div.appendChild(img)
        img.src = "images/cards/"+card.suit+card.value+".png";
        img.id = "Card";
        cardLay.appendChild(div);
        game.orderPlayerCardLay();
    }

    stand(){
        while(this.dealerHandValue <= 17){

        }
    }

    orderPlayerCardLay(){
        let cardLay = document.getElementById("PlayerCardLay");
        let cardList = cardLay.children;
        for(let i = 0; i<cardList.length; i++){
            let card = cardList[i];
            card.id = "card"+i;
            let _card = document.getElementById("card"+i);
            _card.style.position = "absolute";
            _card.style.width = "10vw";
            _card.style.height = "14.52vw";
            let leftOffSet = ((i+1)/(cardList.length+1)*100)-10;
            _card.style.left = leftOffSet+"vw";
        }
    }

    scorePlayerHand(){
        this.playerHandValue = 0;
        for(let i = 0; i<this.playerCards.length; i++){
            let cardValue = this.playerCards[i].value;
            if(cardValue == 1){
                this.playerHandValue += 11;
            }else if(cardValue > 10){
                this.playerHandValue += 10
            }
            else{
                this.playerHandValue += cardValue;
            }
        }
        if(this.playerHandValue > 21){
            for(let i = 0; i<this.playerCards.length; i++){
                let cardValue = this.playerCards[i].value;
                if(cardValue == 1){
                    this.playerHandValue -= 10;
                }
                if(this.playerHandValue <= 21){
                    break;
                }
            }
            if(this.playerHandValue > 21){
                console.log("You Bust");
            }
            if(this.playerHandValue == 21){
                console.log("your at 21");
            }
        }
    }
}

function createDeck(){
    let deck = new Deck();
    deck.instantiate();
    deck.shuffle();
    return deck;
}


let deck = createDeck();
let game = new BlackJackGame(deck);
game.startGame();