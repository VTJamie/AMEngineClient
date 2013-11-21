//
//  AMEngineSelectControl.m
//  AMEngine
//
//  Created by Sudhakar Moparthy on 11/23/11.
//  Copyright (c) 2011 AbbottWebDev. All rights reserved.
//

#import "AMEngineSelectControl.h"
#import "AMEngineLoadedController.h"
#import "AMEngineTableViewController.h"

@implementation AMEngineSelectControl

@synthesize label;
@synthesize selectbutton;
@synthesize ismultiselect;

- (id) initWithDefinition:(NSDictionary*) indefinition andParent:(AMEngineGroup *)inparent
{
    self = [super initWithDefinition:indefinition andParent:inparent];
    if (self)
    {
        self.frame = CGRectMake(0, 0, 304, 29);
        self.label = [[UILabel alloc] initWithFrame:CGRectMake(2, 2, 150, 25)];    
        self.label.textAlignment = UITextAlignmentRight;
        self.selectbutton = [UIButton buttonWithType:UIButtonTypeRoundedRect];
        self.selectbutton.frame = CGRectMake(152, 2, 150, 25);
        [self.selectbutton addTarget:self action:@selector(buttonClick) forControlEvents:UIControlEventTouchUpInside];
        
        self.label.text = [self.definition objectForKey:@"l"];
        [self loadSelectedValue];
        [self addSubview:self.label];
        [self addSubview:selectbutton];
    }
    return self;
}

- (void) buttonClick
{
    AMEngineTableViewController* skilltable = [[AMEngineTableViewController alloc] initWithStyle:UITableViewStylePlain];
    [skilltable addTarget:self andSectionTitle:nil andAccessoryType:UITableViewCellAccessoryNone andSelectionType:UITableViewCellSelectionStyleBlue inSection:0];
    skilltable.contentSizeForViewInPopover  = CGSizeMake(400, 400);
    UIPopoverController* popovercontroller = [[UIPopoverController alloc] initWithContentViewController:skilltable];
    
    [popovercontroller presentPopoverFromRect:self.selectbutton.frame inView:self permittedArrowDirections:UIPopoverArrowDirectionLeft animated:YES];
    self.popover = popovercontroller;
}

- (void) forTableViewController: (AMEngineTableViewController*) tableController cellToFill:(AMEngineUITableViewCell*) newcell atIndexPath:(NSIndexPath*) indexPath
{    
    NSDictionary* curitem = [[self.definition objectForKey:@"items"] objectAtIndex:indexPath.row];
    newcell.textLabel.text = [curitem objectForKey:@"l"];
    if([[curitem objectForKey:@"s"]boolValue])
    {
        newcell.accessoryType = UITableViewCellAccessoryCheckmark;
    }    
    
}
- (NSInteger) numberOfRowsInSection: (NSInteger) section
{
    return [[self.definition objectForKey:@"items"] count];  
}

- (void) forTableViewController: (AMEngineTableViewController*) tableController didSelectRowAtIndexPath: (NSIndexPath*) indexPath
{    
    [self selectValueAtIndex:indexPath.row];
    [self loadSelectedValue];
    NSString* typestring = [self.definition objectForKey:@"t"];
    if([typestring compare: @"dropdownlist"] == NSOrderedSame)
    {        
        [self.popover dismissPopoverAnimated:YES];
    }
    else if([typestring compare: @"multiselect"] == NSOrderedSame)
    {        
        [tableController.tableView reloadData];
    }
}

- (void) selectValueAtIndex: (NSInteger) index
{    
    NSString* typestring = [self.definition objectForKey:@"t"];
    if([typestring compare: @"dropdownlist"] == NSOrderedSame)
    {
        for(NSDictionary* item in [self.definition objectForKey:@"items" ])
        {            
            [item setValue:[[NSNumber alloc] initWithBool:NO] forKey:@"s"];
        }
        
        [[[self.definition objectForKey:@"items" ] objectAtIndex:index] setValue:[[NSNumber alloc] initWithBool:YES] forKey:@"s"];
    }
    else if ([typestring compare: @"multiselect"]  == NSOrderedSame)
    {
        BOOL oldvalue = [[[[self.definition objectForKey:@"items"] objectAtIndex:index] objectForKey:@"s"] boolValue];
        [[[self.definition objectForKey:@"items" ] objectAtIndex:index] setValue:[[NSNumber alloc] initWithBool:!oldvalue] forKey:@"s"];
    }
}

- (void) loadSelectedValue
{
    NSString* typestring = [self.definition objectForKey:@"t"];
    if([typestring compare: @"dropdownlist"] == NSOrderedSame)
    {
        for(NSDictionary* item in [self.definition objectForKey:@"items" ])
        {
            if ([[item objectForKey:@"s"] boolValue])
            {
                [self.selectbutton setTitle:[item objectForKey:@"l"] forState:UIControlStateNormal];
                return;
            }    
        }
        
        [self selectValueAtIndex:0];
        [self.selectbutton setTitle:[[[self.definition objectForKey:@"items" ] objectAtIndex:0] objectForKey:@"l"] forState:UIControlStateNormal];
    }
    else if([typestring compare: @"multiselect"] == NSOrderedSame)
    {
        NSMutableString* concatstring = [[NSMutableString alloc] init];
        for(NSDictionary* item in [self.definition objectForKey:@"items" ])
        {
            if ([[item objectForKey:@"s"] boolValue])
            {
                if(concatstring.length > 0)
                {
                    [concatstring appendString:@", "];
                }
                [concatstring appendFormat:@"%@", [item objectForKey:@"l"]];             
            }    
        }
         [self.selectbutton setTitle:concatstring forState:UIControlStateNormal];
    }
    
}

- (NSDictionary *)getValues
{
    NSMutableDictionary* returnvalues = [[NSMutableDictionary alloc] init];
    
    NSMutableString* concatstring = [[NSMutableString alloc] init];
    
    for(NSDictionary* item in [self.definition objectForKey:@"items" ])
    {
        if ([[item objectForKey:@"s"] boolValue])
        {
            if(concatstring.length > 0)
            {
                [concatstring appendString:@";;;"];
            }
            [concatstring appendFormat:@"%@", [item objectForKey:@"v"]];
        }    
    }
    [returnvalues setValue:concatstring forKey:[self.definition objectForKey:@"id"]];
    return returnvalues;
}

- (void) layoutSubviews
{
    float halfwidth = (self.frame.size.width-4) / 2;
    self.label.frame = CGRectMake(2, 2, halfwidth, 25);
    self.selectbutton.frame = CGRectMake(halfwidth + 2, 2, halfwidth, 25);          
}
@end
