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
        this.playerHasBust = false;
        this.dealerHasBust = false;
        this.playerCards = [];
        this.dealersCards = [];
        this.playersTurnOver = false;
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
            div.style.width = "50%";
            div.style.height = "100%";
            let leftOffSet = (i/2)*100;
            div.style.left = leftOffSet+"%";
        }

        let dealerHand = document.getElementById("DealerHand")
        let card = this.deck.draw();
        this.dealersCards.push(card);
        let div = document.createElement("div");
        let img = document.createElement("img");
        div.appendChild(img)
        img.src = "images/cards/"+card.suit+card.value+".png";
        img.id = "Card";
        dealerHand.appendChild(div);
        div.style.position = "absolute";
        div.style.width = "50%";
        div.style.height = "100%";
        div.style.left = "0";

        card = this.deck.draw();
        this.dealersCards.push(card);
        this.dealersDownCard = card;
        div = document.createElement("div");
        img = document.createElement("img");
        div.appendChild(img)
        img.src = "images/cards/back.png";
        img.id = "Card";
        dealerHand.appendChild(div);
        div.style.position = "absolute";
        div.style.width = "50%";
        div.style.height = "100%";
        div.style.left = "50%";
        div.id = "DealersDownCard";
    }

    hit(){
        if(this.playersTurnOver){
            return void 0;
        }
        let card = this.deck.draw();
        this.scorePlayerHand();
        this.playerCards.push(card);
        this.scorePlayerHand();
        let cardLay = document.getElementById("PlayerCardLay");
        let div = document.createElement("div");
        let img = document.createElement("img");
        div.appendChild(img)
        img.src = "images/cards/"+card.suit+card.value+".png";
        img.id = "Card";
        cardLay.appendChild(div);
        this.orderPlayerCardLay();
    }

    stand(){
        this.playersTurnOver = true;
        let downCardFace = document.getElementById("DealersDownCard").children[0];
        downCardFace.src = "images/cards/"+this.dealersDownCard.suit+this.dealersDownCard.value+".png";

        if(this.playerHasBust){
            this.scoreDealerHand();
            this.displayResults();
            return void 0;
        }

        let dealerHasAce;
        for(let i =0; i<this.dealersCards.length; i++){
            let card = this.dealersCards[i];
            if(card.value == 1){
                dealerHasAce = true;
                break
            }
        }
        
        let dealerStand;
        if(dealerHasAce){
            dealerStand = 17;
        }else{
            dealerStand = 16;
        }
        while(this.dealerHandValue <= dealerStand){
            let card = this.deck.draw();
            this.dealersCards.push(card);
            this.scoreDealerHand();
            let cardLay = document.getElementById("DealerCardLay");
            let div = document.createElement("div");
            let img = document.createElement("img");
            div.appendChild(img)
            img.src = "images/cards/"+card.suit+card.value+".png";
            img.id = "Card";
            cardLay.appendChild(div);
            game.orderDealerCardLay();
        }
        this.scoreDealerHand();

        this.displayResults();
    }

    orderDealerCardLay(){
        let cardLay = document.getElementById("DealerCardLay");
        let cardList = cardLay.children;
        for(let i = 0; i<cardList.length; i++){
            let card = cardList[i];
            card.id = "card"+i;
            let _card = document.getElementById("card"+i);
            _card.style.position = "absolute";
            _card.style.width = "5vw";
            _card.style.height = "7.26vw";
            let leftOffSet = ((i+1)/(cardList.length+1)*100);
            _card.style.left = leftOffSet+"%";
            _card.style.marginLeft = "-2.5vw";
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
            _card.style.width = "5vw";
            _card.style.height = "7.26vw";
            let leftOffSet = ((i+1)/(cardList.length+1)*100);
            _card.style.left = leftOffSet+"%";
            _card.style.marginLeft = "-2.5vw";
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
                this.playerHasBust = true;
            }
            if(this.playerHandValue == 21){
                console.log("your at 21");
            }
        }
    }

    scoreDealerHand(){
        this.dealerHandValue = 0;
        for(let i = 0; i<this.dealersCards.length; i++){
            let cardValue = this.dealersCards[i].value;
            if(cardValue == 1){
                this.dealerHandValue += 11;
            }else if(cardValue > 10){
                this.dealerHandValue += 10
            }
            else{
                this.dealerHandValue += cardValue;
            }
        }
        if(this.dealerHandValue > 21){
            for(let i = 0; i<this.dealersCards.length; i++){
                let cardValue = this.dealersCards[i].value;
                if(cardValue == 1){
                    this.dealerHandValue -= 10;
                }
                if(this.dealerHandValue <= 21){
                    break;
                }
            }
            if(this.dealerHandValue > 21){
                this.dealerHasBust = true;
            }
            if(this.dealerHandValue == 21){
                console.log("Dealers at 21");
            }
        }
    }

    displayResults(){
        let resultText;
       
        if(this.playerHasBust){
            resultText = document.createTextNode("You bust, the dealer wins. Do you want to play again?");
            this.dealerWins++;
        }else if(this.dealerHasBust){
            resultText = document.createTextNode("The dealer bust, you win! Do you want to play again?");
            this.playerWins++;
        }else if(this.dealerHandValue == this.playerHandValue){
            resultText = document.createTextNode("The dealers hand is equal to yours, tie game. Do you want to play again?");
        }else if(this.dealerHandValue > this.playerHandValue){
            resultText = document.createTextNode("The dealers hand has a higher value, dealer wins. Do you want to play again?");
            this.dealerWins++
        }else{
            resultText = document.createTextNode("Your hand has a higher value, you win!\n Do you want to play again?");
            this.playerWins++
        }
        let gameWindow = document.getElementById("GameWindow");
        let result = document.createElement("div");
        gameWindow.appendChild(result);
        result.appendChild(resultText);
        result.id = "ResultText";
        let leftOffSet = -(resultText.length/2)*6;
        result.style.marginLeft = leftOffSet+"px"

        let playAgainButton = document.createElement("button");
        gameWindow.appendChild(playAgainButton);
        playAgainButton.id = "PlayAgainButton";
        playAgainButton.innerHTML = "Play Again";
        playAgainButton.onclick = function() {game.replay()};
    }

    replay(){
        this.playerHandValue = 0;
        this.dealerHandValue = 0;
        this.playerHasBust = false;
        this.dealerHasBust = false;
        this.playerCards = [];
        this.dealersCards = [];
        this.playersTurnOver = false;

        let playersCardLay = document.getElementById("PlayerCardLay");
        while(playersCardLay.firstChild){
            playersCardLay.removeChild(playersCardLay.lastChild);
        }

        let playerHand = document.getElementById("PlayerHand");
        while(playerHand.firstChild){
            playerHand.removeChild(playerHand.lastChild);
        }

        let dealerCardLay = document.getElementById("DealerCardLay");
        while(dealerCardLay.firstChild){
            dealerCardLay.removeChild(dealerCardLay.lastChild);
        }

        let dealerHand = document.getElementById("DealerHand");
        while(dealerHand.firstChild){
            dealerHand.removeChild(dealerHand.lastChild);
        }

        let resultText = document.getElementById("ResultText");
        resultText.remove();

        let playAgainButton = document.getElementById("PlayAgainButton");
        playAgainButton.remove();

        this.startGame();
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