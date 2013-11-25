//
//  AssistedViewController.h
//  AssistedViewController
//
//  Created by Jamieson Abbott on 2/12/11.
//  Copyright 2011 Assisted. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "AssistedUITableViewCell.h"

@class AssistedTableView;

@protocol AssistedTableViewRowDelegate <NSObject>
@required
- (void) forTableViewController: (AssistedTableView*) tableController cellToFill:(AssistedUITableViewCell*) newcell atIndexPath:(NSIndexPath*) indexPath;
- (NSInteger) numberOfRowsInSection: (NSInteger) section;
- (void) forTableViewController: (AssistedTableView*) tableController didSelectRowAtIndexPath: (NSIndexPath*) indexPath;
@optional
- (void) commitEditingStyle:(UITableViewCellEditingStyle)editingStyle forRowAtIndexPath:(NSIndexPath *)indexPath;
- (BOOL) canEditRowAtIndexPath:(NSIndexPath *)indexPath;
@end

@interface AssistedSectionControlContainer : NSObject

@property (nonatomic, retain) NSString* sectionName;
@property (nonatomic, assign) CGFloat height;
@property (nonatomic, retain) NSMutableDictionary* controls;

- (id) initWithSectionTitle:(NSString *)sectiontitle andHeight: (CGFloat) inheight;
@end

@interface AssistedControlContainer : NSObject

@property (nonatomic, assign) UITableViewCellAccessoryType accessoryType;
@property (nonatomic, assign) UITableViewCellSelectionStyle selectionType;
@property (nonatomic, retain) NSMutableArray* controls;

- (id) initWithAccessoryType: (UITableViewCellAccessoryType) inaccessorytype andSelectionType: (UITableViewCellSelectionStyle) selectiontype;
@end

@interface AssistedMethodContainer : NSObject


@property (nonatomic, retain) id <AssistedTableViewRowDelegate> target;
@property (nonatomic, retain) NSString* sectionName;
@property (nonatomic, assign) CGFloat height;
@property (nonatomic, assign) UITableViewCellAccessoryType accessoryType;
@property (nonatomic, assign) UITableViewCellSelectionStyle selectionType;

- (id) initWithTarget:(id) intarget andSectionTitle:(NSString*) sectiontitle andAccessoryType: (UITableViewCellAccessoryType) inaccessorytype andSelectionType: (UITableViewCellSelectionStyle) selectiontype andHeight: (CGFloat) inheight;
@end

@interface AssistedTableView : UITableView <UITableViewDelegate, UITableViewDataSource> 

@property (nonatomic, retain) NSMutableDictionary* controls;

- (CGFloat) getSectionHeight:(NSInteger) section;
- (void) addObject: (UIView*) addview inSection: (NSInteger) section inRow: (NSInteger) row andHeight:(CGFloat) height;
- (void) addObject: (UIView*) addview andSectionTitle: sectiontitle andAccessoryType: (UITableViewCellAccessoryType) accessorytype andSelectionType:(UITableViewCellSelectionStyle) selectionstyle inSection: (NSInteger) section inRow: (NSInteger) row andHeight: (CGFloat) height;
- (AssistedMethodContainer*) getAssistedMethod: (NSInteger) section;
- (AssistedControlContainer*) getControlsInSection: (NSInteger) section inRow: (NSInteger) row;
- (void) addTarget: (id <AssistedTableViewRowDelegate>) target andSectionTitle: sectiontitle andAccessoryType: (UITableViewCellAccessoryType) accessorytype andSelectionType: (UITableViewCellSelectionStyle) selectionType inSection: (NSInteger) section andHeight:(CGFloat) height;
@end


