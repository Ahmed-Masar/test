'use client'

interface SearchAndActionsProps {
  searchQuery: string
  onSearchChange: (value: string) => void
  onNewCompanyClick?: () => void
}

export default function SearchAndActions({ searchQuery, onSearchChange, onNewCompanyClick }: SearchAndActionsProps) {
  return (
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
                onChange={(e) => onSearchChange(e.target.value)}
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
              onClick={onNewCompanyClick}
              style={{
                minWidth: '32px',
                width: 'auto',
                height: '32px',
                padding: '4px 12px',
                gap: '5px',
                background: '#2B2B2B',
                borderRadius: '14px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#353535'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#2B2B2B'
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
  )
}

