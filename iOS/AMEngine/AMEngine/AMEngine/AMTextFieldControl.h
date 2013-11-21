//
//  AMTextFieldControl.h
//  AMEngine
//
//  Created by Jamieson Abbott on 3/13/12.
//  Copyright (c) 2012 AM Interfaces. All rights reserved.
//

#import "AMEngineBaseControl.h"
#import "AMEngineDataManager.h"

@interface AMTextFieldControl : AMEngineBaseControl <UITextFieldDelegate>
{
    UILabel* label;
    UITextField* textfield;
    UILabel* textdisplay;
}
@property (nonatomic, retain) UILabel* label;
@property (nonatomic, retain) UITextField* textfield;
@property (nonatomic, retain) UILabel* textdisplay;

- (void) dataManager:(AMEngineDataManager*) datamanager refreshResponse:(NSDictionary*) refreshresponse;

@end
