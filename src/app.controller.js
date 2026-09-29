import { verifyNodeMailerTransporter } from "./config/mail.config.js";
import dbConnection  from "./DB/DBconnection.js";
import authRoutes from "./modules/auth/auth.routes.js";
import userRoutes from "./modules/user/user.routes.js";
import adminRoutes from "./modules/admin/admin.routes.js"
import { globalErrorHandler } from "./utils/errors/handling.errors.js";
import messageRoutes from "./modules/messages/message.routes.js";

const bootstrap = (app, express) => {
  app.use(express.json());

  dbConnection();
  verifyNodeMailerTransporter();
  
  app.get("/", (req, res) => {
    return res.status(200).json({message: "Sara7a application"});
  });
  app.use("/api/v1/auth", authRoutes);
  app.use("/api/v1/user", userRoutes);
  app.use("/api/v1/admin", adminRoutes);
  app.use("/api/v1/messages", messageRoutes)


  app.use(globalErrorHandler)
};

export default bootstrap;
