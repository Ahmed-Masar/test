'use client'

import { useEffect } from 'react'
import type { Company } from './types'

interface CompanyDetailsProps {
  company: Company | null
  isOpen: boolean
  onClose: () => void
}

export default function CompanyDetails({ company, isOpen, onClose }: CompanyDetailsProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  if (!company) return null

  return (
    <>
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-300 z-40 ${
          isOpen ? 'opacity-50' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      <div
        className={`fixed top-0 right-0 h-full w-full md:w-[800px] border-l border-[#2B2B2B] shadow-2xl transition-transform duration-300 ease-in-out z-50 overflow-y-auto ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{
          background: '#0A0A0A'
        }}
      >
        <div
          className="relative h-[200px] w-full"
          style={{
            backgroundImage: 'url(/night-building.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(180deg, rgba(10, 10, 10, 0.4) 0%, rgba(10, 10, 10, 0.95) 100%)'
            }}
          />
          
          <div className="absolute top-0 left-0 right-0 flex items-center justify-between p-4 z-10">
            <div className="flex items-center gap-2">
              <button
                onClick={onClose}
                className="p-2 hover:bg-[rgba(43,43,43,0.5)] rounded-lg transition-colors"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="24" height="24" rx="8" fill="#222222"/>
                  <path d="M15.1425 4.5H8.8575C6.1275 4.5 4.5 6.1275 4.5 8.8575V15.135C4.5 17.8725 6.1275 19.5 8.8575 19.5H15.135C17.865 19.5 19.4925 17.8725 19.4925 15.1425V8.8575C19.5 6.1275 17.8725 4.5 15.1425 4.5ZM11.6475 13.1475L8.8575 15.9375H10.5C10.8075 15.9375 11.0625 16.1925 11.0625 16.5C11.0625 16.8075 10.8075 17.0625 10.5 17.0625H7.5C7.425 17.0625 7.35 17.0475 7.2825 17.0175C7.1475 16.9575 7.035 16.8525 6.975 16.71C6.9525 16.6425 6.9375 16.575 6.9375 16.5V13.5C6.9375 13.1925 7.1925 12.9375 7.5 12.9375C7.8075 12.9375 8.0625 13.1925 8.0625 13.5V15.1425L10.8525 12.3525C11.07 12.135 11.43 12.135 11.6475 12.3525C11.865 12.57 11.865 12.93 11.6475 13.1475ZM17.0625 10.5C17.0625 10.8075 16.8075 11.0625 16.5 11.0625C16.1925 11.0625 15.9375 10.8075 15.9375 10.5V8.8575L13.1475 11.6475C13.035 11.76 12.8925 11.8125 12.75 11.8125C12.6075 11.8125 12.465 11.76 12.3525 11.6475C12.135 11.43 12.135 11.07 12.3525 10.8525L15.1425 8.0625H13.5C13.1925 8.0625 12.9375 7.8075 12.9375 7.5C12.9375 7.1925 13.1925 6.9375 13.5 6.9375H16.5C16.575 6.9375 16.6425 6.9525 16.7175 6.9825C16.8525 7.0425 16.965 7.1475 17.025 7.29C17.0475 7.3575 17.0625 7.425 17.0625 7.5V10.5Z" fill="#999999"/>
                </svg>
              </button>
              <button className="p-2 hover:bg-[rgba(43,43,43,0.5)] rounded-lg transition-colors">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="24" height="24" rx="8" fill="#222222"/>
                  <path d="M14.1675 5.5875H9.83248C9.53248 5.5875 9.29248 5.3475 9.29248 5.0475C9.29248 4.7475 9.53248 4.5 9.83248 4.5H14.1675C14.4675 4.5 14.7075 4.74 14.7075 5.04C14.7075 5.34 14.4675 5.5875 14.1675 5.5875Z" fill="#999999"/>
                  <path d="M13.5001 17.9775V15.7725C13.5001 14.415 14.4151 13.5 15.7726 13.5H17.9776C18.1501 13.5 18.3151 13.515 18.4726 13.545C18.4876 13.365 18.5026 13.185 18.5026 12.9975C18.5026 9.40505 15.5851 6.48755 12.0001 6.48755C8.41506 6.48755 5.49756 9.40505 5.49756 12.9975C5.49756 16.5825 8.41506 19.5 12.0001 19.5C12.6376 19.5 13.2451 19.395 13.8301 19.23C13.6201 18.8775 13.5001 18.4575 13.5001 17.9775ZM12.5626 12.75C12.5626 13.0575 12.3076 13.3125 12.0001 13.3125C11.6926 13.3125 11.4376 13.0575 11.4376 12.75V9.00005C11.4376 8.69255 11.6926 8.43755 12.0001 8.43755C12.3076 8.43755 12.5626 8.69255 12.5626 9.00005V12.75Z" fill="#999999"/>
                  <path d="M17.9775 14.25H15.78C14.82 14.25 14.25 14.82 14.25 15.7725V17.9775C14.25 18.93 14.82 19.5 15.78 19.5H17.9775C18.93 19.5 19.5 18.93 19.5 17.9775V15.7725C19.5 14.82 18.93 14.25 17.9775 14.25ZM16.44 18.045C16.44 18.285 16.245 18.48 15.9975 18.48C15.7575 18.48 15.5625 18.285 15.5625 18.045V15.705C15.5625 15.465 15.7575 15.27 15.9975 15.27C16.245 15.27 16.44 15.465 16.44 15.705V18.045ZM18.1875 18.045C18.1875 18.285 17.9925 18.48 17.7525 18.48C17.5125 18.48 17.31 18.285 17.31 18.045V15.705C17.31 15.465 17.5125 15.27 17.7525 15.27C17.9925 15.27 18.1875 15.465 18.1875 15.705V18.045Z" fill="#999999"/>
                </svg>
              </button>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
            <div className="flex items-center gap-4">
              <div
                className="flex items-center justify-center flex-shrink-0"
                style={{
                  width: '80px',
                  height: '80px',
                  background: 'linear-gradient(135deg, #4A9B7F 0%, #2D7A5F 100%)',
                  borderRadius: '16px'
                }}
              >
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                  <path d="M20 8L12 12L20 16L28 12L20 8Z" fill="white" opacity="0.95"/>
                  <path d="M12 16V24L20 28V20L12 16Z" fill="white" opacity="0.75"/>
                  <path d="M28 16V24L20 28V20L28 16Z" fill="white" opacity="0.55"/>
                </svg>
              </div>
              <div>
                <h2
                  style={{
                    fontFamily: 'SF Pro',
                    fontWeight: 600,
                    fontSize: '28px',
                    lineHeight: '36px',
                    color: '#FBFBFB',
                    marginBottom: '4px'
                  }}
                >
                  {company.companyName}
                </h2>
                <p
                  style={{
                    fontFamily: 'SF Pro',
                    fontWeight: 400,
                    fontSize: '16px',
                    lineHeight: '22px',
                    color: '#999999'
                  }}
                >
                  Software
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6" style={{ background: '#0A0A0A' }}>
          <div className="mb-8">
            <h3
              style={{
                fontFamily: 'SF Pro',
                fontWeight: 600,
                fontSize: '16px',
                lineHeight: '22px',
                color: '#FBFBFB',
                marginBottom: '12px'
              }}
            >
              Description
            </h3>
            <p
              style={{
                fontFamily: 'SF Pro',
                fontWeight: 400,
                fontSize: '14px',
                lineHeight: '22px',
                color: '#999999'
              }}
            >
              {company.companyName} is a software and technology services company focused on delivering digital solutions for businesses. The company provides web development, mobile apps, and enterprise management systems, helping clients improve productivity and streamline operations.
            </p>
          </div>

          <div className="mb-8">
            <h3
              style={{
                fontFamily: 'SF Pro',
                fontWeight: 600,
                fontSize: '16px',
                lineHeight: '22px',
                color: '#FBFBFB',
                marginBottom: '12px'
              }}
            >
              Business Address:
            </h3>
            <div className="flex items-center justify-between">
              <p
                style={{
                  fontFamily: 'SF Pro',
                  fontWeight: 400,
                  fontSize: '14px',
                  lineHeight: '22px',
                  color: '#999999'
                }}
              >
                Iraq - Baghdad - Karada - St 62, Floor 3 Room 12
              </p>
              <button
                className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors"
                style={{
                  background: '#2B2B2B',
                  border: '1px solid #3B3B3B'
                }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14Z" stroke="#FBFBFB" strokeWidth="1.5"/>
                  <path d="M8 5V8H11" stroke="#FBFBFB" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                <span
                  style={{
                    fontFamily: 'SF Pro',
                    fontWeight: 510,
                    fontSize: '13px',
                    lineHeight: '18px',
                    color: '#FBFBFB'
                  }}
                >
                  Google Map
                </span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M6 4L10 8L6 12" stroke="#999999" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>

          <div
            style={{
              width: '100%',
              height: '1px',
              background: '#1E1E1E',
              marginBottom: '32px'
            }}
          />

          <div className="grid grid-cols-2 gap-x-8 gap-y-6 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <circle cx="9" cy="9" r="7" stroke="#666666" strokeWidth="1.5"/>
                  <circle cx="9" cy="9" r="3" fill="#666666"/>
                </svg>
                <span
                  style={{
                    fontFamily: 'SF Pro',
                    fontWeight: 510,
                    fontSize: '13px',
                    lineHeight: '18px',
                    color: '#666666'
                  }}
                >
                  Status
                </span>
              </div>
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg"
                style={{
                  background: company.state === 'Active' ? '#008E5A' : 
                             company.state === 'Not Active' ? '#8E1F00' : '#DC6300'
                }}
              >
                <span
                  style={{
                    fontFamily: 'SF Pro',
                    fontWeight: 510,
                    fontSize: '13px',
                    lineHeight: '18px',
                    color: '#FFFFFF'
                  }}
                >
                  {company.state}
                </span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M6 5L9 8L6 11" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-3">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M4 4H7L8 7L6 8C6.5 9.5 8.5 11.5 10 12L11 10L14 11V14C14 14 11 15 8 12C5 9 4 4 4 4Z" stroke="#666666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span
                  style={{
                    fontFamily: 'SF Pro',
                    fontWeight: 510,
                    fontSize: '13px',
                    lineHeight: '18px',
                    color: '#666666'
                  }}
                >
                  Phone
                </span>
              </div>
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg"
                style={{
                  background: '#0D4A3A',
                  border: '1px solid #0D5A4A'
                }}
              >
                <span
                  style={{
                    fontFamily: 'SF Pro',
                    fontWeight: 510,
                    fontSize: '13px',
                    lineHeight: '18px',
                    color: '#FBFBFB'
                  }}
                >
                  +964
                </span>
                <div
                  style={{
                    width: '1px',
                    height: '14px',
                    background: 'rgba(255, 255, 255, 0.2)'
                  }}
                />
                <span
                  style={{
                    fontFamily: 'SF Pro',
                    fontWeight: 510,
                    fontSize: '13px',
                    lineHeight: '18px',
                    color: '#FBFBFB'
                  }}
                >
                  770 330 620 94
                </span>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-3">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M3 8L9 3L15 8V14C15 14.5523 14.5523 15 14 15H4C3.44772 15 3 14.5523 3 14V8Z" stroke="#666666" strokeWidth="1.5"/>
                </svg>
                <span
                  style={{
                    fontFamily: 'SF Pro',
                    fontWeight: 510,
                    fontSize: '13px',
                    lineHeight: '18px',
                    color: '#666666'
                  }}
                >
                  Tags
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {['test', 'test', 'test'].map((tag, index) => (
                  <div
                    key={index}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md"
                    style={{ background: '#4A3FBF' }}
                  >
                    <span
                      style={{
                        fontFamily: 'SF Pro',
                        fontWeight: 510,
                        fontSize: '12px',
                        lineHeight: '16px',
                        color: '#FFFFFF'
                      }}
                    >
                      {tag}
                    </span>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M9 3L3 9M3 3L9 9" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </div>
                ))}
                <div
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md"
                  style={{ background: '#4A3FBF' }}
                >
                  <span
                    style={{
                      fontFamily: 'SF Pro',
                      fontWeight: 510,
                      fontSize: '12px',
                      lineHeight: '16px',
                      color: '#FFFFFF'
                    }}
                  >
                    +1
                  </span>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-3">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <rect x="2" y="5" width="14" height="10" rx="1" stroke="#666666" strokeWidth="1.5"/>
                  <path d="M2 6L9 10L16 6" stroke="#666666" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                <span
                  style={{
                    fontFamily: 'SF Pro',
                    fontWeight: 510,
                    fontSize: '13px',
                    lineHeight: '18px',
                    color: '#666666'
                  }}
                >
                  Email
                </span>
              </div>
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg"
                style={{
                  background: '#2E2680',
                  border: '1px solid #3E3690'
                }}
              >
                <span
                  style={{
                    fontFamily: 'SF Pro',
                    fontWeight: 510,
                    fontSize: '13px',
                    lineHeight: '18px',
                    color: '#FBFBFB'
                  }}
                >
                  Support@vodex.tech
                </span>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-3">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M4 9H14M4 9L7 6M4 9L7 12" stroke="#666666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span
                  style={{
                    fontFamily: 'SF Pro',
                    fontWeight: 510,
                    fontSize: '13px',
                    lineHeight: '18px',
                    color: '#666666'
                  }}
                >
                  Priority
                </span>
              </div>
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg"
                style={{ background: '#DC2626' }}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M7 3V8M7 10V10.5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                <span
                  style={{
                    fontFamily: 'SF Pro',
                    fontWeight: 510,
                    fontSize: '13px',
                    lineHeight: '18px',
                    color: '#FFFFFF'
                  }}
                >
                  Urgent
                </span>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-3">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <circle cx="7" cy="6" r="2.5" stroke="#666666" strokeWidth="1.5"/>
                  <circle cx="12" cy="7" r="2" stroke="#666666" strokeWidth="1.5"/>
                  <path d="M2 14C2 12 4.5 10 7 10C9.5 10 12 12 12 14" stroke="#666666" strokeWidth="1.5" strokeLinecap="round"/>
                  <path d="M12 14C12 12.5 13.5 11 15 11C16 11 16.5 11.5 16.5 12" stroke="#666666" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                <span
                  style={{
                    fontFamily: 'SF Pro',
                    fontWeight: 510,
                    fontSize: '13px',
                    lineHeight: '18px',
                    color: '#666666'
                  }}
                >
                  Assignees
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div
                  className="flex items-center justify-center"
                  style={{
                    width: '28px',
                    height: '28px',
                    background: '#4A3FBF',
                    borderRadius: '50%',
                    fontFamily: 'SF Pro',
                    fontWeight: 600,
                    fontSize: '11px',
                    color: '#FFFFFF'
                  }}
                >
                  AR
                </div>
                <span
                  style={{
                    fontFamily: 'SF Pro',
                    fontWeight: 510,
                    fontSize: '14px',
                    lineHeight: '20px',
                    color: '#FBFBFB'
                  }}
                >
                  Support
                </span>
              </div>
            </div>
          </div>

          <div
            style={{
              width: '100%',
              height: '1px',
              background: '#1E1E1E',
              marginBottom: '32px'
            }}
          />

          <div className="grid grid-cols-2 gap-x-8 gap-y-6 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <rect x="4" y="4" width="10" height="10" rx="1" stroke="#666666" strokeWidth="1.5"/>
                  <path d="M7 7H11M7 10H9" stroke="#666666" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                <span
                  style={{
                    fontFamily: 'SF Pro',
                    fontWeight: 510,
                    fontSize: '13px',
                    lineHeight: '18px',
                    color: '#666666'
                  }}
                >
                  Type
                </span>
              </div>
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg"
                style={{ background: '#4B5563' }}
              >
                <span
                  style={{
                    fontFamily: 'SF Pro',
                    fontWeight: 510,
                    fontSize: '13px',
                    lineHeight: '18px',
                    color: '#FFFFFF'
                  }}
                >
                  Big Company
                </span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M6 5L9 8L6 11" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-3">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <circle cx="9" cy="9" r="7" stroke="#666666" strokeWidth="1.5"/>
                  <path d="M9 5V9L12 11" stroke="#666666" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                <span
                  style={{
                    fontFamily: 'SF Pro',
                    fontWeight: 510,
                    fontSize: '13px',
                    lineHeight: '18px',
                    color: '#666666'
                  }}
                >
                  Created
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div
                  className="flex items-center justify-center"
                  style={{
                    width: '28px',
                    height: '28px',
                    background: '#4A3FBF',
                    borderRadius: '50%',
                    fontFamily: 'SF Pro',
                    fontWeight: 600,
                    fontSize: '11px',
                    color: '#FFFFFF'
                  }}
                >
                  AR
                </div>
                <span
                  style={{
                    fontFamily: 'SF Pro',
                    fontWeight: 510,
                    fontSize: '14px',
                    lineHeight: '20px',
                    color: '#FBFBFB'
                  }}
                >
                  Support
                </span>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-3">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <circle cx="9" cy="9" r="7" stroke="#666666" strokeWidth="1.5"/>
                  <path d="M3 9H15M9 3C10.5 5 11 7 11 9C11 11 10.5 13 9 15M9 3C7.5 5 7 7 7 9C7 11 7.5 13 9 15" stroke="#666666" strokeWidth="1.5"/>
                </svg>
                <span
                  style={{
                    fontFamily: 'SF Pro',
                    fontWeight: 510,
                    fontSize: '13px',
                    lineHeight: '18px',
                    color: '#666666'
                  }}
                >
                  Website
                </span>
              </div>
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg"
                style={{
                  background: '#1E3A5F',
                  border: '1px solid #2E4A6F'
                }}
              >
                <span
                  style={{
                    fontFamily: 'SF Pro',
                    fontWeight: 510,
                    fontSize: '13px',
                    lineHeight: '18px',
                    color: '#FBFBFB'
                  }}
                >
                  www.ecotrend.com
                </span>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M9 3L3 9M3 3L9 9" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-3">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <rect x="3" y="4" width="12" height="11" rx="1" stroke="#666666" strokeWidth="1.5"/>
                  <path d="M6 2V5M12 2V5M3 7H15" stroke="#666666" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                <span
                  style={{
                    fontFamily: 'SF Pro',
                    fontWeight: 510,
                    fontSize: '13px',
                    lineHeight: '18px',
                    color: '#666666'
                  }}
                >
                  Date
                </span>
              </div>
              <p
                style={{
                  fontFamily: 'SF Pro',
                  fontWeight: 510,
                  fontSize: '14px',
                  lineHeight: '20px',
                  color: '#FBFBFB'
                }}
              >
                2025/12/1 • Sunday
              </p>
            </div>

            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-3">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M15 9C15 12.3137 12.3137 15 9 15C5.68629 15 3 12.3137 3 9C3 5.68629 5.68629 3 9 3C10.2 3 11.32 3.38 12.25 4.03" stroke="#666666" strokeWidth="1.5" strokeLinecap="round"/>
                  <path d="M15 3V6H12" stroke="#666666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span
                  style={{
                    fontFamily: 'SF Pro',
                    fontWeight: 510,
                    fontSize: '13px',
                    lineHeight: '18px',
                    color: '#666666'
                  }}
                >
                  Updated
                </span>
              </div>
              <p
                style={{
                  fontFamily: 'SF Pro',
                  fontWeight: 510,
                  fontSize: '14px',
                  lineHeight: '20px',
                  color: '#FBFBFB'
                }}
              >
                2025/12/1 • 12:29 pm
              </p>
            </div>
          </div>

          <div
            style={{
              width: '100%',
              height: '1px',
              background: '#1E1E1E',
              marginBottom: '32px'
            }}
          />

          <div
            className="p-5 rounded-xl mb-8"
            style={{
              background: '#141414',
              border: '1px solid #1E1E1E'
            }}
          >
            <div className="flex items-start gap-4 mb-5">
              <div
                className="flex items-center justify-center flex-shrink-0"
                style={{
                  width: '48px',
                  height: '48px',
                  background: '#5B4FCF',
                  borderRadius: '50%',
                  fontFamily: 'SF Pro',
                  fontWeight: 600,
                  fontSize: '18px',
                  color: '#FFFFFF'
                }}
              >
                W
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h4
                    style={{
                      fontFamily: 'SF Pro',
                      fontWeight: 600,
                      fontSize: '15px',
                      lineHeight: '20px',
                      color: '#FBFBFB'
                    }}
                  >
                    Wissam Iskender
                  </h4>
                  <span
                    style={{
                      fontFamily: 'SF Pro',
                      fontWeight: 400,
                      fontSize: '13px',
                      lineHeight: '18px',
                      color: '#666666'
                    }}
                  >
                    • Business Owner
                  </span>
                </div>
                <p
                  style={{
                    fontFamily: 'SF Pro',
                    fontWeight: 400,
                    fontSize: '13px',
                    lineHeight: '20px',
                    color: '#999999'
                  }}
                >
                  Wissam Iskender is a software and technology services company focused on delivering digital solutions for businesses. The company provides web development.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-x-6 gap-y-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 3H6L7 6L5 7C5.5 8.5 7.5 10.5 9 11L10 9L13 10V13C13 13 10 14 7 11C4 8 3 3 3 3Z" stroke="#666666" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span
                    style={{
                      fontFamily: 'SF Pro',
                      fontWeight: 510,
                      fontSize: '12px',
                      lineHeight: '16px',
                      color: '#666666'
                    }}
                  >
                    Phone
                  </span>
                </div>
                <p
                  style={{
                    fontFamily: 'SF Pro',
                    fontWeight: 510,
                    fontSize: '13px',
                    lineHeight: '18px',
                    color: '#FBFBFB'
                  }}
                >
                  +964 770 330 620 94
                </p>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M8 2C5.79 2 4 3.79 4 6C4 8.21 5.79 10 8 10C10.21 10 12 8.21 12 6C12 3.79 10.21 2 8 2Z" stroke="#666666" strokeWidth="1.3"/>
                    <path d="M4 13C4 11 6 9 8 9C10 9 12 11 12 13" stroke="#666666" strokeWidth="1.3" strokeLinecap="round"/>
                  </svg>
                  <span
                    style={{
                      fontFamily: 'SF Pro',
                      fontWeight: 510,
                      fontSize: '12px',
                      lineHeight: '16px',
                      color: '#666666'
                    }}
                  >
                    Home
                  </span>
                </div>
                <p
                  style={{
                    fontFamily: 'SF Pro',
                    fontWeight: 510,
                    fontSize: '13px',
                    lineHeight: '18px',
                    color: '#FBFBFB'
                  }}
                >
                  Iraq Baghdad Karada St.30
                </p>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <rect x="2" y="4" width="12" height="9" rx="1" stroke="#666666" strokeWidth="1.3"/>
                    <path d="M2 5L8 9L14 5" stroke="#666666" strokeWidth="1.3" strokeLinecap="round"/>
                  </svg>
                  <span
                    style={{
                      fontFamily: 'SF Pro',
                      fontWeight: 510,
                      fontSize: '12px',
                      lineHeight: '16px',
                      color: '#666666'
                    }}
                  >
                    Email
                  </span>
                </div>
                <p
                  style={{
                    fontFamily: 'SF Pro',
                    fontWeight: 510,
                    fontSize: '13px',
                    lineHeight: '18px',
                    color: '#FBFBFB'
                  }}
                >
                  Support@vodex.tech
                </p>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <rect x="3" y="3" width="10" height="10" rx="1" stroke="#666666" strokeWidth="1.3"/>
                    <path d="M5 2V4M11 2V4M3 6H13" stroke="#666666" strokeWidth="1.3" strokeLinecap="round"/>
                  </svg>
                  <span
                    style={{
                      fontFamily: 'SF Pro',
                      fontWeight: 510,
                      fontSize: '12px',
                      lineHeight: '16px',
                      color: '#666666'
                    }}
                  >
                    First Contact
                  </span>
                </div>
                <p
                  style={{
                    fontFamily: 'SF Pro',
                    fontWeight: 510,
                    fontSize: '13px',
                    lineHeight: '18px',
                    color: '#FBFBFB'
                  }}
                >
                  2025/12/1 • Sunday
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3
              style={{
                fontFamily: 'SF Pro',
                fontWeight: 600,
                fontSize: '16px',
                lineHeight: '22px',
                color: '#FBFBFB',
                marginBottom: '16px'
              }}
            >
              Projects
            </h3>
            <div
              className="rounded-xl overflow-hidden"
              style={{
                background: '#141414',
                border: '1px solid #1E1E1E'
              }}
            >
              <div
                className="grid gap-4 px-5 py-3"
                style={{
                  gridTemplateColumns: '140px 100px 120px 140px 60px',
                  background: '#0A0A0A',
                  borderBottom: '1px solid #1E1E1E'
                }}
              >
                {['Projects', 'States', 'Total Amount', 'Start → End', 'Actions'].map((header) => (
                  <span
                    key={header}
                    style={{
                      fontFamily: 'SF Pro',
                      fontWeight: 510,
                      fontSize: '12px',
                      lineHeight: '16px',
                      color: '#666666'
                    }}
                  >
                    {header}
                  </span>
                ))}
              </div>

              {[1, 2, 3].map((_, index) => (
                <div
                  key={index}
                  className="grid gap-4 px-5 py-4 hover:bg-[#0F0F0F] transition-colors"
                  style={{
                    gridTemplateColumns: '140px 100px 120px 140px 60px',
                    borderBottom: index < 2 ? '1px solid #1E1E1E' : 'none'
                  }}
                >
                  <div className="flex items-center gap-2">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M10 4L6 6L10 8L14 6L10 4Z" fill="#4A9B7F"/>
                      <path d="M6 8V12L10 14V10L6 8Z" fill="#4A9B7F" opacity="0.7"/>
                      <path d="M14 8V12L10 14V10L14 8Z" fill="#4A9B7F" opacity="0.5"/>
                    </svg>
                    <span
                      style={{
                        fontFamily: 'SF Pro',
                        fontWeight: 510,
                        fontSize: '13px',
                        lineHeight: '18px',
                        color: '#FBFBFB'
                      }}
                    >
                      {company.companyName}
                    </span>
                  </div>
                  <div
                    className="inline-flex items-center gap-2 px-2.5 py-1.5 rounded-lg w-fit"
                    style={{ background: '#DC6300' }}
                  >
                    <span
                      style={{
                        fontFamily: 'SF Pro',
                        fontWeight: 510,
                        fontSize: '12px',
                        lineHeight: '16px',
                        color: '#FFFFFF'
                      }}
                    >
                      Pending
                    </span>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M5 4L8 7L5 10" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span
                    style={{
                      fontFamily: 'SF Pro',
                      fontWeight: 510,
                      fontSize: '13px',
                      lineHeight: '18px',
                      color: '#FBFBFB'
                    }}
                  >
                    4,000,000
                  </span>
                  <span
                    style={{
                      fontFamily: 'SF Pro',
                      fontWeight: 510,
                      fontSize: '13px',
                      lineHeight: '18px',
                      color: '#FBFBFB'
                    }}
                  >
                    25/12/1 → 25/12/13
                  </span>
                  <button className="flex items-center justify-center w-8 h-8 hover:bg-[#1E1E1E] rounded-lg transition-colors">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <circle cx="8" cy="4" r="1.5" fill="#666666"/>
                      <circle cx="8" cy="8" r="1.5" fill="#666666"/>
                      <circle cx="8" cy="12" r="1.5" fill="#666666"/>
                    </svg>
                  </button>
                </div>
              ))}

              <button
                className="flex items-center gap-2 px-5 py-4 w-full hover:bg-[#0F0F0F] transition-colors"
              >
                <span
                  style={{
                    fontFamily: 'SF Pro',
                    fontWeight: 510,
                    fontSize: '13px',
                    lineHeight: '18px',
                    color: '#666666'
                  }}
                >
                  Add new+
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
