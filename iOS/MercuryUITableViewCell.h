//
//  MercuryTableViewCell.h
//  MercuryViewController
//
//  Created by Sudhakar Moparthy on 2/27/11.
//  Copyright 2011 AbbottWebDev. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>
#import "QuartzCore/QuartzCore.h"
#import "MercuryLoadedController.h"


@interface MercuryUITableViewCell : UITableViewCell {
	UIViewController* parent;
    NSMutableDictionary* controls;
}

@property (nonatomic, retain) UIViewController* parent;
@property (nonatomic, retain) NSMutableDictionary* controls;

- (id) initWithParent: (id) myparent andReuseIdentifier:(NSString*) reuseidentifier;
- (void) showControls;
- (BOOL) setValue:(NSString*) name data: (NSString*) value;
@end
