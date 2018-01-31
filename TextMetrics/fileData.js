var fs = require('fs');

var filedata = exports = module.exports;

filedata.getFileAsString = (path) => {
	
	return new Promise((fulfill,reject)=>{
	
		if(path == null || path === undefined || !path)
			reject("The path should not be empty or null");
	
		fs.readFile(path,"utf-8",(error,data)=>{
		
			if(error)
			{
				reject(error);
				return;
			}
			fulfill(data);
		});
	});
};

filedata.getFileAsJSON = (path) => {
	
	return filedata.getFileAsString(path).then((data)=>{
		try {
                var jsonData = JSON.parse(data);
				return jsonData;
            } catch (parsingError) {
                throw parsingError;
            }
	});
};

filedata.saveStringToFile = (path,text) => {
	
	return new Promise((fulfill,reject)=>{
		if(path == null || path === undefined || !path)
		{
			reject("The path should not be empty or null");
			return;
		}
		if(text == null || text === undefined || !text)
		{
			reject("The contents should not be empty or null");
			return;
		}
		
		fs.writeFile(path, text, (error, data) => {
            if (error) {
                reject(error);
                return;
            }

            fulfill(true);
        });
	});
};

filedata.saveJSONToFile = (path,obj) => {
	
	return new Promise((fulfill, reject) => {
        if(path == null || path === undefined || !path)
		{
			reject("The path should not be empty or null");
			return;
		}
		if(obj == null || obj === undefined || !obj)
		{
			reject("The contents should not be empty or null");
			return;
		}
		
        fs.writeFile(path, JSON.stringify(obj, null, 4), (error, data) => {
            if (error) {
                reject(error);
                return;
            }
            fulfill(true);
        });
    });
};

