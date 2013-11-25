//
//  MercuryBaseControl.m
//  Mercury
//
//  Created by Jamieson Abbott on 3/13/12.
//  Copyright (c) 2012 AM Interfaces. All rights reserved.
//

#import "MercuryBaseControl.h"
#import "AMConstants.h"

@implementation MercuryBaseControl


@synthesize definition;
@synthesize rootdefinition;

- (id) initWithFrame:(CGRect)frame andJsonDefinition:(NSDictionary*) jsondefinition andRootDefinition:(NSDictionary*) root
{
    self = [super initWithFrame:frame];
    if (self) 
    {
        definition = jsondefinition;

        rootdefinition = root;
        [rootdefinition retain];
        // Initialization code
    }
    return self;
}

- (void) updateJsonDefinition:(NSDictionary*) jsondefinition
{
    definition = jsondefinition;
    [definition retain];
}

- (void) addNameToDict:(NSMutableDictionary*) fieldlist
{
    [fieldlist setObject:@"True" forKey:[NSString stringWithFormat:@"%@%@", [AMConstants C:REFRESH_FIELD_PREFIX], [self.definition objectForKey:[AMConstants C:ID]]]]; 
}

- (void) addValueToDict:(NSMutableDictionary*) fieldlist
{
    
}

@end
