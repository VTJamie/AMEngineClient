//
//  MercurySelectControl.h
//  Mercury
//
//  Created by Sudhakar Moparthy on 11/23/11.
//  Copyright (c) 2011 AbbottWebDev. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "MercuryTableViewController.h"
#import "MercuryGroup.h"
#import "MercuryViewController.h"

@interface MercurySelectControl : MercuryBaseUIView <MercuryTableViewControllerRowDelegate>
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
