//
//  MercuryLookupControl.m
//  Mercury
//
//  Created by Sudhakar Moparthy on 12/17/11.
//  Copyright (c) 2011 AbbottWebDev. All rights reserved.
//

#import "MercuryLookupControl.h"
#import "MercuryLoadedController.h"
#import "MercuryTableViewController.h"

@implementation MercuryLookupCustomView
-(void) layoutSubviews
{
    NSInteger curxpos = 0;
    NSInteger curypos = 0;
    for(MercuryBaseUIView* curview in self.subgroups)
    {
        curview.frame = CGRectMake(0, 0, self.frame.size.width, curview.frame.size.height);
        [curview layoutSubviews];
        NSInteger newypos = curypos + curview.frame.size.height;
        curview.frame = CGRectMake(curxpos, curypos, curview.frame.size.width, curview.frame.size.height);
        curypos = newypos;
    }       
}
@end

@implementation MercuryLookupControl
@synthesize label;
@synthesize selectbutton;
@synthesize speciallookupview;

- (id) initWithDefinition:(NSDictionary*) indefinition andParent:(MercuryGroup *)inparent
{
    self = [super initWithDefinition:indefinition andParent:inparent];
    if (self)
    {
        self.label = [[UILabel alloc] initWithFrame:CGRectMake(2, 2, 150, 25)];    
        self.label.textAlignment = UITextAlignmentRight;
        self.label.text = [self.definition objectForKey:@"l"];
        [self addSubview:self.label];
        self.selectbutton = [UIButton buttonWithType:UIButtonTypeRoundedRect];
        [self.selectbutton addTarget:self action:@selector(buttonClick) forControlEvents:UIControlEventTouchUpInside];
        [self addSubview:selectbutton];
        if ([self.definition objectForKey:@"text"] != nil) 
        {                
            self.frame = CGRectMake(0, 0, 304, 29);
            
            self.selectbutton.frame = CGRectMake(152, 2, 150, 25);
            
            [self.selectbutton setTitle:[self.definition objectForKey:@"text"] forState:UIControlStateNormal];
            
        }
        else if ([self.definition objectForKey:@"ts"] != nil) 
        {
            self.frame = CGRectMake(0, 0, 304, 154);
            self.speciallookupview = [[MercuryLookupCustomView alloc] initWithDefinition:[self.definition objectForKey:@"ts"] andParent:self];
            self.speciallookupview.frame = CGRectMake(152, 2, 150, 125);
            [self.speciallookupview processMainContext];
            self.selectbutton.frame = CGRectMake(152, 127, 150, 25);                      
            [self.selectbutton setTitle:@"Lookup" forState:UIControlStateNormal];
            [self addSubview: self.speciallookupview];
        }
    }
    return self;
}

- (void) buttonClick
{
    MercuryViewController* skilltable = [[MercuryViewController alloc] initWithLookupDefinition:self.definition andLookupSelectDelegate:self];
    UINavigationController* navcontroller = [[UINavigationController alloc] initWithRootViewController:skilltable];
    skilltable.contentSizeForViewInPopover  = CGSizeMake(500, 500);
    UIPopoverController* popovercontroller = [[UIPopoverController alloc] initWithContentViewController:navcontroller];
    
    [popovercontroller presentPopoverFromRect:self.selectbutton.frame inView:self permittedArrowDirections:UIPopoverArrowDirectionAny animated:YES];
    self.popover = popovercontroller;
}

-(void) lookupValueSelected:(NSString *)value andContext:(NSString*) context
{
    [self.popover dismissPopoverAnimated:YES];
    [self.definition setValue:value forKey:@"v"];
    NSMutableDictionary* postdata = [NSMutableDictionary dictionaryWithDictionary:[self getValues]];
    [postdata setValue:context forKey:@"subcontext"];
    [postdata setValue:[self.definition objectForKey:@"id"] forKey:@"subproperty"];
    [self sendRefreshWithData:postdata refreshSentControls:YES];
}

- (void) layoutSubviews
{
    float halfwidth = (self.frame.size.width-4) / 2;
    self.label.frame = CGRectMake(2, 2, halfwidth, 25);
    
    if(self.speciallookupview != nil)
    {
        self.speciallookupview.frame = CGRectMake(halfwidth + 2, 2, halfwidth, 125);
        [self.speciallookupview layoutSubviews];
        
        self.selectbutton.frame = CGRectMake(halfwidth + 2, 127, halfwidth, 25);    
    }
    else    
    {
        self.selectbutton.frame = CGRectMake(halfwidth + 2, 2, halfwidth, 25);          
    }
}

- (NSDictionary *)getValues
{
    NSMutableDictionary* returnvalues = [[NSMutableDictionary alloc] init];  
    [returnvalues addEntriesFromDictionary:[super getValues]];
    [returnvalues setValue:[self.definition objectForKey:@"v"] forKey:[self.definition objectForKey:@"id"]];
    return returnvalues;
}

- (void) replaceWithDefinition:(NSDictionary *)indefinition
{
    [super replaceWithDefinition:indefinition];
        
    if ([self.definition objectForKey:@"text"] != nil) 
    {                                    
        [self.selectbutton setTitle:[self.definition objectForKey:@"text"] forState:UIControlStateNormal];        
    }
    else if ([self.definition objectForKey:@"ts"] != nil) 
    {
        self.speciallookupview.definition = [self.definition objectForKey:@"ts"];
        [self.speciallookupview processMainContext];     
    }    
}

@end
