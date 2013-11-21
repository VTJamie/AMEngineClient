//
//  AssistedTableViewCell.h
//  AssistedViewController
//
//  Created by Jamieson Abbott on 2/27/11.
//  Copyright 2011 Assisted. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>
#import "QuartzCore/QuartzCore.h"


@interface AssistedUITableViewCell : UITableViewCell 

@property (nonatomic, retain) UIViewController* parent;

- (id) initWithParent: (id) myparent andReuseIdentifier:(NSString*) reuseidentifier;
@end
