'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core'
import {
  arrayMove,
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable'
import type { Company } from './types'
import TopNavigationBar from './TopNavigationBar'
import Sidebar from './Sidebar'
import StatisticsCards from './StatisticsCards'
import SearchAndActions from './SearchAndActions'
import CompaniesTable from './CompaniesTable'
import SearchCommandDialog from './CommandDialog'
import ActivityLog from './ActivityLog'
import CompanyDetails from './CompanyDetails'
import Clients from './Clients'
import AddCompanyDialog from './AddCompanyDialog'

export default function Dashboard() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [openActionMenu, setOpenActionMenu] = useState<number | null>(null)
  const [openStateMenu, setOpenStateMenu] = useState<number | null>(null)
  const [open, setOpen] = useState(false)
  const [canGoForward, setCanGoForward] = useState(false)
  const [isActivityLogOpen, setIsActivityLogOpen] = useState(false)
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [isAddCompanyDialogOpen, setIsAddCompanyDialogOpen] = useState(false)
  const [activeView, setActiveView] = useState<'companies' | 'clients'>('companies')
  const [activePage, setActivePage] = useState<'sales' | 'finance' | 'contract' | 'team'>('sales')
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      const isInsideMenu = target.closest('[data-action-menu]') || target.closest('[data-state-menu]')
      
      if (!isInsideMenu) {
        if (openActionMenu !== null) {
          setOpenActionMenu(null)
        }
        if (openStateMenu !== null) {
          setOpenStateMenu(null)
        }
      }
    }
    
    if (openActionMenu !== null || openStateMenu !== null) {
      document.addEventListener('click', handleClickOutside)
    }
    
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [openActionMenu, openStateMenu])

  // Check if we can go forward in history
  useEffect(() => {
    if (typeof window === 'undefined') return

    const checkCanGoForward = () => {
      const navState = sessionStorage.getItem('navState')
      if (navState === 'back') {
        setCanGoForward(true)
      } else {
        setCanGoForward(false)
      }
    }

    const handlePopState = () => {
      sessionStorage.setItem('navState', 'back')
      setCanGoForward(true)
    }

    window.addEventListener('popstate', handlePopState)
    checkCanGoForward()

    return () => {
      window.removeEventListener('popstate', handlePopState)
    }
  }, [])

  // Track when we navigate back using the button
  const handleBackClick = () => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('navState', 'back')
      setCanGoForward(true)
    }
    router.back()
  }

  // Track when we navigate forward
  const handleForwardClick = () => {
    if (canGoForward && typeof window !== 'undefined') {
      window.history.forward()
      setTimeout(() => {
        const navState = sessionStorage.getItem('navState')
        if (!navState || navState !== 'back') {
          setCanGoForward(false)
          sessionStorage.removeItem('navState')
        }
      }, 200)
    }
  }
  
  const initialCompanies: Company[] = [
    { id: 1, companyName: 'ECOTREND', state: 'Active', totalAmount: '4,000,000', address: 'Baghdad Iraq Karada', email: 'email@email.com', createdAt: '1/12/2025', lastUpdate: '1/12/2025', content: 'email@email.com' },
    { id: 2, companyName: 'EVO', state: 'Not Active', totalAmount: '4,000,000', address: 'Baghdad Iraq Karada', email: 'email@email.com', createdAt: '1/12/2025', lastUpdate: '1/12/2025', content: 'email@email.com' },
    { id: 3, companyName: 'Bayttech', state: 'Pending', totalAmount: '4,000,000', address: 'Baghdad Iraq Karada', email: 'email@email.com', createdAt: '1/12/2025', lastUpdate: '1/12/2025', content: 'email@email.com' },
    { id: 4, companyName: 'ASF', state: 'Active', totalAmount: '4,000,000', address: 'Baghdad Iraq Karada', email: 'email@email.com', createdAt: '1/12/2025', lastUpdate: '1/12/2025', content: 'email@email.com' },
    { id: 5, companyName: 'Snap', state: 'Pending', totalAmount: '4,000,000', address: 'Baghdad Iraq Karada', email: 'email@email.com', createdAt: '1/12/2025', lastUpdate: '1/12/2025', content: 'email@email.com' },
    { id: 6, companyName: 'Uoraa', state: 'Active', totalAmount: '4,000,000', address: 'Baghdad Iraq Karada', email: 'email@email.com', createdAt: '1/12/2025', lastUpdate: '1/12/2025', content: 'email@email.com' },
    { id: 7, companyName: 'Loya', state: 'Active', totalAmount: '4,000,000', address: 'Baghdad Iraq Karada', email: 'email@email.com', createdAt: '1/12/2025', lastUpdate: '1/12/2025', content: 'email@email.com' },
    { id: 8, companyName: 'GTR', state: 'Not Active', totalAmount: '4,000,000', address: 'Baghdad Iraq Karada', email: 'email@email.com', createdAt: '1/12/2025', lastUpdate: '1/12/2025', content: 'email@email.com' },
    { id: 9, companyName: 'Afitech', state: 'Pending', totalAmount: '4,000,000', address: 'Baghdad Iraq Karada', email: 'email@email.com', createdAt: '1/12/2025', lastUpdate: '1/12/2025', content: 'email@email.com' },
    { id: 10, companyName: 'Dowera', state: 'Not Active', totalAmount: '4,000,000', address: 'Baghdad Iraq Karada', email: 'email@email.com', createdAt: '1/12/2025', lastUpdate: '1/12/2025', content: 'email@email.com' },
    { id: 11, companyName: 'Business OS', state: 'Pending', totalAmount: '4,000,000', address: 'Baghdad Iraq Karada', email: 'email@email.com', createdAt: '1/12/2025', lastUpdate: '1/12/2025', content: 'email@email.com' },
    { id: 12, companyName: 'XO XO', state: 'Not Active', totalAmount: '4,000,000', address: 'Baghdad Iraq Karada', email: 'email@email.com', createdAt: '1/12/2025', lastUpdate: '1/12/2025', content: 'email@email.com' },
  ]

  const [companies, setCompanies] = useState<Company[]>(initialCompanies)

  const filteredCompanies = companies.filter(company =>
    company.companyName.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Drag and Drop sensors
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      setCompanies((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id)
        const newIndex = items.findIndex((item) => item.id === over.id)
        return arrayMove(items, oldIndex, newIndex)
      })
    }
  }

  const updateCompanyState = (companyId: number, newState: 'Active' | 'Not Active' | 'Pending') => {
    setCompanies(prevCompanies =>
      prevCompanies.map(company =>
        company.id === companyId ? { ...company, state: newState } : company
      )
    )
    setOpenStateMenu(null)
    if (selectedCompany && selectedCompany.id === companyId) {
      setSelectedCompany({ ...selectedCompany, state: newState })
    }
  }

  const handleRowClick = (company: Company) => {
    setSelectedCompany(company)
    setIsDetailsOpen(true)
  }

  const handleCloseDetails = () => {
    setIsDetailsOpen(false)
    setTimeout(() => setSelectedCompany(null), 300)
  }

  const handleAddCompany = (companyData: Omit<Company, 'id'>) => {
    const newId = Math.max(...companies.map(c => c.id), 0) + 1
    const newCompany: Company = {
      ...companyData,
      id: newId,
    }
    setCompanies(prev => [newCompany, ...prev])
  }

  // Keyboard shortcut to open command dialog (Command+K / Ctrl+K)
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === 'k' || e.key === 'K') && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        e.stopPropagation()
        setOpen((open) => !open)
      }
      if (e.key === 'Escape' && open) {
        e.preventDefault()
        setOpen(false)
      }
    }
    
    document.addEventListener('keydown', down, true)
    return () => document.removeEventListener('keydown', down, true)
  }, [open])

  // Keyboard shortcut to open activity log (Command+I / Ctrl+I)
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === 'i' || e.key === 'I') && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        e.stopPropagation()
        setIsActivityLogOpen((isOpen) => !isOpen)
      }
      if (e.key === 'Escape' && isActivityLogOpen) {
        e.preventDefault()
        setIsActivityLogOpen(false)
      }
    }
    
    document.addEventListener('keydown', down, true)
    return () => document.removeEventListener('keydown', down, true)
  }, [isActivityLogOpen])

  return (
    <div 
      className="flex flex-col h-screen w-screen overflow-hidden"
      style={{
        paddingTop: '33px',
        background: 'linear-gradient(180deg, #141414 0%, #0E0E0E 100%)'
      }}
    >
      <TopNavigationBar
        canGoForward={canGoForward}
        onBackClick={handleBackClick}
        onForwardClick={handleForwardClick}
        onSearchClick={() => setOpen(true)}
        onActivityLogClick={() => setIsActivityLogOpen(true)}
      />

      {/* Main Content Area */}
      <div
        className="flex flex-row flex-1 overflow-hidden"
        style={{
          padding: '0px 8px 8px',
          gap: '0px'
        }}
      >
        <Sidebar activeView={activeView} onViewChange={setActiveView} activePage={activePage} onPageChange={setActivePage} />

      {/* Main Content */}
      <div
        className="flex flex-col items-center h-full flex-1 overflow-hidden"
        style={{
          padding: '0px 8px 0px 0px',
          gap: '10px',
          borderWidth: '1px 1px 1px 0px',
          borderStyle: 'solid',
          borderColor: '#2A2A2A',
          borderRadius: '0px 8px 8px 0px'
        }}
      >
        <div
          className="flex flex-col items-start h-full w-full overflow-hidden"
          style={{
            padding: '8px 0px 16px 8px',
            gap: '16px',
            borderRadius: '0px 8px 8px 0px'
          }}
        >
          <div className="flex flex-col items-start w-full h-full overflow-hidden" style={{ gap: '4px' }}>
              {activePage === 'sales' ? (
                activeView === 'companies' ? (
                  <>
                    <StatisticsCards />

                    <SearchAndActions
                      searchQuery={searchQuery}
                      onSearchChange={setSearchQuery}
                      onNewCompanyClick={() => setIsAddCompanyDialogOpen(true)}
                    />

                    <CompaniesTable
                      companies={filteredCompanies}
                      sensors={sensors}
                      onDragEnd={handleDragEnd}
                      openStateMenu={openStateMenu}
                      openActionMenu={openActionMenu}
                      setOpenStateMenu={setOpenStateMenu}
                      setOpenActionMenu={setOpenActionMenu}
                      updateCompanyState={updateCompanyState}
                      onRowClick={handleRowClick}
                    />
                  </>
                ) : (
                  <Clients />
                )
              ) : (
                <div className="flex flex-col items-center justify-center w-full h-full" style={{ color: '#999999', fontFamily: 'SF Pro', fontSize: '14px' }}>
                  {activePage === 'finance' ? 'Finance page is empty' : activePage === 'contract' ? 'Contract page is empty' : 'Team page is empty'}
                </div>
              )}
                    </div>
                </div>
                  </div>
                </div>

      <SearchCommandDialog
        open={open}
        onOpenChange={setOpen}
        companies={companies}
      />

      <ActivityLog
        isOpen={isActivityLogOpen}
        onClose={() => setIsActivityLogOpen(false)}
      />

      <CompanyDetails
        company={selectedCompany}
        isOpen={isDetailsOpen}
        onClose={handleCloseDetails}
        updateCompanyState={updateCompanyState}
      />

      <AddCompanyDialog
        isOpen={isAddCompanyDialogOpen}
        onClose={() => setIsAddCompanyDialogOpen(false)}
        onAdd={handleAddCompany}
      />
    </div>
  )
}
