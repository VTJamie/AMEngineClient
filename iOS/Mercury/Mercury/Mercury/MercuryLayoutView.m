//
//  MercuryLayoutView.m
//  Mercury
//
//  Created by Jamieson Abbott on 3/13/12.
//  Copyright (c) 2012 AM Interfaces. All rights reserved.
//

#import "MercuryLayoutView.h"
#import "MercuryControlParser.h"
#import "MercuryStaticVariables.h"
#import "AMConstants.h"


@implementation MercuryLayoutView

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
            //MercuryLayoutView* newview = [[MercuryLayoutView alloc] initWithFrame:CGRectMake(2, curposition, self.frame.size.width-4, 34)];
            [self loadJSON:control withRootDefinition:self.rootdefinition andClearChildren:NO];
            curposition = self.contentSize.height;
           // [newview loadJSON:control withRootDefinition:self.rootdefinition];
         //   [self addSubview:newview];
         //   curposition += newview.frame.size.height + 2.0f;            
        }
        else 
        {                    
            UIView* newview = [MercuryControlParser parseJsonControl:control withFrame:CGRectMake(2, curposition, self.frame.size.width-4, 34) andRootDefinition:rootdefinition];
            
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
        if([[subview class] isSubclassOfClass:[MercuryLayoutView class]])
        {
            [fieldlist addEntriesFromDictionary:[(MercuryLayoutView*)subview getFieldValues]];
        }
        else if([[subview class] isSubclassOfClass:[MercuryBaseControl class]])
        {
            [(MercuryBaseControl*)subview addValueToDict:fieldlist];
        }
    }
    return fieldlist;
}

- (NSMutableDictionary*) getFieldNames
{
    NSMutableDictionary* fieldlist = [[NSMutableDictionary alloc] init];
    for(UIView* subview in self.subviews)
    {
        if([[subview class] isSubclassOfClass:[MercuryLayoutView class]])
        {
            [fieldlist addEntriesFromDictionary:[(MercuryLayoutView*)subview getFieldNames]];
        }
        else if([[subview class] isSubclassOfClass:[MercuryBaseControl class]])
        {
            [(MercuryBaseControl*)subview addNameToDict:fieldlist];
        }
    }
    return fieldlist;
}

- (MercuryLayoutView*) getTopParent
{
    if(self.superview == nil || ![[self.superview class] isSubclassOfClass:[MercuryLayoutView class]])
    {
        return self;
    }
    else 
    {
        return [(MercuryLayoutView*)self.superview getTopParent];
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
    [MercuryStaticVariables fillDictionary:postdata withPersistDictionary:[MercuryStaticVariables sharedInstance].persist];
    [MercuryDataManager sendRequest:postdata withTarget:self andSelector:@selector(dataManager:refreshResponse:)];
}

- (void) dataManager:(MercuryDataManager*) datamanager refreshResponse:(NSDictionary*) refreshresponse
{    
    [self refreshControls:[[refreshresponse objectForKey:[AMConstants C:RESPONSE_BODY]] objectForKey:[AMConstants C:CONTROL_ARRAY]]];    
}

- (void) refreshControls:(NSArray*) controlarray
{
    for(UIView* subview in self.subviews)
    {
        if([[subview class] isSubclassOfClass:[MercuryLayoutView class]])
        {
            MercuryLayoutView* layoutview = (MercuryLayoutView*)subview;
            [layoutview refreshControls:controlarray];
        }
        else if([[subview class] isSubclassOfClass:[MercuryBaseControl class]])
        {
            MercuryBaseControl* basecontrol = (MercuryBaseControl*)subview;
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
