//
//  AMEngineStaticVariables.m
//  AMEngine
//
//  Created by Jamieson Abbott on 3/13/12.
//  Copyright (c) 2012 AM Interfaces. All rights reserved.
//

#import "AMEngineStaticVariables.h"
#import "AMConstants.h"

@implementation AMEngineStaticVariables

@synthesize persist;

+ (AMEngineStaticVariables *)sharedInstance
{
    // the instance of this class is stored here
    static AMEngineStaticVariables *myInstance = nil;
    
    // check to see if an instance already exists
    if (nil == myInstance) 
    {
        myInstance  = [[[self class] alloc] init];
        // initialize variables here
    }
    // return the instance of this class
    return myInstance;
}

+ (void) fillDictionary: (NSMutableDictionary*) mutabledictionary withPersistDictionary:(NSDictionary*) persistdict
{
    if(persistdict != nil)
    {
        for(NSString* key in persistdict.keyEnumerator)
        {
            [mutabledictionary setObject:[persistdict objectForKey:key] forKey:[NSString stringWithFormat:@"%@%@", [AMConstants C:PERSISTED_PREFIX], key]];
        }
        // [postdata addEntriesFromDictionary:[AMEngineStaticVariables sharedInstance].persist];
    }
}
@end