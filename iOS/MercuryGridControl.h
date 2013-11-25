//
//  MercuryGridControl.h
//  Mercury
//
//  Created by Sudhakar Moparthy on 11/25/11.
//  Copyright (c) 2011 AbbottWebDev. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "MercuryGroup.h"

@interface MercuryGridViewCell : UITableViewCell
{
    NSDictionary* griddefinition;
    NSDictionary* row;
}
@property (nonatomic, retain) NSDictionary* griddefinition;
@property (nonatomic, retain) NSDictionary* row;

@end

@interface MercuryGridControl : MercuryBaseUIView <UITableViewDelegate, UITableViewDataSource>
{
    UILabel* label;
    UITableView* tableview;
    NSDictionary* data;
}
@property (nonatomic, retain) UILabel* label;
@property (nonatomic, retain) UITableView* tableview;
@property (nonatomic, retain) NSDictionary* data;

+ (void) runSearch:(NSString*) searchgroup withParentGroup:(MercuryBaseUIView*) group;
+ (MercuryGridControl*) getGridControlWithSearchGroup:(NSString*)searchgroup underGroup: (MercuryBaseUIView*) group;
- (void) executeSearch;
@end
