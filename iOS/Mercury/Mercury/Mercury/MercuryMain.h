//
//  MercuryMain.h
//  Mercury
//
//  Created by Jamieson Abbott on 3/13/12.
//  Copyright (c) 2012 AM Interfaces. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "MercuryMenu.h"
#import "MercuryLayoutView.h"

@class MercuryLayoutView;

@interface MercuryMain : UIViewController
{
    UINavigationController* menu;
    NSDictionary* currentjson;
    MercuryLayoutView* rootview;
    MercuryMain* dialogparent;
}
@property (nonatomic, retain) UINavigationController* menu;
@property (nonatomic, retain) NSDictionary* currentjson;
@property (nonatomic, retain) MercuryLayoutView* rootview;
@property (nonatomic, retain) MercuryMain* dialogparent;

- (id) initWithMenu:(UINavigationController*) inmenu;
- (id)initWithMenu:(UINavigationController *)inmenu showLogoutButton:(BOOL) showlogout;
- (void) showMenu;
- (void) showSubMenu;
- (void) logout;
- (void)setPageJSON:(NSDictionary*) pagejson;
- (void) loadNewObjectName:(NSString*) actionname;
- (void) loadNewObjectName:(NSString *)actionname additionalFields:(NSDictionary*) additionalfields;
-(void) dataManager:(MercuryDataManager*) datamanager Actionresponse:(NSDictionary *) response;
- (void) showLandingScreen;
- (void) dataManager:(MercuryDataManager *)datamanager LandingPageNameresponse:(NSDictionary *) response;
@end
