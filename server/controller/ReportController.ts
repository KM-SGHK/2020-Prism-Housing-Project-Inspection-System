import {ReportService} from '../service/ReportService'
import {Request, Response} from 'express'

// 20200808 For Doc Generation
import path from 'path';
import fs from "fs";
import { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, WidthType, Header, HeadingLevel, AlignmentType} from "docx";
import moment from 'moment';

export class ReportController{
    constructor (private reportService: ReportService) {}

     // 20200724-E1: Dev-Report 1-Ming
    getUrgencyLevelsReport=async(req:Request, res:Response)=>{
        try{
            const result: any []= await this.reportService.getUrgencyLevelsReport()
            // result: array object
            let urgency_notSerious=0
            let urgency_moderate=0
            let urgency_serious=0

           for(let i=0;i<result.length; i++){
               if(parseInt(result[i].count)<=5){
                    urgency_notSerious+=1
               }else if(parseInt(result[i].count)>=6 && parseInt(result[i].count)<=10){
                   urgency_moderate+=1
               }else if(parseInt(result[i].count)>=11){
                urgency_serious+=1
               }
           }

           let final_result={type1:urgency_notSerious, type2: urgency_moderate, type3: urgency_serious}
            res.json(final_result);
            console.log(final_result)
        }catch (e) {
            console.log("---------------------------------------------------------------------")
            console.error(e.message)
            res.status(500).json({message: 'haleiluya01'})
        }
    }

    getDefectedFlatNumberbyFlatType=async(req:Request, res:Response)=>{
        try{
            const result= await this.reportService.getDefectedFlatNumberbyFlatType()
            
            let final_result={}
            
            for(let i=0; i<result.length; i++){
            
            final_result[`flatType${i}`]=result[i].count}

            res.json(final_result);

            console.log(result)
        }catch (e) {
            console.log("---------------------------------------------------------------------")
            console.error(e.message)
            res.status(500).json({message: 'haleiluya02'})
        }
    }



    getType1FlatInfo=async(req:Request, res:Response)=>{
        try{
            const result= await this.reportService.getType1FlatInfo()
            res.json(result);
            console.log(result)
        }catch (e) {
            console.log("---------------------------------------------------------------------")
            console.error(e.message)
            res.status(500).json({message: 'haleiluya03'})
        }
    }

    
    getType1FlatInfoRN=async(req:Request, res:Response)=>{
        try{
            const flat1Result1= await this.reportService.getType1FlatInfoRN1()
            const flat1Result2= await this.reportService.getType1FlatInfoRN2()
            const flat1Result3= await this.reportService.getType1FlatInfoRN3()

            const flat2Result1= await this.reportService.getType2FlatInfoRN1()
            const flat2Result2= await this.reportService.getType2FlatInfoRN2()
            const flat2Result3= await this.reportService.getType2FlatInfoRN3()

            const flat3Result1= await this.reportService.getType3FlatInfoRN1()
            const flat3Result2= await this.reportService.getType3FlatInfoRN2()
            const flat3Result3= await this.reportService.getType3FlatInfoRN3()

            const flat4Result1= await this.reportService.getType4FlatInfoRN1()
            const flat4Result2= await this.reportService.getType4FlatInfoRN2()
            const flat4Result3= await this.reportService.getType4FlatInfoRN3()

            console.log(flat1Result3)

            let final_result={
                Flat1NotSoSerious:flat1Result1.length,
                Flat1Moderate: flat1Result2.length,
                Flat1Serious: flat1Result3.length, 
            
                Flat2NotSoSerious:flat2Result1.length,
                Flat2Moderate: flat2Result2.length,
                Flat2Serious: flat2Result3.length, 

                Flat3NotSoSerious:flat3Result1.length,
                Flat3Moderate: flat3Result2.length,
                Flat3Serious: flat3Result3.length, 

                Flat4NotSoSerious:flat4Result1.length,
                Flat4Moderate: flat4Result2.length,
                Flat4Serious: flat4Result3.length, 
            }

            res.json(final_result);
            console.log(final_result)
        }catch (e) {
            console.log("---------------------------------------------------------------------")
            console.error(e.message)
            res.status(500).json({message: 'haleiluya035'})
        }
    }

    getSubcontractorPerformance=async(req:Request, res:Response)=>{
        try{
            const result= await this.reportService.getSubcontractorPerformance()
            res.json(result);
            console.log(result)
        }catch (e) {
            console.log("---------------------------------------------------------------------")
            console.error(e.message)
            res.status(500).json({message: 'haleiluya04'})
        }
    }

    getInspectionProgressInfo=async(req:Request, res:Response)=>{
            try{
                const result= await this.reportService.getInspectionProgressInfo()
                res.json(result);
                console.log(result)
            }catch (e) {
                console.log("---------------------------------------------------------------------")
                console.error(e.message)
                res.status(500).json({message: 'haleiluya05'})
            }
        }

     //20200802-On Report Doc Generation

    // Step 1: Check Flat availability for report generation

    checkFlatsForReports = async (req: Request, res: Response) => {
        try {
            const results = await this.reportService.checkFlatsForReports()
            console.log(results)
            // console.log(parseInt(results[0].totalNumber_inspectedDefects)/parseInt(results[0].totalNumber_allDefects))

            let newResults = []

            for (let result of results) {
                // console.log("TESTING!!"+parseInt(result.totalNumber_InspectedDefects,10))
                let progress = parseInt(result.totalNumber_inspectedDefects) / parseInt(result.totalNumber_allDefects)
                // console.log("Testing in the mid way"+progress)
                // console.log('testing'+progress)
                if (progress >= 0.421) {
                    newResults.push(result)
                }

            }

            // console.log(newResults.length)
            res.json(newResults);

            // console.log("finalTesting"+newResult)
        } catch (e) {
            console.log("---------------------------------------------------------------------")
            console.error(e.message)
            res.status(500).json({ message: 'haleiluya06' })
        }
    }

    checkFlatReportReadyRate = async (req: Request, res: Response) => {
        try {
            
            const result=await this.reportService.checkFlatReportReadyRate()
            // res.json({ message: "hello, world" });
            res.json(result)

        } catch (e) {
            console.log("---------------------------------------------------------------------")
            console.error(e.message)
            res.status(500).json({ message: 'haleiluya05' })
        }
    }

    //Step 2: Creating Doc

    createReportDocForDownLoading = async (req: Request, res: Response) => {
        try {

            // console.log("test1")
            let flatID = parseInt(req.params.flatID)
            console.log("testing flatID")
            console.log(flatID)
            const result: any = await this.reportService.checkDocAvailability(flatID)

            console.log(result)

            if (result.reportReady === null) {

                // 2.1. preparing for the doc-Getting space id for each flat

                const spacesID = await this.reportService.getFlatSpaceId(flatID)
                //with space name info
                console.log("Testing spaceID")
                console.log(spacesID)

                let flatInspectionData: any[] = []

                for (let spaceID of spacesID) {
                    console.log(spaceID.id)
                    const featuresID = await this.reportService.getSpaceFeatureId(spaceID.id)
                    flatInspectionData.push(featuresID)
                }

                // console.log("testing featureID")
                // console.log(flatInspectionData)

                let allDataforFlatspaces = {}
                let allRecordsWithFeaturesForEachSpace: any[] = []

                // flatInspectionData.length=features of the all the flat's spaces
                // flatInspectionData[0].length=features of each space
                for (let i = 0; i < (flatInspectionData.length - 1); i++) {
                    // if (flatInspectionData[i].indexOf(i)>-1) {
                    allRecordsWithFeaturesForEachSpace = []
                    console.log(flatInspectionData[i])

                    // All spaces in a flat
                    for (let y = 0; y < flatInspectionData[y].length; y++) {

                        console.log("testing length")
                        console.log(flatInspectionData[y].length)
                        // Each single space in a flat

                        console.log("testing feature ID")
                        console.log(flatInspectionData[i][y].id)
                        let eachSpaceFeatureID = flatInspectionData[i][y].id

                        const recordsForEachSpaceFeature = await this.reportService.getFeatureRecords(eachSpaceFeatureID)
                        console.log(recordsForEachSpaceFeature)

                        // each feature holding defect records
                        let groupFeatureRecords = {}

                        for (let item of recordsForEachSpaceFeature) {
                            const { defect_name, record_id, record_illustration, record_inspectorName, record_inspection_date } = item
                            const records = { defect_name, record_id, record_illustration, record_inspectorName, record_inspection_date }
                            console.log("testing item")
                            console.log(item)

                            // console.log("Testing Records")
                            // console.log(records)

                            if (groupFeatureRecords[eachSpaceFeatureID]) {
                                groupFeatureRecords[eachSpaceFeatureID].records.push(records)
                            } else {
                                groupFeatureRecords[eachSpaceFeatureID] = {
                                    feature_id: item.feature_id,
                                    feature_name: item.feature_name,
                                    records: [records]
                                }
                            }

                        }
                        console.log("testing groupFeatureRecords")
                        console.log(groupFeatureRecords)
                        if (groupFeatureRecords[eachSpaceFeatureID]) {
                            allRecordsWithFeaturesForEachSpace.push(groupFeatureRecords)
                            console.log(`testing ${y}`)
                            console.log(allRecordsWithFeaturesForEachSpace)
                        }

                        // console.log("Testing second push")
                        // console.log(JSON.stringify(Object.values(groupFeatureRecords)))
                    }



                    console.log(allRecordsWithFeaturesForEachSpace)
                    console.log(allRecordsWithFeaturesForEachSpace.length)

                    //整全屋data
                    allDataforFlatspaces[i] = allRecordsWithFeaturesForEachSpace



                    // 2.2.1. data 用Object.values(allDataforFlatspaces)黎拎
                    // console.log("Testing packed data")
                    // console.log(allDataforFlatspaces)
                    console.log(JSON.stringify(Object.values(allDataforFlatspaces)))
                    // console.log(Object.values(allDataforFlatspaces).length)

                }


                //2.2. Creating Doc

                let data: any[] = Object.values(allDataforFlatspaces)
                console.log("Testing 1: data")
                console.log(data)



                const doc = new Document();

                // 2.2.1. loop sapce data
                for (let i = 0; i < data.length; i++) {
                    console.log(`Testing ${i}`)
                    console.log(data.length)
                    console.log(spacesID[i].space)

                    let tables: any[]=[]

                    // loop each space's feature data
                    for (let y = 0; y < data[i].length; y++) {
                        // DOC_B: Set the Feature Title
                        if (data[i][y][flatInspectionData[i][y].id.toString()]) {
                            let feature_subtitle=new Paragraph({
                                        children: [
                                            new TextRun({
                                                text: `\t${i + 1}.${y + 1}`,
                                                bold: true,
                                            }),
                                            new TextRun({
                                                text: `\t${data[i][y][flatInspectionData[i][y].id.toString()].feature_name}`,
                                                bold: true,
                                            }),
                                        ],
                                        heading: HeadingLevel.HEADING_5,
                                        spacing: {
                                            before: 100,
                                            after: 100, 
                                        }
                                    })
                             

                            let arrForTable_byEachSpaceFeatureRecords: any[] = [-1]

                            for (let x = 0; x < data[i][y][flatInspectionData[i][y].id.toString()].records.length; x++) {

                                arrForTable_byEachSpaceFeatureRecords.push(x)


                                // console.log(`Testing ${x}`)
                                // console.log(data[i].length)
                                // console.log("testing during for-loop")
                                // console.log(arrForTable_byEachSpaceFeatureRecords)
                                // DOC_B: Set the Feature Title
                            }


                            console.log("testing after for-loop,Each space feature records")
                            console.log(arrForTable_byEachSpaceFeatureRecords)

                            //array 為record 數目，決定table有幾多行
                            if (data[i][y][flatInspectionData[i][y].id.toString()]) {
                                let table = new Table({
                                    alignment: AlignmentType.CENTER,
                                    // @ts-ignore
                                    rows:
                                        arrForTable_byEachSpaceFeatureRecords.map(num => {
                                        
                                            //if(data[i][y]){

                                            if(num===-1){
                                                return new TableRow({
                                                    children: [
                                                        new TableCell({
                                                            children: [new Paragraph("A. 問題名稱")],
                                                            margins: {
                                                                top: 150,
                                                                bottom: 150,
                                                                left: 150,
                                                                right: 150,
                                                            },
                                                        }),
                                                        new TableCell({
                                                            children: [new Paragraph("B. 記錄編號")],
                                                            margins: {
                                                                top: 150,
                                                                bottom: 150,
                                                                left: 150,
                                                                right: 150,
                                                            },
                                                        }),
                                                        new TableCell({
                                                            children: [new Paragraph("C. 記錄內容")],
                                                            margins: {
                                                                top: 150,
                                                                bottom: 150,
                                                                left: 150,
                                                                right: 150,
                                                            },
                                                        }),
                                                        new TableCell({
                                                            children: [new Paragraph("D. 記錄人員")],
                                                            margins: {
                                                                top: 150,
                                                                bottom: 150,
                                                                left: 150,
                                                                right: 150,
                                                            },
                                                        }),
                                                        new TableCell({
                                                            children: [new Paragraph("E. 記錄時間")],
                                                            margins: {
                                                                top: 150,
                                                                bottom: 150,
                                                                left: 150,
                                                                right: 150,
                                                            },
                                                        }),
                                                    ],
                                                })
                                            }else if(num>-1){
                                                console.log(i)
                                                console.log(y)
                                                console.log(flatInspectionData[i][y].id.toString())
                                                console.log(data[i][y][flatInspectionData[i][y].id.toString()].records[num].defect_name)
                                                return new TableRow({
                                                    children: [
                                                        new TableCell({
                                                            children: [new Paragraph(`${num+1}. ${data[i][y][flatInspectionData[i][y].id.toString()].records[num].defect_name}`)],
                                                            margins: {
                                                                top: 150,
                                                                bottom: 150,
                                                                left: 150,
                                                                right: 150,
                                                            },
                                                        }),
                                                        new TableCell({
                                                            children: [new Paragraph(`${data[i][y][flatInspectionData[i][y].id.toString()].records[num].record_id}`)],
                                                            margins: {
                                                                top: 150,
                                                                bottom: 150,
                                                                left: 150,
                                                                right: 150,
                                                            },
                                                        }),
                                                        new TableCell({
                                                            children: [new Paragraph(`${data[i][y][flatInspectionData[i][y].id.toString()].records[num].record_illustration}`)],
                                                            margins: {
                                                                top: 150,
                                                                bottom: 150,
                                                                left: 150,
                                                                right: 150,
                                                            },
                                                        }),
                                                        new TableCell({
                                                            children: [new Paragraph(`${data[i][y][flatInspectionData[i][y].id.toString()].records[num].record_inspectorName}`)],
                                                            margins: {
                                                                top: 150,
                                                                bottom: 150,
                                                                left: 150,
                                                                right: 150,
                                                            },
                                                        }),
                                                        new TableCell({
                                                            children: [new Paragraph(`${moment(data[i][y][flatInspectionData[i][y].id.toString()].records[num].record_inspection_date).format("dddd, MMMM Do YYYY, h:mm")}`)],
                                                            margins: {
                                                                top: 150,
                                                                bottom: 150,
                                                                left: 150,
                                                                right: 150,
                                                            },
                                                        }),
                                                    ],
                                                })
                                            }else{
                                                return
                                            }

                                            // 每一行幾多格，load 幾多行

                                        }),
                                    // @ts-ignore
                                    cantSplit: true,
                                    width: {
                                        size: 98,
                                        type: WidthType.PERCENTAGE,
                                    }

                                });

                                tables.push(feature_subtitle)
                                tables.push(table)


                                
                            }
                        }
                    }
                    // DOC_C: Set the Table in the Doc
                                // DOC_A: Set the Space title
                                doc.addSection({
                                    properties: {},
                                    headers: {
                                        default: new Header({
                                            children: [new Paragraph(`${result.floor}${result.room}單位檢驗報告 ${i+1}/${data.length}`)],
                                        }),
                                    },
                                    children: [
                                        new Paragraph({
                                            text: `${result.floor}${result.room}單位檢驗報告`,
                                            // @ts-ignore
                                            heading: HeadingLevel.HEADING_1,
                                            // @ts-ignore
                                            alignment: AlignmentType.CENTER,
                                        }),
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: `\t${i + 1}`,
                                                    bold: true,
                                                }),
                                                new TextRun({
                                                    text: `\t${spacesID[i].space}`,
                                                    bold: true,
                                                }),
                                            ],
                                            heading: HeadingLevel.HEADING_3,
                                            // @ts-ignore
                                           spacing: {
                                               before: 55,
                                           }
                                        }),
                                        ...tables
                                    ],
                                });

                }


                const buffer = await Packer.toBuffer(doc);
                //   console.log("this is buffer")
                //   console.log(buffer)
                const STORAGE_FOLDER = path.join(__dirname, "../protected_developer/inspectionDocument");
                fs.writeFileSync(path.join(STORAGE_FOLDER, `ReportForFlat${flatID}.docx`), buffer);
                //   res.json({ message: "hello, world" });
                res.download(path.join(STORAGE_FOLDER, `ReportForFlat${flatID}.docx`));

                await this.reportService.updateFlatsTable(flatID, `ReportForFlat${flatID}.docx`)

            } else if (result != null) {
                // console.log("Testing not Null")

                const STORAGE_FOLDER = path.join(__dirname, "../protected_developer/inspectionDocument");
                const fileName = await this.reportService.getDocFileName(flatID)

                res.download(path.join(STORAGE_FOLDER, fileName[0].reportReady));
            }


        } catch (e) {
            console.log("---------------------------------------------------------------------")
            console.error(e)
            res.status(500).json({ message: 'ohno' })
        }


    }
    

}