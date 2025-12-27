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
        className={`fixed top-0 right-0 h-full w-full md:w-[600px] border-l border-[#2B2B2B] shadow-2xl transition-transform duration-300 ease-in-out z-50 overflow-y-auto ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{
          background: '#111111',
          boxShadow: '-5px 5px 20px rgba(0, 0, 0, 0.55)',
          borderRadius: '0px 8px 8px 0px'
        }}
      >
        <div
          className="relative h-[200px] w-full"
          style={{
            backgroundImage: 'url(/Frame 324.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 50%, #000000 100%)',
              borderBottom: '1px solid #2B2B2B'
            }}
          />
          <div
            className="absolute bottom-0 left-[17px] flex flex-row justify-center items-center gap-3 z-10"
            style={{
              paddingBottom: '17px'
            }}
          >
            <div
              className="flex-shrink-0"
              style={{
                width: '70px',
                height: '70px',
                borderRadius: '14.8248px',
                overflow: 'hidden'
              }}
            >
              <img
                src="/Frame 312.png"
                alt={company.companyName}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            </div>
            <div className="flex flex-col items-start gap-[3px]">
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
                {company.companyName}
              </span>
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
                Software
              </span>
            </div>
          </div>
        </div>

        <div
          className="flex flex-col items-center px-[17px] pt-[22px] pb-6 gap-[22px]"
          style={{ background: '#111111' }}
        >

          <div className="flex flex-col items-center w-full gap-[22px]">
            <div className="flex flex-col items-start w-full gap-1">
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
                Description
              </span>
              <p
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
                {company.companyName} is a software and technology services company focused on delivering digital solutions for businesses. The company provides web development, mobile apps, and enterprise management systems, helping clients improve productivity and streamline operations.
              </p>
            </div>

            <div className="flex flex-col items-start w-full gap-0">
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
                Business Address:
              </span>
              <div className="flex flex-row items-center w-full gap-1 mt-1">
                <span
                  style={{
                    fontFamily: 'SF Pro',
                    fontStyle: 'normal',
                    fontWeight: 510,
                    fontSize: '12px',
                    lineHeight: '16px',
                    letterSpacing: '0.005em',
                    color: '#999999',
                    flex: 1
                  }}
                >
                  {company.address || 'Iraq - Baghdad - Karada - St 62. Floor 3 Room 12'}
                </span>
                <div
                  className="flex flex-row items-center px-[9px] py-[5px] gap-1"
                  style={{
                    background: '#676767',
                    borderRadius: '8px'
                  }}
                >
                  <div className="flex flex-row justify-center items-center px-[6px] gap-[10px]">
                    <div className="flex flex-row justify-center items-center gap-[6px]">
                      <img
                        src="/icon compan/Location.svg"
                        alt="Location"
                        style={{ width: '12px', height: '12px' }}
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
                        Google Map
                      </span>
                    </div>
                  </div>
                  <div
                    style={{
                      width: '20px',
                      height: '0px',
                      border: '0.8px solid rgba(30, 30, 30, 0.5)',
                      transform: 'rotate(90deg)'
                    }}
                  />
                  <img
                    src="/icon compan/Essential.svg"
                    alt="Arrow"
                    style={{ width: '10px', height: '10px', transform: 'rotate(-90deg)' }}
                  />
                </div>
              </div>
            </div>

            <div
              style={{
                width: '100%',
                height: '0px',
                border: '1px solid #2B2B2B'
              }}
            />

            <div className="flex flex-row items-center w-full gap-[8.09px]">
              <div className="flex flex-row items-center gap-[4.04px]">
                <div className="flex flex-col items-start gap-[10.11px]">
                  <div className="flex flex-row items-center gap-[2.02px]">
                    <div
                      className="flex flex-row justify-center items-center p-[4.04263px] gap-[8.09px]"
                      style={{
                        borderRadius: '8.08526px'
                      }}
                    >
                      <img
                        src="/icon compan/Essential1.svg"
                        alt="Status"
                        style={{ width: '14.15px', height: '14.15px' }}
                      />
                    </div>
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
                      Status
                    </span>
                  </div>
                  <div className="flex flex-row items-center gap-[2.02px]">
                    <div
                      className="flex flex-row justify-center items-center p-[4.04263px] gap-[8.09px]"
                      style={{
                        borderRadius: '8.08526px'
                      }}
                    >
                      <img
                        src="/icon compan/Money.svg"
                        alt="Tags"
                        style={{ width: '12.94px', height: '12.94px' }}
                      />
                    </div>
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
                      Tags
                    </span>
                  </div>
                  <div className="flex flex-row items-center gap-[2.02px]">
                    <div
                      className="flex flex-row justify-center items-center p-[4.04263px] gap-[8.09px]"
                      style={{
                        borderRadius: '8.08526px'
                      }}
                    >
                      <img
                        src="/icon compan/Essential2.svg"
                        alt="Priority"
                        style={{ width: '12.13px', height: '12.13px' }}
                      />
                    </div>
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
                      Priority
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-start gap-[10.11px]">
                  <div
                    className="flex flex-row items-center px-[9.09591px] py-[5.05329px] gap-[4.04px]"
                    style={{
                      borderRadius: '8.08526px'
                    }}
                  >
                    <div
                      className="flex flex-col justify-center items-center px-[6.06394px] gap-[10.11px]"
                      style={{
                        background: '#DC6300',
                        borderRadius: '6.06394px'
                      }}
                    >
                      <div className="flex flex-row justify-center items-center gap-[6.06px]">
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
                          {company.state || 'Pending'}
                        </span>
                      </div>
                    </div>
                    <div
                      style={{
                        width: '20.21px',
                        height: '0px',
                        border: '0.808526px solid rgba(30, 30, 30, 0.5)',
                        transform: 'rotate(90deg)'
                      }}
                    />
                    <img
                      src="/icon compan/Essential.svg"
                      alt="Arrow"
                      style={{ width: '10.11px', height: '10.11px', transform: 'rotate(-90deg)' }}
                    />
                  </div>
                  <div
                    className="flex flex-row items-center px-[9.09591px] py-[5.05329px] gap-[4.04px]"
                    style={{
                      borderRadius: '6.06394px'
                    }}
                  >
                    <div
                      className="flex flex-row justify-center items-center p-[6.06394px] gap-[4.04px]"
                      style={{
                        background: 'rgba(88, 66, 200, 0.5)',
                        borderRadius: '3.03197px'
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
                          color: '#FFFFFF'
                        }}
                      >
                        test
                      </span>
                      <div
                        className="flex flex-row justify-center items-center p-[3.03197px] px-[6.06394px] gap-[4.04px]"
                        style={{
                          borderRadius: '8.08526px'
                        }}
                      >
                        <img
                          src="/icon compan/Essential.svg"
                          alt="Remove"
                          style={{ width: '10.11px', height: '10.11px' }}
                        />
                      </div>
                    </div>
                    <div
                      className="flex flex-row justify-center items-center p-[6.06394px] gap-[4.04px]"
                      style={{
                        background: 'rgba(88, 66, 200, 0.5)',
                        borderRadius: '3.03197px'
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
                          color: '#FFFFFF'
                        }}
                      >
                        test
                      </span>
                      <div
                        className="flex flex-row justify-center items-center p-[3.03197px] px-[6.06394px] gap-[4.04px]"
                        style={{
                          borderRadius: '8.08526px'
                        }}
                      >
                        <img
                          src="/icon compan/Essential.svg"
                          alt="Remove"
                          style={{ width: '10.11px', height: '10.11px' }}
                        />
                      </div>
                    </div>
                    <div
                      className="flex flex-row justify-center items-center p-[6.06394px] gap-[4.04px]"
                      style={{
                        background: 'rgba(88, 66, 200, 0.5)',
                        borderRadius: '3.03197px'
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
                          color: '#FFFFFF'
                        }}
                      >
                        test
                      </span>
                      <div
                        className="flex flex-row justify-center items-center p-[3.03197px] px-[6.06394px] gap-[4.04px]"
                        style={{
                          borderRadius: '8.08526px'
                        }}
                      >
                        <img
                          src="/icon compan/Essential.svg"
                          alt="Remove"
                          style={{ width: '10.11px', height: '10.11px' }}
                        />
                      </div>
                    </div>
                    <div
                      className="flex flex-row justify-center items-center p-[6.06394px] gap-[4.04px]"
                      style={{
                        background: '#3F3F3F',
                        borderRadius: '3.03197px'
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
                          color: '#FFFFFF'
                        }}
                      >
                        +1
                      </span>
                    </div>
                  </div>
                  <div
                    className="flex flex-row items-center px-[9.09591px] py-[5.05329px] gap-[4.04px]"
                    style={{
                      borderRadius: '6.06394px'
                    }}
                  >
                    <div
                      className="flex flex-row justify-center items-center p-[6.06394px] gap-[4.04px]"
                      style={{
                        background: '#FF4B59',
                        borderRadius: '3.03197px'
                      }}
                    >
                      <img
                        src="/icon compan/Essential2.svg"
                        alt="Urgent"
                        style={{ width: '12.13px', height: '12.13px' }}
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
                        Urgent
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-row items-center gap-[4.04px]">
                <div className="flex flex-col items-start gap-[10.11px]">
                  <div className="flex flex-row items-center gap-[2.02px]">
                    <div
                      className="flex flex-row justify-center items-center p-[4.04263px] gap-[8.09px]"
                      style={{
                        borderRadius: '8.08526px'
                      }}
                    >
                      <img
                        src="/icon compan/Call.svg"
                        alt="Phone"
                        style={{ width: '14.15px', height: '14.15px' }}
                      />
                    </div>
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
                      Phone
                    </span>
                  </div>
                  <div className="flex flex-row items-center gap-[2.02px]">
                    <div
                      className="flex flex-row justify-center items-center p-[4.04263px] gap-[8.09px]"
                      style={{
                        borderRadius: '8.08526px'
                      }}
                    >
                      <img
                        src="/icon compan/Emails - Messages.svg"
                        alt="Email"
                        style={{ width: '14.15px', height: '14.15px' }}
                      />
                    </div>
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
                      Email
                    </span>
                  </div>
                  <div className="flex flex-row items-center gap-[2.02px]">
                    <div
                      className="flex flex-row justify-center items-center p-[4.04263px] gap-[8.09px]"
                      style={{
                        borderRadius: '8.08526px'
                      }}
                    >
                      <img
                        src="/icon compan/Users.svg"
                        alt="Assignees"
                        style={{ width: '12.94px', height: '12.94px' }}
                      />
                    </div>
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
                      Assignees
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-start gap-[10.11px]">
                  <div
                    className="flex flex-row items-center px-[9.09591px] py-[5.05329px] gap-[4.04px]"
                    style={{
                      borderRadius: '8.08526px'
                    }}
                  >
                    <div
                      className="flex flex-col justify-center items-center px-[5.51139px] gap-[9.19px]"
                      style={{
                        background: '#0C2D25',
                        borderRadius: '5.51139px'
                      }}
                    >
                      <div className="flex flex-row justify-center items-center gap-[5.51px]">
                        <img
                          src="/icon compan/Essential.svg"
                          alt="Arrow"
                          style={{ width: '9.19px', height: '9.19px' }}
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
                          +964
                        </span>
                        <div
                          style={{
                            width: '18.37px',
                            height: '0px',
                            border: '0.734852px solid rgba(30, 30, 30, 0.5)',
                            transform: 'rotate(90deg)'
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
                          770 330 620 94
                        </span>
                      </div>
                    </div>
                    <div
                      className="flex flex-row items-center gap-[2.02px]"
                    >
                      <div
                        className="flex flex-row justify-center items-center p-[4.04263px] gap-[8.09px]"
                        style={{
                          borderRadius: '8.08526px'
                        }}
                      >
                        <img
                          src="/icon compan/Emails - Messages2.svg"
                          alt="Call"
                          style={{ width: '14.15px', height: '14.15px' }}
                        />
                      </div>
                    </div>
                  </div>
                  <div
                    className="flex flex-row items-center px-[9.09591px] py-[5.05329px] gap-[4.04px]"
                    style={{
                      borderRadius: '8.08526px'
                    }}
                  >
                    <div
                      className="flex flex-col justify-center items-center px-[6.06394px] gap-[10.11px]"
                      style={{
                        background: '#5842C8',
                        borderRadius: '6.06394px'
                      }}
                    >
                      <div className="flex flex-row justify-center items-center gap-[6.06px]">
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
                          {company.email || 'Support@vodex.tech'}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div
                    className="flex flex-row items-center px-[9.09591px] py-[5.05329px] gap-[4.04px]"
                    style={{
                      borderRadius: '8.08526px'
                    }}
                  >
                    <div
                      className="flex flex-row items-center gap-[1.68px]"
                    >
                      <div
                        className="flex flex-col justify-center items-center px-[2.02131px] py-[3.03197px] gap-[10.11px]"
                        style={{
                          background: '#5842C8',
                          borderRadius: '10.6119px',
                          width: '20.21px',
                          height: '20.21px'
                        }}
                      >
                        <span
                          style={{
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
                      </div>
                      <div
                        style={{
                          position: 'absolute',
                          width: '6.06px',
                          height: '6.06px',
                          left: '14.15px',
                          top: '14.15px',
                          background: '#36BA7A',
                          border: '1.01066px solid #141414',
                          borderRadius: '3.03197px',
                          transform: 'matrix(1, 0, 0, -1, 0, 0)'
                        }}
                      />
                    </div>
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
                      Support
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div
              style={{
                width: '100%',
                height: '0px',
                border: '1px solid #2B2B2B'
              }}
            />

            <div className="flex flex-row items-center w-full gap-2">
              <div className="flex flex-row items-start gap-1">
                <div className="flex flex-col items-start gap-[10px]">
                  <div className="flex flex-row items-center gap-[2px]">
                    <div
                      className="flex flex-row justify-center items-center p-1 gap-2"
                      style={{
                        borderRadius: '8px'
                      }}
                    >
                      <img
                        src="/icon compan/buildings-2.svg"
                        alt="Type"
                        style={{ width: '12.81px', height: '12.81px' }}
                      />
                    </div>
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
                      Type
                    </span>
                  </div>
                  <div className="flex flex-row items-center gap-[2px]">
                    <div
                      className="flex flex-row justify-center items-center p-1 gap-2"
                      style={{
                        borderRadius: '8px'
                      }}
                    >
                      <img
                        src="/icon compan/Type - Paragraph - Character.svg"
                        alt="Website"
                        style={{ width: '12.81px', height: '12.81px' }}
                      />
                    </div>
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
                      Website
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-start gap-[10px]">
                  <div
                    className="flex flex-row items-center px-[9px] py-[5px] gap-1"
                    style={{
                      borderRadius: '8px'
                    }}
                  >
                    <div
                      className="flex flex-col justify-center items-center px-[6px] gap-[10px]"
                      style={{
                        background: '#676767',
                        borderRadius: '6px'
                      }}
                    >
                      <div className="flex flex-row justify-center items-center gap-[6px]">
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
                          Big Company
                        </span>
                      </div>
                    </div>
                    <div
                      style={{
                        width: '20px',
                        height: '0px',
                        border: '0.8px solid rgba(30, 30, 30, 0.5)',
                        transform: 'rotate(90deg)'
                      }}
                    />
                    <img
                      src="/icon compan/Essential.svg"
                      alt="Arrow"
                      style={{ width: '10px', height: '10px', transform: 'rotate(-90deg)' }}
                    />
                  </div>
                  <div
                    className="flex flex-row items-center px-[9px] py-[5px] gap-1"
                    style={{
                      borderRadius: '6px'
                    }}
                  >
                    <div
                      className="flex flex-row justify-center items-center p-[6px] gap-1"
                      style={{
                        background: 'rgba(0, 109, 230, 0.5)',
                        borderRadius: '3px'
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
                          color: '#FFFFFF'
                        }}
                      >
                        www.ecotrend.com
                      </span>
                      <div
                        className="flex flex-row justify-center items-center p-[3px] px-[6px] gap-1"
                        style={{
                          borderRadius: '8px'
                        }}
                      >
                        <img
                          src="/icon compan/Essential.svg"
                          alt="Remove"
                          style={{ width: '10px', height: '10px' }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-row items-center gap-1">
                <div className="flex flex-col items-start gap-[10px]">
                  <div className="flex flex-row items-center gap-[2px]">
                    <div
                      className="flex flex-row justify-center items-center p-1 gap-2"
                      style={{
                        borderRadius: '8px'
                      }}
                    >
                      <img
                        src="/icon compan/calendar.svg"
                        alt="Created"
                        style={{ width: '12.81px', height: '12.81px' }}
                      />
                    </div>
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
                      Created
                    </span>
                  </div>
                  <div className="flex flex-row items-center gap-[2px]">
                    <div
                      className="flex flex-row justify-center items-center p-1 gap-2"
                      style={{
                        borderRadius: '8px'
                      }}
                    >
                      <img
                        src="/icon compan/calendar.svg"
                        alt="Date"
                        style={{ width: '12.81px', height: '12.81px' }}
                      />
                    </div>
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
                      Date
                    </span>
                  </div>
                  <div className="flex flex-row items-center gap-[2px]">
                    <div
                      className="flex flex-row justify-center items-center p-1 gap-2"
                      style={{
                        borderRadius: '8px'
                      }}
                    >
                      <img
                        src="/icon compan/Time.svg"
                        alt="Updated"
                        style={{ width: '12.81px', height: '12.81px' }}
                      />
                    </div>
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
                      Updated
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-start gap-[10px]">
                  <div
                    className="flex flex-row items-center px-[9px] py-[5px] gap-1"
                    style={{
                      borderRadius: '8px'
                    }}
                  >
                    <div
                      className="flex flex-row items-center gap-[1.67px]"
                    >
                      <div
                        className="flex flex-col justify-center items-center px-[2px] py-[3px] gap-[10px]"
                        style={{
                          background: '#5842C8',
                          borderRadius: '10.5px',
                          width: '20px',
                          height: '20px'
                        }}
                      >
                        <span
                          style={{
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
                      </div>
                      <div
                        style={{
                          position: 'absolute',
                          width: '6px',
                          height: '6px',
                          left: '14px',
                          top: '14px',
                          background: '#36BA7A',
                          border: '1px solid #141414',
                          borderRadius: '3px',
                          transform: 'matrix(1, 0, 0, -1, 0, 0)'
                        }}
                      />
                    </div>
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
                      Support
                    </span>
                  </div>
                  <div
                    className="flex flex-row items-center px-[9px] py-[5px] gap-1"
                    style={{
                      borderRadius: '8px'
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
                      2025/12/1
                    </span>
                    <div
                      style={{
                        width: '4px',
                        height: '4px',
                        background: '#999999',
                        borderRadius: '10px'
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
                      Sunday
                    </span>
                  </div>
                  <div
                    className="flex flex-row items-center px-[9px] py-[5px] gap-1"
                    style={{
                      borderRadius: '8px'
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
                      2025/12/1
                    </span>
                    <div
                      style={{
                        width: '4px',
                        height: '4px',
                        background: '#999999',
                        borderRadius: '10px'
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
                      12:29
                    </span>
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
                      pm
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div
              style={{
                width: '100%',
                height: '0px',
                border: '1px solid #2B2B2B'
              }}
            />

            <div className="flex flex-col items-start w-full gap-2">
              <div className="flex flex-row items-start gap-2">
                <div
                  className="flex flex-col justify-center items-center px-[2.4px] py-[3.6px] gap-3"
                  style={{
                    background: '#5842C8',
                    borderRadius: '12.6px',
                    width: '24px',
                    height: '24px'
                  }}
                >
                  <span
                    style={{
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
                    W
                  </span>
                </div>
                <div className="flex flex-col items-start gap-1 flex-1">
                  <div className="flex flex-row justify-center items-center gap-1">
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
                      Wissam Iskender
                    </span>
                    <div
                      style={{
                        width: '4px',
                        height: '4px',
                        background: '#999999',
                        borderRadius: '10px'
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
                      Business Owner
                    </span>
                  </div>
                  <p
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
                    Wissam Iskender is a software and technology services company focused on delivering digital solutions for businesses. The company provides web development.
                  </p>
                </div>
              </div>

              <div className="flex flex-row items-start w-full">
                <div className="flex flex-col justify-center items-start flex-1">
                  <div className="flex flex-row items-center gap-1 mb-[10px]">
                    <div
                      className="flex flex-row justify-center items-center p-1 gap-2"
                      style={{
                        borderRadius: '8px'
                      }}
                    >
                      <img
                        src="/icon compan/Call.svg"
                        alt="Phone"
                        style={{ width: '14.15px', height: '14.15px' }}
                      />
                    </div>
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
                      Phone
                    </span>
                  </div>
                  <div
                    className="flex flex-row items-center px-[9px] py-[5px] gap-1 mb-[10px]"
                    style={{
                      borderRadius: '8px'
                    }}
                  >
                    <div
                      className="flex flex-col justify-center items-center px-[6px] gap-[10px]"
                      style={{
                        background: '#393939',
                        borderRadius: '6px'
                      }}
                    >
                      <div className="flex flex-row justify-center items-center gap-[6px]">
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
                          +964
                        </span>
                        <div
                          style={{
                            width: '20px',
                            height: '0px',
                            border: '0.8px solid rgba(30, 30, 30, 0.5)',
                            transform: 'rotate(90deg)'
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
                          770 330 620 94
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row items-center gap-1 mb-[10px]">
                    <div
                      className="flex flex-row justify-center items-center p-1 gap-2"
                      style={{
                        borderRadius: '8px'
                      }}
                    >
                      <img
                        src="/icon compan/Emails - Messages.svg"
                        alt="Email"
                        style={{ width: '14.15px', height: '14.15px' }}
                      />
                    </div>
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
                      Email
                    </span>
                  </div>
                  <div
                    className="flex flex-row items-center px-[9px] py-[5px] gap-1"
                    style={{
                      borderRadius: '8px'
                    }}
                  >
                    <div
                      className="flex flex-col justify-center items-center px-[6px] gap-[10px]"
                      style={{
                        background: '#393939',
                        borderRadius: '6px'
                      }}
                    >
                      <div className="flex flex-row justify-center items-center gap-[6px]">
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
                          Support@vodex.tech
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col justify-center items-start">
                  <div className="flex flex-row items-center gap-1 mb-[10px]">
                    <div
                      className="flex flex-row justify-center items-center p-1 gap-2"
                      style={{
                        borderRadius: '8px'
                      }}
                    >
                      <img
                        src="/icon compan/Essential.svg"
                        alt="Home"
                        style={{ width: '14px', height: '14px' }}
                      />
                    </div>
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
                      Home
                    </span>
                  </div>
                  <div
                    className="flex flex-row items-center px-[9px] py-[5px] gap-1 mb-[10px] flex-1"
                    style={{
                      borderRadius: '8px'
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
                      Iraq Baghdad Karada St.30
                    </span>
                  </div>
                  <div className="flex flex-row items-center gap-1 mb-[10px]">
                    <div
                      className="flex flex-row justify-center items-center p-1 gap-2"
                      style={{
                        borderRadius: '8px'
                      }}
                    >
                      <img
                        src="/icon compan/calendar.svg"
                        alt="First Contact"
                        style={{ width: '12.81px', height: '12.81px' }}
                      />
                    </div>
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
                      First Contact
                    </span>
                  </div>
                  <div
                    className="flex flex-row items-center px-[9px] py-[5px] gap-1 flex-1"
                    style={{
                      borderRadius: '8px'
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
                      2025/12/1
                    </span>
                    <div
                      style={{
                        width: '4px',
                        height: '4px',
                        background: '#999999',
                        borderRadius: '10px'
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
                      Sunday
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="flex flex-col items-start w-full"
              style={{
                background: '#141414',
                border: '1px solid #2B2B2B',
                borderRadius: '12px'
              }}
            >
              <div
                className="flex flex-row items-start w-full"
                style={{
                  borderBottom: '1px solid #2B2B2B'
                }}
              >
                <div
                  className="flex flex-col items-start"
                  style={{
                    width: '20px',
                    padding: '12px 20px',
                    background: '#2B2B2B',
                    borderBottom: '1px solid #2B2B2B'
                  }}
                />
                <div
                  className="flex flex-col items-start"
                  style={{
                    width: '126px',
                    padding: '12px 4px',
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
                    Projects
                  </span>
                </div>
                <div
                  className="flex flex-col items-center"
                  style={{
                    width: '94px',
                    padding: '12px 4px',
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
                <div
                  className="flex flex-col items-center"
                  style={{
                    width: '99px',
                    padding: '12px 4px',
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
                <div
                  className="flex flex-col items-start"
                  style={{
                    width: '172px',
                    padding: '12px 4px',
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
                    Start → End
                  </span>
                </div>
                <div
                  className="flex flex-col items-start"
                  style={{
                    width: '57px',
                    padding: '12px 4px',
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

              {[1, 2, 3].map((_, index) => (
                <div
                  key={index}
                  className="flex flex-row items-start w-full"
                  style={{
                    borderBottom: index < 2 ? '1px solid #2B2B2B' : 'none'
                  }}
                >
                  <div
                    className="flex flex-col items-center justify-center"
                    style={{
                      width: '20px',
                      padding: '12px 20px',
                      borderBottom: index < 2 ? '1px solid #2B2B2B' : 'none'
                    }}
                  >
                    <img
                      src="/more.png"
                      alt="More"
                      style={{ width: '12.62px', height: '5.32px', transform: 'rotate(90deg)' }}
                    />
                  </div>
                  <div
                    className="flex flex-col items-start"
                    style={{
                      width: '126px',
                      padding: '12px 4px',
                      borderBottom: index < 2 ? '1px solid #2B2B2B' : 'none'
                    }}
                  >
                    <div className="flex flex-row items-center gap-1">
                      <div
                        style={{
                          width: '16px',
                          height: '16px',
                          borderRadius: '4px',
                          overflow: 'hidden'
                        }}
                      >
                        <img
                          src="/Frame 312.png"
                          alt={company.companyName}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                          }}
                        />
                      </div>
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
                  <div
                    className="flex flex-col items-center justify-center"
                    style={{
                      width: '94px',
                      padding: '12px 4px',
                      borderBottom: index < 2 ? '1px solid #2B2B2B' : 'none'
                    }}
                  >
                    <div
                      className="flex flex-col justify-center items-center px-[6px] gap-[10px]"
                      style={{
                        background: '#DC6300',
                        borderRadius: '6px'
                      }}
                    >
                      <div className="flex flex-row justify-center items-center gap-[6px]">
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
                        <div
                          style={{
                            width: '20px',
                            height: '0px',
                            border: '0.8px solid rgba(30, 30, 30, 0.5)',
                            transform: 'rotate(90deg)'
                          }}
                        />
                        <img
                          src="/icon compan/Essential.svg"
                          alt="Arrow"
                          style={{ width: '10px', height: '10px', transform: 'rotate(-90deg)' }}
                        />
                      </div>
                    </div>
                  </div>
                  <div
                    className="flex flex-col items-center justify-center"
                    style={{
                      width: '99px',
                      padding: '12px 4px',
                      borderBottom: index < 2 ? '1px solid #2B2B2B' : 'none'
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
                      4,000,000
                    </span>
                  </div>
                  <div
                    className="flex flex-col items-start"
                    style={{
                      width: '172px',
                      padding: '12px 4px',
                      borderBottom: index < 2 ? '1px solid #2B2B2B' : 'none'
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
                      25/12/1 → 25/12/13
                    </span>
                  </div>
                  <div
                    className="flex flex-col items-center justify-center"
                    style={{
                      width: '57px',
                      padding: '12px 4px',
                      borderBottom: index < 2 ? '1px solid #2B2B2B' : 'none'
                    }}
                  >
                    <img
                      src="/more.png"
                      alt="Actions"
                      style={{ width: '12px', height: '12px', transform: 'rotate(90deg)' }}
                    />
                  </div>
                </div>
              ))}

              <div
                className="flex flex-row items-start"
                style={{
                  width: '126px',
                  padding: '12px 20px 12px 0px'
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
