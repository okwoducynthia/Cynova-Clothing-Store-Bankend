const userModel = require("../Models/UserModels");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const createToken = (_id: any) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET_KEY, { expiresIn: "1d" });
};

const GetAllUser = async (req: any, res: any) => {
  try {
    const user = await userModel.find().sort({ createdAt: -1 });
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({
      message: "Failed to fetch data",
    });
  }
};

const GetSingleUser = async (req: any, res: any) => {
  const { id } = req.params;
  try {
    const user = await userModel.findById(id);
    if (!user) {
      res.status(405).json({
        message: "Task not found",
      });
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(404).json({
      message: "Failed to fetch data",
    });
  }
};

const SignUpUser = async (req: any, res: any) => {
  const { firstName, lastName, phoneNumber, email, password } = req.body;
  try {
    // === To check if task exist in the DB ===
    const phoneExist = await userModel.findOne({ email });
    if (phoneExist) {
      res.status(405).json({
        message: "email already exist",
      });
    }

    //Validating email format & strong password
    if (!validator.isEmail(email)) {
      return res.json({
        message: "Please enter a valid email",
      });
    }
    if (password.length <= 5) {
      res.status(405).json({
        message: "password too short",
      });
    }

    //  === To create new task ===
    const createNewUser = new userModel({
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
    });

    // === To save everything in the req.body to the DB ===
    const userResult = await createNewUser.save();

    // Token
    const token = createToken(userResult._id);
    res.json({
      success: true,
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
      token,
    });
    // === To return data if successful ===
    // res.status(200).json(taskResult)

    // ** Alternative to the above **
    res.status(200).json({
      _id: userResult._id,
      firstName: userResult.firstName,
      lastName: userResult.lastName,
      email: userResult.email,
      phoneNumber: userResult.phoneNumber,
    });
  } catch (error) {
    res.status(404).json({
      message: "Failed to create user",
    });
  }
};

const UpdateSingleUser = async (req: any, res: any) => {
  const { id } = req.params;
  const { firstName, lastName, phoneNumber, password, email } = req.body;
  try {
    const user = await userModel.findById(id);
    if (!user) {
      res.status(405).json({
        message: "Task not found",
      });
    } else {
      user.firstName = firstName || user.firstName;
      user.lastName = lastName || user.lastName;
      user.email = email || user.email;
      user.phoneNumber = phoneNumber || user.phoneNumber;
      user.password = password || user.password;

      await user.save();
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(404).json({
      message: "Failed to update data",
    });
  }
};

const DeleteUser = async (req: any, res: any) => {
  const { id } = req.params;
  try {
    const user = await userModel.findByIdAndDelete(id);
    if (!user) {
      res.status(405).json({
        message: "user not found",
      });
    } else {
      res.status(200).json({
        message: "user deleted successfully",
      });
    }
  } catch (error) {
    res.status(404).json({
      message: "Failed to deleted user",
    });
  }
};

const LoginUser = async (req: any, res: any) => {
  const { email, password } = req.body;
  try {
    // === To check if task exist in the DB under task collection ===
    const userExist = await userModel.findOne({ email });
    if (!userExist) {
      return res.status(405).json({
        message: "user not found",
      });
    }

    const validPassword = await bcrypt.compare(password, userExist.password);
    if (validPassword) {
      const token = createToken(userExist._id);
      return res.status(405).json({
        message: "Log in successful",
        _id: userExist._id,
        firstName: userExist.firstName,
        lastName: userExist.lastName,
        phoneNumber: userExist.phoneNumber,
        email: userExist.email,
        token
      });
    }

    // === To return data if successful ===
    // res.status(200).json(taskResult)

    // ** Alternative to the above **
    // res.status(200).json({
    //     message: "Log in successful",
    //     _id: userExist._id,
    //    firstName: userExist.firstName,
    //     lastName: userExist.lastName,
    //     phoneNumber: userExist.phoneNumber,
    //     email: userExist.email,
    // });
  } catch (error) {
    res.status(404).json({
      message: "login error",
    });
  }
};

const adminLogin = async (req: any, res: any) => {};

module.exports = {
  GetAllUser,
  GetSingleUser,
  SignUpUser,
  UpdateSingleUser,
  DeleteUser,
  LoginUser,
  adminLogin,
};
