//
//  MercuryGroup.h
//  Mercury
//
//  Created by Sudhakar Moparthy on 11/20/11.
//  Copyright (c) 2011 AbbottWebDev. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "MercuryViewController.h"

@interface MercuryConfirmTabView : MercuryBaseUIView

@end

@interface MercuryAccordionHeader : UIButton
{
    MercuryBaseUIView* associatedgroup;
}

@property (nonatomic, retain) MercuryBaseUIView* associatedgroup;

- (void) headerClick;
@end

@interface MercuryTabButton : UIButton
{
    MercuryBaseUIView* associatedgroup;
}

@property (nonatomic, retain) MercuryBaseUIView* associatedgroup;

- (void) headerClick;
@end


@interface MercuryGroup : MercuryBaseUIView
{
}

-(UIView*)processControl:(NSDictionary *)control;
- (void) DoTableLayout;
- (void) DoAccordionLayout;
- (void) DoWizardOrTabLayout;

@end
