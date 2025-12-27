'use client'

import React, { useEffect, useState } from 'react'

interface ActivityLogProps {
  isOpen: boolean
  onClose: () => void
}

interface Activity {
  id: number
  type: 'comment' | 'event' | 'status'
  user?: string
  avatar?: string
  time: string
  content: string
  fromStatus?: string
  toStatus?: string
}

export default function ActivityLog({ isOpen, onClose }: ActivityLogProps) {
  const [isMounted, setIsMounted] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setIsMounted(true)
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsAnimating(true)
        })
      })
    } else {
      setIsAnimating(false)
      const timer = setTimeout(() => {
        setIsMounted(false)
      }, 350)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  if (!isMounted) return null
  
  const activities: Activity[] = [
    {
      id: 1,
      type: 'comment',
      user: 'Ali Radhi',
      avatar: 'AR',
      time: 'Nov 15 at 1:55 pm',
      content: 'the idiots at cloudflare started to move to Rust, and took down the internet with it',
    },
    {
      id: 2,
      type: 'event',
      content: 'Ali Radhi Created this task',
      time: 'Nov 15 at 1:30 pm',
    },
    {
      id: 3,
      type: 'status',
      content: 'You changed from Approved → Not Approved',
      fromStatus: 'Approved',
      toStatus: 'Not Approved',
      time: '2 minutes ago',
    },
    {
      id: 4,
      type: 'comment',
      user: 'Ali Radhi',
      avatar: 'AR',
      time: 'Nov 15 at 1:55 pm',
      content: 'the idiots at cloudflare started to move to Rust, and took down the internet with it',
    },
    {
      id: 5,
      type: 'event',
      content: 'Ali Radhi Created this task',
      time: 'Nov 15 at 1:30 pm',
    },
    {
      id: 6,
      type: 'comment',
      user: 'Ali Radhi',
      avatar: 'AR',
      time: 'Nov 15 at 1:55 pm',
      content: 'the idiots at cloudflare started to move to Rust, and took down the internet with it',
    },
    {
      id: 7,
      type: 'event',
      content: 'Lattef Ahmed add 19 item to (Store test A)',
      time: 'Nov 15 at 1:30 pm',
    },
    {
      id: 8,
      type: 'status',
      content: 'You changed from Approved → Not Approved',
      fromStatus: 'Approved',
      toStatus: 'Not Approved',
      time: '2 minutes ago',
    },
    {
      id: 9,
      type: 'comment',
      user: 'Ali Radhi',
      avatar: 'AR',
      time: 'Nov 15 at 1:55 pm',
      content: 'the idiots at cloudflare started to move to Rust, and took down the internet with it',
    },
  ]

  return (
    <>
      {/* Overlay - Transparent for click outside */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          top: '34px',
          left: 0,
          width: 'calc(100vw - 365px - 16px)',
          height: 'calc(100vh - 34px)',
          backgroundColor: 'transparent',
          zIndex: 999,
          opacity: isAnimating ? 1 : 0,
          transition: 'opacity 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
          pointerEvents: isAnimating ? 'auto' : 'none',
        }}
      />
      
      {/* Activity Log Panel */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'fixed',
          top: '34px',
          right: '16px',
          width: '365px',
          height: 'calc(100vh - 34px)',
          backgroundColor: '#0F0F0F',
          display: 'flex',
          flexDirection: 'column',
          fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
          zIndex: 1000,
          transform: isAnimating ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
          boxShadow: '-4px 0 24px rgba(0, 0, 0, 0.5)',
          border: '1px solid #1A1A1A',
          borderRight: '1px solid #1A1A1A',
          borderTopLeftRadius: '12px',
          borderBottomLeftRadius: '12px',
          borderTopRightRadius: '12px',
          borderBottomRightRadius: '12px',
          willChange: 'transform',
          overflow: 'hidden',
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '16px 20px',
            borderBottom: '1px solid #1A1A1A',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            backgroundColor: '#0F0F0F',
          }}
        >
          <button
            onClick={onClose}
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: 'transparent',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'background-color 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#1A1A1A')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
          >
            <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="26" height="26" rx="13" fill="#393939"/>
              <path d="M10.1716 15.8284L15.8285 10.1715" stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M15.8285 15.8285L10.1716 10.1716" stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <h2
            style={{
              fontSize: '16px',
              fontWeight: '510',
              color: '#FFFFFF',
              margin: 0,
              letterSpacing: '0.005em',
            }}
          >
            Activity log
          </h2>
        </div>

        {/* Activity List */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '16px 8px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          {activities.map((activity) => {
            if (activity.type === 'comment') {
              return (
                <div
                  key={activity.id}
                  style={{
                    backgroundColor: '#111111',
                    borderRadius: '12px',
                    padding: '14px 16px',
                    border: '1px solid #1A1A1A',
                  }}
                >
                  <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
                    <div
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        backgroundColor: '#5842C8',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#FFFFFF',
                        fontSize: '13px',
                        fontWeight: '510',
                        flexShrink: 0,
                        position: 'relative',
                      }}
                    >
                      {activity.avatar}
                      <div
                        style={{
                          position: 'absolute',
                          bottom: '-2px',
                          right: '-2px',
                          width: '10px',
                          height: '10px',
                          backgroundColor: '#36BA7A',
                          border: '2px solid #141414',
                          borderRadius: '50%',
                        }}
                      />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          marginBottom: '6px',
                        }}
                      >
                        <span
                          style={{
                            color: '#FFFFFF',
                            fontSize: '13px',
                            fontWeight: '510',
                            letterSpacing: '0.005em',
                          }}
                        >
                          {activity.user}
                        </span>
                        <span
                          style={{
                            color: '#666666',
                            fontSize: '12px',
                            fontWeight: '400',
                          }}
                        >
                          {activity.time}
                        </span>
                      </div>
                      <p
                        style={{
                          color: '#CCCCCC',
                          fontSize: '13px',
                          margin: 0,
                          lineHeight: '1.5',
                          fontWeight: '400',
                        }}
                      >
                        {activity.content}
                      </p>
                    </div>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0px',
                      paddingTop: '10px',
                      borderTop: '1px solid #1A1A1A',
                    }}
                  >
                    <button
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#666666',
                        cursor: 'pointer',
                        padding: '0px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '32px',
                        height: '32px',
                        transition: 'color 0.2s',
                        marginRight: '2px',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = '#666666')}
                    >
                      <svg width="24" height="24" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.19507 13.245V8.16499C8.19507 7.96499 8.25507 7.76999 8.36507 7.60499L9.73007 5.57499C9.94507 5.24999 10.4801 5.01999 10.9351 5.18999C11.4251 5.35499 11.7501 5.90499 11.6451 6.39499L11.3851 8.02999C11.3651 8.17999 11.4051 8.31499 11.4901 8.41999C11.5751 8.51499 11.7001 8.57499 11.8351 8.57499H13.8901C14.2851 8.57499 14.6251 8.73499 14.8251 9.01499C15.0151 9.28499 15.0501 9.63499 14.9251 9.98999L13.6951 13.735C13.5401 14.355 12.8651 14.86 12.1951 14.86H10.2451C9.91007 14.86 9.44007 14.745 9.22507 14.53L8.58507 14.035C8.34007 13.85 8.19507 13.555 8.19507 13.245Z" fill="currentColor"/>
                        <path d="M6.605 7.18994H6.09C5.315 7.18994 5 7.48994 5 8.22994V13.2599C5 13.9999 5.315 14.2999 6.09 14.2999H6.605C7.38 14.2999 7.695 13.9999 7.695 13.2599V8.22994C7.695 7.48994 7.38 7.18994 6.605 7.18994Z" fill="currentColor"/>
                      </svg>
                    </button>
                    <button
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#666666',
                        cursor: 'pointer',
                        padding: '0px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '32px',
                        height: '32px',
                        transition: 'color 0.2s',
                        marginRight: '2px',
                        position: 'relative',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = '#EF4444')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = '#666666')}
                    >
                      <div
                        style={{
                          position: 'absolute',
                          right: '0',
                          top: '8px',
                          bottom: '8px',
                          width: '1px',
                          backgroundColor: '#1A1A1A',
                        }}
                      />
                      <svg width="24" height="24" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.22 5.55005C11.315 5.55005 10.505 5.99005 10 6.66505C9.495 5.99005 8.685 5.55005 7.78 5.55005C6.245 5.55005 5 6.80005 5 8.34505C5 8.94005 5.095 9.49005 5.26 10C6.05 12.5 8.485 13.995 9.69 14.405C9.86 14.465 10.14 14.465 10.31 14.405C11.515 13.995 13.95 12.5 14.74 10C14.905 9.49005 15 8.94005 15 8.34505C15 6.80005 13.755 5.55005 12.22 5.55005Z" fill="currentColor"/>
                      </svg>
                    </button>
                    <button
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#666666',
                        cursor: 'pointer',
                        fontSize: '12px',
                        marginLeft: 'auto',
                        padding: '4px 8px',
                        transition: 'color 0.2s',
                        fontWeight: '400',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = '#666666')}
                    >
                      Reply
                    </button>
                  </div>
                </div>
              )
            }

            if (activity.type === 'event') {
              return (
                <div
                  key={activity.id}
                  style={{
                    display: 'flex',
                    gap: '10px',
                    alignItems: 'flex-start',
                    paddingLeft: '4px',
                  }}
                >
                  <div
                    style={{
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      backgroundColor: '#1A1A1A',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      marginTop: '2px',
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7.44507 1.725H4.55507C4.35507 1.725 4.19507 1.565 4.19507 1.365C4.19507 1.165 4.35507 1 4.55507 1H7.44507C7.64507 1 7.80507 1.16 7.80507 1.36C7.80507 1.56 7.64507 1.725 7.44507 1.725Z" fill="#999999"/>
                      <path d="M7.00004 9.98495V8.51495C7.00004 7.60995 7.61004 6.99995 8.51504 6.99995H9.98504C10.1 6.99995 10.21 7.00995 10.315 7.02995C10.325 6.90995 10.335 6.78995 10.335 6.66495C10.335 4.26995 8.39004 2.32495 6.00004 2.32495C3.61004 2.32495 1.66504 4.26995 1.66504 6.66495C1.66504 9.05495 3.61004 11 6.00004 11C6.42504 11 6.83004 10.93 7.22004 10.82C7.08004 10.585 7.00004 10.305 7.00004 9.98495ZM6.37504 6.49995C6.37504 6.70495 6.20504 6.87495 6.00004 6.87495C5.79504 6.87495 5.62504 6.70495 5.62504 6.49995V3.99995C5.62504 3.79495 5.79504 3.62495 6.00004 3.62495C6.20504 3.62495 6.37504 3.79495 6.37504 3.99995V6.49995Z" fill="#999999"/>
                      <path d="M9.985 7.5H8.52C7.88 7.5 7.5 7.88 7.5 8.515V9.985C7.5 10.62 7.88 11 8.52 11H9.985C10.62 11 11 10.62 11 9.985V8.515C11 7.88 10.62 7.5 9.985 7.5ZM8.96 10.03C8.96 10.19 8.83 10.32 8.665 10.32C8.505 10.32 8.375 10.19 8.375 10.03V8.47C8.375 8.31 8.505 8.18 8.665 8.18C8.83 8.18 8.96 8.31 8.96 8.47V10.03ZM10.125 10.03C10.125 10.19 9.995 10.32 9.835 10.32C9.675 10.32 9.54 10.19 9.54 10.03V8.47C9.54 8.31 9.675 8.18 9.835 8.18C9.995 8.18 10.125 8.31 10.125 8.47V10.03Z" fill="#999999"/>
                    </svg>
                  </div>
                  <div
                    style={{
                      flex: 1,
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: '12px',
                    }}
                  >
                    <span
                      style={{
                        color: '#999999',
                        fontSize: '12px',
                        fontWeight: '400',
                      }}
                    >
                      {activity.content}
                    </span>
                    <span
                      style={{
                        color: '#666666',
                        fontSize: '11px',
                        flexShrink: 0,
                        fontWeight: '400',
                      }}
                    >
                      {activity.time}
                    </span>
                  </div>
                </div>
              )
            }

            if (activity.type === 'status') {
              return (
                <div
                  key={activity.id}
                  style={{
                    display: 'flex',
                    gap: '10px',
                    alignItems: 'flex-start',
                    paddingLeft: '4px',
                  }}
                >
                  <div
                    style={{
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      backgroundColor: '#1A1A1A',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      marginTop: '2px',
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7.44507 1.725H4.55507C4.35507 1.725 4.19507 1.565 4.19507 1.365C4.19507 1.165 4.35507 1 4.55507 1H7.44507C7.64507 1 7.80507 1.16 7.80507 1.36C7.80507 1.56 7.64507 1.725 7.44507 1.725Z" fill="#999999"/>
                      <path d="M7.00004 9.98495V8.51495C7.00004 7.60995 7.61004 6.99995 8.51504 6.99995H9.98504C10.1 6.99995 10.21 7.00995 10.315 7.02995C10.325 6.90995 10.335 6.78995 10.335 6.66495C10.335 4.26995 8.39004 2.32495 6.00004 2.32495C3.61004 2.32495 1.66504 4.26995 1.66504 6.66495C1.66504 9.05495 3.61004 11 6.00004 11C6.42504 11 6.83004 10.93 7.22004 10.82C7.08004 10.585 7.00004 10.305 7.00004 9.98495ZM6.37504 6.49995C6.37504 6.70495 6.20504 6.87495 6.00004 6.87495C5.79504 6.87495 5.62504 6.70495 5.62504 6.49995V3.99995C5.62504 3.79495 5.79504 3.62495 6.00004 3.62495C6.20504 3.62495 6.37504 3.79495 6.37504 3.99995V6.49995Z" fill="#999999"/>
                      <path d="M9.985 7.5H8.52C7.88 7.5 7.5 7.88 7.5 8.515V9.985C7.5 10.62 7.88 11 8.52 11H9.985C10.62 11 11 10.62 11 9.985V8.515C11 7.88 10.62 7.5 9.985 7.5ZM8.96 10.03C8.96 10.19 8.83 10.32 8.665 10.32C8.505 10.32 8.375 10.19 8.375 10.03V8.47C8.375 8.31 8.505 8.18 8.665 8.18C8.83 8.18 8.96 8.31 8.96 8.47V10.03ZM10.125 10.03C10.125 10.19 9.995 10.32 9.835 10.32C9.675 10.32 9.54 10.19 9.54 10.03V8.47C9.54 8.31 9.675 8.18 9.835 8.18C9.995 8.18 10.125 8.31 10.125 8.47V10.03Z" fill="#999999"/>
                    </svg>
                  </div>
                  <div
                    style={{
                      flex: 1,
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                      gap: '8px',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        flexWrap: 'wrap',
                      }}
                    >
                      <span
                        style={{
                          color: '#999999',
                          fontSize: '12px',
                          fontWeight: '400',
                        }}
                      >
                        You changed from
                      </span>
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          color: '#999999',
                          fontSize: '12px',
                          fontWeight: '400',
                        }}
                      >
                        <span
                          style={{
                            width: '6px',
                            height: '6px',
                            borderRadius: '50%',
                            backgroundColor: '#EAB308',
                            flexShrink: 0,
                          }}
                        />
                        {activity.fromStatus}
                      </span>
                      <span
                        style={{
                          color: '#666666',
                          fontSize: '12px',
                          fontWeight: '400',
                        }}
                      >
                        →
                      </span>
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          color: '#999999',
                          fontSize: '12px',
                          fontWeight: '400',
                        }}
                      >
                        <span
                          style={{
                            width: '6px',
                            height: '6px',
                            borderRadius: '50%',
                            backgroundColor: '#EF4444',
                            flexShrink: 0,
                          }}
                        />
                        {activity.toStatus}
                      </span>
                    </div>
                    <span
                      style={{
                        color: '#666666',
                        fontSize: '11px',
                        flexShrink: 0,
                        fontWeight: '400',
                      }}
                    >
                      {activity.time}
                    </span>
                  </div>
                </div>
              )
            }

            return null
          })}
        </div>

        {/* Comment Input */}
        <div
          style={{
            padding: '16px 8px',
            backgroundColor: '#0F0F0F',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: '12px',
              backgroundColor: '#111111',
              borderRadius: '8px',
              padding: '12px 6px 8px',
              border: '1px solid #2A2A2A',
              width: '100%',
              boxSizing: 'border-box',
            }}
          >
            <input
              type="text"
              placeholder="Write a comment..."
              style={{
                backgroundColor: 'transparent',
                border: 'none',
                outline: 'none',
                color: '#999999',
                fontSize: '12px',
                fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
                fontWeight: '510',
                width: '100%',
                height: '16px',
                lineHeight: '16px',
                letterSpacing: '0.005em',
                boxSizing: 'border-box',
              }}
            />
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '22px',
                width: '100%',
                height: '22px',
                boxSizing: 'border-box',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
            <button
              style={{
                background: 'none',
                border: 'none',
                color: '#666666',
                cursor: 'pointer',
                padding: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '28px',
                height: '28px',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#666666')}
            >
              <svg width="20" height="20" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="22" height="22" rx="11" fill="#393939"/>
                <path d="M7.5 11H14.5" stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M11 14.5V7.5" stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button
              style={{
                background: 'none',
                border: 'none',
                color: '#666666',
                cursor: 'pointer',
                padding: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '28px',
                height: '28px',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#666666')}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.5349 11.12C13.3899 11.265 13.1599 11.265 13.0199 11.12C12.8749 10.975 12.8749 10.745 13.0199 10.605C14.0199 9.60505 14.0199 7.98005 13.0199 6.98505C12.0199 5.99005 10.3949 5.98505 9.39989 6.98505C8.40489 7.98505 8.39989 9.61005 9.39989 10.605C9.54489 10.75 9.54489 10.98 9.39989 11.12C9.25489 11.265 9.02489 11.265 8.88489 11.12C7.59989 9.83505 7.59989 7.74505 8.88489 6.46505C10.1699 5.18505 12.2599 5.18005 13.5399 6.46505C14.8199 7.75005 14.8199 9.83505 13.5349 11.12Z" fill="currentColor"/>
                <path d="M6.46511 8.87999C6.61011 8.73499 6.84011 8.73499 6.98011 8.87999C7.12511 9.02499 7.12511 9.25499 6.98011 9.39499C5.98011 10.395 5.98011 12.02 6.98011 13.015C7.98011 14.01 9.60511 14.015 10.6001 13.015C11.5951 12.015 11.6001 10.39 10.6001 9.39499C10.4551 9.24999 10.4551 9.01999 10.6001 8.87999C10.7451 8.73499 10.9751 8.73499 11.1151 8.87999C12.4001 10.165 12.4001 12.255 11.1151 13.535C9.83011 14.815 7.74011 14.82 6.46011 13.535C5.18011 12.25 5.18011 10.165 6.46511 8.87999Z" fill="currentColor"/>
              </svg>
            </button>
            <button
              style={{
                background: 'none',
                border: 'none',
                color: '#666666',
                cursor: 'pointer',
                padding: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '28px',
                height: '28px',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#666666')}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.5 15H11.5C14 15 15 14 15 11.5V8.5C15 6 14 5 11.5 5H8.5C6 5 5 6 5 8.5V11.5C5 14 6 15 8.5 15Z" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8.5 9C9.05228 9 9.5 8.55228 9.5 8C9.5 7.44772 9.05228 7 8.5 7C7.94772 7 7.5 7.44772 7.5 8C7.5 8.55228 7.94772 9 8.5 9Z" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M5.33496 13.475L7.79996 11.82C8.19496 11.555 8.76496 11.585 9.11996 11.89L9.28496 12.035C9.67496 12.37 10.305 12.37 10.695 12.035L12.775 10.25C13.165 9.91503 13.795 9.91503 14.185 10.25L15 10.95" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button
              style={{
                background: 'none',
                border: 'none',
                color: '#666666',
                cursor: 'pointer',
                padding: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '28px',
                height: '28px',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#666666')}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.0999 9.90011L9.39493 10.6051C9.00493 10.9951 9.00493 11.6301 9.39493 12.0201C9.78493 12.4101 10.4199 12.4101 10.8099 12.0201L11.92 10.9101C12.6999 10.1301 12.6999 8.86512 11.92 8.08012C11.14 7.30012 9.87493 7.30012 9.08993 8.08012L7.87994 9.29011C7.20994 9.96011 7.20994 11.0451 7.87994 11.7151" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8.5 15H11.5C14 15 15 14 15 11.5V8.5C15 6 14 5 11.5 5H8.5C6 5 5 6 5 8.5V11.5C5 14 6 15 8.5 15Z" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
              </div>
              <button
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  backgroundColor: '#00A2FF',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s',
                  marginLeft: 'auto',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#0088CC')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#00A2FF')}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13.0349 8.25507L8.75489 6.11507C5.87989 4.67507 4.69989 5.85507 6.13989 8.73007L6.57489 9.60007C6.69989 9.85507 6.69989 10.1501 6.57489 10.4051L6.13989 11.2701C4.69989 14.1451 5.87489 15.3251 8.75489 13.8851L13.0349 11.7451C14.9549 10.7851 14.9549 9.21507 13.0349 8.25507ZM11.4199 10.3751H8.71989C8.51489 10.3751 8.34489 10.2051 8.34489 10.0001C8.34489 9.79507 8.51489 9.62507 8.71989 9.62507H11.4199C11.6249 9.62507 11.7949 9.79507 11.7949 10.0001C11.7949 10.2051 11.6249 10.3751 11.4199 10.3751Z" fill="white"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}