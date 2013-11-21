//
//  AMEngineStaticVariables.h
//  AMEngine
//
//  Created by Jamieson Abbott on 3/13/12.
//  Copyright (c) 2012 AM Interfaces. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface AMEngineStaticVariables : NSObject

@property (nonatomic, retain) NSDictionary* persist;

+ (AMEngineStaticVariables *)sharedInstance;
+ (void) fillDictionary: (NSMutableDictionary*) mutabledictionary withPersistDictionary:(NSDictionary*) persistdict;
@end
