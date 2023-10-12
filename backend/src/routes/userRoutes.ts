import express  from "express";
import userSchema from "../models/userSchema";
import mongoose from "mongoose";

const router = express();

function escapeRegex(text: string) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

router.get("/", async (req, res) => {
    const {email, phoneNumber} = req.query;
    let users = null;
    if(email === "default") {
        email === undefined;
    }
    if(phoneNumber === "default") {
        phoneNumber === undefined;
    }
    const regexEmail = req.query.email && new RegExp(escapeRegex(req.query.email as string), 'gi');
    const regexPhoneNumber =req.query.phoneNumber && new RegExp(escapeRegex(req.query.phoneNumber as string), 'gi');

    if((email === undefined || email === "default") && (phoneNumber === undefined || phoneNumber === "default")) {
        users = await userSchema.find();
        res.json(users);
    } else if (email !== undefined && (phoneNumber === undefined || phoneNumber === "default")) {
        users = await userSchema.find({email: regexEmail});
        res.json(users);
    } else if ((email === undefined || email === "default") && phoneNumber !== undefined) {
        users = await userSchema.find({phoneNumber : {$elemMatch:{value: regexPhoneNumber}}} );
        res.json(users);
    } else {
        users = await userSchema.find( {$and: [ {email:regexEmail}, {phoneNumber : {$elemMatch:{value: regexPhoneNumber}}}]} );
        res.json(users);
    }
});

router.get("/:id", async (req, res) => {
    const _id = req.params.id;
    const user = await userSchema.findById(_id);
    res.json(user);
});

router.post("/", async (req, res) => {
    const user = new userSchema({
        _id: new mongoose.Types.ObjectId(),
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phoneNumber: [ 
            { numberType: "primary", 
            value:  req.body.value} 
        ]
    });
    user.save();
    res.json(user);
});

router.put("/:id", async (req, res) => {
    const updateUser = await userSchema.findByIdAndUpdate(
        {_id: req.params.id}, 
        {
            $set: {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                phoneNumber: req.body.value &&  [
                    { numberType: "primary", 
                    value: req.body.value }
                ]
            },
        }
    );
    updateUser?.save().then(async () => {
        const _id = req.params.id;
        const updatedUser = await userSchema.findById(_id);
        res.json(updatedUser);
    });
});
    
router.delete("/:id", async (req, res) => {
    const _id = req.params.id;
    try {
        const user = await userSchema.findByIdAndDelete(_id);
        res.json({ success: true, user });

    } catch (error) {
        res.status(500).json({ success: false, error: 'An error occurred' });
    }
})

module.exports = router;