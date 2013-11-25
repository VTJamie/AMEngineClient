//
//  MercuryLogin.m
//  Mercury
//
//  Created by Jamieson Abbott on 3/7/12.
//  Copyright (c) 2012 AM Interfaces. All rights reserved.
//

#import "MercuryMenu.h"
#import "MercuryDataManager.h"

#import "AssistedTableView.h"
#import "MercuryStaticVariables.h"
#import "AMConstants.h"

@implementation MercuryMenu

@synthesize menujson;
@synthesize currentlevel;
@synthesize displayviewcontroller;

- (id)initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil
{
    self = [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil];
    if (self) 
    {
        self.title = @"Menu";
        AssistedTableView* tableview = [[AssistedTableView alloc] init];
        [tableview addTarget:self andSectionTitle:nil andAccessoryType:UITableViewCellAccessoryDisclosureIndicator andSelectionType:UITableViewCellSelectionStyleGray inSection:0 andHeight:40];
        self.view = tableview;
        
        UIBarButtonItem* cancelbutton = [[UIBarButtonItem alloc] initWithTitle:@"Cancel" style:UIBarButtonItemStyleDone target:self action:@selector(dismissMercuryMenu)];
        self.navigationItem.rightBarButtonItem = cancelbutton;
        
    }
    
    
    return self;
}

-(void)dismissMercuryMenu
{
    [self dismissModalViewControllerAnimated:YES];
}



- (void) reloadMenu
{
    NSMutableDictionary* postdata = [[NSMutableDictionary alloc] init];
    [postdata setObject:[AMConstants C:REQUEST_TYPE_MENU] forKey:[AMConstants C:REQUEST_TYPE_IDENTIFIER]]; 
    [MercuryStaticVariables fillDictionary:postdata withPersistDictionary:[MercuryStaticVariables sharedInstance].persist];
    [MercuryDataManager sendRequest:postdata withTarget:self andSelector:@selector(dataManager:Menuresponse:)];
    [self.navigationController popToRootViewControllerAnimated:YES];
    
}

-(void) dataManager:(MercuryDataManager*) datamanager Menuresponse:(NSDictionary *) response
{
    menujson = response;
    [menujson retain];
    NSDictionary* menu = [menujson objectForKey:[AMConstants C:MENU]];
    
    currentlevel = [menu objectForKey:[AMConstants C:MENU_ARRAY]];
    [(AssistedTableView*)self.view reloadData];
}

-(void) dataManager:(MercuryDataManager*) datamanager Actionresponse:(NSDictionary *) response
{   
    [displayviewcontroller setPageJSON:response];    
}

- (void) forTableViewController: (AssistedTableView*) tableController cellToFill:(AssistedUITableViewCell*) newcell atIndexPath:(NSIndexPath*) indexPath
{
    UILabel* label = [[UILabel alloc] initWithFrame:CGRectMake(5, 5, newcell.frame.size.width, newcell.frame.size.height-10)];
    
    NSDictionary* menuitem = [ currentlevel objectAtIndex:indexPath.row];
    label.text = [menuitem objectForKey:[AMConstants C:MENU_ITEM_NAME]];
    [newcell addSubview:label];
}
- (NSInteger) numberOfRowsInSection: (NSInteger) section
{ 
    return currentlevel.count;
}

- (void) forTableViewController: (AssistedTableView*) tableController didSelectRowAtIndexPath: (NSIndexPath*) indexPath
{
    NSDictionary* selectedoption = [currentlevel objectAtIndex:indexPath.row];
    if([selectedoption objectForKey:[AMConstants C:MENU_ITEM_ACTION]] != nil && [(NSString*)[selectedoption objectForKey:[AMConstants C:MENU_ITEM_ACTION]] compare:@""] != NSOrderedSame)
    {
        NSLog(@"%@", [selectedoption objectForKey:[AMConstants C:MENU_ITEM_ACTION]]);
        NSMutableDictionary* valuedict = [[NSMutableDictionary alloc] init];
        NSArray* transfervalues = [selectedoption objectForKey:[AMConstants C:MENU_ITEM_TRANSFER_VALUES]];
        for(NSDictionary* curvaluetransfer in transfervalues)
        {
            [valuedict 
             setObject:[curvaluetransfer objectForKey:[AMConstants C:MENU_ITEM_TRANSFER_VALUES_VALUE]] 
             forKey:[NSString stringWithFormat:@"%@%@", [AMConstants C: FIELD_PREFIX], [curvaluetransfer objectForKey:[AMConstants C:MENU_ITEM_TRANSFER_VALUES_FIELD]]]];
        }
        
        [displayviewcontroller loadNewObjectName:[[currentlevel objectAtIndex:indexPath.row] objectForKey:[AMConstants C:MENU_ITEM_ACTION]] additionalFields:valuedict];
        
        [self dismissMercuryMenu];
    }
    else 
    {
        MercuryMenu* newmenu = [[MercuryMenu alloc] init];
        newmenu.displayviewcontroller = self.displayviewcontroller;
        newmenu.currentlevel = [selectedoption objectForKey:[AMConstants C:MENU_ITEM_SUB_LIST]];
        [self.navigationController pushViewController:newmenu animated:YES];
    }
}
@end
