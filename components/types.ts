export interface Company {
  id: number
  companyName: string
  logo?: string
  state: 'Active' | 'Not Active' | 'Pending'
  totalAmount: string
  address: string
  email: string
  createdAt: string
  lastUpdate: string
  content: string
}

