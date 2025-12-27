'use client'

import { useState, useMemo, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from 'cmdk'
import {
  LayoutDashboard,
  Building2,
  Users,
  Loader2,
  Clock,
} from 'lucide-react'
import * as VisuallyHidden from '@radix-ui/react-visually-hidden'
import * as Dialog from '@radix-ui/react-dialog'
import type { Company } from './types'

interface CommandDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  companies: Company[]
}

interface RecentSearch {
  id: number
  type: 'company' | 'navigation'
  name: string
  path?: string
  companyId?: number
  timestamp: number
}

export default function SearchCommandDialog({ open, onOpenChange, companies }: CommandDialogProps) {
  const router = useRouter()
  const [commandSearchQuery, setCommandSearchQuery] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [recentSearches, setRecentSearches] = useState<RecentSearch[]>([])
  const [isClosing, setIsClosing] = useState(false)
  const hasInitialized = useRef(false)

  const defaultCompanies = useMemo(() => {
    return companies.slice(0, 5).map((company, index) => ({
      id: company.id,
      name: company.companyName,
      timestamp: Date.now() - (index + 1) * 3600000
    }))
  }, [companies.length])

  useEffect(() => {
    if (hasInitialized.current || typeof window === 'undefined') return
    
    hasInitialized.current = true
    
    const stored = localStorage.getItem('recentSearches')
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        if (parsed.length > 0) {
          const limited = parsed.slice(0, 5)
          setRecentSearches(limited)
          if (limited.length < 5 && defaultCompanies.length > 0) {
            const missing = 5 - limited.length
            const additionalSearches: RecentSearch[] = defaultCompanies
              .slice(0, missing)
              .filter(dc => !limited.some((l: RecentSearch) => l.companyId === dc.id))
              .map((company, index) => ({
                id: Date.now() + index + 1000,
                type: 'company' as const,
                name: company.name,
                companyId: company.id,
                timestamp: company.timestamp
              }))
            
            if (additionalSearches.length > 0) {
              const updated = [...limited, ...additionalSearches].slice(0, 5)
              setRecentSearches(updated)
              localStorage.setItem('recentSearches', JSON.stringify(updated))
            }
          }
          return
        }
      } catch (e) {
        console.error('Failed to parse recent searches:', e)
      }
    }
    
    if (defaultCompanies.length > 0) {
      const defaultRecentSearches: RecentSearch[] = defaultCompanies.map((company, index) => ({
        id: Date.now() + index,
        type: 'company' as const,
        name: company.name,
        companyId: company.id,
        timestamp: company.timestamp
      }))
      
      setRecentSearches(defaultRecentSearches)
      localStorage.setItem('recentSearches', JSON.stringify(defaultRecentSearches))
    }
  }, [defaultCompanies])

  const saveRecentSearch = (search: Omit<RecentSearch, 'timestamp'>) => {
    if (typeof window === 'undefined') return

    const newSearch: RecentSearch = {
      ...search,
      timestamp: Date.now()
    }

    setRecentSearches(prev => {
      const filtered = prev.filter(s => 
        !(s.type === search.type && 
          (search.type === 'company' ? s.companyId === search.companyId : s.path === search.path))
      )
      const updated = [newSearch, ...filtered].slice(0, 5)
      localStorage.setItem('recentSearches', JSON.stringify(updated))
      return updated
    })
  }

  // Search companies for command dialog
  const searchResults = useMemo(() => {
    if (!commandSearchQuery || commandSearchQuery.length < 2) {
      return { companies: [] }
    }
    
    const query = commandSearchQuery.toLowerCase()
    const filtered = companies.filter(company =>
      company.companyName.toLowerCase().includes(query) ||
      company.email.toLowerCase().includes(query) ||
      company.address.toLowerCase().includes(query)
    )
    
    return { companies: filtered }
  }, [commandSearchQuery, companies])

  const hasResults = searchResults.companies.length > 0

  // Handle close with animation
  const handleClose = () => {
    setIsClosing(true)
    setTimeout(() => {
      onOpenChange(false)
      setIsClosing(false)
      setCommandSearchQuery('')
    }, 250)
  }

  // Handle navigation
  const handleSelect = (path: string, name: string) => {
    saveRecentSearch({ id: Date.now(), type: 'navigation', name, path })
    handleClose()
    setTimeout(() => router.push(path), 300)
  }

  // Handle company selection
  const handleSelectCompany = (companyId: number) => {
    const company = companies.find(c => c.id === companyId)
    if (company) {
      saveRecentSearch({ 
        id: Date.now(), 
        type: 'company', 
        name: company.companyName, 
        companyId 
      })
    }
    handleClose()
    console.log('Selected company:', companyId)
  }

  return (
    <>
      {/* Custom Overlay with Animation */}
      {open && (
        <div
          onClick={handleClose}
          style={{
            position: 'fixed',
            inset: 0,
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100vw',
            height: '100vh',
            zIndex: 50,
            background: 'rgba(0, 0, 0, 0.5)',
            backdropFilter: 'blur(16px) saturate(150%)',
            WebkitBackdropFilter: 'blur(16px) saturate(150%)',
            willChange: 'backdrop-filter, opacity',
            pointerEvents: 'auto',
            animation: isClosing 
              ? 'overlayFadeOut 0.25s cubic-bezier(0.4, 0, 0.2, 1) forwards'
              : 'overlayFadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
          }}
        />
      )}
      
      <CommandDialog
        open={open}
        shouldFilter={false}
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            handleClose()
          } else {
            onOpenChange(isOpen)
          }
        }}
      >
        <VisuallyHidden.Root asChild>
          <Dialog.Title>Search Dialog</Dialog.Title>
        </VisuallyHidden.Root>
        <CommandInput
          placeholder="Search companies and pages..."
          value={commandSearchQuery}
          onValueChange={(value) => {
            setCommandSearchQuery(value)
            if (value.length >= 2) {
              setIsSearching(true)
              setTimeout(() => setIsSearching(false), 300)
            }
          }}
        />
        <CommandList>
          {/* Loading State */}
          {isSearching && (
            <div
              className="flex items-center justify-center py-8"
              style={{
                color: 'rgba(255, 255, 255, 0.5)',
                animation: 'fadeIn 0.2s ease'
              }}
            >
              <Loader2 
                className="h-5 w-5 mr-3" 
                style={{ animation: 'spin 1s linear infinite' }}
              />
              <span className="text-sm">Searching...</span>
            </div>
          )}

          {/* No Results State */}
          {!isSearching && commandSearchQuery && commandSearchQuery.length >= 2 && !hasResults && (
            <CommandEmpty>
              <div style={{ padding: '20px 0' }}>
                <div style={{
                  fontSize: '32px',
                  marginBottom: '12px',
                  opacity: 0.3,
                  animation: 'emptyBounceIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)'
                }}>
                  🔍
                </div>
                <div style={{
                  fontSize: '14px',
                  color: 'rgba(255, 255, 255, 0.4)',
                  textAlign: 'center'
                }}>
                  No results found
                </div>
              </div>
            </CommandEmpty>
          )}

          {/* Search Results */}
          {!isSearching && commandSearchQuery && commandSearchQuery.length >= 2 && hasResults && (
            <>
              <CommandGroup heading="Companies">
                {searchResults.companies.map((company, index) => (
                  <CommandItem
                    key={company.id}
                    value={`company-${company.id}`}
                    onSelect={() => handleSelectCompany(company.id)}
                    style={{
                      cursor: 'pointer',
                      padding: '12px 16px',
                      animationDelay: `${0.1 + index * 0.05}s`
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <Building2 className="h-4 w-4" style={{ color: 'rgba(255, 255, 255, 0.6)' }} />
                      <div className="flex flex-col">
                        <span style={{ fontSize: '14px', color: '#FFFFFF' }}>{company.companyName}</span>
                        <span style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.5)' }}>{company.email}</span>
                      </div>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </>
          )}

          {/* Default View */}
          {!commandSearchQuery || commandSearchQuery.length < 2 ? (
            <>
              <CommandGroup heading="Navigation">
                <CommandItem
                  value="dashboard"
                  onSelect={() => handleSelect('/dashboard', 'Dashboard')}
                  style={{
                    cursor: 'pointer',
                    padding: '12px 16px'
                  }}
                >
                  <div className="flex items-center gap-3">
                    <LayoutDashboard className="h-4 w-4" style={{ color: 'rgba(255, 255, 255, 0.6)' }} />
                    <span style={{ fontSize: '14px', color: '#FFFFFF' }}>Dashboard</span>
                  </div>
                </CommandItem>
                <CommandItem
                  value="companies"
                  onSelect={() => handleSelect('/dashboard', 'Companies')}
                  style={{
                    cursor: 'pointer',
                    padding: '12px 16px'
                  }}
                >
                  <div className="flex items-center gap-3">
                    <Building2 className="h-4 w-4" style={{ color: 'rgba(255, 255, 255, 0.6)' }} />
                    <span style={{ fontSize: '14px', color: '#FFFFFF' }}>Companies</span>
                  </div>
                </CommandItem>
                <CommandItem
                  value="team"
                  onSelect={() => handleSelect('/team', 'Team')}
                  style={{
                    cursor: 'pointer',
                    padding: '12px 16px'
                  }}
                >
                  <div className="flex items-center gap-3">
                    <Users className="h-4 w-4" style={{ color: 'rgba(255, 255, 255, 0.6)' }} />
                    <span style={{ fontSize: '14px', color: '#FFFFFF' }}>Team</span>
                  </div>
                </CommandItem>
              </CommandGroup>
              
              {recentSearches.length > 0 && (
                <CommandGroup heading="Recent Searches">
                  {recentSearches.map((search, index) => {
                    const company = search.type === 'company' && search.companyId 
                      ? companies.find(c => c.id === search.companyId)
                      : null
                    
                    return (
                      <CommandItem
                        key={search.id}
                        value={`recent-${search.id}`}
                        onSelect={() => {
                          if (search.type === 'company' && search.companyId) {
                            handleSelectCompany(search.companyId)
                          } else if (search.type === 'navigation' && search.path) {
                            handleSelect(search.path, search.name)
                          }
                        }}
                        style={{
                          cursor: 'pointer',
                          padding: '12px 16px',
                          animationDelay: `${0.25 + index * 0.05}s`
                        }}
                      >
                        <div className="flex items-center gap-3">
                          {search.type === 'company' ? (
                            <Building2 className="h-4 w-4" style={{ color: 'rgba(255, 255, 255, 0.6)' }} />
                          ) : (
                            <Clock className="h-4 w-4" style={{ color: 'rgba(255, 255, 255, 0.6)' }} />
                          )}
                          <div className="flex flex-col flex-1">
                            <span style={{ fontSize: '14px', color: '#FFFFFF' }}>{search.name}</span>
                            {company ? (
                              <span style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.5)' }}>
                                {company.email}
                              </span>
                            ) : (
                              <span style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.5)' }}>
                                {search.path || 'Navigation'}
                              </span>
                            )}
                          </div>
                        </div>
                      </CommandItem>
                    )
                  })}
                </CommandGroup>
              )}
            </>
          ) : null}
        </CommandList>
      </CommandDialog>

      {/* Inline Animation Styles */}
      <style jsx global>{`
        @keyframes overlayFadeIn {
          0% {
            opacity: 0;
            backdrop-filter: blur(0px) saturate(100%);
            -webkit-backdrop-filter: blur(0px) saturate(100%);
          }
          100% {
            opacity: 1;
            backdrop-filter: blur(16px) saturate(150%);
            -webkit-backdrop-filter: blur(16px) saturate(150%);
          }
        }

        @keyframes overlayFadeOut {
          0% {
            opacity: 1;
            backdrop-filter: blur(16px) saturate(150%);
            -webkit-backdrop-filter: blur(16px) saturate(150%);
          }
          100% {
            opacity: 0;
            backdrop-filter: blur(0px) saturate(100%);
            -webkit-backdrop-filter: blur(0px) saturate(100%);
          }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes emptyBounceIn {
          0% {
            opacity: 0;
            transform: scale(0.9);
          }
          60% {
            transform: scale(1.02);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </>
  )
}
