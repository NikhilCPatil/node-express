

exports.config = () => {
    return {
        app:{
            port : 3000,
            host : "localhost"
        },
        db: {
            host: "localhost",
            database: "liquidity",
            port: 27017,
            db_authSource: "test"
        },
        saltRounds: 10,
        jwt:"qwertyuiop"
    }
}