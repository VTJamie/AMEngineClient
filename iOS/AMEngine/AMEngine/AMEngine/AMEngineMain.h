//
//  AMEngineMain.h
//  AMEngine
//
//  Created by Jamieson Abbott on 3/13/12.
//  Copyright (c) 2012 AM Interfaces. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "AMEngineMenu.h"
#import "AMEngineLayoutView.h"

@class AMEngineLayoutView;

@interface AMEngineMain : UIViewController
{
    UINavigationController* menu;
    NSDictionary* currentjson;
    AMEngineLayoutView* rootview;
    AMEngineMain* dialogparent;
}
@property (nonatomic, retain) UINavigationController* menu;
@property (nonatomic, retain) NSDictionary* currentjson;
@property (nonatomic, retain) AMEngineLayoutView* rootview;
@property (nonatomic, retain) AMEngineMain* dialogparent;

- (id) initWithMenu:(UINavigationController*) inmenu;
- (id)initWithMenu:(UINavigationController *)inmenu showLogoutButton:(BOOL) showlogout;
- (void) showMenu;
- (void) showSubMenu;
- (void) logout;
- (void)setPageJSON:(NSDictionary*) pagejson;
- (void) loadNewObjectName:(NSString*) actionname;
- (void) loadNewObjectName:(NSString *)actionname additionalFields:(NSDictionary*) additionalfields;
-(void) dataManager:(AMEngineDataManager*) datamanager Actionresponse:(NSDictionary *) response;
- (void) showLandingScreen;
- (void) dataManager:(AMEngineDataManager *)datamanager LandingPageNameresponse:(NSDictionary *) response;
@end
