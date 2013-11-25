//
//  MercuryDatePickerView.h
//  Mercury
//
//  Created by Sudhakar Moparthy on 11/17/11.
//  Copyright (c) 2011 AbbottWebDev. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "MercuryTableViewController.h"

@protocol MercuryDatePickerViewDelegate <NSObject>

@required

- (void) selectDate: (NSDate*) selecteddate;
- (void) clearDate;

@end

@interface MercuryDatePickerView : UIView
{
    id <MercuryDatePickerViewDelegate> target;
    UIButton* selectbutton;
    UIButton* clearbutton;
    UIDatePicker* datepicker;
    MercuryControlContainer* controlcontainer;
}
@property (nonatomic, retain) id <MercuryDatePickerViewDelegate> target;
@property (nonatomic, retain) UIButton* selectbutton;
@property (nonatomic, retain) UIButton* clearbutton;
@property (nonatomic, retain) UIDatePicker* datepicker;
@property (nonatomic, retain) MercuryControlContainer* controlcontainer;

- (id) initWithTarget:(id <MercuryDatePickerViewDelegate>)intarget andStartDate:(NSDate *)date;
- (void) selectDate;
@end
