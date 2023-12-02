import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import otpGenerator from 'otp-generator';

/* REGISTER USER */
export const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      picturePath,
    } = req.body;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      picturePath,
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) return res.status(400).json({ msg: "User does not exist. " });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. " });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password;
    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};




export async function generateOTP(req,res){
  req.app.locals.OTP = await otpGenerator.generate(6, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false})
  res.status(201).send({ code: req.app.locals.OTP })
}



export async function verifyOTP(req,res){
  const { code } = req.query;
  if(parseInt(req.app.locals.OTP) === parseInt(code)){
      req.app.locals.OTP = null; // reset the OTP value
      req.app.locals.resetSession = true; // start session for reset password
      return res.status(201).send({ msg: 'Verify Successfully!'})
  }
  return res.status(400).send({ error: "Invalid OTP"});
}



export async function createResetSession(req,res){
 if(req.app.locals.resetSession){
      return res.status(201).send({ flag : req.app.locals.resetSession})
 }
 return res.status(440).send({error : "Session expired!"})
}



export async function resetPassword(req,res){
  try {
      
      if(!req.app.locals.resetSession) return res.status(440).send({error : "Session expired!"});

      const { email, password } = req.body;

      try {
          
          User.findOne({ email})
              .then(user => {
                  bcrypt.hash(password, 10)
                      .then(hashedPassword => {
                          User.updateOne({ email : user.email },
                          { password: hashedPassword}, function(err, data){
                              if(err) throw err;
                              req.app.locals.resetSession = false; // reset session
                              return res.status(201).send({ msg : "Record Updated...!"})
                          });
                      })
                      .catch( e => {
                          return res.status(500).send({
                              error : "Enable to hashed password"
                          })
                      })
              })
              .catch(error => {
                  return res.status(404).send({ error : "email not Found"});
              })

      } catch (error) {
          return res.status(500).send({ error })
      }

  } catch (error) {
      return res.status(401).send({ error })
  }
}
