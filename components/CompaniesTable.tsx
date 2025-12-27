'use client'

import { useState, useEffect } from 'react'
import {
  DndContext,
  closestCenter,
  DragEndEvent,
} from '@dnd-kit/core'
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import type { Company } from './types'
import SortableRow from './SortableRow'

interface CompaniesTableProps {
  companies: Company[]
  sensors: any
  onDragEnd: (event: DragEndEvent) => void
  openStateMenu: number | null
  openActionMenu: number | null
  setOpenStateMenu: (id: number | null) => void
  setOpenActionMenu: (id: number | null) => void
  updateCompanyState: (companyId: number, newState: 'Active' | 'Not Active' | 'Pending') => void
  onRowClick: (company: Company) => void
}

export default function CompaniesTable({
  companies,
  sensors,
  onDragEnd,
  openStateMenu,
  openActionMenu,
  setOpenStateMenu,
  setOpenActionMenu,
  updateCompanyState,
  onRowClick,
}: CompaniesTableProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
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
        <div className="flex flex-row items-start w-full overflow-x-auto" style={{ isolation: 'isolate', minWidth: 'max-content' }}>
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
          <div className="flex flex-col items-start flex-shrink-0" style={{ width: '160px', zIndex: 1 }}>
            <div
              className="flex flex-row items-center flex-shrink-0"
              style={{
                width: '160px',
                height: '30px',
                padding: '12px 16px',
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
          <div className="flex flex-col items-start flex-shrink-0" style={{ width: '120px', zIndex: 1 }}>
            <div
              className="flex flex-row items-center flex-shrink-0"
              style={{
                width: '120px',
                height: '30px',
                padding: '12px 16px',
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
          <div className="flex flex-col items-start flex-shrink-0" style={{ width: '120px', zIndex: 1 }}>
            <div
              className="flex flex-row items-center flex-shrink-0"
              style={{
                width: '120px',
                height: '30px',
                padding: '12px 16px',
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
          <div className="flex flex-col items-start flex-shrink-0" style={{ width: '160px', zIndex: 1 }}>
            <div
              className="flex flex-row items-center flex-shrink-0"
              style={{
                width: '160px',
                height: '30px',
                padding: '12px 16px',
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
          <div className="flex flex-col items-start flex-shrink-0" style={{ width: '140px', zIndex: 1 }}>
            <div
              className="flex flex-row items-center flex-shrink-0"
              style={{
                width: '140px',
                height: '30px',
                padding: '12px 16px',
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
          <div className="flex flex-col items-start flex-shrink-0" style={{ width: '100px', zIndex: 1 }}>
            <div
              className="flex flex-row items-center flex-shrink-0"
              style={{
                width: '100px',
                height: '30px',
                padding: '12px 16px',
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
          <div className="flex flex-col items-start flex-shrink-0" style={{ width: '100px', zIndex: 1 }}>
            <div
              className="flex flex-row items-center flex-shrink-0"
              style={{
                width: '100px',
                height: '30px',
                padding: '12px 16px',
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
          <div className="flex flex-col items-start flex-shrink-0" style={{ width: '140px', zIndex: 1 }}>
            <div
              className="flex flex-row items-center flex-shrink-0"
              style={{
                width: '140px',
                height: '30px',
                padding: '12px 16px',
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
          <div className="flex flex-col items-start flex-shrink-0" style={{ width: '80px', zIndex: 2 }}>
            <div
              className="flex flex-row items-center flex-shrink-0"
              style={{
                width: '80px',
                height: '30px',
                padding: '12px 16px',
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
          <div className="flex flex-col items-start flex-1" style={{ minWidth: '0', zIndex: 0 }}>
            <div
              className="flex flex-row items-center w-full"
              style={{
                height: '30px',
                background: '#2B2B2B',
                borderBottom: '1px solid #2B2B2B'
              }}
            />
          </div>
        </div>
        <div className="flex flex-col items-start w-full overflow-x-auto" style={{ isolation: 'isolate', minWidth: 'max-content' }}>
          {companies.map((company) => (
            <div
              key={company.id}
              className="flex flex-row items-start w-full"
            >
              <div className="flex flex-col items-start flex-shrink-0" style={{ width: '20px', zIndex: 0 }}>
                <div
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
                </div>
              </div>
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
                </div>
              </div>
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
          ))}
        </div>
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
    )
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={onDragEnd}
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
                padding: '12px 16px',
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
          <div className="flex flex-col items-start flex-shrink-0" style={{ width: '120px', zIndex: 1 }}>
            <div
              className="flex flex-row items-center flex-shrink-0"
              style={{
                width: '120px',
                height: '30px',
                padding: '12px 16px',
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
                padding: '12px 16px',
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
                padding: '12px 16px',
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
                padding: '12px 16px',
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
                padding: '12px 16px',
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
                padding: '12px 16px',
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
                padding: '12px 16px',
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
                padding: '12px 16px',
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

          {/* Spacer Column to fill remaining space */}
          <div className="flex flex-col items-start flex-1" style={{ minWidth: '0', zIndex: 0 }}>
            <div
              className="flex flex-row items-center w-full"
              style={{
                height: '30px',
                background: '#2B2B2B',
                borderBottom: '1px solid #2B2B2B'
              }}
            />
          </div>
        </div>

        {/* Table Body with Sortable Rows */}
        <SortableContext
          items={companies.map(c => c.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="flex flex-col items-start w-full overflow-x-auto" style={{ isolation: 'isolate', minWidth: 'max-content' }}>
            {companies.map((company) => (
              <SortableRow
                key={company.id}
                company={company}
                openStateMenu={openStateMenu}
                openActionMenu={openActionMenu}
                setOpenStateMenu={setOpenStateMenu}
                setOpenActionMenu={setOpenActionMenu}
                updateCompanyState={updateCompanyState}
                onRowClick={onRowClick}
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
  )
}

