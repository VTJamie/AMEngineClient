//
//  AMTextFieldControl.h
//  Mercury
//
//  Created by Jamieson Abbott on 3/13/12.
//  Copyright (c) 2012 AM Interfaces. All rights reserved.
//

#import "MercuryBaseControl.h"
#import "MercuryDataManager.h"

@interface AMTextFieldControl : MercuryBaseControl <UITextFieldDelegate>
{
    UILabel* label;
    UITextField* textfield;
    UILabel* textdisplay;
}
@property (nonatomic, retain) UILabel* label;
@property (nonatomic, retain) UITextField* textfield;
@property (nonatomic, retain) UILabel* textdisplay;

- (void) dataManager:(MercuryDataManager*) datamanager refreshResponse:(NSDictionary*) refreshresponse;

@end
