import AuthService from "../../services/AuthService";

const signupWithOTP = async(req, res) =>{
    try{
        const {name, email, password} = req.body;
        const result = await AuthService.signupWithOTP(name, password, email);
        if(result.error){
            return res.status(400).json({message: result.error});
        }
        return res.status(200).json({message: result.error});
    }catch(error){
        console.log("Internal Server Error")
        return res.status(500).json({message: result.message})
    }
}

const verifyAccount = async (req, res) => {
    try {
     const { email, otp } = req.body;
      const result = await AuthService.verifyAccount(email, otp);
      return res.status(200).json({ message: result });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error.message });
    }
  };


export {signupWithOTP,
                verifyAccount,

};