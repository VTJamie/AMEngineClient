//
//  AMEngineDataManager.h
//  Toy List
//
//  Created by Jamieson Abbott on 2/20/12.
//  Copyright (c) 2012 AM Interfaces. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface AMEngineDataManager : NSObject <NSURLConnectionDelegate, NSURLConnectionDataDelegate> 

@property (nonatomic, retain) NSMutableData* receivedData;
@property (nonatomic, retain) id target;
@property (nonatomic, assign) SEL finishloading;
@property (nonatomic, assign) BOOL transformtostring;
@property (nonatomic, retain) NSURLResponse* returnedresponse;

- (id) initWithTarget: (id) intarget andSelector: (SEL) inselector andTransformToString: (BOOL) intransformstring;
+ (AMEngineDataManager*) sendRequest:(NSDictionary*)postcriteria withTarget: (id) target andSelector: (SEL) afterloadselector;
+ (AMEngineDataManager*) sendRequest:(NSDictionary*)postcriteria withTarget: (id) target andSelector: (SEL) afterloadselector getString:(BOOL) transformtostring;
+ (NSString*) concatDictionary:(NSDictionary*) dict withPairDelimiter:(NSString*) pairdelim andValueDelimiter:(NSString*) valuedelim;
+ (NSString*) encodeString:(NSString*) unencodedString;
+ (void)registerDefaultsFromSettingsBundle;
+ (void) testAlert: (NSString*) alertText;
+ (NSString*) sendSynchronousRequest:(NSDictionary*)postcriteria;

@end
