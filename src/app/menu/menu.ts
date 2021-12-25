import { CoreMenu } from '@core/types'

export const menu: CoreMenu[] = [
  {
    id: 'home',
    title: 'Home',
    translate: 'MENU.HOME',
    type: 'item',
    icon: 'home',
    url: 'home'
  },
  {
    id: 'user',
    title: 'Users',
    translate: 'MENU.USER',
    type: 'item',
    icon: 'person',
    url: 'user'
  },
  {
    id: 'shop',
    title: 'Shops',
    translate: 'MENU.SHOP',
    type: 'item',
    icon: 'cart',
    url: 'shop'
  }
]
