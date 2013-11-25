//
//  MercurySubMenu.m
//  Mercury
//
//  Created by Jamieson Abbott on 3/17/12.
//  Copyright (c) 2012 AbbottWebDev. All rights reserved.
//

#import "MercurySubMenu.h"
#import "MercuryStaticVariables.h"

#import "AMConstants.h"

@implementation MercurySubMenu

@synthesize menujson;
@synthesize displayviewcontroller;

- (id)initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil
{
    self = [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil];
    if (self) 
    {
        self.title = @"Sub Menu";
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

//-(void) dataManager:(MercuryDataManager*) datamanager Actionresponse:(NSDictionary *) response
//{
//    MercuryMain* newviewcontroller = [[MercuryMain alloc] initWithMenu:nil showLogoutButton:NO];
//    newviewcontroller.dialogparent = displayviewcontroller;
//    [displayviewcontroller.navigationController pushViewController:newviewcontroller animated:YES];
//    [newviewcontroller setPageJSON:response];    
//}

- (void) forTableViewController: (AssistedTableView*) tableController cellToFill:(AssistedUITableViewCell*) newcell atIndexPath:(NSIndexPath*) indexPath
{
    UILabel* label = [[UILabel alloc] initWithFrame:CGRectMake(5, 5, newcell.frame.size.width, newcell.frame.size.height-10)];
    
   // NSLog(@"%@", self.menujson);
    NSDictionary* menuitem = [self.menujson objectAtIndex:indexPath.row];
    label.text = [menuitem objectForKey:[AMConstants C:LABEL]];
    [newcell addSubview:label];
}
- (NSInteger) numberOfRowsInSection: (NSInteger) section
{ 
    return self.menujson.count;
}

- (void) forTableViewController: (AssistedTableView*) tableController didSelectRowAtIndexPath: (NSIndexPath*) indexPath
{
    NSDictionary* curmenuitem = [self.menujson objectAtIndex:indexPath.row];
    //NSLog(@"%@", [curmenuitem objectForKey:DATA_OBJECT_MENU_DATA_OBJECT_NAME]);
   // NSLog(@"%@", self.displayviewcontroller.rootview);
    NSDictionary* fieldvalues = [displayviewcontroller.rootview getFieldValues];
  //  NSLog(@"%@", fieldvalues);
    NSMutableDictionary* coupledfields = [[NSMutableDictionary alloc] init];
    for(NSDictionary* fieldcouple in [curmenuitem objectForKey:[AMConstants C:DATA_OBJECT_MENU_FIELD_DATA_COUPLINGS]])
    {
        NSString* sourcefieldname = [NSString stringWithFormat:@"%@%@", [AMConstants C:FIELD_PREFIX], [fieldcouple objectForKey:[AMConstants C:DATA_OBJECT_MENU_FIELD_DATA_COUPLING_SOURCE]]];
        NSString* targetname = [NSString stringWithFormat:@"%@%@", [AMConstants C:FIELD_PREFIX], [fieldcouple objectForKey:[AMConstants C:DATA_OBJECT_MENU_FIELD_DATA_COUPLING_TARGET]]];
        [coupledfields setObject:[fieldvalues objectForKey:sourcefieldname] forKey:targetname];
    }
    
     
    NSArray* transfervalues = [curmenuitem objectForKey:[AMConstants C:DATA_OBJECT_MENU_FIELD_STATIC_COUPLINGS]];
    for(NSDictionary* curvaluetransfer in transfervalues)
    {
        [coupledfields 
         setObject:[curvaluetransfer objectForKey:[AMConstants C:DATA_OBJECT_MENU_FIELD_STATIC_COUPLING_VALUE]] 
         forKey:[NSString stringWithFormat:@"%@%@", [AMConstants C: FIELD_PREFIX], [curvaluetransfer objectForKey:[AMConstants C:DATA_OBJECT_MENU_FIELD_STATIC_COUPLING_TARGET]]]];
    }

    
    MercuryMain* newview = [[MercuryMain alloc] initWithMenu:nil showLogoutButton:NO];
    [self.displayviewcontroller.navigationController pushViewController:newview animated:YES];
    newview.dialogparent = displayviewcontroller;
    [newview loadNewObjectName:[curmenuitem objectForKey:[AMConstants C:MENU_ITEM_ACTION]] additionalFields:coupledfields];
    
    [self dismissMercuryMenu];
    
}

@end
