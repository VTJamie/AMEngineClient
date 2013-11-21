//
//  AMEngineGroup.h
//  AMEngine
//
//  Created by Sudhakar Moparthy on 11/20/11.
//  Copyright (c) 2011 AbbottWebDev. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "AMEngineViewController.h"

@interface AMEngineConfirmTabView : AMEngineBaseUIView 

@end

@interface AMEngineAccordionHeader : UIButton 
{
    AMEngineBaseUIView* associatedgroup;
}

@property (nonatomic, retain) AMEngineBaseUIView* associatedgroup;

- (void) headerClick;
@end

@interface AMEngineTabButton : UIButton 
{
    AMEngineBaseUIView* associatedgroup;
}

@property (nonatomic, retain) AMEngineBaseUIView* associatedgroup;

- (void) headerClick;
@end


@interface AMEngineGroup : AMEngineBaseUIView
{
}

-(UIView*)processControl:(NSDictionary *)control;
- (void) DoTableLayout;
- (void) DoAccordionLayout;
- (void) DoWizardOrTabLayout;

@end
