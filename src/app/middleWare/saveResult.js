module.exports = function(model, session){
    if (session.idUser) {
        model.findById(session.idUser)
        .then((Player) =>{
          if (Player.ath < session.checkPoint) {
                model.updateOne({_id: session.idUser}, {ath: session.checkPoint})
                .then((check)=>{
                })
                .catch((err) =>{
                })
              }
        })
      }
}