//
//  AMConstants.m
//  Mercury
//
//  Created by Jamieson Abbott on 3/21/12.
//  Copyright (c) 2012 AbbottWebDev. All rights reserved.
//

#import "AMConstants.h"
#import "MercuryDataManager.h"
#import "SBJson.h"

@implementation AMConstants

@synthesize constants;
@synthesize target;
@synthesize selector;
@synthesize loaded;

- (id) init
{
    self = [super init];
    if(self)
    {
        self.constants = [[NSMutableDictionary alloc] init];
        [self.constants setObject:@"r-1" forKey:REQUEST_TYPE_IDENTIFIER];
        [self.constants setObject:@"RC" forKey:REQUEST_TYPE_FIELD_CONSTANTS];
        [self.constants setObject:@"constants" forKey:CONSTANTS];
        self.loaded = NO;
    }
    return self;
}

- (id) initWithInitializingTarget: (id) seltarget andSelector: (SEL) selselector
{
    self = [super init];
    if(self)
    {
        self.target = seltarget;
        self.selector = selselector;
        self.loaded = NO;
    }
    return self;
}



+ (AMConstants *)sharedInstance
{
    // the instance of this class is stored here
    static AMConstants *myInstance = nil;
    
    // check to see if an instance already exists
    if (nil == myInstance) 
    {
        myInstance  = [[[self class] alloc] init];
        // initialize variables here
    }
    // return the instance of this class
    return myInstance;
}

+ (void) fillConstantsWithTarget: (id) target andSelector: (SEL) afterloadselector
{
    //[AMConstants sharedInstance].constants = [[NSMutableDictionary alloc] init];
    NSMutableDictionary* postdata = [[NSMutableDictionary alloc] init];
    [postdata setObject:[AMConstants C:REQUEST_TYPE_FIELD_CONSTANTS] forKey:[AMConstants C:REQUEST_TYPE_IDENTIFIER]];
    [MercuryDataManager sendRequest:postdata withTarget:[[AMConstants alloc] initWithInitializingTarget:target andSelector:afterloadselector] andSelector:@selector(dataManager:jsonresponse:)];
    //NSString* response = [MercuryDataManager sendSynchronousRequest:postdata];
 
}

- (void) dataManager: (MercuryDataManager*)datamanager jsonresponse:(NSDictionary *) response
{
   // SBJsonParser* parser = [[SBJsonParser alloc] init];
   // NSDictionary* constantsdict = [parser objectWithString:response];
    [AMConstants sharedInstance].constants = [NSMutableDictionary dictionaryWithDictionary: [response objectForKey:[AMConstants C:CONSTANTS]]];
    [AMConstants sharedInstance].loaded = YES;
    NSLog(@"%@", [AMConstants sharedInstance].constants);
    
    [target performSelector: selector];
}

+ (BOOL) isLoaded
{
    return [AMConstants sharedInstance].loaded;
}

+ (NSString*) C:(NSString*) key
{
    NSString* val = [[AMConstants sharedInstance].constants objectForKey:key];
    if(val == nil)
    {
        NSLog(@"Key not found: %@", key);
        NSLog(@"%@", [AMConstants sharedInstance].constants);
    }
    return val;
}

NSString* const REQUEST_TYPE_IDENTIFIER = @"REQUEST_TYPE_IDENTIFIER";
NSString* const REQUEST_TYPE_SUB_IDENTIFIER = @"REQUEST_TYPE_SUB_IDENTIFIER";
NSString* const REQUEST_OBJECT_NAME = @"REQUEST_OBJECT_NAME";
NSString* const REQUEST_DATA_OBJECT_ID = @"REQUEST_DATA_OBJECT_ID";
NSString* const REQUEST_FIELD_ACTION_PROPERTY_NAME = @"REQUEST_FIELD_ACTION_PROPERTY_NAME";

NSString* const REQUEST_MAIN_OBJECT_ID = @"REQUEST_MAIN_OBJECT_ID";
NSString* const REQUEST_MAIN_OBJECT_FIELD_NAME = @"REQUEST_MAIN_OBJECT_FIELD_NAME";
NSString* const REQUEST_COMPLEX_ITEM_ID = @"REQUEST_COMPLEX_ITEM_ID";
NSString* const REQUEST_GRID_VIEW_ITEM_ID = @"REQUEST_GRID_VIEW_ITEM_ID";

NSString* const CONSTANTS = @"CONSTANTS";

NSString* const REQUEST_TYPE_FIELD_CONSTANTS = @"REQUEST_TYPE_FIELD_CONSTANTS";
NSString* const REQUEST_TYPE_FULL_DEFINITION = @"REQUEST_TYPE_FULL_DEFINITION";
NSString* const REQUEST_TYPE_REFRESH_CONTROLS = @"REQUEST_TYPE_REFRESH_CONTROLS";
NSString* const REQUEST_TYPE_FIELD_REQUEST = @"REQUEST_TYPE_FIELD_REQUEST";
NSString* const REQUEST_TYPE_PERFORM_ACTION = @"REQUEST_TYPE_PERFORM_ACTION";
NSString* const REQUEST_TYPE_FIELD_SUBMIT = @"REQUEST_TYPE_FIELD_SUBMIT";
NSString* const REQUEST_TYPE_FIELD_CANCEL = @"REQUEST_TYPE_FIELD_CANCEL";
NSString* const REQUEST_TYPE_FIELD_COMPLEX_ITEM_LIST_NEW_ITEM = @"REQUEST_TYPE_FIELD_COMPLEX_ITEM_LIST_NEW_ITEM";
NSString* const REQUEST_TYPE_FIELD_COMPLEX_ITEM_LIST_EDIT = @"REQUEST_TYPE_FIELD_COMPLEX_ITEM_LIST_EDIT";
NSString* const REQUEST_TYPE_FIELD_COMPLEX_ITEM_LIST_SAVE_ITEM = @"REQUEST_TYPE_FIELD_COMPLEX_ITEM_LIST_SAVE_ITEM";
NSString* const REQUEST_TYPE_FIELD_COMPLEX_ITEM_LIST_REMOVE_ITEM = @"REQUEST_TYPE_FIELD_COMPLEX_ITEM_LIST_REMOVE_ITEM";
NSString* const REQUEST_TYPE_SET_FILE = @"REQUEST_TYPE_SET_FILE";
NSString* const REQUEST_TYPE_GET_FILE = @"REQUEST_TYPE_GET_FILE";
NSString* const REQUEST_TYPE_GRID_RELOAD = @"REQUEST_TYPE_GRID_RELOAD";
NSString* const REQUEST_TYPE_GRID_DELETE = @"REQUEST_TYPE_GRID_DELETE";
NSString* const REQUEST_TYPE_MENU = @"REQUEST_TYPE_MENU";
NSString* const REQUEST_TYPE_LOGOUT = @"REQUEST_TYPE_LOGOUT";
NSString* const REQUEST_TYPE_LANDING_NAME = @"REQUEST_TYPE_LANDING_NAME";
NSString* const REQUEST_TYPE_ACTION = @"REQUEST_TYPE_ACTION";

NSString* const SESSION_VALID = @"SESSION_VALID";
NSString* const ID = @"ID";
NSString* const OBJECT_NAME = @"OBJECT_NAME";
NSString* const DISPLAY_NAME = @"DISPLAY_NAME";
NSString* const LABEL = @"LABEL";
NSString* const CURRENT_VALUE = @"CURRENT_VALUE";
NSString* const MAX_LENGTH = @"MAX_LENGTH";
NSString* const EDITABLE = @"EDITABLE";
NSString* const REQUIRED = @"REQUIRED";
NSString* const CONTROL_ARRAY = @"CONTROL_ARRAY";
NSString* const FIELD_PREFIX = @"FIELD_PREFIX";
NSString* const ACTION_PREFIX = @"ACTION_PREFIX";
NSString* const PERSISTED_PREFIX = @"PERSISTED_PREFIX";
NSString* const REFRESH_FIELD_PREFIX = @"REFRESH_FIELD_PREFIX";
NSString* const PERSIST = @"PERSIST";
NSString* const ERRORS = @"ERRORS";
NSString* const ERROR_MESSAGE = @"ERROR_MESSAGE";
NSString* const ERROR_FIELD = @"ERROR_FIELD";
NSString* const CONTROL_TYPE = @"CONTROL_TYPE";
NSString* const SELECT_ITEMS = @"SELECT_ITEMS";
NSString* const SELECT_ITEM_VALUE = @"SELECT_ITEM_VALUE";
NSString* const SELECT_ITEM_LABEL = @"SELECT_ITEM_LABEL";
NSString* const SELECT_ITEM_IS_SELECTED = @"SELECT_ITEM_IS_SELECTED";
NSString* const SELECT_DISPLAY_TYPE = @"SELECT_DISPLAY_TYPE";
NSString* const MAX_FILE_SIZE = @"MAX_FILE_SIZE";
NSString* const FILE_NAME = @"FILE_NAME";
NSString* const ERROR = @"ERROR";
NSString* const IS_VISIBLE = @"IS_VISIBLE";
NSString* const CHANGE_TRIGGERS_REFRESH = @"CHANGE_TRIGGERS_REFRESH";

NSString* const RESPONSE_BODY = @"RESPONSE_BODY";
NSString* const RESPONSE_TYPE_IDENTIFIER = @"RESPONSE_TYPE_IDENTIFIER";

NSString* const CONTROL_TYPE_TEXT = @"CONTROL_TYPE_TEXT";
NSString* const CONTROL_TYPE_DATE = @"CONTROL_TYPE_DATE";
NSString* const CONTROL_TYPE_SELECT = @"CONTROL_TYPE_SELECT";
NSString* const CONTROL_TYPE_GRID = @"CONTROL_TYPE_GRID";
NSString* const CONTROL_TYPE_BUTTON = @"CONTROL_TYPE_BUTTON";
NSString* const CONTROL_TYPE_GROUP = @"CONTROL_TYPE_GROUP";
NSString* const CONTROL_TYPE_COMPLEX_ITEM_LIST = @"CONTROL_TYPE_COMPLEX_ITEM_LIST";
NSString* const CONTROL_TYPE_FILE = @"CONTROL_TYPE_FILE";

NSString* const BUTTON_TYPE = @"BUTTON_TYPE";

NSString* const GRID_VIEW_CURRENT_PAGE = @"GRID_VIEW_CURRENT_PAGE";
NSString* const GRID_VIEW_PAGE_SIZE = @"GRID_VIEW_PAGE_SIZE";
NSString* const GRID_VIEW_TOTAL_NUMBER = @"GRID_VIEW_TOTAL_NUMBER";
NSString* const GRID_VIEW_NUMBER_OF_PAGES = @"GRID_VIEW_NUMBER_OF_PAGES";
NSString* const GRID_VIEW_NUMBER_OF_SUPPLIED_RECORDS = @"GRID_VIEW_NUMBER_OF_SUPPLIED_RECORDS";
NSString* const GRID_VIEW_COLUMN_LIST = @"GRID_VIEW_COLUMN_LIST";
NSString* const GRID_VIEW_COLUMN_NAME = @"GRID_VIEW_COLUMN_NAME";
NSString* const GRID_VIEW_COLUMN_IS_VISIBLE = @"GRID_VIEW_COLUMN_IS_VISIBLE";
NSString* const GRID_VIEW_DATA = @"GRID_VIEW_DATA";
NSString* const GRID_VIEW_ROW_CELL_DATA_ARRAY = @"GRID_VIEW_ROW_CELL_DATA_ARRAY";
NSString* const GRID_VIEW_GRID_DETAILS = @"GRID_VIEW_GRID_DETAILS";
NSString* const GRID_VIEW_DELETE_ACTION = @"GRID_VIEW_DELETE_ACTION";
NSString* const GRID_VIEW_RELOAD_REQUEST_PAGE = @"GRID_VIEW_RELOAD_REQUEST_PAGE";
NSString* const GRID_VIEW_RELOAD_REQUEST_ROWS = @"GRID_VIEW_RELOAD_REQUEST_ROWS";
NSString* const GRID_VIEW_RELOAD_REQUEST_SORT_NAME = @"GRID_VIEW_RELOAD_REQUEST_SORT_NAME";
NSString* const GRID_VIEW_RELOAD_REQUEST_SORT_ORDER = @"GRID_VIEW_RELOAD_REQUEST_SORT_ORDER";
NSString* const GRID_VIEW_COLUMN_TYPE = @"GRID_VIEW_COLUMN_TYPE";
NSString* const GRID_VIEW_COLUMN_TYPE_DISPLAY = @"GRID_VIEW_COLUMN_TYPE_DISPLAY";
//NSString* const GRID_VIEW_COLUMN_TYPE_DELETE = @"GRID_VIEW_COLUMN_TYPE_DELETE";


NSString* const MENU = @"MENU";
NSString* const MENU_ARRAY = @"MENU_ARRAY";
NSString* const MENU_ITEM_NAME = @"MENU_ITEM_NAME";
NSString* const MENU_ITEM_SUB_LIST = @"MENU_ITEM_SUB_LIST";
NSString* const MENU_ITEM_ACTION = @"MENU_ITEM_ACTION";
NSString* const MENU_ITEM_TRANSFER_VALUES = @"MENU_ITEM_TRANSFER_VALUES";
NSString* const MENU_ITEM_TRANSFER_VALUES_FIELD = @"MENU_ITEM_TRANSFER_VALUES_FIELD";
NSString* const MENU_ITEM_TRANSFER_VALUES_VALUE = @"MENU_ITEM_TRANSFER_VALUES_VALUE";

NSString* const ROOT_OBJECT = @"ROOT_OBJECT";
NSString* const GROUP_ID = @"GROUP_ID";
NSString* const GROUP_NAME = @"GROUP_NAME";
NSString* const GROUP_TABLE_NUMBER_OF_COLUMNS = @"GROUP_TABLE_NUMBER_OF_COLUMNS";
NSString* const GROUP_TYPE = @"GROUP_TYPE";
NSString* const GROUP_TYPE_TABLE = @"GROUP_TYPE_TABLE";
NSString* const GROUP_TYPE_COLLAPSIBLE = @"GROUP_TYPE_COLLAPSIBLE";

//  NSString* const DATA_OBJECT_MENU_ITEM_NAME = @"DATA_OBJECT_MENU_ITEM_NAME";
//  NSString* const DATA_OBJECT_MENU_DATA_OBJECT_NAME = @"DATA_OBJECT_MENU_DATA_OBJECT_NAME";
NSString* const DATA_OBJECT_MENU_FIELD_DATA_COUPLINGS = @"DATA_OBJECT_MENU_FIELD_DATA_COUPLINGS";
NSString* const DATA_OBJECT_MENU_FIELD_DATA_COUPLING_TARGET = @"DATA_OBJECT_MENU_FIELD_DATA_COUPLING_TARGET";
NSString* const DATA_OBJECT_MENU_FIELD_DATA_COUPLING_SOURCE = @"DATA_OBJECT_MENU_FIELD_DATA_COUPLING_SOURCE";
//  NSString* const DATA_OBJECT_MENU_ARRAY = @"DATA_OBJECT_MENU_ARRAY";
NSString* const DATA_OBJECT_MENU_FIELD_STATIC_COUPLINGS = @"DATA_OBJECT_MENU_FIELD_STATIC_COUPLINGS";
NSString* const DATA_OBJECT_MENU_FIELD_STATIC_COUPLING_TARGET = @"DATA_OBJECT_MENU_FIELD_STATIC_COUPLING_TARGET";
NSString* const DATA_OBJECT_MENU_FIELD_STATIC_COUPLING_VALUE = @"DATA_OBJECT_MENU_FIELD_STATIC_COUPLING_VALUE";

NSString* const GRID_VIEW_DATA_OBJECT_LAUNCH = @"GRID_VIEW_DATA_OBJECT_LAUNCH";
NSString* const GRID_VIEW_DATA_OBJECT_LAUNCH_OBJECT_NAME = @"GRID_VIEW_DATA_OBJECT_LAUNCH_OBJECT_NAME";
NSString* const GRID_VIEW_DATA_OBJECT_LAUNCH_TARGET_FIELD = @"GRID_VIEW_DATA_OBJECT_LAUNCH_TARGET_FIELD";

NSString* const COMPLEX_ITEM_BODY = @"COMPLEX_ITEM_BODY";
NSString* const COMPLEX_ITEM_IDENTIFIER = @"COMPLEX_ITEM_IDENTIFIER";
NSString* const IS_DIALOG = @"IS_DIALOG";
NSString* const MAIN_REQUEST_OBJECT_ID = @"MAIN_REQUEST_OBJECT_ID";

NSString* const MAIN_REQUEST_FIELD_NAME = @"MAIN_REQUEST_FIELD_NAME";

NSString* const BUTTON_TYPE_SUBMIT = @"BUTTON_TYPE_SUBMIT";
NSString* const BUTTON_TYPE_CANCEL = @"BUTTON_TYPE_CANCEL";

NSString* const SELECT_DISPAY_TYPE_DROPDOWN = @"SELECT_DISPAY_TYPE_DROPDOWN";
NSString* const SELECT_DISPAY_TYPE_MULTISELECT = @"SELECT_DISPAY_TYPE_MULTISELECT";
NSString* const SELECT_DISPAY_TYPE_RADIO = @"SELECT_DISPAY_TYPE_RADIO";
NSString* const SELECT_DISPAY_TYPE_CHECKBOX = @"SELECT_DISPAY_TYPE_CHECKBOX";

NSString* const SELECT_ITEM_VALUE_SEPERATOR = @"SELECT_ITEM_VALUE_SEPERATOR";


@end