//
//  MercuryStaticVariables.h
//  Mercury
//
//  Created by Jamieson Abbott on 3/13/12.
//  Copyright (c) 2012 AM Interfaces. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface MercuryStaticVariables : NSObject

@property (nonatomic, retain) NSDictionary* persist;

+ (MercuryStaticVariables *)sharedInstance;
+ (void) fillDictionary: (NSMutableDictionary*) mutabledictionary withPersistDictionary:(NSDictionary*) persistdict;
@end
