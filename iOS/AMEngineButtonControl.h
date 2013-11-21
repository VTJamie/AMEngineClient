//
//  AMEngineButtonControl.h
//  AMEngine
//
//  Created by Sudhakar Moparthy on 11/26/11.
//  Copyright (c) 2011 AbbottWebDev. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "AMEngineGroup.h"
#import "AMEngineViewController.h"

@interface AMEngineButtonControl : AMEngineBaseUIView
{ 
    UIButton* selectbutton;
}
@property (nonatomic, retain) UIButton* selectbutton;

- (void) buttonClick;
@end
