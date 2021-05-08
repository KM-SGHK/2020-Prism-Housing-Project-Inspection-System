import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import multer from 'multer';
import dotenv from 'dotenv';

//20200726-P2E
import expressSession from 'express-session';


// 20200721-E3
import cors from 'cors'
// import { Bearer } from 'permit'


dotenv.config();

// Initialize Knex, replace pg.client as connection to DB
import Knex from 'knex';
const knexConfig = require('./knexfile');
// const knex = 
const knex = Knex(knexConfig[process.env.NODE_ENV || "development"]);


//20200726-P2E
// Initialize Express.JS
const app = express();
app.use(expressSession({
    secret: 'Building Inspection Application',
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.use(bodyParser.urlencoded({ extended: true })); //只有req.body data
app.use(bodyParser.json()) //有req.body data 同 req.file

// 20200721-E4
app.use(cors({
    origin: [
      process.env.REACT_DOMAIN!
    ]
  }))



 //   20200721-E6, for defining the type of req.user
  import { IUser } from './service/models';
declare global {
    namespace Express {
        interface Request {
            user?: IUser;
        }
    }
}


// Set up Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '/protected_inspector/uploads/photos_defect_records')); //話俾multer聽files save係邊條path
    },
    filename: function (req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}.${file.mimetype.split('/')[1]}`); //唔想撞名，用現在時間重新改file名
    }
});
export const upload = multer({ storage });










/* ----------------------- 我是分隔線 ----------------------- */



// Initialize the controller and service for MVC architecture

//20200721-E1-RN LOGIN
import { UserService } from "./service/UserService";
// E1
import { AuthController } from "./controller/AuthController";

import { UserController } from "./controller/UserController";

export const userService = new UserService(knex);
export const userController = new UserController();
// E1
export const authController = new AuthController(userService)



//20200726-P2E-WEB LOGIN
// ming-login(1) login guard
import { isLoggedIn_developer } from "./guard1";
import { isLoggedIn_inspector } from "./guard2";

// ming-login(2) activate login service and controller
import { WEBUserController } from "./controller/WEBUserController";

// const userService = new UserService(knex);
export const webUserController = new WEBUserController(userService);




// flat routes
import { FlatService } from "./service/FlatService";
import { FlatController } from "./controller/FlatController";

const flatService = new FlatService(knex);
export const flatController = new FlatController(flatService);

// space routes
import { SpaceService } from "./service/SpaceService";
import { SpaceController } from "./controller/SpaceController";

const spaceService = new SpaceService(knex);
export const spaceController = new SpaceController(spaceService);

// feature routes
import { FeatureService } from "./service/FeatureService";
import { FeatureController } from "./controller/FeatureController";

const featureService = new FeatureService(knex);
export const featureController = new FeatureController(featureService);


// developer-report(1) basic setting
import { ReportService } from "./service/ReportService";
import { ReportController } from "./controller/ReportController"

const reportService = new ReportService(knex)
export const reportController = new ReportController(reportService)


// record routes
import { RecordService } from "./service/RecordService";
import { RecordController } from "./controller/RecordController";
const recordService = new RecordService(knex);
export const recordController = new RecordController(recordService);

import {FloorPlanService} from "./service/FloorPlanService";
import {FloorPlanController} from "./controller/FloorPlanController";
const floorPlanService = new FloorPlanService(knex);
export const floorPlanController = new FloorPlanController(floorPlanService);

// download本menu, 令你可以用controller同service既functions
import { routes } from './routes';
// const API_VERSION = process.env.API_VERSION || '/api/v1'; //精細啲寫條path, 確保唔會去錯route
// app.use(API_VERSION, routes) 
app.use("/", routes);



// import {isLoggedIn, checkRoleID} from './guard';
// import {ROLE_ID} from './variables';

// // login(4) access restrictions

//20200726-P2E
app.use(express.static("public"));

app.use('/developer', isLoggedIn_developer, express.static("protected_developer"));
// // app.use('/developer', isLoggedIn, checkRoleID(ROLE_ID.DEVELOPER), express.static("protected_developer"));
app.use('/inspector', isLoggedIn_inspector, express.static("protected_inspector"));
// Catch all errors 
app.use((req, res) => {
    res.sendFile(path.join(__dirname, "public/404.html"));
});


// Server listen to requests and feedback to client whether it is listening
const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}/`);
});
