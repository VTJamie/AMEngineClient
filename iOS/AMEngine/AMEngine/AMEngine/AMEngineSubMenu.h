//
//  AMEngineSubMenu.h
//  AMEngine
//
//  Created by Jamieson Abbott on 3/17/12.
//  Copyright (c) 2012 AbbottWebDev. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "AMEngineMain.h"
#import "AMEngineDataManager.h"

@interface AMEngineSubMenu : UIViewController <AssistedTableViewRowDelegate>
{
    NSArray* menujson;
    AMEngineMain* displayviewcontroller;
}
@property (nonatomic, retain) NSArray* menujson;
@property (nonatomic, retain) AMEngineMain* displayviewcontroller;

- (void) dismissAMEngineMenu;
@end
