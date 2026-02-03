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
  PanelRight: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2"/>
      <line x1="15" y1="3" x2="15" y2="21"/>
    </svg>
  ),
  Clock: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <polyline points="12 6 12 12 16 14"/>
    </svg>
  ),
  Sparkles: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z"/>
    </svg>
  )
}

// Auth Component
function Auth() {
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
        setError('Check your email to confirm your account!')
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

        {error && <div className={`auth-message ${error.includes('Check') ? 'success' : 'error'}`}>{error}</div>}

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

// Category colors
const categoryColors = {
  math: { bg: '#dbeafe', text: '#1e40af', border: '#3b82f6' },
  science: { bg: '#dcfce7', text: '#166534', border: '#22c55e' },
  english: { bg: '#fce7f3', text: '#9d174d', border: '#ec4899' },
  history: { bg: '#ffedd5', text: '#c2410c', border: '#f97316' },
  art: { bg: '#f3e8ff', text: '#7c3aed', border: '#a855f7' },
  business: { bg: '#cffafe', text: '#0e7490', border: '#06b6d4' },
  default: { bg: '#f5f5f4', text: '#57534e', border: '#a8a29e' }
}

// Main Calendar App
function CalendarApp({ user, onSignOut }) {
  const [assignments, setAssignments] = useState([])
  const [currentDate, setCurrentDate] = useState(new Date())
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hi! I'm your AI assistant powered by Claude. I can help you manage your assignments - just tell me what you need!\n\nTry: \"Add math homework due Friday\" or \"What do I have this week?\"" }
  ])
  const [inputValue, setInputValue] = useState('')
  const [showSidebar, setShowSidebar] = useState(true)
  const [showMobileChat, setShowMobileChat] = useState(false)
  const [showDayModal, setShowDayModal] = useState(null)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [loading, setLoading] = useState(true)
  const [aiLoading, setAiLoading] = useState(false)
  const [selectedDate, setSelectedDate] = useState(null)
  const chatEndRef = useRef(null)
  const fileInputRef = useRef(null)

  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  useEffect(() => {
    loadAssignments()
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
        category: a.category || 'default',
        date: new Date(a.due_date),
        time: a.time || null,
        notes: a.notes || ''
      })))
    }
    setLoading(false)
  }

  const addAssignment = async (assignment) => {
    const { error } = await supabase
      .from('assignments')
      .insert({
        user_id: user.id,
        title: assignment.title,
        class_name: assignment.class || 'General',
        category: assignment.category || 'default',
        due_date: assignment.date.toISOString(),
        time: assignment.time || null,
        notes: assignment.notes || ''
      })
    if (!error) await loadAssignments()
    return !error
  }

  const deleteAssignment = async (id) => {
    await supabase.from('assignments').delete().eq('id', id)
    await loadAssignments()
  }

  // AI Chat with Gemini (FREE)
  const sendToAI = async (userMessage) => {
    setAiLoading(true)
    
    const assignmentsList = assignments.length === 0 
      ? 'No assignments yet.' 
      : assignments.map(a => 
          `- ID:${a.id} "${a.title}" for ${a.class}, due ${a.date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}${a.time ? ' at ' + a.time : ''}`
        ).join('\n')

    const systemPrompt = `You are a helpful AI assistant for Synk, a calendar/assignment tracking app.

Current date: ${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}

User's assignments:
${assignmentsList}

You help users manage their assignments. When they want to ADD, DELETE, or MODIFY assignments, respond with a JSON action block.

For ADDING (extract title, class, category, date from their message):
\`\`\`json
{"action":"add","assignments":[{"title":"Essay Draft","class":"English","category":"english","date":"2026-02-15","time":"11:59 PM"}]}
\`\`\`

For DELETING (use the ID from the list above):
\`\`\`json
{"action":"delete","ids":["<uuid-here>"]}
\`\`\`

Categories: math, science, english, history, art, business, default

Parse dates intelligently:
- "Friday" = the coming Friday's date
- "tomorrow" = tomorrow's date  
- "next week" = 7 days from now
- "Feb 15" = February 15, 2026

After the JSON block, write a brief friendly confirmation. If they're just asking questions (not adding/deleting), respond conversationally without JSON.`

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY
      
      if (!apiKey) {
        return "Please add your free Gemini API key to use the AI assistant. Get one at: https://makersuite.google.com/app/apikey"
      }

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              role: 'user',
              parts: [{ text: systemPrompt + '\n\nUser message: ' + userMessage }]
            }
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 1024,
          }
        })
      })

      const data = await response.json()
      
      if (data.candidates?.[0]?.content?.parts?.[0]?.text) {
        const aiResponse = data.candidates[0].content.parts[0].text
        
        // Parse JSON actions
        const jsonMatch = aiResponse.match(/```json\n?([\s\S]*?)\n?```/)
        if (jsonMatch) {
          try {
            const action = JSON.parse(jsonMatch[1])
            if (action.action === 'add' && action.assignments) {
              for (const a of action.assignments) {
                await addAssignment({
                  title: a.title,
                  class: a.class || 'General',
                  category: a.category || 'default',
                  date: new Date(a.date),
                  time: a.time || null
                })
              }
            } else if (action.action === 'delete' && action.ids) {
              for (const id of action.ids) {
                await deleteAssignment(id)
              }
            }
          } catch (e) {
            console.error('JSON parse error:', e)
          }
        }
        
        return aiResponse.replace(/```json\n?[\s\S]*?\n?```/g, '').trim() || "Done!"
      }
      
      return "Sorry, I had trouble with that. Try again?"
    } catch (error) {
      console.error('AI Error:', error)
      return "I couldn't connect to the AI. Make sure you've added your Gemini API key (VITE_GEMINI_API_KEY) in Vercel."
    } finally {
      setAiLoading(false)
    }
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim() || aiLoading) return
    
    const userMessage = inputValue.trim()
    setInputValue('')
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])
    
    const response = await sendToAI(userMessage)
    setMessages(prev => [...prev, { role: 'assistant', content: response }])
  }

  const handleFileUpload = async (files) => {
    for (const file of files) {
      setMessages(prev => [...prev, { role: 'user', content: `📄 Uploaded: ${file.name}` }])
      setAiLoading(true)
      
      try {
        const text = await file.text()
        
        if (text && text.length > 0 && !text.includes('�')) {
          const response = await sendToAI(`Please extract ALL assignments, homework, exams, and due dates from this syllabus and add them to my calendar:\n\n${text.substring(0, 6000)}`)
          setMessages(prev => [...prev, { role: 'assistant', content: response }])
        } else {
          setMessages(prev => [...prev, { 
            role: 'assistant', 
            content: `I couldn't read that file. Please try a .txt file, or just paste the syllabus text directly into this chat!` 
          }])
        }
      } catch (error) {
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: `Couldn't read that file. Try pasting the text directly instead!` 
        }])
      }
      
      setAiLoading(false)
    }
  }

  const getDaysInMonth = (date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const startingDay = firstDay.getDay()
    
    const result = []
    const prevMonth = new Date(year, month, 0)
    const prevMonthDays = prevMonth.getDate()
    
    for (let i = startingDay - 1; i >= 0; i--) {
      result.push({ date: new Date(year, month - 1, prevMonthDays - i), isOtherMonth: true })
    }
    for (let i = 1; i <= lastDay.getDate(); i++) {
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

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })
  }

  const upcomingCount = assignments.filter(a => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const week = new Date(today)
    week.setDate(week.getDate() + 7)
    return a.date >= today && a.date <= week
  }).length

  const urgentCount = assignments.filter(a => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const threeDays = new Date(today)
    threeDays.setDate(threeDays.getDate() + 3)
    return a.date >= today && a.date <= threeDays
  }).length

  if (loading) {
    return <div className="loading"><div className="spinner"></div></div>
  }

  return (
    <div className={`app ${showSidebar ? '' : 'sidebar-hidden'}`}>
      <div className="main-area">
        <header className="header">
          <div className="logo">
            <div className="logo-mark">S</div>
            <span className="logo-text">Synk</span>
          </div>
          <div className="header-actions">
            <button className="btn btn-secondary upload-btn" onClick={() => fileInputRef.current?.click()}>
              <Icons.Upload />
              <span className="btn-text">Upload</span>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              style={{ display: 'none' }}
              accept=".txt,.md,.text"
              onChange={(e) => {
                if (e.target.files?.length) {
                  handleFileUpload(Array.from(e.target.files))
                  e.target.value = ''
                }
              }}
            />
            <button className="icon-btn desktop-only" onClick={() => setShowSidebar(!showSidebar)}>
              <Icons.PanelRight />
            </button>
            <div className="user-menu-container">
              <button className="icon-btn" onClick={() => setShowUserMenu(!showUserMenu)}>
                <Icons.User />
              </button>
              {showUserMenu && (
                <>
                  <div className="dropdown-backdrop" onClick={() => setShowUserMenu(false)} />
                  <div className="user-dropdown">
                    <div className="dropdown-email">{user.email}</div>
                    <button className="dropdown-item" onClick={onSignOut}>Sign out</button>
                  </div>
                </>
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

          <section className="calendar-section">
            <div className="section-header">
              <div className="month-row">
                <button className="nav-btn" onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))}>
                  <Icons.ChevronLeft />
                </button>
                <h2 className="month-title">{months[currentDate.getMonth()]} {currentDate.getFullYear()}</h2>
                <button className="nav-btn" onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))}>
                  <Icons.ChevronRight />
                </button>
                <button className="btn btn-secondary today-btn" onClick={() => setCurrentDate(new Date())}>
                  Today
                </button>
              </div>
              <button className="btn btn-primary" onClick={() => { setSelectedDate(new Date()); setShowAddModal(true); }}>
                <Icons.Plus />
                <span className="btn-text">Add</span>
              </button>
            </div>

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
                      onClick={() => setShowDayModal(day.date)}
                    >
                      <div className="cell-date">{day.date.getDate()}</div>
                      <div className="cell-events">
                        {dayAssignments.slice(0, 3).map(a => {
                          const colors = categoryColors[a.category] || categoryColors.default
                          return (
                            <div 
                              key={a.id} 
                              className="event-pill"
                              style={{ backgroundColor: colors.bg, color: colors.text, borderLeftColor: colors.border }}
                            >
                              {a.title}
                            </div>
                          )
                        })}
                        {dayAssignments.length > 3 && (
                          <div className="more-events">+{dayAssignments.length - 3} more</div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </section>
        </main>

        <button className="mobile-fab" onClick={() => setShowMobileChat(true)}>
          <Icons.Sparkles />
        </button>
      </div>

      {/* Desktop Sidebar */}
      {showSidebar && (
        <aside className="sidebar">
          <div className="sidebar-header">
            <div className="sidebar-title-row">
              <Icons.Sparkles />
              <h3 className="sidebar-title">AI Assistant</h3>
            </div>
            <p className="sidebar-subtitle">Powered by Claude</p>
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
            {aiLoading && (
              <div className="message assistant">
                <div className="message-content typing">
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          <div className="chat-input-area">
            <div className="chat-input-wrapper">
              <textarea
                className="chat-input"
                placeholder="Ask me anything..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    handleSendMessage()
                  }
                }}
                rows={1}
                disabled={aiLoading}
              />
              <button className="send-btn" onClick={handleSendMessage} disabled={!inputValue.trim() || aiLoading}>
                <Icons.Send />
              </button>
            </div>
          </div>
        </aside>
      )}

      {/* Mobile Chat */}
      {showMobileChat && (
        <div className="mobile-chat-overlay" onClick={() => setShowMobileChat(false)}>
          <div className="mobile-chat" onClick={e => e.stopPropagation()}>
            <div className="mobile-chat-header">
              <div className="sidebar-title-row">
                <Icons.Sparkles />
                <h3>AI Assistant</h3>
              </div>
              <button className="icon-btn" onClick={() => setShowMobileChat(false)}>
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
              {aiLoading && (
                <div className="message assistant">
                  <div className="message-content typing">
                    <span className="dot"></span>
                    <span className="dot"></span>
                    <span className="dot"></span>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            <div className="chat-input-area">
              <div className="chat-input-wrapper">
                <textarea
                  className="chat-input"
                  placeholder="Ask me anything..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault()
                      handleSendMessage()
                    }
                  }}
                  rows={1}
                  disabled={aiLoading}
                />
                <button className="send-btn" onClick={handleSendMessage} disabled={!inputValue.trim() || aiLoading}>
                  <Icons.Send />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Day Modal */}
      {showDayModal && (
        <div className="modal-overlay" onClick={() => setShowDayModal(null)}>
          <div className="modal day-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">{formatDate(showDayModal)}</h2>
              <button className="icon-btn" onClick={() => setShowDayModal(null)}>
                <Icons.X />
              </button>
            </div>
            
            <div className="day-assignments">
              {getAssignmentsForDate(showDayModal).length === 0 ? (
                <p className="empty-day">No assignments</p>
              ) : (
                getAssignmentsForDate(showDayModal).map(a => {
                  const colors = categoryColors[a.category] || categoryColors.default
                  return (
                    <div key={a.id} className="day-item" style={{ borderLeftColor: colors.border }}>
                      <div className="day-item-info">
                        <div className="day-item-title">{a.title}</div>
                        <div className="day-item-class">{a.class}{a.time && ` • ${a.time}`}</div>
                      </div>
                      <button className="icon-btn delete" onClick={() => deleteAssignment(a.id)}>
                        <Icons.Trash />
                      </button>
                    </div>
                  )
                })
              )}
            </div>
            
            <button 
              className="btn btn-primary full-width" 
              onClick={() => { setSelectedDate(showDayModal); setShowDayModal(null); setShowAddModal(true); }}
            >
              <Icons.Plus /> Add assignment
            </button>
          </div>
        </div>
      )}

      {/* Add Modal */}
      {showAddModal && (
        <AddModal 
          initialDate={selectedDate}
          onClose={() => setShowAddModal(false)}
          onAdd={async (a) => { await addAssignment(a); setShowAddModal(false); }}
        />
      )}
    </div>
  )
}

function AddModal({ initialDate, onClose, onAdd }) {
  const [title, setTitle] = useState('')
  const [className, setClassName] = useState('')
  const [category, setCategory] = useState('default')
  const [dueDate, setDueDate] = useState(initialDate?.toISOString().split('T')[0] || '')
  const [time, setTime] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!title || !dueDate) return
    setLoading(true)
    await onAdd({
      title,
      class: className || 'General',
      category,
      date: new Date(dueDate + 'T12:00:00'),
      time: time || null
    })
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Add assignment</h2>
          <button className="icon-btn" onClick={onClose}><Icons.X /></button>
        </div>
        
        <form className="modal-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label className="input-label">Title *</label>
            <input type="text" className="input" placeholder="e.g. Chapter 5 homework" value={title} onChange={(e) => setTitle(e.target.value)} required autoFocus />
          </div>
          
          <div className="input-row">
            <div className="input-group">
              <label className="input-label">Class</label>
              <input type="text" className="input" placeholder="e.g. Math" value={className} onChange={(e) => setClassName(e.target.value)} />
            </div>
            <div className="input-group">
              <label className="input-label">Category</label>
              <select className="input" value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="default">General</option>
                <option value="math">Math</option>
                <option value="science">Science</option>
                <option value="english">English</option>
                <option value="history">History</option>
                <option value="art">Art</option>
                <option value="business">Business</option>
              </select>
            </div>
          </div>
          
          <div className="input-row">
            <div className="input-group">
              <label className="input-label">Due date *</label>
              <input type="date" className="input" value={dueDate} onChange={(e) => setDueDate(e.target.value)} required />
            </div>
            <div className="input-group">
              <label className="input-label">Time</label>
              <input type="time" className="input" value={time} onChange={(e) => setTime(e.target.value)} />
            </div>
          </div>

          <div className="modal-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary" disabled={loading || !title || !dueDate}>
              {loading ? 'Adding...' : 'Add'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })
    return () => subscription.unsubscribe()
  }, [])

  if (loading) return <div className="loading"><div className="spinner"></div></div>
  if (!user) return <Auth />
  return <CalendarApp user={user} onSignOut={() => supabase.auth.signOut()} />
}
