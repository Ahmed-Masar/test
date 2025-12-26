'use client'

import { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
} from 'cmdk'
import {
  LayoutDashboard,
  Building2,
  Users,
  Loader2,
  MapPin,
  Mail,
} from 'lucide-react'
import * as VisuallyHidden from '@radix-ui/react-visually-hidden'
import * as Dialog from '@radix-ui/react-dialog'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

interface Company {
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

interface SortableRowProps {
  company: Company
  openStateMenu: number | null
  openActionMenu: number | null
  setOpenStateMenu: (id: number | null) => void
  setOpenActionMenu: (id: number | null) => void
  updateCompanyState: (companyId: number, newState: 'Active' | 'Not Active' | 'Pending') => void
}

function SortableRow({ company, openStateMenu, openActionMenu, setOpenStateMenu, setOpenActionMenu, updateCompanyState }: SortableRowProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: company.id })

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
      <div className="flex flex-col items-start flex-shrink-0" style={{ width: 'auto', minWidth: '100px', zIndex: 1 }}>
        <div
          className="flex flex-row items-center flex-shrink-0"
          style={{
            width: '100%',
            height: '30px',
            padding: '8px 12px',
            gap: '6px',
            borderBottom: '1px solid #2B2B2B',
            position: 'relative'
          }}
        >
          <button
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
          {openStateMenu === company.id && (
            <div
              onClick={(e) => e.stopPropagation()}
              className="flex flex-col items-start"
              style={{
                position: 'absolute',
                top: '100%',
                left: '12px',
                width: '150px',
                background: '#191919',
                border: '1px solid #2B2B2B',
                boxShadow: '0px 5px 20px rgba(0, 0, 0, 0.7)',
                borderRadius: '10px',
                padding: '8px',
                gap: '4px',
                zIndex: 1000,
                marginTop: '4px'
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
          {openActionMenu === company.id && (
            <div
              onClick={(e) => e.stopPropagation()}
              className="flex flex-col items-start"
              style={{
                position: 'absolute',
                top: '100%',
                right: '0px',
                width: '200px',
                height: '140px',
                background: '#191919',
                border: '1px solid #2B2B2B',
                boxShadow: '0px 5px 20px rgba(0, 0, 0, 0.7)',
                borderRadius: '10px',
                padding: '10px',
                gap: '4px',
                zIndex: 1000
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
                    color: '#999999'
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
                    color: '#999999'
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
                    color: '#999999'
                  }}
                >
                  Delete
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function Dashboard() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [openActionMenu, setOpenActionMenu] = useState<number | null>(null)
  const [openStateMenu, setOpenStateMenu] = useState<number | null>(null)
  const [open, setOpen] = useState(false)
  const [commandSearchQuery, setCommandSearchQuery] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [canGoForward, setCanGoForward] = useState(false)
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (openActionMenu !== null) {
        setOpenActionMenu(null)
      }
      if (openStateMenu !== null) {
        setOpenStateMenu(null)
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

    // Use sessionStorage to track if we've navigated back
    const checkCanGoForward = () => {
      // Check if there's a forward entry by trying to detect if we're not at the end of history
      // We'll use a simple approach: track navigation in sessionStorage
      const navState = sessionStorage.getItem('navState')
      if (navState === 'back') {
        setCanGoForward(true)
      } else {
        setCanGoForward(false)
      }
    }

    const handlePopState = () => {
      // When popstate fires, we might have navigated back or forward
      // Set state to indicate we might be able to go forward
      sessionStorage.setItem('navState', 'back')
      setCanGoForward(true)
    }

    // Listen to popstate events (back/forward navigation)
    window.addEventListener('popstate', handlePopState)
    
    // Check initial state
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
      // After going forward, check if we've reached the end of forward history
      // The popstate event will handle updating the state, but we also check here
      setTimeout(() => {
        // If we're at the end of forward navigation, disable the button
        // This is a heuristic - we assume if we've gone forward, we might be at the end
        // The popstate handler will update this more accurately
        const navState = sessionStorage.getItem('navState')
        // If navState is cleared or we're at a new page, we can't go forward anymore
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

  // Handle drag end
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
  }, [commandSearchQuery])

  const hasResults = searchResults.companies.length > 0

  // Handle navigation
  const handleSelect = (path: string) => {
    setOpen(false)
    // Reset forward capability when navigating to a new page
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('navState')
      setCanGoForward(false)
    }
    router.push(path)
  }

  // Handle company selection
  const handleSelectCompany = (companyId: number) => {
    setOpen(false)
    // You can navigate to company detail page or perform other actions
    console.log('Selected company:', companyId)
  }

  // Get state badge color
  const getStateBadgeColor = (state: string) => {
    switch (state) {
      case 'Active':
        return 'rgba(34, 197, 94, 0.15)'
      case 'Not Active':
        return 'rgba(239, 68, 68, 0.15)'
      case 'Pending':
        return 'rgba(251, 191, 36, 0.15)'
      default:
        return 'rgba(255, 255, 255, 0.06)'
    }
  }

  const getStateTextColor = (state: string) => {
    switch (state) {
      case 'Active':
        return '#22c55e'
      case 'Not Active':
        return '#ef4444'
      case 'Pending':
        return '#fbbf24'
      default:
        return 'rgba(255, 255, 255, 0.6)'
    }
  }

  // Keyboard shortcut to open command dialog (Command+K / Ctrl+K)
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      // Check for Command+K (Mac) or Ctrl+K (Windows/Linux)
      if ((e.key === 'k' || e.key === 'K') && (e.metaKey || e.ctrlKey)) {
        // Prevent default browser behavior
        e.preventDefault()
        e.stopPropagation()
        // Toggle dialog
        setOpen((open) => !open)
      }
      // Also close dialog with Escape key
      if (e.key === 'Escape' && open) {
        e.preventDefault()
        setOpen(false)
      }
    }
    
    document.addEventListener('keydown', down, true)
    return () => document.removeEventListener('keydown', down, true)
  }, [open])

  return (
    <div 
      className="flex flex-col h-screen w-screen overflow-hidden"
      style={{
        paddingTop: '33px',
        background: 'linear-gradient(180deg, #141414 0%, #0E0E0E 100%)'
      }}
    >
      {/* Top Navigation Bar */}
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
        <div className="flex flex-row items-center" style={{ width: '128px', height: '24px', gap: '12px' }}>
          <div
            className="flex flex-row items-center"
            style={{
              width: '128px',
              height: '24px',
              padding: '3px 6px',
              gap: '4px',
              background: '#222222',
              borderRadius: '8px'
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
                transform: 'rotate(90deg)',
                alignSelf: 'center',
                flexShrink: 0
              }}
            >
              <path d="M2 2L6 6L2 10" stroke="#999999" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Navigation Controls - Centered */}
        <div className="flex flex-row items-center justify-center flex-shrink-0" style={{ minWidth: '324px', height: '24px', gap: '12px' }}>
          {/* Back/Forward Buttons */}
          <div className="flex flex-row items-center" style={{ width: '48px', height: '24px', gap: '0px' }}>
            <div
              className="flex flex-row items-center cursor-pointer hover:bg-gray-100 transition-colors"
              onClick={handleBackClick}
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
              onClick={handleForwardClick}
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
            onClick={() => setOpen(true)}
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
              className="flex flex-row items-center"
              style={{
                width: '24px',
                height: '24px',
                padding: '3px 6px',
                gap: '4px',
                background: '#222222',
                borderRadius: '8px'
              }}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.44495 1.725H4.55495C4.35495 1.725 4.19495 1.565 4.19495 1.365C4.19495 1.165 4.35495 1 4.55495 1H7.44495C7.64495 1 7.80495 1.16 7.80495 1.36C7.80495 1.56 7.64495 1.725 7.44495 1.725Z" fill="#999999"/>
                <path d="M7.00004 9.98495V8.51495C7.00004 7.60995 7.61004 6.99995 8.51504 6.99995H9.98504C10.1 6.99995 10.21 7.00995 10.315 7.02995C10.325 6.90995 10.335 6.78995 10.335 6.66495C10.335 4.26995 8.39004 2.32495 6.00004 2.32495C3.61004 2.32495 1.66504 4.26995 1.66504 6.66495C1.66504 9.05495 3.61004 11 6.00004 11C6.42504 11 6.83004 10.93 7.22004 10.82C7.08004 10.585 7.00004 10.305 7.00004 9.98495ZM6.37504 6.49995C6.37504 6.70495 6.20504 6.87495 6.00004 6.87495C5.79504 6.87495 5.62504 6.70495 5.62504 6.49995V3.99995C5.62504 3.79495 5.79504 3.62495 6.00004 3.62495C6.20504 3.62495 6.37504 3.79495 6.37504 3.99995V6.49995Z" fill="#999999"/>
                <path d="M9.985 7.5H8.52C7.88 7.5 7.5 7.88 7.5 8.515V9.985C7.5 10.62 7.88 11 8.52 11H9.985C10.62 11 11 10.62 11 9.985V8.515C11 7.88 10.62 7.5 9.985 7.5ZM8.96 10.03C8.96 10.19 8.83 10.32 8.665 10.32C8.505 10.32 8.375 10.19 8.375 10.03V8.47C8.375 8.31 8.505 8.18 8.665 8.18C8.83 8.18 8.96 8.31 8.96 8.47V10.03ZM10.125 10.03C10.125 10.19 9.995 10.32 9.835 10.32C9.675 10.32 9.54 10.19 9.54 10.03V8.47C9.54 8.31 9.675 8.18 9.835 8.18C9.995 8.18 10.125 8.31 10.125 8.47V10.03Z" fill="#999999"/>
              </svg>
            </div>

            {/* User Avatar */}
            <div className="flex flex-row items-center" style={{ width: '34px', height: '24px', gap: '2px', position: 'relative' }}>
              <div
                className="flex flex-col justify-center items-center"
                style={{
                  width: '24px',
                  height: '24px',
                  padding: '3.6px 2.4px',
                  gap: '12px',
                  background: '#5842C8',
                  borderRadius: '12.6px',
                  position: 'relative'
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
              <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: 'rotate(90deg)' }}>
                <path d="M2 2L4 4L2 6" stroke="#999999" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
      </div>

      {/* Main Content Area */}
      <div
        className="flex flex-row flex-1 overflow-hidden"
        style={{
          padding: '0px 8px 8px',
          gap: '0px'
        }}
      >
        {/* Sidebar */}
      <div 
        className="flex flex-row h-full"
        style={{
          width: '259px',
          minWidth: '259px',
          gap: '4px'
        }}
      >
        {/* Mini Sidebar */}
        <div
          className="flex flex-col items-center h-full"
          style={{
            width: '46px',
            minWidth: '46px',
            padding: '23px 8px',
            gap: '23px',
            background: 'linear-gradient(180deg, #0D3F34 0%, #101E1B 100%)',
            borderRadius: '8px'
          }}
        >
          <div className="flex flex-col items-center" style={{ width: '42px', height: '220px', gap: '12px' }}>
            {/* Sales */}
            <div className="flex flex-col items-start" style={{ width: '28px', height: '46px', gap: '2px' }}>
              <div
                className="flex flex-row justify-center items-center"
                style={{
                  width: '28px',
                  height: '28px',
                  padding: '3.5px 7px',
                  gap: '4.67px',
                  background: '#FFFFFF',
                  borderRadius: '9.33333px'
                }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7.16667 3.09336L4.21333 1.63336C2.62 0.853363 1.31333 1.6467 1.31333 3.39336V13.2867C1.31333 14.0467 1.94667 14.6667 2.72 14.6667H7.66667C8.03333 14.6667 8.33333 14.3667 8.33333 14V4.94003C8.33333 4.24003 7.80667 3.4067 7.16667 3.09336ZM5.98 9.1667H3.66667C3.39333 9.1667 3.16667 8.94003 3.16667 8.6667C3.16667 8.39336 3.39333 8.1667 3.66667 8.1667H5.98C6.25333 8.1667 6.48 8.39336 6.48 8.6667C6.48 8.94003 6.26 9.1667 5.98 9.1667ZM5.98 6.50003H3.66667C3.39333 6.50003 3.16667 6.27336 3.16667 6.00003C3.16667 5.7267 3.39333 5.50003 3.66667 5.50003H5.98C6.25333 5.50003 6.48 5.7267 6.48 6.00003C6.48 6.27336 6.26 6.50003 5.98 6.50003Z" fill="#0C2D25"/>
                  <path d="M14.6667 12.0266V12.9999C14.6667 13.9199 13.92 14.6666 13 14.6666H9.98C9.62 14.6666 9.33333 14.3799 9.33333 14.0199V12.5799C10.0467 12.6666 10.8 12.4599 11.34 12.0266C11.7933 12.3933 12.3733 12.6133 13.0067 12.6133C13.6267 12.6133 14.2067 12.3933 14.6667 12.0266Z" fill="#0C2D25"/>
                  <path d="M14.6667 10.0334V10.0401C14.6133 10.9134 13.9 11.6134 13.0067 11.6134C12.08 11.6134 11.34 10.8601 11.34 9.94672C11.34 10.9667 10.4 11.7867 9.33333 11.5801V8.00006C9.33333 7.57339 9.72667 7.25339 10.1467 7.34672L11.34 7.61339L11.66 7.68672L13.02 7.99339C13.3467 8.06006 13.6467 8.17339 13.9067 8.34006C13.9067 8.34672 13.9133 8.34672 13.9133 8.34672C13.98 8.39339 14.0467 8.44672 14.1067 8.50672C14.4133 8.81339 14.6133 9.26006 14.66 9.91339C14.66 9.95339 14.6667 9.99339 14.6667 10.0334Z" fill="#0C2D25"/>
                </svg>
              </div>
              <span
                style={{
                  width: '28px',
                  height: '16px',
                  fontFamily: 'SF Pro',
                  fontStyle: 'normal',
                  fontWeight: 400,
                  fontSize: '10px',
                  lineHeight: '16px',
                  textAlign: 'center',
                  letterSpacing: '0.005em',
                  color: '#FFFFFF'
                }}
              >
                Sales
              </span>
            </div>

            {/* Finance */}
            <div className="flex flex-col items-start" style={{ width: '37px', height: '46px', gap: '2px' }}>
              <div
                className="flex flex-row justify-center items-center"
                style={{
                  width: '37px',
                  height: '28px',
                  padding: '3.5px 7px',
                  gap: '4.67px',
                  borderRadius: '9.33333px'
                }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14.3 9.09334V9.76001C14.3 9.94001 14.16 10.0867 13.9733 10.0933H13C12.6467 10.0933 12.3267 9.83334 12.3 9.48668C12.28 9.28001 12.36 9.08668 12.4933 8.95334C12.6133 8.82668 12.78 8.76001 12.96 8.76001H13.9667C14.16 8.76668 14.3 8.91334 14.3 9.09334Z" fill="rgba(255, 255, 255, 0.8)"/>
                  <path d="M11.9933 8.46005C11.66 8.78672 11.5 9.27338 11.6333 9.78005C11.8067 10.4001 12.4133 10.7934 13.0533 10.7934H13.6333C14 10.7934 14.3 11.0934 14.3 11.4601V11.5867C14.3 12.9667 13.1733 14.0934 11.7933 14.0934H4.14C2.76 14.0934 1.63333 12.9667 1.63333 11.5867V7.10005C1.63333 6.28005 2.02667 5.55338 2.63333 5.10005C3.05333 4.78005 3.57333 4.59338 4.14 4.59338H11.7933C13.1733 4.59338 14.3 5.72005 14.3 7.10005V7.39338C14.3 7.76005 14 8.06005 13.6333 8.06005H12.9533C12.58 8.06005 12.24 8.20672 11.9933 8.46005Z" fill="rgba(255, 255, 255, 0.8)"/>
                  <path d="M10.8 3.21337C10.98 3.39337 10.8267 3.67337 10.5733 3.67337L5.45333 3.66671C5.16 3.66671 5.00667 3.30671 5.22 3.10004L6.3 2.01337C7.21333 1.10671 8.69333 1.10671 9.60667 2.01337L10.7733 3.19337C10.78 3.20004 10.7933 3.20671 10.8 3.21337Z" fill="rgba(255, 255, 255, 0.8)"/>
                </svg>
              </div>
              <span
                style={{
                  width: '37px',
                  height: '16px',
                  fontFamily: 'SF Pro',
                  fontStyle: 'normal',
                  fontWeight: 400,
                  fontSize: '10px',
                  lineHeight: '16px',
                  textAlign: 'center',
                  letterSpacing: '0.005em',
                  color: 'rgba(255, 255, 255, 0.8)'
                }}
              >
                Finance
              </span>
            </div>

            {/* Contract */}
            <div className="flex flex-col items-start" style={{ width: '42px', height: '46px', gap: '2px' }}>
              <div
                className="flex flex-row justify-center items-center"
                style={{
                  width: '42px',
                  height: '28px',
                  padding: '3.5px 7px',
                  gap: '4.67px',
                  borderRadius: '9.33333px'
                }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.56667 1.33337H6.43333C5.74 1.33337 5.17333 1.89337 5.17333 2.58671V3.21337C5.17333 3.90671 5.73333 4.46671 6.42667 4.46671H9.56667C10.26 4.46671 10.82 3.90671 10.82 3.21337V2.58671C10.8267 1.89337 10.26 1.33337 9.56667 1.33337Z" fill="rgba(255, 255, 255, 0.8)"/>
                  <path d="M11.4933 3.21332C11.4933 4.27332 10.6267 5.13999 9.56667 5.13999H6.43333C5.37333 5.13999 4.50667 4.27332 4.50667 3.21332C4.50667 2.83999 4.10667 2.60665 3.77333 2.77999C2.83333 3.27999 2.19333 4.27332 2.19333 5.41332V11.6867C2.19333 13.3267 3.53333 14.6667 5.17333 14.6667H10.8267C12.4667 14.6667 13.8067 13.3267 13.8067 11.6867V5.41332C13.8067 4.27332 13.1667 3.27999 12.2267 2.77999C11.8933 2.60665 11.4933 2.83999 11.4933 3.21332ZM8.25333 11.3H5.33333C5.06 11.3 4.83333 11.0733 4.83333 10.8C4.83333 10.5267 5.06 10.3 5.33333 10.3H8.25333C8.52667 10.3 8.75333 10.5267 8.75333 10.8C8.75333 11.0733 8.52667 11.3 8.25333 11.3ZM10 8.63332H5.33333C5.06 8.63332 4.83333 8.40665 4.83333 8.13332C4.83333 7.85999 5.06 7.63332 5.33333 7.63332H10C10.2733 7.63332 10.5 7.85999 10.5 8.13332C10.5 8.40665 10.2733 8.63332 10 8.63332Z" fill="rgba(255, 255, 255, 0.8)"/>
                </svg>
              </div>
              <span
                style={{
                  width: '42px',
                  height: '16px',
                  fontFamily: 'SF Pro',
                  fontStyle: 'normal',
                  fontWeight: 400,
                  fontSize: '10px',
                  lineHeight: '16px',
                  textAlign: 'center',
                  letterSpacing: '0.005em',
                  color: 'rgba(255, 255, 255, 0.8)'
                }}
              >
                Contract
              </span>
            </div>

            {/* Team */}
            <div className="flex flex-col items-start" style={{ width: '28px', height: '46px', gap: '2px' }}>
              <div
                className="flex flex-row justify-center items-center"
                style={{
                  width: '28px',
                  height: '28px',
                  padding: '3.5px 7px',
                  gap: '4.67px',
                  borderRadius: '9.33333px'
                }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 1.33337C4.25333 1.33337 2.83333 2.75337 2.83333 4.50004C2.83333 6.21337 4.17333 7.60004 5.92 7.66004C5.97333 7.65337 6.02667 7.65337 6.06667 7.66004C6.08 7.66004 6.08667 7.66004 6.1 7.66004C6.10667 7.66004 6.10667 7.66004 6.11333 7.66004C7.82 7.60004 9.16 6.21337 9.16667 4.50004C9.16667 2.75337 7.74667 1.33337 6 1.33337Z" fill="rgba(255, 255, 255, 0.8)"/>
                  <path d="M9.38667 9.4333C7.52667 8.1933 4.49333 8.1933 2.62 9.4333C1.77333 9.99996 1.30667 10.7666 1.30667 11.5866C1.30667 12.4066 1.77333 13.1666 2.61333 13.7266C3.54667 14.3533 4.77333 14.6666 6 14.6666C7.22667 14.6666 8.45333 14.3533 9.38667 13.7266C10.2267 13.16 10.6933 12.4 10.6933 11.5733C10.6867 10.7533 10.2267 9.9933 9.38667 9.4333Z" fill="rgba(255, 255, 255, 0.8)"/>
                  <path d="M13.3267 4.89332C13.4333 6.18665 12.5133 7.31998 11.24 7.47332C11.2333 7.47332 11.2333 7.47332 11.2267 7.47332H11.2067C11.1667 7.47332 11.1267 7.47332 11.0933 7.48665C10.4467 7.51998 9.85333 7.31332 9.40667 6.93332C10.0933 6.31998 10.4867 5.39998 10.4067 4.39998C10.36 3.85998 10.1733 3.36665 9.89333 2.94665C10.1467 2.81999 10.44 2.73999 10.74 2.71332C12.0467 2.59999 13.2133 3.57332 13.3267 4.89332Z" fill="rgba(255, 255, 255, 0.8)"/>
                  <path d="M14.66 11.0601C14.6067 11.7067 14.1933 12.2667 13.5 12.6467C12.8333 13.0134 11.9933 13.1867 11.16 13.1667C11.64 12.7334 11.92 12.1934 11.9733 11.6201C12.04 10.7934 11.6467 10.0001 10.86 9.36673C10.4133 9.01339 9.89333 8.73339 9.32667 8.52673C10.8 8.10006 12.6533 8.38673 13.7933 9.30673C14.4067 9.80006 14.72 10.4201 14.66 11.0601Z" fill="rgba(255, 255, 255, 0.8)"/>
                </svg>
              </div>
              <span
                style={{
                  width: '28px',
                  height: '16px',
                  fontFamily: 'SF Pro',
                  fontStyle: 'normal',
                  fontWeight: 400,
                  fontSize: '10px',
                  lineHeight: '16px',
                  textAlign: 'center',
                  letterSpacing: '0.005em',
                  color: 'rgba(255, 255, 255, 0.8)'
                }}
              >
                Team
              </span>
            </div>
          </div>
        </div>

        {/* Detailed Sidebar */}
        <div
          className="flex flex-col items-center h-full"
          style={{
            width: '211px',
            minWidth: '211px',
            padding: '12px',
            gap: '154px',
            background: '#191919',
            border: '1px solid #2A2A2A',
            borderRadius: '8px 0px 0px 8px'
          }}
        >
          <div className="flex flex-col items-start" style={{ width: '187px', height: '78px', gap: '8px' }}>
            <div className="flex flex-col items-start" style={{ width: '187px', height: '16px', gap: '8px' }}>
              <div className="flex flex-row justify-center items-center" style={{ width: '187px', height: '16px', gap: '44px' }}>
                <span
                  style={{
                    width: '187px',
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
                  Sales
                </span>
              </div>
            </div>
            <div className="flex flex-col items-start" style={{ width: '187px', height: '54px', gap: '4px' }}>
              {/* Companies */}
              <div className="flex flex-col items-start" style={{ width: '187px', height: '25px', gap: '8px' }}>
                <div
                  className="flex flex-col justify-center items-start"
                  style={{
                    width: '187px',
                    height: '25px',
                    padding: '5px 8px',
                    gap: '10px',
                    background: '#2B2B2B',
                    borderRadius: '6px'
                  }}
                >
                  <div className="flex flex-row justify-center items-center" style={{ width: '171px', height: '16px', gap: '6px' }}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12.8333 12.3959H1.16666C0.927497 12.3959 0.729164 12.5942 0.729164 12.8334C0.729164 13.0725 0.927497 13.2709 1.16666 13.2709H12.8333C13.0725 13.2709 13.2708 13.0725 13.2708 12.8334C13.2708 12.5942 13.0725 12.3959 12.8333 12.3959Z" fill="#FFFFFF"/>
                      <path d="M9.91667 1.16663H4.08333C2.33333 1.16663 1.75 2.21079 1.75 3.49996V12.8333H12.25V3.49996C12.25 2.21079 11.6667 1.16663 9.91667 1.16663ZM5.83333 10.0625H4.08333C3.84417 10.0625 3.64583 9.86413 3.64583 9.62496C3.64583 9.38579 3.84417 9.18746 4.08333 9.18746H5.83333C6.0725 9.18746 6.27083 9.38579 6.27083 9.62496C6.27083 9.86413 6.0725 10.0625 5.83333 10.0625ZM5.83333 7.43746H4.08333C3.84417 7.43746 3.64583 7.23913 3.64583 6.99996C3.64583 6.76079 3.84417 6.56246 4.08333 6.56246H5.83333C6.0725 6.56246 6.27083 6.76079 6.27083 6.99996C6.27083 7.23913 6.0725 7.43746 5.83333 7.43746ZM5.83333 4.81246H4.08333C3.84417 4.81246 3.64583 4.61413 3.64583 4.37496C3.64583 4.13579 3.84417 3.93746 4.08333 3.93746H5.83333C6.0725 3.93746 6.27083 4.13579 6.27083 4.37496C6.27083 4.61413 6.0725 4.81246 5.83333 4.81246ZM9.91667 10.0625H8.16667C7.9275 10.0625 7.72917 9.86413 7.72917 9.62496C7.72917 9.38579 7.9275 9.18746 8.16667 9.18746H9.91667C10.1558 9.18746 10.3542 9.38579 10.3542 9.62496C10.3542 9.86413 10.1558 10.0625 9.91667 10.0625ZM9.91667 7.43746H8.16667C7.9275 7.43746 7.72917 7.23913 7.72917 6.99996C7.72917 6.76079 7.9275 6.56246 8.16667 6.56246H9.91667C10.1558 6.56246 10.3542 6.76079 10.3542 6.99996C10.3542 7.23913 10.1558 7.43746 9.91667 7.43746ZM9.91667 4.81246H8.16667C7.9275 4.81246 7.72917 4.61413 7.72917 4.37496C7.72917 4.13579 7.9275 3.93746 8.16667 3.93746H9.91667C10.1558 3.93746 10.3542 4.13579 10.3542 4.37496C10.3542 4.61413 10.1558 4.81246 9.91667 4.81246Z" fill="#FFFFFF"/>
                    </svg>
                    <span
                      style={{
                        width: '99px',
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
                      Companies
                    </span>
                    <span
                      style={{
                        width: '28px',
                        height: '15px',
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
                      300
                    </span>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: 'matrix(-1, 0, 0, 1, 0, 0)' }}>
                      <path d="M3.355 2.07002L3.39 3.96502C3.395 4.22502 3.23 4.57002 3.02 4.72502L1.78 5.66502C0.985002 6.26502 1.115 7.00002 2.065 7.30002L3.68 7.80502C3.95 7.89002 4.235 8.18502 4.305 8.46002L4.69 9.93002C4.995 11.09 5.755 11.205 6.385 10.185L7.265 8.76002C7.425 8.50002 7.805 8.30502 8.105 8.32002L9.775 8.40502C10.97 8.46502 11.31 7.77502 10.53 6.86502L9.54 5.71502C9.355 5.50002 9.27 5.10002 9.355 4.83002L9.865 3.21002C10.16 2.26002 9.63 1.73502 8.685 2.04502L7.21 2.53002C6.96 2.61002 6.585 2.55502 6.375 2.40002L4.835 1.29002C4 0.695022 3.335 1.04502 3.355 2.07002Z" fill="#FFFFFF"/>
                      <path d="M1.28 10.235L2.795 8.71996C2.94 8.57496 3.18 8.57496 3.325 8.71996C3.47 8.86496 3.47 9.10496 3.325 9.24996L1.81 10.765C1.735 10.84 1.64 10.875 1.545 10.875C1.45 10.875 1.355 10.84 1.28 10.765C1.135 10.62 1.135 10.38 1.28 10.235Z" fill="#FFFFFF"/>
                    </svg>
                  </div>
                </div>
              </div>
              {/* Clients */}
              <div className="flex flex-col items-start" style={{ width: '187px', height: '25px', gap: '8px' }}>
                <div
                  className="flex flex-col justify-center items-start"
                  style={{
                    width: '187px',
                    height: '25px',
                    padding: '5px 8px',
                    gap: '10px',
                    borderRadius: '6px'
                  }}
                >
                  <div className="flex flex-row justify-center items-center" style={{ width: '171px', height: '16px', gap: '6px' }}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7 1.16663C5.47166 1.16663 4.22916 2.40913 4.22916 3.93746C4.22916 5.43663 5.40166 6.64996 6.93 6.70246C6.97666 6.69663 7.02333 6.69663 7.05833 6.70246C7.07 6.70246 7.07583 6.70246 7.0875 6.70246C7.09333 6.70246 7.09333 6.70246 7.09916 6.70246C8.5925 6.64996 9.765 5.43663 9.77083 3.93746C9.77083 2.40913 8.52833 1.16663 7 1.16663Z" fill="#999999"/>
                      <path d="M9.96333 8.25418C8.33583 7.16918 5.68167 7.16918 4.0425 8.25418C3.30167 8.75001 2.89333 9.42085 2.89333 10.1383C2.89333 10.8558 3.30167 11.5208 4.03667 12.0108C4.85333 12.5592 5.92667 12.8333 7 12.8333C8.07333 12.8333 9.14667 12.5592 9.96333 12.0108C10.6983 11.515 11.1067 10.85 11.1067 10.1267C11.1008 9.40918 10.6983 8.74418 9.96333 8.25418Z" fill="#999999"/>
                    </svg>
                    <span
                      style={{
                        width: '117px',
                        height: '16px',
                        fontFamily: 'SF Pro',
                        fontStyle: 'normal',
                        fontWeight: 510,
                        fontSize: '12px',
                        lineHeight: '16px',
                        letterSpacing: '0.005em',
                        color: '#999999'
                      }}
                    >
                      Clients
                    </span>
                    <span
                      style={{
                        width: '28px',
                        height: '15px',
                        fontFamily: 'SF Pro',
                        fontStyle: 'normal',
                        fontWeight: 510,
                        fontSize: '12px',
                        lineHeight: '16px',
                        textAlign: 'center',
                        letterSpacing: '0.005em',
                        color: '#999999'
                      }}
                    >
                      123
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

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
          <div className="flex flex-col items-start w-full h-full overflow-hidden" style={{ gap: '16px' }}>
            {/* Statistics Cards */}
            <div className="flex flex-row items-center w-full flex-shrink-0" style={{ minHeight: '93px', gap: '8px', flexWrap: 'wrap' }}>
              {/* Total Companies */}
              <div
                className="flex flex-col justify-center items-center"
                style={{
                  minWidth: '200px',
                  height: '93px',
                  padding: '12px',
                  gap: '10px',
                  background: '#2B2B2B',
                  border: '1px solid #3D3D3D',
                  borderRadius: '12px',
                  flex: '1 1 0%'
                }}
              >
                <div className="flex flex-col items-start w-full" style={{ height: '69px', gap: '6px' }}>
                  <div className="flex flex-row justify-between items-center w-full" style={{ height: '26px' }}>
                    <div
                      className="flex flex-row justify-center items-center"
                      style={{
                        width: '26px',
                        height: '26px',
                        padding: '2px',
                        gap: '10px',
                        background: '#3D3D3D',
                        borderRadius: '4px'
                      }}
                    >
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13.4733 5.21329L8.33999 8.18663C8.13332 8.30663 7.87332 8.30663 7.65999 8.18663L2.52666 5.21329C2.15999 4.99996 2.06666 4.49996 2.34666 4.18663C2.53999 3.96663 2.75999 3.78663 2.99332 3.65996L6.60666 1.65996C7.37999 1.22663 8.63332 1.22663 9.40666 1.65996L13.02 3.65996C13.2533 3.78663 13.4733 3.97329 13.6667 4.18663C13.9333 4.49996 13.84 4.99996 13.4733 5.21329Z" fill="#FFFFFF"/>
                        <path d="M7.62 9.42663V13.9733C7.62 14.48 7.10666 14.8133 6.65333 14.5933C5.28 13.92 2.96666 12.66 2.96666 12.66C2.15333 12.2 1.48666 11.04 1.48666 10.0866V6.64663C1.48666 6.11996 2.04 5.78663 2.49333 6.04663L7.28666 8.82663C7.48666 8.95329 7.62 9.17996 7.62 9.42663Z" fill="#FFFFFF"/>
                        <path d="M8.38 9.42663V13.9733C8.38 14.48 8.89334 14.8133 9.34667 14.5933C10.72 13.92 13.0333 12.66 13.0333 12.66C13.8467 12.2 14.5133 11.04 14.5133 10.0866V6.64663C14.5133 6.11996 13.96 5.78663 13.5067 6.04663L8.71334 8.82663C8.51334 8.95329 8.38 9.17996 8.38 9.42663Z" fill="#FFFFFF"/>
                      </svg>
                    </div>
                    <div className="flex flex-row justify-center items-center" style={{ width: '18px', height: '18px', gap: '10px' }}>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="6" cy="2" r="1" fill="#999999"/>
                        <circle cx="6" cy="6" r="1" fill="#999999"/>
                        <circle cx="6" cy="10" r="1" fill="#999999"/>
                      </svg>
                    </div>
                  </div>
                  <div className="flex flex-col items-start w-full" style={{ height: '37px', gap: '5px' }}>
                    <span
                      style={{
                        fontFamily: 'SF Pro',
                        fontStyle: 'normal',
                        fontWeight: 510,
                        fontSize: '12px',
                        lineHeight: '16px',
                        letterSpacing: '0.005em',
                        color: '#FBFBFB'
                      }}
                    >
                      Total Companies
                    </span>
                    <span
                      style={{
                        fontFamily: 'SF Pro',
                        fontStyle: 'normal',
                        fontWeight: 510,
                        fontSize: '12px',
                        lineHeight: '16px',
                        letterSpacing: '0.005em',
                        color: '#FBFBFB'
                      }}
                    >
                      245
                    </span>
                  </div>
                </div>
              </div>

              {/* Active */}
              <div
                className="flex flex-col justify-center items-center"
                style={{
                  minWidth: '200px',
                  height: '93px',
                  padding: '12px',
                  gap: '10px',
                  background: '#2B2B2B',
                  border: '1px solid #3D3D3D',
                  borderRadius: '12px',
                  flex: '1 1 0%'
                }}
              >
                <div className="flex flex-col items-start w-full" style={{ height: '69px', gap: '6px' }}>
                  <div className="flex flex-row justify-between items-center w-full" style={{ height: '26px' }}>
                    <div
                      className="flex flex-row justify-center items-center"
                      style={{
                        width: '26px',
                        height: '26px',
                        padding: '2px',
                        gap: '10px',
                        background: '#3D3D3D',
                        borderRadius: '4px'
                      }}
                    >
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.94 7.14668H9.88001V2.34668C9.88001 1.22668 9.27334 1.00001 8.53334 1.84001L8.00001 2.44668L3.48667 7.58001C2.86667 8.28001 3.12667 8.85335 4.06001 8.85335H6.12001V13.6533C6.12001 14.7733 6.72667 15 7.46667 14.16L8.00001 13.5533L12.5133 8.42001C13.1333 7.72001 12.8733 7.14668 11.94 7.14668Z" fill="#FFFFFF"/>
                      </svg>
                    </div>
                    <div className="flex flex-row justify-center items-center" style={{ width: '18px', height: '18px', gap: '10px' }}>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="6" cy="2" r="1" fill="#999999"/>
                        <circle cx="6" cy="6" r="1" fill="#999999"/>
                        <circle cx="6" cy="10" r="1" fill="#999999"/>
                      </svg>
                    </div>
                  </div>
                  <div className="flex flex-col items-start w-full" style={{ height: '37px', gap: '5px' }}>
                    <span
                      style={{
                        fontFamily: 'SF Pro',
                        fontStyle: 'normal',
                        fontWeight: 510,
                        fontSize: '12px',
                        lineHeight: '16px',
                        letterSpacing: '0.005em',
                        color: '#FBFBFB'
                      }}
                    >
                      Active
                    </span>
                    <span
                      style={{
                        fontFamily: 'SF Pro',
                        fontStyle: 'normal',
                        fontWeight: 510,
                        fontSize: '12px',
                        lineHeight: '16px',
                        letterSpacing: '0.005em',
                        color: '#FBFBFB'
                      }}
                    >
                      123
                    </span>
                  </div>
                </div>
              </div>

              {/* Revenue */}
              <div
                className="flex flex-col justify-center items-center"
                style={{
                  minWidth: '200px',
                  height: '93px',
                  padding: '12px',
                  gap: '10px',
                  background: '#2B2B2B',
                  border: '1px solid #3D3D3D',
                  borderRadius: '12px',
                  flex: '1 1 0%'
                }}
              >
                <div className="flex flex-col items-start w-full" style={{ height: '69px', gap: '6px' }}>
                  <div className="flex flex-row justify-between items-center w-full" style={{ height: '26px' }}>
                    <div
                      className="flex flex-row justify-center items-center"
                      style={{
                        width: '26px',
                        height: '26px',
                        padding: '2px',
                        gap: '10px',
                        background: '#3D3D3D',
                        borderRadius: '4px'
                      }}
                    >
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.7933 1.33337H5.20665C2.77998 1.33337 1.33331 2.78004 1.33331 5.20671V10.7867C1.33331 13.22 2.77998 14.6667 5.20665 14.6667H10.7866C13.2133 14.6667 14.66 13.22 14.66 10.7934V5.20671C14.6666 2.78004 13.22 1.33337 10.7933 1.33337ZM11.2533 7.68671C11.2533 7.94671 11.0466 8.15337 10.7866 8.15337C10.5266 8.15337 10.32 7.94671 10.32 7.68671V7.56671L8.50665 9.38004C8.40665 9.48004 8.27331 9.52671 8.13331 9.51337C7.99331 9.50004 7.86665 9.42671 7.79331 9.30671L7.11331 8.29337L5.52665 9.88004C5.43331 9.97337 5.31998 10.0134 5.19998 10.0134C5.07998 10.0134 4.95998 9.96671 4.87331 9.88004C4.69331 9.70004 4.69331 9.40671 4.87331 9.22004L6.85998 7.23337C6.95998 7.13337 7.09331 7.08671 7.23331 7.10004C7.37331 7.11337 7.49998 7.18671 7.57331 7.30671L8.25331 8.32004L9.65998 6.91337H9.53998C9.27998 6.91337 9.07331 6.70671 9.07331 6.44671C9.07331 6.18671 9.27998 5.98004 9.53998 5.98004H10.78C10.84 5.98004 10.9 5.99337 10.96 6.01337C11.0733 6.06004 11.1666 6.15337 11.2133 6.26671C11.24 6.32671 11.2466 6.38671 11.2466 6.44671V7.68671H11.2533Z" fill="#FFFFFF"/>
                      </svg>
                    </div>
                    <div className="flex flex-row justify-center items-center" style={{ width: '18px', height: '18px', gap: '10px' }}>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="6" cy="2" r="1" fill="#999999"/>
                        <circle cx="6" cy="6" r="1" fill="#999999"/>
                        <circle cx="6" cy="10" r="1" fill="#999999"/>
                      </svg>
                    </div>
                  </div>
                  <div className="flex flex-col items-start w-full" style={{ height: '37px', gap: '5px' }}>
                    <span
                      style={{
                        fontFamily: 'SF Pro',
                        fontStyle: 'normal',
                        fontWeight: 510,
                        fontSize: '12px',
                        lineHeight: '16px',
                        letterSpacing: '0.005em',
                        color: '#FBFBFB'
                      }}
                    >
                      Revenue
                    </span>
                    <span
                      style={{
                        fontFamily: 'SF Pro',
                        fontStyle: 'normal',
                        fontWeight: 510,
                        fontSize: '12px',
                        lineHeight: '16px',
                        letterSpacing: '0.005em',
                        color: '#FBFBFB'
                      }}
                    >
                      123
                    </span>
                  </div>
                </div>
              </div>

              {/* EXP */}
              <div
                className="flex flex-col justify-center items-center"
                style={{
                  minWidth: '200px',
                  height: '93px',
                  padding: '12px',
                  gap: '10px',
                  background: '#2B2B2B',
                  border: '1px solid #3D3D3D',
                  borderRadius: '12px',
                  flex: '1 1 0%'
                }}
              >
                <div className="flex flex-col items-start w-full" style={{ height: '69px', gap: '6px' }}>
                  <div className="flex flex-row justify-between items-center w-full" style={{ height: '26px' }}>
                    <div
                      className="flex flex-row justify-center items-center"
                      style={{
                        width: '26px',
                        height: '26px',
                        padding: '2px',
                        gap: '10px',
                        background: '#3D3D3D',
                        borderRadius: '4px'
                      }}
                    >
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.5 3.83337C5.22667 3.83337 5 3.60671 5 3.33337V1.33337C5 1.06004 5.22667 0.833374 5.5 0.833374C5.77333 0.833374 6 1.06004 6 1.33337V3.33337C6 3.60671 5.77333 3.83337 5.5 3.83337Z" fill="#FFFFFF"/>
                        <path d="M10.5 3.83337C10.2267 3.83337 10 3.60671 10 3.33337V1.33337C10 1.06004 10.2267 0.833374 10.5 0.833374C10.7733 0.833374 11 1.06004 11 1.33337V3.33337C11 3.60671 10.7733 3.83337 10.5 3.83337Z" fill="#FFFFFF"/>
                        <path d="M8.00002 9.39337C8.34669 9.39337 8.60002 9.18671 8.60002 8.86004C8.60002 8.52671 8.34669 8.33337 8.00002 8.33337C7.65336 8.33337 7.40002 8.52671 7.40002 8.86004C7.40002 9.18671 7.65336 9.39337 8.00002 9.39337Z" fill="#FFFFFF"/>
                        <path d="M7.99999 11.3334C8.41973 11.3334 8.75999 11.0558 8.75999 10.7134C8.75999 10.371 8.41973 10.0934 7.99999 10.0934C7.58025 10.0934 7.23999 10.371 7.23999 10.7134C7.23999 11.0558 7.58025 11.3334 7.99999 11.3334Z" fill="#FFFFFF"/>
                        <path d="M13.0466 3.00004C12.6066 2.67337 11.9733 2.98671 11.9733 3.54004V3.60671C11.9733 4.38671 11.4133 5.10671 10.6333 5.18671C9.73329 5.28004 8.97329 4.57337 8.97329 3.69337V3.00004C8.97329 2.63337 8.67329 2.33337 8.30663 2.33337H7.69329C7.32663 2.33337 7.02663 2.63337 7.02663 3.00004V3.69337C7.02663 4.22004 6.75329 4.68671 6.33996 4.94671C6.27996 4.98671 6.21329 5.02004 6.14663 5.05337C6.08663 5.08671 6.01996 5.11337 5.94663 5.13337C5.86663 5.16004 5.77996 5.18004 5.68663 5.18671C5.57996 5.20004 5.47329 5.20004 5.36663 5.18671C5.27329 5.18004 5.18663 5.16004 5.10663 5.13337C5.03996 5.11337 4.97329 5.08671 4.90663 5.05337C4.83996 5.02004 4.77329 4.98671 4.71329 4.94671C4.29329 4.65337 4.02663 4.14671 4.02663 3.60671V3.54004C4.02663 3.02671 3.47996 2.72004 3.04663 2.94004C3.03996 2.94671 3.03329 2.94671 3.02663 2.95337C2.99996 2.96671 2.97996 2.98004 2.95329 3.00004C2.93329 3.02004 2.90663 3.03337 2.88663 3.05337C2.69996 3.20004 2.53329 3.36671 2.39329 3.54671C2.31996 3.62671 2.25996 3.71337 2.20663 3.80004C2.19996 3.80671 2.19329 3.81337 2.18663 3.82671C2.12663 3.91337 2.07329 4.01337 2.02663 4.10671C2.01329 4.12004 2.00663 4.12671 2.00663 4.14004C1.96663 4.22004 1.92663 4.30004 1.89996 4.38671C1.87996 4.42004 1.87329 4.44671 1.85996 4.48004C1.81996 4.58004 1.79329 4.68004 1.76663 4.78004C1.73996 4.87337 1.71996 4.97337 1.70663 5.07337C1.69329 5.14671 1.68663 5.22004 1.67996 5.30004C1.67329 5.39337 1.66663 5.48671 1.66663 5.58004V11.42C1.66663 13.2134 3.11996 14.6667 4.91329 14.6667H11.0866C12.88 14.6667 14.3333 13.2134 14.3333 11.42V5.58004C14.3333 4.52004 13.8266 3.59337 13.0466 3.00004ZM7.99996 12.1667C6.96663 12.1667 6.33329 11.6534 6.33329 10.8267C6.33329 10.3734 6.56663 9.98004 6.97329 9.74671C6.67996 9.54004 6.48663 9.23337 6.48663 8.81337C6.48663 7.94671 7.17996 7.50004 7.99996 7.50004C8.81996 7.50004 9.50663 7.94671 9.50663 8.81337C9.50663 9.23337 9.31996 9.54004 9.01996 9.74671C9.43329 9.98004 9.66663 10.3734 9.66663 10.8267C9.66663 11.6534 9.02663 12.1667 7.99996 12.1667Z" fill="#FFFFFF"/>
                      </svg>
                    </div>
                    <div className="flex flex-row justify-center items-center" style={{ width: '18px', height: '18px', gap: '10px' }}>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="6" cy="2" r="1" fill="#999999"/>
                        <circle cx="6" cy="6" r="1" fill="#999999"/>
                        <circle cx="6" cy="10" r="1" fill="#999999"/>
                      </svg>
                    </div>
                  </div>
                  <div className="flex flex-col items-start w-full" style={{ height: '37px', gap: '5px' }}>
                    <span
                      style={{
                        fontFamily: 'SF Pro',
                        fontStyle: 'normal',
                        fontWeight: 510,
                        fontSize: '12px',
                        lineHeight: '16px',
                        letterSpacing: '0.005em',
                        color: '#FBFBFB'
                      }}
                    >
                      EXP
                    </span>
                    <span
                      style={{
                        fontFamily: 'SF Pro',
                        fontStyle: 'normal',
                        fontWeight: 510,
                        fontSize: '12px',
                        lineHeight: '16px',
                        letterSpacing: '0.005em',
                        color: '#FBFBFB'
                      }}
                    >
                      123
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Search and Actions */}
            <div className="flex flex-row items-center justify-between w-full flex-shrink-0 flex-wrap" style={{ minHeight: '50px', gap: '8px' }}>
              {/* Search Bar */}
              <div className="flex flex-col justify-center items-center flex-1" style={{ minWidth: '200px', height: '50px', padding: '4px 0px', gap: '10px' }}>
                <div className="flex flex-row items-center w-full" style={{ height: '32px', gap: '8px' }}>
                  <div
                    className="flex flex-row items-center w-full"
                    style={{
                      minWidth: '200px',
                      height: '32px',
                      padding: '8px 12px',
                      gap: '5px',
                      background: '#1E1E1E',
                      border: '1px solid #2B2B2B',
                      borderRadius: '12px'
                    }}
                  >
                    <div className="flex flex-row items-center flex-1" style={{ height: '16px', gap: '4px' }}>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
                        <path d="M7.66668 14C11.1645 14 14 11.1645 14 7.66671C14 4.1689 11.1645 1.33337 7.66668 1.33337C4.16887 1.33337 1.33334 4.1689 1.33334 7.66671C1.33334 11.1645 4.16887 14 7.66668 14Z" stroke="#999999" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M14.6667 14.6667L13.3333 13.3334" stroke="#999999" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <input
                        type="text"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="flex-1"
                        style={{
                          height: '16px',
                          fontFamily: 'SF Pro',
                          fontStyle: 'normal',
                          fontWeight: 510,
                          fontSize: '12px',
                          lineHeight: '16px',
                          letterSpacing: '0.005em',
                          color: '#999999',
                          background: 'transparent',
                          border: 'none',
                          outline: 'none'
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col justify-center items-end flex-1" style={{ minWidth: '200px', height: '50px', padding: '4px 0px', gap: '10px' }}>
                <div className="flex flex-row justify-end items-center flex-wrap" style={{ width: '100%', maxWidth: '214px', height: '32px', gap: '8px' }}>
                  {/* New Company */}
                  <div className="flex flex-row items-center">
                    <div
                      className="flex flex-row justify-center items-center"
                      style={{
                        minWidth: '32px',
                        width: 'auto',
                        height: '32px',
                        padding: '4px 12px',
                        gap: '5px',
                        background: '#2B2B2B',
                        borderRadius: '14px'
                      }}
                    >
                      <div className="flex flex-row items-center" style={{ gap: '4px' }}>
                        <svg width="16" height="16" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
                          <path d="M12.8333 12.3959H1.16663C0.927459 12.3959 0.729126 12.5942 0.729126 12.8334C0.729126 13.0725 0.927459 13.2709 1.16663 13.2709H12.8333C13.0725 13.2709 13.2708 13.0725 13.2708 12.8334C13.2708 12.5942 13.0725 12.3959 12.8333 12.3959Z" fill="#999999"/>
                          <path d="M9.91667 1.16663H4.08333C2.33333 1.16663 1.75 2.21079 1.75 3.49996V12.8333H12.25V3.49996C12.25 2.21079 11.6667 1.16663 9.91667 1.16663ZM5.83333 10.0625H4.08333C3.84417 10.0625 3.64583 9.86413 3.64583 9.62496C3.64583 9.38579 3.84417 9.18746 4.08333 9.18746H5.83333C6.0725 9.18746 6.27083 9.38579 6.27083 9.62496C6.27083 9.86413 6.0725 10.0625 5.83333 10.0625ZM5.83333 7.43746H4.08333C3.84417 7.43746 3.64583 7.23913 3.64583 6.99996C3.64583 6.76079 3.84417 6.56246 4.08333 6.56246H5.83333C6.0725 6.56246 6.27083 6.76079 6.27083 6.99996C6.27083 7.23913 6.0725 7.43746 5.83333 7.43746ZM5.83333 4.81246H4.08333C3.84417 4.81246 3.64583 4.61413 3.64583 4.37496C3.64583 4.13579 3.84417 3.93746 4.08333 3.93746H5.83333C6.0725 3.93746 6.27083 4.13579 6.27083 4.37496C6.27083 4.61413 6.0725 4.81246 5.83333 4.81246ZM9.91667 10.0625H8.16667C7.9275 10.0625 7.72917 9.86413 7.72917 9.62496C7.72917 9.38579 7.9275 9.18746 8.16667 9.18746H9.91667C10.1558 9.18746 10.3542 9.38579 10.3542 9.62496C10.3542 9.86413 10.1558 10.0625 9.91667 10.0625ZM9.91667 7.43746H8.16667C7.9275 7.43746 7.72917 7.23913 7.72917 6.99996C7.72917 6.76079 7.9275 6.56246 8.16667 6.56246H9.91667C10.1558 6.56246 10.3542 6.76079 10.3542 6.99996C10.3542 7.23913 10.1558 7.43746 9.91667 7.43746ZM9.91667 4.81246H8.16667C7.9275 4.81246 7.72917 4.61413 7.72917 4.37496C7.72917 4.13579 7.9275 3.93746 8.16667 3.93746H9.91667C10.1558 3.93746 10.3542 4.13579 10.3542 4.37496C10.3542 4.61413 10.1558 4.81246 9.91667 4.81246Z" fill="#999999"/>
                        </svg>
                        <span
                          className="hidden md:inline"
                          style={{
                            fontFamily: 'SF Pro',
                            fontStyle: 'normal',
                            fontWeight: 510,
                            fontSize: '12px',
                            lineHeight: '16px',
                            textAlign: 'center',
                            letterSpacing: '0.005em',
                            color: '#999999',
                            whiteSpace: 'nowrap'
                          }}
                        >
                          New Company
                        </span>
                      </div>
                    </div>
                  </div>
                  {/* Filters */}
                  <div className="flex flex-row items-center">
                    <div
                      className="flex flex-row justify-center items-center"
                      style={{
                        minWidth: '32px',
                        width: 'auto',
                        height: '32px',
                        padding: '4px 12px',
                        gap: '5px',
                        background: '#2B2B2B',
                        borderRadius: '14px'
                      }}
                    >
                      <div className="flex flex-row items-center" style={{ gap: '4px' }}>
                        <svg width="16" height="16" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
                          <path d="M4.375 2.62496H4.22917V1.16663C4.22917 0.927459 4.03083 0.729126 3.79167 0.729126C3.5525 0.729126 3.35417 0.927459 3.35417 1.16663V2.62496H3.20833C2.28083 2.62496 1.75 3.15579 1.75 4.08329V7.58329C1.75 8.51079 2.28083 9.04163 3.20833 9.04163H3.35417V12.8333C3.35417 13.0725 3.5525 13.2708 3.79167 13.2708C4.03083 13.2708 4.22917 13.0725 4.22917 12.8333V9.04163H4.375C5.3025 9.04163 5.83333 8.51079 5.83333 7.58329V4.08329C5.83333 3.15579 5.3025 2.62496 4.375 2.62496Z" fill="#999999"/>
                          <path d="M10.7916 4.95829H10.6458V1.16663C10.6458 0.927459 10.4475 0.729126 10.2083 0.729126C9.96913 0.729126 9.77079 0.927459 9.77079 1.16663V4.95829H9.62496C8.69746 4.95829 8.16663 5.48913 8.16663 6.41663V9.91663C8.16663 10.8441 8.69746 11.375 9.62496 11.375H9.77079V12.8333C9.77079 13.0725 9.96913 13.2708 10.2083 13.2708C10.4475 13.2708 10.6458 13.0725 10.6458 12.8333V11.375H10.7916C11.7191 11.375 12.25 10.8441 12.25 9.91663V6.41663C12.25 5.48913 11.7191 4.95829 10.7916 4.95829Z" fill="#999999"/>
                        </svg>
                        <span
                          className="hidden md:inline"
                          style={{
                            fontFamily: 'SF Pro',
                            fontStyle: 'normal',
                            fontWeight: 510,
                            fontSize: '12px',
                            lineHeight: '16px',
                            textAlign: 'center',
                            letterSpacing: '0.005em',
                            color: '#999999',
                            whiteSpace: 'nowrap'
                          }}
                        >
                          Filters
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Table */}
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <div
                className="flex flex-col items-start flex-1 overflow-y-auto"
                style={{
                  width: '100%',
                  background: '#141414',
                  border: '1px solid #2B2B2B',
                  borderRadius: '12px',
                  position: 'relative'
                }}
              >
                {/* Table Header */}
                <div className="flex flex-row items-start w-full overflow-x-auto" style={{ isolation: 'isolate', minWidth: 'max-content' }}>
                  {/* More Icon Column Header */}
                  <div className="flex flex-col items-start flex-shrink-0" style={{ width: '20px', zIndex: 0 }}>
                    <div
                      className="flex flex-row items-center justify-center flex-shrink-0"
                      style={{
                        width: '20px',
                        height: '30px',
                        padding: '12px 4px',
                        gap: '0px',
                        background: '#2B2B2B',
                        borderBottom: '1px solid #2B2B2B'
                      }}
                    />
                  </div>

                  {/* Company Name Column Header */}
                  <div className="flex flex-col items-start flex-shrink-0" style={{ width: '160px', zIndex: 1 }}>
                    <div
                      className="flex flex-row items-center flex-shrink-0"
                      style={{
                        width: '160px',
                        height: '30px',
                        padding: '8px 12px',
                        gap: '6px',
                        background: '#2B2B2B',
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
                          color: '#FBFBFB'
                        }}
                      >
                        Company Name
                      </span>
                    </div>
                  </div>

                  {/* States Column Header */}
                  <div className="flex flex-col items-start flex-shrink-0" style={{ width: 'auto', minWidth: '100px', zIndex: 1 }}>
                    <div
                      className="flex flex-row items-center flex-shrink-0"
                      style={{
                        width: '100%',
                        height: '30px',
                        padding: '8px 12px',
                        gap: '6px',
                        background: '#2B2B2B',
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
                          color: '#FBFBFB'
                        }}
                      >
                        States
                      </span>
                    </div>
                  </div>

                  {/* Total Amount Column Header */}
                  <div className="flex flex-col items-start flex-shrink-0" style={{ width: '120px', zIndex: 1 }}>
                    <div
                      className="flex flex-row items-center flex-shrink-0"
                      style={{
                        width: '120px',
                        height: '30px',
                        padding: '8px 12px',
                        gap: '6px',
                        background: '#2B2B2B',
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
                          color: '#FBFBFB'
                        }}
                      >
                        Total Amount
                      </span>
                    </div>
                  </div>

                  {/* Address Column Header */}
                  <div className="flex flex-col items-start flex-shrink-0" style={{ width: '160px', zIndex: 1 }}>
                    <div
                      className="flex flex-row items-center flex-shrink-0"
                      style={{
                        width: '160px',
                        height: '30px',
                        padding: '8px 12px',
                        gap: '6px',
                        background: '#2B2B2B',
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
                          color: '#FBFBFB'
                        }}
                      >
                        Address
                      </span>
                    </div>
                  </div>

                  {/* Email Column Header */}
                  <div className="flex flex-col items-start flex-shrink-0" style={{ width: '140px', zIndex: 1 }}>
                    <div
                      className="flex flex-row items-center flex-shrink-0"
                      style={{
                        width: '140px',
                        height: '30px',
                        padding: '8px 12px',
                        gap: '6px',
                        background: '#2B2B2B',
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
                          color: '#FBFBFB'
                        }}
                      >
                        Email
                      </span>
                    </div>
                  </div>

                  {/* Created At Column Header */}
                  <div className="flex flex-col items-start flex-shrink-0" style={{ width: '100px', zIndex: 1 }}>
                    <div
                      className="flex flex-row items-center flex-shrink-0"
                      style={{
                        width: '100px',
                        height: '30px',
                        padding: '8px 12px',
                        gap: '6px',
                        background: '#2B2B2B',
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
                          color: '#FBFBFB'
                        }}
                      >
                        Created At
                      </span>
                    </div>
                  </div>

                  {/* Last Update Column Header */}
                  <div className="flex flex-col items-start flex-shrink-0" style={{ width: '100px', zIndex: 1 }}>
                    <div
                      className="flex flex-row items-center flex-shrink-0"
                      style={{
                        width: '100px',
                        height: '30px',
                        padding: '8px 12px',
                        gap: '6px',
                        background: '#2B2B2B',
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
                          color: '#FBFBFB'
                        }}
                      >
                        Last Update
                      </span>
                    </div>
                  </div>

                  {/* Content Column Header */}
                  <div className="flex flex-col items-start flex-shrink-0" style={{ width: '140px', zIndex: 1 }}>
                    <div
                      className="flex flex-row items-center flex-shrink-0"
                      style={{
                        width: '140px',
                        height: '30px',
                        padding: '8px 12px',
                        gap: '6px',
                        background: '#2B2B2B',
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
                          color: '#FBFBFB'
                        }}
                      >
                        Content
                      </span>
                    </div>
                  </div>

                  {/* Actions Column Header */}
                  <div className="flex flex-col items-start flex-shrink-0" style={{ width: '80px', zIndex: 2 }}>
                    <div
                      className="flex flex-row items-center flex-shrink-0"
                      style={{
                        width: '80px',
                        height: '30px',
                        padding: '12px 20px',
                        gap: '10px',
                        background: '#2B2B2B',
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
                          color: '#FBFBFB'
                        }}
                      >
                        Actions
                      </span>
                    </div>
                  </div>
                </div>

                {/* Table Body with Sortable Rows */}
                <SortableContext
                  items={filteredCompanies.map(c => c.id)}
                  strategy={verticalListSortingStrategy}
                >
                  <div className="flex flex-col items-start w-full overflow-x-auto" style={{ isolation: 'isolate', minWidth: 'max-content' }}>
                    {filteredCompanies.map((company) => (
                      <SortableRow
                        key={company.id}
                        company={company}
                        openStateMenu={openStateMenu}
                        openActionMenu={openActionMenu}
                        setOpenStateMenu={setOpenStateMenu}
                        setOpenActionMenu={setOpenActionMenu}
                        updateCompanyState={updateCompanyState}
                      />
                    ))}
                  </div>
                </SortableContext>
                {/* Add New Button */}
                <div
                  className="flex flex-row items-center"
                  style={{
                    padding: '12px 20px',
                    gap: '8px'
                  }}
                >
                  <button
                    style={{
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      padding: '4px 8px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
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
                      Add new+
                    </span>
                  </button>
                </div>
              </div>
            </DndContext>
          </div>
        </div>
      </div>
      </div>

      {/* Enhanced Command Dialog with Strong Overlay */}
      {open && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100vw',
            height: '100vh',
            zIndex: 999,
            background: 'rgba(0, 0, 0, 0.5)',
            backdropFilter: 'blur(12px) saturate(120%)',
            WebkitBackdropFilter: 'blur(12px) saturate(120%)',
            animation: 'overlayFadeIn 250ms ease-out',
            willChange: 'backdrop-filter, opacity'
          }}
          onClick={() => setOpen(false)}
        />
      )}

      <CommandDialog
        open={open}
        shouldFilter={false}
        onOpenChange={(isOpen) => {
          setOpen(isOpen)
          if (!isOpen) {
            setCommandSearchQuery('')
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
          {isSearching && (
            <div
              className="flex items-center justify-center py-8"
              style={{
                color: 'rgba(255, 255, 255, 0.5)'
              }}
            >
              <Loader2 className="h-5 w-5 animate-spin mr-3" />
              <span className="text-sm">Searching...</span>
            </div>
          )}

          {!isSearching && commandSearchQuery && commandSearchQuery.length >= 2 && !hasResults && (
            <CommandEmpty>
              <div style={{ padding: '20px 0' }}>
                <div style={{
                  fontSize: '32px',
                  marginBottom: '12px',
                  opacity: 0.3
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

          {!isSearching && commandSearchQuery && commandSearchQuery.length >= 2 && hasResults && (
            <>
              <CommandGroup heading="Companies">
                {searchResults.companies.map((company) => (
                  <CommandItem
                    key={company.id}
                    value={`company-${company.id}`}
                    onSelect={() => handleSelectCompany(company.id)}
                    style={{
                      cursor: 'pointer',
                      padding: '12px 16px'
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

          {!commandSearchQuery || commandSearchQuery.length < 2 ? (
            <>
              <CommandGroup heading="Navigation">
                <CommandItem
                  value="dashboard"
                  onSelect={() => handleSelect('/dashboard')}
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
                  onSelect={() => handleSelect('/dashboard')}
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
                  onSelect={() => handleSelect('/team')}
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
            </>
          ) : null}
        </CommandList>
      </CommandDialog>
    </div>
  )
}
