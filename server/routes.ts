import express from 'express';
import {userController, floorPlanController} from './main';
import {flatController} from './main';
import {spaceController} from './main';
import {featureController} from './main';
import {recordController} from './main';
import {reportController} from './main';
// import { isLoggedIn_developer } from "./guard1";
// import { isLoggedIn_inspector } from "./guard2";

//20200727-P2E-WEB Login
import {webUserController} from './main';

//20200722-E1
import { ROLES } from './variables/general';


import {upload} from './main'
// import {isLoggedIn} from './guards'

export const routes = express.Router();

// User routes
//20200727-P2E-WEB Login & Logout
routes.post('/loginWEB', webUserController.login);
routes.get('/logout', webUserController.logout);


// 20200721-E1-RN Login
import { authController } from "./main"; 
routes.post('/login', authController.login);

import { createIsLoggedIn } from './guard';

//20200726-RN Login: for restore login
routes.get(
    '/user',
    createIsLoggedIn([ROLES.DEVELOPER, ROLES.INSPECTOR]),
    userController.getUserInfo
);

//Remarks: for setting roles' access power, adjust the array content. 

// routes.get('/logout', userController.logout);

// Flat routes
routes.get('/towers',flatController.searchTowers);
routes.get('/floors',flatController.searchFloors);
routes.get('/rooms',flatController.searchRooms);
routes.get('/types',flatController.searchTypes);
routes.get('/flats', flatController.searchFlats);

routes.get('/inspector/flats/:flatId', spaceController.showFlat);
routes.get('/inspector/flats/:flatId/spaces', spaceController.showSpaces);
routes.get('/inspector/flats/:flatId/floorPlan', spaceController.getFloorPlanByURL);

routes.get('/inspector/flats/:flatId/spaces/:spaceId', featureController.showFeatures);
routes.get('/inspectorV2/flats/:flatId/spaces/:spaceId', featureController.jasonTest);
routes.get('/inspector/flats/:flatId/spaces/:spaceId/features/:featureId', featureController.showDefects);
routes.get('/inspector/flats/:flatId/defects/:defectId', featureController.checkRecordExistence);

routes.get('/inspector/features/:featureId', featureController.getFeatureById);
routes.get('/inspector/defects/:defectId', featureController.getDefectById);

// Record routes
routes.get('/inspector/records/:flatId/:defectId', recordController.getRecordById);
routes.post('/newRecords', upload.single('image'), recordController.addRecord);
routes.put('/inspector/records/:recordId', upload.single('image'), recordController.updateRecord);
routes.delete('/inspector/records/:recordId', recordController.deleteRecord);
routes.get('/inspector/records/:flatId/:defectId/image', recordController.getImageByURL);

// Report routes
routes.get('/reports', reportController.getUrgencyLevelsReport);
routes.get('/reports_defectsbyFlatType', reportController.getDefectedFlatNumberbyFlatType);
routes.get('/reports_type1FlatDefects', reportController.getType1FlatInfo);
routes.get('/reports_type1FlatDefectsRN', reportController.getType1FlatInfoRN);
routes.get('/reports_subcontractorPerformance', reportController.getSubcontractorPerformance);
routes.get('/reports_inspectionProgress', reportController.getInspectionProgressInfo);
routes.get('/reports_FlatsReadyForReportsRatio', reportController.checkFlatReportReadyRate);
routes.get('/reports_checkFlatsForReports', reportController.checkFlatsForReports);
routes.get('/developer/reports_createFlatDoc/:flatID', reportController. createReportDocForDownLoading);


// FloorPlan routes
routes.get('/reports/flatId/:flatId/floorplan', floorPlanController.getFloorPlanRecords);
//20200802-Report Doc Generation



// routes.get('/reports', reportController.getDefectSummaryByFlatType);
// routes.get('/reports', reportController.getDefectSummarySubcontractor);
// routes.get('/reports', reportController.getProgressReport);