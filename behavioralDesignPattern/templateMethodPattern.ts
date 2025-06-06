// TEMPLATE METHOD PATTERN
// When we're talking about subclassing or inheriting, the building is usually built from
// the button up. Subclasses inherit the basis and then provide more.
// However, it could be useful to reverse the structure sometimes as well.

// A template method is an <Abstract method> (optionally with default implementation) and acts as
// a placeholder under the outline of a larger process.

// Participants:
// * Abstract class: TextReader -> defines the signatures of template methods, as well as the outline of
//                    algorithms that weave everything together
// * Concreate classes: AsciiTextReader, FileAsciiTextReader and HttpAsciiTextReader -> implements
//                      template methods defined in abstract classes. Typical concrete classes
//


import * as FS from "fs";
import * as request from "request";

abstract class TextReader {
    async readAllText(): Promise<string> {
        let bytes = await this.readAllText();
        let text  = this.decodeBytes(bytes);
        return text;
    }

    abstract async readAllBytes(): Promise<Buffer>;
    abstract decodeBytes(bytes: Buffer): string;
}

abstract class AsciiTextReader extends TextReader {
    decodeBytes(bytes: Buffer): string {
        return bytes.toString('ascii');
    
    }
}

class FileAsciiTextReader extends AsciiTextReader {
    constructor(public path: string){
        super();
    }

    async readAllBytes(): Promise<Buffer> {
        return new Promise<Buffer>((resolve, reject) => {
            FS.readFile(this.path, (error, bytes) => {
                if (error){
                    reject(error);
                } else {
                    resolve(bytes);
                }
            });
        });
    }
}

class HttpAsciiTextReader extends AsciiTextReader {
    constructor( public url: string){
        super();
    }

    async readAllBytes(): Promise<Buffer> {
        return new Promise<Buffer>((resolve, reject) => {
            request(this.url, {
                encoding: null
            }, (error, bytes, body) => {
                if (error){
                    reject(error);
                } else {
                    resolve(body)
                }
            })
        })
    }
}
