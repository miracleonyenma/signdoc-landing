'use client'

import * as React from 'react'
import Link from 'next/link'
import SigninButton from './SigninButton'
import { cn } from '@/lib/utils'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'

const SiteNav = () => {
  return (
    <nav className="site-nav">
      <div className="wrapper">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem className="flex">
              <Link href="/docs" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Documentation
                </NavigationMenuLink>
              </Link>

              <SigninButton></SigninButton>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </nav>
  )
}

export default SiteNav
