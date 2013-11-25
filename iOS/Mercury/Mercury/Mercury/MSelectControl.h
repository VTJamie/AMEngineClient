//
//  MercurySelectControl.h
//  Mercury
//
//  Created by Jamieson Abbott on 11/23/11.
//  Copyright (c) 2011 AM Interfaces. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "AssistedTableView.h"
#import "MercuryLayoutView.h"
#import "MercuryBaseControl.h"
#import "AJComboBox.h"

@interface AMSelectControl : MercuryBaseControl <AJComboBoxDelegate>
{
    UILabel* label;
    AJComboBox* combobox;
}
@property (nonatomic, retain) UILabel* label;
@property (nonatomic, retain) AJComboBox* combobox;

@end
