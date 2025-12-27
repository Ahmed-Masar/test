'use client'

import { useState, useEffect } from 'react'
import type { Company } from './types'

interface AddCompanyDialogProps {
  isOpen: boolean
  onClose: () => void
  onAdd: (company: Omit<Company, 'id'>) => void
}

export default function AddCompanyDialog({ isOpen, onClose, onAdd }: AddCompanyDialogProps) {
  const [formData, setFormData] = useState({
    companyName: '',
    state: 'Pending' as 'Active' | 'Not Active' | 'Pending',
    totalAmount: '',
    address: '',
    email: '',
    content: '',
    phone: '',
    website: '',
    type: 'Big Company',
    priority: 'Urgent',
    assigneeName: '',
    assigneeInitials: '',
    contactName: '',
    contactRole: '',
    contactPhone: '',
    contactEmail: '',
    contactAddress: '',
    contactFirstContact: '',
    contactDescription: '',
    tags: [] as string[],
  })

  const [newTag, setNewTag] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [hoveredField, setHoveredField] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    const styleId = 'add-company-dialog-styles'
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style')
      style.id = styleId
      style.textContent = `
        .dialog-scroll::-webkit-scrollbar {
          width: 6px;
        }
        .dialog-scroll::-webkit-scrollbar-track {
          background: transparent;
        }
        .dialog-scroll::-webkit-scrollbar-thumb {
          background: #2B2B2B;
          border-radius: 3px;
        }
        .dialog-scroll::-webkit-scrollbar-thumb:hover {
          background: #404040;
        }
        select option {
          background: #1A1A1A;
          color: #FAFAFA;
          padding: 12px;
        }
      `
      document.head.appendChild(style)
    }
    
    return () => {
      const styleElement = document.getElementById(styleId)
      if (styleElement) {
        styleElement.remove()
      }
    }
  }, [])

  if (!mounted || !isOpen) return null

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.companyName.trim()) {
      newErrors.companyName = 'Company name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format'
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required'
    }

    if (!formData.totalAmount.trim()) {
      newErrors.totalAmount = 'Total amount is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    const currentDate = new Date().toLocaleDateString('en-US', {
      month: 'numeric',
      day: 'numeric',
      year: 'numeric'
    })

    onAdd({
      companyName: formData.companyName,
      state: formData.state,
      totalAmount: formData.totalAmount,
      address: formData.address,
      email: formData.email,
      content: formData.content,
      createdAt: currentDate,
      lastUpdate: currentDate,
    })

    setFormData({
      companyName: '',
      state: 'Pending',
      totalAmount: '',
      address: '',
      email: '',
      content: '',
      phone: '',
      website: '',
      type: 'Big Company',
      priority: 'Urgent',
      assigneeName: '',
      assigneeInitials: '',
      contactName: '',
      contactRole: '',
      contactPhone: '',
      contactEmail: '',
      contactAddress: '',
      contactFirstContact: '',
      contactDescription: '',
      tags: [],
    })
    setNewTag('')
    setErrors({})
    onClose()
  }

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }))
      setNewTag('')
    }
  }

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }))
  }

  const getInputStyle = (fieldName: string, hasError: boolean = false) => {
    const isFocused = focusedField === fieldName
    const isHovered = hoveredField === fieldName

    return {
      width: '100%',
      height: '44px',
      padding: '12px 16px',
      background: isFocused 
        ? 'linear-gradient(180deg, #1A1A1A 0%, #141414 100%)' 
        : isHovered 
          ? '#1A1A1A' 
          : '#141414',
      border: hasError 
        ? '1px solid #DC2626' 
        : isFocused 
          ? '1px solid #008E5A' 
          : isHovered 
            ? '1px solid #404040' 
            : '1px solid #2B2B2B',
      borderRadius: '10px',
      fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
      fontStyle: 'normal' as const,
      fontWeight: 450,
      fontSize: '13px',
      lineHeight: '20px',
      letterSpacing: '0.01em',
      color: '#FAFAFA',
      outline: 'none',
      transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
      boxShadow: isFocused 
        ? '0px 0px 0px 4px rgba(0, 109, 230, 0.15), inset 0px 1px 2px rgba(0, 0, 0, 0.2)' 
        : isHovered 
          ? 'inset 0px 1px 2px rgba(0, 0, 0, 0.15)' 
          : 'inset 0px 1px 2px rgba(0, 0, 0, 0.1)',
    }
  }

  const getSelectStyle = (fieldName: string) => {
    const isFocused = focusedField === fieldName
    const isHovered = hoveredField === fieldName

    return {
      width: '100%',
      height: '44px',
      padding: '12px 40px 12px 16px',
      background: isFocused 
        ? 'linear-gradient(180deg, #1A1A1A 0%, #141414 100%)' 
        : isHovered 
          ? '#1A1A1A' 
          : '#141414',
      border: isFocused 
        ? '1px solid #008E5A' 
        : isHovered 
          ? '1px solid #404040' 
          : '1px solid #2B2B2B',
      borderRadius: '10px',
      fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
      fontStyle: 'normal' as const,
      fontWeight: 450,
      fontSize: '13px',
      lineHeight: '20px',
      letterSpacing: '0.01em',
      color: '#FAFAFA',
      outline: 'none',
      cursor: 'pointer',
      transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
      boxShadow: isFocused 
        ? '0px 0px 0px 4px rgba(0, 142, 90, 0.15), inset 0px 1px 2px rgba(0, 0, 0, 0.2)' 
        : isHovered 
          ? 'inset 0px 1px 2px rgba(0, 0, 0, 0.15)' 
          : 'inset 0px 1px 2px rgba(0, 0, 0, 0.1)',
      appearance: 'none' as const,
      backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%23999999' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'right 16px center',
    }
  }

  const labelStyle = {
    fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
    fontStyle: 'normal' as const,
    fontWeight: 500,
    fontSize: '12px',
    lineHeight: '16px',
    letterSpacing: '0.02em',
    color: '#B3B3B3',
    textTransform: 'uppercase' as const,
    marginBottom: '2px',
  }

  const sectionTitleStyle = {
    fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
    fontStyle: 'normal' as const,
    fontWeight: 600,
    fontSize: '13px',
    lineHeight: '18px',
    letterSpacing: '0.03em',
    color: '#FAFAFA',
    textTransform: 'uppercase' as const,
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  }

  return (
    <>
      {/* Backdrop with enhanced blur */}
      <div
        className="fixed inset-0 z-50"
        style={{
          background: 'rgba(0, 0, 0, 0.75)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? 'auto' : 'none',
          transition: 'opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
        onClick={onClose}
      />

      {/* Dialog Container */}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? 'auto' : 'none',
        }}
        onClick={onClose}
      >
        <div
          className="relative w-full max-w-4xl"
          style={{
            background: 'linear-gradient(180deg, #161616 0%, #0D0D0D 100%)',
            border: '1px solid #2B2B2B',
            borderRadius: '20px',
            boxShadow: '0px 24px 80px rgba(0, 0, 0, 0.8), 0px 8px 24px rgba(0, 0, 0, 0.5), 0px 0px 1px rgba(255, 255, 255, 0.1) inset',
            maxHeight: '90vh',
            overflow: 'hidden',
            transform: isOpen ? 'scale(1) translateY(0)' : 'scale(0.95) translateY(20px)',
            transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col h-full max-h-[90vh] overflow-hidden">
            {/* Header with gradient border */}
            <div
              className="flex flex-row items-center justify-between flex-shrink-0"
              style={{
                padding: '24px 28px',
                borderBottom: '1px solid #2B2B2B',
                background: 'linear-gradient(180deg, rgba(43, 43, 43, 0.4) 0%, rgba(43, 43, 43, 0.1) 100%)',
              }}
            >
              <div>
                <h2
                  style={{
                    fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                    fontStyle: 'normal',
                    fontWeight: 600,
                    fontSize: '20px',
                    lineHeight: '28px',
                    letterSpacing: '-0.01em',
                    color: '#FAFAFA',
                    margin: 0,
                  }}
                >
                  Add New Company
                </h2>
                <p
                  style={{
                    fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                    fontSize: '13px',
                    color: '#666666',
                    margin: 0,
                    marginTop: '2px',
                  }}
                >
                  Fill in the details to create a new company record
                </p>
              </div>
              <button
                onClick={onClose}
                className="flex items-center justify-center group"
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  background: 'transparent',
                  border: '1px solid transparent',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'
                  e.currentTarget.style.border = '1px solid #2B2B2B'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent'
                  e.currentTarget.style.border = '1px solid transparent'
                }}
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M13.5 4.5L4.5 13.5M4.5 4.5L13.5 13.5"
                    stroke="#666666"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>

            {/* Scrollable Content */}
            <div 
              className="flex-1 overflow-y-auto" 
              style={{ 
                padding: '28px',
                scrollbarWidth: 'thin',
                scrollbarColor: '#2B2B2B transparent',
              }}
            >
              <form onSubmit={handleSubmit} className="flex flex-col gap-8 dialog-scroll">
                
                {/* Basic Information Section */}
                <div className="flex flex-col gap-5">
                  <div style={sectionTitleStyle}>
                    <div style={{
                      width: '4px',
                      height: '16px',
                      borderRadius: '2px',
                      background: 'linear-gradient(180deg, #008E5A 0%, #006E47 100%)',
                    }} />
                    Basic Information
                  </div>

                  <div className="flex flex-col gap-2">
                    <label style={labelStyle}>Company Name *</label>
                    <input
                      type="text"
                      value={formData.companyName}
                      onChange={(e) => handleChange('companyName', e.target.value)}
                      onFocus={() => setFocusedField('companyName')}
                      onBlur={() => setFocusedField(null)}
                      onMouseEnter={() => setHoveredField('companyName')}
                      onMouseLeave={() => setHoveredField(null)}
                      style={getInputStyle('companyName', !!errors.companyName)}
                      placeholder="Enter company name"
                    />
                    {errors.companyName && (
                      <div className="flex items-center gap-2" style={{ marginTop: '6px' }}>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <circle cx="7" cy="7" r="6" stroke="#DC2626" strokeWidth="1.5"/>
                          <path d="M7 4V7.5" stroke="#DC2626" strokeWidth="1.5" strokeLinecap="round"/>
                          <circle cx="7" cy="9.5" r="0.75" fill="#DC2626"/>
                        </svg>
                        <span style={{ fontSize: '12px', color: '#DC2626', fontWeight: 450 }}>
                          {errors.companyName}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-5">
                    <div className="flex flex-col gap-2">
                      <label style={labelStyle}>Email *</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField(null)}
                        onMouseEnter={() => setHoveredField('email')}
                        onMouseLeave={() => setHoveredField(null)}
                        style={getInputStyle('email', !!errors.email)}
                        placeholder="company@example.com"
                      />
                      {errors.email && (
                        <div className="flex items-center gap-2" style={{ marginTop: '6px' }}>
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <circle cx="7" cy="7" r="6" stroke="#DC2626" strokeWidth="1.5"/>
                            <path d="M7 4V7.5" stroke="#DC2626" strokeWidth="1.5" strokeLinecap="round"/>
                            <circle cx="7" cy="9.5" r="0.75" fill="#DC2626"/>
                          </svg>
                          <span style={{ fontSize: '12px', color: '#DC2626', fontWeight: 450 }}>
                            {errors.email}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col gap-2">
                      <label style={labelStyle}>Phone</label>
                      <input
                        type="text"
                        value={formData.phone}
                        onChange={(e) => handleChange('phone', e.target.value)}
                        onFocus={() => setFocusedField('phone')}
                        onBlur={() => setFocusedField(null)}
                        onMouseEnter={() => setHoveredField('phone')}
                        onMouseLeave={() => setHoveredField(null)}
                        style={getInputStyle('phone')}
                        placeholder="770 330 620 94"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label style={labelStyle}>Address *</label>
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) => handleChange('address', e.target.value)}
                      onFocus={() => setFocusedField('address')}
                      onBlur={() => setFocusedField(null)}
                      onMouseEnter={() => setHoveredField('address')}
                      onMouseLeave={() => setHoveredField(null)}
                      style={getInputStyle('address', !!errors.address)}
                      placeholder="Enter company address"
                    />
                    {errors.address && (
                      <div className="flex items-center gap-2" style={{ marginTop: '6px' }}>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <circle cx="7" cy="7" r="6" stroke="#DC2626" strokeWidth="1.5"/>
                          <path d="M7 4V7.5" stroke="#DC2626" strokeWidth="1.5" strokeLinecap="round"/>
                          <circle cx="7" cy="9.5" r="0.75" fill="#DC2626"/>
                        </svg>
                        <span style={{ fontSize: '12px', color: '#DC2626', fontWeight: 450 }}>
                          {errors.address}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col gap-2">
                    <label style={labelStyle}>Description</label>
                    <textarea
                      value={formData.content}
                      onChange={(e) => handleChange('content', e.target.value)}
                      onFocus={() => setFocusedField('content')}
                      onBlur={() => setFocusedField(null)}
                      onMouseEnter={() => setHoveredField('content')}
                      onMouseLeave={() => setHoveredField(null)}
                      rows={3}
                      style={{
                        ...getInputStyle('content'),
                        height: 'auto',
                        minHeight: '100px',
                        resize: 'vertical',
                        paddingTop: '14px',
                      }}
                      placeholder="Enter company description..."
                    />
                  </div>
                </div>

                {/* Divider */}
                <div
                  style={{
                    height: '1px',
                    background: 'linear-gradient(90deg, transparent 0%, #2B2B2B 20%, #2B2B2B 80%, transparent 100%)',
                    width: '100%',
                  }}
                />

                {/* Additional Information Section */}
                <div className="flex flex-col gap-5">
                  <div style={sectionTitleStyle}>
                    <div style={{
                      width: '4px',
                      height: '16px',
                      borderRadius: '2px',
                      background: 'linear-gradient(180deg, #008E5A 0%, #006E47 100%)',
                    }} />
                    Additional Information
                  </div>

                  <div className="grid grid-cols-2 gap-5">
                    <div className="flex flex-col gap-2">
                      <label style={labelStyle}>State *</label>
                      <select
                        value={formData.state}
                        onChange={(e) => handleChange('state', e.target.value)}
                        onFocus={() => setFocusedField('state')}
                        onBlur={() => setFocusedField(null)}
                        onMouseEnter={() => setHoveredField('state')}
                        onMouseLeave={() => setHoveredField(null)}
                        style={getSelectStyle('state')}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Active">Active</option>
                        <option value="Not Active">Not Active</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label style={labelStyle}>Total Amount *</label>
                      <input
                        type="text"
                        value={formData.totalAmount}
                        onChange={(e) => handleChange('totalAmount', e.target.value)}
                        onFocus={() => setFocusedField('totalAmount')}
                        onBlur={() => setFocusedField(null)}
                        onMouseEnter={() => setHoveredField('totalAmount')}
                        onMouseLeave={() => setHoveredField(null)}
                        style={getInputStyle('totalAmount', !!errors.totalAmount)}
                        placeholder="0"
                      />
                      {errors.totalAmount && (
                        <div className="flex items-center gap-2" style={{ marginTop: '6px' }}>
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <circle cx="7" cy="7" r="6" stroke="#DC2626" strokeWidth="1.5"/>
                            <path d="M7 4V7.5" stroke="#DC2626" strokeWidth="1.5" strokeLinecap="round"/>
                            <circle cx="7" cy="9.5" r="0.75" fill="#DC2626"/>
                          </svg>
                          <span style={{ fontSize: '12px', color: '#DC2626', fontWeight: 450 }}>
                            {errors.totalAmount}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-5">
                    <div className="flex flex-col gap-2">
                      <label style={labelStyle}>Type</label>
                      <select
                        value={formData.type}
                        onChange={(e) => handleChange('type', e.target.value)}
                        onFocus={() => setFocusedField('type')}
                        onBlur={() => setFocusedField(null)}
                        onMouseEnter={() => setHoveredField('type')}
                        onMouseLeave={() => setHoveredField(null)}
                        style={getSelectStyle('type')}
                      >
                        <option value="Big Company">Big Company</option>
                        <option value="Small Company">Small Company</option>
                        <option value="Medium Company">Medium Company</option>
                        <option value="Startup">Startup</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label style={labelStyle}>Priority</label>
                      <select
                        value={formData.priority}
                        onChange={(e) => handleChange('priority', e.target.value)}
                        onFocus={() => setFocusedField('priority')}
                        onBlur={() => setFocusedField(null)}
                        onMouseEnter={() => setHoveredField('priority')}
                        onMouseLeave={() => setHoveredField(null)}
                        style={getSelectStyle('priority')}
                      >
                        <option value="Urgent">Urgent</option>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label style={labelStyle}>Website</label>
                    <input
                      type="text"
                      value={formData.website}
                      onChange={(e) => handleChange('website', e.target.value)}
                      onFocus={() => setFocusedField('website')}
                      onBlur={() => setFocusedField(null)}
                      onMouseEnter={() => setHoveredField('website')}
                      onMouseLeave={() => setHoveredField(null)}
                      style={getInputStyle('website')}
                      placeholder="www.example.com"
                    />
                  </div>

                  {/* Tags Section */}
                  <div className="flex flex-col gap-3">
                    <label style={labelStyle}>Tags</label>
                    {formData.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {formData.tags.map((tag, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-2 px-3 py-1.5"
                            style={{
                              background: 'linear-gradient(135deg, rgba(88, 66, 200, 0.4) 0%, rgba(88, 66, 200, 0.2) 100%)',
                              border: '1px solid rgba(88, 66, 200, 0.5)',
                              borderRadius: '8px',
                              color: '#FFFFFF',
                              fontSize: '12px',
                              fontWeight: 500,
                              transition: 'all 0.2s ease',
                            }}
                          >
                            <span>{tag}</span>
                            <button
                              type="button"
                              onClick={() => removeTag(tag)}
                              style={{
                                background: 'transparent',
                                border: 'none',
                                color: 'rgba(255, 255, 255, 0.6)',
                                cursor: 'pointer',
                                padding: '0',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '16px',
                                height: '16px',
                                borderRadius: '4px',
                                transition: 'all 0.2s ease',
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'
                                e.currentTarget.style.color = '#FFFFFF'
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.background = 'transparent'
                                e.currentTarget.style.color = 'rgba(255, 255, 255, 0.6)'
                              }}
                            >
                              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                                <path d="M7.5 2.5L2.5 7.5M2.5 2.5L7.5 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                              </svg>
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                    <div className="flex gap-3">
                      <input
                        type="text"
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault()
                            addTag()
                          }
                        }}
                        onFocus={() => setFocusedField('newTag')}
                        onBlur={() => setFocusedField(null)}
                        onMouseEnter={() => setHoveredField('newTag')}
                        onMouseLeave={() => setHoveredField(null)}
                        style={getInputStyle('newTag')}
                        placeholder="Add tag and press Enter"
                      />
                      <button
                        type="button"
                        onClick={addTag}
                        style={{
                          width: 'auto',
                          height: '44px',
                          padding: '12px 20px',
                          background: hoveredField === 'addTagBtn' 
                            ? 'linear-gradient(180deg, #333333 0%, #2B2B2B 100%)' 
                            : '#2B2B2B',
                          border: '1px solid #404040',
                          borderRadius: '10px',
                          color: '#FAFAFA',
                          fontSize: '13px',
                          fontWeight: 500,
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          whiteSpace: 'nowrap',
                        }}
                        onMouseEnter={() => setHoveredField('addTagBtn')}
                        onMouseLeave={() => setHoveredField(null)}
                      >
                        Add Tag
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-5">
                    <div className="flex flex-col gap-2">
                      <label style={labelStyle}>Assignee Name</label>
                      <input
                        type="text"
                        value={formData.assigneeName}
                        onChange={(e) => handleChange('assigneeName', e.target.value)}
                        onFocus={() => setFocusedField('assigneeName')}
                        onBlur={() => setFocusedField(null)}
                        onMouseEnter={() => setHoveredField('assigneeName')}
                        onMouseLeave={() => setHoveredField(null)}
                        style={getInputStyle('assigneeName')}
                        placeholder="Enter assignee name"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label style={labelStyle}>Assignee Initials</label>
                      <input
                        type="text"
                        value={formData.assigneeInitials}
                        onChange={(e) => handleChange('assigneeInitials', e.target.value.toUpperCase())}
                        maxLength={2}
                        onFocus={() => setFocusedField('assigneeInitials')}
                        onBlur={() => setFocusedField(null)}
                        onMouseEnter={() => setHoveredField('assigneeInitials')}
                        onMouseLeave={() => setHoveredField(null)}
                        style={getInputStyle('assigneeInitials')}
                        placeholder="AR"
                      />
                    </div>
                  </div>
                </div>

                {/* Footer Actions */}
                <div
                  className="flex flex-row items-center justify-end gap-4 flex-shrink-0"
                  style={{
                    paddingTop: '20px',
                    borderTop: '1px solid #2B2B2B',
                    marginTop: '8px',
                  }}
                >
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex items-center justify-center gap-2"
                    style={{
                      height: '44px',
                      padding: '12px 24px',
                      background: 'transparent',
                      border: '1px solid #2B2B2B',
                      borderRadius: '10px',
                      fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                      fontStyle: 'normal',
                      fontWeight: 500,
                      fontSize: '14px',
                      lineHeight: '20px',
                      letterSpacing: '0.01em',
                      color: '#999999',
                      cursor: 'pointer',
                      transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#1A1A1A'
                      e.currentTarget.style.borderColor = '#404040'
                      e.currentTarget.style.color = '#FAFAFA'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent'
                      e.currentTarget.style.borderColor = '#2B2B2B'
                      e.currentTarget.style.color = '#999999'
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex items-center justify-center gap-2"
                    style={{
                      height: '44px',
                      padding: '12px 28px',
                      background: 'linear-gradient(135deg, #008E5A 0%, #006E47 100%)',
                      border: 'none',
                      borderRadius: '10px',
                      boxShadow: '0px 2px 8px rgba(0, 142, 90, 0.3), inset 0px 1px 0px rgba(255, 255, 255, 0.1)',
                      fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                      fontStyle: 'normal',
                      fontWeight: 600,
                      fontSize: '14px',
                      lineHeight: '20px',
                      letterSpacing: '0.01em',
                      color: '#FFFFFF',
                      cursor: 'pointer',
                      transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)'
                      e.currentTarget.style.boxShadow = '0px 8px 24px rgba(0, 142, 90, 0.4), inset 0px 1px 0px rgba(255, 255, 255, 0.15)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)'
                      e.currentTarget.style.boxShadow = '0px 2px 8px rgba(0, 142, 90, 0.3), inset 0px 1px 0px rgba(255, 255, 255, 0.1)'
                    }}
                    onMouseDown={(e) => {
                      e.currentTarget.style.transform = 'translateY(0) scale(0.98)'
                    }}
                    onMouseUp={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px) scale(1)'
                    }}
                  >
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <path d="M9 3.75V14.25M3.75 9H14.25" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                    Add Company
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}