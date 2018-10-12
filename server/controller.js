module.exports = {



    register: ( req, res, next ) => {
        const dbInstance = req.app.get('db');
        const {username, password} = req.body;
    
        dbInstance.register_user([ username, password])
          .then( () => res.sendStatus(200) )
          .catch( err => {
            res.status(500).send({errorMessage: "Oops! Something went wrong. Our engineers have been informed!"});
            console.log(err)
        } );
    },

    login: ( req, res, next ) => {
        const dbInstance = req.app.get('db');
        const {username, password} = req.body;
    
        dbInstance.login_user([ username, password])
          .then( userInfo => res.status(200).send( userInfo ))
          .catch( err => {
            res.status(500).send({errorMessage: "Oops! Something went wrong. Our engineers have been informed!"});
            console.log(err)
        } );
    },

    getPosts: async ( req, res, next ) => {
        const dbInstance = req.app.get('db');
        const { id } = req.params;
    
        dbInstance.get_posts([id])
          .then( posts => {
              res.status(200).send( posts ) })
          .catch( err => {
            res.status(500).send({errorMessage: "Oops! Something went wrong. Our engineers have been informed!"});
            console.log(err)
        } );
    }



}