//
//  MercuryTextControl.h
//  Mercury
//
//  Created by Sudhakar Moparthy on 11/20/11.
//  Copyright (c) 2011 AbbottWebDev. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "MercuryGroup.h"
#import "MercuryViewController.h"

@interface MercuryTextControl : MercuryBaseUIView <UITextFieldDelegate>
{
    UILabel* label;
    UILabel* textlabel;
    UITextField* textfield;
}

@property (nonatomic, retain) UILabel* label;
@property (nonatomic, retain) UILabel* textlabel;
@property (nonatomic, retain) UITextField* textfield;

@end
