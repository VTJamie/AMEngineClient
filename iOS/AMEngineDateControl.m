//
//  AMEngineDateControl.m
//  AMEngine
//
//  Created by Sudhakar Moparthy on 11/25/11.
//  Copyright (c) 2011 AbbottWebDev. All rights reserved.
//

#import "AMEngineDateControl.h"
#import "AMEngineDatePickerView.h"

@implementation AMEngineDateControl

@synthesize label;
@synthesize datebutton;

- (id) initWithDefinition:(NSDictionary*) indefinition andParent:(AMEngineBaseUIView *)inparent
{
    self = [super initWithDefinition:indefinition andParent:inparent];
    if(self)
    {
        self.frame = CGRectMake(0, 0, 304, 29);
    self.label = [[UILabel alloc] initWithFrame:CGRectMake(2, 2, 150, 25)];
                self.label.textAlignment = UITextAlignmentRight;
    [self addSubview:self.label];
    self.label.text = [self.definition objectForKey:@"l"];
    
    self.datebutton = [UIButton buttonWithType:UIButtonTypeRoundedRect];
    self.datebutton.frame = CGRectMake(154, 2, 150, 25);
    [self.datebutton setTitle:[self.definition objectForKey:@"v"] forState:UIControlStateNormal];
    [self.datebutton addTarget:self action:@selector(buttonClick) forControlEvents:UIControlEventTouchUpInside];
    [self addSubview:self.datebutton];
    }
    return self;
}

-(void) buttonClick
{
    UIViewController* dateviewcontroller = [[UIViewController alloc] init];
    NSString* valuestring = [self.definition objectForKey:@"v"];
    NSDate* date = [[NSDate alloc] init];
    if([valuestring compare:@""] == NSOrderedSame)
    {
        // Convert string to date object
        NSDateFormatter *dateFormat = [[NSDateFormatter alloc] init];
        [dateFormat setDateFormat:@"MM/dd/yyyy"];
        date = [dateFormat dateFromString:valuestring];              
    }
    AMEngineDatePickerView* datepicker = [[AMEngineDatePickerView alloc] initWithTarget:self andStartDate:date];
    [dateviewcontroller.view addSubview:datepicker];
            dateviewcontroller.contentSizeForViewInPopover  = CGSizeMake(320, 280);
    UIPopoverController* popovercontroller = [[UIPopoverController alloc] initWithContentViewController:dateviewcontroller];


    [popovercontroller presentPopoverFromRect:self.datebutton.frame inView:self permittedArrowDirections:UIPopoverArrowDirectionLeft animated:YES];
    self.popover = popovercontroller;
    
}

- (void)selectDate:(NSDate *)selecteddate
{
    NSDateFormatter *formatter = [[NSDateFormatter alloc] init];
    [formatter setDateFormat:@"MM/dd/yyyy"];
    NSString *stringFromDate = [formatter stringFromDate:selecteddate];
    [self.definition setValue:stringFromDate forKey:@"v"];
    [self.datebutton setTitle:stringFromDate forState:UIControlStateNormal];
    [self.popover dismissPopoverAnimated:YES];
    [formatter release];
}

- (void) clearDate
{
    [self.definition setValue:@"" forKey:@"v"];
    [self.datebutton setTitle:@"" forState:UIControlStateNormal];
    [self.popover dismissPopoverAnimated:YES];
}

- (NSDictionary *)getValues
{
    NSMutableDictionary* returnvalues = [[NSMutableDictionary alloc] init];
    [returnvalues addEntriesFromDictionary:[super getValues]];
    [returnvalues setValue:[self.definition objectForKey:@"v"] forKey:[self.definition objectForKey:@"id"]];
    return returnvalues;
}

- (void) layoutSubviews
{
    float halfwidth = (self.frame.size.width-4) / 2;
    self.label.frame = CGRectMake(2, 2, halfwidth, 25);
    self.datebutton.frame = CGRectMake(halfwidth + 2, 2, halfwidth, 25);          
}
@end
