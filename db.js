var mysql = require('mysql');

//Database Management Class

 class DB{
    constructor (host,user,password){
        this.con = null;
        this.initDB(host,user,password);

    }

    //Creating SQL Connection

    initDB(Host,User,Password){
        this.con = mysql.createConnection({
            host: Host,
            user: User,
            password: Password
          });

          this.con.connect(function(err) {
            if (err) throw err;
            console.log("Connected!");
          });  

    }

    async getMovies(){
        return new Promise((resolve, reject) =>{
            this.con.query("SELECT * FROM moviedatabase.movies", function (err, result, fields) {
                if (err){
                    console.log(err);
                    reject(err.sqlMessage);
                }
                console.log("from db.js",result);
                resolve(result);
              })
        })
       
        
    }


}

module.exports = { DB}