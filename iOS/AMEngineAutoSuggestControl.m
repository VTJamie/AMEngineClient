//
//  AMEngineAutoSuggestControl.m
//  AMEngine
//
//  Created by Sudhakar Moparthy on 12/17/11.
//  Copyright (c) 2011 AbbottWebDev. All rights reserved.
//

#import "AMEngineAutoSuggestControl.h"
#import "AMEngineLoadedController.h"
#import "AMEngineTableViewController.h"

@implementation AMEngineAutoSuggestControl

@synthesize textfield;
@synthesize label;

- (id) initWithDefinition:(NSDictionary*) indefinition andParent:(AMEngineBaseUIView *)inparent
{
    self = [super initWithDefinition:indefinition andParent:inparent];
    if (self)
    {
        self.frame = CGRectMake(0, 0, 304, 29);
        self.label = [[UILabel alloc] initWithFrame:CGRectMake(2, 2, 150, 25)];
        [self addSubview:self.label];
        self.label.textAlignment = UITextAlignmentRight;
        self.label.text = [self.definition objectForKey:@"l"];
                
        self.textfield = [[UITextField alloc] initWithFrame:CGRectMake(152, 2, 150, 25)];
        self.textfield.borderStyle = UITextBorderStyleRoundedRect;
        self.textfield.keyboardType = UIKeyboardTypeDefault;
        self.textfield.returnKeyType = UIReturnKeyDone;
        self.textfield.delegate = self;
        self.textfield.textColor = [UIColor blackColor];    
        self.textfield.text = [self.definition objectForKey:@"text"];
        self.textfield.placeholder = [self.definition objectForKey:@"l"];    
        self.textfield.autocorrectionType = UITextAutocorrectionTypeNo;
        [self addSubview:self.textfield];
        
    }
    return self;
}

- (void) replaceWithDefinition:(NSDictionary *)indefinition
{
    [super replaceWithDefinition:indefinition];
    self.textfield.text = [self.definition objectForKey:@"text"];
}

- (NSDictionary *)getValues
{
    NSMutableDictionary* returnvalues = [[NSMutableDictionary alloc] init];    
    [returnvalues addEntriesFromDictionary:[super getValues]];
    [returnvalues setValue:[self.definition objectForKey:@"v"] forKey:[self.definition objectForKey:@"id"]];
    return returnvalues;
}

- (void)textFieldDidEndEditing:(UITextField *)textField
{
    [self.definition setValue:self.textfield.text forKey:@"v"];
//    autosuggest	City
//    context	305b1677-03fe-43df-b498-a20246aa3bbc
//    contextName	DutyStationSearch
//    term	Fair
        
    NSMutableDictionary* postdata = [[NSMutableDictionary alloc] init];   
    [postdata setValue:[self.definition objectForKey:@"context"] forKey:@"context"];
    [postdata setValue:[self.definition objectForKey:@"contextName"] forKey:@"contextName"];
    [postdata setValue:[self.definition objectForKey:@"id"] forKey:@"autosuggest"];
    [postdata setValue:[self.definition objectForKey:@"v"] forKey:@"term"];
    
    [AMEngineLoadedController sendRequest:postdata withURL:@"/SpotESPageT1.aspx" withTarget:self andSelector:@selector(loadAutoSuggestValues:)];     
        
}

-(void)loadAutoSuggestValues:(NSDictionary*) data
{
    [self.definition setValue:[data objectForKey:@"a"] forKey:@"items"];
    AMEngineTableViewController* skilltable = [[AMEngineTableViewController alloc] initWithStyle:UITableViewStylePlain];
    [skilltable addTarget:self andSectionTitle:nil andAccessoryType:UITableViewCellAccessoryNone andSelectionType:UITableViewCellSelectionStyleBlue inSection:0];
    skilltable.contentSizeForViewInPopover  = CGSizeMake(400, 400);
    UIPopoverController* popovercontroller = [[UIPopoverController alloc] initWithContentViewController:skilltable];
    
    [popovercontroller presentPopoverFromRect:self.textfield.frame inView:self permittedArrowDirections:UIPopoverArrowDirectionUp animated:YES];
    self.popover = popovercontroller;    
}

- (void) forTableViewController: (AMEngineTableViewController*) tableController cellToFill:(AMEngineUITableViewCell*) newcell atIndexPath:(NSIndexPath*) indexPath
{    
    NSDictionary* curitem = [[self.definition objectForKey:@"items"] objectAtIndex:indexPath.row];
    newcell.textLabel.text = [curitem objectForKey:@"label"];
    if([[curitem objectForKey:@"s"]boolValue])
    {
        newcell.accessoryType = UITableViewCellAccessoryCheckmark;
    }    
//    NSString* typestring = [self.definition objectForKey:@"t"];
//    if([typestring compare:@"multiselect"] == NSOrderedSame)
//    {
//        [tableController.tableView reloadData];
//    }
}
- (NSInteger) numberOfRowsInSection: (NSInteger) section
{
    return [[self.definition objectForKey:@"items"] count];  
}

- (void) forTableViewController:(AMEngineTableViewController *)tableController didSelectRowAtIndexPath: (NSIndexPath*) indexPath
{    
   // [self selectValueAtIndex:indexPath.row];
   // [self loadSelectedValue];
        [self.popover dismissPopoverAnimated:YES];
    self.textfield.text = [[[self.definition objectForKey:@"items"] objectAtIndex:indexPath.row] objectForKey:@"displaylabel"];
    [self.definition setValue:[[[self.definition objectForKey:@"items"] objectAtIndex:indexPath.row] objectForKey:@"v"] forKey:@"v"];
    [self sendRefreshWithData:[self getValues] refreshSentControls:NO];    
}


- (BOOL)textFieldShouldReturn:(UITextField *)textField;              // called when 'return' key pressed. return NO to ignore.
{
    [self.textfield resignFirstResponder];
    return YES;
}

- (void) layoutSubviews
{    
    NSString* labelwidthstring = [self.definition objectForKey:@"lw"];
    float labelwidthpercent = 0.5f;
    
    if([labelwidthstring compare:@"Long"] == NSOrderedSame)
    {
        labelwidthpercent = 0.5f;
    }
    else if([labelwidthstring compare:@"Medium"] == NSOrderedSame)
    {
        labelwidthpercent = 0.35f;
    }
    else if([labelwidthstring compare:@"Short"] == NSOrderedSame)
    {
        labelwidthpercent = 0.25f;
    }
    else if([labelwidthstring compare:@"ExtraShort"] == NSOrderedSame)
    {
        labelwidthpercent = 0.15f;
    }
    else if([labelwidthstring compare:@"None"] == NSOrderedSame)
    {
        labelwidthpercent = 0.25f;
    }
    else if([labelwidthstring compare:@"Calculated"] == NSOrderedSame)
    {
        labelwidthpercent = 0.25f;
    }

    
    float labelwidth = (self.frame.size.width-10) * labelwidthpercent;
    float controlwidth = (self.frame.size.width-10) * (1.0f-labelwidthpercent);
    
    
   // float halfwidth = (self.frame.size.width-4) / 2;
    self.label.frame = CGRectMake(5, 2, labelwidth, 25);
    self.textfield.frame = CGRectMake(labelwidth+5, 2, controlwidth, 25);     
}
@end
