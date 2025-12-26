'use client'

export default function Sidebar() {
  return (
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
  )
}

