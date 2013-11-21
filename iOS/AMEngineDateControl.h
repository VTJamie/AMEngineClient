//
//  AMEngineDateControl.h
//  AMEngine
//
//  Created by Sudhakar Moparthy on 11/25/11.
//  Copyright (c) 2011 AbbottWebDev. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "AMEngineDatePickerView.h"
#import "AMEngineGroup.h"

@interface AMEngineDateControl : AMEngineBaseUIView <AMEngineDatePickerViewDelegate>
{
    UILabel* label;
    UIButton* datebutton;
}
@property (nonatomic, retain) UILabel* label;
@property (nonatomic, retain) UIButton* datebutton;

@end
