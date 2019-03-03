const AWS = require("aws-sdk");
const uuidv4 = require('uuid/v4');

const docClient = new AWS.DynamoDB.DocumentClient({region: "us-east-2"});

exports.handler = (event, context, callback) => {
    const userId = uuidv4();
    const userName = event.userName;
    const userEmail = event.request.userAttributes.email;
    const item = {
        user_id: userId,
        username: userName,
        email: userEmail
    };
    const params = {
        TableName: 'test-deploy-users',
        Item: item
    };
    docClient.put(params, (err, data) => {
        if (err) {
            console.log(err);
            return callback(err, event);
        } else {
            return callback(null, event);
        }
    });
};