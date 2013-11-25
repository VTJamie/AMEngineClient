//
//  MercuryViewController.m
//  Mercury
//
//  Created by Sudhakar Moparthy on 11/20/11.
//  Copyright (c) 2011 AbbottWebDev. All rights reserved.
//

#import "MercuryViewController.h"
#import "MercuryGroup.h"
#import "MercuryLoadedController.h"

@implementation MercuryBaseUIView

@synthesize definition;
@synthesize olddefinition;
@synthesize ishidden;
@synthesize parent;
@synthesize popover;
@synthesize subgroups;

- (id) initWithDefinition:(NSDictionary*) indefinition andParent:(MercuryBaseUIView*) inparent
{
    self = [super init];
    if(self)
    {
        self.parent = inparent;
        self.definition = indefinition;
        self.subgroups = [[NSMutableArray alloc]init];
        self.clipsToBounds = YES;               
    }
    return self;
}

- (void) processMainContext
{
    for(MercuryBaseUIView* curview in self.subgroups)
    {
        [curview removeFromSuperview];
    }
    
    [self.subgroups removeAllObjects];
    for(NSDictionary* jsonobj in [self.definition objectForKey:@"g"])
    {
        [jsonobj setValue:[self.definition objectForKey:@"context"] forKey:@"context"];
        [jsonobj setValue:[self.definition objectForKey:@"contextName"] forKey:@"contextName"];
        UIView* uiview = [[MercuryGroup alloc] initWithDefinition: jsonobj andParent:self];
        [self.subgroups addObject:uiview];
        [self addSubview: uiview];         
    }     
    
    [self layoutSubviews];
}

- (void) replaceWithDefinition:(NSDictionary *)indefinition
{
    self.olddefinition = self.definition;
    
    self.definition = indefinition;
    
    [self.definition setValue:[self.olddefinition objectForKey:@"context"] forKey:@"context"];
    [self.definition setValue:[self.olddefinition objectForKey:@"contextName"] forKey:@"contextName"];
}

- (void) sendRefreshWithData: (NSDictionary*) criteria refreshSentControls:(BOOL) refreshcontrol
{
    NSMutableDictionary* postdata = [[NSMutableDictionary alloc] init];   
    [postdata setValue:[self.definition objectForKey:@"context"] forKey:@"context"];
    [postdata setValue:[self.definition objectForKey:@"contextName"] forKey:@"contextName"];
    if(refreshcontrol)
    {
        [postdata setValue:@"true" forKey:@"refresh"];
    }
    else
    {
        [postdata setValue:@"false" forKey:@"refresh"];        
    }
    [postdata addEntriesFromDictionary:criteria];
    
    [MercuryLoadedController sendRequest:postdata withURL:@"/SpotESPageT1.aspx" withTarget:self andSelector:@selector(processRefreshResponse:)];
}

- (void) processRefreshResponse:(NSDictionary*) data
{
    for(NSDictionary* control in [data objectForKey:@"c"])
    {
        [[[self getHighestParent] findControlById:[control objectForKey:@"id"]] replaceWithDefinition:control];
    }
    for(NSDictionary* searchgroup in [self.definition objectForKey:@"searchgroups"])
    {        
        if([[searchgroup objectForKey:@"a"] boolValue])
        {
            [MercuryGridControl runSearch:[searchgroup objectForKey:@"s"] withParentGroup:[self getHighestParent]];
        }
    }
}

- (MercuryBaseUIView*) findControlById: (NSString*) controlid
{
    for(MercuryBaseUIView* curview in self.subgroups)
    {
        NSString* typestring = [curview.definition objectForKey:@"gt"];
        if([typestring compare:@"c"] == NSOrderedSame)
        {
            NSString* idstring = [curview.definition objectForKey:@"id"];
            if([idstring compare:controlid] == NSOrderedSame)
            {
                return curview;
            }
        }
        else if([typestring compare:@"g"] == NSOrderedSame)
        {
            MercuryBaseUIView* foundcurview = [curview findControlById:controlid];
            if(foundcurview != nil)
            {
                return foundcurview;
            }
        }
    }
    return nil;
}

- (id) init
{
    self = [super init];
    if(self)
    {
        self.subgroups = [[NSMutableArray alloc] init];
        self.clipsToBounds = YES;
    }
    return self;
}

- (NSDictionary *)getValues
{
    NSMutableDictionary* returnvalues = [[NSMutableDictionary alloc] init];
    for(MercuryBaseUIView* curview in self.subgroups)
    {
        [returnvalues addEntriesFromDictionary:[curview getValues]];
        
    }
    return returnvalues;
}
-(MercuryBaseUIView *)getHighestParent
{
    if(self.parent == nil)
    {
        return self;
    }
    else
    {
        return [self.parent getHighestParent];
    }
}

- (void)performBlock:(void (^)(void))block afterDelay:(NSTimeInterval)delay
{
    int64_t delta = (int64_t)(1.0e9 * delay);
    dispatch_after(dispatch_time(DISPATCH_TIME_NOW, delta), dispatch_get_main_queue(), block);
}

@end

@implementation MercuryViewController

@synthesize lookupdelegate;

-(id)initWithContextName:(NSString*) contextname
{
    self = [super init];   
    self.view = [[MercuryBaseUIView alloc] init];
    self.view.autoresizingMask = UIViewAutoresizingFlexibleWidth | UIViewAutoresizingFlexibleHeight;
    self.view.autoresizesSubviews = YES;
    self.view.backgroundColor = [UIColor whiteColor];
    
    NSMutableDictionary* dict = [[NSMutableDictionary alloc] init];
    [dict setValue:contextname forKey:@"initialload"];    
    
    [MercuryLoadedController sendRequest:dict withURL:@"/SpotESPageT1.aspx" withTarget:self andSelector:@selector(getInitialJSON:)];
    return self;
}

-(id)initWithLookupDefinition:(NSDictionary*) lookupdefinition andLookupSelectDelegate:(id<MercuryLookupDelegate>)lookupselection
{
    self = [super init];   
    self.lookupdelegate = lookupselection;
    self.view = [[MercuryBaseUIView alloc] init];
    self.view.autoresizingMask = UIViewAutoresizingFlexibleWidth | UIViewAutoresizingFlexibleHeight;
    self.view.autoresizesSubviews = YES;
    self.view.backgroundColor = [UIColor whiteColor];
    
    NSMutableDictionary* dict = [[NSMutableDictionary alloc] init];
    [dict setValue:[lookupdefinition objectForKey:@"context"] forKey:@"context"]; 
    [dict setValue:[lookupdefinition objectForKey:@"contextName"] forKey:@"contextName"]; 
    [dict setValue:@"true" forKey:@"lookuprequest"]; 
    [dict setValue:[lookupdefinition objectForKey:@"id"] forKey:@"lookuprequestproperty"]; 
    
    [MercuryLoadedController sendRequest:dict withURL:@"/SpotESPageT1.aspx" withTarget:self andSelector:@selector(getInitialJSON:)];
    return self;
}

- (void) getInitialJSON: (NSDictionary*) data
{
        [self setLookupDelegateOnGrid: data];
    [self processGroupJson:data];
    self.title = [data objectForKey:@"label"]; 
}

- (void) setLookupDelegateOnGrid: (NSDictionary*) data
{        
    for(NSDictionary* curobject in [data objectForKey:@"g"])
    {
        [self setLookupDelegateOnGridChildren: curobject];
    }
}

- (void) setLookupDelegateOnGridChildren: (NSDictionary*) control
{
    NSString* objecttype = [control objectForKey:@"gt"];
    if([objecttype compare: @"g"] == NSOrderedSame)
    {
        for(NSDictionary* curobject in [control objectForKey:@"c"])
        {
            [self setLookupDelegateOnGridChildren:curobject];
        }
    }
    else if([objecttype compare: @"c"] == NSOrderedSame)
    {
        NSString* typeofcontrol = [control objectForKey:@"t"];
        if([typeofcontrol compare: @"grid"] == NSOrderedSame)
        {
            [control setValue:self.lookupdelegate forKey:@"lookupdelegate"];
        }
    }
}

- (void)viewWillAppear:(BOOL)animated
{
    [self fixSubViews];
}

- (void)didRotateFromInterfaceOrientation:(UIInterfaceOrientation)fromInterfaceOrientation
{
    [self fixSubViews];
}

- (void) fixSubViews
{
    NSInteger curxpos = 0;
    NSInteger curypos = 0;
    for(UIView* curview in self.view.subviews)
    {
        curview.frame = CGRectMake(0, 0, self.view.frame.size.width, curview.frame.size.height);
        [curview layoutSubviews];
        NSInteger newypos = curypos + curview.frame.size.height;
        curview.frame = CGRectMake(curxpos, curypos, curview.frame.size.width, curview.frame.size.height);
        curypos = newypos;
    }
}

-(void)processGroupJson:(NSDictionary *)initialjson
{
    MercuryBaseUIView* skillview = (MercuryBaseUIView*)self.view;
    skillview.definition = initialjson;
    [skillview processMainContext];    
    
    [self fixSubViews];
}

- (BOOL)shouldAutorotateToInterfaceOrientation:(UIInterfaceOrientation)interfaceOrientation
{
    // Return YES for supported orientations
	return YES;
}

@end
