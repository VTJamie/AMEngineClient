//
//  MercuryLoadedController.h
//  MercuryViewController
//
//  Created by Sudhakar Moparthy on 2/20/11.
//  Copyright 2011 AbbottWebDev. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "MercuryGridControl.h"

@interface MercuryLoadedController : NSObject <NSURLConnectionDelegate, NSURLConnectionDataDelegate> {

}


+ (void) testAlert: (NSString*) alertText;
+ (void) selectText: (NSArray*) controlviews;
+ (void) sendRequest:(NSDictionary*)postcriteria withURL:(NSString*) urlstring withTarget: (id) target andSelector: (SEL) afterloadselector;
+ (NSString*)readPlist:(NSString *)key;
+ (NSString*) concatDictionary:(NSDictionary*) dict withPairDelimiter:(NSString*) pairdelim andValueDelimiter:(NSString*) valuedelim;
+ (NSString*) encodeString:(NSString*) unencodedString;
@end

@interface MercuryNSURLDelegate : NSObject <NSURLConnectionDelegate, NSURLConnectionDataDelegate>
{
    NSMutableData* receivedData;
    id target;
    SEL finishloading;
}

@property (nonatomic, retain) NSMutableData* receivedData;
@property (nonatomic, retain) id target;
@property (nonatomic, assign) SEL finishloading;

- (id) initWithTarget: (id) intarget andSelector: (SEL) inselector;
@end
