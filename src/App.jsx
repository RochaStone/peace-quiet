/*
 * ============================================
 * PEACE & QUIET - PATIENT PORTAL PROTOTYPE
 * ============================================
 *
 * Copyright © 2025 Thriving Era Ltd
 * All Rights Reserved.
 *
 * CONFIDENTIAL AND PROPRIETARY
 *
 * This code is the confidential and proprietary information of
 * Thriving Era Ltd ("Confidential Information"). You shall not
 * disclose such Confidential Information and shall use it only
 * in accordance with the terms of the agreement under which this
 * code was provided.
 *
 * Unauthorized copying, modification, distribution, or use of this
 * software, via any medium, is strictly prohibited without the
 * express written permission of Thriving Era Ltd.
 *
 * Created by: Rochelle, Thriving Era Ltd
 * Project: Peace & Quiet Patient Portal
 * Date: December 2025
 * Purpose: Proposal prototype for client evaluation
 *
 * ============================================
 */

import React, { useState, useEffect } from 'react';

// ============================================
// PEACE & QUIET - PATIENT PORTAL WEB APP
// Full multi-page application with:
// - Dashboard, Scripts, Appointments, Journal
// - Activity logging with completion flow
// - Rewards unlock system
// - Mobile-first responsive design
// - 2025 UI aesthetic
// ============================================

const App = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [selectedScript, setSelectedScript] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activityModal, setActivityModal] = useState(null);
  const [rewardModal, setRewardModal] = useState(null);
  const [activities, setActivities] = useState([
    { id: 1, title: "Morning Stretch Routine", type: "Movement", duration: "15 min", completed: false, streak: 6 },
    { id: 2, title: "Evening Wind-Down", type: "Mindfulness", duration: "10 min", completed: false, streak: 3 },
    { id: 3, title: "Hydration Tracking", type: "Nutrition", duration: "Daily", completed: false, progress: 6, target: 8 },
    { id: 4, title: "CBD Oil - Morning Dose", type: "Natural Medicine", duration: "Take", completed: false, streak: 12 },
    { id: 5, title: "CBD Oil - Evening Dose", type: "Natural Medicine", duration: "Take", completed: false, streak: 12 },
  ]);
  const [points, setPoints] = useState(340);
  const [rewards, setRewards] = useState([
    { id: 1, title: "Free Yoga Class", partner: "Byron Bay Yoga Co.", pointsRequired: 100, unlocked: true, redeemed: false },
    { id: 2, title: "20% Off Massage", partner: "Wellness Spa", pointsRequired: 250, unlocked: true, redeemed: false },
    { id: 3, title: "Free Smoothie Bowl", partner: "Green Life Cafe", pointsRequired: 350, unlocked: false, redeemed: false },
    { id: 4, title: "Meditation Workshop", partner: "Mindful Byron", pointsRequired: 500, unlocked: false, redeemed: false },
  ]);

  const patient = {
    name: "Sarah",
    surname: "Mitchell", 
    id: "PQ-2024-0847",
    memberSince: "March 2024",
    nextCheckIn: "December 15, 2025",
    nurse: "Emma Wilson",
    doctor: "Dr. James Chen",
  };

  const prescriptions = [
    {
      id: 1, name: "CBD Oil 1500mg", type: "Natural Medicine", dosage: "0.5ml twice daily",
      timing: "Morning & evening with food", refillDate: "Jan 15, 2026", status: "active",
      scriptNumber: "eRx-2025-8847", prescribedBy: "Dr. James Chen", prescribedDate: "Nov 1, 2025",
      repeats: 5, repeatsUsed: 1, notes: "Take with fatty food for better absorption.",
      pharmacy: "Byron Bay Compounding Pharmacy"
    },
    {
      id: 2, name: "Magnesium Glycinate", type: "Supplement", dosage: "400mg daily",
      timing: "Before bed", refillDate: "Feb 1, 2026", status: "active",
      scriptNumber: "eRx-2025-8848", prescribedBy: "Dr. James Chen", prescribedDate: "Nov 1, 2025",
      repeats: 6, repeatsUsed: 0, notes: "Supports sleep quality and muscle relaxation.",
      pharmacy: "Byron Bay Compounding Pharmacy"
    },
    {
      id: 3, name: "Ashwagandha Extract", type: "Adaptogen", dosage: "300mg twice daily",
      timing: "Morning & afternoon", refillDate: "Jan 20, 2026", status: "active",
      scriptNumber: "eRx-2025-8849", prescribedBy: "Dr. James Chen", prescribedDate: "Nov 1, 2025",
      repeats: 6, repeatsUsed: 1, notes: "Adaptogenic herb for stress management.",
      pharmacy: "Byron Bay Compounding Pharmacy"
    }
  ];

  const thinkContent = [
    { id: 1, title: "Understanding Your Sleep Cycle", type: "Article", duration: "8 min read", category: "Sleep" },
    { id: 2, title: "Breathing for Stress Relief", type: "Video", duration: "12 min", category: "Stress" },
    { id: 3, title: "The Science of Natural Medicine", type: "Podcast", duration: "25 min", category: "Wellness" }
  ];

  const appointments = [
    { id: 1, type: "Check-in", with: "Emma Wilson", role: "Lifestyle Nurse", date: "Dec 15, 2025", time: "10:00 AM", format: "Video", status: "upcoming" },
    { id: 2, type: "Consultation", with: "Dr. James Chen", role: "Doctor", date: "Jan 10, 2026", time: "2:30 PM", format: "In-person", status: "upcoming" },
    { id: 3, type: "Check-in", with: "Emma Wilson", role: "Lifestyle Nurse", date: "Nov 15, 2025", time: "10:00 AM", format: "Video", status: "completed" },
  ];

  const journalEntries = [
    { id: 1, date: "Dec 1, 2025", mood: "Good", sleep: "7.5", pain: "2", stress: "3", notes: "Felt well-rested today." },
    { id: 2, date: "Nov 30, 2025", mood: "Okay", sleep: "6", pain: "4", stress: "5", notes: "Busy day at work." },
    { id: 3, date: "Nov 29, 2025", mood: "Great", sleep: "8", pain: "1", stress: "2", notes: "Best sleep in weeks." },
  ];

  // Complete activity and check for reward unlock
  const completeActivity = (activityId, reflection) => {
    const activity = activities.find(a => a.id === activityId);
    const pointsEarned = activity.type === 'Natural Medicine' ? 15 : 10;
    const newPoints = points + pointsEarned;
    
    setActivities(prev => prev.map(a => 
      a.id === activityId 
        ? { ...a, completed: true, streak: (a.streak || 0) + 1 }
        : a
    ));
    setPoints(newPoints);
    setActivityModal(null);

    // Check if any new rewards unlocked
    const newlyUnlocked = rewards.find(r => !r.unlocked && newPoints >= r.pointsRequired);
    if (newlyUnlocked) {
      setRewards(prev => prev.map(r => 
        r.id === newlyUnlocked.id ? { ...r, unlocked: true } : r
      ));
      setTimeout(() => setRewardModal(newlyUnlocked), 500);
    }
  };

  const nextReward = rewards.find(r => !r.unlocked);
  const progressToNext = nextReward ? Math.min((points / nextReward.pointsRequired) * 100, 100) : 100;

  return (
    <div style={styles.app}>
      {/* Background */}
      <div style={styles.bgLayer} />
      
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerInner}>
          <button style={styles.logo} onClick={() => setCurrentPage('dashboard')}>
            <span style={styles.logoText}>Peace & Quiet</span>
            <span style={styles.logoSub}>patient portal</span>
          </button>

          {/* Desktop Nav */}
          <nav style={styles.desktopNav}>
            {['dashboard', 'scripts', 'appointments', 'journal'].map(page => (
              <button
                key={page}
                style={currentPage === page ? {...styles.navBtn, ...styles.navBtnActive} : styles.navBtn}
                onClick={() => setCurrentPage(page)}
              >
                {page.charAt(0).toUpperCase() + page.slice(1)}
              </button>
            ))}
          </nav>

          <div style={styles.headerRight}>
            <div style={styles.pointsBadge}>
              <span style={styles.pointsIcon}>✦</span>
              <span style={styles.pointsNum}>{points}</span>
            </div>
            <button style={styles.scheduleBtn} onClick={() => setCurrentPage('appointments')}>
              <span style={styles.scheduleBtnText}>Book check-in</span>
              <span style={styles.btnArrow}>→</span>
            </button>
            <button style={styles.mobileMenuBtn} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <div style={styles.menuIcon}>
                <span style={{...styles.menuLine, ...(mobileMenuOpen ? styles.menuLineOpen1 : {})}} />
                <span style={{...styles.menuLine, ...(mobileMenuOpen ? styles.menuLineOpen2 : {})}} />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <nav style={styles.mobileNav}>
            {['dashboard', 'scripts', 'appointments', 'journal'].map(page => (
              <button
                key={page}
                style={currentPage === page ? {...styles.mobileNavBtn, ...styles.mobileNavBtnActive} : styles.mobileNavBtn}
                onClick={() => { setCurrentPage(page); setMobileMenuOpen(false); }}
              >
                {page.charAt(0).toUpperCase() + page.slice(1)}
              </button>
            ))}
          </nav>
        )}
      </header>

      {/* Patient Bar */}
      <div style={styles.patientBar}>
        <div style={styles.patientBarInner}>
          <span style={styles.patientId}>{patient.id}</span>
          <span style={styles.patientDot}>·</span>
          <span style={styles.patientName}>{patient.name} {patient.surname}</span>
          <span style={styles.patientDot}>·</span>
          <span style={styles.patientTeam}>{patient.nurse} & {patient.doctor}</span>
        </div>
      </div>

      {/* Main Content */}
      <main style={styles.main}>
        {currentPage === 'dashboard' && (
          <DashboardPage 
            patient={patient}
            prescriptions={prescriptions}
            activities={activities}
            thinkContent={thinkContent}
            rewards={rewards}
            points={points}
            nextReward={nextReward}
            progressToNext={progressToNext}
            onActivityClick={(activity) => setActivityModal(activity)}
            onViewScripts={() => setCurrentPage('scripts')}
          />
        )}
        {currentPage === 'scripts' && (
          <ScriptsPage 
            patient={patient}
            prescriptions={prescriptions}
            selectedScript={selectedScript}
            setSelectedScript={setSelectedScript}
          />
        )}
        {currentPage === 'appointments' && (
          <AppointmentsPage patient={patient} appointments={appointments} />
        )}
        {currentPage === 'journal' && (
          <JournalPage patient={patient} journalEntries={journalEntries} />
        )}
      </main>

      {/* Activity Completion Modal */}
      {activityModal && (
        <ActivityModal 
          activity={activityModal}
          onComplete={completeActivity}
          onClose={() => setActivityModal(null)}
        />
      )}

      {/* Reward Unlock Modal */}
      {rewardModal && (
        <RewardUnlockModal 
          reward={rewardModal}
          onClose={() => setRewardModal(null)}
        />
      )}

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.footerInner}>
          <span style={styles.footerLogo}>Peace & Quiet</span>
          <div style={styles.footerLinks}>
            <a href="#" style={styles.footerLink}>Privacy</a>
            <a href="#" style={styles.footerLink}>Terms</a>
            <a href="#" style={styles.footerLink}>Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

// ============================================
// DASHBOARD PAGE
// ============================================
const DashboardPage = ({ patient, prescriptions, activities, thinkContent, rewards, points, nextReward, progressToNext, onActivityClick, onViewScripts }) => {
  const completedToday = activities.filter(a => a.completed).length;
  const totalActivities = activities.length;

  return (
    <div style={styles.page}>
      {/* Welcome */}
      <section style={styles.welcomeSection}>
        <div style={styles.welcomeContent}>
          <p style={styles.eyebrow}>Welcome back</p>
          <h1 style={styles.pageTitle}>Good morning, {patient.name}.</h1>
          <p style={styles.welcomeText}>
            You have {totalActivities - completedToday} actions to complete today.
          </p>
        </div>
        <div style={styles.welcomeCard}>
          <p style={styles.welcomeCardLabel}>Next check-in</p>
          <p style={styles.welcomeCardValue}>{patient.nextCheckIn}</p>
          <p style={styles.welcomeCardMeta}>with {patient.nurse}</p>
        </div>
      </section>

      {/* Progress Ring */}
      <section style={styles.progressSection}>
        <div style={styles.progressRing}>
          <svg viewBox="0 0 100 100" style={styles.progressSvg}>
            <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(91,107,79,0.1)" strokeWidth="8" />
            <circle 
              cx="50" cy="50" r="45" fill="none" stroke="#C9A227" strokeWidth="8"
              strokeDasharray={`${(completedToday / totalActivities) * 283} 283`}
              strokeLinecap="round"
              transform="rotate(-90 50 50)"
              style={{ transition: 'stroke-dasharray 0.5s ease' }}
            />
          </svg>
          <div style={styles.progressCenter}>
            <span style={styles.progressNum}>{completedToday}/{totalActivities}</span>
            <span style={styles.progressLabel}>Today</span>
          </div>
        </div>
        <div style={styles.progressInfo}>
          <h3 style={styles.progressTitle}>Daily Progress</h3>
          <p style={styles.progressText}>Complete activities to earn points and unlock wellness rewards.</p>
          <div style={styles.rewardProgress}>
            <div style={styles.rewardProgressBar}>
              <div style={{...styles.rewardProgressFill, width: `${progressToNext}%`}} />
            </div>
            <p style={styles.rewardProgressText}>
              {nextReward ? `${nextReward.pointsRequired - points} points to next reward` : 'All rewards unlocked!'}
            </p>
          </div>
        </div>
      </section>

      {/* Prescription Notice */}
      <section style={styles.notice} onClick={onViewScripts}>
        <div style={styles.noticeIcon}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
          </svg>
        </div>
        <div style={styles.noticeContent}>
          <p style={styles.noticeTitle}>{prescriptions.length} active scripts</p>
          <p style={styles.noticeText}>Tap to view prescriptions</p>
        </div>
        <span style={styles.noticeArrow}>→</span>
      </section>

      {/* Today's Activities */}
      <section style={styles.section}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>Today's Activities</h2>
          <span style={styles.sectionBadge}>{completedToday}/{totalActivities}</span>
        </div>
        <div style={styles.activityGrid}>
          {activities.map(activity => (
            <ActivityCard 
              key={activity.id} 
              activity={activity} 
              onClick={() => !activity.completed && onActivityClick(activity)}
            />
          ))}
        </div>
      </section>

      {/* Think Content */}
      <section style={styles.section}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>Learn & Grow</h2>
        </div>
        <div style={styles.contentScroll}>
          {thinkContent.map(content => (
            <div key={content.id} style={styles.contentCard}>
              <div style={styles.contentImage}>
                <span style={styles.contentType}>{content.type}</span>
              </div>
              <div style={styles.contentBody}>
                <span style={styles.contentCategory}>{content.category}</span>
                <h4 style={styles.contentTitle}>{content.title}</h4>
                <span style={styles.contentDuration}>{content.duration}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Rewards */}
      <section style={styles.rewardsSection}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitleLight}>Wellness Rewards</h2>
          <span style={styles.pointsBadgeAlt}>{points} pts</span>
        </div>
        <div style={styles.rewardsGrid}>
          {rewards.map(reward => (
            <div key={reward.id} style={{...styles.rewardCard, ...(!reward.unlocked ? styles.rewardCardLocked : {})}}>
              <div style={styles.rewardCardImage}>
                {!reward.unlocked && (
                  <div style={styles.rewardLockOverlay}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                      <path d="M7 11V7a5 5 0 0110 0v4"/>
                    </svg>
                    <span style={styles.rewardLockText}>{reward.pointsRequired} pts</span>
                  </div>
                )}
              </div>
              <div style={styles.rewardCardBody}>
                <h4 style={styles.rewardCardTitle}>{reward.title}</h4>
                <p style={styles.rewardCardPartner}>{reward.partner}</p>
                {reward.unlocked && (
                  <button style={styles.rewardRedeemBtn}>Redeem</button>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

// ============================================
// ACTIVITY CARD
// ============================================
const ActivityCard = ({ activity, onClick }) => (
  <button 
    style={{
      ...styles.activityCard,
      ...(activity.completed ? styles.activityCardDone : {}),
      cursor: activity.completed ? 'default' : 'pointer'
    }}
    onClick={onClick}
  >
    <div style={{...styles.activityIcon, ...(activity.completed ? styles.activityIconDone : {})}}>
      {activity.completed ? (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5B6B4F" strokeWidth="2.5">
          <polyline points="20,6 9,17 4,12"/>
        </svg>
      ) : (
        <span style={styles.activityInitial}>{activity.type.charAt(0)}</span>
      )}
    </div>
    <div style={styles.activityContent}>
      <span style={styles.activityType}>{activity.type}</span>
      <h4 style={styles.activityTitle}>{activity.title}</h4>
      {activity.streak > 0 && (
        <span style={styles.activityStreak}>{activity.streak} day streak</span>
      )}
      {activity.progress !== undefined && (
        <div style={styles.activityProgress}>
          <div style={styles.activityProgressBar}>
            <div style={{...styles.activityProgressFill, width: `${(activity.progress / activity.target) * 100}%`}} />
          </div>
          <span style={styles.activityProgressText}>{activity.progress}/{activity.target}</span>
        </div>
      )}
    </div>
    {!activity.completed && <span style={styles.activityArrow}>→</span>}
  </button>
);

// ============================================
// ACTIVITY COMPLETION MODAL
// ============================================
const ActivityModal = ({ activity, onComplete, onClose }) => {
  const [reflection, setReflection] = useState('');
  const [feeling, setFeeling] = useState(null);

  return (
    <div style={styles.modalOverlay} onClick={onClose}>
      <div style={styles.modal} onClick={e => e.stopPropagation()}>
        <button style={styles.modalClose} onClick={onClose}>×</button>
        
        <div style={styles.modalIcon}>
          <span style={styles.modalIconText}>{activity.type.charAt(0)}</span>
        </div>
        
        <h2 style={styles.modalTitle}>Complete Activity</h2>
        <p style={styles.modalSubtitle}>{activity.title}</p>

        <div style={styles.modalSection}>
          <p style={styles.modalLabel}>How do you feel?</p>
          <div style={styles.feelingOptions}>
            {['Great', 'Good', 'Okay', 'Not great'].map(f => (
              <button
                key={f}
                style={{...styles.feelingBtn, ...(feeling === f ? styles.feelingBtnActive : {})}}
                onClick={() => setFeeling(f)}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div style={styles.modalSection}>
          <p style={styles.modalLabel}>Any notes? (optional)</p>
          <textarea 
            style={styles.modalTextarea}
            value={reflection}
            onChange={e => setReflection(e.target.value)}
            placeholder="How was this activity today?"
            rows={3}
          />
        </div>

        <div style={styles.modalReward}>
          <span style={styles.modalRewardIcon}>✦</span>
          <span style={styles.modalRewardText}>+{activity.type === 'Medication' ? 15 : 10} points</span>
        </div>

        <button style={styles.modalCompleteBtn} onClick={() => onComplete(activity.id, reflection)}>
          Mark as Complete
          <span style={styles.btnArrow}>→</span>
        </button>
      </div>
    </div>
  );
};

// ============================================
// REWARD UNLOCK MODAL
// ============================================
const RewardUnlockModal = ({ reward, onClose }) => (
  <div style={styles.modalOverlay} onClick={onClose}>
    <div style={{...styles.modal, ...styles.rewardUnlockModal}} onClick={e => e.stopPropagation()}>
      <div style={styles.rewardUnlockIcon}>
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#C9A227" strokeWidth="1.5">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      </div>
      <h2 style={styles.rewardUnlockTitle}>Reward Unlocked!</h2>
      <p style={styles.rewardUnlockName}>{reward.title}</p>
      <p style={styles.rewardUnlockPartner}>{reward.partner}</p>
      <button style={styles.rewardUnlockBtn} onClick={onClose}>
        Awesome!
      </button>
    </div>
  </div>
);

// ============================================
// SCRIPTS PAGE
// ============================================
const ScriptsPage = ({ patient, prescriptions, selectedScript, setSelectedScript }) => (
  <div style={styles.page}>
    <section style={styles.pageHeader}>
      <p style={styles.eyebrow}>Your prescriptions</p>
      <h1 style={styles.pageTitle}>My Scripts</h1>
    </section>

    {/* Summary */}
    <div style={styles.summaryRow}>
      <div style={styles.summaryItem}>
        <span style={styles.summaryNum}>{prescriptions.length}</span>
        <span style={styles.summaryLabel}>Active</span>
      </div>
      <div style={styles.summaryItem}>
        <span style={styles.summaryNum}>Jan 15</span>
        <span style={styles.summaryLabel}>Next refill</span>
      </div>
    </div>

    {/* Scripts List */}
    <div style={styles.scriptsList}>
      {prescriptions.map(rx => (
        <button 
          key={rx.id} 
          style={{...styles.scriptCard, ...(selectedScript?.id === rx.id ? styles.scriptCardActive : {})}}
          onClick={() => setSelectedScript(selectedScript?.id === rx.id ? null : rx)}
        >
          <div style={styles.scriptCardIcon}>
            <span>{rx.name.charAt(0)}</span>
          </div>
          <div style={styles.scriptCardContent}>
            <span style={styles.scriptCardType}>{rx.type}</span>
            <h4 style={styles.scriptCardName}>{rx.name}</h4>
            <p style={styles.scriptCardDosage}>{rx.dosage}</p>
            <p style={styles.scriptCardRef}>{rx.scriptNumber}</p>
          </div>
          <span style={styles.scriptCardArrow}>{selectedScript?.id === rx.id ? '−' : '+'}</span>
        </button>
      ))}
    </div>

    {/* Selected Script Detail */}
    {selectedScript && (
      <div style={styles.scriptDetail}>
        <div style={styles.scriptDetailGrid}>
          <div style={styles.scriptDetailItem}>
            <span style={styles.scriptDetailLabel}>Timing</span>
            <span style={styles.scriptDetailValue}>{selectedScript.timing}</span>
          </div>
          <div style={styles.scriptDetailItem}>
            <span style={styles.scriptDetailLabel}>Prescribed</span>
            <span style={styles.scriptDetailValue}>{selectedScript.prescribedDate}</span>
          </div>
          <div style={styles.scriptDetailItem}>
            <span style={styles.scriptDetailLabel}>Repeats left</span>
            <span style={styles.scriptDetailValue}>{selectedScript.repeats - selectedScript.repeatsUsed}</span>
          </div>
          <div style={styles.scriptDetailItem}>
            <span style={styles.scriptDetailLabel}>Pharmacy</span>
            <span style={styles.scriptDetailValue}>{selectedScript.pharmacy}</span>
          </div>
        </div>
        <div style={styles.scriptDetailNotes}>
          <span style={styles.scriptDetailLabel}>Notes</span>
          <p style={styles.scriptDetailNotesText}>{selectedScript.notes}</p>
        </div>
        <button style={styles.primaryBtn}>Request refill →</button>
      </div>
    )}
  </div>
);

// ============================================
// APPOINTMENTS PAGE
// ============================================
const AppointmentsPage = ({ patient, appointments }) => {
  const upcoming = appointments.filter(a => a.status === 'upcoming');
  const past = appointments.filter(a => a.status === 'completed');

  return (
    <div style={styles.page}>
      <section style={styles.pageHeader}>
        <p style={styles.eyebrow}>Your wellness team</p>
        <h1 style={styles.pageTitle}>Appointments</h1>
      </section>

      <button style={styles.primaryBtnFull}>Book new appointment →</button>

      {/* Team */}
      <div style={styles.teamRow}>
        <div style={styles.teamCard}>
          <div style={styles.teamAvatar}>EW</div>
          <div>
            <h4 style={styles.teamName}>{patient.nurse}</h4>
            <p style={styles.teamRole}>Lifestyle Nurse</p>
          </div>
        </div>
        <div style={styles.teamCard}>
          <div style={styles.teamAvatar}>JC</div>
          <div>
            <h4 style={styles.teamName}>{patient.doctor}</h4>
            <p style={styles.teamRole}>Doctor</p>
          </div>
        </div>
      </div>

      {/* Upcoming */}
      <section style={styles.section}>
        <h3 style={styles.sectionSubtitle}>Upcoming</h3>
        {upcoming.map(apt => (
          <div key={apt.id} style={styles.appointmentCard}>
            <div style={styles.appointmentDate}>
              <span style={styles.appointmentDay}>{apt.date.split(' ')[1]}</span>
              <span style={styles.appointmentMonth}>{apt.date.split(' ')[0]}</span>
            </div>
            <div style={styles.appointmentContent}>
              <span style={styles.appointmentType}>{apt.type}</span>
              <h4 style={styles.appointmentWith}>{apt.with}</h4>
              <p style={styles.appointmentMeta}>{apt.time} · {apt.format}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Past */}
      <section style={styles.section}>
        <h3 style={styles.sectionSubtitle}>Past</h3>
        {past.map(apt => (
          <div key={apt.id} style={{...styles.appointmentCard, ...styles.appointmentCardPast}}>
            <div style={styles.appointmentDate}>
              <span style={styles.appointmentDay}>{apt.date.split(' ')[1]}</span>
              <span style={styles.appointmentMonth}>{apt.date.split(' ')[0]}</span>
            </div>
            <div style={styles.appointmentContent}>
              <span style={styles.appointmentType}>{apt.type}</span>
              <h4 style={styles.appointmentWith}>{apt.with}</h4>
              <p style={styles.appointmentMeta}>{apt.format}</p>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

// ============================================
// JOURNAL PAGE  
// ============================================
const JournalPage = ({ patient, journalEntries }) => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div style={styles.page}>
      <section style={styles.pageHeader}>
        <p style={styles.eyebrow}>Track your progress</p>
        <h1 style={styles.pageTitle}>Journal</h1>
      </section>

      <button style={styles.primaryBtnFull} onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Cancel' : 'New entry →'}
      </button>

      {showForm && (
        <div style={styles.journalForm}>
          <div style={styles.journalFormRow}>
            <div style={styles.journalFormField}>
              <label style={styles.journalLabel}>Mood</label>
              <select style={styles.journalSelect}>
                <option>Great</option>
                <option>Good</option>
                <option>Okay</option>
                <option>Not great</option>
              </select>
            </div>
            <div style={styles.journalFormField}>
              <label style={styles.journalLabel}>Sleep (hrs)</label>
              <input type="number" style={styles.journalInput} placeholder="7.5" />
            </div>
          </div>
          <div style={styles.journalFormRow}>
            <div style={styles.journalFormField}>
              <label style={styles.journalLabel}>Pain (1-10)</label>
              <input type="number" style={styles.journalInput} placeholder="3" />
            </div>
            <div style={styles.journalFormField}>
              <label style={styles.journalLabel}>Stress (1-10)</label>
              <input type="number" style={styles.journalInput} placeholder="4" />
            </div>
          </div>
          <div style={styles.journalFormField}>
            <label style={styles.journalLabel}>Notes</label>
            <textarea style={styles.journalTextarea} rows={3} placeholder="How did you feel today?" />
          </div>
          <button style={styles.primaryBtn}>Save entry →</button>
        </div>
      )}

      {/* Stats */}
      <div style={styles.statsRow}>
        <div style={styles.statBox}>
          <span style={styles.statNum}>7.2</span>
          <span style={styles.statLabel}>Avg sleep</span>
        </div>
        <div style={styles.statBox}>
          <span style={styles.statNum}>2.3</span>
          <span style={styles.statLabel}>Avg pain</span>
        </div>
        <div style={styles.statBox}>
          <span style={styles.statNum}>3.1</span>
          <span style={styles.statLabel}>Avg stress</span>
        </div>
      </div>

      {/* Entries */}
      <section style={styles.section}>
        <h3 style={styles.sectionSubtitle}>Recent entries</h3>
        {journalEntries.map(entry => (
          <div key={entry.id} style={styles.journalEntry}>
            <div style={styles.journalEntryDate}>
              <span style={styles.journalEntryDay}>{entry.date.split(' ')[1]}</span>
              <span style={styles.journalEntryMonth}>{entry.date.split(' ')[0]}</span>
            </div>
            <div style={styles.journalEntryContent}>
              <div style={styles.journalEntryMetrics}>
                <span style={styles.journalMetric}>😊 {entry.mood}</span>
                <span style={styles.journalMetric}>💤 {entry.sleep}h</span>
                <span style={styles.journalMetric}>Pain: {entry.pain}/10</span>
              </div>
              <p style={styles.journalEntryNotes}>{entry.notes}</p>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

// ============================================
// STYLES
// ============================================
const styles = {
  // App Shell
  app: {
    minHeight: '100vh',
    backgroundColor: '#F6F3EC',
    fontFamily: '"DM Sans", -apple-system, BlinkMacSystemFont, sans-serif',
    position: 'relative',
  },
  bgLayer: {
    position: 'fixed',
    inset: 0,
    background: 'radial-gradient(ellipse at 0% 0%, rgba(91,107,79,0.04) 0%, transparent 50%), radial-gradient(ellipse at 100% 100%, rgba(201,162,39,0.03) 0%, transparent 50%)',
    pointerEvents: 'none',
  },

  // Header
  header: {
    backgroundColor: '#FDFCF8',
    borderBottom: '1px solid rgba(91,107,79,0.08)',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
  headerInner: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '16px 20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '16px',
  },
  logo: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    textAlign: 'left',
    padding: 0,
  },
  logoText: {
    fontFamily: '"Playfair Display", Georgia, serif',
    fontSize: '20px',
    fontWeight: 500,
    color: '#2D2D2D',
    display: 'block',
    lineHeight: 1.1,
  },
  logoSub: {
    fontSize: '10px',
    color: '#7A8B6E',
    fontStyle: 'italic',
  },
  desktopNav: {
    display: 'flex',
    gap: '4px',
    '@media (max-width: 768px)': { display: 'none' },
  },
  navBtn: {
    padding: '10px 18px',
    fontSize: '13px',
    fontWeight: 500,
    color: '#5B6B4F',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: '100px',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  navBtnActive: {
    backgroundColor: '#5B6B4F',
    color: '#FDFCF8',
  },
  headerRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  pointsBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '8px 14px',
    backgroundColor: 'rgba(201,162,39,0.1)',
    borderRadius: '100px',
  },
  pointsIcon: {
    color: '#C9A227',
    fontSize: '14px',
  },
  pointsNum: {
    fontSize: '14px',
    fontWeight: 600,
    color: '#C9A227',
  },
  scheduleBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 20px',
    fontSize: '13px',
    fontWeight: 600,
    color: '#2D2D2D',
    backgroundColor: '#C9A227',
    border: 'none',
    borderRadius: '100px',
    cursor: 'pointer',
  },
  scheduleBtnText: {
    '@media (max-width: 640px)': { display: 'none' },
  },
  btnArrow: {
    fontSize: '14px',
  },
  mobileMenuBtn: {
    display: 'none',
    width: '40px',
    height: '40px',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    '@media (max-width: 768px)': { display: 'flex' },
  },
  menuIcon: {
    width: '20px',
    height: '14px',
    position: 'relative',
  },
  menuLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: '2px',
    backgroundColor: '#5B6B4F',
    transition: 'all 0.2s',
  },
  menuLineOpen1: {
    top: '6px',
    transform: 'rotate(45deg)',
  },
  menuLineOpen2: {
    top: '6px',
    transform: 'rotate(-45deg)',
  },
  mobileNav: {
    display: 'flex',
    flexDirection: 'column',
    padding: '8px 20px 20px',
    gap: '4px',
    borderTop: '1px solid rgba(91,107,79,0.08)',
  },
  mobileNavBtn: {
    padding: '14px 16px',
    fontSize: '15px',
    fontWeight: 500,
    color: '#5B6B4F',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    textAlign: 'left',
  },
  mobileNavBtnActive: {
    backgroundColor: 'rgba(91,107,79,0.08)',
    color: '#2D2D2D',
  },

  // Patient Bar
  patientBar: {
    backgroundColor: '#5B6B4F',
  },
  patientBarInner: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '10px 20px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '12px',
    color: 'rgba(255,255,255,0.85)',
    flexWrap: 'wrap',
  },
  patientId: {
    fontFamily: 'monospace',
    color: 'rgba(255,255,255,0.6)',
  },
  patientDot: {
    color: 'rgba(255,255,255,0.3)',
  },
  patientName: {},
  patientTeam: {
    marginLeft: 'auto',
    '@media (max-width: 640px)': { display: 'none' },
  },

  // Main
  main: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '24px 20px 48px',
    minHeight: 'calc(100vh - 200px)',
  },

  // Page
  page: {},
  pageHeader: {
    marginBottom: '24px',
  },
  eyebrow: {
    fontSize: '11px',
    fontWeight: 600,
    color: '#C9A227',
    textTransform: 'uppercase',
    letterSpacing: '1.5px',
    marginBottom: '8px',
  },
  pageTitle: {
    fontFamily: '"Playfair Display", Georgia, serif',
    fontSize: 'clamp(28px, 6vw, 42px)',
    fontWeight: 500,
    color: '#2D2D2D',
    lineHeight: 1.1,
    letterSpacing: '-0.5px',
  },

  // Welcome
  welcomeSection: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: '24px',
    marginBottom: '32px',
    flexWrap: 'wrap',
  },
  welcomeContent: {
    flex: '1 1 300px',
  },
  welcomeText: {
    fontSize: '16px',
    color: '#5B6B4F',
    lineHeight: 1.6,
    marginTop: '12px',
  },
  welcomeCard: {
    backgroundColor: '#FDFCF8',
    borderRadius: '16px',
    padding: '20px 24px',
    boxShadow: '0 2px 16px rgba(91,107,79,0.06)',
    flex: '0 0 auto',
  },
  welcomeCardLabel: {
    fontSize: '11px',
    fontWeight: 600,
    color: '#C9A227',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    marginBottom: '8px',
  },
  welcomeCardValue: {
    fontFamily: '"Playfair Display", Georgia, serif',
    fontSize: '20px',
    fontWeight: 500,
    color: '#2D2D2D',
    marginBottom: '4px',
  },
  welcomeCardMeta: {
    fontSize: '13px',
    color: '#5B6B4F',
  },

  // Progress
  progressSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '24px',
    backgroundColor: '#FDFCF8',
    borderRadius: '20px',
    padding: '24px',
    marginBottom: '24px',
    boxShadow: '0 2px 16px rgba(91,107,79,0.06)',
    flexWrap: 'wrap',
  },
  progressRing: {
    width: '120px',
    height: '120px',
    position: 'relative',
    flexShrink: 0,
  },
  progressSvg: {
    width: '100%',
    height: '100%',
  },
  progressCenter: {
    position: 'absolute',
    inset: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressNum: {
    fontSize: '24px',
    fontWeight: 600,
    color: '#2D2D2D',
  },
  progressLabel: {
    fontSize: '12px',
    color: '#7A8B6E',
  },
  progressInfo: {
    flex: 1,
    minWidth: '200px',
  },
  progressTitle: {
    fontSize: '18px',
    fontWeight: 600,
    color: '#2D2D2D',
    marginBottom: '8px',
  },
  progressText: {
    fontSize: '14px',
    color: '#5B6B4F',
    marginBottom: '16px',
  },
  rewardProgress: {},
  rewardProgressBar: {
    height: '8px',
    backgroundColor: 'rgba(91,107,79,0.1)',
    borderRadius: '100px',
    overflow: 'hidden',
    marginBottom: '8px',
  },
  rewardProgressFill: {
    height: '100%',
    backgroundColor: '#C9A227',
    borderRadius: '100px',
    transition: 'width 0.5s ease',
  },
  rewardProgressText: {
    fontSize: '12px',
    color: '#7A8B6E',
  },

  // Notice
  notice: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    backgroundColor: '#FDFCF8',
    border: '1px solid rgba(91,107,79,0.1)',
    borderRadius: '16px',
    padding: '16px 20px',
    marginBottom: '32px',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  noticeIcon: {
    width: '44px',
    height: '44px',
    backgroundColor: 'rgba(91,107,79,0.08)',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#5B6B4F',
    flexShrink: 0,
  },
  noticeContent: {
    flex: 1,
  },
  noticeTitle: {
    fontSize: '15px',
    fontWeight: 600,
    color: '#2D2D2D',
    marginBottom: '2px',
  },
  noticeText: {
    fontSize: '13px',
    color: '#5B6B4F',
  },
  noticeArrow: {
    color: '#C9A227',
    fontSize: '18px',
  },

  // Section
  section: {
    marginBottom: '32px',
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
  },
  sectionTitle: {
    fontFamily: '"Playfair Display", Georgia, serif',
    fontSize: '24px',
    fontWeight: 500,
    color: '#2D2D2D',
  },
  sectionTitleLight: {
    fontFamily: '"Playfair Display", Georgia, serif',
    fontSize: '24px',
    fontWeight: 500,
    color: '#FDFCF8',
  },
  sectionSubtitle: {
    fontSize: '14px',
    fontWeight: 600,
    color: '#5B6B4F',
    marginBottom: '12px',
  },
  sectionBadge: {
    fontSize: '13px',
    fontWeight: 600,
    color: '#5B6B4F',
    backgroundColor: 'rgba(91,107,79,0.08)',
    padding: '6px 12px',
    borderRadius: '100px',
  },

  // Activity Grid
  activityGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  activityCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    backgroundColor: '#FDFCF8',
    borderRadius: '16px',
    padding: '16px 20px',
    border: 'none',
    textAlign: 'left',
    transition: 'all 0.2s',
    width: '100%',
  },
  activityCardDone: {
    backgroundColor: 'rgba(91,107,79,0.06)',
  },
  activityIcon: {
    width: '48px',
    height: '48px',
    backgroundColor: 'rgba(91,107,79,0.08)',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  activityIconDone: {
    backgroundColor: 'rgba(91,107,79,0.15)',
  },
  activityInitial: {
    fontFamily: '"Playfair Display", Georgia, serif',
    fontSize: '20px',
    color: 'rgba(91,107,79,0.4)',
  },
  activityContent: {
    flex: 1,
    minWidth: 0,
  },
  activityType: {
    fontSize: '10px',
    fontWeight: 600,
    color: '#C9A227',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    display: 'block',
    marginBottom: '4px',
  },
  activityTitle: {
    fontSize: '15px',
    fontWeight: 600,
    color: '#2D2D2D',
    marginBottom: '4px',
  },
  activityStreak: {
    fontSize: '12px',
    color: '#7A8B6E',
  },
  activityProgress: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginTop: '8px',
  },
  activityProgressBar: {
    flex: 1,
    height: '6px',
    backgroundColor: 'rgba(91,107,79,0.1)',
    borderRadius: '100px',
    overflow: 'hidden',
  },
  activityProgressFill: {
    height: '100%',
    backgroundColor: '#5B6B4F',
    borderRadius: '100px',
  },
  activityProgressText: {
    fontSize: '12px',
    color: '#5B6B4F',
    fontWeight: 500,
  },
  activityArrow: {
    color: '#C9A227',
    fontSize: '16px',
  },

  // Content Scroll
  contentScroll: {
    display: 'flex',
    gap: '16px',
    overflowX: 'auto',
    paddingBottom: '8px',
    marginRight: '-20px',
    paddingRight: '20px',
  },
  contentCard: {
    flex: '0 0 260px',
    backgroundColor: '#FDFCF8',
    borderRadius: '16px',
    overflow: 'hidden',
    boxShadow: '0 2px 12px rgba(91,107,79,0.06)',
  },
  contentImage: {
    height: '100px',
    backgroundColor: 'rgba(91,107,79,0.08)',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    padding: '12px',
  },
  contentType: {
    fontSize: '10px',
    fontWeight: 600,
    color: '#FDFCF8',
    backgroundColor: '#5B6B4F',
    padding: '4px 10px',
    borderRadius: '100px',
    textTransform: 'uppercase',
  },
  contentBody: {
    padding: '16px',
  },
  contentCategory: {
    fontSize: '10px',
    fontWeight: 600,
    color: '#C9A227',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    display: 'block',
    marginBottom: '6px',
  },
  contentTitle: {
    fontSize: '15px',
    fontWeight: 600,
    color: '#2D2D2D',
    marginBottom: '8px',
    lineHeight: 1.3,
  },
  contentDuration: {
    fontSize: '12px',
    color: '#7A8B6E',
  },

  // Rewards Section
  rewardsSection: {
    backgroundColor: '#5B6B4F',
    borderRadius: '24px',
    padding: '28px 24px',
  },
  pointsBadgeAlt: {
    fontSize: '13px',
    fontWeight: 600,
    color: '#5B6B4F',
    backgroundColor: '#C9A227',
    padding: '6px 14px',
    borderRadius: '100px',
  },
  rewardsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
    gap: '16px',
    marginTop: '20px',
  },
  rewardCard: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: '16px',
    overflow: 'hidden',
    transition: 'all 0.2s',
  },
  rewardCardLocked: {
    opacity: 0.7,
  },
  rewardCardImage: {
    height: '80px',
    backgroundColor: 'rgba(255,255,255,0.05)',
    position: 'relative',
  },
  rewardLockOverlay: {
    position: 'absolute',
    inset: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#FDFCF8',
    gap: '4px',
  },
  rewardLockText: {
    fontSize: '11px',
    fontWeight: 600,
  },
  rewardCardBody: {
    padding: '16px',
  },
  rewardCardTitle: {
    fontSize: '14px',
    fontWeight: 600,
    color: '#FDFCF8',
    marginBottom: '4px',
  },
  rewardCardPartner: {
    fontSize: '12px',
    color: 'rgba(255,255,255,0.6)',
    marginBottom: '12px',
  },
  rewardRedeemBtn: {
    width: '100%',
    padding: '10px',
    fontSize: '12px',
    fontWeight: 600,
    color: '#5B6B4F',
    backgroundColor: '#C9A227',
    border: 'none',
    borderRadius: '100px',
    cursor: 'pointer',
  },

  // Modal
  modalOverlay: {
    position: 'fixed',
    inset: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center',
    zIndex: 200,
    padding: '20px',
  },
  modal: {
    backgroundColor: '#FDFCF8',
    borderRadius: '24px 24px 0 0',
    padding: '32px 24px',
    width: '100%',
    maxWidth: '440px',
    maxHeight: '90vh',
    overflow: 'auto',
    position: 'relative',
  },
  modalClose: {
    position: 'absolute',
    top: '16px',
    right: '16px',
    width: '36px',
    height: '36px',
    backgroundColor: 'rgba(91,107,79,0.08)',
    border: 'none',
    borderRadius: '50%',
    fontSize: '20px',
    color: '#5B6B4F',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalIcon: {
    width: '64px',
    height: '64px',
    backgroundColor: 'rgba(91,107,79,0.08)',
    borderRadius: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 20px',
  },
  modalIconText: {
    fontFamily: '"Playfair Display", Georgia, serif',
    fontSize: '28px',
    color: 'rgba(91,107,79,0.4)',
  },
  modalTitle: {
    fontFamily: '"Playfair Display", Georgia, serif',
    fontSize: '24px',
    fontWeight: 500,
    color: '#2D2D2D',
    textAlign: 'center',
    marginBottom: '8px',
  },
  modalSubtitle: {
    fontSize: '15px',
    color: '#5B6B4F',
    textAlign: 'center',
    marginBottom: '24px',
  },
  modalSection: {
    marginBottom: '20px',
  },
  modalLabel: {
    fontSize: '12px',
    fontWeight: 600,
    color: '#5B6B4F',
    marginBottom: '10px',
  },
  feelingOptions: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap',
  },
  feelingBtn: {
    padding: '10px 18px',
    fontSize: '13px',
    fontWeight: 500,
    color: '#5B6B4F',
    backgroundColor: 'rgba(91,107,79,0.08)',
    border: 'none',
    borderRadius: '100px',
    cursor: 'pointer',
  },
  feelingBtnActive: {
    backgroundColor: '#5B6B4F',
    color: '#FDFCF8',
  },
  modalTextarea: {
    width: '100%',
    padding: '14px 16px',
    fontSize: '14px',
    color: '#2D2D2D',
    backgroundColor: 'rgba(91,107,79,0.06)',
    border: '1px solid rgba(91,107,79,0.1)',
    borderRadius: '12px',
    resize: 'none',
    fontFamily: 'inherit',
    boxSizing: 'border-box',
  },
  modalReward: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    padding: '12px',
    backgroundColor: 'rgba(201,162,39,0.1)',
    borderRadius: '12px',
    marginBottom: '24px',
  },
  modalRewardIcon: {
    color: '#C9A227',
    fontSize: '16px',
  },
  modalRewardText: {
    fontSize: '14px',
    fontWeight: 600,
    color: '#C9A227',
  },
  modalCompleteBtn: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    padding: '16px',
    fontSize: '15px',
    fontWeight: 600,
    color: '#FDFCF8',
    backgroundColor: '#5B6B4F',
    border: 'none',
    borderRadius: '100px',
    cursor: 'pointer',
  },

  // Reward Unlock Modal
  rewardUnlockModal: {
    textAlign: 'center',
    borderRadius: '24px',
  },
  rewardUnlockIcon: {
    marginBottom: '20px',
  },
  rewardUnlockTitle: {
    fontFamily: '"Playfair Display", Georgia, serif',
    fontSize: '28px',
    fontWeight: 500,
    color: '#2D2D2D',
    marginBottom: '12px',
  },
  rewardUnlockName: {
    fontSize: '18px',
    fontWeight: 600,
    color: '#5B6B4F',
    marginBottom: '4px',
  },
  rewardUnlockPartner: {
    fontSize: '14px',
    color: '#7A8B6E',
    marginBottom: '24px',
  },
  rewardUnlockBtn: {
    width: '100%',
    padding: '16px',
    fontSize: '15px',
    fontWeight: 600,
    color: '#2D2D2D',
    backgroundColor: '#C9A227',
    border: 'none',
    borderRadius: '100px',
    cursor: 'pointer',
  },

  // Buttons
  primaryBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '14px 24px',
    fontSize: '14px',
    fontWeight: 600,
    color: '#FDFCF8',
    backgroundColor: '#5B6B4F',
    border: 'none',
    borderRadius: '100px',
    cursor: 'pointer',
  },
  primaryBtnFull: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    padding: '16px',
    fontSize: '14px',
    fontWeight: 600,
    color: '#FDFCF8',
    backgroundColor: '#5B6B4F',
    border: 'none',
    borderRadius: '100px',
    cursor: 'pointer',
    marginBottom: '24px',
  },

  // Scripts
  summaryRow: {
    display: 'flex',
    gap: '16px',
    marginBottom: '24px',
  },
  summaryItem: {
    flex: 1,
    backgroundColor: '#FDFCF8',
    borderRadius: '16px',
    padding: '20px',
    textAlign: 'center',
  },
  summaryNum: {
    fontSize: '24px',
    fontWeight: 600,
    color: '#2D2D2D',
    display: 'block',
    marginBottom: '4px',
  },
  summaryLabel: {
    fontSize: '12px',
    color: '#7A8B6E',
  },
  scriptsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    marginBottom: '24px',
  },
  scriptCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    backgroundColor: '#FDFCF8',
    borderRadius: '16px',
    padding: '16px 20px',
    border: 'none',
    textAlign: 'left',
    cursor: 'pointer',
    width: '100%',
    transition: 'all 0.2s',
  },
  scriptCardActive: {
    backgroundColor: 'rgba(91,107,79,0.08)',
  },
  scriptCardIcon: {
    width: '48px',
    height: '48px',
    backgroundColor: 'rgba(91,107,79,0.08)',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: '"Playfair Display", Georgia, serif',
    fontSize: '20px',
    color: 'rgba(91,107,79,0.4)',
    flexShrink: 0,
  },
  scriptCardContent: {
    flex: 1,
    minWidth: 0,
  },
  scriptCardType: {
    fontSize: '10px',
    fontWeight: 600,
    color: '#C9A227',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    display: 'block',
    marginBottom: '4px',
  },
  scriptCardName: {
    fontSize: '16px',
    fontWeight: 600,
    color: '#2D2D2D',
    marginBottom: '4px',
  },
  scriptCardDosage: {
    fontSize: '13px',
    color: '#5B6B4F',
    marginBottom: '4px',
  },
  scriptCardRef: {
    fontSize: '11px',
    color: '#7A8B6E',
    fontFamily: 'monospace',
  },
  scriptCardArrow: {
    color: '#C9A227',
    fontSize: '18px',
    fontWeight: 600,
  },
  scriptDetail: {
    backgroundColor: '#FDFCF8',
    borderRadius: '20px',
    padding: '24px',
    marginBottom: '24px',
  },
  scriptDetailGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '20px',
    marginBottom: '20px',
  },
  scriptDetailItem: {},
  scriptDetailLabel: {
    fontSize: '11px',
    fontWeight: 600,
    color: '#7A8B6E',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    marginBottom: '4px',
    display: 'block',
  },
  scriptDetailValue: {
    fontSize: '15px',
    fontWeight: 500,
    color: '#2D2D2D',
  },
  scriptDetailNotes: {
    backgroundColor: 'rgba(91,107,79,0.04)',
    borderRadius: '12px',
    padding: '16px',
    marginBottom: '20px',
  },
  scriptDetailNotesText: {
    fontSize: '14px',
    color: '#5B6B4F',
    lineHeight: 1.5,
  },

  // Appointments
  teamRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '16px',
    marginBottom: '32px',
  },
  teamCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    backgroundColor: '#FDFCF8',
    borderRadius: '16px',
    padding: '20px',
  },
  teamAvatar: {
    width: '48px',
    height: '48px',
    backgroundColor: '#5B6B4F',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '14px',
    fontWeight: 600,
    color: '#FDFCF8',
    flexShrink: 0,
  },
  teamName: {
    fontSize: '15px',
    fontWeight: 600,
    color: '#2D2D2D',
    marginBottom: '2px',
  },
  teamRole: {
    fontSize: '13px',
    color: '#5B6B4F',
  },
  appointmentCard: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '16px',
    backgroundColor: '#FDFCF8',
    borderRadius: '16px',
    padding: '20px',
    marginBottom: '12px',
  },
  appointmentCardPast: {
    opacity: 0.7,
  },
  appointmentDate: {
    width: '48px',
    textAlign: 'center',
    flexShrink: 0,
  },
  appointmentDay: {
    fontSize: '24px',
    fontWeight: 600,
    color: '#2D2D2D',
    display: 'block',
    lineHeight: 1,
  },
  appointmentMonth: {
    fontSize: '12px',
    color: '#7A8B6E',
    textTransform: 'uppercase',
  },
  appointmentContent: {
    flex: 1,
  },
  appointmentType: {
    fontSize: '10px',
    fontWeight: 600,
    color: '#C9A227',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    display: 'block',
    marginBottom: '4px',
  },
  appointmentWith: {
    fontSize: '16px',
    fontWeight: 600,
    color: '#2D2D2D',
    marginBottom: '4px',
  },
  appointmentMeta: {
    fontSize: '13px',
    color: '#5B6B4F',
  },

  // Journal
  journalForm: {
    backgroundColor: '#FDFCF8',
    borderRadius: '20px',
    padding: '24px',
    marginBottom: '24px',
  },
  journalFormRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px',
    marginBottom: '16px',
  },
  journalFormField: {
    display: 'flex',
    flexDirection: 'column',
  },
  journalLabel: {
    fontSize: '12px',
    fontWeight: 600,
    color: '#5B6B4F',
    marginBottom: '8px',
  },
  journalSelect: {
    padding: '12px 16px',
    fontSize: '14px',
    color: '#2D2D2D',
    backgroundColor: 'rgba(91,107,79,0.06)',
    border: '1px solid rgba(91,107,79,0.1)',
    borderRadius: '12px',
    fontFamily: 'inherit',
  },
  journalInput: {
    padding: '12px 16px',
    fontSize: '14px',
    color: '#2D2D2D',
    backgroundColor: 'rgba(91,107,79,0.06)',
    border: '1px solid rgba(91,107,79,0.1)',
    borderRadius: '12px',
    fontFamily: 'inherit',
  },
  journalTextarea: {
    padding: '12px 16px',
    fontSize: '14px',
    color: '#2D2D2D',
    backgroundColor: 'rgba(91,107,79,0.06)',
    border: '1px solid rgba(91,107,79,0.1)',
    borderRadius: '12px',
    resize: 'none',
    fontFamily: 'inherit',
    marginBottom: '16px',
    width: '100%',
    boxSizing: 'border-box',
  },
  statsRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '12px',
    marginBottom: '32px',
  },
  statBox: {
    backgroundColor: '#FDFCF8',
    borderRadius: '16px',
    padding: '20px',
    textAlign: 'center',
  },
  statNum: {
    fontSize: '28px',
    fontWeight: 600,
    color: '#2D2D2D',
    display: 'block',
  },
  statLabel: {
    fontSize: '12px',
    color: '#7A8B6E',
  },
  journalEntry: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '16px',
    backgroundColor: '#FDFCF8',
    borderRadius: '16px',
    padding: '20px',
    marginBottom: '12px',
  },
  journalEntryDate: {
    width: '48px',
    textAlign: 'center',
    flexShrink: 0,
  },
  journalEntryDay: {
    fontSize: '24px',
    fontWeight: 600,
    color: '#2D2D2D',
    display: 'block',
    lineHeight: 1,
  },
  journalEntryMonth: {
    fontSize: '12px',
    color: '#7A8B6E',
  },
  journalEntryContent: {
    flex: 1,
  },
  journalEntryMetrics: {
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap',
    marginBottom: '8px',
  },
  journalMetric: {
    fontSize: '12px',
    color: '#5B6B4F',
  },
  journalEntryNotes: {
    fontSize: '14px',
    color: '#2D2D2D',
    lineHeight: 1.5,
  },

  // Footer
  footer: {
    borderTop: '1px solid rgba(91,107,79,0.08)',
    backgroundColor: '#FDFCF8',
    marginTop: 'auto',
  },
  footerInner: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '24px 20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: '16px',
  },
  footerLogo: {
    fontFamily: '"Playfair Display", Georgia, serif',
    fontSize: '16px',
    fontWeight: 500,
    color: '#2D2D2D',
  },
  footerLinks: {
    display: 'flex',
    gap: '24px',
  },
  footerLink: {
    fontSize: '13px',
    color: '#5B6B4F',
    textDecoration: 'none',
  },
};

export default App;
