//
//  AMEngineLogin.h
//  AMEngine
//
//  Created by Jamieson Abbott on 3/7/12.
//  Copyright (c) 2012 AM Interfaces. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "AMEngineDataManager.h"
#import "AssistedTableView.h"
#import "AMEngineMain.h"

@class AMEngineMain;

@interface AMEngineMenu : UIViewController <AssistedTableViewRowDelegate>

@property (nonatomic, retain) NSDictionary* menujson;
@property (nonatomic, retain) NSArray* currentlevel;
@property (nonatomic, retain) AMEngineMain* displayviewcontroller;

-(void) dataManager:(AMEngineDataManager*) datamanager Menuresponse:(NSDictionary *) response;
- (void) dismissAMEngineMenu;
- (void) reloadMenu;
@end
