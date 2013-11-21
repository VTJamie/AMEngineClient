//
//  AMEngineDatePickerView.h
//  AMEngine
//
//  Created by Sudhakar Moparthy on 11/17/11.
//  Copyright (c) 2011 AbbottWebDev. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "AMEngineTableViewController.h"

@protocol AMEngineDatePickerViewDelegate <NSObject>

@required

- (void) selectDate: (NSDate*) selecteddate;
- (void) clearDate;

@end

@interface AMEngineDatePickerView : UIView
{
    id <AMEngineDatePickerViewDelegate> target;
    UIButton* selectbutton;
    UIButton* clearbutton;
    UIDatePicker* datepicker;
    AMEngineControlContainer* controlcontainer;
}
@property (nonatomic, retain) id <AMEngineDatePickerViewDelegate> target;
@property (nonatomic, retain) UIButton* selectbutton;
@property (nonatomic, retain) UIButton* clearbutton;
@property (nonatomic, retain) UIDatePicker* datepicker;
@property (nonatomic, retain) AMEngineControlContainer* controlcontainer;

- (id) initWithTarget:(id <AMEngineDatePickerViewDelegate>)intarget andStartDate:(NSDate *)date;
- (void) selectDate;
@end
