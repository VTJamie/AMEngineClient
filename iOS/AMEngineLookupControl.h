//
//  AMEngineLookupControl.h
//  AMEngine
//
//  Created by Sudhakar Moparthy on 12/17/11.
//  Copyright (c) 2011 AbbottWebDev. All rights reserved.
//

#import "AMEngineViewController.h"
@protocol AMEngineLookupDelegate <NSObject>

@required
-(void) lookupValueSelected:(NSString *)value andContext:(NSString*) context;
@end

@interface AMEngineLookupCustomView : AMEngineBaseUIView 

@end

@interface AMEngineLookupControl : AMEngineBaseUIView <AMEngineLookupDelegate>
{
    UILabel* label;
    UIButton* selectbutton;
    AMEngineLookupCustomView* speciallookupview;
}
@property (nonatomic, retain) UILabel* label;
@property (nonatomic, retain) UIButton* selectbutton;
@property (nonatomic, retain) AMEngineLookupCustomView* speciallookupview;

- (void) buttonClick;

@end

