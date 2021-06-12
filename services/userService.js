const router = require("express").Router();
const User = require("../model/User");


const searchUser = async function (body) {
    let userName = body.name;
    let userContact = body.contact;
    let users;
    if ((!userName || userName === "") && (!userContact || userContact === "")) {
        return { "status": "error", response: { "message": "user name or contact is required" } };
    }
    else if ((userName && userName === "") || (userContact && userContact === "")) {
        return { "status": "error", response: { "message": "user name or contact is required" } };
    }

    if (userName && userContact) {
        let searchKey = new RegExp(userName, 'i')
        users = await User.find({ name: searchKey, contact: userContact });
    }
    else if (userName) {
        let searchKey = new RegExp(userName, 'i')
        users = await User.find({ name: searchKey });
    }
    else if (userContact) {
        users = await User.find({ contact: userContact });
    }
    return { "status": "success", "response": { "users": users } };
}

module.exports.searchUser = searchUser;