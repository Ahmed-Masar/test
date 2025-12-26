'use client'

interface TopNavigationBarProps {
  canGoForward: boolean
  onBackClick: () => void
  onForwardClick: () => void
  onSearchClick: () => void
}

export default function TopNavigationBar({
  canGoForward,
  onBackClick,
  onForwardClick,
  onSearchClick,
}: TopNavigationBarProps) {
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
  )
}

