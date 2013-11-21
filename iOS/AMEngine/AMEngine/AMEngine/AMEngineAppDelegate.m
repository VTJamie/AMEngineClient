//
//  AMEngineAppDelegate.m
//  AMEngine
//
//  Created by Jamieson Abbott on 3/7/12.
//  Copyright (c) 2012 AM Interfaces. All rights reserved.
//

#import "AMEngineAppDelegate.h"
#import "AMEngineMenu.h"
#import "AMEngineMain.h"
#import "AMConstants.h"

@implementation AMEngineAppDelegate

@synthesize window = _window;

- (void)dealloc
{
    [_window release];
    [super dealloc];
}

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
    self.window = [[[UIWindow alloc] initWithFrame:[[UIScreen mainScreen] bounds]] autorelease];
    [AMEngineDataManager registerDefaultsFromSettingsBundle];
    
    UINavigationController* navcontroller = [[UINavigationController alloc] init];
    self.window.rootViewController = navcontroller;
    [AMConstants fillConstantsWithTarget:self andSelector:@selector(loadAfterConstants)];
    self.window.backgroundColor = [UIColor whiteColor];
    [self.window makeKeyAndVisible];
    return YES;
}

- (void)loadAfterConstants
{
    AMEngineMenu* menu = [[AMEngineMenu alloc] init];
    UINavigationController* menunav = [[UINavigationController alloc] initWithRootViewController:menu];
    AMEngineMain* mainview = [[AMEngineMain alloc] initWithMenu:menunav];
    ((UINavigationController*)self.window.rootViewController).viewControllers = [NSArray arrayWithObjects:mainview, nil];
}

- (void)applicationWillResignActive:(UIApplication *)application
{
    /*
     Sent when the application is about to move from active to inactive state. This can occur for certain types of temporary interruptions (such as an incoming phone call or SMS message) or when the user quits the application and it begins the transition to the background state.
     Use this method to pause ongoing tasks, disable timers, and throttle down OpenGL ES frame rates. Games should use this method to pause the game.
     */
}

- (void)applicationDidEnterBackground:(UIApplication *)application
{
    /*
     Use this method to release shared resources, save user data, invalidate timers, and store enough application state information to restore your application to its current state in case it is terminated later. 
     If your application supports background execution, this method is called instead of applicationWillTerminate: when the user quits.
     */
}

- (void)applicationWillEnterForeground:(UIApplication *)application
{
    /*
     Called as part of the transition from the background to the inactive state; here you can undo many of the changes made on entering the background.
     */
}

- (void)applicationDidBecomeActive:(UIApplication *)application
{
    /*
     Restart any tasks that were paused (or not yet started) while the application was inactive. If the application was previously in the background, optionally refresh the user interface.
     */
}

- (void)applicationWillTerminate:(UIApplication *)application
{
    /*
     Called when the application is about to terminate.
     Save data if appropriate.
     See also applicationDidEnterBackground:.
     */
}

@end
