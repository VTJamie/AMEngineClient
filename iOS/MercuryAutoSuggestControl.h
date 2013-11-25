//
//  MercuryAutoSuggestControl.h
//  Mercury
//
//  Created by Sudhakar Moparthy on 12/17/11.
//  Copyright (c) 2011 AbbottWebDev. All rights reserved.
//

#import "MercuryViewController.h"
#import "MercuryTableViewController.h"

@interface MercuryAutoSuggestControl : MercuryBaseUIView <UITextFieldDelegate, MercuryTableViewControllerRowDelegate>
{
    UILabel* label;
    UITextField* textfield;
}

@property (nonatomic, retain) UILabel* label;
@property (nonatomic, retain) UITextField* textfield;

@end
