//
//  AMConstants.h
//  AMEngine
//
//  Created by Jamieson Abbott on 3/21/12.
//  Copyright (c) 2012 AbbottWebDev. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "AMEngineDataManager.h"

@interface AMConstants : NSObject
{
    NSMutableDictionary* constants;
    id target;
    SEL selector;
    BOOL loaded;
}
@property (nonatomic, retain) NSMutableDictionary* constants;
@property (nonatomic, retain) id target;
@property (nonatomic, assign) SEL selector;
@property (nonatomic, assign) BOOL loaded;

+ (AMConstants *)sharedInstance;
+ (void) fillConstantsWithTarget: (id) target andSelector: (SEL) afterloadselector;
+ (BOOL) isLoaded;
- (void) dataManager: (AMEngineDataManager*)datamanager jsonresponse:(NSDictionary *) response;
+ (NSString*) C:(NSString*) key;

extern NSString* const REQUEST_TYPE_IDENTIFIER;// = @"REQUEST_TYPE_IDENTIFIER";
extern NSString* const REQUEST_TYPE_SUB_IDENTIFIER;// = @"REQUEST_TYPE_SUB_IDENTIFIER";
extern NSString* const REQUEST_OBJECT_NAME;// = @"REQUEST_OBJECT_NAME";
extern NSString* const REQUEST_DATA_OBJECT_ID;// = @"REQUEST_DATA_OBJECT_ID";
extern NSString* const REQUEST_FIELD_ACTION_PROPERTY_NAME;// = @"REQUEST_FIELD_ACTION_PROPERTY_NAME";

extern NSString* const REQUEST_MAIN_OBJECT_ID;// = @"REQUEST_MAIN_OBJECT_ID";
extern NSString* const REQUEST_MAIN_OBJECT_FIELD_NAME;// = @"REQUEST_MAIN_OBJECT_FIELD_NAME";
extern NSString* const REQUEST_COMPLEX_ITEM_ID;// = @"REQUEST_COMPLEX_ITEM_ID";
extern NSString* const REQUEST_GRID_VIEW_ITEM_ID;// = @"REQUEST_GRID_VIEW_ITEM_ID";

extern NSString* const CONSTANTS;// = @"CONSTANTS";

extern NSString* const REQUEST_TYPE_FIELD_CONSTANTS;// = @"REQUEST_TYPE_FIELD_CONSTANTS";
extern NSString* const REQUEST_TYPE_FULL_DEFINITION;// = @"REQUEST_TYPE_FULL_DEFINITION";
extern NSString* const REQUEST_TYPE_REFRESH_CONTROLS;// = @"REQUEST_TYPE_REFRESH_CONTROLS";
extern NSString* const REQUEST_TYPE_FIELD_REQUEST;// = @"REQUEST_TYPE_FIELD_REQUEST";
extern NSString* const REQUEST_TYPE_PERFORM_ACTION;// = @"REQUEST_TYPE_PERFORM_ACTION";
extern NSString* const REQUEST_TYPE_FIELD_SUBMIT;// = @"REQUEST_TYPE_FIELD_SUBMIT";
extern NSString* const REQUEST_TYPE_FIELD_CANCEL;// = @"REQUEST_TYPE_FIELD_CANCEL";
extern NSString* const REQUEST_TYPE_FIELD_COMPLEX_ITEM_LIST_NEW_ITEM;// = @"REQUEST_TYPE_FIELD_COMPLEX_ITEM_LIST_NEW_ITEM";
extern NSString* const REQUEST_TYPE_FIELD_COMPLEX_ITEM_LIST_EDIT;// = @"REQUEST_TYPE_FIELD_COMPLEX_ITEM_LIST_EDIT";
extern NSString* const REQUEST_TYPE_FIELD_COMPLEX_ITEM_LIST_SAVE_ITEM;// = @"REQUEST_TYPE_FIELD_COMPLEX_ITEM_LIST_SAVE_ITEM";
extern NSString* const REQUEST_TYPE_FIELD_COMPLEX_ITEM_LIST_REMOVE_ITEM;// = @"REQUEST_TYPE_FIELD_COMPLEX_ITEM_LIST_REMOVE_ITEM";
extern NSString* const REQUEST_TYPE_SET_FILE;// = @"REQUEST_TYPE_SET_FILE";
extern NSString* const REQUEST_TYPE_GET_FILE;// = @"REQUEST_TYPE_GET_FILE";
extern NSString* const REQUEST_TYPE_GRID_RELOAD;// = @"REQUEST_TYPE_GRID_RELOAD";
extern NSString* const REQUEST_TYPE_GRID_DELETE;// = @"REQUEST_TYPE_GRID_DELETE";
extern NSString* const REQUEST_TYPE_MENU;// = @"REQUEST_TYPE_MENU";
extern NSString* const REQUEST_TYPE_LOGOUT;// = @"REQUEST_TYPE_LOGOUT";
extern NSString* const REQUEST_TYPE_LANDING_NAME;// = @"REQUEST_TYPE_LANDING_NAME";
extern NSString* const REQUEST_TYPE_ACTION;// = @"REQUEST_TYPE_ACTION";

extern NSString* const SESSION_VALID;// = @"SESSION_VALID";
extern NSString* const ID;// = @"ID";
extern NSString* const OBJECT_NAME;// = @"OBJECT_NAME";
extern NSString* const DISPLAY_NAME;// = @"DISPLAY_NAME";
extern NSString* const LABEL;// = @"LABEL";
extern NSString* const CURRENT_VALUE;// = @"CURRENT_VALUE";
extern NSString* const MAX_LENGTH;// = @"MAX_LENGTH";
extern NSString* const EDITABLE;// = @"EDITABLE";
extern NSString* const REQUIRED;// = @"REQUIRED";
extern NSString* const CONTROL_ARRAY;// = @"CONTROL_ARRAY";
extern NSString* const FIELD_PREFIX;// = @"FIELD_PREFIX";
extern NSString* const ACTION_PREFIX;// = @"ACTION_PREFIX";
extern NSString* const PERSISTED_PREFIX;// = @"PERSISTED_PREFIX";
extern NSString* const REFRESH_FIELD_PREFIX;// = @"REFRESH_FIELD_PREFIX";
extern NSString* const PERSIST;// = @"PERSIST";
extern NSString* const ERRORS;// = @"ERRORS";
extern NSString* const ERROR_MESSAGE;// = @"ERROR_MESSAGE";
extern NSString* const ERROR_FIELD;// = @"ERROR_FIELD";
extern NSString* const CONTROL_TYPE;// = @"CONTROL_TYPE";
extern NSString* const SELECT_ITEMS;// = @"SELECT_ITEMS";
extern NSString* const SELECT_ITEM_VALUE;// = @"SELECT_ITEM_VALUE";
extern NSString* const SELECT_ITEM_LABEL;// = @"SELECT_ITEM_LABEL";
extern NSString* const SELECT_ITEM_IS_SELECTED;// = @"SELECT_ITEM_IS_SELECTED";
extern NSString* const SELECT_DISPLAY_TYPE;// = @"SELECT_DISPLAY_TYPE";
extern NSString* const MAX_FILE_SIZE;// = @"MAX_FILE_SIZE";
extern NSString* const FILE_NAME;// = @"FILE_NAME";
extern NSString* const ERROR;// = @"ERROR";
extern NSString* const IS_VISIBLE;// = @"IS_VISIBLE";
extern NSString* const CHANGE_TRIGGERS_REFRESH;// = @"CHANGE_TRIGGERS_REFRESH";

extern NSString* const RESPONSE_BODY;// = @"RESPONSE_BODY";
extern NSString* const RESPONSE_TYPE_IDENTIFIER;// = @"RESPONSE_TYPE_IDENTIFIER";

extern NSString* const CONTROL_TYPE_TEXT;// = @"CONTROL_TYPE_TEXT";
extern NSString* const CONTROL_TYPE_DATE;// = @"CONTROL_TYPE_DATE";
extern NSString* const CONTROL_TYPE_SELECT;// = @"CONTROL_TYPE_SELECT";
extern NSString* const CONTROL_TYPE_GRID;// = @"CONTROL_TYPE_GRID";
extern NSString* const CONTROL_TYPE_BUTTON;// = @"CONTROL_TYPE_BUTTON";
extern NSString* const CONTROL_TYPE_GROUP;// = @"CONTROL_TYPE_GROUP";
extern NSString* const CONTROL_TYPE_COMPLEX_ITEM_LIST;// = @"CONTROL_TYPE_COMPLEX_ITEM_LIST";
extern NSString* const CONTROL_TYPE_FILE;// = @"CONTROL_TYPE_FILE";

extern NSString* const BUTTON_TYPE;// = @"BUTTON_TYPE";

extern NSString* const GRID_VIEW_CURRENT_PAGE;// = @"GRID_VIEW_CURRENT_PAGE";
extern NSString* const GRID_VIEW_PAGE_SIZE;// = @"GRID_VIEW_PAGE_SIZE";
extern NSString* const GRID_VIEW_TOTAL_NUMBER;// = @"GRID_VIEW_TOTAL_NUMBER";
extern NSString* const GRID_VIEW_NUMBER_OF_PAGES;// = @"GRID_VIEW_NUMBER_OF_PAGES";
extern NSString* const GRID_VIEW_NUMBER_OF_SUPPLIED_RECORDS;// = @"GRID_VIEW_NUMBER_OF_SUPPLIED_RECORDS";
extern NSString* const GRID_VIEW_COLUMN_LIST;// = @"GRID_VIEW_COLUMN_LIST";
extern NSString* const GRID_VIEW_COLUMN_NAME;// = @"GRID_VIEW_COLUMN_NAME";
extern NSString* const GRID_VIEW_COLUMN_IS_VISIBLE;// = @"GRID_VIEW_COLUMN_IS_VISIBLE";
extern NSString* const GRID_VIEW_DATA;// = @"GRID_VIEW_DATA";
extern NSString* const GRID_VIEW_ROW_CELL_DATA_ARRAY;// = @"GRID_VIEW_ROW_CELL_DATA_ARRAY";
extern NSString* const GRID_VIEW_GRID_DETAILS;// = @"GRID_VIEW_GRID_DETAILS";
extern NSString* const GRID_VIEW_DELETE_ACTION;// = @"GRID_VIEW_DELETE_ACTION";
extern NSString* const GRID_VIEW_RELOAD_REQUEST_PAGE;// = @"GRID_VIEW_RELOAD_REQUEST_PAGE";
extern NSString* const GRID_VIEW_RELOAD_REQUEST_ROWS;// = @"GRID_VIEW_RELOAD_REQUEST_ROWS";
extern NSString* const GRID_VIEW_RELOAD_REQUEST_SORT_NAME;// = @"GRID_VIEW_RELOAD_REQUEST_SORT_NAME";
extern NSString* const GRID_VIEW_RELOAD_REQUEST_SORT_ORDER;// = @"GRID_VIEW_RELOAD_REQUEST_SORT_ORDER";
extern NSString* const GRID_VIEW_COLUMN_TYPE;// = @"GRID_VIEW_COLUMN_TYPE";
extern NSString* const GRID_VIEW_COLUMN_TYPE_DISPLAY;// = @"GRID_VIEW_COLUMN_TYPE_DISPLAY";
//extern NSString* const GRID_VIEW_COLUMN_TYPE_DELETE;// = @"GRID_VIEW_COLUMN_TYPE_DELETE";


extern NSString* const MENU;// = @"MENU";
extern NSString* const MENU_ARRAY;// = @"MENU_ARRAY";
extern NSString* const MENU_ITEM_NAME;// = @"MENU_ITEM_NAME";
extern NSString* const MENU_ITEM_SUB_LIST;// = @"MENU_ITEM_SUB_LIST";
extern NSString* const MENU_ITEM_ACTION;// = @"MENU_ITEM_ACTION";
extern NSString* const MENU_ITEM_TRANSFER_VALUES;// = @"MENU_ITEM_TRANSFER_VALUES";
extern NSString* const MENU_ITEM_TRANSFER_VALUES_FIELD;// = @"MENU_ITEM_TRANSFER_VALUES_FIELD";
extern NSString* const MENU_ITEM_TRANSFER_VALUES_VALUE;// = @"MENU_ITEM_TRANSFER_VALUES_VALUE";

extern NSString* const ROOT_OBJECT;// = @"ROOT_OBJECT";
extern NSString* const GROUP_ID;// = @"GROUP_ID";
extern NSString* const GROUP_NAME;// = @"GROUP_NAME";
extern NSString* const GROUP_TABLE_NUMBER_OF_COLUMNS;// = @"GROUP_TABLE_NUMBER_OF_COLUMNS";
extern NSString* const GROUP_TYPE;// = @"GROUP_TYPE";
extern NSString* const GROUP_TYPE_TABLE;// = @"GROUP_TYPE_TABLE";
extern NSString* const GROUP_TYPE_COLLAPSIBLE;// = @"GROUP_TYPE_COLLAPSIBLE";

//  extern NSString* const DATA_OBJECT_MENU_ITEM_NAME;// = @"DATA_OBJECT_MENU_ITEM_NAME";
//  extern NSString* const DATA_OBJECT_MENU_DATA_OBJECT_NAME;// = @"DATA_OBJECT_MENU_DATA_OBJECT_NAME";
extern NSString* const DATA_OBJECT_MENU_FIELD_DATA_COUPLINGS;// = @"DATA_OBJECT_MENU_FIELD_DATA_COUPLINGS";
extern NSString* const DATA_OBJECT_MENU_FIELD_DATA_COUPLING_TARGET;// = @"DATA_OBJECT_MENU_FIELD_DATA_COUPLING_TARGET";
extern NSString* const DATA_OBJECT_MENU_FIELD_DATA_COUPLING_SOURCE;// = @"DATA_OBJECT_MENU_FIELD_DATA_COUPLING_SOURCE";
//  extern NSString* const DATA_OBJECT_MENU_ARRAY;// = @"DATA_OBJECT_MENU_ARRAY";
extern NSString* const DATA_OBJECT_MENU_FIELD_STATIC_COUPLINGS;// = @"DATA_OBJECT_MENU_FIELD_STATIC_COUPLINGS";
extern NSString* const DATA_OBJECT_MENU_FIELD_STATIC_COUPLING_TARGET;// = @"DATA_OBJECT_MENU_FIELD_STATIC_COUPLING_TARGET";
extern NSString* const DATA_OBJECT_MENU_FIELD_STATIC_COUPLING_VALUE;// = @"DATA_OBJECT_MENU_FIELD_STATIC_COUPLING_VALUE";

extern NSString* const GRID_VIEW_DATA_OBJECT_LAUNCH;// = @"GRID_VIEW_DATA_OBJECT_LAUNCH";
extern NSString* const GRID_VIEW_DATA_OBJECT_LAUNCH_OBJECT_NAME;// = @"GRID_VIEW_DATA_OBJECT_LAUNCH_OBJECT_NAME";
extern NSString* const GRID_VIEW_DATA_OBJECT_LAUNCH_TARGET_FIELD;// = @"GRID_VIEW_DATA_OBJECT_LAUNCH_TARGET_FIELD";

extern NSString* const COMPLEX_ITEM_BODY;// = @"COMPLEX_ITEM_BODY";
extern NSString* const COMPLEX_ITEM_IDENTIFIER;// = @"COMPLEX_ITEM_IDENTIFIER";
extern NSString* const IS_DIALOG;// = @"IS_DIALOG";
extern NSString* const MAIN_REQUEST_OBJECT_ID;// = @"MAIN_REQUEST_OBJECT_ID";

extern NSString* const MAIN_REQUEST_FIELD_NAME;// = @"MAIN_REQUEST_FIELD_NAME";

extern NSString* const BUTTON_TYPE_SUBMIT;// = @"BUTTON_TYPE_SUBMIT";
extern NSString* const BUTTON_TYPE_CANCEL;// = @"BUTTON_TYPE_CANCEL";

extern NSString* const SELECT_DISPAY_TYPE_DROPDOWN;// = @"SELECT_DISPAY_TYPE_DROPDOWN";
extern NSString* const SELECT_DISPAY_TYPE_MULTISELECT;// = @"SELECT_DISPAY_TYPE_MULTISELECT";
extern NSString* const SELECT_DISPAY_TYPE_RADIO;// = @"SELECT_DISPAY_TYPE_RADIO";
extern NSString* const SELECT_DISPAY_TYPE_CHECKBOX;// = @"SELECT_DISPAY_TYPE_CHECKBOX";

extern NSString* const SELECT_ITEM_VALUE_SEPERATOR;// = @"SELECT_ITEM_VALUE_SEPERATOR";
@end