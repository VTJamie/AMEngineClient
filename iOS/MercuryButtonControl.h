//
//  MercuryButtonControl.h
//  Mercury
//
//  Created by Sudhakar Moparthy on 11/26/11.
//  Copyright (c) 2011 AbbottWebDev. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "MercuryGroup.h"
#import "MercuryViewController.h"

@interface MercuryButtonControl : MercuryBaseUIView
{ 
    UIButton* selectbutton;
}
@property (nonatomic, retain) UIButton* selectbutton;

- (void) buttonClick;
@end
