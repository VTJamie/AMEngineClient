//
//  AssistedTableViewCell.m
//  AssistedViewController
//
//  Created by Jamieson Abbott on 2/27/11.
//  Copyright 2011 AM Interfaces. All rights reserved.
//

#import "AssistedTableView.h"


@implementation AssistedUITableViewCell

@synthesize parent;

- (id) initWithParent: (id) myparent andReuseIdentifier:(NSString*) reuseidentifier
{    
    [super initWithStyle:UITableViewCellStyleSubtitle reuseIdentifier:reuseidentifier];
 //   self.backgroundColor = [UIColor blackColor];
	return self;
}

@end
