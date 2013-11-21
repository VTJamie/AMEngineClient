//
//  AMEngineAutoSuggestControl.h
//  AMEngine
//
//  Created by Sudhakar Moparthy on 12/17/11.
//  Copyright (c) 2011 AbbottWebDev. All rights reserved.
//

#import "AMEngineViewController.h"
#import "AMEngineTableViewController.h"

@interface AMEngineAutoSuggestControl : AMEngineBaseUIView <UITextFieldDelegate, AMEngineTableViewControllerRowDelegate>
{
    UILabel* label;
    UITextField* textfield;
}

@property (nonatomic, retain) UILabel* label;
@property (nonatomic, retain) UITextField* textfield;

@end
