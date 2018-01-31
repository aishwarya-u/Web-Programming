var fs = require('fs');

var textMetrics = exports = module.exports;

textMetrics.simplify = (text)=> {
    if (!text) {
        throw "Invalid input.";
     }
        
    var processedText = text.split("\t");
	text = processedText.join(" ");

var processedText1 = text.split("\n");
text = processedText1.join(" ");



var processedText_lower = "";
   for(let i=0; i<text.length; i++)
   {
       if((text.charCodeAt(i)>= 48 && text.charCodeAt(i) <=57)||(text.charCodeAt(i)>= 65 && text.charCodeAt(i) <=90)|| (text.charCodeAt(i)>= 90 && text.charCodeAt(i) <=122) || (String.fromCharCode(text.charCodeAt(i)) == '\t') ||(String.fromCharCode(text.charCodeAt(i))==' ') || (text.charCodeAt(i) == 10))
       {
        processedText_lower = processedText_lower.concat(String.fromCharCode(text.charCodeAt(i)));
       }
   }

var final_text = processedText_lower.toLocaleLowerCase();

    return final_text;
},

textMetrics.createMetrics = (text) => {
	
	if(typeof(text) !== 'string' || text == null || text === undefined || !text)
	{
		throw "The text should not be null and empty";
	}
	
	var result = {};
	let simplifytext=textMetrics.simplify(text);
	var LetterCount = simplifytext.replace(/[^A-Z0-9]/gi, "").length;
	result["totalLetters"] = LetterCount;
	var words = simplifytext.split(/\s+/);
	var numOfWords = words.length;
	result["totalWords"] = numOfWords;
	var wordsSpl = [];
	var wordOccur = {};
	var numofUniqueWords = 0;
	var numofLongWords = 0;
	words.forEach((item) => {
		wordsSpl.push(item.replace(/[^A-Z0-9]/gi, ""));
	});
	
	wordsSpl.forEach((item) => {
		var available = false;
		for (var key in wordOccur) {
			if(item.toLowerCase() == key)
			{
				wordOccur[key] = wordOccur[key]+1;
				available = true;
			}
		}
		if(!available)
		{
			wordOccur[item.toLowerCase()] = 1;
		}
	});
	
	
	for(var key in wordOccur)
	{
		
		numofUniqueWords++;
		if(key.length > 5)
		{
			numofLongWords = numofLongWords+wordOccur[key];
		}
	}
	
	result["uniqueWords"] = numofUniqueWords;
	
	result["longWords"] = numofLongWords;
	var avgWordLen = (numOfLetters/numOfWords);
	
	result["averageWordLength"] = avgWordLen;
	var textCopy = simplifytext;
	var sentences = textCopy.split(/[.|?|!]+/g);
	
	result["wordOccurrences"] = wordOccur;
	
	return result;
	
};

