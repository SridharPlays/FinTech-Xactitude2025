const mongoose = require("mongoose");

export const signup = async (req, res) => {
    const { fullName, email, password } = req.body;
    try {
        if (!fullName && !email && !password) {
            return res.status(400).json({ message: "All Fields are Required!" });
        }
        if (password.length < 6) {
            return res.status(400).json({ message: "Password Must Contain Atleast 6 Characters! " });
        }
        const user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: "User Already Exist" });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullName,
            email,
            password: hashedPassword
        });
    } catch (error) {
        console.log("Error in signup Controller", error.message);
        res.status(500).json({ message: "Internal Server Error " });
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid Credentials! " });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid Credentials! " });
        }

        res.status(200).json({ _id: user._id, fullName: user.fullName, email: user.email, profilePic: user.profilePic });

    } catch (error) {
        console.log("Error in Login Controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
