//
//  MercuryLogin.h
//  Mercury
//
//  Created by Jamieson Abbott on 3/7/12.
//  Copyright (c) 2012 AM Interfaces. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "MercuryDataManager.h"
#import "AssistedTableView.h"
#import "MercuryMain.h"

@class MercuryMain;

@interface MercuryMenu : UIViewController <AssistedTableViewRowDelegate>

@property (nonatomic, retain) NSDictionary* menujson;
@property (nonatomic, retain) NSArray* currentlevel;
@property (nonatomic, retain) MercuryMain* displayviewcontroller;

-(void) dataManager:(MercuryDataManager*) datamanager Menuresponse:(NSDictionary *) response;
- (void) dismissMercuryMenu;
- (void) reloadMenu;
@end
