var schema = {
    username: { type: String, required: true },
    email: { type: String, required: true },
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    password: { type: String, required: true },
    followers: [
        {
            username: { type: String, required: true },
            followAt: { type: Date, default: Date.now }
        }
    ],
    following: [
        {
            username: { type: String, required: true },
            followAt: { type: Date, default: Date.now }
        }
    ]
}

module.exports = schema;