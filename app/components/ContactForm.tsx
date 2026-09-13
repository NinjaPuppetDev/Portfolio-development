'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'

export default function ContactForm() {
  const t = useTranslations('home.contactForm')
  const [contactName, setContactName] = useState('')
  const [contactEmail, setContactEmail] = useState('')
  const [contactMessage, setContactMessage] = useState('')
  const [contactStatus, setContactStatus] = useState('idle')
  const [contactError, setContactError] = useState('')

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
  }

  const handleContactSubmit = async () => {
    if (!contactName.trim() || !contactEmail.trim() || !contactMessage.trim()) {
      setContactError(t('errors.required'))
      setContactStatus('error')
      return
    }

    if (!isValidEmail(contactEmail)) {
      setContactError(t('errors.email'))
      setContactStatus('error')
      return
    }

    setContactStatus('loading')
    setContactError('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: contactName, email: contactEmail, message: contactMessage }),
      })
      const data = await res.json()
      if (!res.ok || data.error) {
        setContactError(data.error ?? t('errors.generic'))
        setContactStatus('error')
      } else {
        setContactStatus('success')
        setContactName('')
        setContactEmail('')
        setContactMessage('')
      }
    } catch {
      setContactError(t('errors.connection'))
      setContactStatus('error')
    }
  }

  // Input styling block to avoid code redundancy
  const inputFieldStyles = {
    backgroundColor: '#050505',
    border: '1px solid rgba(0, 0, 0, 0.6)',
    borderTopColor: 'rgba(0, 0, 0, 0.8)',
    borderBottomColor: 'rgba(255, 255, 255, 0.04)',
    borderRightColor: 'rgba(255, 255, 255, 0.02)',
    borderRadius: '8px',
    color: '#FFFFFF',
    fontFamily: 'var(--sans)',
    fontSize: '0.875rem',
    padding: '0.85rem 1.1rem',
    outline: 'none',
    width: '100%',
    boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.85)',
    transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
  }

  const handleInputFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)'
    e.currentTarget.style.boxShadow = 'inset 0 2px 6px rgba(0, 0, 0, 0.95), 0 0 0 1px rgba(255,255,255,0.05)'
  }

  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.6)'
    e.currentTarget.style.borderTopColor = 'rgba(0, 0, 0, 0.8)'
    e.currentTarget.style.borderBottomColor = 'rgba(255, 255, 255, 0.04)'
    e.currentTarget.style.borderRightColor = 'rgba(255, 255, 255, 0.02)'
    e.currentTarget.style.boxShadow = 'inset 0 2px 4px rgba(0, 0, 0, 0.85)'
  }

  if (contactStatus === 'success') {
    return (
      <div style={{
        backgroundColor: '#0A0A0A',
        borderTop: '1px solid rgba(255, 255, 255, 0.12)',
        borderLeft: '1px solid rgba(255, 255, 255, 0.05)',
        borderRight: '1px solid rgba(0, 0, 0, 0.6)',
        borderBottom: '1px solid rgba(0, 0, 0, 0.8)',
        borderRadius: '16px',
        padding: '2.5rem 2rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.85rem',
        boxShadow: '0 24px 48px -12px rgba(0, 0, 0, 0.8), inset 0 1px 1px rgba(255, 255, 255, 0.02)'
      }}>
        <p style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', color: 'var(--accent)', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 600 }}>{t('success.title')} ✓</p>
        <p style={{ fontFamily: 'var(--sans)', fontSize: '0.875rem', color: 'var(--muted)', lineHeight: 1.7 }}>{t('success.body')}</p>
        
        <button 
          onClick={() => setContactStatus('idle')} 
          style={{ 
            alignSelf: 'flex-start', 
            background: 'rgba(255,255,255,0.03)', 
            borderTop: '1px solid rgba(255,255,255,0.08)',
            borderLeft: '1px solid rgba(255,255,255,0.04)',
            borderBottom: '1px solid rgba(0,0,0,0.4)',
            borderRight: '1px solid rgba(0,0,0,0.2)',
            borderRadius: '20px',
            color: 'var(--text)', 
            fontFamily: 'var(--mono)', 
            fontSize: '0.6rem', 
            letterSpacing: '0.1em', 
            textTransform: 'uppercase', 
            padding: '0.45rem 1.1rem', 
            cursor: 'pointer', 
            marginTop: '0.75rem',
            boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
            transition: 'all 0.2s'
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.07)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)' }}
        >
          {t('success.again')}
        </button>
      </div>
    )
  }

  return (
    <div style={{ 
      backgroundColor: '#0A0A0A',
      borderTop: '1px solid rgba(255, 255, 255, 0.1)',
      borderLeft: '1px solid rgba(255, 255, 255, 0.05)',
      borderRight: '1px solid rgba(0, 0, 0, 0.5)',
      borderBottom: '1px solid rgba(0, 0, 0, 0.7)',
      borderRadius: '16px',
      padding: '2rem',
      display: 'flex', 
      flexDirection: 'column', 
      gap: '1.25rem', 
      position: 'relative', 
      zIndex: 1,
      boxShadow: '0 24px 48px -12px rgba(0, 0, 0, 0.75)'
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
        <label style={{ fontFamily: 'var(--mono)', fontSize: '0.58rem', color: 'var(--muted)', letterSpacing: '0.15em', textTransform: 'uppercase', opacity: 0.6 }}>{t('fields.name.label')}</label>
        <input 
          type="text" 
          value={contactName} 
          onChange={e => setContactName(e.target.value)} 
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          placeholder={t('fields.name.placeholder')} 
          style={inputFieldStyles} 
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
        <label style={{ fontFamily: 'var(--mono)', fontSize: '0.58rem', color: 'var(--muted)', letterSpacing: '0.15em', textTransform: 'uppercase', opacity: 0.6 }}>{t('fields.email.label')}</label>
        <input 
          type="email" 
          value={contactEmail} 
          onChange={e => setContactEmail(e.target.value)} 
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          placeholder={t('fields.email.placeholder')} 
          style={inputFieldStyles} 
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
        <label style={{ fontFamily: 'var(--mono)', fontSize: '0.58rem', color: 'var(--muted)', letterSpacing: '0.15em', textTransform: 'uppercase', opacity: 0.6 }}>{t('fields.message.label')}</label>
        <textarea 
          value={contactMessage} 
          onChange={e => setContactMessage(e.target.value)} 
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          placeholder={t('fields.message.placeholder')} 
          rows={5} 
          style={{ ...inputFieldStyles, resize: 'vertical', lineHeight: 1.6 }} 
        />
      </div>

      {contactStatus === 'error' && contactError && (
        <p style={{ fontFamily: 'var(--mono)', fontSize: '0.6rem', color: '#ff4444', marginTop: '-0.25rem' }}>
          ▸ {contactError}
        </p>
      )}

      {/* Extruded Neumorphic Action Button */}
      <button 
        onClick={handleContactSubmit} 
        disabled={contactStatus === 'loading'} 
        style={{ 
          background: contactStatus === 'loading' 
            ? 'rgba(255,255,255,0.02)' 
            : 'linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.01) 100%)', 
          borderTop: '1px solid rgba(255, 255, 255, 0.12)',
          borderLeft: '1px solid rgba(255, 255, 255, 0.05)',
          borderRight: '1px solid rgba(0, 0, 0, 0.4)',
          borderBottom: '1px solid rgba(0, 0, 0, 0.6)',
          borderRadius: '24px',
          color: '#FFFFFF', 
          fontFamily: 'var(--mono)', 
          fontSize: '0.65rem', 
          fontWeight: 600,
          letterSpacing: '0.15em', 
          textTransform: 'uppercase', 
          padding: '0.85rem 2.2rem', 
          cursor: contactStatus === 'loading' ? 'not-allowed' : 'pointer', 
          alignSelf: 'flex-start',
          boxShadow: '0 6px 14px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255,255,255,0.02)',
          transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
          marginTop: '0.5rem'
        }}
        onMouseEnter={e => {
          if (contactStatus !== 'loading') {
            e.currentTarget.style.transform = 'translateY(-0.5px)'
            e.currentTarget.style.background = 'linear-gradient(180deg, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0.02) 100%)'
            e.currentTarget.style.boxShadow = '0 8px 18px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255,255,255,0.04)'
          }
        }}
        onMouseLeave={e => {
          if (contactStatus !== 'loading') {
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.background = 'linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.01) 100%)'
            e.currentTarget.style.boxShadow = '0 6px 14px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255,255,255,0.02)'
          }
        }}
      >
        {contactStatus === 'loading' ? t('submitting') : t('submit')}
      </button>
    </div>
  )
}