const { responseObj } = require('./util/helper');
const { q, clientQuery } = require('./util/connection');

exports.handler = async (event, context) => {
    try {
        let posts = await clientQuery.query(
            q.Map(
                q.Paginate(q.Documents(q.Collection('posts'))),
                q.Lambda(x => q.Get(x))
            )
        )
        return responseObj(200, posts);
    } catch (error) {
        console.log(error)
        return responseObj(500, error);
    }
};