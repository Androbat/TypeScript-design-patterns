// To have a better undestanding of the differences between <Promises> and traditional callbacks,
// consider:

// Callback chain
function process(callback){
    stepOne((error) => {
        if (error){
            callback(error);
            return;
        }
    })

    stepTwo((resultOne, (error, resultTwo)) =>{
        if (error){
            callback(error);
            return;
        }
    })

    callback(undefined, resultTwo + 1);
}


// Promise style
function processWithPromise(){
    return stepOne()
            .then((result) => stepTwo(result))
            .then((result) => result + 1);
}


// Promisifying existing modules / libraries
import  * as FS from "fs";

FS.readFile("some-file.txt", "utf8", (error, text) => {
    if (error){
        console.error(error);
        return;
    }
})

// Promise style
FS.readFile("some-file.txt", "utf-8")
  .then((text) => console.log("context", text))
  .catch(reason => console.error(reason));

// Implementation of the promised style read file
function readFile(path: string, options: any): Promise<string> { // Don't use any, anywhere in practice
    return new Promise((resolve, reject) => {
        FS.readFile(path, options, (error, result) => {
            if (error){
                reject(error);
            } else {
                resolve(result);
            }
        })
    })
}