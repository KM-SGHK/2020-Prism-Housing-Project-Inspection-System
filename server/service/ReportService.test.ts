// import Knex from "knex";
// const knexfile = require("../knexfile"); // Assuming you test case is inside `services/ folder`
// const knex = Knex(knexfile["test"]);

// import{ReportService} from "./ReportService";

// describe("ReportService", ()=>{
//     let reportService: ReportService;

//     beforeEach(async () => {
//         reportService = new ReportService(knex);
//         await knex("flats").del();
//         await knex.insert({
//             id: 1, 
//             room: "B",
//             floor: 3,
//             tower: 1,
//             size_in_sq_ft: 368,
//             type: " 1 B.R. with balcony",
//             is_inspected: true
//         }).into("records")
//     })

//     it('get inspection progress info', async ( )=>{
//         const result= await reportService.getInspectionProgressInfo();
//         expect(result.length).toBe(1)

//     });

//     afterAll(()=>{
//         knex.destroy();
//     });


// })

test('boring test', ()=>{
    const data=1
    const data2=data+1
    expect (data2).toEqual(2)
})
