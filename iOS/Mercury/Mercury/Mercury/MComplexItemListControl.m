//
//  AMComplexItemListControl.m
//  Mercury
//
//  Created by Jamieson Abbott on 3/16/12.
//  Copyright (c) 2012 AM Interfaces. All rights reserved.
//

#import "AMComplexItemListControl.h"
#import "MercuryDataManager.h"
#import "MercuryLayoutView.h"
#import "MercuryStaticVariables.h"

#import "AMConstants.h"

@implementation AMComplexItemListControl

@synthesize addbutton;
@synthesize label;
@synthesize tableview;
@synthesize currentdata;

- (id) initWithFrame:(CGRect)frame andJsonDefinition:(NSDictionary *)jsondefinition andRootDefinition:(NSDictionary *)root
{
    self = [super initWithFrame:CGRectMake(frame.origin.x, frame.origin.y, frame.size.width, 300) andJsonDefinition:jsondefinition andRootDefinition:root];
    if (self) 
    {
        label = [[UILabel alloc] initWithFrame:CGRectMake(2, 2, frame.size.width-52, 30)];
        label.text = [jsondefinition objectForKey:[AMConstants C:LABEL]];
        label.numberOfLines = 0;
        label.lineBreakMode = UILineBreakModeWordWrap;
        [label sizeToFit];
        label.frame = CGRectMake(2, 2, frame.size.width-52, label.frame.size.height);
        [self addSubview:label];            
        
        self.addbutton = [UIButton buttonWithType:UIButtonTypeRoundedRect];
        self.addbutton.frame = CGRectMake(self.frame.size.width-72, 2, 50, 30);

        [self.addbutton addTarget:self action:@selector(addButtonClick) forControlEvents:UIControlEventTouchUpInside];
        [self.addbutton setTitle:@"Add" forState:UIControlStateNormal];
        [self addSubview:self.addbutton];
        self.tableview  = [[AssistedTableView alloc] initWithFrame:CGRectMake(2, 34, self.frame.size.width-24, self.frame.size.height-36) style:UITableViewStyleGrouped];
        [self.tableview addTarget:self andSectionTitle:nil andAccessoryType:UITableViewCellAccessoryNone andSelectionType:UITableViewCellSelectionStyleBlue inSection:0 andHeight:45];
        
        currentdata = [jsondefinition objectForKey:[AMConstants C:GRID_VIEW_GRID_DETAILS]];
        //   [MercuryDataManager testAlert:[NSString stringWithFormat:@"%@", currentdata]];
        
        [self addSubview:self.tableview];
        self.tableview.layer.borderWidth = 1.0f;
        self.tableview.layer.borderColor = [UIColor blackColor].CGColor;
        [self.tableview reloadData];
        
    }
    return self;
}

- (void) addButtonClick
{
    NSMutableDictionary* postdata = [[NSMutableDictionary alloc] init];
    [postdata setObject:[AMConstants C:REQUEST_TYPE_FIELD_REQUEST] forKey:[AMConstants C:REQUEST_TYPE_IDENTIFIER]]; 
    [postdata setObject:[AMConstants C:REQUEST_TYPE_FIELD_COMPLEX_ITEM_LIST_NEW_ITEM] forKey:[AMConstants C:REQUEST_TYPE_SUB_IDENTIFIER]];
    [postdata setObject:[self.definition objectForKey:[AMConstants C:ID]] forKey:[AMConstants C:REQUEST_FIELD_ACTION_PROPERTY_NAME]];
    [postdata setObject:[[self.rootdefinition objectForKey: [AMConstants C:RESPONSE_BODY]] objectForKey: [AMConstants C:ID]] forKey:[AMConstants C:REQUEST_DATA_OBJECT_ID]];
    [postdata setObject:[[self.rootdefinition objectForKey: [AMConstants C:RESPONSE_BODY]] objectForKey: [AMConstants C:OBJECT_NAME]] forKey:[AMConstants C:REQUEST_OBJECT_NAME]];
    [MercuryStaticVariables fillDictionary:postdata withPersistDictionary:[MercuryStaticVariables sharedInstance].persist];
    [MercuryDataManager sendRequest:postdata withTarget:self andSelector:@selector(dataManager:addButtonClickResponse:)];
    

}

- (void) dataManager: (MercuryDataManager*)datamanager addButtonClickResponse:(NSDictionary *) response
{    
    MercuryMain* newmain = [[MercuryMain alloc] initWithMenu:nil showLogoutButton:NO];
    newmain.dialogparent = [(MercuryLayoutView*)self.superview getTopParent].parentcontroller;
    UINavigationController* navcontrol = [[UINavigationController alloc] initWithRootViewController:newmain];
    [newmain setPageJSON:response];
    [[(MercuryLayoutView*)self.superview getTopParent].parentcontroller presentModalViewController:navcontrol animated:YES];
   // NSLog(@"%@", response);
}

- (void) forTableViewController: (AssistedTableView*) tableController cellToFill:(AssistedUITableViewCell*) newcell atIndexPath:(NSIndexPath*) indexPath
{
    //  UILabel* firstlabel = [[UILabel alloc ] initWithFrame:CGRectMake(2, 2, newcell.contentView.frame.size.width-4, (newcell.contentView.frame.size.height-4)/2.0f)];
    //  UILabel* secondlabel = [[UILabel alloc ] initWithFrame:CGRectMake(2, (newcell.contentView.frame.size.height-4)/2.0f+2, newcell.contentView.frame.size.width-4, (newcell.contentView.frame.size.height-4)/2.0f)];
    //  firstlabel.font = [UIFont systemFontOfSize:14];
    //  secondlabel.font = [UIFont systemFontOfSize:12];
    NSArray* columnvalues = [[[currentdata objectForKey:[AMConstants C:GRID_VIEW_DATA]] objectAtIndex:indexPath.row] objectForKey:[AMConstants C:GRID_VIEW_ROW_CELL_DATA_ARRAY]];
    BOOL firstfieldfound = NO;
    NSMutableString* secondstring = [[NSMutableString alloc] init];
    
    NSArray* gridcolumnlist = [[self.definition objectForKey:[AMConstants C:GRID_VIEW_GRID_DETAILS]] objectForKey:[AMConstants C:GRID_VIEW_COLUMN_LIST]];
    for(int i = 0; i < gridcolumnlist.count; i++)
    {
        NSDictionary* column = [gridcolumnlist objectAtIndex:i];
        if([[column objectForKey:[AMConstants C:GRID_VIEW_COLUMN_IS_VISIBLE]] boolValue])
        {
            if(!firstfieldfound)
            {                
                newcell.textLabel.text = [columnvalues objectAtIndex:i];
                firstfieldfound = YES;
            }
            else 
            {
                if(secondstring.length > 0)
                {
                    [secondstring appendString:@" "];
                }
                [secondstring appendString:[columnvalues objectAtIndex:i]];
            }
        }
    }
    newcell.detailTextLabel.text = secondstring;
    [newcell addSubview:newcell.contentView];
    //  secondlabel.text = secondstring;
    //  [newcell.contentView addSubview:firstlabel];
    //  [newcell.contentView addSubview:secondlabel];
    //      [newcell.contentView bringSubviewToFront:firstlabel];
    //      [newcell.contentView bringSubviewToFront:secondlabel];
}
- (NSInteger) numberOfRowsInSection: (NSInteger) section
{
    NSArray* rows = [currentdata objectForKey:[AMConstants C:GRID_VIEW_DATA]];
    
    return [rows count];
}
- (void) forTableViewController: (AssistedTableView*) tableController didSelectRowAtIndexPath: (NSIndexPath*) indexPath
{
    
    NSDictionary* row = [[currentdata objectForKey:[AMConstants C:GRID_VIEW_DATA]] objectAtIndex:indexPath.row];
    NSMutableDictionary* postdata = [[NSMutableDictionary alloc] init];
    [postdata setObject:[AMConstants C:REQUEST_TYPE_FIELD_REQUEST] forKey:[AMConstants C:REQUEST_TYPE_IDENTIFIER]]; 
    [postdata setObject:[AMConstants C:REQUEST_TYPE_FIELD_COMPLEX_ITEM_LIST_EDIT] forKey:[AMConstants C:REQUEST_TYPE_SUB_IDENTIFIER]];
    [postdata setObject:[row objectForKey:[AMConstants C:ID]] forKey:[AMConstants C:REQUEST_COMPLEX_ITEM_ID]];
    [postdata setObject:[self.definition objectForKey:[AMConstants C:ID]] forKey:[AMConstants C:REQUEST_FIELD_ACTION_PROPERTY_NAME]];
    [postdata setObject:[[self.rootdefinition objectForKey: [AMConstants C:RESPONSE_BODY]] objectForKey: [AMConstants C:ID]] forKey:[AMConstants C:REQUEST_DATA_OBJECT_ID]];
    [postdata setObject:[[self.rootdefinition objectForKey: [AMConstants C:RESPONSE_BODY]] objectForKey: [AMConstants C:OBJECT_NAME]] forKey:[AMConstants C:REQUEST_OBJECT_NAME]];
    [MercuryStaticVariables fillDictionary:postdata withPersistDictionary:[MercuryStaticVariables sharedInstance].persist];
    [MercuryDataManager sendRequest:postdata withTarget:self andSelector:@selector(dataManager:addButtonClickResponse:)];
}
-(void)updateJsonDefinition:(NSDictionary *)jsondefinition
{
    [super updateJsonDefinition:jsondefinition];
    
    currentdata = [jsondefinition objectForKey:[AMConstants C:GRID_VIEW_GRID_DETAILS]];
    [self.tableview reloadData];
}


@end
