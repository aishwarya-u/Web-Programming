
const textMetric_call = require("./textMetrics");
const inputData = require("./fileData");
let fileExists = require('file-exists');

let checkFilePresence = (path) => {
    try{
        if(fileExists(path))
            return true;
        else
            return false; 
    }catch (err){
        return false;
    }
}

let readFileChapter1 = inputData.getFileAsJSON('Chapter1.result.json');
readFileChapter1.then((inputData) =>  { 
    console.log(inputData);
} , (error) => {
    let chapterData = inputData.getFileAsString("chapter1.txt");
    chapterData.then((chapter1data) => {
        console.log("Reading CHAPTER1.txt\n");
        //console.log(textMetric_call.createMetrics(chapter1data));
        let simplifytext = textMetric_call.simplify(chapter1data);
        inputData.saveStringToFile("chapter1.debug.txt", simplifytext);
		console.log("Chapter 1 Reading DONE\n");
		console.log("Please see the result in Chapter1.result.json\n");
		return simplifytext;
    }).then((chapter1data) => {
        
        let object = textMetric_call.createMetrics(chapter1data);
        inputData.saveJSONToFile("Chapter1.result.json", object);
    })
})

let readFileChapter2 = inputData.getFileAsJSON('Chapter2.result.json');
readFileChapter2.then((inputData) =>  { 
    console.log(inputData);
} , (error) => { 
    let chapterData1 = inputData.getFileAsString("chapter2.txt");
    chapterData1.then((chapter2data) => {
        console.log("Reading CHAPTER2.txt\n");
        let simplifytext = textMetric_call.simplify(chapter2data);
        inputData.saveStringToFile("chapter2.debug.txt", simplifytext);
        console.log("Chapter 2 Reading DONE\n");
		console.log("Please see the result in Chapter2.result.json\n");
		return simplifytext;
    }).then((chapter2data) => {
        //console.log(inputData);
        let object = textMetric_call.createMetrics(chapter2data);
        inputData.saveJSONToFile("Chapter2.result.json", object);
    })
})

let readFileChapter3 = inputData.getFileAsJSON('Chapter3.result.json');
readFileChapter3.then((inputData) =>  { 
    console.log(inputData);
}, (error) => { 
    let chapterData2 = inputData.getFileAsString("chapter3.txt");
    chapterData2.then((chapter3data) => {
        console.log("Reading CHAPTER3.txt\n");
        let simplifytext = textMetric_call.simplify(chapter3data);
        inputData.saveStringToFile("chapter3.debug.txt", simplifytext);
        console.log("Chapter 3 Reading DONE\n");
		console.log("Please see the result in Chapter3.result.json\n");
		return simplifytext;
    }).then((chapter3data) => {
        let object = textMetric_call.createMetrics(chapter3data);
        inputData.saveJSONToFile("Chapter3.result.json", object);
    })
})




