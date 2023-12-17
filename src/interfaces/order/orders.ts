export interface Orders {
  orders: Order[]
}

export interface Order {
  orderId: string
  orderState: string // 'pending' | 'accepted' | 'rejected' | 'none'
  orderDeliveryState: string // 'preparation' | 'sent' | 'in coming' | 'arrived'
  orderRating: number // 1 - 5
  orderPicture: string
  orderDescription: string
  orderTitle: string
  orderPrice: number
  selected: boolean
}

