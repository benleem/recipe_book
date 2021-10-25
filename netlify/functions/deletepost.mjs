const { requestObj, responseObj } = require('./util/helper');
const { q, clientQuery } = require('./util/connection');

exports.handler = async (event, context) =>{
    try {
        let body = JSON.parse(event.body);
        let deletePost= await clientQuery.query(q.Delete(q.Ref(q.Collection('posts'), body.id)));
        return responseObj(200, deletePost);
    } catch (error) {
        console.log(error);
        return responseObj(500, error);
    }
};