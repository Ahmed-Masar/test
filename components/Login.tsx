'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { loginAsync, clearError } from '@/store/authSlice'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { isLoading, error, isAuthenticated } = useAppSelector((state) => state.auth)
  const hasRedirectedRef = useRef(false)

  useEffect(() => {
    if (isAuthenticated && !hasRedirectedRef.current) {
      hasRedirectedRef.current = true
      router.replace('/dashboard')
    }
  }, [isAuthenticated, router])

  useEffect(() => {
    return () => {
      dispatch(clearError())
    }
  }, [dispatch])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    dispatch(clearError())
    
    const result = await dispatch(loginAsync({ email, password, rememberMe }))
    
    if (loginAsync.fulfilled.match(result) && !hasRedirectedRef.current) {
      hasRedirectedRef.current = true
      router.replace('/dashboard')
    }
  }

  return (
    <div 
      className="flex flex-col items-center justify-center"
      style={{ 
        width: '100%', 
        height: '100vh',
        padding: '0px',
        position: 'relative'
      }}
    >
      <div 
        className="flex flex-col items-center justify-center"
        style={{ 
          width: '100%', 
          padding: '0px'
        }}
      >
        <div 
          className="flex flex-col items-center justify-center"
          style={{ 
            width: '398px', 
            height: '659px',
            padding: '24px',
            maxWidth: '100%'
          }}
        >
          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col items-start gap-5" style={{ width: '350px', height: '302px' }}>
            {/* Header */}
            <div className="flex flex-col items-center pb-3 gap-1" style={{ width: '350px', height: '48px', padding: '0px 0px 12px' }}>
              <div className="flex flex-col items-center" style={{ width: '350px', height: '16px' }}>
                <h1 
                  className="flex items-center justify-center text-center"
                  style={{
                    width: '350px',
                    height: '16px',
                    fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                    fontStyle: 'normal',
                    fontWeight: 510,
                    fontSize: '12px',
                    lineHeight: '16px',
                    letterSpacing: '0.005em',
                    color: '#FAFAFA',
                    margin: 0,
                    textAlign: 'center'
                  }}
                >
                  Sign In
                </h1>
              </div>
              <div className="flex flex-col items-center" style={{ width: '350px', height: '16px' }}>
                <p
                  className="flex items-center justify-center text-center"
                  style={{
                    width: '350px',
                    height: '16px',
                    fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                    fontStyle: 'normal',
                    fontWeight: 510,
                    fontSize: '12px',
                    lineHeight: '16px',
                    letterSpacing: '0.005em',
                    color: '#71717B',
                    margin: 0,
                    textAlign: 'center'
                  }}
                >
                  Welcome back! Log in with your credentials.
                </p>
              </div>
            </div>

            {/* Email Input */}
            <div className="flex flex-col items-start gap-2.5" style={{ width: '350px', height: '60px', padding: '0px' }}>
              <label
                htmlFor="email"
                className="flex flex-col items-start"
                style={{ width: '350px', height: '16px', padding: '0px' }}
              >
                <span
                  className="flex items-center"
                  style={{
                    width: '350px',
                    height: '16px',
                    fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                    fontStyle: 'normal',
                    fontWeight: 510,
                    fontSize: '12px',
                    lineHeight: '16px',
                    letterSpacing: '0.005em',
                    color: '#FAFAFA',
                    margin: 0
                  }}
                >
                  Email
                </span>
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full input-field"
                style={{
                  boxSizing: 'border-box',
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'flex-start',
                  padding: '9.5px 13px',
                  width: '350px',
                  height: '34px',
                  background: '#141414',
                  border: '1px solid #27272A',
                  boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)',
                  borderRadius: '8px',
                  fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                  fontStyle: 'normal',
                  fontWeight: 510,
                  fontSize: '12px',
                  lineHeight: '16px',
                  letterSpacing: '0.005em',
                  color: '#FAFAFA',
                  outline: 'none',
                  margin: 0,
                  transition: 'all 0.3s ease'
                }}
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Password Input */}
            <div className="flex flex-col items-start gap-2.5 relative" style={{ width: '350px', height: '60px', padding: '0px' }}>
              <div className="flex flex-row items-center" style={{ width: '350px', height: '16px', padding: '0px' }}>
                <label
                  htmlFor="password"
                  className="flex flex-col items-start"
                  style={{ width: '57px', height: '16px', padding: '0px' }}
                >
                  <span
                    className="flex items-center"
                    style={{
                      width: '57px',
                      height: '16px',
                      fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                      fontStyle: 'normal',
                      fontWeight: 510,
                      fontSize: '12px',
                      lineHeight: '16px',
                      letterSpacing: '0.005em',
                      color: '#FAFAFA',
                      margin: 0
                    }}
                  >
                    Password
                  </span>
                </label>
              </div>
              <div className="relative" style={{ width: '350px', height: '34px', isolation: 'isolate', padding: '0px' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full input-field"
                  style={{
                    boxSizing: 'border-box',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    padding: '9.5px 50px 9.5px 13px',
                    width: '350px',
                    height: '34px',
                    background: '#141414',
                    border: '1px solid #27272A',
                    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)',
                    borderRadius: '8px',
                    fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                    fontStyle: 'normal',
                    fontWeight: 510,
                    fontSize: '12px',
                    lineHeight: '16px',
                    letterSpacing: '0.005em',
                    color: '#FAFAFA',
                    outline: 'none',
                    zIndex: 0,
                    margin: 0,
                    transition: 'all 0.3s ease'
                  }}
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 top-0 bottom-0 flex flex-row justify-center items-center eye-button"
                  style={{
                    position: 'absolute',
                    width: '50px',
                    right: '0px',
                    top: '0%',
                    bottom: '0%',
                    borderRadius: '6px',
                    zIndex: 1,
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '0px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.3s ease'
                  }}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  <svg
                    width="34"
                    height="34"
                    viewBox="0 0 34 34"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ flexShrink: 0, transition: 'all 0.3s ease' }}
                  >
                    {showPassword ? (
                      // Eye open (without slash line)
                      <>
                        <path d="M23.18 15.12C22.9867 14.8133 22.78 14.5266 22.5667 14.26C22.32 13.9466 21.8533 13.92 21.5733 14.2L19.5733 16.2C19.72 16.64 19.7467 17.1466 19.6133 17.6733C19.38 18.6133 18.62 19.3733 17.68 19.6066C17.1533 19.74 16.6467 19.7133 16.2067 19.5666C16.2067 19.5666 15.2533 20.52 14.5667 21.2066C14.2333 21.54 14.34 22.1266 14.7867 22.3C15.5 22.5733 16.24 22.7133 17 22.7133C18.1867 22.7133 19.34 22.3666 20.3933 21.72C21.4667 21.0533 22.4333 20.0733 23.2133 18.8266C23.8467 17.82 23.8133 16.1266 23.18 15.12Z" fill="#999999"/>
                        <path d="M18.3467 15.6533L15.6533 18.3467C15.3133 18 15.0933 17.52 15.0933 17C15.0933 15.9533 15.9467 15.0933 17 15.0933C17.52 15.0933 18 15.3133 18.3467 15.6533Z" fill="#999999"/>
                        <path d="M21.1666 12.8333L18.9066 15.0933C18.42 14.6 17.7466 14.3067 17 14.3067C15.5066 14.3067 14.3066 15.5133 14.3066 17C14.3066 17.7467 14.6066 18.42 15.0933 18.9067L12.84 21.1667H12.8333C12.0933 20.5667 11.4133 19.8 10.8333 18.8933C10.1666 17.8467 10.1666 16.1467 10.8333 15.1C11.6066 13.8867 12.5533 12.9333 13.6066 12.28C14.66 11.64 15.8133 11.2867 17 11.2867C18.4866 11.2867 19.9266 11.8333 21.1666 12.8333Z" fill="#999999"/>
                        <path d="M18.9067 17C18.9067 18.0467 18.0533 18.9067 17 18.9067C16.96 18.9067 16.9267 18.9067 16.8867 18.8933L18.8933 16.8867C18.9067 16.9267 18.9067 16.96 18.9067 17Z" fill="#999999"/>
                      </>
                    ) : (
                      // Eye closed (with slash line)
                      <>
                        <path d="M23.18 15.12C22.9867 14.8133 22.78 14.5266 22.5667 14.26C22.32 13.9466 21.8533 13.92 21.5733 14.2L19.5733 16.2C19.72 16.64 19.7467 17.1466 19.6133 17.6733C19.38 18.6133 18.62 19.3733 17.68 19.6066C17.1533 19.74 16.6467 19.7133 16.2067 19.5666C16.2067 19.5666 15.2533 20.52 14.5667 21.2066C14.2333 21.54 14.34 22.1266 14.7867 22.3C15.5 22.5733 16.24 22.7133 17 22.7133C18.1867 22.7133 19.34 22.3666 20.3933 21.72C21.4667 21.0533 22.4333 20.0733 23.2133 18.8266C23.8467 17.82 23.8133 16.1266 23.18 15.12Z" fill="#999999"/>
                        <path d="M18.3467 15.6533L15.6533 18.3467C15.3133 18 15.0933 17.52 15.0933 17C15.0933 15.9533 15.9467 15.0933 17 15.0933C17.52 15.0933 18 15.3133 18.3467 15.6533Z" fill="#999999"/>
                        <path d="M21.1666 12.8333L18.9066 15.0933C18.42 14.6 17.7466 14.3067 17 14.3067C15.5066 14.3067 14.3066 15.5133 14.3066 17C14.3066 17.7467 14.6066 18.42 15.0933 18.9067L12.84 21.1667H12.8333C12.0933 20.5667 11.4133 19.8 10.8333 18.8933C10.1666 17.8467 10.1666 16.1467 10.8333 15.1C11.6066 13.8867 12.5533 12.9333 13.6066 12.28C14.66 11.64 15.8133 11.2867 17 11.2867C18.4866 11.2867 19.9266 11.8333 21.1666 12.8333Z" fill="#999999"/>
                        <path d="M18.9067 17C18.9067 18.0467 18.0533 18.9067 17 18.9067C16.96 18.9067 16.9267 18.9067 16.8867 18.8933L18.8933 16.8867C18.9067 16.9267 18.9067 16.96 18.9067 17Z" fill="#999999"/>
                        <path d="M23.5133 10.4867C23.3133 10.2867 22.9867 10.2867 22.7867 10.4867L10.4867 22.7933C10.2867 22.9933 10.2867 23.32 10.4867 23.52C10.5867 23.6133 10.7133 23.6667 10.8467 23.6667C10.98 23.6667 11.1067 23.6133 11.2067 23.5133L23.5133 11.2067C23.72 11.0067 23.72 10.6867 23.5133 10.4867Z" fill="#999999"/>
                      </>
                    )}
                  </svg>
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div 
              className="flex flex-row justify-between items-center"
              style={{ width: '350px', height: '20px', padding: '0px', gap: '107.46px' }}
            >
              <div className="flex flex-row items-center gap-2" style={{ width: '113px', height: '20px', isolation: 'isolate', padding: '0px', margin: '0 auto' }}>
                <label className="flex items-center cursor-pointer relative gap-2 checkbox-label">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="absolute opacity-0 cursor-pointer"
                    style={{
                      position: 'absolute',
                      width: '20px',
                      height: '20px',
                      left: '0px',
                      top: '0px',
                      background: '#006DE6',
                      opacity: 0,
                      borderRadius: '2.5px',
                      zIndex: 2
                    }}
                  />
                  <div
                    className="checkbox-box"
                    style={{
                      boxSizing: 'border-box',
                      width: '20px',
                      height: '20px',
                      background: rememberMe ? '#006DE6' : 'transparent',
                      border: '1px solid #006DE6',
                      borderRadius: '8px',
                      zIndex: 0,
                      flexShrink: 0,
                      padding: '0px',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    {rememberMe && (
                      <div className="flex flex-row justify-center items-center" style={{ width: '100%', height: '100%', padding: '0px' }}>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M2.33333 7L5.25 9.91667L11.6667 3.5"
                            stroke="white"
                            strokeWidth="1.16667"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                  <span
                    className="flex items-center"
                    style={{
                      width: '85px',
                      height: '16px',
                      fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                      fontStyle: 'normal',
                      fontWeight: 510,
                      fontSize: '12px',
                      lineHeight: '16px',
                      letterSpacing: '0.005em',
                      color: '#FAFAFA',
                      zIndex: 1,
                      margin: 0,
                      padding: '0px'
                    }}
                  >
                    Remember me
                  </span>
                </label>
              </div>
              <a
                href="#"
                className="flex flex-col items-start animated-link"
                style={{ width: '105px', height: '16px', padding: '0px', margin: '0 auto', position: 'relative' }}
              >
                <span
                  className="flex items-center"
                  style={{
                    width: '105px',
                    height: '16px',
                    fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                    fontStyle: 'normal',
                    fontWeight: 510,
                    fontSize: '12px',
                    lineHeight: '16px',
                    letterSpacing: '0.005em',
                    color: '#FAFAFA',
                    textDecoration: 'none',
                    margin: 0,
                    transition: 'color 0.3s ease'
                  }}
                >
                  Forgot Password?
                </span>
              </a>
            </div>

            {error && (
              <div
                style={{
                  width: '350px',
                  padding: '8px 12px',
                  background: '#7F1D1D',
                  border: '1px solid #991B1B',
                  borderRadius: '8px',
                  fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                  fontStyle: 'normal',
                  fontWeight: 510,
                  fontSize: '12px',
                  lineHeight: '16px',
                  color: '#FCA5A5',
                  margin: 0,
                }}
              >
                {error}
              </div>
            )}

            {/* Sign In Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="sign-in-button flex flex-row justify-center items-center"
              style={{
                width: '350px',
                height: '34px',
                padding: '7.21px 12px 7.79px',
                background: isLoading
                  ? '#3a3a3f'
                  : 'linear-gradient(269.46deg, #059BFD 0%, #006BE5 100%)',
                boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)',
                borderRadius: '8px',
                border: 'none',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                margin: 0,
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                opacity: isLoading ? 0.6 : 1,
              }}
            >
              <span
                className="flex items-center justify-center text-center"
                style={{
                  width: '100%',
                  height: '16px',
                  fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                  fontStyle: 'normal',
                  fontWeight: 510,
                  fontSize: '12px',
                  lineHeight: '16px',
                  letterSpacing: '0.005em',
                  color: '#FFFFFF',
                  margin: 0,
                  textAlign: 'center',
                  position: 'relative',
                  zIndex: 1
                }}
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </span>
            </button>
          </form>
        </div>

        {/* Footer Links */}
        <div
          className="flex items-center text-center"
          style={{
            width: '431px',
            height: '120px',
            fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
            fontStyle: 'normal',
            fontWeight: 510,
            fontSize: '12px',
            lineHeight: '16px',
            letterSpacing: '0.005em',
            color: '#EAEAEA',
            margin: 0,
            padding: '0px',
            position: 'absolute',
            bottom: '0px',
            left: '50%',
            transform: 'translateX(-50%)'
          }}
        >
          <div className="flex flex-col items-center gap-3" style={{ width: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center', textAlign: 'center', gap: '4px' }}>
              <span style={{ color: '#EAEAEA' }}>Switch to</span>
              <a
                href="#"
                className="animated-link"
                style={{
                  color: '#999999',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'color 0.3s ease',
                  position: 'relative'
                }}
              >
                Light mode
              </a>
            </div>
            <div className="flex items-center gap-2">
              <a
                href="#"
                className="animated-link"
                style={{
                  color: '#EAEAEA',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  textAlign: 'center',
                  position: 'relative',
                  transition: 'color 0.3s ease'
                }}
              >
                Privacy policy
              </a>
              <span style={{ color: '#EAEAEA' }}>|</span>
              <a
                href="#"
                className="animated-link"
                style={{
                  color: '#EAEAEA',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  textAlign: 'center',
                  position: 'relative',
                  transition: 'color 0.3s ease'
                }}
              >
                Terms of use
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
