'use client'

import { useState, useEffect, useRef } from 'react'

interface TopNavigationBarProps {
  canGoForward: boolean
  onBackClick: () => void
  onForwardClick: () => void
  onSearchClick: () => void
  onActivityLogClick: () => void
}

export default function TopNavigationBar({
  canGoForward,
  onBackClick,
  onForwardClick,
  onSearchClick,
  onActivityLogClick,
}: TopNavigationBarProps) {
  const [isWorkspaceMenuOpen, setIsWorkspaceMenuOpen] = useState(false)
  const [workspaces, setWorkspaces] = useState([
    { id: 1, name: 'Workspace 1', isActive: true },
    { id: 2, name: 'Workspace 2', isActive: false },
    { id: 3, name: 'Workspace 3', isActive: false },
  ])
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [workspaceToDelete, setWorkspaceToDelete] = useState<number | null>(null)
  const [newWorkspaceName, setNewWorkspaceName] = useState('')
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const workspaceMenuRef = useRef<HTMLDivElement>(null)
  const userMenuRef = useRef<HTMLDivElement>(null)
  const nextWorkspaceId = useRef(4)
  const inputRef = useRef<HTMLInputElement>(null)
  const userName = 'Ahmed Rashed'

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      const isInsideWorkspaceMenu = target.closest('[data-workspace-menu]') || workspaceMenuRef.current?.contains(target)
      const isInsideUserMenu = target.closest('[data-user-menu]') || userMenuRef.current?.contains(target)
      
      if (!isInsideWorkspaceMenu && isWorkspaceMenuOpen) {
        setIsWorkspaceMenuOpen(false)
      }
      
      if (!isInsideUserMenu && isUserMenuOpen) {
        setIsUserMenuOpen(false)
      }
    }
    
    if (isWorkspaceMenuOpen || isUserMenuOpen) {
      document.addEventListener('click', handleClickOutside)
    }
    
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [isWorkspaceMenuOpen, isUserMenuOpen])

  const handleWorkspaceSelect = (workspaceId: number) => {
    setWorkspaces(prev => prev.map(ws => ({
      ...ws,
      isActive: ws.id === workspaceId
    })))
    setIsWorkspaceMenuOpen(false)
  }

  useEffect(() => {
    if (showAddDialog && inputRef.current) {
      inputRef.current.focus()
    }
  }, [showAddDialog])

  const handleAddWorkspace = () => {
    setShowAddDialog(true)
    setIsWorkspaceMenuOpen(false)
  }

  const handleConfirmAddWorkspace = () => {
    if (newWorkspaceName.trim()) {
      const newWorkspace = {
        id: nextWorkspaceId.current++,
        name: newWorkspaceName.trim(),
        isActive: false
      }
      setWorkspaces(prev => [...prev, newWorkspace])
      setNewWorkspaceName('')
      setShowAddDialog(false)
    }
  }

  const handleCancelAddWorkspace = () => {
    setNewWorkspaceName('')
    setShowAddDialog(false)
  }

  const handleDeleteWorkspace = (workspaceId: number, e: React.MouseEvent) => {
    e.stopPropagation()
    setWorkspaceToDelete(workspaceId)
    setShowDeleteDialog(true)
    setIsWorkspaceMenuOpen(false)
  }

  const handleConfirmDeleteWorkspace = () => {
    if (workspaceToDelete === null) return

    const workspaceToDeleteObj = workspaces.find(ws => ws.id === workspaceToDelete)
    if (!workspaceToDeleteObj) return

    if (workspaceToDeleteObj.isActive && workspaces.length > 1) {
      const firstInactive = workspaces.find(ws => !ws.isActive)
      if (firstInactive) {
        setWorkspaces(prev => prev
          .filter(ws => ws.id !== workspaceToDelete)
          .map(ws => ({ ...ws, isActive: ws.id === firstInactive.id }))
        )
      } else {
        setWorkspaces(prev => prev.filter(ws => ws.id !== workspaceToDelete))
      }
    } else if (!workspaceToDeleteObj.isActive) {
      setWorkspaces(prev => prev.filter(ws => ws.id !== workspaceToDelete))
    }

    setWorkspaceToDelete(null)
    setShowDeleteDialog(false)
  }

  const handleCancelDeleteWorkspace = () => {
    setWorkspaceToDelete(null)
    setShowDeleteDialog(false)
  }

  const handleLogout = () => {
    setIsUserMenuOpen(false)
  }

  return (
    <div
      className="flex flex-row items-center flex-shrink-0"
      style={{
        width: '100%',
        height: '34px',
        padding: '6px 20px 6px 8px',
        gap: '22px',
        background: '#0F0F0F'
      }}
    >
      {/* Vodex OS Branding */}
      <div className="flex flex-row items-center" style={{ width: '128px', height: '24px', gap: '12px', position: 'relative' }} ref={workspaceMenuRef}>
        <div
          className="flex flex-row items-center cursor-pointer transition-all duration-200"
          onClick={() => setIsWorkspaceMenuOpen(!isWorkspaceMenuOpen)}
          style={{
            width: '128px',
            height: '24px',
            padding: '3px 6px',
            gap: '4px',
            background: isWorkspaceMenuOpen ? '#2A2A2A' : '#222222',
            borderRadius: '8px',
            border: isWorkspaceMenuOpen ? '1px solid rgba(0, 142, 90, 0.2)' : '1px solid transparent'
          }}
          onMouseEnter={(e) => {
            if (!isWorkspaceMenuOpen) {
              e.currentTarget.style.background = '#2A2A2A'
            } else {
              e.currentTarget.style.background = '#2F2F2F'
            }
          }}
          onMouseLeave={(e) => {
            if (!isWorkspaceMenuOpen) {
              e.currentTarget.style.background = '#222222'
            } else {
              e.currentTarget.style.background = '#2A2A2A'
            }
          }}
        >
          <div className="flex flex-row items-center" style={{ width: '100px', height: '16px', gap: '4px' }}>
            <img
              src="/Frame 220.png"
              alt="Vodex OS Logo"
              style={{
                width: '16px',
                height: '16px',
                borderRadius: '8px',
                objectFit: 'contain'
              }}
            />
            <span
              style={{
                width: '80px',
                height: '16px',
                fontFamily: 'SF Pro',
                fontStyle: 'normal',
                fontWeight: 510,
                fontSize: '12px',
                lineHeight: '16px',
                letterSpacing: '0.005em',
                color: '#FFFFFF'
              }}
            >
              Vodex OS
            </span>
          </div>
          <svg 
            width="12" 
            height="12" 
            viewBox="0 0 12 12" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg" 
            style={{ 
              transform: isWorkspaceMenuOpen ? 'rotate(0deg)' : 'rotate(90deg)',
              alignSelf: 'center',
              flexShrink: 0,
              transition: 'transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
              opacity: 0.7
            }}
          >
            <path 
              d="M2 2L6 6L2 10" 
              stroke={isWorkspaceMenuOpen ? '#008E5A' : '#999999'} 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </div>
        
        {isWorkspaceMenuOpen && (
          <div
            data-workspace-menu
            className="absolute top-full left-0"
            style={{
              width: '180px',
              marginTop: '4px',
              background: '#1A1A1A',
              border: '1px solid #2B2B2B',
              borderRadius: '10px',
              boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.5), 0px 2px 8px rgba(0, 0, 0, 0.3)',
              overflow: 'hidden',
              zIndex: 9999,
              padding: '3px'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {workspaces.map((workspace, index) => (
              <button
                key={workspace.id}
                onClick={(e) => {
                  e.stopPropagation()
                  handleWorkspaceSelect(workspace.id)
                }}
                className="w-full flex items-center transition-all duration-150"
                style={{
                  padding: '8px 10px',
                  gap: '8px',
                  borderRadius: '6px',
                  marginBottom: '1px',
                  background: workspace.isActive ? 'rgba(0, 142, 90, 0.1)' : 'transparent',
                  border: workspace.isActive ? '1px solid rgba(0, 142, 90, 0.2)' : '1px solid transparent'
                }}
                onMouseEnter={(e) => {
                  if (!workspace.isActive) {
                    e.currentTarget.style.background = '#2A2A2A'
                    e.currentTarget.style.borderColor = '#2B2B2B'
                  } else {
                    e.currentTarget.style.background = 'rgba(0, 142, 90, 0.15)'
                    e.currentTarget.style.borderColor = 'rgba(0, 142, 90, 0.3)'
                  }
                }}
                onMouseLeave={(e) => {
                  if (!workspace.isActive) {
                    e.currentTarget.style.background = 'transparent'
                    e.currentTarget.style.borderColor = 'transparent'
                  } else {
                    e.currentTarget.style.background = 'rgba(0, 142, 90, 0.1)'
                    e.currentTarget.style.borderColor = 'rgba(0, 142, 90, 0.2)'
                  }
                }}
              >
                <div 
                  style={{ 
                    width: '8px', 
                    height: '8px', 
                    background: workspace.isActive ? '#008E5A' : 'transparent',
                    border: workspace.isActive ? 'none' : '1.5px solid #666666',
                    borderRadius: '50%',
                    flexShrink: 0,
                    transition: 'all 0.2s ease'
                  }} 
                />
                <span
                  style={{
                    fontFamily: 'SF Pro',
                    fontWeight: 510,
                    fontSize: '12px',
                    lineHeight: '16px',
                    letterSpacing: '0.005em',
                    color: workspace.isActive ? '#FFFFFF' : '#999999',
                    flex: 1,
                    textAlign: 'left'
                  }}
                >
                  {workspace.name}
                </span>
                <div className="flex items-center gap-2" style={{ flexShrink: 0 }}>
                  {workspace.isActive && (
                    <svg 
                      width="12" 
                      height="12" 
                      viewBox="0 0 12 12" 
                      fill="none" 
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path 
                        d="M10 3L4.5 8.5L2 6" 
                        stroke="#008E5A" 
                        strokeWidth="1.8" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                  {workspaces.length > 1 && (
                    <div
                      onClick={(e) => handleDeleteWorkspace(workspace.id, e)}
                      className="flex items-center justify-center transition-colors cursor-pointer"
                      style={{
                        width: '16px',
                        height: '16px',
                        borderRadius: '4px',
                        padding: '2px',
                        opacity: 0.6
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = '#3A3A3A'
                        e.currentTarget.style.opacity = '1'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'transparent'
                        e.currentTarget.style.opacity = '0.6'
                      }}
                    >
                      <svg 
                        width="10" 
                        height="10" 
                        viewBox="0 0 10 10" 
                        fill="none" 
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path 
                          d="M2.5 2.5L7.5 7.5M7.5 2.5L2.5 7.5" 
                          stroke="#999999" 
                          strokeWidth="1.2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  )}
                </div>
              </button>
            ))}
            <div
              style={{
                height: '1px',
                background: '#2B2B2B',
                margin: '4px 0'
              }}
            />
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleAddWorkspace()
              }}
              className="w-full flex items-center transition-all duration-150"
              style={{
                padding: '8px 10px',
                gap: '8px',
                borderRadius: '6px',
                background: 'transparent',
                border: '1px solid transparent'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#2A2A2A'
                e.currentTarget.style.borderColor = '#2B2B2B'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent'
                e.currentTarget.style.borderColor = 'transparent'
              }}
            >
              <svg 
                width="12" 
                height="12" 
                viewBox="0 0 12 12" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                style={{ flexShrink: 0 }}
              >
                <path 
                  d="M6 2.5V9.5M2.5 6H9.5" 
                  stroke="#008E5A" 
                  strokeWidth="1.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
              <span
                style={{
                  fontFamily: 'SF Pro',
                  fontWeight: 510,
                  fontSize: '12px',
                  lineHeight: '16px',
                  letterSpacing: '0.005em',
                  color: '#008E5A',
                  flex: 1,
                  textAlign: 'left'
                }}
              >
                Add Workspace
              </span>
            </button>
          </div>
        )}
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Navigation Controls - Centered */}
      <div className="flex flex-row items-center justify-center flex-shrink-0" style={{ minWidth: '324px', height: '24px', gap: '12px' }}>
        {/* Back/Forward Buttons */}
        <div className="flex flex-row items-center" style={{ width: '48px', height: '24px', gap: '0px' }}>
          <div
            className="flex flex-row items-center cursor-pointer hover:bg-gray-100 transition-colors"
            onClick={onBackClick}
            style={{
              width: '28px',
              height: '28px',
              padding: '2px',
              gap: '4px',
              borderRadius: '8px'
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.785 8.96497L7.75 12L10.785 15.035" stroke="#999999" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M16.25 12H7.83502" stroke="#999999" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div
            className={`flex flex-row items-center transition-colors ${
              canGoForward 
                ? 'cursor-pointer hover:bg-gray-100' 
                : 'cursor-not-allowed opacity-50'
            }`}
            onClick={onForwardClick}
            style={{
              width: '28px',
              height: '28px',
              padding: '2px',
              gap: '4px',
              borderRadius: '8px',
              transform: 'rotate(-180deg)'
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: 'rotate(-180deg)' }}>
              <path d="M13.215 15.035L16.25 12L13.215 8.96504" stroke={canGoForward ? "#3A3A3A" : "#999999"} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M7.74998 12L16.165 12" stroke={canGoForward ? "#3A3A3A" : "#999999"} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        {/* Header Search Bar */}
        <div
          className="flex flex-row items-center justify-between cursor-pointer"
          onClick={onSearchClick}
          style={{
            width: '264px',
            height: '24px',
            padding: '6px 12px',
            gap: '5px',
            background: '#2A2A2A',
            border: '1px solid #2B2B2B',
            borderRadius: '12px',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#2F2F2F'
            e.currentTarget.style.borderColor = '#3A3A3A'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#2A2A2A'
            e.currentTarget.style.borderColor = '#2B2B2B'
          }}
        >
          <div className="flex flex-row items-center" style={{ gap: '4px' }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.66665 14C11.1644 14 14 11.1645 14 7.66671C14 4.1689 11.1644 1.33337 7.66665 1.33337C4.16884 1.33337 1.33331 4.1689 1.33331 7.66671C1.33331 11.1645 4.16884 14 7.66665 14Z" stroke="#999999" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M14.6666 14.6667L13.3333 13.3334" stroke="#999999" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span
              style={{
                fontFamily: 'SF Pro',
                fontStyle: 'normal',
                fontWeight: 510,
                fontSize: '12px',
                lineHeight: '16px',
                letterSpacing: '0.005em',
                color: '#999999'
              }}
            >
              Search...
            </span>
          </div>
          {/* Keyboard Shortcut Indicator */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '2px',
              padding: '2px 6px',
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '4px',
              fontSize: '10px',
              color: '#999999',
              fontFamily: 'SF Pro',
              fontWeight: 500,
              letterSpacing: '0.3px'
            }}
          >
            <span>⌘</span>
            <span>K</span>
          </div>
        </div>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* User Profile */}
      <div className="flex flex-row items-center flex-shrink-0" style={{ width: '74px', height: '24px', gap: '16px' }}>
        {/* Timer Icon */}
        <div
          className="flex flex-row items-center cursor-pointer"
          onClick={onActivityLogClick}
          style={{
            width: '24px',
            height: '24px',
            padding: '3px 6px',
            gap: '4px',
            background: '#222222',
            borderRadius: '8px',
            transition: 'background-color 0.2s',
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2a2a2a'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#222222'}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.44495 1.725H4.55495C4.35495 1.725 4.19495 1.565 4.19495 1.365C4.19495 1.165 4.35495 1 4.55495 1H7.44495C7.64495 1 7.80495 1.16 7.80495 1.36C7.80495 1.56 7.64495 1.725 7.44495 1.725Z" fill="#999999"/>
            <path d="M7.00004 9.98495V8.51495C7.00004 7.60995 7.61004 6.99995 8.51504 6.99995H9.98504C10.1 6.99995 10.21 7.00995 10.315 7.02995C10.325 6.90995 10.335 6.78995 10.335 6.66495C10.335 4.26995 8.39004 2.32495 6.00004 2.32495C3.61004 2.32495 1.66504 4.26995 1.66504 6.66495C1.66504 9.05495 3.61004 11 6.00004 11C6.42504 11 6.83004 10.93 7.22004 10.82C7.08004 10.585 7.00004 10.305 7.00004 9.98495ZM6.37504 6.49995C6.37504 6.70495 6.20504 6.87495 6.00004 6.87495C5.79504 6.87495 5.62504 6.70495 5.62504 6.49995V3.99995C5.62504 3.79495 5.79504 3.62495 6.00004 3.62495C6.20504 3.62495 6.37504 3.79495 6.37504 3.99995V6.49995Z" fill="#999999"/>
            <path d="M9.985 7.5H8.52C7.88 7.5 7.5 7.88 7.5 8.515V9.985C7.5 10.62 7.88 11 8.52 11H9.985C10.62 11 11 10.62 11 9.985V8.515C11 7.88 10.62 7.5 9.985 7.5ZM8.96 10.03C8.96 10.19 8.83 10.32 8.665 10.32C8.505 10.32 8.375 10.19 8.375 10.03V8.47C8.375 8.31 8.505 8.18 8.665 8.18C8.83 8.18 8.96 8.31 8.96 8.47V10.03ZM10.125 10.03C10.125 10.19 9.995 10.32 9.835 10.32C9.675 10.32 9.54 10.19 9.54 10.03V8.47C9.54 8.31 9.675 8.18 9.835 8.18C9.995 8.18 10.125 8.31 10.125 8.47V10.03Z" fill="#999999"/>
          </svg>
        </div>

        {/* User Avatar */}
        <div 
          className="flex flex-row items-center" 
          style={{ width: '34px', height: '24px', gap: '2px', position: 'relative' }} 
          ref={userMenuRef}
        >
          <div
            className="flex flex-col justify-center items-center cursor-pointer transition-all duration-200"
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            style={{
              width: '24px',
              height: '24px',
              padding: '3.6px 2.4px',
              gap: '12px',
              background: isUserMenuOpen ? '#2A2A2A' : '#5842C8',
              borderRadius: '12.6px',
              position: 'relative',
              border: isUserMenuOpen ? '1px solid rgba(88, 66, 200, 0.3)' : '1px solid transparent'
            }}
            onMouseEnter={(e) => {
              if (!isUserMenuOpen) {
                e.currentTarget.style.background = '#6B5AD9'
              }
            }}
            onMouseLeave={(e) => {
              if (!isUserMenuOpen) {
                e.currentTarget.style.background = '#5842C8'
              }
            }}
          >
            <span
              style={{
                width: '17px',
                height: '16px',
                fontFamily: 'SF Pro',
                fontStyle: 'normal',
                fontWeight: 510,
                fontSize: '12px',
                lineHeight: '16px',
                textAlign: 'center',
                letterSpacing: '0.005em',
                color: '#FFFFFF'
              }}
            >
              AR
            </span>
            <div
              style={{
                position: 'absolute',
                width: '7.2px',
                height: '7.2px',
                right: '0px',
                bottom: '0px',
                background: '#36BA7A',
                border: '1.2px solid #141414',
                borderRadius: '3.6px'
              }}
            />
          </div>
          <svg 
            width="8" 
            height="8" 
            viewBox="0 0 8 8" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg" 
            style={{ 
              transform: isUserMenuOpen ? 'rotate(0deg)' : 'rotate(90deg)',
              transition: 'transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
              opacity: 0.7
            }}
          >
            <path 
              d="M2 2L4 4L2 6" 
              stroke={isUserMenuOpen ? '#5842C8' : '#999999'} 
              strokeWidth="1" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>

          {isUserMenuOpen && (
            <div
              data-user-menu
              className="absolute top-full right-0"
              style={{
                width: '220px',
                marginTop: '4px',
                background: '#1A1A1A',
                border: '1px solid #2B2B2B',
                borderRadius: '10px',
                boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.5), 0px 2px 8px rgba(0, 0, 0, 0.3)',
                overflow: 'hidden',
                zIndex: 9999,
                padding: '3px'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className="w-full flex items-center transition-all duration-150"
                style={{
                  padding: '12px 14px',
                  gap: '12px',
                  borderRadius: '6px',
                  marginBottom: '1px',
                  background: 'transparent',
                  border: '1px solid transparent'
                }}
              >
                <div
                  className="flex flex-col justify-center items-center"
                  style={{
                    width: '32px',
                    height: '32px',
                    padding: '4.8px 3.2px',
                    background: '#5842C8',
                    borderRadius: '16px',
                    flexShrink: 0
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'SF Pro',
                      fontStyle: 'normal',
                      fontWeight: 510,
                      fontSize: '14px',
                      lineHeight: '20px',
                      textAlign: 'center',
                      letterSpacing: '0.005em',
                      color: '#FFFFFF'
                    }}
                  >
                    AR
                  </span>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontFamily: 'SF Pro',
                      fontWeight: 510,
                      fontSize: '13px',
                      lineHeight: '18px',
                      color: '#FFFFFF',
                      marginBottom: '2px',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}
                  >
                    {userName}
                  </div>
                  <div
                    style={{
                      fontFamily: 'SF Pro',
                      fontWeight: 400,
                      fontSize: '11px',
                      lineHeight: '16px',
                      color: '#999999',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}
                  >
                    Online
                  </div>
                </div>
              </div>
              <div
                style={{
                  height: '1px',
                  background: '#2B2B2B',
                  margin: '4px 0'
                }}
              />
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  handleLogout()
                }}
                className="w-full flex items-center transition-all duration-150"
                style={{
                  padding: '8px 10px',
                  gap: '10px',
                  borderRadius: '6px',
                  background: 'transparent',
                  border: '1px solid transparent'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#2A2A2A'
                  e.currentTarget.style.borderColor = '#2B2B2B'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent'
                  e.currentTarget.style.borderColor = 'transparent'
                }}
              >
                <svg 
                  width="14" 
                  height="14" 
                  viewBox="0 0 14 14" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ flexShrink: 0 }}
                >
                  <path 
                    d="M5.25 12.25H2.625C2.27982 12.25 2 11.9702 2 11.625V2.375C2 2.02982 2.27982 1.75 2.625 1.75H5.25M9.33333 10.5L12.25 7M12.25 7L9.33333 3.5M12.25 7H5.25" 
                    stroke="#DC6300" 
                    strokeWidth="1.2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </svg>
                <span
                  style={{
                    fontFamily: 'SF Pro',
                    fontWeight: 510,
                    fontSize: '12px',
                    lineHeight: '16px',
                    letterSpacing: '0.005em',
                    color: '#DC6300',
                    flex: 1,
                    textAlign: 'left'
                  }}
                >
                  Sign Out
                </span>
              </button>
            </div>
          )}
        </div>
      </div>

      {showAddDialog && (
        <div
          className="fixed inset-0 flex items-center justify-center z-[10000]"
          style={{
            background: 'rgba(0, 0, 0, 0.6)',
            backdropFilter: 'blur(4px)'
          }}
          onClick={handleCancelAddWorkspace}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '400px',
              background: '#1A1A1A',
              border: '1px solid #2B2B2B',
              borderRadius: '12px',
              boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.5), 0px 2px 8px rgba(0, 0, 0, 0.3)',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px'
            }}
          >
            <div>
              <h3
                style={{
                  fontFamily: 'SF Pro',
                  fontWeight: 510,
                  fontSize: '18px',
                  lineHeight: '24px',
                  color: '#FFFFFF',
                  marginBottom: '8px'
                }}
              >
                Add New Workspace
              </h3>
              <p
                style={{
                  fontFamily: 'SF Pro',
                  fontWeight: 400,
                  fontSize: '13px',
                  lineHeight: '18px',
                  color: '#999999'
                }}
              >
                Enter a name for your new workspace
              </p>
            </div>
            <input
              ref={inputRef}
              type="text"
              value={newWorkspaceName}
              onChange={(e) => setNewWorkspaceName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && newWorkspaceName.trim()) {
                  handleConfirmAddWorkspace()
                } else if (e.key === 'Escape') {
                  handleCancelAddWorkspace()
                }
              }}
              placeholder="Workspace name"
              style={{
                width: '100%',
                padding: '10px 12px',
                background: '#2A2A2A',
                border: '1px solid #2B2B2B',
                borderRadius: '8px',
                fontFamily: 'SF Pro',
                fontWeight: 400,
                fontSize: '14px',
                lineHeight: '20px',
                color: '#FFFFFF',
                outline: 'none',
                transition: 'all 0.2s ease'
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = '#008E5A'
                e.currentTarget.style.boxShadow = '0px 0px 0px 3px rgba(0, 142, 90, 0.1)'
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = '#2B2B2B'
                e.currentTarget.style.boxShadow = 'none'
              }}
            />
            <div
              style={{
                display: 'flex',
                gap: '12px',
                justifyContent: 'flex-end'
              }}
            >
              <button
                onClick={handleCancelAddWorkspace}
                style={{
                  padding: '8px 16px',
                  background: 'transparent',
                  border: '1px solid #2B2B2B',
                  borderRadius: '8px',
                  fontFamily: 'SF Pro',
                  fontWeight: 510,
                  fontSize: '13px',
                  lineHeight: '18px',
                  color: '#999999',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#2A2A2A'
                  e.currentTarget.style.borderColor = '#3A3A3A'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent'
                  e.currentTarget.style.borderColor = '#2B2B2B'
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmAddWorkspace}
                disabled={!newWorkspaceName.trim()}
                style={{
                  padding: '8px 16px',
                  background: newWorkspaceName.trim() ? '#008E5A' : '#2A2A2A',
                  border: '1px solid transparent',
                  borderRadius: '8px',
                  fontFamily: 'SF Pro',
                  fontWeight: 510,
                  fontSize: '13px',
                  lineHeight: '18px',
                  color: newWorkspaceName.trim() ? '#FFFFFF' : '#666666',
                  cursor: newWorkspaceName.trim() ? 'pointer' : 'not-allowed',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  if (newWorkspaceName.trim()) {
                    e.currentTarget.style.background = '#007A4D'
                  }
                }}
                onMouseLeave={(e) => {
                  if (newWorkspaceName.trim()) {
                    e.currentTarget.style.background = '#008E5A'
                  }
                }}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {showDeleteDialog && workspaceToDelete !== null && (
        <div
          className="fixed inset-0 flex items-center justify-center z-[10000]"
          style={{
            background: 'rgba(0, 0, 0, 0.6)',
            backdropFilter: 'blur(4px)'
          }}
          onClick={handleCancelDeleteWorkspace}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '400px',
              background: '#1A1A1A',
              border: '1px solid #2B2B2B',
              borderRadius: '12px',
              boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.5), 0px 2px 8px rgba(0, 0, 0, 0.3)',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px'
            }}
          >
            <div>
              <h3
                style={{
                  fontFamily: 'SF Pro',
                  fontWeight: 510,
                  fontSize: '18px',
                  lineHeight: '24px',
                  color: '#FFFFFF',
                  marginBottom: '8px'
                }}
              >
                Delete Workspace
              </h3>
              <p
                style={{
                  fontFamily: 'SF Pro',
                  fontWeight: 400,
                  fontSize: '13px',
                  lineHeight: '18px',
                  color: '#999999'
                }}
              >
                Are you sure you want to delete "{workspaces.find(ws => ws.id === workspaceToDelete)?.name}"? This action cannot be undone.
              </p>
            </div>
            <div
              style={{
                display: 'flex',
                gap: '12px',
                justifyContent: 'flex-end'
              }}
            >
              <button
                onClick={handleCancelDeleteWorkspace}
                style={{
                  padding: '8px 16px',
                  background: 'transparent',
                  border: '1px solid #2B2B2B',
                  borderRadius: '8px',
                  fontFamily: 'SF Pro',
                  fontWeight: 510,
                  fontSize: '13px',
                  lineHeight: '18px',
                  color: '#999999',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#2A2A2A'
                  e.currentTarget.style.borderColor = '#3A3A3A'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent'
                  e.currentTarget.style.borderColor = '#2B2B2B'
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDeleteWorkspace}
                style={{
                  padding: '8px 16px',
                  background: '#DC6300',
                  border: '1px solid transparent',
                  borderRadius: '8px',
                  fontFamily: 'SF Pro',
                  fontWeight: 510,
                  fontSize: '13px',
                  lineHeight: '18px',
                  color: '#FFFFFF',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#C05500'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#DC6300'
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

