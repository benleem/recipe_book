const { requestObj, responseObj } = require('./util/helper');
const { q, clientQuery } = require('./util/connection');

exports.handler = async (event, context) =>{
    try {
        let postInfo = JSON.parse(event.body);
        let newPost= await clientQuery.query(q.Create(q.Collection('posts'), {
            data:{
                postInfo
            }
        }));
        return responseObj(200, newPost);
    } catch (error) {
        console.log(error);
        return responseObj(500, error);
    }
};