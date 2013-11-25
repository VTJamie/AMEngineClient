//
//  MercuryTableViewCell.m
//  MercuryViewController
//
//  Created by Sudhakar Moparthy on 2/27/11.
//  Copyright 2011 AbbottWebDev. All rights reserved.
//

#import "MercuryUITableViewCell.h"


@implementation MercuryUITableViewCell

@synthesize parent;
@synthesize controls;

- (id) initWithParent: (id) myparent andReuseIdentifier:(NSString*) reuseidentifier
{    
    [super initWithStyle:UITableViewCellStyleValue1 reuseIdentifier:reuseidentifier];
	self.parent = myparent;
    self.controls = [[NSMutableDictionary alloc] init];
    self.backgroundColor = [UIColor whiteColor];
	return self;
}


- (void) showControls
{
	NSEnumerator* keyenum = [self.controls keyEnumerator];
	
	for (int i = self.controls.count; i > 0; i--) 
	{
		UIControl* curcontrol = [self.controls objectForKey:[keyenum nextObject]];
		[self.contentView addSubview: curcontrol];
	}	
}

- (BOOL) setValue:(NSString*) name data: (NSString*) value
{
	if([[self.controls objectForKey:name] isKindOfClass:[UITextField class]])
	{
		((UITextField*)[self.controls objectForKey:name]).text = value;
		return YES;
	}
    else if([[self.controls objectForKey:name] isKindOfClass:[UILabel class]])
    {
        ((UILabel*)[self.controls objectForKey:name]).text = value;
        return YES;
    }    
	return NO;
}

@end
