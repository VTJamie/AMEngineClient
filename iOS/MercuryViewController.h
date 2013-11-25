//
//  MercuryViewController.h
//  Mercury
//
//  Created by Sudhakar Moparthy on 11/20/11.
//  Copyright (c) 2011 AbbottWebDev. All rights reserved.
//

#import <UIKit/UIKit.h>

@protocol MercuryLookupDelegate;

@interface MercuryBaseUIView : UIView
{
    MercuryBaseUIView* parent;
    BOOL ishidden;
    NSMutableArray* subgroups;
    NSDictionary* definition;
    NSDictionary* olddefinition;
    UIPopoverController* popover;    
}

@property (nonatomic, retain) MercuryBaseUIView* parent;
@property (nonatomic, assign) BOOL ishidden;
@property (nonatomic, retain) NSMutableArray* subgroups;
@property (nonatomic, retain) NSDictionary* definition;
@property (nonatomic, retain) NSDictionary* olddefinition;
@property (nonatomic, retain) UIPopoverController* popover;

- (id) initWithDefinition:(NSDictionary*) indefinition andParent:(MercuryBaseUIView*) inparent;
- (NSDictionary*) getValues;
- (void) replaceWithDefinition:(NSDictionary*) indefinition;
- (MercuryBaseUIView*) getHighestParent;
- (MercuryBaseUIView*) findControlById: (NSString*) controlid;
- (void) sendRefreshWithData: (NSDictionary*) criteria refreshSentControls:(BOOL) refreshcontrol;
- (void) processRefreshResponse:(NSDictionary*) data;
- (void)performBlock:(void (^)(void))block afterDelay:(NSTimeInterval)delay;
-(void) processMainContext;
@end

@interface MercuryViewController : UIViewController
{
    id<MercuryLookupDelegate> lookupdelegate;
}
@property (nonatomic, retain) id<MercuryLookupDelegate> lookupdelegate;
-(id)initWithContextName:(NSString*) contextname;
-(id)initWithLookupDefinition:(NSDictionary*) lookupdefinition andLookupSelectDelegate:(id<MercuryLookupDelegate>) lookupselection;
-(void)processGroupJson:(NSDictionary *)initialjson;
-(void) fixSubViews;
- (void) setLookupDelegateOnGrid: (NSDictionary*) data;
- (void) setLookupDelegateOnGridChildren: (NSDictionary*) control;

@end
