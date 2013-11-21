//
//  AMEngineLayoutView.m
//  AMEngine
//
//  Created by Jamieson Abbott on 3/13/12.
//  Copyright (c) 2012 AM Interfaces. All rights reserved.
//

#import "AMEngineLayoutView.h"
#import "AMEngineControlParser.h"
#import "AMEngineStaticVariables.h"
#import "AMConstants.h"


@implementation AMEngineLayoutView

@synthesize childcontrols; 
@synthesize rootdefinition;
@synthesize parentcontroller;

- (id)initWithFrame:(CGRect)frame
{
    self = [super initWithFrame:frame];
    if (self) 
    {        
    }
    return self;
}

- (void) loadJSON: (NSDictionary*) currentviewjson withRootDefinition: root andClearChildren: (BOOL) clearchildren
{
    if(clearchildren)
    {
        [self clearChildren];
    }
    NSArray* controlarray = [currentviewjson objectForKey:[AMConstants C:CONTROL_ARRAY]];
    
    float curposition = 2.0f;
    if(!clearchildren)
    {
        curposition = self.contentSize.height;
        NSLog(@"Start: %f %@", curposition, [currentviewjson objectForKey:[AMConstants C:GROUP_NAME]]);
    }
    rootdefinition = root;
    for(NSDictionary* control in controlarray)
    {
        NSString* controltype = [control objectForKey:[AMConstants C:CONTROL_TYPE]];

        if([controltype compare:[AMConstants C:CONTROL_TYPE_GROUP]] == NSOrderedSame)
        {
            //AMEngineLayoutView* newview = [[AMEngineLayoutView alloc] initWithFrame:CGRectMake(2, curposition, self.frame.size.width-4, 34)];
            [self loadJSON:control withRootDefinition:self.rootdefinition andClearChildren:NO];
            curposition = self.contentSize.height;
           // [newview loadJSON:control withRootDefinition:self.rootdefinition];
         //   [self addSubview:newview];
         //   curposition += newview.frame.size.height + 2.0f;            
        }
        else 
        {                    
            UIView* newview = [AMEngineControlParser parseJsonControl:control withFrame:CGRectMake(2, curposition, self.frame.size.width-4, 34) andRootDefinition:rootdefinition];
            
            [self addSubview:newview];
         //   NSLog(@"%f", newview.frame.size.height);
            curposition += newview.frame.size.height + 2.0f;
        }
    }
 //   self.frame = CGRectMake(self.frame.origin.x, self.frame.origin.y, self.frame.size.width, curposition);
    [self setContentSize:CGSizeMake(self.frame.size.width, curposition)];
    NSLog(@"End: %f", curposition);
}

- (void) clearChildren
{
    for (UIView* subview in self.subviews) 
    {
        [subview removeFromSuperview];
    }
}

- (NSMutableDictionary*) getFieldValues
{
    NSMutableDictionary* fieldlist = [[NSMutableDictionary alloc] init];
    for(UIView* subview in self.subviews)
    {
        if([[subview class] isSubclassOfClass:[AMEngineLayoutView class]])
        {
            [fieldlist addEntriesFromDictionary:[(AMEngineLayoutView*)subview getFieldValues]];
        }
        else if([[subview class] isSubclassOfClass:[AMEngineBaseControl class]])
        {
            [(AMEngineBaseControl*)subview addValueToDict:fieldlist];
        }
    }
    return fieldlist;
}

- (NSMutableDictionary*) getFieldNames
{
    NSMutableDictionary* fieldlist = [[NSMutableDictionary alloc] init];
    for(UIView* subview in self.subviews)
    {
        if([[subview class] isSubclassOfClass:[AMEngineLayoutView class]])
        {
            [fieldlist addEntriesFromDictionary:[(AMEngineLayoutView*)subview getFieldNames]];
        }
        else if([[subview class] isSubclassOfClass:[AMEngineBaseControl class]])
        {
            [(AMEngineBaseControl*)subview addNameToDict:fieldlist];
        }
    }
    return fieldlist;
}

- (AMEngineLayoutView*) getTopParent
{
    if(self.superview == nil || ![[self.superview class] isSubclassOfClass:[AMEngineLayoutView class]])
    {
        return self;
    }
    else 
    {
        return [(AMEngineLayoutView*)self.superview getTopParent];
    }
}

- (void) refreshControls
{
    NSMutableDictionary* postdata = [[NSMutableDictionary alloc] init];
    [postdata setObject:[AMConstants C:REQUEST_TYPE_REFRESH_CONTROLS] forKey:[AMConstants C:REQUEST_TYPE_IDENTIFIER]]; 
    [postdata setObject:[[self.rootdefinition objectForKey: [AMConstants C:RESPONSE_BODY]] objectForKey: [AMConstants C:ID]] forKey:[AMConstants C:REQUEST_DATA_OBJECT_ID]];
    [postdata setObject:[[self.rootdefinition objectForKey: [AMConstants C:RESPONSE_BODY]] objectForKey: [AMConstants C:OBJECT_NAME]] forKey:[AMConstants C:REQUEST_OBJECT_NAME]];
    [postdata addEntriesFromDictionary:[[self getTopParent] getFieldValues]];  
    [postdata addEntriesFromDictionary:[[self getTopParent] getFieldNames]];
    [AMEngineStaticVariables fillDictionary:postdata withPersistDictionary:[AMEngineStaticVariables sharedInstance].persist];
    [AMEngineDataManager sendRequest:postdata withTarget:self andSelector:@selector(dataManager:refreshResponse:)];
}

- (void) dataManager:(AMEngineDataManager*) datamanager refreshResponse:(NSDictionary*) refreshresponse
{    
    [self refreshControls:[[refreshresponse objectForKey:[AMConstants C:RESPONSE_BODY]] objectForKey:[AMConstants C:CONTROL_ARRAY]]];    
}

- (void) refreshControls:(NSArray*) controlarray
{
    for(UIView* subview in self.subviews)
    {
        if([[subview class] isSubclassOfClass:[AMEngineLayoutView class]])
        {
            AMEngineLayoutView* layoutview = (AMEngineLayoutView*)subview;
            [layoutview refreshControls:controlarray];
        }
        else if([[subview class] isSubclassOfClass:[AMEngineBaseControl class]])
        {
            AMEngineBaseControl* basecontrol = (AMEngineBaseControl*)subview;
            for(NSDictionary* controldef in controlarray)
            {
                NSString* subviewid = [basecontrol.definition objectForKey:[AMConstants C:ID]];
                NSString* curid = [controldef objectForKey:[AMConstants C:ID]];            
                if([curid compare:subviewid] == NSOrderedSame)
                {
                    [basecontrol updateJsonDefinition:controldef];
                }
            }
        }
    }
}

@end
