//
//  AMEngineViewController.h
//  AMEngine
//
//  Created by Sudhakar Moparthy on 11/20/11.
//  Copyright (c) 2011 AbbottWebDev. All rights reserved.
//

#import <UIKit/UIKit.h>

@protocol AMEngineLookupDelegate;

@interface AMEngineBaseUIView : UIView 
{
    AMEngineBaseUIView* parent;
    BOOL ishidden;
    NSMutableArray* subgroups;
    NSDictionary* definition;
    NSDictionary* olddefinition;
    UIPopoverController* popover;    
}

@property (nonatomic, retain) AMEngineBaseUIView* parent;
@property (nonatomic, assign) BOOL ishidden;
@property (nonatomic, retain) NSMutableArray* subgroups;
@property (nonatomic, retain) NSDictionary* definition;
@property (nonatomic, retain) NSDictionary* olddefinition;
@property (nonatomic, retain) UIPopoverController* popover;

- (id) initWithDefinition:(NSDictionary*) indefinition andParent:(AMEngineBaseUIView*) inparent;
- (NSDictionary*) getValues;
- (void) replaceWithDefinition:(NSDictionary*) indefinition;
- (AMEngineBaseUIView*) getHighestParent;
- (AMEngineBaseUIView*) findControlById: (NSString*) controlid;
- (void) sendRefreshWithData: (NSDictionary*) criteria refreshSentControls:(BOOL) refreshcontrol;
- (void) processRefreshResponse:(NSDictionary*) data;
- (void)performBlock:(void (^)(void))block afterDelay:(NSTimeInterval)delay;
-(void) processMainContext;
@end

@interface AMEngineViewController : UIViewController
{
    id<AMEngineLookupDelegate> lookupdelegate;
}
@property (nonatomic, retain) id<AMEngineLookupDelegate> lookupdelegate;
-(id)initWithContextName:(NSString*) contextname;
-(id)initWithLookupDefinition:(NSDictionary*) lookupdefinition andLookupSelectDelegate:(id<AMEngineLookupDelegate>) lookupselection;
-(void)processGroupJson:(NSDictionary *)initialjson;
-(void) fixSubViews;
- (void) setLookupDelegateOnGrid: (NSDictionary*) data;
- (void) setLookupDelegateOnGridChildren: (NSDictionary*) control;

@end
