'use client'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useRef, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import type { Company } from './types'

interface SortableRowProps {
  company: Company
  openStateMenu: number | null
  openActionMenu: number | null
  setOpenStateMenu: (id: number | null) => void
  setOpenActionMenu: (id: number | null) => void
  updateCompanyState: (companyId: number, newState: 'Active' | 'Not Active' | 'Pending') => void
}

export default function SortableRow({ 
  company, 
  openStateMenu, 
  openActionMenu, 
  setOpenStateMenu, 
  setOpenActionMenu, 
  updateCompanyState 
}: SortableRowProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: company.id })

  const stateButtonRef = useRef<HTMLButtonElement>(null)
  const stateMenuRef = useRef<HTMLDivElement>(null)
  const [menuPosition, setMenuPosition] = useState<{ top: number; left: number } | null>(null)
  const actionButtonRef = useRef<HTMLButtonElement>(null)
  const actionMenuRef = useRef<HTMLDivElement>(null)
  const [actionMenuPosition, setActionMenuPosition] = useState<{ top: number; right: number } | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (openStateMenu === company.id && stateButtonRef.current) {
      const rect = stateButtonRef.current.getBoundingClientRect()
      setMenuPosition({
        top: rect.bottom + 4,
        left: rect.left + 12
      })
    } else {
      setMenuPosition(null)
    }
  }, [openStateMenu, company.id])

  useEffect(() => {
    if (openActionMenu === company.id && actionButtonRef.current) {
      const rect = actionButtonRef.current.getBoundingClientRect()
      setActionMenuPosition({
        top: rect.bottom + 4,
        right: window.innerWidth - rect.right
      })
    } else {
      setActionMenuPosition(null)
    }
  }, [openActionMenu, company.id])

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex flex-row items-start w-full"
    >
      {/* More Icon Column */}
      <div className="flex flex-col items-start flex-shrink-0" style={{ width: '20px', zIndex: 0 }}>
        <div
          {...attributes}
          {...listeners}
          className="flex flex-row items-center justify-center flex-shrink-0"
          style={{
            width: '20px',
            height: '30px',
            padding: '12px 4px',
            gap: '0px',
            borderBottom: '1px solid #2B2B2B',
            cursor: 'grab',
          }}
        >
          <img
            src="/more.png"
            alt="more"
            style={{
              width: '6px',
              height: '13px'
            }}
          />
        </div>
      </div>

      {/* Company Name Column */}
      <div className="flex flex-col items-start flex-shrink-0" style={{ width: '160px', zIndex: 1 }}>
        <div
          className="flex flex-row items-center flex-shrink-0"
          style={{
            width: '160px',
            height: '30px',
            padding: '8px 12px',
            gap: '6px',
            borderBottom: '1px solid #2B2B2B'
          }}
        >
          <div className="flex flex-row items-center" style={{ gap: '6px' }}>
            <div
              style={{
                width: '16px',
                height: '16px',
                background: '#FFFFFF',
                borderRadius: '4px'
              }}
            />
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
              {company.companyName}
            </span>
          </div>
        </div>
      </div>

      {/* States Column */}
      <div className="flex flex-col items-start flex-shrink-0" style={{ width: '120px', zIndex: 1 }}>
        <div
          className="flex flex-row items-center flex-shrink-0"
          style={{
            width: '120px',
            height: '30px',
            padding: '8px 12px',
            gap: '6px',
            borderBottom: '1px solid #2B2B2B',
            position: 'relative'
          }}
        >
          <button
            ref={stateButtonRef}
            onClick={(e) => {
              e.stopPropagation()
              setOpenStateMenu(openStateMenu === company.id ? null : company.id)
            }}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              margin: 0
            }}
          >
            <div
              className="flex flex-col justify-center items-center"
              style={{
                padding: '0px 6px',
                gap: '6px',
                width: 'auto',
                minWidth: '70px',
                height: '20px',
                background: company.state === 'Active' ? '#008E5A' : 
                           company.state === 'Not Active' ? '#8E1F00' : '#DC6300',
                borderRadius: '6px'
              }}
            >
              <div
                className="flex flex-row justify-center items-center"
                style={{
                  padding: '0px',
                  gap: '4px',
                  width: 'auto',
                  height: '20px'
                }}
              >
                <span
                  style={{
                    height: '16px',
                    fontFamily: 'SF Pro',
                    fontStyle: 'normal',
                    fontWeight: 510,
                    fontSize: '12px',
                    lineHeight: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    letterSpacing: '0.005em',
                    color: '#FFFFFF',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {company.state}
                </span>
                <div
                  style={{
                    width: '1px',
                    height: '100%',
                    border: '0.8px solid rgba(30, 30, 30, 0.5)'
                  }}
                />
                <svg 
                  width="10" 
                  height="10" 
                  viewBox="0 0 10 10" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M3.40833 2.53332L3.40833 5.12915L3.40833 7.46665C3.40833 7.86665 3.89166 8.06665 4.17499 7.78332L6.33333 5.62498C6.67916 5.27915 6.67916 4.71665 6.33333 4.37082L5.51249 3.54998L4.17499 2.21248C3.89166 1.93332 3.40833 2.13332 3.40833 2.53332Z" fill="#FFFFFF"/>
                </svg>
              </div>
            </div>
          </button>
          {openStateMenu === company.id && menuPosition && mounted && createPortal(
            <>
              <div
                style={{
                  position: 'fixed',
                  top: `${menuPosition.top - 2}px`,
                  left: `${menuPosition.left - 2}px`,
                  width: '154px',
                  height: '110px',
                  background: '#000000',
                  borderRadius: '12px',
                  zIndex: 999998,
                  opacity: 0.98
                }}
              />
              <div
                ref={stateMenuRef}
                onClick={(e) => e.stopPropagation()}
                className="flex flex-col items-start"
                style={{
                  position: 'fixed',
                  top: `${menuPosition.top}px`,
                  left: `${menuPosition.left}px`,
                  width: '150px',
                  background: '#000000',
                  border: '1px solid #3B3B3B',
                  boxShadow: '0px 12px 48px rgba(0, 0, 0, 1), 0px 6px 24px rgba(0, 0, 0, 1), inset 0px 0px 0px 1px rgba(255, 255, 255, 0.05)',
                  borderRadius: '10px',
                  padding: '8px',
                  gap: '4px',
                  zIndex: 999999,
                  opacity: 1
                }}
              >
              {/* Active Option */}
              <div
                className="flex flex-row items-center"
                style={{
                  width: '100%',
                  height: '32px',
                  padding: '6px 8px',
                  gap: '8px',
                  background: company.state === 'Active' ? '#2B2B2B' : '#222222',
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  if (company.state !== 'Active') {
                    e.currentTarget.style.background = '#2B2B2B'
                  }
                }}
                onMouseLeave={(e) => {
                  if (company.state !== 'Active') {
                    e.currentTarget.style.background = '#222222'
                  }
                }}
                onClick={() => updateCompanyState(company.id, 'Active')}
              >
                <div
                  style={{
                    width: '12px',
                    height: '12px',
                    background: '#008E5A',
                    borderRadius: '4px'
                  }}
                />
                <span
                  style={{
                    fontFamily: 'SF Pro',
                    fontStyle: 'normal',
                    fontWeight: 510,
                    fontSize: '12px',
                    lineHeight: '16px',
                    letterSpacing: '0.005em',
                    color: '#FFFFFF'
                  }}
                >
                  Active
                </span>
              </div>
              
              {/* Not Active Option */}
              <div
                className="flex flex-row items-center"
                style={{
                  width: '100%',
                  height: '32px',
                  padding: '6px 8px',
                  gap: '8px',
                  background: company.state === 'Not Active' ? '#2B2B2B' : '#222222',
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  if (company.state !== 'Not Active') {
                    e.currentTarget.style.background = '#2B2B2B'
                  }
                }}
                onMouseLeave={(e) => {
                  if (company.state !== 'Not Active') {
                    e.currentTarget.style.background = '#222222'
                  }
                }}
                onClick={() => updateCompanyState(company.id, 'Not Active')}
              >
                <div
                  style={{
                    width: '12px',
                    height: '12px',
                    background: '#8E1F00',
                    borderRadius: '4px'
                  }}
                />
                <span
                  style={{
                    fontFamily: 'SF Pro',
                    fontStyle: 'normal',
                    fontWeight: 510,
                    fontSize: '12px',
                    lineHeight: '16px',
                    letterSpacing: '0.005em',
                    color: '#FFFFFF'
                  }}
                >
                  Not Active
                </span>
              </div>
              
              {/* Pending Option */}
              <div
                className="flex flex-row items-center"
                style={{
                  width: '100%',
                  height: '32px',
                  padding: '6px 8px',
                  gap: '8px',
                  background: company.state === 'Pending' ? '#2B2B2B' : '#222222',
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  if (company.state !== 'Pending') {
                    e.currentTarget.style.background = '#2B2B2B'
                  }
                }}
                onMouseLeave={(e) => {
                  if (company.state !== 'Pending') {
                    e.currentTarget.style.background = '#222222'
                  }
                }}
                onClick={() => updateCompanyState(company.id, 'Pending')}
              >
                <div
                  style={{
                    width: '12px',
                    height: '12px',
                    background: '#DC6300',
                    borderRadius: '4px'
                  }}
                />
                <span
                  style={{
                    fontFamily: 'SF Pro',
                    fontStyle: 'normal',
                    fontWeight: 510,
                    fontSize: '12px',
                    lineHeight: '16px',
                    letterSpacing: '0.005em',
                    color: '#FFFFFF'
                  }}
                >
                  Pending
                </span>
              </div>
              </div>
            </>,
            document.body
          )}
        </div>
      </div>

      {/* Total Amount Column */}
      <div className="flex flex-col items-start flex-shrink-0" style={{ width: '120px', zIndex: 1 }}>
        <div
          className="flex flex-row items-center flex-shrink-0"
          style={{
            width: '120px',
            height: '30px',
            padding: '8px 12px',
            gap: '6px',
            borderBottom: '1px solid #2B2B2B'
          }}
        >
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
            {company.totalAmount}
          </span>
        </div>
      </div>

      {/* Address Column */}
      <div className="flex flex-col items-start flex-shrink-0" style={{ width: '160px', zIndex: 1 }}>
        <div
          className="flex flex-row items-center flex-shrink-0"
          style={{
            width: '160px',
            height: '30px',
            padding: '8px 12px',
            gap: '6px',
            borderBottom: '1px solid #2B2B2B'
          }}
        >
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
            {company.address}
          </span>
        </div>
      </div>

      {/* Email Column */}
      <div className="flex flex-col items-start flex-shrink-0" style={{ width: '140px', zIndex: 1 }}>
        <div
          className="flex flex-row items-center flex-shrink-0"
          style={{
            width: '140px',
            height: '30px',
            padding: '8px 12px',
            gap: '6px',
            borderBottom: '1px solid #2B2B2B'
          }}
        >
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
            {company.email}
          </span>
        </div>
      </div>

      {/* Created At Column */}
      <div className="flex flex-col items-start flex-shrink-0" style={{ width: '100px', zIndex: 1 }}>
        <div
          className="flex flex-row items-center flex-shrink-0"
          style={{
            width: '100px',
            height: '30px',
            padding: '8px 12px',
            gap: '6px',
            borderBottom: '1px solid #2B2B2B'
          }}
        >
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
            {company.createdAt}
          </span>
        </div>
      </div>

      {/* Last Update Column */}
      <div className="flex flex-col items-start flex-shrink-0" style={{ width: '100px', zIndex: 1 }}>
        <div
          className="flex flex-row items-center flex-shrink-0"
          style={{
            width: '100px',
            height: '30px',
            padding: '8px 12px',
            gap: '6px',
            borderBottom: '1px solid #2B2B2B'
          }}
        >
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
            {company.lastUpdate}
          </span>
        </div>
      </div>

      {/* Content Column */}
      <div className="flex flex-col items-start flex-shrink-0" style={{ width: '140px', zIndex: 1 }}>
        <div
          className="flex flex-row items-center flex-shrink-0"
          style={{
            width: '140px',
            height: '30px',
            padding: '8px 12px',
            gap: '6px',
            borderBottom: '1px solid #2B2B2B'
          }}
        >
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
            {company.content}
          </span>
        </div>
      </div>

      {/* Actions Column */}
      <div className="flex flex-col items-start flex-shrink-0" style={{ width: '80px', zIndex: 2 }}>
        <div
          className="flex flex-row items-center justify-center flex-shrink-0"
          style={{
            width: '80px',
            height: '30px',
            padding: '12px 20px',
            gap: '10px',
            borderBottom: '1px solid #2B2B2B',
            position: 'relative'
          }}
        >
          <button
            ref={actionButtonRef}
            onClick={(e) => {
              e.stopPropagation()
              setOpenActionMenu(openActionMenu === company.id ? null : company.id)
            }}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: '4px'
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="8" cy="4" r="1.5" fill="#999999"/>
              <circle cx="8" cy="8" r="1.5" fill="#999999"/>
              <circle cx="8" cy="12" r="1.5" fill="#999999"/>
            </svg>
          </button>
          {openActionMenu === company.id && actionMenuPosition && mounted && createPortal(
            <>
              <div
                style={{
                  position: 'fixed',
                  top: `${actionMenuPosition.top - 2}px`,
                  right: `${actionMenuPosition.right - 2}px`,
                  width: '204px',
                  height: '144px',
                  background: '#000000',
                  borderRadius: '12px',
                  zIndex: 999998,
                  opacity: 0.98
                }}
              />
              <div
                ref={actionMenuRef}
                onClick={(e) => e.stopPropagation()}
                className="flex flex-col items-start"
                style={{
                  position: 'fixed',
                  top: `${actionMenuPosition.top}px`,
                  right: `${actionMenuPosition.right}px`,
                  width: '200px',
                  height: '140px',
                  background: '#000000',
                  border: '1px solid #3B3B3B',
                  boxShadow: '0px 12px 48px rgba(0, 0, 0, 1), 0px 6px 24px rgba(0, 0, 0, 1), inset 0px 0px 0px 1px rgba(255, 255, 255, 0.05)',
                  borderRadius: '10px',
                  padding: '10px',
                  gap: '4px',
                  zIndex: 999999,
                  opacity: 1
                }}
              >
              {/* Search Input */}
              <div
                className="flex flex-row items-center"
                style={{
                  width: '180px',
                  height: '24px',
                  padding: '4px',
                  gap: '4px',
                  background: '#222222',
                  border: '1px solid #009679',
                  boxShadow: '0px 0px 2px rgba(54, 186, 122, 0.5)',
                  borderRadius: '7px'
                }}
              >
                <input
                  type="text"
                  placeholder="Search..."
                  style={{
                    width: '100%',
                    height: '16px',
                    background: 'transparent',
                    border: 'none',
                    outline: 'none',
                    fontFamily: 'SF Pro',
                    fontStyle: 'normal',
                    fontWeight: 510,
                    fontSize: '12px',
                    lineHeight: '16px',
                    letterSpacing: '0.005em',
                    color: '#999999'
                  }}
                />
              </div>
              
              {/* Divider */}
              <div
                style={{
                  width: '180px',
                  height: '0px',
                  border: '1px solid #2B2B2B',
                  margin: '4px 0px'
                }}
              />
              
              {/* View Option */}
              <div
                className="flex flex-row items-center"
                style={{
                  width: '180px',
                  height: '24px',
                  padding: '4px',
                  gap: '4px',
                  background: '#222222',
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#2B2B2B'}
                onMouseLeave={(e) => e.currentTarget.style.background = '#222222'}
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5.99996 8.16496C4.80496 8.16496 3.83496 7.19496 3.83496 5.99996C3.83496 4.80496 4.80496 3.83496 5.99996 3.83496C7.19496 3.83496 8.16496 4.80496 8.16496 5.99996C8.16496 7.19496 7.19496 8.16496 5.99996 8.16496ZM5.99996 4.58496C5.21996 4.58496 4.58496 5.21996 4.58496 5.99996C4.58496 6.77996 5.21996 7.41496 5.99996 7.41496C6.77996 7.41496 7.41496 6.77996 7.41496 5.99996C7.41496 5.21996 6.77996 4.58496 5.99996 4.58496Z" fill="#999999"/>
                  <path d="M6.00004 10.51C4.12004 10.51 2.34504 9.40999 1.12504 7.49999C0.595039 6.67499 0.595039 5.32999 1.12504 4.49999C2.35004 2.58999 4.12504 1.48999 6.00004 1.48999C7.87504 1.48999 9.65004 2.58999 10.87 4.49999C11.4 5.32499 11.4 6.66999 10.87 7.49999C9.65004 9.40999 7.87504 10.51 6.00004 10.51ZM6.00004 2.23999C4.38504 2.23999 2.84004 3.20999 1.76004 4.90499C1.38504 5.48999 1.38504 6.50999 1.76004 7.09499C2.84004 8.78999 4.38504 9.75999 6.00004 9.75999C7.61504 9.75999 9.16004 8.78999 10.24 7.09499C10.615 6.50999 10.615 5.48999 10.24 4.90499C9.16004 3.20999 7.61504 2.23999 6.00004 2.23999Z" fill="#999999"/>
                </svg>
                <span
                  style={{
                    width: '29px',
                    height: '16px',
                    fontFamily: 'SF Pro',
                    fontStyle: 'normal',
                    fontWeight: 510,
                    fontSize: '12px',
                    lineHeight: '16px',
                    letterSpacing: '0.005em',
                    color: 'rgba(255, 255, 255, 1)'
                  }}
                >
                  View
                </span>
              </div>
              
              {/* Edit Option */}
              <div
                className="flex flex-row items-center"
                style={{
                  width: '180px',
                  height: '24px',
                  padding: '4px',
                  gap: '4px',
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#222222'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#clip0_188_33303)">
                    <path d="M2.76999 9.76003C2.46499 9.76003 2.17999 9.65502 1.97499 9.46002C1.71499 9.21502 1.58999 8.84502 1.63499 8.44502L1.81999 6.82502C1.85499 6.52002 2.03999 6.11502 2.25499 5.89502L6.35999 1.55002C7.38499 0.465024 8.45499 0.435025 9.53999 1.46002C10.625 2.48502 10.655 3.55502 9.62999 4.64002L5.52499 8.98502C5.31499 9.21002 4.92499 9.42002 4.61999 9.47003L3.00999 9.74502C2.92499 9.75002 2.84999 9.76003 2.76999 9.76003ZM7.96499 1.45502C7.57999 1.45502 7.24499 1.69502 6.90499 2.05502L2.79999 6.40503C2.69999 6.51003 2.58499 6.76003 2.56499 6.90503L2.37999 8.52502C2.35999 8.69002 2.39999 8.82502 2.48999 8.91002C2.57999 8.99502 2.71499 9.02502 2.87999 9.00002L4.48999 8.72503C4.63499 8.70003 4.87499 8.57002 4.97499 8.46502L9.07999 4.12002C9.69999 3.46002 9.92499 2.85002 9.01999 2.00002C8.61999 1.61502 8.27499 1.45502 7.96499 1.45502Z" fill="#999999"/>
                    <path d="M8.66997 5.47505C8.65997 5.47505 8.64497 5.47505 8.63497 5.47505C7.07497 5.32005 5.81997 4.13505 5.57997 2.58505C5.54997 2.38005 5.68997 2.19005 5.89497 2.15505C6.09997 2.12505 6.28997 2.26505 6.32497 2.47005C6.51497 3.68005 7.49497 4.61005 8.71497 4.73005C8.91997 4.75005 9.06997 4.93505 9.04997 5.14005C9.02497 5.33005 8.85997 5.47505 8.66997 5.47505Z" fill="#999999"/>
                  </g>
                  <defs>
                    <clipPath id="clip0_188_33303">
                      <rect width="12" height="12" fill="white"/>
                    </clipPath>
                  </defs>
                </svg>
                <span
                  style={{
                    width: '23px',
                    height: '16px',
                    fontFamily: 'SF Pro',
                    fontStyle: 'normal',
                    fontWeight: 510,
                    fontSize: '12px',
                    lineHeight: '16px',
                    letterSpacing: '0.005em',
                    color: 'rgba(255, 255, 255, 1)'
                  }}
                >
                  Edit
                </span>
              </div>
              
              {/* Delete Option */}
              <div
                className="flex flex-row items-center"
                style={{
                  width: '180px',
                  height: '24px',
                  padding: '4px',
                  gap: '4px',
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#222222'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.5 3.36499C10.49 3.36499 10.475 3.36499 10.46 3.36499C7.81496 3.09999 5.17496 2.99999 2.55996 3.26499L1.53996 3.36499C1.32996 3.38499 1.14496 3.23499 1.12496 3.02499C1.10496 2.81499 1.25496 2.63499 1.45996 2.61499L2.47996 2.51499C5.13996 2.24499 7.83496 2.34999 10.535 2.61499C10.74 2.63499 10.89 2.81999 10.87 3.02499C10.855 3.21999 10.69 3.36499 10.5 3.36499Z" fill="#999999"/>
                  <path d="M4.25 2.86C4.23 2.86 4.21 2.86 4.185 2.855C3.985 2.82 3.845 2.625 3.88 2.425L3.99 1.77C4.07 1.29 4.18 0.625 5.345 0.625H6.655C7.825 0.625 7.935 1.315 8.01 1.775L8.12 2.425C8.155 2.63 8.015 2.825 7.815 2.855C7.61 2.89 7.415 2.75 7.385 2.55L7.275 1.9C7.205 1.465 7.19 1.38 6.66 1.38H5.35C4.82 1.38 4.81 1.45 4.735 1.895L4.62 2.545C4.59 2.73 4.43 2.86 4.25 2.86Z" fill="#999999"/>
                  <path d="M7.60495 11.375H4.39495C2.64995 11.375 2.57995 10.41 2.52495 9.63004L2.19995 4.59504C2.18495 4.39004 2.34495 4.21004 2.54995 4.19504C2.75995 4.18504 2.93495 4.34004 2.94995 4.54504L3.27495 9.58004C3.32995 10.34 3.34995 10.625 4.39495 10.625H7.60495C8.65495 10.625 8.67495 10.34 8.72495 9.58004L9.04995 4.54504C9.06495 4.34004 9.24495 4.18504 9.44995 4.19504C9.65495 4.21004 9.81495 4.38504 9.79995 4.59504L9.47495 9.63004C9.41995 10.41 9.34995 11.375 7.60495 11.375Z" fill="#999999"/>
                  <path d="M6.83004 8.625H5.16504C4.96004 8.625 4.79004 8.455 4.79004 8.25C4.79004 8.045 4.96004 7.875 5.16504 7.875H6.83004C7.03504 7.875 7.20504 8.045 7.20504 8.25C7.20504 8.455 7.03504 8.625 6.83004 8.625Z" fill="#999999"/>
                  <path d="M7.25 6.625H4.75C4.545 6.625 4.375 6.455 4.375 6.25C4.375 6.045 4.545 5.875 4.75 5.875H7.25C7.455 5.875 7.625 6.045 7.625 6.25C7.625 6.455 7.455 6.625 7.25 6.625Z" fill="#999999"/>
                </svg>
                <span
                  style={{
                    width: '38px',
                    height: '16px',
                    fontFamily: 'SF Pro',
                    fontStyle: 'normal',
                    fontWeight: 510,
                    fontSize: '12px',
                    lineHeight: '16px',
                    letterSpacing: '0.005em',
                    color: 'rgba(255, 255, 255, 1)'
                  }}
                >
                  Delete
                </span>
              </div>
              </div>
            </>,
            document.body
          )}
        </div>
      </div>
    </div>
  )
}

