import express  from "express";
import userSchema from "../models/userSchema";
import mongoose from "mongoose";

const router = express();

router.get("/:email?/:phoneNumber?", async (req, res) => {
    const email = req.params.email;
    const phoneNumberValue = req.params.phoneNumber;
    let users = null;


    if(email === undefined && phoneNumberValue === undefined) {
        users = await userSchema.find();
        res.json(users);
    } else if (email !== undefined || phoneNumberValue === undefined) {
        users = await userSchema.find({email: email});
        res.json(users);
    } else if (email === undefined || phoneNumberValue !== undefined) {
        users = await userSchema.find({value: phoneNumberValue});
        res.json(users);
    } else {
        users = await userSchema.find( {email:email} && {value: phoneNumberValue});
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
                phoneNumber: {value: req.body.value}
            },
        }
    );
    updateUser?.save().then(() => {
        res.json(updateUser);
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