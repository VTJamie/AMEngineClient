//
//  MercuryLookupControl.h
//  Mercury
//
//  Created by Sudhakar Moparthy on 12/17/11.
//  Copyright (c) 2011 AbbottWebDev. All rights reserved.
//

#import "MercuryViewController.h"
@protocol MercuryLookupDelegate <NSObject>

@required
-(void) lookupValueSelected:(NSString *)value andContext:(NSString*) context;
@end

@interface MercuryLookupCustomView : MercuryBaseUIView

@end

@interface MercuryLookupControl : MercuryBaseUIView <MercuryLookupDelegate>
{
    UILabel* label;
    UIButton* selectbutton;
    MercuryLookupCustomView* speciallookupview;
}
@property (nonatomic, retain) UILabel* label;
@property (nonatomic, retain) UIButton* selectbutton;
@property (nonatomic, retain) MercuryLookupCustomView* speciallookupview;

- (void) buttonClick;

@end

