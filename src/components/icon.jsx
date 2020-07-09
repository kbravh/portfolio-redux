import React from 'react'

const Icon = ({ icon, ...props}) => {
  switch (icon) {
    case "github":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" {...props} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="feather feather-github" viewBox="0 0 24 24">
          <title>Github</title>
          <defs />
          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.9a3.4 3.4 0 00-1-2.6c3.2-.3 6.5-1.5 6.5-7A5.4 5.4 0 0020 4.8 5 5 0 0020 1s-1.3-.3-4 1.5a13.4 13.4 0 00-7 0C6.3.6 5 1 5 1a5 5 0 000 3.8 5.4 5.4 0 00-1.5 3.7c0 5.5 3.3 6.7 6.4 7a3.4 3.4 0 00-.9 2.6V22" />
        </svg>
      )
    case "codepen":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" {...props} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="feather feather-codepen" viewBox="0 0 24 24">
          <defs />
          <path d="M2 15.5l10-7 10 7M12 2v6.5m10 0l-10 7-10-7M12 2l10 6.5v7L12 22 2 15.5v-7zm0 20v-6.5" />
        </svg>
      )
    case "globe":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" {...props} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-globe">
          <circle cx="12" cy="12" r="10" />
          <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
        </svg>
      )
    case "twitter":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" {...props} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="feather feather-twitter" viewBox="0 0 24 24">
          <title>Twitter</title>
          <defs />
          <path d="M23 3a10.9 10.9 0 01-3.1 1.5 4.5 4.5 0 00-7.9 3v1A10.7 10.7 0 013 4s-4 9 5 13a11.6 11.6 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 000-.8A7.7 7.7 0 0023 3z" />
        </svg>
      )
    case "linkedin":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" {...props} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="feather feather-linkedin" viewBox="0 0 24 24">
          <title>LinkedIn</title>
          <defs />
          <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      )
    default:
      return null
  }
}

export default Icon