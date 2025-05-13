// CHAIN OF RESPONSIBILITY PATTERN:
// The Chain of Responsibility (CoR) is a behavioral design pattern that allows multiple objects 
// to handle a request without the sender knowing which object will handle it. 
// Instead of directly assigning a handler, the pattern organizes handlers into a chain, 
// where each handler has a chance to process the request or pass it along to the next handler in the chain.

// This pattern is useful for decoupling the sender and receiver of a request,

type RequestType = "help" | "feedback";

interface Request {
    type: RequestType;
}

class Handler {
    private succesor: Handler;
    handle(request: Request): void {
        if (this.succesor){
            this.succesor.handle(request)
        }
    }
}

class Helper extends Handler {
    handle(request: Request): void {
        if (request.type === "help"){
            // Show help information
        } else {
            super.handle(request)
        }
    }
}

class FeedbackHandler extends Handler {
    handle(request: Request): void {
       if (request.type === "feedback"){
            // Prompt for feedback
       } else {
            super.handle(request);
       }
    }
}

// Conclusion:
// The chain of responsibility decouples the connection between objects,
// that issue the request and logic that handles those requests.
// The sender assumes that its request could,
// but not necesarilly, be properly handled without knowing the details.