import jwt from "jsonwebtoken";

const postAuthLogin = async (req, res, next) => {
  try {
    const userExist = await UserModel.findOne({ userName: req.body.userName });
    if (!userExist) {
      const user = await UserModel.create({
        userName: req.body.userName,
        password: req.body.password,
        userType: req.body.userType,
      });
      if (user) {
        const token = {
          _id: user._id,
        };
        const encToken = jwt.sign(token, process.env.JWT_SECRET_TOKEN);

        res
          .status(200)
          .cookie("USER_TOKEN", encToken, {
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
            secure: false,
            httpOnly: true,
            sameSite: "lax",
            path: "/",
            domain: DOMAIN,
            overwrite: true,
          })
          .json({
            type: REGISTERED,
            errors: [],
            message: "New User Created",
            data: {
              userName: user.userName,
              password: user.password,
              userType: user.userType,
            },
          });
      } else {
        res.status(401).json({
          type: FAILURE,
          errors: [],
          message: "User not created or does not exist",
        });
      }
    }

    // IF user is registered and has updated his details
    if (userExist && userExist.userName) {
      const token = {
        _id: userExist._id,
      };
      const encToken = jwt.sign(token, process.env.JWT_SECRET_TOKEN);
      res
        .status(200)
        .cookie("USER_TOKEN", encToken, {
          expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
          secure: false,
          httpOnly: true,
          sameSite: "lax",
          path: "/",
          domain: DOMAIN,
          overwrite: true,
        })
        .json({
          type: LOGGEDIN,
          errors: [],
          message: "User already exists, logged in successfully",
          data: {
            userName: userExist.userName,
            password: userExist.password,
            userType: userExist.userType,
          },
        });
    }
  } catch (error) {
    next(error, req, res, next);
  }
};

export { postAuthLogin };
