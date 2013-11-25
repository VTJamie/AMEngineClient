//
//  AMGridViewControl.m
//  Mercury
//
//  Created by Jamieson Abbott on 3/16/12.
//  Copyright (c) 2012 AM Interfaces. All rights reserved.
//

#import "AMGridViewControl.h"
#import "MercuryDataManager.h"
#import "MercuryLayoutView.h"
#import "AMConstants.h"
#import "MercuryStaticVariables.h"

@implementation AMGridViewControl

@synthesize label;
@synthesize tableview;
@synthesize currentdata;

- (id) initWithFrame:(CGRect)frame andJsonDefinition:(NSDictionary *)jsondefinition andRootDefinition:(NSDictionary *)root
{
    self = [super initWithFrame:CGRectMake(frame.origin.x, frame.origin.y, frame.size.width, 300) andJsonDefinition:jsondefinition andRootDefinition:root];
    if (self) 
    {
        self.label = [[UILabel alloc] initWithFrame:CGRectMake(2, 2, self.frame.size.width-24, 30)];
        self.label.text = [self.definition objectForKey:[AMConstants C:LABEL]];
        [self addSubview:self.label];
        self.tableview  = [[AssistedTableView alloc] initWithFrame:CGRectMake(2, 36, self.frame.size.width-24, self.frame.size.height-38) style:UITableViewStyleGrouped];
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
    NSDictionary* transferinfo = [self.definition objectForKey:[AMConstants C:GRID_VIEW_DATA_OBJECT_LAUNCH]];
    if(transferinfo != nil)
    {
        UINavigationController* navcontroller = [[[(MercuryLayoutView*)self.superview getTopParent] parentcontroller]  navigationController];
        MercuryMain* newmain = [[MercuryMain alloc] initWithMenu:[[(MercuryLayoutView*)self.superview getTopParent] parentcontroller].menu showLogoutButton:NO];
        MercuryLayoutView* layoutview = (MercuryLayoutView*)self.superview;
      //  [[layoutview getTopParent] refreshControls];
        newmain.dialogparent = layoutview.parentcontroller;
        
        [navcontroller pushViewController:newmain animated:YES];
        NSMutableDictionary* fieldvalues = [[NSMutableDictionary alloc] init ];
        [fieldvalues setObject:[row objectForKey:[AMConstants C:ID]] forKey:[NSString stringWithFormat:@"%@%@", [AMConstants C:FIELD_PREFIX], [transferinfo objectForKey:[AMConstants C:GRID_VIEW_DATA_OBJECT_LAUNCH_TARGET_FIELD]]]];
        [newmain loadNewObjectName:[transferinfo objectForKey:[AMConstants C:GRID_VIEW_DATA_OBJECT_LAUNCH_OBJECT_NAME]] additionalFields:fieldvalues];
    }
}
-(void)updateJsonDefinition:(NSDictionary *)jsondefinition
{
    [super updateJsonDefinition:jsondefinition];
   
    currentdata = [jsondefinition objectForKey:[AMConstants C:GRID_VIEW_GRID_DETAILS]];
    [self.tableview reloadData];
}

- (void) commitEditingStyle:(UITableViewCellEditingStyle)editingStyle forRowAtIndexPath:(NSIndexPath *)indexPath
{
    NSDictionary* row = [[currentdata objectForKey:[AMConstants C:GRID_VIEW_DATA]] objectAtIndex:indexPath.row];
    if(editingStyle == UITableViewCellEditingStyleDelete)
    {
    
        NSMutableDictionary* postdata = [[NSMutableDictionary alloc] init];
    
        [postdata setObject:[AMConstants C:REQUEST_TYPE_FIELD_REQUEST] forKey:[AMConstants C:REQUEST_TYPE_IDENTIFIER]]; 
        [postdata setObject:[AMConstants C:REQUEST_TYPE_GRID_DELETE] forKey:[AMConstants C:REQUEST_TYPE_SUB_IDENTIFIER]];
        [postdata setObject:[self.definition objectForKey:[AMConstants C:ID]] forKey:[AMConstants C:REQUEST_FIELD_ACTION_PROPERTY_NAME]];
        [postdata setObject:[row objectForKey:[AMConstants C:ID]] forKey:[AMConstants C:REQUEST_GRID_VIEW_ITEM_ID]];
        [postdata setObject:[[self.rootdefinition objectForKey: [AMConstants C:RESPONSE_BODY]] objectForKey: [AMConstants C:ID]] forKey:[AMConstants C:REQUEST_DATA_OBJECT_ID]];
        [postdata setObject:[[self.rootdefinition objectForKey: [AMConstants C:RESPONSE_BODY]] objectForKey: [AMConstants C:OBJECT_NAME]] forKey:[AMConstants C:REQUEST_OBJECT_NAME]];
     //   [postdata addEntriesFromDictionary:[[self getTopParent] getFieldValues]];        
        [MercuryStaticVariables fillDictionary:postdata withPersistDictionary:[MercuryStaticVariables sharedInstance].persist];
        [MercuryDataManager sendRequest:postdata withTarget:self andSelector:@selector(dataManager:deleteResponse:)];
    }
}

- (void) dataManager:(MercuryDataManager*) datamanager deleteResponse:(NSDictionary*) response
{
    //NSLog(@"%@", response);
    MercuryLayoutView* layoutview = (MercuryLayoutView*)self.superview;
    [[layoutview getTopParent] refreshControls];
}

- (BOOL) canEditRowAtIndexPath:(NSIndexPath *)indexPath
{
    NSDictionary* details = [self.definition objectForKey:[AMConstants C:GRID_VIEW_GRID_DETAILS]];
    return [[details objectForKey:[AMConstants C:GRID_VIEW_DELETE_ACTION]] boolValue];
}

@end
