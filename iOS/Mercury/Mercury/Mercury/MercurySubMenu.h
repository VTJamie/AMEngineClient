//
//  MercurySubMenu.h
//  Mercury
//
//  Created by Jamieson Abbott on 3/17/12.
//  Copyright (c) 2012 AbbottWebDev. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "MercuryMain.h"
#import "MercuryDataManager.h"

@interface MercurySubMenu : UIViewController <AssistedTableViewRowDelegate>
{
    NSArray* menujson;
    MercuryMain* displayviewcontroller;
}
@property (nonatomic, retain) NSArray* menujson;
@property (nonatomic, retain) MercuryMain* displayviewcontroller;

- (void) dismissMercuryMenu;
@end
