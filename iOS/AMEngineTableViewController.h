//
//  AMEngineViewController.h
//  AMEngineViewController
//
//  Created by Sudhakar Moparthy on 2/12/11.
//  Copyright 2011 AbbottWebDev. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "AMEngineUITableViewCell.h"

@class AMEngineTableViewController;

@protocol AMEngineTableViewControllerRowDelegate <NSObject>
@required
- (void) forTableViewController: (AMEngineTableViewController*) tableController cellToFill:(AMEngineUITableViewCell*) newcell atIndexPath:(NSIndexPath*) indexPath;
- (NSInteger) numberOfRowsInSection: (NSInteger) section;
- (void) forTableViewController: (AMEngineTableViewController*) tableController didSelectRowAtIndexPath: (NSIndexPath*) indexPath;
@end

@interface AMEngineSectionControlContainer : NSObject
{    
    NSString* sectionName;
    NSMutableDictionary* controls;
}
@property (nonatomic, retain) NSString* sectionName;
@property (nonatomic, retain) NSMutableDictionary* controls;

- (id) initWithSectionTitle: (NSString*) sectiontitle;
@end

@interface AMEngineControlContainer : NSObject
{
    UITableViewCellAccessoryType accessoryType;
    UITableViewCellSelectionStyle selectionType;
    NSMutableArray* controls;
    NSDictionary* controldef;
}


@property (nonatomic, assign) UITableViewCellAccessoryType accessoryType;
@property (nonatomic, assign) UITableViewCellSelectionStyle selectionType;
@property (nonatomic, retain) NSMutableArray* controls;
@property (nonatomic, retain) NSDictionary* controldef;

- (id) initWithAccessoryType: (UITableViewCellAccessoryType) inaccessorytype andSelectionType: (UITableViewCellSelectionStyle) selectiontype andControlDef:(NSDictionary*) indefinitiondef;
@end

@interface AMEngineMethodContainer : NSObject
{
    id <AMEngineTableViewControllerRowDelegate> target;
    NSString* sectionName;
    UITableViewCellAccessoryType accessoryType;
    UITableViewCellSelectionStyle selectionType;  
}

@property (nonatomic, retain) id <AMEngineTableViewControllerRowDelegate> target;
@property (nonatomic, retain) NSString* sectionName;
@property (nonatomic, assign) UITableViewCellAccessoryType accessoryType;
@property (nonatomic, assign) UITableViewCellSelectionStyle selectionType;

- (id) initWithTarget:(id <AMEngineTableViewControllerRowDelegate>) intarget andSectionTitle: (NSString*) sectiontitle andAccessoryType: (UITableViewCellAccessoryType) inaccessorytype andSelectionType: (UITableViewCellSelectionStyle) selectiontype;
@end

@interface AMEngineTableViewController : UITableViewController <UITableViewDelegate, UITableViewDataSource, UITextFieldDelegate> {
	id parent;
    NSMutableDictionary* controls;
    NSString* context;
    NSString* contextName;
}

@property (nonatomic, retain) id parent;
@property (nonatomic, retain) NSMutableDictionary* controls;
@property (nonatomic, retain) NSString* context;
@property (nonatomic, retain) NSString* contextName;

- (id) initWithParent: (id) myparent withContext:(NSString*) incontext withContextName:(NSString*) incontextname;
- (void) addObject: (UIView*) addview inSection: (NSInteger) section inRow: (NSInteger) row;
- (void) addObject: (UIView*) addview andSectionTitle: sectiontitle andAccessoryType: (UITableViewCellAccessoryType) accessorytype andSelectionType:(UITableViewCellSelectionStyle) selectionstyle andControlDef:(NSDictionary*) control inSection: (NSInteger) section inRow: (NSInteger) row;
- (AMEngineMethodContainer*) getAMEngineMethod: (NSInteger) section;
- (AMEngineControlContainer*) getControlsInSection: (NSInteger) section inRow: (NSInteger) row;
- (void) addTarget: (id <AMEngineTableViewControllerRowDelegate>) target andSectionTitle: sectiontitle andAccessoryType: (UITableViewCellAccessoryType) accessorytype andSelectionType: (UITableViewCellSelectionStyle) selectionType inSection: (NSInteger) section;
@end


