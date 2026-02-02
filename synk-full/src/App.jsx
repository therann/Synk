import { useState, useEffect, useRef } from 'react'
import { supabase } from './supabase'

// Icons
const Icons = {
  Upload: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
      <polyline points="17 8 12 3 7 8"/>
      <line x1="12" y1="3" x2="12" y2="15"/>
    </svg>
  ),
  ChevronLeft: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6"/>
    </svg>
  ),
  ChevronRight: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6"/>
    </svg>
  ),
  Send: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13"/>
      <polygon points="22 2 15 22 11 13 2 9 22 2"/>
    </svg>
  ),
  Calendar: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
      <line x1="16" y1="2" x2="16" y2="6"/>
      <line x1="8" y1="2" x2="8" y2="6"/>
      <line x1="3" y1="10" x2="21" y2="10"/>
    </svg>
  ),
  Trash: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6"/>
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
    </svg>
  ),
  Chat: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>
  ),
  X: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"/>
      <line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  ),
  Plus: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19"/>
      <line x1="5" y1="12" x2="19" y2="12"/>
    </svg>
  ),
  User: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
  ),
  LogOut: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
      <polyline points="16 17 21 12 16 7"/>
      <line x1="21" y1="12" x2="9" y2="12"/>
    </svg>
  )
}

// Auth Component
function Auth({ onAuth }) {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) throw error
      } else {
        const { error } = await supabase.auth.signUp({ email, password })
        if (error) throw error
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-logo">
          <div className="auth-logo-mark">S</div>
          <div className="auth-logo-text">Synk</div>
        </div>
        
        <h1 className="auth-title">{isLogin ? 'Welcome back' : 'Create account'}</h1>
        <p className="auth-subtitle">
          {isLogin ? 'Sign in to sync your assignments' : 'Start organizing your assignments'}
        </p>

        {error && <div className="auth-error">{error}</div>}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label className="input-label">Email</label>
            <input
              type="email"
              className="input"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="input-group">
            <label className="input-label">Password</label>
            <input
              type="password"
              className="input"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Loading...' : (isLogin ? 'Sign in' : 'Create account')}
          </button>
        </form>

        <div className="auth-switch">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button onClick={() => { setIsLogin(!isLogin); setError(''); }}>
            {isLogin ? 'Sign up' : 'Sign in'}
          </button>
        </div>
      </div>
    </div>
  )
}

// Main Calendar App
function CalendarApp({ user, onSignOut }) {
  const [assignments, setAssignments] = useState([])
  const [currentDate, setCurrentDate] = useState(new Date())
  const [view, setView] = useState('calendar')
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hi! I can help manage your assignments. Try \"Add homework for Math due Friday\" or \"What's due this week?\"" }
  ])
  const [inputValue, setInputValue] = useState('')
  const [showChat, setShowChat] = useState(false)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [loading, setLoading] = useState(true)
  const chatEndRef = useRef(null)

  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  // Load assignments from Supabase
  useEffect(() => {
    loadAssignments()
    
    // Subscribe to realtime changes
    const subscription = supabase
      .channel('assignments')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'assignments' }, () => {
        loadAssignments()
      })
      .subscribe()

    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const loadAssignments = async () => {
    const { data, error } = await supabase
      .from('assignments')
      .select('*')
      .eq('user_id', user.id)
      .order('due_date', { ascending: true })

    if (!error && data) {
      setAssignments(data.map(a => ({
        id: a.id,
        title: a.title,
        class: a.class_name,
        category: a.category,
        date: new Date(a.due_date)
      })))
    }
    setLoading(false)
  }

  const addAssignment = async (assignment) => {
    const { data, error } = await supabase
      .from('assignments')
      .insert({
        user_id: user.id,
        title: assignment.title,
        class_name: assignment.class,
        category: assignment.category,
        due_date: assignment.date.toISOString()
      })
      .select()
      .single()

    if (!error && data) {
      setAssignments(prev => [...prev, {
        id: data.id,
        title: data.title,
        class: data.class_name,
        category: data.category,
        date: new Date(data.due_date)
      }])
    }
    return !error
  }

  const deleteAssignment = async (id) => {
    const { error } = await supabase
      .from('assignments')
      .delete()
      .eq('id', id)

    if (!error) {
      setAssignments(prev => prev.filter(a => a.id !== id))
    }
  }

  const updateAssignment = async (id, updates) => {
    const { error } = await supabase
      .from('assignments')
      .update({
        title: updates.title,
        class_name: updates.class,
        category: updates.category,
        due_date: updates.date.toISOString()
      })
      .eq('id', id)

    if (!error) {
      setAssignments(prev => prev.map(a => a.id === id ? { ...a, ...updates } : a))
    }
    return !error
  }

  const getDaysInMonth = (date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDay = firstDay.getDay()
    
    const result = []
    
    const prevMonth = new Date(year, month, 0)
    const prevMonthDays = prevMonth.getDate()
    for (let i = startingDay - 1; i >= 0; i--) {
      result.push({ date: new Date(year, month - 1, prevMonthDays - i), isOtherMonth: true })
    }
    
    for (let i = 1; i <= daysInMonth; i++) {
      result.push({ date: new Date(year, month, i), isOtherMonth: false })
    }
    
    const remaining = 42 - result.length
    for (let i = 1; i <= remaining; i++) {
      result.push({ date: new Date(year, month + 1, i), isOtherMonth: true })
    }
    
    return result
  }

  const getAssignmentsForDate = (date) => {
    return assignments.filter(a => 
      a.date.getDate() === date.getDate() &&
      a.date.getMonth() === date.getMonth() &&
      a.date.getFullYear() === date.getFullYear()
    )
  }

  const isToday = (date) => {
    const today = new Date()
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear()
  }

  const parseDate = (dateStr) => {
    const monthNames = {
      'jan': 0, 'january': 0, 'feb': 1, 'february': 1, 'mar': 2, 'march': 2,
      'apr': 3, 'april': 3, 'may': 4, 'jun': 5, 'june': 5, 'jul': 6, 'july': 6,
      'aug': 7, 'august': 7, 'sep': 8, 'september': 8, 'oct': 9, 'october': 9,
      'nov': 10, 'november': 10, 'dec': 11, 'december': 11
    }
    
    const dayNames = {
      'sunday': 0, 'monday': 1, 'tuesday': 2, 'wednesday': 3, 
      'thursday': 4, 'friday': 5, 'saturday': 6,
      'sun': 0, 'mon': 1, 'tue': 2, 'wed': 3, 'thu': 4, 'fri': 5, 'sat': 6
    }

    const lower = dateStr.toLowerCase()
    
    // Check for "today", "tomorrow"
    if (lower.includes('today')) return new Date()
    if (lower.includes('tomorrow')) {
      const d = new Date()
      d.setDate(d.getDate() + 1)
      return d
    }
    
    // Check for day names like "Friday"
    for (const [day, num] of Object.entries(dayNames)) {
      if (lower.includes(day)) {
        const today = new Date()
        const currentDay = today.getDay()
        let diff = num - currentDay
        if (diff <= 0) diff += 7
        const result = new Date()
        result.setDate(result.getDate() + diff)
        return result
      }
    }

    // Check for "next week"
    if (lower.includes('next week')) {
      const d = new Date()
      d.setDate(d.getDate() + 7)
      return d
    }

    const slashMatch = dateStr.match(/(\d{1,2})\/(\d{1,2})(?:\/(\d{2,4}))?/)
    if (slashMatch) {
      const month = parseInt(slashMatch[1]) - 1
      const day = parseInt(slashMatch[2])
      let year = slashMatch[3] ? parseInt(slashMatch[3]) : new Date().getFullYear()
      if (year < 100) year += 2000
      return new Date(year, month, day)
    }

    const wordMatch = dateStr.toLowerCase().match(/(\w+)\s+(\d{1,2})(?:st|nd|rd|th)?(?:,?\s*(\d{4}))?/)
    if (wordMatch) {
      const month = monthNames[wordMatch[1]]
      if (month !== undefined) {
        const day = parseInt(wordMatch[2])
        const year = wordMatch[3] ? parseInt(wordMatch[3]) : new Date().getFullYear()
        return new Date(year, month, day)
      }
    }
    return null
  }

  const processCommand = async (message) => {
    const lower = message.toLowerCase()

    // Move assignments
    if (lower.includes('move') || lower.includes('reschedule')) {
      const classMatch = lower.match(/(?:all\s+)?(\w+)\s+(?:assignments?|class|homework)/i)
      const dateMatch = message.match(/(?:to|until)\s+(.+?)(?:\.|$)/i)
      
      if (classMatch && dateMatch) {
        const targetClass = classMatch[1].toLowerCase()
        const newDate = parseDate(dateMatch[1])
        
        if (newDate) {
          let movedCount = 0
          for (const a of assignments) {
            if (a.class.toLowerCase().includes(targetClass) || a.category.includes(targetClass)) {
              await updateAssignment(a.id, { ...a, date: new Date(newDate) })
              movedCount++
            }
          }
          
          if (movedCount > 0) {
            return `Done! Moved ${movedCount} assignment${movedCount > 1 ? 's' : ''} to ${newDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}.`
          }
        }
      }
      return "Try: \"Move all Math to Friday\""
    }

    // Add assignment
    if (lower.includes('add') || lower.includes('create') || lower.includes('new')) {
      const dateMatch = message.match(/(?:due|on|by)\s+(.+?)(?:\.|$)/i)
      
      if (dateMatch) {
        const newDate = parseDate(dateMatch[1])
        if (newDate) {
          const beforeDue = message.substring(0, message.toLowerCase().indexOf(dateMatch[0].toLowerCase()))
          const titleMatch = beforeDue.match(/(?:add|create|new)\s+(.+?)(?:\s+for\s+|\s+to\s+|$)/i)
          const classMatch = beforeDue.match(/(?:for|to)\s+(\w+)/i)
          
          const title = titleMatch ? titleMatch[1].trim() : 'Assignment'
          const className = classMatch ? classMatch[1] : 'General'
          
          const success = await addAssignment({
            title: title.charAt(0).toUpperCase() + title.slice(1),
            class: className.charAt(0).toUpperCase() + className.slice(1),
            category: 'default',
            date: newDate
          })
          
          if (success) {
            return `Added "${title}" for ${className} — due ${newDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}.`
          }
        }
      }
      return "Try: \"Add essay for English due Friday\""
    }

    // Delete
    if (lower.includes('delete') || lower.includes('remove')) {
      const titleMatch = message.match(/(?:delete|remove)\s+["']?([^"']+?)["']?(?:\s+assignment)?$/i)
      
      if (titleMatch) {
        const searchTitle = titleMatch[1].toLowerCase().trim()
        const toDelete = assignments.find(a => a.title.toLowerCase().includes(searchTitle))
        
        if (toDelete) {
          await deleteAssignment(toDelete.id)
          return `Removed "${toDelete.title}".`
        }
        return `Couldn't find "${searchTitle}".`
      }
    }

    // What's due
    if (lower.includes("what's due") || lower.includes('what is due') || lower.includes('upcoming') || lower.includes('schedule')) {
      const today = new Date()
      const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)
      
      const upcoming = assignments
        .filter(a => a.date >= today && a.date <= nextWeek)
        .sort((a, b) => a.date - b.date)
      
      if (upcoming.length === 0) return "Nothing due this week! 🎉"
      
      return `This week:\n\n${upcoming.map(a => `• ${a.title} — ${a.date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}`).join('\n')}`
    }

    // Help
    if (lower.includes('help')) {
      return "I can:\n\n• Add — \"Add essay for English due Friday\"\n• Move — \"Move Math to next week\"\n• Delete — \"Delete homework\"\n• Check — \"What's due?\""
    }

    return "Try \"Add homework for Math due Friday\" or \"What's due this week?\""
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return
    const userMessage = inputValue.trim()
    setInputValue('')
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])

    const response = await processCommand(userMessage)
    setMessages(prev => [...prev, { role: 'assistant', content: response }])
  }

  const upcomingCount = assignments.filter(a => {
    const today = new Date()
    const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)
    return a.date >= today && a.date <= nextWeek
  }).length

  const urgentCount = assignments.filter(a => {
    const today = new Date()
    const threeDays = new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000)
    return a.date >= today && a.date <= threeDays
  }).length

  if (loading) {
    return <div className="loading"><div className="spinner"></div></div>
  }

  return (
    <div className="app">
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <header className="header">
          <div className="logo">
            <div className="logo-mark">S</div>
            <span className="logo-text">Synk</span>
          </div>
          <div className="header-actions">
            <div className="user-menu">
              <button className="icon-btn" onClick={() => setShowUserMenu(!showUserMenu)}>
                <Icons.User />
              </button>
              {showUserMenu && (
                <div className="user-dropdown">
                  <div className="user-dropdown-item" style={{ color: 'var(--text-muted)', fontSize: '12px' }}>
                    {user.email}
                  </div>
                  <button className="user-dropdown-item danger" onClick={onSignOut}>
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="main">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-label">Total</div>
              <div className="stat-value">{assignments.length}</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">This Week</div>
              <div className="stat-value">{upcomingCount}</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Urgent</div>
              <div className="stat-value urgent">{urgentCount}</div>
            </div>
          </div>

          <section>
            <div className="section-header">
              <div className="month-row">
                <h2 className="month-title">{months[currentDate.getMonth()]} {currentDate.getFullYear()}</h2>
                <div className="month-nav">
                  <button className="nav-btn" onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))}>
                    <Icons.ChevronLeft />
                  </button>
                  <button className="nav-btn" onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))}>
                    <Icons.ChevronRight />
                  </button>
                </div>
              </div>
              <div className="view-toggle">
                <button className={`view-btn ${view === 'calendar' ? 'active' : ''}`} onClick={() => setView('calendar')}>
                  Calendar
                </button>
                <button className={`view-btn ${view === 'list' ? 'active' : ''}`} onClick={() => setView('list')}>
                  List
                </button>
              </div>
            </div>

            <div className={`calendar-wrapper ${view !== 'calendar' ? 'hidden' : ''}`}>
              <div className="calendar">
                <div className="calendar-header">
                  {days.map(day => (
                    <div key={day} className="calendar-day-name">{day}</div>
                  ))}
                </div>
                <div className="calendar-body">
                  {getDaysInMonth(currentDate).map((day, i) => {
                    const dayAssignments = getAssignmentsForDate(day.date)
                    return (
                      <div 
                        key={i} 
                        className={`calendar-cell ${day.isOtherMonth ? 'other-month' : ''} ${isToday(day.date) ? 'today' : ''}`}
                      >
                        <div className="cell-date">{day.date.getDate()}</div>
                        <div className="cell-events">
                          {dayAssignments.slice(0, 2).map(a => (
                            <div key={a.id} className={`event-pill ${a.category}`}>
                              {a.title}
                            </div>
                          ))}
                          {dayAssignments.length > 2 && (
                            <div className="more-events">+{dayAssignments.length - 2}</div>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            <div className={`list-view ${view === 'list' ? 'active' : ''}`}>
              {assignments.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-icon"><Icons.Calendar /></div>
                  <div className="empty-title">No assignments yet</div>
                  <div className="empty-text">Tap + to add one</div>
                </div>
              ) : (
                <div className="assignment-list">
                  {[...assignments].sort((a, b) => a.date - b.date).map(a => (
                    <div key={a.id} className="list-item">
                      <div className="list-date">
                        <div className="list-date-day">{a.date.getDate()}</div>
                        <div className="list-date-month">{months[a.date.getMonth()].substring(0, 3)}</div>
                      </div>
                      <div className="list-info">
                        <div className="list-title">{a.title}</div>
                        <div className="list-class">{a.class}</div>
                      </div>
                      <button className="delete-btn" onClick={() => deleteAssignment(a.id)}>
                        <Icons.Trash />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        </main>

        {/* Mobile buttons */}
        <button className="add-btn-mobile" onClick={() => setShowAddModal(true)}>
          <Icons.Plus />
        </button>
        <button className="mobile-chat-toggle" onClick={() => setShowChat(true)}>
          <Icons.Chat />
        </button>
      </div>

      {/* Desktop Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <h3 className="sidebar-title">Assistant</h3>
          <p className="sidebar-subtitle">Manage assignments with chat</p>
        </div>
        
        <div className="chat-messages">
          {messages.map((msg, i) => (
            <div key={i} className={`message ${msg.role}`}>
              <div className="message-content">
                {msg.content.split('\n').map((line, j) => (
                  <span key={j}>{line}{j < msg.content.split('\n').length - 1 && <br />}</span>
                ))}
              </div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        <div className="chat-input-area">
          <div className="chat-input-wrapper">
            <textarea
              className="chat-input"
              placeholder="Try: Add essay due Friday"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  handleSendMessage()
                }
              }}
              rows={1}
            />
            <button className="send-btn" onClick={handleSendMessage} disabled={!inputValue.trim()}>
              <Icons.Send />
            </button>
          </div>
          <div className="quick-actions">
            <button className="quick-action" onClick={() => setInputValue("What's due?")}>What's due?</button>
            <button className="quick-action" onClick={() => setInputValue("Help")}>Help</button>
          </div>
        </div>
      </aside>

      {/* Mobile Chat */}
      <div className={`mobile-chat ${showChat ? 'open' : ''}`}>
        <div className="mobile-chat-header">
          <h3 className="mobile-chat-title">Assistant</h3>
          <button className="close-chat-btn" onClick={() => setShowChat(false)}>
            <Icons.X />
          </button>
        </div>
        
        <div className="chat-messages">
          {messages.map((msg, i) => (
            <div key={i} className={`message ${msg.role}`}>
              <div className="message-content">
                {msg.content.split('\n').map((line, j) => (
                  <span key={j}>{line}{j < msg.content.split('\n').length - 1 && <br />}</span>
                ))}
              </div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        <div className="chat-input-area">
          <div className="chat-input-wrapper">
            <textarea
              className="chat-input"
              placeholder="Try: Add essay due Friday"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  handleSendMessage()
                }
              }}
              rows={1}
            />
            <button className="send-btn" onClick={handleSendMessage} disabled={!inputValue.trim()}>
              <Icons.Send />
            </button>
          </div>
          <div className="quick-actions">
            <button className="quick-action" onClick={() => setInputValue("What's due?")}>What's due?</button>
            <button className="quick-action" onClick={() => setInputValue("Help")}>Help</button>
          </div>
        </div>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <AddAssignmentModal 
          onClose={() => setShowAddModal(false)}
          onAdd={async (assignment) => {
            await addAssignment(assignment)
            setShowAddModal(false)
          }}
        />
      )}
    </div>
  )
}

// Add Assignment Modal
function AddAssignmentModal({ onClose, onAdd }) {
  const [title, setTitle] = useState('')
  const [className, setClassName] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!title || !dueDate) return
    
    setLoading(true)
    await onAdd({
      title,
      class: className || 'General',
      category: 'default',
      date: new Date(dueDate)
    })
    setLoading(false)
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <h2 className="modal-title">Add assignment</h2>
        <p className="modal-subtitle">What's coming up?</p>
        
        <form className="modal-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label className="input-label">Title</label>
            <input
              type="text"
              className="input"
              placeholder="e.g. Essay draft"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              autoFocus
            />
          </div>
          
          <div className="input-group">
            <label className="input-label">Class (optional)</label>
            <input
              type="text"
              className="input"
              placeholder="e.g. English"
              value={className}
              onChange={(e) => setClassName(e.target.value)}
            />
          </div>
          
          <div className="input-group">
            <label className="input-label">Due date</label>
            <input
              type="date"
              className="input"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required
            />
          </div>

          <div className="modal-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={loading || !title || !dueDate}>
              {loading ? 'Adding...' : 'Add'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

// Main App with Auth
export default function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
  }

  if (loading) {
    return <div className="loading"><div className="spinner"></div></div>
  }

  if (!user) {
    return <Auth />
  }

  return <CalendarApp user={user} onSignOut={handleSignOut} />
}
