//
//  AMEngineNavigationController.m
//  AMEngine
//
//  Created by Sudhakar Moparthy on 12/10/11.
//  Copyright (c) 2011 AbbottWebDev. All rights reserved.
//

#import "AMEngineNavigationController.h"

@implementation AMEngineNavigationController

@synthesize customnavbar;

//- (UINavigationBar *)navigationBar 
//{
//    if(customnavbar == nil)
//    {
//        customnavbar = [[UINavigationBar alloc] init];
//        customnavbar.barStyle = UIBarStyleBlack;
//    }
//    return customnavbar;
//}

- (BOOL)shouldAutorotateToInterfaceOrientation:(UIInterfaceOrientation)interfaceOrientation
{
    // Return YES for supported orientations
	return YES;
}

@end
