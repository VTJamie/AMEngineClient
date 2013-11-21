//
//  AMEngineSelectControl.h
//  AMEngine
//
//  Created by Jamieson Abbott on 11/23/11.
//  Copyright (c) 2011 AM Interfaces. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "AssistedTableView.h"
#import "AMEngineLayoutView.h"
#import "AMEngineBaseControl.h"
#import "AJComboBox.h"

@interface AMSelectControl : AMEngineBaseControl <AJComboBoxDelegate>
{
    UILabel* label;
    AJComboBox* combobox;
}
@property (nonatomic, retain) UILabel* label;
@property (nonatomic, retain) AJComboBox* combobox;

@end
