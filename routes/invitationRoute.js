const router = require('express').Router();
const inviteSchema = require('../models/invitationModel');
const { insertNewInvitation, verifyInviteToken } = require('../api/invitation.api')

/**
 * METHOD: POST
 * ACTION: INVITE USER VIA EMAIL
 */
router.post('/', (req, res) => {
    const validInvitation = validateInput(inviteSchema, req.body);
    console.log(validInvitation?.email);
    if (validInvitation.value) { //remove value
        console.log("in post")
        if (validInvitation?.email) {
            return res.status(403).json("email must be a valid email");
        }
    }
    insertNewInvitation(validInvitation).then((result) => {
        console.log("call insertNew")
        res.json(result);
    }).catch((err) => {
        res.status(400).json(err);
    });
})

router.get('/invitationVerifyToken/:token', async (req, res) => {
    try {
        const result = await verifyInviteToken(req.params.token)
        if (result === "invalid token" || result === "token is null") {
            res.status(400).json(result);
        } else {
            res.redirect(`${INVITATION_URL}?email=${result?.email}`);
        }
    }
    catch (error) {
        res.status(400).json(error);
    }
})

//Validate user's email address
const validateInput = (schema, data) => {
    const validInput = schema(data, { abortEarly: false });
    if (validInput.error) {
        return joiErrorFormatter(validInput.error);
    }
    return validInput;
}

const joiErrorFormatter = (RawErrors) => {
    const errors = {};
    const Details = RawErrors.details;

    Details.map((detail) => {
        errors[detail.path] = [detail.message];
    });
    return errors;
}

module.exports = router;