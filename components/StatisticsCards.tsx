'use client'

export default function StatisticsCards() {
  return (
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
  )
}

