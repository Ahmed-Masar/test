'use client'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import type { Company } from './types'

interface SortableRowProps {
  company: Company
  openStateMenu: number | null
  openActionMenu: number | null
  setOpenStateMenu: (id: number | null) => void
  setOpenActionMenu: (id: number | null) => void
  updateCompanyState: (companyId: number, newState: 'Active' | 'Not Active' | 'Pending') => void
  onRowClick: (company: Company) => void
}

export default function SortableRow({ 
  company, 
  openStateMenu, 
  openActionMenu, 
  setOpenStateMenu, 
  setOpenActionMenu, 
  updateCompanyState,
  onRowClick
}: SortableRowProps) {
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
      className="flex flex-row items-start w-full hover:bg-[#1A1A1A] transition-colors cursor-pointer"
      onClick={() => onRowClick(company)}
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
          onClick={(e) => e.stopPropagation()}
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
              className="absolute top-full left-0 mt-1 z-50"
              style={{
                width: '120px',
                background: '#000000',
                border: '1px solid #2B2B2B',
                borderRadius: '8px',
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.4)',
                overflow: 'hidden'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  updateCompanyState(company.id, 'Active')
                }}
                className="w-full flex items-center px-3 py-2 hover:bg-[#2B2B2B] transition-colors"
                style={{
                  gap: '8px',
                  borderBottom: '1px solid #2B2B2B'
                }}
              >
                <div style={{ width: '8px', height: '8px', background: '#008E5A', borderRadius: '50%' }} />
                <span
                  style={{
                    fontFamily: 'SF Pro',
                    fontWeight: 510,
                    fontSize: '12px',
                    lineHeight: '16px',
                    color: '#FBFBFB'
                  }}
                >
                  Active
                </span>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  updateCompanyState(company.id, 'Not Active')
                }}
                className="w-full flex items-center px-3 py-2 hover:bg-[#2B2B2B] transition-colors"
                style={{
                  gap: '8px',
                  borderBottom: '1px solid #2B2B2B'
                }}
              >
                <div style={{ width: '8px', height: '8px', background: '#8E1F00', borderRadius: '50%' }} />
                <span
                  style={{
                    fontFamily: 'SF Pro',
                    fontWeight: 510,
                    fontSize: '12px',
                    lineHeight: '16px',
                    color: '#FBFBFB'
                  }}
                >
                  Not Active
                </span>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  updateCompanyState(company.id, 'Pending')
                }}
                className="w-full flex items-center px-3 py-2 hover:bg-[#2B2B2B] transition-colors"
                style={{ gap: '8px' }}
              >
                <div style={{ width: '8px', height: '8px', background: '#DC6300', borderRadius: '50%' }} />
                <span
                  style={{
                    fontFamily: 'SF Pro',
                    fontWeight: 510,
                    fontSize: '12px',
                    lineHeight: '16px',
                    color: '#FBFBFB'
                  }}
                >
                  Pending
                </span>
              </button>
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
              className="absolute top-full right-0 mt-1 z-50"
              style={{
                width: '160px',
                background: '#000000',
                border: '1px solid #2B2B2B',
                borderRadius: '8px',
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.4)',
                overflow: 'hidden'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="w-full flex items-center px-3 py-2 hover:bg-[#2B2B2B] transition-colors"
                style={{
                  gap: '8px',
                  borderBottom: '1px solid #2B2B2B'
                }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 3V8M8 8V13M8 8H13M8 8H3" stroke="#FBFBFB" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                <span
                  style={{
                    fontFamily: 'SF Pro',
                    fontWeight: 510,
                    fontSize: '12px',
                    lineHeight: '16px',
                    color: '#FBFBFB'
                  }}
                >
                  View Details
                </span>
              </button>
              <button
                className="w-full flex items-center px-3 py-2 hover:bg-[#2B2B2B] transition-colors"
                style={{
                  gap: '8px',
                  borderBottom: '1px solid #2B2B2B'
                }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M11 3L13 5L6 12H4V10L11 3Z" stroke="#FBFBFB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span
                  style={{
                    fontFamily: 'SF Pro',
                    fontWeight: 510,
                    fontSize: '12px',
                    lineHeight: '16px',
                    color: '#FBFBFB'
                  }}
                >
                  Edit
                </span>
              </button>
              <button
                className="w-full flex items-center px-3 py-2 hover:bg-[#2B2B2B] transition-colors"
                style={{ gap: '8px' }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 4H13M5 4V3C5 2.44772 5.44772 2 6 2H10C10.5523 2 11 2.44772 11 3V4M12 4V13C12 13.5523 11.5523 14 11 14H5C4.44772 14 4 13.5523 4 13V4H12Z" stroke="#DC2626" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span
                  style={{
                    fontFamily: 'SF Pro',
                    fontWeight: 510,
                    fontSize: '12px',
                    lineHeight: '16px',
                    color: '#DC2626'
                  }}
                >
                  Delete
                </span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Spacer Column to fill remaining space */}
      <div className="flex flex-col items-start flex-1" style={{ minWidth: '0', zIndex: 0 }}>
        <div
          className="flex flex-row items-center w-full"
          style={{
            height: '30px',
            borderBottom: '1px solid #2B2B2B'
          }}
        />
      </div>
    </div>
  )
}

