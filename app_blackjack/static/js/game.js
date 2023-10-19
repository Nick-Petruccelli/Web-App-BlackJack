class Player{
    constructor(username){
        this.username = username;

        let playerData=$.ajax(
            {
                url: '/get_players',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({
                    message: "success"
                }),
                datatype: "JSON",
                success: function(resopnse) {
                    console.log(resopnse);
                    
                },
                error: function(resopnse) {console.log("miss")}
            }
        ).responseJSON;
        
        
        console.log(playerData);
        this.id = -1;
        let idx = 0;
        for(const player in playerData){
            console.log(playerData[player]);
            if(playerData[player] == username){
                this.id = idx;
                break;
            }
            idx++;
        }
        console.log(this.id);
    }

    hit(){
        $.ajax(
            {
                url: '/player_input',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({
                    is_hit: true,
                    is_stand: false,
                    player_id: this.id
                }),
                success: function(resopnse) {
                    console.log(resopnse)
                },
                error: function(resopnse) {console.log("miss")}
            }
        );
    }

    stand(){
        $.ajax(
            {
                url: '/player_input',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({
                    is_hit: false,
                    is_stand: true,
                    player_id: this.id
                }),
                success: function(resopnse) {
                    console.log(resopnse)
                },
                error: function(resopnse) {console.log("miss")}
            }
        );
    }
}

let player = new Player("nick")