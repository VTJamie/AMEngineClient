//
//  AMEngineControlParser.m
//  AMEngine
//
//  Created by Jamieson Abbott on 3/13/12.
//  Copyright (c) 2012 AM Interfaces. All rights reserved.
//

#import "AMEngineControlParser.h"
#import "AMConstants.h"

@implementation AMEngineControlParser
+ (AMEngineBaseControl *)parseJsonControl:(NSDictionary *)json withFrame:(CGRect) frame andRootDefinition:rootdefinition
{
    NSString* controltype = [json objectForKey:[AMConstants C:CONTROL_TYPE]];
    if([controltype compare:[AMConstants C:CONTROL_TYPE_TEXT]] == NSOrderedSame)
    {      
        return [[AMTextFieldControl alloc] initWithFrame:frame andJsonDefinition:json andRootDefinition:rootdefinition];
    }
    else if([controltype compare:[AMConstants C:CONTROL_TYPE_BUTTON]] == NSOrderedSame)
    {
        return [[AMButtonControl alloc] initWithFrame:frame andJsonDefinition:json andRootDefinition:rootdefinition];
    }
    else if([controltype compare:[AMConstants C:CONTROL_TYPE_GRID]] == NSOrderedSame)
    {
        return [[AMGridViewControl alloc] initWithFrame:frame andJsonDefinition:json andRootDefinition:rootdefinition];
    }
    else if([controltype compare:[AMConstants C:CONTROL_TYPE_SELECT]] == NSOrderedSame)
    {
        return [[AMSelectControl alloc] initWithFrame:frame andJsonDefinition:json andRootDefinition:rootdefinition];
    }
    else if([controltype compare:[AMConstants C:CONTROL_TYPE_COMPLEX_ITEM_LIST]] == NSOrderedSame)
    {
        return [[AMComplexItemListControl alloc] initWithFrame:frame andJsonDefinition:json andRootDefinition:rootdefinition];
    }
    //AMComplexItemListControl
    else
    {
        [AMEngineDataManager testAlert:[NSString stringWithFormat:@"UNABLE TO DISPLAY CONTROL: %@", json]];
        NSLog(@"INVALID CONTROL: %@", json);
        return nil;
    }
}
@end
