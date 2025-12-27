'use client';

import React, { useEffect } from 'react';

// Types
interface Company {
  companyName?: string;
  address?: string;
  state?: string;
  email?: string;
  phone?: string;
  website?: string;
  type?: string;
  description?: string;
  tags?: string[];
  priority?: string;
  createdAt?: string;
  updatedAt?: string;
  assignee?: {
    initials: string;
    name: string;
  };
  contact?: {
    name: string;
    role: string;
    phone: string;
    email: string;
    address: string;
    firstContact: string;
    description: string;
  };
  projects?: Array<{
    id: string;
    name: string;
    state: string;
    totalAmount: string;
    startDate: string;
    endDate: string;
  }>;
}

interface CompanyDetailsProps {
  company: Company | null;
  isOpen: boolean;
  onClose: () => void;
}

interface AvatarProps {
  initials: string;
  color?: string;
  size?: number;
  showStatus?: boolean;
}

interface BadgeProps {
  children: React.ReactNode;
  color?: string;
  hasClose?: boolean;
  hasArrow?: boolean;
  textColor?: string;
}

interface FieldRowProps {
  icon: React.ReactNode;
  label: string;
  children?: React.ReactNode;
}

// SVG Icons as components
const Icons = {
  Chart: (): JSX.Element => (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M1.17 10.5V5.25H3.5V10.5H1.17ZM5.83 10.5V3.5H8.17V10.5H5.83ZM10.5 10.5V7H12.83V10.5H10.5Z" fill="#999999"/>
    </svg>
  ),
  Tag: (): JSX.Element => (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
      <path d="M11.375 6.5L6.5 11.375L1.625 6.5V1.625H6.5L11.375 6.5ZM4.0625 3.25C4.0625 3.69922 3.69922 4.0625 3.25 4.0625C2.80078 4.0625 2.4375 3.69922 2.4375 3.25C2.4375 2.80078 2.80078 2.4375 3.25 2.4375C3.69922 2.4375 4.0625 2.80078 4.0625 3.25Z" fill="#999999"/>
    </svg>
  ),
  Flag: (): JSX.Element => (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path d="M2.5 1.5V10.5M2.5 1.5H9L7.5 4L9 6.5H2.5V1.5Z" fill="#999999"/>
    </svg>
  ),
  FlagWhite: (): JSX.Element => (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path d="M2.5 1.5V10.5M2.5 1.5H9L7.5 4L9 6.5H2.5V1.5Z" fill="#FFFFFF"/>
    </svg>
  ),
  Call: (): JSX.Element => (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M12.8333 9.88333V11.55C12.8333 11.9642 12.4975 12.3 12.0833 12.3C6.33583 12.3 1.7 7.66417 1.7 1.91667C1.7 1.5025 2.03583 1.16667 2.45 1.16667H4.11667C4.53083 1.16667 4.86667 1.5025 4.86667 1.91667C4.86667 2.80917 5.01917 3.66 5.3 4.445C5.39083 4.7175 5.32 5.01917 5.11167 5.2275L3.85 6.48917C4.78 8.295 6.205 9.72 8.01083 10.65L9.2725 9.38833C9.48083 9.18 9.7825 9.10917 10.055 9.2C10.84 9.48083 11.6908 9.63333 12.5833 9.63333C12.7167 9.63333 12.8333 9.75 12.8333 9.88333Z" fill="#999999"/>
    </svg>
  ),
  Email: (): JSX.Element => (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M1.16667 3.5V10.5C1.16667 11.1083 1.65833 11.6 2.26667 11.6H11.7333C12.3417 11.6 12.8333 11.1083 12.8333 10.5V3.5L7 7.58333L1.16667 3.5ZM1.16667 2.33333L7 6.41667L12.8333 2.33333H1.16667Z" fill="#999999"/>
    </svg>
  ),
  Users: (): JSX.Element => (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
      <path d="M4.875 6.5C6.21875 6.5 7.3125 5.40625 7.3125 4.0625C7.3125 2.71875 6.21875 1.625 4.875 1.625C3.53125 1.625 2.4375 2.71875 2.4375 4.0625C2.4375 5.40625 3.53125 6.5 4.875 6.5ZM4.875 7.3125C3.09375 7.3125 0.8125 8.20312 0.8125 9.75V11.375H8.9375V9.75C8.9375 8.20312 6.65625 7.3125 4.875 7.3125ZM9.75 6.5C10.6875 6.5 11.375 5.8125 11.375 4.875C11.375 3.9375 10.6875 3.25 9.75 3.25C8.8125 3.25 8.125 3.9375 8.125 4.875C8.125 5.8125 8.8125 6.5 9.75 6.5ZM9.75 7.3125C9.34375 7.3125 8.9375 7.39062 8.53125 7.46875C9.26562 8.04688 9.75 8.78125 9.75 9.75V11.375H12.1875V9.75C12.1875 8.20312 10.7188 7.3125 9.75 7.3125Z" fill="#999999"/>
    </svg>
  ),
  Location: (): JSX.Element => (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path d="M6 1C3.79 1 2 2.79 2 5C2 8 6 11 6 11C6 11 10 8 10 5C10 2.79 8.21 1 6 1ZM6 6.5C5.17 6.5 4.5 5.83 4.5 5C4.5 4.17 5.17 3.5 6 3.5C6.83 3.5 7.5 4.17 7.5 5C7.5 5.83 6.83 6.5 6 6.5Z" fill="#FFFFFF"/>
    </svg>
  ),
  ArrowDown: (): JSX.Element => (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{ transform: 'rotate(-90deg)' }}>
      <path d="M2.08333 3.33333L5 6.25L7.91667 3.33333" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  ArrowDownGray: (): JSX.Element => (
    <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
      <path d="M2.08333 3.33333L5 6.25L7.91667 3.33333" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Messages: (): JSX.Element => (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M11.6667 2.33333H9.91667V7.58333L7 5.83333L4.08333 7.58333V2.33333H2.33333V11.6667H11.6667V2.33333Z" fill="#999999"/>
    </svg>
  ),
  Building: (): JSX.Element => (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
      <path d="M2.4375 11.375V1.625H6.5V4.875H10.5625V11.375H2.4375ZM3.65625 3.65625H4.0625V4.0625H3.65625V3.65625ZM3.65625 5.28125H4.0625V5.6875H3.65625V5.28125ZM3.65625 6.90625H4.0625V7.3125H3.65625V6.90625ZM5.28125 3.65625H5.6875V4.0625H5.28125V3.65625ZM5.28125 5.28125H5.6875V5.6875H5.28125V5.28125ZM5.28125 6.90625H5.6875V7.3125H5.28125V6.90625ZM7.3125 6.90625H7.71875V7.3125H7.3125V6.90625ZM7.3125 8.53125H7.71875V8.9375H7.3125V8.53125ZM8.9375 6.90625H9.34375V7.3125H8.9375V6.90625ZM8.9375 8.53125H9.34375V8.9375H8.9375V8.53125Z" fill="#999999"/>
    </svg>
  ),
  Link: (): JSX.Element => (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
      <path d="M6.5 1.625C3.80859 1.625 1.625 3.80859 1.625 6.5C1.625 9.19141 3.80859 11.375 6.5 11.375C9.19141 11.375 11.375 9.19141 11.375 6.5C11.375 3.80859 9.19141 1.625 6.5 1.625ZM9.75 7.3125H7.3125V9.75L4.875 6.5L7.3125 3.25V5.6875H9.75V7.3125Z" fill="#999999"/>
    </svg>
  ),
  Calendar: (): JSX.Element => (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
      <path d="M10.5625 2.4375H9.75V1.625H8.9375V2.4375H4.0625V1.625H3.25V2.4375H2.4375C1.99219 2.4375 1.625 2.80469 1.625 3.25V10.5625C1.625 11.0078 1.99219 11.375 2.4375 11.375H10.5625C11.0078 11.375 11.375 11.0078 11.375 10.5625V3.25C11.375 2.80469 11.0078 2.4375 10.5625 2.4375ZM10.5625 10.5625H2.4375V4.875H10.5625V10.5625Z" fill="#999999"/>
    </svg>
  ),
  Time: (): JSX.Element => (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
      <path d="M6.5 1.625C3.80859 1.625 1.625 3.80859 1.625 6.5C1.625 9.19141 3.80859 11.375 6.5 11.375C9.19141 11.375 11.375 9.19141 11.375 6.5C11.375 3.80859 9.19141 1.625 6.5 1.625ZM8.125 8.9375L5.6875 6.5V3.25H7.3125V5.89844L9.14062 7.72656L8.125 8.9375Z" fill="#999999"/>
    </svg>
  ),
  Home: (): JSX.Element => (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M5.83333 11.6667V8.16667H8.16667V11.6667H11.0833V7H12.8333L7 1.75L1.16667 7H2.91667V11.6667H5.83333Z" fill="#999999"/>
    </svg>
  ),
  Maximize: (): JSX.Element => (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M3.75 6.75V3.75H6.75M11.25 3.75H14.25V6.75M14.25 11.25V14.25H11.25M6.75 14.25H3.75V11.25" stroke="#999999" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Timer: (): JSX.Element => (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M9 1.5V3M9 3C5.68629 3 3 5.68629 3 9C3 12.3137 5.68629 15 9 15C12.3137 15 15 12.3137 15 9C15 5.68629 12.3137 3 9 3ZM9 6V9L11.25 11.25" stroke="#999999" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  More: (): JSX.Element => (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <circle cx="6" cy="2" r="1" fill="#999999"/>
      <circle cx="6" cy="6" r="1" fill="#999999"/>
      <circle cx="6" cy="10" r="1" fill="#999999"/>
    </svg>
  ),
  MoreHorizontal: (): JSX.Element => (
    <svg width="12" height="6" viewBox="0 0 12 6" fill="none">
      <circle cx="2" cy="3" r="1.5" fill="#3D3D3D"/>
      <circle cx="6" cy="3" r="1.5" fill="#3D3D3D"/>
      <circle cx="10" cy="3" r="1.5" fill="#3D3D3D"/>
    </svg>
  ),
  Close: (): JSX.Element => (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
      <path d="M7.5 2.5L2.5 7.5M2.5 2.5L7.5 7.5" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  ),
};

// Avatar component
const Avatar: React.FC<AvatarProps> = ({ 
  initials, 
  color = '#5842C8', 
  size = 20, 
  showStatus = false 
}) => (
  <div className="relative" style={{ width: size, height: size }}>
    <div
      className="flex items-center justify-center rounded-full"
      style={{
        width: size,
        height: size,
        background: color,
        fontSize: size * 0.5,
        fontWeight: 510,
        color: '#FFFFFF',
        fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
      }}
    >
      {initials}
    </div>
    {showStatus && (
      <div
        className="absolute"
        style={{
          width: 6,
          height: 6,
          right: -1,
          bottom: -1,
          background: '#36BA7A',
          border: '1px solid #141414',
          borderRadius: '50%',
        }}
      />
    )}
  </div>
);

// Badge/Tag component
const Badge: React.FC<BadgeProps> = ({ 
  children, 
  color = '#5842C8', 
  hasClose = false, 
  hasArrow = false, 
  textColor = '#FFFFFF' 
}) => (
  <div
    className="inline-flex items-center gap-1"
    style={{
      background: color,
      borderRadius: 6,
      padding: '2px 6px',
      fontSize: 12,
      fontWeight: 510,
      color: textColor,
      fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
      lineHeight: '16px',
      letterSpacing: '0.005em',
    }}
  >
    {children}
    {hasClose && (
      <span className="cursor-pointer opacity-80 hover:opacity-100 ml-0.5">
        <Icons.Close />
      </span>
    )}
    {hasArrow && (
      <>
        <div style={{ width: 1, height: 12, background: 'rgba(30, 30, 30, 0.5)', margin: '0 2px' }} />
        <Icons.ArrowDown />
      </>
    )}
  </div>
);

// Field Row component
const FieldRow: React.FC<FieldRowProps> = ({ icon, label, children }) => (
  <div className="flex items-center gap-0.5">
    <div className="flex items-center gap-0.5 min-w-[70px]">
      <div className="flex items-center justify-center w-6 h-6">{icon}</div>
      <span
        style={{
          fontSize: 12,
          fontWeight: 510,
          color: '#999999',
          fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
          lineHeight: '16px',
          letterSpacing: '0.005em',
        }}
      >
        {label}
      </span>
    </div>
    <div className="flex items-center px-2 py-1">{children}</div>
  </div>
);

// Divider component
const Divider: React.FC = () => (
  <div style={{ width: '100%', height: 1, background: '#2B2B2B', margin: '4px 0' }} />
);

// Text style constant
const textStyle: React.CSSProperties = {
  fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
  fontSize: 12,
  fontWeight: 510,
  lineHeight: '16px',
  letterSpacing: '0.005em',
};

// Company Details Component
const CompanyDetails: React.FC<CompanyDetailsProps> = ({ company, isOpen, onClose }) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent): void => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!company) return null;

  const companyName = company.companyName || 'ECOTREND';
  const tags = company.tags || ['test', 'test', 'test'];
  const projects = company.projects || [
    { id: '1', name: companyName, state: 'Pending', totalAmount: '4,000,000', startDate: '25/12/1', endDate: '25/12/13' },
    { id: '2', name: companyName, state: 'Pending', totalAmount: '4,000,000', startDate: '25/12/1', endDate: '25/12/13' },
    { id: '3', name: companyName, state: 'Pending', totalAmount: '4,000,000', startDate: '25/12/1', endDate: '25/12/13' },
  ];

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-300 z-40 ${
          isOpen ? 'opacity-50' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full md:w-[600px] transition-transform duration-300 ease-in-out z-50 overflow-y-auto ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{
          background: '#111111',
          border: '1px solid #2B2B2B',
          boxShadow: '-5px 5px 20px rgba(0, 0, 0, 0.55)',
          borderRadius: '0px 8px 8px 0px',
        }}
      >
        {/* Header with Background Image */}
        <div className="relative h-[200px] w-full">
          {/* Background Image */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(135deg, #1a2a3a 0%, #0d1520 50%, #2d1810 100%)',
            }}
          >
            {/* Building silhouette overlay */}
            <div
              className="absolute inset-0"
              style={{
                background: `
                  linear-gradient(to bottom, transparent 60%, #000 100%),
                  repeating-linear-gradient(90deg, transparent 0, transparent 40px, rgba(255,180,50,0.3) 40px, rgba(255,180,50,0.3) 45px),
                  repeating-linear-gradient(180deg, transparent 0, transparent 30px, rgba(255,180,50,0.15) 30px, rgba(255,180,50,0.15) 35px)
                `,
              }}
            />
          </div>
          
          {/* Gradient Overlay */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 50%, #000000 100%)',
              borderBottom: '1px solid #2B2B2B',
            }}
          />

          {/* Top Action Buttons */}
          <div className="absolute top-[14px] left-[14px] flex gap-1">
            <button
              className="flex items-center justify-center w-6 h-6 rounded-lg"
              style={{ background: '#222222' }}
              type="button"
            >
              <Icons.Maximize />
            </button>
            <button
              className="flex items-center justify-center w-6 h-6 rounded-lg"
              style={{ background: '#222222' }}
              type="button"
            >
              <Icons.Timer />
            </button>
          </div>

          {/* Company Logo and Name */}
          <div className="absolute bottom-[17px] left-[17px] flex items-center gap-3">
            <div
              className="flex-shrink-0 rounded-[14.8px] overflow-hidden"
              style={{ width: 70, height: 70, background: '#1a1a1a' }}
            >
              {/* Placeholder for company logo */}
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-green-600 to-green-800">
                <span className="text-2xl">🌿</span>
              </div>
            </div>
            <div className="flex flex-col gap-[3px]">
              <span style={{ ...textStyle, color: '#FFFFFF' }}>
                {companyName}
              </span>
              <span style={{ ...textStyle, color: '#999999' }}>Software</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col px-[17px] pt-[22px] pb-6 gap-[22px]" style={{ background: '#111111' }}>
          {/* Description Section */}
          <div className="flex flex-col gap-1">
            <span style={{ ...textStyle, color: '#999999' }}>Description</span>
            <p style={{ ...textStyle, color: '#999999' }}>
              {company.description || `${companyName} is a software and technology services company focused on delivering digital solutions for businesses. The company provides web development, mobile apps, and enterprise management systems, helping clients improve productivity and streamline operations.`}
            </p>
          </div>

          {/* Business Address */}
          <div className="flex flex-col gap-1">
            <span style={{ ...textStyle, color: '#999999' }}>Business Address:</span>
            <div className="flex items-center justify-between gap-2">
              <span style={{ ...textStyle, color: '#999999', flex: 1 }}>
                {company.address || 'Iraq - Baghdad - Karada - St 62. Floor 3 Room 12'}
              </span>
              <button
                className="flex items-center gap-1 px-2 py-1 rounded-lg"
                style={{ background: '#676767' }}
                type="button"
              >
                <div className="flex items-center gap-1.5 px-1.5">
                  <Icons.Location />
                  <span style={{ ...textStyle, color: '#FFFFFF' }}>Google Map</span>
                </div>
                <div style={{ width: 1, height: 12, background: 'rgba(30, 30, 30, 0.5)' }} />
                <Icons.ArrowDown />
              </button>
            </div>
          </div>

          <Divider />

          {/* Status, Tags, Priority & Contact Info */}
          <div className="flex gap-2">
            {/* Left Column */}
            <div className="flex gap-1">
              {/* Labels */}
              <div className="flex flex-col gap-2.5">
                <FieldRow icon={<Icons.Chart />} label="Status" />
                <FieldRow icon={<Icons.Tag />} label="Tags" />
                <FieldRow icon={<Icons.Flag />} label="Priority" />
              </div>
              {/* Values */}
              <div className="flex flex-col gap-2.5 pl-2">
                <div className="flex items-center py-1">
                  <Badge color="#DC6300" hasArrow>{company.state || 'Pending'}</Badge>
                </div>
                <div className="flex items-center gap-1 py-1">
                  {tags.slice(0, 3).map((tag, index) => (
                    <Badge key={index} color="rgba(88, 66, 200, 0.5)" hasClose>{tag}</Badge>
                  ))}
                  {tags.length > 3 && <Badge color="#3F3F3F">+{tags.length - 3}</Badge>}
                  {tags.length <= 3 && <Badge color="#3F3F3F">+1</Badge>}
                </div>
                <div className="flex items-center py-1">
                  <Badge color="#FF4B59">
                    <Icons.FlagWhite />
                    <span className="ml-1">{company.priority || 'Urgent'}</span>
                  </Badge>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="flex gap-1 ml-2">
              {/* Labels */}
              <div className="flex flex-col gap-2.5">
                <FieldRow icon={<Icons.Call />} label="Phone" />
                <FieldRow icon={<Icons.Email />} label="Email" />
                <FieldRow icon={<Icons.Users />} label="Assignees" />
              </div>
              {/* Values */}
              <div className="flex flex-col gap-2.5 pl-2">
                <div className="flex items-center gap-1 py-1">
                  <div
                    className="flex items-center gap-1.5 px-1.5 py-0.5 rounded-md"
                    style={{ background: '#0C2D25' }}
                  >
                    <Icons.ArrowDownGray />
                    <span style={{ ...textStyle, color: '#FFFFFF' }}>+964</span>
                    <div style={{ width: 1, height: 12, background: 'rgba(30, 30, 30, 0.5)' }} />
                    <span style={{ ...textStyle, color: '#FFFFFF' }}>{company.phone || '770 330 620 94'}</span>
                  </div>
                  <div className="flex items-center justify-center w-6 h-6 rounded-lg">
                    <Icons.Messages />
                  </div>
                </div>
                <div className="flex items-center py-1">
                  <Badge color="#5842C8">{company.email || 'Support@vodex.tech'}</Badge>
                </div>
                <div className="flex items-center gap-1 py-1">
                  <Avatar initials={company.assignee?.initials || 'AR'} showStatus />
                  <span style={{ ...textStyle, color: '#999999' }}>{company.assignee?.name || 'Support'}</span>
                </div>
              </div>
            </div>
          </div>

          <Divider />

          {/* Type, Website, Created, Date, Updated */}
          <div className="flex gap-2">
            {/* Left Section */}
            <div className="flex gap-1">
              <div className="flex flex-col gap-2.5">
                <FieldRow icon={<Icons.Building />} label="Type" />
                <FieldRow icon={<Icons.Link />} label="Website" />
              </div>
              <div className="flex flex-col gap-2.5 pl-2">
                <div className="flex items-center py-1">
                  <Badge color="#676767" hasArrow>{company.type || 'Big Company'}</Badge>
                </div>
                <div className="flex items-center py-1">
                  <Badge color="rgba(0, 109, 230, 0.5)" hasClose>{company.website || 'www.ecotrend.com'}</Badge>
                </div>
              </div>
            </div>

            {/* Right Section */}
            <div className="flex gap-1 ml-2">
              <div className="flex flex-col gap-2.5">
                <FieldRow icon={<Icons.Calendar />} label="Created" />
                <FieldRow icon={<Icons.Calendar />} label="Date" />
                <FieldRow icon={<Icons.Time />} label="Updated" />
              </div>
              <div className="flex flex-col gap-2.5 pl-2">
                <div className="flex items-center gap-1 py-1">
                  <Avatar initials="AR" showStatus />
                  <span style={{ ...textStyle, color: '#999999' }}>Support</span>
                </div>
                <div className="flex items-center gap-1 py-1">
                  <span style={{ ...textStyle, color: '#999999' }}>2025/12/1</span>
                  <div className="w-1 h-1 rounded-full bg-[#999999]" />
                  <span style={{ ...textStyle, color: '#999999' }}>Sunday</span>
                </div>
                <div className="flex items-center gap-1 py-1">
                  <span style={{ ...textStyle, color: '#999999' }}>{company.updatedAt || '2025/12/1'}</span>
                  <div className="w-1 h-1 rounded-full bg-[#999999]" />
                  <span style={{ ...textStyle, color: '#999999' }}>12:29</span>
                  <span style={{ ...textStyle, color: '#999999' }}>pm</span>
                </div>
              </div>
            </div>
          </div>

          <Divider />

          {/* Contact Person */}
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <Avatar initials={company.contact?.name?.charAt(0) || 'W'} size={24} />
              <div className="flex flex-col gap-1 flex-1">
                <div className="flex items-center gap-1">
                  <span style={{ ...textStyle, color: '#999999' }}>{company.contact?.name || 'Wissam Iskender'}</span>
                  <div className="w-1 h-1 rounded-full bg-[#999999]" />
                  <span style={{ ...textStyle, color: '#999999' }}>{company.contact?.role || 'Business Owner'}</span>
                </div>
                <p style={{ ...textStyle, color: '#999999' }}>
                  {company.contact?.description || 'Wissam Iskender is a software and technology services company focused on delivering digital solutions for businesses. The company provides web development.'}
                </p>
              </div>
            </div>

            {/* Contact Details Grid */}
            <div className="flex mt-2">
              <div className="flex-1">
                <FieldRow icon={<Icons.Call />} label="Phone">
                  <div
                    className="flex items-center gap-1.5 px-1.5 py-0.5 rounded-md"
                    style={{ background: '#393939' }}
                  >
                    <span style={{ ...textStyle, color: '#FFFFFF' }}>+964</span>
                    <div style={{ width: 1, height: 12, background: 'rgba(30, 30, 30, 0.5)' }} />
                    <span style={{ ...textStyle, color: '#FFFFFF' }}>{company.contact?.phone || '770 330 620 94'}</span>
                  </div>
                </FieldRow>
                <div className="mt-2">
                  <FieldRow icon={<Icons.Email />} label="Email">
                    <div
                      className="flex items-center px-1.5 py-0.5 rounded-md"
                      style={{ background: '#393939' }}
                    >
                      <span style={{ ...textStyle, color: '#FFFFFF' }}>{company.contact?.email || 'Support@vodex.tech'}</span>
                    </div>
                  </FieldRow>
                </div>
              </div>
              <div className="flex-1">
                <FieldRow icon={<Icons.Home />} label="Home">
                  <span style={{ ...textStyle, color: '#999999' }}>{company.contact?.address || 'Iraq Baghdad Karada St.30'}</span>
                </FieldRow>
                <div className="mt-2">
                  <FieldRow icon={<Icons.Calendar />} label="First Contact">
                    <div className="flex items-center gap-1">
                      <span style={{ ...textStyle, color: '#999999' }}>{company.contact?.firstContact || '2025/12/1'}</span>
                      <div className="w-1 h-1 rounded-full bg-[#999999]" />
                      <span style={{ ...textStyle, color: '#999999' }}>Sunday</span>
                    </div>
                  </FieldRow>
                </div>
              </div>
            </div>
          </div>

          {/* Projects Table */}
          <div
            className="rounded-xl overflow-hidden"
            style={{ background: '#141414', border: '1px solid #2B2B2B' }}
          >
            {/* Table Header */}
            <div className="flex" style={{ background: '#2B2B2B' }}>
              <div className="w-[20px] py-3 px-5" />
              <div className="w-[126px] py-3 px-1">
                <span style={{ ...textStyle, color: '#FBFBFB' }}>Projects</span>
              </div>
              <div className="w-[94px] py-3 px-1 text-center">
                <span style={{ ...textStyle, color: '#FBFBFB' }}>States</span>
              </div>
              <div className="w-[99px] py-3 px-1 text-center">
                <span style={{ ...textStyle, color: '#FBFBFB' }}>Total Amount</span>
              </div>
              <div className="w-[172px] py-3 px-1">
                <span style={{ ...textStyle, color: '#FBFBFB' }}>Start → End</span>
              </div>
              <div className="w-[57px] py-3 px-1">
                <span style={{ ...textStyle, color: '#FBFBFB' }}>Actions</span>
              </div>
            </div>

            {/* Table Rows */}
            {projects.map((project, index) => (
              <div
                key={project.id}
                className="flex items-center"
                style={{ borderBottom: index < projects.length - 1 ? '1px solid #2B2B2B' : 'none' }}
              >
                <div className="w-[20px] py-3 px-5 flex justify-center">
                  <Icons.MoreHorizontal />
                </div>
                <div className="w-[126px] py-3 px-1">
                  <div className="flex items-center gap-1">
                    <div
                      className="w-4 h-4 rounded overflow-hidden flex items-center justify-center"
                      style={{ background: 'linear-gradient(135deg, #2d5a3d 0%, #1a3a25 100%)' }}
                    >
                      <span className="text-[8px]">🌿</span>
                    </div>
                    <span style={{ ...textStyle, color: '#999999' }}>{project.name}</span>
                  </div>
                </div>
                <div className="w-[94px] py-3 px-1 flex justify-center">
                  <Badge color="#DC6300" hasArrow>{project.state}</Badge>
                </div>
                <div className="w-[99px] py-3 px-1 text-center">
                  <span style={{ ...textStyle, color: '#999999' }}>{project.totalAmount}</span>
                </div>
                <div className="w-[172px] py-3 px-1">
                  <span style={{ ...textStyle, color: '#999999' }}>{project.startDate} → {project.endDate}</span>
                </div>
                <div className="w-[57px] py-3 px-1 flex justify-center">
                  <Icons.More />
                </div>
              </div>
            ))}

            {/* Add New Row */}
            <div className="py-3 px-5">
              <button type="button" style={{ ...textStyle, color: '#999999', cursor: 'pointer', background: 'none', border: 'none' }}>
                Add new+
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CompanyDetails;