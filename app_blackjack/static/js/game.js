class Player{
    constructor(username){
        this.username = username;
        this.id = -1;
    }

    async setID(){
        let playerData = await fetch(
            '/get_players', {
                method: 'post',
                
                headers: {
                    'Accept': 'application/json'
                }
            }
        ).then(
            response => response.json()
        ).then(function(response){
            return response;
        }).catch(function(error){
            console.log(error);
        })

        let idx = 0;
        for(const player in playerData){
            console.log(playerData[player]);
            if(playerData[player] == this.username){
                this.id = idx;
                break;
            }
            idx++;
        }
        console.log(this.id);
    }

    hit(){
        fetch(
            '/player_input', {
                method: 'post',
                body: JSON.stringify({
                    is_hit: true,
                    is_stand: false,
                    player_id: this.id
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
    }

    stand(){
        fetch(
            '/player_input', {
                method: 'post',
                body: JSON.stringify({
                    is_hit: false,
                    is_stand: true,
                    player_id: this.id
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
    }
}

let player = new Player("nick")
player.setID()