//
//  AMEngineDatePickerView.m
//  AMEngine
//
//  Created by Sudhakar Moparthy on 11/17/11.
//  Copyright (c) 2011 AbbottWebDev. All rights reserved.
//

#import "AMEngineDatePickerView.h"
#import "AMEngineLoadedController.h"

@implementation AMEngineDatePickerView

@synthesize datepicker;
@synthesize target;
@synthesize selectbutton;
@synthesize clearbutton;
@synthesize controlcontainer;

- (id) initWithTarget:(id <AMEngineDatePickerViewDelegate>)intarget andStartDate:(NSDate *)date
{
    [self initWithFrame:CGRectMake(0, 0, 320, 280)];
    self.datepicker = [[UIDatePicker alloc] init];
    self.selectbutton = [UIButton buttonWithType:UIButtonTypeRoundedRect];
    self.clearbutton = [UIButton buttonWithType:UIButtonTypeRoundedRect];
    self.target = intarget;   
    [self.selectbutton setBackgroundColor:[UIColor colorWithRed:1.0f green:1.0f blue:1.0f alpha: 1]];
	[self.selectbutton setTitleColor:[UIColor colorWithRed:0.5f green:0.5f blue:1.0f alpha: 1] forState:UIControlStateNormal];
    [self.selectbutton setTitle:@"Select Date" forState:UIControlStateNormal];
    self.selectbutton.frame = CGRectMake(0, 200, 320, 40);
    [self.clearbutton setBackgroundColor:[UIColor colorWithRed:1.0f green:1.0f blue:1.0f alpha: 1]];
	[self.clearbutton setTitleColor:[UIColor colorWithRed:0.5f green:0.5f blue:1.0f alpha: 1] forState:UIControlStateNormal];
    [self.clearbutton setTitle:@"Clear Date" forState:UIControlStateNormal];
    self.clearbutton.frame = CGRectMake(0, 240, 320, 40);

    
    
    self.datepicker.datePickerMode = UIDatePickerModeDate;
    
    [self setBackgroundColor:[UIColor colorWithRed:1.0f green:1.0f blue:1.0f alpha: 1]];
    
    self.selectbutton.titleLabel.textAlignment = UITextAlignmentCenter;
    
    [self.selectbutton addTarget:self action:@selector(selectDate) forControlEvents:UIControlEventTouchUpInside];
    [self.clearbutton addTarget:self action:@selector(clearDate) forControlEvents:UIControlEventTouchUpInside];
    
    [self addSubview:datepicker];
    [self addSubview:selectbutton];
    [self addSubview:clearbutton];
    if(date != nil)
    {
        [self.datepicker setDate:date animated:YES];
    }
    return self;
}

- (void) selectDate
{
    [self.target selectDate:self.datepicker.date];
    [self removeFromSuperview];
}

     -(void) clearDate
     {
         [self.target clearDate];
         [self removeFromSuperview];
     }

@end
