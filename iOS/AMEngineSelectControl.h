//
//  AMEngineSelectControl.h
//  AMEngine
//
//  Created by Sudhakar Moparthy on 11/23/11.
//  Copyright (c) 2011 AbbottWebDev. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "AMEngineTableViewController.h"
#import "AMEngineGroup.h"
#import "AMEngineViewController.h"

@interface AMEngineSelectControl : AMEngineBaseUIView <AMEngineTableViewControllerRowDelegate>
{
    UILabel* label;
    UIButton* selectbutton;

    BOOL ismultiselect;
}
@property (nonatomic, retain) UILabel* label;
@property (nonatomic, retain) UIButton* selectbutton;
@property (nonatomic, assign) BOOL ismultiselect;

- (void) buttonClick;
- (void) loadSelectedValue;
- (void) selectValueAtIndex: (NSInteger) index;
@end
