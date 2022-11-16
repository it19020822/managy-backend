const jwt = require('jsonwebtoken');

function insertNewInvitation(payload) {
    return new Promise((resolve, reject) => {
        Invite.findOne({
            email: payload.email
        }).then((doc) => {
            if (doc) {
                console.log("Email Already Exist");
                reject("Email Already Exist");
            } else {
                const invitationVerifyToken = jwt.sign({
                    email: payload.email
                }, "pwd_key");
                const data = { ...payload, invitationVerifyToken: invitationVerifyToken }
                const newInvite = new Invite(data);
                newInvite.save()
                    .then((invitation) => {
                        console.log("saved");
                        const verifyLink = `${BACKEND_DEP_URL}/invite/invitationVerifyToken/${invitation.invitationVerifyToken}`
                        const details = {
                            email: invitation.email,
                            verifyLink: verifyLink
                        }
                        sendMail(
                            invitation.email,
                            INVITATION_TEMPLATE_ID,
                            details,
                        ).then((doc) => { resolve(doc) })
                            .catch((err) => {
                                console.log(err);
                                reject(err);
                            });
                        console.log("Email sent successfully");
                        resolve("Email sent successfully");
                    })
                    .catch((err) => {
                        console.log(err);
                        reject(err);
                    })
            }
        }).catch((err) => {
            reject(err);
        })
    })
}


async function verifyInviteToken(invitationVerifyToken) {
    try {
        const token = jwt.decode(invitationVerifyToken);
        if (token != null) {
            const doc = await Invite.findOne({ email: token.email }, '_id email invitationVerifyToken createdAt updatedAt');
            if (invitationVerifyToken == doc.invitationVerifyToken) {
                const updatePwdToken = await Invite.updateOne({ _id: doc._id }, { invitationVerifyToken: "verified" })
                if (updatePwdToken) {
                    return ({ id: doc._id, message: "succesfully verified", email: token?.email })
                }
            } else {
                if (doc.invitationVerifyToken === "verified") {
                    const message = "token is verified"
                    return ({ message: message, email: token?.email })
                } else {
                    if (doc.invitationVerifyToken === "null") {
                        const message = "token is null"
                        return message
                    }
                }
            }
        } else {
            const message = "invalid token"
            return message
        }
    } catch (error) {
        return error
    }
}

module.exports = {
    insertNewInvitation,
    verifyInviteToken
}